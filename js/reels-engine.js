/**
 * ShopCoin15 Studio - EA FC 27 Reels Engine (Version 4.0 Natural Controls)
 * 1. Strictly text on screen + background music (NO voiceover complexity).
 * 2. Pure idea bank where user has 100% control over players.
 * 3. 100% Authentic EA Sports FC 27 marble background & official EA FC 27 and ShopCoin15 logos.
 * 4. PURE STABLE COORDINATES: Elements have width: max-content and canvas has direction: ltr.
 *    Moving right or left NEVER changes element size! Size is 100% constant and independent.
 * 5. NATURAL SIZE & POSITION CONTROLS:
 *    - Dedicated Scale slider, -5% and +5% buttons, and quick presets (85%, 100%, 118%).
 *    - Corner resize handle (⤡) on canvas.
 *    - Center 50% button + precision nudge arrows (⬆️ ⬇️ ⬅️ ➡️).
 * 6. Two dedicated sections: 🏆 الترتيب التنازلي (Countdown) & ⚔️ مقارنة العمالقة (Versus Duel).
 */

window.ReelsEngine = (function() {
    const STORAGE_KEY = 'shopcoin15_reel_layouts_v6';

    // ---- 1. DEFAULT PERFECT-ALIGNED LAYOUTS (Percentages) ----
    const DEFAULT_LAYOUTS = {
        countdown: {
            rank: { top: 7.0, left: 50, scale: 1.0 },
            title: { top: 15.0, left: 50, scale: 1.0 },
            card: { top: 21.0, left: 50, scale: 0.95 },
            playerName: { top: 81.5, left: 50, scale: 1.0 },
            fcLogo: { top: 4, left: 88, scale: 1.0 },
            scLogo: { top: 92.5, left: 50, scale: 0.95 },
            // Intro slide elements
            introBadge: { top: 20, left: 50, scale: 1.0 },
            introTitle: { top: 28, left: 50, scale: 1.0 },
            introSubtitle: { top: 56, left: 50, scale: 1.0 },
            introCta: { top: 66, left: 50, scale: 1.0 },
            // Outro slide elements (Optimized spacing: zero collisions)
            outroLogo: { top: 11, left: 50, scale: 1.0 },
            outroTitle: { top: 21, left: 50, scale: 1.0 },
            outroSubtitle: { top: 33, left: 50, scale: 1.0 },
            outroFeatures: { top: 45, left: 50, scale: 1.0 },
            outroCta: { top: 76, left: 50, scale: 1.0 }
        },
        versus: {
            title: { top: 12.5, left: 50, scale: 1.0 },
            cardA: { top: 27, left: 73, scale: 0.92 },
            cardB: { top: 27, left: 27, scale: 0.92 },
            vsBadge: { top: 45, left: 50, scale: 1.0 },
            question: { top: 77, left: 50, scale: 1.0 },
            fcLogo: { top: 4, left: 88, scale: 1.0 },
            scLogo: { top: 91, left: 50, scale: 1.0 },
            // Intro slide elements
            introBadge: { top: 20, left: 50, scale: 1.0 },
            introTitle: { top: 28, left: 50, scale: 1.0 },
            introSubtitle: { top: 56, left: 50, scale: 1.0 },
            introCta: { top: 66, left: 50, scale: 1.0 },
            // Outro slide elements (Optimized spacing: zero collisions)
            outroLogo: { top: 11, left: 50, scale: 1.0 },
            outroTitle: { top: 21, left: 50, scale: 1.0 },
            outroSubtitle: { top: 33, left: 50, scale: 1.0 },
            outroFeatures: { top: 45, left: 50, scale: 1.0 },
            outroCta: { top: 76, left: 50, scale: 1.0 }
        }
    };

    // Safe Image Proxy Resolver (Bypasses FUT.GG 403 & CORS Hotlink Protection)
    function toProxyUrl(url) {
        if (!url || typeof url !== 'string') return '';
        const trimmed = url.trim();
        if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('assets/') || trimmed.startsWith('/assets/')) {
            return trimmed;
        }
        if (trimmed.includes('/api/image-proxy')) return trimmed;
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            try {
                const u = new URL(trimmed);
                if (typeof window !== 'undefined' && (u.hostname === window.location.hostname || u.hostname === 'localhost' || u.hostname === '127.0.0.1')) {
                    return trimmed;
                }
            } catch (e) {}
            return `/api/image-proxy?url=${encodeURIComponent(trimmed)}`;
        }
        return trimmed;
    }

    function getCurrentSlideElements() {
        const currentSlide = state.slides[state.currentSlideIndex];
        if (!currentSlide) return [];

        if (currentSlide.type === 'intro') {
            return [
                { id: 'introTitle', name: '📢 مانشيت البداية (Hook Title)' },
                { id: 'introBadge', name: '🏷️ شارة العنوان (Badge)' },
                { id: 'introSubtitle', name: '📝 الوصف والتحفيز (Subtitle)' },
                { id: 'introCta', name: '👇 زر الدعوة للإجراء (CTA Button)' },
                { id: 'fcLogo', name: '⚡ شعار EA FC 27 الرسمي' },
                { id: 'scLogo', name: '👑 شعار المتجر ShopCoin15' }
            ];
        } else if (currentSlide.type === 'player_card') {
            return [
                { id: 'card', name: '🃏 كرت اللاعب والشارات' },
                { id: 'rank', name: '🏆 رقم الرانك (الترتيب)' },
                { id: 'title', name: '🏷️ عنوان الريل المانشيت' },
                { id: 'playerName', name: '⚽ اسم اللاعب' },
                { id: 'fcLogo', name: '⚡ شعار EA FC 27 الرسمي' },
                { id: 'scLogo', name: '👑 شعار المتجر ShopCoin15' }
            ];
        } else if (currentSlide.type === 'versus_card') {
            return [
                { id: 'cardA', name: '🃏 كرت اللاعب الأول (اليمين)' },
                { id: 'cardB', name: '🃏 كرت اللاعب الثاني (اليسار)' },
                { id: 'vsBadge', name: '⚔️ شعار VS المضيء' },
                { id: 'title', name: '🏷️ عنوان المقارنة' },
                { id: 'question', name: '💬 سؤال التفاعل بالأسفل' },
                { id: 'fcLogo', name: '⚡ شعار EA FC 27 الرسمي' },
                { id: 'scLogo', name: '👑 شعار المتجر ShopCoin15' }
            ];
        } else if (currentSlide.type === 'outro') {
            return [
                { id: 'outroLogo', name: '👑 لوجو المتجر الرئيسي' },
                { id: 'outroTitle', name: '🏷️ عنوان الخاتمة' },
                { id: 'outroSubtitle', name: '✨ شريط الميزات الذهبي' },
                { id: 'outroFeatures', name: '🔒 بطاقات الضمان والسرعة' },
                { id: 'outroCta', name: '📩 زر الطلب والتواصل' },
                { id: 'fcLogo', name: '⚡ شعار EA FC 27 الرسمي' },
                { id: 'scLogo', name: '👑 شعار المتجر ShopCoin15' }
            ];
        }
        return [
            { id: 'title', name: '🏷️ العنوان' },
            { id: 'fcLogo', name: '⚡ شعار EA FC 27' },
            { id: 'scLogo', name: '👑 شعار المتجر' }
        ];
    }

    function ensureSelectedDragElement(forceSelectIfNull = false) {
        if (!state.selectedDragElement) {
            if (forceSelectIfNull) {
                const elements = getCurrentSlideElements();
                if (elements.length > 0) state.selectedDragElement = elements[0].id;
            }
            return;
        }
        const elements = getCurrentSlideElements();
        if (elements.length === 0) {
            state.selectedDragElement = null;
            return;
        }
        const exists = elements.some(e => e.id === state.selectedDragElement);
        if (!exists) {
            state.selectedDragElement = elements[0].id;
        }
    }

    function loadSavedLayouts() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    countdown: { ...DEFAULT_LAYOUTS.countdown, ...(parsed.countdown || {}) },
                    versus: { ...DEFAULT_LAYOUTS.versus, ...(parsed.versus || {}) }
                };
            }
        } catch (e) {
            console.warn('Could not load saved layouts:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_LAYOUTS));
    }

    const FONT_STORAGE_KEY = 'shopcoin15_reel_font_v1';

    function loadSavedFontFamily() {
        try {
            const saved = localStorage.getItem(FONT_STORAGE_KEY);
            if (saved && ['thmanyah', 'zain', 'alexandria'].includes(saved)) {
                return saved;
            }
        } catch (e) {}
        return 'thmanyah';
    }

    const PROGRESS_BAR_STORAGE_KEY = 'shopcoin15_reels_progressbar_v2';
    const SLIDE_TRANSITION_STORAGE_KEY = 'shopcoin15_reels_transition_v2';

    const REELS_PROGRESS_STYLES = [
        {
            id: 'capsule_neon',
            name: 'كبسولات نيون عائمة',
            desc: 'كبسولات زجاجية منفصلة مع توهج نيون مشع وخلفية بلور',
            icon: '💊'
        },
        {
            id: 'laser_beam',
            name: 'خط ليزري متصل',
            desc: 'خط ليزري انسيابي واحد مع رأس متوهج يقود شريط التقدم',
            icon: '⚡'
        },
        {
            id: 'ig_vip_pills',
            name: 'نقاط VIP الذكية',
            desc: 'نقاط دائرية أنيقة تتمدد لكبسولة طويلة أثناء عرض السلايد',
            icon: '⚪'
        },
        {
            id: 'gradient_stream',
            name: 'تدرج ملوكي فاخر',
            desc: 'شريط انسيابي يمزج الذهب والزمرد والنيون مع انعكاس ضوئي',
            icon: '🌈'
        },
        {
            id: 'minimal_ticks',
            name: 'مؤشرات دقيقة شفافة',
            desc: 'خطوط ميكرو فائقة النحافة (2.5px) لإبراز الكرت والتصميم',
            icon: '📏'
        }
    ];

    const DEFAULT_PROGRESS_BAR = {
        enabled: true,
        style: 'capsule_neon', // 'capsule_neon' | 'laser_beam' | 'ig_vip_pills' | 'gradient_stream' | 'minimal_ticks'
        color: 'amber', // 'amber' | 'emerald' | 'white' | 'purple' | 'cyan'
        thickness: 'medium', // 'thin' (3px) | 'medium' (5px) | 'thick' (7px)
        height: 5,
        topOffset: 14
    };

    function loadSavedProgressBar() {
        try {
            const saved = localStorage.getItem(PROGRESS_BAR_STORAGE_KEY);
            if (saved) {
                return { ...DEFAULT_PROGRESS_BAR, ...JSON.parse(saved) };
            }
        } catch (e) {}
        return { ...DEFAULT_PROGRESS_BAR };
    }

    const REELS_SLIDE_TRANSITIONS = [
        {
            id: 'smooth_fade',
            name: 'تلاشي سينمائي',
            desc: 'دمج هوليوودي ناعم وانسيابي بين السلايدات',
            icon: '🎬'
        },
        {
            id: 'push_slide',
            name: 'سحب وانزلاق',
            desc: 'حركة انزلاق أفقية سريعة تعطي طابع التصفح السريع',
            icon: '↔️'
        },
        {
            id: 'zoom_warp',
            name: 'اختراق وتكبير',
            desc: 'اندفاع واختراق سريع للداخل يجذب انتباه المشاهد',
            icon: '🔍'
        },
        {
            id: 'flash_cut',
            name: 'وميض خاطف',
            desc: 'وميض ضوئي فلاش أبيض مثل ريلز التيك توك الاحترافية',
            icon: '⚡'
        },
        {
            id: 'flip_3d',
            name: 'دوران 3D',
            desc: 'دوران بطاقة مجسمة في الفضاء ثلاثي الأبعاد',
            icon: '🔄'
        },
        {
            id: 'whoosh_blur',
            name: 'موشن بلور خاطف',
            desc: 'حركة سريعة مع غباش سينمائي (Motion Blur)',
            icon: '💨'
        },
        {
            id: 'instant',
            name: 'قطع مباشر',
            desc: 'تبديل فوري كلاسيكي بدون أي تأثير إضافي',
            icon: '✂️'
        }
    ];

    const DEFAULT_SLIDE_TRANSITION = {
        type: 'smooth_fade', // 'smooth_fade' | 'push_slide' | 'zoom_warp' | 'flash_cut' | 'flip_3d' | 'whoosh_blur' | 'instant'
        duration: 0.35, // seconds (0.2s - 0.7s)
        soundEnabled: true
    };

    function loadSavedSlideTransition() {
        try {
            const saved = localStorage.getItem(SLIDE_TRANSITION_STORAGE_KEY);
            if (saved) {
                return { ...DEFAULT_SLIDE_TRANSITION, ...JSON.parse(saved) };
            }
        } catch (e) {}
        return { ...DEFAULT_SLIDE_TRANSITION };
    }

    // ---- 1.4 CURATED PRESET STICKERS & BADGES ----
    const REELS_PRESET_BADGES = {
        sales: [
            { text: '⚡ تسليم فوري خلال دقيقة', style: 'emerald' },
            { text: '🔒 ضمان كامل من التصفير', style: 'emerald' },
            { text: '💰 أرخص كوينز بالسوق', style: 'gold' },
            { text: '👑 توصية المتجر', style: 'gold' },
            { text: '🔥 الأكثر طلباً وشراءً', style: 'fire' },
            { text: '🚨 اشحن بأمان واحذر الباند', style: 'dark' },
            { text: '⏳ عرض لفترة محدودة', style: 'fire' },
            { text: '🏆 كرت الفوت تشامبيونز', style: 'purple' }
        ],
        meta: [
            { text: '⭐ ميتا 100% مكسر اللعبة', style: 'gold' },
            { text: '⚡ سرعة خارقة +93', style: 'fire' },
            { text: '🧱 جدار دفاعي صلب', style: 'dark' },
            { text: '🎯 إنهاء خيالي 5/5 Weak Foot', style: 'gold' },
            { text: '🪄 5 نجوم مهارات (5★ Skills)', style: 'purple' },
            { text: '💎 أفضل قيمة مقابل سعر', style: 'emerald' },
            { text: '💪 بدنيات مرعبة 99 Strength', style: 'dark' },
            { text: '🧤 حارس أخطبوطي خارق', style: 'emerald' }
        ],
        cta: [
            { text: '📩 اطلب الآن على الخاص', style: 'emerald' },
            { text: '👇 صوت بالتعليقات: يستاهل؟', style: 'dark' },
            { text: '❤️ لايك وفولو للمزيد', style: 'fire' },
            { text: '👀 احفظ الريل لبداية اللعبة', style: 'gold' },
            { text: '🔥 منشن خويك اللي يحتاجه', style: 'fire' }
        ]
    };

    // ---- 1.5 REELS ENTRANCE ANIMATIONS CONFIG & STYLES ----
    const ANIMATION_STORAGE_KEY = 'shopcoin15_reels_animations_v2';
    const ANIM_ENABLED_STORAGE_KEY = 'shopcoin15_reels_anim_enabled_v2';

    const DEFAULT_ELEMENT_ANIMATIONS = {
        title: { type: 'fadeUp', delay: 0.05, duration: 0.6 },
        card: { type: 'popScale', delay: 0.2, duration: 0.65 },
        cardA: { type: 'slideRight', delay: 0.15, duration: 0.6 },
        cardB: { type: 'slideLeft', delay: 0.25, duration: 0.6 },
        vsBadge: { type: 'popScale', delay: 0.35, duration: 0.5 },
        playerName: { type: 'fadeUp', delay: 0.3, duration: 0.6 },
        rank: { type: 'popScale', delay: 0.05, duration: 0.5 },
        scLogo: { type: 'glowPulse', delay: 0.4, duration: 0.7 },
        fcLogo: { type: 'fadeDown', delay: 0.1, duration: 0.6 },
        introTitle: { type: 'fadeUp', delay: 0.1, duration: 0.6 },
        introBadge: { type: 'fadeDown', delay: 0.0, duration: 0.5 },
        introSubtitle: { type: 'fadeUp', delay: 0.25, duration: 0.6 },
        introCta: { type: 'popScale', delay: 0.4, duration: 0.6 },
        outroLogo: { type: 'glowPulse', delay: 0.1, duration: 0.7 },
        outroTitle: { type: 'fadeUp', delay: 0.2, duration: 0.6 },
        outroSubtitle: { type: 'fadeUp', delay: 0.3, duration: 0.6 },
        outroFeatures: { type: 'popScale', delay: 0.35, duration: 0.6 },
        outroCta: { type: 'popScale', delay: 0.5, duration: 0.6 },
        question: { type: 'fadeUp', delay: 0.4, duration: 0.6 }
    };

    const ANIMATION_TYPES = [
        { id: 'none', label: '⏹️ ثابت (بدون حركة)' },
        { id: 'fadeUp', label: '⬆️ انزلاق صاعد ناعم (Fade Up)' },
        { id: 'fadeDown', label: '⬇️ انزلاق هابط أنيق (Fade Down)' },
        { id: 'popScale', label: '💥 تكبير مرن وقوي (Pop & Scale)' },
        { id: 'slideRight', label: '➡️ دخول سلس من اليمين (Slide Right)' },
        { id: 'slideLeft', label: '⬅️ دخول سلس من اليسار (Slide Left)' },
        { id: 'glowPulse', label: '✨ وميض وتوهج ذهبي (Glow Burst)' },
        { id: 'cinematicZoom', label: '🔍 تكبير سينمائي تدريجي (Zoom In)' },
        { id: 'flip3d', label: '🔄 دوران ثلاثي الأبعاد (3D Flip)' },
        { id: 'heartbeat', label: '💓 نبضة حيوية (Heartbeat)' }
    ];

    function loadSavedAnimations() {
        try {
            const saved = localStorage.getItem(ANIMATION_STORAGE_KEY);
            if (saved) {
                return { ...DEFAULT_ELEMENT_ANIMATIONS, ...JSON.parse(saved) };
            }
        } catch (e) {}
        return JSON.parse(JSON.stringify(DEFAULT_ELEMENT_ANIMATIONS));
    }

    function loadSavedAnimEnabled() {
        try {
            const val = localStorage.getItem(ANIM_ENABLED_STORAGE_KEY);
            if (val !== null) return val === '1';
        } catch (e) {}
        return true;
    }

    function saveAnimationsState() {
        try {
            localStorage.setItem(ANIMATION_STORAGE_KEY, JSON.stringify(state.elementAnimations));
            localStorage.setItem(ANIM_ENABLED_STORAGE_KEY, state.animationsEnabled ? '1' : '0');
        } catch (e) {}
    }

    function injectAnimationStyles() {
        if (typeof document === 'undefined') return;
        if (document.getElementById('reels-animations-style')) return;
        const style = document.createElement('style');
        style.id = 'reels-animations-style';
        style.textContent = `
            @keyframes reelAnim_fadeUp {
                0% { opacity: 0; transform: translateY(32px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes reelAnim_fadeDown {
                0% { opacity: 0; transform: translateY(-32px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes reelAnim_popScale {
                0% { opacity: 0; transform: scale(0.65); }
                70% { opacity: 1; transform: scale(1.05); }
                100% { opacity: 1; transform: scale(1.0); }
            }
            @keyframes reelAnim_slideRight {
                0% { opacity: 0; transform: translateX(55px); }
                100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes reelAnim_slideLeft {
                0% { opacity: 0; transform: translateX(-55px); }
                100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes reelAnim_glowPulse {
                0% { opacity: 0; transform: scale(0.88); filter: drop-shadow(0 0 0px rgba(245,158,11,0)); }
                60% { opacity: 1; transform: scale(1.06); filter: drop-shadow(0 0 22px rgba(245,158,11,0.9)); }
                100% { opacity: 1; transform: scale(1.0); filter: drop-shadow(0 0 6px rgba(245,158,11,0.35)); }
            }
            @keyframes reelAnim_cinematicZoom {
                0% { opacity: 0; transform: scale(1.16); filter: blur(3px); }
                100% { opacity: 1; transform: scale(1.0); filter: blur(0px); }
            }
            @keyframes reelAnim_flip3d {
                0% { opacity: 0; transform: perspective(500px) rotateX(40deg) translateY(20px); }
                100% { opacity: 1; transform: perspective(500px) rotateX(0deg) translateY(0); }
            }
            @keyframes reelAnim_heartbeat {
                0% { opacity: 0; transform: scale(0.85); }
                35% { opacity: 1; transform: scale(1.08); }
                65% { transform: scale(0.96); }
                100% { opacity: 1; transform: scale(1.0); }
            }
            @keyframes reelHookCardsStream {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
            }
            @keyframes reelHookCardsStreamReverse {
                0% { transform: translate3d(-50%, 0, 0); }
                100% { transform: translate3d(0, 0, 0); }
            }
            @keyframes reelHookFanFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            @keyframes reelHookMysteryPulse {
                0%, 100% { transform: scale(1.0); filter: drop-shadow(0 0 16px rgba(245,158,11,0.5)) drop-shadow(0 0 35px rgba(217,119,6,0.3)); }
                50% { transform: scale(1.05); filter: drop-shadow(0 0 32px rgba(245,158,11,0.95)) drop-shadow(0 0 60px rgba(217,119,6,0.6)); }
            }
            @keyframes reelHookMysteryQuestion {
                0%, 100% { transform: scale(1.0) rotate(0deg); }
                50% { transform: scale(1.15) rotate(4deg); }
            }
            /* Slide Transitions Keyframes */
            @keyframes reelSlideTrans_smooth_fade {
                0% { opacity: 0; transform: scale(0.97); }
                100% { opacity: 1; transform: scale(1.0); }
            }
            @keyframes reelSlideTrans_push_slide {
                0% { opacity: 0; transform: translateX(50px) scale(0.97); }
                100% { opacity: 1; transform: translateX(0) scale(1.0); }
            }
            @keyframes reelSlideTrans_zoom_warp {
                0% { opacity: 0; transform: scale(1.14); filter: blur(2px); }
                100% { opacity: 1; transform: scale(1.0); filter: blur(0px); }
            }
            @keyframes reelSlideTrans_flash_cut {
                0% { opacity: 0; filter: brightness(2.8) saturate(1.4); }
                30% { opacity: 1; filter: brightness(1.9); }
                100% { opacity: 1; filter: brightness(1.0) saturate(1.0); }
            }
            @keyframes reelSlideTrans_flip_3d {
                0% { opacity: 0; transform: perspective(700px) rotateY(-16deg) scale(0.95); }
                100% { opacity: 1; transform: perspective(700px) rotateY(0deg) scale(1.0); }
            }
            @keyframes reelSlideTrans_whoosh_blur {
                0% { opacity: 0; transform: translateX(-40px) skewX(-3deg); filter: blur(5px); }
                100% { opacity: 1; transform: translateX(0) skewX(0); filter: blur(0px); }
            }
            @keyframes reelLaserPulse {
                0%, 100% { transform: translateY(-50%) scale(1); filter: drop-shadow(0 0 6px currentColor); }
                50% { transform: translateY(-50%) scale(1.25); filter: drop-shadow(0 0 14px currentColor); }
            }
            @keyframes reelGradientFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .reel-anim-layer {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    injectAnimationStyles();

    // =========================================================================
    // ---- 1.7 ADVANCED REELS AUDIO & SFX SYNTHESIZER ENGINE ----
    // =========================================================================
    const AUDIO_STORAGE_KEY = 'shopcoin15_reels_audio_v2';
    let globalAudioCtx = null;

    function getAudioContext() {
        if (!globalAudioCtx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                globalAudioCtx = new AudioCtx();
            }
        }
        if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
            globalAudioCtx.resume().catch(() => {});
        }
        return globalAudioCtx;
    }

    // =========================================================================
    // ---- 1.7 ADVANCED REELS AUDIO & SFX SYNTHESIZER ENGINE (33+ TRACKS) ----
    // =========================================================================
    const REELS_MUSIC_LIBRARY = [
        // --- 1. PHONK & DRIFT (8 tracks) ---
        {
            id: 'phonk_drift_king',
            genre: 'phonk',
            titleAr: 'ملك الدريفت (Drift King)',
            titleEn: 'Drift King Anthem',
            bpm: 132,
            mood: 'سرعة وحماس عالي 🔥',
            desc: 'أصوات كاوبيل حادة وإيقاع فونك ناري لكروت الهجوم السريعة',
            cowbellNotes: [740, 880, 988, 1108, 880, 740, 659, 740]
        },
        {
            id: 'phonk_tokyo_shadow',
            genre: 'phonk',
            titleAr: 'طوكيو شادو (Tokyo Shadow)',
            titleEn: 'Tokyo Shadow Phonk',
            bpm: 130,
            mood: 'غموض وهيبة مظلمة 🌑',
            desc: 'نغمات كاوبيل شرقية عميقة مع بيز 808 زاحف',
            cowbellNotes: [659, 784, 880, 1046, 880, 784, 659, 587]
        },
        {
            id: 'phonk_neon_overdrive',
            genre: 'phonk',
            titleAr: 'نيون أوفر درايف (Neon Overdrive)',
            titleEn: 'Neon Overdrive',
            bpm: 136,
            mood: 'انفجار طاقة ⚡',
            desc: 'إيقاع سباق سيارات متسارع يرفع الأدرينالين',
            cowbellNotes: [880, 988, 1175, 1318, 1175, 988, 880, 784]
        },
        {
            id: 'phonk_midnight_rider',
            genre: 'phonk',
            titleAr: 'فارس الليل (Midnight Phonk)',
            titleEn: 'Midnight Phonk Rider',
            bpm: 128,
            mood: 'أجواء ليلية سينمائية 🏎️',
            desc: 'بيز ثقيل مع أصوات تيربو وتدرجات سنث متناغمة',
            cowbellNotes: [587, 659, 784, 880, 784, 659, 587, 523]
        },
        {
            id: 'phonk_brazilian_rage',
            genre: 'phonk',
            titleAr: 'فونك برازيلي ريج (Brazilian Rage)',
            titleEn: 'Brazilian Phonk Rage',
            bpm: 138,
            mood: 'ترند تيك توك الأول 🇧🇷',
            desc: 'ضربات درامز برازيلية حماسية ومميزة جداً لكروت المهارات',
            cowbellNotes: [740, 880, 1108, 1480, 1108, 880, 740, 659]
        },
        {
            id: 'phonk_cyber_ghost',
            genre: 'phonk',
            titleAr: 'شبح السايبر (Cyber Ghost)',
            titleEn: 'Cyber Ghost Phonk',
            bpm: 130,
            mood: 'رعب تكتيكي وسرعة 👻',
            desc: 'مؤثرات ديجيتال متداخلة مع كاوبيل إيقاعي مخيف',
            cowbellNotes: [622, 698, 830, 932, 830, 698, 622, 554]
        },
        {
            id: 'phonk_nightcore_rush',
            genre: 'phonk',
            titleAr: 'نايت كور راش (Nightcore Rush)',
            titleEn: 'Nightcore Rush Phonk',
            bpm: 140,
            mood: 'سرعة خارقة 140 BPM 🚀',
            desc: 'تراك فائق السرعة لكروت الـ Pace 99 والأجنحة السريعة',
            cowbellNotes: [880, 1046, 1175, 1397, 1175, 1046, 880, 784]
        },
        {
            id: 'phonk_underground_clash',
            genre: 'phonk',
            titleAr: 'صراع الشوارع (Underground Clash)',
            titleEn: 'Underground Clash',
            bpm: 132,
            mood: 'تحدي قوي ⚔️',
            desc: 'إيقاع شوارع خام بمستوى صوت جهير فائق القوة',
            cowbellNotes: [659, 740, 880, 988, 880, 740, 659, 587]
        },

        // --- 2. FOOTBALL DRILL & TRAP (8 tracks) ---
        {
            id: 'drill_london_808',
            genre: 'drill',
            titleAr: 'دريل لندن 808 (London 808 Drill)',
            titleEn: 'London 808 Football Drill',
            bpm: 140,
            mood: 'هيبة كروية إنجليزية 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
            desc: 'انزلاقات بيز 808 الشهيرة مع سنيير حاد وهاي هات ثلاثي متدحرج',
            bassNotes: [55.0, 43.65, 65.41, 58.27]
        },
        {
            id: 'drill_golden_boot',
            genre: 'drill',
            titleAr: 'الحذاء الذهبي (Golden Boot Trap)',
            titleEn: 'Golden Boot Trap',
            bpm: 135,
            mood: 'ثقة الهدافين ⚽',
            desc: 'تراب ثقيل متناسق مع كروت المهاجمين وأهداف الـ Finisher',
            bassNotes: [49.0, 41.2, 58.27, 49.0]
        },
        {
            id: 'drill_wembley_slide',
            genre: 'drill',
            titleAr: 'ويمبلي سلايد (Wembley 808 Slide)',
            titleEn: 'Wembley Slide Anthem',
            bpm: 142,
            mood: 'زلزال الملاعب 🏟️',
            desc: 'تدرج جهير عميق يعطي وزناً وهيبة ضخمة للريلز عند استعراض اللاعب',
            bassNotes: [51.91, 38.89, 61.74, 51.91]
        },
        {
            id: 'drill_striker_mode',
            genre: 'drill',
            titleAr: 'وضع المهاجم 140 (Striker Mode)',
            titleEn: 'Striker Mode 140',
            bpm: 140,
            mood: 'هجوم كاسح 🎯',
            desc: 'إيقاع ضربات حاسمة وهاي هاتس مكثفة تركز انتباه المشاهد',
            bassNotes: [58.27, 49.0, 65.41, 55.0]
        },
        {
            id: 'drill_ultimate_team',
            genre: 'drill',
            titleAr: 'ألتميت تيم بيلد (Ultimate Team Drill)',
            titleEn: 'Ultimate Team Drill',
            bpm: 136,
            mood: 'تشكيلة المليارات 👑',
            desc: 'مزيج تراب حديث يركز على الفخامة وقوة التشكيلة',
            bassNotes: [43.65, 51.91, 58.27, 65.41]
        },
        {
            id: 'drill_street_panenka',
            genre: 'drill',
            titleAr: 'بانينكا الشوارع (Street Panenka)',
            titleEn: 'Street Panenka Trap',
            bpm: 130,
            mood: 'مهارة وذكاء 🪄',
            desc: 'إيقاع كروي فري ستايل حركي مع صدى مميز للكيك',
            bassNotes: [65.41, 55.0, 49.0, 43.65]
        },
        {
            id: 'drill_stadium_banger',
            genre: 'drill',
            titleAr: 'انفجار الاستاد (Stadium Banger)',
            titleEn: 'Stadium Banger 808',
            bpm: 144,
            mood: 'أقصى ضغط جماهيري 🔥',
            desc: 'ضربات دريل صلبة لا هوادة فيها لكروت الرانك رقم 1',
            bassNotes: [55.0, 65.41, 73.42, 55.0]
        },
        {
            id: 'drill_var_decision',
            genre: 'drill',
            titleAr: 'قرار الفار الحاسم (VAR Decision)',
            titleEn: 'VAR Decision Dark Trap',
            bpm: 134,
            mood: 'ترقب وحسم ⏱️',
            desc: 'نبضات ترقب متقطعة تتفجر عند ظهور سعر الكوينز',
            bassNotes: [46.25, 41.2, 55.0, 46.25]
        },

        // --- 3. CHAMPIONS ORCHESTRAL (6 tracks) ---
        {
            id: 'champ_anthem_hype',
            genre: 'champions',
            titleAr: 'نشيد الأبطال الحماسي (Champions Anthem Hype)',
            titleEn: 'Champions Anthem Hype',
            bpm: 124,
            mood: 'مجد دوري الأبطال 🏆',
            desc: 'أبواق نحاسية ملحمية مع إيقاع عصري لكروت الـ TOTY والأيقونات'
        },
        {
            id: 'champ_orchestral_glory',
            genre: 'champions',
            titleAr: 'مجد الأوركسترا (Orchestral Glory)',
            titleEn: 'Orchestral Glory',
            bpm: 120,
            mood: 'فخامة ملكية 👑',
            desc: 'وتريات ملحمية تصاعدية تناسب البطاقات الذهبية الاستثنائية'
        },
        {
            id: 'champ_golden_trophy',
            genre: 'champions',
            titleAr: 'الكأس الذهبية (Golden Trophy Fanfare)',
            titleEn: 'Golden Trophy Fanfare',
            bpm: 126,
            mood: 'تتويج الأساطير 🥇',
            desc: 'لحن نصر احتفالي قوي يمنح شعور الإنجاز والبطولة'
        },
        {
            id: 'champ_stadium_epic',
            genre: 'champions',
            titleAr: 'دراما الملاعب الملحمية (Stadium Epic Drama)',
            titleEn: 'Stadium Epic Drama',
            bpm: 118,
            mood: 'توتر وسينما 🎬',
            desc: 'أصوات أوركسترا سينمائية تهيئ المشاهد لمفاجأة كبرى'
        },
        {
            id: 'champ_world_cup',
            genre: 'champions',
            titleAr: 'أفق المونديال (World Cup Horizon)',
            titleEn: 'World Cup Horizon',
            bpm: 125,
            mood: 'أجواء بطولات كبرى 🌍',
            desc: 'إيقاع بطولي يجمع بين دقات التيمباني وسنث الملاعب الحديثة'
        },
        {
            id: 'champ_symphony_victory',
            genre: 'champions',
            titleAr: 'سمفونية الانتصار (Symphony of Victory)',
            titleEn: 'Symphony of Victory',
            bpm: 128,
            mood: 'فرحة الفوز بالدقيقة 90 ⚽',
            desc: 'تصاعد سريع يختتم بإيقاع قوي عند عرض كروت التوب 1'
        },

        // --- 4. CYBER GAMING & SYNTHWAVE (6 tracks) ---
        {
            id: 'cyber_fut_2077',
            genre: 'cyber',
            titleAr: 'سايبر فيفا 2077 (Cyber FUT 2077)',
            titleEn: 'Cyber FUT 2077',
            bpm: 128,
            mood: 'مستقبل ونيون ديجيتال 🤖',
            desc: 'ألحان سنثويف مستقبلية تناسب تصاميم الكروت الإلكترونية الحديثة'
        },
        {
            id: 'cyber_synthwave_84',
            genre: 'cyber',
            titleAr: 'سنثويف 1984 (Retro Synthwave 84)',
            titleEn: 'Retro Synthwave 84',
            bpm: 122,
            mood: 'كلاسيكي عتيق وفخم 🕹️',
            desc: 'نغمات ريترو الثمانينات دافئة ومميزة تناسب كروت الأساطير والـ Icons'
        },
        {
            id: 'cyber_glitch_overdrive',
            genre: 'cyber',
            titleAr: 'غليتش أرينا (Glitch Arena Electro)',
            titleEn: 'Glitch Arena Electro',
            bpm: 130,
            mood: 'أكشن وتكنولوجيا 👾',
            desc: 'مؤثرات ديجيتال متقطعة مع بيز إلكتروني قوي'
        },
        {
            id: 'cyber_digital_stadium',
            genre: 'cyber',
            titleAr: 'الاستاد الرقمي (Digital Stadium)',
            titleEn: 'Digital Stadium Pulse',
            bpm: 126,
            mood: 'حماسي تقني 🌐',
            desc: 'إيقاع ديجيتال ثابت ومنظم يبرز تفاصيل الأرقام والتقييمات بدقة'
        },
        {
            id: 'cyber_hologram_pulse',
            genre: 'cyber',
            titleAr: 'نبض الهولوجرام (Hologram Pulse)',
            titleEn: 'Hologram Pulse',
            bpm: 132,
            mood: 'خيال علمي وسرعة 🌌',
            desc: 'طبقات صوتية ثلاثية الأبعاد تعزز تأثير البطاقات المتحركة 3D'
        },
        {
            id: 'cyber_pixel_arena',
            genre: 'cyber',
            titleAr: 'حلبة البكسل (Pixel Arena Arcade)',
            titleEn: 'Pixel Arena Arcade',
            bpm: 134,
            mood: 'طاقة ألعاب أركيد 🎮',
            desc: 'أصوات ألعاب كلاسيكية مع إيقاع إلكتروني سريع'
        },

        // --- 5. LUXURY CHILL & LOFI (5 tracks) ---
        {
            id: 'lofi_midnight_packs',
            genre: 'lofi',
            titleAr: 'باكات منتصف الليل (Midnight Packs Chill)',
            titleEn: 'Midnight Packs Chill',
            bpm: 88,
            mood: 'هدوء واسترخاء ليلي 🌙',
            desc: 'بيانو رودز دافئ مع دقات بوم باب هادئة وخربشة فينيل مريحة'
        },
        {
            id: 'lofi_smooth_chemistry',
            genre: 'lofi',
            titleAr: 'كيمياء متناغمة (Smooth Chemistry)',
            titleEn: 'Smooth Chemistry Lofi',
            bpm: 90,
            mood: 'سلاسة وتناغم ☕',
            desc: 'ألحان مريحة للعين والأذن تتيح للمشاهد قراءة إحصائيات الكروت بروقان'
        },
        {
            id: 'lofi_sunday_fut',
            genre: 'lofi',
            titleAr: 'أحد الألتميت تيم (Cozy Sunday FUT)',
            titleEn: 'Cozy Sunday FUT',
            bpm: 85,
            mood: 'استرخاء ونوستالجيا 🛋️',
            desc: 'إيقاع لوفاي راقي ومناسب لشروحات التكتيكات وبناء التشكيلات'
        },
        {
            id: 'lofi_market_trader',
            genre: 'lofi',
            titleAr: 'تداول سوق الانتقالات (Market Trader Lofi)',
            titleEn: 'Market Trader Lofi',
            bpm: 92,
            mood: 'تركيز وتجارة 📈',
            desc: 'موسيقى هادئة تمنح شعور الاحترافية والتداول الذكي لكروت الكوينز'
        },
        {
            id: 'lofi_sunset_lounge',
            genre: 'lofi',
            titleAr: 'لاونج الغروب الكروي (Sunset FUT Lounge)',
            titleEn: 'Sunset FUT Lounge',
            bpm: 86,
            mood: 'غروب هادئ وأنيق 🌇',
            desc: 'كوردات جاز ناعمة مع بيز دافئ يعطي فخامة راقية للريل'
        }
    ];

    const defaultAudioConfig = {
        masterEnabled: true,
        sfxEnabled: true,
        bgmEnabled: true,
        sfxVolume: 0.85,
        bgmVolume: 0.50,
        bgmType: 'library', // 'library' | 'custom'
        selectedTrackId: 'drill_london_808',
        customBgmName: '',
        selectedCategory: 'all'
    };

    let audioState = { ...defaultAudioConfig };
    let customAudioBuffer = null;
    const synthTrackCache = new Map();
    let isSynthRendering = false;
    let activeBgmSource = null;
    let activeBgmGain = null;
    let isBgmPlaying = false;
    let auditionTrackId = null;

    function loadSavedAudioState() {
        try {
            const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                audioState = { ...defaultAudioConfig, ...parsed };
                if (!REELS_MUSIC_LIBRARY.some(t => t.id === audioState.selectedTrackId)) {
                    audioState.selectedTrackId = 'drill_london_808';
                }
            }
        } catch (e) {}
    }
    loadSavedAudioState();

    function saveAudioState() {
        try {
            localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify({
                masterEnabled: audioState.masterEnabled,
                sfxEnabled: audioState.sfxEnabled,
                bgmEnabled: audioState.bgmEnabled,
                sfxVolume: audioState.sfxVolume,
                bgmVolume: audioState.bgmVolume,
                bgmType: audioState.bgmType,
                selectedTrackId: audioState.selectedTrackId,
                customBgmName: audioState.customBgmName,
                selectedCategory: audioState.selectedCategory
            }));
        } catch (e) {}
    }

    // =========================================================================
    // ---- 1. DISTINCT PROCEDURAL SOUND EFFECTS (SFX SUITE) ----
    // =========================================================================

    // 1.1 Authentic Cash Register Cha-Ching & Gold Coins (FC Coin Price Reveal)
    // Character: Crisp mechanical latch click ("كا-") + high sparkling twin bells ("-تشنغ!") + falling coins
    function playCoinCashRegisterSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);

        // 1. "Cha-" (Mechanical register drawer latch pop)
        const clickLen = Math.floor(ctx.sampleRate * 0.045);
        const clickBuf = ctx.createBuffer(1, clickLen, ctx.sampleRate);
        const clickData = clickBuf.getChannelData(0);
        for (let i = 0; i < clickLen; i++) clickData[i] = (Math.random() * 2 - 1) * 0.85;
        const clickSrc = ctx.createBufferSource();
        clickSrc.buffer = clickBuf;
        const clickFilter = ctx.createBiquadFilter();
        clickFilter.type = 'bandpass';
        clickFilter.frequency.setValueAtTime(2600, now);
        clickFilter.Q.setValueAtTime(2.0, now);
        const clickGain = ctx.createGain();
        clickGain.gain.setValueAtTime(0.55 * masterVol, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        clickSrc.connect(clickFilter);
        clickFilter.connect(clickGain);
        clickGain.connect(outNode);
        clickSrc.start(now);

        // 2. "-Ching!" (Twin brilliant cash register bells)
        const tChing = now + 0.035;
        [
            { freq: 2489, type: 'sine', vol: 0.55, dur: 0.55 },
            { freq: 3296, type: 'triangle', vol: 0.42, dur: 0.48 },
            { freq: 4186, type: 'sine', vol: 0.28, dur: 0.38 }
        ].forEach(b => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = b.type;
            osc.frequency.setValueAtTime(b.freq, tChing);
            g.gain.setValueAtTime(0.001, tChing);
            g.gain.linearRampToValueAtTime(b.vol * masterVol, tChing + 0.005);
            g.gain.exponentialRampToValueAtTime(0.0001, tChing + b.dur);
            osc.connect(g);
            g.connect(outNode);
            osc.start(tChing);
            osc.stop(tChing + b.dur + 0.05);
        });

        // 3. Gold Coins Cascade (3 staggered micro-pings)
        [
            { tOffset: 0.09, freq: 2960, dur: 0.32, vol: 0.32 },
            { tOffset: 0.16, freq: 3720, dur: 0.28, vol: 0.28 },
            { tOffset: 0.23, freq: 4430, dur: 0.25, vol: 0.22 }
        ].forEach(cp => {
            const pingTime = now + cp.tOffset;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(cp.freq, pingTime);
            g.gain.setValueAtTime(0.001, pingTime);
            g.gain.linearRampToValueAtTime(cp.vol * masterVol, pingTime + 0.004);
            g.gain.exponentialRampToValueAtTime(0.0001, pingTime + cp.dur);
            osc.connect(g);
            g.connect(outNode);
            osc.start(pingTime);
            osc.stop(pingTime + cp.dur + 0.05);
        });
    }

    // 1.2 Distinct Player Card Physical Slam (Card Reveal & Entry)
    // Character: Heavy low sub-bass pitch drop + physical cardboard impact snap + subtle electric energy swell
    function playCardSlamSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 0.45;

        // 1. Heavy physical sub-bass thud (card hitting the pitch/ground)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(115, now);
        subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.22);
        subGain.gain.setValueAtTime(0.95 * masterVol, now);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        subOsc.connect(subGain);
        subGain.connect(outNode);
        subOsc.start(now);
        subOsc.stop(now + dur + 0.05);

        // 2. Physical cardboard slap (textured bandpass noise crack)
        const snapLen = Math.floor(ctx.sampleRate * 0.08);
        const snapBuf = ctx.createBuffer(1, snapLen, ctx.sampleRate);
        const snapData = snapBuf.getChannelData(0);
        for (let i = 0; i < snapLen; i++) snapData[i] = (Math.random() * 2 - 1) * 0.9;
        const snapSrc = ctx.createBufferSource();
        snapSrc.buffer = snapBuf;
        const snapFilter = ctx.createBiquadFilter();
        snapFilter.type = 'bandpass';
        snapFilter.frequency.setValueAtTime(1350, now);
        snapFilter.Q.setValueAtTime(3.0, now);
        const snapGain = ctx.createGain();
        snapGain.gain.setValueAtTime(0.75 * masterVol, now);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
        snapSrc.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(outNode);
        snapSrc.start(now);

        // 3. Card Holo/Promo Energy Swell
        const holoOsc = ctx.createOscillator();
        const holoGain = ctx.createGain();
        holoOsc.type = 'triangle';
        holoOsc.frequency.setValueAtTime(440, now);
        holoOsc.frequency.exponentialRampToValueAtTime(160, now + 0.24);
        holoGain.gain.setValueAtTime(0.001, now);
        holoGain.gain.linearRampToValueAtTime(0.35 * masterVol, now + 0.015);
        holoGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        holoOsc.connect(holoGain);
        holoGain.connect(outNode);
        holoOsc.start(now);
        holoOsc.stop(now + 0.32);
    }

    // 1.3 Procedural Fast Whoosh / Cinematic Slide Transition
    function playWhooshSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);

        const dur = 0.28;
        const bufferSize = Math.floor(ctx.sampleRate * dur);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.8;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(2.2, now);
        filter.frequency.setValueAtTime(280, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
        filter.frequency.exponentialRampToValueAtTime(280, now + dur);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.65 * masterVol, now + 0.11);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        noiseSrc.connect(filter);
        filter.connect(gain);
        gain.connect(outNode);

        noiseSrc.start(now);
        noiseSrc.stop(now + dur + 0.02);
    }

    // 1.4 Procedural Sub-Bass Boom / Mystery Card Intro Drop
    function playBoomSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 0.70;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(145, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

        gain.gain.setValueAtTime(0.85 * masterVol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(outNode);

        osc.start(now);
        osc.stop(now + dur + 0.05);

        // Punch noise attack
        const pLen = Math.floor(ctx.sampleRate * 0.06);
        const pBuf = ctx.createBuffer(1, pLen, ctx.sampleRate);
        const pData = pBuf.getChannelData(0);
        for (let i = 0; i < pLen; i++) pData[i] = (Math.random() * 2 - 1) * 0.5;
        const pSrc = ctx.createBufferSource();
        pSrc.buffer = pBuf;
        const pFilter = ctx.createBiquadFilter();
        pFilter.type = 'lowpass';
        pFilter.frequency.setValueAtTime(600, now);
        const pGain = ctx.createGain();
        pGain.gain.setValueAtTime(0.35 * masterVol, now);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        pSrc.connect(pFilter);
        pFilter.connect(pGain);
        pGain.connect(outNode);
        pSrc.start(now);
    }

    // 1.5 Authentic Referee Stadium Whistle
    function playWhistleSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 0.35;

        // Vibrato modulation (trill)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 26; // 26Hz whistle flutter
        lfoGain.gain.value = 85;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const mainGain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(2850, now);
        osc2.frequency.setValueAtTime(3120, now);

        lfo.connect(osc1.frequency);
        lfo.connect(osc2.frequency);

        mainGain.gain.setValueAtTime(0.001, now);
        mainGain.gain.linearRampToValueAtTime(0.45 * masterVol, now + 0.03);
        mainGain.gain.setValueAtTime(0.40 * masterVol, now + dur - 0.05);
        mainGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc1.connect(mainGain);
        osc2.connect(mainGain);
        mainGain.connect(outNode);

        lfo.start(now);
        osc1.start(now);
        osc2.start(now);
        lfo.stop(now + dur + 0.05);
        osc1.stop(now + dur + 0.05);
        osc2.stop(now + dur + 0.05);
    }

    // 1.6 Stadium Crowd Cheer / Roar Swell
    function playCrowdCheerSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 1.4;

        const bufLen = Math.floor(ctx.sampleRate * dur);
        const cBuf = ctx.createBuffer(2, bufLen, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const data = cBuf.getChannelData(ch);
            for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.7;
        }

        const src = ctx.createBufferSource();
        src.buffer = cBuf;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(650, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.5);
        filter.frequency.exponentialRampToValueAtTime(550, now + dur);
        filter.Q.setValueAtTime(1.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.48 * masterVol, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(outNode);

        src.start(now);
        src.stop(now + dur + 0.05);
    }

    // 1.7 Electric / Neon Zap
    function playElectricZapSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 0.22;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1850, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + dur);

        gain.gain.setValueAtTime(0.45 * masterVol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(gain);
        gain.connect(outNode);
        osc.start(now);
        osc.stop(now + dur + 0.05);
    }

    // 1.8 Rank Counting Crystal Bell
    function playRankBellSound(customDest = null, volScale = 1.0, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const masterVol = Math.max(0.01, audioState.sfxVolume * volScale);
        const outNode = customDest || ctx.destination;
        const now = ctx.currentTime + Math.max(0, timeOffset);
        const dur = 0.45;

        [
            { freq: 1760, vol: 0.45 },
            { freq: 2640, vol: 0.25 },
            { freq: 3520, vol: 0.15 }
        ].forEach(item => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(item.freq, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(item.vol * masterVol, now + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            osc.connect(gain);
            gain.connect(outNode);
            osc.start(now);
            osc.stop(now + dur + 0.05);
        });
    }

    // Backwards-compatible alias for Coin Sound
    function playCoinSound(customDest = null, volScale = 1.0, ctxOverride = null) {
        playCoinCashRegisterSound(customDest, volScale, ctxOverride);
    }

    // SFX Test Router
    function testSfx(type) {
        getAudioContext();
        if (type === 'card_slam') playCardSlamSound(null, 1.0);
        else if (type === 'coin') playCoinCashRegisterSound(null, 1.15);
        else if (type === 'whoosh') playWhooshSound(null, 1.0);
        else if (type === 'boom') playBoomSound(null, 1.0);
        else if (type === 'whistle') playWhistleSound(null, 1.0);
        else if (type === 'crowd') playCrowdCheerSound(null, 1.0);
        else if (type === 'electric') playElectricZapSound(null, 1.0);
        else if (type === 'rank_bell') playRankBellSound(null, 1.0);
    }

    // =========================================================================
    // ---- 2. MULTI-GENRE PROCEDURAL TRACK SYNTHESIZER (33+ TRACKS) ----
    // =========================================================================
    async function renderProceduralTrack(track, sampleRate = 44100) {
        if (!track) return null;
        if (synthTrackCache.has(track.id)) return synthTrackCache.get(track.id);

        const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineCtx) return null;

        const bpm = track.bpm || 130;
        const beatSec = 60 / bpm;
        const totalBeats = 16; // 4 bars loop
        const totalDur = totalBeats * beatSec;

        try {
            const offCtx = new OfflineCtx(2, Math.ceil(sampleRate * totalDur), sampleRate);
            const genre = track.genre || 'drill';

            function scheduleKick(t, punchFreq = 140, endFreq = 42, dur = 0.26, vol = 0.85) {
                const osc = offCtx.createOscillator();
                const gain = offCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(punchFreq, t);
                osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.08);
                gain.gain.setValueAtTime(vol, t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                osc.connect(gain);
                gain.connect(offCtx.destination);
                osc.start(t);
                osc.stop(t + dur + 0.05);
            }

            function scheduleSnare(t, filterFreq = 1100, dur = 0.16, vol = 0.44) {
                const bLen = Math.floor(sampleRate * dur);
                const nBuf = offCtx.createBuffer(1, bLen, sampleRate);
                const data = nBuf.getChannelData(0);
                for (let i = 0; i < bLen; i++) data[i] = (Math.random() * 2 - 1);
                const nSrc = offCtx.createBufferSource();
                nSrc.buffer = nBuf;
                const filter = offCtx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = filterFreq;
                const gain = offCtx.createGain();
                gain.gain.setValueAtTime(vol, t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                nSrc.connect(filter);
                filter.connect(gain);
                gain.connect(offCtx.destination);
                nSrc.start(t);
            }

            function scheduleHat(t, vol = 0.13, dur = 0.038, highCut = 7200) {
                const bLen = Math.floor(sampleRate * dur);
                const nBuf = offCtx.createBuffer(1, bLen, sampleRate);
                const data = nBuf.getChannelData(0);
                for (let i = 0; i < bLen; i++) data[i] = (Math.random() * 2 - 1);
                const nSrc = offCtx.createBufferSource();
                nSrc.buffer = nBuf;
                const filter = offCtx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = highCut;
                const gain = offCtx.createGain();
                gain.gain.setValueAtTime(vol, t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                nSrc.connect(filter);
                filter.connect(gain);
                gain.connect(offCtx.destination);
                nSrc.start(t);
            }

            function schedule808(t, startFreq, slideFreq = null, dur = 0.7, vol = 0.7) {
                const osc = offCtx.createOscillator();
                const gain = offCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(startFreq, t);
                if (slideFreq) {
                    osc.frequency.setValueAtTime(startFreq, t + dur * 0.35);
                    osc.frequency.exponentialRampToValueAtTime(slideFreq, t + dur * 0.75);
                }
                gain.gain.setValueAtTime(vol, t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                osc.connect(gain);
                gain.connect(offCtx.destination);
                osc.start(t);
                osc.stop(t + dur + 0.05);
            }

            // Genre 1: PHONK
            if (genre === 'phonk') {
                const phonkKicks = [0, 1.75, 2.5, 4, 5.75, 6.5, 8, 9.75, 10.5, 12, 13.75, 14.5];
                phonkKicks.forEach(b => scheduleKick(b * beatSec, 150, 44, 0.28, 0.9));
                [2, 6, 10, 14].forEach(b => scheduleSnare(b * beatSec, 900, 0.18, 0.5));
                for (let b = 0; b < totalBeats; b += 0.25) {
                    scheduleHat(b * beatSec, (b % 1 === 0) ? 0.16 : 0.08, 0.03, 8000);
                }
                // Memphis Cowbell Melody
                const bellNotes = track.cowbellNotes || [740, 880, 988, 1108, 880, 740, 659, 740];
                const bellRhythm = [0, 0.75, 1.5, 2.25, 3.0, 3.5, 4.0, 4.75, 5.5, 6.25, 7.0, 7.5, 8.0, 8.75, 9.5, 10.25, 11.0, 11.5, 12.0, 12.75, 13.5, 14.25, 15.0];
                bellRhythm.forEach((r, idx) => {
                    const t = r * beatSec;
                    const freq = bellNotes[idx % bellNotes.length];
                    const osc = offCtx.createOscillator();
                    const filter = offCtx.createBiquadFilter();
                    const g = offCtx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    filter.type = 'bandpass';
                    filter.frequency.value = freq * 1.05;
                    filter.Q.value = 4.0;
                    g.gain.setValueAtTime(0.22, t);
                    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
                    osc.connect(filter);
                    filter.connect(g);
                    g.connect(offCtx.destination);
                    osc.start(t);
                    osc.stop(t + 0.2);
                });
                // Distorted Sub Bass
                schedule808(0 * beatSec, 46.25, 55.0, beatSec * 3.6, 0.75);
                schedule808(4 * beatSec, 55.0, 61.74, beatSec * 3.6, 0.75);
                schedule808(8 * beatSec, 61.74, 46.25, beatSec * 3.6, 0.75);
                schedule808(12 * beatSec, 46.25, null, beatSec * 3.6, 0.75);
            }
            // Genre 2: DRILL
            else if (genre === 'drill') {
                const drillKicks = [0, 1.5, 4.5, 6, 8, 9.5, 12.5, 14];
                drillKicks.forEach(b => scheduleKick(b * beatSec, 145, 40, 0.32, 0.95));
                // Half-time snappy offbeat drill snare on beat 3 of each bar
                [3, 7, 11, 15].forEach(b => scheduleSnare(b * beatSec, 1250, 0.15, 0.52));
                // Rolling Triplet Hi-Hats
                for (let b = 0; b < totalBeats; b += 0.5) {
                    scheduleHat(b * beatSec, 0.13, 0.035, 7500);
                    // Ratchet before snare (beats 2.5, 6.5, 10.5, 14.5)
                    if ([2.5, 6.5, 10.5, 14.5].includes(b)) {
                        for (let sub = 0.125; sub < 0.5; sub += 0.125) {
                            scheduleHat((b + sub) * beatSec, 0.18, 0.02, 9000);
                        }
                    }
                }
                // Signature Sliding 808
                const bNotes = track.bassNotes || [55.0, 43.65, 65.41, 58.27];
                schedule808(0 * beatSec, bNotes[0], bNotes[1], beatSec * 3.6, 0.8);
                schedule808(4 * beatSec, bNotes[1], bNotes[2], beatSec * 3.6, 0.8);
                schedule808(8 * beatSec, bNotes[2], bNotes[3], beatSec * 3.6, 0.8);
                schedule808(12 * beatSec, bNotes[3], bNotes[0], beatSec * 3.6, 0.8);
                // Dark Piano Chords
                const chordTimes = [0, 4, 8, 12];
                const chords = [
                    [220, 261.63, 329.63], // Am
                    [174.61, 220, 261.63], // F
                    [261.63, 329.63, 392], // C
                    [196, 246.94, 293.66]  // G
                ];
                chordTimes.forEach((ct, i) => {
                    chords[i].forEach(f => {
                        const osc = offCtx.createOscillator();
                        const g = offCtx.createGain();
                        const flt = offCtx.createBiquadFilter();
                        osc.type = 'triangle';
                        osc.frequency.value = f;
                        flt.type = 'lowpass';
                        flt.frequency.setValueAtTime(800, ct * beatSec);
                        g.gain.setValueAtTime(0.12, ct * beatSec);
                        g.gain.exponentialRampToValueAtTime(0.0001, (ct + 3.5) * beatSec);
                        osc.connect(flt);
                        flt.connect(g);
                        g.connect(offCtx.destination);
                        osc.start(ct * beatSec);
                        osc.stop((ct + 3.6) * beatSec);
                    });
                });
            }
            // Genre 3: CHAMPIONS
            else if (genre === 'champions') {
                // Timpani kicks
                [0, 4, 8, 12].forEach(b => scheduleKick(b * beatSec, 110, 35, 0.45, 0.95));
                // Snare rolls leading into beats 4, 8, 12, 16
                [3, 7, 11, 15].forEach(b => {
                    for (let r = 0; r < 4; r++) {
                        scheduleSnare((b + r * 0.25) * beatSec, 1400, 0.08, 0.15 + r * 0.08);
                    }
                });
                // Heroic Brass Horn Chords
                const brassTimes = [0, 4, 8, 12];
                const brassChords = [
                    [146.83, 220, 293.66], // Dm
                    [116.54, 174.61, 233.08], // Bb
                    [130.81, 196, 261.63], // C
                    [146.83, 220, 293.66]  // Dm
                ];
                brassTimes.forEach((bt, idx) => {
                    const t = bt * beatSec;
                    brassChords[idx].forEach(f => {
                        const osc = offCtx.createOscillator();
                        const filter = offCtx.createBiquadFilter();
                        const g = offCtx.createGain();
                        osc.type = 'sawtooth';
                        osc.frequency.value = f;
                        filter.type = 'lowpass';
                        filter.frequency.setValueAtTime(350, t);
                        filter.frequency.exponentialRampToValueAtTime(2200, t + 0.18);
                        filter.frequency.exponentialRampToValueAtTime(800, t + beatSec * 3.5);
                        g.gain.setValueAtTime(0.001, t);
                        g.gain.linearRampToValueAtTime(0.18, t + 0.06);
                        g.gain.exponentialRampToValueAtTime(0.0001, t + beatSec * 3.6);
                        osc.connect(filter);
                        filter.connect(g);
                        g.connect(offCtx.destination);
                        osc.start(t);
                        osc.stop(t + beatSec * 3.8);
                    });
                });
            }
            // Genre 4: CYBER
            else if (genre === 'cyber') {
                // Driving 16th Bassline
                for (let b = 0; b < totalBeats; b += 0.25) {
                    const t = b * beatSec;
                    const osc = offCtx.createOscillator();
                    const flt = offCtx.createBiquadFilter();
                    const g = offCtx.createGain();
                    osc.type = 'sawtooth';
                    const baseFreq = (b < 4) ? 65.41 : (b < 8) ? 73.42 : (b < 12) ? 82.41 : 65.41;
                    osc.frequency.value = (b % 0.5 === 0) ? baseFreq : baseFreq * 2;
                    flt.type = 'lowpass';
                    flt.frequency.setValueAtTime(1400, t);
                    g.gain.setValueAtTime(0.24, t);
                    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
                    osc.connect(flt);
                    flt.connect(g);
                    g.connect(offCtx.destination);
                    osc.start(t);
                    osc.stop(t + 0.22);
                }
                // Retro Gated Snare
                [2, 6, 10, 14].forEach(b => scheduleSnare(b * beatSec, 800, 0.14, 0.55));
                // 4-on-the-floor Kicks
                for (let b = 0; b < totalBeats; b += 1.0) {
                    scheduleKick(b * beatSec, 135, 45, 0.22, 0.85);
                }
            }
            // Genre 5: LOFI
            else if (genre === 'lofi') {
                // Warm Boom-Bap Kick
                [0, 1.75, 4.25, 8, 9.75, 12.25].forEach(b => scheduleKick(b * beatSec, 115, 42, 0.32, 0.75));
                // Dusty Snare
                [2, 6, 10, 14].forEach(b => scheduleSnare(b * beatSec, 1600, 0.2, 0.38));
                // Swing Hats
                for (let b = 0; b < totalBeats; b += 0.5) {
                    const swingOffset = (b % 1 !== 0) ? 0.04 : 0;
                    scheduleHat((b + swingOffset) * beatSec, 0.09, 0.04, 6000);
                }
                // Warm Rhodes Chords
                const lofiChords = [
                    [174.61, 220, 261.63, 329.63], // Fmaj7
                    [146.83, 174.61, 220, 261.63], // Dm7
                    [164.81, 196, 246.94, 293.66], // Em7
                    [130.81, 164.81, 196, 246.94]  // Cmaj7
                ];
                [0, 4, 8, 12].forEach((ct, i) => {
                    const t = ct * beatSec;
                    lofiChords[i].forEach(f => {
                        const osc = offCtx.createOscillator();
                        const g = offCtx.createGain();
                        const flt = offCtx.createBiquadFilter();
                        osc.type = 'triangle';
                        osc.frequency.value = f;
                        flt.type = 'lowpass';
                        flt.frequency.setValueAtTime(1200, t);
                        g.gain.setValueAtTime(0.08, t);
                        g.gain.exponentialRampToValueAtTime(0.0001, t + beatSec * 3.7);
                        osc.connect(flt);
                        flt.connect(g);
                        g.connect(offCtx.destination);
                        osc.start(t);
                        osc.stop(t + beatSec * 3.8);
                    });
                });
            }

            const buffer = await offCtx.startRendering();
            synthTrackCache.set(track.id, buffer);
            return buffer;
        } catch (e) {
            console.warn('[Reels Audio] Track render note:', e.message);
            return null;
        }
    }

    async function getTrackAudioBuffer(trackId, sampleRate = 44100) {
        if (synthTrackCache.has(trackId)) return synthTrackCache.get(trackId);
        const track = REELS_MUSIC_LIBRARY.find(t => t.id === trackId) || REELS_MUSIC_LIBRARY[0];
        return await renderProceduralTrack(track, sampleRate);
    }

    async function renderSynthHypeBuffer(sampleRate = 44100) {
        return await getTrackAudioBuffer(audioState.selectedTrackId, sampleRate);
    }

    // =========================================================================
    // ---- 3. BGM PLAYBACK, AUDITIONING & TRACK SELECTION ----
    // =========================================================================
    async function startBgm(customDest = null, ctxOverride = null, trackIdOverride = null) {
        if (!audioState.masterEnabled || !audioState.bgmEnabled) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        stopBgm();

        let bufferToPlay = null;
        if (audioState.bgmType === 'custom' && customAudioBuffer) {
            bufferToPlay = customAudioBuffer;
        } else {
            const trackId = trackIdOverride || audioState.selectedTrackId || 'drill_london_808';
            bufferToPlay = await getTrackAudioBuffer(trackId, ctx.sampleRate);
        }

        if (!bufferToPlay) return;

        try {
            const src = ctx.createBufferSource();
            src.buffer = bufferToPlay;
            src.loop = true;

            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(audioState.bgmVolume, ctx.currentTime);

            src.connect(gainNode);
            gainNode.connect(customDest || ctx.destination);

            src.start(0);
            activeBgmSource = src;
            activeBgmGain = gainNode;
            isBgmPlaying = true;
            if (trackIdOverride) auditionTrackId = trackIdOverride;
            updateAudioUiButtons();
        } catch (e) {
            console.warn('[Reels Audio] Failed to start BGM:', e.message);
        }
    }

    function stopBgm() {
        if (activeBgmSource) {
            try {
                activeBgmSource.stop();
                activeBgmSource.disconnect();
            } catch (e) {}
            activeBgmSource = null;
        }
        if (activeBgmGain) {
            try { activeBgmGain.disconnect(); } catch (e) {}
            activeBgmGain = null;
        }
        isBgmPlaying = false;
        auditionTrackId = null;
        updateAudioUiButtons();
    }

    function toggleBgmAudition(trackId = null) {
        const targetTrack = trackId || audioState.selectedTrackId;
        if (isBgmPlaying && auditionTrackId === targetTrack) {
            stopBgm();
            if (window.showCopyToast) window.showCopyToast('تم إيقاف معاينة الموسيقى ⏹️');
        } else {
            startBgm(null, null, targetTrack);
            const trackObj = REELS_MUSIC_LIBRARY.find(t => t.id === targetTrack);
            if (window.showCopyToast) {
                window.showCopyToast(`بدء استماع: ${trackObj ? trackObj.titleAr : 'تراك الريل'} 🎵`);
            }
        }
    }

    // ---- 3.1 OFFLINE MASTER SOUNDTRACK RENDERER (BGM + ALL SLIDE SFX TO WAV BASE64) ----
    async function renderMasterAudioWav(audioStateOverride = null) {
        const curAudio = Object.assign({}, audioState, audioStateOverride || {});
        if (!curAudio.masterEnabled) return null;

        const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineCtx) return null;

        const sampleRate = 44100;
        const totalDurationSec = state.slides.reduce((acc, s) => acc + (s.duration || state.slideDuration || 2.5), 0);
        const totalSamples = Math.ceil(sampleRate * (totalDurationSec + 0.5));
        const offCtx = new OfflineCtx(2, totalSamples, sampleRate);

        // 1. Render BGM Loop
        if (curAudio.bgmEnabled) {
            try {
                let bgmBuffer = null;
                if (curAudio.bgmType === 'custom' && customAudioBuffer) {
                    bgmBuffer = customAudioBuffer;
                } else {
                    const trackId = curAudio.selectedTrackId || 'drill_london_808';
                    bgmBuffer = await getTrackAudioBuffer(trackId, sampleRate);
                }

                if (bgmBuffer) {
                    const bgmSrc = offCtx.createBufferSource();
                    bgmSrc.buffer = bgmBuffer;
                    bgmSrc.loop = true;
                    const bgmGain = offCtx.createGain();
                    bgmGain.gain.setValueAtTime(curAudio.bgmVolume, 0);
                    bgmSrc.connect(bgmGain);
                    bgmGain.connect(offCtx.destination);
                    bgmSrc.start(0);
                    bgmSrc.stop(totalDurationSec);
                }
            } catch (bgmErr) {
                console.warn('[renderMasterAudioWav] BGM note:', bgmErr.message);
            }
        }

        // 2. Schedule Slide SFX at exact slide offsets
        if (curAudio.sfxEnabled) {
            try {
                let curOffset = 0;
                for (let i = 0; i < state.slides.length; i++) {
                    const slide = state.slides[i];
                    triggerSlideAudio(slide, offCtx.destination, offCtx, curOffset);
                    if (state.slideTransition && state.slideTransition.soundEnabled && i > 0) {
                        playWhooshSound(offCtx.destination, 0.7, offCtx, curOffset);
                    }
                    curOffset += (slide.duration || state.slideDuration || 2.5);
                }
            } catch (sfxErr) {
                console.warn('[renderMasterAudioWav] SFX note:', sfxErr.message);
            }
        }

        const renderedBuffer = await offCtx.startRendering();

        // Convert AudioBuffer to WAV Base64
        function bufferToWavBase64(abuffer) {
            const numOfChan = abuffer.numberOfChannels;
            const length = abuffer.length * numOfChan * 2 + 44;
            const out = new DataView(new ArrayBuffer(length));
            let channels = [], i, sample, offset = 0, pos = 0;

            function setUint16(data) { out.setUint16(pos, data, true); pos += 2; }
            function setUint32(data) { out.setUint32(pos, data, true); pos += 4; }

            setUint32(0x46464952); // "RIFF"
            setUint32(length - 8);
            setUint32(0x45564157); // "WAVE"
            setUint32(0x20746d66); // "fmt "
            setUint32(16);
            setUint16(1); // PCM
            setUint16(numOfChan);
            setUint32(abuffer.sampleRate);
            setUint32(abuffer.sampleRate * 2 * numOfChan);
            setUint16(numOfChan * 2);
            setUint16(16);
            setUint32(0x61746164); // "data"
            setUint32(length - pos - 4);

            for (i = 0; i < numOfChan; i++) channels.push(abuffer.getChannelData(i));

            while (pos < length) {
                for (i = 0; i < numOfChan; i++) {
                    sample = Math.max(-1, Math.min(1, channels[i][offset]));
                    sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                    out.setInt16(pos, sample, true);
                    pos += 2;
                }
                offset++;
            }
            const bytes = new Uint8Array(out.buffer);
            let binary = '';
            const len = bytes.byteLength;
            for (let b = 0; b < len; b++) {
                binary += String.fromCharCode(bytes[b]);
            }
            return btoa(binary);
        }

        return bufferToWavBase64(renderedBuffer);
    }

    function selectMusicTrack(trackId) {
        const track = REELS_MUSIC_LIBRARY.find(t => t.id === trackId);
        if (!track) return;
        audioState.selectedTrackId = trackId;
        audioState.bgmType = 'library';
        saveAudioState();

        if (isBgmPlaying) {
            startBgm(null, null, trackId);
        }

        renderEditorControls();
        renderMusicModalHtml();
        if (window.showCopyToast) {
            window.showCopyToast(`تم اعتماد التراك: ${track.titleAr} 👑🎵`);
        }
    }

    function updateAudioUiButtons() {
        const btn = document.getElementById('btnBgmAudition');
        if (btn) {
            btn.className = `px-2.5 py-1 rounded-lg text-[10px] font-black transition cursor-pointer ${isBgmPlaying ? 'bg-amber-500 text-slate-950 animate-pulse font-black' : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'}`;
            btn.textContent = isBgmPlaying ? '⏸️ إيقاف المعاينة' : '▶️ استماع للتراك';
        }
        // Update modal audition buttons if open
        const modal = document.getElementById('reelsMusicModal');
        if (modal && !modal.classList.contains('hidden')) {
            renderMusicModalHtml();
        }
    }

    async function handleBgmUpload(inputEl) {
        const file = inputEl?.files?.[0];
        if (!file) return;

        try {
            const ctx = getAudioContext();
            if (!ctx) {
                alert('المتصفح لا يدعم معالجة الصوت.');
                return;
            }

            if (window.showCopyToast) {
                window.showCopyToast('جاري معالجة وتجهيز ملف الصوت... ⏳');
            }

            const arrayBuffer = await file.arrayBuffer();
            const decoded = await ctx.decodeAudioData(arrayBuffer);

            customAudioBuffer = decoded;
            audioState.bgmType = 'custom';
            audioState.customBgmName = file.name;
            audioState.bgmEnabled = true;
            saveAudioState();

            renderEditorControls();
            if (window.showCopyToast) {
                window.showCopyToast(`تم تحميل المقطع بنجاح: ${file.name} 🎵👑`);
            }
        } catch (err) {
            console.error('Audio upload error:', err);
            alert('تعذر قراءة ملف الصوت: ' + err.message);
        }
    }

    function removeCustomBgm() {
        stopBgm();
        customAudioBuffer = null;
        audioState.bgmType = 'library';
        audioState.customBgmName = '';
        saveAudioState();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast('تمت استعادة مكتبة الموسيقى المدمجة 🎵');
        }
    }

    function toggleAudioMaster() {
        audioState.masterEnabled = !audioState.masterEnabled;
        if (!audioState.masterEnabled) {
            stopBgm();
        }
        saveAudioState();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(audioState.masterEnabled ? 'تم تفعيل الصوت والمؤثرات في الريل 🔊' : 'تم كتم الصوت 🔇');
        }
    }

    function toggleSfxMaster() {
        audioState.sfxEnabled = !audioState.sfxEnabled;
        saveAudioState();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(audioState.sfxEnabled ? 'تم تفعيل المؤثرات الصوتية (SFX) 🔔' : 'تم إيقاف المؤثرات الصوتية 🔕');
        }
    }

    function toggleBgmMaster() {
        audioState.bgmEnabled = !audioState.bgmEnabled;
        if (!audioState.bgmEnabled) {
            stopBgm();
        }
        saveAudioState();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(audioState.bgmEnabled ? 'تم تفعيل موسيقى الخلفية (BGM) 🎶' : 'تم إيقاف موسيقى الخلفية ⏹️');
        }
    }

    function setSfxVolume(val) {
        audioState.sfxVolume = parseFloat(val) || 0.85;
        saveAudioState();
    }

    function setBgmVolume(val) {
        audioState.bgmVolume = parseFloat(val) || 0.50;
        if (activeBgmGain && globalAudioCtx) {
            activeBgmGain.gain.setValueAtTime(audioState.bgmVolume, globalAudioCtx.currentTime);
        }
        saveAudioState();
    }

    // =========================================================================
    // ---- 4. 33 TRACKS MUSIC BROWSER MODAL ----
    // =========================================================================
    let musicModalFilter = { category: 'all', search: '' };

    function openMusicModal() {
        let modal = document.getElementById('reelsMusicModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'reelsMusicModal';
            document.body.appendChild(modal);
        }
        modal.className = 'fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5';
        renderMusicModalHtml();

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeMusicModal();
                window.removeEventListener('keydown', escHandler);
            }
        };
        window.addEventListener('keydown', escHandler);
    }

    function closeMusicModal() {
        const modal = document.getElementById('reelsMusicModal');
        if (modal) {
            modal.className = 'hidden';
        }
        if (isBgmPlaying && auditionTrackId) {
            stopBgm();
        }
    }

    function filterMusicCategory(category) {
        musicModalFilter.category = category;
        renderMusicModalHtml();
    }

    function filterMusicSearch(query) {
        musicModalFilter.search = query.toLowerCase();
        renderMusicModalHtml();
    }

    function renderMusicModalHtml() {
        const modal = document.getElementById('reelsMusicModal');
        if (!modal) return;

        const categories = [
            { id: 'all', label: 'الكل (33)', icon: '⚡' },
            { id: 'phonk', label: 'فونك ودريفت (8)', icon: '🔥' },
            { id: 'drill', label: 'دريل وتراب كروي (8)', icon: '⚽' },
            { id: 'champions', label: 'أوركسترا الأبطال (6)', icon: '🏆' },
            { id: 'cyber', label: 'سايبر جيمنج (6)', icon: '🎮' },
            { id: 'lofi', label: 'لوفاي واسترخاء (5)', icon: '☕' }
        ];

        let filtered = REELS_MUSIC_LIBRARY;
        if (musicModalFilter.category !== 'all') {
            filtered = filtered.filter(t => t.genre === musicModalFilter.category);
        }
        if (musicModalFilter.search && musicModalFilter.search.trim()) {
            const q = musicModalFilter.search.trim().toLowerCase();
            filtered = filtered.filter(t => 
                t.titleAr.toLowerCase().includes(q) ||
                t.titleEn.toLowerCase().includes(q) ||
                (t.desc && t.desc.toLowerCase().includes(q)) ||
                (t.mood && t.mood.toLowerCase().includes(q))
            );
        }

        modal.innerHTML = `
            <div class="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white" onclick="event.stopPropagation()">
                <!-- Modal Header -->
                <div class="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
                            🎵
                        </div>
                        <div>
                            <h3 class="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                <span>مكتبة موسيقى وتراكات الريلز</span>
                                <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono font-bold">33 تراك</span>
                            </h3>
                            <p class="text-xs text-zinc-400">تراكات حماسية وتريند تناسب EA FC 27 وتيك توك بدون حقوق</p>
                        </div>
                    </div>
                    <button type="button" onclick="ReelsEngine.closeMusicModal()" class="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center text-lg font-bold transition">
                        ✕
                    </button>
                </div>

                <!-- Filters & Search Bar -->
                <div class="p-3 sm:p-4 bg-zinc-900/90 border-b border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <!-- Category Tabs -->
                    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                        ${categories.map(c => `
                            <button type="button" onclick="ReelsEngine.filterMusicCategory('${c.id}')"
                                    class="px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition flex items-center gap-1.5 ${musicModalFilter.category === c.id ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60'}">
                                <span>${c.icon}</span>
                                <span>${c.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Search Input -->
                    <div class="relative min-w-[220px]">
                        <input type="text" placeholder="بحث باسم التراك أو النمط..." 
                               value="${musicModalFilter.search || ''}"
                               oninput="ReelsEngine.filterMusicSearch(this.value)"
                               class="w-full pr-8 pl-3 py-1.5 rounded-xl bg-zinc-800/90 border border-zinc-700 text-white placeholder-zinc-500 text-xs font-bold outline-none focus:border-amber-400">
                        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 pointer-events-none">🔍</span>
                    </div>
                </div>

                <!-- Tracks Grid -->
                <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 max-h-[60vh] scrollbar-thin">
                    ${filtered.length === 0 ? `
                        <div class="p-8 text-center text-zinc-500 space-y-2">
                            <span class="text-3xl block">🔍</span>
                            <span class="text-xs font-bold block">لم يتم العثور على تراكات مطابقة للبحث</span>
                        </div>
                    ` : `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${filtered.map(track => {
                                const isSelected = audioState.selectedTrackId === track.id && audioState.bgmType === 'library';
                                const isAuditioningThis = isBgmPlaying && auditionTrackId === track.id;

                                const genreBadges = {
                                    phonk: { bg: 'bg-rose-500/20 border-rose-500/40 text-rose-300', icon: '🔥', label: 'فونك ودريفت' },
                                    drill: { bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300', icon: '⚽', label: 'دريل كروي' },
                                    champions: { bg: 'bg-amber-500/20 border-amber-500/40 text-amber-300', icon: '🏆', label: 'أوركسترا الأبطال' },
                                    cyber: { bg: 'bg-sky-500/20 border-sky-500/40 text-sky-300', icon: '🎮', label: 'سايبر جيمنج' },
                                    lofi: { bg: 'bg-purple-500/20 border-purple-500/40 text-purple-300', icon: '☕', label: 'لوفاي هادئ' }
                                };
                                const badge = genreBadges[track.genre] || genreBadges.drill;

                                return `
                                    <div class="p-3.5 rounded-2xl transition border flex flex-col justify-between gap-3 ${isSelected ? 'bg-gradient-to-br from-amber-500/15 via-zinc-900 to-slate-950 border-amber-400 shadow-lg shadow-amber-500/10' : 'bg-zinc-900/80 hover:bg-zinc-800/80 border-zinc-800'}">
                                        <div>
                                            <div class="flex items-center justify-between gap-2 pb-1">
                                                <div class="flex items-center gap-1.5 flex-wrap">
                                                    <span class="text-[9.5px] px-2 py-0.5 rounded-md font-black border ${badge.bg}">
                                                        ${badge.icon} ${badge.label}
                                                    </span>
                                                    <span class="text-[9px] px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono font-bold">
                                                        ${track.bpm} BPM
                                                    </span>
                                                </div>
                                                ${isSelected ? `
                                                    <span class="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center gap-1 shadow-xs">
                                                        <span>👑</span>
                                                        <span>المعتمد حالياً</span>
                                                    </span>
                                                ` : ''}
                                            </div>

                                            <h4 class="text-sm font-black text-white pt-1">
                                                ${track.titleAr}
                                            </h4>
                                            <p class="text-[10px] text-zinc-400 font-mono">
                                                ${track.titleEn}
                                            </p>
                                            <p class="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                                                ${track.desc}
                                            </p>
                                            <div class="mt-1.5 flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                                                <span>⚡ المود:</span>
                                                <span>${track.mood}</span>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                                            <button type="button" onclick="ReelsEngine.toggleBgmAudition('${track.id}')"
                                                    class="flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${isAuditioningThis ? 'bg-amber-500 text-slate-950 animate-pulse font-black' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'}">
                                                <span>${isAuditioningThis ? '⏸️ إيقاف' : '▶️ استماع'}</span>
                                            </button>
                                            <button type="button" onclick="ReelsEngine.selectMusicTrack('${track.id}')"
                                                    class="py-1.5 px-3.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 ${isSelected ? 'bg-emerald-600 text-white cursor-default' : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'}">
                                                <span>${isSelected ? '✓ معتمد' : 'اختيار التراك ✓'}</span>
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>

                <!-- Modal Footer -->
                <div class="p-3 sm:p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                    <div class="flex items-center gap-2">
                        <span class="text-emerald-400">●</span>
                        <span>توليد وتراك فوري بدون أي تنزيلات خارجية (Offline Web Audio)</span>
                    </div>
                    <button type="button" onclick="ReelsEngine.closeMusicModal()" class="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition">
                        إغلاق ✕
                    </button>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // =========================================================================
    // ---- 5. PER-SLIDE SFX CONFIG & SYNCHRONIZED AUDIO TRIGGER ----
    // =========================================================================
    function getSlideSfxConfig(slide = null) {
        if (!slide) slide = state.slides[state.currentSlideIndex];
        if (!slide) return {};
        if (!slide.sfxConfig || typeof slide.sfxConfig !== 'object') {
            slide.sfxConfig = {};
            if (slide.type === 'intro') {
                slide.sfxConfig.whoosh = true;
                slide.sfxConfig.boom = (slide.introHookStyle === 'mystery_card');
                slide.sfxConfig.whistle = (slide.introHookStyle !== 'mystery_card');
                slide.sfxConfig.cardSlam = false;
                slide.sfxConfig.coin = false;
                slide.sfxConfig.crowd = false;
                slide.sfxConfig.electric = false;
                slide.sfxConfig.rankBell = false;
            } else if (slide.type === 'player_card') {
                slide.sfxConfig.whoosh = true;
                slide.sfxConfig.cardSlam = true;
                slide.sfxConfig.coin = !!(slide.playerPrice && slide.playerPrice.trim());
                slide.sfxConfig.whistle = false;
                slide.sfxConfig.crowd = false;
                slide.sfxConfig.boom = false;
                slide.sfxConfig.electric = false;
                slide.sfxConfig.rankBell = false;
            } else if (slide.type === 'versus_card') {
                slide.sfxConfig.whoosh = true;
                slide.sfxConfig.cardSlam = true;
                slide.sfxConfig.coin = !!(slide.playerA?.price || slide.playerB?.price);
                slide.sfxConfig.whistle = false;
                slide.sfxConfig.crowd = false;
                slide.sfxConfig.boom = false;
                slide.sfxConfig.electric = false;
                slide.sfxConfig.rankBell = false;
            } else if (slide.type === 'outro') {
                slide.sfxConfig.whoosh = false;
                slide.sfxConfig.coin = true;
                slide.sfxConfig.crowd = true;
                slide.sfxConfig.cardSlam = false;
                slide.sfxConfig.whistle = false;
                slide.sfxConfig.boom = false;
                slide.sfxConfig.electric = false;
                slide.sfxConfig.rankBell = false;
            } else {
                slide.sfxConfig.whoosh = true;
                slide.sfxConfig.cardSlam = false;
                slide.sfxConfig.coin = false;
                slide.sfxConfig.whistle = false;
                slide.sfxConfig.crowd = false;
                slide.sfxConfig.boom = false;
                slide.sfxConfig.electric = false;
                slide.sfxConfig.rankBell = false;
            }
        }
        return slide.sfxConfig;
    }

    function toggleSlideSfx(key) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        const cfg = getSlideSfxConfig(slide);
        cfg[key] = !cfg[key];

        // Play quick preview if turned on
        if (cfg[key]) {
            testSfx(
                key === 'cardSlam' ? 'card_slam' :
                key === 'coin' ? 'coin' :
                key === 'whoosh' ? 'whoosh' :
                key === 'boom' ? 'boom' :
                key === 'whistle' ? 'whistle' :
                key === 'crowd' ? 'crowd' :
                key === 'electric' ? 'electric' :
                key === 'rankBell' ? 'rank_bell' : 'coin'
            );
        }

        renderEditorControls();
        saveProjectState();
    }

    function muteSlideSfx() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        const cfg = getSlideSfxConfig(slide);
        Object.keys(cfg).forEach(k => cfg[k] = false);
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) window.showCopyToast('تم كتم كافة أصوات هذا السلايد 🔇');
    }

    function enableAllSlideSfx() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        const cfg = getSlideSfxConfig(slide);
        Object.keys(cfg).forEach(k => cfg[k] = true);
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) window.showCopyToast('تم تفعيل كافة المؤثرات لهذا السلايد ⚡');
    }

    function applySlideSfxToAllSlides() {
        const currentSlide = state.slides[state.currentSlideIndex];
        if (!currentSlide) return;
        const currentCfg = { ...getSlideSfxConfig(currentSlide) };

        state.slides.forEach(s => {
            s.sfxConfig = { ...currentCfg };
        });

        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) {
            window.showCopyToast('تم تطبيق توزيعة المؤثرات الصوتية على كافة سلايدات الريل! 📋👑');
        }
    }

    function renderSlideSfxControlsHtml(slide) {
        if (!slide) return '';
        const cfg = getSlideSfxConfig(slide);

        const sfxList = [
            { key: 'whoosh', label: 'سحب هوائي', sub: 'Whoosh', icon: '💨', time: '0.0s' },
            { key: 'cardSlam', label: 'صدمة الكرت', sub: 'Card Slam', icon: '🃏', time: '0.35s' },
            { key: 'coin', label: 'رنين الكوينز', sub: 'Cha-Ching', icon: '🪙', time: '0.85s' },
            { key: 'whistle', label: 'صفارة حكم', sub: 'Whistle', icon: '📢', time: '0.15s' },
            { key: 'crowd', label: 'هتاف الجماهير', sub: 'Crowd Cheer', icon: '🏟️', time: '0.35s' },
            { key: 'boom', label: 'ضربة درامية', sub: 'Bass Boom', icon: '💥', time: '0.0s' },
            { key: 'electric', label: 'شرارة طاقة', sub: 'Energy Zap', icon: '⚡', time: '0.35s' },
            { key: 'rankBell', label: 'جرس الرانك', sub: 'Rank Bell', icon: '🔔', time: '0.20s' }
        ];

        const activeCount = Object.keys(cfg).filter(k => cfg[k]).length;

        return `
            <div class="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 border border-amber-500/40 text-white shadow-md space-y-2.5">
                <!-- Header & Counter -->
                <div class="flex items-center justify-between pb-1.5 border-b border-zinc-800">
                    <div class="flex items-center gap-1.5">
                        <span class="text-sm">🔔</span>
                        <span class="text-[11px] font-black text-white">المؤثرات الصوتية لهذا السلايد:</span>
                        <span class="text-[9px] px-2 py-0.5 rounded-full font-mono font-black ${activeCount > 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}">
                            ${activeCount > 0 ? `${activeCount} مفعلة ✓` : 'مكتوم 🔇'}
                        </span>
                    </div>
                    <!-- Quick Actions -->
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="ReelsEngine.muteSlideSfx()" 
                                class="px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-rose-950/70 border border-zinc-700 hover:border-rose-700 text-zinc-400 hover:text-rose-200 text-[9.5px] font-bold transition active:scale-95 cursor-pointer" title="إيقاف كافة أصوات هذا السلايد">
                            🔇 كتم السلايد
                        </button>
                        <button type="button" onclick="ReelsEngine.enableAllSlideSfx()" 
                                class="px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-emerald-950/70 border border-zinc-700 hover:border-emerald-700 text-zinc-300 hover:text-emerald-200 text-[9.5px] font-bold transition active:scale-95 cursor-pointer" title="تشغيل كافة الأصوات في هذا السلايد">
                            ⚡ تفعيل الكل
                        </button>
                    </div>
                </div>

                <!-- SFX Grid: 8 interactive chips -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    ${sfxList.map(item => {
                        const isEnabled = !!cfg[item.key];
                        return `
                            <div class="p-2 rounded-xl transition border flex flex-col justify-between gap-1.5 cursor-pointer select-none active:scale-[0.98] ${isEnabled ? 'bg-amber-500/15 border-amber-400/80 shadow-xs' : 'bg-zinc-900/80 border-zinc-800 opacity-65 hover:opacity-100'}"
                                 onclick="ReelsEngine.toggleSlideSfx('${item.key}')" title="اضغط للتفعيل أو التعطيل والاستماع">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">${item.icon}</span>
                                    <span class="text-[8.5px] px-1.5 py-0.2 rounded font-mono font-black ${isEnabled ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}">
                                        ${isEnabled ? 'مفعل ✓' : 'معطل ✕'}
                                    </span>
                                </div>
                                <div>
                                    <div class="text-[10.5px] font-black text-white truncate leading-tight">${item.label}</div>
                                    <div class="text-[8.5px] text-zinc-400 font-mono flex items-center justify-between mt-0.5">
                                        <span>${item.sub}</span>
                                        <span class="${isEnabled ? 'text-amber-300 font-bold' : 'text-zinc-500'}">${item.time}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Apply to All Slides Footer -->
                <div class="pt-1.5 border-t border-zinc-800/80 flex items-center justify-between">
                    <span class="text-[9.5px] text-zinc-400">انقر على أي مؤثر لتفعيله أو تعطيله فوراً</span>
                    <button type="button" onclick="ReelsEngine.applySlideSfxToAllSlides()" 
                            class="py-1 px-2.5 rounded-lg bg-zinc-800 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-zinc-700 hover:border-amber-500/40 font-black text-[10px] transition flex items-center gap-1 active:scale-95 cursor-pointer">
                        <span>📋 تطبيق على جميع السلايدات</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Granular Per-Slide Trigger: strictly respects slide.sfxConfig (Supports offline timestamp scheduling)
    function triggerSlideAudio(slide, customDest = null, ctxOverride = null, timeOffset = 0) {
        if (!audioState.masterEnabled || !audioState.sfxEnabled || !slide) return;
        const ctx = ctxOverride || getAudioContext();
        if (!ctx) return;

        const cfg = getSlideSfxConfig(slide);
        try {
            if (cfg.whoosh) playWhooshSound(customDest, 0.75, ctx, timeOffset + 0);
            if (cfg.boom) playBoomSound(customDest, 1.0, ctx, timeOffset + 0);
            if (cfg.whistle) playWhistleSound(customDest, 0.75, ctx, timeOffset + 0.15);
            if (cfg.rankBell) playRankBellSound(customDest, 0.9, ctx, timeOffset + 0.20);
            if (cfg.cardSlam) playCardSlamSound(customDest, 1.0, ctx, timeOffset + 0.35);
            if (cfg.electric) playElectricZapSound(customDest, 0.9, ctx, timeOffset + 0.35);
            if (cfg.crowd) playCrowdCheerSound(customDest, 0.85, ctx, timeOffset + 0.35);
            if (cfg.coin) playCoinCashRegisterSound(customDest, 1.15, ctx, timeOffset + 0.85);
        } catch (e) {
            console.warn('[Reels Audio] triggerSlideAudio warning:', e.message);
        }
    }

    // =========================================================================
    // ---- 6. STORY PROGRESS BAR & BADGES/STICKERS ENGINE ----
    // =========================================================================
    function toggleProgressBar() {
        if (!state.progressBar) state.progressBar = { ...DEFAULT_PROGRESS_BAR };
        state.progressBar.enabled = !state.progressBar.enabled;
        try {
            localStorage.setItem(PROGRESS_BAR_STORAGE_KEY, JSON.stringify(state.progressBar));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(state.progressBar.enabled ? 'تم تفعيل وإظهار شريط تقدم الريل ⏳👁️' : 'تم إخفاء شريط التقدم بنجاح ⚪');
        }
    }

    function setProgressBarStyle(styleId) {
        if (!state.progressBar) state.progressBar = { ...DEFAULT_PROGRESS_BAR };
        const valid = REELS_PROGRESS_STYLES.some(s => s.id === styleId);
        state.progressBar.style = valid ? styleId : 'capsule_neon';
        try {
            localStorage.setItem(PROGRESS_BAR_STORAGE_KEY, JSON.stringify(state.progressBar));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            const found = REELS_PROGRESS_STYLES.find(s => s.id === state.progressBar.style);
            window.showCopyToast(`تم تطبيق شكل: ${found ? found.name : styleId} ✨`);
        }
    }

    function setProgressBarColor(col) {
        if (!state.progressBar) state.progressBar = { ...DEFAULT_PROGRESS_BAR };
        if (!['amber', 'emerald', 'white', 'purple', 'cyan'].includes(col)) col = 'amber';
        state.progressBar.color = col;
        try {
            localStorage.setItem(PROGRESS_BAR_STORAGE_KEY, JSON.stringify(state.progressBar));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
    }

    function setProgressBarThickness(th) {
        if (!state.progressBar) state.progressBar = { ...DEFAULT_PROGRESS_BAR };
        if (!['thin', 'medium', 'thick'].includes(th)) th = 'medium';
        state.progressBar.thickness = th;
        state.progressBar.height = (th === 'thin') ? 3 : ((th === 'thick') ? 7 : 5);
        try {
            localStorage.setItem(PROGRESS_BAR_STORAGE_KEY, JSON.stringify(state.progressBar));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
    }

    function renderStoryProgressBarHtml() {
        if (state.isCapturingExport || !state.progressBar || !state.progressBar.enabled) return '';
        const total = (state.slides && state.slides.length) || 1;
        if (total <= 0) return '';

        const style = state.progressBar.style || 'capsule_neon';
        const colorKey = state.progressBar.color || 'amber';
        const th = state.progressBar.thickness || 'medium';
        const h = (th === 'thin') ? 3 : ((th === 'thick') ? 7 : 5);

        const colorMap = {
            amber: { bg: 'bg-amber-400', shadow: 'shadow-[0_0_12px_rgba(251,191,36,0.8)]', hex: '#FBBF24', text: 'text-amber-400' },
            emerald: { bg: 'bg-emerald-400', shadow: 'shadow-[0_0_12px_rgba(52,211,153,0.8)]', hex: '#34D399', text: 'text-emerald-400' },
            white: { bg: 'bg-white', shadow: 'shadow-[0_0_12px_rgba(255,255,255,0.85)]', hex: '#FFFFFF', text: 'text-white' },
            purple: { bg: 'bg-purple-400', shadow: 'shadow-[0_0_12px_rgba(192,132,252,0.8)]', hex: '#C084FC', text: 'text-purple-400' },
            cyan: { bg: 'bg-cyan-400', shadow: 'shadow-[0_0_12px_rgba(56,189,248,0.8)]', hex: '#38BDF8', text: 'text-cyan-400' }
        };
        const theme = colorMap[colorKey] || colorMap.amber;
        const curIdx = state.currentSlideIndex || 0;

        // 1. Style: Laser Beam (Single continuous sleek cyber line with glowing head)
        if (style === 'laser_beam') {
            const overallPct = Math.min(100, ((curIdx + (state.isPlaying ? ((state.timelineProgress || 0) / 100) : 1)) / total) * 100);
            return `
                <div id="storyProgressBarContainer" class="absolute top-3.5 left-3.5 right-3.5 z-35 pointer-events-none" style="direction: ltr;" dir="ltr">
                    <div class="relative w-full rounded-full overflow-visible bg-black/55 backdrop-blur-md border border-white/25 shadow-md" style="height: ${h}px;">
                        <div id="storyProgressLaserBar" class="h-full rounded-full transition-[width] duration-75 ease-linear ${theme.bg} ${theme.shadow}" style="width: ${overallPct}%;"></div>
                        <div id="storyProgressLaserHead" class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white ring-2 ring-white/80 shadow-[0_0_14px_#fff] animate-pulse transition-[left] duration-75 ease-linear" style="left: ${overallPct}%;"></div>
                        ${Array.from({ length: total - 1 }).map((_, s) => `
                            <div class="absolute top-0 bottom-0 w-[1.5px] bg-white/40 z-10" style="left: ${((s + 1) / total) * 100}%;"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 2. Style: Smart Morphing VIP Dots (Instagram VIP active pill)
        if (style === 'ig_vip_pills') {
            return `
                <div id="storyProgressBarContainer" class="absolute top-3.5 left-0 right-0 z-35 flex items-center justify-center gap-1.5 pointer-events-none" style="direction: ltr;" dir="ltr">
                    ${Array.from({ length: total }).map((_, i) => {
                        if (i === curIdx) {
                            const pillFill = state.isPlaying ? `${state.timelineProgress || 0}%` : '100%';
                            return `
                                <div class="w-8 sm:w-10 rounded-full overflow-hidden bg-black/55 backdrop-blur-md border border-white/30 shadow-md transition-all duration-200" style="height: ${Math.max(6, h + 1)}px;">
                                    <div id="storyProgressSeg_${i}" class="h-full rounded-full transition-[width] duration-75 ease-linear ${theme.bg} ${theme.shadow}" style="width: ${pillFill};"></div>
                                </div>
                            `;
                        } else if (i < curIdx) {
                            return `
                                <div class="w-2 sm:w-2.5 rounded-full ${theme.bg} ${theme.shadow} transition-all duration-200" style="height: ${Math.max(6, h + 1)}px;"></div>
                            `;
                        } else {
                            return `
                                <div class="w-2 sm:w-2.5 rounded-full bg-white/35 backdrop-blur-xs border border-white/25 transition-all duration-200" style="height: ${Math.max(6, h + 1)}px;"></div>
                            `;
                        }
                    }).join('')}
                </div>
            `;
        }

        // 3. Style: Fluid Royal Gradient Stream
        if (style === 'gradient_stream') {
            return `
                <div id="storyProgressBarContainer" class="absolute top-3.5 left-3.5 right-3.5 z-35 flex items-center gap-1.5 pointer-events-none" style="direction: ltr;" dir="ltr">
                    ${Array.from({ length: total }).map((_, i) => {
                        let fillWidth = '0%';
                        if (i < curIdx) fillWidth = '100%';
                        else if (i === curIdx) fillWidth = state.isPlaying ? `${state.timelineProgress || 0}%` : '100%';
                        return `
                            <div class="flex-1 rounded-full overflow-hidden bg-black/50 backdrop-blur-md border border-amber-400/30 shadow-md" style="height: ${h}px;">
                                <div id="storyProgressSeg_${i}" class="h-full rounded-full transition-[width] duration-75 ease-linear shadow-[0_0_12px_rgba(245,158,11,0.7)]" 
                                     style="width: ${fillWidth}; background: linear-gradient(90deg, #F59E0B 0%, #10B981 50%, #06B6D4 100%);"></div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        // 4. Style: Ultra-Minimal Luxury Ticks
        if (style === 'minimal_ticks') {
            return `
                <div id="storyProgressBarContainer" class="absolute top-3 left-3 right-3 z-35 flex items-center gap-1 pointer-events-none" style="direction: ltr;" dir="ltr">
                    ${Array.from({ length: total }).map((_, i) => {
                        let fillWidth = '0%';
                        if (i < curIdx) fillWidth = '100%';
                        else if (i === curIdx) fillWidth = state.isPlaying ? `${state.timelineProgress || 0}%` : '100%';
                        return `
                            <div class="flex-1 rounded-xs overflow-hidden bg-white/20" style="height: ${Math.max(2.5, h - 2)}px;">
                                <div id="storyProgressSeg_${i}" class="h-full rounded-xs transition-[width] duration-75 ease-linear ${theme.bg}" style="width: ${fillWidth};"></div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        // 5. Default Style: Floating Neon Glass Capsules (capsule_neon)
        return `
            <div id="storyProgressBarContainer" class="absolute top-3.5 left-3.5 right-3.5 z-35 flex items-center gap-1.5 pointer-events-none" style="direction: ltr;" dir="ltr">
                ${Array.from({ length: total }).map((_, i) => {
                    let fillWidth = '0%';
                    if (i < curIdx) fillWidth = '100%';
                    else if (i === curIdx) fillWidth = state.isPlaying ? `${state.timelineProgress || 0}%` : '100%';
                    return `
                        <div class="flex-1 rounded-full overflow-hidden bg-black/45 backdrop-blur-md border border-white/25 shadow-md" style="height: ${h}px;">
                            <div id="storyProgressSeg_${i}" class="h-full rounded-full transition-[width] duration-75 ease-linear ${theme.bg} ${theme.shadow}" style="width: ${fillWidth};"></div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Canvas 2D frame drawing for 60FPS Video Export
    function drawCanvasStoryProgressBar(ctx, canvasWidth, canvasHeight, totalSlides, currentSlideIdx, slideProgress, cfg = {}) {
        if (!cfg || !cfg.enabled || totalSlides <= 0) return;

        const style = cfg.style || 'capsule_neon';
        const colorKey = cfg.color || 'amber';
        const thickness = cfg.thickness || 'medium';

        const colorMap = {
            amber: { fill: '#FBBF24', glow: 'rgba(251, 191, 36, 0.8)' },
            emerald: { fill: '#34D399', glow: 'rgba(52, 211, 153, 0.8)' },
            white: { fill: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.85)' },
            purple: { fill: '#C084FC', glow: 'rgba(192, 132, 252, 0.8)' },
            cyan: { fill: '#38BDF8', glow: 'rgba(56, 189, 248, 0.8)' }
        };
        const activeTheme = colorMap[colorKey] || colorMap.amber;

        const margin = 36;
        const top = 36;
        const h = (thickness === 'thin') ? 6 : ((thickness === 'thick') ? 14 : 10);
        const radius = Math.floor(h / 2);
        const availableWidth = canvasWidth - (margin * 2);

        if (style === 'laser_beam') {
            const trackW = availableWidth;
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(margin, top, trackW, h, radius);
            else ctx.rect(margin, top, trackW, h);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            for (let s = 1; s < totalSlides; s++) {
                const tickX = margin + (s / totalSlides) * trackW;
                ctx.beginPath();
                ctx.moveTo(tickX, top);
                ctx.lineTo(tickX, top + h);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            const overallFrac = Math.max(0, Math.min(1, (currentSlideIdx + slideProgress) / totalSlides));
            const fillW = Math.max(radius * 2, trackW * overallFrac);

            ctx.fillStyle = activeTheme.fill;
            ctx.shadowColor = activeTheme.glow;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(margin, top, Math.min(trackW, fillW), h, radius);
            else ctx.rect(margin, top, Math.min(trackW, fillW), h);
            ctx.fill();

            const sparkX = margin + Math.min(trackW, fillW);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 16;
            ctx.beginPath();
            ctx.arc(sparkX, top + h / 2, h * 0.75, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return;
        }

        if (style === 'ig_vip_pills') {
            const dotSize = Math.max(10, h);
            const activePillW = 54;
            const gap = 12;
            const totalW = (totalSlides - 1) * (dotSize + gap) + activePillW;
            const startX = (canvasWidth - totalW) / 2;

            ctx.save();
            let curX = startX;
            for (let s = 0; s < totalSlides; s++) {
                if (s === currentSlideIdx) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(curX, top, activePillW, dotSize, dotSize / 2);
                    else ctx.rect(curX, top, activePillW, dotSize);
                    ctx.fill();

                    const fillW = Math.max(dotSize, activePillW * Math.max(0, Math.min(1, slideProgress)));
                    ctx.fillStyle = activeTheme.fill;
                    ctx.shadowColor = activeTheme.glow;
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(curX, top, fillW, dotSize, dotSize / 2);
                    else ctx.rect(curX, top, fillW, dotSize);
                    ctx.fill();
                    curX += activePillW + gap;
                } else if (s < currentSlideIdx) {
                    ctx.fillStyle = activeTheme.fill;
                    ctx.shadowColor = activeTheme.glow;
                    ctx.shadowBlur = 6;
                    ctx.beginPath();
                    ctx.arc(curX + dotSize / 2, top + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                    curX += dotSize + gap;
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.30)';
                    ctx.beginPath();
                    ctx.arc(curX + dotSize / 2, top + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                    curX += dotSize + gap;
                }
            }
            ctx.restore();
            return;
        }

        const gap = (style === 'minimal_ticks') ? 5 : 9;
        const segH = (style === 'minimal_ticks') ? Math.max(4, h - 3) : h;
        const segRadius = (style === 'minimal_ticks') ? 2 : radius;
        const totalGaps = (totalSlides - 1) * gap;
        const segWidth = (availableWidth - totalGaps) / totalSlides;

        let gradFill = null;
        if (style === 'gradient_stream') {
            gradFill = ctx.createLinearGradient(margin, 0, canvasWidth - margin, 0);
            gradFill.addColorStop(0, '#F59E0B');
            gradFill.addColorStop(0.4, '#10B981');
            gradFill.addColorStop(0.7, '#06B6D4');
            gradFill.addColorStop(1.0, '#8B5CF6');
        }

        for (let s = 0; s < totalSlides; s++) {
            const segX = margin + s * (segWidth + gap);
            const segY = top;

            ctx.save();
            ctx.fillStyle = (style === 'minimal_ticks') ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.45)';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(segX, segY, segWidth, segH, segRadius);
            else ctx.rect(segX, segY, segWidth, segH);
            ctx.fill();

            if (style !== 'minimal_ticks') {
                ctx.strokeStyle = (style === 'gradient_stream') ? 'rgba(245, 158, 11, 0.35)' : 'rgba(255, 255, 255, 0.25)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            let fillFraction = 0;
            if (s < currentSlideIdx) fillFraction = 1.0;
            else if (s === currentSlideIdx) fillFraction = Math.max(0, Math.min(1, slideProgress));

            if (fillFraction > 0) {
                const filledW = Math.max(segRadius * 2, segWidth * fillFraction);
                ctx.fillStyle = gradFill || activeTheme.fill;
                if (style !== 'minimal_ticks') {
                    ctx.shadowColor = (style === 'gradient_stream') ? 'rgba(245, 158, 11, 0.8)' : activeTheme.glow;
                    ctx.shadowBlur = 8;
                }
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(segX, segY, Math.min(segWidth, filledW), segH, segRadius);
                else ctx.rect(segX, segY, Math.min(segWidth, filledW), segH);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // ---- 6.5 SLIDE TRANSITION CONTROLLER METHODS ----
    function setSlideTransitionType(type) {
        if (!state.slideTransition) state.slideTransition = { ...DEFAULT_SLIDE_TRANSITION };
        const valid = REELS_SLIDE_TRANSITIONS.some(t => t.id === type);
        state.slideTransition.type = valid ? type : 'smooth_fade';
        try {
            localStorage.setItem(SLIDE_TRANSITION_STORAGE_KEY, JSON.stringify(state.slideTransition));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        testSlideTransition();
    }

    function setSlideTransitionDuration(dur) {
        if (!state.slideTransition) state.slideTransition = { ...DEFAULT_SLIDE_TRANSITION };
        state.slideTransition.duration = Math.max(0.2, Math.min(0.8, parseFloat(dur) || 0.35));
        try {
            localStorage.setItem(SLIDE_TRANSITION_STORAGE_KEY, JSON.stringify(state.slideTransition));
        } catch (e) {}
        saveProjectState();
        renderEditorControls();
    }

    function toggleSlideTransitionSound() {
        if (!state.slideTransition) state.slideTransition = { ...DEFAULT_SLIDE_TRANSITION };
        state.slideTransition.soundEnabled = !state.slideTransition.soundEnabled;
        try {
            localStorage.setItem(SLIDE_TRANSITION_STORAGE_KEY, JSON.stringify(state.slideTransition));
        } catch (e) {}
        saveProjectState();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(state.slideTransition.soundEnabled ? 'تم تفعيل صوت الانتقال السينمائي 🔊' : 'تم كتم صوت الانتقال 🔇');
        }
    }

    function getRawSlideTransitionCss() {
        const trans = state.slideTransition;
        if (!trans || trans.type === 'instant' || trans.type === 'none') return '';
        const dur = trans.duration || 0.35;
        return `animation: reelSlideTrans_${trans.type} ${dur}s cubic-bezier(0.16, 1, 0.3, 1) both; will-change: transform, opacity;`;
    }

    function getSlideTransitionStyle() {
        if (!state.slideEntrancePending || state.isCapturingExport) return '';
        return getRawSlideTransitionCss();
    }

    function testSlideTransition(optType) {
        if (optType) setSlideTransitionType(optType);
        const wrapper = document.getElementById('reelSlideTransitionWrapper');
        if (wrapper) {
            const animCss = getRawSlideTransitionCss();
            wrapper.style.animation = 'none';
            void wrapper.offsetWidth;
            if (animCss) {
                wrapper.style.cssText = animCss;
            }
        }
        if (state.slideTransition && state.slideTransition.soundEnabled) {
            playWhooshSound(null, 0.7);
        }
    }

    // Returns stylish Tailwind classes for each badge
    function getBadgeStyleClass(badgeText) {
        if (!badgeText) return 'bg-white/95 text-slate-900 border-slate-200';
        const str = String(badgeText).toLowerCase();

        if (str.includes('أرخص') || str.includes('كوينز') || str.includes('ميتا') || str.includes('توصية') || str.includes('ضعف') || str.includes('weak foot') || str.includes('⭐') || str.includes('👑') || str.includes('💰')) {
            return 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border border-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.35)]';
        }
        if (str.includes('تسليم') || str.includes('ضمان') || str.includes('اطلب') || str.includes('قيمة') || str.includes('حارس') || str.includes('🔒') || str.includes('💎') || str.includes('🧤') || str.includes('📩')) {
            return 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white border border-emerald-400/50 shadow-[0_2px_10px_rgba(16,185,129,0.35)]';
        }
        if (str.includes('طلب') || str.includes('سرعة') || str.includes('عرض') || str.includes('لايك') || str.includes('منشن') || str.includes('فولو') || str.includes('🔥') || str.includes('🚨') || str.includes('❤️') || str.includes('⏳')) {
            return 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-600 text-white border border-rose-400/50 shadow-[0_2px_10px_rgba(244,63,94,0.35)]';
        }
        if (str.includes('مهارات') || str.includes('فوت') || str.includes('skills') || str.includes('🪄') || str.includes('🏆')) {
            return 'bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 text-white border border-purple-400/50 shadow-[0_2px_10px_rgba(168,85,247,0.35)]';
        }
        return 'bg-slate-950/90 text-white border border-slate-700 shadow-md';
    }

    // Toggle badge on current slide
    function toggleBadgeOnCurrentSlide(badgeText) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        if (!Array.isArray(slide.badges)) slide.badges = [];

        const existingIdx = slide.badges.indexOf(badgeText);
        if (existingIdx !== -1) {
            slide.badges.splice(existingIdx, 1);
            if (window.showCopyToast) window.showCopyToast(`تم حذف الشارة: ${badgeText}`);
        } else {
            slide.badges.push(badgeText);
            testSfx('coin');
            if (window.showCopyToast) window.showCopyToast(`تمت إضافة الشارة: ${badgeText} ✨`);
        }

        renderCanvas();
        renderEditorControls();
        saveProjectState();
    }

    function addCustomBadgeToCurrentSlide(inputVal) {
        if (!inputVal || !inputVal.trim()) return;
        const text = inputVal.trim();
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        if (!Array.isArray(slide.badges)) slide.badges = [];
        if (!slide.badges.includes(text)) {
            slide.badges.push(text);
            testSfx('coin');
            if (window.showCopyToast) window.showCopyToast(`تمت إضافة الشارة: ${text} ✨`);
        }
        renderCanvas();
        renderEditorControls();
        saveProjectState();
    }

    function removeBadgeFromCurrentSlide(idx) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide || !Array.isArray(slide.badges)) return;
        if (idx >= 0 && idx < slide.badges.length) {
            const removed = slide.badges.splice(idx, 1);
            renderCanvas();
            renderEditorControls();
            saveProjectState();
            if (window.showCopyToast) window.showCopyToast(`تم حذف الشارة: ${removed[0]}`);
        }
    }

    function clearSlideBadges() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.badges = [];
        renderCanvas();
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) window.showCopyToast('تم مسح كافة شارات هذا السلايد 🗑️');
    }

    function applyBadgesToAllPlayerCards() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide || !Array.isArray(slide.badges)) return;
        const badgesCopy = [...slide.badges];

        state.slides.forEach(s => {
            if (s.type === 'player_card' || s.type === 'versus_card') {
                s.badges = [...badgesCopy];
            }
        });

        renderCanvas();
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) {
            window.showCopyToast('تم تطبيق الشارات على كافة كروت اللاعبين! 📋👑');
        }
    }

    // HTML generator for the Badges on Canvas
    function renderSlideBadgesHtml(slide) {
        if (!slide || slide.hideBadges || !Array.isArray(slide.badges) || slide.badges.length === 0) return '';

        return `
            <div class="mt-3 flex items-center justify-center gap-1.5 flex-wrap max-w-xs pointer-events-none" dir="rtl">
                ${slide.badges.map(b => `
                    <span class="px-3 py-1 rounded-xl text-[11px] font-black tracking-wide ${getBadgeStyleClass(b)}">
                        ${escapeHtml(b)}
                    </span>
                `).join('')}
            </div>
        `;
    }

    // Rich Interactive Badges & Stickers Manager in Slide Form
    function renderSlideBadgesManagerHtml(slide) {
        if (!slide) return '';
        const currentBadges = Array.isArray(slide.badges) ? slide.badges : [];

        return `
            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <div class="flex items-center gap-1.5">
                        <span class="text-sm">🏷️</span>
                        <label class="text-[11px] font-black text-slate-800">الملصقات والشارات التفاعلية (Stickers & Badges):</label>
                    </div>
                    <div class="flex items-center gap-1">
                        ${currentBadges.length > 0 ? `
                            <button type="button" onclick="ReelsEngine.clearSlideBadges()" 
                                    class="text-[9.5px] font-bold px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition">
                                مسح الكل ✕
                            </button>
                        ` : ''}
                        <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideBadges')" 
                                class="text-[9.5px] font-bold px-2 py-0.5 rounded ${slide.hideBadges ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                            ${slide.hideBadges ? '👁️ إظهار' : '🗑️ إخفاء'}
                        </button>
                    </div>
                </div>

                <!-- Active Badges Display Chips -->
                <div>
                    <div class="text-[10px] font-black text-slate-500 mb-1">الشارات المفعلة في هذا السلايد (${currentBadges.length}):</div>
                    ${currentBadges.length > 0 ? `
                        <div class="flex items-center gap-1.5 flex-wrap p-2 rounded-xl bg-slate-50 border border-slate-200">
                            ${currentBadges.map((b, idx) => `
                                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-black ${getBadgeStyleClass(b)}">
                                    <span>${escapeHtml(b)}</span>
                                    <button type="button" onclick="ReelsEngine.removeBadgeFromCurrentSlide(${idx})" class="hover:opacity-80 text-xs cursor-pointer font-mono" title="حذف">✕</button>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="p-2 text-center text-[10px] text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            لا توجد شارات مفعلة حالياً — انقر على أي شارة جاهزة أدناه لإضافتها فوراً 👇
                        </div>
                    `}
                </div>

                <!-- 1-Click Preset Gallery -->
                <div class="space-y-2 pt-1 border-t border-slate-100">
                    <!-- Category 1: Sales & Store -->
                    <div>
                        <div class="text-[10px] font-black text-amber-950 flex items-center gap-1 mb-1">
                            <span>🏪</span>
                            <span>عروض وضمانات المتجر (ShopCoin15):</span>
                        </div>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${REELS_PRESET_BADGES.sales.map(item => {
                                const isActive = currentBadges.includes(item.text);
                                return `
                                    <button type="button" onclick="ReelsEngine.toggleBadgeOnCurrentSlide('${item.text.replace(/'/g, "\\'")}')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 active:scale-95 cursor-pointer ${isActive ? 'bg-amber-400 text-slate-950 border-amber-400 font-black ring-1 ring-amber-400 shadow-2xs' : 'bg-slate-100/80 hover:bg-white text-slate-700 border-slate-200'}">
                                        <span>${item.text}</span>
                                        ${isActive ? '<span class="text-xs">✓</span>' : ''}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Category 2: Player & Meta -->
                    <div>
                        <div class="text-[10px] font-black text-emerald-950 flex items-center gap-1 mb-1">
                            <span>⭐</span>
                            <span>قوة ومميزات اللاعبين (Meta & Stats):</span>
                        </div>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${REELS_PRESET_BADGES.meta.map(item => {
                                const isActive = currentBadges.includes(item.text);
                                return `
                                    <button type="button" onclick="ReelsEngine.toggleBadgeOnCurrentSlide('${item.text.replace(/'/g, "\\'")}')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 active:scale-95 cursor-pointer ${isActive ? 'bg-emerald-600 text-white border-emerald-600 font-black ring-1 ring-emerald-600 shadow-2xs' : 'bg-slate-100/80 hover:bg-white text-slate-700 border-slate-200'}">
                                        <span>${item.text}</span>
                                        ${isActive ? '<span class="text-xs">✓</span>' : ''}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Category 3: Engagement & CTA -->
                    <div>
                        <div class="text-[10px] font-black text-rose-950 flex items-center gap-1 mb-1">
                            <span>💬</span>
                            <span>ملصقات التفاعل والطلب (CTA):</span>
                        </div>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${REELS_PRESET_BADGES.cta.map(item => {
                                const isActive = currentBadges.includes(item.text);
                                return `
                                    <button type="button" onclick="ReelsEngine.toggleBadgeOnCurrentSlide('${item.text.replace(/'/g, "\\'")}')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 active:scale-95 cursor-pointer ${isActive ? 'bg-rose-600 text-white border-rose-600 font-black ring-1 ring-rose-600 shadow-2xs' : 'bg-slate-100/80 hover:bg-white text-slate-700 border-slate-200'}">
                                        <span>${item.text}</span>
                                        ${isActive ? '<span class="text-xs">✓</span>' : ''}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Custom Badge Input Field -->
                <div class="pt-1.5 border-t border-slate-100 flex items-center gap-1.5">
                    <input type="text" id="inputCustomBadge_${state.currentSlideIndex}" 
                           placeholder="اكتب شارة مخصصة يدوياً..." 
                           onkeydown="if (event.key === 'Enter') { ReelsEngine.addCustomBadgeToCurrentSlide(this.value); this.value = ''; }"
                           class="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    <button type="button" 
                            onclick="const inp = document.getElementById('inputCustomBadge_${state.currentSlideIndex}'); if (inp) { ReelsEngine.addCustomBadgeToCurrentSlide(inp.value); inp.value = ''; }"
                            class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition active:scale-95">
                        ➕ إضافة
                    </button>
                </div>

                <!-- Bulk Apply Footer -->
                <div class="pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[9.5px] text-slate-400">انقر على أي شارة لإضافتها أو إزالتها فوراً</span>
                    <button type="button" onclick="ReelsEngine.applyBadgesToAllPlayerCards()" 
                            class="py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 border border-slate-200 hover:border-amber-300 font-black text-[10px] transition flex items-center gap-1 active:scale-95 cursor-pointer">
                        <span>📋 تطبيق على كافة كروت اللاعبين</span>
                    </button>
                </div>
            </div>
        `;
    }

    // ---- 2. CURATED VIRAL IDEAS (Hooks ONLY - User picks players) ----
    const VIRAL_IDEAS = {
        countdown: [
            {
                id: 'cd_starter_strikers',
                title: 'أفضل 5 مهاجمين للبدايات في FC 27 ⚽🔥',
                subtitle: 'كروت اقتصادية تصنع لك الفارق من أول أسبوع!',
                badge: '🔥 مهاجمين البدايات',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى تريند حماسية سريعة 125 BPM'
            },
            {
                id: 'cd_physical_beasts',
                title: 'أقوى 5 لاعبين بدنياً في FC 27 💪🧱',
                subtitle: 'كروت تفوز بأي التحام بالكتف بدون أي رحمة!',
                badge: '🧱 جدار فولاذي',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى بيس قوي وضخم (Heavy Bass)'
            },
            {
                id: 'cd_fastest_wingers',
                title: 'أسرع 5 صواريخ على الأطراف في FC 27 ⚡🚀',
                subtitle: 'سرعة +93 تسارع مرعب لا يلحقه أي ظهير!',
                badge: '⚡ أسرع أجنحة',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى إيقاع سريع متصاعد (Speed Beat)'
            },
            {
                id: 'cd_meta_defenders',
                title: 'أقوى 5 قلوب دفاع للفوت تشامبيونز 🛡️⚔️',
                subtitle: 'تدخلات تلقائية تقفل على أقوى مهاجمي الخصم!',
                badge: '🛡️ دفاع حديدي',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى درامية حماسية'
            },
            {
                id: 'cd_budget_gems',
                title: '5 جواهر خارقة تحت 20 ألف كوينز 💎💸',
                subtitle: 'أداء يفوق الكروت المليونية بأسعار بسيطة!',
                badge: '💎 كروت رخيصة ميتّا',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى تريند ريلز إلكترونية'
            },
            {
                id: 'cd_saudi_stars',
                title: 'أعلى اللاعبين السعوديين تقييماً في FC 27 🇸🇦🦅',
                subtitle: 'فخر دوري روشن وطاقات خارقة بالدفاع والسرعة!',
                badge: '🇸🇦 نجوم روشن',
                defaultRanks: ['4', '3', '2', '1'],
                musicTip: 'موسيقى حماسية وطنية'
            }
        ],
        versus: [
            {
                id: 'vs_bellingham_valverde',
                title: 'بيلينغهام ولا فالفيردي؟ صراع خط الوسط 👑⚔️',
                subtitle: 'صوت بالتعليقات: مين يستحق يقود خط وسطك؟',
                badge: '⚔️ رأس برأس (DUEL)',
                playerA: { name: 'Jude Bellingham', arName: 'بيلينغهام', rating: '90', statHighlight: 'صناعة وإنهاء 87', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp' },
                playerB: { name: 'Federico Valverde', arName: 'فالفيردي', rating: '88', statHighlight: 'سرعة وافتكاك 88', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp' },
                question: 'مين تختار لخط وسطك؟ صوت بالتعليقات 👇'
            },
            {
                id: 'vs_mbappe_haaland',
                title: 'مبابي ولا هالاند؟ من هو المهاجم الفتاك؟ ⚡🤖',
                subtitle: 'صراع السرعة والمراوغة ضد القوة البدنية والإنهاء!',
                badge: '⚔️ صراع الهدافين',
                playerA: { name: 'Kylian Mbappé', arName: 'مبابي', rating: '91', statHighlight: 'سرعة 97 + مهارة 5★', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp' },
                playerB: { name: 'Erling Haaland', arName: 'هالاند', rating: '91', statHighlight: 'بدنية 90 + تسديد 93', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp' },
                question: 'القوة البدنية ولا السرعة والمراوغة؟ صوتك يهمنا 👇'
            },
            {
                id: 'vs_vinicius_leao',
                title: 'فينيسيوس ولا لياو؟ أفضل جناح أيسر ميتّا 🪄🌪️',
                subtitle: 'مراوغة 5 نجوم وسرعة تفجيرية على الرواق الأيسر!',
                badge: '⚔️ ملوك الجناح',
                playerA: { name: 'Vinícius Jr.', arName: 'فينيسيوس', rating: '90', statHighlight: 'سرعة 96 + مهارة 5★', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp' },
                playerB: { name: 'Rafael Leão', arName: 'لياو', rating: '86', statHighlight: 'طول وجسم + سرعة 93', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-50573369.a6f3940ce2ccb7d0c1b6486a36ceb97173930a64d05373132b440d62f8ab9fcf.webp' },
                question: 'مين جناحك الأساسي في تشكيلتك؟ 👇'
            },
            {
                id: 'vs_rodri_tonali',
                title: 'رودري ولا تونالي؟ أفضل صخرة ارتكاز دفاعي 🛡️🛑',
                subtitle: 'الخبرة والتمركز أم السرعة والضغط الشرس؟',
                badge: '⚔️ صخرة الوسط',
                playerA: { name: 'Rodri', arName: 'رودري', rating: '91', statHighlight: 'دفاع 87 + تمرير 86', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp' },
                playerB: { name: 'Sandro Tonali', arName: 'تونالي', rating: '85', statHighlight: 'سرعة 86 + لياقة 90', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-241096.b3c01d216c9bc7ed2cbf008664c7582161526a0c5ec870bbb97236a9334b4ab9.webp' },
                question: 'مين المحور اللي تثق فيه بالفوت؟ 👇'
            }
        ]
    };

    // ---- 3. STATE MANAGEMENT ----
    let state = {
        activeSection: 'countdown',
        theme: 'ea_marble_clean',
        fontFamily: loadSavedFontFamily(),
        title: 'أفضل 5 مهاجمين للبدايات في FC 27 ⚽🔥',
        subtitle: 'كروت اقتصادية تصنع لك الفارق من أول أسبوع!',
        badge: '🔥 مهاجمين البدايات',
        slides: [],
        currentSlideIndex: 0,
        isPlaying: false,
        slideDuration: 2.5,
        playbackTimer: null,
        timelineProgress: 0,
        showSafeZone: false,
        dragEnabled: true,
        magnetEnabled: true,
        selectedDragElement: 'card',
        layouts: loadSavedLayouts(),
        animationsEnabled: loadSavedAnimEnabled(),
        elementAnimations: loadSavedAnimations(),
        progressBar: loadSavedProgressBar(),
        slideTransition: loadSavedSlideTransition(),
        slideEntrancePending: true,
        isCapturingExport: false
    };

    function getAsset(key, fallbackPath) {
        if (window.EMBEDDED_ASSETS && window.EMBEDDED_ASSETS[key]) {
            return window.EMBEDDED_ASSETS[key];
        }
        return fallbackPath;
    }

    function setFontFamily(fontKey) {
        if (!['thmanyah', 'zain', 'alexandria'].includes(fontKey)) fontKey = 'thmanyah';
        state.fontFamily = fontKey;
        try {
            localStorage.setItem(FONT_STORAGE_KEY, fontKey);
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        const names = {
            thmanyah: 'خط ثمانية (Thmanyah Sans)',
            zain: 'خط زين (Zain Google Font)',
            alexandria: 'خط الإسكندرية (Alexandria)'
        };
        if (window.showCopyToast) {
            window.showCopyToast(`تم تفعيل ${names[fontKey] || fontKey} في الريلز بنجاح! 🔤✨`);
        }
    }

    function initSection(sectionKey) {
        state.activeSection = sectionKey || 'countdown';
        state.selectedDragElement = (state.activeSection === 'countdown') ? 'card' : 'cardA';
        const ideaList = VIRAL_IDEAS[state.activeSection] || VIRAL_IDEAS.countdown;
        applyIdea(ideaList[0], false);
    }

    function switchSection(sectionKey) {
        pausePlayback();
        saveProjectState();
        const restored = loadSavedProjectForSection(sectionKey);
        if (!restored) {
            initSection(sectionKey);
        }
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        saveProjectState();
    }

    function applyIdea(ideaObj, showToast = true) {
        if (!ideaObj) return;

        state.title = ideaObj.title;
        state.subtitle = ideaObj.subtitle;
        state.badge = ideaObj.badge;

        if (state.activeSection === 'countdown') {
            const ranks = ideaObj.defaultRanks || ['5', '4', '3', '2', '1'];
            const newSlides = [];

            newSlides.push({
                type: 'intro',
                title: ideaObj.title,
                subtitle: ideaObj.subtitle,
                badge: ideaObj.badge,
                ctaText: 'شاهد الترتيب بالكامل',
                duration: 1.5,
                hideBadge: false,
                hideTitle: false,
                hideSubtitle: false,
                hideCta: false,
                introHookStyle: 'cards_stream',
                introHookBlur: '3px',
                introHookOpacity: 0.48,
                introHookGlow: true
            });

            ranks.forEach((rankNum) => {
                newSlides.push({
                    type: 'player_card',
                    rank: rankNum,
                    playerName: 'اسم اللاعب',
                    playerArName: `اللاعب رقم ${rankNum}`,
                    rating: '85',
                    position: 'ST',
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
                    badges: ['⚡ سرعة 90', '🔥 ميتّا', '💰 كوينز مناسبة'],
                    duration: 2.8
                });
            });

            newSlides.push({
                type: 'outro',
                title: 'متجر ShopCoin15 - كوينز فورية ⚡',
                subtitle: 'شحن آمن 100% مع ضمان نادي كامل وبأفضل الأسعار',
                badge: '👑 متجر الكوينز المعتمد',
                ctaText: 'للطلب حياك على الخاص: @shop_coin15 📩',
                duration: 2.0
            });

            state.slides = newSlides;
        } else {
            state.slides = [
                {
                    type: 'intro',
                    title: ideaObj.title,
                    subtitle: ideaObj.subtitle,
                    badge: ideaObj.badge,
                    ctaText: 'شاهد المقارنة المباشرة',
                    duration: 1.5,
                    hideBadge: false,
                    hideTitle: false,
                    hideSubtitle: false,
                    hideCta: false,
                    introHookStyle: 'cards_stream',
                    introHookBlur: '3px',
                    introHookOpacity: 0.48,
                    introHookGlow: true
                },
                {
                    type: 'versus_card',
                    title: ideaObj.title,
                    playerA: ideaObj.playerA || { name: 'Player A', arName: 'اللاعب الأول', rating: '90', statHighlight: 'طاقات 90', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp' },
                    playerB: ideaObj.playerB || { name: 'Player B', arName: 'اللاعب الثاني', rating: '88', statHighlight: 'طاقات 88', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp' },
                    question: ideaObj.question || 'صوت بالتعليقات: من تختار لفريقك؟ 👇',
                    duration: 3.5
                },
                {
                    type: 'outro',
                    title: 'متجر ShopCoin15 - كوينز فورية ⚡',
                    subtitle: 'شحن آمن 100% مع ضمان نادي كامل وبأفضل الأسعار',
                    badge: '👑 متجر الكوينز المعتمد',
                    ctaText: 'للطلب حياك على الخاص: @shop_coin15 📩',
                    duration: 2.0
                }
            ];
        }

        state.currentSlideIndex = 0;
        ensureSelectedDragElement();
        pausePlayback();
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();

        if (showToast && window.showCopyToast) {
            window.showCopyToast(`تم اختيار: ${ideaObj.title}! يمكنك الآن تعديل اللاعبين كما تحب ✍️`);
        }
        saveProjectState();
    }

    // ---- 4. DRAG & RESIZE ENGINE (100% INDEPENDENT OF SIZE) ----
    let activeDrag = null;
    let activeResize = null;
    const SNAP_TOLERANCE_X = 3.5;
    const SNAP_TOLERANCE_Y = 3.0;

    function getSnapTargets(dragId) {
        const targetsX = [{ x: 50, label: 'في المنتصف تماماً (50%)' }];
        const targetsY = [{ y: 50, label: 'المنتصف الرأسي (50%)' }];

        if (state.activeSection === 'versus') {
            targetsX.push(
                { x: 73, label: 'محاذاة كرت اليمين (73%)' },
                { x: 27, label: 'محاذاة كرت اليسار (27%)' }
            );

            const secLayout = state.layouts.versus;
            if (dragId === 'cardB' && secLayout.cardA?.top !== undefined) {
                targetsY.push({ y: secLayout.cardA.top, label: 'محاذاة أفقية مع الكرت المقابل' });
            } else if (dragId === 'cardA' && secLayout.cardB?.top !== undefined) {
                targetsY.push({ y: secLayout.cardB.top, label: 'محاذاة أفقية مع الكرت المقابل' });
            }
        }

        return { targetsX, targetsY };
    }

    function initCanvasDragHandlers() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        canvas.onmousedown = onPointerStart;
        canvas.ontouchstart = (e) => {
            if (state.dragEnabled && (e.target.closest('[data-drag-id]') || e.target.closest('[data-resize-id]'))) {
                e.preventDefault();
            }
            onPointerStart(e);
        };

        window.onmousemove = onPointerMove;
        window.ontouchmove = (e) => {
            if (activeDrag || activeResize) {
                e.preventDefault();
            }
            onPointerMove(e);
        };

        window.onmouseup = onPointerEnd;
        window.ontouchend = onPointerEnd;

        // Deselect when clicking outside the canvas on the background/side padding of preview container
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer && !previewContainer._hasDeselectAttached) {
            previewContainer._hasDeselectAttached = true;
            previewContainer.addEventListener('mousedown', (e) => {
                if (!e.target.closest('[data-drag-id]') && !e.target.closest('[data-resize-id]') && !e.target.closest('button') && !e.target.closest('input')) {
                    if (state.selectedDragElement) {
                        state.selectedDragElement = null;
                        renderCanvas();
                        renderEditorControls();
                    }
                }
            });
        }

        // Global Escape key to deselect
        if (!window._hasReelsEscapeAttached) {
            window._hasReelsEscapeAttached = true;
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && state.selectedDragElement) {
                    state.selectedDragElement = null;
                    renderCanvas();
                    renderEditorControls();
                }
            });
        }

        // Mouse wheel scale when hovering selected element
        canvas.onwheel = (e) => {
            if (state.dragEnabled && state.selectedDragElement) {
                const target = e.target.closest(`[data-drag-id="${state.selectedDragElement}"]`);
                if (target) {
                    e.preventDefault();
                    const delta = e.deltaY < 0 ? 0.04 : -0.04;
                    adjustScaleSelected(delta);
                }
            }
        };
    }

    function onPointerStart(e) {
        // 1. Check if clicking on resize handle
        const resizeHandle = e.target.closest('[data-resize-id]');
        if (resizeHandle) {
            if (!state.dragEnabled) return;
            e.preventDefault();
            e.stopPropagation();
            const resizeId = resizeHandle.getAttribute('data-resize-id');
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const secLayout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];
            const curScale = secLayout[resizeId]?.scale || 1.0;

            activeResize = {
                resizeId,
                startX: clientX,
                startY: clientY,
                startScale: curScale
            };
            return;
        }

        // 2. Check if clicking on draggable element
        const target = e.target.closest('[data-drag-id]');
        if (!target) {
            // Clicked on empty area on the canvas -> deselect current element
            if (state.selectedDragElement) {
                state.selectedDragElement = null;
                renderCanvas();
                renderEditorControls();
            }
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const canvas = document.getElementById('exportCanvas');
        const canvasRect = canvas.getBoundingClientRect();

        const dragId = target.getAttribute('data-drag-id');
        const prevSelected = state.selectedDragElement;
        state.selectedDragElement = dragId;

        const secLayout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];
        const cfg = secLayout[dragId] || {};

        const startLeft = (cfg.left !== undefined) ? cfg.left : 50;
        const startTop = (cfg.top !== undefined) ? cfg.top : 30;

        activeDrag = {
            dragId,
            target,
            startMouseX: clientX,
            startMouseY: clientY,
            startLeft: startLeft,
            startTop: startTop,
            canvasRect: canvasRect,
            hasMoved: false
        };

        if (prevSelected !== dragId) {
            renderCanvas();
            renderEditorControls();
        } else {
            updateSelectedElementInPanel();
        }
    }

    function onPointerMove(e) {
        // Handle Resize
        if (activeResize) {
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const dy = clientY - activeResize.startY;
            const dx = activeResize.startX - clientX;
            const delta = (dy + dx) / 220;

            let newScale = Math.round((activeResize.startScale + delta) * 100) / 100;
            newScale = Math.max(0.5, Math.min(1.8, newScale));

            const secLayout = state.layouts[state.activeSection];
            if (!secLayout[activeResize.resizeId]) secLayout[activeResize.resizeId] = {};
            secLayout[activeResize.resizeId].scale = newScale;

            const elem = document.querySelector(`[data-drag-id="${activeResize.resizeId}"]`);
            if (elem) {
                elem.style.transform = `translateX(-50%) scale(${newScale})`;
            }

            updateLiveScaleDisplay(newScale);
            return;
        }

        // Handle Drag
        if (activeDrag) {
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const canvasRect = activeDrag.canvasRect;
            const dx = clientX - activeDrag.startMouseX;
            const dy = clientY - activeDrag.startMouseY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                activeDrag.hasMoved = true;
            }

            const dxPercent = (dx / canvasRect.width) * 100;
            const dyPercent = (dy / canvasRect.height) * 100;

            let rawLeft = activeDrag.startLeft + dxPercent;
            let rawTop = activeDrag.startTop + dyPercent;

            rawLeft = Math.max(5, Math.min(95, rawLeft));
            rawTop = Math.max(2, Math.min(96, rawTop));

            let finalLeft = rawLeft;
            let finalTop = rawTop;
            let snapXMatch = null;
            let snapYMatch = null;

            if (state.magnetEnabled !== false) {
                const { targetsX, targetsY } = getSnapTargets(activeDrag.dragId);

                for (const t of targetsX) {
                    if (Math.abs(rawLeft - t.x) <= SNAP_TOLERANCE_X) {
                        finalLeft = t.x;
                        snapXMatch = t;
                        break;
                    }
                }

                for (const t of targetsY) {
                    if (Math.abs(rawTop - t.y) <= SNAP_TOLERANCE_Y) {
                        finalTop = t.y;
                        snapYMatch = t;
                        break;
                    }
                }
            }

            const secLayout = state.layouts[state.activeSection];
            if (!secLayout[activeDrag.dragId]) secLayout[activeDrag.dragId] = {};
            secLayout[activeDrag.dragId].left = Math.round(finalLeft * 10) / 10;
            secLayout[activeDrag.dragId].top = Math.round(finalTop * 10) / 10;

            activeDrag.target.style.left = `${secLayout[activeDrag.dragId].left}%`;
            activeDrag.target.style.top = `${secLayout[activeDrag.dragId].top}%`;

            renderMagnetGuides(snapXMatch, snapYMatch);
            updateLiveCoordsDisplay(secLayout[activeDrag.dragId].left, secLayout[activeDrag.dragId].top, !!snapXMatch || !!snapYMatch);
        }
    }

    function onPointerEnd() {
        if (activeResize) {
            activeResize = null;
            renderCanvas();
            renderEditorControls();
            saveProjectState();
            return;
        }

        if (activeDrag) {
            const hasMoved = activeDrag.hasMoved;
            activeDrag = null;
            hideMagnetGuides();
            if (hasMoved) {
                renderCanvas();
                renderEditorControls();
                saveProjectState();
            }
        }
    }

    function renderMagnetGuides(snapX, snapY) {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        let guideV = document.getElementById('reelSnapGuideV');
        let guideH = document.getElementById('reelSnapGuideH');

        if (snapX) {
            if (!guideV) {
                guideV = document.createElement('div');
                guideV.id = 'reelSnapGuideV';
                guideV.className = 'absolute top-0 bottom-0 pointer-events-none z-50 border-r-2 border-dashed border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.95)]';
                canvas.appendChild(guideV);
            }
            guideV.style.left = `${snapX.x}%`;
            guideV.innerHTML = `
                <div class="absolute top-6 -translate-x-1/2 bg-emerald-700 text-white text-[10.5px] font-black px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-emerald-400 animate-pulse">
                    <span>🧲</span>
                    <span>${snapX.label}</span>
                </div>
            `;
            guideV.style.display = 'block';
        } else if (guideV) {
            guideV.style.display = 'none';
        }

        if (snapY) {
            if (!guideH) {
                guideH = document.createElement('div');
                guideH.id = 'reelSnapGuideH';
                guideH.className = 'absolute left-0 right-0 pointer-events-none z-50 border-b-2 border-dashed border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.95)]';
                canvas.appendChild(guideH);
            }
            guideH.style.top = `${snapY.y}%`;
            guideH.innerHTML = `
                <div class="absolute right-6 -translate-y-1/2 bg-emerald-700 text-white text-[10.5px] font-black px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-emerald-400 animate-pulse">
                    <span>🧲</span>
                    <span>${snapY.label}</span>
                </div>
            `;
            guideH.style.display = 'block';
        } else if (guideH) {
            guideH.style.display = 'none';
        }
    }

    function hideMagnetGuides() {
        const guideV = document.getElementById('reelSnapGuideV');
        const guideH = document.getElementById('reelSnapGuideH');
        if (guideV) guideV.style.display = 'none';
        if (guideH) guideH.style.display = 'none';
    }

    function updateLiveCoordsDisplay(x, y, isSnapped) {
        const badge = document.getElementById('dragCoordsBadge');
        if (badge) {
            badge.textContent = `X: ${x}% | Y: ${y}% ${isSnapped ? '🧲 بالمنتصف' : ''}`;
            badge.classList.toggle('text-emerald-700', !isSnapped);
            badge.classList.toggle('text-white', isSnapped);
            badge.classList.toggle('bg-emerald-600', isSnapped);
        }
    }

    function updateLiveScaleDisplay(scale) {
        const badge = document.getElementById('cardScaleVal');
        if (badge) badge.textContent = `${Math.round(scale * 100)}%`;
        const slider = document.getElementById('cardScaleSlider');
        if (slider) slider.value = scale;
    }

    // ---- 5. POSITION & SCALE ACTIONS ----
    function setSelectedElement(elemId) {
        state.selectedDragElement = elemId || null;
        renderCanvas();
        renderEditorControls();
    }

    function centerSelectedElement() {
        if (!state.selectedDragElement) {
            if (window.showCopyToast) window.showCopyToast('يرجى تحديد عنصر أولاً بالنقر عليه على الكانفاس 👆');
            return;
        }
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement;
        if (!secLayout[dragId]) secLayout[dragId] = {};
        secLayout[dragId].left = 50.0;
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast('تم ضبط العنصر في المنتصف تماماً 50% 🎯');
        }
    }

    function nudgeSelected(dir, amount = 1.0) {
        if (!state.selectedDragElement) return;
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement;
        if (!secLayout[dragId]) secLayout[dragId] = {};

        let curLeft = (secLayout[dragId].left !== undefined) ? secLayout[dragId].left : 50;
        let curTop = (secLayout[dragId].top !== undefined) ? secLayout[dragId].top : 30;

        if (dir === 'left') curLeft = Math.max(5, Math.min(95, curLeft - amount));
        if (dir === 'right') curLeft = Math.max(5, Math.min(95, curLeft + amount));
        if (dir === 'up') curTop = Math.max(2, Math.min(96, curTop - amount));
        if (dir === 'down') curTop = Math.max(2, Math.min(96, curTop + amount));

        secLayout[dragId].left = Math.round(curLeft * 10) / 10;
        secLayout[dragId].top = Math.round(curTop * 10) / 10;

        renderCanvas();
        renderEditorControls();
    }

    function setScaleSelected(val) {
        if (!state.selectedDragElement) return;
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement;
        if (!secLayout[dragId]) secLayout[dragId] = {};
        secLayout[dragId].scale = parseFloat(val) || 1.0;
        renderCanvas();
        updateLiveScaleDisplay(secLayout[dragId].scale);
    }

    function adjustScaleSelected(delta) {
        if (!state.selectedDragElement) return;
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement;
        if (!secLayout[dragId]) secLayout[dragId] = {};
        const cur = secLayout[dragId].scale || 1.0;
        const next = Math.max(0.5, Math.min(1.8, Math.round((cur + delta) * 100) / 100));
        secLayout[dragId].scale = next;
        renderCanvas();
        updateLiveScaleDisplay(next);
    }

    function toggleMagnet() {
        state.magnetEnabled = !state.magnetEnabled;
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(state.magnetEnabled ? 'تم تفعيل المغناطيس الذكي للالتصاق بالمنتصف 🧲✨' : 'تم إيقاف المغناطيس (تحريك حر كامل) 🔓');
        }
    }

    function toggleDragLock() {
        state.dragEnabled = !state.dragEnabled;
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(state.dragEnabled ? 'تم فتح السحب المباشر بالماوس 🔓' : 'تم قفل حركة العناصر على الشاشة 🔒');
        }
    }

    function updateSelectedElementInPanel() {
        const select = document.getElementById('selectReelElement');
        if (select) {
            select.value = state.selectedDragElement || '';
        }
        const badge = document.getElementById('dragCoordsBadge');
        if (!state.selectedDragElement) {
            if (badge) {
                badge.textContent = '⚪ غير محدد';
                badge.className = 'text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200';
            }
            return;
        }
        const secLayout = state.layouts[state.activeSection];
        const cfg = secLayout[state.selectedDragElement] || {};
        updateLiveCoordsDisplay(cfg.left || 50, cfg.top || 30, cfg.left === 50);
        updateLiveScaleDisplay(cfg.scale || 1.0);
    }

    function saveLayoutPositions() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.layouts));
            saveProjectState();
            if (window.showCopyToast) {
                window.showCopyToast('تم حفظ وتثبيت مواقع وأحجام العناصر بنجاح لكل الريلزات القادمة! 💾🔒');
            }
        } catch (e) {
            console.error('Error saving layout:', e);
        }
    }

    function resetLayoutPositions() {
        state.layouts[state.activeSection] = JSON.parse(JSON.stringify(DEFAULT_LAYOUTS[state.activeSection]));
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.layouts));
        } catch (e) {}
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast('تمت إعادة تعيين المواقع والأحجام الافتراضية بنجاح! 🔄');
        }
    }

    // ---- 6. SLIDE & PLAYER CARD MANAGEMENT ----
    function addPlayerSlide() {
        const newRank = (state.slides.filter(s => s.type === 'player_card').length + 1).toString();
        const newSlide = {
            type: 'player_card',
            rank: newRank,
            playerName: 'اسم اللاعب',
            playerArName: `اللاعب رقم ${newRank}`,
            rating: '86',
            position: 'ST',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
            badges: ['⚡ سرعة', '🔥 ميتّا'],
            duration: 2.8
        };

        const outroIdx = state.slides.findIndex(s => s.type === 'outro');
        if (outroIdx !== -1) {
            state.slides.splice(outroIdx, 0, newSlide);
            state.currentSlideIndex = outroIdx;
        } else {
            state.slides.push(newSlide);
            state.currentSlideIndex = state.slides.length - 1;
        }

        ensureSelectedDragElement();
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        if (window.showCopyToast) window.showCopyToast('تمت إضافة بطاقة لاعب جديدة! يمكنك تعديلها الآن ➕');
        saveProjectState();
    }

    function addSlide(type = 'player_card') {
        if (type === 'intro') {
            const hasIntro = state.slides.some(s => s.type === 'intro');
            if (hasIntro) {
                if (window.showCopyToast) window.showCopyToast('سلايد البداية موجود بالفعل! 📢');
                return;
            }
            state.slides.unshift({
                type: 'intro',
                title: state.title || 'عنوان الريل المانشيت',
                subtitle: state.subtitle || 'الوصف الجذاب للريل',
                badge: state.badge || '🔥 فكرة ريلز',
                ctaText: 'شاهد الترتيب بالكامل',
                duration: 1.5,
                hideBadge: false,
                hideTitle: false,
                hideSubtitle: false,
                hideCta: false,
                introHookStyle: 'cards_stream',
                introHookBlur: '3px',
                introHookOpacity: 0.48,
                introHookGlow: true
            });
            state.currentSlideIndex = 0;
        } else if (type === 'outro') {
            const hasOutro = state.slides.some(s => s.type === 'outro');
            if (hasOutro) {
                if (window.showCopyToast) window.showCopyToast('سلايد الختام موجود بالفعل! 👑');
                return;
            }
            state.slides.push({
                type: 'outro',
                title: 'متجر ShopCoin15 - كوينز فورية ⚡',
                subtitle: 'شحن آمن 100% مع ضمان نادي كامل وبأفضل الأسعار',
                badge: '👑 متجر الكوينز المعتمد',
                ctaText: 'للطلب حياك على الخاص: @shop_coin15 📩',
                duration: 2.0
            });
            state.currentSlideIndex = state.slides.length - 1;
        } else {
            addPlayerSlide();
            return;
        }

        ensureSelectedDragElement();
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        if (window.showCopyToast) window.showCopyToast('تمت إضافة السلايد بنجاح! ➕');
        saveProjectState();
    }

    function deleteCurrentSlide() {
        if (state.slides.length <= 1) {
            alert('يجب أن يحتوي الريل على سلايد واحد على الأقل.');
            return;
        }
        const slide = state.slides[state.currentSlideIndex];
        const typeName = (slide.type === 'intro') ? 'سلايد البداية' : ((slide.type === 'outro') ? 'سلايد الختام' : ((slide.type === 'versus_card') ? 'سلايد المقارنة' : `كرت اللاعب #${slide.rank || ''}`));

        state.slides.splice(state.currentSlideIndex, 1);
        if (state.currentSlideIndex >= state.slides.length) {
            state.currentSlideIndex = state.slides.length - 1;
        }

        ensureSelectedDragElement();
        renderCanvas();
        renderEditorControls();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        if (window.showCopyToast) window.showCopyToast(`تم حذف ${typeName} بنجاح 🗑️`);
        saveProjectState();
    }

    function toggleElementVisibility(field) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide[field] = !slide[field];
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(slide[field] ? 'تم إخفاء/حذف العنصر من التصميم 🗑️' : 'تم استعادة العنصر إلى التصميم 👁️');
        }
        saveProjectState();
    }

    function setCurrentSlideDuration(val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.duration = Math.round(parseFloat(val) * 10) / 10 || 2.5;
        renderCanvas();
        renderEditorControls();
        const badge = document.getElementById('currentSlideDurationBadge');
        if (badge) badge.textContent = `${slide.duration.toFixed(1)} ثانية`;
        saveProjectState();
    }

    function adjustCurrentSlideDuration(delta) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        let newDur = Math.round(((slide.duration || 2.5) + delta) * 10) / 10;
        if (newDur < 0.8) newDur = 0.8;
        if (newDur > 6.0) newDur = 6.0;
        slide.duration = newDur;
        renderCanvas();
        renderEditorControls();
        saveProjectState();
    }

    function applyDurationToAllPlayerCards() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        const dur = slide.duration || 2.5;
        let count = 0;
        state.slides.forEach(s => {
            if (s.type === 'player_card') {
                s.duration = dur;
                count++;
            }
        });
        if (window.showCopyToast) {
            window.showCopyToast(`تم تطبيق سرعة (${dur} ثانية) على كافة كروت اللاعبين (${count} كروت) ⏱️⚡`);
        }
        renderEditorControls();
        saveProjectState();
    }

    function updateCurrentSlideField(field, val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide[field] = val;
        renderCanvas();
        saveProjectState();
    }

    function updateVersusField(playerKey, field, val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide || slide.type !== 'versus_card') return;
        if (!slide[playerKey]) slide[playerKey] = {};
        slide[playerKey][field] = val;
        renderCanvas();
        saveProjectState();
    }

    function setPlayerPriceQuick(price) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.playerPrice = price;
        renderCanvas();
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) {
            window.showCopyToast(`تم تحديد السعر: ${price} كوينز 💰`);
        }
    }

    function clearPlayerPrice() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.playerPrice = '';
        renderCanvas();
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) {
            window.showCopyToast('تم إخفاء سعر اللاعب من الريل');
        }
    }

    function setVersusPlayerPrice(playerKey, price) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide || slide.type !== 'versus_card') return;
        if (!slide[playerKey]) slide[playerKey] = {};
        slide[playerKey].price = price;
        renderCanvas();
        renderEditorControls();
        saveProjectState();
        if (window.showCopyToast) {
            window.showCopyToast(`تم تحديد السعر: ${price} كوينز 💰`);
        }
    }

    // ---- 6.5 FC 27 PLAYER & CARD FETCHER ENGINE (FUT.GG / FUTBIN / PRESETS / UPLOAD) ----
    const REELS_PRESET_STARS = [
        {
            name: 'Kylian Mbappé',
            arName: 'كيليان مبابي',
            enQuery: 'kylian-mbappe',
            rating: '91',
            position: 'ST',
            defaultPrice: '2.4M',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            badges: ['⚡ سرعة 97', '🔥 ميتّا 5/5', '💰 2.4M كوينز']
        },
        {
            name: 'Vinícius Júnior',
            arName: 'فينيسيوس جونيور',
            enQuery: 'vinicius-jr',
            rating: '89',
            position: 'LW',
            defaultPrice: '1.8M',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
            badges: ['⚡ سرعة 95', '🪄 مهارات 5 نجوم', '🔥 مراوغات 91']
        },
        {
            name: 'Jude Bellingham',
            arName: 'جود بيلينغهام',
            enQuery: 'jude-bellingham',
            rating: '90',
            position: 'CAM',
            defaultPrice: '950K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
            badges: ['🛡️ متكامل 80+', '🎯 إنهاء قوي', '👑 صانع لعب']
        },
        {
            name: 'Erling Haaland',
            arName: 'إرلينغ هالاند',
            enQuery: 'erling-haaland',
            rating: '91',
            position: 'ST',
            defaultPrice: '1.1M',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
            badges: ['🚀 تسديد خارق 93', '💪 قوة بدنية', '🤖 ماكينة أهداف']
        },
        {
            name: 'Lamine Yamal',
            arName: 'لامين يامال',
            enQuery: 'lamine-yamal',
            rating: '87',
            position: 'RW',
            defaultPrice: '780K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-67386507.a953ece6dcf87cff76b8213692e7d57e1d31a2268e3f32596dd738c7a1591220.webp',
            badges: ['💎 موهبة استثنائية', '⚡ سرعة ورشاقة', '🔥 تسديد مقوس']
        },
        {
            name: 'Mohamed Salah',
            arName: 'محمد صلاح',
            enQuery: 'mohamed-salah',
            rating: '87',
            position: 'RM',
            defaultPrice: '550K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-209331.bdfc8b1e25229756f608e53457f6d58285771dcfddb855e6d723a3023f6aa7c2.webp',
            badges: ['👑 فخر العرب', '🎯 إنهاء حاسم', '⚡ سرعة 89']
        },
        {
            name: 'Cole Palmer',
            arName: 'كول بالمر',
            enQuery: 'cole-palmer',
            rating: '85',
            position: 'CAM',
            defaultPrice: '380K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-257534.5ab77a65780079d6792225ab1188f2250ca159e3ebe6a26b6375ed6a307622f7.webp',
            badges: ['🥶 كولد بالمر', '🎯 صانع لعب', '🔥 تسديد متقن']
        },
        {
            name: 'Bukayo Saka',
            arName: 'بوكايو ساكا',
            enQuery: 'bukayo-saka',
            rating: '88',
            position: 'RW',
            defaultPrice: '420K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
            badges: ['⚡ جناح سريع', '🎯 عرضيات متقنة', '🔥 نجم الدوري']
        },
        {
            name: 'Rodri',
            arName: 'رودري',
            enQuery: 'rodri',
            rating: '90',
            position: 'CDM',
            defaultPrice: '120K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp',
            badges: ['🏆 أفضل لاعب بالعالم', '🛡️ صمام أمان', '🎯 تمريرات 90+']
        },
        {
            name: 'Lionel Messi',
            arName: 'ليونيل ميسي',
            enQuery: 'lionel-messi',
            rating: '89',
            position: 'RW',
            defaultPrice: '180K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-158023.b7b052e75f1a00658907cbe5312eb4a62b2661631a6e0661b1924ec5e3f2a91c.webp',
            badges: ['🐐 الأسطورة', '🪄 سحر المراوغة', '🎯 صانع أهداف']
        },
        {
            name: 'Cristiano Ronaldo',
            arName: 'كريستيانو رونالدو',
            enQuery: 'cristiano-ronaldo',
            rating: '84',
            position: 'ST',
            defaultPrice: '45K',
            imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-20801.cb3bb88dcfff15fcfcc495bbad7a5d9b90f64d78078740c44e67a7ecf028ecb4.webp',
            badges: ['🐐 الدون SIUU', '🎯 تسديد 88', '💪 ارتقاء خيالي']
        }
    ];

    const ARABIC_PLAYER_NAME_MAP = {
        'مبابي': { en: 'kylian-mbappe', ar: 'كيليان مبابي' },
        'فينيسيوس': { en: 'vinicius-jr', ar: 'فينيسيوس جونيور' },
        'بيلينغهام': { en: 'jude-bellingham', ar: 'جود بيلينغهام' },
        'هالاند': { en: 'erling-haaland', ar: 'إرلينغ هالاند' },
        'صلاح': { en: 'mohamed-salah', ar: 'محمد صلاح' },
        'يامال': { en: 'lamine-yamal', ar: 'لامين يامال' },
        'رودري': { en: 'rodri', ar: 'رودري' },
        'ساكا': { en: 'bukayo-saka', ar: 'بوكايو ساكا' },
        'بالمر': { en: 'cole-palmer', ar: 'كول بالمر' },
        'ميسي': { en: 'lionel-messi', ar: 'ليونيل ميسي' },
        'رونالدو': { en: 'cristiano-ronaldo', ar: 'كريستيانو رونالدو' },
        'دي بروين': { en: 'kevin-de-bruyne', ar: 'كيفين دي بروين' },
        'فالفيردي': { en: 'federico-valverde', ar: 'فيديريكو فالفيردي' },
        'موسيالا': { en: 'jamal-musiala', ar: 'جمال موسيالا' },
        'سون': { en: 'heung-min-son', ar: 'سون هيونغ مين' },
        'كين': { en: 'harry-kane', ar: 'هاري كين' },
        'ليفاندوفسكي': { en: 'robert-lewandowski', ar: 'روبرت ليفاندوفسكي' },
        'جيوكيريس': { en: 'viktor-gyokeres', ar: 'فيكتور جيوكيريس' },
        'ديمبيلي': { en: 'ousmane-dembele', ar: 'عثمان ديمبيلي' },
        'لياو': { en: 'rafael-leao', ar: 'رافائيل لياو' },
        'مرموش': { en: 'omar-marmoush', ar: 'عمر مرموش' }
    };

    function applyStarDataToSlide(slideIndex, star, playerKey = null) {
        const slide = state.slides[slideIndex];
        if (!slide) return;

        if (playerKey && slide.type === 'versus_card') {
            if (!slide[playerKey]) slide[playerKey] = {};
            slide[playerKey].name = star.name;
            slide[playerKey].arName = star.arName;
            slide[playerKey].cardUrl = star.imageUrl;
            slide[playerKey].rating = star.rating;
            slide[playerKey].statHighlight = `طاقات ${star.rating}`;
            if (star.defaultPrice) slide[playerKey].price = star.defaultPrice;
        } else {
            slide.playerName = star.name;
            slide.playerArName = star.arName;
            slide.cardUrl = star.imageUrl;
            slide.rating = star.rating;
            if (star.defaultPrice) slide.playerPrice = star.defaultPrice;
            slide.badges = star.badges ? [...star.badges] : [`⚡ سرعة ${star.rating}`, '🔥 ميتّا', '💰 كوينز مناسبة'];
        }

        renderCanvas();
        renderEditorControls();
        saveProjectState();
    }

    function applyStarPresetToSlide(slideIndex, starIndex, playerKey = null) {
        const star = REELS_PRESET_STARS[starIndex];
        if (!star) return;
        applyStarDataToSlide(slideIndex, star, playerKey);
        if (window.showCopyToast) {
            window.showCopyToast(`تم تطبيق كرت ${star.arName} (${star.rating}) لـ FC 27 بنجاح! ⚡`);
        }
    }

    async function fetchPlayerCardData(slideIndex, rawQuery, playerKey = null) {
        const query = (rawQuery || '').trim();
        if (!query) {
            if (window.showCopyToast) window.showCopyToast('يرجى كتابة اسم اللاعب أو لصق رابطه من FUT.GG أو FUTBIN ⚠️');
            return;
        }

        const btnId = playerKey ? `btnReelFetch_${slideIndex}_${playerKey}` : `btnReelFetch_${slideIndex}`;
        const btn = document.getElementById(btnId);
        const origText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = 'جاري السحب... ⏳';
            btn.disabled = true;
        }

        try {
            const isUrl = /^https?:\/\//i.test(query) || query.includes('fut.gg') || query.includes('futbin.com');

            if (!isUrl) {
                const cleanLower = query.toLowerCase();
                const localPreset = REELS_PRESET_STARS.find(s => 
                    s.name.toLowerCase().includes(cleanLower) || 
                    s.arName.includes(query) || 
                    cleanLower.includes(s.enQuery.toLowerCase())
                );

                if (localPreset) {
                    applyStarDataToSlide(slideIndex, localPreset, playerKey);
                    if (window.showCopyToast) window.showCopyToast(`تم سحب كرت ${localPreset.arName} بنجاح! ⚡`);
                    return;
                }
            }

            let searchTarget = query;
            if (!isUrl) {
                const arMatchKey = Object.keys(ARABIC_PLAYER_NAME_MAP).find(k => query.includes(k) || k.includes(query));
                if (arMatchKey) {
                    searchTarget = ARABIC_PLAYER_NAME_MAP[arMatchKey].en;
                }
            }

            const res = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(searchTarget)}`);
            let data = null;
            try {
                data = await res.json();
            } catch(e) {
                fallbackApplyOrToast(slideIndex, query, playerKey);
                return;
            }

            if (!res.ok || !data || !data.success) {
                const errMsg = (data && data.error) || 'تعذر سحب صورة واسم اللاعب من هذا الرابط';
                if (window.showCopyToast) window.showCopyToast(`⚠️ ${errMsg}`);
                return;
            }

            let finalCardImg = data.cardImage || data.imageUrl || data.sbcImage || '';
            if (finalCardImg.includes('url=')) {
                try {
                    const extracted = decodeURIComponent(finalCardImg.split('url=')[1]);
                    if (extracted.startsWith('http')) finalCardImg = extracted;
                } catch(e) {}
            }

            let arabicName = data.playerName || query;
            const enLower = (data.playerName || '').toLowerCase();
            for (const [arKey, item] of Object.entries(ARABIC_PLAYER_NAME_MAP)) {
                const itemEn = item.en.replace(/-/g, ' ').toLowerCase();
                const parts = itemEn.split(' ');
                if (parts.some(p => p.length > 3 && enLower.includes(p))) {
                    arabicName = item.ar;
                    break;
                }
            }

            const slide = state.slides[slideIndex];
            if (!slide) return;

            if (playerKey && slide.type === 'versus_card') {
                if (!slide[playerKey]) slide[playerKey] = {};
                slide[playerKey].name = data.playerName || query;
                slide[playerKey].arName = arabicName;
                slide[playerKey].cardUrl = finalCardImg;
                slide[playerKey].rating = data.rating || '88';
                slide[playerKey].statHighlight = `طاقات ${data.rating || '88'}`;
            } else {
                slide.playerName = data.playerName || query;
                slide.playerArName = arabicName;
                slide.cardUrl = finalCardImg;
                slide.rating = data.rating || '88';
                slide.badges = [`⚡ سرعة ${data.rating || '88'}`, '🔥 ميتّا', '💰 كوينز مناسبة'];
            }

            renderCanvas();
            renderEditorControls();
            saveProjectState();

            if (window.showCopyToast) {
                window.showCopyToast(`تم سحب كرت ${arabicName} بنجاح! ⚡`);
            }
        } catch(err) {
            console.error('[Reels] fetch error:', err);
            fallbackApplyOrToast(slideIndex, query, playerKey);
        } finally {
            if (btn) {
                btn.innerHTML = origText || 'سحب ⚡';
                btn.disabled = false;
            }
        }
    }

    function fallbackApplyOrToast(slideIndex, query, playerKey = null) {
        const clean = query.toLowerCase();
        const fallbackStar = REELS_PRESET_STARS.find(s => 
            s.name.toLowerCase().includes(clean) || 
            s.arName.includes(query) || 
            clean.includes(s.enQuery.toLowerCase())
        );
        if (fallbackStar) {
            applyStarDataToSlide(slideIndex, fallbackStar, playerKey);
            if (window.showCopyToast) {
                window.showCopyToast(`تم سحب وتطبيق كرت ${fallbackStar.arName} بنجاح! ⚡`);
            }
        } else {
            if (window.showCopyToast) {
                window.showCopyToast('💡 يمكنك رفع صورة الكرت مباشرة من جهازك أو اختيار أحد النجوم الجاهزين');
            }
        }
    }

    function handleCardImageUpload(slideIndex, fileInput, playerKey = null) {
        if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const slide = state.slides[slideIndex];
            if (!slide) return;
            if (playerKey && slide.type === 'versus_card') {
                if (!slide[playerKey]) slide[playerKey] = {};
                slide[playerKey].cardUrl = e.target.result;
            } else {
                slide.cardUrl = e.target.result;
            }
            renderCanvas();
            renderEditorControls();
            saveProjectState();
            if (window.showCopyToast) {
                window.showCopyToast('تم رفع صورة الكرت بنجاح! 🖼️');
            }
        };
        reader.readAsDataURL(file);
    }

    function renderPlayerFetcherBoxHtml(slideIndex) {
        const inputId = `reelPlayerFetchInput_${slideIndex}`;
        const btnId = `btnReelFetch_${slideIndex}`;
        return `
            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div class="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div class="flex items-center gap-1.5">
                        <span class="text-sm">🃏</span>
                        <label class="text-[11.5px] font-black text-slate-900">سحب كرت اللاعب مع الاسم تلقائياً:</label>
                    </div>
                    <span class="text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        FUT.GG & FUTBIN ⚡
                    </span>
                </div>

                <div class="space-y-1.5">
                    <div class="flex gap-1.5">
                        <input type="text" id="${inputId}" 
                               placeholder="الصق رابط كرت اللاعب من FUT.GG أو اكتب اسمه (مثلاً: مبابي)..."
                               onkeydown="if(event.key==='Enter') ReelsEngine.fetchPlayerCardData(${slideIndex}, this.value)"
                               class="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-600 focus:bg-white transition shadow-2xs">
                        <button type="button" id="${btnId}"
                                onclick="ReelsEngine.fetchPlayerCardData(${slideIndex}, document.getElementById('${inputId}').value)"
                                class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shrink-0 flex items-center gap-1 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer">
                            <span>سحب ⚡</span>
                        </button>
                    </div>
                    <p class="text-[9.5px] text-slate-400">💡 يسحب صورة البطاقة الشفافة العالية الدقة ويملأ اسم اللاعب باللغة العربية فوراً.</p>
                </div>

                <div class="pt-1.5 border-t border-slate-100 space-y-1.5">
                    <span class="text-[10px] font-bold text-slate-500 block">⭐ أو اختر كرت نجم جاهز بنقرة واحدة:</span>
                    <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-0.5">
                        ${REELS_PRESET_STARS.map((star, sIdx) => `
                            <button type="button" onclick="ReelsEngine.applyStarPresetToSlide(${slideIndex}, ${sIdx})"
                                    class="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-[10.5px] font-black transition flex items-center gap-1 shadow-2xs active:scale-95 cursor-pointer">
                                <span>${star.arName}</span>
                                <span class="text-[9px] font-mono text-emerald-700 bg-white px-1 py-0.2 rounded border border-slate-200 font-bold">${star.rating}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[10.5px] font-bold text-slate-600">أو رفع صورة الكرت يدوياً من جهازك:</span>
                    <label class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-black cursor-pointer transition flex items-center gap-1 shadow-2xs active:scale-95">
                        <span>📁 اختيار صورة</span>
                        <input type="file" accept="image/*" class="hidden" onchange="ReelsEngine.handleCardImageUpload(${slideIndex}, this)">
                    </label>
                </div>
            </div>
        `;
    }

    function renderVersusPlayerFetcherHtml(slideIndex, playerKey, labelText) {
        const inputId = `reelVersusFetchInput_${slideIndex}_${playerKey}`;
        const btnId = `btnReelFetch_${slideIndex}_${playerKey}`;
        const pObj = (state.slides[slideIndex] && state.slides[slideIndex][playerKey]) || {};
        return `
            <div class="p-2.5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs">⚡</span>
                        <span class="text-[11px] font-black text-slate-900">${labelText}:</span>
                    </div>
                    <button type="button" onclick="ReelsEngine.toggleElementVisibility('${playerKey === 'playerA' ? 'hideCardA' : 'hideCardB'}')" class="text-[10px] font-bold px-2 py-0.5 rounded ${(playerKey === 'playerA' ? state.slides[slideIndex].hideCardA : state.slides[slideIndex].hideCardB) ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                        ${(playerKey === 'playerA' ? state.slides[slideIndex].hideCardA : state.slides[slideIndex].hideCardB) ? '👁️ إظهار' : '🗑️ إخفاء'}
                    </button>
                </div>

                <div class="flex gap-1.5">
                    <input type="text" id="${inputId}" 
                           placeholder="الصق رابط أو اسم ${labelText}..."
                           onkeydown="if(event.key==='Enter') ReelsEngine.fetchPlayerCardData(${slideIndex}, this.value, '${playerKey}')"
                           class="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-emerald-500 shadow-2xs">
                    <button type="button" id="${btnId}"
                            onclick="ReelsEngine.fetchPlayerCardData(${slideIndex}, document.getElementById('${inputId}').value, '${playerKey}')"
                            class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shrink-0 active:scale-95 shadow-2xs cursor-pointer">
                        سحب ⚡
                    </button>
                    <label class="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition shrink-0 flex items-center justify-center shadow-2xs" title="رفع صورة من الجهاز">
                        📁
                        <input type="file" accept="image/*" class="hidden" onchange="ReelsEngine.handleCardImageUpload(${slideIndex}, this, '${playerKey}')">
                    </label>
                </div>

                <div class="flex flex-wrap gap-1">
                    ${REELS_PRESET_STARS.slice(0, 6).map((star, sIdx) => `
                        <button type="button" onclick="ReelsEngine.applyStarPresetToSlide(${slideIndex}, ${sIdx}, '${playerKey}')"
                                class="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-emerald-50 text-slate-800 text-[10px] font-bold border border-slate-200 hover:border-emerald-300 transition shadow-2xs">
                            ${star.arName.split(' ')[0]} ${star.rating}
                        </button>
                    `).join('')}
                </div>

                <div class="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100">
                    <input type="text" placeholder="الاسم بالعربي" value="${(pObj.arName || pObj.name || '').replace(/"/g, '&quot;')}" 
                           oninput="ReelsEngine.updateVersusField('${playerKey}', 'arName', this.value)"
                           class="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900">
                    <input type="text" placeholder="أبرز ميزة (طاقات 90)" value="${(pObj.statHighlight || '').replace(/"/g, '&quot;')}" 
                           oninput="ReelsEngine.updateVersusField('${playerKey}', 'statHighlight', this.value)"
                           class="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900">
                </div>

                <div class="flex items-center gap-1.5">
                    <div class="w-8 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                        <img src="${pObj.cardUrl ? toProxyUrl(pObj.cardUrl) : 'assets/placeholder_card.png'}" alt="Card" class="max-h-full max-w-full object-contain" crossorigin="anonymous">
                    </div>
                    <input type="text" placeholder="رابط كرت ${labelText}" value="${(pObj.cardUrl || '').replace(/"/g, '&quot;')}" 
                           onchange="ReelsEngine.updateVersusField('${playerKey}', 'cardUrl', this.value)"
                           class="flex-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-700">
                </div>

                <!-- Player Price in Coins (Optional) -->
                <div class="p-2 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <img src="assets/fc-coin.webp" alt="Coin" class="w-3.5 h-3.5 object-contain">
                            <span class="text-[10px] font-black text-amber-950">سعر ${labelText} بالكوينز (اختياري):</span>
                        </div>
                        ${pObj.price ? `
                            <button type="button" onclick="ReelsEngine.setVersusPlayerPrice('${playerKey}', '')" class="text-[9.5px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded transition">
                                مسح ✕
                            </button>
                        ` : `
                            <span class="text-[9px] text-slate-400 font-medium">غير معروض</span>
                        `}
                    </div>
                    <div class="flex items-center gap-1.5">
                        <div class="relative flex-1">
                            <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                <img src="assets/fc-coin.webp" alt="Coin" class="w-3.5 h-3.5 object-contain">
                            </div>
                            <input type="text" placeholder="مثال: 1.8M أو 450K..." value="${(pObj.price || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateVersusField('${playerKey}', 'price', this.value)"
                                   class="w-full pr-7 pl-2 py-1 rounded-lg bg-white border border-amber-200 text-xs font-black font-mono text-slate-900 outline-none focus:border-amber-500 shadow-2xs">
                        </div>
                        <div class="flex gap-1 shrink-0">
                            ${['2.4M', '1.2M', '500K'].map(p => `
                                <button type="button" onclick="ReelsEngine.setVersusPlayerPrice('${playerKey}', '${p}')" 
                                        class="px-1.5 py-0.5 rounded-md bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 text-[9.5px] font-bold font-mono transition shadow-2xs">
                                    ${p}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ---- 7. INTERACTIVE VIDEO PLAYER ----
    function playPlayback(customDest = null, ctxOverride = null, onComplete = null) {
        if (state.isPlaying) {
            pausePlayback();
        }
        state.isPlaying = true;
        updatePlayerUi();

        // 1. Trigger background music
        startBgm(customDest, ctxOverride);

        // 2. Trigger audio for current starting slide
        triggerSlideAudio(state.slides[state.currentSlideIndex], customDest, ctxOverride);

        const tickMs = 30;
        let slideStartTime = Date.now();

        const getCurSlideMs = () => {
            const slide = state.slides[state.currentSlideIndex];
            return Math.max(500, ((slide && slide.duration) || state.slideDuration || 2.5) * 1000);
        };

        if (state.playbackTimer) clearInterval(state.playbackTimer);

        state.playbackTimer = setInterval(() => {
            try {
                const curSlideMs = getCurSlideMs();
                const elapsed = Date.now() - slideStartTime;
                state.timelineProgress = Math.min(100, (elapsed / curSlideMs) * 100);

                const bars = document.querySelectorAll('.reels-toolbar-timeline-bar, #toolbarTimelineBar, #reelTimelineBar');
                bars.forEach(b => { if (b) b.style.width = `${state.timelineProgress}%`; });
                const curStorySeg = document.getElementById('storyProgressSeg_' + state.currentSlideIndex);
                if (curStorySeg) curStorySeg.style.width = `${state.timelineProgress}%`;

                const laserBar = document.getElementById('storyProgressLaserBar');
                const laserHead = document.getElementById('storyProgressLaserHead');
                if (laserBar || laserHead) {
                    const total = (state.slides && state.slides.length) || 1;
                    const overallPct = Math.min(100, ((state.currentSlideIndex + ((state.timelineProgress || 0) / 100)) / total) * 100);
                    if (laserBar) laserBar.style.width = `${overallPct}%`;
                    if (laserHead) laserHead.style.left = `${overallPct}%`;
                }

                if (elapsed >= curSlideMs) {
                    slideStartTime = Date.now();
                    state.timelineProgress = 0;
                    if (state.currentSlideIndex < state.slides.length - 1) {
                        state.currentSlideIndex++;
                    } else {
                        if (typeof onComplete === 'function') {
                            pausePlayback();
                            onComplete();
                            return;
                        }
                        state.currentSlideIndex = 0;
                    }
                    state.slideEntrancePending = true;
                    ensureSelectedDragElement(false);
                    try { renderCanvas(); } catch(e) { console.warn('renderCanvas warning:', e); }
                    if (!customDest && !onComplete) {
                        try { renderEditorControls(); } catch(e) {}
                        try { updatePlayerUi(); } catch(e) {}
                    }

                    // Trigger audio for next slide
                    try { triggerSlideAudio(state.slides[state.currentSlideIndex], customDest, ctxOverride); } catch(e) {}
                    if (state.slideTransition && state.slideTransition.soundEnabled) {
                        try { playWhooshSound(customDest, 0.7, ctxOverride); } catch(e) {}
                    }
                }
            } catch (tickErr) {
                console.warn('[playPlayback Interval Tick Warning]', tickErr);
            }
        }, tickMs);
    }

    function pausePlayback() {
        state.isPlaying = false;
        if (state.playbackTimer) {
            clearInterval(state.playbackTimer);
            state.playbackTimer = null;
        }
        state.timelineProgress = 0;
        const bars = document.querySelectorAll('.reels-toolbar-timeline-bar, #toolbarTimelineBar, #reelTimelineBar');
        bars.forEach(b => { if (b) b.style.width = '0%'; });
        const curStorySeg = document.getElementById('storyProgressSeg_' + state.currentSlideIndex);
        if (curStorySeg) curStorySeg.style.width = '0%';
        const laserBar = document.getElementById('storyProgressLaserBar');
        const laserHead = document.getElementById('storyProgressLaserHead');
        if (laserBar || laserHead) {
            const total = (state.slides && state.slides.length) || 1;
            const overallPct = Math.min(100, (state.currentSlideIndex / total) * 100);
            if (laserBar) laserBar.style.width = `${overallPct}%`;
            if (laserHead) laserHead.style.left = `${overallPct}%`;
        }
        updatePlayerUi();

        // Stop background music
        stopBgm();
    }

    function togglePlayPause() {
        if (state.isPlaying) pausePlayback();
        else playPlayback();
    }

    function nextSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex < state.slides.length - 1) ? state.currentSlideIndex + 1 : 0;
        state.slideEntrancePending = true;
        ensureSelectedDragElement(false);
        renderCanvas();
        renderEditorControls();
        updatePlayerUi();
        if (state.slideTransition && state.slideTransition.soundEnabled) {
            playWhooshSound(null, 0.7);
        }
    }

    function prevSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex > 0) ? state.currentSlideIndex - 1 : state.slides.length - 1;
        state.slideEntrancePending = true;
        ensureSelectedDragElement(false);
        renderCanvas();
        renderEditorControls();
        updatePlayerUi();
        if (state.slideTransition && state.slideTransition.soundEnabled) {
            playWhooshSound(null, 0.7);
        }
    }

    function goToSlide(idx) {
        pausePlayback();
        if (idx >= 0 && idx < state.slides.length) {
            const changed = (state.currentSlideIndex !== idx);
            state.currentSlideIndex = idx;
            if (changed) {
                state.slideEntrancePending = true;
            }
            ensureSelectedDragElement(false);
            renderCanvas();
            renderEditorControls();
            updatePlayerUi();
            if (changed && state.slideTransition && state.slideTransition.soundEnabled) {
                playWhooshSound(null, 0.7);
            }
        }
    }

    // ---- 7.5 TITLE LINE & TYPOGRAPHY FORMATTING HELPERS ----
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function formatTitleLines(rawText, defaultText = '') {
        const text = (rawText !== undefined && rawText !== null && String(rawText).trim() !== '') ? String(rawText) : defaultText;
        if (!text) return '';
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) return '';
        return lines.map(line => `<span class="block max-w-[325px] mx-auto text-center leading-tight whitespace-normal break-words">${escapeHtml(line)}</span>`).join('');
    }

    function getTitleFontClass(rawText, defaultText = '') {
        const text = (rawText !== undefined && rawText !== null && String(rawText).trim() !== '') ? String(rawText) : defaultText;
        if (!text) return 'text-3xl md:text-4xl';
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const lineCount = lines.length || 1;
        const maxLen = lines.length ? Math.max(...lines.map(l => l.length)) : 0;

        if (maxLen > 40 || lineCount >= 4) return 'text-lg md:text-xl leading-snug';
        if (maxLen > 28 || lineCount === 3) return 'text-2xl md:text-3xl leading-tight';
        if (maxLen > 18 || lineCount === 2) return 'text-3xl md:text-4xl leading-tight';
        if (maxLen > 10) return 'text-4xl md:text-5xl leading-tight';
        return 'text-4xl md:text-5xl leading-tight';
    }

    function countTitleLines(rawText) {
        if (!rawText) return 1;
        const lines = String(rawText).split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        return lines.length || 1;
    }

    function splitIntoLines(text, lineCount) {
        const single = String(text || '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (!single) return '';
        if (lineCount <= 1) return single;

        const words = single.split(' ');
        if (words.length <= lineCount) return words.join('\n');

        if (lineCount === 2) {
            let bestIdx = 1;
            let minDiff = Infinity;
            for (let i = 1; i < words.length; i++) {
                const line1 = words.slice(0, i).join(' ');
                const line2 = words.slice(i).join(' ');
                const diff = Math.abs(line1.length - line2.length);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestIdx = i;
                }
            }
            return words.slice(0, bestIdx).join(' ') + '\n' + words.slice(bestIdx).join(' ');
        }

        if (lineCount === 3) {
            let bestI = 1, bestJ = 2;
            let minVariance = Infinity;
            for (let i = 1; i < words.length - 1; i++) {
                for (let j = i + 1; j < words.length; j++) {
                    const l1 = words.slice(0, i).join(' ').length;
                    const l2 = words.slice(i, j).join(' ').length;
                    const l3 = words.slice(j).join(' ').length;
                    const avg = (l1 + l2 + l3) / 3;
                    const variance = Math.pow(l1 - avg, 2) + Math.pow(l2 - avg, 2) + Math.pow(l3 - avg, 2);
                    if (variance < minVariance) {
                        minVariance = variance;
                        bestI = i;
                        bestJ = j;
                    }
                }
            }
            return words.slice(0, bestI).join(' ') + '\n' + 
                   words.slice(bestI, bestJ).join(' ') + '\n' + 
                   words.slice(bestJ).join(' ');
        }

        return single;
    }

    function getTitleLinesArray(rawText) {
        if (rawText === undefined || rawText === null) return [''];
        const str = String(rawText);
        if (!str) return [''];
        const parts = str.split(/\r?\n/);
        return parts.length > 0 ? parts : [''];
    }

    function syncTitleAcrossSlides(newTitle) {
        const current = state.slides[state.currentSlideIndex];
        if (current && current.type === 'outro') {
            current.title = newTitle;
            return;
        }
        state.title = newTitle;
        if (current && (current.type === 'intro' || current.type === 'versus_card')) {
            current.title = newTitle;
        }
        const introSlide = state.slides.find(s => s.type === 'intro');
        if (introSlide) {
            introSlide.title = newTitle;
        }
    }

    function renderLinesListInputsHtml(lines) {
        return lines.map((lineText, idx) => `
            <div class="flex items-center gap-1.5" data-line-index="${idx}">
                <span class="text-[10.5px] font-black text-slate-700 w-16 shrink-0 bg-white px-2 py-1.5 rounded-xl border border-slate-200 text-center shadow-2xs">
                    السطر ${idx + 1}
                </span>
                <input type="text" value="${escapeHtml(lineText)}" 
                       oninput="ReelsEngine.updateTitleLine(${idx}, this.value)"
                       onkeydown="if(event.key==='Enter'){event.preventDefault(); ReelsEngine.addTitleLine();}"
                       placeholder="${idx === 0 ? 'اكتب كلمات السطر الأول...' : (idx === 1 ? 'اكتب كلمات السطر الثاني...' : 'اكتب كلمات السطر ' + (idx + 1) + '...')}"
                       class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-black outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs">
                ${lines.length > 1 ? `
                    <button type="button" onclick="ReelsEngine.removeTitleLine(${idx})" 
                            class="w-7 h-7 rounded-xl bg-white hover:bg-rose-50 text-rose-500 hover:text-rose-700 border border-slate-200 flex items-center justify-center text-xs font-black transition active:scale-95 shadow-2xs shrink-0" title="حذف هذا السطر">
                        ✕
                    </button>
                ` : ''}
            </div>
        `).join('');
    }

    function refreshLineInputsDom(titleText) {
        const container = document.getElementById('reelsTitleLinesContainer');
        if (!container) return;
        const lines = getTitleLinesArray(titleText);
        container.innerHTML = renderLinesListInputsHtml(lines);
    }

    function updateTitleFromTextarea(val) {
        syncTitleAcrossSlides(val);
        refreshLineInputsDom(val);
        renderCanvas();
        saveProjectState();
    }

    function updateTitleLine(index, value) {
        const current = state.slides[state.currentSlideIndex];
        const baseTitle = (current && current.title !== undefined) ? current.title : (state.title || '');
        let lines = getTitleLinesArray(baseTitle);
        while (lines.length <= index) lines.push('');
        lines[index] = value;

        const newTitle = lines.join('\n');
        syncTitleAcrossSlides(newTitle);

        const ta = document.getElementById('reelsTitleMainTextarea');
        if (ta && ta.value !== newTitle) {
            ta.value = newTitle;
        }

        renderCanvas();
        saveProjectState();
    }

    function addTitleLine() {
        const current = state.slides[state.currentSlideIndex];
        const baseTitle = (current && current.title !== undefined) ? current.title : (state.title || '');
        let lines = getTitleLinesArray(baseTitle);
        if (lines.length >= 4) {
            if (window.showCopyToast) window.showCopyToast('الحد الأقصى هو 4 أسطر للحفاظ على تصميم الريل متناسقاً');
            return;
        }
        lines.push('');
        const newTitle = lines.join('\n');
        syncTitleAcrossSlides(newTitle);

        const ta = document.getElementById('reelsTitleMainTextarea');
        if (ta) ta.value = newTitle;

        refreshLineInputsDom(newTitle);
        renderCanvas();
        saveProjectState();

        setTimeout(() => {
            const inputs = document.querySelectorAll('#reelsTitleLinesContainer input');
            if (inputs && inputs[inputs.length - 1]) {
                inputs[inputs.length - 1].focus();
            }
        }, 60);
    }

    function removeTitleLine(index) {
        const current = state.slides[state.currentSlideIndex];
        const baseTitle = (current && current.title !== undefined) ? current.title : (state.title || '');
        let lines = getTitleLinesArray(baseTitle);
        if (lines.length <= 1) {
            lines = [''];
        } else {
            lines.splice(index, 1);
        }
        const newTitle = lines.join('\n');
        syncTitleAcrossSlides(newTitle);

        const ta = document.getElementById('reelsTitleMainTextarea');
        if (ta) ta.value = newTitle;

        refreshLineInputsDom(newTitle);
        renderCanvas();
        saveProjectState();
    }

    function formatTitleLinesCount(targetLines) {
        const current = state.slides[state.currentSlideIndex];
        const baseTitle = (current && current.title) || state.title || '';
        const newTitle = splitIntoLines(baseTitle, targetLines);
        syncTitleAcrossSlides(newTitle);

        const ta = document.getElementById('reelsTitleMainTextarea');
        if (ta) ta.value = newTitle;

        refreshLineInputsDom(newTitle);
        renderCanvas();
        saveProjectState();
    }

    function renderTitleLinesBuilderHtml(titleText, labelText = 'عنوان الريل (توزيع الكلمات بالأسطر):', hideField = 'hideTitle', isHidden = false) {
        const lines = getTitleLinesArray(titleText);
        const rowsCount = Math.max(2, Math.min(lines.length + 1, 4));
        return `
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <label class="text-[11.5px] font-black text-slate-900">${labelText}</label>
                        <span id="reelAutoSaveBadge" class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">💾 محفوظ</span>
                    </div>
                    ${hideField ? `
                        <button type="button" onclick="ReelsEngine.toggleElementVisibility('${hideField}')" class="text-[10px] font-bold px-2 py-0.5 rounded ${isHidden ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                            ${isHidden ? '👁️ إظهار' : '🗑️ إخفاء'}
                        </button>
                    ` : ''}
                </div>

                <!-- 1. Textarea: Enter key directly creates line -->
                <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold text-slate-500">اكتب واضغط Enter لكل سطر، أو استخدم أزرار التقسيم:</span>
                        <div class="flex items-center gap-1">
                            <button type="button" onclick="ReelsEngine.formatTitleLinesCount(1)" 
                                    class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[9.5px] font-black border border-slate-200 shadow-2xs active:scale-95 transition" title="دمج كل الكلمات في سطر واحد">
                                سطر ⎯
                            </button>
                            <button type="button" onclick="ReelsEngine.formatTitleLinesCount(2)" 
                                    class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[9.5px] font-black border border-slate-200 shadow-2xs active:scale-95 transition" title="توزيع تلقائي لسطرين">
                                سطرين ⚏
                            </button>
                            <button type="button" onclick="ReelsEngine.formatTitleLinesCount(3)" 
                                    class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[9.5px] font-black border border-slate-200 shadow-2xs active:scale-95 transition" title="توزيع تلقائي لـ 3 أسطر">
                                3 أسطر ☰
                            </button>
                        </div>
                    </div>
                    <textarea id="reelsTitleMainTextarea" rows="${rowsCount}" 
                              oninput="ReelsEngine.updateTitleFromTextarea(this.value)"
                              placeholder="اكتب العنوان هنا واضغط Enter للانتقال لسطر جديد فوراً..."
                              class="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-black resize-none leading-relaxed outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs">${escapeHtml(titleText)}</textarea>
                </div>

                <!-- 2. Granular line-by-line inputs -->
                <div class="pt-2 border-t border-slate-200/70 space-y-1.5">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold text-slate-500">أو حدد كلمات كل سطر بدقة:</span>
                        <button type="button" onclick="ReelsEngine.addTitleLine()" 
                                class="text-[10px] font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 transition active:scale-95">
                            <span>➕ إضافة سطر</span>
                        </button>
                    </div>
                    <div class="space-y-1.5" id="reelsTitleLinesContainer">
                        ${renderLinesListInputsHtml(lines)}
                    </div>
                </div>

                <p class="text-[9.5px] text-slate-500 font-medium leading-relaxed bg-white/80 p-2 rounded-xl border border-slate-200/60">
                    💡 <b>تحكم مباشر بالكلمات:</b> كل سطر تكتبه في الصندوق أعلاه يظهر كسطر مستقل 100% في الريل تماماً كما كتبته!
                </p>
            </div>
        `;
    }

    // ---- 7.6 PERSISTENT PROJECT AUTO-SAVE ENGINE ----
    const PROJECT_STORAGE_KEY_PREFIX = 'shopcoin15_reel_project_v3_';
    let autoSaveTimeout = null;

    function showSavedToastIndicator() {
        const badge = document.getElementById('reelAutoSaveBadge');
        if (badge) {
            badge.textContent = '💾 تم الحفظ تلقائياً ✓';
            badge.classList.remove('opacity-60');
            badge.classList.add('opacity-100', 'bg-emerald-100', 'text-emerald-800');
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                if (badge) {
                    badge.textContent = '💾 محفوظ';
                    badge.classList.add('opacity-60');
                    badge.classList.remove('bg-emerald-100');
                }
            }, 1800);
        }
    }

    function saveProjectState() {
        try {
            const sec = state.activeSection || 'countdown';
            const payload = {
                activeSection: sec,
                theme: state.theme,
                fontFamily: state.fontFamily,
                title: state.title,
                subtitle: state.subtitle,
                badge: state.badge,
                slides: state.slides,
                currentSlideIndex: state.currentSlideIndex,
                slideDuration: state.slideDuration,
                layouts: state.layouts,
                animationsEnabled: state.animationsEnabled,
                elementAnimations: state.elementAnimations,
                progressBar: state.progressBar,
                slideTransition: state.slideTransition,
                savedAt: Date.now()
            };
            localStorage.setItem(PROJECT_STORAGE_KEY_PREFIX + sec, JSON.stringify(payload));
            localStorage.setItem(PROJECT_STORAGE_KEY_PREFIX + 'last_active', sec);
            showSavedToastIndicator();
            try {
                fetch(getReelsApiUrl('/api/reels/save-active-project'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            } catch (syncErr) {}
        } catch (e) {
            console.warn('[Reels] Auto-save error:', e);
        }
    }

    function loadSavedProjectForSection(sec) {
        try {
            const raw = localStorage.getItem(PROJECT_STORAGE_KEY_PREFIX + sec);
            if (raw) {
                const data = JSON.parse(raw);
                if (data && Array.isArray(data.slides) && data.slides.length > 0) {
                    state.activeSection = sec;
                    state.theme = data.theme || 'ea_marble_clean';
                    state.fontFamily = data.fontFamily || loadSavedFontFamily();
                    state.title = data.title || state.title;
                    state.subtitle = data.subtitle || state.subtitle;
                    state.badge = data.badge || state.badge;
                    state.slides = data.slides;
                    state.currentSlideIndex = Math.max(0, Math.min(data.currentSlideIndex || 0, data.slides.length - 1));
                    state.slideDuration = data.slideDuration || 2.5;
                    if (data.layouts) {
                        state.layouts = {
                            countdown: { ...DEFAULT_LAYOUTS.countdown, ...(data.layouts.countdown || {}) },
                            versus: { ...DEFAULT_LAYOUTS.versus, ...(data.layouts.versus || {}) }
                        };
                    }
                    if (data.elementAnimations) {
                        state.elementAnimations = { ...DEFAULT_ELEMENT_ANIMATIONS, ...data.elementAnimations };
                    }
                    if (data.animationsEnabled !== undefined) {
                        state.animationsEnabled = data.animationsEnabled;
                    }
                    if (data.progressBar) {
                        state.progressBar = { ...DEFAULT_PROGRESS_BAR, ...data.progressBar };
                    }
                    if (data.slideTransition) {
                        state.slideTransition = { ...DEFAULT_SLIDE_TRANSITION, ...data.slideTransition };
                    }
                    ensureSelectedDragElement();
                    return true;
                }
            }
        } catch (e) {
            console.warn('[Reels] Load section error:', e);
        }
        return false;
    }

    function loadProject(data) {
        if (!data) return;
        if (data.slides && Array.isArray(data.slides)) state.slides = data.slides;
        if (data.activeSection) state.activeSection = data.activeSection;
        if (data.theme) state.theme = data.theme;
        if (data.fontFamily) state.fontFamily = data.fontFamily;
        if (data.title !== undefined) state.title = data.title;
        if (data.subtitle !== undefined) state.subtitle = data.subtitle;
        if (data.badge !== undefined) state.badge = data.badge;
        if (data.slideDuration) state.slideDuration = data.slideDuration;
        if (data.layouts) state.layouts = data.layouts;
        if (data.elementAnimations) state.elementAnimations = data.elementAnimations;
        if (data.animationsEnabled !== undefined) state.animationsEnabled = data.animationsEnabled;
        if (data.progressBar) state.progressBar = data.progressBar;
        if (data.slideTransition) state.slideTransition = data.slideTransition;
        state.currentSlideIndex = 0;
        state.slideEntrancePending = true;
        state.selectedDragElement = null;
        ensureSelectedDragElement(false);
        renderCanvas();
        renderEditorControls();
        updatePlayerUi();
    }

    function setAudioState(newAudioState) {
        if (!newAudioState) return;
        Object.assign(audioState, newAudioState);
        saveAudioState();
    }

    // ---- 7.5 ANIMATION CONTROLLER METHODS ----
    function computeElemAnimStyle(elemId) {
        if (!state.animationsEnabled) return '';
        const cfg = (state.elementAnimations && state.elementAnimations[elemId]) || DEFAULT_ELEMENT_ANIMATIONS[elemId];
        if (!cfg || cfg.type === 'none') return '';
        const dur = cfg.duration || 0.6;
        const delay = (cfg.delay !== undefined) ? cfg.delay : 0.1;
        const animName = `reelAnim_${cfg.type}`;
        return `animation: ${animName} ${dur}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both; will-change: transform, opacity;`;
    }

    function getElemAnimStyle(elemId) {
        if (!state.slideEntrancePending || !state.animationsEnabled) return '';
        if (activeDrag || state.isCapturingExport) return '';
        return computeElemAnimStyle(elemId);
    }

    function replaySlideAnimations() {
        state.slideEntrancePending = true;
        renderCanvas();
        state.slideEntrancePending = false;
        if (state.slideTransition && state.slideTransition.soundEnabled) {
            playWhooshSound(null, 0.7);
        }
        if (window.showCopyToast) {
            window.showCopyToast('🎬 تم إعادة تشغيل حركات وانتقال السلايد');
        }
    }

    function testElementAnimation(elemId) {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;
        const dragContainer = canvas.querySelector(`[data-drag-id="${elemId}"]`);
        if (!dragContainer) return;
        const layer = dragContainer.querySelector('.reel-anim-layer');
        if (!layer) return;
        const animStyle = computeElemAnimStyle(elemId);
        layer.style.animation = 'none';
        void layer.offsetWidth;
        if (animStyle) {
            const match = animStyle.match(/animation:\s*([^;]+);/);
            if (match) {
                layer.style.animation = match[1];
            }
        }
    }

    function toggleAnimationsMaster() {
        state.animationsEnabled = !state.animationsEnabled;
        saveAnimationsState();
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(state.animationsEnabled ? 'تم تفعيل حركات الريلز 🎬✨' : 'تم إيقاف الحركات (الريل أصبح ثابتاً ⏹️)');
        }
    }

    function setElementAnimation(elemId, key, value) {
        if (!state.elementAnimations) state.elementAnimations = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_ANIMATIONS));
        if (!state.elementAnimations[elemId]) {
            state.elementAnimations[elemId] = { type: 'fadeUp', delay: 0.1, duration: 0.6 };
        }
        state.elementAnimations[elemId][key] = value;
        saveAnimationsState();
        saveProjectState();
        renderCanvas();
        testElementAnimation(elemId);
    }

    function applyAnimationPreset(presetName) {
        state.animationsEnabled = true;
        if (presetName === 'none') {
            state.animationsEnabled = false;
            if (!state.elementAnimations) state.elementAnimations = {};
            Object.keys(DEFAULT_ELEMENT_ANIMATIONS).forEach(k => {
                if (!state.elementAnimations[k]) state.elementAnimations[k] = {};
                state.elementAnimations[k].type = 'none';
            });
            saveAnimationsState();
            saveProjectState();
            renderCanvas();
            renderEditorControls();
            if (window.showCopyToast) window.showCopyToast('تم إيقاف كافة الحركات (وضع ثابت ⏹️)');
            return;
        }

        if (presetName === 'cinematic') {
            state.elementAnimations = {
                title: { type: 'fadeUp', delay: 0.05, duration: 0.7 },
                card: { type: 'cinematicZoom', delay: 0.15, duration: 0.7 },
                cardA: { type: 'cinematicZoom', delay: 0.15, duration: 0.7 },
                cardB: { type: 'cinematicZoom', delay: 0.25, duration: 0.7 },
                vsBadge: { type: 'popScale', delay: 0.35, duration: 0.5 },
                playerName: { type: 'fadeUp', delay: 0.3, duration: 0.6 },
                rank: { type: 'popScale', delay: 0.05, duration: 0.5 },
                scLogo: { type: 'glowPulse', delay: 0.4, duration: 0.8 },
                fcLogo: { type: 'fadeDown', delay: 0.1, duration: 0.6 },
                introTitle: { type: 'fadeUp', delay: 0.1, duration: 0.7 },
                introBadge: { type: 'fadeDown', delay: 0.0, duration: 0.5 },
                introSubtitle: { type: 'fadeUp', delay: 0.25, duration: 0.6 },
                introCta: { type: 'popScale', delay: 0.4, duration: 0.6 },
                outroLogo: { type: 'glowPulse', delay: 0.1, duration: 0.8 },
                outroTitle: { type: 'fadeUp', delay: 0.2, duration: 0.6 },
                outroSubtitle: { type: 'fadeUp', delay: 0.3, duration: 0.6 },
                outroFeatures: { type: 'cinematicZoom', delay: 0.35, duration: 0.6 },
                outroCta: { type: 'popScale', delay: 0.5, duration: 0.6 },
                question: { type: 'fadeUp', delay: 0.35, duration: 0.6 }
            };
        } else if (presetName === 'dynamic') {
            state.elementAnimations = {
                title: { type: 'popScale', delay: 0.05, duration: 0.5 },
                card: { type: 'popScale', delay: 0.15, duration: 0.55 },
                cardA: { type: 'slideRight', delay: 0.1, duration: 0.5 },
                cardB: { type: 'slideLeft', delay: 0.2, duration: 0.5 },
                vsBadge: { type: 'flip3d', delay: 0.25, duration: 0.5 },
                playerName: { type: 'popScale', delay: 0.25, duration: 0.5 },
                rank: { type: 'popScale', delay: 0.05, duration: 0.45 },
                scLogo: { type: 'glowPulse', delay: 0.3, duration: 0.6 },
                fcLogo: { type: 'fadeDown', delay: 0.05, duration: 0.5 },
                introTitle: { type: 'popScale', delay: 0.05, duration: 0.55 },
                introBadge: { type: 'popScale', delay: 0.0, duration: 0.45 },
                introSubtitle: { type: 'slideRight', delay: 0.2, duration: 0.5 },
                introCta: { type: 'heartbeat', delay: 0.35, duration: 0.6 },
                outroLogo: { type: 'glowPulse', delay: 0.1, duration: 0.6 },
                outroTitle: { type: 'popScale', delay: 0.15, duration: 0.5 },
                outroSubtitle: { type: 'slideRight', delay: 0.25, duration: 0.5 },
                outroFeatures: { type: 'popScale', delay: 0.3, duration: 0.5 },
                outroCta: { type: 'heartbeat', delay: 0.45, duration: 0.6 },
                question: { type: 'popScale', delay: 0.3, duration: 0.5 }
            };
        } else if (presetName === 'staggered') {
            state.elementAnimations = {
                title: { type: 'fadeDown', delay: 0.0, duration: 0.6 },
                rank: { type: 'fadeDown', delay: 0.1, duration: 0.5 },
                card: { type: 'fadeUp', delay: 0.2, duration: 0.6 },
                cardA: { type: 'slideRight', delay: 0.2, duration: 0.6 },
                cardB: { type: 'slideLeft', delay: 0.3, duration: 0.6 },
                vsBadge: { type: 'popScale', delay: 0.35, duration: 0.5 },
                playerName: { type: 'fadeUp', delay: 0.35, duration: 0.6 },
                fcLogo: { type: 'fadeDown', delay: 0.15, duration: 0.6 },
                scLogo: { type: 'glowPulse', delay: 0.5, duration: 0.7 },
                introBadge: { type: 'fadeDown', delay: 0.0, duration: 0.5 },
                introTitle: { type: 'fadeDown', delay: 0.1, duration: 0.6 },
                introSubtitle: { type: 'fadeUp', delay: 0.25, duration: 0.6 },
                introCta: { type: 'fadeUp', delay: 0.4, duration: 0.6 },
                outroTitle: { type: 'fadeDown', delay: 0.05, duration: 0.6 },
                outroLogo: { type: 'glowPulse', delay: 0.2, duration: 0.7 },
                outroSubtitle: { type: 'fadeUp', delay: 0.3, duration: 0.6 },
                outroFeatures: { type: 'fadeUp', delay: 0.4, duration: 0.6 },
                outroCta: { type: 'fadeUp', delay: 0.5, duration: 0.6 },
                question: { type: 'fadeUp', delay: 0.4, duration: 0.6 }
            };
        }

        saveAnimationsState();
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        replaySlideAnimations();
        if (window.showCopyToast) {
            window.showCopyToast('تم تطبيق حزمة الحركات بنجاح! 🎬✨');
        }
    }

    function resetSectionToDefault(showPrompt = true) {
        if (showPrompt && !confirm('هل أنت متأكد من استعادة القالب الافتراضي والبدء بريل جديد؟ سيتم مسح التعديلات الحالية لهذا النمط.')) {
            return;
        }
        initSection(state.activeSection);
        saveProjectState();
        renderCanvas();
        renderEditorControls();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        if (window.showCopyToast) {
            window.showCopyToast('تمت استعادة القالب الافتراضي بنجاح! 🔄');
        }
    }

    function setSlideDuration(sec) {
        state.slideDuration = parseFloat(sec) || 2.5;
        if (state.isPlaying) {
            pausePlayback();
            playPlayback();
        }
        renderEditorControls();
    }

    function toggleSafeZone() {
        state.showSafeZone = !state.showSafeZone;
        renderCanvas();
        const btn = document.getElementById('btnToggleSafeZone');
        if (btn) {
            btn.classList.toggle('active', state.showSafeZone);
            btn.textContent = state.showSafeZone ? '📐 خطوط الأمان مفعلة' : '📐 خطوط الأمان مخفية';
        }
    }

    function updatePlayerUi() {
        const playText = state.isPlaying ? '<span>⏸️ إيقاف</span>' : '<span>▶️ تشغيل</span>';

        const btnPlay = document.getElementById('reelBtnPlay');
        if (btnPlay) {
            btnPlay.innerHTML = playText;
            btnPlay.classList.toggle('bg-amber-500', state.isPlaying);
            btnPlay.classList.toggle('bg-emerald-600', !state.isPlaying);
        }

        const allPlayBtns = document.querySelectorAll('.reels-toolbar-btn-play, #toolbarBtnPlay');
        allPlayBtns.forEach(btn => {
            btn.innerHTML = playText;
            btn.classList.toggle('bg-amber-500', state.isPlaying);
            btn.classList.toggle('bg-emerald-600', !state.isPlaying);
        });

        const current = state.slides[state.currentSlideIndex];
        let name = 'خطاف البداية';
        if (current) {
            if (current.type === 'player_card') name = `#${current.rank} - ${current.playerArName || current.playerName}`;
            if (current.type === 'versus_card') name = 'مقارنة كرتين (VS)';
            if (current.type === 'outro') name = 'سلايد الختام';
        }
        const slideText = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length} (${name})`;
        const slideShortText = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length}`;

        const ind = document.getElementById('reelSlideIndicator');
        if (ind) ind.textContent = slideText;

        const allSlideInds = document.querySelectorAll('.reels-toolbar-slide-ind, #toolbarSlideIndicator');
        allSlideInds.forEach(el => {
            el.textContent = slideShortText;
        });

        const quickInds = document.querySelectorAll('.reels-quick-slide-counter');
        quickInds.forEach(el => {
            el.textContent = `${state.currentSlideIndex + 1}/${state.slides.length}`;
        });

        const dots = document.getElementById('reelDotsContainer');
        if (dots) {
            dots.querySelectorAll('.reel-dot').forEach((d, i) => {
                if (i === state.currentSlideIndex) {
                    d.className = 'reel-dot w-6 h-2 rounded-full bg-emerald-500 transition-all shadow-xs';
                } else {
                    d.className = 'reel-dot w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer';
                }
            });
        }
    }

    // ---- 7.8 INTRO SLIDE 3D VISUAL HOOK GENERATOR ----
    function getIntroHookCardUrls() {
        const urls = [];
        if (state.slides && state.slides.length > 0) {
            state.slides.forEach(s => {
                if (s.type === 'player_card' && s.cardUrl && !s.cardUrl.includes('placeholder')) {
                    const pUrl = toProxyUrl(s.cardUrl);
                    if (!urls.includes(pUrl)) urls.push(pUrl);
                } else if (s.type === 'versus_card') {
                    if (s.playerA?.cardUrl && !s.playerA.cardUrl.includes('placeholder')) {
                        const pUrlA = toProxyUrl(s.playerA.cardUrl);
                        if (!urls.includes(pUrlA)) urls.push(pUrlA);
                    }
                    if (s.playerB?.cardUrl && !s.playerB.cardUrl.includes('placeholder')) {
                        const pUrlB = toProxyUrl(s.playerB.cardUrl);
                        if (!urls.includes(pUrlB)) urls.push(pUrlB);
                    }
                }
            });
        }

        const fallbackStars = [
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp', // Mbappé 91
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp', // Bellingham 90
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp', // Haaland 91
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp', // Vinícius 90
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-271772.31fe0290520a1ebf2c253d8650e82ec4581177651a7e2898ad91316b25121b64.webp', // Yamal 81
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-209331.0504c35b430dfc7dd87cbb9ddc67b931e8a9390234a9ef1c9441113b28b49520.webp', // Salah 89
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp', // Valverde 88
            'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp'  // Musiala 87
        ];

        fallbackStars.forEach(c => {
            const pUrl = toProxyUrl(c);
            if (!urls.includes(pUrl)) urls.push(pUrl);
        });

        return urls;
    }

    function renderIntroVisualHookHtml(slide) {
        if (!slide || slide.type !== 'intro') return '';

        const style = slide.introHookStyle || 'cards_stream';
        if (style === 'none') return '';

        const blurVal = slide.introHookBlur || '3px';
        const opacityVal = (slide.introHookOpacity !== undefined) ? slide.introHookOpacity : 0.48;
        const hasGlow = slide.introHookGlow !== false;

        const cardUrls = getIntroHookCardUrls();
        const activeCards = cardUrls.slice(0, 6);

        // Center Spotlight Gradient
        const glowHtml = hasGlow ? `
            <div class="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none" 
                 style="background: radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.16) 45%, transparent 70%); filter: blur(35px); z-index: 5;">
            </div>
        ` : '';

        if (style === 'cards_stream') {
            // 3D Infinite Diagonal Cards Stream
            const cardItems = activeCards.map(url => `
                <div class="shrink-0 w-36 h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)] pointer-events-none transition-transform">
                    <img src="${toProxyUrl(url)}" alt="Card" class="w-full h-auto object-contain" crossorigin="anonymous">
                </div>
            `).join('');

            return `
                <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center" style="direction: ltr;">
                    ${glowHtml}
                    <div class="w-full overflow-hidden absolute top-[36%]" style="perspective: 1000px; transform: rotate(-5deg); z-index: 10;">
                        <div class="flex items-center gap-6 w-max" 
                             style="transform: rotateY(-14deg) rotateX(8deg); transform-style: preserve-3d; animation: reelHookCardsStream 22s linear infinite; filter: blur(${blurVal}) opacity(${opacityVal}); will-change: transform;">
                            ${cardItems}
                            ${cardItems}
                        </div>
                    </div>
                </div>
            `;
        }

        if (style === 'cards_fan') {
            // 3D 5-Card Arc Fan
            const fanConfigs = [
                { deg: -22, x: -130, y: 22, s: 0.80, z: 1, delay: 0 },
                { deg: -11, x: -65, y: 8, s: 0.92, z: 2, delay: 0.2 },
                { deg: 0, x: 0, y: -6, s: 1.06, z: 5, delay: 0.4 },
                { deg: 11, x: 65, y: 8, s: 0.92, z: 2, delay: 0.6 },
                { deg: 22, x: 130, y: 22, s: 0.80, z: 1, delay: 0.8 }
            ];

            const fanCardsHtml = fanConfigs.map((cfg, i) => {
                const cUrl = cardUrls[i % cardUrls.length];
                return `
                    <div class="absolute w-36 h-auto drop-shadow-2xl pointer-events-none" 
                         style="left: calc(50% + ${cfg.x}px - 72px); top: calc(50% + ${cfg.y}px - 100px); z-index: ${cfg.z}; transform: rotate(${cfg.deg}deg) scale(${cfg.s}); animation: reelHookFanFloat 3.8s ease-in-out infinite ${cfg.delay}s; will-change: transform;">
                        <img src="${toProxyUrl(cUrl)}" class="w-full h-auto object-contain" crossorigin="anonymous">
                    </div>
                `;
            }).join('');

            return `
                <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center" style="direction: ltr;">
                    ${glowHtml}
                    <div class="relative w-[380px] h-[300px] flex items-center justify-center" style="top: 4%; filter: blur(${blurVal}) opacity(${opacityVal}); z-index: 10;">
                        ${fanCardsHtml}
                    </div>
                </div>
            `;
        }

        if (style === 'mystery_card') {
            // Mystery Glowing Card with Question Mark
            const leadCard = cardUrls[0] || 'assets/placeholder_card.png';
            return `
                <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 flex flex-col items-center justify-center" style="direction: ltr;">
                    ${glowHtml}
                    <div class="relative flex flex-col items-center justify-center" style="top: 4%; animation: reelHookMysteryPulse 2.8s ease-in-out infinite; filter: blur(${blurVal}) opacity(${opacityVal}); z-index: 10;">
                        <div class="relative w-44 h-64 flex items-center justify-center">
                            <img src="${toProxyUrl(leadCard)}" alt="Mystery Card" class="max-h-full max-w-full object-contain filter contrast-125 brightness-95 drop-shadow-2xl" crossorigin="anonymous">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-amber-950/45 to-transparent rounded-2xl flex items-center justify-center">
                                <span class="text-6xl drop-shadow-[0_0_25px_rgba(251,191,36,0.95)]" style="animation: reelHookMysteryQuestion 2s ease-in-out infinite;">❓</span>
                            </div>
                        </div>
                        <div class="mt-2 px-3.5 py-1 rounded-full bg-black/75 border border-amber-400/60 text-amber-300 text-[11px] font-black tracking-wide shadow-xl">
                            🔒 كرت المركز الأول السري
                        </div>
                    </div>
                </div>
            `;
        }

        if (style === 'dual_stream') {
            // Dual Drifting Rows in Opposite Directions
            const cardItems = activeCards.map(url => `
                <div class="shrink-0 w-32 h-auto drop-shadow-lg pointer-events-none">
                    <img src="${toProxyUrl(url)}" alt="Card" class="w-full h-auto object-contain" crossorigin="anonymous">
                </div>
            `).join('');

            return `
                <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 flex flex-col justify-center gap-6" style="direction: ltr; transform: rotate(-5deg); filter: blur(${blurVal}) opacity(${opacityVal});">
                    ${glowHtml}
                    <div class="w-full overflow-hidden" style="top: 30%; z-index: 10;">
                        <div class="flex items-center gap-5 w-max" style="animation: reelHookCardsStreamReverse 26s linear infinite; will-change: transform;">
                            ${cardItems}
                            ${cardItems}
                        </div>
                    </div>
                    <div class="w-full overflow-hidden" style="top: 55%; z-index: 10;">
                        <div class="flex items-center gap-5 w-max" style="animation: reelHookCardsStream 22s linear infinite; will-change: transform;">
                            ${cardItems}
                            ${cardItems}
                        </div>
                    </div>
                </div>
            `;
        }

        return '';
    }

    // ---- 8. CANVAS RENDERING (PURE STABLE EUCLIDEAN LTR COORDINATES) ----
    function renderCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_reels') return;

        const activeFont = state.fontFamily || 'thmanyah';
        const fontCssFamily = (activeFont === 'thmanyah')
            ? "'Thmanyah Sans', 'Alexandria', sans-serif"
            : ((activeFont === 'zain') ? "'Zain', 'Cairo', sans-serif" : "'Alexandria', 'Cairo', sans-serif");

        canvas.className = `canvas-story relative overflow-hidden select-none font-family-${activeFont}`;
        canvas.setAttribute('data-canvas-ratio', 'story');
        canvas.style.direction = 'ltr'; // Forces LTR coordinates: moving right never shrinks elements!
        canvas.style.fontFamily = fontCssFamily;

        if (!state.slides || state.slides.length === 0) {
            initSection(state.activeSection);
            return;
        }

        const currentSlide = state.slides[state.currentSlideIndex] || state.slides[0];
        const layout = (state.layouts && state.layouts[state.activeSection]) || DEFAULT_LAYOUTS[state.activeSection] || DEFAULT_LAYOUTS.countdown || {};

        const bgUrl = getAsset('STORE_BG_PURE', 'assets/store-bg-pure.png');
        const fcLogoUrl = getAsset('FC27_OFFICIAL_LOGO', 'assets/fc27-official-logo.png');
        const scLogoUrl = getAsset('SC_LOGO', 'assets/sc-logo.png');

        // Dynamic Position Styles: width is ALWAYS max-content to guarantee ZERO shrinking when moved
        const posStyle = (cfg, transformExtra = '') => {
            if (!cfg) return '';
            const leftVal = (cfg.left !== undefined) ? cfg.left : 50;
            const topVal = (cfg.top !== undefined) ? cfg.top : 20;
            const scaleVal = (cfg.scale !== undefined) ? cfg.scale : 1.0;

            let s = `position: absolute; left: ${leftVal}%; top: ${topVal}%; width: max-content; max-width: none; flex-shrink: 0; box-sizing: border-box; touch-action: none; `;
            const fullTransform = ['translateX(-50%)', `scale(${scaleVal})`, transformExtra].filter(Boolean).join(' ');
            if (fullTransform) s += `transform: ${fullTransform}; `;
            return s;
        };

        const dragCursor = state.dragEnabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-default';

        // Helper to render resize handle on currently selected element
        const renderResizeHandle = (elemId) => {
            if (!state.dragEnabled || state.selectedDragElement !== elemId) return '';
            return `
                <div class="reel-resize-handle absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-md cursor-nwse-resize flex items-center justify-center text-[10px] text-slate-950 font-black select-none z-50 hover:scale-125 transition-transform pointer-events-auto" 
                     data-resize-id="${elemId}" title="اسحب لتكبير وتصغير الحجم">
                    ⤡
                </div>
            `;
        };

        // Selection ring helper
        const selectRing = (elemId) => {
            return (state.dragEnabled && state.selectedDragElement === elemId) ? 'ring-2 ring-emerald-400 ring-offset-2' : '';
        };

        // FC 27 Logo Block
        const fcLogoHtml = `
            <div data-drag-id="fcLogo" class="z-30 select-none relative ${dragCursor} ${selectRing('fcLogo')}" style="${posStyle(layout.fcLogo)}">
                <div class="reel-anim-layer" style="${getElemAnimStyle('fcLogo')}">
                    <img src="${fcLogoUrl}" alt="EA FC 27" class="w-12 h-auto object-contain drop-shadow-md pointer-events-none">
                </div>
                ${renderResizeHandle('fcLogo')}
            </div>
        `;

        // Shop Coin Logo Block
        const scLogoHtml = `
            <div data-drag-id="scLogo" class="z-30 select-none relative flex flex-col items-center justify-center ${dragCursor} ${selectRing('scLogo')}" style="${posStyle(layout.scLogo)}">
                <div class="reel-anim-layer" style="${getElemAnimStyle('scLogo')}">
                    <img src="${scLogoUrl}" alt="ShopCoin15" class="w-14 h-auto object-contain drop-shadow-md pointer-events-none">
                </div>
                ${renderResizeHandle('scLogo')}
            </div>
        `;

        let bodyHtml = '';

        if (currentSlide.type === 'intro') {
            bodyHtml = `
                <!-- 1. Intro Badge -->
                ${!currentSlide.hideBadge ? `
                    <div data-drag-id="introBadge" class="z-20 select-none relative ${dragCursor} ${selectRing('introBadge')}" style="${posStyle(layout.introBadge)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('introBadge')}">
                            <div class="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black shadow-sm tracking-wide pointer-events-none" dir="rtl">
                                ${currentSlide.badge || state.badge}
                            </div>
                        </div>
                        ${renderResizeHandle('introBadge')}
                    </div>
                ` : ''}

                <!-- 2. Intro Title -->
                ${!currentSlide.hideTitle ? `
                    <div data-drag-id="introTitle" class="z-20 select-none relative ${dragCursor} ${selectRing('introTitle')}" style="${posStyle(layout.introTitle)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('introTitle')}">
                            <div class="w-[325px] max-w-[325px] mx-auto text-center px-2" dir="rtl">
                                <h1 class="${getTitleFontClass(currentSlide.title || state.title)} font-black text-slate-950 leading-snug drop-shadow-sm pointer-events-none space-y-0.5">
                                    ${formatTitleLines(currentSlide.title || state.title, 'أفضل 5 مهاجمين للبدايات')}
                                </h1>
                            </div>
                        </div>
                        ${renderResizeHandle('introTitle')}
                    </div>
                ` : ''}

                <!-- 3. Intro Subtitle -->
                ${!currentSlide.hideSubtitle ? `
                    <div data-drag-id="introSubtitle" class="z-20 select-none relative ${dragCursor} ${selectRing('introSubtitle')}" style="${posStyle(layout.introSubtitle)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('introSubtitle')}">
                            <div class="w-[390px] max-w-[390px] text-center px-3" dir="rtl">
                                <p class="text-sm md:text-base font-bold text-slate-600 leading-relaxed pointer-events-none space-y-0.5">
                                    ${formatTitleLines(currentSlide.subtitle || state.subtitle, 'الوصف والتحفيز')}
                                </p>
                            </div>
                        </div>
                        ${renderResizeHandle('introSubtitle')}
                    </div>
                ` : ''}

                <!-- 4. Intro CTA Button -->
                ${!currentSlide.hideCta ? `
                    <div data-drag-id="introCta" class="z-20 select-none relative ${dragCursor} ${selectRing('introCta')}" style="${posStyle(layout.introCta)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('introCta')}">
                            <div class="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-xs animate-bounce pointer-events-none" dir="rtl">
                                <span class="text-base">👇</span>
                                <span class="text-xs font-black text-slate-800">
                                    ${currentSlide.ctaText || (state.activeSection === 'versus' ? 'شاهد المقارنة المباشرة' : 'شاهد الترتيب بالكامل')}
                                </span>
                            </div>
                        </div>
                        ${renderResizeHandle('introCta')}
                    </div>
                ` : ''}
            `;
        } else if (currentSlide.type === 'player_card') {
            bodyHtml = `
                <!-- 1. Rank Block -->
                ${!currentSlide.hideRank ? `
                    <div data-drag-id="rank" class="z-20 flex flex-col items-center text-center select-none relative ${dragCursor} ${selectRing('rank')}" style="${posStyle(layout.rank)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('rank')}">
                            <div class="text-6xl md:text-7xl font-black text-[#0E382B] drop-shadow-md leading-none pointer-events-none">
                                ${currentSlide.rank || '1'}
                            </div>
                        </div>
                        ${renderResizeHandle('rank')}
                    </div>
                ` : ''}

                <!-- 2. Title Block (Flexible width container with exact line breaks) -->
                ${!currentSlide.hideTitle ? `
                    <div data-drag-id="title" class="z-20 select-none relative ${dragCursor} ${selectRing('title')}" style="${posStyle(layout.title)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('title')}">
                            <div class="w-[325px] max-w-[325px] mx-auto text-center px-2" dir="rtl">
                                <div class="text-base md:text-lg font-black text-slate-950 leading-tight drop-shadow-xs pointer-events-none space-y-0.5">
                                    ${formatTitleLines(state.title, 'عنوان الريل')}
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('title')}
                    </div>
                ` : ''}

                <!-- 3. Card & Badges Block -->
                ${!currentSlide.hideCard ? `
                    <div data-drag-id="card" class="z-20 flex flex-col items-center justify-center select-none relative ${dragCursor} ${selectRing('card')}" style="${posStyle(layout.card)}">
                        <div class="reel-anim-layer flex flex-col items-center" style="${getElemAnimStyle('card')}">
                            <div class="relative flex flex-col items-center justify-center">
                                <div class="absolute -inset-6 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>
                                <img src="${toProxyUrl(currentSlide.cardUrl)}" alt="${currentSlide.playerName}" crossorigin="anonymous" onerror="this.onerror=null; this.src='assets/placeholder_card.png';" 
                                     class="w-64 md:w-72 h-auto max-h-[400px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] pointer-events-none">
                            </div>

                            <!-- 3.1 Player Coin Price Pill (Optional - Official FC Coin) -->
                            ${currentSlide.playerPrice && currentSlide.playerPrice.trim() ? `
                                <div class="mt-2.5 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-400/80 shadow-[0_8px_25px_rgba(245,158,11,0.45)] backdrop-blur-md flex items-center gap-2 pointer-events-none" dir="ltr">
                                    <img src="assets/fc-coin.webp" alt="FC Coins" class="w-5 h-5 object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]">
                                    <span class="font-black text-sm tracking-wider text-amber-300 drop-shadow-xs font-mono">
                                        ${currentSlide.playerPrice.trim()}
                                    </span>
                                </div>
                            ` : ''}

                            <!-- Badges -->
                            ${renderSlideBadgesHtml(currentSlide)}
                        </div>
                        ${renderResizeHandle('card')}
                    </div>
                ` : ''}

                <!-- 4. Player Name Block (Fixed 340px width container) -->
                ${!currentSlide.hidePlayerName ? `
                    <div data-drag-id="playerName" class="z-20 select-none relative ${dragCursor} ${selectRing('playerName')}" style="${posStyle(layout.playerName)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('playerName')}">
                            <div class="w-[330px] max-w-[330px] mx-auto text-center px-2 break-words" dir="rtl">
                                <div class="text-xl md:text-2xl font-black text-slate-950 drop-shadow-sm pointer-events-none leading-tight">
                                    ${currentSlide.playerArName || currentSlide.playerName}
                                </div>
                                <div class="text-xs font-black text-[#00A84D] mt-0.5 pointer-events-none">
                                    في FC 27
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('playerName')}
                    </div>
                ` : ''}
            `;
        } else if (currentSlide.type === 'versus_card') {
            const pA = currentSlide.playerA || {};
            const pB = currentSlide.playerB || {};

            bodyHtml = `
                <!-- 1. Title Header -->
                ${!currentSlide.hideTitle ? `
                    <div data-drag-id="title" class="z-20 select-none relative ${dragCursor} ${selectRing('title')}" style="${posStyle(layout.title)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('title')}">
                            <div class="w-max max-w-none text-center px-2" dir="rtl">
                                <span class="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black mb-1 shadow-xs pointer-events-none">
                                    ${state.badge || '⚔️ صراع العمالقة'}
                                </span>
                                <h2 class="${getTitleFontClass(currentSlide.title || state.title)} font-black text-slate-950 leading-snug drop-shadow-xs pointer-events-none space-y-0.5">
                                    ${formatTitleLines(currentSlide.title || state.title, 'عنوان المقارنة')}
                                </h2>
                            </div>
                        </div>
                        ${renderResizeHandle('title')}
                    </div>
                ` : ''}

                <!-- 2. Player Card A (Right side in RTL) -->
                ${!currentSlide.hideCardA ? `
                    <div data-drag-id="cardA" class="z-20 select-none relative ${dragCursor} ${selectRing('cardA')}" style="${posStyle(layout.cardA)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('cardA')}">
                            <div class="w-[190px] flex flex-col items-center" dir="rtl">
                                <div class="relative h-[230px] flex items-center justify-center">
                                    <img src="${toProxyUrl(pA.cardUrl)}" alt="${pA.name}" crossorigin="anonymous" onerror="this.onerror=null; this.src='assets/placeholder_card.png';" class="max-h-[230px] w-auto object-contain drop-shadow-2xl pointer-events-none">
                                </div>
                                <div class="mt-2 text-center pointer-events-none">
                                    <div class="text-sm font-black text-slate-950">${pA.arName || pA.name}</div>
                                    <div class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 mt-1">${pA.statHighlight || ''}</div>
                                    ${pA.price && pA.price.trim() ? `
                                        <div class="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-400/80 shadow-md backdrop-blur-xs pointer-events-none" dir="ltr">
                                            <img src="assets/fc-coin.webp" alt="Coin" class="w-3.5 h-3.5 object-contain drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]">
                                            <span class="font-black text-[11px] text-amber-300 font-mono">${pA.price.trim()}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('cardA')}
                    </div>
                ` : ''}

                <!-- 3. VS Badge Center (Centered X & Y) -->
                ${!currentSlide.hideVsBadge ? `
                    <div data-drag-id="vsBadge" class="z-25 flex items-center justify-center select-none relative ${dragCursor} ${selectRing('vsBadge')}" style="${posStyle(layout.vsBadge, 'translateY(-50%)')}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('vsBadge')}">
                            <div class="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 text-white font-black text-base flex items-center justify-center shadow-xl border-2 border-white animate-pulse pointer-events-none">
                                VS
                            </div>
                        </div>
                        ${renderResizeHandle('vsBadge')}
                    </div>
                ` : ''}

                <!-- 4. Player Card B (Left side in RTL) -->
                ${!currentSlide.hideCardB ? `
                    <div data-drag-id="cardB" class="z-20 select-none relative ${dragCursor} ${selectRing('cardB')}" style="${posStyle(layout.cardB)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('cardB')}">
                            <div class="w-[190px] flex flex-col items-center" dir="rtl">
                                <div class="relative h-[230px] flex items-center justify-center">
                                    <img src="${toProxyUrl(pB.cardUrl)}" alt="${pB.name}" crossorigin="anonymous" onerror="this.onerror=null; this.src='assets/placeholder_card.png';" class="max-h-[230px] w-auto object-contain drop-shadow-2xl pointer-events-none">
                                </div>
                                <div class="mt-2 text-center pointer-events-none">
                                    <div class="text-sm font-black text-slate-950">${pB.arName || pB.name}</div>
                                    <div class="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 mt-1">${pB.statHighlight || ''}</div>
                                    ${pB.price && pB.price.trim() ? `
                                        <div class="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-400/80 shadow-md backdrop-blur-xs pointer-events-none" dir="ltr">
                                            <img src="assets/fc-coin.webp" alt="Coin" class="w-3.5 h-3.5 object-contain drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]">
                                            <span class="font-black text-[11px] text-amber-300 font-mono">${pB.price.trim()}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('cardB')}
                    </div>
                ` : ''}

                <!-- 5. Bottom Interactive Question Hook -->
                ${!currentSlide.hideQuestion ? `
                    <div data-drag-id="question" class="z-20 select-none relative ${dragCursor} ${selectRing('question')}" style="${posStyle(layout.question)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('question')}">
                            <div class="w-[340px] text-center px-4" dir="rtl">
                                <div class="inline-block px-5 py-2.5 rounded-2xl bg-white/95 border border-slate-200 text-slate-950 font-black text-xs md:text-sm shadow-md pointer-events-none">
                                    ${currentSlide.question || 'صوت بالتعليقات: من تختار لفريقك؟ 👇'}
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('question')}
                    </div>
                ` : ''}
            `;
        } else if (currentSlide.type === 'outro') {
            bodyHtml = `
                <!-- 1. Outro Logo -->
                ${!currentSlide.hideLogo ? `
                    <div data-drag-id="outroLogo" class="z-20 select-none relative ${dragCursor} ${selectRing('outroLogo')}" style="${posStyle(layout.outroLogo)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('outroLogo')}">
                            <img src="${scLogoUrl}" alt="ShopCoin15" class="w-20 h-auto object-contain drop-shadow-lg animate-pulse pointer-events-none">
                        </div>
                        ${renderResizeHandle('outroLogo')}
                    </div>
                ` : ''}

                <!-- 2. Outro Title -->
                ${!currentSlide.hideTitle ? `
                    <div data-drag-id="outroTitle" class="z-20 select-none relative ${dragCursor} ${selectRing('outroTitle')}" style="${posStyle(layout.outroTitle)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('outroTitle')}">
                            <div class="w-max max-w-none text-center px-2" dir="rtl">
                                <h2 class="${getTitleFontClass(currentSlide.title || 'متجر ShopCoin15')} font-black text-slate-950 leading-snug pointer-events-none space-y-0.5">
                                    ${formatTitleLines(currentSlide.title || 'متجر ShopCoin15', 'متجر ShopCoin15')}
                                </h2>
                            </div>
                        </div>
                        ${renderResizeHandle('outroTitle')}
                    </div>
                ` : ''}

                <!-- 3. Outro Subtitle -->
                ${!currentSlide.hideSubtitle ? `
                    <div data-drag-id="outroSubtitle" class="z-20 select-none relative ${dragCursor} ${selectRing('outroSubtitle')}" style="${posStyle(layout.outroSubtitle)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('outroSubtitle')}">
                            <div class="text-sm font-bold text-emerald-700 pointer-events-none" dir="rtl">
                                ${currentSlide.subtitle || 'شحن كوينز فوري وآمن 100% ⚡'}
                            </div>
                        </div>
                        ${renderResizeHandle('outroSubtitle')}
                    </div>
                ` : ''}

                <!-- 4. Outro Features Box -->
                ${!currentSlide.hideFeatures ? `
                    <div data-drag-id="outroFeatures" class="z-20 select-none relative ${dragCursor} ${selectRing('outroFeatures')}" style="${posStyle(layout.outroFeatures)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('outroFeatures')}">
                            <div class="space-y-2.5 w-[330px] text-right pointer-events-none" dir="rtl">
                                <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                    <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm shrink-0">🔒</span>
                                    <div>
                                        <div class="text-xs font-black text-slate-900">ضمان نادي كامل</div>
                                        <div class="text-[10.5px] text-slate-500">حماية تامة من التصفير ببروتوكول تحويل آمن</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                    <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm shrink-0">⚡</span>
                                    <div>
                                        <div class="text-xs font-black text-slate-900">سرعة تنفيذ قياسية</div>
                                        <div class="text-[10.5px] text-slate-500">المليون ينشحن خلال دقيقة واحدة بس</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${renderResizeHandle('outroFeatures')}
                    </div>
                ` : ''}

                <!-- 5. Outro CTA -->
                ${!currentSlide.hideCta ? `
                    <div data-drag-id="outroCta" class="z-20 select-none relative ${dragCursor} ${selectRing('outroCta')}" style="${posStyle(layout.outroCta)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('outroCta')}">
                            <div class="px-6 py-3 rounded-2xl bg-slate-900 text-white font-black text-xs shadow-lg pointer-events-none" dir="rtl">
                                ${currentSlide.ctaText || 'للطلب حياك على الخاص: @shop_coin15 📩'}
                            </div>
                        </div>
                        ${renderResizeHandle('outroCta')}
                    </div>
                ` : ''}
            `;
        }

        const safeZoneHtml = state.showSafeZone ? `
            <div class="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between border-2 border-dashed border-rose-500/50">
                <div class="h-24 bg-rose-500/10 border-b border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">⚠️ شريط العنوان</span>
                </div>
                <div class="my-auto h-[450px] border-y-2 border-emerald-400/60 flex items-center justify-between px-3">
                    <span class="text-[10px] font-black text-emerald-400 bg-black/80 px-2 py-0.5 rounded">🟩 مربع الفيد (1:1 Feed)</span>
                    <div class="w-16 h-full bg-rose-500/10 border-r border-rose-400/30 flex items-center justify-center">
                        <span class="text-[9px] font-bold text-rose-300 -rotate-90 bg-black/70 px-1.5 py-0.5 rounded">❤️ التفاعل</span>
                    </div>
                </div>
                <div class="h-32 bg-rose-500/10 border-t border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">⚠️ الكابشن والصوت</span>
                </div>
            </div>
        ` : '';

        const introHookHtml = (currentSlide.type === 'intro') ? renderIntroVisualHookHtml(currentSlide) : '';
        const storyProgressBarHtml = renderStoryProgressBarHtml();

        canvas.innerHTML = `
            <div class="absolute inset-0 overflow-hidden bg-cover bg-center" style="background-image: url('${bgUrl}'); direction: ltr;">
                ${storyProgressBarHtml}
                <div id="reelSlideTransitionWrapper" class="absolute inset-0 pointer-events-none" style="${getSlideTransitionStyle()}">
                    <div class="absolute inset-0 pointer-events-auto">
                        ${fcLogoHtml}
                        ${scLogoHtml}
                        ${introHookHtml}
                        ${bodyHtml}
                        ${safeZoneHtml}
                    </div>
                </div>
            </div>
        `;

        // Reset slide entrance flag so subsequent clicks/drags/edits NEVER replay animations
        state.slideEntrancePending = false;

        initCanvasDragHandlers();

        // Native system emojis render with 100% crispness and require zero remote network requests
    }

    // ---- 8.5 REELS ENTRANCE ANIMATION TABLE CONTROLS ----
    function renderAnimationTableHtml() {
        const elementsList = getCurrentSlideElements();
        if (!elementsList || elementsList.length === 0) return '';

        const rowsHtml = elementsList.map(item => {
            const animCfg = (state.elementAnimations && state.elementAnimations[item.id]) || DEFAULT_ELEMENT_ANIMATIONS[item.id] || { type: 'fadeUp', delay: 0.1 };
            const curType = animCfg.type || 'fadeUp';
            const curDelay = (animCfg.delay !== undefined) ? animCfg.delay : 0.1;

            const typeOptions = ANIMATION_TYPES.map(t => 
                `<option value="${t.id}" ${t.id === curType ? 'selected' : ''}>${t.label}</option>`
            ).join('');

            return `
                <tr class="hover:bg-purple-50/40 transition">
                    <td class="p-2.5 pr-3 font-black text-slate-800 text-[11px] whitespace-nowrap">
                        ${item.name}
                    </td>
                    <td class="p-2">
                        <select onchange="ReelsEngine.setElementAnimation('${item.id}', 'type', this.value)" 
                                class="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[10.5px] font-bold outline-none focus:border-purple-500 focus:bg-white shadow-2xs cursor-pointer">
                            ${typeOptions}
                        </select>
                    </td>
                    <td class="p-2">
                        <select onchange="ReelsEngine.setElementAnimation('${item.id}', 'delay', parseFloat(this.value))" 
                                class="w-24 px-1.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[10.5px] font-mono font-bold outline-none focus:border-purple-500 focus:bg-white shadow-2xs cursor-pointer">
                            <option value="0.0" ${curDelay === 0.0 ? 'selected' : ''}>0.0s (مباشر)</option>
                            <option value="0.05" ${curDelay === 0.05 ? 'selected' : ''}>0.05s</option>
                            <option value="0.1" ${curDelay === 0.1 ? 'selected' : ''}>0.10s</option>
                            <option value="0.15" ${curDelay === 0.15 ? 'selected' : ''}>0.15s</option>
                            <option value="0.2" ${curDelay === 0.2 ? 'selected' : ''}>0.20s</option>
                            <option value="0.25" ${curDelay === 0.25 ? 'selected' : ''}>0.25s</option>
                            <option value="0.3" ${curDelay === 0.3 ? 'selected' : ''}>0.30s</option>
                            <option value="0.35" ${curDelay === 0.35 ? 'selected' : ''}>0.35s</option>
                            <option value="0.4" ${curDelay === 0.4 ? 'selected' : ''}>0.40s</option>
                            <option value="0.5" ${curDelay === 0.5 ? 'selected' : ''}>0.50s</option>
                            <option value="0.6" ${curDelay === 0.6 ? 'selected' : ''}>0.60s</option>
                        </select>
                    </td>
                    <td class="p-2 text-center">
                        <button type="button" onclick="ReelsEngine.testElementAnimation('${item.id}')" 
                                class="w-8 h-8 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-black text-xs inline-flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer" 
                                title="تجربة حركة هذا العنصر الآن">
                            ▶️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-purple-50/80 border border-purple-200 shadow-xs space-y-3">
                
                <!-- Header with Master Toggle and Replay -->
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-black shadow-xs">🎬</span>
                        <div>
                            <h4 class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                <span>جدول حركات عناصر السلايد (Animations):</span>
                                <span class="text-[9.5px] px-2 py-0.5 rounded-full ${state.animationsEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'} font-black">
                                    ${state.animationsEnabled ? 'شغّالة ✓' : 'موقوفة ⏹️'}
                                </span>
                            </h4>
                            <p class="text-[10px] text-purple-900/80 font-bold">حركات دخول سينمائية لعناصر السلايد - اختيارية بالكامل</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="ReelsEngine.toggleAnimationsMaster()" 
                                class="px-2.5 py-1.5 rounded-xl text-[11px] font-black transition flex items-center gap-1 shadow-2xs cursor-pointer ${state.animationsEnabled ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-300 hover:bg-slate-400 text-slate-800'}">
                            <span>${state.animationsEnabled ? '🟢 الحركات مفعلة' : '⚪ معطلة (ثابت)'}</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.replaySlideAnimations()" 
                                class="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black transition flex items-center gap-1 shadow-2xs cursor-pointer">
                            <span>▶️ معاينة الحركة</span>
                        </button>
                    </div>
                </div>

                <!-- Fast Preset Buttons -->
                <div class="p-2.5 rounded-xl bg-white border border-purple-100 space-y-1.5">
                    <div class="flex items-center justify-between">
                        <span class="text-[10.5px] font-black text-slate-700">أنماط حركات جاهزة سريعة:</span>
                        <span class="text-[9.5px] text-purple-700 font-bold">تطبيق بنقرة واحدة ✨</span>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        <button type="button" onclick="ReelsEngine.applyAnimationPreset('cinematic')" 
                                class="py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10.5px] font-black border border-purple-200 transition text-center shadow-2xs active:scale-95 cursor-pointer">
                            💎 سينمائي هادئ
                        </button>
                        <button type="button" onclick="ReelsEngine.applyAnimationPreset('dynamic')" 
                                class="py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10.5px] font-black border border-purple-200 transition text-center shadow-2xs active:scale-95 cursor-pointer">
                            ⚡ تيك توك حماسي
                        </button>
                        <button type="button" onclick="ReelsEngine.applyAnimationPreset('staggered')" 
                                class="py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10.5px] font-black border border-purple-200 transition text-center shadow-2xs active:scale-95 cursor-pointer">
                            🌊 تتالي احترافي
                        </button>
                        <button type="button" onclick="ReelsEngine.applyAnimationPreset('none')" 
                                class="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-black border border-slate-300 transition text-center shadow-2xs active:scale-95 cursor-pointer">
                            ⏹️ إيقاف الكل (ثابت)
                        </button>
                    </div>
                </div>

                <!-- Elements Table for Current Slide -->
                <div class="overflow-x-auto rounded-xl border border-purple-200 bg-white shadow-2xs">
                    <table class="w-full text-right text-xs">
                        <thead class="bg-purple-50/90 text-purple-950 font-black border-b border-purple-100 text-[11px]">
                            <tr>
                                <th class="p-2.5 pr-3">العنصر</th>
                                <th class="p-2.5">نوع الحركة الدخول</th>
                                <th class="p-2.5">توقيت الدخول</th>
                                <th class="p-2.5 text-center">تجربة</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>

                ${!state.animationsEnabled ? `
                    <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[10.5px] text-amber-900 font-bold text-center">
                        ⚠️ الحركات معطلة حالياً — تظهر كافة العناصر بشكل ثابت 100%. اضغط "🟢 الحركات مفعلة" بالأعلى لإعادة تشغيل الحركات.
                    </div>
                ` : ''}

            </div>
        `;
    }

    // ---- 8.5 AUDIO & SFX STUDIO CONTROL PANEL ----
    function renderAudioStudioHtml() {
        const isMasterOn = audioState.masterEnabled;
        const isSfxOn = audioState.sfxEnabled;
        const isBgmOn = audioState.bgmEnabled;

        const activeTrack = REELS_MUSIC_LIBRARY.find(t => t.id === audioState.selectedTrackId) || REELS_MUSIC_LIBRARY[0];
        const isAuditioningActive = isBgmPlaying && (auditionTrackId === activeTrack.id || !auditionTrackId);

        return `
            <div class="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 border border-amber-500/30 text-white shadow-xl space-y-3">
                <!-- Header & Master Toggle -->
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div class="flex items-center gap-2">
                        <span class="text-xl">🎵</span>
                        <div>
                            <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                                <span>استوديو الصوت والموسيقى (Audio & SFX)</span>
                                <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">33 تراك ✨</span>
                            </h4>
                            <p class="text-[10px] text-zinc-400">صدمة الكرت، رنين الكوينز، وموسيقى تريند حماسية</p>
                        </div>
                    </div>
                    <button type="button" onclick="ReelsEngine.toggleAudioMaster()" 
                            class="px-2.5 py-1 rounded-xl text-[10.5px] font-black transition flex items-center gap-1 shadow-sm ${isMasterOn ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700'}">
                        <span>${isMasterOn ? '🔊 مفعل' : '🔇 مكتوم'}</span>
                    </button>
                </div>

                ${isMasterOn ? `
                    <!-- Sub Toggles (SFX & BGM) -->
                    <div class="grid grid-cols-2 gap-2">
                        <!-- SFX Toggle -->
                        <div class="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span class="text-[10.5px] font-black text-zinc-200 flex items-center gap-1">
                                    <span>🔔</span>
                                    <span>المؤثرات (SFX)</span>
                                </span>
                                <button type="button" onclick="ReelsEngine.toggleSfxMaster()" 
                                        class="text-[9.5px] font-bold px-2 py-0.5 rounded transition ${isSfxOn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-700 text-zinc-400'}">
                                    ${isSfxOn ? 'مفعلة ✓' : 'معطلة ✕'}
                                </button>
                            </div>
                            <!-- SFX Volume -->
                            <div class="flex items-center gap-1.5 pt-1">
                                <span class="text-[9px] text-zinc-400 shrink-0">شدة:</span>
                                <input type="range" min="0.1" max="1.0" step="0.05" value="${audioState.sfxVolume}" 
                                       oninput="ReelsEngine.setSfxVolume(this.value)" 
                                       class="w-full accent-amber-500 h-1 rounded bg-zinc-700 cursor-pointer">
                                <span class="text-[9px] font-mono text-amber-300 shrink-0">${Math.round(audioState.sfxVolume * 100)}%</span>
                            </div>
                        </div>

                        <!-- BGM Toggle -->
                        <div class="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span class="text-[10.5px] font-black text-zinc-200 flex items-center gap-1">
                                    <span>🎶</span>
                                    <span>الموسيقى (BGM)</span>
                                </span>
                                <button type="button" onclick="ReelsEngine.toggleBgmMaster()" 
                                        class="text-[9.5px] font-bold px-2 py-0.5 rounded transition ${isBgmOn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-700 text-zinc-400'}">
                                    ${isBgmOn ? 'مفعلة ✓' : 'معطلة ✕'}
                                </button>
                            </div>
                            <!-- BGM Volume -->
                            <div class="flex items-center gap-1.5 pt-1">
                                <span class="text-[9px] text-zinc-400 shrink-0">شدة:</span>
                                <input type="range" min="0.1" max="1.0" step="0.05" value="${audioState.bgmVolume}" 
                                       oninput="ReelsEngine.setBgmVolume(this.value)" 
                                       class="w-full accent-amber-500 h-1 rounded bg-zinc-700 cursor-pointer">
                                <span class="text-[9px] font-mono text-amber-300 shrink-0">${Math.round(audioState.bgmVolume * 100)}%</span>
                            </div>
                        </div>
                    </div>

                    <!-- SFX Distinction Preview Test Buttons (8 distinct sounds) -->
                    <div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800/80 space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-[10.5px] font-black text-amber-300 flex items-center gap-1">
                                <span>⚡</span>
                                <span>تجربة المؤثرات الصوتية (SFX Preview):</span>
                            </span>
                            <span class="text-[9px] text-zinc-400 font-bold">صوت اللاعب مفصول تماماً عن الكوينز</span>
                        </div>
                        <div class="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                            <!-- Distinct Player Card Slam -->
                            <button type="button" onclick="ReelsEngine.testSfx('card_slam')" 
                                    class="px-2 py-2 rounded-xl bg-gradient-to-r from-purple-950/80 to-zinc-900 hover:from-purple-900 border border-purple-500/50 text-[10px] font-black text-purple-200 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>🃏 صدمة الكرت</span>
                                <span class="text-[8px] text-purple-300 font-mono font-normal">Card Slam</span>
                            </button>

                            <!-- Distinct Coin Cash Register Cha-Ching -->
                            <button type="button" onclick="ReelsEngine.testSfx('coin')" 
                                    class="px-2 py-2 rounded-xl bg-gradient-to-r from-amber-950/80 to-zinc-900 hover:from-amber-900 border border-amber-500/60 text-[10px] font-black text-amber-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>🪙 كاش ورنين كوينز</span>
                                <span class="text-[8px] text-amber-200 font-mono font-normal">Cha-Ching!</span>
                            </button>

                            <!-- Whoosh -->
                            <button type="button" onclick="ReelsEngine.testSfx('whoosh')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-sky-500/20 border border-zinc-700 hover:border-sky-500/50 text-[10px] font-bold text-sky-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>💨 سحب هوائي</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Whoosh</span>
                            </button>

                            <!-- Bass Boom -->
                            <button type="button" onclick="ReelsEngine.testSfx('boom')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-rose-500/20 border border-zinc-700 hover:border-rose-500/50 text-[10px] font-bold text-rose-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>💥 ضربة درامية</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Bass Boom</span>
                            </button>

                            <!-- Referee Whistle -->
                            <button type="button" onclick="ReelsEngine.testSfx('whistle')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-emerald-500/20 border border-zinc-700 hover:border-emerald-500/50 text-[10px] font-bold text-emerald-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>📢 صفارة حكم</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Whistle</span>
                            </button>

                            <!-- Stadium Crowd Roar -->
                            <button type="button" onclick="ReelsEngine.testSfx('crowd')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-yellow-500/20 border border-zinc-700 hover:border-yellow-500/50 text-[10px] font-bold text-yellow-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>🏟️ هتاف الجماهير</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Crowd Cheer</span>
                            </button>

                            <!-- Electric Zap -->
                            <button type="button" onclick="ReelsEngine.testSfx('electric')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-cyan-500/20 border border-zinc-700 hover:border-cyan-500/50 text-[10px] font-bold text-cyan-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>⚡ شرارة طاقة</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Energy Zap</span>
                            </button>

                            <!-- Rank Bell -->
                            <button type="button" onclick="ReelsEngine.testSfx('rank_bell')" 
                                    class="px-2 py-2 rounded-xl bg-zinc-800 hover:bg-pink-500/20 border border-zinc-700 hover:border-pink-500/50 text-[10px] font-bold text-pink-300 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xs cursor-pointer text-center">
                                <span>🔔 جرس الرانك</span>
                                <span class="text-[8px] text-zinc-400 font-mono font-normal">Rank Bell</span>
                            </button>
                        </div>
                    </div>

                    <!-- 33 Tracks Music Library Selector -->
                    <div class="p-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 space-y-2">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="text-xs">📻</span>
                                <span class="text-[10.5px] font-black text-zinc-200">موسيقى الخلفية المختارة:</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <button type="button" id="btnBgmAudition" onclick="ReelsEngine.toggleBgmAudition()" 
                                        class="px-2.5 py-1 rounded-lg text-[10px] font-black transition cursor-pointer ${isAuditioningActive ? 'bg-amber-500 text-slate-950 animate-pulse font-black' : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'}">
                                    ${isAuditioningActive ? '⏸️ إيقاف' : '▶️ استماع'}
                                </button>
                            </div>
                        </div>

                        <!-- Active Track Info Card -->
                        <div class="p-2 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between gap-2">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-1.5">
                                    <span class="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-black font-mono">
                                        ${audioState.bgmType === 'custom' ? 'ملف خاص' : `${activeTrack.bpm} BPM`}
                                    </span>
                                    <span class="text-[10.5px] font-black text-white truncate">
                                        ${audioState.bgmType === 'custom' ? `🎵 ${audioState.customBgmName || 'ملف صوتي مخصص'}` : activeTrack.titleAr}
                                    </span>
                                </div>
                                <p class="text-[9.5px] text-zinc-400 truncate mt-0.5">
                                    ${audioState.bgmType === 'custom' ? 'ملف صوتي مرفوع من جهازك' : `${activeTrack.mood} — ${activeTrack.titleEn}`}
                                </p>
                            </div>

                            ${audioState.bgmType === 'custom' ? `
                                <button type="button" onclick="ReelsEngine.removeCustomBgm()" class="text-[9.5px] font-bold text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg bg-rose-950/40 border border-rose-900 hover:bg-rose-950 transition cursor-pointer shrink-0">
                                    مسح ✕
                                </button>
                            ` : `
                                <button type="button" onclick="ReelsEngine.openMusicModal()" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-black transition cursor-pointer shrink-0">
                                    تغيير التراك ▾
                                </button>
                            `}
                        </div>

                        <!-- Browse 33 Tracks Button & Upload Button -->
                        <div class="grid grid-cols-2 gap-1.5">
                            <button type="button" onclick="ReelsEngine.openMusicModal()" 
                                    class="py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 text-[10.5px] font-black transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer">
                                <span>🎵 تصفح مكتبة التراكات (33)</span>
                            </button>

                            <label class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-[10.5px] font-bold text-zinc-300 cursor-pointer transition flex items-center justify-center gap-1 text-center">
                                <span>📁 رفع MP3 / WAV</span>
                                <input type="file" accept="audio/*" class="hidden" onchange="ReelsEngine.handleBgmUpload(this)">
                            </label>
                        </div>
                    </div>
                ` : `
                    <div class="p-2 rounded-xl bg-zinc-800/40 border border-zinc-800 text-center">
                        <span class="text-[10.5px] text-zinc-500 font-bold">تم كتم كافة الأصوات والموسيقى في المعاينة والفيديو</span>
                    </div>
                `}
            </div>
        `;
    }

    // ---- 9. EDITOR CONTROLS PANEL (NATURAL POSITION & SCALE CONTROLS) ----
    function renderEditorControls() {
        const container = document.getElementById('suite_reels_panel');
        if (!container) return;

        const isCountdown = state.activeSection === 'countdown';
        const currentSlide = state.slides[state.currentSlideIndex];

        const secLayout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];
        const elementsList = getCurrentSlideElements();
        ensureSelectedDragElement(false);
        const selectedId = state.selectedDragElement;
        const curCfg = selectedId ? (secLayout[selectedId] || {}) : {};
        const curLeft = (curCfg.left !== undefined) ? curCfg.left : 50;
        const curTop = (curCfg.top !== undefined) ? curCfg.top : 30;
        const curScale = (curCfg.scale !== undefined) ? curCfg.scale : 1.0;

        const elementSelectOptions = `
            <option value="" ${!selectedId ? 'selected' : ''}>⚪ لا يوجد عنصر محدد (اضغط لتحديد عنصر)</option>
            ${elementsList.map(item => `
                <option value="${item.id}" ${item.id === selectedId ? 'selected' : ''}>
                    ${item.name}
                </option>
            `).join('')}
        `;

        const hasIntro = state.slides.some(s => s.type === 'intro');
        const hasOutro = state.slides.some(s => s.type === 'outro');

        let html = `
            <div class="space-y-4">

                <!-- 1. SECTION TABS (Countdown vs Versus) -->
                <div class="p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-1.5">
                    <button type="button" onclick="ReelsEngine.switchSection('countdown')" id="subtab_countdown" 
                            class="flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${isCountdown ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}">
                        <span>🏆 الترتيب التنازلي (5 -> 1)</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.switchSection('versus')" id="subtab_versus" 
                            class="flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${!isCountdown ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}">
                        <span>⚔️ مقارنة العمالقة (كرتين)</span>
                    </button>
                </div>

                <!-- 2. ARABIC TYPOGRAPHY / FONT SELECTOR -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">🔤</span>
                            <span class="text-xs font-black text-slate-900">نوع الخط العربي في الريلز:</span>
                        </div>
                        <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black border border-emerald-200">
                            ${state.fontFamily === 'thmanyah' ? 'خط ثمانية مفعّل ✓' : (state.fontFamily === 'zain' ? 'خط زين مفعّل ✓' : 'الإسكندرية مفعّل ✓')}
                        </span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <!-- 1. Thmanyah Font -->
                        <button type="button" onclick="ReelsEngine.setFontFamily('thmanyah')" 
                                class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${state.fontFamily === 'thmanyah' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                            <div class="flex items-center justify-between w-full mb-1">
                                <span class="text-xs font-black text-slate-900 font-preview-thmanyah">خط ثمانية</span>
                                ${state.fontFamily === 'thmanyah' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                            </div>
                            <div class="text-[10px] text-slate-500 font-preview-thmanyah mb-1">Thmanyah Sans</div>
                            <div class="text-[11px] font-black text-emerald-700 font-preview-thmanyah truncate">أفضل 5 مهاجمين ⚽🔥</div>
                        </button>

                        <!-- 2. Zain Font -->
                        <button type="button" onclick="ReelsEngine.setFontFamily('zain')" 
                                class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${state.fontFamily === 'zain' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                            <div class="flex items-center justify-between w-full mb-1">
                                <span class="text-xs font-black text-slate-900 font-preview-zain">خط زين (Zain)</span>
                                ${state.fontFamily === 'zain' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                            </div>
                            <div class="text-[10px] text-slate-500 font-preview-zain mb-1">Google Zain</div>
                            <div class="text-[11px] font-black text-emerald-700 font-preview-zain truncate">أفضل 5 مهاجمين ⚽🔥</div>
                        </button>

                        <!-- 3. Alexandria Font -->
                        <button type="button" onclick="ReelsEngine.setFontFamily('alexandria')" 
                                class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${state.fontFamily === 'alexandria' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                            <div class="flex items-center justify-between w-full mb-1">
                                <span class="text-xs font-black text-slate-900 font-preview-alexandria">الإسكندرية</span>
                                ${state.fontFamily === 'alexandria' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                            </div>
                            <div class="text-[10px] text-slate-500 font-preview-alexandria mb-1">Alexandria Classic</div>
                            <div class="text-[11px] font-black text-emerald-700 font-preview-alexandria truncate">أفضل 5 مهاجمين ⚽🔥</div>
                        </button>
                    </div>
                </div>

                <!-- 3. NATURAL POSITION & SIZE CONTROLS (THE COMPLETE FIX) -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 shadow-xs space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="text-base">🎯</span>
                            <span class="text-xs font-black text-emerald-950">الموقع والحجم (تحكم طبيعي):</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="ReelsEngine.toggleMagnet()" 
                                     class="px-2.5 py-1 rounded-lg ${state.magnetEnabled !== false ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-300 text-slate-700'} text-[10.5px] font-black transition flex items-center gap-1" title="تفعيل/تعطيل المغناطيس للالتصاق بالمنتصف">
                                <span>${state.magnetEnabled !== false ? '🧲 مغناطيس: شغال' : '🧲 مغناطيس: مطفأ'}</span>
                            </button>
                            <button type="button" id="btnToggleDragLock" onclick="ReelsEngine.toggleDragLock()" 
                                     class="px-2.5 py-1 rounded-lg ${state.dragEnabled ? 'bg-slate-900 text-white' : 'bg-slate-400 text-slate-100'} text-[10.5px] font-black transition">
                                <span>${state.dragEnabled ? '🔓 سحب بالماوس' : '🔒 مقفول'}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Active Element Controller Box -->
                    <div class="p-3 rounded-xl bg-white border border-emerald-300 shadow-xs space-y-3">
                        
                        <!-- Element Picker -->
                        <div class="space-y-1">
                            <div class="flex items-center justify-between">
                                <label class="text-[11px] font-black text-slate-800">العنصر المراد ضبطه:</label>
                                <div class="flex items-center gap-1.5">
                                    ${selectedId ? `
                                        <button type="button" onclick="ReelsEngine.setSelectedElement('')" 
                                                class="text-[9.5px] px-2 py-0.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-slate-200 text-slate-600 font-bold transition flex items-center gap-1 cursor-pointer" title="إلغاء التحديد">
                                            <span>إلغاء التحديد ✕</span>
                                        </button>
                                        <span id="dragCoordsBadge" class="text-[10px] font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            X: ${curLeft}% | Y: ${curTop}%
                                        </span>
                                    ` : `
                                        <span id="dragCoordsBadge" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                            ⚪ غير محدد
                                        </span>
                                    `}
                                </div>
                            </div>
                            <select id="selectReelElement" onchange="ReelsEngine.setSelectedElement(this.value)" 
                                    class="w-full px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                ${elementSelectOptions}
                            </select>
                        </div>

                        ${selectedId ? `
                            <!-- 1. Size Controls (تحكم الحجم الطبيعي) -->
                            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-[11px] font-black text-slate-800 flex items-center gap-1">
                                        <span>📏</span>
                                        <span>حجم العنصر (Scale):</span>
                                    </span>
                                    <span id="cardScaleVal" class="text-[11px] font-mono font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                                        ${Math.round(curScale * 100)}%
                                    </span>
                                </div>

                                <!-- Slider with Minus / Plus -->
                                <div class="flex items-center gap-2">
                                    <button type="button" onclick="ReelsEngine.adjustScaleSelected(-0.05)" 
                                            class="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-black text-xs border border-slate-200 flex items-center justify-center transition active:scale-95 shadow-2xs" title="تصغير 5%">
                                        ➖
                                    </button>
                                    <input type="range" id="cardScaleSlider" min="0.50" max="1.60" step="0.02" value="${curScale}" 
                                           oninput="ReelsEngine.setScaleSelected(this.value)" class="flex-1 accent-emerald-600 cursor-pointer">
                                    <button type="button" onclick="ReelsEngine.adjustScaleSelected(0.05)" 
                                            class="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-black text-xs border border-slate-200 flex items-center justify-center transition active:scale-95 shadow-2xs" title="تكبير 5%">
                                        ➕
                                    </button>
                                </div>

                                <!-- Quick Size Presets -->
                                <div class="grid grid-cols-3 gap-1.5 pt-0.5">
                                    <button type="button" onclick="ReelsEngine.setScaleSelected(0.85)" class="py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[10px] font-bold border border-slate-200 transition">
                                        صغير 85%
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setScaleSelected(1.00)" class="py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[10px] font-bold border border-slate-200 transition">
                                        أصلي 100%
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setScaleSelected(1.18)" class="py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[10px] font-bold border border-slate-200 transition">
                                        كبير 118%
                                    </button>
                                </div>
                            </div>

                            <!-- 2. Position Controls (تحكم الموقع والتوسيط) -->
                            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-[11px] font-black text-slate-800 flex items-center gap-1">
                                        <span>📍</span>
                                        <span>الموقع والتوسيط:</span>
                                    </span>
                                    <span class="text-[10px] text-slate-400 font-medium">سحب مباشر أو أزرار</span>
                                </div>

                                <!-- Big Center Button -->
                                <button type="button" onclick="ReelsEngine.centerSelectedElement()" 
                                        class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]">
                                    <span>🎯 وضع في المنتصف تماماً (Center 50%)</span>
                                </button>

                                <!-- Precision Nudge Arrows -->
                                <div class="flex items-center justify-between pt-1 border-t border-slate-200/60">
                                    <span class="text-[10.5px] font-bold text-slate-600">تحريك دقيق (1%):</span>
                                    <div class="flex items-center gap-1">
                                        <button type="button" onclick="ReelsEngine.nudgeSelected('up')" class="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-700 font-black text-xs transition border border-slate-200 flex items-center justify-center active:scale-95 shadow-2xs" title="للأعلى">⬆️</button>
                                        <button type="button" onclick="ReelsEngine.nudgeSelected('down')" class="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-700 font-black text-xs transition border border-slate-200 flex items-center justify-center active:scale-95 shadow-2xs" title="للأسفل">⬇️</button>
                                        <button type="button" onclick="ReelsEngine.nudgeSelected('left')" class="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-700 font-black text-xs transition border border-slate-200 flex items-center justify-center active:scale-95 shadow-2xs" title="يسار">⬅️</button>
                                        <button type="button" onclick="ReelsEngine.nudgeSelected('right')" class="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-700 font-black text-xs transition border border-slate-200 flex items-center justify-center active:scale-95 shadow-2xs" title="يمين">➡️</button>
                                    </div>
                                </div>
                            </div>
                        ` : `
                            <div class="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-1">
                                <div class="text-xs font-black text-slate-700 flex items-center justify-center gap-1.5">
                                    <span>👆</span>
                                    <span>لا يوجد عنصر محدد حالياً</span>
                                </div>
                                <p class="text-[10.5px] text-slate-500 font-medium">انقر على أي كرت أو عنوان على الكانفاس لتحديده وتعديل حجمه وموقعه، أو اختر عنصراً من القائمة أعلاه.</p>
                            </div>
                        `}

                        <!-- Save & Reset -->
                        <div class="flex items-center gap-2 pt-0.5">
                            <button type="button" onclick="ReelsEngine.saveLayoutPositions()" 
                                    class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-105 text-white font-black text-xs transition shadow-sm flex items-center justify-center gap-1 active:scale-[0.98]">
                                <span>💾 تثبيت المواضع لهذا النمط</span>
                            </button>
                            <button type="button" onclick="ReelsEngine.resetLayoutPositions()" 
                                    class="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition active:scale-[0.98]">
                                <span>🔄 ضبط افتراضي</span>
                            </button>
                        </div>
                    </div>

                </div>

                <!-- 4. SLIDE & PLAYER CUSTOMIZER -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-xs font-black text-slate-900">
                                تعديل السلايد الحالي:
                            </span>
                            <!-- Quick Switcher in Header -->
                            <div class="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                                <button type="button" onclick="ReelsEngine.prevSlide()" class="px-2 py-0.5 rounded-lg hover:bg-white text-[10.5px] font-black text-slate-700 transition" title="السلايد السابق">⏪ السابق</button>
                                <span class="reels-quick-slide-counter px-1.5 py-0.5 text-[10.5px] font-black text-emerald-700 bg-white rounded-md border border-slate-200 shadow-2xs">${state.currentSlideIndex + 1}/${state.slides.length}</span>
                                <button type="button" onclick="ReelsEngine.nextSlide()" class="px-2 py-0.5 rounded-lg hover:bg-white text-[10.5px] font-black text-slate-700 transition" title="السلايد التالي">التالي ⏩</button>
                                <button type="button" onclick="ReelsEngine.togglePlayPause()" class="reels-toolbar-btn-play px-2.5 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] font-black transition flex items-center gap-1 shadow-2xs" title="تشغيل / إيقاف">
                                    <span>▶️</span>
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center gap-1.5 flex-wrap">
                            ${!hasIntro ? `
                                <button type="button" onclick="ReelsEngine.addSlide('intro')" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10.5px] font-black transition flex items-center gap-1 shadow-2xs">
                                    <span>➕ سلايد بداية</span>
                                </button>
                            ` : ''}
                            ${isCountdown ? `
                                <button type="button" onclick="ReelsEngine.addSlide('player_card')" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10.5px] font-black transition flex items-center gap-1 shadow-2xs">
                                    <span>➕ كرت لاعب</span>
                                </button>
                            ` : ''}
                            ${!hasOutro ? `
                                <button type="button" onclick="ReelsEngine.addSlide('outro')" class="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-[10.5px] font-black transition flex items-center gap-1 shadow-2xs">
                                    <span>➕ سلايد ختام</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    ${renderSlideForm(currentSlide)}
                </div>

                <!-- 5. SLIDE ENTRANCE ANIMATIONS TABLE -->
                ${renderAnimationTableHtml()}

                <!-- 5.5 AUDIO & SFX STUDIO -->
                ${renderAudioStudioHtml()}

                <!-- 5.8 STORY PROGRESS BAR 2.0 (MULTI-STYLE & ONE-CLICK TOGGLE) -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 border border-zinc-800 text-white shadow-md space-y-3">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">⏳</span>
                            <div>
                                <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                                    <span>شريط تقدم الريل العلوي (Story Progress Bar)</span>
                                    <span class="text-[9.5px] px-2 py-0.5 rounded-full font-black ${state.progressBar.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}">
                                        ${state.progressBar.enabled ? 'مفعل وظاهر 👁️' : 'مخفي ⚪'}
                                    </span>
                                </h4>
                                <p class="text-[10px] text-zinc-400">اختر شكل وتصميم شريط تقدم القصة أو قم بإخفائه وتفعيله بنقرة واحدة</p>
                            </div>
                        </div>
                        <button type="button" onclick="ReelsEngine.toggleProgressBar()" 
                                class="px-3.5 py-1.5 rounded-xl ${state.progressBar.enabled ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'} text-xs font-black transition active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-sm">
                            <span>${state.progressBar.enabled ? '👁️ إظهار شريط التقدم (مفعل)' : '⚪ إخفاء شريط التقدم (معطل)'}</span>
                        </button>
                    </div>

                    ${state.progressBar.enabled ? `
                        <!-- Style Selector Grid -->
                        <div class="space-y-1.5 pt-2 border-t border-zinc-800/80">
                            <span class="text-[10.5px] text-zinc-400 font-bold block">اختر شكل وتصميم الشريط:</span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                ${REELS_PROGRESS_STYLES.map(st => {
                                    const isActive = (state.progressBar.style || 'capsule_neon') === st.id;
                                    return `
                                        <div onclick="ReelsEngine.setProgressBarStyle('${st.id}')"
                                             class="p-2.5 rounded-xl transition border cursor-pointer select-none active:scale-[0.98] ${isActive ? 'bg-amber-500/15 border-amber-400 text-white ring-1 ring-amber-400/50 shadow-sm' : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850'}">
                                            <div class="flex items-center justify-between mb-1">
                                                <div class="flex items-center gap-1.5">
                                                    <span class="text-sm">${st.icon}</span>
                                                    <span class="text-[11px] font-black">${st.name}</span>
                                                </div>
                                                ${isActive ? '<span class="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">مفعل ✓</span>' : ''}
                                            </div>
                                            <p class="text-[9px] text-zinc-400 leading-snug">${st.desc}</p>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Color & Thickness Options -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
                            <!-- Colors -->
                            <div class="space-y-1.5">
                                <span class="text-[10px] text-zinc-400 font-bold block">لون شريط التقدم:</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <button type="button" onclick="ReelsEngine.setProgressBarColor('amber')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${state.progressBar.color === 'amber' ? 'bg-amber-400 text-slate-950 border-amber-400 font-black ring-2 ring-amber-400/40 shadow-xs' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'}">
                                        🟡 ذهبي كوينز
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarColor('emerald')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${state.progressBar.color === 'emerald' ? 'bg-emerald-500 text-white border-emerald-500 font-black ring-2 ring-emerald-500/40 shadow-xs' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'}">
                                        🟢 زمردي ميتا
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarColor('white')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${state.progressBar.color === 'white' ? 'bg-white text-slate-950 border-white font-black ring-2 ring-white/40 shadow-xs' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'}">
                                        ⚪ أبيض ستوري
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarColor('purple')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${state.progressBar.color === 'purple' ? 'bg-purple-500 text-white border-purple-500 font-black ring-2 ring-purple-500/40 shadow-xs' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'}">
                                        🟣 نيون سايبر
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarColor('cyan')" 
                                            class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${state.progressBar.color === 'cyan' ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-black ring-2 ring-cyan-400/40 shadow-xs' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'}">
                                        💎 سماوي ماسي
                                    </button>
                                </div>
                            </div>

                            <!-- Thickness -->
                            <div class="space-y-1.5">
                                <span class="text-[10px] text-zinc-400 font-bold block">سُمك وحجم الشريط:</span>
                                <div class="flex items-center gap-1.5">
                                    <button type="button" onclick="ReelsEngine.setProgressBarThickness('thin')" 
                                            class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${(state.progressBar.thickness || 'medium') === 'thin' ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                        رقيق (3px)
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarThickness('medium')" 
                                            class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${(state.progressBar.thickness || 'medium') === 'medium' ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                        متوازن (5px)
                                    </button>
                                    <button type="button" onclick="ReelsEngine.setProgressBarThickness('thick')" 
                                            class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${(state.progressBar.thickness || 'medium') === 'thick' ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                        بارز (7px)
                                    </button>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div class="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center text-[10.5px] text-zinc-400">
                            💡 شريط التقدم مخفي حالياً من الكانفاس وتصدير الفيديو. اضغط على الزر الأخضر أعلاه لإظهاره واختيار شكله المناسب.
                        </div>
                    `}
                </div>

                <!-- 5.9 SLIDE TRANSITIONS STUDIO -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 border border-zinc-800 text-white shadow-md space-y-3">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">🎬</span>
                            <div>
                                <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                                    <span>الانتقالات السينمائية بين السلايدات (Slide Transitions)</span>
                                    <span class="text-[9.5px] px-2 py-0.5 rounded-full font-black ${state.slideTransition.type !== 'instant' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-xs' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}">
                                        ${state.slideTransition.type !== 'instant' ? 'مفعلة 🎬' : 'قطع مباشر ✂️'}
                                    </span>
                                </h4>
                                <p class="text-[10px] text-zinc-400">حركات تنقل سينمائية احترافية تعمل في المعاينة ومسجلة في الفيديو بدقة 60FPS</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="ReelsEngine.testSlideTransition()" 
                                    class="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition active:scale-95 flex items-center gap-1 shadow-sm cursor-pointer" title="تجربة ومعاينة الانتقال المختار الآن">
                                <span>👁️ تجربة الانتقال</span>
                            </button>
                        </div>
                    </div>

                    <!-- Transitions Selector Grid -->
                    <div class="space-y-1.5 pt-2 border-t border-zinc-800/80">
                        <span class="text-[10.5px] text-zinc-400 font-bold block">اختر نمط الانتقال السينمائي:</span>
                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            ${REELS_SLIDE_TRANSITIONS.map(tr => {
                                const isActive = (state.slideTransition.type || 'smooth_fade') === tr.id;
                                return `
                                    <div onclick="ReelsEngine.setSlideTransitionType('${tr.id}')"
                                         class="p-2 rounded-xl transition border cursor-pointer select-none active:scale-[0.98] ${isActive ? 'bg-purple-500/20 border-purple-400 text-white ring-1 ring-purple-400/50 shadow-sm' : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850'}">
                                        <div class="flex items-center justify-between mb-0.5">
                                            <span class="text-sm">${tr.icon}</span>
                                            ${isActive ? '<span class="text-[8.5px] bg-purple-400 text-slate-950 px-1 py-0.2 rounded font-black">مفعل ✓</span>' : ''}
                                        </div>
                                        <div class="text-[10.5px] font-black text-white truncate">${tr.name}</div>
                                        <p class="text-[8.5px] text-zinc-400 leading-tight mt-0.5 line-clamp-2">${tr.desc}</p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Transition Speed & Whoosh Sound Options -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
                        <!-- Speed -->
                        <div class="space-y-1.5">
                            <span class="text-[10px] text-zinc-400 font-bold block">سرعة زمن الانتقال:</span>
                            <div class="flex items-center gap-1.5">
                                <button type="button" onclick="ReelsEngine.setSlideTransitionDuration(0.25)" 
                                        class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${state.slideTransition.duration <= 0.28 ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                    ⚡ خاطف (0.25s)
                                </button>
                                <button type="button" onclick="ReelsEngine.setSlideTransitionDuration(0.38)" 
                                        class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${state.slideTransition.duration > 0.28 && state.slideTransition.duration <= 0.45 ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                    🎬 سينمائي (0.38s)
                                </button>
                                <button type="button" onclick="ReelsEngine.setSlideTransitionDuration(0.55)" 
                                        class="flex-1 py-1 rounded-lg text-[10px] font-bold border transition ${state.slideTransition.duration > 0.45 ? 'bg-white text-slate-950 border-white font-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}">
                                    🕊️ هادئ (0.55s)
                                </button>
                            </div>
                        </div>

                        <!-- Sound Toggle -->
                        <div class="space-y-1.5">
                            <span class="text-[10px] text-zinc-400 font-bold block">صوت الانتقال السينمائي (Whoosh SFX):</span>
                            <button type="button" onclick="ReelsEngine.toggleSlideTransitionSound()" 
                                    class="w-full py-1.5 px-3 rounded-lg text-[10.5px] font-black border transition active:scale-95 flex items-center justify-between ${state.slideTransition.soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}">
                                <span>${state.slideTransition.soundEnabled ? '🔊 صوت السحب السريع مفعل ✓' : '🔇 صوت الانتقال مكتوم ✕'}</span>
                                <span class="text-[9px] px-1.5 py-0.2 rounded bg-black/40 font-mono">${state.slideTransition.soundEnabled ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 6. SAFE ZONE -->
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                        <span>📐</span>
                        <span class="font-bold text-slate-700">خطوط أمان إنستغرام وتيك توك:</span>
                    </div>
                    <button type="button" id="btnToggleSafeZone" onclick="ReelsEngine.toggleSafeZone()" 
                            class="px-3 py-1.5 rounded-xl ${state.showSafeZone ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'} font-black text-[11px] transition shadow-xs">
                        ${state.showSafeZone ? '📐 مفعلة' : '📐 مخفية'}
                    </button>
                </div>

                <!-- 6. TIKTOK AUTO PUBLISHING INTEGRATION -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 via-zinc-900 to-black border border-zinc-800 text-white shadow-md space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">🎵</span>
                            <div>
                                <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                                    <span>نشر تيك توك التلقائي</span>
                                    <span id="tiktokStatusBadge" class="text-[9.5px] px-2 py-0.5 rounded-full font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">جاري الفحص...</span>
                                </h4>
                                <p class="text-[10px] text-zinc-400">نشر مباشر على حسابك بلمسة واحدة</p>
                            </div>
                        </div>
                        <div id="tiktokActionBtnArea">
                            <button type="button" onclick="ReelsEngine.loginTikTok()" class="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[10.5px] font-bold text-zinc-300 transition">
                                🔗 ربط
                            </button>
                        </div>
                    </div>

                    <!-- Privacy Level Selector -->
                    <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px]">
                        <span class="text-zinc-400 font-bold shrink-0">نوع النشر:</span>
                        <select id="tiktokPrivacyLevel" class="w-full bg-black/70 text-zinc-200 text-[10.5px] font-bold rounded-lg px-2 py-1 border border-zinc-700 outline-none">
                            <option value="PUBLIC_TO_EVERYONE">🌐 نشر عام ومباشر للجميع (Public)</option>
                            <option value="SELF_ONLY">🔒 نشر مباشر بحسابي (أنا فقط - Private)</option>
                            <option value="MUTUAL_FOLLOW_FRIENDS">👥 للأصدقاء المشتركين فقط</option>
                        </select>
                    </div>

                    <!-- Direct Publish Button -->
                    <button type="button" id="btnPublishTikTok" onclick="ReelsEngine.publishToTikTok()"
                            class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FE2C55] via-[#ff0050] to-[#25F4EE] hover:brightness-110 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#FE2C55]/20 cursor-pointer active:scale-[0.99]">
                        <span>🚀 نشر الريل على تيك توك بنقرة واحدة</span>
                    </button>
                    <div id="tiktokPublishStatus" class="hidden text-[11px] p-2.5 rounded-xl text-center font-bold"></div>
                </div>

                <!-- 7. EXPORT ACTIONS -->
                <div class="pt-2 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="ReelsEngine.exportReelVideo()" id="btnExportVideo" 
                            class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer">
                        <span>🎬 تحميل فيديو الريل الأصلي (MP4 بدقة 1080x1920 مع الأنيميشن والصوت)</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.sendReelVideoTelegram()" id="btnSendReelVideoTelegram"
                            class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 cursor-pointer active:scale-[0.99]">
                        <span>🚀 إرسال فيديو الريلز إلى تيليجرام (60FPS كامل مع الصوت)</span>
                    </button>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="ReelsEngine.exportAllSlidesBatch()" class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>📸 تحميل كافة السلايدات</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.sendReelSlideTelegram()" class="py-2.5 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 font-bold text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>🖼️ إرسال السلايد صورة</span>
                        </button>
                    </div>
                </div>

            </div>
        `;

        container.innerHTML = html;
        checkTikTokStatus();
    }

    function renderSlideForm(slide) {
        if (!slide) return '';

        const curDuration = Math.round((slide.duration || 2.5) * 10) / 10;
        const isPlayerCard = slide.type === 'player_card';
        const slideSfxControlHtml = renderSlideSfxControlsHtml(slide);

        // 1. Duration / Speed Control Bar for EVERY slide
        const durationControlHtml = `
            <div class="p-2.5 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 space-y-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                        <span class="text-sm">⏱️</span>
                        <span class="text-[11px] font-black text-amber-950">سرعة ومدة عرض هذا السلايد:</span>
                    </div>
                    <span id="currentSlideDurationBadge" class="text-[11px] font-mono font-black text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-300 shadow-2xs">
                        ${curDuration.toFixed(1)} ثانية
                    </span>
                </div>

                <div class="flex items-center gap-2">
                    <button type="button" onclick="ReelsEngine.adjustCurrentSlideDuration(-0.2)" 
                            class="w-7 h-7 rounded-lg bg-white hover:bg-amber-100 text-amber-900 font-black text-xs border border-amber-200 flex items-center justify-center transition active:scale-95 shadow-2xs" title="تقليل 0.2 ثانية (تسريع السلايد)">
                        ⚡
                    </button>
                    <input type="range" min="0.8" max="6.0" step="0.1" value="${curDuration}" 
                           oninput="ReelsEngine.setCurrentSlideDuration(this.value)" class="flex-1 accent-amber-600 cursor-pointer">
                    <button type="button" onclick="ReelsEngine.adjustCurrentSlideDuration(0.2)" 
                            class="w-7 h-7 rounded-lg bg-white hover:bg-amber-100 text-amber-900 font-black text-xs border border-amber-200 flex items-center justify-center transition active:scale-95 shadow-2xs" title="زيادة 0.2 ثانية (إبطاء السلايد)">
                        ⏳
                    </button>
                </div>

                <!-- Quick Presets -->
                <div class="grid grid-cols-4 gap-1 pt-0.5">
                    <button type="button" onclick="ReelsEngine.setCurrentSlideDuration(1.2)" class="py-1 rounded-md bg-white hover:bg-amber-100 text-slate-800 text-[10px] font-bold border border-amber-200 transition ${curDuration === 1.2 ? 'ring-2 ring-amber-500 font-black' : ''}">
                        سريع 1.2s
                    </button>
                    <button type="button" onclick="ReelsEngine.setCurrentSlideDuration(1.8)" class="py-1 rounded-md bg-white hover:bg-amber-100 text-slate-800 text-[10px] font-bold border border-amber-200 transition ${curDuration === 1.8 ? 'ring-2 ring-amber-500 font-black' : ''}">
                        خاطف 1.8s
                    </button>
                    <button type="button" onclick="ReelsEngine.setCurrentSlideDuration(2.6)" class="py-1 rounded-md bg-white hover:bg-amber-100 text-slate-800 text-[10px] font-bold border border-amber-200 transition ${curDuration === 2.6 ? 'ring-2 ring-amber-500 font-black' : ''}">
                        متوازن 2.6s
                    </button>
                    <button type="button" onclick="ReelsEngine.setCurrentSlideDuration(3.5)" class="py-1 rounded-md bg-white hover:bg-amber-100 text-slate-800 text-[10px] font-bold border border-amber-200 transition ${curDuration === 3.5 ? 'ring-2 ring-amber-500 font-black' : ''}">
                        هادئ 3.5s
                    </button>
                </div>

                ${isPlayerCard ? `
                    <div class="pt-1 border-t border-amber-200/60">
                        <button type="button" onclick="ReelsEngine.applyDurationToAllPlayerCards()" 
                                class="w-full py-1.5 px-2 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-black text-[10.5px] transition flex items-center justify-center gap-1 shadow-2xs active:scale-[0.98]">
                            <span>🔄 تعميم هذه السرعة (${curDuration.toFixed(1)}s) على كافة كروت اللاعبين</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        // 2. Global Delete button for ANY slide
        const deleteSlideButtonHtml = `
            <div class="pt-2 border-t border-slate-100">
                <button type="button" onclick="ReelsEngine.deleteCurrentSlide()" 
                        class="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98]">
                    <span>🗑️ حذف هذا السلايد بالكامل من الريل</span>
                </button>
            </div>
        `;

        if (slide.type === 'intro') {
            return `
                <div class="space-y-2.5">
                    ${durationControlHtml}
                    ${slideSfxControlHtml}

                    <!-- 3D BACKGROUND VISUAL HOOK PANEL -->
                    <div class="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-500/10 border border-amber-300/80 shadow-xs space-y-2.5">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="text-base">🎴</span>
                                <div>
                                    <h4 class="text-[11.5px] font-black text-amber-950">هوك خلفية البداية (Visual Hook):</h4>
                                    <p class="text-[9.5px] text-amber-800/80 font-bold">كروت ثلاثية الأبعاد متحركة ومغبشة تشد المتابع فوراً</p>
                                </div>
                            </div>
                            <span class="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                خيارات متعددة ✨
                            </span>
                        </div>

                        <!-- Hook Style Selector -->
                        <div class="space-y-1">
                            <label class="text-[10.5px] font-black text-slate-800">نمط الحركة والكروت بالخلفية:</label>
                            <select onchange="ReelsEngine.updateCurrentSlideField('introHookStyle', this.value); ReelsEngine.renderCanvas(); ReelsEngine.renderEditorControls();" 
                                    class="w-full px-2.5 py-2 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 shadow-2xs cursor-pointer">
                                <option value="cards_stream" ${(slide.introHookStyle === 'cards_stream' || !slide.introHookStyle) ? 'selected' : ''}>🎴 قطار الكروت 3D المتتالي (الموصى به - كروت تمشي ورا بعض)</option>
                                <option value="cards_fan" ${slide.introHookStyle === 'cards_fan' ? 'selected' : ''}>🃏 مروحة الكروت 3D المقوسة (تموج عائم وتوهج)</option>
                                <option value="mystery_card" ${slide.introHookStyle === 'mystery_card' ? 'selected' : ''}>❓ كرت الصدمة الغامض (فضول عالي لمعرفة صاحب #1)</option>
                                <option value="dual_stream" ${slide.introHookStyle === 'dual_stream' ? 'selected' : ''}>⚡ صفين كروت متقاطعة (اتجاهين متعاكسين)</option>
                                <option value="none" ${slide.introHookStyle === 'none' ? 'selected' : ''}>⏹️ خلفية رخام عادية (بدون كروت بالخلفية)</option>
                            </select>
                        </div>

                        ${slide.introHookStyle !== 'none' ? `
                            <!-- Blur and Opacity Options -->
                            <div class="grid grid-cols-2 gap-2 pt-1 border-t border-amber-200/60">
                                <!-- Blur -->
                                <div class="space-y-1">
                                    <div class="flex items-center justify-between">
                                        <label class="text-[10px] font-black text-slate-700">درجة التغبيش (Blur):</label>
                                        <span class="text-[9px] font-bold text-amber-900 font-mono">${slide.introHookBlur || '3px'}</span>
                                    </div>
                                    <select onchange="ReelsEngine.updateCurrentSlideField('introHookBlur', this.value); ReelsEngine.renderCanvas();"
                                            class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-[10.5px] font-bold text-slate-800 outline-none">
                                        <option value="1.5px" ${slide.introHookBlur === '1.5px' ? 'selected' : ''}>خفيف جداً (1.5px)</option>
                                        <option value="3px" ${(slide.introHookBlur === '3px' || !slide.introHookBlur) ? 'selected' : ''}>متوازن (3px)</option>
                                        <option value="5px" ${slide.introHookBlur === '5px' ? 'selected' : ''}>ضبابي ناعم (5px)</option>
                                        <option value="8px" ${slide.introHookBlur === '8px' ? 'selected' : ''}>ضبابي قوي (8px)</option>
                                        <option value="0px" ${slide.introHookBlur === '0px' ? 'selected' : ''}>حاد بدون تغبيش (0px)</option>
                                    </select>
                                </div>

                                <!-- Opacity -->
                                <div class="space-y-1">
                                    <div class="flex items-center justify-between">
                                        <label class="text-[10px] font-black text-slate-700">شفافية الكروت:</label>
                                        <span class="text-[9px] font-bold text-amber-900 font-mono">${Math.round((slide.introHookOpacity !== undefined ? slide.introHookOpacity : 0.48) * 100)}%</span>
                                    </div>
                                    <select onchange="ReelsEngine.updateCurrentSlideField('introHookOpacity', parseFloat(this.value)); ReelsEngine.renderCanvas();"
                                            class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-[10.5px] font-bold text-slate-800 outline-none">
                                        <option value="0.30" ${slide.introHookOpacity === 0.30 ? 'selected' : ''}>خافتة هادئة (30%)</option>
                                        <option value="0.48" ${(slide.introHookOpacity === 0.48 || slide.introHookOpacity === undefined) ? 'selected' : ''}>متوازنة سينمائية (48%)</option>
                                        <option value="0.68" ${slide.introHookOpacity === 0.68 ? 'selected' : ''}>واضحة وظاهرة (68%)</option>
                                        <option value="0.88" ${slide.introHookOpacity === 0.88 ? 'selected' : ''}>بارزة جداً (88%)</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Gold Spotlight Toggle -->
                            <div class="flex items-center justify-between pt-1 border-t border-amber-200/60">
                                <span class="text-[10px] font-black text-slate-700 flex items-center gap-1">
                                    <span>✨</span>
                                    <span>توهج ضوئي ذهبي في المنتصف (Spotlight):</span>
                                </span>
                                <button type="button" onclick="ReelsEngine.updateCurrentSlideField('introHookGlow', ${slide.introHookGlow === false ? 'true' : 'false'}); ReelsEngine.renderCanvas(); ReelsEngine.renderEditorControls();"
                                        class="px-2.5 py-0.5 rounded-md text-[10px] font-black transition border ${slide.introHookGlow !== false ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-200 text-slate-600 border-slate-300'}">
                                    ${slide.introHookGlow !== false ? 'مفعل ✓' : 'معطل ✕'}
                                </button>
                            </div>
                        ` : ''}
                    </div>

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-800">شارة العنوان (Badge):</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideBadge')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideBadge ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                                ${slide.hideBadge ? '👁️ إظهار' : '🗑️ إخفاء/حذف'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.badge || state.badge || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('badge', this.value); state.badge = this.value; ReelsEngine.renderCanvas();"
                               class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>

                    ${renderTitleLinesBuilderHtml(slide.title || state.title || '', '📢 مانشيت البداية (توزيع الكلمات بالأسطر):', 'hideTitle', slide.hideTitle)}

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-800">الوصف والتحفيز (Subtitle):</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideSubtitle')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideSubtitle ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                                ${slide.hideSubtitle ? '👁️ إظهار' : '🗑️ إخفاء/حذف'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.subtitle || '').replace(/"/g, '&quot;')}" 
                                oninput="ReelsEngine.updateCurrentSlideField('subtitle', this.value)"
                                class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-500">
                    </div>

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-800">نص زر الإجراء (CTA):</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideCta')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideCta ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                                ${slide.hideCta ? '👁️ إظهار' : '🗑️ إخفاء/حذف'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.ctaText || 'شاهد الترتيب بالكامل').replace(/"/g, '&quot;')}" 
                                oninput="ReelsEngine.updateCurrentSlideField('ctaText', this.value)"
                                class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>

                    ${deleteSlideButtonHtml}
                </div>
            `;
        } else if (slide.type === 'player_card') {
            return `
                <div class="space-y-2.5">
                    ${durationControlHtml}
                    ${slideSfxControlHtml}

                    ${renderTitleLinesBuilderHtml(state.title || '', 'عنوان الريل المشترك (أعلى الكروت):', 'hideTitle', slide.hideTitle)}

                    ${renderPlayerFetcherBoxHtml(state.currentSlideIndex)}

                    <div class="grid grid-cols-2 gap-2">
                        <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div class="flex items-center justify-between">
                                <label class="text-[10.5px] font-black text-slate-700">رقم الرانك:</label>
                                <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideRank')" class="text-[9.5px] font-bold px-1.5 py-0.5 rounded ${slide.hideRank ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                    ${slide.hideRank ? '👁️ إظهار' : '🗑️ إخفاء'}
                                </button>
                            </div>
                            <input type="text" value="${slide.rank || '1'}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('rank', this.value)"
                                   class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-black text-center outline-none focus:border-emerald-500">
                        </div>
                        <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div class="flex items-center justify-between">
                                <label class="text-[10.5px] font-black text-slate-700">اسم اللاعب بالعربي:</label>
                                <button type="button" onclick="ReelsEngine.toggleElementVisibility('hidePlayerName')" class="text-[9.5px] font-bold px-1.5 py-0.5 rounded ${slide.hidePlayerName ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                    ${slide.hidePlayerName ? '👁️ إظهار' : '🗑️ إخفاء'}
                                </button>
                            </div>
                            <input type="text" value="${(slide.playerArName || slide.playerName || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('playerArName', this.value)"
                                   placeholder="مثال: كيليان مبابي"
                                   class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                        </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <label class="text-[11px] font-black text-slate-700">كرت اللاعب الحالي:</label>
                                <span class="text-[9.5px] text-slate-400 font-mono font-bold">FUT.GG WebP</span>
                            </div>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideCard')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideCard ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                ${slide.hideCard ? '👁️ إظهار الكرت' : '🗑️ إخفاء الكرت'}
                            </button>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-12 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 shadow-2xs shrink-0 overflow-hidden">
                                <img src="${slide.cardUrl ? toProxyUrl(slide.cardUrl) : 'assets/placeholder_card.png'}" alt="Card" class="max-h-full max-w-full object-contain" crossorigin="anonymous">
                            </div>
                            <input type="text" value="${(slide.cardUrl || '').replace(/"/g, '&quot;')}" 
                                   onchange="ReelsEngine.updateCurrentSlideField('cardUrl', this.value)"
                                   placeholder="رابط صورة الكرت المباشر..."
                                   class="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-[10.5px] font-mono outline-none focus:border-emerald-500 shadow-2xs">
                        </div>
                    </div>

                    <!-- Player Coin Price Section (Optional) -->
                    <div class="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-50/70 to-yellow-500/5 border border-amber-300/70 space-y-2">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <img src="assets/fc-coin.webp" alt="Coin" class="w-4 h-4 object-contain">
                                <label class="text-[11px] font-black text-amber-950">سعر اللاعب بالكوينز (اختياري):</label>
                            </div>
                            ${slide.playerPrice && slide.playerPrice.trim() ? `
                                <button type="button" onclick="ReelsEngine.clearPlayerPrice()" class="text-[9.5px] font-bold px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition">
                                    مسح السعر ✕
                                </button>
                            ` : `
                                <span class="text-[9px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                                    غير معروض (اتركه فارغاً للإخفاء)
                                </span>
                            `}
                        </div>
                        <div class="relative">
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <img src="assets/fc-coin.webp" alt="Coin" class="w-4 h-4 object-contain">
                            </div>
                            <input type="text" value="${(slide.playerPrice || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('playerPrice', this.value)"
                                   placeholder="مثلاً: 2.4M أو 850K أو 45,000 (فارغ = بدون سعر)..."
                                   class="w-full pr-9 pl-3 py-2 rounded-xl bg-white border border-amber-300/70 text-slate-900 text-xs font-black outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400 font-mono shadow-2xs">
                        </div>
                        <!-- Quick Price Suggestions -->
                        <div class="flex items-center gap-1 flex-wrap pt-1 border-t border-amber-200/60">
                            <span class="text-[9.5px] font-black text-amber-900">أرقام سريعة:</span>
                            ${['2.4M', '1.8M', '1.2M', '850K', '450K', '120K', '45K'].map(p => `
                                <button type="button" onclick="ReelsEngine.setPlayerPriceQuick('${p}')"
                                        class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 text-amber-950 border border-amber-200 text-[10px] font-black font-mono shadow-2xs transition active:scale-95">
                                    ${p}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    ${renderSlideBadgesManagerHtml(slide)}

                    ${deleteSlideButtonHtml}
                </div>
            `;
        } else if (slide.type === 'versus_card') {
            return `
                <div class="space-y-3">
                    ${durationControlHtml}
                    ${slideSfxControlHtml}

                    ${renderTitleLinesBuilderHtml(slide.title || state.title || '', '⚔️ عنوان المقارنة (توزيع الكلمات بالأسطر):', 'hideTitle', slide.hideTitle)}

                    ${renderVersusPlayerFetcherHtml(state.currentSlideIndex, 'playerA', 'اللاعب الأول (اليمين)')}

                    ${renderVersusPlayerFetcherHtml(state.currentSlideIndex, 'playerB', 'اللاعب الثاني (اليسار)')}

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-700">سؤال التفاعل أسفل المقارنة:</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideQuestion')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideQuestion ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                ${slide.hideQuestion ? '👁️ إظهار' : '🗑️ إخفاء'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.question || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('question', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>

                    ${renderSlideBadgesManagerHtml(slide)}

                    ${deleteSlideButtonHtml}
                </div>
            `;
        } else {
            return `
                <div class="space-y-2.5">
                    ${durationControlHtml}
                    ${slideSfxControlHtml}

                    ${renderTitleLinesBuilderHtml(slide.title || 'متجر ShopCoin15', '👑 عنوان الختام (توزيع الكلمات بالأسطر):', 'hideTitle', slide.hideTitle)}

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-800">الوصف الترويجي:</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideSubtitle')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideSubtitle ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                ${slide.hideSubtitle ? '👁️ إظهار' : '🗑️ إخفاء'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.subtitle || 'شحن كوينز فوري وآمن 100% ⚡').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('subtitle', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-emerald-700">
                    </div>

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-800">زر الطلب والتواصل:</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideCta')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideCta ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                ${slide.hideCta ? '👁️ إظهار' : '🗑️ إخفاء'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.ctaText || 'للطلب حياك على الخاص: @shop_coin15 📩').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('ctaText', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold">
                    </div>

                    ${deleteSlideButtonHtml}
                </div>
            `;
        }
    }

    function updateTitle(val) {
        updateTitleFromTextarea(val);
    }

    function updateBadges(val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.badges = val.split(',').map(s => s.trim()).filter(Boolean);
        renderCanvas();
        saveProjectState();
    }

    function loadIdeaById(ideaId) {
        const list = VIRAL_IDEAS[state.activeSection] || [];
        const idea = list.find(x => x.id === ideaId);
        if (idea) applyIdea(idea, true);
    }

    // ---- 10. PLAYER TOOLBAR (TOP & BOTTOM OF CANVAS) ----
    function renderPlayerToolbar() {
        const topContainer = document.getElementById('reelsPlayerToolbarTopContainer');
        const bottomContainer = document.getElementById('reelsPlayerToolbarContainer');
        if (!topContainer && !bottomContainer) return;

        const toolbarHtml = `
            <div class="p-2.5 sm:p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-between text-white shadow-xl flex-wrap gap-2">
                <div class="flex items-center gap-1.5 flex-wrap">
                    <button type="button" onclick="ReelsEngine.prevSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition active:scale-95" title="السلايد السابق">
                        ⏪ السابق
                    </button>
                    <button type="button" onclick="ReelsEngine.togglePlayPause()" class="reels-toolbar-btn-play px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition flex items-center gap-1 shadow-sm active:scale-95" title="تشغيل / إيقاف">
                        <span>▶️ تشغيل</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.nextSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition active:scale-95" title="السلايد التالي">
                        التالي ⏩
                    </button>
                    <button type="button" onclick="ReelsEngine.replaySlideAnimations()" class="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition flex items-center gap-1 shadow-sm active:scale-95" title="إعادة تشغيل حركات السلايد الحالي">
                        <span>✨ إعادة الحركة</span>
                    </button>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <span class="reels-toolbar-slide-ind text-[11px] font-black text-emerald-400">
                        سلايد ${state.currentSlideIndex + 1}/${state.slides.length}
                    </span>
                    <div class="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="reels-toolbar-timeline-bar bg-emerald-400 h-full w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30" title="محرك التصدير الفائق 1080x1920 مفعّل">v55.0 ⚡</span>
                    <button type="button" id="btnExportVideoFloating" onclick="ReelsEngine.exportReelVideo()" class="btn-export-reel-action px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-black text-xs transition flex items-center gap-1 shadow-md shadow-emerald-600/20 active:scale-95" title="تحميل الفيديو بدقة 1080x1920 Full HD مع الأنيميشن والصوت">
                        <span>🎬 تحميل فيديو</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.sendReelVideoTelegram()" class="btn-telegram-action px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-105 text-white font-black text-xs transition flex items-center gap-1 shadow-md shadow-sky-500/20 active:scale-95" title="إرسال فيديو الريلز مباشرة إلى تيليجرام">
                        <span>🚀 فيديو لتليجرام</span>
                    </button>
                </div>
            </div>
        `;

        if (topContainer) topContainer.innerHTML = toolbarHtml;
        if (bottomContainer) bottomContainer.innerHTML = toolbarHtml;
        updatePlayerUi();
    }

    // ---- 11. VIDEO RECORDER HELPER ----
    async function captureSlideImage(domNode) {
        if (!domNode) return '';

        // 1. Temporarily deselect any element & clear selection outlines
        const prevSelected = state.selectedDragElement;
        state.selectedDragElement = null;

        // 2. Temporarily unscale stage and domNode so native layout is pure 450x800 without zoom distortion
        const stage = document.getElementById('canvasScaleStage');
        const prevStageTransform = stage ? stage.style.transform : '';
        const prevStageOrigin = stage ? stage.style.transformOrigin : '';
        if (stage) {
            stage.style.transform = 'none';
            stage.style.transformOrigin = '0 0';
        }

        const prevTransform = domNode.style.transform;
        const prevOrigin = domNode.style.transformOrigin;
        domNode.style.transform = 'none';
        domNode.style.transformOrigin = '0 0';

        // 3. Remove selection rings temporarily and hide ONLY interactive toolbars/handles
        const ringedElements = domNode.querySelectorAll('[class*="ring-2"], [class*="ring-offset"]');
        const prevRingClasses = [];
        ringedElements.forEach(el => {
            const rings = Array.from(el.classList).filter(c => c.startsWith('ring-'));
            if (rings.length > 0) {
                prevRingClasses.push({ el, rings });
                rings.forEach(r => el.classList.remove(r));
            }
        });

        // Hide actual floating toolbars, resize handles, and guides (NEVER hide the layer itself!)
        const handles = domNode.querySelectorAll('.layer-toolbar, .layer-resize-handle, .reel-resize-handle, .snap-guide');
        const prevHandleDisplays = [];
        handles.forEach(h => {
            prevHandleDisplays.push({ el: h, display: h.style.display });
            h.style.setProperty('display', 'none', 'important');
        });

        const draggables = domNode.querySelectorAll('.draggable-layer, [data-drag-id]');
        draggables.forEach(d => {
            d.style.outline = 'none';
            d.style.boxShadow = 'none';
        });

        // 4. Force full opacity and freeze animations during capture so exports are crisp & complete
        state.isCapturingExport = true;
        const animLayers = domNode.querySelectorAll('.reel-anim-layer');
        const prevAnimStyles = [];
        animLayers.forEach(el => {
            prevAnimStyles.push({
                el,
                animation: el.style.animation,
                opacity: el.style.opacity,
                transform: el.style.transform
            });
            el.style.setProperty('animation', 'none', 'important');
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('transform', 'none', 'important');
        });

        // 5. Pre-decode all images inside slide & ensure proxy + CORS
        const imgs = Array.from(domNode.querySelectorAll('img'));
        imgs.forEach(img => {
            if (img.classList && img.classList.contains('emoji')) {
                img.style.display = 'none';
                return;
            }
            if (img.src && (img.src.startsWith('http://') || img.src.startsWith('https://'))) {
                const proxied = toProxyUrl(img.src);
                if (img.src !== proxied) {
                    img.src = proxied;
                }
            }
            if (!img.crossOrigin) {
                img.crossOrigin = 'anonymous';
            }
        });

        await Promise.all(imgs.map(img => {
            if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
            return new Promise(res => {
                img.onload = res;
                img.onerror = res;
                setTimeout(res, 1500);
            });
        }));

        let resultUrl = '';

        try {
            // 6. Capture at native 450x800 with pixelRatio 2.4 => EXACTLY 1080x1920 Full HD!
            if (window.htmlToImage && typeof window.htmlToImage.toPng === 'function') {
                try {
                    resultUrl = await window.htmlToImage.toPng(domNode, {
                        pixelRatio: 2.4,
                        width: 450,
                        height: 800,
                        skipFonts: true, // Prevents cross-origin CSSStyleSheet security crashes
                        cacheBust: false,
                        filter: (node) => {
                            if (node.classList && (
                                node.classList.contains('reel-resize-handle') ||
                                node.classList.contains('layer-toolbar') ||
                                node.classList.contains('snap-guide') ||
                                node.classList.contains('layer-resize-handle')
                            )) {
                                return false;
                            }
                            if (node.tagName === 'IMG') {
                                if (node.classList && node.classList.contains('emoji')) return false;
                                if (node.complete && node.naturalWidth === 0) return false;
                            }
                            return true;
                        },
                        style: {
                            transform: 'none',
                            transformOrigin: '0 0',
                            margin: '0',
                            left: '0',
                            top: '0'
                        }
                    });
                } catch (e) {
                    console.warn('[Reels Video] htmlToImage note:', e.message || e);
                }
            }

            if (!resultUrl && window.html2canvas) {
                try {
                    const c = await window.html2canvas(domNode, {
                        scale: 2.4,
                        width: 450,
                        height: 800,
                        x: 0,
                        y: 0,
                        scrollX: 0,
                        scrollY: 0,
                        useCORS: true,
                        allowTaint: false,
                        logging: false,
                        ignoreElements: (el) => {
                            if (!el) return false;
                            if (el.classList && (
                                el.classList.contains('reel-resize-handle') ||
                                el.classList.contains('layer-toolbar') ||
                                el.classList.contains('snap-guide') ||
                                el.classList.contains('layer-resize-handle')
                            )) return true;
                            if (el.tagName === 'IMG' && (el.classList.contains('emoji') || (el.complete && el.naturalWidth === 0))) return true;
                            return false;
                        }
                    });
                    resultUrl = c.toDataURL('image/png');
                } catch (e) {
                    console.warn('[Reels Video] html2canvas fallback note:', e.message || e);
                }
            }
        } finally {
            // 7. Restore original viewport transform, handles and animation states
            state.isCapturingExport = false;
            state.selectedDragElement = prevSelected;
            prevAnimStyles.forEach(item => {
                item.el.style.animation = item.animation;
                item.el.style.opacity = item.opacity;
                item.el.style.transform = item.transform;
            });
            domNode.style.transform = prevTransform;
            domNode.style.transformOrigin = prevOrigin;
            if (stage) {
                stage.style.transform = prevStageTransform;
                stage.style.transformOrigin = prevStageOrigin;
            }
            prevHandleDisplays.forEach(item => {
                item.el.style.display = item.display;
            });
            prevRingClasses.forEach(item => {
                item.rings.forEach(r => item.el.classList.add(r));
            });
        }

        return resultUrl;
    }

    function createSilentAudioTrack() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            const ctx = new AudioCtx();
            const dest = ctx.createMediaStreamDestination();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            // Virtually silent audio anchors timestamps for TikTok & Insta Reels transcoding
            gain.gain.value = 0.0001;
            osc.connect(gain);
            gain.connect(dest);
            osc.start();
            return {
                track: dest.stream.getAudioTracks()[0],
                stop: () => {
                    try {
                        osc.stop();
                        ctx.close();
                    } catch (e) {}
                }
            };
        } catch (e) {
            console.warn('[Reels Video] Silent audio track note:', e.message);
            return null;
        }
    }

    function showVideoDownloadModal(filename, downloadUrl, desktopFile) {
        const existing = document.getElementById('videoDownloadSuccessModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'videoDownloadSuccessModal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[9999999] flex items-center justify-center p-4 transition-all duration-300';
        modal.style.direction = 'rtl';
        modal.innerHTML = `
            <div class="bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-emerald-500/70 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 shadow-2xl shadow-emerald-950/50">
                <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner">
                    🎬
                </div>
                
                <div class="space-y-1.5">
                    <h3 class="text-white text-xl sm:text-2xl font-black">تم تصدير الفيديو بنجاح فائق! 🎉</h3>
                    <p class="text-zinc-400 text-xs sm:text-sm font-medium">بدقة 1080x1920 Full HD مع كامل الأنيميشن والصوت الأصلي</p>
                </div>

                <div class="bg-emerald-950/50 border border-emerald-500/40 rounded-2xl p-4 text-right space-y-2">
                    <div class="flex items-center gap-2 text-emerald-400 text-xs font-black">
                        <span>⚡</span>
                        <span>تم حفظ الفيديو تلقائياً على جهازك:</span>
                    </div>
                    <ul class="text-zinc-300 text-xs font-semibold space-y-1 pr-4 list-disc">
                        <li>على <span class="text-white font-bold">سطح المكتب (Desktop)</span> باسم: <br><span class="text-emerald-300 font-mono text-[11px] select-all underline">${desktopFile || 'Reel_FC27_ShopCoin15_Latest.mp4'}</span></li>
                        <li>في مجلد <span class="text-white font-bold">التنزيلات (Downloads)</span> باسم: <br><span class="text-emerald-300 font-mono text-[11px] select-all underline">${filename}</span></li>
                    </ul>
                </div>

                <div class="space-y-2.5 pt-1">
                    <a href="${downloadUrl}" download="${filename}" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition transform active:scale-98 cursor-pointer">
                        <span>📥 تحميل مباشر إلى المتصفح الآن</span>
                    </a>
                    <button type="button" onclick="document.getElementById('videoDownloadSuccessModal').remove()" class="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition">
                        إغلاق النافذة
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Unified 100% Native 1080x1920 Studio Reel Recorder (Async Queue with Realtime Polling)
    async function recordStudioReelViaServer(filename, progressCallback) {
        const apiUrl = getReelsApiUrl('/api/record-studio-reel');

        const projectState = {
            activeSection: state.activeSection,
            theme: state.theme,
            fontFamily: state.fontFamily,
            title: state.title,
            subtitle: state.subtitle,
            badge: state.badge,
            slides: state.slides,
            currentSlideIndex: 0,
            slideDuration: state.slideDuration,
            layouts: state.layouts,
            animationsEnabled: state.animationsEnabled,
            elementAnimations: state.elementAnimations,
            progressBar: state.progressBar,
            slideTransition: state.slideTransition
        };

        const curAudioState = (typeof getAudioState === 'function') ? getAudioState() : audioState;
        const totalSec = state.slides.reduce((acc, s) => acc + (s.duration || state.slideDuration || 2.5), 0);

        if (progressCallback) {
            progressCallback(`🚀 بدء تجهيز مهمة تصدير الريلز بدقة 1080x1920 (${totalSec.toFixed(1)} ثانية)...`);
        }

        let initRes;
        try {
            initRes = await fetch(apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, */*'
                },
                body: JSON.stringify({
                    projectState,
                    audioState: curAudioState,
                    filename: filename || `Reel_FC27_ShopCoin15_${Date.now()}.mp4`
                })
            });
        } catch (netErr) {
            console.error('[Record Studio Reel Fetch Error]', netErr);
            throw new Error(`تعذر الاتصال بمحرك تسجيل الفيديو عالي الدقة (1080x1920). يرجى التأكد من تشغيل السيرفر.`);
        }

        if (!initRes.ok) {
            let errMsg = 'فشل تسجيل الفيديو في السيرفر';
            try {
                const errJson = await initRes.json();
                if (errJson.error) errMsg = errJson.error;
            } catch(e) {}
            throw new Error(errMsg);
        }

        let initData;
        try {
            initData = await initRes.json();
        } catch (e) {
            throw new Error('فشل قراءة رد السيرفر الأولي');
        }

        if (!initData.success) {
            throw new Error(initData.error || 'فشل بدء تسجيل الفيديو');
        }

        // If server responded directly with binary or non-job format (backward compat)
        if (!initData.jobId) {
            return initData;
        }

        const jobId = initData.jobId;
        const statusUrl = getReelsApiUrl(`/api/reel-job-status?jobId=${encodeURIComponent(jobId)}`);

        // Poll every 1.2s until job completes or fails (safety timeout 5 minutes = 300s)
        const pollStart = Date.now();
        while (Date.now() - pollStart < 300000) {
            await new Promise(r => setTimeout(r, 1200));

            let statusRes;
            try {
                statusRes = await fetch(statusUrl, { cache: 'no-store' });
            } catch (pollErr) {
                console.warn('[Poll Job Status Warning]', pollErr);
                continue;
            }

            if (!statusRes.ok) continue;

            const job = await statusRes.json().catch(() => null);
            if (!job || !job.success) continue;

            if (progressCallback) {
                const p = job.progress || 0;
                const msg = job.message || 'جاري إنتاج الفيديو...';
                progressCallback(`${msg} (${p}%)`);
            }

            if (job.status === 'done') {
                const downloadUrl = getReelsApiUrl(job.downloadUrl || `/api/download-reel?jobId=${encodeURIComponent(jobId)}`);
                let blob = null;
                try {
                    const blobRes = await fetch(downloadUrl);
                    if (blobRes.ok) {
                        blob = await blobRes.blob();
                    }
                } catch (bErr) {
                    console.warn('[Blob Download Warning]', bErr);
                }

                return {
                    success: true,
                    jobId,
                    filename: job.filename || filename || `Reel_FC27_ShopCoin15_${Date.now()}.mp4`,
                    downloadUrl,
                    desktopFile: job.desktopFile || 'Reel_FC27_ShopCoin15_Latest.mp4',
                    savedDesktop: job.savedDesktop,
                    sizeMB: job.sizeMB,
                    blob
                };
            }

            if (job.status === 'error') {
                throw new Error(job.error || 'حدث خطأ أثناء تسجيل الفيديو في السيرفر');
            }
        }

        throw new Error('استغرق تسجيل الفيديو وقتاً طويلاً وتجاوز المهلة المحددة.');
    }

    // Forward legacy calls directly to the native 1080x1920 recorder with 0% fake zoom
    async function recordReelVideoBlob(progressCallback) {
        const outName = `Reel_FC27_ShopCoin15_${Date.now()}.mp4`;
        const res = await recordStudioReelViaServer(outName, (msg) => {
            if (progressCallback) progressCallback(1, 1, msg);
        });
        if (res.blob) return { blob: res.blob, mimeType: 'video/mp4' };
        if (res.downloadUrl) {
            const blob = await (await fetch(getReelsApiUrl(res.downloadUrl))).blob();
            return { blob, mimeType: 'video/mp4' };
        }
        throw new Error('تعذر استلام ملف الفيديو');
    }

    function getReelsApiUrl(endpoint) {
        if (typeof window !== 'undefined') {
            const loc = window.location;
            if (loc.protocol === 'file:') {
                return `http://127.0.0.1:3000${endpoint}`;
            }
        }
        return endpoint;
    }

    async function exportReelVideo() {
        const btns = Array.from(document.querySelectorAll('#btnExportVideo, #btnExportVideoFloating, .btn-export-reel-action'));
        const origTexts = btns.map(b => b.innerHTML);
        btns.forEach(b => {
            b.disabled = true;
            b.innerHTML = '<span>⏳ جاري تشغيل محرك التسجيل الفائق 1080x1920...</span>';
        });

        try {
            if (window.showCopyToast) {
                window.showCopyToast('بدأ تسجيل وتصدير ريلز الأنيميشن بجودة 1080x1920 Full HD مع كامل الحركات والصوت.. 🎬⚡');
            }

            const defaultFilename = `Reel_FC27_ShopCoin15_${Date.now()}.mp4`;
            const result = await recordStudioReelViaServer(defaultFilename, (msg) => {
                btns.forEach(b => {
                    b.innerHTML = `<span>⏳ ${msg}</span>`;
                });
            });

            const finalName = result.filename || defaultFilename;
            const downloadUrl = result.downloadUrl ? getReelsApiUrl(result.downloadUrl) : (result.blob ? URL.createObjectURL(result.blob) : '');
            const desktopFile = result.desktopFile || 'Reel_FC27_ShopCoin15_Latest.mp4';

            if (downloadUrl) {
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = finalName;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    if (document.body.contains(a)) document.body.removeChild(a);
                }, 60000);
            }

            // Always show the unmissable modal with direct download button and desktop path
            showVideoDownloadModal(finalName, downloadUrl, desktopFile);

            if (window.showCopyToast) {
                window.showCopyToast('تم تصدير وحفظ الفيديو بنجاح على سطح المكتب والتنزيلات! 🚀🎉');
            }
        } catch (err) {
            console.error('Video export error:', err);
            alert('تعذر تصدير الفيديو: ' + err.message);
            if (window.showCopyToast) {
                window.showCopyToast('❌ تعذر تصدير الفيديو: ' + err.message);
            }
        } finally {
            btns.forEach((b, idx) => {
                b.disabled = false;
                b.innerHTML = origTexts[idx] || (b.id === 'btnExportVideo' ? '<span>🎬 تحميل فيديو الريل الأصلي (MP4 - 1080x1920 Full HD)</span>' : '<span>🎬 تحميل فيديو</span>');
            });
        }
    }

    // ---- 12. TIKTOK AUTO PUBLISHING & OAUTH ----
    let tiktokStatus = { connected: false, username: null, scope: null };

    async function checkTikTokStatus() {
        try {
            const savedToken = localStorage.getItem('shopcoin15_tiktok_token') || '';
            const res = await fetch('/api/tiktok/status', {
                headers: savedToken ? { 'Authorization': 'Bearer ' + savedToken } : {}
            });
            const data = await res.json();
            if (savedToken && !data.connected) {
                data.connected = true;
                data.username = localStorage.getItem('shopcoin15_tiktok_user') || 'shop_coin15';
            }
            if (data.scope) {
                localStorage.setItem('shopcoin15_tiktok_scope', data.scope);
            }
            tiktokStatus = data;

            const scope = data.scope || localStorage.getItem('shopcoin15_tiktok_scope') || '';
            const hasDirect = scope.includes('video.publish');

            const badge = document.getElementById('tiktokStatusBadge');
            const actionArea = document.getElementById('tiktokActionBtnArea');
            const btnPublish = document.getElementById('btnPublishTikTok');

            if (data.connected) {
                if (badge) {
                    if (hasDirect) {
                        badge.className = 'text-[9.5px] px-2 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-300 border border-emerald-700';
                        badge.innerHTML = `🟢 متصل: نشر مباشر (@${data.username || 'shop_coin15'})`;
                    } else {
                        badge.className = 'text-[9.5px] px-2 py-0.5 rounded-full font-bold bg-amber-950 text-amber-300 border border-amber-700';
                        badge.innerHTML = `🟡 متصل: مسودات فقط (@${data.username || 'shop_coin15'})`;
                    }
                }
                if (actionArea) {
                    actionArea.innerHTML = `
                        <div class="flex items-center gap-1.5">
                            ${!hasDirect ? `
                            <button type="button" onclick="ReelsEngine.reconnectDirectPublish()" class="px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-[10px] font-black transition shadow-sm animate-pulse" title="إعادة الربط لتفعيل النشر المباشر">
                                تفعيل النشر المباشر ⚡
                            </button>` : ''}
                            <button type="button" onclick="ReelsEngine.disconnectTikTok()" class="px-2 py-0.5 rounded bg-zinc-800 hover:bg-rose-900 text-zinc-400 hover:text-rose-200 text-[10px] font-bold transition">
                                إلغاء الربط
                            </button>
                        </div>
                    `;
                }
                if (btnPublish) {
                    btnPublish.innerHTML = `<span>🚀 نشر الريل على تيك توك (@${data.username || 'shop_coin15'})</span>`;
                }
            } else {
                if (badge) {
                    badge.className = 'text-[9.5px] px-2 py-0.5 rounded-full font-bold bg-zinc-800 text-zinc-400 border border-zinc-700';
                    badge.innerHTML = 'غير مربوط';
                }
                if (actionArea) {
                    actionArea.innerHTML = `
                        <button type="button" onclick="ReelsEngine.loginTikTok()" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#FE2C55] to-[#ff0050] hover:brightness-110 text-[10.5px] font-black text-white transition shadow-sm">
                            🔗 ربط تيك توك
                        </button>
                    `;
                }
                if (btnPublish) {
                    btnPublish.innerHTML = `<span>🔗 اربط تيك توك للنشر المباشر</span>`;
                }
            }
        } catch (e) {
            console.warn('[TikTok Status Notice]', e.message);
        }
    }

    function loginTikTok() {
        window.location.href = '/api/tiktok/login';
    }

    function reconnectDirectPublish() {
        localStorage.removeItem('shopcoin15_tiktok_token');
        localStorage.removeItem('shopcoin15_tiktok_user');
        localStorage.removeItem('shopcoin15_tiktok_scope');
        loginTikTok();
    }

    async function disconnectTikTok() {
        if (!confirm('هل تريد بالتأكيد إلغاء ربط حساب تيك توك؟')) return;
        try {
            localStorage.removeItem('shopcoin15_tiktok_token');
            localStorage.removeItem('shopcoin15_tiktok_user');
            localStorage.removeItem('shopcoin15_tiktok_scope');
            await fetch('/api/tiktok/disconnect', { method: 'POST' });
            if (window.showCopyToast) window.showCopyToast('تم إلغاء ربط الحساب بنجاح.');
            await checkTikTokStatus();
        } catch (e) {
            alert('حدث خطأ: ' + e.message);
        }
    }

    async function publishToTikTok() {
        if (!tiktokStatus.connected) {
            loginTikTok();
            return;
        }

        const btn = document.getElementById('btnPublishTikTok');
        const statusBox = document.getElementById('tiktokPublishStatus');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>⏳ جاري معالجة الفيديو بجودة فائقة...</span>';
        }
        if (statusBox) {
            statusBox.className = 'text-[11px] p-2 rounded-xl text-center font-bold bg-zinc-800 text-zinc-300 block';
            statusBox.textContent = '⏳ جاري التقاط السلايدات وتوليد فيديو عالي الدقة...';
        }

        try {
            const recResult = await recordStudioReelViaServer('tiktok_reel.mp4', (msg) => {
                if (btn) btn.innerHTML = `<span>⏳ ${msg}</span>`;
                if (statusBox) statusBox.textContent = `⏳ ${msg}`;
            });

            let blob = recResult.blob;
            if (!blob && recResult.downloadUrl) {
                blob = await (await fetch(getReelsApiUrl(recResult.downloadUrl))).blob();
            }
            if (!blob) throw new Error('فشل استلام ملف الفيديو للنشر');

            if (btn) btn.innerHTML = '<span>🚀 جاري رفع الفيديو لتيك توك...</span>';
            if (statusBox) statusBox.textContent = '🚀 جاري الاتصال بـ TikTok API ونشر الفيديو مباشرة...';

            // Convert Blob to Base64
            const reader = new FileReader();
            const base64Promise = new Promise((res, rej) => {
                reader.onloadend = () => res(reader.result);
                reader.onerror = rej;
            });
            reader.readAsDataURL(blob);
            const videoBase64 = await base64Promise;

            // Prepare Caption
            const caption = `${state.title || 'أقوى كروت EA FC 27'} ⚡\n\nمتجر ShopCoin15 لشحن كوينز فيفا بأمان وسرعة 100% 👑\nللطلب حياك عبر الرابط بالبايو! 📩\n\n#eafc27 #fc27 #fifa #fut #shopcoin15 #gaming`;

            const savedToken = localStorage.getItem('shopcoin15_tiktok_token') || '';
            const privacySelector = document.getElementById('tiktokPrivacyLevel');
            const chosenPrivacy = privacySelector ? privacySelector.value : 'PUBLIC_TO_EVERYONE';

            const res = await fetch('/api/tiktok/publish', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(savedToken ? { 'Authorization': 'Bearer ' + savedToken } : {})
                },
                body: JSON.stringify({
                    videoBase64,
                    caption,
                    privacyLevel: chosenPrivacy,
                    accessToken: savedToken
                })
            });

            const data = await res.json();
            if (data.success) {
                if (statusBox) {
                    statusBox.className = 'text-[11px] p-2.5 rounded-xl text-center font-black bg-emerald-950 text-emerald-300 border border-emerald-600 block';
                    statusBox.innerHTML = `🎉 ${data.message || 'تم نشر الريلز في حساب تيك توك مباشرة بنجاح!'} ✨`;
                }
                if (window.showCopyToast) {
                    window.showCopyToast('تم نشر الريلز في حساب تيك توك مباشرة بنجاح! 🚀👑');
                }
            } else {
                throw new Error(data.error || 'تعذر إتمام النشر');
            }
        } catch (err) {
            console.error('TikTok publish error:', err);
            if (statusBox) {
                statusBox.className = 'text-[11px] p-2.5 rounded-xl text-center font-bold bg-rose-950 text-rose-300 border border-rose-800 block';
                statusBox.textContent = '❌ خطأ: ' + err.message;
            }
            alert('حدث خطأ أثناء النشر على تيك توك:\n' + err.message);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = origHtml;
            }
        }
    }

    async function exportAllSlidesBatch() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        state.showSafeZone = false;
        state.dragEnabled = false;
        hideMagnetGuides();
        pausePlayback();

        if (window.showCopyToast) {
            window.showCopyToast(`جاري استخراج ${state.slides.length} سلايد بجودة 4K فائقة... 📸✨`);
        }

        for (let i = 0; i < state.slides.length; i++) {
            state.currentSlideIndex = i;
            renderCanvas();
            await new Promise(r => setTimeout(r, 400));
            await window.CanvasExporter.downloadNative('exportCanvas', 'jpg', `reel_fc27_slide_${i + 1}`);
        }

        state.showSafeZone = prevSafe;
        state.dragEnabled = prevDrag;
        state.currentSlideIndex = 0;
        renderCanvas();

        if (window.showCopyToast) {
            window.showCopyToast('تم تنزيل جميع السلايدات بجودة 4K! 👑');
        }
    }

    async function sendReelVideoTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        if (!window.TelegramManager.isConfigured()) {
            window.TelegramManager.openSettingsModal();
            window.TelegramManager.showStatus('info', '💡 يرجى إدخال رمز البوت والـ Chat ID لتفعيل إرسال فيديو الريلز للتليجرام!');
            return;
        }

        const btnSide = document.getElementById('btnSendReelVideoTelegram');
        const origSideHtml = btnSide ? btnSide.innerHTML : '';
        const allTgBtns = document.querySelectorAll('.btn-telegram-action, #btnSendReelVideoTelegram');

        allTgBtns.forEach(b => {
            b.disabled = true;
            b.classList.add('opacity-70', 'pointer-events-none');
        });

        if (btnSide) {
            btnSide.innerHTML = '<span>⏳ جاري معالجة وتجهيز فيديو الريلز...</span>';
        }
        if (window.showCopyToast) {
            window.showCopyToast('🎬 بدأ تسجيل فيديو الريلز (60FPS) وتجهيزه للإرسال عبر تيليجرام...');
        }

        try {
            const defaultFileName = `Reel_FC27_ShopCoin15_${Date.now()}.mp4`;
            const recResult = await recordStudioReelViaServer(defaultFileName, (msg) => {
                if (btnSide) btnSide.innerHTML = `<span>⏳ ${msg}</span>`;
            });

            let blob = recResult.blob;
            if (!blob && recResult.downloadUrl) {
                blob = await (await fetch(getReelsApiUrl(recResult.downloadUrl))).blob();
            }
            if (!blob) throw new Error('فشل استلام ملف الفيديو لتيليجرام');

            if (btnSide) {
                btnSide.innerHTML = '<span>🚀 جاري رفع الفيديو إلى تيليجرام...</span>';
            }
            if (window.showCopyToast) {
                window.showCopyToast('🚀 جاري رفع فيديو الريلز عالي الجودة إلى تيليجرام مباشرة...');
            }

            const totalDuration = state.slides.reduce((acc, s) => acc + (s.duration || 2.5), 0);

            const caption = `🎬 فيديو ريلز متجر ShopCoin15 جاهز للنشر! 🚀✨
📌 ${state.title || 'أقوى كروت ومقارنات FC 27'}
📝 ${state.subtitle || ''}
⏱️ مدة الفيديو: ${totalDuration.toFixed(1)} ثانية (${state.slides.length} سلايدات)

👑 @shop_coin15 | متجر كوينز FC 27`;

            await window.TelegramManager.sendVideoInternal(blob, caption, null, finalFileName);

            if (window.showCopyToast) {
                window.showCopyToast('تم إرسال فيديو الريلز إلى تيليجرام بنجاح! 🚀📱 افتح التيليجرام لمشاهدته وتنزيله');
            }
        } catch (err) {
            console.error('Reel Telegram video error:', err);
            alert('حدث خطأ أثناء إرسال فيديو الريلز للتليجرام:\n' + err.message);
        } finally {
            allTgBtns.forEach(b => {
                b.disabled = false;
                b.classList.remove('opacity-70', 'pointer-events-none');
            });
            if (btnSide) {
                btnSide.innerHTML = origSideHtml || '<span>🚀 إرسال فيديو الريلز إلى تيليجرام (60FPS كامل مع الصوت)</span>';
            }
        }
    }

    async function sendReelSlideTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        state.showSafeZone = false;
        state.dragEnabled = false;
        hideMagnetGuides();
        renderCanvas();
        await new Promise(r => setTimeout(r, 200));

        const caption = `🖼️ سلايد ريلز FC 27 (${state.currentSlideIndex + 1}/${state.slides.length}):
${state.title}
${state.subtitle}

@shop_coin15`;

        try {
            await window.TelegramManager.sendDesignInternal('exportCanvas', caption);
            if (window.showCopyToast) {
                window.showCopyToast('تم إرسال السلايد صورة لتليجرام بنجاح! 🖼️📱');
            }
        } catch (e) {
            alert('تعذر إرسال السلايد للتليجرام: ' + e.message);
        } finally {
            state.showSafeZone = prevSafe;
            state.dragEnabled = prevDrag;
            renderCanvas();
        }
    }

    // Default Telegram action for Reels Studio is sending the full video
    const sendReelTelegram = sendReelVideoTelegram;

    // Initial setup & Persistent project state restoration
    let bootSection = 'countdown';
    try {
        const savedActive = localStorage.getItem(PROJECT_STORAGE_KEY_PREFIX + 'last_active');
        if (savedActive && ['countdown', 'versus'].includes(savedActive)) {
            bootSection = savedActive;
        }
    } catch (e) {}

    const restored = loadSavedProjectForSection(bootSection);
    if (!restored) {
        initSection(bootSection);
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('tiktok_connected') === '1') {
            const u = urlParams.get('username') || '';
            const t = urlParams.get('token') || '';
            const r = urlParams.get('refresh') || '';
            const s = urlParams.get('scope') || '';
            if (t) localStorage.setItem('shopcoin15_tiktok_token', t);
            if (r) localStorage.setItem('shopcoin15_tiktok_refresh', r);
            if (u) localStorage.setItem('shopcoin15_tiktok_user', u);
            if (s) localStorage.setItem('shopcoin15_tiktok_scope', s);

            setTimeout(() => {
                const isDirect = s.includes('video.publish');
                if (window.showCopyToast) {
                    window.showCopyToast(`🎉 تم ربط حساب تيك توك بنجاح (@${u || 'shop_coin15'})! ${isDirect ? 'مفعل للنشر المباشر 👑' : 'وضع المسودات 📝'}`);
                }
                checkTikTokStatus();
            }, 800);
        } else if (urlParams.get('tiktok_error')) {
            setTimeout(() => {
                alert('فشل ربط تيك توك: ' + urlParams.get('tiktok_error'));
            }, 800);
        }
    } catch (e) {}

    return {
        getState: () => state,
        switchSection,
        setFontFamily,
        applyIdea,
        loadIdeaById,
        playPlayback,
        pausePlayback,
        togglePlayPause,
        nextSlide,
        prevSlide,
        goToSlide,
        setSlideDuration,
        toggleSafeZone,
        toggleDragLock,
        toggleMagnet,
        centerSelectedElement,
        nudgeSelected,
        setSelectedElement,
        setScaleSelected,
        adjustScaleSelected,
        saveLayoutPositions,
        resetLayoutPositions,
        addPlayerSlide,
        addSlide,
        deleteCurrentSlide,
        toggleElementVisibility,
        setCurrentSlideDuration,
        adjustCurrentSlideDuration,
        applyDurationToAllPlayerCards,
        updateCurrentSlideField,
        updateVersusField,
        setPlayerPriceQuick,
        clearPlayerPrice,
        setVersusPlayerPrice,
        updateTitle,
        updateTitleFromTextarea,
        updateTitleLine,
        addTitleLine,
        removeTitleLine,
        formatTitleLinesCount,
        resetSectionToDefault,
        saveProjectState,
        loadSavedProjectForSection,
        updateBadges,
        fetchPlayerCardData,
        applyStarPresetToSlide,
        handleCardImageUpload,
        REELS_PRESET_STARS,
        replaySlideAnimations,
        toggleAnimationsMaster,
        applyAnimationPreset,
        setElementAnimation,
        testElementAnimation,
        renderCanvas,
        renderEditorControls,
        renderPlayerToolbar,
        captureSlideImage,
        showVideoDownloadModal,
        exportReelVideo,
        recordReelVideoBlob,
        exportAllSlidesBatch,
        sendReelTelegram,
        sendReelVideoTelegram,
        sendReelSlideTelegram,
        checkTikTokStatus,
        loginTikTok,
        reconnectDirectPublish,
        disconnectTikTok,
        publishToTikTok,
        toggleAudioMaster,
        toggleSfxMaster,
        toggleBgmMaster,
        setSfxVolume,
        setBgmVolume,
        testSfx,
        toggleBgmAudition,
        selectMusicTrack,
        openMusicModal,
        closeMusicModal,
        filterMusicCategory,
        filterMusicSearch,
        handleBgmUpload,
        removeCustomBgm,
        REELS_MUSIC_LIBRARY,
        getAudioState: () => audioState,
        toggleSlideSfx,
        muteSlideSfx,
        enableAllSlideSfx,
        applySlideSfxToAllSlides,
        getSlideSfxConfig,
        toggleProgressBar,
        setProgressBarStyle,
        setProgressBarColor,
        setProgressBarThickness,
        REELS_PROGRESS_STYLES,
        setSlideTransitionType,
        setSlideTransitionDuration,
        toggleSlideTransitionSound,
        testSlideTransition,
        REELS_SLIDE_TRANSITIONS,
        getSlideTransitionState: () => state.slideTransition,
        toggleBadgeOnCurrentSlide,
        addCustomBadgeToCurrentSlide,
        removeBadgeFromCurrentSlide,
        clearSlideBadges,
        applyBadgesToAllPlayerCards,
        REELS_PRESET_BADGES,
        getProgressBarState: () => state.progressBar,
        getState: () => state,
        loadProject,
        setAudioState,
        renderMasterAudioWav,
        recordStudioReelViaServer
    };
})();
