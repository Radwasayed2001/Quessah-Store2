const firebaseConfig = {
  apiKey: "AIzaSyAXOfkZH-iisY9RecsDlKFdF2CPQDn5J-Y",
  authDomain: "quessah-c52e7.firebaseapp.com",
  projectId: "quessah-c52e7",
  storageBucket: "quessah-c52e7.appspot.com",
  messagingSenderId: "370785509486",
  appId: "1:370785509486:web:a8970f44852ff24f9dc67f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();

// ======= Global Variables =======
let wheelCanvas, wheelCtx;
let wheelAngle = Math.PI / (10);
let isSpinning = false;
let currentPrizes = [];

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', async () => {
  await initializeDefaultPrizes();
  currentPrizes = await fetchPrizesFromFirestore();
  initializeWheel();
  loadClaims();
});


async function spinWheel() {
  if (isSpinning || currentPrizes.length === 0) return;

  // حد يومي
  const today    = new Date().toDateString();
  const userId   = getUserId();
  const key      = `dailyClaim_${userId}`;
  const last     = JSON.parse(localStorage.getItem(key) || '{}');
  if (last.claimDate && new Date(last.claimDate).toDateString() === today) {
    alert('لقد استخدمت عجلة الحظ اليوم! يمكنك المحاولة مرة أخرى غداً');
    return;
  }

  const n = currentPrizes.length;
  if (n < 6) {
    alert('يجب أن تحتوي العجلة على 6 جوائز على الأقل');
    return;
  }

  // 1) اختَر فائزاً بناءً على الأوزان
  const totalWeight = currentPrizes.reduce((sum, p) => sum + (p.weight || 1), 0);
  let r = Math.random() * totalWeight;
  let chosen = 0;
  for (let i = 0; i < n; i++) {
    r -= (currentPrizes[i].weight || 1);
    if (r <= 0) {
      chosen = i;
      break;
    }
  }

  isSpinning = true;
  const btn = document.getElementById('spin-button');
  btn.disabled      = true;
  btn.textContent   = 'جاري التدوير...';

  // 2) زاوية القطاع
  const segA        = 2 * Math.PI / n;
  const targetAngle = (chosen + 0.5) * segA;      // مركز قطاع الجائزة
  const pointer     = -Math.PI / 2;               // 12 o'clock

  // 3) حساب delta
  const currentMod  = wheelAngle % (2 * Math.PI);
  let delta = (2 * Math.PI - ((targetAngle - currentMod + 2 * Math.PI) % (2 * Math.PI))) % (2 * Math.PI);

  // 4) إضافة 4 دورات كاملة
  const totalRot = delta + 4 * 2 * Math.PI;

  const start    = wheelAngle;
  const duration = 3000;
  const t0       = Date.now();

  function animate() {
    const t     = Math.min((Date.now() - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    wheelAngle  = start + totalRot * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(async () => {
        // 5) تأكد من قطاع الهبوط
        const final       = wheelAngle % (2 * Math.PI);
        const norm        = (pointer - final + 2 * Math.PI) % (2 * Math.PI);
        const landedIndex = Math.floor(norm / segA) % n;
        const landedPrize = currentPrizes[landedIndex];

        // 6) حضّر كائن الـ claim
        const newClaim = {
          userId,
          prizeName : landedPrize.name,
          prizeIcon : landedPrize.icon,
          claimDate : new Date().toISOString()
        };

        // 7) خزّنه في Firestore
        await db.collection('claims').doc(key).set(newClaim);

        // 8) خزّنه في localStorage
        localStorage.setItem(key, JSON.stringify(newClaim));

        // 9) حدّث الواجهة
        loadClaims();
        showPrizeModal(landedPrize);

        // 10) أعد تفعيل الزر
        isSpinning      = false;
        btn.disabled    = false;
        btn.textContent = 'تدوير العجلة';
      }, 500);
    }
  }

  animate();
}




// Prize Modal Functions
function showPrizeModal(prize) {
    document.getElementById('prize-icon').textContent = prize.icon;
    document.getElementById('prize-name').textContent = prize.name;
    document.getElementById('prize-modal').classList.remove('hidden');
    
    // Store current prize for claiming
    window.currentPrize = prize;
}

function closePrizeModal() {
    document.getElementById('prize-modal').classList.add('hidden');
    window.currentPrize = null;
    closeWheelModal();
}


// Share Functions
function shareWhatsApp() {
    const story = JSON.parse(localStorage.getItem('storyOfTheDay') || '{}');
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    const message = `🌟 ${story.title || 'قصة ملهمة'}\n\n${(story.content || '').substring(0, 100)}...\n\nاقرأ القصة كاملة: ${storyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function shareInstagram() {
    const story = JSON.parse(localStorage.getItem('storyOfTheDay') || '{}');
    const storyUrl = `${window.location.origin}/story.html`;
    
    const message = `🌟 ${story.title || 'قصة ملهمة'}\n\n${(story.content || '').substring(0, 150)}...\n\n${storyUrl}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            alert('تم نسخ محتوى القصة! يمكنك الآن لصقه في إنستاجرام Stories أو Post جديد.');
        }).catch(() => {
            fallbackCopyToClipboard(message);
        });
    } else {
        fallbackCopyToClipboard(message);
    }
}

