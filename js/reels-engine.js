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
    const STORAGE_KEY = 'shopcoin15_reel_layouts_v5';

    // ---- 1. DEFAULT PERFECT-ALIGNED LAYOUTS (Percentages) ----
    const DEFAULT_LAYOUTS = {
        countdown: {
            rank: { top: 7.5, left: 50, scale: 1.0 },
            title: { top: 16.5, left: 50, scale: 1.0 },
            card: { top: 28.5, left: 50, scale: 1.0 },
            playerName: { top: 78.5, left: 50, scale: 1.0 },
            fcLogo: { top: 4, left: 88, scale: 1.0 },
            scLogo: { top: 91, left: 50, scale: 1.0 },
            // Intro slide elements
            introBadge: { top: 20, left: 50, scale: 1.0 },
            introTitle: { top: 28, left: 50, scale: 1.0 },
            introSubtitle: { top: 56, left: 50, scale: 1.0 },
            introCta: { top: 66, left: 50, scale: 1.0 },
            // Outro slide elements
            outroLogo: { top: 16, left: 50, scale: 1.0 },
            outroTitle: { top: 28, left: 50, scale: 1.0 },
            outroSubtitle: { top: 35, left: 50, scale: 1.0 },
            outroFeatures: { top: 44, left: 50, scale: 1.0 },
            outroCta: { top: 75, left: 50, scale: 1.0 }
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
            // Outro slide elements
            outroLogo: { top: 16, left: 50, scale: 1.0 },
            outroTitle: { top: 28, left: 50, scale: 1.0 },
            outroSubtitle: { top: 35, left: 50, scale: 1.0 },
            outroFeatures: { top: 44, left: 50, scale: 1.0 },
            outroCta: { top: 75, left: 50, scale: 1.0 }
        }
    };

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

    function ensureSelectedDragElement() {
        const elements = getCurrentSlideElements();
        if (elements.length === 0) return;
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
                hideCta: false
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
                    hideCta: false
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
        if (!state.dragEnabled) return;

        // 1. Check if clicking on resize handle
        const resizeHandle = e.target.closest('[data-resize-id]');
        if (resizeHandle) {
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
        if (!target) return;

        e.preventDefault();
        e.stopPropagation();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const canvas = document.getElementById('exportCanvas');
        const canvasRect = canvas.getBoundingClientRect();

        const dragId = target.getAttribute('data-drag-id');
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
            canvasRect: canvasRect
        };

        // Visual selection indicator
        document.querySelectorAll('[data-drag-id]').forEach(el => el.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-2', 'shadow-2xl'));
        target.classList.add('ring-2', 'ring-emerald-400', 'ring-offset-2', 'shadow-2xl');
        updateSelectedElementInPanel();
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
            if (activeDrag.target) {
                activeDrag.target.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-2', 'shadow-2xl');
            }
            activeDrag = null;
            hideMagnetGuides();
            renderCanvas();
            renderEditorControls();
            saveProjectState();
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
        state.selectedDragElement = elemId;
        renderCanvas();
        renderEditorControls();
    }

    function centerSelectedElement() {
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement || (state.activeSection === 'countdown' ? 'card' : 'cardA');
        if (!secLayout[dragId]) secLayout[dragId] = {};
        secLayout[dragId].left = 50.0;
        renderCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast('تم ضبط العنصر في المنتصف تماماً 50% 🎯');
        }
    }

    function nudgeSelected(dir, amount = 1.0) {
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement || (state.activeSection === 'countdown' ? 'card' : 'cardA');
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
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement || (state.activeSection === 'countdown' ? 'card' : 'cardA');
        if (!secLayout[dragId]) secLayout[dragId] = {};
        secLayout[dragId].scale = parseFloat(val) || 1.0;
        renderCanvas();
        updateLiveScaleDisplay(secLayout[dragId].scale);
    }

    function adjustScaleSelected(delta) {
        const secLayout = state.layouts[state.activeSection];
        const dragId = state.selectedDragElement || (state.activeSection === 'countdown' ? 'card' : 'cardA');
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
        if (select && state.selectedDragElement) {
            select.value = state.selectedDragElement;
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
                hideCta: false
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
                        <img src="${pObj.cardUrl || 'assets/placeholder_card.png'}" alt="Card" class="max-h-full max-w-full object-contain">
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
    function playPlayback() {
        if (state.isPlaying) return;
        state.isPlaying = true;
        updatePlayerUi();

        const tickMs = 50;
        let elapsed = 0;

        const getCurSlideMs = () => {
            const slide = state.slides[state.currentSlideIndex];
            return ((slide && slide.duration) || state.slideDuration || 2.5) * 1000;
        };

        if (state.playbackTimer) clearInterval(state.playbackTimer);

        state.playbackTimer = setInterval(() => {
            elapsed += tickMs;
            const curSlideMs = getCurSlideMs();
            state.timelineProgress = Math.min(100, (elapsed / curSlideMs) * 100);

            const bars = [document.getElementById('reelTimelineBar'), document.getElementById('toolbarTimelineBar')];
            bars.forEach(b => { if (b) b.style.width = `${state.timelineProgress}%`; });

            if (elapsed >= curSlideMs) {
                elapsed = 0;
                state.timelineProgress = 0;
                if (state.currentSlideIndex < state.slides.length - 1) {
                    state.currentSlideIndex++;
                } else {
                    state.currentSlideIndex = 0;
                }
                ensureSelectedDragElement();
                renderCanvas();
                renderEditorControls();
                updatePlayerUi();
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
        const bars = [document.getElementById('reelTimelineBar'), document.getElementById('toolbarTimelineBar')];
        bars.forEach(b => { if (b) b.style.width = '0%'; });
        updatePlayerUi();
    }

    function togglePlayPause() {
        if (state.isPlaying) pausePlayback();
        else playPlayback();
    }

    function nextSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex < state.slides.length - 1) ? state.currentSlideIndex + 1 : 0;
        ensureSelectedDragElement();
        renderCanvas();
        renderEditorControls();
        updatePlayerUi();
    }

    function prevSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex > 0) ? state.currentSlideIndex - 1 : state.slides.length - 1;
        ensureSelectedDragElement();
        renderCanvas();
        renderEditorControls();
        updatePlayerUi();
    }

    function goToSlide(idx) {
        pausePlayback();
        if (idx >= 0 && idx < state.slides.length) {
            state.currentSlideIndex = idx;
            ensureSelectedDragElement();
            renderCanvas();
            renderEditorControls();
            updatePlayerUi();
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
        return lines.map(line => `<span class="block whitespace-nowrap leading-tight">${escapeHtml(line)}</span>`).join('');
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
                savedAt: Date.now()
            };
            localStorage.setItem(PROJECT_STORAGE_KEY_PREFIX + sec, JSON.stringify(payload));
            localStorage.setItem(PROJECT_STORAGE_KEY_PREFIX + 'last_active', sec);
            showSavedToastIndicator();
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
                    ensureSelectedDragElement();
                    return true;
                }
            }
        } catch (e) {
            console.warn('[Reels] Load section error:', e);
        }
        return false;
    }

    // ---- 7.5 ANIMATION CONTROLLER METHODS ----
    function getElemAnimStyle(elemId) {
        if (!state.animationsEnabled) return '';
        if (activeDrag || state.isCapturingExport) return '';
        const cfg = (state.elementAnimations && state.elementAnimations[elemId]) || DEFAULT_ELEMENT_ANIMATIONS[elemId];
        if (!cfg || cfg.type === 'none') return '';
        const dur = cfg.duration || 0.6;
        const delay = (cfg.delay !== undefined) ? cfg.delay : 0.1;
        const animName = `reelAnim_${cfg.type}`;
        return `animation: ${animName} ${dur}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both; will-change: transform, opacity;`;
    }

    function replaySlideAnimations() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;
        const animLayers = canvas.querySelectorAll('.reel-anim-layer');
        animLayers.forEach(el => {
            const dragContainer = el.closest('[data-drag-id]');
            const elemId = dragContainer ? dragContainer.getAttribute('data-drag-id') : null;
            const animStyle = elemId ? getElemAnimStyle(elemId) : '';
            el.style.animation = 'none';
            void el.offsetWidth; // Force CSS reflow to replay animation
            if (animStyle) {
                const match = animStyle.match(/animation:\s*([^;]+);/);
                if (match) {
                    el.style.animation = match[1];
                }
            }
        });
        if (window.showCopyToast) {
            window.showCopyToast('🎬 تم تشغيل ومعاينة حركات السلايد على الشاشة');
        }
    }

    function testElementAnimation(elemId) {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;
        const dragContainer = canvas.querySelector(`[data-drag-id="${elemId}"]`);
        if (!dragContainer) return;
        const layer = dragContainer.querySelector('.reel-anim-layer');
        if (!layer) return;
        const animStyle = getElemAnimStyle(elemId);
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
        const btnPlay = document.getElementById('reelBtnPlay');
        const toolbarBtnPlay = document.getElementById('toolbarBtnPlay');
        const playText = state.isPlaying ? '<span>⏸️ إيقاف</span>' : '<span>▶️ تشغيل</span>';
        if (btnPlay) {
            btnPlay.innerHTML = playText;
            btnPlay.classList.toggle('bg-amber-500', state.isPlaying);
            btnPlay.classList.toggle('bg-emerald-600', !state.isPlaying);
        }
        if (toolbarBtnPlay) {
            toolbarBtnPlay.innerHTML = state.isPlaying ? '<span>⏸️ إيقاف</span>' : '<span>▶️ تشغيل</span>';
            toolbarBtnPlay.classList.toggle('bg-amber-500', state.isPlaying);
            toolbarBtnPlay.classList.toggle('bg-emerald-600', !state.isPlaying);
        }

        const current = state.slides[state.currentSlideIndex];
        let name = 'خطاف البداية';
        if (current) {
            if (current.type === 'player_card') name = `#${current.rank} - ${current.playerArName || current.playerName}`;
            if (current.type === 'versus_card') name = 'مقارنة كرتين (VS)';
            if (current.type === 'outro') name = 'سلايد الختام';
        }
        const slideText = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length} (${name})`;

        const ind = document.getElementById('reelSlideIndicator');
        if (ind) ind.textContent = slideText;
        const toolInd = document.getElementById('toolbarSlideIndicator');
        if (toolInd) toolInd.textContent = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length}`;

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
        const layout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];

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
                            <div class="w-max max-w-none text-center px-2" dir="rtl">
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
                            <div class="w-max max-w-none text-center px-3" dir="rtl">
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
                            <div class="w-max max-w-none text-center px-2" dir="rtl">
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
                                <img src="${currentSlide.cardUrl}" alt="${currentSlide.playerName}" 
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
                            ${!currentSlide.hideBadges && currentSlide.badges && currentSlide.badges.length ? `
                                <div class="mt-3 flex items-center justify-center gap-1.5 flex-wrap max-w-xs pointer-events-none" dir="rtl">
                                    ${currentSlide.badges.map(b => `
                                        <span class="px-2.5 py-1 rounded-xl bg-white/95 text-slate-900 border border-slate-200 text-[11px] font-black shadow-xs">
                                            ${b}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        ${renderResizeHandle('card')}
                    </div>
                ` : ''}

                <!-- 4. Player Name Block (Fixed 340px width container) -->
                ${!currentSlide.hidePlayerName ? `
                    <div data-drag-id="playerName" class="z-20 select-none relative ${dragCursor} ${selectRing('playerName')}" style="${posStyle(layout.playerName)}">
                        <div class="reel-anim-layer" style="${getElemAnimStyle('playerName')}">
                            <div class="w-[340px] text-center px-4" dir="rtl">
                                <div class="text-2xl md:text-3xl font-black text-slate-950 drop-shadow-sm pointer-events-none">
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
                                    <img src="${pA.cardUrl}" alt="${pA.name}" class="max-h-[230px] w-auto object-contain drop-shadow-2xl pointer-events-none">
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
                                    <img src="${pB.cardUrl}" alt="${pB.name}" class="max-h-[230px] w-auto object-contain drop-shadow-2xl pointer-events-none">
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

        canvas.innerHTML = `
            <div class="absolute inset-0 overflow-hidden bg-cover bg-center" style="background-image: url('${bgUrl}'); direction: ltr;">
                ${fcLogoHtml}
                ${scLogoHtml}
                ${bodyHtml}
                ${safeZoneHtml}
            </div>
        `;

        initCanvasDragHandlers();

        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, { folder: 'svg', ext: '.svg', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' });
        }
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

    // ---- 9. EDITOR CONTROLS PANEL (NATURAL POSITION & SCALE CONTROLS) ----
    function renderEditorControls() {
        const container = document.getElementById('suite_reels_panel');
        if (!container) return;

        const isCountdown = state.activeSection === 'countdown';
        const ideaList = VIRAL_IDEAS[state.activeSection] || [];
        const currentSlide = state.slides[state.currentSlideIndex];

        const secLayout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];
        const elementsList = getCurrentSlideElements();
        ensureSelectedDragElement();
        const selectedId = state.selectedDragElement || (elementsList[0] && elementsList[0].id) || 'card';
        const curCfg = secLayout[selectedId] || {};
        const curLeft = (curCfg.left !== undefined) ? curCfg.left : 50;
        const curTop = (curCfg.top !== undefined) ? curCfg.top : 30;
        const curScale = (curCfg.scale !== undefined) ? curCfg.scale : 1.0;

        const elementSelectOptions = elementsList.map(item => `
            <option value="${item.id}" ${item.id === selectedId ? 'selected' : ''}>
                ${item.name}
            </option>
        `).join('');

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
                                ${state.dragEnabled ? '🔓 سحب بالماوس' : '🔒 مقفول'}
                            </button>
                        </div>
                    </div>

                    <!-- Active Element Controller Box -->
                    <div class="p-3 rounded-xl bg-white border border-emerald-300 shadow-xs space-y-3">
                        
                        <!-- Element Picker -->
                        <div class="space-y-1">
                            <div class="flex items-center justify-between">
                                <label class="text-[11px] font-black text-slate-800">العنصر المراد ضبطه:</label>
                                <span id="dragCoordsBadge" class="text-[10px] font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    X: ${curLeft}% | Y: ${curTop}%
                                </span>
                            </div>
                            <select id="selectReelElement" onchange="ReelsEngine.setSelectedElement(this.value)" 
                                    class="w-full px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                ${elementSelectOptions}
                            </select>
                        </div>

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

                <!-- 3. VIRAL HOOKS BANK -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                            <span>💡 بنك أفكار ${isCountdown ? 'الترتيب التنازلي' : 'صراع العمالقة'}:</span>
                        </span>
                        <span class="text-[10px] text-emerald-600 font-bold">بضغطة واحدة ✨</span>
                    </div>

                    <div class="space-y-2 max-h-52 overflow-y-auto pr-1">
                        ${ideaList.map(idea => `
                            <div class="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-white transition space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${idea.badge}</span>
                                    <span class="text-[9.5px] font-bold text-slate-400">${idea.musicTip || 'موسيقى تريند'}</span>
                                </div>
                                <div class="font-black text-slate-900 text-xs leading-snug">${idea.title}</div>
                                <div class="text-[10.5px] text-slate-500 line-clamp-1">${idea.subtitle}</div>
                                <div class="pt-1 flex items-center justify-end border-t border-slate-100">
                                    <button type="button" onclick='ReelsEngine.loadIdeaById("${idea.id}")' class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10.5px] transition flex items-center gap-1 shadow-xs">
                                        <span>تطبيق هذه الفكرة 🎬</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 4. SLIDE & PLAYER CUSTOMIZER -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <span class="text-xs font-black text-slate-900">
                            تعديل السلايد الحالي (${state.currentSlideIndex + 1}/${state.slides.length}):
                        </span>
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
                        <span>🎬 تصدير فيديو الريل بدقة 60FPS (MP4 / WebM)</span>
                    </button>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="ReelsEngine.exportAllSlidesBatch()" class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>📸 تحميل كافة السلايدات</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.sendReelTelegram()" class="py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>🚀 إرسال لتليجرام</span>
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
                                <img src="${slide.cardUrl || 'assets/placeholder_card.png'}" alt="Card" class="max-h-full max-w-full object-contain">
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

                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div class="flex items-center justify-between">
                            <label class="text-[11px] font-black text-slate-700">شارات ومميزات الكرت (افصل بفاصلة):</label>
                            <button type="button" onclick="ReelsEngine.toggleElementVisibility('hideBadges')" class="text-[10px] font-bold px-2 py-0.5 rounded ${slide.hideBadges ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-600'}">
                                ${slide.hideBadges ? '👁️ إظهار' : '🗑️ إخفاء'}
                            </button>
                        </div>
                        <input type="text" value="${(slide.badges || []).join(' , ')}" 
                               onchange="ReelsEngine.updateBadges(this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-emerald-500">
                    </div>

                    ${deleteSlideButtonHtml}
                </div>
            `;
        } else if (slide.type === 'versus_card') {
            return `
                <div class="space-y-3">
                    ${durationControlHtml}

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

                    ${deleteSlideButtonHtml}
                </div>
            `;
        } else {
            return `
                <div class="space-y-2.5">
                    ${durationControlHtml}

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

    // ---- 10. PLAYER TOOLBAR (BELOW CANVAS) ----
    function renderPlayerToolbar() {
        const container = document.getElementById('reelsPlayerToolbarContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-between text-white shadow-xl">
                <div class="flex items-center gap-1.5">
                    <button type="button" onclick="ReelsEngine.prevSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition" title="السلايد السابق">
                        ⏪ السابق
                    </button>
                    <button type="button" id="toolbarBtnPlay" onclick="ReelsEngine.togglePlayPause()" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition flex items-center gap-1 shadow-sm">
                        <span>▶️ تشغيل</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.nextSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition" title="السلايد التالي">
                        التالي ⏩
                    </button>
                    <button type="button" onclick="ReelsEngine.replaySlideAnimations()" class="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition flex items-center gap-1 shadow-sm" title="إعادة تشغيل حركات السلايد الحالي">
                        <span>✨ إعادة الحركة</span>
                    </button>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <span id="toolbarSlideIndicator" class="text-[11px] font-black text-emerald-400">
                        سلايد ${state.currentSlideIndex + 1}/${state.slides.length}
                    </span>
                    <div class="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div id="toolbarTimelineBar" class="bg-emerald-400 h-full w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <button type="button" onclick="ReelsEngine.exportReelVideo()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-black text-xs transition flex items-center gap-1 shadow-md shadow-emerald-600/20">
                    <span>🎬 تحميل فيديو</span>
                </button>
            </div>
        `;
        updatePlayerUi();
    }

    // ---- 11. VIDEO RECORDER HELPER ----
    async function captureSlideImage(domNode) {
        if (!domNode) return '';

        // 1. Temporarily unscale domNode so its native layout is pure 450x800
        const prevTransform = domNode.style.transform;
        const prevOrigin = domNode.style.transformOrigin;
        domNode.style.transform = 'none';
        domNode.style.transformOrigin = '0 0';

        // 2. Hide any interactive handles / borders from the recording
        const handles = domNode.querySelectorAll('.layer-toolbar, .layer-resize-handle, .snap-guide');
        handles.forEach(h => h.style.setProperty('display', 'none', 'important'));
        const draggables = domNode.querySelectorAll('.draggable-layer');
        draggables.forEach(d => {
            d.style.outline = 'none';
            d.style.boxShadow = 'none';
        });

        // 2.5 Force full opacity and freeze animations during capture so exports are crisp & complete
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

        let resultUrl = '';

        try {
            // 3. Capture at native 450x800 with pixelRatio 2.4 => EXACTLY 1080x1920 Full HD!
            if (window.htmlToImage && typeof window.htmlToImage.toPng === 'function') {
                try {
                    resultUrl = await window.htmlToImage.toPng(domNode, {
                        pixelRatio: 2.4,
                        width: 450,
                        height: 800,
                        cacheBust: false,
                        style: {
                            transform: 'none',
                            transformOrigin: '0 0',
                            margin: '0',
                            left: '0',
                            top: '0'
                        }
                    });
                } catch (e) {
                    console.warn('[Reels Video] htmlToImage note:', e.message);
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
                        useCORS: true,
                        allowTaint: true,
                        logging: false
                    });
                    resultUrl = c.toDataURL('image/png');
                } catch (e) {
                    console.warn('[Reels Video] html2canvas fallback note:', e.message);
                }
            }
        } finally {
            // 4. Restore original viewport transform, handles and animation states
            state.isCapturingExport = false;
            prevAnimStyles.forEach(item => {
                item.el.style.animation = item.animation;
                item.el.style.opacity = item.opacity;
                item.el.style.transform = item.transform;
            });
            domNode.style.transform = prevTransform;
            domNode.style.transformOrigin = prevOrigin;
            handles.forEach(h => h.style.display = '');
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

    async function recordReelVideoBlob(progressCallback) {
        pausePlayback();
        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        const prevIndex = state.currentSlideIndex;
        state.showSafeZone = false;
        state.dragEnabled = false;
        hideMagnetGuides();

        try {
            const domNode = document.getElementById('exportCanvas');
            const totalSlides = state.slides.length;

            try {
                if (document.fonts && document.fonts.ready) {
                    await document.fonts.ready;
                }
            } catch (e) {}

            // =========================================================================
            // PHASE 1: PRE-CAPTURE ALL SLIDES (1080x1920) IN MEMORY FIRST
            // Performing DOM capture BEFORE recording starts eliminates all lag & freezes!
            // =========================================================================
            const preloadedSlides = [];
            for (let i = 0; i < totalSlides; i++) {
                if (progressCallback) {
                    progressCallback(i + 1, totalSlides, `معالجة وتجهيز السلايد ${i + 1}/${totalSlides}...`);
                }
                state.currentSlideIndex = i;
                renderCanvas();
                await new Promise(r => setTimeout(r, 120));

                const imgDataUrl = await captureSlideImage(domNode);
                if (!imgDataUrl) {
                    throw new Error(`تعذر تصوير السلايد رقم ${i + 1}`);
                }

                const slideImg = new Image();
                slideImg.src = imgDataUrl;
                await new Promise((res, rej) => {
                    slideImg.onload = res;
                    slideImg.onerror = () => rej(new Error(`فشل تحميل صورة السلايد رقم ${i + 1}`));
                });

                const curSlideObj = state.slides[i];
                const slideSec = Math.max(0.5, (curSlideObj && typeof curSlideObj.duration === 'number') ? curSlideObj.duration : (state.slideDuration || 2.5));
                preloadedSlides.push({ img: slideImg, duration: slideSec });
            }

            // =========================================================================
            // PHASE 2: INITIALIZE 1080x1920 CANVAS, SILENT AUDIO & MEDIARECORDER
            // =========================================================================
            const recordCanvas = document.createElement('canvas');
            recordCanvas.width = 1080;
            recordCanvas.height = 1920;
            const ctx = recordCanvas.getContext('2d');
            ctx.fillStyle = '#070709';
            ctx.fillRect(0, 0, 1080, 1920);

            // Draw slide 0 immediately so initial frame is already active
            if (preloadedSlides.length > 0) {
                ctx.drawImage(preloadedSlides[0].img, 0, 0, 1080, 1920);
            }

            const fps = 30;
            const frameIntervalMs = 1000 / fps; // 33.333ms

            const canvasStream = recordCanvas.captureStream(fps);
            const silentAudioObj = createSilentAudioTrack();

            const combinedTracks = [...canvasStream.getVideoTracks()];
            if (silentAudioObj && silentAudioObj.track) {
                combinedTracks.push(silentAudioObj.track);
            }
            const stream = new MediaStream(combinedTracks);

            // Select best supported MIME type
            let mimeType = 'video/mp4;codecs=avc1,mp4a.40.2';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/mp4';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'video/webm;codecs=vp9,opus';
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        mimeType = 'video/webm;codecs=vp8,opus';
                        if (!MediaRecorder.isTypeSupported(mimeType)) {
                            mimeType = 'video/webm';
                        }
                    }
                }
            }

            const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 });
            const chunks = [];
            recorder.ondataavailable = e => { 
                if (e.data && e.data.size > 0) chunks.push(e.data); 
            };

            const recordingComplete = new Promise((resolve, reject) => {
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: mimeType });
                    console.log(`[Reels Video] Recording finished: ${(blob.size / (1024 * 1024)).toFixed(2)} MB (${blob.size} bytes), chunks: ${chunks.length}`);
                    if (blob.size === 0) {
                        reject(new Error('فشل تسجيل الفيديو (الحجم 0 بايت). تأكد من اكتمال تحميل عناصر التصميم.'));
                    } else {
                        resolve({ blob, mimeType });
                    }
                };
                recorder.onerror = e => reject(new Error('خطأ في مسجل الفيديو: ' + (e.error?.message || 'MediaRecorder error')));
            });

            // Start recording
            recorder.start(100);
            await new Promise(r => setTimeout(r, 60));

            // =========================================================================
            // PHASE 3: DETERMINISTIC FRAME PUMPING WITH EXACT FRAME COUNTS
            // totalFrames = Math.max(15, Math.round(item.duration * 30))
            // Each frame rendered at exactly 33.3ms => 100% exact in TikTok & all players!
            // =========================================================================
            let totalExpectedMs = 0;
            for (let i = 0; i < preloadedSlides.length; i++) {
                const item = preloadedSlides[i];
                const totalFrames = Math.max(15, Math.round(item.duration * fps));
                totalExpectedMs += (totalFrames / fps) * 1000;

                if (progressCallback) {
                    progressCallback(i + 1, totalSlides, `تسجيل السلايد ${i + 1}/${totalSlides} (${item.duration.toFixed(1)} ثانية)...`);
                }

                for (let f = 0; f < totalFrames; f++) {
                    const frameStart = performance.now();
                    const progress = f / totalFrames;

                    // Dynamic subtle cinematic zoom (1.000 -> 1.018)
                    const scale = 1.0 + (progress * 0.018);
                    const w = 1080 * scale;
                    const h = 1920 * scale;
                    const x = (1080 - w) / 2;
                    const y = (1920 - h) / 2;

                    ctx.clearRect(0, 0, 1080, 1920);
                    ctx.drawImage(item.img, x, y, w, h);

                    const elapsedThisFrame = performance.now() - frameStart;
                    const sleepTime = Math.max(1, frameIntervalMs - elapsedThisFrame);
                    await new Promise(r => setTimeout(r, sleepTime));
                }
            }

            // Flush remaining data and stop cleanly
            try { recorder.requestData(); } catch(e) {}
            await new Promise(r => setTimeout(r, 120));
            recorder.stop();
            if (silentAudioObj) silentAudioObj.stop();

            let { blob, mimeType: recordedMime } = await recordingComplete;

            // If recorded in WebM, patch the duration header so TikTok & players know exact duration
            if (typeof window.ysFixWebmDuration === 'function' && recordedMime.includes('webm')) {
                try {
                    console.log(`[Reels Video] Patching WebM duration to ${totalExpectedMs}ms...`);
                    const fixedBlob = await new Promise((res) => {
                        window.ysFixWebmDuration(blob, totalExpectedMs, fixed => res(fixed));
                    });
                    if (fixedBlob && fixedBlob.size > 0) {
                        blob = fixedBlob;
                        console.log('[Reels Video] WebM duration patched successfully!');
                    }
                } catch (fixErr) {
                    console.warn('[Reels Video] fix-webm-duration note:', fixErr.message);
                }
            }

            return { blob, mimeType: recordedMime };
        } finally {
            state.showSafeZone = prevSafe;
            state.dragEnabled = prevDrag;
            state.currentSlideIndex = prevIndex;
            renderCanvas();
        }
    }

    async function exportReelVideo() {
        const btn = document.getElementById('btnExportVideo');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>⏳ جاري معالجة وتجهيز السلايدات...</span>';
        }

        try {
            if (window.showCopyToast) {
                window.showCopyToast('بدأ تسجيل فيديو الريل بالسرعة المحددة لكل سلايد.. 🎬⚡');
            }

            const { blob, mimeType } = await recordReelVideoBlob((cur, total, msg) => {
                if (btn) btn.innerHTML = `<span>⏳ ${msg || `معالجة سلايد ${cur}/${total}...`}</span>`;
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
            a.download = `Reel_FC27_ShopCoin15_${Date.now()}.${ext}`;
            document.body.appendChild(a);
            a.click();

            // Retain URL for 60 seconds so Chrome download manager has ample time to write to disk
            setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 60000);

            if (window.showCopyToast) {
                window.showCopyToast('تم تحميل فيديو الريل بنجاح! جاهز للنشر مع موسيقاك 🚀🎉');
            }
        } catch (err) {
            console.error('Video export error:', err);
            alert('تعذر تصدير الفيديو: ' + err.message);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span>🎬 تصدير فيديو الريل بدقة 60FPS (MP4 / WebM)</span>';
            }
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
            const { blob } = await recordReelVideoBlob((cur, total, msg) => {
                if (btn) btn.innerHTML = `<span>⏳ ${msg || `معالجة سلايد ${cur}/${total}...`}</span>`;
                if (statusBox) statusBox.textContent = `⏳ ${msg || `جاري معالجة السلايد ${cur} من ${total}...`}`;
            });

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
                btn.innerHTML = `<span>🚀 نشر الريل على تيك توك (@${tiktokStatus.username || 'shop_coin15'})</span>`;
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

    async function sendReelTelegram() {
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

        const caption = `🎬 ريلز FC 27 جاهز للنشر:
${state.title}
${state.subtitle}

@shop_coin15`;
        await window.TelegramManager.sendDesignInternal('exportCanvas', caption);

        state.showSafeZone = prevSafe;
        state.dragEnabled = prevDrag;
        renderCanvas();
    }

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
        exportReelVideo,
        exportAllSlidesBatch,
        sendReelTelegram,
        checkTikTokStatus,
        loginTikTok,
        reconnectDirectPublish,
        disconnectTikTok,
        publishToTikTok
    };
})();
