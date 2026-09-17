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

const TEMPLATES = {
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

window.TEMPLATES = TEMPLATES;
window.POPULAR_FUTGG_STARS = POPULAR_FUTGG_STARS;
window.STARTER_BEASTS = STARTER_BEASTS;
window.STORE_BANNER_THEMES = STORE_BANNER_THEMES;
window.POTM_LEAGUES = POTM_LEAGUES;
window.POPULAR_POTM_STARS = POPULAR_POTM_STARS;
window.SBC_PRESETS = SBC_PRESETS;
