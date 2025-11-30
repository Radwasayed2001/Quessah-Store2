// app.js — fixed: ensure form and wheel are mutually exclusive; Firestore presence required to show wheel

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
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// ======= Globals =======
let wheelCanvas, wheelCtx;
let wheelAngle = Math.PI / 10;
let isSpinning = false;
let currentPrizes = [];

// Participant flags
window.participantConfirmed = false; // true only when participant exists in Firestore
window.currentParticipant = null;
window.currentPrize = null;

// ======= UI helpers (mutually exclusive) =======
function showWheelOnly() {
  const wheelArea = document.getElementById('wheel-area');
  const formContainer = document.getElementById('participant-form-container');
  const dailyMsg = document.getElementById('daily-limit-message');
  if (formContainer) formContainer.classList.add('hidden');
  if (wheelArea) wheelArea.classList.remove('hidden');
  if (dailyMsg) dailyMsg.classList.add('hidden');
}

function showFormOnly() {
  const wheelArea = document.getElementById('wheel-area');
  const formContainer = document.getElementById('participant-form-container');
  const dailyMsg = document.getElementById('daily-limit-message');
  if (wheelArea) wheelArea.classList.add('hidden');
  if (formContainer) formContainer.classList.remove('hidden');
  if (dailyMsg) dailyMsg.classList.add('hidden');
}

function hideBoth() {
  const wheelArea = document.getElementById('wheel-area');
  const formContainer = document.getElementById('participant-form-container');
  if (wheelArea) wheelArea.classList.add('hidden');
  if (formContainer) formContainer.classList.add('hidden');
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', async () => {
  // load prizes & init wheel drawing (drawing will be noop if canvas not present or prizes empty)
  currentPrizes = await fetchPrizesFromFirestore();
  initializeWheel();
  loadClaims();

  // init form handlers
  try { initParticipantFormHandlers(); } catch (e) { console.warn('initParticipantFormHandlers error', e); }

  // Decide initial UI state:
  // 1) If dailyClaim_<userId> exists -> show wheel only
  // 2) Else if local participant exists AND participant exists in Firestore -> show wheel only
  // 3) Else show form only
  try {
    const userId = getUserId();
    const claimKey = `dailyClaim_${userId}`;
    const claim = JSON.parse(localStorage.getItem(claimKey) || '{}');
    if (claim && claim.claimDate && new Date(claim.claimDate).toDateString() === new Date().toDateString()) {
      // user spun today -> show wheel
      // load local participant if present to set window.currentParticipant
      try {
        const local = JSON.parse(localStorage.getItem('quesah_participant') || 'null');
        if (local) window.currentParticipant = local;
      } catch (e) { }
      window.participantConfirmed = true; // allow wheel because claim exists
      showWheelOnly();
      return;
    }

    // no claim today -> check local participant -> then check Firestore presence
    const stored = localStorage.getItem('quesah_participant');
    if (!stored) {
      // no local participant -> show form only
      showFormOnly();
      return;
    }

    // there is local participant, prefill and check Firestore
    const p = JSON.parse(stored);
    window.currentParticipant = p;
    prefillParticipantForm(p);

    // check Firestore for phone
    const exists = await checkParticipantExistsInFirestore(p.phone);
    if (exists) {
      window.participantConfirmed = true;
      showWheelOnly();
    } else {
      window.participantConfirmed = false;
      showFormOnly();
    }
  } catch (e) {
    console.warn('initial UI decision failed, default to form', e);
    showFormOnly();
  }
});

/* =========================
   Firestore participant existence check
   ========================= */

async function checkParticipantExistsInFirestore(phone) {
  try {
    if (!phone) return false;
    const phoneNorm = phone.replace(/[^0-9\+]/g, '');
    const snap = await db.collection('wheelParticipants').where('phone', '==', phoneNorm).limit(1).get();
    return !snap.empty;
  } catch (e) {
    console.warn('Firestore check participant failed:', e);
    return false;
  }
}

/* =========================
   Participant form helpers
   ========================= */

function prefillParticipantForm(participant = {}) {
  const nameEl = document.getElementById('p-name');
  const phoneEl = document.getElementById('p-phone');
  const emailEl = document.getElementById('p-email');
  const consent = document.getElementById('p-consent');

  if (nameEl && participant.name) nameEl.value = participant.name;
  if (phoneEl && participant.phone) phoneEl.value = participant.phone;
  if (emailEl && participant.email) emailEl.value = participant.email;
  if (consent) consent.checked = false; // require re-checking consent
  refreshParticipantSaveBtn();
}

