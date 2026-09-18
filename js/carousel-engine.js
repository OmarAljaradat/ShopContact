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
        atmosphere: 'shopcoin_emerald', // 'shopcoin_emerald' (Default) | 'toty_gold' | 'electric_cyan' | 'cyber_purple' | 'voltage_amber'
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

    // ShopCoin15 Brand Color Atmospheres
    const ATMOSPHERES = {
        shopcoin_emerald: {
            name: '🟢 أخضر شوب كوينز النيون (ShopCoin15 Signature)',
            bgGrad: 'from-[#02140b] via-[#010a05] to-[#000402]',
            glowColor: 'rgba(16, 185, 129, 0.45)',
            pillBorder: 'border-emerald-500/40',
            pillGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
            accentText: 'text-emerald-400',
            subAccent: 'text-amber-400',
            portalGradient: 'from-emerald-500/25 via-teal-500/10 to-transparent',
            portalBorder: 'border-emerald-400/40',
            ambientGlow: 'bg-emerald-500/20'
        },
        toty_gold: {
            name: '🟡 ذهبي ألتيميت فيفا (Prime Gold & Amber)',
            bgGrad: 'from-[#150e03] via-[#090501] to-[#030200]',
            glowColor: 'rgba(245, 158, 11, 0.45)',
            pillBorder: 'border-amber-500/40',
            pillGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
            accentText: 'text-amber-400',
            subAccent: 'text-yellow-300',
            portalGradient: 'from-amber-500/25 via-yellow-500/10 to-transparent',
            portalBorder: 'border-amber-400/40',
            ambientGlow: 'bg-amber-500/20'
        },
        electric_cyan: {
            name: '🔵 أزرق كهربائي ملكي (Electric Cyan & Royal)',
            bgGrad: 'from-[#021020] via-[#010810] to-[#000306]',
            glowColor: 'rgba(6, 182, 212, 0.45)',
            pillBorder: 'border-cyan-500/40',
            pillGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
            accentText: 'text-cyan-400',
            subAccent: 'text-blue-300',
            portalGradient: 'from-cyan-500/25 via-blue-500/10 to-transparent',
            portalBorder: 'border-cyan-400/40',
            ambientGlow: 'bg-cyan-500/20'
        },
        cyber_purple: {
            name: '🟣 سايبر نايت بنفسجي (Cyber Obsidian)',
            bgGrad: 'from-[#120420] via-[#080210] to-[#030006]',
            glowColor: 'rgba(168, 85, 247, 0.45)',
            pillBorder: 'border-purple-500/40',
            pillGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
            accentText: 'text-purple-400',
            subAccent: 'text-fuchsia-300',
            portalGradient: 'from-purple-500/25 via-fuchsia-500/10 to-transparent',
            portalBorder: 'border-purple-400/40',
            ambientGlow: 'bg-purple-500/20'
        },
        voltage_amber: {
            name: '🟠 كهرماني فولتج (Voltage Amber & Crimson)',
            bgGrad: 'from-[#1a0802] via-[#0c0301] to-[#040100]',
            glowColor: 'rgba(249, 115, 22, 0.45)',
            pillBorder: 'border-orange-500/40',
            pillGlow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
            accentText: 'text-orange-400',
            subAccent: 'text-amber-300',
            portalGradient: 'from-orange-500/25 via-amber-500/10 to-transparent',
            portalBorder: 'border-orange-400/40',
            ambientGlow: 'bg-orange-500/20'
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
    // RENDER SIGNATURE STORE THEME (ShopCoin15 Authentic Visual Identity)
    function renderSignatureStoreSlide() {
        const star = STARS_DATABASE[themeState.starKey] || STARS_DATABASE.mbappe;
        const atm = ATMOSPHERES[themeState.atmosphere] || ATMOSPHERES.shopcoin_emerald;
        const cardImg = themeState.customCardUrl || star.cardUrl;
        const photoImg = themeState.customPhotoUrl || star.photoUrl;
        const subIdx = themeState.activeSubSlide || 0;

        let centerContent = '';

        if (subIdx === 0) {
            // SLIDE 1: HERO SHOWCASE (ShopCoin15 Signature Spatial Arena)
            centerContent = `
                <div class="relative w-full h-[360px] flex items-center justify-center">
                    <!-- Radial Glow Bloom Behind Everything -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-80 h-80 rounded-full ${atm.ambientGlow} blur-3xl"></div>
                    </div>

                    <!-- Ambient Concentric Multi-Layered Geometric Energy Halo -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[285px] h-[285px] rounded-full border-2 ${atm.portalBorder} bg-gradient-to-b ${atm.portalGradient} shadow-[0_0_50px_${atm.glowColor}] flex items-center justify-center pointer-events-none">
                        <div class="w-[84%] h-[84%] rounded-full border border-white/20 border-dashed opacity-60"></div>
                        <div class="w-[66%] h-[66%] rounded-full border ${atm.portalBorder} opacity-40"></div>
                        <div class="absolute inset-2 rounded-full border border-white/10"></div>
                    </div>

                    ${themeState.layoutStyle === 'player_card' ? `
                        <!-- Player Cutout (Right / Mid) -->
                        <div class="absolute -right-4 bottom-4 z-10 w-[230px] h-auto max-h-[330px] pointer-events-none flex items-end justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]">
                            <img src="${proxyUrl(photoImg)}" onerror="this.style.display='none'" class="w-full h-auto object-contain scale-110 translate-y-2 transform -rotate-1" alt="${star.arName}">
                        </div>

                        <!-- Official FC 27 Item Card (Left / Front) -->
                        <div class="absolute left-6 bottom-8 z-20 w-[175px] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]">
                            <div class="relative">
                                <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain" alt="Card Item">
                                
                                <!-- Floating Stat Badge on Card -->
                                <div class="absolute -top-3 -right-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-[9.5px] border border-white/80 shadow-md font-['Alexandria']">
                                    ${star.rating} ${star.pos}
                                </div>
                            </div>

                            <!-- ShopCoin15 Custom 3D UT Coins Vault -->
                            <div class="relative -mt-3.5 flex items-center justify-center z-30 filter drop-shadow-[0_10px_20px_rgba(16,185,129,0.5)]">
                                <div class="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-500 p-[1.5px] rounded-full shadow-xl">
                                    <div class="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3.5 py-1 rounded-full">
                                        <span class="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] flex items-center justify-center">⚡</span>
                                        <span class="text-[10px] font-black text-amber-300 tracking-wider font-['Alexandria']">SHOPCOIN UT</span>
                                        <span class="text-[10px] font-black text-white font-mono">${themeState.coinsHighlight || 'COINS'}</span>
                                        <span class="text-[10.5px]">🪙</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : (themeState.layoutStyle === 'giant_card' ? `
                        <!-- Giant Card Center Showcase -->
                        <div class="relative z-20 w-[205px] filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] flex flex-col items-center">
                            <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain" alt="Card Item">
                            
                            <!-- ShopCoin15 Custom 3D Coins Stack -->
                            <div class="relative -mt-4 z-30 filter drop-shadow-[0_10px_20px_rgba(16,185,129,0.6)]">
                                <div class="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-500 p-[1.5px] rounded-full shadow-xl">
                                    <div class="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-full">
                                        <span class="w-5 h-5 rounded-full bg-slate-950 text-amber-300 font-black text-[10px] flex items-center justify-center">⚡</span>
                                        <span class="text-xs font-black text-amber-300 tracking-wider font-['Alexandria']">SHOPCOIN COINS ⚡</span>
                                        <span class="text-xs">🪙</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <!-- Trio Overlapping Cards Stack -->
                        <div class="relative w-[320px] h-[260px] flex items-center justify-center">
                            <div class="absolute transform -rotate-12 -translate-x-16 translate-y-3 scale-90 opacity-85 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                                <img src="${proxyUrl(STARS_DATABASE.bellingham.cardUrl)}" class="w-36 h-auto">
                            </div>
                            <div class="absolute transform rotate-12 translate-x-16 translate-y-3 scale-90 opacity-85 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                                <img src="${proxyUrl(STARS_DATABASE.vinicius.cardUrl)}" class="w-36 h-auto">
                            </div>
                            <div class="relative z-20 scale-105 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]">
                                <img src="${proxyUrl(cardImg)}" class="w-40 h-auto">
                                <div class="relative -mt-3.5 flex items-center justify-center z-30 filter drop-shadow-[0_8px_15px_rgba(16,185,129,0.7)]">
                                    <div class="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-500 p-[1px] rounded-full shadow-lg">
                                        <div class="bg-slate-950 px-3 py-1 rounded-full text-[10px] font-black text-amber-300">SHOPCOIN ⚡</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)}

                    <!-- Floating Exclusive VIP Discount Coupon Pill -->
                    <div class="absolute bottom-1 left-6 z-30 flex items-center gap-2 bg-slate-950/90 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-lg">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span class="text-[10px] text-slate-300 font-bold font-['Cairo']">كود الخصم:</span>
                        <span class="text-xs font-black text-amber-300 font-mono tracking-wider">${themeState.discountCode || 'SHOP15'}</span>
                    </div>
                </div>
            `;
        } else if (subIdx === 1) {
            // SLIDE 2: META ANALYSIS & CARD BREAKDOWN (ShopCoin15 Bento HUD)
            centerContent = `
                <div class="relative w-full h-[360px] flex items-center justify-between px-3 gap-3 z-20">
                    <!-- Left: Card -->
                    <div class="w-[155px] shrink-0 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]">
                        <img src="${proxyUrl(cardImg)}" class="w-full h-auto object-contain">
                        <div class="mt-2 text-center">
                            <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] border border-emerald-400/30 font-['Cairo']">
                                ${star.statHighlight}
                            </span>
                        </div>
                    </div>

                    <!-- Right: 3 ShopCoin15 Bento Meta Highlights -->
                    <div class="flex-1 space-y-2.5 text-right font-['Cairo']">
                        <div class="p-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-sm">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-black text-white font-['Alexandria']">⚡ السرعة والانطلاق</span>
                                <span class="text-[10px] text-emerald-400 font-mono font-black">97/99</span>
                            </div>
                            <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-1.5">
                                <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[97%]"></div>
                            </div>
                            <p class="text-[10.5px] text-slate-300 leading-snug font-medium">
                                ${star.metaPace}
                            </p>
                        </div>

                        <div class="p-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-sm">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-black text-white font-['Alexandria']">🎯 الإنهاء والتسديد</span>
                                <span class="text-[10px] text-amber-300 font-mono font-black">91/99</span>
                            </div>
                            <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-1.5">
                                <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-[91%]"></div>
                            </div>
                            <p class="text-[10.5px] text-slate-300 leading-snug font-medium">
                                ${star.metaShot}
                            </p>
                        </div>

                        <div class="p-2.5 rounded-xl bg-gradient-to-l from-emerald-950/60 to-slate-950/80 border-r-2 border-emerald-400 p-2 border border-white/5">
                            <div class="text-[11px] font-black text-amber-300 font-['Alexandria'] mb-0.5">👑 خلاصة الميتا من شوب كوينز:</div>
                            <p class="text-[10px] text-emerald-200 leading-snug font-bold">
                                ${star.metaVerdict}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else if (subIdx === 2) {
            // SLIDE 3: SHOPCOIN15 COIN PRICING VAULT
            centerContent = `
                <div class="relative w-full h-[360px] flex flex-col justify-center px-4 space-y-2.5 z-20 font-['Cairo']">
                    <div class="text-center">
                        <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[11px] border border-emerald-400/40 shadow-sm font-['Alexandria']">
                            💰 باقات كوينز شوب كوينز الصافية (شاملة الضريبة 100%)
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-right">
                        <div class="p-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-md">
                            <div class="text-xs font-black text-amber-400 font-['Alexandria']">🥉 باقة 500,000 كوينز</div>
                            <div class="text-[10px] text-slate-300 mt-1">⚡ تسليم فوري بدقيقتين</div>
                            <div class="text-[10px] text-emerald-400 font-black mt-0.5">✓ تغطية ضريبة EA كاملة</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border-2 border-emerald-400/60 shadow-md relative overflow-hidden">
                            <div class="absolute -top-1 -left-1 px-2 py-0.5 rounded-br-lg bg-emerald-400 text-slate-950 font-black text-[8.5px]">الأكثر طلباً ⭐</div>
                            <div class="text-xs font-black text-emerald-300 font-['Alexandria']">🥈 باقة 1,000,000 كوينز</div>
                            <div class="text-[10px] text-slate-200 mt-1">⚡ تسليم فوري في 60 ثانية</div>
                            <div class="text-[10px] text-amber-300 font-black mt-0.5">★ وفر 15% إضافي بكود SHOP15</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-md">
                            <div class="text-xs font-black text-yellow-300 font-['Alexandria']">🥇 باقة 2,000,000 كوينز</div>
                            <div class="text-[10px] text-slate-300 mt-1">👑 لبناء تشكيلة أحلامك</div>
                            <div class="text-[10px] text-emerald-400 font-black mt-0.5">✓ دعم فني VIP فوري</div>
                        </div>

                        <div class="p-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-md">
                            <div class="text-xs font-black text-cyan-300 font-['Alexandria']">💎 باقات مفتوحة (5M+)</div>
                            <div class="text-[10px] text-slate-300 mt-1">🚀 أسعار خاصة للكميات</div>
                            <div class="text-[10px] text-cyan-400 font-black mt-0.5">✓ حسابات وتحديات SBC</div>
                        </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 text-center text-[10.5px] text-emerald-300 font-bold">
                        ⚡ كوينزك تشحن بحسابك في 60 ثانية بدون أي تعقيد أو انتظار!
                    </div>
                </div>
            `;
        } else {
            // SLIDE 4: SHOPCOIN15 SECURITY VAULT & CALL TO ACTION
            centerContent = `
                <div class="relative w-full h-[360px] flex flex-col justify-center items-center text-center px-5 space-y-3 z-20 font-['Cairo']">
                    <!-- ShopCoin15 Hexagonal Security Shield -->
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(16,185,129,0.7)] border-2 border-white">
                        🛡️
                    </div>

                    <h3 class="text-xl font-black text-white font-['Alexandria'] leading-tight">
                        ضمان نادي كامل 100% من متجر شوب كوينز
                    </h3>

                    <p class="text-xs text-slate-300 leading-relaxed max-w-xs font-medium">
                        نعتمد أحدث بروتوكولات الأمان المطابقة لصفقات الماركت الطبيعية 100%. حسابك وناديك في أمان تام دائماً.
                    </p>

                    <!-- Reassurance Checklist -->
                    <div class="flex items-center gap-3 text-[10.5px] font-bold text-white pt-1">
                        <span class="flex items-center gap-1 text-emerald-400 font-['Alexandria']">✓ صفر تصفير</span>
                        <span class="text-slate-600">•</span>
                        <span class="flex items-center gap-1 text-cyan-400 font-['Alexandria']">✓ تسليم فوري في 60 ثانية</span>
                        <span class="text-slate-600">•</span>
                        <span class="flex items-center gap-1 text-amber-400 font-['Alexandria']">✓ صافي الضريبة</span>
                    </div>

                    <!-- Direct High-Contrast Island Button -->
                    <div class="pt-2 w-full max-w-xs">
                        <div class="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs shadow-[0_0_35px_rgba(16,185,129,0.7)] border-2 border-emerald-200 flex items-center justify-center gap-2 font-['Alexandria']">
                            <span>⚡ تواصل معنا بالخاص للطلب الفوري 📩</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <!-- Signature Store Slide Container -->
            <div class="absolute inset-0 bg-gradient-to-b ${atm.bgGrad} overflow-hidden select-none p-5 flex flex-col justify-between">
                
                <!-- Background Stadium Atmosphere & Hexagonal Tech Lattice -->
                <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute top-0 right-0 left-0 h-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
                <div class="absolute bottom-0 right-0 left-0 h-44 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>

                <!-- TOP HEADER BAR: ShopCoin15 Signature Chamfered Headline Capsule + EA FC 27 Tag -->
                <div class="relative z-30 flex items-center justify-between">
                    <!-- Right: ShopCoin15 Signature Headline Badge (Double-Bezel Glass Pill) -->
                    <div class="relative flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/75 backdrop-blur-xl border ${atm.pillBorder} ${atm.pillGlow}">
                        <div class="w-6 h-6 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1px] shadow-sm shrink-0">
                            <div class="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-xs font-black text-amber-300">
                                ⚡
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-[8px] font-black tracking-widest text-emerald-400 uppercase font-['Alexandria']">SHOPCOIN15 • عرض حصري</div>
                            <div class="text-[11.5px] font-black text-white font-['Alexandria'] tracking-tight flex items-center gap-1.5">
                                <span>${themeState.hookEmoji}</span>
                                <span>${themeState.hookText}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Left: EA SPORTS FC 27 Official Tag + Slide Badge -->
                    <div class="flex items-center gap-2">
                        <div class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 text-[10px] font-black text-amber-400 font-['Alexandria'] shadow-md">
                            <span>EA SPORTS FC 27</span>
                        </div>
                        <div class="bg-emerald-500/20 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-emerald-400/40 text-[10.5px] font-black text-emerald-300 font-mono shadow-md">
                            ${subIdx + 1}/4
                        </div>
                    </div>
                </div>

                <!-- CENTER STAGE (Dynamic by Slide) -->
                <div class="relative z-20 my-auto">
                    ${centerContent}
                </div>

                <!-- BOTTOM ANCHOR BAR: Call to action + @SHOP_COIN15 + Platforms Row -->
                <div class="relative z-30 space-y-1.5 pt-2">
                    <div class="text-center text-[10.5px] text-slate-300 font-bold font-['Cairo'] flex items-center justify-center gap-1.5">
                        <span class="text-emerald-400">⚡</span>
                        <span>لإكمال التحدي أو طلب الكوينز تواصل معنا بالخاص:</span>
                    </div>

                    <!-- Signature Hardware Glass Bar -->
                    <div class="flex items-center justify-between bg-black/75 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-emerald-500/30 shadow-2xl">
                        <!-- Brand Handle (Left LTR) -->
                        <div class="flex items-center gap-2 whitespace-nowrap" dir="ltr">
                            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1.5px] shadow-sm">
                                <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] text-amber-400 font-black">⚡</div>
                            </div>
                            <span class="text-xs font-black tracking-wider text-white font-['Alexandria']">@SHOP_COIN15</span>
                            <span class="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8.5px] font-bold">✓</span>
                        </div>

                        <!-- Supported Platforms (Right LTR) -->
                        <div class="flex items-center gap-2.5 text-[10.5px] font-black text-slate-200 whitespace-nowrap" dir="ltr">
                            <span class="text-emerald-400 font-bold font-['Cairo'] mr-1" dir="rtl">⚡ دقيقة</span>
                            <span class="text-slate-600">•</span>
                            <span class="text-slate-300 font-mono">PS5</span>
                            <span class="text-slate-600">•</span>
                            <span class="text-slate-300 font-mono">XBOX</span>
                            <span class="text-slate-600">•</span>
                            <span class="text-slate-300 font-mono">PC</span>
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
                                class="w-full p-2 rounded-xl text-right text-xs font-bold transition flex items-center justify-between border ${
                                    themeState.atmosphere === key 
                                        ? 'bg-blue-50 border-blue-500 text-blue-950 font-black' 
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }">
                            <span>${atm.name}</span>
                            <span class="text-[10px] text-blue-600 font-bold ${themeState.atmosphere === key ? 'opacity-100' : 'opacity-0'}">✓ مطبق</span>
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
                                    ? 'bg-blue-600 text-white border-blue-600 font-black' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }">
                        لاعب + كرت 🌟
                    </button>
                    <button type="button" onclick="CarouselEngine.updateThemeField('layoutStyle', 'giant_card')" 
                            class="p-2 rounded-xl border transition ${
                                themeState.layoutStyle === 'giant_card' 
                                    ? 'bg-blue-600 text-white border-blue-600 font-black' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }">
                        كرت عملاق ⚡
                    </button>
                    <button type="button" onclick="CarouselEngine.updateThemeField('layoutStyle', 'trio_cards')" 
                            class="p-2 rounded-xl border transition ${
                                themeState.layoutStyle === 'trio_cards' 
                                    ? 'bg-blue-600 text-white border-blue-600 font-black' 
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
