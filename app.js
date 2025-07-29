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
let wheelAngle = 0;
let isSpinning = false;
let currentPrizes = [];

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', async () => {
  await initializeDefaultPrizes();
  currentPrizes = await fetchPrizesFromFirestore();
  initializeWheel();
  loadClaims();
});


function closeWheelModal() {
    document.getElementById('wheel-modal').classList.add('hidden');
    document.body.style.overflow = '';
}



function drawWheel() {
    if (!wheelCtx || currentPrizes.length === 0) return;
    
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = 30;
    
    // Clear canvas
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / currentPrizes.length;
    const colors = [
        '#565BB6', '#565BB6', '#565BB6', '#565BB6', 
        '#565BB6', '#565BB6', '#565BB6', '#565BB6'
    ];
    
    currentPrizes.forEach((prize, index) => {
        const startAngle = wheelAngle + (index * segmentAngle);
        const endAngle = startAngle + segmentAngle;
        
        // Draw outer segment
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        wheelCtx.fillStyle = colors[index % colors.length];
        wheelCtx.fill();
        
        // Add gradient effect
        const gradient = wheelCtx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
        gradient.addColorStop(0, colors[index % colors.length]);
        gradient.addColorStop(1, colors[index % colors.length] + '80');
        wheelCtx.fillStyle = gradient;
        wheelCtx.fill();
        
        // Draw segment border
        wheelCtx.strokeStyle = '#ffffff';
        wheelCtx.lineWidth = 3;
        wheelCtx.stroke();
        
        // Draw prize icon
        wheelCtx.save();
        wheelCtx.translate(centerX, centerY);
        wheelCtx.rotate(startAngle + segmentAngle / 2);
        
        // Draw icon
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.font = 'bold 24px Arial';
        wheelCtx.textAlign = 'center';
        wheelCtx.fillText(prize.icon, outerRadius * 0.5, 8);
        
        // Draw prize name
        wheelCtx.font = 'bold 11px Cairo, Arial';
        wheelCtx.fillText(prize.name, outerRadius * 0.75, 4);
        
        wheelCtx.restore();
        
        // Add decorative dots around the wheel
        const dotAngle = startAngle + segmentAngle / 2;
        const dotX = centerX + Math.cos(dotAngle) * (outerRadius + 8);
        const dotY = centerY + Math.sin(dotAngle) * (outerRadius + 8);
        
        wheelCtx.beginPath();
        wheelCtx.arc(dotX, dotY, 4, 0, 2 * Math.PI);
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.fill();
        wheelCtx.strokeStyle = colors[index % colors.length];
        wheelCtx.lineWidth = 2;
        wheelCtx.stroke();
    });
    
    // Draw center hub
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    
    // Center gradient
    const centerGradient = wheelCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
    centerGradient.addColorStop(0, '#ffffff');
    centerGradient.addColorStop(1, '#f1f5f9');
    wheelCtx.fillStyle = centerGradient;
    wheelCtx.fill();
    
    wheelCtx.strokeStyle = '#303590';
    wheelCtx.lineWidth = 4;
    wheelCtx.stroke();
    
    // Add center logo/text
    wheelCtx.fillStyle = '#303590';
    wheelCtx.font = 'bold 12px Cairo, Arial';
    wheelCtx.textAlign = 'center';
    wheelCtx.fillText('حظ', centerX, centerY - 2);
    wheelCtx.fillText('سعيد', centerX, centerY + 12);
}