function normalizePhone(p) { return (p || '').trim(); }

function validateParticipantInputs() {
  const nameEl = document.getElementById('p-name');
  const phoneEl = document.getElementById('p-phone');
  const emailEl = document.getElementById('p-email');
  const consent = document.getElementById('p-consent');

  const name = nameEl?.value || '';
  const phone = phoneEl?.value || '';
  const email = emailEl?.value || '';

  const errors = {};

  if (!name || name.trim().length < 2) errors.name = 'الاسم مطلوب (حروف، حرفان على الأقل).';

  const phoneNorm = normalizePhone(phone);
  const phoneDigits = phoneNorm.replace(/[^0-9\+]/g, '');
  if (!phoneDigits || phoneDigits.length < 7) errors.phone = 'رجاءً أدخل رقم هاتف صحيح (على الأقل 7 أرقام).';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'البريد الإلكتروني غير صالح.';

  if (!consent || !consent.checked) errors.consent = 'الموافقة مطلوبة.';

  return { ok: Object.keys(errors).length === 0, errors, values: { name: name.trim(), phone: phoneNorm.replace(/[^0-9\+]/g, ''), email: email.trim() } };
}

function showParticipantErrors(errors = {}) {
  const nameErr = document.getElementById('p-name-error');
  if (nameErr) {
    if (errors.name) { nameErr.textContent = errors.name; nameErr.classList.remove('hidden'); document.getElementById('p-name')?.setAttribute('aria-invalid', 'true'); }
    else { nameErr.classList.add('hidden'); document.getElementById('p-name')?.removeAttribute('aria-invalid'); }
  }
  const phoneErr = document.getElementById('p-phone-error');
  if (phoneErr) {
    if (errors.phone) { phoneErr.textContent = errors.phone; phoneErr.classList.remove('hidden'); document.getElementById('p-phone')?.setAttribute('aria-invalid', 'true'); }
    else { phoneErr.classList.add('hidden'); document.getElementById('p-phone')?.removeAttribute('aria-invalid'); }
  }
  const emailErr = document.getElementById('p-email-error');
  if (emailErr) {
    if (errors.email) { emailErr.textContent = errors.email; emailErr.classList.remove('hidden'); document.getElementById('p-email')?.setAttribute('aria-invalid', 'true'); }
    else { emailErr.classList.add('hidden'); document.getElementById('p-email')?.removeAttribute('aria-invalid'); }
  }
}

function refreshParticipantSaveBtn() {
  const btn = document.getElementById('participant-save-btn');
  if (!btn) return;
  const { ok } = validateParticipantInputs();
  if (ok) {
    btn.disabled = false;
    btn.classList.remove('bg-gray-300', 'cursor-not-allowed');
    btn.classList.add('bg-[#303590]', 'text-white');
    btn.textContent = 'حفظ ومتابعة';
  } else {
    btn.disabled = true;
    btn.classList.add('bg-gray-300', 'cursor-not-allowed');
    btn.classList.remove('bg-[#303590]', 'text-white');
    btn.textContent = 'املأ بياناتك أولاً';
  }
}

