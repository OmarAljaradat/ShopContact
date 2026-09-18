/**
 * ShopCoin15 Studio - Multi-Slide Carousel Engine & Signature Store Theme
 * Modes:
 * 1. 👑 Signature Store Theme (ثيم المتجر الموحد المستوحى من تشامب كوينز وبرق ستور - Screenshot 13)
 * 2. 🎮 Design Compositor Sandbox (لعبة تركيب التصميم الحرة من مراجع الكاروسيل الـ 12)
 * 3. 📚 Educational & Storytelling Carousel (النمط التعليمي)
 */

window.CarouselEngine = (function() {
    // Current Mode: 'theme' (Signature Store Theme) | 'sandbox' | 'presets'
    let editorMode = 'theme';
    let selectedElementId = null;
    let activeCatalogTab = 'templates';
    let activeSlideIndex = 0;

    // Signature Store Theme State (Unified Feed & Carousel Engine)
    let themeState = {
        starKey: 'mbappe',
        customCardUrl: '',
        customPhotoUrl: '',
        cardPrice: '2.4M',
        eventTitle: 'TEAM OF THE SEASON ⚽',
        hookText: 'مع نزول لاعبين الحدث! متجرنا بخدمتك 🔥',
        hookEmoji: '🔥',
        atmosphere: 'arena_3d_daylight', // 'arena_3d_daylight' (Default) | 'championship_hall_3d' | 'light_gold' | 'light_mint' | 'light_cyan'
        layoutStyle: 'player_card', // 'player_card' (Player + Card) | 'giant_card' (Card + Coins) | 'trio_cards' (Trio Stack)
        discountCode: 'SHOP15',
        coinsHighlight: '+1,000,000 كوينز',
        deliveryTime: 'دقيقة واحدة ⚡',
        activeSubSlide: 0 // 0: Cover, 1: Meta, 2: Pricing, 3: Guarantee
    };

    // Stars Database (Curated FC 27 Stars with Official FUT.GG Card Items & Cutout Photos)
    const STARS_DATABASE = {
        mbappe: {
            id: '231747',
            name: 'Kylian Mbappé',
            arName: 'كيليان مبابي',
            club: 'ريال مدريد',
            rating: '91',
            pos: 'ST',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/231747.png',
            statHighlight: 'سرعة 97 + مهارة 5★',
            priceEst: '~2,450,000 كوينز',
            metaPace: 'سرعة تسارع 97 تكسر أي خط دفاعي وتضمن لك الانفراد المباشر.',
            metaShot: 'إنهاء 91 مع مهارة 5 نجوم يضمن تحويل أنصاف الفرص لأهداف محققة.',
            metaVerdict: 'الكرت الأفضل هجومياً في الفوت تشامبيونز، يضمن لك قفزة فورية في الرانك.'
        },
        bellingham: {
            id: '252371',
            name: 'Jude Bellingham',
            arName: 'جود بيلينغهام',
            club: 'ريال مدريد',
            rating: '90',
            pos: 'CAM',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/252371.png',
            statHighlight: 'صناعة وإنهاء 87 + لياقة 90',
            priceEst: '~750,000 كوينز',
            metaPace: 'تحرك ذكي بدون كرة وحضور بدني مهيمن في منتصف الملعب.',
            metaShot: 'تسديدات متقنة من خارج المنطقة مع مساهمة هجومية ودفاعية كاملة.',
            metaVerdict: 'لاعب الوسط الأكمل (Box-to-Box)، يضبط رتم المباراة بالكامل لصالحك.'
        },
        vinicius: {
            id: '238794',
            name: 'Vinícius Jr.',
            arName: 'فينيسيوس جونيور',
            club: 'ريال مدريد',
            rating: '90',
            pos: 'LW',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/238794.png',
            statHighlight: 'سرعة 96 + مهارة 5★',
            priceEst: '~980,000 كوينز',
            metaPace: 'انطلاقات جناح خارقة تخترق أعتى الأظهرة في ثوانٍ معدودة.',
            metaShot: 'مراوغات مرنة للغاية مع إنهاء مقوس من زوايا مستحيلة.',
            metaVerdict: 'ساحر الطرف الأيسر، الحل المثالي لفك أي تكتل دفاعي مغلق.'
        },
        yamal: {
            id: '277643',
            name: 'Lamine Yamal',
            arName: 'لامين يامال',
            club: 'برشلونة',
            rating: '90',
            pos: 'RW',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-277643.c7ad04ede93affc15cf5aa1cac07f2beecf1be5698bbe19c153263527208c357.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,width=350,format=auto/2027/player-item/27-277643.79eb8666f877e2b9aa027eeb4a3911871d76c627a5439bf4733b842f466a667b.webp',
            statHighlight: 'مراوغة 93 + مهارة 5★',
            priceEst: '~1,200,000 كوينز',
            metaPace: 'خفة حركة وردود فعل استثنائية تجعله مراوغاً مستحيلاً على المدافعين.',
            metaShot: 'صناعة لعب دقيقة بالمليمتر مع تسديدات مقوسة بالقدم اليسرى.',
            metaVerdict: 'الجوهرة الذهبية الصاعدة، يمنح تشكيلتك لمسة فنية لا تقارن.'
        },
        haaland: {
            id: '239085',
            name: 'Erling Haaland',
            arName: 'إرلينغ هالاند',
            club: 'مانشستر سيتي',
            rating: '91',
            pos: 'ST',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/239085.png',
            statHighlight: 'تسديد 93 + بدنية 90',
            priceEst: '~450,000 كوينز',
            metaPace: 'قوة انطلاق جارفة تحمي الكرة وتكتسح أي احتكاك بدني.',
            metaShot: 'قذائف صاروخية بقوة 93 لا يراها الحراس حتى تسكن الشباك.',
            metaVerdict: 'الدبابة الهجومية رقم 1 في الكرات العرضية والركلات الثابتة.'
        },
        ronaldo: {
            id: '20801',
            name: 'Cristiano Ronaldo',
            arName: 'كريستيانو رونالدو',
            club: 'النصر',
            rating: '86',
            pos: 'ST',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-20801.120c1569e5bb38ec0139e728ec651b752945d8b88fc75b11116c478a2d1d0fc3.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/20801.png',
            statHighlight: 'تسديد 88 + ارتقاء 93',
            priceEst: '~80,000 كوينز',
            metaPace: 'تمركزه الهجومي والهروب من الرقابة الدفاعية لا يزال أسطورياً.',
            metaShot: 'إنهاء بكلتا القدمين والرأس، حاسم تحت أي ضغط في الدقائق الأخيرة.',
            metaVerdict: 'أسطورة الحسم، يمنح هجومك ثقلاً وهيبة كروية حقيقية.'
        },
        rodri: {
            id: '231866',
            name: 'Rodri',
            arName: 'رودري',
            club: 'مانشستر سيتي',
            rating: '91',
            pos: 'CDM',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/231866.png',
            statHighlight: 'دفاع 87 + تمرير 86',
            priceEst: '~180,000 كوينز',
            metaPace: 'قاطع كرات صلب، يوقف كل الهجمات المرتدة في مهدها بكفاءة.',
            metaShot: 'تمريرات طولية دقيقة بالمليمتر تضع مهاجميك في انفرادات فورية.',
            metaVerdict: 'صمام الأمان الدفاعي الذي يحتاجه أي بطل في الفوت تشامبيونز.'
        },
        valverde: {
            id: '239053',
            name: 'Federico Valverde',
            arName: 'فالفيردي',
            club: 'ريال مدريد',
            rating: '88',
            pos: 'CM',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
            photoUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=350/2024/players/239053.png',
            statHighlight: 'سرعة 88 + تسديد 84',
            priceEst: '~320,000 كوينز',
            metaPace: 'سرعة خارقة في الارتداد الدفاعي والهجومي طوال الـ 90 دقيقة.',
            metaShot: 'تسديدات صاروخية مفاجئة من مسافات بعيدة تسكن الزاوية المستحيلة.',
            metaVerdict: 'المحرك الذي لا يتعب، رئة فريقك الحقيقية لحسم المباريات الشاقة.'
        }
    };

    // Pre-written Marketing Hooks for ShopCoin15 Store
    const HOOK_PRESETS = [
        { emoji: '⚡', text: 'شحن فوري بدقيقة مع متجر شوب كوينز' },
        { emoji: '🔥', text: 'مع نزول لاعبي الحدث! متجرنا بخدمتك' },
        { emoji: '👑', text: 'اضبط تشكيلتك الآن بأفضل سعر كوينز' },
        { emoji: '💰', text: 'تحديات الـ SBC نسويها عنك بأرخص سعر' },
        { emoji: '🛡️', text: 'ضمان نادي كامل 100% بدون أي قلق' },
        { emoji: '🚀', text: 'بضغطة زر... أي لاعب بفرقتك وبأسرع تسليم' },
        { emoji: '😎', text: 'متجرك الأول والأضمن في الشرق الأوسط' }
    ];

    // ShopCoin15 Bespoke 3D Arena & Light Luxury Atmospheres
    const ATMOSPHERES = {
        arena_3d_daylight: {
            name: '🏟️ ستاديوم أرينا نهاري 3D (Bespoke 3D Stadium Stage)',
            bgImage: 'assets/shopcoin_arena_bg.jpg',
            bgGrad: 'from-[#ffffff] via-[#f1f5f9] to-[#e2e8f0]',
            heroAura: 'from-amber-400/20 via-yellow-200/10 to-transparent',
            portalBorder: 'border-emerald-400/50',
            glowColor: 'rgba(16, 185, 129, 0.25)',
            capsuleBorder: 'border-white/90',
            capsuleGlow: 'shadow-[0_10px_35px_rgba(0,0,0,0.10)]',
            accentText: 'text-amber-800',
            subAccent: 'text-emerald-700',
            eyebrowColor: 'text-emerald-700',
            tagBg: 'bg-white/95 text-amber-900 border-amber-300',
            badgeBg: 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950',
            ambientGlow: 'bg-amber-200/25'
        },
        championship_hall_3d: {
            name: '👑 قاعة بطولات فيفا الذهبية 3D (Championship Hall)',
            bgImage: 'assets/shopcoin_gold_lounge.jpg',
            bgGrad: 'from-[#fffbeb] via-[#fef3c7] to-[#fde68a]',
            heroAura: 'from-amber-400/25 via-yellow-200/15 to-transparent',
            portalBorder: 'border-amber-400/60',
            glowColor: 'rgba(245, 158, 11, 0.25)',
            capsuleBorder: 'border-amber-300/80',
            capsuleGlow: 'shadow-[0_10px_35px_rgba(245,158,11,0.20)]',
            accentText: 'text-amber-800',
            subAccent: 'text-amber-600',
            eyebrowColor: 'text-amber-700',
            tagBg: 'bg-white/95 text-amber-900 border-amber-300',
            badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950',
            ambientGlow: 'bg-amber-300/25'
        },
        light_gold: {
            name: '☀️ ذهبي شمسي ناصع (Golden Sunlight Luxury)',
            bgGrad: 'from-[#fffdfa] via-[#fffbeb] to-[#fef3c7]',
            heroAura: 'from-amber-400/35 via-yellow-200/25 to-transparent',
            portalBorder: 'border-amber-400/60',
            glowColor: 'rgba(245, 158, 11, 0.25)',
            capsuleBorder: 'border-amber-300/70',
            capsuleGlow: 'shadow-[0_8px_30px_rgba(245,158,11,0.15)]',
            accentText: 'text-amber-800',
            subAccent: 'text-amber-600',
            eyebrowColor: 'text-amber-700',
            tagBg: 'bg-amber-100/90 text-amber-900 border-amber-300',
            badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950',
            ambientGlow: 'bg-amber-300/30'
        },
        light_mint: {
            name: '🟢 بلاتينيوم وأخضر شوب كوينز (Platinum Mint & Emerald)',
            bgGrad: 'from-[#fafffd] via-[#f0fdf4] to-[#dcfce7]',
            heroAura: 'from-emerald-400/30 via-teal-200/25 to-transparent',
            portalBorder: 'border-emerald-400/60',
            glowColor: 'rgba(16, 185, 129, 0.25)',
            capsuleBorder: 'border-emerald-300/70',
            capsuleGlow: 'shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
            accentText: 'text-emerald-800',
            subAccent: 'text-emerald-600',
            eyebrowColor: 'text-emerald-700',
            tagBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
            badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
            ambientGlow: 'bg-emerald-300/30'
        },
        light_cyan: {
            name: '🧊 أزرق ثلجي وسماوي ناصع (Ice Cyan Daylight)',
            bgGrad: 'from-[#f8fcff] via-[#f0f9ff] to-[#e0f2fe]',
            heroAura: 'from-cyan-400/30 via-sky-200/25 to-transparent',
            portalBorder: 'border-cyan-400/60',
            glowColor: 'rgba(6, 182, 212, 0.25)',
            capsuleBorder: 'border-cyan-300/70',
            capsuleGlow: 'shadow-[0_8px_30px_rgba(6,182,212,0.15)]',
            accentText: 'text-cyan-800',
            subAccent: 'text-cyan-600',
            eyebrowColor: 'text-cyan-700',
            tagBg: 'bg-cyan-100/90 text-cyan-900 border-cyan-300',
            badgeBg: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
            ambientGlow: 'bg-cyan-300/30'
        }
    };

    // 4 Sequential Theme Slides Definition
    const THEME_SLIDES = [
        { id: 'theme_cover', title: 'الغلاف البطل 🌟', type: 'theme_cover' },
        { id: 'theme_meta', title: 'تحليل الميتا ⚡', type: 'theme_meta' },
        { id: 'theme_pricing', title: 'جدول الأسعار 💰', type: 'theme_pricing' },
        { id: 'theme_guarantee', title: 'الضمان والطلب 🛡️', type: 'theme_guarantee' }
    ];

    function getEditorMode() { return editorMode; }
    function setEditorMode(mode) {
        editorMode = mode;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function getThemeState() { return themeState; }
    function updateThemeField(field, value) {
        themeState[field] = value;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function selectThemeStar(starKey) {
        if (!STARS_DATABASE[starKey]) return;
        themeState.starKey = starKey;
        const star = STARS_DATABASE[starKey];
        themeState.cardPrice = star.priceEst;
        renderSlideToMainCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(`تم اختيار النجم: ${star.arName} (${star.rating}) ✨`);
        }
    }

    function selectThemeHook(hookIndex) {
        const item = HOOK_PRESETS[hookIndex];
        if (!item) return;
        themeState.hookText = item.text;
        themeState.hookEmoji = item.emoji;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function selectThemeAtmosphere(atmKey) {
        if (!ATMOSPHERES[atmKey]) return;
        themeState.atmosphere = atmKey;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function selectThemeSubSlide(idx) {
        if (idx >= 0 && idx < THEME_SLIDES.length) {
            themeState.activeSubSlide = idx;
            activeSlideIndex = idx;
            renderSlideToMainCanvas();
            renderEditorControls();
            renderFilmstrip();
        }
    }

    // Helper for Proxied Image URLs to prevent CORS
    function proxyUrl(url) {
        if (!url) return '';
        if (url.startsWith('/api/image-proxy')) return url;
        if (url.startsWith('data:') || url.startsWith('assets/')) return url;
        return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }

    // Main Canvas Render
    function renderSlideToMainCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_carousel') return;

        canvas.className = 'canvas-portrait relative overflow-hidden select-none';
        canvas.setAttribute('data-canvas-ratio', 'portrait');

        if (editorMode === 'theme') {
            canvas.innerHTML = renderSignatureStoreSlide();
        } else if (editorMode === 'sandbox') {
            renderSandboxCanvas(canvas);
        } else {
            renderClassicGuideCanvas(canvas);
        }

        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        }
    }

    // RENDER SIGNATURE STORE THEME (Screenshots 13, 1, 2)
    // RENDER SIGNATURE STORE THEME (ShopCoin15 Light & Bright Luxury Suite)
    function renderSignatureStoreSlide() {
        const star = STARS_DATABASE[themeState.starKey] || STARS_DATABASE.mbappe;
        const atm = ATMOSPHERES[themeState.atmosphere] || ATMOSPHERES.arena_3d_daylight;
        const cardImg = themeState.customCardUrl || star.cardUrl;
        const photoImg = themeState.customPhotoUrl || star.photoUrl;
        const subIdx = themeState.activeSubSlide || 0;

        let centerContent = '';

        if (subIdx === 0) {
            // SLIDE 1: HERO SHOWCASE (ShopCoin15 Light & Bright Arena)
            centerContent = `
                <div class="relative w-full h-[360px] flex items-center justify-center">
                    <!-- Daylight Sunburst Radial Glow Behind Center -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-80 h-80 rounded-full ${atm.ambientGlow} blur-3xl"></div>
                    </div>

                    <!-- Ambient Concentric Multi-Layered Sunburst Geometric Energy Halo -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[285px] h-[285px] rounded-full border-2 ${atm.portalBorder} bg-gradient-to-b ${atm.heroAura} shadow-[0_10px_40px_${atm.glowColor}] flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                        <div class="w-[84%] h-[84%] rounded-full border border-amber-400/40 border-dashed"></div>
                        <div class="w-[66%] h-[66%] rounded-full border ${atm.portalBorder} opacity-60"></div>
                        <div class="absolute inset-2 rounded-full border border-white/60"></div>
                    </div>

                    ${themeState.layoutStyle === 'player_card' ? `
                        <!-- Player Cutout (Standing on 3D Stadium Stage) -->
                        <div class="absolute -right-2 bottom-1 z-10 w-[235px] h-auto max-h-[340px] pointer-events-none flex items-end justify-center filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.30)]">
                            <img src="${proxyUrl(photoImg)}" onerror="this.style.display='none'" class="w-full h-auto object-contain scale-110 translate-y-2 transform -rotate-1" alt="${star.arName}">
                        </div>

                        <!-- Official FC 27 Item Card (Floating on 3D Stage) -->
                        <div class="absolute left-6 bottom-7 z-20 w-[175px] filter drop-shadow-[0_22px_35px_rgba(0,0,0,0.30)]">
                            <div class="relative">
                                <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain" alt="Card Item">
                                
                                <!-- Floating Stat Badge on Card -->
                                <div class="absolute -top-3 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-[9.5px] border border-white shadow-md font-['Alexandria']">
                                    ${star.rating} ${star.pos}
                                </div>
                            </div>

                            <!-- ShopCoin15 Custom 3D UT Coins Vault (Light Premium Edition) -->
                            <div class="relative -mt-3.5 flex items-center justify-center z-30 filter drop-shadow-[0_8px_20px_rgba(245,158,11,0.25)]">
                                <div class="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 p-[1.5px] rounded-full shadow-lg">
                                    <div class="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-100">
                                        <span class="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-xs">⚡</span>
                                        <span class="text-[10px] font-black text-amber-800 tracking-wider font-['Alexandria']">SHOPCOIN UT</span>
                                        <span class="text-[10px] font-black text-slate-900 font-mono">${themeState.coinsHighlight || 'COINS'}</span>
                                        <span class="text-[10.5px]">🪙</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : (themeState.layoutStyle === 'giant_card' ? `
                        <!-- Giant Card Center Showcase -->
                        <div class="relative z-20 w-[205px] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.22)] flex flex-col items-center">
                            <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain" alt="Card Item">
                            
                            <!-- ShopCoin15 Custom 3D Coins Stack -->
                            <div class="relative -mt-4 z-30 filter drop-shadow-[0_8px_20px_rgba(245,158,11,0.3)]">
                                <div class="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 p-[1.5px] rounded-full shadow-lg">
                                    <div class="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-100">
                                        <span class="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">⚡</span>
                                        <span class="text-xs font-black text-amber-800 tracking-wider font-['Alexandria']">SHOPCOIN COINS ⚡</span>
                                        <span class="text-xs">🪙</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <!-- Trio Overlapping Cards Stack -->
                        <div class="relative w-[320px] h-[260px] flex items-center justify-center">
                            <div class="absolute transform -rotate-12 -translate-x-16 translate-y-3 scale-90 opacity-90 filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.18)]">
                                <img src="${proxyUrl(STARS_DATABASE.bellingham.cardUrl)}" class="w-36 h-auto">
                            </div>
                            <div class="absolute transform rotate-12 translate-x-16 translate-y-3 scale-90 opacity-90 filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.18)]">
                                <img src="${proxyUrl(STARS_DATABASE.vinicius.cardUrl)}" class="w-36 h-auto">
                            </div>
                            <div class="relative z-20 scale-105 filter drop-shadow-[0_22px_35px_rgba(0,0,0,0.22)]">
                                <img src="${proxyUrl(cardImg)}" class="w-40 h-auto">
                                <div class="relative -mt-3.5 flex items-center justify-center z-30 filter drop-shadow-[0_8px_15px_rgba(245,158,11,0.25)]">
                                    <div class="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 p-[1px] rounded-full shadow-md">
                                        <div class="bg-white px-3 py-1 rounded-full text-[10px] font-black text-amber-800">SHOPCOIN ⚡</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)}

                    <!-- Floating Exclusive VIP Discount Coupon Pill (Light Edition) -->
                    <div class="absolute bottom-1 left-6 z-30 flex items-center gap-2 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-amber-300 shadow-md">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-[10px] text-slate-700 font-bold font-['Cairo']">كود الخصم:</span>
                        <span class="text-xs font-black text-amber-800 font-mono tracking-wider">${themeState.discountCode || 'SHOP15'}</span>
                    </div>
                </div>
            `;
        } else if (subIdx === 1) {
            // SLIDE 2: META ANALYSIS & CARD BREAKDOWN (ShopCoin15 Light Bento Suite)
            centerContent = `
                <div class="relative w-full h-[360px] flex items-center justify-between px-3 gap-3 z-20">
                    <!-- Left: Card -->
                    <div class="w-[155px] shrink-0 filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.18)]">
                        <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain">
                        <div class="mt-2 text-center">
                            <span class="inline-block px-2.5 py-1 rounded-full bg-white/95 text-slate-800 font-black text-[10px] border border-slate-200 shadow-xs font-['Cairo']">
                                ${star.statHighlight}
                            </span>
                        </div>
                    </div>

                    <!-- Right: 3 ShopCoin15 Light Bento Meta Highlights -->
                    <div class="flex-1 space-y-2.5 text-right font-['Cairo']">
                        <div class="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-black text-slate-900 font-['Alexandria']">⚡ السرعة والانطلاق</span>
                                <span class="text-[10px] text-amber-700 font-mono font-black">97/99</span>
                            </div>
                            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                                <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-[97%]"></div>
                            </div>
                            <p class="text-[10.5px] text-slate-600 leading-snug font-medium">
                                ${star.metaPace}
                            </p>
                        </div>

                        <div class="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-black text-slate-900 font-['Alexandria']">🎯 الإنهاء والتسديد</span>
                                <span class="text-[10px] text-amber-700 font-mono font-black">91/99</span>
                            </div>
                            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[91%]"></div>
                            </div>
                            <p class="text-[10.5px] text-slate-600 leading-snug font-medium">
                                ${star.metaShot}
                            </p>
                        </div>

                        <div class="p-3 rounded-2xl bg-gradient-to-l from-amber-50 to-yellow-50 border-r-3 border-amber-500 border border-amber-200/80 shadow-[0_6px_20px_rgba(245,158,11,0.08)]">
                            <div class="text-[11px] font-black text-amber-900 font-['Alexandria'] mb-0.5">👑 خلاصة الميتا من شوب كوينز:</div>
                            <p class="text-[10px] text-amber-950 leading-snug font-bold">
                                ${star.metaVerdict}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else if (subIdx === 2) {
            // SLIDE 3: SHOPCOIN15 LIGHT COIN PRICING VAULT
            centerContent = `
                <div class="relative w-full h-[360px] flex flex-col justify-center px-4 space-y-2.5 z-20 font-['Cairo']">
                    <div class="text-center">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-white/95 text-amber-900 font-black text-[11px] border border-amber-300/80 shadow-sm font-['Alexandria']">
                            💰 باقات كوينز شوب كوينز الصافية (شاملة الضريبة 100%)
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-right">
                        <div class="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                            <div class="text-xs font-black text-amber-800 font-['Alexandria']">🥉 باقة 500,000 كوينز</div>
                            <div class="text-[10px] text-slate-600 mt-1">⚡ تسليم فوري بدقيقتين</div>
                            <div class="text-[10px] text-emerald-700 font-black mt-0.5">✓ تغطية ضريبة EA كاملة</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-gradient-to-br from-amber-50/90 to-white border-2 border-amber-400 shadow-md relative overflow-hidden">
                            <div class="absolute -top-1 -left-1 px-2 py-0.5 rounded-br-lg bg-amber-500 text-slate-950 font-black text-[8.5px]">الأكثر طلباً ⭐</div>
                            <div class="text-xs font-black text-amber-900 font-['Alexandria']">🥈 باقة 1,000,000 كوينز</div>
                            <div class="text-[10px] text-slate-700 mt-1">⚡ تسليم فوري في 60 ثانية</div>
                            <div class="text-[10px] text-amber-800 font-black mt-0.5">★ وفر 15% إضافي بكود SHOP15</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                            <div class="text-xs font-black text-yellow-800 font-['Alexandria']">🥇 باقة 2,000,000 كوينز</div>
                            <div class="text-[10px] text-slate-600 mt-1">👑 لبناء تشكيلة أحلامك</div>
                            <div class="text-[10px] text-emerald-700 font-black mt-0.5">✓ دعم فني VIP فوري</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                            <div class="text-xs font-black text-cyan-800 font-['Alexandria']">💎 باقات مفتوحة (5M+)</div>
                            <div class="text-[10px] text-slate-600 mt-1">🚀 أسعار خاصة للكميات</div>
                            <div class="text-[10px] text-cyan-700 font-black mt-0.5">✓ حسابات وتحديات SBC</div>
                        </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300/80 text-center text-[10.5px] text-amber-950 font-bold shadow-xs">
                        ⚡ كوينزك تشحن بحسابك في 60 ثانية بدون أي تعقيد أو انتظار!
                    </div>
                </div>
            `;
        } else {
            // SLIDE 4: SHOPCOIN15 LIGHT SECURITY VAULT & CALL TO ACTION
            centerContent = `
                <div class="relative w-full h-[360px] flex items-center justify-center px-4 z-20 font-['Cairo']">
                    <div class="w-full max-w-sm p-5 rounded-3xl bg-white/92 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col items-center text-center space-y-2.5">
                        <!-- ShopCoin15 Bright 3D Security Shield -->
                        <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 text-slate-950 flex items-center justify-center text-2xl font-black shadow-[0_8px_25px_rgba(245,158,11,0.35)] border-2 border-white">
                            🛡️
                        </div>

                        <h3 class="text-lg font-black text-slate-900 font-['Alexandria'] leading-tight">
                            ضمان نادي كامل 100% من متجر شوب كوينز
                        </h3>

                        <p class="text-[11px] text-slate-700 leading-relaxed font-bold px-2">
                            نعتمد أحدث بروتوكولات الأمان المطابقة لصفقات الماركت الطبيعية 100%. حسابك وناديك في أمان تام دائماً.
                        </p>

                        <!-- Reassurance Checklist (Light Badges) -->
                        <div class="flex items-center gap-1.5 text-[10px] font-bold pt-0.5 flex-wrap justify-center">
                            <span class="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-['Alexandria'] font-black">✓ صفر تصفير</span>
                            <span class="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-['Alexandria'] font-black">✓ تسليم فوري في 60 ثانية</span>
                            <span class="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-['Alexandria'] font-black">✓ صافي الضريبة</span>
                        </div>

                        <!-- Direct High-Contrast Island Button -->
                        <div class="pt-1 w-full">
                            <div class="py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-black text-xs shadow-[0_8px_25px_rgba(16,185,129,0.35)] border border-emerald-300 flex items-center justify-center gap-2 font-['Alexandria']">
                                <span>⚡ تواصل معنا بالخاص للطلب الفوري 📩</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <!-- Signature Store Slide Container (ShopCoin15 Bespoke 3D Arena Suite) -->
            <div class="absolute inset-0 overflow-hidden select-none p-5 flex flex-col justify-between">
                
                ${atm.bgImage ? `
                    <!-- 3D Bespoke Photorealistic Stadium Stage Background -->
                    <img src="${atm.bgImage}" class="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Stadium Stage">
                    <!-- Soft Daylight Lighting Balancer for Eye Comfort & Perfect Contrast -->
                    <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/35 pointer-events-none"></div>
                    <div class="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none"></div>
                    <div class="absolute bottom-0 right-0 left-0 h-36 bg-gradient-to-t from-white/85 via-white/40 to-transparent pointer-events-none"></div>
                ` : `
                    <!-- Background Stadium Daylight Atmosphere & Geometric Light Lattice -->
                    <div class="absolute inset-0 bg-gradient-to-b ${atm.bgGrad}"></div>
                    <div class="absolute inset-0 pointer-events-none opacity-15" style="background-image: radial-gradient(#94a3b8 1px, transparent 1px); background-size: 24px 24px;"></div>
                    <div class="absolute top-0 right-0 left-0 h-36 bg-gradient-to-b from-white/70 to-transparent pointer-events-none"></div>
                    <div class="absolute bottom-0 right-0 left-0 h-40 bg-gradient-to-t from-white/70 to-transparent pointer-events-none"></div>
                `}

                <!-- TOP HEADER BAR: ShopCoin15 Light Chamfered Headline Capsule + EA FC 27 Tag -->
                <div class="relative z-30 flex items-center justify-between">
                    <!-- Right: ShopCoin15 Signature Headline Badge (Light Double-Bezel Glass Pill) -->
                    <div class="relative flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border ${atm.capsuleBorder} ${atm.capsuleGlow}">
                        <div class="w-6 h-6 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1px] shadow-sm shrink-0">
                            <div class="w-full h-full rounded-[11px] bg-white flex items-center justify-center text-xs font-black text-amber-600">
                                ⚡
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-[8.5px] font-black tracking-widest ${atm.eyebrowColor} uppercase font-['Alexandria']">SHOPCOIN15 • عرض حصري</div>
                            <div class="text-[11.5px] font-black text-slate-900 font-['Alexandria'] tracking-tight flex items-center gap-1.5">
                                <span>${themeState.hookEmoji}</span>
                                <span>${themeState.hookText}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Left: EA SPORTS FC 27 Official Tag + Slide Badge -->
                    <div class="flex items-center gap-2">
                        <div class="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-300/80 flex items-center gap-1.5 text-[10px] font-black text-amber-800 font-['Alexandria'] shadow-sm">
                            <span>EA SPORTS FC 27</span>
                        </div>
                        <div class="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200 text-[10.5px] font-black text-slate-800 font-mono shadow-sm">
                            ${subIdx + 1}/4
                        </div>
                    </div>
                </div>

                <!-- CENTER STAGE (Dynamic by Slide) -->
                <div class="relative z-20 my-auto">
                    ${centerContent}
                </div>

                <!-- BOTTOM ANCHOR BAR: Call to action + @SHOP_COIN15 + Platforms Row (Light Edition) -->
                <div class="relative z-30 space-y-1.5 pt-2">
                    <div class="text-center text-[10.5px] text-slate-700 font-bold font-['Cairo'] flex items-center justify-center gap-1.5">
                        <span class="text-amber-600">⚡</span>
                        <span>لإكمال التحدي أو طلب الكوينز تواصل معنا بالخاص:</span>
                    </div>

                    <!-- Signature Light Hardware Glass Bar -->
                    <div class="flex items-center justify-between bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
                        <!-- Brand Handle (Left LTR) -->
                        <div class="flex items-center gap-2 whitespace-nowrap" dir="ltr">
                            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1.5px] shadow-sm">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] text-amber-600 font-black">⚡</div>
                            </div>
                            <span class="text-xs font-black tracking-wider text-slate-900 font-['Alexandria']">@SHOP_COIN15</span>
                            <span class="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8.5px] font-bold">✓</span>
                        </div>

                        <!-- Supported Platforms (Right LTR) -->
                        <div class="flex items-center gap-2.5 text-[10.5px] font-black text-slate-700 whitespace-nowrap" dir="ltr">
                            <span class="text-emerald-700 font-bold font-['Cairo'] mr-1" dir="rtl">⚡ دقيقة</span>
                            <span class="text-slate-300">•</span>
                            <span class="text-slate-700 font-mono">PS5</span>
                            <span class="text-slate-300">•</span>
                            <span class="text-slate-700 font-mono">XBOX</span>
                            <span class="text-slate-300">•</span>
                            <span class="text-slate-700 font-mono">PC</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Fallback Canvas Renders for Sandbox & Presets modes
    function renderSandboxCanvas(canvas) {
        canvas.innerHTML = `
            <div class="absolute inset-0 bg-[#050813] p-7 flex flex-col justify-between select-none">
                <div class="text-white font-black text-sm">وضع لعبة التركيب الحرة (Sandbox)</div>
                <div class="p-4 bg-white/5 rounded-2xl text-xs text-slate-300 text-center">انقر على تبويب "ثيم المتجر الموحد" للعودة إلى الهوية الأساسية</div>
                <div class="text-slate-400 text-xs text-center">متجر @shop_coin15</div>
            </div>
        `;
    }

    function renderClassicGuideCanvas(canvas) {
        canvas.innerHTML = `
            <div class="absolute inset-0 bg-[#090d18] p-7 flex flex-col justify-between select-none">
                <div class="text-white font-black text-sm">النمط التعليمي الجاهز</div>
                <div class="p-4 bg-white/5 rounded-2xl text-xs text-slate-300 text-center">سلايدات الإرشادات والنصائح المكتوبة</div>
                <div class="text-slate-400 text-xs text-center">متجر @shop_coin15</div>
            </div>
        `;
    }

    // RENDER EDITOR CONTROLS PANEL
    function renderEditorControls() {
        const container = document.getElementById('suite_carousel_panel');
        if (!container) return;

        let html = `
            <div class="space-y-4 font-['Cairo']">
                <!-- Mode Switcher Tabs -->
                <div class="p-1 rounded-2xl bg-slate-200/80 border border-slate-300 flex items-center gap-1 text-xs font-black">
                    <button type="button" onclick="CarouselEngine.setEditorMode('theme')" 
                            class="flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                                editorMode === 'theme' 
                                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }">
                        <span>⚡ ثيم شوب كوينز الرسمي (ShopCoin15)</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.setEditorMode('sandbox')" 
                            class="py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 ${
                                editorMode === 'sandbox' 
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }">
                        <span>🎮 تركيب حر</span>
                    </button>
                </div>
        `;

        if (editorMode === 'theme') {
            html += renderThemeControls();
        } else {
            html += `
                <div class="p-4 rounded-2xl bg-slate-100 text-center text-xs text-slate-600 font-bold">
                    وضع لعبة التركيب الحرة متاح. يمكنك العودة لثيم المتجر بنقرة زر أعلاه.
                </div>
            `;
        }

        // 4K Batch Export & Telegram Action Box
        html += `
                <div class="pt-3 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="CarouselEngine.exportAllSlides()" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 font-['Alexandria']">
                        <span>⚡ تصدير كامل سلايدات الكاروسيل بدقة 4K (${THEME_SLIDES.length} صور)</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.sendCarouselTelegram()" class="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-sm font-['Alexandria']">
                        <span>🚀 إرسال الألبوم كاملاً للتليجرام</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Controls for the Signature Store Theme
    function renderThemeControls() {
        const star = STARS_DATABASE[themeState.starKey] || STARS_DATABASE.mbappe;
        const subIdx = themeState.activeSubSlide || 0;

        return `
            <!-- 1. Star Player 1-Click Selectors -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900 text-xs flex items-center gap-1.5">
                        <span>⚽ اختيار نجم التشكيلة والكارت (بنقرة زر):</span>
                    </span>
                    <span class="text-[10.5px] font-black text-emerald-600">${star.arName} (${star.rating})</span>
                </div>

                <!-- Star Buttons Grid -->
                <div class="grid grid-cols-4 gap-1.5">
                    ${Object.entries(STARS_DATABASE).map(([key, s]) => `
                        <button type="button" onclick="CarouselEngine.selectThemeStar('${key}')" 
                                class="p-1.5 rounded-xl border text-center transition flex flex-col items-center justify-between ${
                                    themeState.starKey === key 
                                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs' 
                                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                                }">
                            <span class="text-[11px] font-black text-slate-900 truncate w-full">${s.arName.split(' ')[0]}</span>
                            <span class="text-[9.5px] font-mono font-bold text-amber-600">${s.rating} ${s.pos}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Custom Card / Photo Inputs -->
                <div class="pt-1 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                        <label class="block font-bold text-slate-600 mb-0.5">رابط كرت مخصص (FUT.GG):</label>
                        <input type="text" placeholder="https://..." value="${themeState.customCardUrl || ''}" 
                               oninput="CarouselEngine.updateThemeField('customCardUrl', this.value)"
                               class="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[10px] outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block font-bold text-slate-600 mb-0.5">صورة اللاعب المقصوصة:</label>
                        <input type="text" placeholder="https://..." value="${themeState.customPhotoUrl || ''}" 
                               oninput="CarouselEngine.updateThemeField('customPhotoUrl', this.value)"
                               class="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[10px] outline-none focus:border-emerald-500">
                    </div>
                </div>
            </div>

            <!-- 2. Marketing Hook Presets (ShopCoin15 Signature) -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900 text-xs flex items-center gap-1.5">
                        <span>⚡ مانشيت كبسولة العرض العلوية:</span>
                    </span>
                </div>

                <!-- Hook Buttons Dropdown / Pills -->
                <div class="space-y-1 max-h-36 overflow-y-auto scrollbar-thin">
                    ${HOOK_PRESETS.map((item, idx) => `
                        <button type="button" onclick="CarouselEngine.selectThemeHook(${idx})" 
                                class="w-full p-2 rounded-xl text-right text-xs font-bold transition flex items-center justify-between border ${
                                    themeState.hookText === item.text 
                                        ? 'bg-amber-50 border-amber-400 text-amber-950 font-black' 
                                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                                }">
                            <span class="truncate">${item.emoji} ${item.text}</span>
                            <span class="text-[10px] text-amber-600 font-black ${themeState.hookText === item.text ? 'opacity-100' : 'opacity-0'}">✓</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Custom Hook Input -->
                <div class="pt-1">
                    <input type="text" value="${(themeState.hookText || '').replace(/"/g, '&quot;')}" 
                           oninput="CarouselEngine.updateThemeField('hookText', this.value)"
                           placeholder="أو اكتب مانشيتك الخاص هنا..."
                           class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-blue-500">
                </div>
            </div>

            <!-- 3. Event Atmosphere & Color Palette -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <span class="font-black text-slate-900 text-xs">🎨 لون الحدث والأجواء البصرية:</span>
                <div class="grid grid-cols-1 gap-1.5">
                    ${Object.entries(ATMOSPHERES).map(([key, atm]) => `
                        <button type="button" onclick="CarouselEngine.selectThemeAtmosphere('${key}')" 
                                class="w-full p-2.5 rounded-xl text-right text-xs font-bold transition flex items-center justify-between border ${
                                    themeState.atmosphere === key 
                                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-black ring-2 ring-amber-500/20 shadow-xs' 
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }">
                            <span>${atm.name}</span>
                            <span class="text-[10px] text-amber-600 font-bold ${themeState.atmosphere === key ? 'opacity-100' : 'opacity-0'}">✓ مطبق</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 4. Hero Layout Mode (ShopCoin15 vs Giant Card vs Trio) -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <span class="font-black text-slate-900 text-xs">📐 نمط العرض المركزي في الغلاف:</span>
                <div class="grid grid-cols-3 gap-1.5 text-center text-xs font-bold">
                    <button type="button" onclick="CarouselEngine.updateThemeField('layoutStyle', 'player_card')" 
                            class="p-2 rounded-xl border transition ${
                                themeState.layoutStyle === 'player_card' 
                                    ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }">
                        لاعب + كرت 🌟
                    </button>
                    <button type="button" onclick="CarouselEngine.updateThemeField('layoutStyle', 'giant_card')" 
                            class="p-2 rounded-xl border transition ${
                                themeState.layoutStyle === 'giant_card' 
                                    ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }">
                        كرت عملاق ⚡
                    </button>
                    <button type="button" onclick="CarouselEngine.updateThemeField('layoutStyle', 'trio_cards')" 
                            class="p-2 rounded-xl border transition ${
                                themeState.layoutStyle === 'trio_cards' 
                                    ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }">
                        ثلاثي كروت 🔥
                    </button>
                </div>
            </div>

            <!-- 5. Quick Details (Coupon, Price, Delivery) -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span class="font-black text-slate-900">⚡ تخصيص تفاصيل العرض:</span>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-0.5">كود الخصم:</label>
                        <input type="text" value="${themeState.discountCode || 'SHOP15'}" 
                               oninput="CarouselEngine.updateThemeField('discountCode', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-0.5">سعر الكرت / الكمية:</label>
                        <input type="text" value="${themeState.cardPrice || '2.4M'}" 
                               oninput="CarouselEngine.updateThemeField('cardPrice', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold outline-none focus:border-blue-500">
                    </div>
                </div>
            </div>
        `;
    }

    // Render Filmstrip for Carousel Navigation
    function renderFilmstrip() {
        const container = document.getElementById('carouselFilmstripContainer');
        if (!container) return;

        const subIdx = themeState.activeSubSlide || 0;

        let html = `
            <div class="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3 shadow-sm font-['Cairo']">
                <div class="flex items-center justify-between mb-2.5 px-1">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200">🎞️</span>
                        <span class="text-xs font-black text-slate-800">سلايدات الكاروسيل الموحد (السلايد ${subIdx + 1} من ${THEME_SLIDES.length}):</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="CarouselEngine.exportAllSlides()" class="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white text-[11px] font-black transition flex items-center gap-1 shadow-sm shadow-blue-500/20 font-['Alexandria']">
                            <span>👑 تصدير الكل (4K)</span>
                        </button>
                    </div>
                </div>
                
                <div class="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-1 px-1 scrollbar-thin" dir="rtl">
        `;

        THEME_SLIDES.forEach((slide, idx) => {
            const isActive = idx === subIdx;
            html += `
                <div class="relative group shrink-0">
                    <button type="button" onclick="CarouselEngine.selectThemeSubSlide(${idx})" class="w-28 h-32 rounded-xl border-2 transition text-right p-2 flex flex-col justify-between overflow-hidden relative select-none ${
                        isActive 
                            ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20' 
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                    }">
                        <div class="flex items-center justify-between w-full">
                            <span class="text-[10px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500'}">سلايد #${idx + 1}</span>
                            <span class="text-[9px] font-bold text-slate-400">${idx === 0 ? 'الغلاف' : (idx === 1 ? 'ميزات' : (idx === 2 ? 'أسعار' : 'ضمان'))}</span>
                        </div>
                        <div class="text-[10.5px] font-black text-slate-800 leading-tight">
                            ${slide.title}
                        </div>
                        <div class="w-full h-1 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-200'}"></div>
                    </button>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // 4K Batch Export for all 4 slides
    async function exportAllSlides() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevSubSlide = themeState.activeSubSlide;
        if (window.showCopyToast) {
            window.showCopyToast(`جارِ تصدير كامل سلايدات الكاروسيل الـ 4 بدقة 4K فائقة... ⏳`);
        }

        for (let i = 0; i < THEME_SLIDES.length; i++) {
            selectThemeSubSlide(i);
            await new Promise(r => setTimeout(r, 450));
            await window.CanvasExporter.downloadNative('exportCanvas', 'jpg', `shopcoin15_carousel_slide_${i + 1}_of_4`);
            await new Promise(r => setTimeout(r, 300));
        }

        selectThemeSubSlide(prevSubSlide);
        if (window.showCopyToast) {
            window.showCopyToast('تم تصدير جميع سلايدات الكاروسيل بجودة 4K بنجاح! 🚀🎉');
        }
    }

    // Telegram Album Dispatch for all 4 slides
    async function sendCarouselTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }

        const prevSubSlide = themeState.activeSubSlide;
        if (window.showCopyToast) {
            window.showCopyToast(`جارِ إرسال كامل الكاروسيل (4 سلايدات) كألبوم إلى هاتفك عبر التليجرام... 🚀`);
        }

        for (let i = 0; i < THEME_SLIDES.length; i++) {
            selectThemeSubSlide(i);
            await new Promise(r => setTimeout(r, 450));
            const caption = `📚 سلايد الكاروسيل (${i + 1}/4): ${THEME_SLIDES[i].title} - @shop_coin15`;
            await window.TelegramManager.sendDesignInternal('exportCanvas', caption);
            await new Promise(r => setTimeout(r, 500));
        }

        selectThemeSubSlide(prevSubSlide);
        if (window.showCopyToast) {
            window.showCopyToast('تم إرسال كامل الكاروسيل إلى التليجرام بنجاح! 📱✨');
        }
    }

    return {
        getEditorMode,
        setEditorMode,
        getThemeState,
        updateThemeField,
        selectThemeStar,
        selectThemeHook,
        selectThemeAtmosphere,
        selectThemeSubSlide,
        renderFilmstrip,
        renderSlideToMainCanvas,
        renderEditorControls,
        exportAllSlides,
        sendCarouselTelegram
    };
})();
