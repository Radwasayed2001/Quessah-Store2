# إصلاح مشكلة عرض القصة والخيارات

## المشكلة
- القصة لا تظهر
- الخيارات لا تظهر
- لا يمكن الانتقال للمشهد التالي

## السبب
تم حذف الجزء المسؤول عن إنشاء HTML للقصة والخيارات في دالة `displayStoryStep()` أثناء إضافة تحسينات استمرارية الشخصية.

## الحل المطبق

### إضافة HTML للقصة والخيارات
```javascript
// إنشاء HTML للقصة والخيارات
let html = `
  <div class="min-h-[70vh] flex items-center justify-center py-8 animate-fade-in">
    <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center animate-bounce-in">
      <div class="mb-6">
        <div class="text-4xl mb-4">📖</div>
        <div class="font-bold text-base sm:text-xl mb-3 sm:mb-4 text-gray-800">${step.text}</div>
      </div>
      <div class="p-2 sm:p-4 md:p-6">
        <div class="font-bold text-base sm:text-xl mb-3 sm:mb-4 text-gray-800">ماذا يفعل بطل القصة؟</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 sm:mb-6">
`;

// إضافة الخيارات
if (step.options && step.options.length > 0) {
    step.options.forEach((option, index) => {
        html += `
          <button 
            class="option-btn w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition text-right text-sm sm:text-base"
            data-next-step="${option.nextStep}"
            type="button"
          >
            ${option.label}
          </button>
        `;
    });
}

// إضافة زر التالي
html += `
        </div>
        <button id="next-btn" class="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 rounded-lg py-3 font-semibold cursor-not-allowed mt-4" disabled>
          التالي
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
`;

storyContainer.innerHTML = html;
```

### تفعيل منطق اختيار الخيارات
```javascript
// تفعيل منطق اختيار الخيار وزر التالي
const optionBtns = storyContainer.querySelectorAll('button.option-btn');
const nextBtn = storyContainer.querySelector('#next-btn');
let selectedNextStep = null;
this.lastChosenOptionLabel = '';

optionBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    optionBtns.forEach(b => b.classList.remove('ring', 'ring-purple-400', 'bg-purple-50', 'aria-pressed'));
    this.classList.add('ring', 'ring-purple-400', 'bg-purple-50');
    this.setAttribute('aria-pressed', 'true');
    selectedNextStep = this.getAttribute('data-next-step');
    nextBtn.disabled = false;
    nextBtn.classList.remove('text-gray-400', 'bg-gray-100', 'cursor-not-allowed');
    nextBtn.classList.add('text-white', 'bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer');
    // خزّن نص الخيار المختار
    if (typeof window.interactiveStories !== 'undefined') {
      window.interactiveStories.lastChosenOptionLabel = this.textContent.trim();
    }
  });
});

nextBtn.addEventListener('click', () => {
  if (selectedNextStep) {
    this.selectOption(selectedNextStep);
  }
});
```

## النتيجة
- ✅ القصة تظهر بشكل صحيح
- ✅ الخيارات تظهر وتعمل
- ✅ يمكن الانتقال للمشهد التالي
- ✅ استمرارية الشخصية محفوظة

## الملفات المحدثة
- `main.js`: إصلاح دالة `displayStoryStep()`
- `test-story-display.html`: ملف اختبار للعرض
- `STORY_DISPLAY_FIX.md`: هذا الملف

## كيفية الاختبار
1. افتح `test-story-display.html`
2. اضغط "اختبار عرض القصة"
3. ستجد القصة والخيارات تعمل بشكل صحيح 