
async function spinWheel() {
  if (isSpinning || currentPrizes.length === 0) return;

  // حد يومي
  const today    = new Date().toDateString();
  const userId   = getUserId();
  const key      = dailyClaim_${userId};
  // جلب آخر Claim من Firestore
const lastDoc = await db.collection('claims').doc(key).get();
const last = lastDoc.exists ? lastDoc.data() : {};

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