function spinWheel() {
  if (isSpinning || currentPrizes.length === 0) return;

  // حد يومي
  const today = new Date().toDateString();
  const userId = getUserId();
  const dailyClaimKey = `dailyClaim_${userId}`;
  const lastClaim = JSON.parse(localStorage.getItem(dailyClaimKey) || '{}');
  if (lastClaim.claimDate && new Date(lastClaim.claimDate).toDateString() === today) {
    alert('لقد استخدمت عجلة الحظ اليوم! يمكنك المحاولة مرة أخرى غداً');
    return;
  }

  isSpinning = true;
  const spinBtn = document.getElementById('spin-button');
  spinBtn.disabled = true;
  spinBtn.textContent = 'جاري التدوير...';

  // 1) نختار فائز عشوائي
  const prizeCount = currentPrizes.length;
  let winningIndex   = Math.floor(Math.random() * prizeCount);

  // 2) نزيح فهرس الفوز بمقدار 2 للخلف عشان يتطابق مع الرسم
//   winningIndex = (winningIndex - 2 + prizeCount) % prizeCount;
  const winningPrize = currentPrizes[(winningIndex - 2 + prizeCount) % prizeCount];

  // 2) نحسب الزاوية لكل شريحة
  const segmentAngle = (2 * Math.PI) / prizeCount;

  // 3) نحدد الزاوية النهائية التي تُحرك العجلة عندها إلى منتصف الشريحة
  //    نعتبر أن 0 rad هو المؤشر العلوي، والعجلة تدور عكس عقارب الساعة
  //    لذا: نريد أن نصل إلى زاوية =  ( (prizeCount - winningIndex - 0.5) * segmentAngle )
  const desiredAngle = (prizeCount - winningIndex - 0.5) * segmentAngle;

  // 4) نضيف عليها عدة دورات كاملة (مثلاً 4 دورات)
  const totalRotation = 4 * 2 * Math.PI + ((desiredAngle - (wheelAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));

  const startAngle = wheelAngle;
  const duration = 3000;
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

    wheelAngle = startAngle + totalRotation * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        showPrizeModal(winningPrize);
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.textContent = 'تدوير العجلة';
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
}


// Share Functions
function shareWhatsApp() {
    const story = JSON.parse(localStorage.getItem('storyOfTheDay') || '{}');
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    const message = `🌟 ${story.title || 'قصة ملهمة'}\n\n${(story.content || '').substring(0, 100)}...\n\nاقرأ القصة كاملة: ${storyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function shareFacebook() {
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
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
      { name:'خصم 10%', icon:'🎯' },
      { name:'شحن مجاني', icon:'🚚' },
      { name:'هدية مجانية', icon:'🎁' },
      { name:'خصم 20%', icon:'💰' },
      { name:'كوبون خاص', icon:'🎫' },
      { name:'عطر مجاني', icon:'🌸' }
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
  const cx = wheelCanvas.width/2, cy = wheelCanvas.height/2;
  const outerR = Math.min(cx,cy)-20, innerR = 30;
  const segA = 2*Math.PI/currentPrizes.length;
  const colors = ['#565BB6','#6366F1','#8B5CF6','#A855F7','#C084FC','#D8B4FE','#E0E7FF','#EEF2FF'];

  wheelCtx.clearRect(0,0,wheelCanvas.width,wheelCanvas.height);
  currentPrizes.forEach((p,i) => {
    const start = wheelAngle + i*segA, end = start+segA;
    wheelCtx.beginPath();
    wheelCtx.moveTo(cx,cy);
    wheelCtx.arc(cx,cy,outerR,start,end);
    wheelCtx.fillStyle = colors[i%colors.length];
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#fff'; wheelCtx.lineWidth = 3; wheelCtx.stroke();

    // icon & text
    wheelCtx.save();
    wheelCtx.translate(cx,cy);
    wheelCtx.rotate(start+segA/2);
    wheelCtx.fillStyle = '#fff';
    wheelCtx.font='bold 24px Arial';
    wheelCtx.textAlign='center';
    wheelCtx.fillText(p.icon, outerR*0.5,8);
    wheelCtx.font='bold 11px Cairo';
    wheelCtx.fillText(p.name, outerR*0.75,4);
    wheelCtx.restore();
  });
}

// ======= Wheel Modal & Spin =======
async function openWheelModal() {
  const userId = getUserId();
  const today = new Date().toDateString();
  const claim = await fetchUserClaimFromFirestore(userId);
  if (claim?.claimDate && new Date(claim.claimDate).toDateString()===today) {
    document.getElementById('spin-button').style.display='none';
    document.getElementById('daily-limit-message').classList.remove('hidden');
  } else {
    document.getElementById('spin-button').style.display='block';
    document.getElementById('daily-limit-message').classList.add('hidden');
  }
  document.getElementById('wheel-modal').classList.remove('hidden');
  document.body.style.overflow='hidden';
  setTimeout(drawWheel,100);
}

function closeWheelModal() {
  document.getElementById('wheel-modal').classList.add('hidden');
  document.body.style.overflow='';
}

function spinWheel() {
  if (isSpinning||currentPrizes.length===0) return;
  isSpinning=true;
  const btn = document.getElementById('spin-button');
  btn.disabled=true; btn.textContent='جاري التدوير...';

  const n = currentPrizes.length;
  const idx = Math.floor(Math.random()*n);
  const prize = currentPrizes[(idx-2+n)%n];
  const segA = 2*Math.PI/n;
  const desired = (n-idx-0.5)*segA;
  const totalRot = 4*2*Math.PI + ((desired - (wheelAngle%(2*Math.PI)) + 2*Math.PI)%(2*Math.PI));
  const start = wheelAngle, dur=3000, t0=Date.now();

  function animate() {
    const t = Math.min((Date.now()-t0)/dur,1);
    wheelAngle = start + totalRot*(1-Math.pow(1-t,3));
    drawWheel();
    if (t<1) requestAnimationFrame(animate);
    else setTimeout(()=>{
      showPrizeModal(prize);
      isSpinning=false; btn.disabled=false; btn.textContent='تدوير العجلة';
    },500);
  }
  animate();
}

// ======= Prize Modal =======
function showPrizeModal(p) {
  window.currentPrize = p;
  document.getElementById('prize-icon').textContent = p.icon;
  document.getElementById('prize-name').textContent = p.name;
  document.getElementById('prize-modal').classList.remove('hidden');
}
function closePrizeModal() {
  window.currentPrize=null;
  document.getElementById('prize-modal').classList.add('hidden');
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
