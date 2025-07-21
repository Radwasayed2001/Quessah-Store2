// Interactive Stories Application
// Main JavaScript file for handling story generation and flow

class InteractiveStories {
    constructor() {
        this.heroName = '';
        this.storyType = '';
        this.storySteps = [];
        this.currentStep = 0;
        this.currentStepKey = 'step1'; // Track the current step key for AI stories
        this.lastAIParsed = null; // Store last parsed AI JSON for navigation
        this.storyPages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupStoryTypeSelection();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Hero name input validation
        const heroNameInput = document.getElementById('heroName');
        const startButton = document.getElementById('startButton');

        if (heroNameInput && startButton) {
            heroNameInput.addEventListener('input', () => {
                this.heroName = heroNameInput.value.trim();
                this.validateForm();
            });
        }

        // Start button click handler
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startStory();
            });
        }

        // Share buttons
        // const shareFb = document.getElementById('share-fb');
        // const shareWa = document.getElementById('share-wa');
        // const shareTwitter = document.getElementById('share-twitter');
        // const shareCopy = document.getElementById('share-copy');

        // if (shareFb) {
        //     shareFb.addEventListener('click', () => this.shareStory('facebook'));
        // }

        // if (shareWa) {
        //     shareWa.addEventListener('click', () => this.shareStory('whatsapp'));
        // }

        // if (shareTwitter) {
        //     shareTwitter.addEventListener('click', () => this.shareStory('twitter'));
        // }

        // if (shareCopy) {
        //     shareCopy.addEventListener('click', () => this.shareStory('copy'));
        // }
    }

    // Setup story type selection with visual feedback
    setupStoryTypeSelection() {
        const storyCards = document.querySelectorAll('.tilt-card');
        
        storyCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                storyCards.forEach(c => c.classList.remove('ring-2', 'ring-[#565BB6]', 'bg-[#898EE9]'));
                
                // Add active class to selected card
                card.classList.add('ring-2', 'ring-[#565BB6]', 'bg-[#898EE9]');
                
                // Set story type based on card index
                const storyTypes = ['Adventure', 'Fantasy', 'Comedy', 'Mystery'];
                this.storyType = storyTypes[index];
                
                this.validateForm();
            });
        });
    }

    // Validate form and enable/disable start button
    validateForm() {
        const startButton = document.getElementById('startButton');
        
        if (startButton) {
            const isValid = this.heroName.length > 0 && this.storyType.length > 0;
            startButton.disabled = !isValid;
            
            if (isValid) {
                startButton.classList.remove('opacity-50', 'cursor-not-allowed');
                startButton.classList.add('hover:bg-[#303590]', 'cursor-pointer');
            } else {
                startButton.classList.add('opacity-50', 'cursor-not-allowed');
                startButton.classList.remove('hover:bg-[#303590]', 'cursor-pointer');
            }
        }
    }

    // Start the story generation process
    async startStory() {
        if (!this.heroName || !this.storyType) {
            alert('يرجى إدخال اسم البطل واختيار نوع القصة');
            return;
        }

        this.showLoadingState();
        this.switchToStoryScreen();

        // Reset story steps and messages
        this.storySteps = [];
        this.currentStep = 0;
        this.currentStepKey = 'step1';
        this.lastAIParsed = null;

        // inside startStory method or wherever you define this.messages:
        this.messages = [
            {
              role: "system",
              content: `
          أنت مساعد ذكاء اصطناعي مهمتك إنتاج مشهد واحد فقط (المشهد رقم "1") من القصة التفاعلية باللغة العربية بصيغة JSON خالصة، بدون أي مقدمات أو شروحات. الهيكل المطلوب:
          {
            "1": {
              "text": "... نص المشهد 1 ...",
              "options": [
                { "label": "... نص الخيار الأول ...", "nextStep": "2" },
                { "label": "... نص الخيار الثاني ...", "nextStep": "3" }
              ]
            }
          }
          - لا تُخرِج أي مفتاح آخر غير "1".
          - لا تضف أي نص خارج كائن JSON هذا.
          `
            },
            {
              role: "user",
              content: `act like an expert story writer and ابدأ قصة تفاعلية بالعربية اكتب القصة بشكل احترافي يجعل المستخدم مستمتع بالقصة، بطلها اسمه ${this.heroName}، ونوعها ${this.storyType}. أرسل فقط المشهد الأول بصيغة JSON كما وضّحت.`
            }
          ];
          
  

        try {
            const storyStep = await this.generateStoryStep();
            this.displayStoryStep(storyStep);
            this.hideLoadingState();
        } catch (error) {
            console.error('Error starting story:', error);
            // Fallback to local stories if API fails
            const storyStep = this.generateLocalStoryStep();
            this.displayStoryStep(storyStep);
            this.hideLoadingState();
        }
    }

    // Generate story step via API with OpenRouter
    async generateStoryStep() {
        const requestBody = {
            messages: this.messages,
            temperature: 0.8,
        top_p: 1.0,
        max_tokens: 2048
        };

        let response;
        try {
        response = await fetch('https://chat-api-zeta-indol.vercel.app/api/chat', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(`API fetch failed: ${response.status} ${errorText}`);
            }
        } catch (err) {
        throw new Error('API call failed: ' + err.message);
    }

        const data = await response.json();
        const content =
            data.choices?.[0]?.message?.content ||
            data.content ||
            data.message ||
            data.text;

        this.messages.push({ role: 'assistant', content });

        const step = this.parseStoryStep(content, this.currentStepKey);
        if (!step) throw new Error('Failed to parse story step');
        return step;
    }


    // Generate local story step as fallback
    generateLocalStoryStep() {
        const stepNumber = this.currentStep + 1;
        this.currentStep = stepNumber;

        const storyTemplates = {
            'Adventure': {
                1: {
                    text: `في يوم مشمس جميل، قرر ${this.heroName} الذهاب في مغامرة مثيرة. ارتدى ${this.heroName} حقيبة السفر وبدأ رحلته نحو الغابة الغامضة. عند وصوله، وجد ${this.heroName} طريقين مختلفين أمامه.`,
                    options: [
                        { label: 'اتجه نحو الضوء الذهبي في الشرق', nextStep: 2 },
                        { label: 'اتجه نحو الصوت الغريب في الغرب', nextStep: 3 }
                    ]
                },
                2: {
                    text: `اختار ${this.heroName} الطريق نحو الضوء الذهبي. بعد مسيرة قصيرة، وجد ${this.heroName} شجرة عملاقة تلمع بألوان ذهبية. تحت الشجرة، وجد ${this.heroName} صندوقاً غامضاً.`,
                    options: [
                        { label: 'افتح الصندوق الغامض', nextStep: 4 },
                        { label: 'اتجه نحو الصوت في الغرب', nextStep: 3 }
                    ]
                },
                3: {
                    text: `اتجه ${this.heroName} نحو الصوت الغريب في الغرب. وجد ${this.heroName} كهفاً مظلماً يخرج منه صوت غريب. ${this.heroName} يشعر بالفضول والخوف في نفس الوقت.`,
                    options: [
                        { label: 'ادخل الكهف ببطء', nextStep: 5 },
                        { label: 'عد للطريق الآخر', nextStep: 2 }
                    ]
                },
                4: {
                    text: `فتح ${this.heroName} الصندوق الغامض بيديه المرتعشتين. داخل الصندوق، وجد ${this.heroName} خريطة قديمة تظهر كنزاً مخبأً في أعماق الغابة. ${this.heroName} يشعر بالإثارة!`,
                    options: [
                        { label: 'اتبع الخريطة للكنز', nextStep: 6 },
                        { label: 'عد للكهف الغامض', nextStep: 5 }
                    ]
                },
                5: {
                    text: `دخل ${this.heroName} الكهف بحذر. في الظلام، سمع ${this.heroName} صوت خرير ماء. بعد خطوات قليلة، وجد ${this.heroName} بحيرة صغيرة تحت الأرض تلمع باللون الأزرق.`,
                    options: [
                        { label: 'استكشف البحيرة', nextStep: 7 },
                        { label: 'عد للخريطة', nextStep: 4 }
                    ]
                },
                6: {
                    text: `تبع ${this.heroName} الخريطة بدقة. بعد مسيرة طويلة، وصل ${this.heroName} إلى شجرة ضخمة قديمة. تحت جذور الشجرة، وجد ${this.heroName} كنزاً لامعاً!`,
                    options: [
                        { label: 'خذ الكنز وعد للقرية', nextStep: 'complete' },
                        { label: 'اتجه للبحيرة أولاً', nextStep: 7 }
                    ]
                },
                7: {
                    text: `اقترب ${this.heroName} من البحيرة ببطء. في الماء، رأى ${this.heroName} أسماكاً ملونة تسبح بفرح. فجأة، ظهرت سمكة ذهبية كبيرة وبدأت تتحدث مع ${this.heroName}!`,
                    options: [
                        { label: 'تحدث مع السمكة الذهبية', nextStep: 8 },
                        { label: 'عد للكنز', nextStep: 6 }
                    ]
                },
                8: {
                    text: `قالت السمكة الذهبية لـ ${this.heroName}: "أهلاً بك! أنا حارسة هذه البحيرة. إذا ساعدتني في تنظيف البحيرة، سأمنحك قوة خاصة." ${this.heroName} وافق بفرح!`,
                    options: [
                        { label: 'ساعد السمكة ونل القوة', nextStep: 'complete' },
                        { label: 'عد للكنز', nextStep: 6 }
                    ]
                }
            },
            'Fantasy': {
                1: {
                    text: `في عالم سحري بعيد، عاش ${this.heroName} في قرية صغيرة هادئة. ذات يوم، ظهر ساحر غامض في القرية وأخبر ${this.heroName} أن لديه قوة سحرية خاصة في دمه. ${this.heroName} لم يصدق ما سمعه!`,
                    options: [
                        { label: 'اقبل القوة السحرية', nextStep: 2 },
                        { label: 'رفض وابق في القرية', nextStep: 3 }
                    ]
                },
                2: {
                    text: `قبل ${this.heroName} القوة السحرية بفرح. شعر ${this.heroName} بطاقة غريبة تتدفق في جسده. الساحر أعطى ${this.heroName} عصا سحرية وقال: "هذه العصا ستساعدك في رحلتك."`,
                    options: [
                        { label: 'تعلم السحر', nextStep: 4 },
                        { label: 'اذهب للقلعة السحرية', nextStep: 5 }
                    ]
                },
                3: {
                    text: `رفض ${this.heroName} القوة السحرية خوفاً من المجهول. لكن في الليل، رأى ${this.heroName} حلماً غريباً عن تنين يهدد القرية. ${this.heroName} شعر بالمسؤولية.`,
                    options: [
                        { label: 'غير رأيك واقبل القوة', nextStep: 2 },
                        { label: 'واجه التنين بدون سحر', nextStep: 6 }
                    ]
                },
                4: {
                    text: `بدأ ${this.heroName} يتعلم السحر مع الساحر. تعلم ${this.heroName} كيف يطير ويشعل النار بيديه. الساحر قال: "أنت تتعلم بسرعة مذهلة!"`,
                    options: [
                        { label: 'واجه التنين الآن', nextStep: 7 },
                        { label: 'تعلم المزيد من السحر', nextStep: 8 }
                    ]
                },
                5: {
                    text: `سافر ${this.heroName} إلى القلعة السحرية. عند وصوله، وجد ${this.heroName} قلعة عظيمة تلمع باللون الأزرق. في البوابة، وقف حارس سحري.`,
                    options: [
                        { label: 'تحدث مع الحارس', nextStep: 9 },
                        { label: 'ادخل القلعة بالقوة', nextStep: 10 }
                    ]
                },
                6: {
                    text: `قرر ${this.heroName} مواجهة التنين بدون سحر. أخذ ${this.heroName} سيفاً قديماً وذهب للجبل حيث يعيش التنين. ${this.heroName} يشعر بالخوف لكنه شجاع.`,
                    options: [
                        { label: 'واجه التنين بالشجاعة', nextStep: 'complete' },
                        { label: 'عد وتعلم السحر', nextStep: 2 }
                    ]
                },
                7: {
                    text: `طار ${this.heroName} نحو الجبل حيث يعيش التنين. عند وصوله، وجد ${this.heroName} تنيناً ضخماً يهدد القرية. ${this.heroName} استخدم سحره وأوقف التنين!`,
                    options: [
                        { label: 'انتهت المغامرة بنجاح', nextStep: 'complete' },
                        { label: 'تعلم المزيد من السحر', nextStep: 8 }
                    ]
                },
                8: {
                    text: `تعلم ${this.heroName} المزيد من السحر المتقدم. تعلم ${this.heroName} كيف يتحول إلى حيوان ويشفي الجروح. أصبح ${this.heroName} أقوى ساحر في المنطقة!`,
                    options: [
                        { label: 'واجه التنين الآن', nextStep: 7 },
                        { label: 'علّم الآخرين السحر', nextStep: 'complete' }
                    ]
                },
                9: {
                    text: `تحدث ${this.heroName} مع الحارس السحري. الحارس قال: "أهلاً بك! أنت الساحر الجديد. داخل القلعة، ستجد مكتبة سحرية عظيمة."`,
                    options: [
                        { label: 'ادخل المكتبة السحرية', nextStep: 11 },
                        { label: 'واجه التنين', nextStep: 7 }
                    ]
                },
                10: {
                    text: `حاول ${this.heroName} دخول القلعة بالقوة. لكن الحارس السحري أوقفه وقال: "لا يمكن دخول القلعة بدون إذن. عليك أن تثبت أنك ساحر حقيقي."`,
                    options: [
                        { label: 'أظهر قوتك السحرية', nextStep: 9 },
                        { label: 'عد وتعلم السحر', nextStep: 4 }
                    ]
                },
                11: {
                    text: `دخل ${this.heroName} المكتبة السحرية. وجد ${this.heroName} آلاف الكتب السحرية. في وسط المكتبة، وجد ${this.heroName} كتاباً قديماً يلمع باللون الذهبي.`,
                    options: [
                        { label: 'اقرأ الكتاب الذهبي', nextStep: 'complete' },
                        { label: 'واجه التنين', nextStep: 7 }
                    ]
                }
            },
            'Comedy': {
                1: {
                    text: `في صباح يوم عادي، استيقظ ${this.heroName} ليجد أن كل شيء في المنزل أصبح مقلوباً رأساً على عقب! حتى القط يتحدث الآن ويطلب فطوراً فاخراً. ${this.heroName} لا يعرف ماذا حدث!`,
                    options: [
                        { label: 'حاول إصلاح الوضع', nextStep: 2 },
                        { label: 'استمتع باليوم المقلوب', nextStep: 3 }
                    ]
                },
                2: {
                    text: `حاول ${this.heroName} إصلاح الوضع بكل الطرق. حاول ${this.heroName} إعادة الأثاث لوضعه الصحيح، لكن كل شيء يعود مقلوباً مرة أخرى. حتى الثلاجة تتحدث الآن!`,
                    options: [
                        { label: 'تحدث مع الثلاجة', nextStep: 4 },
                        { label: 'استسلم واستمتع', nextStep: 3 }
                    ]
                },
                3: {
                    text: `قرر ${this.heroName} الاستمتاع باليوم المقلوب. رقص ${this.heroName} مع القط المتحدث وغنى مع الثلاجة. فجأة، دق الباب وظهر جار ${this.heroName} يرتدي ملابس النوم في الشارع!`,
                    options: [
                        { label: 'ساعد الجار', nextStep: 5 },
                        { label: 'اختبئ في المنزل', nextStep: 6 }
                    ]
                },
                4: {
                    text: `تحدث ${this.heroName} مع الثلاجة. قالت الثلاجة: "أهلاً! أنا جائعة. هل لديك آيس كريم؟" ${this.heroName} فتح الثلاجة ووجد أن كل شيء أصبح آيس كريم!`,
                    options: [
                        { label: 'أطعم الثلاجة', nextStep: 7 },
                        { label: 'اتجه للشارع', nextStep: 5 }
                    ]
                },
                5: {
                    text: `خرج ${this.heroName} لمساعدة الجار. وجد ${this.heroName} أن الجار يرتدي ملابس النوم في الشارع ويقول: "أين بيتي؟" ${this.heroName} حاول مساعدته لكن كل شيء مقلوب!`,
                    options: [
                        { label: 'ساعد الجار في العودة', nextStep: 8 },
                        { label: 'عد للمنزل', nextStep: 6 }
                    ]
                },
                6: {
                    text: `اختبأ ${this.heroName} في المنزل خوفاً من الفوضى. لكن القط المتحدث قال: "لا تخف! اليوم المقلوب ممتع جداً!" ${this.heroName} بدأ يضحك من الموقف.`,
                    options: [
                        { label: 'استمتع بالفوضى', nextStep: 9 },
                        { label: 'حاول إصلاح كل شيء', nextStep: 8 }
                    ]
                },
                7: {
                    text: `أطعم ${this.heroName} الثلاجة بالآيس كريم. قالت الثلاجة: "شكراً لك! الآن سأعيد كل شيء لوضعه الصحيح." فجأة، عاد كل شيء لوضعه الطبيعي!`,
                    options: [
                        { label: 'انتهت المغامرة', nextStep: 'complete' },
                        { label: 'استمتع بالآيس كريم', nextStep: 9 }
                    ]
                },
                8: {
                    text: `ساعد ${this.heroName} الجار في العودة لبيته. لكن وجد ${this.heroName} أن بيت الجار أصبح مقلوباً أيضاً! قرر ${this.heroName} أن هذا اليوم غريب جداً.`,
                    options: [
                        { label: 'اضحك من الموقف', nextStep: 'complete' },
                        { label: 'حاول إصلاح كل شيء', nextStep: 7 }
                    ]
                },
                9: {
                    text: `استمتع ${this.heroName} بالفوضى المضحكة. رقص ${this.heroName} مع القط وغنى مع الثلاجة وضحك مع الجار. أصبح ${this.heroName} أسعد شخص في العالم!`,
                    options: [
                        { label: 'انتهت المغامرة المضحكة', nextStep: 'complete' },
                        { label: 'استمتع أكثر', nextStep: 10 }
                    ]
                },
                10: {
                    text: `استمر ${this.heroName} في الاستمتاع باليوم المقلوب. حتى أن ${this.heroName} بدأ يتحدث مع النباتات في الحديقة! النباتات أخبرت ${this.heroName} نكاتاً مضحكة.`,
                    options: [
                        { label: 'انتهت المغامرة', nextStep: 'complete' },
                        { label: 'استمتع أكثر', nextStep: 9 }
                    ]
                }
            },
            'Mystery': {
                1: {
                    text: `في منزل قديم غامض، وجد ${this.heroName} رسالة غريبة مكتوبة على الحائط باللون الأحمر. الرسالة تقول: "الحقيقة في الطابق السفلي. لا تثق بأحد." ${this.heroName} يشعر بالفضول والخوف.`,
                    options: [
                        { label: 'اذهب للطابق السفلي', nextStep: 2 },
                        { label: 'اتصل بالشرطة', nextStep: 3 }
                    ]
                },
                2: {
                    text: `نزل ${this.heroName} للطابق السفلي بحذر. في الظلام، وجد ${this.heroName} باباً مقفلاً عليه علامة غريبة. سمع ${this.heroName} صوت خطوات قادمة من خلفه!`,
                    options: [
                        { label: 'افتح الباب المقفل', nextStep: 4 },
                        { label: 'عد للأعلى بسرعة', nextStep: 3 }
                    ]
                },
                3: {
                    text: `قرر ${this.heroName} الاتصال بالشرطة. لكن الهاتف لا يعمل! وجد ${this.heroName} رسالة أخرى تقول: "لا تثق بالشرطة. هم جزء من المؤامرة." ${this.heroName} يشعر بالارتباك.`,
                    options: [
                        { label: 'تحقق من الهاتف', nextStep: 5 },
                        { label: 'اذهب للطابق السفلي', nextStep: 2 }
                    ]
                },
                4: {
                    text: `فتح ${this.heroName} الباب المقفل بيديه المرتعشتين. داخل الغرفة، وجد ${this.heroName} مكتبة قديمة مليئة بالكتب الغامضة. في وسط الغرفة، وجد ${this.heroName} مخطوطة قديمة.`,
                    options: [
                        { label: 'اقرأ المخطوطة', nextStep: 6 },
                        { label: 'ابحث في المكتبة', nextStep: 7 }
                    ]
                },
                5: {
                    text: `تحقق ${this.heroName} من الهاتف. وجد ${this.heroName} أن الأسلاك مقطوعة! سمع ${this.heroName} صوت خطوات في الطابق العلوي. ${this.heroName} يشعر أن شخصاً يراقبه.`,
                    options: [
                        { label: 'تحقق من الطابق العلوي', nextStep: 8 },
                        { label: 'اذهب للطابق السفلي', nextStep: 2 }
                    ]
                },
                6: {
                    text: `قرأ ${this.heroName} المخطوطة القديمة. وجد ${this.heroName} أنها تحتوي على خريطة غامضة تظهر كنزاً مخبأً في المنزل. لكن الخريطة تحذر من خطر كبير.`,
                    options: [
                        { label: 'اتبع الخريطة', nextStep: 9 },
                        { label: 'اترك المنزل', nextStep: 'complete' }
                    ]
                },
                7: {
                    text: `بحث ${this.heroName} في المكتبة القديمة. وجد ${this.heroName} كتاباً غريباً يلمع باللون الأزرق. عندما فتح ${this.heroName} الكتاب، خرج منه دخان أزرق!`,
                    options: [
                        { label: 'اقرأ الكتاب الأزرق', nextStep: 10 },
                        { label: 'اتبع الخريطة', nextStep: 9 }
                    ]
                },
                8: {
                    text: `صعد ${this.heroName} للطابق العلوي بحذر. في الغرفة الأولى، وجد ${this.heroName} مرآة قديمة. عندما نظر ${this.heroName} في المرآة، رأى صورة غريبة تتحرك!`,
                    options: [
                        { label: 'تحقق من المرآة', nextStep: 11 },
                        { label: 'عد للطابق السفلي', nextStep: 2 }
                    ]
                },
                9: {
                    text: `تبع ${this.heroName} الخريطة بدقة. وصل ${this.heroName} إلى غرفة مخفية خلف الجدار. في الغرفة، وجد ${this.heroName} صندوقاً ذهبياً يلمع بقوة.`,
                    options: [
                        { label: 'افتح الصندوق الذهبي', nextStep: 'complete' },
                        { label: 'عد للكتاب الأزرق', nextStep: 10 }
                    ]
                },
                10: {
                    text: `قرأ ${this.heroName} الكتاب الأزرق. وجد ${this.heroName} أنه يحتوي على تعويذة قديمة. عندما قرأ ${this.heroName} التعويذة بصوت عالٍ، ظهر ساحر غامض!`,
                    options: [
                        { label: 'تحدث مع الساحر', nextStep: 'complete' },
                        { label: 'اتبع الخريطة', nextStep: 9 }
                    ]
                },
                11: {
                    text: `تحقق ${this.heroName} من المرآة الغريبة. فجأة، تحدثت المرآة وقالت: "أهلاً بك! أنا حارسة هذا المنزل. لقد وجدت الكنز المخفي!"`,
                    options: [
                        { label: 'اسأل عن الكنز', nextStep: 'complete' },
                        { label: 'عد للطابق السفلي', nextStep: 2 }
                    ]
                }
            }
        };

        const template = storyTemplates[this.storyType] || storyTemplates['Adventure'];
        return template[stepNumber] || {
            text: `انتهت رحلة ${this.heroName} بنجاح! كانت مغامرة رائعة مليئة بالذكريات الجميلة.`,
            options: []
        };
    }

    // Parse the API response to extract story step
    parseStoryStep(content, stepKey = '1') {
        // Always expect a single-key JSON object: { "1": { ... } } or { "2": { ... } }
        try {
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                // Find the first key (should be the step number as a string)
                const keys = Object.keys(parsed);
                if (keys.length > 0) {
                    const stepObj = parsed[keys[0]];
                    return {
                        text: stepObj.text,
                        options: stepObj.options || []
                    };
                }
            }
            // If no valid JSON found, fallback to simple text
            return {
                text: content,
                options: []
            };
        } catch (error) {
            console.error('Error parsing AI story step:', error);
            return {
                text: content,
                options: []
            };
        }
    }

    // Get current step key for complex story structure
    getCurrentStepKey() {
        if (this.currentStep === 0) {
            return 'step1';
        }
        // For now, return step1 as fallback
        return 'step1';
    }

    // Display story step with image generation
    displayStoryStep(step) {
        const storyContainer = document.getElementById('story-container');
        if (!storyContainer) return;

        // Add the current step text to the story steps array
        this.storySteps.push(step.text);

        // Store the chosen option label for the next step
        this.lastChosenOptionLabel = '';
if (this.storySteps.length >= 4) {
            this.completeStory();
            return;
        }
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

        const storyText = step.text;
        const storyType = this.storyType;
        const heroName = this.heroName;
        const imageContainer = document.createElement('div');
        imageContainer.className = 'dalle-image-container my-4 flex justify-center';

        // أضف عنصر loading مؤقت
        
        // تحسين الـ prompt حسب نوع المشهد
        const characterDescription = this.getCharacterDescription();
        const characterSeed = this.getCharacterSeed();
        
        // تحديد ما إذا كان هذا المشهد الأول أم لا
        const isFirstScene = this.storySteps.length === 1;
        
        let scenePrompt;
        if (isFirstScene) {
            const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-image text-center';
        loadingDiv.innerHTML = `
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <span class="text-gray-500">جاري تحميل الصورة...</span>
        `;
        imageContainer.appendChild(loadingDiv);

        // أضف الـ imageContainer أسفل نص المشهد
        storyContainer.appendChild(imageContainer);

            // المشهد الأول: إظهار البطل
            scenePrompt = `
رسم كرتوني ملون بأسلوب مجلة أطفال/كوميكس لمشهد من قصة ${this.storyType}:
الشخصية الرئيسية ${this.heroName} تظهر بوضوح في الصورة مع ${characterDescription}
الخلفية تعكس المشهد: ${storyText}

أسلوب رسم متناسق وملون بألوان زاهية
لا تضف أي نص أو شعارات
seed للشخصية: ${characterSeed}
`;
        } else {
            // باقي المشاهد: مشهد معبر بدون البطل
            scenePrompt = `
رسم كرتوني ملون بأسلوب مجلة أطفال/كوميكس لمشهد من قصة ${this.storyType}:
مشهد معبر ومثير للخيال يعكس: ${storyText}

لا تظهر أي شخصية بشرية في الصورة
ركز على الخلفية والعناصر المحيطة
استخدم ألوان زاهية ومتناسقة
أسلوب رسم كرتوني جميل ومثير للاهتمام
لا تضف أي نص أو شعارات
`;
        }

        // لا نولد الصور في المشاهد الفردية، فقط نعرض loading مؤقت
        setTimeout(() => {
            imageContainer.innerHTML = '<span class="text-gray-500">سيتم عرض الصور في القصة الكاملة</span>';
        }, 2000);

        // --- تفعيل منطق اختيار الخيار وزر التالي ---
        const optionBtns = storyContainer.querySelectorAll('button.option-btn');
        const nextBtn = storyContainer.querySelector('#next-btn');
        let selectedNextStep = null;
        this.lastChosenOptionLabel = '';
        
        // تحقق ما إذا كان هذا المشهد الأخير
        const isLastScene = step.options && step.options.length > 0 && 
                           step.options.every(option => option.nextStep === 'complete');
        
        // تحقق أيضاً إذا كان عدد المشاهد وصل للحد الأقصى
        const isMaxStepsReached = this.storySteps.length >= 4;
        
        if (isLastScene || isMaxStepsReached) {
            // في المشهد الأخير، غير زر "التالي" إلى "القصة الكاملة"
            nextBtn.textContent = 'القصة الكاملة';
            nextBtn.innerHTML = `
              القصة الكاملة
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            `;
        }
        
        optionBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            optionBtns.forEach(b => b.classList.remove('ring', 'ring-purple-400', 'bg-purple-50', 'aria-pressed'));
            this.classList.add('ring', 'ring-purple-400', 'bg-purple-50');
            this.setAttribute('aria-pressed', 'true');
            selectedNextStep = this.getAttribute('data-next-step');
            nextBtn.disabled = false;
            nextBtn.classList.remove('text-gray-400', 'bg-gray-100', 'cursor-not-allowed');
            nextBtn.classList.add('text-white', 'bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer');
            // خزّن نص الخيار المختار في الكلاس
            if (typeof window.interactiveStories !== 'undefined') {
              window.interactiveStories.lastChosenOptionLabel = this.textContent.trim();
            } else if (typeof this.lastChosenOptionLabel !== 'undefined') {
              this.lastChosenOptionLabel = this.textContent.trim();
            }
          });
        });
        
        nextBtn.addEventListener('click', () => {
          if (isLastScene || isMaxStepsReached) {
            // في المشهد الأخير، انتقل إلى القصة الكاملة
            this.completeStory();
          } else if (selectedNextStep) {
            // في المشاهد العادية، انتقل للمشهد التالي
            this.selectOption(selectedNextStep);
          }
        });
    }

    // دالة لإنشاء وصف ثابت للشخصية لضمان استمراريتها
    getCharacterDescription() {
        // إنشاء وصف ثابت للشخصية بناءً على نوع القصة
        const characterTraits = {
            'مغامرة': 'ملابس مغامرة زرقاء وحمراء، قبعة بنية، حقيبة ظهر خضراء، عيون بنية متحمسة، ابتسامة شجاعة، شعر أسود قصير، بشرة فاتحة',
            'خيال': 'ملابس سحرية أرجوانية لامعة، قبعة ساحر أزرق، عصا سحرية ذهبية، عيون خضراء متوهجة، ابتسامة سحرية، شعر بني طويل، بشرة فاتحة',
            'كوميديا': 'ملابس مضحكة ملونة (أحمر وأصفر)، قبعات غريبة ملونة، عيون كبيرة زرقاء مضحكة، ابتسامة عريضة، شعر برتقالي مضحك، بشرة فاتحة',
            'غموض': 'ملابس أنيقة داكنة (أسود ورمادي)، نظارة سوداء، مكبر زجاجي، عيون بنية فضولية، ابتسامة ذكية، شعر أسود أنيق، بشرة فاتحة',
            // 'رومانسية': 'ملابس جميلة وردية وبيضاء، إكليل زهور وردي، عيون بنية رومانسية، ابتسامة حلوة، شعر بني طويل جميل، بشرة فاتحة'
        };
        
        return characterTraits[this.storyType] || 'ملابس ملونة (أزرق وأحمر)، عيون بنية كبيرة، ابتسامة مرحة، شعر أسود قصير، بشرة فاتحة، ألوان زاهية';
    }

    // دالة لإنشاء seed ثابت للشخصية لضمان استمراريتها
    getCharacterSeed() {
        // إنشاء seed ثابت بناءً على اسم البطل ونوع القصة
        const seed = `${this.heroName}_${this.storyType}_character_design_consistent`;
        return seed;
    }

    // Handle option selection
     async selectOption(nextStep) {
        // إذا كان هذا هو المشهد الأخير أو اختيار النهاية (تعديل: كان 5 → 4)
        if (nextStep === 'complete' || this.storySteps.length >= 3) {
            // أضف الخيار الأخير المختار إلى الأحداث إذا لم يكن مضافًا
            if (this.lastChosenOptionLabel && (!this.storySteps.length || !this.storySteps[this.storySteps.length-1].includes(this.lastChosenOptionLabel))) {
                this.storySteps.push(`(اختيار المستخدم: ${this.lastChosenOptionLabel})`);
            }
            // أضف رسالة خاصة للنهاية
            this.messages.push({
                role: "system",
                content: `أنت مساعد ذكاء اصطناعي مهمتك كتابة خاتمة منطقية وجميلة للقصة التفاعلية بناءً على الأحداث السابقة، باللغة العربية، في جملة أو فقرتين فقط.`
            });
            this.messages.push({
                role: "user",
                content: `هذه كانت أحداث القصة حتى الآن:
${this.storySteps.join('\n')}

الخيار الأخير الذي اختاره المستخدم: ${this.lastChosenOptionLabel || 'غير محدد'}
اكتب خاتمة مناسبة لهذه القصة بناءً على هذا الخيار.`
            });
            this.showLoadingState();
            try {
                let storyStep = await this.generateStoryStep();
                // أضف الخاتمة فقط بدون خيارات
                storyStep.options = [];
                this.displayStoryStep(storyStep);
                this.hideLoadingState();
            } catch (error) {
                // ... fallback ...
                const storyStep = this.generateLocalStoryStep();
                storyStep.options = [];
                this.displayStoryStep(storyStep);
                this.hideLoadingState();
            }
            return;
        }

        // If using AI, update currentStepKey
        if (typeof nextStep === 'string' && nextStep.match(/^\d+$/)) {
            this.currentStepKey = nextStep;
        } else if (typeof nextStep === 'string' && nextStep.startsWith('step')) {
            this.currentStepKey = nextStep.replace('step', '');
        } else {
            // fallback for local stories
            this.currentStep++;
            this.currentStepKey = (this.currentStep + 1).toString();
        }

        // استخراج نص المشهد السابق والخيار المختار
        const previousStepText = this.storySteps[this.storySteps.length - 1] || '';
        // استخدم المتغير المخزن مباشرة
        let chosenOptionLabel = this.lastChosenOptionLabel || '';
        // احتياطي: إذا لم يوجد، ابحث في الـ DOM (للتوافق)
        if (!chosenOptionLabel) {
          const storyContainer = document.getElementById('story-container');
          if (storyContainer) {
            const activeBtn = storyContainer.querySelector('button.option-btn:focus, button.option-btn[aria-pressed="true"]');
            if (activeBtn) {
                chosenOptionLabel = activeBtn.textContent.trim();
            } else {
                const btns = storyContainer.querySelectorAll('button.option-btn');
                btns.forEach(btn => {
                    if (btn.getAttribute('data-next-step') == nextStep) {
                        chosenOptionLabel = btn.textContent.trim();
                    }
                });
            }
          }
        }

        // بناء برومبت ديناميكي حسب رقم المشهد المطلوب
        const stepNum = this.currentStepKey;
        this.messages.push({
            role: "system",
            content: `\nأنت مساعد ذكاء اصطناعي مهمتك إنتاج مشهد واحد فقط (المشهد رقم "${stepNum}") من القصة التفاعلية باللغة العربية بصيغة JSON خالصة، بدون أي مقدمات أو شروحات. الهيكل المطلوب:\n{\n  "${stepNum}": {\n    "text": "... نص المشهد ...",\n    "options": [\n      { "label": "... نص الخيار الأول ...", "nextStep": "X" },\n      { "label": "... نص الخيار الثاني ...", "nextStep": "Y" }\n    ]\n  }\n}\n- لا تُخرِج أي مفتاح آخر غير "${stepNum}".\n- لا تضف أي نص خارج كائن JSON هذا.\n`
    });
    this.messages.push({
        role: "user",
            content:
                `هذا كان نص المشهد السابق:\n${previousStepText}\n\nالخيار الذي اختاره المستخدم: ${chosenOptionLabel}\n\nأرسل فقط المشهد رقم ${stepNum} بصيغة JSON كما وضّحت، وتابع القصة بناءً على هذا الخيار.`
    });

    this.showLoadingState();

    try {
        let storyStep = await this.generateStoryStep();
        this.displayStoryStep(storyStep);
        this.hideLoadingState();
    } catch (error) {
        console.error('Error selecting option:', error);
        // Fallback to local stories
        const storyStep = this.generateLocalStoryStep();
        this.displayStoryStep(storyStep);
        this.hideLoadingState();
    }
}

    // Complete the story and show final screen
    completeStory() {
        const fullStoryContainer = document.getElementById('full-story');
        const storyScreen = document.getElementById('screen-story');
        const completeScreen = document.getElementById('screen-complete');
        const storyTypeHeading = document.querySelector('h2.text-2xl.font-semibold'); // Hide the heading

        if (fullStoryContainer && storyScreen && completeScreen) {
            // Create the complete story HTML with better formatting and images
            let storyHTML = `
            <div class="min-h-[70vh] flex items-center justify-center py-8 animate-fade-in">
              <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl text-center animate-bounce-in">
                <div class="flex flex-col items-center mb-6">
                  <span class="text-5xl animate-bounce mb-2">🎉</span>
                  <h2 class="text-3xl font-extrabold mb-2 text-indigo-800 tracking-tight animate-fade-in">قصتك الكاملة</h2>
                  <p class="text-gray-500 text-base animate-fade-in">استمتع بقراءة مغامرتك الرائعة مع الصور!</p>
                </div>
                <div class="mb-8 space-y-8">
                  ${this.storySteps
                    .filter(step => !/^\(اختيار المستخدم:/.test(step.trim()))
                    .map((step, i, arr) => `
                    <div class="relative group animate-fade-in-up">
                      
                      
                  ${i ==0?`
                    <div class="story-image-container-${i} flex justify-center mb-4">
                        <div class="loading-image text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                          <span class="text-gray-500">جاري إنشاء الصورة المتناسقة...</span>
                          </div>
                      </div>
                      `
                  :""
                        }
                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow p-4 text-right text-lg text-gray-800 border border-purple-100 group-hover:scale-105 transition-transform mb-4">
                        <span class="block">${step}</span>
                      </div>
                      ${i < arr.length-1 ? '<div class=\"my-4 h-1 w-12 mx-auto bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-60 animate-pulse\"></div>' : ''}
                    </div>
                  `).join('')}
                </div>
                <button id="finish-story-btn" class="mt-4 px-10 py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up">انتهى</button>
              </div>
            </div>
            <div id="story-modal" class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 hidden pt-8">
              <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center relative animate-fade-in-up mt-8">
                <div class="text-5xl mb-2 animate-bounce">✨</div>
                <h3 class="text-2xl font-extrabold mb-2 text-indigo-800 animate-fade-in">رائع! كانت رحلة ممتعة.</h3>
                <p class="text-gray-600 mb-4 animate-fade-in">لقد وصلت إلى نهاية المغامرة!</p>
                <div class="flex flex-col gap-3 mb-4 animate-fade-in-up">
                  <button style="display: none !important;" id="download-pdf" class="hidden w-full flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 transition"><svg class='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13v6l-6 6v-4.5l-4.5 4.5h-9v-12h19.5z'/></svg>تحميل القصة كـ PDF</button>
                  <button id="print-story" class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"><svg class='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6V4h12v3z'/></svg>طباعة القصة</button>
                  <button id="share-fb" class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"><svg class='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z'/></svg>شارك عبر فيسبوك</button>
                  <button id="share-wa" class="w-full flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition"><svg class='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.04 2.81 1.19 3 .15.19 2.05 3.13 5.01 4.27.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z'/></svg>شارك عبر واتساب</button>
                  <button id="share-x" class="w-full flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-900 transition"><svg class='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M17.53 2.477h3.7l-8.13 9.3 9.57 9.746h-7.53l-5.94-6.6-6.8 6.6H1.47l8.7-9.6L.29 2.477h7.7l5.36 5.97 6.2-5.97zm-1.06 16.07h2.05L7.1 4.98H4.92l11.55 13.567z'/></svg>شارك عبر X</button>
                  <button id="copy-story" class="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-300 transition"><svg class='w-5 h-5' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='9' y='9' width='13' height='13' rx='2' ry='2'/><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/></svg>نسخ نص القصة</button>
                </div>
                <button id="new-story-btn" class="w-full mt-2 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition animate-fade-in">ابدأ قصة جديدة ↺</button>
                <button id="close-modal" class="absolute top-2 left-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
              </div>
            </div>`;
            fullStoryContainer.innerHTML = storyHTML;
            
            // توليد 4 صور متناسقة دفعة واحدة للقصة الكاملة
            this.generateUnifiedStoryImages();
            
            // Switch screens
            storyScreen.classList.add('hidden');
            completeScreen.classList.remove('hidden');
            // Hide the story type heading
            if (storyTypeHeading) storyTypeHeading.classList.add('hidden');

            // --- منطق البوب أب وأزرار المشاركة ---
            setTimeout(() => {
              const finishBtn = document.getElementById('finish-story-btn');
              const modal = document.getElementById('story-modal');
              const closeModal = document.getElementById('close-modal');
              const newStoryBtn = document.getElementById('new-story-btn');
              const copyBtn = document.getElementById('copy-story');
              const downloadPdfBtn = document.getElementById('download-pdf');
              const printStoryBtn = document.getElementById('print-story');
              const shareFb = document.getElementById('share-fb');
              const shareWa = document.getElementById('share-wa');
              const shareX = document.getElementById('share-x');
              finishBtn && finishBtn.addEventListener('click', () => { 
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  modal.classList.remove('hidden'); 
                }, 500);
              });
              closeModal && closeModal.addEventListener('click', () => { modal.classList.add('hidden'); });
              newStoryBtn && newStoryBtn.addEventListener('click', () => { location.reload(); });
              
                  // معالجة زر تحميل PDF
    downloadPdfBtn && downloadPdfBtn.addEventListener('click', async () => {
        try {
            downloadPdfBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> جاري التحميل...';
            downloadPdfBtn.disabled = true;
            
            // جمع بيانات القصة للـ PDF
            const storyPages = [];
            const storySteps = this.storySteps.filter(step => !/^\(اختيار المستخدم:/.test(step.trim()));
            
            console.log('Story steps for PDF:', storySteps);
            
            for (let i = 0; i < storySteps.length; i++) {
                const storyText = storySteps[i];
                const imageContainer = document.querySelector(`.story-image-container-${i}`);
                let imageUrl = '';
                
                if (imageContainer) {
                    const img = imageContainer.querySelector('img');
                    if (img) {
                        imageUrl = img.src;
                        console.log(`Image ${i + 1} URL:`, imageUrl);
                    }
                }
                
                storyPages.push({
                    text: storyText,
                    imageUrl: imageUrl
                });
            }
            
            console.log('Story pages for PDF:', storyPages);
            
            // تحميل PDF
            await downloadStoryAsPDF(storyPages, this.heroName);
            
            downloadPdfBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13v6l-6 6v-4.5l-4.5 4.5h-9v-12h19.5z"/></svg> تم التحميل!';
            setTimeout(() => {
                downloadPdfBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13v6l-6 6v-4.5l-4.5 4.5h-9v-12h19.5z"/></svg> تحميل القصة كـ PDF';
                downloadPdfBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error downloading PDF:', error);
            downloadPdfBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> خطأ في التحميل';
            setTimeout(() => {
                downloadPdfBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13v6l-6 6v-4.5l-4.5 4.5h-9v-12h19.5z"/></svg> تحميل القصة كـ PDF';
                downloadPdfBtn.disabled = false;
            }, 3000);
        }
    });

    // إضافة معالج حدث لزر الطباعة
    printStoryBtn && printStoryBtn.addEventListener('click', () => {
        try {
            printStoryBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> جاري الطباعة...';
            printStoryBtn.disabled = true;
            
            // إضافة أنماط الطباعة
            const printStyles = document.createElement('style');
            printStyles.id = 'print-styles';
            printStyles.textContent = `
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #full-story, #full-story * {
                        visibility: visible;
                    }
                    #story-modal, #story-modal * {
                        visibility: hidden !important;
                        display: none !important;
                    }
                    #full-story {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: white;
                        padding: 20px;
                        font-size: 14px;
                        line-height: 1.6;
                    }
                    .story-step {
                        margin-bottom: 20px;
                        page-break-inside: avoid;
                    }
                    .story-image {
                        max-width: 100%;
                        height: auto;
                        margin: 10px 0;
                    }
                    .story-title {
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 30px;
                        color: #333;
                    }
                    .story-hero {
                        text-align: center;
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #666;
                    }
                    .story-scene {
                        border-left: 4px solid #667eea;
                        padding-left: 15px;
                        margin-bottom: 15px;
                    }
                    .story-scene-title {
                        font-weight: bold;
                        color: #667eea;
                        margin-bottom: 10px;
                    }
                    .story-text {
                        text-align: right;
                        direction: rtl;
                        margin-bottom: 10px;
                    }
                    .story-image-container {
                        text-align: center;
                        margin: 15px 0;
                    }
                    .story-footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #667eea;
                        color: #666;
                    }
                    @page {
                        margin: 1cm;
                        size: A4;
                    }
                }
            `;
            document.head.appendChild(printStyles);
            
            // طباعة القصة
            window.print();
            
            // إزالة أنماط الطباعة بعد الطباعة
            setTimeout(() => {
                const existingStyles = document.getElementById('print-styles');
                if (existingStyles) {
                    existingStyles.remove();
                }
                
                printStoryBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg> تم الطباعة!';
                setTimeout(() => {
                    printStoryBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6V4h12v3z"/></svg> طباعة القصة';
                    printStoryBtn.disabled = false;
                }, 2000);
            }, 1000);
            
        } catch (error) {
            console.error('Error printing story:', error);
            printStoryBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> خطأ في الطباعة';
            setTimeout(() => {
                printStoryBtn.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6V4h12v3z"/></svg> طباعة القصة';
                printStoryBtn.disabled = false;
            }, 3000);
        }
    });
              
              copyBtn && copyBtn.addEventListener('click', () => {
                const text = Array.from(document.querySelectorAll('.mb-3')).map(p => p.textContent).join('\n');
                navigator.clipboard.writeText(text);
                copyBtn.textContent = 'تم النسخ!';
                setTimeout(()=>{copyBtn.textContent='نسخ نص القصة';}, 1500);
              });
              shareFb && shareFb.addEventListener('click', () => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(Array.from(document.querySelectorAll('.mb-3')).map(p => p.textContent).join('\n'));
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,'_blank');
              });
              shareWa && shareWa.addEventListener('click', () => {
                const text = encodeURIComponent(Array.from(document.querySelectorAll('.mb-3')).map(p => p.textContent).join('\n'));
                window.open(`https://wa.me/?text=${text}`,'_blank');
              });
              shareX && shareX.addEventListener('click', () => {
                const text = encodeURIComponent(Array.from(document.querySelectorAll('.mb-3')).map(p => p.textContent).join('\n'));
                window.open(`https://twitter.com/intent/tweet?text=${text}`,'_blank');
              });
            }, 100);
        }
    }

    // توليد الصور لكل مشهد في القصة الكاملة - نسخة محسنة
    async generateCompleteStoryImages() {
        const storySteps = this.storySteps.filter(step => !/^\(اختيار المستخدم:/.test(step.trim()));
        
        // إنشاء prompt شامل للقصة الكاملة
        const fullStoryText = storySteps.join('\n\n');
        const characterDescription = this.getCharacterDescription();
        const characterSeed = this.getCharacterSeed();
        
        // إنشاء prompt موحد لضمان التناسق
        const unifiedPrompt = `
أنشئ صورة واحدة كبيرة مقسمة إلى أربع مربعات أو أجزاء متجاورة (Panels)، كل جزء يمثل مشهد من القصة.
كل مربع يحتوي على رسم كرتوني ملون يعبر بصرياً عن أحداث المشهد الخاص به، بدون أي نصوص أو عبارات داخل الصورة مهم جدا ألا يكون هناك كتابة بأي لغة داخل الصورة وان لزم الأمر تكون الكتابة باللغة العربية فقط.
إذا كان يجب ترقيم المشاهد، ضع فقط رقم المشهد باللغة العربية (١، ٢، ٣، ٤) بشكل فني وجذاب داخل كل مربع، ويفضل أن يكون الرقم في زاوية المربع أو بشكل جميل.
المشاهد الأربعة بالترتيب من اليسار إلى اليمين (أو من الأعلى للأسفل):
١. ${storySteps[0]}
٢. ${storySteps[1]}
٣. ${storySteps[2]}
٤. ${storySteps[3]}

الشخصية الرئيسية ${this.heroName} مع ${characterDescription} تظهر بوضوح في بعض المشاهد حسب الأحداث.
استخدم نفس التصميم والألوان في جميع الأجزاء.
لا تضف أي نص أو شعارات أو كلمات داخل الصورة سوى رقم المشهد فقط وباللغة العربية.
أسلوب رسم كرتوني جميل وملون، مع إبراز تعبيرات الوجه والمشاعر والأحداث في كل مربع.
seed للشخصية: ${characterSeed}
`;
        
        try {
        // توليد صورة واحدة فقط
        const img = await generateDalleImage(unifiedPrompt, characterSeed);
        // اعرض الصورة في أول حاوية فقط
        const imageContainer = document.querySelector('.story-image-container-0');
        if (imageContainer && img) {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
        }
        // أخفي باقي الحاويات تمامًا
        for (let i = 1; i < storySteps.length; i++) {
            const container = document.querySelector(`.story-image-container-${i}`);
            if (container) {
                container.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error generating unified image:', error);
        const imageContainer = document.querySelector('.story-image-container-0');
        if (imageContainer) {
            imageContainer.innerHTML = '<span class="text-red-500">تعذر تحميل الصورة</span>';
        }
    }
    }

    // توليد 4 صور متناسقة دفعة واحدة للقصة الكاملة
    async generateUnifiedStoryImages() {
    const storySteps = this.storySteps.filter(step => !/^\(اختيار المستخدم:/.test(step.trim()));
    const fullStoryText = storySteps.join('\n\n');
    const characterDescription = this.getCharacterDescription();
    const characterSeed = this.getCharacterSeed();

    // برومبت واحد فقط يلخص القصة كلها في صورة واحدة
    const unifiedPrompt = `
رسم كرتوني ملون بأسلوب مجلة أطفال/كوميكس لمشهد بانورامي كبير يلخص قصة ${this.storyType}:
القصة الكاملة: ${fullStoryText}

الشخصية الرئيسية ${this.heroName} مع ${characterDescription} تظهر بوضوح في الصورة
أظهر أهم أحداث القصة بشكل متسلسل في صورة واحدة كبيرة (بانوراما)
استخدم نفس التصميم والألوان في جميع العناصر
أسلوب رسم متناسق وملون بألوان زاهية
seed للشخصية: ${characterSeed}
`;

    try {
        // توليد صورة واحدة فقط
        const img = await generateDalleImage(unifiedPrompt, characterSeed);
        // اعرض الصورة في أول حاوية فقط
        const imageContainer = document.querySelector('.story-image-container-0');
        if (imageContainer && img) {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
        }
        // أخفي باقي الحاويات تمامًا
        for (let i = 1; i < storySteps.length; i++) {
            const container = document.querySelector(`.story-image-container-${i}`);
            if (container) {
                container.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error generating unified image:', error);
        const imageContainer = document.querySelector('.story-image-container-0');
        if (imageContainer) {
            imageContainer.innerHTML = '<span class="text-red-500">تعذر تحميل الصورة</span>';
        }
    }
}

    // Switch to story screen
    switchToStoryScreen() {
        const landingSection = document.getElementById('screen-landing');
        const charSection = document.querySelector('#screen-char');
        const storyScreen = document.getElementById('screen-story');
        const btnToStory = document.getElementById('btn-to-story');
        const cardsGrid = document.querySelector('.grid');
        const storyTypeHeading = document.querySelector('h2.text-2xl.font-semibold'); // Hide the heading

        if (landingSection) landingSection.classList.add('hidden');
        if (charSection) charSection.classList.add('hidden');
        if (btnToStory) btnToStory.classList.add('hidden');
        if (cardsGrid) cardsGrid.classList.add('hidden');
        if (storyTypeHeading) storyTypeHeading.classList.add('hidden');
        if (storyScreen) storyScreen.classList.remove('hidden');
    }

    // Optional: Show cards again if user restarts (if you have a restart button, add this logic)
    showCardsGrid() {
        const cardsGrid = document.querySelector('.grid');
        if (cardsGrid) cardsGrid.classList.remove('hidden');
    }

    // Show loading state
    showLoadingState() {
        const storyContainer = document.getElementById('story-container');
        
        if (storyContainer) {
            storyContainer.innerHTML = `
                <div class="loading-state text-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">جاري تحميل القصة...</p>
                </div>
            `;
        }
    }

    // Hide loading state
    hideLoadingState() {
        // Loading state is replaced when story step is displayed
    }

    // Share story functionality
    shareStory(platform) {
        // Create a formatted story text
        let storyText = `🎭 قصة تفاعلية: ${this.heroName} 🎭\n\n`;
        storyText += `نوع القصة: ${this.storyType}\n\n`;
        
        this.storySteps.forEach((step, index) => {
            storyText += `مشهد ${index + 1}:\n${step}\n\n`;
        });
        
        storyText += `�� انتهت القصة! 🎊\n\n`;
        storyText += `شارك قصتك التفاعلية مع أصدقائك!`;
        
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(storyText);
        
        let shareLink = '';
        
        switch (platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(`قصة تفاعلية: ${this.heroName}`)}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${shareText}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`قصة تفاعلية: ${this.heroName}`)}&url=${shareUrl}`;
                break;
            case 'copy':
                // Copy to clipboard
                navigator.clipboard.writeText(storyText).then(() => {
                    alert('تم نسخ القصة إلى الحافظة!');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = storyText;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('تم نسخ القصة إلى الحافظة!');
                });
                return;
        }
        
        if (shareLink) {
            window.open(shareLink, '_blank', 'width=600,height=400');
        }
    }
}

// --- DALL·E API Key Loader ---
// (This will be loaded from dalle-key.js, which is gitignored and not committed)
window.DALLE_API_KEY = window.DALLE_API_KEY || '';

async function generateDalleImage(prompt, seed = null) {
    try {
      const res = await fetch("https://chat-api-zeta-indol.vercel.app/api/chat", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: 'image',
          prompt,
          n: 1,
          size: "1024x1024",
          seed: seed || "consistent_character_design"
        })
      });
  
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server responded ${res.status}`);
      }
  
      const json = await res.json();
  
      // 1) إذا عاد الباكـاند حقل data مباشرة
      // new check for backend's `urls`
if (Array.isArray(json.urls) && json.urls[0]) {
    return makeImg(json.urls[0]);
  }
  
  
      // 2) إذا عاد الباكـاند رابط مباشر
      if (json.url) {
        return makeImg(json.url);
      }
  
      // 3) إذا عاد الباكـاند string في content يحتوي على data
      if (typeof json.content === 'string') {
        try {
          const parsed = JSON.parse(json.content);
          if (Array.isArray(parsed.data) && parsed.data[0]?.url) {
            return makeImg(parsed.data[0].url);
          }
        } catch (e) {
          // fallthrough
        }
      }
  
      throw new Error("لم نعثر على رابط الصورة في الاستجابة");
  
    } catch (e) {
      console.error("DALL·E via backend error:", e);
      alert("تعذّر تحميل الصورة: " + e.message);
      return null;
    }
  
    // helper to build and return an <img> node
    function makeImg(url) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Generated scene";
      img.className = "dalle-image my-4 rounded shadow-md mx-auto";
      return img;
    }
  }
  