async function saveParticipant() {
  const { ok, errors, values } = validateParticipantInputs();
  showParticipantErrors(errors);
  if (!ok) return { ok: false, reason: 'validation', errors };

  const { name, phone, email } = values;
  const participant = { name, phone, email: email || null, acceptedAt: new Date().toISOString() };

  let savedToFirestore = false;
  let savedDocId = null;

  try {
    const phoneNorm = phone.replace(/[^0-9\+]/g, '');

    // أولًا: نتحقق إن كان هناك doc موجود بنفس الهاتف
    const snap = await db.collection('wheelParticipants').where('phone', '==', phoneNorm).limit(1).get();
    if (!snap.empty) {
      // حدث بالفعل مرّة -> نقوم بتحديث أول doc مطابق
      const docRef = snap.docs[0].ref;
      await docRef.update({
        name,
        email: email || null,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      savedDocId = docRef.id;
      savedToFirestore = true;
    } else {
      // لم نجده -> نضيف جديد
      const docRef = await db.collection('wheelParticipants').add({
        name,
        phone: phoneNorm,
        email: email || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      savedDocId = docRef.id;
      savedToFirestore = true;
    }
    console.info('participant saved/updated in Firestore', savedDocId);
  } catch (err) {
    console.warn('Failed to save participant to Firestore:', err);
    savedToFirestore = false;
  }

  // always save local copy (include seller doc id if known)
  try {
    const localCopy = { ...participant, id: savedDocId || null };
    localStorage.setItem('quesah_participant', JSON.stringify(localCopy));
    window.currentParticipant = localCopy;
  } catch (e) { console.warn('localStorage save failed', e); }

  if (savedToFirestore) {
    window.participantConfirmed = true;
    return { ok: true, participant: window.currentParticipant, savedToFirestore: true, docId: savedDocId };
  } else {
    window.participantConfirmed = false;
    return { ok: true, participant: window.currentParticipant, savedToFirestore: false, note: 'saved_local_only' };
  }
}


function onParticipantSaved(result) {
  // Only show wheel when Firestore save succeeded
  if (result && result.savedToFirestore) {
    showWheelOnly();
  } else {
    // keep form visible and inform user
    showFormOnly();
    alert('تم حفظ بياناتك محلياً، لكن لم نتمكّن من حفظها في الخادم الآن. الرجاء المحاولة مجدداً أو الاتصال بالدعم لإتمام التسجيل قبل تشغيل العجلة.');
  }
}

function initParticipantFormHandlers() {
  const nameEl = document.getElementById('p-name');
  const phoneEl = document.getElementById('p-phone');
  const emailEl = document.getElementById('p-email');
  const consent = document.getElementById('p-consent');
  const saveBtn = document.getElementById('participant-save-btn');

  [nameEl, phoneEl, emailEl, consent].forEach(el => {
    if (!el) return;
    el.addEventListener('input', refreshParticipantSaveBtn);
    el.addEventListener('change', refreshParticipantSaveBtn);
  });

  refreshParticipantSaveBtn();

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      saveBtn.disabled = true;
      saveBtn.textContent = 'جاري الحفظ...';
      const res = await saveParticipant();
      if (res.ok) {
        onParticipantSaved(res);
        saveBtn.disabled = false;
        saveBtn.textContent = 'حفظ ومتابعة';
      } else {
        alert('فشل حفظ البيانات. حاول مرة أخرى.');
        saveBtn.disabled = false;
        saveBtn.textContent = 'حفظ ومتابعة';
      }
    });
  }
}

/* =========================
   Wheel logic (requires Firestore-confirmed participant)
   ========================= */

function checkDailyLimitByPhone(phone) {
  try {
    const key = `quesah_lastSpin_${phone.replace(/[^0-9\+]/g, '')}`;
    const ts = localStorage.getItem(key);
    if (!ts) return false;
    const prev = new Date(ts);
    const now = new Date();
    return prev.getUTCFullYear() === now.getUTCFullYear() &&
      prev.getUTCMonth() === now.getUTCMonth() &&
      prev.getUTCDate() === now.getUTCDate();
  } catch (e) {
    return false;
  }
}

function setLastSpinPhone(phone) {
  try {
    const key = `quesah_lastSpin_${phone.replace(/[^0-9\+]/g, '')}`;
    localStorage.setItem(key, new Date().toISOString());
  } catch (e) { }
}

async function spinWheel() {
  // require Firestore-confirmed participant
  if (!window.participantConfirmed || !window.currentParticipant || !window.currentParticipant.phone) {
    alert('الرجاء إدخال بياناتك والضغط على "حفظ ومتابعة" (ويجب أن يكتمل التسجيل على الخادم) أولاً لبدء اللعب.');
    return;
  }

  if (checkDailyLimitByPhone(window.currentParticipant.phone)) {
    document.getElementById('daily-limit-message')?.classList.remove('hidden');
    return;
  }

  if (isSpinning || currentPrizes.length === 0) return;

  const today = new Date().toDateString();
  const userId = getUserId();
  const key = `dailyClaim_${userId}`;

  let last = {};
  try {
    const lastDoc = await db.collection('claims').doc(key).get();
    last = lastDoc.exists ? lastDoc.data() : {};
  } catch (e) {
    console.warn('Could not fetch last claim from Firestore:', e);
  }

  if (last.claimDate && new Date(last.claimDate).toDateString() === today) {
    alert('لقد استخدمت عجلة الحظ اليوم! يمكنك المحاولة مرة أخرى غداً');
    return;
  }

  // selection logic
  const prizesSnapshot = [...currentPrizes];
  const n = prizesSnapshot.length;
  if (n < 6) { alert('يجب أن تحتوي العجلة على 6 جوائز على الأقل'); return; }

  const weights = prizesSnapshot.map(p => {
    const raw = p.weight ?? 1;
    const num = Number(raw);
    return (isFinite(num) && num > 0) ? num : 0;
  });

  const totalWeight = weights.reduce((s, w) => s + w, 0);
  if (totalWeight <= 0) { alert('مشكلة في أوزان الجوائز: مجموع الأوزان صفر أو غير صالح.'); return; }

  const rInt = Math.floor(Math.random() * totalWeight) + 1;
  let cum = 0; let chosen = weights.length - 1;
  for (let i = 0; i < weights.length; i++) { cum += weights[i]; if (rInt <= cum) { chosen = i; break; } }
  if (typeof chosen !== 'number' || chosen < 0 || chosen >= n) chosen = 0;

  isSpinning = true;
  const btn = document.getElementById('spin-button');
  if (btn) { btn.disabled = true; btn.textContent = 'جاري التدوير...'; }

  const segA = 2 * Math.PI / n;
  const pointer = -Math.PI / 2;
  const TAU = 2 * Math.PI;
  const centerOfChosen = (chosen + 0.5) * segA;
  const finalTargetMod = ((pointer - centerOfChosen) % TAU + TAU) % TAU;
  const currentMod = ((wheelAngle % TAU) + TAU) % TAU;
  let delta = (finalTargetMod - currentMod + TAU) % TAU;
  const extraFullRotations = 4;
  const totalRot = delta + extraFullRotations * TAU;

  const start = wheelAngle;
  const duration = 3000;
  const t0 = Date.now();

  function animate() {
    const t = Math.min((Date.now() - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    wheelAngle = start + totalRot * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelAngle = start + totalRot;
      drawWheel();

      setTimeout(async () => {
        const landedIndex = chosen;
        const landedPrize = prizesSnapshot[landedIndex];
        if (!landedPrize) {
          alert('حدث خطأ في تحديد الجائزة — يرجى المحاولة لاحقاً.');
          isSpinning = false;
          if (btn) { btn.disabled = false; btn.textContent = 'تدوير العجلة'; }
          return;
        }

        // === HERE: include participant data in the claim so dashboard can link them ===
        const newClaim = {
          userId,
          prizeName: landedPrize.name,
          prizeIcon: landedPrize.icon,
          prizeMessage: landedPrize.message || '',
          // keep compatibility: claimDate as ISO string (so existing code keeps working)
          claimDate: new Date().toISOString(),
          // attach participant info (if available)
          participantName: window.currentParticipant?.name || null,
          participantPhone: window.currentParticipant?.phone || null,
          participantEmail: window.currentParticipant?.email || null
        };

        try { await db.collection('claims').doc(key).set(newClaim); } catch (e) { console.warn('Failed to write claim to Firestore', e); }
        try { localStorage.setItem(key, JSON.stringify(newClaim)); } catch (e) { console.warn('Failed to save claim to localStorage', e); }

        if (window.currentParticipant && window.currentParticipant.phone) {
          setLastSpinPhone(window.currentParticipant.phone);
        }

        loadClaims();
        showPrizeModal(landedPrize);

        isSpinning = false;
        if (btn) { btn.disabled = false; btn.textContent = 'تدوير العجلة'; }
      }, 500);
    }
  }

  animate();
}


/* =========================
   Prize modal / share / clipboard
   ========================= */

function showPrizeModal(prize) {
  document.getElementById('prize-icon') && (document.getElementById('prize-icon').textContent = prize.icon || '');
  document.getElementById('prize-name') && (document.getElementById('prize-name').textContent = prize.name || '');
  document.getElementById('prize-message') && (document.getElementById('prize-message').textContent = prize.message || '');
  document.getElementById('prize-modal') && document.getElementById('prize-modal').classList.remove('hidden');
  window.currentPrize = prize;
}

function closePrizeModal() {
  document.getElementById('prize-modal')?.classList.add('hidden');
  window.currentPrize = null;
  closeWheelModal();
}

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
    navigator.clipboard.writeText(message).then(() => { alert('تم نسخ محتوى القصة!'); }).catch(() => { fallbackCopyToClipboard(message); });
  } else { fallbackCopyToClipboard(message); }
}