function copyToClipboard() {
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(storyUrl).then(() => {
            alert('تم نسخ الرابط بنجاح!');
        }).catch(() => {
            fallbackCopyToClipboard(storyUrl);
        });
    } else {
        fallbackCopyToClipboard(storyUrl);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('تم نسخ الرابط بنجاح!');
    } catch (err) {
        alert('فشل في نسخ الرابط. يرجى نسخه يدوياً: ' + text);
    }
    document.body.removeChild(textArea);
}

// Utility Functions
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Event Listeners for modal close on outside click
document.getElementById('wheel-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeWheelModal();
    }
});

document.getElementById('prize-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePrizeModal();
    }
});

// Keyboard event listeners for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!document.getElementById('wheel-modal').classList.contains('hidden')) {
            closeWheelModal();
        }
        if (!document.getElementById('prize-modal').classList.contains('hidden')) {
            closePrizeModal();
        }
    }
});

// Handle wheel redraw when prizes are updated (for live updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'wheelPrizes') {
        currentPrizes = JSON.parse(e.newValue || '[]');
        if (wheelCtx) {
            drawWheel();
        }
    }
});

// Touch events for mobile wheel interaction (optional enhancement)
if (wheelCanvas) {
    wheelCanvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });
}
// Global Variables
 currentPrizes = [];
// ======= Firestore Helpers =======
async function fetchPrizesFromFirestore() {
  try {
    const snap = await db.collection('wheelPrizes').orderBy('name').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('Error loading prizes:', e);
    return [];
  }
}



async function fetchAllClaims() {
  try {
    const snap = await db.collection('claims').orderBy('claimDate','desc').get();
    return snap.docs.map(d => d.data());
  } catch (e) {
    console.error('Error loading claims:', e);
    return [];
  }
}

async function fetchUserClaimFromFirestore(userId) {
  const docKey = `dailyClaim_${userId}`;
  const doc = await db.collection('claims').doc(docKey).get();
  return doc.exists ? doc.data() : null;
}

// ======= Default Data Seeders =======
async function initializeDefaultPrizes() {
  const snap = await db.collection('wheelPrizes').limit(1).get();
  if (snap.empty) {
    const defaults = [
      {
        name: 'مناديل قصة هدية',
        icon: '🧻',
        message: 'مبروووك! استخدم كود: GIFT5 و احصل على مناديل قصة مجانًا مع طلبك القادم.',
        weight: 5
      },
      {
        name: 'خصم 50% على طلبك القادم',
        icon: '🎉',
        message: 'مبروووك! استخدم كود: D50 و احصل على خصم 50٪ حتى 100 ريال مع طلبك القادم.',
        weight: 5
      },
      {
        name: 'خصم 25% على طلبك القادم',
        icon: '💵',
        message: 'مبروووك! استخدم كود: D25 و احصل على خصم 25٪ حتى 100 ريال مع طلبك القادم.',
        weight: 35
      },
      {
        name: 'توصيل مجاني على طلبك القادم',
        icon: '🚚',
        message: 'مبروووك! استخدم كود: SHIP و احصل على شحن مجاني مع طلبك القادم.',
        weight: 30
      },
      {
        name: 'خصم 10 ريال على طلبك القادم',
        icon: '🔖',
        message: 'حظك طيب! خصم 10 ريال على طلبك القادم، استخدم الكود: D10',
        weight: 20
      },
      {
        name: 'طلبك علينا (حد أقصى 300 ريال)',
        icon: '🎁',
        message: 'مبرووووك!!! طلبك علينا، استخدم الكود: FREE300',
        weight: 5
      }
    ];
    const batch = db.batch();
    defaults.forEach(d => {
      const ref = db.collection('wheelPrizes').doc();
      batch.set(ref, d);
    });
    await batch.commit();
  }
}

