/**
 * Simplified Direct Templates for ShopCoin15
 * 100% In-Game Official Assets & FUT.GG Cards (NO FAKE AI)
 * 1. 👑 تريو 3 لاعبين متداخلين (3 Overlapping Players)
 * 2. 📉 هبوط أسعار السوق وفرصة الشحن (Market Crash & Buy Coins)
 * 3. ⚡ تقفيل وحل تحديات الـ SBC (SBC Solver & Coins)
 */

const POPULAR_FUTGG_STARS = [
    {
        name: '🔥 مبابي FC 27 (91)',
        url: 'https://www.fut.gg/players/231747-kylian-mbappe/',
        arName: 'كيليان مبابي',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
        rating: '91',
        position: 'ST',
        price: '~2,450,000 كوينز'
    },
    {
        name: '👑 بيلينغهام FC 27 (90)',
        url: 'https://www.fut.gg/players/252371-jude-bellingham/',
        arName: 'جود بيلينغهام',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
        rating: '90',
        position: 'CAM',
        price: '~750,000 كوينز'
    },
    {
        name: '⚡ فينيسيوس FC 27 (90)',
        url: 'https://www.fut.gg/players/238794-vinicius-jr/',
        arName: 'فينيسيوس جونيور',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
        rating: '90',
        position: 'LW',
        price: '~980,000 كوينز'
    },
    {
        name: '🤖 هالاند FC 27 (91)',
        url: 'https://www.fut.gg/players/239085-erling-haaland/',
        arName: 'إرلينغ هالاند',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
        rating: '91',
        position: 'ST',
        price: '~450,000 كوينز'
    },
    {
        name: '💎 رودري FC 27 (91)',
        url: 'https://www.fut.gg/players/231866-rodri/',
        arName: 'رودري',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp',
        rating: '91',
        position: 'CDM',
        price: '~180,000 كوينز'
    },
    {
        name: '🇲🇦 بوعدي FC 27 (83)',
        url: 'https://www.fut.gg/players/278901-ayyoub-bouaddi/',
        arName: 'أيوب بوعدي',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2025%2Ffutgg-player-item-card%2F25-278901.18e50b70ffbcadf1f0621d40662f9b33875362637e894aa202b27166ee9e0da5.webp',
        rating: '83',
        position: 'CDM',
        price: '~25,000 كوينز'
    }
];

const STARTER_BEASTS = [
    {
        name: '⚡ نونيز (77 ST)',
        id: '253072',
        url: 'https://www.futbin.com/25/player/253072/darwin-nunez',
        arName: 'داروين نونيز',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
        rating: '77',
        position: 'ST',
        price: '~8,500 كوينز'
    },
    {
        name: '⚡ ديمبيلي (86 RW)',
        id: '231443',
        url: 'https://www.futbin.com/25/player/231443/ousmane-dembele',
        arName: 'عثمان ديمبيلي',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp',
        rating: '86',
        position: 'RW',
        price: '~48,000 كوينز'
    },
    {
        name: '⚡ لياو (86 LW)',
        id: '241721',
        url: 'https://www.futbin.com/25/player/241721/rafael-leao',
        arName: 'رافاييل لياو',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50573369.a6f3940ce2ccb7d0c1b6486a36ceb97173930a64d05373132b440d62f8ab9fcf.webp',
        rating: '86',
        position: 'LW',
        price: '~38,000 كوينز'
    },
    {
        name: '⚡ تونالي (85 CDM)',
        id: '241096',
        url: 'https://www.futbin.com/25/player/241096/sandro-tonali',
        arName: 'ساندرو تونالي',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-241096.b3c01d216c9bc7ed2cbf008664c7582161526a0c5ec870bbb97236a9334b4ab9.webp',
        rating: '85',
        position: 'CDM',
        price: '~22,000 كوينز'
    },
    {
        name: '⚡ نكونكو (80 CAM)',
        id: '232411',
        url: 'https://www.futbin.com/25/player/232411/christopher-nkunku',
        arName: 'كريستوفر نكونكو',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50564059.5f79259f8aab4649fb246e99d63986ef9d4c997c7c03eb97b71aebc72bb0b43f.webp',
        rating: '80',
        position: 'CAM',
        price: '~12,000 كوينز'
    },
    {
        name: '⚡ ساكا (87 RW)',
        id: '246669',
        url: 'https://www.futbin.com/25/player/246669/bukayo-saka',
        arName: 'بوكايو ساكا',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
        rating: '87',
        position: 'RW',
        price: '~42,000 كوينز'
    },
    {
        name: '⚡ كييزا (81 LW)',
        id: '235805',
        url: 'https://www.futbin.com/25/player/235805/federico-chiesa',
        arName: 'فيديريكو كييزا',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-235805.67d05d0649cafc2fbfc92a6463ad1426396c57fcc5a4d1af3cabd3cde25a0900.webp',
        rating: '81',
        position: 'LW',
        price: '~14,000 كوينز'
    }
];