function copyToClipboard() {
  const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(storyUrl).then(() => { alert('تم نسخ الرابط بنجاح!'); }).catch(() => { fallbackCopyToClipboard(storyUrl); });
  } else { fallbackCopyToClipboard(storyUrl); }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try { document.execCommand('copy'); alert('تم النسخ!'); } catch (err) { alert('فشل في النسخ. الرجاء نسخه يدوياً: ' + text); }
  document.body.removeChild(textArea);
}

/* =========================
   Utilities, fetchers, draw & event listeners
   ========================= */

function getUserId() {
  let uid = localStorage.getItem('userId');
  if (!uid) {
    uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', uid);
  }
  return uid;
}

async function openWheelModal() {
  const modal = document.getElementById('wheel-modal');
  const dailyMsg = document.getElementById('daily-limit-message');
  const spinBtn = document.getElementById('spin-button');
  const dailyPrizeEl = document.getElementById('daily-prize');

  try { initParticipantFormHandlers(); } catch (e) { /* ignore */ }

  // If claim exists for today -> show wheel
  const userId = getUserId();
  const claimKey = `dailyClaim_${userId}`;
  const claim = JSON.parse(localStorage.getItem(claimKey) || '{}');
  if (claim && claim.claimDate && new Date(claim.claimDate).toDateString() === new Date().toDateString()) {
    window.participantConfirmed = true;
    showWheelOnly();
    if (dailyMsg) dailyMsg.classList.remove('hidden');
    if (spinBtn) spinBtn.classList.add('hidden');
    if (dailyPrizeEl) {
      const msg = claim.prizeMessage || (currentPrizes.find(p => p.name === claim.prizeName)?.message) || '';
      dailyPrizeEl.innerHTML = `
        <div class="mt-2 p-2 bg-white rounded-lg shadow-sm">
          <div class="text-4xl">${claim.prizeIcon}</div>
          <h3 class="text-xl font-semibold mt-2">${claim.prizeName}</h3>
          <p class="text-sm text-gray-700 mt-1">${msg}</p>
        </div>
      `;
    }
    if (modal) { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
    return;
  }

  // else: if we have local participant, check Firestore presence
  try {
    if (!window.participantConfirmed) {
      const stored = JSON.parse(localStorage.getItem('quesah_participant') || 'null');
      if (stored && stored.phone) {
        const exists = await checkParticipantExistsInFirestore(stored.phone);
        if (exists) {
          window.currentParticipant = stored;
          window.participantConfirmed = true;
          showWheelOnly();
        } else {
          window.participantConfirmed = false;
          showFormOnly();
        }
      } else {
        showFormOnly();
      }
    } else {
      showWheelOnly();
    }
  } catch (e) {
    console.warn('openWheelModal participant check error', e);
    showFormOnly();
  }

  if (modal) { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}

function closeWheelModal() {
  document.getElementById('wheel-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
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
  try { await db.collection('claims').doc(docKey).set(newClaim); } catch (e) { console.warn('Failed to save claim to Firestore', e); }
  try { localStorage.setItem(docKey, JSON.stringify(newClaim)); } catch (e) { /* ignore */ }
  alert(`تم استلام جائزتك: ${newClaim.prizeName}`);
  closePrizeModal();
  closeWheelModal();
}

async function loadClaims() {
  const container = document.getElementById('claims-list');
  if (!container) return;
  container.innerHTML = '<div class="text-gray-500 text-center py-8">جاري التحميل...</div>';
  const claims = await fetchAllClaims();
  if (!claims || claims.length === 0) {
    container.innerHTML = '<div class="text-gray-500 text-center py-8">لا توجد مطالبات</div>';
    return;
  }
  container.innerHTML = claims.map(c => `
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
  try { await db.collection('claims').doc(`dailyClaim_${userId}`).delete(); } catch (e) { console.warn('Failed to delete claim', e); }
  loadClaims();
}

async function clearAllClaims() {
  if (!confirm('مسح جميع المطالبات؟')) return;
  try {
    const snap = await db.collection('claims').get();
    const batch = db.batch();
    snap.forEach(d => batch.delete(d.ref));
    await batch.commit();
  } catch (e) { console.warn('Failed to clear all claims', e); }
  loadClaims();
}

/* Fetchers */
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
    const snap = await db.collection('claims').orderBy('claimDate', 'desc').get();
    return snap.docs.map(d => d.data());
  } catch (e) {
    console.error('Error loading claims:', e);
    return [];
  }
}

/* Draw wheel */
function initializeWheel() {
  wheelCanvas = document.getElementById('wheel-canvas');
  if (wheelCanvas) {
    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
  }
}

function drawWheel() {
  if (!wheelCtx || !currentPrizes || currentPrizes.length === 0) return;
  const cx = wheelCanvas.width / 2;
  const cy = wheelCanvas.height / 2;
  const outerR = Math.min(cx, cy) - 5;
  const innerR = 45;
  const segA = (2 * Math.PI) / currentPrizes.length;
  const colors = ['#565BB6', '#6366F1', '#8B5CF6', '#A855F7', '#C084FC', '#D8B4FE', '#E0E7FF', '#EEF2FF'];

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

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
    const end = start + segA;
    const color = colors[i % colors.length];

    wheelCtx.beginPath();
    wheelCtx.moveTo(cx, cy);
    wheelCtx.arc(cx, cy, outerR, start, end);
    wheelCtx.fillStyle = color;
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#fff';
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();

    wheelCtx.save();
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(start + segA / 2);

    wheelCtx.textAlign = 'center';
    wheelCtx.textBaseline = 'middle';
    wheelCtx.fillStyle = '#fff';
    wheelCtx.font = 'bold 14px Tajawal, Cairo, Arial, sans-serif';
    const maxTextW = outerR * 0.68;
    const lines = wrapText(wheelCtx, p.name, maxTextW);
    const lh = 16;
    const totalH = Math.max(lh, lines.length * lh);
    const textX = outerR * 0.65;
    const textY = 0;
    const pad = 6;
    const widest = lines.reduce((w, line) => Math.max(w, wheelCtx.measureText(line).width), 0);
    const bgX = textX - widest / 2 - pad;
    const bgY = textY - totalH / 2 - pad;
    const bgW = widest + pad * 2;
    const bgH = totalH + pad * 2;
    wheelCtx.save();
    roundRect(wheelCtx, bgX, bgY, bgW, bgH, 8);
    wheelCtx.lineWidth = 1;
    wheelCtx.restore();

    wheelCtx.fillStyle = '#fff';
    wheelCtx.shadowColor = 'rgba(0,0,0,0.6)';
    wheelCtx.shadowBlur = 4;
    wheelCtx.shadowOffsetX = 0;
    wheelCtx.shadowOffsetY = 1;
    for (let j = 0; j < lines.length; j++) {
      const lineY = textY - (totalH - lh) / 2 + j * lh;
      wheelCtx.lineWidth = 3;
      wheelCtx.strokeStyle = 'rgba(0,0,0,0.35)';
      wheelCtx.strokeText(lines[j], textX, lineY);
      wheelCtx.fillText(lines[j], textX, lineY);
    }
    wheelCtx.restore();
  });

  wheelCtx.beginPath();
  wheelCtx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  wheelCtx.fillStyle = '#fff';
  wheelCtx.fill();
  wheelCtx.strokeStyle = '#aaa';
  wheelCtx.lineWidth = 4;
  wheelCtx.stroke();

  wheelCtx.fillStyle = '#333';
  wheelCtx.font = 'bold 18px Arial';
  wheelCtx.textAlign = 'center';
  wheelCtx.fillText('حظّاً سعيداً', cx, cy + 6);
}

/* Event listeners / accessibility */
document.getElementById('wheel-modal')?.addEventListener('click', function (e) {
  if (!e.target.closest('.fade-in')) { closeWheelModal(); }
});
document.getElementById('prize-modal')?.addEventListener('click', function (e) {
  if (!e.target.closest('.fade-in')) { closePrizeModal(); }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { closeWheelModal(); closePrizeModal(); }
});
window.addEventListener('storage', function (e) {
  if (e.key === 'wheelPrizes') {
    try { currentPrizes = JSON.parse(e.newValue || '[]'); } catch (err) { currentPrizes = []; }
    if (wheelCtx) drawWheel();
  }
});
// prevent mobile touch scrolling inside canvas area
document.addEventListener('touchstart', function (e) {
  if (e.target && e.target.closest && e.target.closest('#wheel-canvas')) {
    e.preventDefault();
  }
}, { passive: false });