// ======= Wheel Initialization & Drawing =======
function initializeWheel() {
  wheelCanvas = document.getElementById('wheel-canvas');
  if (wheelCanvas) {
    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
  }
}

function drawWheel() {
  if (!wheelCtx || currentPrizes.length === 0) return;

  const cx = wheelCanvas.width  / 2;
  const cy = wheelCanvas.height / 2;
  const outerR = Math.min(cx, cy) - 5;
  const innerR = 45;
  const segA = (2 * Math.PI) / currentPrizes.length;
  const colors = ['#565BB6','#6366F1','#8B5CF6','#A855F7','#C084FC','#D8B4FE','#E0E7FF','#EEF2FF'];

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  // تقسم النص لكلمات، ثم تجميعها بأسطر بحيث لا تتجاوز maxWidth
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';

    for (let w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  currentPrizes.forEach((p, i) => {
    const start = wheelAngle + i * segA;
    const end   = start + segA;
    const color = colors[i % colors.length];

    // رسم القطاع
    wheelCtx.beginPath();
    wheelCtx.moveTo(cx, cy);
    wheelCtx.arc(cx, cy, outerR, start, end);
    wheelCtx.fillStyle = color;
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#fff';
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();

    // أيقونة ونص داخل القطاع
    wheelCtx.save();
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(start + segA / 2);

    // 1) أيقونة (28px)
    wheelCtx.fillStyle = '#fff';
    wheelCtx.font      = '28px serif';
    wheelCtx.textAlign = 'center';
    wheelCtx.fillText(p.icon, outerR * 0.5, 10);

    // 2) نص الجائزة (16px) مقسّم على أسطر
    wheelCtx.font      = '16px Cairo, Arial';
    const maxTextW = outerR * 0.6;          // أقصى عرض للنص
    const lines    = wrapText(wheelCtx, p.name, maxTextW);
    const lh       = 18;                    // ارتفاع السطر
    const totalH   = (lines.length - 1) * lh;
    // نبدأ الرسم عند هذه النقطة (يقع في الاتجاه الشعاعي)
    const textX    = outerR * 0.6;
    let textY      = - totalH / 2;         // تعويض لإيجاد المنتصف عموديًا

    wheelCtx.fillStyle = '#fff';
    for (let j = 0; j < lines.length; j++) {
      wheelCtx.fillText(lines[j], textX, textY + j * lh);
    }

    wheelCtx.restore();
  });

  // المحور الداخلي
  wheelCtx.beginPath();
  wheelCtx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  wheelCtx.fillStyle = '#fff';
  wheelCtx.fill();
  wheelCtx.strokeStyle = '#aaa';
  wheelCtx.lineWidth = 4;
  wheelCtx.stroke();

  // النص المركزي
  wheelCtx.fillStyle = '#333';
  wheelCtx.font      = 'bold 18px Arial';
  wheelCtx.textAlign = 'center';
  wheelCtx.fillText('حظّاً سعيداً', cx, cy + 6);
}



// ======= Wheel Modal & Spin =======
async function openWheelModal() {
  const modal = document.getElementById('wheel-modal');
  const dailyMsg = document.getElementById('daily-limit-message');
  const spinBtn = document.getElementById('spin-button');

  const dailyPrizeEl = document.getElementById('daily-prize');
  const userId = getUserId();
  const key = `dailyClaim_${userId}`;
  const claim = JSON.parse(localStorage.getItem(key) || '{}');

  // إذا استخدم المستخدم العجلة اليوم
  if (claim.claimDate && new Date(claim.claimDate).toDateString() === new Date().toDateString()) {
    dailyMsg.classList.remove('hidden');
    spinBtn.classList.add('hidden');

    // عرِّف الرسالة الافتراضية لو ما وصلت بيانات prize.message
    const msg = claim.prizeMessage || (currentPrizes.find(p => p.name === claim.prizeName)?.message) || '';
    dailyPrizeEl.innerHTML = `
      <div class="mt-2 p-2 bg-white rounded-lg shadow-sm">
        <div class="text-4xl">${claim.prizeIcon}</div>
        <h3 class="text-xl font-semibold mt-2">${claim.prizeName}</h3>
        <p class="text-sm text-gray-700 mt-1">${msg}</p>
      </div>
    `;
  } else {
    dailyMsg.classList.add('hidden');
    spinBtn.classList.remove('hidden');

    dailyPrizeEl.innerHTML = '';
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeWheelModal() {
  document.getElementById('wheel-modal').classList.add('hidden');
  document.body.style.overflow='';
}



function showPrizeModal(prize) {
  document.getElementById('prize-icon').textContent    = prize.icon;
  document.getElementById('prize-name').textContent    = prize.name;
  document.getElementById('prize-message').textContent = prize.message;
  document.getElementById('prize-modal').classList.remove('hidden');
  window.currentPrize = prize;
}


async function claimPrize() {
  if (!window.currentPrize) return;
  const userId = getUserId();
  const docKey = `dailyClaim_${userId}`;
  const newClaim = {
    userId,
    prizeName: window.currentPrize.name,
    prizeIcon: window.currentPrize.icon,
    claimDate: new Date().toISOString()
  };
  // save in Firestore
  await db.collection('claims').doc(docKey).set(newClaim);
  alert(`تم استلام جائزتك: ${newClaim.prizeName}`);
  closePrizeModal();
  closeWheelModal();
}

// ======= Claims Dashboard =======
async function loadClaims() {
  const container = document.getElementById('claims-list');
  if (!container) return;
  container.innerHTML = '<div class="text-gray-500 text-center py-8">جاري التحميل...</div>';
  const claims = await fetchAllClaims();
  if (claims.length===0) {
    container.innerHTML = '<div class="text-gray-500 text-center py-8">لا توجد مطالبات</div>';
    return;
  }
  container.innerHTML = claims.map(c=>`
    <div class="bg-gray-50 p-4 rounded-lg mb-2">
      <div class="flex justify-between">
        <div>
          <div class="font-medium">المستخدم: ${c.userId}</div>
          <div class="text-sm">الجائزة: ${c.prizeName}</div>
          <div class="text-xs text-gray-500">${new Date(c.claimDate).toLocaleString('ar-SA')}</div>
        </div>
        <button class="bg-red-500 px-2 rounded" onclick="clearUserClaim('${c.userId}')">مسح</button>
      </div>
    </div>
  `).join('');
}

async function clearUserClaim(userId) {
  if (!confirm('مسح هذه المطالبة؟')) return;
  await db.collection('claims').doc(`dailyClaim_${userId}`).delete();
  loadClaims();
}

async function clearAllClaims() {
  if (!confirm('مسح جميع المطالبات؟')) return;
  const snap = await db.collection('claims').get();
  const batch = db.batch();
  snap.forEach(d=> batch.delete(d.ref));
  await batch.commit();
  loadClaims();
}

// ======= Utility =======
function getUserId() {
  let uid = localStorage.getItem('userId');
  if (!uid) {
    uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
    localStorage.setItem('userId', uid);
  }
  return uid;
}

// ======= Event Listeners for Modals =======
document.getElementById('wheel-modal').addEventListener('click', e=> {
  if (e.target===e.currentTarget) closeWheelModal();
});
document.getElementById('prize-modal').addEventListener('click', e=> {
  if (e.target===e.currentTarget) closePrizeModal();
});
document.addEventListener('keydown', e=> {
  if (e.key==='Escape') { closeWheelModal(); closePrizeModal(); }
});
