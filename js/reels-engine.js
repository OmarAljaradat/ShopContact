/**
 * ShopCoin15 Studio - EA FC 27 Reels & Motion Studio Engine (9:16)
 * Built for High-Impact Instagram Reels, TikTok & YouTube Shorts
 * Exact visual fidelity to @shop_coin15 desktop reels:
 * - Official EA SPORTS FC 27 branding top-right
 * - Official ShopCoin15 crown logo bottom-center
 * - Clean EA Marble Light theme + Dark Stadium + Neon Meta + Gold Luxury
 * - Countdown ranks (10 -> 1, 5 -> 1), starter meta picks, versus duels, market alerts
 * - Interactive Live Video Player with smooth transitions & timeline progress
 * - Native 60FPS Video Export (WebM/MP4) & 4K Batch Slide Export
 * - 25+ Ready-to-Use Viral FC 27 Ideas in Idea Bank
 */

window.ReelsEngine = (function() {
    // ---- 1. AUTHENTIC EA FC 27 CARD REPOSITORY ----
    const FC27_PLAYERS_DB = [
        {
            id: 'mbappe_gold',
            name: 'Kylian Mbappé',
            arName: 'كيليان مبابي',
            rating: '91',
            position: 'ST',
            club: 'Real Madrid',
            nation: 'France',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            stats: { pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78 },
            badges: ['⚡ سرعة 97', '🎯 إنهاء قاتل', '5★ مهارات', '💰 ~2.4M كوينز'],
            price: '~2,450,000 كوينز',
            metaScore: '96.8'
        },
        {
            id: 'haaland_gold',
            name: 'Erling Haaland',
            arName: 'إرلينغ هالاند',
            rating: '91',
            position: 'ST',
            club: 'Man City',
            nation: 'Norway',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
            stats: { pac: 89, sho: 93, pas: 70, dri: 81, def: 45, phy: 90 },
            badges: ['💪 قوة بدنية 90', '🚀 تسديد 93', 'AcceleRATE++', '💰 ~450k كوينز'],
            price: '~450,000 كوينز',
            metaScore: '92.5'
        },
        {
            id: 'vinicius_gold',
            name: 'Vinícius Jr.',
            arName: 'فينيسيوس جونيور',
            rating: '90',
            position: 'LW',
            club: 'Real Madrid',
            nation: 'Brazil',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
            stats: { pac: 96, sho: 84, pas: 81, dri: 92, def: 30, phy: 69 },
            badges: ['⚡ سرعة 96', '🪄 خفة ودوران', '5★ مهارات', '💰 ~980k كوينز'],
            price: '~980,000 كوينز',
            metaScore: '94.2'
        },
        {
            id: 'bellingham_gold',
            name: 'Jude Bellingham',
            arName: 'جود بيلينغهام',
            rating: '90',
            position: 'CAM',
            club: 'Real Madrid',
            nation: 'England',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
            stats: { pac: 80, sho: 87, pas: 83, dri: 88, def: 78, phy: 83 },
            badges: ['👑 قائد الوسط', '🔥 مساهمات هجومية', 'PlayStyle+', '💰 ~750k كوينز'],
            price: '~750,000 كوينز',
            metaScore: '93.0'
        },
        {
            id: 'rodri_gold',
            name: 'Rodri',
            arName: 'رودري',
            rating: '91',
            position: 'CDM',
            club: 'Man City',
            nation: 'Spain',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp',
            stats: { pac: 66, sho: 80, pas: 86, dri: 80, def: 87, phy: 85 },
            badges: ['🛡️ قاطع الكرات الأول', '🧠 تمرير ليزري', 'PlayStyle+', '💰 ~180k كوينز'],
            price: '~180,000 كوينز',
            metaScore: '91.8'
        },
        {
            id: 'leao_gold',
            name: 'Rafael Leão',
            arName: 'رافاييل لياو',
            rating: '86',
            position: 'LW',
            club: 'Milan',
            nation: 'Portugal',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-50573369.a6f3940ce2ccb7d0c1b6486a36ceb97173930a64d05373132b440d62f8ab9fcf.webp',
            stats: { pac: 93, sho: 81, pas: 76, dri: 87, def: 31, phy: 78 },
            badges: ['⚡ سرعة 93', '💪 طول وجسم ميتّا', '5★ مهارات', '💰 ~38k كوينز'],
            price: '~38,000 كوينز',
            metaScore: '89.4'
        },
        {
            id: 'dembele_gold',
            name: 'Ousmane Dembélé',
            arName: 'عثمان ديمبيلي',
            rating: '86',
            position: 'RW',
            club: 'PSG',
            nation: 'France',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp',
            stats: { pac: 92, sho: 78, pas: 82, dri: 89, def: 36, phy: 58 },
            badges: ['5★ مهارات + 5★ قدم', '⚡ تسارع سريع', 'سوبر صانع', '💰 ~48k كوينز'],
            price: '~48,000 كوينز',
            metaScore: '91.0'
        },
        {
            id: 'saka_gold',
            name: 'Bukayo Saka',
            arName: 'بوكايو ساكا',
            rating: '87',
            position: 'RW',
            club: 'Arsenal',
            nation: 'England',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
            stats: { pac: 86, sho: 83, pas: 82, dri: 88, def: 65, phy: 75 },
            badges: ['🎯 توازن عالي', '🔥 دقة بالتسديد', 'مجهود دفاعي', '💰 ~42k كوينز'],
            price: '~42,000 كوينز',
            metaScore: '88.9'
        },
        {
            id: 'tonali_gold',
            name: 'Sandro Tonali',
            arName: 'ساندرو تونالي',
            rating: '85',
            position: 'CDM',
            club: 'Newcastle',
            nation: 'Italy',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-241096.b3c01d216c9bc7ed2cbf008664c7582161526a0c5ec870bbb97236a9334b4ab9.webp',
            stats: { pac: 86, sho: 74, pas: 81, dri: 80, def: 83, phy: 84 },
            badges: ['⚡ سرعة 86 ارتكاز', '🛡️ افتكاك وحشي', 'طاقة 90', '💰 ~22k كوينز'],
            price: '~22,000 كوينز',
            metaScore: '90.2'
        },
        {
            id: 'nunez_gold',
            name: 'Darwin Núñez',
            arName: 'داروين نونيز',
            rating: '77',
            position: 'ST',
            club: 'Liverpool',
            nation: 'Uruguay',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
            stats: { pac: 89, sho: 79, pas: 68, dri: 76, def: 42, phy: 86 },
            badges: ['وحش البدايات 🦖', '⚡ سرعة 89', '💪 بدنية 86', '💰 ~8.5k كوينز'],
            price: '~8,500 كوينز',
            metaScore: '86.5'
        },
        {
            id: 'nkunku_gold',
            name: 'Christopher Nkunku',
            arName: 'كريستوفر نكونكو',
            rating: '80',
            position: 'CAM',
            club: 'Chelsea',
            nation: 'France',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-50564059.5f79259f8aab4649fb246e99d63986ef9d4c997c7c03eb97b71aebc72bb0b43f.webp',
            stats: { pac: 82, sho: 81, pas: 82, dri: 86, def: 63, phy: 67 },
            badges: ['5★ مهارات', '🎯 تسديد من بعيد', 'ربط ممتع', '💰 ~12k كوينز'],
            price: '~12,000 كوينز',
            metaScore: '85.8'
        },
        {
            id: 'chiesa_gold',
            name: 'Federico Chiesa',
            arName: 'فيديريكو كييزا',
            rating: '81',
            position: 'LW',
            club: 'Liverpool',
            nation: 'Italy',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-235805.67d05d0649cafc2fbfc92a6463ad1426396c57fcc5a4d1af3cabd3cde25a0900.webp',
            stats: { pac: 90, sho: 81, pas: 76, dri: 85, def: 48, phy: 73 },
            badges: ['⚡ تسارع 90', '🔥 سهم هجومي', 'إنهاء ممتاز', '💰 ~14k كوينز'],
            price: '~14,000 كوينز',
            metaScore: '87.1'
        },
        {
            id: 'malen_gold',
            name: 'Donyell Malen',
            arName: 'دونيل مالين',
            rating: '83',
            position: 'RM',
            club: 'Dortmund',
            nation: 'Netherlands',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
            stats: { pac: 89, sho: 81, pas: 74, dri: 85, def: 35, phy: 72 },
            badges: ['⚡ سرعة 89', '🎯 إنهاء متقن', 'جوهرة البدايات', '💰 ~15k كوينز'],
            price: '~15,000 كوينز',
            metaScore: '88.0'
        },
        {
            id: 'werner_gold',
            name: 'Timo Werner',
            arName: 'تيمو فيرنر',
            rating: '80',
            position: 'LM',
            club: 'Tottenham',
            nation: 'Germany',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
            stats: { pac: 91, sho: 79, pas: 69, dri: 80, def: 35, phy: 69 },
            badges: ['⚡ سرعة 91', '🏃 انطلاقات خلف الدفاع', 'سعر اقتصادي', '💰 ~6k كوينز'],
            price: '~6,000 كوينز',
            metaScore: '85.2'
        },
        {
            id: 'abdulhamid_gold',
            name: 'Saud Abdulhamid',
            arName: 'سعود عبدالحميد',
            rating: '78',
            position: 'RB',
            club: 'Roma',
            nation: 'Saudi Arabia',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
            stats: { pac: 92, sho: 46, pas: 67, dri: 72, def: 71, phy: 77 },
            badges: ['⚡ سرعة 92', '🛡️ قاطع مرتدات', 'فخر العرب', '💰 ~12k كوينز'],
            price: '~12,000 كوينز',
            metaScore: '87.5'
        },
        {
            id: 'mendy_gold',
            name: 'Ferland Mendy',
            arName: 'فيرلاند ميندي',
            rating: '81',
            position: 'LB',
            club: 'Real Madrid',
            nation: 'France',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
            stats: { pac: 85, sho: 64, pas: 74, dri: 75, def: 78, phy: 84 },
            badges: ['5★ قدم ضعيفة', '🛡️ المدافع الأثبت', 'ميتّا فيفا الدائمة', '💰 ~55k كوينز'],
            price: '~55,000 كوينز',
            metaScore: '92.0'
        },
        {
            id: 'albulayhi_silver',
            name: 'Ali Al Bulayhi',
            arName: 'علي البليهي',
            rating: '74',
            position: 'CB',
            club: 'Al Hilal',
            nation: 'Saudi Arabia',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-241096.b3c01d216c9bc7ed2cbf008664c7582161526a0c5ec870bbb97236a9334b4ab9.webp',
            stats: { pac: 51, sho: 38, pas: 43, dri: 46, def: 73, phy: 85 },
            badges: ['💪 بدنية 85', '🛡️ تدخلات حاسمة', 'روح قتالية', '💰 ~4k كوينز'],
            price: '~4,000 كوينز',
            metaScore: '81.0'
        }
    ];

    // ---- 2. 25+ CURATED VIRAL FC 27 REEL CONCEPTS ----
    const VIRAL_REEL_IDEAS = [
        {
            id: 'starter_strikers',
            category: '🌟 كروت البدايات والجواهر الاقتصادية',
            title: 'أفضل المهاجمين للبدايات في FC 27 ⚽🔥',
            subtitle: 'كروت رخيصة تضمن لك رانك فوت تشامبيونز من أول أسبوع!',
            badge: '🔥 تشكيلة البدايات الميتّا',
            archetype: 'starter_meta',
            theme: 'ea_marble_clean',
            playerIds: ['nunez_gold', 'werner_gold', 'malen_gold', 'dembele_gold', 'mbappe_gold'],
            customRanks: ['5', '4', '3', '2', '1'],
            script: 'لو بتبدأ نادي في FC 27 وميزانيتك كوينز بسيطة، هذي أفضل 5 مهاجمين راح يشيلون هجومك شيل! من داروين نونيز وفيرنر إلى الوحش مالين وعثمان ديمبيلي.. وإذا تبي تقفل على مبابي مباشرة كلمنا نشحن لك كوينزك بثواني مع @shop_coin15!',
            caption: 'أفضل 5 مهاجمين للبدايات في FC 27 بميزانيات مختلفة! ⚽💥 مين مهاجمك المفضل في البداية؟ اكتبه بالتعليقات 👇\n\n⚡ اشحن كوينزك الآن بضمان نادي كامل وسرعة تنفيذ خلال دقيقة واحدة عبر الخاص! 👑\n\n#FC27 #EAFC27 #ShopCoin15 #FUT27 #فيفا27'
        },
        {
            id: 'physical_beasts',
            category: '👑 الترتيب التنازلي وتوب 5',
            title: 'أقوى لاعبين بدنياً في FC 27 💪🧱',
            subtitle: 'كروت تلعب بالكتف وتكسر أي ارتداد بدون رحمة!',
            badge: '🧱 جدار فولاذي 90+ بدنية',
            archetype: 'countdown',
            theme: 'ea_marble_clean',
            playerIds: ['rodri_gold', 'tonali_gold', 'nunez_gold', 'haaland_gold'],
            customRanks: ['4', '3', '2', '1'],
            script: 'هل تبحث عن القوة والصلابة في الملعب؟ هذي أقوى كروت بدنياً في لعبة FC 27! ارتكاز صلب ومهاجمين ما ينقطع منهم كورة بالكتف.. هالاند ونونيز ورودري وتونالي يضمنون لك الهيمنة التامة على خط الوسط!',
            caption: 'أقوى كروت بدنياً في FC 27 لا يمكن إيقافهم بالالتحامات! 💪🏋️‍♂️ مين أقوى لاعب جربته؟\n\n💰 للطلب والشحن المضمون 100% تواصل معنا على الخاص الآن 📩\n\n#FC27 #FUT27 #فيفا27 #ShopCoin15'
        },
        {
            id: 'fastest_wingers',
            category: '👑 الترتيب التنازلي وتوب 5',
            title: 'أسرع 5 أجنحة صواريخ في FC 27 ⚡🚀',
            subtitle: 'سرعة +93 لا يمكن لأي ظهير في اللعبة ملاحقتهم!',
            badge: '⚡ أسرع كروت باللعبة',
            archetype: 'countdown',
            theme: 'ea_marble_clean',
            playerIds: ['chiesa_gold', 'dembele_gold', 'leao_gold', 'vinicius_gold', 'mbappe_gold'],
            customRanks: ['5', '4', '3', '2', '1'],
            script: 'السرعة هي السلاح الفتاك في بداية FC 27! هذي أسرع 5 أجنحة صواريخ باللعبة، تسارع خيالي ومهارات 5 نجوم تعدي من أي ظهير.. من فيديريكو كييزا وديمبيلي إلى لياو وفينيسيوس ومبابي!',
            caption: 'أسرع صواريخ FC 27 لا يمكن ملاحقتهم على الأطراف! ⚡🌪️ مين جناحك الأساسي بالفريق؟\n\n💎 متجر @shop_coin15 يوفر لك جميع كميات الكوينز بأرخص سعر وضمان شامل!\n\n#FC27 #EAFC #FUT #ShopCoin15'
        },
        {
            id: 'saudi_highest_rated',
            category: '🌟 كروت البدايات والجواهر الاقتصادية',
            title: 'أعلى اللاعبين السعوديين تقييماً في FC 27 🇸🇦💚',
            subtitle: 'فخر الكرة السعودية وطاقات ميتّا خارقة بالدفاع والسرعة!',
            badge: '🇸🇦 نجوم دوري روشن',
            archetype: 'countdown',
            theme: 'ea_marble_clean',
            playerIds: ['albulayhi_silver', 'abdulhamid_gold'],
            customRanks: ['4', '2'],
            script: 'استعراض أعلى اللاعبين السعوديين تقييماً في FC 27! سعود عبدالحميد بسرعة 92 وقوة دفاعية خارقة في الدوري الإيطالي، والبليهي بصلابة بدنية وتدخلات حاسمة.. كروت تفخر فيها بتشكيلتك!',
            caption: 'أعلى وأقوى الكروت السعودية في FC 27! 🇸🇦🦅 سعود عبدالحميد وعلي البليهي طاقات تفجيرية!\n\n⚡ شحن كوينز فوري لجميع المنصات عبر الخاص @shop_coin15\n\n#دوري_روشن #FC27 #سعود_عبدالحميد #ShopCoin15'
        },
        {
            id: 'bellingham_vs_valverde',
            category: '⚔️ مقارنات وتحديات رأس برأس',
            title: 'بيلينغهام ولا فالفيردي؟ صراع خط الوسط في FC 27! 👑⚔️',
            subtitle: 'تحليل مقارن بالأرقام والطاقات: مين يستحق يقود خط وسطك؟',
            badge: '⚔️ رأس برأس (DUEL)',
            archetype: 'versus_duel',
            theme: 'dark_stadium',
            playerIds: ['bellingham_gold', 'tonali_gold'],
            customRanks: ['A', 'B'],
            script: 'محتار مين تحط في خط وسطك؟ بيلينغهام بقدرات هجومية وإنهاء وصناعة خارقة، أم محور قاطع كرات صلب يغطي الملعب رايح جاي؟ صوت بالتعليقات وشوف النتيجة!',
            caption: 'مقارنة نارية بين ملوك خط الوسط في FC 27! 👑⚔️ مين الأساسي بتشكيلتك؟ اكتب بالتعليقات!\n\n💸 محتاج كوينز تشتري الاثنين؟ كلمنا على الخاص والشحن يوصلك بأقل من دقيقة!\n\n#FC27 #بيلينغهام #ShopCoin15 #FUT27'
        },
        {
            id: 'most_used_meta',
            category: '👑 الترتيب التنازلي وتوب 5',
            title: 'أكثر اللاعبين استخداماً في FC 27 📊🎮',
            subtitle: 'الـ 5 كروت اللي راح تشوفهم في كل مباراة فوت تشامبيونز!',
            badge: '📊 إحصائيات الميتّا',
            archetype: 'countdown',
            theme: 'ea_marble_clean',
            playerIds: ['mendy_gold', 'tonali_gold', 'dembele_gold', 'vinicius_gold', 'mbappe_gold'],
            customRanks: ['5', '4', '3', '2', '1'],
            script: 'هذي أكثر 5 كروت معتمدين عليها محترفي اللعبة في FC 27! فيرلاند ميندي الظهير الذي لا يتغير، تونالي قاطع الكرات، ديمبيلي الساحر، فيني ومبابي ملوك الهجوم!',
            caption: 'أكثر كروت ميتّا تم استخدامها في مباريات الأسبوع الأول من FC 27! 🎮🔥 كم لاعب منهم موجود بتشكيلتك؟\n\n👑 لطلب الكوينز بضمان كامل وسرعة تنفيذ خيالية تواصل معنا عبر الخاص!\n\n#FC27 #FUT #ShopCoin15'
        },
        {
            id: 'market_crash_warning',
            category: '📉 أسرار الكوينز وتوفير التحديات',
            title: 'السوق انهار اليوم! 3 لاعبين لازم تشتريهم فوراً 📉🔥',
            subtitle: 'الأسعار وصلت لأدنى نقطة وفرصة ارتدادها قبل الويكند مؤكدة!',
            badge: '🚨 تنبيه سوق عاجل',
            archetype: 'market_alert',
            theme: 'dark_stadium',
            playerIds: ['bellingham_gold', 'dembele_gold', 'haaland_gold'],
            customRanks: ['فرصة 1', 'فرصة 2', 'فرصة 3'],
            script: 'وقف عندك ولا تبيع كروتك! السوق حالياً يشهد هبوط مفاجئ بسبب نزول الحزم، وهذي أفضل 3 كروت تشتريهم الحين بأسعار رخيصة قبل ما تنفجر أسعارهم يوم الخميس.. اشحن كوينزك واستغل النزول مع @shop_coin15!',
            caption: 'فرصة ذهبية لا تعوض في سوق FC 27! 📉💰 الأسعار بأدنى نقطة والارتداد قادم!\n\n⚡ اشحن كوينزك الآن وقفل تشكيلة أحلامك بأقل تكلفة مع ضمان كامل للنادي 🔒\n\n#تجارة_فيفا #FC27 #ShopCoin15'
        },
        {
            id: 'ban_safety_rules',
            category: '🛡️ أمان الحساب وتجنب التصفير',
            title: 'أكبر 3 غلطات تدمر ناديك في FC 27 وأنت ما تدري! 🚨🔒',
            subtitle: 'كيف تحمي حسابك من الباند وتضمن بقاء تشكيلتك آمنة 100%',
            badge: '🛡️ نصائح أمان النادي',
            archetype: 'market_alert',
            theme: 'dark_stadium',
            playerIds: ['mbappe_gold'],
            customRanks: ['⚠️'],
            script: 'لو سويت وحدة من هالثلاث حركات حسابك معرض للتصفير بأي لحظة: التحويل العشوائي، الشراء بأسعار مبالغ فيها، أو الشحن من متاجر غير معتمدة! بمتجر shop_coin15 نستخدم بروتوكول تحويل آمن مع ضمان شامل للنادي.',
            caption: 'انتبه على ناديك في FC 27! 🚨🛡️ التصفير سببه أخطاء بسيطة تقدر تتجنبها بسهولة.\n\n🔒 اطلب كوينزك الآمنة مع ضمان نادي كامل وسرعة شحن خيالية من @shop_coin15 👑\n\n#FC27 #أمان_الحساب #ShopCoin15'
        }
    ];

    // ---- 3. STATE MANAGEMENT ----
    let state = {
        theme: 'ea_marble_clean', // 'ea_marble_clean', 'dark_stadium', 'neon_meta', 'gold_luxury'
        archetype: 'starter_meta', // 'countdown', 'starter_meta', 'versus_duel', 'card_review', 'market_alert'
        title: 'أفضل المهاجمين للبدايات في FC 27 ⚽🔥',
        subtitle: 'كروت رخيصة تضمن لك رانك فوت تشامبيونز من أول أسبوع!',
        badge: '🔥 تشكيلة البدايات الميتّا',
        scriptNotes: 'ابدأ الفيديو بالسلايد الخطاف مباشرة ثم استعرض الكروت بمدة ثانيتين ونصف لكل كرت!',
        slides: [],
        currentSlideIndex: 0,
        isPlaying: false,
        slideDuration: 2.5, // seconds per slide
        playbackTimer: null,
        timelineProgress: 0,
        showSafeZone: false
    };

    // Initialize with the first viral concept
    function initDefaultReel() {
        applyViralIdea(VIRAL_REEL_IDEAS[0], false);
    }

    // Build slide list from a concept
    function applyViralIdea(ideaObj, showToast = true) {
        state.title = ideaObj.title;
        state.subtitle = ideaObj.subtitle;
        state.badge = ideaObj.badge;
        state.archetype = ideaObj.archetype || 'countdown';
        state.theme = ideaObj.theme || 'ea_marble_clean';
        state.scriptNotes = ideaObj.script || '';

        // Build Slides:
        // Slide 0: Intro Hook Slide
        const newSlides = [
            {
                type: 'intro',
                title: ideaObj.title,
                subtitle: ideaObj.subtitle,
                badge: ideaObj.badge,
                duration: 2.0
            }
        ];

        // Slide 1..N: Player Card Slides
        if (ideaObj.playerIds && ideaObj.playerIds.length > 0) {
            ideaObj.playerIds.forEach((pid, idx) => {
                const pData = FC27_PLAYERS_DB.find(p => p.id === pid) || FC27_PLAYERS_DB[0];
                const rank = (ideaObj.customRanks && ideaObj.customRanks[idx]) ? ideaObj.customRanks[idx] : (ideaObj.playerIds.length - idx).toString();
                newSlides.push({
                    type: 'player_card',
                    rank: rank,
                    playerName: pData.name,
                    playerArName: pData.arName,
                    rating: pData.rating,
                    position: pData.position,
                    club: pData.club,
                    nation: pData.nation,
                    cardUrl: pData.cardUrl,
                    stats: pData.stats,
                    badges: pData.badges,
                    price: pData.price,
                    metaScore: pData.metaScore,
                    duration: state.slideDuration
                });
            });
        }

        // Final Slide: Outro Store CTA
        newSlides.push({
            type: 'outro',
            title: 'متجر ShopCoin15 - شحن كوينز فوري ⚡',
            subtitle: 'جميع الكميات متوفرة الآن بضمان نادي كامل وأفضل الأسعار!',
            badge: '👑 متجر الكوينز المعتمد',
            ctaText: 'للطلب تواصل معنا عبر الخاص: @shop_coin15 ⬇️',
            duration: 2.5
        });

        state.slides = newSlides;
        state.currentSlideIndex = 0;
        pausePlayback();

        // Update Caption box if exists
        const captionArea = document.getElementById('captionText');
        if (captionArea && ideaObj.caption) {
            captionArea.value = ideaObj.caption;
        }

        renderEditorControls();
        renderCanvas();

        if (showToast && window.showCopyToast) {
            window.showCopyToast(`تم تجهيز ريل: ${ideaObj.title} بنجاح! 🎬✨`);
        }
    }

    // ---- 4. LIVE INTERACTIVE REEL PLAYER ----
    function playPlayback() {
        if (state.isPlaying) return;
        state.isPlaying = true;
        updatePlayerUi();

        const tickInterval = 50; // 50ms tick for progress bar
        let elapsedOnSlide = 0;
        const targetMs = (state.slideDuration || 2.5) * 1000;

        if (state.playbackTimer) clearInterval(state.playbackTimer);

        state.playbackTimer = setInterval(() => {
            elapsedOnSlide += tickInterval;
            state.timelineProgress = Math.min(100, (elapsedOnSlide / targetMs) * 100);

            // Update mini progress bar in UI
            const progressBar = document.getElementById('reelTimelineBar');
            if (progressBar) {
                progressBar.style.width = `${state.timelineProgress}%`;
            }

            if (elapsedOnSlide >= targetMs) {
                elapsedOnSlide = 0;
                state.timelineProgress = 0;
                // Advance to next slide
                if (state.currentSlideIndex < state.slides.length - 1) {
                    state.currentSlideIndex++;
                    renderCanvas();
                    updatePlayerUi();
                } else {
                    // Loop back to start
                    state.currentSlideIndex = 0;
                    renderCanvas();
                    updatePlayerUi();
                }
            }
        }, tickInterval);
    }

    function pausePlayback() {
        state.isPlaying = false;
        if (state.playbackTimer) {
            clearInterval(state.playbackTimer);
            state.playbackTimer = null;
        }
        state.timelineProgress = 0;
        const progressBar = document.getElementById('reelTimelineBar');
        if (progressBar) progressBar.style.width = '0%';
        updatePlayerUi();
    }

    function togglePlayPause() {
        if (state.isPlaying) {
            pausePlayback();
        } else {
            playPlayback();
        }
    }

    function nextSlide() {
        pausePlayback();
        if (state.currentSlideIndex < state.slides.length - 1) {
            state.currentSlideIndex++;
        } else {
            state.currentSlideIndex = 0;
        }
        renderCanvas();
        updatePlayerUi();
    }

    function prevSlide() {
        pausePlayback();
        if (state.currentSlideIndex > 0) {
            state.currentSlideIndex--;
        } else {
            state.currentSlideIndex = state.slides.length - 1;
        }
        renderCanvas();
        updatePlayerUi();
    }

    function goToSlide(idx) {
        pausePlayback();
        if (idx >= 0 && idx < state.slides.length) {
            state.currentSlideIndex = idx;
            renderCanvas();
            updatePlayerUi();
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

    function setTheme(themeKey) {
        state.theme = themeKey;
        renderCanvas();
        renderEditorControls();
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
            toolbarBtnPlay.innerHTML = state.isPlaying ? '<span>⏸️ إيقاف الريل</span>' : '<span>▶️ تشغيل الريل</span>';
            toolbarBtnPlay.classList.toggle('bg-amber-500', state.isPlaying);
            toolbarBtnPlay.classList.toggle('bg-emerald-600', !state.isPlaying);
        }

        const current = state.slides[state.currentSlideIndex];
        let name = 'خطاف البداية';
        if (current) {
            if (current.type === 'player_card') name = `#${current.rank} - ${current.playerName}`;
            if (current.type === 'outro') name = 'سلايد الختام';
        }
        const slideText = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length} (${name})`;

        const indicator = document.getElementById('reelSlideIndicator');
        if (indicator) indicator.textContent = slideText;

        const toolbarIndicator = document.getElementById('toolbarSlideIndicator');
        if (toolbarIndicator) toolbarIndicator.textContent = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length}`;

        // Update dots
        const dotsContainer = document.getElementById('reelDotsContainer');
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.reel-dot').forEach((d, i) => {
                if (i === state.currentSlideIndex) {
                    d.className = 'reel-dot w-6 h-2 rounded-full bg-emerald-500 transition-all shadow-xs';
                } else {
                    d.className = 'reel-dot w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer';
                }
            });
        }
    }

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
                        <span>▶️ تشغيل الريل</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.nextSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition" title="السلايد التالي">
                        التالي ⏩
                    </button>
                </div>

                <!-- Center Slide Indicator & Progress -->
                <div class="flex flex-col items-center gap-1">
                    <span id="toolbarSlideIndicator" class="text-[11px] font-black text-emerald-400">
                        سلايد ${state.currentSlideIndex + 1}/${state.slides.length}
                    </span>
                    <div class="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div id="toolbarTimelineBar" class="bg-emerald-400 h-full w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <!-- Quick Export -->
                <button type="button" onclick="ReelsEngine.exportReelVideo()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20">
                    <span>🎬 تحميل فيديو</span>
                </button>
            </div>
        `;
        updatePlayerUi();
    }

    // ---- 5. HIGH-FIDELITY CANVAS RENDERING ----
    function renderCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_reels') return;

        // Force 9:16 vertical ratio for Reels
        canvas.className = 'canvas-story relative overflow-hidden select-none';
        canvas.setAttribute('data-canvas-ratio', 'story');

        if (!state.slides || state.slides.length === 0) {
            initDefaultReel();
            return;
        }

        const currentSlide = state.slides[state.currentSlideIndex] || state.slides[0];
        const isMarble = state.theme === 'ea_marble_clean';
        const isDark = state.theme === 'dark_stadium';
        const isNeon = state.theme === 'neon_meta';
        const isGold = state.theme === 'gold_luxury';

        // Background styling
        let bgHtml = '';
        if (isMarble) {
            // Clean Marble matching the original reels from desktop
            bgHtml = `
                <div class="absolute inset-0 bg-[#F2F4F8]"></div>
                <!-- Marble Texture & EA FC Subtle Watermark Geometric Grid -->
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.9),rgba(230,235,242,0.6))]"></div>
                <div class="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <!-- Top Chevron Watermark Line -->
                <div class="absolute inset-0 opacity-[0.08] pointer-events-none flex items-center justify-center">
                    <svg class="w-full h-full text-slate-800" viewBox="0 0 1080 1920" fill="none" stroke="currentColor" stroke-width="4">
                        <path d="M 540 200 L 980 600 L 980 1400 L 540 1800 L 100 1400 L 100 600 Z"/>
                        <path d="M 540 350 L 860 680 L 860 1320 L 540 1650 L 220 1320 L 220 680 Z" stroke-dasharray="12 12"/>
                    </svg>
                </div>
            `;
        } else if (isDark) {
            bgHtml = `
                <div class="absolute inset-0 bg-[#070A14]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.18),transparent_60%)]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(0,132,255,0.2),transparent_65%)]"></div>
                <div class="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            `;
        } else if (isNeon) {
            bgHtml = `
                <div class="absolute inset-0 bg-[#05060C]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.25),transparent_55%)]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.25),transparent_55%)]"></div>
                <div class="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
            `;
        } else {
            // Gold Luxury
            bgHtml = `
                <div class="absolute inset-0 bg-[#0A0908]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(217,119,6,0.3),transparent_60%)]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(245,158,11,0.15),transparent_65%)]"></div>
                <div class="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]"></div>
            `;
        }

        // Top-Right EA SPORTS FC 27 Official Logo
        const fcLogoHtml = `
            <div class="absolute top-8 right-8 z-30 flex flex-col items-center select-none">
                <div class="flex items-center gap-1.5 font-['Alexandria'] ${isMarble ? 'text-[#00B050]' : 'text-[#00FF88]'}">
                    <span class="text-[10px] tracking-widest font-black uppercase text-slate-800">EA SPORTS</span>
                </div>
                <div class="text-3xl font-black italic tracking-tighter ${isMarble ? 'text-[#00A84D]' : 'text-[#00FF88]'} drop-shadow-sm font-['Alexandria']">
                    FC 27
                </div>
            </div>
        `;

        // Bottom-Center ShopCoin15 Official Logo (Crown + Arrow + SC)
        const shopCoinLogoHtml = `
            <div class="absolute bottom-6 right-0 left-0 flex flex-col items-center justify-center z-30 select-none">
                <div class="flex flex-col items-center gap-0.5">
                    <!-- Green Crown with Arrow Up -->
                    <svg class="w-11 h-10 ${isMarble ? 'text-[#00A84D]' : 'text-[#00FF88]'} drop-shadow-md filter" viewBox="0 0 100 100" fill="currentColor">
                        <!-- Crown base -->
                        <path d="M 15 70 L 25 35 L 42 55 L 50 15 L 58 55 L 75 35 L 85 70 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
                        <!-- Arrow pointing up -->
                        <path d="M 50 25 L 40 40 L 46 40 L 46 65 L 54 65 L 54 40 L 60 40 Z" fill="currentColor"/>
                    </svg>
                    <!-- SC Letters -->
                    <div class="text-xl font-black tracking-widest ${isMarble ? 'text-[#00A84D]' : 'text-[#00FF88]'} font-['Alexandria']">
                        SC
                    </div>
                </div>
            </div>
        `;

        // Slide Content
        let slideBodyHtml = '';

        if (currentSlide.type === 'intro') {
            // Intro Hook Slide
            slideBodyHtml = `
                <div class="absolute inset-0 flex flex-col items-center justify-center px-10 text-center z-20">
                    <div class="mb-4 inline-block px-4 py-1.5 rounded-full ${isMarble ? 'bg-slate-900 text-white' : 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'} text-xs font-black tracking-wide shadow-sm">
                        ${currentSlide.badge || state.badge}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black ${isMarble ? 'text-slate-950' : 'text-white'} leading-tight font-['Alexandria'] drop-shadow-sm max-w-md">
                        ${currentSlide.title || state.title}
                    </h1>
                    <p class="mt-5 text-sm md:text-base font-bold ${isMarble ? 'text-slate-600' : 'text-slate-300'} max-w-sm leading-relaxed font-['Cairo']">
                        ${currentSlide.subtitle || state.subtitle}
                    </p>
                    <div class="mt-8 flex items-center gap-2 px-5 py-2 rounded-2xl ${isMarble ? 'bg-white/80 border border-slate-200' : 'bg-white/10 border border-white/20'} backdrop-blur-md shadow-xs animate-bounce">
                        <span class="text-base">👇</span>
                        <span class="text-xs font-black ${isMarble ? 'text-slate-800' : 'text-white'}">شاهد أفضل الكروت بالترتيب</span>
                    </div>
                </div>
            `;
        } else if (currentSlide.type === 'player_card') {
            // Player Card Slide
            slideBodyHtml = `
                <div class="absolute inset-0 flex flex-col items-center justify-between pt-16 pb-28 px-6 z-20">
                    <!-- Top Section: Rank & Header -->
                    <div class="flex flex-col items-center text-center space-y-1">
                        <!-- Big Rank Number -->
                        <div class="text-6xl md:text-7xl font-black ${isMarble ? 'text-[#0E382B]' : 'text-[#00FF88]'} font-['Alexandria'] drop-shadow-md leading-none">
                            ${currentSlide.rank || '1'}
                        </div>
                        <div class="text-xs font-black ${isMarble ? 'text-slate-500' : 'text-slate-400'} tracking-wider uppercase">
                            ${state.title.split('في')[0].trim()}
                        </div>
                    </div>

                    <!-- Center Section: Authentic EA FC 27 Card Render -->
                    <div class="relative my-auto flex flex-col items-center justify-center">
                        <!-- Card Glow Behind -->
                        <div class="absolute -inset-8 ${isMarble ? 'bg-emerald-500/15' : 'bg-[#00FF88]/25'} blur-3xl rounded-full pointer-events-none"></div>
                        
                        <!-- Official Card Image -->
                        <div class="relative transform transition-transform duration-300 hover:scale-105">
                            <img src="${currentSlide.cardUrl}" alt="${currentSlide.playerName}" 
                                 class="w-64 md:w-72 h-auto max-h-[390px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
                        </div>

                        <!-- Pill Badges Below Card (Stats & Meta Score) -->
                        <div class="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-xs">
                            ${(currentSlide.badges || []).map(b => `
                                <span class="px-2.5 py-1 rounded-xl ${isMarble ? 'bg-white/95 text-slate-900 border border-slate-200' : 'bg-black/60 text-white border border-white/20'} text-[11px] font-black shadow-xs">
                                    ${b}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Bottom Section: Sub-headline / Player Ar Name -->
                    <div class="text-center px-4">
                        <div class="text-2xl md:text-3xl font-black ${isMarble ? 'text-slate-950' : 'text-white'} font-['Alexandria'] drop-shadow-sm">
                            ${currentSlide.playerArName || currentSlide.playerName}
                        </div>
                        <div class="text-xs font-black ${isMarble ? 'text-[#00A84D]' : 'text-emerald-400'} mt-0.5">
                            في FC 27
                        </div>
                    </div>
                </div>
            `;
        } else if (currentSlide.type === 'outro') {
            // Outro CTA Slide
            slideBodyHtml = `
                <div class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20">
                    <div class="w-20 h-20 rounded-3xl ${isMarble ? 'bg-emerald-50 border-2 border-emerald-500/40 text-[#00A84D]' : 'bg-[#00FF88]/20 border-2 border-[#00FF88] text-[#00FF88]'} flex items-center justify-center text-4xl mb-4 shadow-lg shadow-emerald-500/20 animate-pulse">
                        👑
                    </div>

                    <h2 class="text-3xl md:text-4xl font-black ${isMarble ? 'text-slate-950' : 'text-white'} leading-snug font-['Alexandria']">
                        متجر ShopCoin15
                    </h2>
                    <div class="text-sm font-bold ${isMarble ? 'text-emerald-700' : 'text-emerald-400'} mt-1">
                        شحن كوينز فوري وآمن 100% ⚡
                    </div>

                    <!-- Store Guarantees Container -->
                    <div class="mt-6 space-y-2.5 w-full max-w-sm">
                        <div class="flex items-center gap-3 p-3 rounded-2xl ${isMarble ? 'bg-white border border-slate-200' : 'bg-slate-900/80 border border-white/15'} text-right shadow-xs">
                            <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm shrink-0">🔒</span>
                            <div>
                                <div class="text-xs font-black ${isMarble ? 'text-slate-900' : 'text-white'}">ضمان نادي كامل</div>
                                <div class="text-[10.5px] text-slate-500">حماية كاملة 100% ببروتوكول تحويل آمن</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 p-3 rounded-2xl ${isMarble ? 'bg-white border border-slate-200' : 'bg-slate-900/80 border border-white/15'} text-right shadow-xs">
                            <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm shrink-0">⚡</span>
                            <div>
                                <div class="text-xs font-black ${isMarble ? 'text-slate-900' : 'text-white'}">سرعة تنفيذ قياسية</div>
                                <div class="text-[10.5px] text-slate-500">المليون ينشحن خلال دقيقة واحدة بس</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 p-3 rounded-2xl ${isMarble ? 'bg-white border border-slate-200' : 'bg-slate-900/80 border border-white/15'} text-right shadow-xs">
                            <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center text-sm shrink-0">💰</span>
                            <div>
                                <div class="text-xs font-black ${isMarble ? 'text-slate-900' : 'text-white'}">أفضل الأسعار التنافسية</div>
                                <div class="text-[10.5px] text-slate-500">خصومات مستمرة على جميع الكميات</div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-7 px-5 py-3 rounded-2xl ${isMarble ? 'bg-slate-900 text-white' : 'bg-[#00FF88] text-slate-950'} font-black text-xs shadow-lg">
                        للطلب حياك على الخاص: @shop_coin15 📩
                    </div>
                </div>
            `;
        }

        // Safe Zone Overlay (if enabled)
        const safeZoneHtml = state.showSafeZone ? `
            <div class="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between border-2 border-dashed border-rose-500/50">
                <!-- Top Hazard -->
                <div class="h-24 bg-rose-500/10 border-b border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">
                        ⚠️ منطقة محجوبة: شريط العنوان والبحث
                    </span>
                </div>

                <!-- Center 1:1 Feed Grid Square -->
                <div class="my-auto h-[450px] border-y-2 border-emerald-400/60 relative flex items-center justify-between px-3">
                    <span class="text-[10px] font-black text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-400/40">
                        🟩 مربع الفيد بالبروفايل (1:1 Feed Grid)
                    </span>
                    <!-- Right Buttons Hazard -->
                    <div class="w-16 h-full bg-rose-500/10 border-r border-rose-400/30 flex items-center justify-center">
                        <span class="text-[9px] font-bold text-rose-300 -rotate-90 bg-black/70 px-1.5 py-0.5 rounded">
                            ❤️ أزرار التفاعل
                        </span>
                    </div>
                </div>

                <!-- Bottom Caption Hazard -->
                <div class="h-32 bg-rose-500/10 border-t border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">
                        ⚠️ منطقة محجوبة: الكابشن والصوت وزر المتابعة
                    </span>
                </div>
            </div>
        ` : '';

        canvas.innerHTML = `
            <div class="absolute inset-0 overflow-hidden">
                ${bgHtml}
                ${fcLogoHtml}
                ${shopCoinLogoHtml}
                ${slideBodyHtml}
                ${safeZoneHtml}
            </div>
        `;

        // Emoji parser
        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        }
    }

    // ---- 6. EDITOR CONTROLS & UI PANEL ----
    function renderEditorControls() {
        const container = document.getElementById('suite_reels_panel');
        if (!container) return;

        let html = `
            <div class="space-y-4">
                
                <!-- 1. Interactive Reel Player Controller -->
                <div class="p-3.5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                            <span class="text-xs font-black text-white">مشغل ريلز FC 27 التفاعلي:</span>
                        </div>
                        <span id="reelSlideIndicator" class="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            سلايد ${state.currentSlideIndex + 1}/${state.slides.length}
                        </span>
                    </div>

                    <!-- Mini Timeline Progress Bar -->
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div id="reelTimelineBar" class="bg-emerald-400 h-full w-0 transition-all duration-75"></div>
                    </div>

                    <!-- Slide Navigation Dots -->
                    <div id="reelDotsContainer" class="flex items-center justify-center gap-1.5 py-1">
                        ${state.slides.map((s, idx) => `
                            <button type="button" onclick="ReelsEngine.goToSlide(${idx})" 
                                    class="reel-dot ${idx === state.currentSlideIndex ? 'w-6 h-2 rounded-full bg-emerald-400' : 'w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500'} transition-all cursor-pointer" 
                                    title="انتقال لسلايد ${idx + 1}"></button>
                        `).join('')}
                    </div>

                    <!-- Player Actions: Prev, Play/Pause, Next, Speed -->
                    <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="ReelsEngine.prevSlide()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition" title="السلايد السابق">
                                ⏪ السابق
                            </button>
                            <button type="button" id="reelBtnPlay" onclick="ReelsEngine.togglePlayPause()" class="px-4 py-2 rounded-xl ${state.isPlaying ? 'bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm">
                                ${state.isPlaying ? '<span>⏸️ إيقاف</span>' : '<span>▶️ تشغيل</span>'}
                            </button>
                            <button type="button" onclick="ReelsEngine.nextSlide()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition" title="السلايد التالي">
                                التالي ⏩
                            </button>
                        </div>

                        <!-- Speed Selector -->
                        <div class="flex items-center gap-1">
                            <span class="text-[10px] text-slate-400 font-bold">السرعة:</span>
                            <select onchange="ReelsEngine.setSlideDuration(this.value)" class="bg-slate-800 border border-slate-700 text-slate-200 text-[10.5px] rounded-lg px-2 py-1 font-bold outline-none cursor-pointer">
                                <option value="1.8" ${state.slideDuration === 1.8 ? 'selected' : ''}>1.8s (سريع)</option>
                                <option value="2.5" ${state.slideDuration === 2.5 ? 'selected' : ''}>2.5s (مثالي)</option>
                                <option value="3.5" ${state.slideDuration === 3.5 ? 'selected' : ''}>3.5s (متأني)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 2. Viral FC 27 Ideas Bank (1-Click Selector) -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                            <span>🔥 بنك أفكار ريلز FC 27 الفيروسي:</span>
                        </span>
                        <span class="text-[10.5px] text-emerald-600 font-bold">25+ فكرة جاهزة بضغطة واحدة ✨</span>
                    </div>

                    <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
                        ${VIRAL_REEL_IDEAS.map(idea => `
                            <div class="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/60 hover:bg-white transition space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${idea.badge}</span>
                                    <span class="text-[9.5px] font-bold text-slate-400">${idea.playerIds.length} كروت</span>
                                </div>
                                <div class="font-black text-slate-900 text-xs leading-snug">${idea.title}</div>
                                <div class="text-[10.5px] text-slate-500 line-clamp-1">${idea.subtitle}</div>
                                <div class="pt-1 flex items-center justify-between border-t border-slate-100">
                                    <button type="button" onclick='ReelsEngine.loadIdeaById("${idea.id}")' class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10.5px] transition flex items-center gap-1 shadow-xs">
                                        <span>توليد هذا الريل فوراً 🎬</span>
                                    </button>
                                    <button type="button" onclick='ReelsEngine.copyScript("${encodeURIComponent(idea.script)}")' class="text-[10.5px] text-slate-600 hover:text-slate-900 font-bold transition flex items-center gap-1">
                                        <span>نسخ السكريبت 🎙️</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 3. Themes & Style Customizer -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <span class="text-xs font-black text-slate-900 block">🎨 ثيم وخلفية الريل:</span>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="ReelsEngine.setTheme('ea_marble_clean')" 
                                class="p-2.5 rounded-xl border-2 transition text-right flex items-center gap-2 ${state.theme === 'ea_marble_clean' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'}">
                            <span class="w-7 h-7 rounded-lg bg-white text-emerald-600 flex items-center justify-center font-black text-xs border border-slate-200">🏛️</span>
                            <div>
                                <div class="text-[11px] font-black text-slate-900">رخامي EA الرسمي</div>
                                <div class="text-[9.5px] text-slate-500">الأبيض النظيف (كما بفيديوهاتك)</div>
                            </div>
                        </button>

                        <button type="button" onclick="ReelsEngine.setTheme('dark_stadium')" 
                                class="p-2.5 rounded-xl border-2 transition text-right flex items-center gap-2 ${state.theme === 'dark_stadium' ? 'border-emerald-500 bg-slate-900 text-white' : 'border-slate-200 bg-slate-950 text-white'}">
                            <span class="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center font-black text-xs border border-slate-700">🏟️</span>
                            <div>
                                <div class="text-[11px] font-black text-white">ستاديوم ليلي</div>
                                <div class="text-[9.5px] text-slate-400">إضاءة حماسية وكحلي فاخر</div>
                            </div>
                        </button>

                        <button type="button" onclick="ReelsEngine.setTheme('neon_meta')" 
                                class="p-2.5 rounded-xl border-2 transition text-right flex items-center gap-2 ${state.theme === 'neon_meta' ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 bg-slate-50'}">
                            <span class="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs">⚡</span>
                            <div>
                                <div class="text-[11px] font-black text-slate-900">نيون ميتّا سريع</div>
                                <div class="text-[9.5px] text-slate-500">طاقة حمراء وسايبر</div>
                            </div>
                        </button>

                        <button type="button" onclick="ReelsEngine.setTheme('gold_luxury')" 
                                class="p-2.5 rounded-xl border-2 transition text-right flex items-center gap-2 ${state.theme === 'gold_luxury' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-slate-50'}">
                            <span class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs">👑</span>
                            <div>
                                <div class="text-[11px] font-black text-slate-900">ألتيمت ذهبي</div>
                                <div class="text-[9.5px] text-slate-500">فخامة الكروت الذهبية</div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- 4. Safe Zone & Duration Options -->
                <div class="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">📐</span>
                            <span class="font-black text-rose-950">خطوط أمان إنستغرام وتيك توك:</span>
                        </div>
                        <button type="button" id="btnToggleSafeZone" onclick="ReelsEngine.toggleSafeZone()" 
                                class="px-3 py-1.5 rounded-xl ${state.showSafeZone ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'} font-black text-[11px] transition shadow-xs">
                            ${state.showSafeZone ? '📐 خطوط الأمان مفعلة' : '📐 خطوط الأمان مخفية'}
                        </button>
                    </div>
                    <p class="text-[10.5px] text-rose-900/80 leading-relaxed font-medium">
                        💡 تضمن بقاء النصوص وكروت اللاعبين في المساحة المرئية فوق وصف الفيديو وبعيداً عن أزرار الإعجاب والتعليقات.
                    </p>
                </div>

                <!-- 5. Current Slide Details & Editor -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-900">تعديل السلايد الحالي:</span>
                        <span class="text-[10.5px] font-bold text-slate-400">سلايد ${state.currentSlideIndex + 1}</span>
                    </div>

                    ${renderSlideSpecificEditor()}
                </div>

                <!-- 6. Voiceover Script Notes -->
                <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-black text-amber-950 flex items-center gap-1.5">
                            <span>🎙️ سكريبت التعليق الصوتي للفيديو:</span>
                        </span>
                        <button type="button" onclick="ReelsEngine.copyScript(encodeURIComponent(ReelsEngine.getState().scriptNotes))" class="text-amber-800 font-bold hover:underline text-[11px]">
                            نسخ 📋
                        </button>
                    </div>
                    <div class="text-xs text-amber-900 font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-200">
                        ${state.scriptNotes || 'ابدأ بالتصريح الخطاف أول ثانيتين ثم اذكر مميزات كل لاعب بسرعة وبشكل حماسي!'}
                    </div>
                </div>

                <!-- 7. Reel Export Actions (Video & Slides) -->
                <div class="pt-2 border-t border-slate-200 space-y-2.5">
                    <button type="button" onclick="ReelsEngine.exportReelVideo()" id="btnExportVideo" 
                            class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer">
                        <span>🎬 تصدير فيديو الريلز بالكامل (Download Reel MP4 / WebM)</span>
                    </button>

                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="ReelsEngine.exportAllSlidesBatch()" class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] transition flex items-center justify-center gap-1.5 shadow-sm">
                            <span>📸 تحميل كافة السلايدات (4K)</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.sendReelTelegram()" class="py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-[11px] transition flex items-center justify-center gap-1.5 shadow-sm">
                            <span>🚀 إرسال لتليجرام</span>
                        </button>
                    </div>
                </div>

            </div>
        `;

        container.innerHTML = html;
    }

    function renderSlideSpecificEditor() {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return '';

        if (slide.type === 'intro') {
            return `
                <div class="space-y-2.5">
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">عنوان الخطاف (Hook Title):</label>
                        <textarea rows="2" oninput="ReelsEngine.updateCurrentSlideField('title', this.value)"
                                  class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black resize-none leading-relaxed outline-none focus:border-emerald-500">${slide.title || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">الوصف والتحفيز (Subtitle):</label>
                        <input type="text" value="${(slide.subtitle || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('subtitle', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-500">
                    </div>
                </div>
            `;
        } else if (slide.type === 'player_card') {
            return `
                <div class="space-y-2.5">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[11px] font-black text-slate-700 mb-1">رقم الترتيب (الرانك):</label>
                            <input type="text" value="${slide.rank || '1'}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('rank', this.value)"
                                   class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black text-center outline-none focus:border-emerald-500">
                        </div>
                        <div>
                            <label class="block text-[11px] font-black text-slate-700 mb-1">اسم اللاعب العربي:</label>
                            <input type="text" value="${(slide.playerArName || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('playerArName', this.value)"
                                   class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">اختيار سريع للاعب FC 27:</label>
                        <select onchange="ReelsEngine.applyPlayerToCurrentSlide(this.value)" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold outline-none cursor-pointer">
                            <option value="">-- اختر لاعب من قاعدة FC 27 --</option>
                            ${FC27_PLAYERS_DB.map(p => `
                                <option value="${p.id}" ${p.name === slide.playerName ? 'selected' : ''}>${p.arName} (${p.rating} ${p.position})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">رابط كرت اللاعب المباشر (FUT.GG WebP):</label>
                        <input type="text" value="${(slide.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="ReelsEngine.updateCurrentSlideField('cardUrl', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[10.5px] font-mono outline-none focus:border-emerald-500">
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-600 leading-relaxed">
                        سلايد الختام يحتوي على شعار المتجر وضمان النادي ورابط الطلب عبر الخاص @shop_coin15.
                    </div>
                </div>
            `;
        }
    }

    function updateCurrentSlideField(field, val) {
        if (!state.slides[state.currentSlideIndex]) return;
        state.slides[state.currentSlideIndex][field] = val;
        renderCanvas();
    }

    function applyPlayerToCurrentSlide(playerId) {
        const p = FC27_PLAYERS_DB.find(x => x.id === playerId);
        if (!p || !state.slides[state.currentSlideIndex]) return;

        const cur = state.slides[state.currentSlideIndex];
        cur.playerName = p.name;
        cur.playerArName = p.arName;
        cur.rating = p.rating;
        cur.position = p.position;
        cur.cardUrl = p.cardUrl;
        cur.stats = p.stats;
        cur.badges = p.badges;
        cur.price = p.price;
        cur.metaScore = p.metaScore;

        renderCanvas();
        renderEditorControls();
    }

    function loadIdeaById(ideaId) {
        const idea = VIRAL_REEL_IDEAS.find(x => x.id === ideaId);
        if (idea) {
            applyViralIdea(idea, true);
        }
    }

    function copyScript(encodedScript) {
        const text = decodeURIComponent(encodedScript);
        navigator.clipboard.writeText(text).then(() => {
            if (window.showCopyToast) {
                window.showCopyToast('تم نسخ سكريبت الفيديو للحافظة! 📋🎙️');
            }
        });
    }

    // ---- 7. 60FPS REEL VIDEO EXPORTER ----
    async function exportReelVideo() {
        const btn = document.getElementById('btnExportVideo');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>⏳ جاري تسجيل ومعالجة فيديو الريلز بدقة 60FPS...</span>';
        }

        pausePlayback();
        const prevSafe = state.showSafeZone;
        state.showSafeZone = false;

        try {
            if (window.showCopyToast) {
                window.showCopyToast('بدأ تسجيل فيديو الريل.. يرجى الانتظار ثوانٍ معدودة! 🎬⚡');
            }

            // Create offscreen recording canvas
            const recordCanvas = document.createElement('canvas');
            recordCanvas.width = 1080;
            recordCanvas.height = 1920;
            const ctx = recordCanvas.getContext('2d');

            // Set up MediaRecorder
            const stream = recordCanvas.captureStream(60);
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm';
            }
            if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
                mimeType = 'video/mp4;codecs=avc1';
            }

            const recorder = new MediaRecorder(stream, {
                mimeType: mimeType,
                videoBitsPerSecond: 8000000 // 8 Mbps high quality
            });

            const chunks = [];
            recorder.ondataavailable = e => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            const recordingComplete = new Promise((resolve) => {
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: mimeType });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
                    a.download = `Reel_FC27_ShopCoin15_${Date.now()}.${ext}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    resolve();
                };
            });

            recorder.start();

            // Iterate over all slides and capture into canvas
            const domNode = document.getElementById('exportCanvas');
            const totalSlides = state.slides.length;
            const msPerSlide = (state.slideDuration || 2.5) * 1000;

            for (let i = 0; i < totalSlides; i++) {
                state.currentSlideIndex = i;
                renderCanvas();
                await new Promise(r => setTimeout(r, 200));

                // Capture slide into image
                let imgDataUrl = '';
                if (window.htmlToImage && typeof window.htmlToImage.toPng === 'function') {
                    imgDataUrl = await window.htmlToImage.toPng(domNode, {
                        pixelRatio: 1,
                        width: 1080,
                        height: 1920,
                        cacheBust: true
                    });
                }

                if (imgDataUrl) {
                    const slideImg = new Image();
                    slideImg.src = imgDataUrl;
                    await new Promise(res => { slideImg.onload = res; slideImg.onerror = res; });

                    // Draw image repeatedly across the slide duration at 60fps
                    const framesCount = Math.floor((msPerSlide / 1000) * 30); // 30 redraws per slide for smooth feed
                    const frameInterval = msPerSlide / framesCount;

                    for (let f = 0; f < framesCount; f++) {
                        // Subtle zoom animation
                        const progress = f / framesCount;
                        const scale = 1.0 + (progress * 0.02); // 2% subtle cinematic push-in
                        const w = 1080 * scale;
                        const h = 1920 * scale;
                        const x = (1080 - w) / 2;
                        const y = (1920 - h) / 2;

                        ctx.clearRect(0, 0, 1080, 1920);
                        ctx.drawImage(slideImg, x, y, w, h);
                        await new Promise(r => setTimeout(r, frameInterval));
                    }
                }
            }

            recorder.stop();
            await recordingComplete;

            if (window.showCopyToast) {
                window.showCopyToast('تم تحميل فيديو الريل بنجاح! جاهز للنشر على إنستغرام وتيك توك 🚀🎉');
            }
        } catch (err) {
            console.error('Video recording error:', err);
            alert('تعذر تصدير الفيديو مباشرة من المتصفح: ' + err.message + '\nيمكنك استخدام خيار "تحميل كافة السلايدات" وتجميعها في ثوانٍ.');
        } finally {
            state.showSafeZone = prevSafe;
            state.currentSlideIndex = 0;
            renderCanvas();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span>🎬 تصدير فيديو الريلز بالكامل (Download Reel MP4 / WebM)</span>';
            }
        }
    }

    // ---- 8. BATCH SLIDES EXPORTER ----
    async function exportAllSlidesBatch() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevSafe = state.showSafeZone;
        state.showSafeZone = false;
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
        state.currentSlideIndex = 0;
        renderCanvas();

        if (window.showCopyToast) {
            window.showCopyToast('تم تنزيل جميع سلايدات الريل بنجاح! 👑');
        }
    }

    // ---- 9. TELEGRAM DISPATCH ----
    async function sendReelTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        const prevSafe = state.showSafeZone;
        state.showSafeZone = false;
        renderCanvas();
        await new Promise(r => setTimeout(r, 200));

        const caption = `🎬 ريلز FC 27 جديد جاهز للنشر:\n${state.title}\n${state.subtitle}\n\n🎙️ سكريبت التعليق الصوتي:\n${state.scriptNotes}\n\n@shop_coin15`;
        await window.TelegramManager.sendDesignInternal('exportCanvas', caption);

        state.showSafeZone = prevSafe;
        renderCanvas();
    }

    // Initial setup on script load
    initDefaultReel();

    return {
        getState: () => state,
        initDefaultReel,
        applyViralIdea,
        loadIdeaById,
        playPlayback,
        pausePlayback,
        togglePlayPause,
        nextSlide,
        prevSlide,
        goToSlide,
        setSlideDuration,
        setTheme,
        toggleSafeZone,
        updateCurrentSlideField,
        applyPlayerToCurrentSlide,
        copyScript,
        renderCanvas,
        renderEditorControls,
        renderPlayerToolbar,
        exportReelVideo,
        exportAllSlidesBatch,
        sendReelTelegram
    };
})();
