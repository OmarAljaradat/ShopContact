/**
 * ShopCoin15 Studio - Multi-Slide Carousel Engine & Design Compositor (4:5)
 * Dual-Mode Architecture:
 * 1. Classic Educational & Storytelling Carousel (Presets)
 * 2. Design Compositor Sandbox (لعبة تركيب التصميم مستوحاة من مراجع الكاروسيل الـ 12)
 * Features: Free placement, Element Locking, Layer Reordering (اشي فوق اشي), 4K Batch Export
 */

window.CarouselEngine = (function() {
    // Mode: 'presets' (classic guide slides) | 'sandbox' (free modular compositor)
    let editorMode = 'sandbox';
    let selectedElementId = null;
    let activeCatalogTab = 'templates'; // 'templates' | 'backdrops' | 'heroes' | 'fx' | 'typography' | 'seals'
    let activeSlideIndex = 0;

    // Standard Instagram Carousel Aspect Ratio: 4:5 (480x600 preview, up to 4K export)
    let slides = [
        {
            id: 'slide_1',
            isSandbox: true,
            type: 'sandbox',
            title: 'الشحن أسهل مما تتخيل ⚡',
            backdrop: 'cyber_grid',
            elements: [
                {
                    id: 'elem_seal_1',
                    category: 'seals',
                    type: 'seal_sc_logo',
                    name: 'شعار المتجر الذهبي 4K',
                    x: 23,
                    y: 8,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'elem_badge_slide',
                    category: 'seals',
                    type: 'seal_indicator',
                    name: 'مؤشر رقم السلايد',
                    x: 82,
                    y: 8,
                    scale: 0.9,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'elem_typo_1',
                    category: 'typography',
                    type: 'typo_gold_3d',
                    name: 'عنوان ذهبي 3D مقوس',
                    title: 'الشحن أسهل مما تتخيل ⚡',
                    subtitle: 'المليون ينشحن بحسابك في دقيقة واحدة مع أمان كامل',
                    x: 50,
                    y: 22,
                    scale: 1.1,
                    rotation: 0,
                    zIndex: 25,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_hero_phone',
                    category: 'heroes',
                    type: 'hero_phone_3d',
                    name: 'هاتف ذكي 3D مع إشعار التحويل',
                    x: 50,
                    y: 58,
                    scale: 1.05,
                    rotation: 0,
                    zIndex: 20,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_fx_coins',
                    category: 'fx',
                    type: 'fx_gold_coins',
                    name: 'سرب كوينز ذهبية مع خطوط ضوئية',
                    x: 50,
                    y: 54,
                    scale: 1.15,
                    rotation: 0,
                    zIndex: 22,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_platforms',
                    category: 'seals',
                    type: 'seal_platforms',
                    name: 'شريط المنصات المدعومة',
                    x: 50,
                    y: 92,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 28,
                    locked: true,
                    visible: true
                }
            ]
        },
        {
            id: 'slide_2',
            isSandbox: true,
            type: 'sandbox',
            title: 'تكدس الكروت الميتا اشي فوق اشي 🔥',
            backdrop: 'esports_arena',
            elements: [
                {
                    id: 'elem_seal_fc27',
                    category: 'seals',
                    type: 'seal_fc27_logo',
                    name: 'شعار EA FC 27 الرسمي',
                    x: 50,
                    y: 8,
                    scale: 0.9,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'elem_sticker_1',
                    category: 'typography',
                    type: 'typo_slanted_sticker',
                    name: 'ستيكر مائل رياضي',
                    title: 'الأدرينالين مالوش سقف! 🚀',
                    x: 50,
                    y: 20,
                    scale: 1.08,
                    rotation: -6,
                    zIndex: 28,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_card_stack',
                    category: 'heroes',
                    type: 'hero_card_stack',
                    name: 'تكدس الكروت ثلاثي الأبعاد (اشي فوق اشي)',
                    card1: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
                    card2: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
                    card3: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
                    x: 50,
                    y: 56,
                    scale: 1.02,
                    rotation: 0,
                    zIndex: 20,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_arrows',
                    category: 'fx',
                    type: 'fx_up_arrows',
                    name: 'أسهم صعود وسرعة نيون',
                    x: 84,
                    y: 45,
                    scale: 1.0,
                    rotation: 0,
                    zIndex: 24,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_lightning',
                    category: 'fx',
                    type: 'fx_lightning',
                    name: 'صواعق برق كهربائية',
                    x: 16,
                    y: 46,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 24,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_guarantee',
                    category: 'seals',
                    type: 'seal_guarantee_shield',
                    name: 'درع الضمان الشامل 100%',
                    x: 50,
                    y: 92,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 28,
                    locked: true,
                    visible: true
                }
            ]
        },
        {
            id: 'slide_3',
            isSandbox: true,
            type: 'sandbox',
            title: 'ركائز الأمان المعتمدة 🛡️',
            backdrop: 'fc27_marble',
            elements: [
                {
                    id: 'elem_sc_seal_3',
                    category: 'seals',
                    type: 'seal_sc_logo',
                    name: 'شعار المتجر الرسمي',
                    x: 50,
                    y: 8,
                    scale: 0.9,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'elem_typo_3',
                    category: 'typography',
                    type: 'typo_gold_3d',
                    name: 'عنوان الأمان الفاخر',
                    title: 'لماذا يثق بنا أكثر من 10k لاعب؟ 👑',
                    subtitle: 'أعلى منظومة أمان في الشرق الأوسط مع ضمان كامل لناديك',
                    x: 50,
                    y: 20,
                    scale: 1.0,
                    rotation: 0,
                    zIndex: 25,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_pillars',
                    category: 'typography',
                    type: 'typo_3_pillars',
                    name: 'أعمدة المزايا الثلاثية مع صح',
                    p1: 'تسليم فوري قياسي خلال 60 ثانية',
                    p2: 'ضمان شامل وموثق للنادي 100%',
                    p3: 'أسعار تنافسية تشمل ضريبة EA كاملة',
                    x: 50,
                    y: 56,
                    scale: 1.05,
                    rotation: 0,
                    zIndex: 22,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_stars',
                    category: 'seals',
                    type: 'seal_rating_stars',
                    name: 'بادج التقييم 5 نجوم',
                    x: 50,
                    y: 92,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 28,
                    locked: true,
                    visible: true
                }
            ]
        }
    ];

    // Master Starter Presets directly mapped to the 12 Desktop Reference Screenshots
    const STARTER_COMPOSITIONS = {
        master_phone_coins: {
            name: '📱 1. الشحن الأسهل (مستوحى من مرجع 1)',
            desc: 'هاتف ذكي طافي مع سرب كوينز ذهبية وعنوان 3D ضخم',
            backdrop: 'cyber_grid',
            elements: [
                { id: 'el_sc', category: 'seals', type: 'seal_sc_logo', name: 'شعار المتجر', x: 23, y: 8, scale: 0.95, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_title', category: 'typography', type: 'typo_gold_3d', name: 'عنوان ذهبي 3D', title: 'الشحن أسهل مما تتخيل ⚡', subtitle: 'المليون ينشحن بحسابك في دقيقة واحدة مع أمان كامل', x: 50, y: 22, scale: 1.1, rotation: 0, zIndex: 25, locked: false, visible: true },
                { id: 'el_phone', category: 'heroes', type: 'hero_phone_3d', name: 'هاتف ذكي 3D', x: 50, y: 58, scale: 1.05, rotation: 0, zIndex: 20, locked: false, visible: true },
                { id: 'el_coins', category: 'fx', type: 'fx_gold_coins', name: 'سرب كوينز ذهبية', x: 50, y: 54, scale: 1.15, rotation: 0, zIndex: 22, locked: false, visible: true },
                { id: 'el_plat', category: 'seals', type: 'seal_platforms', name: 'المنصات المدعومة', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        },
        master_slanted_ribbons: {
            name: '🎗️ 2. أشرطة النجوم المائلة (مستوحى من مرجع 2)',
            desc: '3 أشرطة متوازية مائلة 60 درجة مع نجوم الميتا',
            backdrop: 'topo_gold',
            elements: [
                { id: 'el_fc', category: 'seals', type: 'seal_fc27_logo', name: 'شعار FC 27', x: 50, y: 8, scale: 0.9, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_t', category: 'typography', type: 'typo_custom_text', name: 'عنوان الكروت', title: 'أقوى مهاجمين في FC 27 🔥', x: 50, y: 19, scale: 1.1, rotation: 0, zIndex: 28, locked: false, visible: true },
                { id: 'el_ribbons', category: 'heroes', type: 'hero_slanted_ribbons', name: 'أشرطة مائلة 60°', x: 50, y: 54, scale: 1.05, rotation: 0, zIndex: 20, locked: false, visible: true },
                { id: 'el_disc', category: 'typography', type: 'typo_discount_burst', name: 'بادج الخصم', title: 'خصم 20% لفترة محدودة 🔥', x: 82, y: 32, scale: 0.95, rotation: -10, zIndex: 25, locked: false, visible: true },
                { id: 'el_guard', category: 'seals', type: 'seal_guarantee_shield', name: 'درع الضمان', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        },
        master_pillars_trust: {
            name: '🛡️ 3. ركائز الأمان المعتمدة (مستوحى من مرجع 3)',
            desc: 'كرت بطل مع 3 أعمدة خدمات زجاجية بداخلها علامات صح',
            backdrop: 'fc27_marble',
            elements: [
                { id: 'el_sc', category: 'seals', type: 'seal_sc_logo', name: 'شعار المتجر', x: 50, y: 8, scale: 0.9, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_title', category: 'typography', type: 'typo_gold_3d', name: 'عنوان الثقة', title: 'لماذا يثق بنا أكثر من 10k لاعب؟ 👑', subtitle: 'أعلى منظومة أمان في الشرق الأوسط مع ضمان كامل لناديك', x: 50, y: 20, scale: 1.0, rotation: 0, zIndex: 25, locked: false, visible: true },
                { id: 'el_pil', category: 'typography', type: 'typo_3_pillars', name: 'أعمدة المزايا الثلاثية', p1: 'تسليم فوري قياسي خلال 60 ثانية', p2: 'ضمان شامل وموثق للنادي 100%', p3: 'أسعار تنافسية تشمل ضريبة EA كاملة', x: 50, y: 56, scale: 1.05, rotation: 0, zIndex: 22, locked: false, visible: true },
                { id: 'el_stars', category: 'seals', type: 'seal_rating_stars', name: 'بادج التقييم', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        },
        master_card_stack: {
            name: '🃏 4. تكدس الكروت اشي فوق اشي (مستوحى من مرجع 4)',
            desc: '3 كروت متراكمة فوق بعض مع ظلال ثلاثية الأبعاد مائلة',
            backdrop: 'cyber_grid',
            elements: [
                { id: 'el_fc', category: 'seals', type: 'seal_fc27_logo', name: 'شعار FC 27', x: 50, y: 8, scale: 0.9, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_stick', category: 'typography', type: 'typo_slanted_sticker', name: 'ستيكر حركي مائل', title: 'الأدرينالين مالوش سقف! 🚀', x: 50, y: 20, scale: 1.08, rotation: -6, zIndex: 28, locked: false, visible: true },
                { id: 'el_stack', category: 'heroes', type: 'hero_card_stack', name: 'تكدس الكروت (اشي فوق اشي)', x: 50, y: 56, scale: 1.02, rotation: 0, zIndex: 20, locked: false, visible: true },
                { id: 'el_arr', category: 'fx', type: 'fx_up_arrows', name: 'أسهم سرعة نيون', x: 84, y: 45, scale: 1.0, rotation: 0, zIndex: 24, locked: false, visible: true },
                { id: 'el_light', category: 'fx', type: 'fx_lightning', name: 'صواعق كهربائية', x: 16, y: 46, scale: 0.95, rotation: 0, zIndex: 24, locked: false, visible: true },
                { id: 'el_guard', category: 'seals', type: 'seal_guarantee_shield', name: 'درع الضمان', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        },
        master_controller_arena: {
            name: '🎮 5. حلبة الإي سبورتس والتحكم (مستوحى من مراجع 5-7)',
            desc: 'يد تحكم بلايستيشن متوهجة على منصة نيون في حلبة كربونية',
            backdrop: 'esports_arena',
            elements: [
                { id: 'el_fc', category: 'seals', type: 'seal_fc27_logo', name: 'شعار FC 27', x: 50, y: 8, scale: 0.9, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_pix', category: 'typography', type: 'typo_pixel_8bit', name: 'عنوان بكسل 8-بت', title: 'GAME CHANGER ⚡ FC 27', x: 50, y: 19, scale: 1.15, rotation: 0, zIndex: 28, locked: false, visible: true },
                { id: 'el_ped', category: 'heroes', type: 'hero_pedestal', name: 'منصة أسطوانية نيون', x: 50, y: 70, scale: 1.0, rotation: 0, zIndex: 15, locked: false, visible: true },
                { id: 'el_ctrl', category: 'heroes', type: 'hero_controller_glow', name: 'يد تحكم بلايستيشن متوهجة', x: 50, y: 50, scale: 1.05, rotation: 0, zIndex: 22, locked: false, visible: true },
                { id: 'el_arr', category: 'fx', type: 'fx_up_arrows', name: 'أسهم صعود خضراء', x: 82, y: 42, scale: 1.0, rotation: 0, zIndex: 24, locked: false, visible: true },
                { id: 'el_pack', category: 'fx', type: 'fx_fc_pack', name: 'بكج فيفا طافي', x: 18, y: 42, scale: 0.85, rotation: 0, zIndex: 24, locked: false, visible: true },
                { id: 'el_plat', category: 'seals', type: 'seal_platforms', name: 'المنصات المدعومة', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        },
        master_fire_ice: {
            name: '❄️🔥 6. صراع النار والجليد (مستوحى من مرجع 11)',
            desc: 'خلفية مقسومة نار مشتعلة ضد جليد متجمد مع كروت التحدي',
            backdrop: 'fire_ice',
            elements: [
                { id: 'el_sc', category: 'seals', type: 'seal_sc_logo', name: 'شعار المتجر', x: 50, y: 7, scale: 0.85, rotation: 0, zIndex: 30, locked: true, visible: true },
                { id: 'el_stick', category: 'typography', type: 'typo_slanted_sticker', name: 'ستيكر المعركة', title: 'معركة الميتا: نار ضد جليد! ⚔️', x: 50, y: 18, scale: 1.05, rotation: 0, zIndex: 28, locked: false, visible: true },
                { id: 'el_stack', category: 'heroes', type: 'hero_card_stack', name: 'كروت الصراع', x: 50, y: 54, scale: 1.0, rotation: 0, zIndex: 20, locked: false, visible: true },
                { id: 'el_embers', category: 'fx', type: 'fx_fire_embers', name: 'جمر ناري متطاير', x: 75, y: 50, scale: 1.0, rotation: 0, zIndex: 22, locked: false, visible: true },
                { id: 'el_light', category: 'fx', type: 'fx_lightning', name: 'صواعق طاقة', x: 50, y: 52, scale: 1.1, rotation: 0, zIndex: 25, locked: false, visible: true },
                { id: 'el_stars', category: 'seals', type: 'seal_rating_stars', name: 'بادج التقييم', x: 50, y: 92, scale: 0.95, rotation: 0, zIndex: 28, locked: true, visible: true }
            ]
        }
    };

    // Component Catalog Items Definitions
    const CATALOG = {
        backdrops: [
            { id: 'cyber_grid', name: '🌌 أرضية سايبربانك ثلاثية الأبعاد (مرجع 7)', desc: 'أرضية شبكية بأفق نيون متراجع وأضواء زرقاء' },
            { id: 'fire_ice', name: '🔥❄️ صراع النار والجليد (مرجع 11)', desc: 'انقسام لوني أسطوري بين جمر البركان وصقيع الجليد' },
            { id: 'esports_arena', name: '🏟️ حلبة إي سبورتس الكهربائية (مرجع 6)', desc: 'ألياف كربونية مع كشافات أرينا نيون خضراء وزرقاء' },
            { id: 'topo_gold', name: '✨ تضاريس كونتور ذهبية فاخرة (مرجع 5)', desc: 'خطوط طبوغرافية ذهبية لامعة فوق خلفية مطفأة' },
            { id: 'neon_vortex', name: '🌀 بوابة الثقب النيون (مرجع 9)', desc: 'حلقات ضوئية بنفسجية ووردية متداخلة بأبعاد عميقة' },
            { id: 'fc27_marble', name: '🏛️ رخام واستاد FC 27 الملكي', desc: 'رخام داكن مع شبكة ذهبية هندسية وإضاءة كروية' },
            { id: 'magma_sparks', name: '🌋 حمم بركانية وجمر متوهج (مرجع 5)', desc: 'شقوق أرضية مشتعلة بحمم ساخنة وشظايا متطايرة' },
            { id: 'royal_spotlight', name: '🔦 شعاع الضوء السماوي الملكي (مرجع 8)', desc: 'حزمة ضوئية مخروطية مركزة تهبط من الأعلى' },
            { id: 'clean_dark', name: '🖤 أسود داكن نقي واستوديو فخم', desc: 'تدرج كربوني ناعم مع توهج محيطي هادئ' }
        ],
        heroes: [
            {
                type: 'hero_controller_glow',
                name: '🎮 يد تحكم متوهجة مع هالة طاقة',
                desc: 'مستوحاة من مراجع 5 و7 و8 و10',
                default: { scale: 1.05, rotation: 0, zIndex: 22 }
            },
            {
                type: 'hero_card_stack',
                name: '🃏 تكدس الكروت 3D (اشي فوق اشي)',
                desc: '3 كروت متراكمة بظلال عميقة مستوحاة من مرجع 4',
                default: {
                    scale: 1.02,
                    rotation: 0,
                    zIndex: 20,
                    card1: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
                    card2: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
                    card3: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp'
                }
            },
            {
                type: 'hero_card_fan',
                name: '🪭 مروحة كروت مقوسة دائرية',
                desc: '5 كروت مشعة في قوس نصف دائري مستوحاة من مرجع 10',
                default: { scale: 0.95, rotation: 0, zIndex: 20 }
            },
            {
                type: 'hero_slanted_ribbons',
                name: '🎗️ أشرطة مائلة 60 درجة',
                desc: 'شرائط متوازية مائلة للاعبين مستوحاة من مرجع 2',
                default: { scale: 1.05, rotation: 0, zIndex: 20 }
            },
            {
                type: 'hero_phone_3d',
                name: '📱 هاتف ذكي طافي بالشاشة المضيئة',
                desc: 'مستوحى من مرجع 1 مع إشعار نجاح الشحن الفوري',
                default: { scale: 1.05, rotation: 0, zIndex: 20 }
            },
            {
                type: 'hero_pedestal',
                name: '🛸 منصة أسطوانية نيون مضيئة',
                desc: 'قاعدة مسرحية لرفع الكروت أو الأيادي من مرجع 5',
                default: { scale: 1.0, rotation: 0, zIndex: 15 }
            },
            {
                type: 'hero_single_card',
                name: '⭐ كرت FC 27 عملاق مع تفريغ وهالة',
                desc: 'كرت فردي بطل مع هالة نور وشعاع خلفي',
                default: {
                    scale: 1.0,
                    rotation: 0,
                    zIndex: 20,
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp'
                }
            }
        ],
        fx: [
            {
                type: 'fx_gold_coins',
                name: '🪙 كوينز ذهبية طافية مع خطوط ضوئية',
                desc: 'سرب كوينز متطاير في الفضاء مستوحى من مرجع 1',
                default: { scale: 1.15, rotation: 0, zIndex: 22 }
            },
            {
                type: 'fx_fc_pack',
                name: '📦 بكج فيفا الذهبي الطافي',
                desc: 'حزمة لاعبين نادرة متوهجة مستوحاة من مرجع 5',
                default: { scale: 0.9, rotation: 0, zIndex: 22 }
            },
            {
                type: 'fx_lightning',
                name: '⚡ صواعق برق كهربائية حارقة',
                desc: 'صواعق نيون سماوية وذهبية تضرب الكروت من مرجع 5',
                default: { scale: 1.0, rotation: 0, zIndex: 25 }
            },
            {
                type: 'fx_up_arrows',
                name: '↗️ أسهم صعود وسرعة نيون خضراء',
                desc: 'أسهم ثلاثية الأبعاد تدل على مضاعفة القوة من مرجع 6',
                default: { scale: 1.0, rotation: 0, zIndex: 24 }
            },
            {
                type: 'fx_tractor_beam',
                name: '🌌 مخروط الضوء الخارق (Tractor Beam)',
                desc: 'شعاع سحب سماوي من مرجع 8 يغمر العناصر بنور ساحر',
                default: { scale: 1.1, rotation: 0, zIndex: 12 }
            },
            {
                type: 'fx_fire_embers',
                name: '🔥 جزيئات جمر ونار متطايرة',
                desc: 'شرر متطاير يرفع حرارة وأكشن التصميم من مرجع 11',
                default: { scale: 1.0, rotation: 0, zIndex: 23 }
            },
            {
                type: 'fx_cyber_dice',
                name: '🎲 نرد وكريستالات سايبر ثلاثية الأبعاد',
                desc: 'عناصر هندسية طافية بانعدام الجاذبية من مرجع 12',
                default: { scale: 0.95, rotation: 0, zIndex: 23 }
            }
        ],
        typography: [
            {
                type: 'typo_gold_3d',
                name: '👑 عنوان ذهبي ثلاثي الأبعاد مقوس',
                desc: 'حروف بارزة مع لمعان معدني مستوحاة من مرجع 1',
                default: {
                    title: 'الشحن أسهل مما تتخيل ⚡',
                    subtitle: 'المليون ينشحن بحسابك في دقيقة واحدة مع أمان كامل',
                    scale: 1.1,
                    rotation: 0,
                    zIndex: 25
                }
            },
            {
                type: 'typo_slanted_sticker',
                name: '🏷️ ستيكر مائل رياضي باندفاع',
                desc: 'لاصق عالي التباين مائل بزاوية حادة من مرجع 7',
                default: {
                    title: 'الأدرينالين مالوش سقف! 🚀',
                    scale: 1.08,
                    rotation: -6,
                    zIndex: 28
                }
            },
            {
                type: 'typo_3_pillars',
                name: '☑️ أعمدة المزايا الثلاثية مع علامات صح',
                desc: '3 بطاقات زجاجية منظمة مستوحاة من مرجع 3',
                default: {
                    p1: 'تسليم فوري قياسي خلال 60 ثانية',
                    p2: 'ضمان شامل وموثق للنادي 100%',
                    p3: 'أسعار تنافسية تشمل ضريبة EA كاملة',
                    scale: 1.05,
                    rotation: 0,
                    zIndex: 22
                }
            },
            {
                type: 'typo_pixel_8bit',
                name: '👾 عنوان بكسل ريترو 8-بت',
                desc: 'خط ألعاب كلاسيكي مستوحى من مرجع 12',
                default: {
                    title: 'GAME CHANGER ⚡ FC 27',
                    scale: 1.15,
                    rotation: 0,
                    zIndex: 28
                }
            },
            {
                type: 'typo_discount_burst',
                name: '💥 بادج الخصم المنفجر',
                desc: 'شعار دائري نجمي مشتعل مستوحى من مرجع 9',
                default: {
                    title: 'خصم 20% لفترة محدودة 🔥',
                    scale: 1.0,
                    rotation: -8,
                    zIndex: 26
                }
            },
            {
                type: 'typo_custom_text',
                name: '✍️ نص حر قابل للتعديل بالكامل',
                desc: 'كتابة أي عنوان أو فقرة واختيار نوع وحجم الخط ولونه',
                default: {
                    title: 'اكتب نصك الاحترافي هنا...',
                    fontFamily: 'alexandria',
                    fontSize: 22,
                    scale: 1.0,
                    rotation: 0,
                    zIndex: 25
                }
            }
        ],
        seals: [
            {
                type: 'seal_sc_logo',
                name: '🛡️ شعار متجر ShopCoin15 الذهبي 4K',
                desc: 'شارة المتجر الرسمية مع توثيق الأمان',
                default: { scale: 0.95, rotation: 0, zIndex: 30 }
            },
            {
                type: 'seal_fc27_logo',
                name: '⚽ شعار EA SPORTS FC 27 الرسمي',
                desc: 'اللوجو الذهبي الرسمي لنسخة FC 27',
                default: { scale: 0.9, rotation: 0, zIndex: 30 }
            },
            {
                type: 'seal_guarantee_shield',
                name: '🥇 درع الضمان الشامل 100%',
                desc: 'درع ذهبي مع إكليل غار يثبت ضمان النادي',
                default: { scale: 0.95, rotation: 0, zIndex: 28 }
            },
            {
                type: 'seal_platforms',
                name: '🎮 شريط المنصات (PS5 • XBOX • PC)',
                desc: 'شريط زجاجي عائم يوضح دعم جميع الأجهزة',
                default: { scale: 0.95, rotation: 0, zIndex: 28 }
            },
            {
                type: 'seal_rating_stars',
                name: '⭐ بادج التقييم والمراجعات (5 نجوم)',
                desc: 'شريط تقييم يبرز ثقة أكثر من 10k عميل',
                default: { scale: 0.95, rotation: 0, zIndex: 28 }
            }
        ]
    };

    // State getters
    function getSlides() { return slides; }
    function getActiveSlide() { return slides[activeSlideIndex] || slides[0]; }
    function getActiveIndex() { return activeSlideIndex; }

    function setEditorMode(mode) {
        editorMode = mode;
        const slide = getActiveSlide();
        if (mode === 'sandbox' && !slide.isSandbox) {
            convertToSandbox(activeSlideIndex);
        }
        renderEditorControls();
        renderSlideToMainCanvas();
    }

    function setActiveIndex(idx) {
        if (idx >= 0 && idx < slides.length) {
            activeSlideIndex = idx;
            selectedElementId = null;
            renderEditorControls();
            renderSlideToMainCanvas();
            renderFilmstrip();
        }
    }

    function addSlide(type = 'sandbox') {
        if (slides.length >= 10) {
            alert('الحد الأقصى لعدد سلايدات الكاروسيل هو 10 سلايدات لضمان جودة الأداء.');
            return;
        }
        const newSlide = {
            id: 'slide_' + Date.now(),
            isSandbox: true,
            type: 'sandbox',
            title: 'سلايد جديد تركيب #' + (slides.length + 1),
            backdrop: 'cyber_grid',
            elements: [
                {
                    id: 'elem_seal_' + Date.now(),
                    category: 'seals',
                    type: 'seal_sc_logo',
                    name: 'شعار المتجر',
                    x: 23,
                    y: 8,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'elem_title_' + Date.now(),
                    category: 'typography',
                    type: 'typo_gold_3d',
                    name: 'عنوان ذهبي 3D',
                    title: 'عنوان السلايد الجديد ⚡',
                    subtitle: 'اكتب هنا التفاصيل المميزة للسلايد',
                    x: 50,
                    y: 22,
                    scale: 1.05,
                    rotation: 0,
                    zIndex: 25,
                    locked: false,
                    visible: true
                },
                {
                    id: 'elem_plat_' + Date.now(),
                    category: 'seals',
                    type: 'seal_platforms',
                    name: 'المنصات المدعومة',
                    x: 50,
                    y: 92,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 28,
                    locked: true,
                    visible: true
                }
            ]
        };
        slides.push(newSlide);
        activeSlideIndex = slides.length - 1;
        selectedElementId = null;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function removeSlide(idx) {
        if (slides.length <= 1) {
            alert('يجب أن يحتوي الكاروسيل على سلايد واحد على الأقل.');
            return;
        }
        slides.splice(idx, 1);
        if (activeSlideIndex >= slides.length) {
            activeSlideIndex = slides.length - 1;
        }
        selectedElementId = null;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function duplicateSlide(idx) {
        if (slides.length >= 10) {
            alert('الحد الأقصى 10 سلايدات.');
            return;
        }
        const clone = JSON.parse(JSON.stringify(slides[idx]));
        clone.id = 'slide_' + Date.now();
        clone.title += ' (نسخة)';
        slides.splice(idx + 1, 0, clone);
        activeSlideIndex = idx + 1;
        selectedElementId = null;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
    }

    function convertToSandbox(idx) {
        const s = slides[idx];
        if (!s) return;
        s.isSandbox = true;
        s.backdrop = s.backdrop || 'cyber_grid';
        if (!Array.isArray(s.elements) || s.elements.length === 0) {
            s.elements = [
                {
                    id: 'el_seal',
                    category: 'seals',
                    type: 'seal_sc_logo',
                    name: 'شعار المتجر',
                    x: 23,
                    y: 8,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 30,
                    locked: true,
                    visible: true
                },
                {
                    id: 'el_typo',
                    category: 'typography',
                    type: 'typo_gold_3d',
                    name: 'عنوان ذهبي',
                    title: s.title || 'عنوان الكاروسيل ⚡',
                    subtitle: s.subtitle || s.body || 'شرح المعلومة والميزة',
                    x: 50,
                    y: 22,
                    scale: 1.05,
                    rotation: 0,
                    zIndex: 25,
                    locked: false,
                    visible: true
                },
                {
                    id: 'el_plat',
                    category: 'seals',
                    type: 'seal_platforms',
                    name: 'شريط المنصات',
                    x: 50,
                    y: 92,
                    scale: 0.95,
                    rotation: 0,
                    zIndex: 28,
                    locked: true,
                    visible: true
                }
            ];
        }
    }

    function applyStarterComposition(templateKey) {
        const comp = STARTER_COMPOSITIONS[templateKey];
        if (!comp) return;
        const currentSlide = getActiveSlide();
        currentSlide.isSandbox = true;
        currentSlide.title = comp.name.replace(/^[^\w\s]*\s*\d+\.\s*/, '');
        currentSlide.backdrop = comp.backdrop;
        currentSlide.elements = JSON.parse(JSON.stringify(comp.elements));
        // Assign fresh IDs
        currentSlide.elements.forEach((el, i) => {
            el.id = 'el_' + Date.now() + '_' + i;
        });
        selectedElementId = null;
        renderEditorControls();
        renderSlideToMainCanvas();
        renderFilmstrip();
        if (window.showCopyToast) {
            window.showCopyToast(`تم تطبيق قالب "${comp.name}" بنجاح! 🚀✨`);
        }
    }

    function setSlideBackdrop(backdropId) {
        const slide = getActiveSlide();
        if (!slide) return;
        slide.backdrop = backdropId;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    // Element Management
    function addElementToCurrentSlide(category, typeKey) {
        const slide = getActiveSlide();
        if (!slide.isSandbox) convertToSandbox(activeSlideIndex);

        let catList = CATALOG[category] || [];
        let def = catList.find(c => c.type === typeKey);
        let name = def ? def.name : typeKey;
        let dValues = def ? def.default : {};

        // Calculate next max zIndex
        let maxZ = 10;
        (slide.elements || []).forEach(e => {
            if (e.zIndex >= maxZ) maxZ = e.zIndex + 1;
        });

        const newElem = {
            id: 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            category: category,
            type: typeKey,
            name: name.replace(/^[^\w\s]*\s*/, ''),
            x: 50,
            y: 50,
            scale: dValues.scale || 1.0,
            rotation: dValues.rotation || 0,
            zIndex: maxZ,
            locked: false,
            visible: true,
            ...dValues
        };

        if (!slide.elements) slide.elements = [];
        slide.elements.push(newElem);
        selectedElementId = newElem.id;
        renderSlideToMainCanvas();
        renderEditorControls();

        if (window.showCopyToast) {
            window.showCopyToast(`تمت إضافة "${newElem.name}" إلى الكانفاس! 🎯`);
        }
    }

    function selectElement(elemId) {
        selectedElementId = elemId;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function getSelectedElement() {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return null;
        return slide.elements.find(e => e.id === selectedElementId) || null;
    }

    function updateSelectedElement(field, value) {
        const elem = getSelectedElement();
        if (!elem) return;
        elem[field] = value;
        renderSlideToMainCanvas();
        // Update specific UI controls if needed
        const layerItem = document.getElementById(`layer_item_${elem.id}`);
        if (layerItem && field === 'name') {
            const label = layerItem.querySelector('.layer-title');
            if (label) label.textContent = value;
        }
    }

    function toggleElementLock(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.locked = !elem.locked;
        renderSlideToMainCanvas();
        renderEditorControls();
        if (window.showCopyToast) {
            window.showCopyToast(elem.locked ? `تم قفل العنصر 🔒 (لن يتحرك بالخطأ)` : `تم إلغاء القفل 🔓`);
        }
    }

    function toggleElementVisibility(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.visible = elem.visible === false ? true : false;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function deleteElement(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        slide.elements = slide.elements.filter(e => e.id !== elemId);
        if (selectedElementId === elemId) selectedElementId = null;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function duplicateElement(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        const clone = JSON.parse(JSON.stringify(elem));
        clone.id = 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        clone.x = Math.min(90, clone.x + 4);
        clone.y = Math.min(90, clone.y + 4);
        clone.zIndex = (elem.zIndex || 10) + 1;
        clone.locked = false;
        slide.elements.push(clone);
        selectedElementId = clone.id;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    // Layer Ordering Functions ("اشي فوق اشي")
    function bringElementForward(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.zIndex = (elem.zIndex || 10) + 2;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function sendElementBackward(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.zIndex = Math.max(1, (elem.zIndex || 10) - 2);
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function bringElementToFront(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        let maxZ = 10;
        slide.elements.forEach(e => {
            if (e.zIndex > maxZ) maxZ = e.zIndex;
        });
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.zIndex = maxZ + 2;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function sendElementToBack(elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        let minZ = 10;
        slide.elements.forEach(e => {
            if (e.zIndex < minZ) minZ = e.zIndex;
        });
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.zIndex = Math.max(1, minZ - 2);
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function stepElementScale(elemId, delta) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.scale = Math.max(0.2, Math.min(3.0, +(elem.scale + delta).toFixed(2)));
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    function stepElementRotation(elemId, deg) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(e => e.id === elemId);
        if (!elem) return;
        elem.rotation = ((elem.rotation || 0) + deg) % 360;
        renderSlideToMainCanvas();
        renderEditorControls();
    }

    // HTML / SVG Renderers for All Elements
    function renderBackdropHtml(type) {
        switch (type) {
            case 'cyber_grid':
                return `
                    <div class="absolute inset-0 bg-[#050813] overflow-hidden pointer-events-none select-none">
                        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.22),transparent_70%)]"></div>
                        <div class="absolute top-0 right-0 left-0 h-[48%] bg-gradient-to-b from-[#03050a] via-[#050813] to-[#091024]"></div>
                        <!-- Stars / Cyber Particles -->
                        <div class="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#06b6d4]"></div>
                        <div class="absolute top-16 right-20 w-1 h-1 rounded-full bg-blue-300/60 shadow-[0_0_6px_#38bdf8]"></div>
                        <div class="absolute top-24 left-36 w-1.5 h-1.5 rounded-full bg-emerald-400/70 shadow-[0_0_8px_#10b981]"></div>
                        <div class="absolute top-32 right-10 w-1 h-1 rounded-full bg-amber-300/60"></div>
                        <!-- Horizon Glow Line -->
                        <div class="absolute top-[48%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4]"></div>
                        <!-- 3D Perspective Grid Floor -->
                        <div class="absolute bottom-0 left-0 right-0 h-[52%] overflow-hidden" style="perspective: 320px;">
                            <div class="absolute inset-0" style="transform: rotateX(65deg) translateZ(0); transform-origin: top center; background-size: 36px 36px; background-image: linear-gradient(to right, rgba(6,182,212,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.28) 1px, transparent 1px); mask-image: linear-gradient(to bottom, black 25%, transparent 95%);"></div>
                        </div>
                    </div>
                `;
            case 'fire_ice':
                return `
                    <div class="absolute inset-0 bg-[#080a12] overflow-hidden pointer-events-none select-none">
                        <!-- Dual Split Angle -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#1f0902] via-[#0b0c16] to-[#011a28]"></div>
                        <!-- Fire Side (Bottom Left / Center) -->
                        <div class="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-600/35 via-orange-600/25 to-transparent blur-3xl"></div>
                        <!-- Ice Side (Top Right) -->
                        <div class="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-bl from-cyan-400/35 via-blue-600/25 to-transparent blur-3xl"></div>
                        <!-- Central Energy Seam -->
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]"></div>
                    </div>
                `;
            case 'esports_arena':
                return `
                    <div class="absolute inset-0 bg-[#070a0f] overflow-hidden pointer-events-none select-none">
                        <!-- Carbon Fiber Pattern -->
                        <div class="absolute inset-0 opacity-15" style="background-image: radial-gradient(#10b981 1px, transparent 1px); background-size: 16px 16px;"></div>
                        <!-- Dual Stadium Spotlight Cones -->
                        <div class="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl transform -rotate-12"></div>
                        <div class="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl transform rotate-12"></div>
                        <!-- Hexagon Mesh Ambience -->
                        <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-slate-950/80 to-transparent"></div>
                    </div>
                `;
            case 'topo_gold':
                return `
                    <div class="absolute inset-0 bg-[#06070a] overflow-hidden pointer-events-none select-none">
                        <!-- Luxury Dark Texture -->
                        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(217,119,6,0.18),transparent_70%)]"></div>
                        <!-- Topographic Vector Waves -->
                        <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 480 600" fill="none" stroke="url(#goldGrad)" stroke-width="1.2">
                            <defs>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#f59e0b" />
                                    <stop offset="50%" stop-color="#d97706" />
                                    <stop offset="100%" stop-color="#b45309" />
                                </linearGradient>
                            </defs>
                            <path d="M-50,150 Q120,80 240,160 T530,130" />
                            <path d="M-50,210 Q140,140 260,220 T530,190" />
                            <path d="M-50,270 Q160,200 280,280 T530,250" />
                            <path d="M-50,330 Q180,260 300,340 T530,310" />
                            <path d="M-50,390 Q200,320 320,400 T530,370" />
                            <path d="M-50,450 Q220,380 340,460 T530,430" />
                            <circle cx="240" cy="270" r="90" stroke-dasharray="4 6" opacity="0.6"/>
                            <circle cx="240" cy="270" r="140" opacity="0.4"/>
                        </svg>
                        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                    </div>
                `;
            case 'neon_vortex':
                return `
                    <div class="absolute inset-0 bg-[#090314] overflow-hidden pointer-events-none select-none">
                        <!-- Swirling Hyperspace Vortex -->
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_65%)]"></div>
                        <div class="absolute -inset-10 flex items-center justify-center opacity-40">
                            <div class="w-[420px] h-[420px] rounded-full border-2 border-fuchsia-500/40 shadow-[0_0_40px_rgba(217,70,239,0.3)] transform rotate-12 scale-110"></div>
                            <div class="absolute w-[340px] h-[340px] rounded-full border border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] transform -rotate-45"></div>
                            <div class="absolute w-[240px] h-[240px] rounded-full border-2 border-indigo-400/60 shadow-[0_0_25px_rgba(99,102,241,0.5)]"></div>
                            <div class="absolute w-[120px] h-[120px] rounded-full bg-fuchsia-600/30 blur-xl"></div>
                        </div>
                    </div>
                `;
            case 'fc27_marble':
                return `
                    <div class="absolute inset-0 bg-[#080a10] overflow-hidden pointer-events-none select-none">
                        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(245,158,11,0.18),transparent_65%)]"></div>
                        <!-- Geometric FC Grid Lines -->
                        <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 480 600" fill="none" stroke="#f59e0b" stroke-width="1">
                            <polygon points="240,40 440,160 440,440 240,560 40,440 40,160" stroke-dasharray="6 6"/>
                            <line x1="240" y1="40" x2="240" y2="560"/>
                            <line x1="40" y1="160" x2="440" y2="440"/>
                            <line x1="40" y1="440" x2="440" y2="160"/>
                        </svg>
                        <div class="absolute top-0 right-0 left-0 h-36 bg-gradient-to-b from-black/80 to-transparent"></div>
                        <div class="absolute bottom-0 right-0 left-0 h-36 bg-gradient-to-t from-black/90 to-transparent"></div>
                    </div>
                `;
            case 'magma_sparks':
                return `
                    <div class="absolute inset-0 bg-[#0a0503] overflow-hidden pointer-events-none select-none">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#260a02] via-[#100604] to-[#050302]"></div>
                        <div class="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_50%_100%,rgba(239,68,68,0.35),transparent_70%)]"></div>
                        <!-- Magma Cracks -->
                        <svg class="absolute bottom-0 left-0 right-0 h-48 w-full opacity-35" viewBox="0 0 480 200" fill="none" stroke="#f97316" stroke-width="2">
                            <path d="M0,200 L120,130 L190,160 L280,90 L380,140 L480,110"/>
                            <path d="M120,130 L160,80 L230,110 L310,40"/>
                        </svg>
                    </div>
                `;
            case 'royal_spotlight':
                return `
                    <div class="absolute inset-0 bg-[#040817] overflow-hidden pointer-events-none select-none">
                        <!-- Heavenly Tractor Beam Cone -->
                        <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-t-[540px] border-t-cyan-400/15 filter blur-xl"></div>
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.25),transparent_60%)]"></div>
                        <div class="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#02050f] to-transparent"></div>
                    </div>
                `;
            default: // clean_dark
                return `
                    <div class="absolute inset-0 bg-[#080b14] overflow-hidden pointer-events-none select-none">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.18),transparent_65%)]"></div>
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.14),transparent_60%)]"></div>
                    </div>
                `;
        }
    }

    function renderElementHtml(elem) {
        if (elem.visible === false) return '';

        let content = '';

        switch (elem.type) {
            // HERO PROPS
            case 'hero_controller_glow':
                content = `
                    <div class="relative flex items-center justify-center p-2" style="width: 290px;">
                        <!-- Vibrant Neon Rim Backlight -->
                        <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500/50 via-purple-600/50 to-pink-500/50 blur-2xl rounded-full"></div>
                        <!-- 3D DualSense Vector Silhouette -->
                        <svg class="relative z-10 w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] filter" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Controller Shell -->
                            <path d="M120 40 C70 40 40 100 25 180 C15 230 40 260 70 255 C100 250 125 185 140 165 C165 155 235 155 260 165 C275 185 300 250 330 255 C360 260 385 230 375 180 C360 100 330 40 280 40 Z" fill="#0f172a" stroke="url(#ctrlGlow)" stroke-width="4"/>
                            <!-- Glowing Touchpad -->
                            <rect x="155" y="55" width="90" height="60" rx="8" fill="#1e293b" stroke="#00f0ff" stroke-width="2" opacity="0.9"/>
                            <!-- LED Lightbar Glow -->
                            <path d="M148 58 Q200 48 252 58" stroke="#00f0ff" stroke-width="4" stroke-linecap="round" filter="drop-shadow(0 0 8px #00f0ff)"/>
                            <!-- Thumbsticks -->
                            <circle cx="160" cy="180" r="28" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                            <circle cx="160" cy="180" r="18" fill="#0f172a"/>
                            <circle cx="240" cy="180" r="28" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                            <circle cx="240" cy="180" r="18" fill="#0f172a"/>
                            <!-- D-Pad -->
                            <path d="M90 95 H110 V115 H90 Z M80 105 H120 M100 85 V125" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
                            <!-- Action Buttons -->
                            <circle cx="295" cy="95" r="6" fill="#ec4899"/>
                            <circle cx="315" cy="105" r="6" fill="#ef4444"/>
                            <circle cx="295" cy="115" r="6" fill="#3b82f6"/>
                            <circle cx="275" cy="105" r="6" fill="#10b981"/>
                            <defs>
                                <linearGradient id="ctrlGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#00f0ff"/>
                                    <stop offset="50%" stop-color="#a855f7"/>
                                    <stop offset="100%" stop-color="#ec4899"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <!-- Energy Lightning Pulse Beneath -->
                        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-2 rounded-full bg-cyan-400 blur-sm shadow-[0_0_15px_#00f0ff]"></div>
                    </div>
                `;
                break;

            case 'hero_card_stack':
                // 3D Overlapping Tilted Cards Stack ("اشي فوق اشي") from Screenshot 4
                const c1 = elem.card1 || 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp';
                const c2 = elem.card2 || 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp';
                const c3 = elem.card3 || 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp';
                content = `
                    <div class="relative w-[310px] h-[240px] flex items-center justify-center">
                        <!-- Back Left Card (-14 deg) -->
                        <div class="absolute transform -rotate-12 -translate-x-16 translate-y-3 scale-90 transition-all opacity-85 hover:opacity-100 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                            <img src="${c2}" class="w-36 h-auto pointer-events-none" alt="Left Card">
                        </div>
                        <!-- Back Right Card (+14 deg) -->
                        <div class="absolute transform rotate-12 translate-x-16 translate-y-3 scale-90 transition-all opacity-85 hover:opacity-100 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                            <img src="${c3}" class="w-36 h-auto pointer-events-none" alt="Right Card">
                        </div>
                        <!-- Front Center Card (Top Layer) -->
                        <div class="relative z-20 transform scale-105 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]">
                            <div class="absolute -inset-2 bg-gradient-to-t from-amber-500/40 via-cyan-400/20 to-transparent blur-xl rounded-2xl"></div>
                            <img src="${c1}" class="w-40 h-auto pointer-events-none relative z-10" alt="Center Card">
                        </div>
                    </div>
                `;
                break;

            case 'hero_card_fan':
                // Semi-Circular Arc 5 Cards from Screenshot 10
                content = `
                    <div class="relative w-[340px] h-[210px] flex items-end justify-center">
                        <div class="absolute bottom-0 -translate-x-32 transform -rotate-24 scale-75 opacity-70 filter drop-shadow-xl">
                            <img src="https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp" class="w-28 h-auto">
                        </div>
                        <div class="absolute bottom-2 -translate-x-16 transform -rotate-12 scale-85 opacity-85 filter drop-shadow-xl">
                            <img src="https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp" class="w-32 h-auto">
                        </div>
                        <div class="relative z-20 bottom-4 scale-100 filter drop-shadow-2xl">
                            <img src="https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp" class="w-36 h-auto">
                        </div>
                        <div class="absolute bottom-2 translate-x-16 transform rotate-12 scale-85 opacity-85 filter drop-shadow-xl">
                            <img src="https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp" class="w-32 h-auto">
                        </div>
                        <div class="absolute bottom-0 translate-x-32 transform rotate-24 scale-75 opacity-70 filter drop-shadow-xl">
                            <img src="https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp" class="w-28 h-auto">
                        </div>
                    </div>
                `;
                break;

            case 'hero_slanted_ribbons':
                // Parallel 60 deg Slanted Dynamic Ribbons from Screenshot 2
                content = `
                    <div class="relative w-[340px] space-y-2.5 transform -skew-x-12 select-none">
                        <div class="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/90 via-amber-600/80 to-slate-900/90 border-2 border-amber-300/50 shadow-xl flex items-center justify-between text-white">
                            <div class="flex items-center gap-2 transform skew-x-12">
                                <span class="px-2 py-0.5 rounded bg-black/40 text-amber-300 font-black text-xs">91</span>
                                <span class="font-black text-xs font-['Alexandria']">KYLIAN MBAPPÉ</span>
                            </div>
                            <span class="transform skew-x-12 text-[10px] font-bold text-amber-200">سرعة 97 ⚡</span>
                        </div>
                        <div class="p-2.5 rounded-xl bg-gradient-to-r from-blue-600/90 via-indigo-600/80 to-slate-900/90 border-2 border-blue-400/50 shadow-xl flex items-center justify-between text-white">
                            <div class="flex items-center gap-2 transform skew-x-12">
                                <span class="px-2 py-0.5 rounded bg-black/40 text-blue-300 font-black text-xs">90</span>
                                <span class="font-black text-xs font-['Alexandria']">JUDE BELLINGHAM</span>
                            </div>
                            <span class="transform skew-x-12 text-[10px] font-bold text-cyan-200">صناعة 88 🎯</span>
                        </div>
                        <div class="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600/90 via-teal-600/80 to-slate-900/90 border-2 border-emerald-400/50 shadow-xl flex items-center justify-between text-white">
                            <div class="flex items-center gap-2 transform skew-x-12">
                                <span class="px-2 py-0.5 rounded bg-black/40 text-emerald-300 font-black text-xs">91</span>
                                <span class="font-black text-xs font-['Alexandria']">RODRI CDM</span>
                            </div>
                            <span class="transform skew-x-12 text-[10px] font-bold text-emerald-200">دفاع 87 🛡️</span>
                        </div>
                    </div>
                `;
                break;

            case 'hero_phone_3d':
                // Modern 3D Floating Smartphone from Screenshot 1
                content = `
                    <div class="relative w-[210px] p-2.5 rounded-[32px] bg-gradient-to-b from-slate-700 via-slate-900 to-black border-2 border-white/20 shadow-[0_25px_50px_rgba(0,0,0,0.85)] filter">
                        <!-- Camera Notch / Dynamic Island -->
                        <div class="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                            <div class="w-1.5 h-1.5 rounded-full bg-blue-950 border border-blue-500/40"></div>
                        </div>
                        <!-- Screen Content -->
                        <div class="rounded-[22px] bg-gradient-to-b from-[#0a1020] to-[#040812] border border-cyan-500/30 p-3 text-center space-y-2.5">
                            <div class="w-9 h-9 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 text-base font-black shadow-[0_0_12px_#10b981]">
                                ✓
                            </div>
                            <div class="text-[10.5px] font-black text-white font-['Alexandria']">
                                تم تحويل الكوينز بنجاح!
                            </div>
                            <div class="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-black text-sm">
                                +1,000,000 COINS
                            </div>
                            <div class="text-[9px] text-slate-400 font-medium">
                                وقت التنفيذ: 48 ثانية فقط ⚡
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'hero_pedestal':
                // Cyber Neon Pedestal Stage Base from Screenshot 5
                content = `
                    <div class="relative w-[280px] h-[55px] flex items-center justify-center">
                        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-600 blur-md opacity-60"></div>
                        <div class="relative z-10 w-full h-full rounded-[100%] bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center justify-center">
                            <div class="w-[82%] h-[65%] rounded-[100%] border border-cyan-300/40 bg-cyan-950/40"></div>
                        </div>
                    </div>
                `;
                break;

            case 'hero_single_card':
                const cardUrl = elem.cardUrl || 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp';
                content = `
                    <div class="relative w-[180px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
                        <div class="absolute -inset-3 bg-gradient-to-t from-amber-500/30 to-transparent blur-xl rounded-full"></div>
                        <img src="${cardUrl}" class="w-full h-auto pointer-events-none relative z-10" alt="Hero Card">
                    </div>
                `;
                break;

            // FLOATING FX & TOKENS
            case 'fx_gold_coins':
                // Swarm of Orbiting Golden Coins from Screenshot 1
                content = `
                    <div class="relative w-[280px] h-[180px] pointer-events-none select-none">
                        <!-- Coin 1 (Top Left) -->
                        <div class="absolute top-2 left-6 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-100 shadow-[0_0_15px_#f59e0b] flex items-center justify-center text-slate-950 font-black text-xs transform -rotate-12">
                            C
                        </div>
                        <!-- Coin 2 (Top Right Large) -->
                        <div class="absolute top-0 right-8 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-100 border-2 border-white shadow-[0_0_20px_#f59e0b] flex items-center justify-center text-slate-950 font-black text-sm transform rotate-15">
                            🪙
                        </div>
                        <!-- Coin 3 (Mid Left) -->
                        <div class="absolute top-16 left-0 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-white shadow-[0_0_10px_#f59e0b] flex items-center justify-center text-[10px] transform rotate-45">
                            C
                        </div>
                        <!-- Coin 4 (Bottom Right) -->
                        <div class="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-200 shadow-[0_0_15px_#f59e0b] flex items-center justify-center text-slate-950 font-black text-xs transform -rotate-6">
                            🪙
                        </div>
                        <!-- Sparkle Streaks -->
                        <div class="absolute top-6 left-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-[0.5px]"></div>
                        <div class="absolute bottom-8 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-200 to-transparent blur-[0.5px]"></div>
                    </div>
                `;
                break;

            case 'fx_fc_pack':
                content = `
                    <div class="relative w-[110px] filter drop-shadow-[0_15px_25px_rgba(245,158,11,0.4)]">
                        <img src="assets/fc27_jumbo_gold_pack.png" onerror="this.src='assets/sc-logo.png'" class="w-full h-auto pointer-events-none" alt="FC Pack">
                    </div>
                `;
                break;

            case 'fx_lightning':
                content = `
                    <div class="relative w-[120px] h-[140px] pointer-events-none select-none flex items-center justify-center">
                        <svg class="w-full h-full filter drop-shadow-[0_0_15px_#00f0ff]" viewBox="0 0 100 120" fill="none">
                            <path d="M55,5 L15,65 L48,65 L35,115 L85,45 L52,45 Z" fill="url(#boltGrad)" stroke="#ffffff" stroke-width="1.5"/>
                            <defs>
                                <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#38bdf8"/>
                                    <stop offset="50%" stop-color="#00f0ff"/>
                                    <stop offset="100%" stop-color="#f59e0b"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                `;
                break;

            case 'fx_up_arrows':
                content = `
                    <div class="relative w-[80px] h-[130px] flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
                        <div class="w-12 h-6 border-t-4 border-r-4 border-emerald-400 transform -rotate-45 shadow-[0_0_12px_#10b981]"></div>
                        <div class="w-10 h-5 border-t-4 border-r-4 border-emerald-400/80 transform -rotate-45"></div>
                        <div class="w-8 h-4 border-t-4 border-r-4 border-emerald-400/50 transform -rotate-45"></div>
                    </div>
                `;
                break;

            case 'fx_tractor_beam':
                content = `
                    <div class="relative w-[280px] h-[340px] pointer-events-none select-none flex justify-center">
                        <div class="w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[340px] border-t-cyan-400/20 filter blur-lg"></div>
                    </div>
                `;
                break;

            case 'fx_fire_embers':
                content = `
                    <div class="relative w-[180px] h-[180px] pointer-events-none select-none">
                        <div class="absolute top-4 left-6 w-2 h-2 rounded-full bg-orange-400 blur-[0.5px] shadow-[0_0_8px_#ea580c]"></div>
                        <div class="absolute top-12 right-10 w-3 h-3 rounded-full bg-amber-300 blur-[1px] shadow-[0_0_10px_#f59e0b]"></div>
                        <div class="absolute bottom-6 left-12 w-2.5 h-2.5 rounded-full bg-red-500 blur-[0.5px] shadow-[0_0_8px_#ef4444]"></div>
                        <div class="absolute bottom-16 right-6 w-1.5 h-1.5 rounded-full bg-yellow-200"></div>
                    </div>
                `;
                break;

            case 'fx_cyber_dice':
                content = `
                    <div class="relative w-[130px] h-[130px] pointer-events-none select-none flex items-center justify-center">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 border-2 border-white/50 shadow-[0_0_20px_rgba(168,85,247,0.6)] transform rotate-45 flex items-center justify-center text-white text-xl font-black">
                            ⚡
                        </div>
                    </div>
                `;
                break;

            // 3D TYPOGRAPHY & STICKERS
            case 'typo_gold_3d':
                content = `
                    <div class="text-center px-4 max-w-[380px]">
                        <h2 class="text-2xl font-black leading-tight tracking-tight font-['Alexandria']" style="background: linear-gradient(180deg, #fffbeb 0%, #fef08a 25%, #eab308 60%, #a16207 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 2px 0 #713f12) drop-shadow(0 4px 6px rgba(0,0,0,0.8));">
                            ${elem.title || 'الشحن أسهل مما تتخيل ⚡'}
                        </h2>
                        ${elem.subtitle ? `
                            <p class="mt-1.5 text-xs text-slate-300 font-bold leading-normal font-['Cairo'] drop-shadow-md">
                                ${elem.subtitle}
                            </p>
                        ` : ''}
                    </div>
                `;
                break;

            case 'typo_slanted_sticker':
                content = `
                    <div class="inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm border-2 border-white shadow-[0_10px_25px_rgba(245,158,11,0.5)] font-['Alexandria']">
                        ${elem.title || 'الأدرينالين مالوش سقف! 🚀'}
                    </div>
                `;
                break;

            case 'typo_3_pillars':
                content = `
                    <div class="w-[320px] space-y-2 font-['Cairo'] text-right">
                        <div class="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-2.5 text-xs font-black text-white">
                            <span class="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">✓</span>
                            <span>${elem.p1 || 'تسليم فوري قياسي خلال 60 ثانية'}</span>
                        </div>
                        <div class="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-2.5 text-xs font-black text-white">
                            <span class="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">✓</span>
                            <span>${elem.p2 || 'ضمان شامل وموثق للنادي 100%'}</span>
                        </div>
                        <div class="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-2.5 text-xs font-black text-white">
                            <span class="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">✓</span>
                            <span>${elem.p3 || 'أسعار تنافسية تشمل ضريبة EA كاملة'}</span>
                        </div>
                    </div>
                `;
                break;

            case 'typo_pixel_8bit':
                content = `
                    <div class="px-4 py-2 rounded-xl bg-black/70 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-cyan-300 font-mono font-black text-base tracking-widest text-center">
                        ${elem.title || 'GAME CHANGER ⚡ FC 27'}
                    </div>
                `;
                break;

            case 'typo_discount_burst':
                content = `
                    <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 border-2 border-white shadow-[0_0_20px_#ef4444] flex flex-col items-center justify-center text-white text-center p-2">
                        <span class="text-[10px] font-bold">عرض خاص</span>
                        <span class="text-xs font-black leading-tight">${elem.title || 'خصم 20% 🔥'}</span>
                    </div>
                `;
                break;

            case 'typo_custom_text':
                const fontClass = elem.fontFamily ? `font-['${elem.fontFamily}']` : "font-['Alexandria']";
                content = `
                    <div class="text-center px-3 py-1.5 rounded-xl text-white font-black drop-shadow-lg ${fontClass}" style="font-size: ${elem.fontSize || 20}px;">
                        ${elem.title || 'نص مخصص'}
                    </div>
                `;
                break;

            // BRAND SEALS & BADGES
            case 'seal_sc_logo':
                content = `
                    <div class="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg whitespace-nowrap">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1.5px]">
                            <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px]">⚡</div>
                        </div>
                        <span class="text-xs font-black tracking-wider text-white" dir="ltr">@SHOP_COIN15</span>
                        <span class="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                    </div>
                `;
                break;

            case 'seal_fc27_logo':
                content = `
                    <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/40 shadow-lg whitespace-nowrap">
                        <span class="text-xs font-black text-amber-300 tracking-wider">EA SPORTS FC 27 ⚽</span>
                    </div>
                `;
                break;

            case 'seal_guarantee_shield':
                content = `
                    <div class="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/40 shadow-lg text-amber-300 text-xs font-black whitespace-nowrap">
                        <span>🛡️ ضمان نادي كامل 100% معتمد</span>
                    </div>
                `;
                break;

            case 'seal_platforms':
                content = `
                    <div class="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg text-slate-300 text-[11px] font-black whitespace-nowrap" dir="ltr">
                        <span class="text-emerald-400 font-bold mr-1 font-['Cairo']" dir="rtl">⚡ تسليم دقيقة</span>
                        <span class="text-slate-600">•</span>
                        <span>PS5</span>
                        <span class="text-slate-600">•</span>
                        <span>XBOX</span>
                        <span class="text-slate-600">•</span>
                        <span>PC</span>
                    </div>
                `;
                break;

            case 'seal_rating_stars':
                content = `
                    <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg text-[11px] font-bold text-amber-400 whitespace-nowrap">
                        <span>★★★★★</span>
                        <span class="text-white font-black text-[10px]">أكثر من 10,000 عميل موثوق</span>
                    </div>
                `;
                break;

            case 'seal_indicator':
                const total = slides.length;
                const cur = activeSlideIndex + 1;
                content = `
                    <div class="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-black text-cyan-300 whitespace-nowrap">
                        سلايد ${cur} من ${total}
                    </div>
                `;
                break;

            default:
                content = `<div class="p-3 bg-blue-600 text-white font-bold rounded-xl">${elem.name}</div>`;
        }

        const isSelected = selectedElementId === elem.id;
        const isLocked = elem.locked === true;

        return `
            <div id="sandbox_elem_${elem.id}"
                 class="sandbox-element ${isSelected ? 'is-selected' : ''} ${isLocked ? 'is-locked' : ''}"
                 data-elem-id="${elem.id}"
                 style="
                    left: ${elem.x}%;
                    top: ${elem.y}%;
                    z-index: ${elem.zIndex || 10};
                    transform: translate(-50%, -50%) rotate(${elem.rotation || 0}deg) scale(${elem.scale || 1});
                 "
                 onpointerdown="CarouselEngine.handleElementPointerDown(event, '${elem.id}')">
                
                ${content}

                ${isLocked ? `
                    <div class="sandbox-lock-badge no-export" title="عنصر مقفول (انقر لإلغاء القفل)" onclick="event.stopPropagation(); CarouselEngine.toggleElementLock('${elem.id}')">
                        🔒
                    </div>
                ` : ''}

                ${isSelected && !isLocked ? `
                    <!-- Selection Corners (no-export) -->
                    <div class="sandbox-handle-dot sandbox-handle-tl no-export"></div>
                    <div class="sandbox-handle-dot sandbox-handle-tr no-export"></div>
                    <div class="sandbox-handle-dot sandbox-handle-bl no-export"></div>
                    <div class="sandbox-handle-dot sandbox-handle-br no-export"></div>

                    <!-- Direct Action Floating Quick Bar (no-export) -->
                    <div class="sandbox-quick-bar no-export">
                        <button type="button" class="sandbox-quick-btn text-amber-300" onclick="event.stopPropagation(); CarouselEngine.toggleElementLock('${elem.id}')" title="قفل العنصر">
                            🔒 قفل
                        </button>
                        <button type="button" class="sandbox-quick-btn" onclick="event.stopPropagation(); CarouselEngine.bringElementForward('${elem.id}')" title="تقديم طبقة للأمام">
                            ⬆️ فوق
                        </button>
                        <button type="button" class="sandbox-quick-btn" onclick="event.stopPropagation(); CarouselEngine.sendElementBackward('${elem.id}')" title="تأخير طبقة للخلف">
                            ⬇️ تحت
                        </button>
                        <button type="button" class="sandbox-quick-btn" onclick="event.stopPropagation(); CarouselEngine.stepElementScale('${elem.id}', 0.1)" title="تكبير الحجم">
                            ➕
                        </button>
                        <button type="button" class="sandbox-quick-btn" onclick="event.stopPropagation(); CarouselEngine.stepElementScale('${elem.id}', -0.1)" title="تصغير الحجم">
                            ➖
                        </button>
                        <button type="button" class="sandbox-quick-btn" onclick="event.stopPropagation(); CarouselEngine.stepElementRotation('${elem.id}', 15)" title="تدوير 15 درجة">
                            🔄
                        </button>
                        <button type="button" class="sandbox-quick-btn text-red-400" onclick="event.stopPropagation(); CarouselEngine.deleteElement('${elem.id}')" title="حذف العنصر">
                            ✕
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Direct Drag and Placement Engine on Canvas
    let dragData = null;

    function handleElementPointerDown(e, elemId) {
        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(el => el.id === elemId);
        if (!elem) return;

        // If locked, do not initiate canvas drag!
        if (elem.locked) {
            selectElement(elemId);
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        selectElement(elemId);

        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        dragData = {
            elemId: elemId,
            startX: e.clientX,
            startY: e.clientY,
            initialElemX: elem.x,
            initialElemY: elem.y,
            canvasWidth: rect.width || 480,
            canvasHeight: rect.height || 600
        };

        window.addEventListener('pointermove', handleWindowPointerMove);
        window.addEventListener('pointerup', handleWindowPointerUp);
    }

    function handleWindowPointerMove(e) {
        if (!dragData) return;
        const dx = e.clientX - dragData.startX;
        const dy = e.clientY - dragData.startY;

        const deltaXPercent = (dx / dragData.canvasWidth) * 100;
        const deltaYPercent = (dy / dragData.canvasHeight) * 100;

        const slide = getActiveSlide();
        if (!slide || !slide.elements) return;
        const elem = slide.elements.find(el => el.id === dragData.elemId);
        if (!elem || elem.locked) return;

        // Calculate clamped percentages
        let newX = Math.round(Math.max(5, Math.min(95, dragData.initialElemX + deltaXPercent)));
        let newY = Math.round(Math.max(5, Math.min(95, dragData.initialElemY + deltaYPercent)));

        elem.x = newX;
        elem.y = newY;

        // Lightweight live transform update on DOM without full canvas rebuild
        const domEl = document.getElementById(`sandbox_elem_${elem.id}`);
        if (domEl) {
            domEl.style.left = `${newX}%`;
            domEl.style.top = `${newY}%`;
        }
    }

    function handleWindowPointerUp() {
        if (!dragData) return;
        dragData = null;
        window.removeEventListener('pointermove', handleWindowPointerMove);
        window.removeEventListener('pointerup', handleWindowPointerUp);
        // Sync inspector coordinates
        renderEditorControls();
    }

    // Main Canvas Render
    function renderSlideToMainCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_carousel') return;

        const slide = getActiveSlide();
        canvas.className = 'canvas-portrait relative overflow-hidden select-none';
        canvas.setAttribute('data-canvas-ratio', 'portrait');

        if (slide.isSandbox || editorMode === 'sandbox') {
            // Render Design Compositor Sandbox
            let html = renderBackdropHtml(slide.backdrop || 'cyber_grid');

            // Render all elements sorted by zIndex ascending so stacking is correct in DOM
            const sortedElements = [...(slide.elements || [])].sort((a, b) => (a.zIndex || 10) - (b.zIndex || 10));
            sortedElements.forEach(elem => {
                html += renderElementHtml(elem);
            });

            canvas.innerHTML = html;
        } else {
            // Fallback to classic guide presentation
            renderClassicGuideCanvas(slide);
        }

        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        }
    }

    function renderClassicGuideCanvas(slide) {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;
        const total = slides.length;
        const currentNum = activeSlideIndex + 1;

        canvas.innerHTML = `
            <div class="absolute inset-0 bg-[#090d18] overflow-hidden select-none p-7 flex flex-col justify-between">
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

                <div class="flex items-center justify-between relative z-20">
                    <div class="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span class="text-[11px] font-black text-slate-300">@SHOP_COIN15</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-8 h-8 rounded-full bg-blue-600/25 border border-blue-400/40 text-blue-300 font-black text-xs flex items-center justify-center">
                            ${currentNum}
                        </span>
                        <span class="text-[11px] font-bold text-slate-400">${currentNum} من ${total}</span>
                    </div>
                </div>

                <div class="relative z-20 my-auto text-right space-y-4">
                    <h2 class="text-xl font-black text-white leading-snug font-['Alexandria']">
                        ${slide.title}
                    </h2>
                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-200 leading-relaxed font-['Cairo'] font-medium">
                        ${slide.subtitle || slide.body || 'شرح تفاصيل السلايد'}
                    </div>
                </div>

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

    // Render Filmstrip
    function renderFilmstrip() {
        const container = document.getElementById('carouselFilmstripContainer');
        if (!container) return;

        let html = `
            <div class="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3 shadow-sm">
                <div class="flex items-center justify-between mb-2.5 px-1">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200">🎞️</span>
                        <span class="text-xs font-black text-slate-800">شريط سلايدات الكاروسيل (${activeSlideIndex + 1} من ${slides.length}):</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="CarouselEngine.addSlide('sandbox')" class="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-black transition flex items-center gap-1 shadow-xs">
                            <span>+ إضافة سلايد تركيب</span>
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
            html += `
                <div class="relative group shrink-0">
                    <button type="button" onclick="CarouselEngine.setActiveIndex(${idx})" class="w-24 h-32 rounded-xl border-2 transition text-right p-2 flex flex-col justify-between overflow-hidden relative select-none ${
                        isActive 
                            ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20' 
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                    }">
                        <div class="flex items-center justify-between w-full">
                            <span class="text-[9.5px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500'}">سلايد #${idx + 1}</span>
                            <span class="text-[9px] font-bold text-slate-400">${(slide.elements || []).length} عناصر</span>
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
                        ${slides.length > 1 ? `
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

    // Render Editor Controls Panel
    function renderEditorControls() {
        const container = document.getElementById('suite_carousel_panel');
        if (!container) return;

        const slide = getActiveSlide();
        const selectedElem = getSelectedElement();
        const isSandbox = slide.isSandbox || editorMode === 'sandbox';

        let html = `
            <div class="space-y-4">
                <!-- Top Dual Mode Switcher -->
                <div class="p-1 rounded-2xl bg-slate-200/80 border border-slate-300 flex items-center gap-1 text-xs font-black">
                    <button type="button" onclick="CarouselEngine.setEditorMode('sandbox')" 
                            class="flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                                editorMode === 'sandbox' 
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }">
                        <span>🎮 لعبة تركيب التصميم (Sandbox)</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.setEditorMode('presets')" 
                            class="flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                                editorMode === 'presets' 
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }">
                        <span>📚 النمط التعليمي الجاهز</span>
                    </button>
                </div>
        `;

        if (editorMode === 'sandbox') {
            html += renderSandboxControls(slide, selectedElem);
        } else {
            html += renderPresetsControls(slide);
        }

        // Export and Telegram Actions
        html += `
                <div class="pt-3 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="CarouselEngine.exportAllSlides()" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/25">
                        <span>👑 تصدير كافة السلايدات بدقة 4K (${slides.length} صور)</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.sendCarouselTelegram()" class="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-sm">
                        <span>🚀 إرسال كل السلايدات للتليجرام كألبوم</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    function renderSandboxControls(slide, selectedElem) {
        let html = `
            <!-- Starter Compositions Inspired by the 12 Reference Screenshots -->
            <div class="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/80 border border-blue-200 text-xs space-y-2">
                <div class="flex items-center justify-between">
                    <span class="font-black text-blue-950 flex items-center gap-1.5">
                        <span>⭐ تركيبات مستوحاة من مراجع الكاروسيل (بضغطة زر):</span>
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                    ${Object.entries(STARTER_COMPOSITIONS).map(([key, comp]) => `
                        <button type="button" onclick="CarouselEngine.applyStarterComposition('${key}')" class="p-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-[11px] text-right transition shadow-xs flex flex-col justify-between">
                            <span class="font-black">${comp.name}</span>
                            <span class="text-[9.5px] text-blue-600 font-medium line-clamp-1 mt-0.5">${comp.desc}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Elements Catalog Drawer & Quick Add -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900 text-xs flex items-center gap-1.5">
                        <span>🎨 كتالوج قطع وتصاميم الكاروسيل:</span>
                    </span>
                </div>

                <!-- Catalog Category Subtabs -->
                <div class="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                    <button type="button" onclick="CarouselEngine.setCatalogTab('backdrops')" class="px-2.5 py-1 rounded-lg text-[11px] font-black transition ${activeCatalogTab === 'backdrops' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        🌌 الخلفيات (${CATALOG.backdrops.length})
                    </button>
                    <button type="button" onclick="CarouselEngine.setCatalogTab('heroes')" class="px-2.5 py-1 rounded-lg text-[11px] font-black transition ${activeCatalogTab === 'heroes' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        🎮 المجسمات (${CATALOG.heroes.length})
                    </button>
                    <button type="button" onclick="CarouselEngine.setCatalogTab('fx')" class="px-2.5 py-1 rounded-lg text-[11px] font-black transition ${activeCatalogTab === 'fx' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        ✨ المؤثرات (${CATALOG.fx.length})
                    </button>
                    <button type="button" onclick="CarouselEngine.setCatalogTab('typography')" class="px-2.5 py-1 rounded-lg text-[11px] font-black transition ${activeCatalogTab === 'typography' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        🔤 الخطوط 3D (${CATALOG.typography.length})
                    </button>
                    <button type="button" onclick="CarouselEngine.setCatalogTab('seals')" class="px-2.5 py-1 rounded-lg text-[11px] font-black transition ${activeCatalogTab === 'seals' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        🛡️ الأختام (${CATALOG.seals.length})
                    </button>
                </div>

                <!-- Catalog Content -->
                <div class="max-h-48 overflow-y-auto space-y-1.5 scrollbar-thin pt-1">
        `;

        if (activeCatalogTab === 'backdrops') {
            html += CATALOG.backdrops.map(bd => `
                <button type="button" onclick="CarouselEngine.setSlideBackdrop('${bd.id}')" class="w-full p-2 rounded-xl text-right transition flex items-center justify-between border ${slide.backdrop === bd.id ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'}">
                    <div>
                        <div class="text-xs font-black">${bd.name}</div>
                        <div class="text-[10px] text-slate-500 font-medium">${bd.desc}</div>
                    </div>
                    <span class="text-[10.5px] font-bold ${slide.backdrop === bd.id ? 'text-blue-600' : 'text-slate-400'}">
                        ${slide.backdrop === bd.id ? '✓ مطبقة' : 'تطبيق'}
                    </span>
                </button>
            `).join('');
        } else {
            const list = CATALOG[activeCatalogTab] || [];
            html += list.map(item => `
                <button type="button" onclick="CarouselEngine.addElementToCurrentSlide('${activeCatalogTab}', '${item.type}')" class="w-full p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-right transition flex items-center justify-between text-slate-800">
                    <div>
                        <div class="text-xs font-black">${item.name}</div>
                        <div class="text-[10px] text-slate-500 font-medium">${item.desc}</div>
                    </div>
                    <span class="text-blue-600 text-xs font-black">+ إضافة</span>
                </button>
            `).join('');
        }

        html += `
                </div>
            </div>
        `;

        // Layer Inspector & Properties (If element is selected)
        if (selectedElem) {
            html += `
                <!-- Selected Element Inspector -->
                <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-300 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-blue-200 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="font-black text-blue-950">خصائص العنصر: ${selectedElem.name}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <button type="button" onclick="CarouselEngine.toggleElementLock('${selectedElem.id}')" class="px-2 py-0.5 rounded-md font-bold text-[11px] transition ${selectedElem.locked ? 'bg-red-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}">
                                ${selectedElem.locked ? '🔒 مقفول (فك)' : '🔓 قفل'}
                            </button>
                            <button type="button" onclick="CarouselEngine.duplicateElement('${selectedElem.id}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-100">
                                مضاعفة ⧉
                            </button>
                            <button type="button" onclick="CarouselEngine.deleteElement('${selectedElem.id}')" class="px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-red-600 font-bold text-[11px] hover:bg-red-100">
                                حذف ✕
                            </button>
                        </div>
                    </div>

                    <!-- Text / Content Edit (if title or subtitle exists) -->
                    ${selectedElem.title !== undefined ? `
                        <div>
                            <label class="block text-[11px] font-bold text-slate-700 mb-1">نص العنصر:</label>
                            <input type="text" value="${(selectedElem.title || '').replace(/"/g, '&quot;')}"
                                   oninput="CarouselEngine.updateSelectedElement('title', this.value)"
                                   class="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold outline-none focus:border-blue-500">
                        </div>
                    ` : ''}

                    ${selectedElem.subtitle !== undefined ? `
                        <div>
                            <label class="block text-[11px] font-bold text-slate-700 mb-1">الوصف الفرعي:</label>
                            <input type="text" value="${(selectedElem.subtitle || '').replace(/"/g, '&quot;')}"
                                   oninput="CarouselEngine.updateSelectedElement('subtitle', this.value)"
                                   class="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold outline-none focus:border-blue-500">
                        </div>
                    ` : ''}

                    <!-- 3 Pillars Customization -->
                    ${selectedElem.type === 'typo_3_pillars' ? `
                        <div class="space-y-1.5">
                            <label class="block text-[11px] font-bold text-slate-700">نصوص الأعمدة الثلاثية:</label>
                            <input type="text" value="${(selectedElem.p1 || '').replace(/"/g, '&quot;')}" oninput="CarouselEngine.updateSelectedElement('p1', this.value)" class="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[11px] font-bold">
                            <input type="text" value="${(selectedElem.p2 || '').replace(/"/g, '&quot;')}" oninput="CarouselEngine.updateSelectedElement('p2', this.value)" class="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[11px] font-bold">
                            <input type="text" value="${(selectedElem.p3 || '').replace(/"/g, '&quot;')}" oninput="CarouselEngine.updateSelectedElement('p3', this.value)" class="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[11px] font-bold">
                        </div>
                    ` : ''}

                    <!-- Geometry Sliders (Scale, Rotation, Layer Ordering) -->
                    <div class="grid grid-cols-2 gap-2 pt-1">
                        <div>
                            <div class="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                                <span>الحجم (Scale):</span>
                                <span class="text-blue-600 font-mono">${Math.round((selectedElem.scale || 1) * 100)}%</span>
                            </div>
                            <input type="range" min="0.2" max="2.5" step="0.05" value="${selectedElem.scale || 1}"
                                   oninput="CarouselEngine.updateSelectedElement('scale', parseFloat(this.value))"
                                   class="w-full accent-blue-600">
                        </div>
                        <div>
                            <div class="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                                <span>التدوير (Rotate):</span>
                                <span class="text-blue-600 font-mono">${selectedElem.rotation || 0}°</span>
                            </div>
                            <input type="range" min="-180" max="180" step="1" value="${selectedElem.rotation || 0}"
                                   oninput="CarouselEngine.updateSelectedElement('rotation', parseInt(this.value))"
                                   class="w-full accent-blue-600">
                        </div>
                    </div>

                    <!-- Layer Ordering Quick Actions ("اشي فوق اشي") -->
                    <div class="pt-1 flex items-center justify-between bg-white/70 p-2 rounded-xl border border-blue-200">
                        <span class="font-bold text-slate-700 text-[11px]">ترتيب الطبقة (Z-Index):</span>
                        <div class="flex items-center gap-1">
                            <button type="button" onclick="CarouselEngine.bringElementToFront('${selectedElem.id}')" title="إحضار للمقدمة القصوى" class="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-black text-[10px]">
                                ⏫ للأمام كلياً
                            </button>
                            <button type="button" onclick="CarouselEngine.bringElementForward('${selectedElem.id}')" title="تقديم طبقة واحدة" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-[10px]">
                                ⬆️ درجة
                            </button>
                            <button type="button" onclick="CarouselEngine.sendElementBackward('${selectedElem.id}')" title="تأخير طبقة واحدة" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-[10px]">
                                ⬇️ درجة
                            </button>
                            <button type="button" onclick="CarouselEngine.sendElementToBack('${selectedElem.id}')" title="إرسال للخلفية القصوى" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-[10px]">
                                ⏬ للخلف كلياً
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Live Layers Drawer ("قائمة الطبقات - اشي فوق اشي")
        const sortedLayers = [...(slide.elements || [])].sort((a, b) => (b.zIndex || 10) - (a.zIndex || 10));

        html += `
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900 text-xs flex items-center gap-1.5">
                        <span>📑 قائمة الطبقات (اشي فوق اشي) - ${sortedLayers.length} عناصر:</span>
                    </span>
                    <span class="text-[10px] text-slate-400 font-medium">الأعلى يظهر في المقدمة</span>
                </div>

                <div class="space-y-1.5 max-h-56 overflow-y-auto scrollbar-thin">
                    ${sortedLayers.length === 0 ? `
                        <div class="p-4 text-center text-xs text-slate-400 font-bold border border-dashed border-slate-200 rounded-xl">
                            لا توجد عناصر مضافة بعد. اختر من الكتالوج أعلاه!
                        </div>
                    ` : sortedLayers.map((el, i) => {
                        const isSel = selectedElementId === el.id;
                        return `
                            <div id="layer_item_${el.id}"
                                 onclick="CarouselEngine.selectElement('${el.id}')"
                                 class="p-2 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                                    isSel 
                                        ? 'bg-blue-50 border-blue-500 shadow-xs' 
                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                                 }">
                                <div class="flex items-center gap-2 overflow-hidden">
                                    <span class="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-mono text-[10px] font-black flex items-center justify-center shrink-0">
                                        ${i + 1}
                                    </span>
                                    <span class="text-xs font-black text-slate-800 truncate layer-title">
                                        ${el.name}
                                    </span>
                                    ${el.locked ? `<span class="text-[10px]" title="مقفول">🔒</span>` : ''}
                                    ${el.visible === false ? `<span class="text-[10px]" title="مخفي">🕶️</span>` : ''}
                                </div>
                                <div class="flex items-center gap-1 shrink-0">
                                    <button type="button" onclick="event.stopPropagation(); CarouselEngine.toggleElementLock('${el.id}')" class="w-6 h-6 rounded bg-white border border-slate-200 text-[10px] flex items-center justify-center hover:bg-slate-100" title="${el.locked ? 'فك القفل' : 'قفل'}">
                                        ${el.locked ? '🔒' : '🔓'}
                                    </button>
                                    <button type="button" onclick="event.stopPropagation(); CarouselEngine.bringElementForward('${el.id}')" class="w-6 h-6 rounded bg-white border border-slate-200 text-[10px] flex items-center justify-center hover:bg-slate-100" title="تقديم للأمام">
                                        ⬆️
                                    </button>
                                    <button type="button" onclick="event.stopPropagation(); CarouselEngine.sendElementBackward('${el.id}')" class="w-6 h-6 rounded bg-white border border-slate-200 text-[10px] flex items-center justify-center hover:bg-slate-100" title="تأخير للخلف">
                                        ⬇️
                                    </button>
                                    <button type="button" onclick="event.stopPropagation(); CarouselEngine.deleteElement('${el.id}')" class="w-6 h-6 rounded bg-red-50 border border-red-200 text-red-600 text-[10px] flex items-center justify-center hover:bg-red-100" title="حذف">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        return html;
    }

    function renderPresetsControls(slide) {
        return `
            <div class="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs space-y-2">
                <span class="font-black text-blue-950">سلاسل كاروسيل جاهزة ومجربة:</span>
                <div class="grid grid-cols-1 gap-1.5">
                    <button type="button" onclick="CarouselEngine.applyStarterComposition('master_pillars_trust')" class="px-3 py-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-xs text-right transition flex items-center justify-between">
                        <span>🛡️ أخطاء تصفير الحسابات والأمان (5 سلايدات)</span>
                        <span class="text-blue-500 text-[10px]">تطبيق ✨</span>
                    </button>
                    <button type="button" onclick="CarouselEngine.applyStarterComposition('master_card_stack')" class="px-3 py-2 rounded-xl bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-bold text-xs text-right transition flex items-center justify-between">
                        <span>💰 بناء تشكيلة ميتا بميزانية ذكية (4 سلايدات)</span>
                        <span class="text-blue-500 text-[10px]">تطبيق ✨</span>
                    </button>
                </div>
            </div>
        `;
    }

    function setCatalogTab(tabKey) {
        activeCatalogTab = tabKey;
        renderEditorControls();
    }

    // Export All Slides in 4K Batch
    async function exportAllSlides() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevIndex = activeSlideIndex;
        const prevSelected = selectedElementId;
        selectedElementId = null; // Unselect to remove edit bounding boxes

        if (window.showCopyToast) {
            window.showCopyToast(`جارِ تصدير ${slides.length} سلايدات بدقة 4K فائقة... ⏳`);
        }

        for (let i = 0; i < slides.length; i++) {
            setActiveIndex(i);
            selectedElementId = null;
            renderSlideToMainCanvas();
            await new Promise(r => setTimeout(r, 450));
            await window.CanvasExporter.downloadNative('exportCanvas', 'jpg', `carousel_slide_${i + 1}_of_${slides.length}`);
            await new Promise(r => setTimeout(r, 300));
        }

        setActiveIndex(prevIndex);
        selectedElementId = prevSelected;
        renderSlideToMainCanvas();
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
        const prevSelected = selectedElementId;
        selectedElementId = null;

        if (window.showCopyToast) {
            window.showCopyToast(`جارِ إرسال ${slides.length} سلايدات إلى هاتفك عبر التليجرام... 🚀`);
        }

        for (let i = 0; i < slides.length; i++) {
            setActiveIndex(i);
            selectedElementId = null;
            renderSlideToMainCanvas();
            await new Promise(r => setTimeout(r, 400));
            const caption = `📚 سلايد الكاروسيل (${i + 1}/${slides.length}) - @shop_coin15`;
            await window.TelegramManager.sendDesignInternal('exportCanvas', caption);
            await new Promise(r => setTimeout(r, 500));
        }

        setActiveIndex(prevIndex);
        selectedElementId = prevSelected;
        renderSlideToMainCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تم إرسال كامل الكاروسيل إلى التليجرام بنجاح! 📱✨');
        }
    }

    return {
        getSlides,
        getActiveSlide,
        getActiveIndex,
        setActiveIndex,
        setEditorMode,
        addSlide,
        removeSlide,
        duplicateSlide,
        applyStarterComposition,
        setSlideBackdrop,
        setCatalogTab,
        addElementToCurrentSlide,
        selectElement,
        getSelectedElement,
        updateSelectedElement,
        toggleElementLock,
        toggleElementVisibility,
        deleteElement,
        duplicateElement,
        bringElementForward,
        sendElementBackward,
        bringElementToFront,
        sendElementToBack,
        stepElementScale,
        stepElementRotation,
        handleElementPointerDown,
        renderFilmstrip,
        renderSlideToMainCanvas,
        renderEditorControls,
        exportAllSlides,
        sendCarouselTelegram
    };
})();
