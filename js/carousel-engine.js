/**
 * ShopCoin15 Studio - Multi-Slide Carousel Engine (4:5)
 * Dedicated for Educational, Security, and Story-Driven Instagram Carousels
 * Fully Responsive, 4K High-Res Batch Export, Filmstrip Navigation
 */

window.CarouselEngine = (function() {
    // Standard Instagram Carousel Aspect Ratio: 4:5 (1080x1350)
    let slides = [
        {
            id: 'slide_1',
            type: 'cover',
            title: '5 أخطاء شائعة تسبب تصفير حسابك في FC 27 ⚠️',
            subtitle: 'كيف تحمي ناديك وتشحن كوينز بأمان 100% بدون أي قلق',
            badge: '🛡️ دليل أمان النادي والحسابات',
            bgTheme: 'store',
            playerName: 'Kylian Mbappé',
            playerArName: 'كيليان مبابي',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            swipePrompt: 'اسحب لليسار لمعرفة الأخطاء 👈'
        },
        {
            id: 'slide_2',
            type: 'point',
            number: '01',
            title: 'التحويل اليدوي العشوائي وغير الآمن',
            body: 'أكبر خطأ هو نقل الكوينز بطرق بدائية أو لاعبين مكشوفين لخوارزميات EA. في @shop_coin15 نستخدم أحدث منظومة فحص أمان تضمن مرور العملية كصفقات بيع طبيعية 100%.',
            icon: '🚨',
            bgTheme: 'store',
            tip: '💡 نصيحة: لا تشحن أبداً من مصادر مجهولة تستخدم برامج نقل عشوائية.'
        },
        {
            id: 'slide_3',
            type: 'point',
            number: '02',
            title: 'تغيير معلومات الحساب أثناء وقت الشحن',
            body: 'دخول اللعبة أو تغيير الإيميل أثناء تنفيذ طلب الشحن قد يعطل عملية النقل أو يلفت انتباه الحماية. التزم دائماً بالتعليمات البسيطة التي يرسلها لك المتجر.',
            icon: '🔒',
            bgTheme: 'store',
            tip: '💡 التزامك بتعليمات المتجر يضمن شحن حسابك في أقل من دقيقة بأمان تام.'
        },
        {
            id: 'slide_4',
            type: 'point',
            number: '03',
            title: 'عدم تفعيل الضمان الشامل للنادي',
            body: 'المتاجر الموثوقة تقدم ضماناً صريحاً ومكتوباً. متجرنا يوفر ضمان نادي كامل لجميع العملاء، مما يمنحك راحة بال تامة واطمئنان على تشكيلتك ولاعبيك.',
            icon: '👑',
            bgTheme: 'store',
            tip: '💡 ضمان متجر shop_coin15 يغطي ناديك بالكامل.'
        },
        {
            id: 'slide_5',
            type: 'cta',
            title: 'جاهز تبني تشكيلة أحلامك بأمان؟ ⚡',
            subtitle: 'جميع كميات الكوينز متوفرة الآن لجميع المنصات بأسرع تسليم وأفضل سعر تنافسي مع ضمان نادي كامل.',
            badge: '🚀 متجر @shop_coin15 خيارك الموثوق',
            bgTheme: 'store',
            ctaText: 'اطلب كوينزك الآن بالخاص DM 📩',
            features: [
                '⚡ سرعة شحن خيالية (المليون بدقيقة)',
                '🔒 ضمان شامل للنادي 100%',
                '💰 أسعار منافسة شاملة ضريبة EA'
            ]
        }
    ];

    let activeSlideIndex = 0;

    const PRESETS = {
        security_guide: {
            name: '🛡️ دليل أمان الحساب وتجنب التصفير (5 سلايدات)',
            slides: [
                {
                    id: 'slide_1',
                    type: 'cover',
                    title: '5 أخطاء شائعة تسبب تصفير حسابك في FC 27 ⚠️',
                    subtitle: 'كيف تحمي ناديك وتشحن كوينز بأمان 100% بدون أي قلق',
                    badge: '🛡️ دليل أمان النادي والحسابات',
                    bgTheme: 'store',
                    playerName: 'Kylian Mbappé',
                    playerArName: 'كيليان مبابي',
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
                    swipePrompt: 'اسحب لليسار لمعرفة الأخطاء 👈'
                },
                {
                    id: 'slide_2',
                    type: 'point',
                    number: '01',
                    title: 'التحويل اليدوي العشوائي وغير الآمن',
                    body: 'أكبر خطأ هو نقل الكوينز بطرق بدائية أو لاعبين مكشوفين لخوارزميات EA. في @shop_coin15 نستخدم أحدث منظومة فحص أمان تضمن سلامة حسابك 100%.',
                    icon: '🚨',
                    bgTheme: 'store',
                    tip: '💡 نصيحة: ابتعد عن التحويل العشوائي.'
                },
                {
                    id: 'slide_3',
                    type: 'point',
                    number: '02',
                    title: 'عدم التأكد من تغطية ضريبة EA',
                    body: 'الكثير يتفاجأ بنقص 5% ضريبة بعد الشحن. في @shop_coin15 جميع أسعارنا تشمل تغطية الضريبة بالكامل؛ الكمية التي تطلبها تصلك صافية في حسابك.',
                    icon: '💸',
                    bgTheme: 'store',
                    tip: '💡 كوينزك يصلك صافي بدون أي خصم ضريبة.'
                },
                {
                    id: 'slide_4',
                    type: 'point',
                    number: '03',
                    title: 'إهمال الضمان الموثق للنادي',
                    body: 'لا تشحن أبداً بدون ضمان صريح. نحن نقدم ضماناً شاملاً لناديك مع دعم فوري مستمر لضمان أعلى مستويات الأمان والاحترافية.',
                    icon: '🔒',
                    bgTheme: 'store',
                    tip: '💡 متجرنا يضمن لك ناديك 100%.'
                },
                {
                    id: 'slide_5',
                    type: 'cta',
                    title: 'اشحن بأمان وراحة بال تامة 🔥',
                    subtitle: 'جميع كميات الكوينز متوفرة الآن بأفضل الأسعار وأعلى سرعة تسليم.',
                    badge: '⚡ متجر @shop_coin15 في خدمتك',
                    bgTheme: 'store',
                    ctaText: 'ارسل رسالة بالخاص للطلب الفوري 📩',
                    features: [
                        '⚡ سرعة تسليم فورية خلال دقائق',
                        '🔒 ضمان أمان كامل للنادي',
                        '💰 كوينز صافي شامل الضريبة 100%'
                    ]
                }
            ]
        },
        squad_budget: {
            name: '💰 كيف تبني تشكيلة قوية بأقل ميزانية؟ (4 سلايدات)',
            slides: [
                {
                    id: 'slide_1',
                    type: 'cover',
                    title: 'كيف تبني تشكيلة ميتا خارقة بأقل من 500k كوينز؟ ⚽🔥',
                    subtitle: 'أسرار توزيع الميزانية الذكية بين الهجوم وخط الوسط والدفاع',
                    badge: '💎 استراتيجيات بناء التشكيلات',
                    bgTheme: 'store',
                    playerName: 'Jude Bellingham',
                    playerArName: 'جود بيلينغهام',
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
                    swipePrompt: 'اسحب وشوف الخطة 👈'
                },
                {
                    id: 'slide_2',
                    type: 'point',
                    number: '01',
                    title: 'استثمر 50% من ميزانيتك في الهجوم الخاطف',
                    body: 'المهاجمون السريعون هم مفتاح الفوز في مباريات الفوت تشامبيونز. احرص على اختيار نجوم بسرعة وانهاء عالي لضمان حسم الفرص.',
                    icon: '⚡',
                    bgTheme: 'store',
                    tip: '💡 الهجوم القوي يضمن لك الفوز في أصعب المباريات.'
                },
                {
                    id: 'slide_3',
                    type: 'point',
                    number: '02',
                    title: 'محور دفاعي قوي يضبط إيقاع اللعب',
                    body: 'لا تفرط بميزانيتك على حراس المرمى، بل ركز على محور دفاعي (CDM) صلب يقطع الكرات ويبني الهجمات المرتدة بكفاءة.',
                    icon: '🛡️',
                    bgTheme: 'store',
                    tip: '💡 كرت محور قوي يعادل نصف الفريق دفاعياً.'
                },
                {
                    id: 'slide_4',
                    type: 'cta',
                    title: 'ناقصك كوينز لتكمل تشكيلتك؟ 🤩',
                    subtitle: 'شحن فوري خلال دقيقة لجميع المنصات (بلايستيشن / إكسبوكس / PC) بأفضل الأسعار.',
                    badge: '⚡ شحن كوينز فوري @shop_coin15',
                    bgTheme: 'store',
                    ctaText: 'اطلب كوينزك الآن عبر الخاص DM 📩',
                    features: [
                        '⚡ سرعة قياسية لا مثيل لها',
                        '🔒 طريقة آمنة وضمان كامل',
                        '👑 أسعار خاصة للكميات الكبيرة'
                    ]
                }
            ]
        },
        why_shopcoin15: {
            name: '⭐ لماذا نحن الخيار الأول لعشاق فيفا؟ (4 سلايدات)',
            slides: [
                {
                    id: 'slide_1',
                    type: 'cover',
                    title: 'لماذا يختار أكثر من 10,000 لاعب متجر @shop_coin15؟ 👑',
                    subtitle: '3 أسباب تجعلنا وجهتك الأولى لشحن الكوينز وإقفال التحديات بأمان',
                    badge: '⭐ الثقة والاحترافية أولاً',
                    bgTheme: 'store',
                    playerName: 'Vinícius Jr.',
                    playerArName: 'فينيسيوس جونيور',
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
                    swipePrompt: 'اسحب وشوف المزايا 👈'
                },
                {
                    id: 'slide_2',
                    type: 'point',
                    number: '01',
                    title: 'سرعة قياسية: المليون ينشحن بدقيقة واحدة!',
                    body: 'نعلم أهمية وقتك خاصة قبل إغلاق جولة الفوت أو نزول كرت محدود. فريقنا المتخصص ينفذ طلبك بسرعة فائقة ومتابعة مستمرة.',
                    icon: '⚡',
                    bgTheme: 'store',
                    tip: '💡 أسرع تنفيذ في الشرق الأوسط.'
                },
                {
                    id: 'slide_3',
                    type: 'point',
                    number: '02',
                    title: 'ضمان نادي كامل 100% بدون أي تصفير',
                    body: 'نتبع أدق البروتوكولات الرسمية والآمنة، ونضمن سلامة حسابك بنسبة 100% مع تحمل المسؤولية الكاملة لراحة بالك.',
                    icon: '🔒',
                    bgTheme: 'store',
                    tip: '💡 راحة بالك وأمان ناديك هو هدفنا الدائم.'
                },
                {
                    id: 'slide_4',
                    type: 'cta',
                    title: 'انضم لعملائنا المميزين اليوم 🚀',
                    subtitle: 'تواصل معنا الآن بالخاص للاستفسار أو الطلب المباشر وتمتع بأفضل تجربة شحن.',
                    badge: '👑 متجر @shop_coin15',
                    bgTheme: 'store',
                    ctaText: 'حياكم على الخاص DM للطلب الفوري 📩',
                    features: [
                        '⚡ تسليم فوري خلال دقائق معدودة',
                        '🔒 حماية كاملة وضمان نادي معتمد',
                        '💬 دعم فني سريع ومتعاون على مدار الساعة'
                    ]
                }
            ]
        }
    };

    function getSlides() {
        return slides;
    }

    function getActiveSlide() {
        return slides[activeSlideIndex] || slides[0];
    }

    function getActiveIndex() {
        return activeSlideIndex;
    }

    function setActiveIndex(idx) {
        if (idx >= 0 && idx < slides.length) {
            activeSlideIndex = idx;
            renderEditorControls();
            renderSlideToMainCanvas();
            renderFilmstrip();
        }
    }

    function addSlide(type = 'point') {
        if (slides.length >= 8) {
            alert('الحد الأقصى لعدد سلايدات الكاروسيل هو 8 سلايدات لضمان تركيز المتابع.');
            return;
        }
        const newNum = String(slides.length).padStart(2, '0');
        const newSlide = {
            id: 'slide_' + Date.now(),
            type: type,
            number: newNum,
            title: 'نصيحة جديدة لناديك #' + slides.length,
            body: 'اكتب هنا تفاصيل النصيحة أو المعلومة المفيدة بأسلوب سلس ومباشر يجذب المتابع.',
            icon: '💡',
            bgTheme: 'store',
            tip: '💡 نصيحة المتجر: أمان ناديك أولويتنا.'
        };
        // Insert before CTA if CTA exists at the end
        if (slides[slides.length - 1].type === 'cta') {
            slides.splice(slides.length - 1, 0, newSlide);
            activeSlideIndex = slides.length - 2;
        } else {
            slides.push(newSlide);
            activeSlideIndex = slides.length - 1;
        }
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function removeSlide(idx) {
        if (slides.length <= 2) {
            alert('يجب أن يحتوي الكاروسيل على سلايدين على الأقل.');
            return;
        }
        slides.splice(idx, 1);
        if (activeSlideIndex >= slides.length) {
            activeSlideIndex = slides.length - 1;
        }
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function duplicateSlide(idx) {
        if (slides.length >= 8) {
            alert('الحد الأقصى 8 سلايدات.');
            return;
        }
        const clone = JSON.parse(JSON.stringify(slides[idx]));
        clone.id = 'slide_' + Date.now();
        clone.title += ' (نسخة)';
        slides.splice(idx + 1, 0, clone);
        activeSlideIndex = idx + 1;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function applyPreset(presetKey) {
        if (!PRESETS[presetKey]) return;
        slides = JSON.parse(JSON.stringify(PRESETS[presetKey].slides));
        activeSlideIndex = 0;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
        if (window.showCopyToast) {
            window.showCopyToast('تم تطبيق قالب الكاروسيل بنجاح! 📚✨');
        }
    }

    function renderFilmstrip() {
        const container = document.getElementById('carouselFilmstripContainer');
        if (!container) return;

        let html = `
            <div class="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3 shadow-sm">
                <div class="flex items-center justify-between mb-2.5 px-1">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200">🎞️</span>
                        <span class="text-xs font-black text-slate-800">شريط سلايدات الكاروسيل (السلايد ${activeSlideIndex + 1} من ${slides.length}):</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="CarouselEngine.addSlide('point')" class="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-black transition flex items-center gap-1 shadow-xs">
                            <span>+ إضافة سلايد</span>
                        </button>
                        <button type="button" onclick="CarouselEngine.exportAllSlides()" class="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white text-[11px] font-black transition flex items-center gap-1 shadow-sm shadow-blue-500/20">
                            <span>👑 تصدير الكل (4K)</span>
                        </button>
                    </div>
                </div>
                
                <div class="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-1 px-1 scrollbar-thin" dir="rtl">
        `;

        slides.forEach((slide, idx) => {
            const isActive = idx === activeSlideIndex;
            let typeLabel = 'سلايد';
            if (slide.type === 'cover') typeLabel = 'الغلاف 🌟';
            else if (slide.type === 'cta') typeLabel = 'الخاتمة 📩';
            else typeLabel = '#' + (slide.number || idx + 1);

            html += `
                <div class="relative group shrink-0">
                    <button type="button" onclick="CarouselEngine.setActiveIndex(${idx})" class="w-24 h-32 rounded-xl border-2 transition text-right p-2 flex flex-col justify-between overflow-hidden relative select-none ${
                        isActive 
                            ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20' 
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                    }">
                        <div class="flex items-center justify-between w-full">
                            <span class="text-[9.5px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500'}">${typeLabel}</span>
                            <span class="text-[9px] font-bold text-slate-400">${idx + 1}/${slides.length}</span>
                        </div>
                        <div class="text-[10px] font-black text-slate-800 line-clamp-3 leading-tight">
                            ${slide.title || 'سلايد ' + (idx + 1)}
                        </div>
                        <div class="w-full h-1 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-200'}"></div>
                    </button>
                    <div class="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition duration-150 z-10">
                        <button type="button" onclick="event.stopPropagation(); CarouselEngine.duplicateSlide(${idx})" title="نسخ السلايد" class="w-5 h-5 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center hover:bg-slate-100">
                            ⧉
                        </button>
                        ${slides.length > 2 ? `
                            <button type="button" onclick="event.stopPropagation(); CarouselEngine.removeSlide(${idx})" title="حذف السلايد" class="w-5 h-5 rounded-full bg-white shadow-md border border-red-200 text-red-600 text-[10px] font-black flex items-center justify-center hover:bg-red-50">
                                ✕
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    function renderSlideToMainCanvas(slideOverride = null) {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_carousel') return;

        const slide = slideOverride || getActiveSlide();
        const total = slides.length;
        const currentNum = (slideOverride ? slides.indexOf(slideOverride) : activeSlideIndex) + 1;

        // Base carousel aspect ratio: 4:5
        canvas.className = 'canvas-portrait relative overflow-hidden';
        canvas.setAttribute('data-canvas-ratio', 'portrait');

        let innerHtml = '';

        if (slide.type === 'cover') {
            innerHtml = `
                <!-- Carousel Slide 1 (High-Impact Cover) -->
                <div class="absolute inset-0 bg-[#070b14] overflow-hidden select-none">
                    <!-- Rich Lighting Background -->
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(0,132,255,0.22),transparent_65%)]"></div>
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.18),transparent_60%)]"></div>
                    <div class="absolute top-0 right-0 left-0 h-44 bg-gradient-to-b from-black/80 to-transparent"></div>

                    <!-- Top Bar: Shop Brand & Slide Indicator -->
                    <div class="absolute top-7 right-7 left-7 flex items-center justify-between z-20">
                        <div class="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
                            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1.5px]">
                                <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px]">⚡</div>
                            </div>
                            <span class="text-xs font-black tracking-wider text-white">@SHOP_COIN15</span>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-black text-cyan-300">
                            سلايد ${currentNum} من ${total}
                        </div>
                    </div>

                    <!-- Badge -->
                    <div class="absolute top-24 right-7 left-7 z-20">
                        <span class="inline-block px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white font-black text-xs border border-cyan-400/40 shadow-lg shadow-blue-500/25">
                            ${slide.badge || 'دليل متجر shop_coin15'}
                        </span>
                    </div>

                    <!-- Main Cover Headline -->
                    <div class="absolute top-36 right-7 left-7 z-20">
                        <h1 class="text-2xl font-black text-white leading-tight drop-shadow-md text-right font-['Alexandria']">
                            ${slide.title}
                        </h1>
                        <p class="mt-3 text-xs text-slate-300 font-medium leading-relaxed drop-shadow-sm text-right font-['Cairo']">
                            ${slide.subtitle || ''}
                        </p>
                    </div>

                    <!-- Player Card Graphic Center Bottom -->
                    ${slide.cardUrl ? `
                        <div class="absolute bottom-16 right-0 left-0 flex justify-center items-end z-10 pointer-events-none">
                            <div class="relative">
                                <div class="absolute -inset-4 bg-gradient-to-t from-blue-500/30 to-transparent blur-2xl rounded-full"></div>
                                <img src="${slide.cardUrl}" alt="Player Card" class="w-56 h-auto max-h-[300px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter drop-shadow-2xl">
                            </div>
                        </div>
                    ` : ''}

                    <!-- Bottom Swipe Prompt Pill -->
                    <div class="absolute bottom-6 right-7 left-7 flex items-center justify-between z-20 bg-slate-950/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                        <span class="text-[11.5px] font-black text-amber-400 flex items-center gap-1.5">
                            ${slide.swipePrompt || 'اسحب لليسار للمتابعة 👈'}
                        </span>
                        <div class="flex gap-1">
                            ${Array.from({length: total}).map((_, i) => `
                                <span class="w-2 h-2 rounded-full ${i === currentNum - 1 ? 'bg-cyan-400 w-5' : 'bg-white/25'} transition-all"></span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (slide.type === 'cta') {
            innerHtml = `
                <!-- Carousel Final Slide (CTA & Store Promotion) -->
                <div class="absolute inset-0 bg-[#070b14] overflow-hidden select-none p-7 flex flex-col justify-between">
                    <!-- Lighting -->
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.22),transparent_70%)]"></div>
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,132,255,0.2),transparent_65%)]"></div>

                    <!-- Header -->
                    <div class="flex items-center justify-between relative z-20">
                        <div class="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                            <span class="text-xs font-black text-white">⚡ @SHOP_COIN15</span>
                        </div>
                        <div class="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/40 text-[11px] font-black text-emerald-300">
                            السلايد الأخير ${currentNum}/${total} 🏁
                        </div>
                    </div>

                    <!-- Main Content Card -->
                    <div class="relative z-20 my-auto text-center space-y-4 py-4">
                        <div class="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black">
                            ${slide.badge || '🚀 متجر shop_coin15'}
                        </div>
                        <h2 class="text-2xl font-black text-white leading-tight font-['Alexandria']">
                            ${slide.title}
                        </h2>
                        <p class="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto font-['Cairo']">
                            ${slide.subtitle}
                        </p>

                        <!-- Feature Badges -->
                        <div class="space-y-2 pt-2 text-right max-w-sm mx-auto">
                            ${(slide.features || []).map(feat => `
                                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3 text-xs font-black text-white">
                                    <span>${feat}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- CTA Button -->
                        <div class="pt-3">
                            <div class="inline-block px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-sm shadow-xl shadow-emerald-500/30 border border-emerald-300/40 animate-pulse">
                                ${slide.ctaText || 'اطلب بالخاص DM 📩'}
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="relative z-20 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-3">
                        <span>متجر معتمد وموثوق منذ 2020</span>
                        <span>انشر الكاروسيل لصديقك ✈️</span>
                    </div>
                </div>
            `;
        } else {
            // Standard Informational / Point Slide
            innerHtml = `
                <!-- Carousel Step / Content Slide -->
                <div class="absolute inset-0 bg-[#090d18] overflow-hidden select-none p-7 flex flex-col justify-between">
                    <!-- Ambient Glow -->
                    <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

                    <!-- Top Bar -->
                    <div class="flex items-center justify-between relative z-20">
                        <div class="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <span class="text-[11px] font-black text-slate-300">@SHOP_COIN15</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-full bg-blue-600/25 border border-blue-400/40 text-blue-300 font-black text-xs flex items-center justify-center">
                                ${slide.number || currentNum}
                            </span>
                            <span class="text-[11px] font-bold text-slate-400">${currentNum} من ${total}</span>
                        </div>
                    </div>

                    <!-- Main Section -->
                    <div class="relative z-20 my-auto text-right space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-600/25 border border-blue-400/30">
                            ${slide.icon || '💡'}
                        </div>
                        <h2 class="text-xl font-black text-white leading-snug font-['Alexandria']">
                            ${slide.title}
                        </h2>
                        <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-200 leading-relaxed font-['Cairo'] font-medium">
                            ${slide.body}
                        </div>
                        ${slide.tip ? `
                            <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-bold font-['Cairo'] leading-normal">
                                ${slide.tip}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Bottom Nav -->
                    <div class="relative z-20 flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
                        <span class="text-slate-400 font-bold">تابع القراءة للسلايد التالي 👈</span>
                        <div class="flex gap-1">
                            ${Array.from({length: total}).map((_, i) => `
                                <span class="w-2 h-2 rounded-full ${i === currentNum - 1 ? 'bg-blue-400 w-4' : 'bg-white/20'} transition-all"></span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        canvas.innerHTML = innerHtml;
        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        }
    }

    function renderEditorControls() {
        const container = document.getElementById('suite_carousel_panel');
        if (!container) return;

        const slide = getActiveSlide();
        const total = slides.length;
        const currentNum = activeSlideIndex + 1;

        let html = `
            <div class="space-y-4">
                <!-- Preset Carousel Switcher -->
                <div class="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="font-black text-blue-950 flex items-center gap-1.5">
                            <span>📚 سلاسل كاروسيل جاهزة ومجربة:</span>
                        </span>
                    </div>
                    <div class="grid grid-cols-1 gap-1.5">
                        <button type="button" onclick="CarouselEngine.applyPreset('security_guide')" class="px-3 py-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-xs text-right transition flex items-center justify-between shadow-xs">
                            <span>🛡️ أخطاء تصفير الحسابات والأمان (5 سلايدات)</span>
                            <span class="text-blue-500 text-[10px]">تطبيق ✨</span>
                        </button>
                        <button type="button" onclick="CarouselEngine.applyPreset('squad_budget')" class="px-3 py-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-xs text-right transition flex items-center justify-between shadow-xs">
                            <span>💰 بناء تشكيلة ميتا بميزانية ذكية (4 سلايدات)</span>
                            <span class="text-blue-500 text-[10px]">تطبيق ✨</span>
                        </button>
                        <button type="button" onclick="CarouselEngine.applyPreset('why_shopcoin15')" class="px-3 py-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-xs text-right transition flex items-center justify-between shadow-xs">
                            <span>⭐ لماذا نحن خيارك الأول؟ سرعة وضمان (4 سلايدات)</span>
                            <span class="text-blue-500 text-[10px]">تطبيق ✨</span>
                        </button>
                    </div>
                </div>

                <!-- Active Slide Details Header -->
                <div class="p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-md bg-blue-600 text-white font-black text-[10.5px]">سلايد ${currentNum} من ${total}</span>
                        <span class="font-black text-slate-800">${slide.type === 'cover' ? 'غلاف الكاروسيل الرئيسي' : (slide.type === 'cta' ? 'سلايد الخاتمة وطلب الشحن' : 'سلايد تعليمي / نصيحة')}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="CarouselEngine.duplicateSlide(${activeSlideIndex})" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-50 transition">
                            نسخ ⧉
                        </button>
                        ${total > 2 ? `
                            <button type="button" onclick="CarouselEngine.removeSlide(${activeSlideIndex})" class="px-2 py-1 rounded-lg bg-red-50 border border-red-200 text-red-600 font-bold text-[11px] hover:bg-red-100 transition">
                                حذف ✕
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Slide Inputs -->
                <div class="space-y-3">
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">عنوان السلايد:</label>
                        <input type="text" value="${(slide.title || '').replace(/"/g, '&quot;')}" 
                               oninput="CarouselEngine.updateActiveSlideField('title', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition">
                    </div>
        `;

        if (slide.type === 'cover') {
            html += `
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">الوصف التمهيدي (Sub-headline):</label>
                        <textarea rows="2" oninput="CarouselEngine.updateActiveSlideField('subtitle', this.value)"
                                  class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-blue-500 focus:bg-white transition resize-none">${slide.subtitle || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">شارة الترويسة (Badge):</label>
                        <input type="text" value="${(slide.badge || '').replace(/"/g, '&quot;')}" 
                               oninput="CarouselEngine.updateActiveSlideField('badge', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">رابط صورة كرت الغلاف (FUT.GG WebP / Proxy):</label>
                        <input type="text" value="${(slide.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="CarouselEngine.updateActiveSlideField('cardUrl', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono outline-none focus:border-blue-500 focus:bg-white transition">
                    </div>
            `;
        } else if (slide.type === 'cta') {
            html += `
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">الوصف والتحفيز:</label>
                        <textarea rows="2" oninput="CarouselEngine.updateActiveSlideField('subtitle', this.value)"
                                  class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-blue-500 focus:bg-white transition resize-none">${slide.subtitle || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">نص زر الطلب (CTA):</label>
                        <input type="text" value="${(slide.ctaText || '').replace(/"/g, '&quot;')}" 
                               oninput="CarouselEngine.updateActiveSlideField('ctaText', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition">
                    </div>
            `;
        } else {
            html += `
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">نص الشرح والمعلومة:</label>
                        <textarea rows="3" oninput="CarouselEngine.updateActiveSlideField('body', this.value)"
                                  class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium leading-relaxed outline-none focus:border-blue-500 focus:bg-white transition resize-none">${slide.body || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">نصيحة المتجر (مربع ذهبي سفلي):</label>
                        <input type="text" value="${(slide.tip || '').replace(/"/g, '&quot;')}" 
                               oninput="CarouselEngine.updateActiveSlideField('tip', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition">
                    </div>
            `;
        }

        html += `
                </div>

                <!-- Batch Export Action Box -->
                <div class="pt-3 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="CarouselEngine.exportAllSlides()" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/25">
                        <span>👑 تصدير كافة السلايدات بدقة 4K (${total} صور)</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.sendCarouselTelegram()" class="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-sm">
                        <span>🚀 إرسال كل السلايدات للتليجرام كألبوم</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    function updateActiveSlideField(field, value) {
        if (!slides[activeSlideIndex]) return;
        slides[activeSlideIndex][field] = value;
        renderSlideToMainCanvas();
        // Lightly update filmstrip title
        const currentThumbTitle = document.querySelector(`#carouselFilmstripContainer button:nth-child(${activeSlideIndex + 1}) .line-clamp-3`);
        if (currentThumbTitle && field === 'title') {
            currentThumbTitle.textContent = value;
        }
    }

    async function exportAllSlides() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevIndex = activeSlideIndex;
        if (window.showCopyToast) {
            window.showCopyToast(`جارِ تصدير ${slides.length} سلايدات بدقة 4K فائقة... ⏳`);
        }

        for (let i = 0; i < slides.length; i++) {
            setActiveIndex(i);
            // Wait for DOM & images to settle
            await new Promise(r => setTimeout(r, 450));
            await window.CanvasExporter.downloadNative('exportCanvas', 'jpg', `carousel_slide_${i + 1}_of_${slides.length}`);
            await new Promise(r => setTimeout(r, 300));
        }

        setActiveIndex(prevIndex);
        if (window.showCopyToast) {
            window.showCopyToast('تم تصدير جميع سلايدات الكاروسيل بجودة 4K بنجاح! 🚀🎉');
        }
    }

    async function sendCarouselTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        const prevIndex = activeSlideIndex;
        if (window.showCopyToast) {
            window.showCopyToast(`جارِ إرسال ${slides.length} سلايدات إلى هاتفك عبر التليجرام... 🚀`);
        }

        for (let i = 0; i < slides.length; i++) {
            setActiveIndex(i);
            await new Promise(r => setTimeout(r, 400));
            const caption = `📚 سلايد الكاروسيل (${i + 1}/${slides.length}) - @shop_coin15`;
            await window.TelegramManager.sendDesignInternal('exportCanvas', caption);
            await new Promise(r => setTimeout(r, 500));
        }

        setActiveIndex(prevIndex);
        if (window.showCopyToast) {
            window.showCopyToast('تم إرسال كامل الكاروسيل إلى التليجرام بنجاح! 📱✨');
        }
    }

    return {
        getSlides,
        getActiveSlide,
        getActiveIndex,
        setActiveIndex,
        addSlide,
        removeSlide,
        duplicateSlide,
        applyPreset,
        renderFilmstrip,
        renderSlideToMainCanvas,
        renderEditorControls,
        updateActiveSlideField,
        exportAllSlides,
        sendCarouselTelegram
    };
})();