// --- PDF Download ---
async function downloadStoryAsPDF(storyPages, heroName) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("مكتبة jsPDF لم تُحمّل بشكل صحيح. أعد تحميل الصفحة أو تحقق من الاتصال بالإنترنت.");
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    
    console.log('Creating PDF for hero:', heroName);
    console.log('Story pages:', storyPages);
    
    // إضافة صفحة العنوان
    pdf.setFillColor(102, 126, 234); // لون البنفسجي
    pdf.rect(0, 0, 210, 297, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text('قصة تفاعلية', 105, 80, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.text(`البطل: ${heroName}`, 105, 100, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text('تم إنشاؤها بواسطة تطبيق القصص التفاعلية', 105, 120, { align: 'center' });
    
    pdf.addPage();
    
    // إضافة محتوى القصة (بدون صور مؤقتاً)
    for (let i = 0; i < storyPages.length; i++) {
        const { text, imageUrl } = storyPages[i];
        
        console.log(`Adding scene ${i + 1}:`, text);
        
        // إضافة عنوان المشهد
        pdf.setFillColor(147, 51, 234); // لون البنفسجي الفاتح
        pdf.rect(0, 0, 210, 20, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(16);
        pdf.text(`المشهد ${i + 1}`, 105, 12, { align: 'center' });
        
        // إضافة النص فقط (بدون صور مؤقتاً)
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.text(text, 15, 50, { maxWidth: 180, align: 'right' });
        
        // إضافة رقم الصفحة
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`${i + 1}`, 105, 280, { align: 'center' });
        
        // إضافة صفحة جديدة إلا في آخر صفحة
        if (i < storyPages.length - 1) {
            pdf.addPage();
        }
    }
    
    // إضافة صفحة الختام
    pdf.addPage();
    pdf.setFillColor(102, 126, 234);
    pdf.rect(0, 0, 210, 297, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text('انتهت القصة!', 105, 120, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text('شكراً لك على مشاركة هذه المغامرة الرائعة', 105, 140, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text('تم إنشاؤها بواسطة تطبيق القصص التفاعلية', 105, 160, { align: 'center' });
    
    // حفظ الملف
    const fileName = `${heroName || 'قصة'}_${new Date().toLocaleDateString('ar-EG')}.pdf`;
    console.log('Saving PDF as:', fileName);
    pdf.save(fileName);
}

// --- Helper: Convert image URL to DataURL ---
async function toDataURL(url) {
    try {
        console.log('Fetching image from URL:', url);
        
        const response = await fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'image/*'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        console.log('Blob size:', blob.size, 'bytes');
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('Image converted to DataURL successfully');
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                console.error('Error reading blob:', error);
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image to DataURL:', error);
        throw error;
    }
}

// --- Attach PDF Download Button ---
window.attachPDFDownload = function (storyInstance) {
  const btn = document.getElementById('download-pdf');
  if (!btn) return;
  btn.onclick = async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 0; i < storyInstance.storyPages.length; i++) {
      const { text, imageUrl } = storyInstance.storyPages[i];
      // تحميل الصورة وتحويلها إلى DataURL
      let imgData = null;
      try {
        imgData = await toDataURL(imageUrl);
      } catch (e) {
        imgData = null;
      }

      // إضافة الصورة (إذا وُجدت)
      if (imgData) {
        // اجعل الصورة تغطي عرض الصفحة تقريبًا (مع هامش)
        const imgWidth = pageWidth - 80;
        const imgHeight = imgWidth * 0.6; // نسبة تقريبية
        doc.addImage(imgData, 'JPEG', 40, 40, imgWidth, imgHeight);
        // إضافة النص أسفل الصورة
        doc.setFontSize(16);
        doc.text(text, 50, 60 + imgHeight, { maxWidth: pageWidth - 100 });
      } else {
        // إذا لم توجد صورة، أضف النص فقط
        doc.setFontSize(16);
        doc.text(text, 50, 100, { maxWidth: pageWidth - 100 });
      }

      // أضف صفحة جديدة إلا في آخر صفحة
      if (i < storyInstance.storyPages.length - 1) doc.addPage();
    }

    doc.save("story.pdf");
  };
};

// دالة تحويل الصورة إلى DataURL
async function toDataURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveStories = new InteractiveStories();
});

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .option-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(147, 51, 234, 0.2);
    }
    
    .loading-state {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);