const STORE_BANNER_THEMES = {
    classic: {
        name: 'النمط الكلاسيكي (أزرق - أحمر - أخضر)',
        banners: [
            { text: 'متوفر الآن جميع كميات الكوينز 🤩', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'والشحن عليه ضمان نادي كامل 🔒', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة شحن خيالية المليون ينشحن خلال دقيقة 🔥🤯', bg: '#38B000', color: '#FFFFFF' },
            { text: 'وبأفضل الأسعار التنافسية 🥳👏', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#E1F5FE', color: '#1E293B' }
        ]
    },
    pastel: {
        name: 'النمط الباستيل الهادئ (سماوي - ذهبي - وردي)',
        banners: [
            { text: 'متوفر جميع كميات الكوينز', bg: '#E0F7FA', color: '#0288D1' },
            { text: '⭐ سرعة بالشحن و ضمان ذهبي', bg: '#FFF9C4', color: '#B45309' },
            { text: 'للطلب حياك على الخاص 🌙', bg: '#FCE4EC', color: '#BE185D' }
        ]
    },
    toty_speed: {
        name: 'نمط سرعة وضمان التوتي (أزرق - ثلجي - أخضر)',
        banners: [
            { text: 'اطلب الان كوينز بأفضل الأسعار 🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'و ضمان كامل للنادي 👌', bg: '#E0F7FA', color: '#1E293B' },
            { text: 'ومدة الشحن اقل من 5 دقائق 🤩🤯', bg: '#38B000', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#E8F5E9', color: '#1E293B' }
        ]
    },
    accounts: {
        name: 'ترويج الحسابات الجاهزة والتشكيلات',
        banners: [
            { text: 'متوفر جميع أنواع الحسابات بمتجرنا 🤩', bg: '#38B000', color: '#FFFFFF' },
            { text: '✅ تبي حساب جديد فيه تشكيلة قوية موجود', bg: '#0084FF', color: '#FFFFFF' },
            { text: '✅ او تبي لاعب معين ب الحساب موجود', bg: '#E50914', color: '#FFFFFF' },
            { text: 'كامل معلومات الحساب بتتغير ويصير الحساب ملكك 🔥👌', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#212121', color: '#FFFFFF' }
        ]
    }
};

const SHOWCASE_BG_THEMES = {
    store: {
        id: 'store',
        name: '🏛️ رخام المتجر الملكي (SC Marble)',
        url: 'assets/store-bg-pure.png',
        badgeColor: 'text-slate-900',
        cardGlow: 'rgba(0, 255, 133, 0.45)',
        podiumGradient: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,245,250,0.9))',
        podiumBorder: 'rgba(0, 255, 133, 0.5)',
        isLight: true
    },
    arena_3d: {
        id: 'arena_3d',
        name: '🏟️ مسرح الستاديوم 3D (Stadium Stage)',
        url: 'assets/shopcoin_arena_bg.jpg',
        badgeColor: 'text-white',
        cardGlow: 'rgba(0, 255, 133, 0.55)',
        podiumGradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(8, 12, 22, 0.9))',
        podiumBorder: 'rgba(0, 255, 133, 0.6)',
        isLight: false
    },
    gold_lounge: {
        id: 'gold_lounge',
        name: '👑 صالة الذهب VIP 3D (Gold Lounge)',
        url: 'assets/shopcoin_gold_lounge.jpg',
        badgeColor: 'text-white',
        cardGlow: 'rgba(245, 158, 11, 0.55)',
        podiumGradient: 'linear-gradient(135deg, rgba(30, 20, 10, 0.95), rgba(15, 10, 5, 0.9))',
        podiumBorder: 'rgba(245, 158, 11, 0.6)',
        isLight: false
    },
    dark: {
        id: 'dark',
        name: '⚡ أرينا النيون الداكنة (Dark Arena)',
        url: 'assets/story-bg.jpg',
        badgeColor: 'text-white',
        cardGlow: 'rgba(0, 240, 255, 0.5)',
        podiumGradient: 'linear-gradient(135deg, rgba(10, 15, 25, 0.95), rgba(5, 8, 15, 0.9))',
        podiumBorder: 'rgba(0, 240, 255, 0.5)',
        isLight: false
    }
};

const SHOWCASE_STARS_PRESETS = [
    {
        id: 'mbappe',
        name: '🔥 مبابي (91 ST)',
        arName: 'كيليان مبابي',
        rating: '91',
        position: 'ST',
        club: 'ريال مدريد • فرنسا',
        price: '2,450,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp'
    },
    {
        id: 'bellingham',
        name: '👑 بيلينغهام (90 CAM)',
        arName: 'جود بيلينغهام',
        rating: '90',
        position: 'CAM',
        club: 'ريال مدريد • إنجلترا',
        price: '750,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp'
    },
    {
        id: 'vinicius',
        name: '⚡ فينيسيوس (90 LW)',
        arName: 'فينيسيوس جونيور',
        rating: '90',
        position: 'LW',
        club: 'ريال مدريد • البرازيل',
        price: '980,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp'
    },
    {
        id: 'ronaldo',
        name: '🐐 رونالدو (86 ST)',
        arName: 'كريستيانو رونالدو',
        rating: '86',
        position: 'ST',
        club: 'النصر • البرتغال',
        price: '120,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-20801.120c1569e5bb38ec0139e728ec651b752945d8b88fc75b11116c478a2d1d0fc3.webp'
    },
    {
        id: 'yamal',
        name: '💎 يامال (90 RW)',
        arName: 'لامين يامال',
        rating: '90',
        position: 'RW',
        club: 'برشلونة • إسبانيا',
        price: '890,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-277643.c7ad04ede93affc15cf5aa1cac07f2beecf1be5698bbe19c153263527208c357.webp'
    },
    {
        id: 'haaland',
        name: '🤖 هالاند (91 ST)',
        arName: 'إرلينغ هالاند',
        rating: '91',
        position: 'ST',
        club: 'مانشستر سيتي • النرويج',
        price: '450,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp'
    },
    {
        id: 'bouaddi',
        name: '🇲🇦 بوعدي (83 CDM)',
        arName: 'أيوب بوعدي',
        rating: '83',
        position: 'CDM',
        club: 'ليل • المغرب',
        price: '95,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2025/futgg-player-item-card/25-278901.18e50b70ffbcadf1f0621d40662f9b33875362637e894aa202b27166ee9e0da5.webp'
    },
    {
        id: 'saka',
        name: '⚡ ساكا (87 RW)',
        arName: 'بوكايو ساكا',
        rating: '87',
        position: 'RW',
        club: 'أرسنال • إنجلترا',
        price: '320,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp'
    },
    {
        id: 'dembele',
        name: '⚡ ديمبيلي (86 RW)',
        arName: 'عثمان ديمبيلي',
        rating: '86',
        position: 'RW',
        club: 'باريس سان جيرمان • فرنسا',
        price: '180,000 كوينز',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp'
    }
];

const TEMPLATES = {
    showcase: {
        id: 'showcase',
        name: '⭐ كرت النجم وهوية المتجر (Hero Card)',
        icon: 'star',
        description: 'تصميم بوست إنستغرام فاخر يركز 100% على بطاقة FC 27 الأصلية مع هوية متجر ShopCoin15 والمنصة ثلاثية الأبعاد وأكوام الكوينز وبطاقات البينتو',
        defaultState: {
            bgTheme: 'store', // 'store' (رخام المتجر الملكي), 'arena_3d', 'gold_lounge', 'dark'
            gameVersion: 'FC 27',
            cardImageUrl: SHOWCASE_STARS_PRESETS[0].cardUrl,
            playerName: 'كيليان مبابي',
            playerSub: 'ريال مدريد • فرنسا',
            rating: '91',
            position: 'ST',
            marketPrice: '2,450,000 كوينز',
            badgeText: '🔥 مع نزول كروت الحدث رسمياً • FC 27',
            headline: 'قفل كرتك بأرخص سعر وأسرع شحن كوينز ⚡',
            subheadline: 'متوفر كوينز FC 27 لجميع المنصات بضمان شامل وضريبة مغطاة 100%',
            storeOffer: 'تسليم فوري خلال دقائق بضمان 100% من الباند',
            promoCode: 'كود خصم: SC15',
            ctaText: 'اطلب كوينز الكرت الآن عبر الخاص DM 📩',
            showCoinsStack: true,
            showBentoBadges: true,
            showPaymentChips: true,
            showFcLogo: true,
            showStoreLogo: true
        }
    },

    store_promo: {
        id: 'store_promo',
        name: '📱 ستوري المتجر الأصلية (الشرائط المكدسة)',
        icon: 'layers',
        description: 'تصميم ستوري إنستغرام الأصلي للمتجر: شرائط نصوص ملونة مكدسة بأعلى الشاشة مع كروت الحدث (2 أو 3 لاعبين) بالأسفل',
        defaultState: {
            bgTheme: 'store', // 'store' (الخلفية الرسمية السابقة), 'white', 'subtle'
            cardCount: 3, // 2 or 3
            banners: [
                { text: 'متوفر جميع كميات الكوينز 🤩', bg: '#0084FF', color: '#FFFFFF' },
                { text: 'وضمان كامل للنادي 🔒', bg: '#E50914', color: '#FFFFFF' },
                { text: 'وسرعة شحن خيالية المليون ينشحن خلال دقيقة 🔥🤯', bg: '#38B000', color: '#FFFFFF' },
                { text: 'وبأفضل الاسعار 🥳👏', bg: '#0084FF', color: '#FFFFFF' },
                { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#E1F5FE', color: '#1E293B' }
            ],
            card1_url: STARTER_BEASTS[0].imageUrl, // Reijnders / Núñez
            card1_name: 'داروين نونيز (77)',
            card1_price: '',
            card2_url: STARTER_BEASTS[1].imageUrl, // Center
            card2_name: 'عثمان ديمبيلي (86)',
            card2_price: '',
            card3_url: STARTER_BEASTS[2].imageUrl, // Leao / Wirtz
            card3_name: 'رافاييل لياو (86)',
            card3_price: ''
        }
    },
    market_tracker: {
        id: 'market_tracker',
        name: '📈 رادار ومؤشرات أسعار FUTBIN الحية',
        icon: 'trending-up',
        description: 'عرض 1 أو 2 أو 3 لاعبين مع صندوق تحليل السوق الحقيقي من فوت بين (التريند الأخضر/الأحمر، السعر، والمبيعات) لتحفيز الشراء الفوري',
        defaultState: {
            displayLayout: 'classic', // 'classic' | 'horizontal' | 'badge' | 'vs' | 'ticker' | 'pods' | 'spotlight'
            bgTheme: 'store', // 'store' | 'daylight_arena' | 'cyber_blue' | 'emerald_glow' | 'gold_lounge' | 'dark_neon'
            bgLighting: 'bright', // 'bright' | 'medium' | 'dim'
            cardCount: 2, // 1, 2, or 3
            platform: 'ps_xbox', // 'ps_xbox' | 'pc'
            badgeText: '🚨 رادار سوق FC 27 • تنبيه تحركات الأسعار في FUTBIN',
            headline: 'الأسعار في مسار تصاعدي! اشحن كوينزك وقفّل لاعبك قبل الارتفاع 📈⚡',
            subheadline: 'السوق يشهد قفزات سريعة.. لا تنتظر غلاء الكروت واقتنص نجومك الآن بأفضل سعر!',
            ctaHeadline: 'متوفر شحن كوينز فوري لجميع المنصات بأفضل الأسعار 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩',
            player1: {
                name: 'Bradley Barcola',
                arName: 'باركولا',
                rating: '85',
                position: 'LW',
                cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50596300.9b5dfc98a731bb7f8958c0eec6247d0bc94a42cb7d86de10a1c5482685f6b716.webp',
                price: '107,000',
                trend: '5.94% (+6K)',
                trendDir: 'up', // 'up' (green ▲) | 'down' (red ▼)
                recentSales: '108,000 | 108,000 | 109,000 | 109,000',
                priceRange: '600 - 150,000',
                updatedText: '35 SECS AGO',
                tag: '🔥 كرت ميتا صاعد'
            },
            player2: {
                name: 'Mohamed Salah',
                arName: 'محمد صلاح',
                rating: '87',
                position: 'RM',
                cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-209331.bdfc8b1e25229756f608e53457f6d58285771dcfddb855e6d723a3023f6aa7c2.webp',
                price: '21,250',
                trend: '8.97% (+1.75K)',
                trendDir: 'up',
                recentSales: '21,250 | 21,250 | 21,250 | 21,250',
                priceRange: '600 - 1,100,000',
                updatedText: '1 MINS AGO',
                tag: '⚡ فرصة اقتناص نادرة'
            },
            player3: {
                name: 'Lionel Messi',
                arName: 'ميسي',
                rating: '89',
                position: 'CAM',
                cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-158023.b7b052e75f1a00658907cbe5312eb4a62b2661631a6e0661b1924ec5e3f2a91c.webp',
                price: '68,000',
                trend: '2.86% (-2K)',
                trendDir: 'down',
                recentSales: '68,000 | 68,000 | 68,500 | 68,500',
                priceRange: '700 - 300,000',
                updatedText: '57 SECS AGO',
                tag: '📉 قاع سعري ممتاز للشراء'
            }
        }
    },
    promo_pack: {
        id: 'promo_pack',
        name: '🔥 باكات المتجر',
        icon: 'package',
        description: 'تسويق كوينز لفتح باكدجات المتجر محدودة الوقت والأيقونات مع عداد زمني وأضواء الووك أوت',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            packTitle: 'باكدج نجوم النخبة 85+ x10',
            packSub: 'فرصة خروج أيقونة أو لاعب حدث خارق 100%',
            packPrice: '650,000 كوينز',
            timeRemaining: '⏳ متبقي: 14 ساعة فقط',
            packImageUrl: 'assets/fc27_jumbo_gold_pack.png',
            star1_name: 'مبابي (91)',
            star1_url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            star2_name: 'بيلينغهام (90)',
            star2_url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
            badgeText: '🚨 باكدج متجر محدود الوقت • ينتهي عند 8:00 مساءً',
            headline: 'باكدج الـ 85+ x10 الخارق نزل بالمتجر! لا تفوت فرصة الأيقون 🎁🔥',
            subheadline: 'مطفر وما عندك كوينز؟ اشحن كوينزك الآن بـ 3 دقائق وافتح الباكدج قبل الحذف!',
            ctaHeadline: 'متوفر شحن كمية الباكدج فوراً لجميع المنصات 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    champs_squad: {
        id: 'champs_squad',
        name: '⚔️ تشكيلة الفوت تشامبيونز الأسبوعية',
        icon: 'shield',
        description: 'عرض تشكيلة وتكتيك الـ 15 فوز مع ميزانية الكوينز الإجمالية لبناء الفريق قبل بداية البطولة',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            formation: 'خطة 4-3-2-1 الميتا',
            rankTarget: '🏆 تشكيلة رانك 1 (15+ فوز مضمون)',
            squadBudget: '850,000 كوينز',
            chemistry: '33 / 33 كيمياء كاملة',
            card1: {
                role: 'الهداف الحاسم (ST)',
                name: 'كيليان مبابي',
                rating: '91 ST',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp'
            },
            card2: {
                role: 'صانع الألعاب والكنترول (CAM)',
                name: 'جود بيلينغهام',
                rating: '90 CAM',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp'
            },
            card3: {
                role: 'الجدار الدفاعي (CB)',
                name: 'فان دايك',
                rating: '89 CB',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-203376.17f57c8f215fff6f4edef3889583cc487fefce9b4e7ce1eeba235d634b7424b8.webp'
            },
            badgeText: '🏆 تكتيك وتشكيـلة الـ 15 فـوز • Weekend League FC 27',
            headline: 'التشكيلة الميتا لرانك 1 في الفوت تشامبيونز! قفلها اليوم ⚽⚡',
            subheadline: 'ميزانية التشكيلة كاملة متوفرة لدينا بخصم خاص وتسليم فوري خلال دقائق!',
            ctaHeadline: 'خصم 10% عند شحن ميزانية التشكيلة بالكامل 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    evo_boost: {
        id: 'evo_boost',
        name: '🧬 تطويرات الإيفولوشن الخارقة',
        icon: 'zap',
        description: 'مقارنة الكرت قبل وبعد التطوير وتكلفة الـ 100k كوينز لتحويله إلى وحش في الملعب',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            evoTitle: 'تطوير: الجناح الفولاذي (Relentless Winger)',
            evoCost: '100,000 كوينز',
            boostSummary: '+12 سرعة • +14 تسديد • +11 مراوغة',
            beforeCard: {
                name: 'باركولا (الكرت العادي)',
                rating: '80 LW',
                pac: '89',
                sho: '71',
                pas: '74',
                dri: '82',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50596300.9b5dfc98a731bb7f8958c0eec6247d0bc94a42cb7d86de10a1c5482685f6b716.webp'
            },
            afterCard: {
                name: 'باركولا (بعد الإيفو الخارق)',
                rating: '87 LW',
                pac: '98',
                sho: '85',
                pas: '84',
                dri: '93',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50596300.9b5dfc98a731bb7f8958c0eec6247d0bc94a42cb7d86de10a1c5482685f6b716.webp'
            },
            badgeText: '🧬 أقوى إيفولوشن نزل باللعبة • تحويل كرت عادي إلى غول!',
            headline: 'حوّل كرت بـ 15 ألف إلى أسطورة أقوى من كروت الملايين! 🤯🔥',
            subheadline: 'الإيفو الجديد نزل باللعبة.. اشحن كوينز تفعيل التطوير الآن وطوّره فوراً!',
            ctaHeadline: 'متوفر شحن كوينز تفعيل الإيفو فوراً بأفضل الأسعار 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    social_proof: {
        id: 'social_proof',
        name: '🤝 توثيق ثقة العملاء والتحويلات',
        icon: 'check-circle',
        description: 'توثيق شحن فوري حقيقي وتقييم 5 نجوم وبادجات الضريبة والأمان 0% باند لكسر تردد العميل',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            amountLoaded: '1,500,000 كوينز',
            deliveryTime: '3 دقائق و 45 ثانية',
            platform: 'PlayStation 5',
            customerName: 'فهد الشمري (الرياض)',
            rating: '5/5',
            reviewText: 'والله أفضل متجر تعاملت معه، سرعة خيالية وناديي في أمان تام وتم شحن المليون ونص كاملة بدون أي نقص!',
            proofTag: '✅ تم الشحن بنجاح وتم تسليم الحساب للعميل',
            badgeText: '🛡️ توثيق عمليات الشحن اليومية • ثقة أكثر من 5000 عميل',
            headline: 'شحن فوري جديد تم بنجاح! ناديك في أمان تام 100% 🔒⚡',
            subheadline: 'ضمان شامل الضريبة وضمان النادي بالكامل.. اشحن كوينزك وأنت مرتاح البال!',
            ctaHeadline: 'جاهز تشحن ناديك وتستلم خلال دقائق؟ 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    flash_sale: {
        id: 'flash_sale',
        name: '💰 جدول باقات الكوينز والعروض',
        icon: 'dollar-sign',
        description: 'جدول باقات كوينز فاخر (500k, 1M, 2M) مع شارات الأكثر طلباً والخصومات السريعة',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            saleTitle: 'عروض كوينز الويكند الحارقة ⚡',
            saleExpiry: '⏳ العرض ساري حتى منتصف الليل فقط',
            tier1: {
                amount: '500,000 كوينز',
                oldPrice: '15$',
                price: '11$',
                badge: '⚡ باقة البداية'
            },
            tier2: {
                amount: '1,000,000 كوينز',
                oldPrice: '28$',
                price: '21$',
                badge: '⭐ الأكثر طلباً'
            },
            tier3: {
                amount: '2,000,000 كوينز',
                oldPrice: '52$',
                price: '39$',
                badge: '👑 باقة الحيتان VIP'
            },
            badgeText: '⚡ عروض كوينز حصرية لفترة محدودة • أسعار اليوم الأقوى',
            headline: 'باقات الكوينز الأقوى لجميع المنصات! اختر باقتك واستلم بدقيقة 💰🔥',
            subheadline: 'جميع الباقات تشمل تغطية الضريبة 100% وتسليم فوري بدون انتظار!',
            ctaHeadline: 'الكميات تنفد سريعاً.. اطلب باقتك عبر الخاص الآن 📩',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    loaded_accounts: {
        id: 'loaded_accounts',
        name: '🎮 حسابات جاهزة للبيع',
        icon: 'database',
        description: 'عرض حساب فيفا كامل محمل بالكوينز مع ماركت ويب آب مفتوح وتسليم فوري',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            platform: 'PlayStation 5',
            coinsBalance: '2,500,000 كوينز',
            marketStatus: '✅ الماركت مفتوح بالويب آب واللعبة',
            clubLevel: 'ديفيجن 2 • نادي نظيف 100%',
            accountEmail: 'إيميل أساسي أصلي قابل للنقل بالكامل',
            priceTag: '79$',
            oldPrice: '99$',
            badgeText: '🎮 حسابات فيفا جاهزة ومضمونة • تسليم فوري بالبيانات الأصلية',
            headline: 'حساب بلايستيشن 5 محمل بـ 2.5M كوينز كاش جاهز للعب! ⚡🔥',
            subheadline: 'الماركت مفتوح بالويب آب.. استلم الإيميل والباسورد فوراً وابدأ اللعب بنجومك!',
            ctaHeadline: 'متوفر حسابات لجميع المنصات.. اطلب حسابك عبر الخاص 📩',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    squad_makeover: {
        id: 'squad_makeover',
        name: '🛠️ تجديد التشكيلة (قبل / بعد)',
        icon: 'refresh-cw',
        description: 'استعراض تحول تشكيلة العميل من ديفيجن ضعيف إلى إليت بالكوينز لجلب طلبات بالخاص',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            beforeRank: 'ديفيجن 4 • كيمياء 23/33 (تشكيلة عادية)',
            afterRank: 'ديفيجن إليت 👑 • كيمياء 33/33 (تشكيلة ميتا)',
            upgradeCost: '850,000 كوينز',
            card1_url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            card1_name: 'مبابي (91)',
            card2_url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
            card2_name: 'بيلينغهام (90)',
            badgeText: '🛠️ خدمة تجديد التشكيلات وتطوير الفرق • استشارات المتجر الاحترافية',
            headline: 'حوّلنا فريق عميلنا من ديفيجن 4 إلى ديفيجن إليت بالكوينز! 🤯⚡',
            subheadline: 'أرسل تشكيلتك الحالية على الخاص.. ونعطيك أفضل 3 تبديلات تضبط فريقك مع خصم خاص!',
            ctaHeadline: 'أرسل تشكيلتك على الخاص واستشر خبير المتجر مجاناً 📩',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    player_duel: {
        id: 'player_duel',
        name: '🥊 معركة النجوم وتصويت الستوري',
        icon: 'swords',
        description: 'مواجهة رأس برأس ومقارنة طاقات مع مساحة مخصصة لستيكر تصويت إنستغرام',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            card1: {
                name: 'كيليان مبابي',
                rating: '91 ST',
                stat1: '97 سرعة',
                stat2: '90 تسديد',
                stat3: '92 مراوغة',
                price: '1,850,000 كوينز',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp'
            },
            card2: {
                name: 'فينيسيوس جونيور',
                rating: '90 LW',
                stat1: '95 سرعة',
                stat2: '84 تسديد',
                stat3: '91 مراوغة',
                price: '1,250,000 كوينز',
                url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp'
            },
            pollPrompt: 'من الأفضل لقيادة هجوم ناديك في الفوت؟ صوت تحت 👇',
            badgeText: '🥊 معركة نجوم الفوت • مقارنة الطاقات واستفتاء المتابعين',
            headline: 'مبابي ضد فينيسيوس: من المهاجم الأفضل لناديك في الفوت؟ 🤔🔥',
            subheadline: 'صوّت لنجمك المفضل بالستيكر.. وكوينز الاثنين متوفرة تسليم فوري بالمتجر!',
            ctaHeadline: 'أياً كان خيارك.. كوينز النجمين متوفرة تسليم فوري ⚡',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    budget_beast: {
        id: 'budget_beast',
        name: '💎 تشكيلة الميزانية الذكية (250k)',
        icon: 'zap',
        description: 'تشكيلة الميتا المرعبة بـ 250 ألف كوينز لقهر فرق الملايين بأسعار في متناول الجميع',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            squadCost: '250,000 كوينز فقط',
            squadTitle: 'ثلاثي الهجوم الخارق الميتا',
            highlightPill: '⚡ سرعة جنونية + إنهاء قاتل بـ 250k',
            card1: {
                name: 'داروين نونيز',
                rating: '82 ST',
                trait: 'صاروخ بدني 90 PAC',
                url: STARTER_BEASTS[0].imageUrl
            },
            card2: {
                name: 'عثمان ديمبيلي',
                rating: '86 RW',
                trait: '5 نجوم مهارات وقدم',
                url: STARTER_BEASTS[1].imageUrl
            },
            card3: {
                name: 'رافاييل لياو',
                rating: '86 LW',
                trait: 'قوة وسرعة لا تصد',
                url: STARTER_BEASTS[2].imageUrl
            },
            badgeText: '💎 تشكيلات الميزانية الذكية • قهر فرق الملايين بأقل تكلفة',
            headline: 'تشكيلة الـ 250 ألف كوينز الميتا التي تجلد فرق الملايين! 🤯🔥',
            subheadline: 'لا تحتاج ملايين حتى تفوز.. هؤلاء الثلاثة يضمنون لك الفوز برانك الفوت!',
            ctaHeadline: 'اشحن كوينز التشكيلة كاملة بدقائق بسعر رمزي 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    player_review: {
        id: 'player_review',
        name: '🔍 مراجعة الكرت بعد 50 مباراة',
        icon: 'star',
        description: 'مراجعة أداء كرت ميتا خارق بعد 50 مباراة مع إيجابيات وسلبيات وتقييم نهائي وشحن فوري',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            playerCardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            playerName: 'كيليان مبابي (91 ST)',
            playerPrice: '1,850,000 كوينز',
            gamesPlayed: '50 مباراة فوت تشامبيونز',
            goalsStats: '68 هدف ⚽ • 24 أسيست 👟',
            pro1: '🟢 سرعة انفجارية مستحيل اللحاق به',
            pro2: '🟢 إنهاء قاتل بالقدمين من أي زاوية',
            con1: '🔴 سعره مرتفع ويحتاج ميزانية مخصصة',
            finalScore: '9.8 / 10',
            verdictTitle: 'الحكم النهائي: كرت حاسم يضمن لك الـ 15 فوز 👑',
            badgeText: '🔍 مراجعات كروت الميتا بعد 50 مباراة • حكم الخبراء المعتمد',
            headline: 'مراجعة مبابي بعد 50 مباراة فوت: هل يستاهل كوينزه؟ 🤔🔥',
            subheadline: 'الأرقام والإيجابيات لا تكذب.. الكرت يحسم المباريات الصعبة بمفرده!',
            ctaHeadline: 'متوفر شحن كوينز الكرت فوراً لناديك بأفضل سعر 💰',
            ctaSub: 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'
        }
    },
    custom_story: {
        id: 'custom_story',
        name: '✨ قالب خاص',
        icon: 'sparkles',
        description: 'قالب خاص ومخصص بالكامل يتم تصميمه وبرمجته حسب فكرتك وعناصرك بدقة واحترافية',
        defaultState: {
            bgTheme: 'store',
            bgLighting: 'bright',
            badgeText: '✨ تصميم خاص وحصري • متجر ShopCoin15',
            headline: 'عنوان الستوري الخاص بك 🔥',
            subheadline: 'اشرح فكرتك وسنقوم ببرمجة التصميم وتطبيقه هنا فوراً!',
            customText1: 'عنصر مخصص 1',
            customText2: 'عنصر مخصص 2',
            ctaHeadline: 'للطلب والاستفسار تواصل معنا على الخاص 📩',
            ctaSub: 'خدمة سريعة ومضمونة 100% • تسليم فوري'
        }
    },
    trio: {
        id: 'trio',
        name: '👑 تريو 3 لاعبين متداخلين',
        icon: 'users',
        description: 'عرض 3 بطاقات رسمية متداخلة لنجوم اللعبة مع إبراز عروض شحن الكوينز',
        defaultState: {
            bgTheme: 'store',
            gameVersion: 'FC 27',
            card1_url: STARTER_BEASTS[0].imageUrl, // Darwin Núñez (77)
            card1_name: 'داروين نونيز (77)',
            card1_price: '~8,500 كوينز',
            card2_url: STARTER_BEASTS[1].imageUrl, // Dembélé (86) Center Front
            card2_name: 'عثمان ديمبيلي (86)',
            card2_price: '~48,000 كوينز',
            card3_url: STARTER_BEASTS[2].imageUrl, // Rafael Leão (86)
            card3_name: 'رافاييل لياو (86)',
            card3_price: '~38,000 كوينز',
            badgeText: '⚡ تشكيلة بداية FC 27 النارية • شحن فوري وآمن 100%',
            headline: 'تبي تبدأ تشكيلتك بقوة من أول يوم؟ 🔥',
            subheadline: 'متجر @shop_coin15 يوفر لك كوينز لبداية FC 27 لجميع المنصات بأفضل سعر وضمان شامل الضريبة',
            ctaText: 'اطلب كوينز تشكيلة البداية بالخاص DM 📩'
        }
    },
    market_drop: {
        id: 'market_drop',
        name: '📉 هبوط أسعار السوق وفرصة الشحن',
        icon: 'trending-down',
        description: 'مقارنة سعر الكرت في السوق قبل وبعد النزول لتحفيز الشراء الفوري',
        defaultState: {
            bgTheme: 'store',
            gameVersion: 'FC 27',
            cardImageUrl: POPULAR_FUTGG_STARS[0].imageUrl, // Mbappe
            playerName: 'Kylian Mbappé',
            playerArName: 'كيليان مبابي',
            rating: '91',
            position: 'ST',
            oldPrice: '3,200,000',
            newPrice: '2,450,000',
            savingBadge: 'وفر 750,000 كوينز الآن! 📉',
            badgeText: '🚨 تنبيه نزول أسعار السوق',
            headline: 'الأسعار نازلة في السوق! فرصة ما تتعوض 🔥',
            subheadline: 'السوق الآن في أدنى مستوياته.. اشحن كوينزك الآن وقفل كرتك بأرخص سعر قبل ارتفاع السوق بالويكند!',
            ctaText: 'اطلب كوينزك الآن بالخاص DM واستغل النزول ⚡'
        }
    },
    sbc: {
        id: 'sbc',
        name: '⚡ ستوري تحديات وترقيات الـ SBC',
        icon: 'zap',
        description: 'تصميم ستوري إنستغرام لخدمات التحديات والترقيات: شرائط نصوص ملونة مكدسة بالأعلى مع بطاقة التحدي الكاملة من الموقع أو اللعبة بالأسفل',
        defaultState: {
            bgTheme: 'store',
            gameVersion: 'FC 27',
            sbcTitle: 'Marquee Matchups (مباريات القمة)',
            sbcImageUrl: 'assets/sbc_marquee_matchups_card.png',
            sbcScale: 100,
            sbcPosY: 15,
            banners: [
                { text: 'توفرت مباريات القمة الأسبوعية الآن 🔥', bg: '#0084FF', color: '#FFFFFF' },
                { text: 'نحل لك التحدي كامل وبأفضل الأسعار 🚨', bg: '#E50914', color: '#FFFFFF' },
                { text: 'وسرعة كبيرة بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
                { text: 'ضمان كامل للنادي بدون أي تصفير أو بان 🔒', bg: '#0084FF', color: '#FFFFFF' },
                { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
            ]
        }
    },
    potm: {
        id: 'potm',
        name: '🏆 لاعب الشهر (Player of the Month)',
        icon: 'award',
        description: 'قالب إعلاني مخصص حصرياً لبطاقات وتحديات لاعبي الشهر (POTM) لجميع الدوريات الرسمية',
        defaultState: {
            bgTheme: 'store',
            gameVersion: 'FC 27',
            league: 'pl',
            cardImageUrl: POPULAR_FUTGG_STARS[0].imageUrl,
            playerName: 'Kylian Mbappé',
            playerArName: 'كيليان مبابي',
            rating: '92',
            position: 'ST',
            badgeText: '🏆 رسميـاً: لاعب الشهر في FC 27 • Player of the Month',
            headline: 'نزل كرت مبابي لاعب الشهر رسمياً! 👑🔥',
            sbcCost: '~2,450,000 كوينز صافية (20 تشكيلة)',
            storeOffer: 'نوفر لك كوينز التحدي كاملة شاملة الضريبة ونقفله بحسابك بدون ما تضحي بنجوم ناديك!',
            ctaText: 'ارسل اسم اللاعب بالخاص ونقفل لك التحدي فوراً 📩'
        }
    }
};

const POTM_LEAGUES = {
    pl: {
        id: 'pl',
        name: 'الدوري الإنجليزي (Premier League)',
        shortName: 'Premier League',
        badge: '🦁 الدوري الإنجليزي الممتاز',
        gradient: 'from-[#38003c] via-[#200028] to-[#040008]',
        accent: '#00ff85',
        accentBg: '#38003c',
        textColor: '#00ff85',
        subColor: '#e90052',
        border: 'border-[#00ff85]/60',
        glow: 'rgba(0, 255, 133, 0.35)'
    },
    laliga: {
        id: 'laliga',
        name: 'الدوري الإسباني (LaLiga EA Sports)',
        shortName: 'LaLiga EA Sports',
        badge: '⚡ الدوري الإسباني لا ليغا',
        gradient: 'from-[#ff0036] via-[#1a0008] to-[#080003]',
        accent: '#ff4b4b',
        accentBg: '#ff0036',
        textColor: '#ffffff',
        subColor: '#ffbb00',
        border: 'border-[#ff0036]/60',
        glow: 'rgba(255, 0, 54, 0.35)'
    },
    serie_a: {
        id: 'serie_a',
        name: 'الدوري الإيطالي (Serie A Enilive)',
        shortName: 'Serie A Enilive',
        badge: '🛡️ الدوري الإيطالي سيريا آي',
        gradient: 'from-[#024488] via-[#001736] to-[#010a18]',
        accent: '#0084ff',
        accentBg: '#024488',
        textColor: '#00f0ff',
        subColor: '#00ffaa',
        border: 'border-[#0084ff]/60',
        glow: 'rgba(0, 132, 255, 0.35)'
    },
    bundesliga: {
        id: 'bundesliga',
        name: 'الدوري الألماني (Bundesliga)',
        shortName: 'Bundesliga',
        badge: '⚽ الدوري الألماني بوندسليغا',
        gradient: 'from-[#d20515] via-[#1f0205] to-[#080102]',
        accent: '#ff1744',
        accentBg: '#d20515',
        textColor: '#ffffff',
        subColor: '#ffea00',
        border: 'border-[#d20515]/60',
        glow: 'rgba(210, 5, 21, 0.35)'
    },
    ligue1: {
        id: 'ligue1',
        name: 'الدوري الفرنسي (Ligue 1)',
        shortName: 'Ligue 1',
        badge: '🏆 الدوري الفرنسي ليغ 1',
        gradient: 'from-[#091c3e] via-[#040e22] to-[#01050e]',
        accent: '#00f77f',
        accentBg: '#091c3e',
        textColor: '#00f77f',
        subColor: '#2b7fff',
        border: 'border-[#00f77f]/60',
        glow: 'rgba(0, 247, 127, 0.35)'
    }
};

const POPULAR_POTM_STARS = [
    {
        name: '👑 مبابي (92 POTM)',
        url: 'https://www.fut.gg/players/231747-kylian-mbappe/',
        arName: 'كيليان مبابي',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
        rating: '92',
        position: 'ST',
        league: 'laliga',
        sbcCost: '2,450,000 كوينز صافية (20 تشكيلة)'
    },
    {
        name: '⚡ بوكايو ساكا (88 POTM)',
        url: 'https://www.fut.gg/players/246669-bukayo-saka/',
        arName: 'بوكايو ساكا',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
        rating: '88',
        position: 'RW',
        league: 'pl',
        sbcCost: '480,000 كوينز صافية (6 تشكيلات)'
    },
    {
        name: '🤖 هالاند (91 POTM)',
        url: 'https://www.fut.gg/players/239085-erling-haaland/',
        arName: 'إرلينغ هالاند',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
        rating: '91',
        position: 'ST',
        league: 'pl',
        sbcCost: '1,400,000 كوينز صافية (11 تشكيلة)'
    },
    {
        name: '💎 لامين يامال (87 POTM)',
        url: 'https://www.fut.gg/players/274438-lamine-yamal/',
        arName: 'لامين يامال',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
        rating: '87',
        position: 'RW',
        league: 'laliga',
        sbcCost: '390,000 كوينز صافية (5 تشكيلات)'
    },
    {
        name: '👑 فينيسيوس جونيور (91 POTM)',
        url: 'https://www.fut.gg/players/238794-vinicius-jr/',
        arName: 'فينيسيوس جونيور',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
        rating: '91',
        position: 'LW',
        league: 'laliga',
        sbcCost: '1,750,000 كوينز صافية (15 تشكيلة)'
    },
    {
        name: '👑 جود بيلينغهام (91 POTM)',
        url: 'https://www.fut.gg/players/252371-jude-bellingham/',
        arName: 'جود بيلينغهام',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
        rating: '91',
        position: 'CAM',
        league: 'laliga',
        sbcCost: '1,200,000 كوينز صافية (12 تشكيلة)'
    }
];

const SBC_PRESETS = [
    {
        name: '📦 مباريات القمة (نفس تصميم الموقع والتطبيق تماماً)',
        title: 'Marquee Matchups',
        imageUrl: 'assets/sbc_marquee_matchups_card.png',
        banners: [
            { text: 'توفرت مباريات القمة الأسبوعية الآن 🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نحل لك التحدي كامل وبأفضل الأسعار 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة كبيرة بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'ضمان كامل للنادي بدون أي تصفير أو بان 🔒', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ]
    },
    {
        name: '🌐 League & Nation (تصميم FUT.GG المباشر)',
        title: 'League & Nation Advanced',
        imageUrl: 'assets/sbc_league_nation.png',
        banners: [
            { text: 'تحديات بناء التشكيلات المتقدمة 🌐', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نحل لك أصعب التحديات بأرخص حلول الكوينز 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'واحصل على جوائز باكدجات خرافية 🤩', bg: '#E50914', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ]
    },
    {
        name: '👑 تحدي الأيقون 88+ (Encore Icon)',
        title: '1 of 3 88+ Encore Icon',
        imageUrl: 'assets/fc27_jumbo_gold_pack.png',
        banners: [
            { text: 'تحدي الأيقون الـ 88+ الجديد نزل الآن 👑🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'وفر كوينزك وقفله معنا بأقل تكلفة ممكنة 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'ضمان كامل للنادي وسرعة تنفيذ خيالية 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ]
    },
    {
        name: '🌟 ترقية 81+ اختيارية (Player Pick)',
        title: '1 of 3 81+ Player Pick',
        imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=800/2027/sbcs/challenges/18.png',
        banners: [
            { text: 'أقوى ترقية باللعبة الآن 🔥😁', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نسويلك الكمية الي تبيها وبأسعار ممتازة جداً 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'متوفر من 50 ترقية لين 1000 ترقية 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ]
    }
];

const MARKET_DISPLAY_LAYOUTS = [
    { id: 'classic', name: 'الكلاسيكي الموزّع', icon: '🏛️', desc: 'كروت بأعلى وصناديق فوت بين تحتها' },
    { id: 'horizontal', name: 'الشرائط الأفقية', icon: '💳', desc: 'كل لاعب بشريط زجاجي عريض ومدمج' },
    { id: 'badge', name: 'درع السعر العائم', icon: '🛡️', desc: 'كروت كبيرة مع بادج سعر وضاء ملتصق' },
    { id: 'vs', name: 'مواجهة رادار (VS)', icon: '⚔️', desc: 'مقارنة نارية ثنائية وجهاً لوجه' },
    { id: 'ticker', name: 'بورصة وتداول الماركت', icon: '📊', desc: 'كروت مع جدول صفقات مالي احترافي' },
    { id: 'pods', name: 'كبسولات زجاجية', icon: '💎', desc: 'حاوية زجاجية موحدة للكارت والسعر' },
    { id: 'spotlight', name: 'بطل مع رادار مصغر', icon: '🌟', desc: 'كارت بطل رئيسي مع صفقات سريعة' }
];

const MARKET_BG_THEMES = {
    store: {
        id: 'store',
        name: '🏛️ رخام ملكي أبيض وذهبي',
        url: 'assets/store-bg-pure.png',
        isLight: true,
        desc: 'ناصع وفائق الفخامة'
    },
    daylight_arena: {
        id: 'daylight_arena',
        name: '🏟️ ستاديوم نهاري ناصع',
        url: 'assets/shopcoin_arena_bg.jpg',
        isLight: false,
        style: 'filter: brightness(1.22) saturate(1.15);',
        desc: 'أجواء استاديوم نهاري مشرق'
    },
    cyber_blue: {
        id: 'cyber_blue',
        name: '⚡ سايبر بلو نيون مشرق',
        url: 'assets/story-bg.jpg',
        isLight: false,
        style: 'filter: hue-rotate(190deg) brightness(1.2) contrast(1.1);',
        desc: 'طاقة وأضواء زرقاء حيوية'
    },
    emerald_glow: {
        id: 'emerald_glow',
        name: '🌿 زمردي متجر الكوينز المشع',
        url: 'assets/story-bg.jpg',
        isLight: false,
        style: 'filter: hue-rotate(90deg) brightness(1.25) saturate(1.2);',
        desc: 'أخضر زمردي مبهج ومضاء'
    },
    gold_lounge: {
        id: 'gold_lounge',
        name: '👑 صالة الذهب VIP الملكية',
        url: 'assets/shopcoin_gold_lounge.jpg',
        isLight: false,
        style: 'filter: brightness(1.15) saturate(1.1);',
        desc: 'صالة ذهبية فخمة ودافئة'
    },
    dark_neon: {
        id: 'dark_neon',
        name: '🌌 مدرج ليلي بأضواء كاشفة',
        url: 'assets/story-bg.jpg',
        isLight: false,
        style: 'filter: brightness(1.05) contrast(1.15);',
        desc: 'مدرج ليلي بأضواء كاشفة وضاءة'
    }
};

window.TEMPLATES = TEMPLATES;
window.POPULAR_FUTGG_STARS = POPULAR_FUTGG_STARS;
window.STARTER_BEASTS = STARTER_BEASTS;
window.STORE_BANNER_THEMES = STORE_BANNER_THEMES;
window.POTM_LEAGUES = POTM_LEAGUES;
window.POPULAR_POTM_STARS = POPULAR_POTM_STARS;
window.SBC_PRESETS = SBC_PRESETS;
window.SHOWCASE_BG_THEMES = SHOWCASE_BG_THEMES;
window.SHOWCASE_STARS_PRESETS = SHOWCASE_STARS_PRESETS;
window.MARKET_DISPLAY_LAYOUTS = MARKET_DISPLAY_LAYOUTS;
window.MARKET_BG_THEMES = MARKET_BG_THEMES;



