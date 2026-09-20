/**
 * ShopCoin15 Studio - Core Direct Engine
 * 100% In-Game Authentic Assets & Real FUT.GG Cards (NO FAKE AI)
 * 3 Essential Templates:
 * 1. trio: 👑 تريو 3 لاعبين متداخلين
 * 2. market_drop: 📉 هبوط أسعار السوق وفرصة الشحن
 * 3. sbc: ⚡ تقفيل وحل تحديات الـ SBC
 */

let currentTemplate = 'store_promo';
let currentRatio = 'story';
let currentCopyStyle = 'hype';
let appState = {};
let selectedLayerKey = null;
window.activeTrioPresetId = null;
window.currentStudioSuite = 'suite_stories';
window.currentFitScale = 1.0;

const STORY_TEMPLATE_KEYS = [
    'promo_pack', 'market_tracker', 'champs_squad', 'evo_boost', 'social_proof', 
    'flash_sale', 'loaded_accounts', 'squad_makeover', 
    'player_duel', 'budget_beast', 'player_review', 
    'custom_story', 'store_promo', 'sbc'
];
window.STORY_TEMPLATE_KEYS = STORY_TEMPLATE_KEYS;

function getDefaultLayers() {
    const isPortrait = currentRatio === 'portrait';
    const isSquare = currentRatio === 'square';

    if (currentTemplate === 'store_promo') {
        if (isSquare) {
            return {
                layer_store_banners: { visible: true, x: null, y: 15, scale: 0.78, label: 'شرائط النصوص المكدسة' },
                layer_promo_cards: { visible: true, x: null, y: 240, scale: 0.72, label: 'كروت الحدث (الأسفل)' }
            };
        } else if (isPortrait) {
            return {
                layer_store_banners: { visible: true, x: null, y: 22, scale: 0.88, label: 'شرائط النصوص المكدسة' },
                layer_promo_cards: { visible: true, x: null, y: 310, scale: 0.82, label: 'كروت الحدث (الأسفل)' }
            };
        } else {
            // Story 9:16
            return {
                layer_store_banners: { visible: true, x: null, y: 45, scale: 1.0, label: 'شرائط النصوص المكدسة' },
                layer_promo_cards: { visible: true, x: null, y: 385, scale: 0.95, label: 'كروت الحدث (الأسفل)' }
            };
        }
    } else if (currentTemplate === 'trio') {
        if (isSquare) {
            return {
                layer_top_badge: { visible: true, x: null, y: 8, scale: 0.78, label: 'شارة الترويسة' },
                layer_headline: { visible: true, x: null, y: 35, scale: 0.76, label: 'العنوان الرئيسي' },
                layer_trio_cards: { visible: true, x: null, y: 80, scale: 0.58, label: 'الثلاثي المتداخل (3 لاعبين)' },
                layer_subheadline: { visible: true, x: null, y: 275, scale: 0.78, label: 'الوصف وعروض الشحن' },
                layer_cta_btn: { visible: true, x: null, y: 360, scale: 0.82, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else if (isPortrait) {
            return {
                layer_top_badge: { visible: true, x: null, y: 12, scale: 0.88, label: 'شارة الترويسة' },
                layer_headline: { visible: true, x: null, y: 42, scale: 0.84, label: 'العنوان الرئيسي' },
                layer_trio_cards: { visible: true, x: null, y: 98, scale: 0.72, label: 'الثلاثي المتداخل (3 لاعبين)' },
                layer_subheadline: { visible: true, x: null, y: 345, scale: 0.85, label: 'الوصف وعروض الشحن' },
                layer_cta_btn: { visible: true, x: null, y: 445, scale: 0.88, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else {
            // Story 9:16
            return {
                layer_top_badge: { visible: true, x: null, y: 25, scale: 0.95, label: 'شارة الترويسة' },
                layer_headline: { visible: true, x: null, y: 62, scale: 0.95, label: 'العنوان الرئيسي' },
                layer_trio_cards: { visible: true, x: null, y: 125, scale: 0.92, label: 'الثلاثي المتداخل (3 لاعبين)' },
                layer_subheadline: { visible: true, x: null, y: 460, scale: 0.92, label: 'الوصف وعروض الشحن' },
                layer_cta_btn: { visible: true, x: null, y: 535, scale: 0.95, label: 'زر الطلب بالخاص (CTA)' }
            };
        }
    } else if (currentTemplate === 'market_drop') {
        if (isSquare) {
            return {
                layer_top_badge: { visible: true, x: null, y: 8, scale: 0.78, label: 'شارة تنبيه النزول' },
                layer_headline: { visible: true, x: null, y: 35, scale: 0.76, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 65, scale: 0.44, label: 'بطاقة اللاعب (FUT.GG)' },
                layer_price_box: { visible: true, x: null, y: 200, scale: 0.76, label: 'صندوق مقارنة الأسعار' },
                layer_subheadline: { visible: true, x: null, y: 295, scale: 0.76, label: 'الوصف التحفيزي' },
                layer_cta_btn: { visible: true, x: null, y: 365, scale: 0.80, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else if (isPortrait) {
            return {
                layer_top_badge: { visible: true, x: null, y: 12, scale: 0.88, label: 'شارة تنبيه النزول' },
                layer_headline: { visible: true, x: null, y: 40, scale: 0.84, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 78, scale: 0.58, label: 'بطاقة اللاعب (FUT.GG)' },
                layer_price_box: { visible: true, x: null, y: 255, scale: 0.84, label: 'صندوق مقارنة الأسعار' },
                layer_subheadline: { visible: true, x: null, y: 360, scale: 0.82, label: 'الوصف التحفيزي' },
                layer_cta_btn: { visible: true, x: null, y: 445, scale: 0.88, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else {
            // Story 9:16
            return {
                layer_top_badge: { visible: true, x: null, y: 20, scale: 0.95, label: 'شارة تنبيه النزول' },
                layer_headline: { visible: true, x: null, y: 52, scale: 0.95, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 98, scale: 0.78, label: 'بطاقة اللاعب (FUT.GG)' },
                layer_price_box: { visible: true, x: null, y: 345, scale: 0.92, label: 'صندوق مقارنة الأسعار' },
                layer_subheadline: { visible: true, x: null, y: 465, scale: 0.90, label: 'الوصف التحفيزي' },
                layer_cta_btn: { visible: true, x: null, y: 538, scale: 0.95, label: 'زر الطلب بالخاص (CTA)' }
            };
        }
    } else if (currentTemplate === 'market_tracker') {
        // Market Tracker is Story 9:16 only!
        return {
            layer_market_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة الرادار والشعارات' },
            layer_market_players: { visible: true, x: null, y: 165, scale: 0.94, label: 'بطاقات اللاعبين ومؤشرات FUTBIN' },
            layer_market_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر متجر شوب كوين (CTA)' }
        };
    } else if (currentTemplate === 'promo_pack') {
        return {
            layer_promo_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة العرض والعداد الزمني' },
            layer_promo_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'باكدج المتجر وبطاقات الووك أوت' },
            layer_promo_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر الشحن الفوري (CTA)' }
        };
    } else if (currentTemplate === 'champs_squad') {
        return {
            layer_champs_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة التشكيلة وخطة الميتا' },
            layer_champs_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'بطاقات التشكيلة والميزانية الإجمالية' },
            layer_champs_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر شحن التشكيلة (CTA)' }
        };
    } else if (currentTemplate === 'evo_boost') {
        return {
            layer_evo_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة الإيفولوشن والتكلفة' },
            layer_evo_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'مقارنة الكرت قبل وبعد الإيفو الخارق' },
            layer_evo_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر شحن كوينز الإيفو (CTA)' }
        };
    } else if (currentTemplate === 'social_proof') {
        return {
            layer_proof_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة التوثيق وثقة العملاء' },
            layer_proof_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'تفاصيل التحويل وتقييم العميل والأمان' },
            layer_proof_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر الشحن الفوري والضمان (CTA)' }
        };
    } else if (currentTemplate === 'flash_sale') {
        return {
            layer_sale_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة جدول باقات الكوينز' },
            layer_sale_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'بطاقات باقات الكوينز والأسعار' },
            layer_sale_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر الطلب المباشر (CTA)' }
        };
    } else if (currentTemplate === 'loaded_accounts') {
        return {
            layer_acc_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة الحسابات الجاهزة' },
            layer_acc_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'مواصفات الحساب ورصيد الكوينز' },
            layer_acc_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر طلب الحساب (CTA)' }
        };
    } else if (currentTemplate === 'squad_makeover') {
        return {
            layer_makeover_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة تطوير التشكيلة' },
            layer_makeover_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'مقارنة التشكيلة قبل وبعد بالكوينز' },
            layer_makeover_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر استشارة التطوير (CTA)' }
        };
    } else if (currentTemplate === 'player_duel') {
        return {
            layer_duel_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة معركة النجوم' },
            layer_duel_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'مقارنة اللاعبين ومنطقة تصويت الستوري' },
            layer_duel_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر شحن كوينز النجوم (CTA)' }
        };
    } else if (currentTemplate === 'budget_beast') {
        return {
            layer_budget_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة تشكيلة الميزانية' },
            layer_budget_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'ثلاثي الميتا الرخيص والتكلفة' },
            layer_budget_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر شحن التشكيلة (CTA)' }
        };
    } else if (currentTemplate === 'player_review') {
        return {
            layer_review_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة مراجعة الكرت' },
            layer_review_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'بطاقة تقييم الـ 50 مباراة والإيجابيات' },
            layer_review_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر شحن كوينز الكرت (CTA)' }
        };
    } else if (currentTemplate === 'custom_story') {
        return {
            layer_custom_header: { visible: true, x: null, y: 30, scale: 0.95, label: 'ترويسة القالب الخاص' },
            layer_custom_body: { visible: true, x: null, y: 165, scale: 0.95, label: 'محتوى التصميم الخاص المخصص' },
            layer_custom_cta: { visible: true, x: null, y: 690, scale: 0.95, label: 'بانر الطلب والتواصل (CTA)' }
        };
    } else if (currentTemplate === 'sbc') {
        // SBC is Story 9:16 only!
        return {
            layer_sbc_banners: { visible: true, x: null, y: 40, scale: 1.0, label: 'شرائط نصوص الـ SBC المكدسة' },
            layer_sbc_asset: { visible: true, x: null, y: 380, scale: 1.0, label: 'صورة التحدي / بطاقة اللاعب' }
        };
    } else if (currentTemplate === 'potm') {
        if (isSquare) {
            return {
                layer_potm_badge: { visible: true, x: null, y: 8, scale: 0.78, label: 'شارة لاعب الشهر (الدوري)' },
                layer_headline: { visible: true, x: null, y: 35, scale: 0.76, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 65, scale: 0.44, label: 'بطاقة لاعب الشهر (POTM)' },
                layer_cost_box: { visible: true, x: null, y: 200, scale: 0.76, label: 'صندوق تكلفة التحدي وعرض المتجر' },
                layer_subheadline: { visible: false, x: null, y: 295, scale: 0.76, label: 'تفاصيل العرض والضمان' },
                layer_cta_btn: { visible: true, x: null, y: 340, scale: 0.80, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else if (isPortrait) {
            return {
                layer_potm_badge: { visible: true, x: null, y: 12, scale: 0.88, label: 'شارة لاعب الشهر (الدوري)' },
                layer_headline: { visible: true, x: null, y: 40, scale: 0.84, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 78, scale: 0.58, label: 'بطاقة لاعب الشهر (POTM)' },
                layer_cost_box: { visible: true, x: null, y: 255, scale: 0.84, label: 'صندوق تكلفة التحدي وعرض المتجر' },
                layer_subheadline: { visible: false, x: null, y: 360, scale: 0.82, label: 'تفاصيل العرض والضمان' },
                layer_cta_btn: { visible: true, x: null, y: 405, scale: 0.88, label: 'زر الطلب بالخاص (CTA)' }
            };
        } else {
            // Story 9:16
            return {
                layer_potm_badge: { visible: true, x: null, y: 22, scale: 0.95, label: 'شارة لاعب الشهر (الدوري)' },
                layer_headline: { visible: true, x: null, y: 60, scale: 0.95, label: 'العنوان الرئيسي' },
                layer_card: { visible: true, x: null, y: 108, scale: 0.82, label: 'بطاقة لاعب الشهر (POTM)' },
                layer_cost_box: { visible: true, x: null, y: 375, scale: 0.95, label: 'صندوق تكلفة التحدي وعرض المتجر' },
                layer_subheadline: { visible: false, x: null, y: 490, scale: 0.90, label: 'تفاصيل العرض والضمان' },
                layer_cta_btn: { visible: true, x: null, y: 520, scale: 0.98, label: 'زر الطلب بالخاص (CTA)' }
            };
        }
    } else if (currentTemplate === 'showcase') {
        if (isSquare) {
            return {
                layer_showcase_header: { visible: true, x: null, y: 10, scale: 0.82, label: 'الشعارات وهوية المتجر' },
                layer_showcase_badges: { visible: true, x: null, y: 44, scale: 0.85, label: 'شارة الحدث والعنوان' },
                layer_showcase_card: { visible: true, x: null, y: 95, scale: 0.88, label: 'بطاقة FC 27 والمنصة الذهبية' },
                layer_showcase_bento: { visible: true, x: null, y: 385, scale: 0.82, label: 'بطاقات البينتو وسعر السوق' },
                layer_showcase_footer: { visible: true, x: null, y: 455, scale: 0.82, label: 'كود الخصم وطرق الدفع والوسم' }
            };
        } else if (isPortrait) {
            return {
                layer_showcase_header: { visible: true, x: null, y: 14, scale: 0.90, label: 'الشعارات وهوية المتجر' },
                layer_showcase_badges: { visible: true, x: null, y: 52, scale: 0.92, label: 'شارة الحدث والعنوان' },
                layer_showcase_card: { visible: true, x: null, y: 120, scale: 0.98, label: 'بطاقة FC 27 والمنصة الذهبية' },
                layer_showcase_bento: { visible: true, x: null, y: 460, scale: 0.90, label: 'بطاقات البينتو وسعر السوق' },
                layer_showcase_footer: { visible: true, x: null, y: 540, scale: 0.90, label: 'كود الخصم وطرق الدفع والوسم' }
            };
        } else {
            // Story 9:16
            return {
                layer_showcase_header: { visible: true, x: null, y: 24, scale: 0.96, label: 'الشعارات وهوية المتجر' },
                layer_showcase_badges: { visible: true, x: null, y: 70, scale: 0.98, label: 'شارة الحدث والعنوان' },
                layer_showcase_card: { visible: true, x: null, y: 160, scale: 1.05, label: 'بطاقة FC 27 والمنصة الذهبية' },
                layer_showcase_bento: { visible: true, x: null, y: 580, scale: 0.95, label: 'بطاقات البينتو وسعر السوق' },
                layer_showcase_footer: { visible: true, x: null, y: 690, scale: 0.96, label: 'كود الخصم وطرق الدفع والوسم' }
            };
        }
    }

    return {};
}

window.updateCanvasViewportScale = function() {
    const canvas = document.getElementById('exportCanvas');
    const container = document.getElementById('previewContainer');
    const stage = document.getElementById('canvasScaleStage');
    if (!canvas || !container || !stage) return;

    const availableWidth = container.clientWidth - 32;
    const containerRect = container.getBoundingClientRect();
    const availableHeight = Math.max(400, Math.min(window.innerHeight - Math.max(0, containerRect.top) - 36, window.innerHeight * 0.76));

    const canvasW = canvas.offsetWidth || 450;
    const canvasH = canvas.offsetHeight || 800;

    const scaleW = availableWidth / canvasW;
    const scaleH = availableHeight / canvasH;
    const fitScale = Math.min(1.0, Math.min(scaleW, scaleH));

    window.currentFitScale = fitScale;

    stage.style.width = `${Math.round(canvasW * fitScale)}px`;
    stage.style.height = `${Math.round(canvasH * fitScale)}px`;

    canvas.style.transform = `scale(${fitScale})`;
    canvas.style.transformOrigin = '0 0';
    canvas.style.left = '0';
    canvas.style.top = '0';
};

window.addEventListener('resize', () => {
    if (window.ReelsEngine && typeof window.ReelsEngine.isCinemaMode === 'function' && window.ReelsEngine.isCinemaMode()) {
        window.ReelsEngine.updateCinemaScale();
    } else if (window.updateCanvasViewportScale) {
        window.updateCanvasViewportScale();
    }
});

/* =========================================================================
   TRIO PRESETS & CONTINUOUS AUTO-SAVE MANAGEMENT (قوالب الـ 3 لاعبين المحفوظة)
   ========================================================================= */

const DEFAULT_TRIO_PRESETS = [
    {
        id: 'trio_preset_starter_beasts',
        name: '⚡ تشكيلة بداية FC 27 النارية',
        createdAt: 1726580000000,
        updatedAt: 1726580000000,
        card1_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
        card1_name: 'داروين نونيز (77)',
        card2_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp',
        card2_name: 'عثمان ديمبيلي (86)',
        card3_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-50573369.a6f3940ce2ccb7d0c1b6486a36ceb97173930a64d05373132b440d62f8ab9fcf.webp',
        card3_name: 'رافاييل لياو (86)',
        badgeText: '⚡ تشكيلة بداية FC 27 النارية • شحن فوري وآمن 100%',
        headline: 'تبي تبدأ تشكيلتك بقوة من أول يوم؟ 🔥',
        subheadline: 'متوفر شحن كوينز لبداية FC 27 لجميع المنصات (بلايستيشن • إكسبوكس • PC) بأفضل سعر وضمان شامل الضريبة',
        ctaText: 'اطلب كوينز تشكيلة البداية بالخاص DM 📩',
        trioSpread: 18,
        trioAngle: 7,
        fontFamily: 'alexandria'
    },
    {
        id: 'trio_preset_top_stars',
        name: '👑 ثلاثي النخبة الملكي',
        createdAt: 1726581000000,
        updatedAt: 1726581000000,
        card1_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
        card1_name: 'فينيسيوس جونيور (90)',
        card2_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
        card2_name: 'كيليان مبابي (91)',
        card3_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
        card3_name: 'جود بيلينغهام (90)',
        badgeText: '👑 ثلاثي النجوم الملكي • تسليم فوري لجميع المنصات',
        headline: 'حلمك تقفل أقوى ثلاثي في اللعبة؟ 👑',
        subheadline: 'اشحن كوينزك الآن وامتلك مبابي وبيلينغهام وفينيسيوس في فريقك بأعلى سرعة وأقوى كوينز مضمونة 100%',
        ctaText: 'اطلب كوينز ثلاثي النخبة الآن بالخاص DM ⚡',
        trioSpread: 18,
        trioAngle: 7,
        fontFamily: 'alexandria'
    },
    {
        id: 'trio_preset_premier_league',
        name: '💎 ثلاثي البريميرليغ الخارق',
        createdAt: 1726582000000,
        updatedAt: 1726582000000,
        card1_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp',
        card1_name: 'بوكايو ساكا (87)',
        card2_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp',
        card2_name: 'إرلينغ هالاند (91)',
        card3_url: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp',
        card3_name: 'رودري (91)',
        badgeText: '💎 أبطال البريميرليغ في FC 27 • شحن كوينز بأمان تام',
        headline: 'هالاند ورودري وساكا بتشكيلة واحدة؟ 🤖',
        subheadline: 'قفل أقوى عناصر الدوري الإنجليزي الممتاز بتشكيلتك بأفضل سعر للكوينز وضمان كامل ضد الباند',
        ctaText: 'اشحن كوينز فريقك الآن عبر الخاص DM 📩',
        trioSpread: 20,
        trioAngle: 8,
        fontFamily: 'alexandria'
    }
];

window.getTrioPresets = function() {
    try {
        const raw = localStorage.getItem('shopcoin15_trio_presets');
        if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list) && list.length > 0) return list;
        }
    } catch (e) {
        console.warn('[TrioPresets read error]', e);
    }
    try {
        localStorage.setItem('shopcoin15_trio_presets', JSON.stringify(DEFAULT_TRIO_PRESETS));
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_TRIO_PRESETS));
};

window.saveTrioPresetsList = function(list) {
    try {
        localStorage.setItem('shopcoin15_trio_presets', JSON.stringify(list));
    } catch (e) {
        console.warn('[TrioPresets save error]', e);
    }
};

let trioAutoSaveTimer = null;
window.triggerAutoSaveTrio = function() {
    if (currentTemplate !== 'trio') return;
    clearTimeout(trioAutoSaveTimer);
    trioAutoSaveTimer = setTimeout(() => {
        try {
            const data = {
                appState: JSON.parse(JSON.stringify(appState)),
                activeTrioPresetId: window.activeTrioPresetId || null,
                timestamp: Date.now()
            };
            localStorage.setItem('shopcoin15_trio_last_state', JSON.stringify(data));
        } catch (e) {
            console.warn('[AutoSave save error]', e);
        }
    }, 300);
};

window.loadTrioAutoSave = function() {
    try {
        const saved = localStorage.getItem('shopcoin15_trio_last_state');
        if (saved) {
            const data = JSON.parse(saved);
            if (data && data.appState) {
                Object.assign(appState, data.appState);
                if (data.activeTrioPresetId) {
                    window.activeTrioPresetId = data.activeTrioPresetId;
                }
                return true;
            }
        }
    } catch (e) {
        console.warn('[AutoSave load error]', e);
    }
    return false;
};

// ==========================================
// Custom Presets for Store Promo (Stories)
// ==========================================
window.activePromoPresetId = null;

function getPromoStorageKey() {
    return currentTemplate === 'sbc' ? 'shopcoin15_custom_sbc_presets' : 'shopcoin15_custom_promo_presets';
}

window.getPromoPresets = function() {
    try {
        const key = getPromoStorageKey();
        const saved = localStorage.getItem(key);
        if (saved) {
            const list = JSON.parse(saved);
            if (Array.isArray(list)) return list;
        }
    } catch (e) {
        console.warn('[PromoPresets load error]', e);
    }
    return [];
};

window.savePromoPresetsList = function(list) {
    try {
        const key = getPromoStorageKey();
        localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
        console.warn('[PromoPresets save error]', e);
    }
};

window.openSavePromoPresetModal = function() {
    const modal = document.getElementById('savePromoPresetModal');
    const input = document.getElementById('input_new_promo_preset_name');
    const bannersPreview = document.getElementById('savePromoPresetSummaryBanners');
    const cardsPreview = document.getElementById('savePromoPresetSummaryCards');

    const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
        ? appState.banners 
        : (currentTemplate === 'sbc' 
            ? (TEMPLATES.sbc?.defaultState?.banners || [])
            : (window.STORE_BANNER_THEMES?.classic?.banners || []));
    const cardCount = parseInt(appState.cardCount, 10) === 2 ? 2 : 3;

    if (bannersPreview) {
        bannersPreview.innerHTML = banners.map((b, i) => `
            <div class="flex items-center gap-2 text-[11px] font-bold">
                <span class="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs border border-black/10" style="background-color: ${b.bg || '#0084FF'};"></span>
                <span class="truncate text-slate-800">${b.text || `شريط ${i+1}`}</span>
            </div>
        `).join('');
    }

    if (cardsPreview) {
        if (currentTemplate === 'sbc') {
            cardsPreview.innerHTML = `
                <span>التحدي: <strong class="text-emerald-700 font-black">${appState.sbcTitle || 'تحدي SBC'}</strong></span>
                <span class="text-slate-500">${banners.length} شرائط ملونة</span>
            `;
        } else {
            cardsPreview.innerHTML = `
                <span>تشكيلة الكروت: <strong class="text-emerald-700 font-black">${cardCount === 2 ? '👥 كرتين (ثنائي)' : '⭐ 3 كروت (تريو)'}</strong></span>
                <span class="text-slate-500">${banners.length} شرائط ملونة</span>
            `;
        }
    }

    const defaultName = currentTemplate === 'sbc'
        ? `قالب SBC مخصص #${window.getPromoPresets().length + 1}`
        : `قالب ستوري مخصص #${window.getPromoPresets().length + 1}`;

    if (input) {
        input.value = defaultName;
    }

    if (modal) modal.classList.remove('hidden');
    if (input) {
        setTimeout(() => { input.focus(); input.select(); }, 60);
    }
};

window.closeSavePromoPresetModal = function() {
    const modal = document.getElementById('savePromoPresetModal');
    if (modal) modal.classList.add('hidden');
};

window.confirmSaveNewPromoPreset = function() {
    const input = document.getElementById('input_new_promo_preset_name');
    const name = input ? input.value.trim() : '';
    if (!name) {
        alert('يرجى إدخال اسم للقالب');
        return;
    }

    const list = window.getPromoPresets();
    const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
        ? JSON.parse(JSON.stringify(appState.banners)) 
        : (currentTemplate === 'sbc'
            ? (TEMPLATES.sbc?.defaultState?.banners || [])
            : (window.STORE_BANNER_THEMES?.classic?.banners || []));

    const newPreset = currentTemplate === 'sbc' ? {
        id: 'sbc_preset_' + Date.now(),
        name: name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        banners: banners,
        bgTheme: appState.bgTheme || 'store',
        sbcImageUrl: appState.sbcImageUrl || '',
        sbcTitle: appState.sbcTitle || '',
        sbcScale: appState.sbcScale || 100,
        sbcPosY: appState.sbcPosY !== undefined ? appState.sbcPosY : 15
    } : {
        id: 'promo_preset_' + Date.now(),
        name: name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        banners: banners,
        cardCount: parseInt(appState.cardCount, 10) === 2 ? 2 : 3,
        bgTheme: appState.bgTheme || 'store',
        card1_url: appState.card1_url || '',
        card1_name: appState.card1_name || '',
        card1_price: appState.card1_price || '',
        card2_url: appState.card2_url || '',
        card2_name: appState.card2_name || '',
        card2_price: appState.card2_price || '',
        card3_url: appState.card3_url || '',
        card3_name: appState.card3_name || '',
        card3_price: appState.card3_price || ''
    };

    list.unshift(newPreset);
    window.savePromoPresetsList(list);
    window.activePromoPresetId = newPreset.id;
    window.closeSavePromoPresetModal();

    renderControls();
    renderCanvas();

    if (window.showCopyToast) {
        window.showCopyToast(`تم حفظ القالب الخاص "${name}" بنجاح! 💾✨`);
    }
};

window.applyCustomPromoPreset = function(presetId) {
    const list = window.getPromoPresets();
    const preset = list.find(p => p.id === presetId);
    if (!preset) return;

    window.activePromoPresetId = preset.id;
    if (preset.banners) appState.banners = JSON.parse(JSON.stringify(preset.banners));
    if (preset.bgTheme) appState.bgTheme = preset.bgTheme;

    if (currentTemplate === 'sbc') {
        if (preset.sbcImageUrl) appState.sbcImageUrl = preset.sbcImageUrl;
        if (preset.sbcTitle) appState.sbcTitle = preset.sbcTitle;
        if (preset.sbcScale !== undefined) appState.sbcScale = preset.sbcScale;
        if (preset.sbcPosY !== undefined) appState.sbcPosY = preset.sbcPosY;
    } else {
        if (preset.cardCount) appState.cardCount = preset.cardCount;
        if (preset.card1_url) appState.card1_url = preset.card1_url;
        if (preset.card1_name) appState.card1_name = preset.card1_name;
        if (preset.card1_price !== undefined) appState.card1_price = preset.card1_price;
        if (preset.card2_url) appState.card2_url = preset.card2_url;
        if (preset.card2_name) appState.card2_name = preset.card2_name;
        if (preset.card2_price !== undefined) appState.card2_price = preset.card2_price;
        if (preset.card3_url) appState.card3_url = preset.card3_url;
        if (preset.card3_name) appState.card3_name = preset.card3_name;
        if (preset.card3_price !== undefined) appState.card3_price = preset.card3_price;
    }

    renderCanvas();
    renderControls();

    if (window.showCopyToast) {
        window.showCopyToast(`تم تطبيق قالبك الخاص "${preset.name}"! 🎨⚡`);
    }
};

window.deleteCustomPromoPreset = function(presetId, event) {
    if (event) event.stopPropagation();
    const list = window.getPromoPresets();
    const preset = list.find(p => p.id === presetId);
    const name = preset ? preset.name : 'هذا القالب';

    if (!confirm(`هل أنت متأكد من حذف قالب "${name}" نهائياً؟`)) return;

    const filtered = list.filter(p => p.id !== presetId);
    window.savePromoPresetsList(filtered);
    if (window.activePromoPresetId === presetId) {
        window.activePromoPresetId = null;
    }

    renderControls();
    if (window.showCopyToast) {
        window.showCopyToast(`تم حذف قالب "${name}" بنجاح 🗑️`);
    }
};

window.updateCurrentPromoPreset = function(presetId, event) {
    if (event) event.stopPropagation();
    const list = window.getPromoPresets();
    const idx = list.findIndex(p => p.id === presetId);
    if (idx === -1) return;

    if (!confirm(`هل تريد تحديث قالب "${list[idx].name}" وحفظ التعديلات الحالية عليه؟`)) return;

    list[idx].updatedAt = Date.now();
    list[idx].banners = JSON.parse(JSON.stringify(appState.banners || []));
    list[idx].bgTheme = appState.bgTheme || 'store';

    if (currentTemplate === 'sbc') {
        list[idx].sbcImageUrl = appState.sbcImageUrl || '';
        list[idx].sbcTitle = appState.sbcTitle || '';
        list[idx].sbcScale = appState.sbcScale || 100;
        list[idx].sbcPosY = appState.sbcPosY !== undefined ? appState.sbcPosY : 15;
    } else {
        list[idx].cardCount = parseInt(appState.cardCount, 10) === 2 ? 2 : 3;
        list[idx].card1_url = appState.card1_url || '';
        list[idx].card1_name = appState.card1_name || '';
        list[idx].card1_price = appState.card1_price || '';
        list[idx].card2_url = appState.card2_url || '';
        list[idx].card2_name = appState.card2_name || '';
        list[idx].card2_price = appState.card2_price || '';
        list[idx].card3_url = appState.card3_url || '';
        list[idx].card3_name = appState.card3_name || '';
        list[idx].card3_price = appState.card3_price || '';
    }

    window.savePromoPresetsList(list);
    window.activePromoPresetId = presetId;
    renderControls();

    if (window.showCopyToast) {
        window.showCopyToast(`تم تحديث قالب "${list[idx].name}" بالتعديلات الحالية! 🔄✨`);
    }
};

window.openSaveTrioPresetModal = function() {
    const modal = document.getElementById('saveTrioPresetModal');
    const input = document.getElementById('input_new_preset_name');
    const p1 = (appState.card1_name || 'لاعب 1').replace(/\s*\(\d+\)/, '');
    const p2 = (appState.card2_name || 'لاعب 2').replace(/\s*\(\d+\)/, '');
    const p3 = (appState.card3_name || 'لاعب 3').replace(/\s*\(\d+\)/, '');

    if (input) {
        input.value = `ثلاثي ${p2} و ${p1}`;
    }
    const previewEl = document.getElementById('savePresetSummaryPill');
    if (previewEl) {
        previewEl.innerHTML = `<span>${p1}</span> • <span class="font-black text-amber-600">${p2} (الأساسي)</span> • <span>${p3}</span>`;
    }
    if (modal) modal.classList.remove('hidden');
    if (input) {
        setTimeout(() => { input.focus(); input.select(); }, 60);
    }
};

window.closeSaveTrioPresetModal = function() {
    const modal = document.getElementById('saveTrioPresetModal');
    if (modal) modal.classList.add('hidden');
};

window.confirmSaveNewTrioPreset = function() {
    const input = document.getElementById('input_new_preset_name');
    const name = input ? input.value.trim() : '';
    if (!name) {
        alert('يرجى إدخال اسم للقالب');
        return;
    }

    const list = window.getTrioPresets();
    const newPreset = {
        id: 'trio_preset_' + Date.now(),
        name: name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        card1_url: appState.card1_url,
        card1_name: appState.card1_name,
        card2_url: appState.card2_url,
        card2_name: appState.card2_name,
        card3_url: appState.card3_url,
        card3_name: appState.card3_name,
        badgeText: appState.badgeText,
        headline: appState.headline,
        subheadline: appState.subheadline,
        ctaText: appState.ctaText,
        trioSpread: appState.trioSpread !== undefined ? appState.trioSpread : 18,
        trioAngle: appState.trioAngle !== undefined ? appState.trioAngle : 7,
        boxWidth: appState.boxWidth,
        boxPadding: appState.boxPadding,
        boxRadius: appState.boxRadius,
        boxStyle: appState.boxStyle,
        ctaScale: appState.ctaScale,
        ctaPaddingX: appState.ctaPaddingX,
        ctaTheme: appState.ctaTheme,
        fontFamily: appState.fontFamily || 'alexandria'
    };

    list.unshift(newPreset);
    window.saveTrioPresetsList(list);
    window.activeTrioPresetId = newPreset.id;
    window.closeSaveTrioPresetModal();
    window.triggerAutoSaveTrio();

    renderControls();
    renderCanvas();
    updateCaption();

    if (window.showCopyToast) {
        window.showCopyToast(`تم حفظ القالب الجديد "${name}" بنجاح! 📁✨`);
    }
};

window.updateCurrentTrioPreset = function() {
    if (!window.activeTrioPresetId) {
        window.openSaveTrioPresetModal();
        return;
    }

    const list = window.getTrioPresets();
    const idx = list.findIndex(p => p.id === window.activeTrioPresetId);
    if (idx === -1) {
        window.openSaveTrioPresetModal();
        return;
    }

    list[idx].updatedAt = Date.now();
    list[idx].card1_url = appState.card1_url;
    list[idx].card1_name = appState.card1_name;
    list[idx].card2_url = appState.card2_url;
    list[idx].card2_name = appState.card2_name;
    list[idx].card3_url = appState.card3_url;
    list[idx].card3_name = appState.card3_name;
    list[idx].badgeText = appState.badgeText;
    list[idx].headline = appState.headline;
    list[idx].subheadline = appState.subheadline;
    list[idx].ctaText = appState.ctaText;
    list[idx].trioSpread = appState.trioSpread !== undefined ? appState.trioSpread : 18;
    list[idx].trioAngle = appState.trioAngle !== undefined ? appState.trioAngle : 7;
    list[idx].boxWidth = appState.boxWidth;
    list[idx].boxPadding = appState.boxPadding;
    list[idx].boxRadius = appState.boxRadius;
    list[idx].boxStyle = appState.boxStyle;
    list[idx].ctaScale = appState.ctaScale;
    list[idx].ctaPaddingX = appState.ctaPaddingX;
    list[idx].ctaTheme = appState.ctaTheme;
    list[idx].fontFamily = appState.fontFamily || 'alexandria';

    window.saveTrioPresetsList(list);
    window.triggerAutoSaveTrio();

    renderControls();
    renderCanvas();
    updateCaption();

    if (window.showCopyToast) {
        window.showCopyToast(`تم حفظ وتحديث التعديلات في نفس القالب "${list[idx].name}" بنجاح! 💾✨`);
    }
};

window.loadTrioPreset = function(presetId) {
    const list = window.getTrioPresets();
    const preset = list.find(p => p.id === presetId);
    if (!preset) return;

    window.activeTrioPresetId = preset.id;
    appState.card1_url = preset.card1_url;
    appState.card1_name = preset.card1_name;
    appState.card2_url = preset.card2_url;
    appState.card2_name = preset.card2_name;
    appState.card3_url = preset.card3_url;
    appState.card3_name = preset.card3_name;
    appState.badgeText = preset.badgeText;
    appState.headline = preset.headline;
    appState.subheadline = preset.subheadline;
    appState.ctaText = preset.ctaText;
    if (preset.trioSpread !== undefined) appState.trioSpread = preset.trioSpread;
    if (preset.trioAngle !== undefined) appState.trioAngle = preset.trioAngle;
    if (preset.boxWidth !== undefined) appState.boxWidth = preset.boxWidth;
    if (preset.boxPadding !== undefined) appState.boxPadding = preset.boxPadding;
    if (preset.boxRadius !== undefined) appState.boxRadius = preset.boxRadius;
    if (preset.boxStyle !== undefined) appState.boxStyle = preset.boxStyle;
    if (preset.ctaScale !== undefined) appState.ctaScale = preset.ctaScale;
    if (preset.ctaPaddingX !== undefined) appState.ctaPaddingX = preset.ctaPaddingX;
    if (preset.ctaTheme !== undefined) appState.ctaTheme = preset.ctaTheme;
    if (preset.fontFamily) appState.fontFamily = preset.fontFamily;

    window.triggerAutoSaveTrio();

    renderControls();
    renderCanvas();
    updateCaption();

    if (window.showCopyToast) {
        window.showCopyToast(`تم تحميل وتفعيل قالب "${preset.name}" بنجاح! ⚡`);
    }
};

window.deleteTrioPreset = function(presetId, event) {
    if (event) event.stopPropagation();
    const list = window.getTrioPresets();
    const target = list.find(p => p.id === presetId);
    const targetName = target ? target.name : 'هذا القالب';

    if (!confirm(`هل أنت متأكد من حذف قالب "${targetName}"؟`)) return;

    const filtered = list.filter(p => p.id !== presetId);
    window.saveTrioPresetsList(filtered);
    if (window.activeTrioPresetId === presetId) {
        window.activeTrioPresetId = null;
    }
    window.triggerAutoSaveTrio();

    renderControls();
    renderCanvas();

    if (window.showCopyToast) {
        window.showCopyToast(`تم حذف القالب "${targetName}" 🗑️`);
    }
};

window.renameTrioPreset = function(presetId, event) {
    if (event) event.stopPropagation();
    const list = window.getTrioPresets();
    const target = list.find(p => p.id === presetId);
    if (!target) return;

    const newName = prompt('أدخل الاسم الجديد للقالب:', target.name);
    if (!newName || !newName.trim()) return;

    target.name = newName.trim();
    target.updatedAt = Date.now();
    window.saveTrioPresetsList(list);

    renderControls();

    if (window.showCopyToast) {
        window.showCopyToast(`تم تعديل اسم القالب إلى "${target.name}" ✏️`);
    }
};

window.clearActiveTrioPreset = function() {
    window.activeTrioPresetId = null;
    window.triggerAutoSaveTrio();
    renderControls();
    if (window.showCopyToast) {
        window.showCopyToast('تم الخروج من القالب - أنت الآن في وضع تشكيلة جديدة حرة ➕');
    }
};

window.resetTrioToDefault = function() {
    if (!confirm('هل تريد إعادة تعيين تشكيلة الـ 3 لاعبين إلى الوضع الافتراضي الأصلي؟')) return;
    window.activeTrioPresetId = null;
    try {
        localStorage.removeItem('shopcoin15_trio_last_state');
    } catch(e) {}
    appState = JSON.parse(JSON.stringify(TEMPLATES['trio'].defaultState));
    appState.shopName = '@shop_coin15';
    appState.layers = getDefaultLayers();
    renderControls();
    renderCanvas();
    updateCaption();
    if (window.showCopyToast) window.showCopyToast('تمت استعادة التشكيلة الافتراضية ↺');
};

function initState() {
    if (!TEMPLATES[currentTemplate]) currentTemplate = 'store_promo';
    appState = JSON.parse(JSON.stringify(TEMPLATES[currentTemplate].defaultState));
    appState.shopName = '@shop_coin15';
    appState.layers = getDefaultLayers();
    if (appState.boxWidth === undefined) appState.boxWidth = 380;
    if (appState.boxPadding === undefined) appState.boxPadding = 12;
    if (appState.boxRadius === undefined) appState.boxRadius = 16;
    if (appState.boxStyle === undefined) appState.boxStyle = 'dark';
    if (appState.ctaScale === undefined) appState.ctaScale = 1.0;
    if (appState.ctaPaddingX === undefined) appState.ctaPaddingX = 24;
    if (appState.ctaPaddingY === undefined) appState.ctaPaddingY = 12;
    if (appState.ctaRadius === undefined) appState.ctaRadius = 9999;
    if (appState.ctaTheme === undefined) appState.ctaTheme = 'cyan';
    if (appState.bgPosY === undefined) appState.bgPosY = 0;
    if (appState.bgPosX === undefined) appState.bgPosX = 0;
    if (appState.bgScale === undefined) appState.bgScale = 1.0;
    if (!appState.fontFamily) appState.fontFamily = 'alexandria';

    // Continuous auto-save restoration for trio template
    if (currentTemplate === 'trio') {
        window.loadTrioAutoSave();
    }
}

window.setFontFamily = function(fontKey) {
    if (!['alexandria', 'thmanyah', 'zain'].includes(fontKey)) fontKey = 'alexandria';
    if (window.currentStudioSuite === 'suite_reels' && window.ReelsEngine && window.ReelsEngine.setFontFamily) {
        window.ReelsEngine.setFontFamily(fontKey);
        return;
    }
    appState.fontFamily = fontKey;
    renderCanvas();
    renderControls();
    if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();

    const names = {
        alexandria: 'الافتراضي (الإسكندرية)',
        thmanyah: 'خط ثمانية (Thmanyah)',
        zain: 'خط زين (Zain Font)'
    };
    if (window.showCopyToast) {
        window.showCopyToast(`تم تفعيل ${names[fontKey] || fontKey} بنجاح! 🔤✨`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for direct deep-linking from Telegram buttons (e.g. ?template=sbc&sbcTitle=...&sbcUrl=...)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const suiteParam = urlParams.get('suite');
        if (suiteParam === 'suite_reels') {
            const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) ||
                            window.location.hostname.endsWith('.local') ||
                            window.location.protocol === 'file:';
            if (isLocal) {
                window.location.href = 'reels.html';
                return;
            }
        }
        if (suiteParam && ['suite_stories', 'suite_posts', 'suite_carousel'].includes(suiteParam)) {
            window.currentStudioSuite = suiteParam;
        } else {
            try {
                const savedSuite = localStorage.getItem('shopcoin15_active_suite');
                if (savedSuite && ['suite_stories', 'suite_posts', 'suite_carousel'].includes(savedSuite)) {
                    window.currentStudioSuite = savedSuite;
                }
            } catch (e) {}
        }
        const tmplParam = urlParams.get('template');
        if (tmplParam && TEMPLATES[tmplParam]) {
            currentTemplate = tmplParam;
            if (['trio', 'market_drop', 'potm'].includes(tmplParam)) {
                window.currentStudioSuite = 'suite_posts';
            } else {
                window.currentStudioSuite = 'suite_stories';
            }
        }
        initState();
        const sbcTitleParam = urlParams.get('sbcTitle');
        if (sbcTitleParam) {
            appState.sbcTitle = sbcTitleParam;
            if (appState.banners && appState.banners[0]) {
                appState.banners[0].text = `نزل تحدي ${sbcTitleParam} رسميـاً 🔥`;
            }
        }
        const sbcUrlParam = urlParams.get('sbcUrl');
        if (sbcUrlParam) {
            setTimeout(() => {
                if (typeof fetchFutGGCard === 'function') {
                    fetchFutGGCard(sbcUrlParam);
                }
            }, 350);
        }
    } catch(e) {
        initState();
    }
    initRatioSelector();
    initResolutionSelector();
    initCopywriterControls();
    switchStudioSuite(window.currentStudioSuite || 'suite_stories');
    if (window.innerWidth < 1024) {
        window.setMobileViewMode('preview');
    }
    setTimeout(window.updateCanvasViewportScale, 100);

    const btnDownloadJpg = document.getElementById('btnDownloadJpg');
    if (btnDownloadJpg) {
        btnDownloadJpg.addEventListener('click', () => CanvasExporter.downloadJpg('exportCanvas'));
    }

    const btnDownloadPng = document.getElementById('btnDownloadPng');
    if (btnDownloadPng) {
        btnDownloadPng.addEventListener('click', () => CanvasExporter.downloadPng('exportCanvas'));
    }

    const btnOpenModal = document.getElementById('btnOpenModal');
    if (btnOpenModal) {
        btnOpenModal.addEventListener('click', () => CanvasExporter.openImageModal('exportCanvas'));
    }

    const btnCopyImage = document.getElementById('btnCopyImage');
    if (btnCopyImage) {
        btnCopyImage.addEventListener('click', () => CanvasExporter.copyToClipboard('exportCanvas'));
    }

    const btnCopyCaption = document.getElementById('btnCopyCaption');
    if (btnCopyCaption) {
        btnCopyCaption.addEventListener('click', copyCaptionToClipboard);
    }

    // Global Clipboard Paste Listener (Ctrl + V for SBC Screenshot / Cards)
    document.addEventListener('paste', (e) => {
        const targetTag = e.target && e.target.tagName;
        if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return;

        const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
        if (!items) return;
        for (const item of items) {
            if (item.type && item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                if (!blob) continue;
                const reader = new FileReader();
                reader.onload = function(evt) {
                    if (currentTemplate === 'sbc') {
                        appState.sbcImageUrl = evt.target.result;
                        appState.sbcTitle = 'لقطة شاشة من الحافظة';
                        renderControls();
                        renderCanvas();
                        if (window.showCopyToast) {
                            window.showCopyToast('تم لصق صورة التحدي فوراً من الحافظة! 📋✨');
                        }
                    } else if (currentTemplate === 'potm') {
                        appState.cardImageUrl = evt.target.result;
                        renderControls();
                        renderCanvas();
                        if (window.showCopyToast) {
                            window.showCopyToast('تم لصق كرت لاعب الشهر من الحافظة! 📋✨');
                        }
                    } else if (currentTemplate === 'market_drop') {
                        appState.cardImageUrl = evt.target.result;
                        renderControls();
                        renderCanvas();
                        if (window.showCopyToast) {
                            window.showCopyToast('تم لصق صورة الكرت من الحافظة! 📋✨');
                        }
                    } else if (currentTemplate === 'showcase') {
                        appState.cardImageUrl = evt.target.result;
                        renderControls();
                        renderCanvas();
                        if (window.showCopyToast) {
                            window.showCopyToast('تم لصق صورة البطاقة في الشوكيس! 📋✨');
                        }
                    }

                };
                reader.readAsDataURL(blob);
                e.preventDefault();
                break;
            }
        }
    });

    // Global Layer Deselection Engine (Deselect when clicking outside / on sides / canvas background)
    function deselectAllLayers() {
        selectedLayerKey = null;
        document.querySelectorAll('.draggable-layer').forEach(el => {
            el.classList.remove('is-selected', 'is-dragging');
        });
    }
    window.deselectAllLayers = deselectAllLayers;

    function handleGlobalDeselect(e) {
        // Do not deselect if interacting with layer toolbar or resize handle
        if (e.target.closest('.layer-toolbar') || e.target.closest('.layer-resize-handle')) {
            return;
        }

        // Do not deselect if clicking inside a modal or dialog
        if (e.target.closest('.modal') || e.target.closest('#saveTrioPresetModal')) {
            return;
        }

        // If clicking on a draggable-layer, allow dragStart to manage selection
        if (e.target.closest('.draggable-layer')) {
            return;
        }

        // Clicked outside on the side, workspace, or canvas background!
        deselectAllLayers();
    }

    document.addEventListener('pointerdown', handleGlobalDeselect);
    document.addEventListener('click', handleGlobalDeselect);

    // Escape key instantly deselects
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            deselectAllLayers();
        }
    });
});

function initTemplateSelector() {
    const container = document.getElementById('templateSelector');
    if (!container) return;

    container.innerHTML = '';
    
    // Filter templates based on current active studio suite
    let availableKeys = STORY_TEMPLATE_KEYS;
    if (window.currentStudioSuite === 'suite_posts') {
        availableKeys = ['showcase', 'trio', 'market_drop', 'potm'];
    }

    availableKeys.forEach(key => {
        const tmpl = TEMPLATES[key];
        if (!tmpl) return;
        const btn = document.createElement('button');
        const isActive = key === currentTemplate;
        btn.className = `tab-btn flex items-center gap-2 px-5 py-2.5 text-xs font-black transition ${isActive ? 'active' : ''}`;
        btn.innerHTML = `<span>${tmpl.name}</span>`;
        btn.addEventListener('click', () => {
            window.selectTemplate(key);
        });
        container.appendChild(btn);
    });
}

window.switchStudioSuite = function(suiteKey) {
    if (suiteKey === 'suite_reels') {
        window.location.href = 'reels.html';
        return;
    }

    if (!['suite_stories', 'suite_posts', 'suite_carousel'].includes(suiteKey)) {
        suiteKey = 'suite_stories';
    }

    window.currentStudioSuite = suiteKey;
    try {
        localStorage.setItem('shopcoin15_active_suite', suiteKey);
    } catch(e) {}

    // 1. Update Suite Navigation Buttons UI (3 Suites: Stories, Posts, Carousel)
    const suiteMap = {
        suite_stories: { id: 'suiteTab_stories', tabClass: 'suite-tab-stories' },
        suite_posts: { id: 'suiteTab_posts', tabClass: 'suite-tab-posts' },
        suite_carousel: { id: 'suiteTab_carousel', tabClass: 'suite-tab-carousel' }
    };

    Object.keys(suiteMap).forEach(key => {
        const btn = document.getElementById(suiteMap[key].id);
        if (btn) {
            if (key === suiteKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    const templateSection = document.getElementById('suiteTemplateSelectorSection');
    const templateTitle = document.getElementById('suiteTemplateSectionTitle');
    const templateControlsBox = document.getElementById('templateControlsBox');
    const carouselPanel = document.getElementById('suite_carousel_panel');
    const filmstripContainer = document.getElementById('carouselFilmstripContainer');
    const captionSection = document.getElementById('captionSection');
    const ratioContainer = document.getElementById('ratioSectionTitle')?.closest('.double-bezel');
    const aiAssistantCard = document.getElementById('aiPromptInput')?.closest('.double-bezel');

    if (suiteKey === 'suite_stories') {
        if (templateSection) templateSection.style.display = '';
        if (templateTitle) templateTitle.textContent = 'اختر قالب الستوري (باكدجات المتجر، تشكيلات، إيفو، توثيق، عروض، رادار فوت بين، أو تحديات SBC):';
        if (templateControlsBox) templateControlsBox.style.display = '';
        if (carouselPanel) carouselPanel.classList.add('hidden');
        if (filmstripContainer) filmstripContainer.classList.add('hidden');
        if (captionSection) captionSection.style.display = 'none';
        if (ratioContainer) ratioContainer.style.display = '';
        if (aiAssistantCard) aiAssistantCard.style.display = '';

        if (!STORY_TEMPLATE_KEYS.includes(currentTemplate)) {
            currentTemplate = 'promo_pack';
            initState();
        }
        setRatio('story');
        initTemplateSelector();
        updateRatioSelectorForTemplate();
        renderControls();
        renderCanvas();
        if (window.AiAssistant && typeof window.AiAssistant.onTemplateChanged === 'function') {
            window.AiAssistant.onTemplateChanged(currentTemplate);
        }
    } else if (suiteKey === 'suite_posts') {
        if (templateSection) templateSection.style.display = '';
        if (templateTitle) templateTitle.textContent = 'اختر قالب البوست (كرت النجم وهوية المتجر، ثلاثي النجوم، هبوط الأسعار، أو لاعب الشهر):';
        if (templateControlsBox) templateControlsBox.style.display = '';
        if (carouselPanel) carouselPanel.classList.add('hidden');
        if (filmstripContainer) filmstripContainer.classList.add('hidden');
        if (captionSection) captionSection.style.display = '';
        if (ratioContainer) ratioContainer.style.display = '';
        if (aiAssistantCard) aiAssistantCard.style.display = '';

        if (currentTemplate !== 'showcase' && currentTemplate !== 'trio' && currentTemplate !== 'market_drop' && currentTemplate !== 'potm') {
            currentTemplate = 'showcase';
            initState();
        }
        if (currentRatio === 'story') {
            setRatio('portrait');
        }
        initTemplateSelector();
        updateRatioSelectorForTemplate();
        renderControls();
        renderCanvas();
        updateCaption();
        if (window.AiAssistant && typeof window.AiAssistant.onTemplateChanged === 'function') {
            window.AiAssistant.onTemplateChanged(currentTemplate);
        }
    } else if (suiteKey === 'suite_carousel') {
        if (templateSection) templateSection.style.display = 'none';
        if (templateControlsBox) templateControlsBox.style.display = 'none';
        if (captionSection) captionSection.style.display = 'none';
        if (carouselPanel) carouselPanel.classList.remove('hidden');
        if (filmstripContainer) filmstripContainer.classList.remove('hidden');
        if (ratioContainer) ratioContainer.style.display = 'none';
        if (aiAssistantCard) aiAssistantCard.style.display = 'none';

        setRatio('portrait'); // 4:5 for Instagram Carousels
        if (window.CarouselEngine) {
            window.CarouselEngine.renderFilmstrip();
            window.CarouselEngine.renderEditorControls();
            window.CarouselEngine.renderSlideToMainCanvas();
        }
    }

    if (window.showCopyToast) {
        const names = {
            suite_stories: 'استوديو الستوري (Stories 9:16) 📱',
            suite_posts: 'استوديو البوستات والفيد (Posts 4:5 & 1:1) 🖼️',
            suite_carousel: 'استوديو الكاروسيل متعدد السلايدات (Carousel 4:5) 📚'
        };
        if (names[suiteKey]) {
            window.showCopyToast(`تم فتح ${names[suiteKey]}! ✨`);
        }
    }
};

window.setMobileViewMode = function(mode) {
    const leftCol = document.getElementById('leftControlColumn');
    const rightCol = document.getElementById('rightPreviewColumn');
    const btnPrev = document.getElementById('mobileBtnPreview');
    const btnCtrl = document.getElementById('mobileBtnControls');

    if (!leftCol || !rightCol) return;

    if (mode === 'preview') {
        rightCol.classList.remove('hidden');
        rightCol.classList.add('flex');
        leftCol.classList.add('hidden');
        leftCol.classList.remove('block');
        
        if (btnPrev) {
            btnPrev.className = 'flex-1 py-2 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-xs text-center flex items-center justify-center gap-1.5';
        }
        if (btnCtrl) {
            btnCtrl.className = 'flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-600 text-center flex items-center justify-center gap-1.5';
        }
        setTimeout(() => {
            if (window.updateCanvasViewportScale) window.updateCanvasViewportScale();
        }, 60);
    } else {
        leftCol.classList.remove('hidden');
        leftCol.classList.add('block');
        rightCol.classList.add('hidden');
        rightCol.classList.remove('flex');

        if (btnCtrl) {
            btnCtrl.className = 'flex-1 py-2 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-xs text-center flex items-center justify-center gap-1.5';
        }
        if (btnPrev) {
            btnPrev.className = 'flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-600 text-center flex items-center justify-center gap-1.5';
        }
    }
};

function updateRatioSelectorForTemplate() {
    const isStoryOnly = STORY_TEMPLATE_KEYS.includes(currentTemplate);
    const btnPortrait = document.querySelector('.ratio-btn[data-ratio="portrait"]');
    const btnSquare = document.querySelector('.ratio-btn[data-ratio="square"]');
    const btnStory = document.querySelector('.ratio-btn[data-ratio="story"]');
    const titleEl = document.getElementById('ratioSectionTitle');

    if (isStoryOnly) {
        if (btnPortrait) btnPortrait.style.display = 'none';
        if (btnSquare) btnSquare.style.display = 'none';
        if (btnStory) {
            btnStory.style.gridColumn = 'span 3 / span 3';
            const title = btnStory.querySelector('div:first-child');
            const sub = btnStory.querySelector('div:last-child');
            if (title) title.innerHTML = '📱 ستوري إنستغرام كامل (9:16) • مقاس مخصص للستوري';
            if (sub) sub.textContent = '1440x2560 فائقة الدقة';
        }
        if (titleEl) {
            titleEl.textContent = 'أبعاد التصميم (مخصص ستوري إنستغرام فقط):';
        }
        if (currentRatio !== 'story') {
            setRatio('story');
        }
    } else {
        if (btnPortrait) btnPortrait.style.display = '';
        if (btnSquare) btnSquare.style.display = '';
        if (btnStory) {
            btnStory.style.gridColumn = '';
            const title = btnStory.querySelector('div:first-child');
            const sub = btnStory.querySelector('div:last-child');
            if (title) title.textContent = 'ستوري (9:16)';
            if (sub) sub.textContent = '1440x2560 📱';
        }
        if (titleEl) {
            titleEl.textContent = 'أبعاد التصميم لإنستغرام:';
        }
    }
}

function updateCaptionVisibility() {
    const captionSection = document.getElementById('captionSection');
    if (!captionSection) return;
    if (window.currentStudioSuite === 'suite_posts') {
        captionSection.style.display = '';
    } else {
        captionSection.style.display = 'none';
    }
}

window.selectTemplate = function(key) {
    if (!TEMPLATES[key]) return;
    currentTemplate = key;
    initState();
    updateRatioSelectorForTemplate();
    updateCaptionVisibility();
    if (window.AiAssistant && typeof window.AiAssistant.onTemplateChanged === 'function') {
        window.AiAssistant.onTemplateChanged(key);
    }
    document.querySelectorAll('#templateSelector .tab-btn').forEach((b, i) => {
        const availableKeys = window.currentStudioSuite === 'suite_posts' 
            ? ['showcase', 'trio', 'market_drop', 'potm'] 
            : STORY_TEMPLATE_KEYS;
        b.classList.toggle('active', availableKeys[i] === key);
    });
    renderControls();
    renderCanvas();
    updateCaption();
};

function initRatioSelector() {
    document.querySelectorAll('.ratio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ratio = btn.dataset.ratio;
            setRatio(ratio);
        });
    });
    updateRatioSelectorForTemplate();
}

function setRatio(ratio) {
    if (window.currentStudioSuite === 'suite_stories' || STORY_TEMPLATE_KEYS.includes(currentTemplate)) {
        ratio = 'story';
    } else if (window.currentStudioSuite === 'suite_carousel') {
        ratio = 'portrait';
    } else if (window.currentStudioSuite === 'suite_reels') {
        ratio = 'story';
    }
    currentRatio = ratio;
    document.querySelectorAll('.ratio-btn').forEach(btn => {
        const isActive = btn.dataset.ratio === ratio;
        btn.classList.toggle('active', isActive);
        if (isActive) {
            btn.className = 'ratio-btn active px-3 py-2 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-xs font-bold text-center transition';
            const title = btn.querySelector('div:first-child');
            const sub = btn.querySelector('div:last-child');
            if (title) title.className = 'text-emerald-950 font-black';
            if (sub) sub.className = 'text-[10px] text-emerald-700 font-black';
        } else {
            btn.className = 'ratio-btn px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-center transition hover:border-emerald-500';
            const title = btn.querySelector('div:first-child');
            const sub = btn.querySelector('div:last-child');
            if (title) title.className = 'text-slate-900 font-bold';
            if (sub) sub.className = 'text-[10px] text-slate-500';
        }
    });

    const canvas = document.getElementById('exportCanvas');
    if (canvas) {
        canvas.className = '';
        if (ratio === 'portrait') canvas.classList.add('canvas-portrait');
        else if (ratio === 'square') canvas.classList.add('canvas-square');
        else if (ratio === 'story') canvas.classList.add('canvas-story');
    }
    
    appState.layers = getDefaultLayers();
    Object.keys(appState.layers).forEach(k => {
        appState.layers[k].x = null;
    });
    renderControls();
    renderCanvas();
    setTimeout(window.updateCanvasViewportScale, 60);
}

function initResolutionSelector() {
    document.querySelectorAll('.res-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const res = btn.dataset.res;
            CanvasExporter.setResolution(res);
        });
    });
}

window.updateResolutionUI = function(res) {
    const is2k = res === '2k';

    document.querySelectorAll('.res-btn').forEach(b => {
        const active = b.dataset.res === res;
        b.classList.toggle('active', active);
        if (active) {
            b.className = 'res-btn active px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs transition shadow-sm shadow-emerald-600/20';
        } else {
            b.className = 'res-btn px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs hover:border-slate-300 transition';
        }
    });

    const badge = document.getElementById('currentResBadge');
    if (badge) {
        badge.textContent = is2k ? '2K QHD فائقة الوضوح' : '1080p FHD قياسي';
        badge.className = is2k
            ? 'text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black'
            : 'text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold';
    }

    const dimStory = document.getElementById('dim_story');
    const dimPortrait = document.getElementById('dim_portrait');
    const dimSquare = document.getElementById('dim_square');

    if (dimStory) dimStory.textContent = is2k ? '1440x2560 📱' : '1080x1920 📱';
    if (dimPortrait) dimPortrait.textContent = is2k ? '1440x1800' : '1080x1350';
    if (dimSquare) dimSquare.textContent = is2k ? '2048x2048' : '1080x1080';

    const btnJpg = document.getElementById('btnDownloadJpgLabel');
    if (btnJpg) btnJpg.textContent = is2k ? '👑 تحميل أصلي 100% (Native 2K)' : '👑 تحميل أصلي 100% (Native 1080p)';

    if (window.showCopyToast) {
        window.showCopyToast(`تم ضبط جودة التصدير على ${is2k ? '2K QHD (1440p) ⭐' : '1080p Full HD'}! 🚀`);
    }
};

window.adjustLayerScale = function(layerKey, delta) {
    if (!appState.layers || !appState.layers[layerKey]) return;
    const currentScale = appState.layers[layerKey].scale || 1.0;
    const newScale = Math.min(2.2, Math.max(0.4, Math.round((currentScale + delta) * 100) / 100));
    appState.layers[layerKey].scale = newScale;

    const el = document.getElementById(layerKey);
    if (el) {
        const content = el.querySelector('.layer-scale-wrapper');
        if (content) content.style.transform = `scale(${newScale})`;
        const badge = el.querySelector('.layer-scale-badge');
        if (badge) badge.textContent = `${Math.round(newScale * 100)}%`;
    }

    const slider = document.getElementById(`slider_${layerKey}`);
    if (slider) slider.value = Math.round(newScale * 100);
    const sliderVal = document.getElementById(`val_${layerKey}`);
    if (sliderVal) sliderVal.textContent = `${Math.round(newScale * 100)}%`;
};

window.setLayerScale = function(layerKey, scalePercent) {
    if (!appState.layers || !appState.layers[layerKey]) return;
    const newScale = Math.min(2.2, Math.max(0.4, scalePercent / 100));
    appState.layers[layerKey].scale = newScale;

    const el = document.getElementById(layerKey);
    if (el) {
        const content = el.querySelector('.layer-scale-wrapper');
        if (content) content.style.transform = `scale(${newScale})`;
        const badge = el.querySelector('.layer-scale-badge');
        if (badge) badge.textContent = `${Math.round(newScale * 100)}%`;
    }

    const sliderVal = document.getElementById(`val_${layerKey}`);
    if (sliderVal) sliderVal.textContent = `${Math.round(newScale * 100)}%`;
};

// Dragging and Snap Engine
function makeDraggable(element, layerKey) {
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let isDragging = false;

    element.addEventListener('mousedown', dragStart);
    element.addEventListener('touchstart', dragStart, { passive: false });

    element.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.altKey || element.classList.contains('is-selected')) {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.05 : -0.05;
            window.adjustLayerScale(layerKey, delta);
        }
    }, { passive: false });

    const resizeHandle = element.querySelector('.layer-resize-handle');
    if (resizeHandle) {
        let isResizing = false;
        let startResizeY = 0;
        let startScale = 1.0;

        const onResizeStart = (e) => {
            e.stopPropagation();
            isResizing = true;
            startResizeY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            startScale = appState.layers[layerKey]?.scale || 1.0;

            const onResizeMove = (ev) => {
                if (!isResizing) return;
                const clientY = ev.type.includes('touch') ? ev.touches[0].clientY : ev.clientY;
                const fitScale = window.currentFitScale || 1.0;
                const diff = ((startResizeY - clientY) / fitScale) * 0.005;
                const newScale = Math.min(2.2, Math.max(0.4, Math.round((startScale + diff) * 100) / 100));
                window.setLayerScale(layerKey, Math.round(newScale * 100));
            };

            const onResizeEnd = () => {
                isResizing = false;
                window.removeEventListener('mousemove', onResizeMove);
                window.removeEventListener('touchmove', onResizeMove);
                window.removeEventListener('mouseup', onResizeEnd);
                window.removeEventListener('touchend', onResizeEnd);
            };

            window.addEventListener('mousemove', onResizeMove);
            window.addEventListener('touchmove', onResizeMove);
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('touchend', onResizeEnd);
        };

        resizeHandle.addEventListener('mousedown', onResizeStart);
        resizeHandle.addEventListener('touchstart', onResizeStart, { passive: false });
    }

    function dragStart(e) {
        if (e.target.closest('.layer-toolbar') || e.target.closest('.layer-resize-handle')) return;
        
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        selectedLayerKey = layerKey;
        document.querySelectorAll('.draggable-layer').forEach(el => el.classList.remove('is-selected'));
        element.classList.add('is-selected');

        isDragging = true;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;

        const fitScale = window.currentFitScale || 1.0;
        const rect = element.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        initialLeft = (rect.left - canvasRect.left) / fitScale;
        initialTop = (rect.top - canvasRect.top) / fitScale;

        element.classList.add('is-dragging');

        window.addEventListener('mousemove', dragMove);
        window.addEventListener('touchmove', dragMove, { passive: false });
        window.addEventListener('mouseup', dragEnd);
        window.addEventListener('touchend', dragEnd);

        if (e.cancelable) e.preventDefault();
    }

    function dragMove(e) {
        if (!isDragging) return;
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const fitScale = window.currentFitScale || 1.0;
        const dx = (clientX - startX) / fitScale;
        const dy = (clientY - startY) / fitScale;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const canvasW = canvas.offsetWidth;
        const layerW = element.offsetWidth;
        const elementCenterX = newLeft + (layerW / 2);
        const canvasCenterX = canvasW / 2;

        const guideV = document.getElementById('snapGuideV');
        const SNAP_TOLERANCE = 7;

        if (Math.abs(elementCenterX - canvasCenterX) < SNAP_TOLERANCE) {
            newLeft = canvasCenterX - (layerW / 2);
            if (guideV) guideV.classList.add('active');
        } else {
            if (guideV) guideV.classList.remove('active');
        }

        element.style.left = `${Math.round(newLeft)}px`;
        element.style.top = `${Math.round(newTop)}px`;
        element.style.transform = 'none';

        if (!appState.layers) appState.layers = {};
        if (!appState.layers[layerKey]) appState.layers[layerKey] = {};
        appState.layers[layerKey].x = Math.round(newLeft);
        appState.layers[layerKey].y = Math.round(newTop);
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        element.classList.remove('is-dragging');

        const guideV = document.getElementById('snapGuideV');
        const guideH = document.getElementById('snapGuideH');
        if (guideV) guideV.classList.remove('active');
        if (guideH) guideH.classList.remove('active');

        window.removeEventListener('mousemove', dragMove);
        window.removeEventListener('touchmove', dragMove);
        window.removeEventListener('mouseup', dragEnd);
        window.removeEventListener('touchend', dragEnd);

        if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();
    }
}

// Center in frame
window.centerInFrame = function() {
    if (!appState.layers) appState.layers = getDefaultLayers();
    Object.keys(appState.layers).forEach(k => {
        appState.layers[k].x = null;
    });
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast('تم توسيط كافة العناصر في منتصف الفريم! 🎯');
};

// Nudge text layers
window.nudgeTextLayers = function(deltaY) {
    if (!appState.layers) appState.layers = getDefaultLayers();
    ['layer_subheadline', 'layer_cta_btn', 'layer_price_box', 'layer_cost_box'].forEach(k => {
        if (appState.layers[k]) {
            appState.layers[k].y = Math.max(30, (appState.layers[k].y || 350) + deltaY);
        }
    });
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(deltaY < 0 ? 'تم رفع النصوص للأعلى! ⬆️' : 'تم إنزال النصوص للأسفل! ⬇️');
};

// Restore all layers
window.restoreAllLayers = function() {
    appState.layers = getDefaultLayers();
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast('تمت استعادة كافة العناصر لمواقعها الأصلية! ↺');
};

// Delete / Hide layer
window.deleteLayer = function(layerKey) {
    if (appState.layers && appState.layers[layerKey]) {
        appState.layers[layerKey].visible = false;
        renderControls();
        renderCanvas();
        if (window.showCopyToast) window.showCopyToast('تم إخفاء العنصر! ✕');
    }
};

function renderControls() {
    if (window.currentStudioSuite === 'suite_carousel') {
        if (window.CarouselEngine) window.CarouselEngine.renderEditorControls();
        return;
    }
    if (window.currentStudioSuite === 'suite_reels') {
        if (window.ReelsEngine) window.ReelsEngine.renderEditorControls();
        return;
    }

    const container = document.getElementById('templateControls');
    if (!container) return;

    let html = '';

    // Quick Action Bar
    html += `
        <div class="mb-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
            <div class="flex items-center gap-2">
                <span class="text-emerald-700 text-sm">🧲</span>
                <span class="text-xs text-emerald-900 font-black">تحكم فوري بالمسافات:</span>
            </div>
            <div class="flex items-center gap-1.5 flex-wrap">
                <button onclick="centerInFrame()" class="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-black text-[11px] transition flex items-center gap-1 shadow-sm" title="توسيط كافة العناصر">
                    <span>🎯 بمنتصف الفريم</span>
                </button>
                <button onclick="nudgeTextLayers(-25)" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition flex items-center gap-1 shadow-sm" title="رفع النصوص 25 بكسل">
                    <span>رفع ⬆️</span>
                </button>
                <button onclick="nudgeTextLayers(25)" class="px-2 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[11px] transition flex items-center gap-1 shadow-xs" title="تنزيل النصوص 25 بكسل">
                    <span>تنزيل ⬇️</span>
                </button>
                <button onclick="restoreAllLayers()" class="px-2 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 border border-slate-200 font-bold text-[11px] transition shadow-xs" title="استعادة الحالة الافتراضية">
                    <span>↺</span>
                </button>
            </div>
        </div>
    `;

    // Layer Manager & Scale
    html += `
        <div class="mb-5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span>📐</span>
                    <span>التحكم بحجم وتكبير كل عنصر (Scale):</span>
                </span>
                <span class="text-[10px] text-slate-500 font-medium">سلايدر + أزرار</span>
            </div>
            <div class="space-y-2.5">
    `;

    const layers = appState.layers || getDefaultLayers();
    Object.keys(layers).forEach(k => {
        const lyr = layers[k];
        const scaleVal = Math.round((lyr.scale || 1.0) * 100);
        html += `
            <div class="p-2.5 rounded-xl ${lyr.visible ? 'bg-white' : 'bg-red-50 opacity-60'} border border-slate-200 shadow-xs">
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-bold text-slate-800">${lyr.label || k}</span>
                    <div class="flex items-center gap-2">
                        <span id="val_${k}" class="text-[11px] font-black text-emerald-700">${scaleVal}%</span>
                        <button class="layer-toggle-btn px-2 py-0.5 rounded text-[10px] font-black transition ${lyr.visible ? 'text-red-600 hover:bg-red-50 border border-red-200' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'}" data-layer="${k}">
                            ${lyr.visible ? 'حذف ✕' : 'إظهار 👁️'}
                        </button>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="adjustLayerScale('${k}', -0.08)" class="w-6 h-6 rounded-md bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-black text-xs transition flex items-center justify-center border border-slate-200">-</button>
                    <input type="range" id="slider_${k}" min="40" max="180" value="${scaleVal}" oninput="setLayerScale('${k}', this.value)" class="flex-1 accent-emerald-600 cursor-pointer">
                    <button onclick="adjustLayerScale('${k}', 0.08)" class="w-6 h-6 rounded-md bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-black text-xs transition flex items-center justify-center border border-slate-200">+</button>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    // Template Specific Controls: STORE PROMO (Official Instagram Story)
    if (currentTemplate === 'store_promo') {
        const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
            ? appState.banners 
            : (window.STORE_BANNER_THEMES?.classic?.banners || []);
        const cardCount = parseInt(appState.cardCount, 10) === 2 ? 2 : 3;
        const starPresets = window.STARTER_BEASTS || [];
        const topPresets = window.POPULAR_FUTGG_STARS || [];

        html += `
            <div class="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-emerald-50/60 to-purple-50/70 border border-emerald-200/90 shadow-xs space-y-4">
                
                <!-- 1. Card Count & Background Bar -->
                <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>👥</span>
                            <span>عدد كروت الحدث (الأسفل):</span>
                        </span>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="setPromoCardCount(3)" class="px-3 py-1 rounded-xl ${cardCount === 3 ? 'bg-emerald-600 text-white font-black' : 'bg-slate-100 text-slate-700 font-bold'} text-xs transition shadow-2xs">
                                ⭐ 3 كروت (تريو)
                            </button>
                            <button type="button" onclick="setPromoCardCount(2)" class="px-3 py-1 rounded-xl ${cardCount === 2 ? 'bg-emerald-600 text-white font-black' : 'bg-slate-100 text-slate-700 font-bold'} text-xs transition shadow-2xs">
                                👥 كرتين (ثنائي)
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>🖼️</span>
                            <span>خلفية الستوري:</span>
                        </span>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="setPromoBgTheme('store')" class="px-2.5 py-1 rounded-xl ${appState.bgTheme === 'store' || !appState.bgTheme ? 'bg-emerald-600 text-white font-black' : 'bg-slate-100 text-slate-700 font-bold'} text-[11px] transition shadow-2xs">
                                ⬛ خلفية المتجر الأصلية
                            </button>
                            <button type="button" onclick="setPromoBgTheme('white')" class="px-2.5 py-1 rounded-xl ${appState.bgTheme === 'white' ? 'bg-emerald-600 text-white font-black' : 'bg-slate-100 text-slate-700 font-bold'} text-[11px] transition shadow-2xs">
                                ⚪ أبيض نقي
                            </button>
                            <button type="button" onclick="setPromoBgTheme('subtle')" class="px-2.5 py-1 rounded-xl ${appState.bgTheme === 'subtle' ? 'bg-emerald-600 text-white font-black' : 'bg-slate-100 text-slate-700 font-bold'} text-[11px] transition shadow-2xs">
                                🌫️ تدرج ناعم
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 2. Custom & Built-in Themes / Presets -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <!-- Header with Save New Preset Button -->
                    <div class="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
                        <div class="flex items-center gap-1.5">
                            <span class="text-sm">🎨</span>
                            <span class="text-xs font-black text-slate-900">أنماط وقوالب الستوري:</span>
                        </div>
                        <button type="button" onclick="openSavePromoPresetModal()" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shadow-md shadow-emerald-600/25 flex items-center gap-1.5 cursor-pointer">
                            <span>➕</span>
                            <span>حفظ النمط الحالي كقالب جديد 💾</span>
                        </button>
                    </div>

                    <!-- Section A: User's Custom Presets -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[11px] font-black text-emerald-900 flex items-center gap-1">
                                <span>⭐</span>
                                <span>قوالبي المخصصة (أنشأتها بنفسي):</span>
                            </span>
                            <span class="text-[10px] text-emerald-700 font-black font-mono">(${window.getPromoPresets().length})</span>
                        </div>

                        ${(() => {
                            const customPresets = window.getPromoPresets();
                            if (customPresets.length === 0) {
                                return `
                                    <div class="p-3 rounded-xl border-2 border-dashed border-emerald-300/80 bg-emerald-50/40 text-center">
                                        <div class="text-[11px] font-black text-emerald-900">لم تقم بحفظ أي قالب مخصص لك بعد 🌟</div>
                                        <p class="text-[10px] text-slate-600 mt-1 leading-relaxed">عدّل نصوص وألوان الشرائط والكروت كما تحب، ثم اضغط زر <strong>"حفظ النمط الحالي كقالب جديد 💾"</strong> بالأعلى ليُحفظ هنا للأبد وتطبقه بنقرة واحدة دائماً!</p>
                                    </div>
                                `;
                            }
                            return `
                                <div class="grid grid-cols-2 gap-2">
                                    ${customPresets.map(p => {
                                        const isActive = window.activePromoPresetId === p.id;
                                        return `
                                            <div class="group relative p-2.5 rounded-xl ${isActive ? 'bg-emerald-100/90 border-2 border-emerald-500 shadow-sm' : 'bg-emerald-50/60 hover:bg-emerald-100/50 border border-emerald-200'} text-right transition cursor-pointer" onclick="applyCustomPromoPreset('${p.id}')">
                                                <div class="flex items-start justify-between gap-1 mb-1.5">
                                                    <span class="text-[11.5px] font-black ${isActive ? 'text-emerald-950' : 'text-slate-900'} truncate flex-1 flex items-center gap-1">
                                                        <span>⭐</span>
                                                        <span>${p.name}</span>
                                                    </span>
                                                    <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
                                                        <button type="button" onclick="updateCurrentPromoPreset('${p.id}', event)" class="p-1 text-[11px] text-emerald-700 hover:text-emerald-900 rounded hover:bg-emerald-200/70 transition" title="تحديث القالب بالتعديلات الحالية">🔄</button>
                                                        <button type="button" onclick="deleteCustomPromoPreset('${p.id}', event)" class="p-1 text-[11px] text-red-500 hover:text-red-700 rounded hover:bg-red-100 transition" title="حذف القالب">🗑️</button>
                                                    </div>
                                                </div>
                                                <div class="flex items-center gap-1 mb-1.5 flex-wrap">
                                                    ${(p.banners || []).slice(0, 5).map(b => `
                                                        <span class="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs inline-block" style="background-color: ${b.bg || '#0084FF'};" title="${b.text || ''}"></span>
                                                    `).join('')}
                                                </div>
                                                <div class="text-[9.5px] ${isActive ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'} flex items-center justify-between">
                                                    <span>${p.cardCount === 2 ? '👥 كرتين' : '⭐ 3 كروت'} • ${(p.banners || []).length} شرائط</span>
                                                    <span class="text-[9px] text-emerald-700 underline font-black">تطبيق ↵</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `;
                        })()}
                    </div>

                    <!-- Section B: Built-in Quick Starting Presets -->
                    <div class="pt-2 border-t border-slate-100">
                        <div class="text-[10.5px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
                            <span>أنماط مقترحة من صور المتجر السابقة (جاهزة للتعديل):</span>
                            <span class="text-[9.5px] text-slate-400 font-black">1-Click</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <button type="button" onclick="applyPromoThemePreset('classic')" class="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-right transition">
                                <div class="text-[11px] font-black text-blue-700">النمط الكلاسيكي</div>
                                <div class="text-[9.5px] text-slate-500">أزرق • أحمر • أخضر • سماوي</div>
                            </button>
                            <button type="button" onclick="applyPromoThemePreset('pastel')" class="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-right transition">
                                <div class="text-[11px] font-black text-amber-700">باستيل هادئ</div>
                                <div class="text-[9.5px] text-slate-500">سماوي • ذهبي • وردي كرزي</div>
                            </button>
                            <button type="button" onclick="applyPromoThemePreset('toty_speed')" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-right transition">
                                <div class="text-[11px] font-black text-emerald-700">سرعة وضمان التوتي</div>
                                <div class="text-[9.5px] text-slate-500">أزرق • ثلجي • أخضر فسفوري</div>
                            </button>
                            <button type="button" onclick="applyPromoThemePreset('accounts')" class="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-400 text-right transition">
                                <div class="text-[11px] font-black text-purple-700">ترويج الحسابات</div>
                                <div class="text-[9.5px] text-slate-500">أخضر • أزرق • أحمر • فحمي</div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 3. Stacked Banners Editor -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>📝</span>
                            <span>تعديل شرائط النصوص الملونة (Instagram Highlight):</span>
                        </span>
                        <button type="button" onclick="addPromoBanner()" class="px-2.5 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-black border border-emerald-200 transition">
                            + شريط جديد
                        </button>
                    </div>

                    <!-- Quick Emoji Bar -->
                    <div class="flex items-center gap-1 overflow-x-auto py-1 px-1.5 bg-slate-100/90 rounded-xl border border-slate-200 text-sm no-scrollbar">
                        <span class="text-[9.5px] font-black text-slate-500 shrink-0 ml-1">إيموجي سريع:</span>
                        ${['🔥','⚡','👑','🤩','🥳','👏','💰','🪙','⬇️','🔒','🎮','⚽','📩','✨','🏆','💯','🚀','💎','🎯','💥'].map(em => `
                            <button type="button" onclick="insertEmojiIntoActiveBanner('${em}')" class="w-6 h-6 rounded-md bg-white hover:bg-emerald-100 hover:scale-115 active:scale-90 text-sm flex items-center justify-center transition shadow-2xs cursor-pointer shrink-0" title="إدراج ${em}">
                                ${em}
                            </button>
                        `).join('')}
                    </div>

                    <div class="space-y-2">
                        ${banners.map((b, idx) => `
                            <div class="space-y-1.5">
                                <div class="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center gap-1.5 transition hover:border-slate-300">
                                    <div class="flex items-center gap-1 shrink-0">
                                        <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs">${idx + 1}</span>
                                        <div class="flex flex-col gap-0.5">
                                            <button type="button" onclick="movePromoBannerUp(${idx})" ${idx === 0 ? 'disabled class="w-4 h-3 rounded bg-slate-100 text-slate-300 text-[8px] flex items-center justify-center cursor-not-allowed"' : 'class="w-4 h-3 rounded bg-slate-200 hover:bg-emerald-500 hover:text-white text-slate-700 text-[8px] font-black flex items-center justify-center transition cursor-pointer active:scale-90"'} title="رفع الشريط للأعلى (تقديم)">▲</button>
                                            <button type="button" onclick="movePromoBannerDown(${idx})" ${idx === banners.length - 1 ? 'disabled class="w-4 h-3 rounded bg-slate-100 text-slate-300 text-[8px] flex items-center justify-center cursor-not-allowed"' : 'class="w-4 h-3 rounded bg-slate-200 hover:bg-emerald-500 hover:text-white text-slate-700 text-[8px] font-black flex items-center justify-center transition cursor-pointer active:scale-90"'} title="تنزيل الشريط للأسفل (تأخير)">▼</button>
                                        </div>
                                    </div>
                                    <div class="relative flex-1 flex items-center">
                                        <input type="text" id="promoBannerInput_${idx}" value="${(b.text || '').replace(/"/g, '&quot;')}" oninput="updatePromoBannerText(${idx}, this.value)" onfocus="window.lastFocusedBannerIdx = ${idx}" placeholder="نص الشريط..." class="w-full pl-7 pr-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                        <button type="button" onclick="toggleEmojiPickerForBanner(${idx})" class="absolute left-1.5 p-0.5 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-500 text-xs transition cursor-pointer" title="لوحة الإيموجي">😀</button>
                                    </div>
                                    <input type="color" value="${b.bg || '#0084FF'}" oninput="updatePromoBannerBg(${idx}, this.value)" class="w-7 h-7 rounded cursor-pointer border-0 p-0 shrink-0 shadow-2xs" title="لون خلفية الشريط">
                                    <button type="button" onclick="togglePromoBannerColor(${idx})" class="px-2 py-1 rounded text-[10px] font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs" title="تبديل لون الخط بين الأبيض والأسود">
                                        ${(b.color || '').toUpperCase() === '#FFFFFF' ? '⚪' : '⚫'}
                                    </button>
                                    ${banners.length > 1 ? `
                                    <button type="button" onclick="removePromoBanner(${idx})" class="w-6 h-6 rounded bg-red-50 hover:bg-red-500 hover:text-white text-red-600 text-xs font-black transition flex items-center justify-center shrink-0" title="حذف الشريط">✕</button>
                                    ` : ''}
                                </div>

                                ${window.activeEmojiPickerIdx === idx ? `
                                <div class="p-2 rounded-xl bg-white border border-amber-300 shadow-md flex flex-wrap gap-1 items-center animate-fadeIn">
                                    <div class="w-full flex items-center justify-between pb-1 border-b border-slate-100 mb-0.5">
                                        <span class="text-[10px] font-black text-amber-900">اختر إيموجي للشريط (${idx + 1}):</span>
                                        <button type="button" onclick="toggleEmojiPickerForBanner(${idx})" class="text-[9.5px] font-bold text-slate-400 hover:text-red-500 px-1">إغلاق ✕</button>
                                    </div>
                                    ${['🔥','⚡','👑','🤩','🥳','👏','💰','🪙','⬇️','🔒','🎮','⚽','📩','✨','🏆','💯','🚀','💎','🎯','💥','📦','🛡️','🤝','💬','📢','🏷️','🚨','⏳','💪','👀','🤍','🖤','💙','💚','💛','❤️'].map(em => `
                                        <button type="button" onclick="insertEmojiIntoBanner(${idx}, '${em}')" class="w-7 h-7 rounded-lg hover:bg-amber-100 hover:scale-115 active:scale-95 text-base flex items-center justify-center transition cursor-pointer" title="إدراج ${em}">
                                            ${em}
                                        </button>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        <span class="font-bold flex items-center gap-1 text-slate-700">
                            <span>↕️</span>
                            <span>موضع قسم الشرائط على التصميم:</span>
                        </span>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="nudgeLayerY('layer_store_banners', -15)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold text-[10.5px] border border-slate-200 transition active:scale-95" title="رفع قسم الشرائط للأعلى">
                                ⬆️ رفع للأعلى
                            </button>
                            <button type="button" onclick="nudgeLayerY('layer_store_banners', 15)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold text-[10.5px] border border-slate-200 transition active:scale-95" title="تنزيل قسم الشرائط للأسفل">
                                ⬇️ تنزيل للأسفل
                            </button>
                            <button type="button" onclick="resetLayerY('layer_store_banners', 45)" class="px-1.5 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-200 text-slate-500 font-bold text-[10px] border border-slate-200 transition" title="إعادة الموضع الافتراضي">
                                ↺
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4. Player Cards Selector (Duo or Trio) -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>⚽</span>
                            <span>تخصيص بطاقات لاعبي الحدث:</span>
                        </span>
                        <span class="text-[10px] text-slate-500 font-bold">روابط FUTBIN / FUT.GG أو جاهزة</span>
                    </div>

                    <!-- Player 1 (Left) -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-black text-slate-800">اللاعب 1 (على اليسار):</span>
                            <span class="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">${appState.card1_name || 'اللاعب 1'}</span>
                        </div>
                        <div class="flex gap-1.5">
                            <input type="text" id="input_trio_url_1" placeholder="رابط FUTBIN / FUT.GG أو رقم ID" class="flex-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600">
                            <button onclick="fetchPlayerForTrio(1)" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-[11px]">سحب</button>
                            <label class="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold cursor-pointer">
                                📁<input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(1, this)">
                            </label>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[9.5px] font-bold text-slate-600 shrink-0">سعر اختياري:</span>
                            <input type="text" value="${appState.card1_price || ''}" placeholder="اختياري: ~8,500 كوينز" oninput="setTrioPlayerPrice(1, this.value)" class="flex-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px]">
                        </div>
                        <div class="flex flex-wrap gap-1 pt-1">
                            ${starPresets.slice(0, 4).map(s => `
                                <button onclick="setTrioPlayer(1, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-1.5 py-0.5 rounded bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[9.5px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Player 2 (Center or Right) -->
                    <div class="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-black text-amber-900">${cardCount === 3 ? 'اللاعب 2 (الأوسط - الصدارة 👑):' : 'اللاعب 2 (على اليمين):'}</span>
                            <span class="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded">${appState.card2_name || 'اللاعب 2'}</span>
                        </div>
                        <div class="flex gap-1.5">
                            <input type="text" id="input_trio_url_2" placeholder="رابط FUTBIN / FUT.GG أو رقم ID" class="flex-1 px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-900 text-[11px] outline-none focus:border-amber-600">
                            <button onclick="fetchPlayerForTrio(2)" class="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-black text-[11px]">سحب</button>
                            <label class="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 text-[11px] font-bold cursor-pointer">
                                📁<input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(2, this)">
                            </label>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[9.5px] font-bold text-amber-900 shrink-0">سعر اختياري:</span>
                            <input type="text" value="${appState.card2_price || ''}" placeholder="اختياري: ~48,000 كوينز" oninput="setTrioPlayerPrice(2, this.value)" class="flex-1 px-2 py-0.5 rounded bg-white border border-amber-200 text-[11px]">
                        </div>
                        <div class="flex flex-wrap gap-1 pt-1">
                            ${starPresets.slice(1, 5).map(s => `
                                <button onclick="setTrioPlayer(2, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-1.5 py-0.5 rounded bg-white hover:bg-amber-600 hover:text-white border border-amber-200 text-[9.5px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Player 3 (Right - shown only if cardCount === 3) -->
                    ${cardCount === 3 ? `
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-black text-slate-800">اللاعب 3 (على اليمين):</span>
                            <span class="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">${appState.card3_name || 'اللاعب 3'}</span>
                        </div>
                        <div class="flex gap-1.5">
                            <input type="text" id="input_trio_url_3" placeholder="رابط FUTBIN / FUT.GG أو رقم ID" class="flex-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600">
                            <button onclick="fetchPlayerForTrio(3)" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-[11px]">سحب</button>
                            <label class="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold cursor-pointer">
                                📁<input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(3, this)">
                            </label>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[9.5px] font-bold text-slate-600 shrink-0">سعر اختياري:</span>
                            <input type="text" value="${appState.card3_price || ''}" placeholder="اختياري: ~38,000 كوينز" oninput="setTrioPlayerPrice(3, this.value)" class="flex-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px]">
                        </div>
                        <div class="flex flex-wrap gap-1 pt-1">
                            ${starPresets.slice(2, 6).map(s => `
                                <button onclick="setTrioPlayer(3, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-1.5 py-0.5 rounded bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[9.5px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                </div>

            </div>
        `;
    }

    // Template Specific Player Selectors & Controls
    if (currentTemplate === 'showcase') {
        const bgThemes = window.SHOWCASE_BG_THEMES || {};
        const starsPresets = window.SHOWCASE_STARS_PRESETS || [];
        const curBgKey = appState.bgTheme || 'store';

        html += `
            <div class="mb-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4 text-white">
                
                <!-- Header -->
                <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
                    <div class="flex items-center gap-2.5">
                        <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center border border-emerald-500/30">⭐</span>
                        <div>
                            <div class="text-xs font-black text-white flex items-center gap-1.5">
                                <span>كرت النجم وهوية المتجر (Hero Card)</span>
                                <span class="px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[10px] font-black font-mono">FC 27 VIP</span>
                            </div>
                            <div class="text-[10px] text-slate-400">تركيز 100% على بطاقة اللعبة الرسمية مع المنصة والكوينز وبطاقات البينتو</div>
                        </div>
                    </div>
                </div>

                <!-- 1. Authentic Store Background Selector -->
                <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-200 flex items-center gap-1.5">
                            <span>🏛️</span>
                            <span>خلفيات متجر ShopCoin15 الرسمية:</span>
                        </span>
                        <span class="text-[10px] text-emerald-400 font-bold">4 خلفيات معتمدة</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        ${Object.keys(bgThemes).map(k => {
                            const b = bgThemes[k];
                            const isActive = curBgKey === k;
                            return `
                                <button type="button" onclick="setShowcaseBg('${k}')" class="p-2 rounded-xl text-right border transition cursor-pointer flex flex-col justify-between gap-1 ${isActive ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/40 text-white font-black' : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'}">
                                    <div class="flex items-center justify-between w-full">
                                        <span class="text-xs font-bold text-white truncate">${b.name.split('(')[0].trim()}</span>
                                        ${isActive ? '<span class="text-emerald-400 text-xs font-black">✓</span>' : ''}
                                    </div>
                                    <span class="text-[9.5px] text-slate-400 font-mono truncate">${b.name.includes('(') ? b.name.split('(')[1].replace(')', '') : ''}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 2. Star 1-Click Presets (Curated FC 27 Cards) -->
                <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-200 flex items-center gap-1.5">
                            <span>🌟</span>
                            <span>اختر كرت النجم بنقرة واحدة:</span>
                        </span>
                        <span class="text-[10px] text-emerald-400 font-bold font-mono">${starsPresets.length} كروت رسمية</span>
                    </div>
                    <div class="grid grid-cols-3 gap-1.5">
                        ${starsPresets.map((star, idx) => `
                            <button type="button" onclick="applyShowcaseStar(${idx})" class="px-2 py-1.5 rounded-lg bg-slate-800/90 hover:bg-emerald-600/90 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-400 text-[11px] font-bold transition flex items-center justify-center gap-1 text-center shadow-xs cursor-pointer">
                                <span class="truncate">${star.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- 3. Official FC 27 Card Scraper / Direct Upload -->
                <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-200 flex items-center gap-1.5">
                            <span>🃏</span>
                            <span>سحب أو رفع بطاقة اللاعب:</span>
                        </span>
                        <label class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold cursor-pointer transition border border-slate-700 flex items-center gap-1">
                            <span>📁 رفع صورة كرت</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handleSingleCardUpload(this)">
                        </label>
                    </div>
                    <div class="flex gap-2">
                        <input type="text" id="futUrlInput" 
                               onkeydown="if(event.key==='Enter') document.getElementById('btnFetchFut').click()"
                               placeholder="الصق رابط FUTBIN أو FUT.GG أو اسم اللاعب (مثلاً: mbappe)" 
                               class="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500">
                        <button id="btnFetchFut" class="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1 shrink-0 cursor-pointer">
                            <span>سحب الكرت ⚡</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                        <div>
                            <label class="block text-[10px] text-slate-400 font-bold mb-1">اسم اللاعب بالبطاقة:</label>
                            <input type="text" id="input_playerName" value="${appState.playerName || ''}" placeholder="كيليان مبابي" class="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500">
                        </div>
                        <div>
                            <label class="block text-[10px] text-slate-400 font-bold mb-1">سعر الكرت بالسوق:</label>
                            <input type="text" id="input_marketPrice" value="${appState.marketPrice || '2,450,000 كوينز'}" placeholder="2,450,000 كوينز" class="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold text-xs outline-none focus:border-emerald-500">
                        </div>
                    </div>
                </div>

                <!-- 4. Luxury Elements Toggles -->
                <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                    <span class="text-xs font-black text-slate-200 flex items-center gap-1.5">
                        <span>✨</span>
                        <span>إظهار وتخصيص عناصر المتجر الفاخرة:</span>
                    </span>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="toggleShowcaseCoins()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition text-center ${appState.showCoinsStack !== false ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-black' : 'bg-slate-950 text-slate-500 border-slate-800'}">
                            ${appState.showCoinsStack !== false ? '🪙 أكوام الكوينز 3D (ظاهرة)' : '🪙 أكوام الكوينز (مخفية)'}
                        </button>
                        <button type="button" onclick="toggleShowcaseBento()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition text-center ${appState.showBentoBadges !== false ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-black' : 'bg-slate-950 text-slate-500 border-slate-800'}">
                            ${appState.showBentoBadges !== false ? '📱 بطاقات البينتو (ظاهرة)' : '📱 بطاقات البينتو (مخفية)'}
                        </button>
                        <button type="button" onclick="toggleShowcasePaymentChips()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition text-center ${appState.showPaymentChips !== false ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-black' : 'bg-slate-950 text-slate-500 border-slate-800'}">
                            ${appState.showPaymentChips !== false ? '💳 طرق الدفع (ظاهرة)' : '💳 طرق الدفع (مخفية)'}
                        </button>
                        <button type="button" onclick="toggleShowcaseStoreLogo()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition text-center ${appState.showStoreLogo !== false ? 'bg-slate-800 text-white border-emerald-500/50 font-black' : 'bg-slate-950 text-slate-500 border-slate-800'}">
                            ${appState.showStoreLogo !== false ? '✓ شعار المتجر SC ظاهر' : '✕ شعار المتجر مخفي'}
                        </button>
                    </div>
                </div>

            </div>
        `;
    } else if (currentTemplate === 'trio') {


        const starPresets = window.STARTER_BEASTS || [];
        const topPresets = window.POPULAR_FUTGG_STARS || [];
        const spreadVal = appState.trioSpread !== undefined ? appState.trioSpread : 18;
        const angleVal = appState.trioAngle !== undefined ? appState.trioAngle : 7;
        const trioPresets = window.getTrioPresets ? window.getTrioPresets() : [];
        const activePreset = trioPresets.find(p => p.id === window.activeTrioPresetId);

        html += `
            <div class="mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-emerald-50/60 to-teal-50/80 border border-emerald-200/90 shadow-xs space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-emerald-200/70">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>👑</span>
                        <span>تخصيص نجوم الثلاثي (دعم روابط FUTBIN و FUT.GG و ID):</span>
                    </span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">3 لاعبين متداخلين</span>
                </div>

                <!-- 📁 TRIO SAVED PRESETS SYSTEM (قوالب التشكيلات المحفوظة للثلاثي) -->
                <div class="p-3.5 rounded-2xl bg-slate-950 text-white border border-emerald-500/50 shadow-xl space-y-3">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">📁</span>
                            <div>
                                <div class="text-xs font-black text-white flex items-center gap-1.5">
                                    <span>قوالب التشكيلات المحفوظة</span>
                                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[10px] font-black">${trioPresets.length} قوالب</span>
                                </div>
                                <div class="text-[10px] text-slate-400">احفظ تشكيلاتك مع نصوصها وارجع لها بأي وقت بنقرة واحدة</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="openSaveTrioPresetModal()" class="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] font-black transition flex items-center gap-1 shadow-md shadow-emerald-600/30" title="حفظ التشكيلة الحالية كقالب جديد">
                                <span>➕</span>
                                <span>قالب جديد</span>
                            </button>
                            <button type="button" onclick="resetTrioToDefault()" class="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10.5px] transition" title="إعادة تعيين للافتراضي">
                                <span>↺</span>
                            </button>
                        </div>
                    </div>

                    ${activePreset ? `
                    <!-- Active Preset Quick Actions Banner -->
                    <div class="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/60 space-y-2 shadow-inner">
                        <div class="flex items-center justify-between text-[11px]">
                            <div class="flex items-center gap-1.5 font-bold text-emerald-300">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>أنت تعمل الآن على:</span>
                                <span class="font-black text-white bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40">${activePreset.name}</span>
                            </div>
                            <button type="button" onclick="clearActiveTrioPreset()" class="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/80 transition" title="الخروج لتصميم تشكيلة حرة">
                                ✕ خروج
                            </button>
                        </div>
                        <div class="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-500/30">
                            <button type="button" onclick="updateCurrentTrioPreset()" class="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] transition flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20" title="تحديث التعديلات وحفظها في نفس هذا القالب">
                                <span>💾</span>
                                <span>حفظ في نفس القالب</span>
                            </button>
                            <button type="button" onclick="openSaveTrioPresetModal()" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] transition flex items-center justify-center gap-1 border border-slate-700" title="حفظ التعديلات كقالب جديد باسم آخر">
                                <span>➕</span>
                                <span>حفظ كقالب جديد</span>
                            </button>
                        </div>
                    </div>
                    ` : `
                    <div class="flex items-center justify-between px-1 py-0.5">
                        <span class="text-[10.5px] text-slate-400">💡 اضغط على أي تشكيلة بالأسفل لتطبيقها، أو احفظ تشكيلتك الحالية:</span>
                        <button type="button" onclick="openSaveTrioPresetModal()" class="text-[10.5px] text-emerald-400 hover:text-emerald-300 font-bold underline transition">
                            💾 حفظ التشكيلة الحالية
                        </button>
                    </div>
                    `}

                    <!-- Presets Cards List -->
                    <div class="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5" style="scrollbar-width: thin;">
                        ${trioPresets.map(p => {
                            const isActive = p.id === window.activeTrioPresetId;
                            const p1 = (p.card1_name || 'لاعب 1').split('(')[0].trim();
                            const p2 = (p.card2_name || 'لاعب 2').split('(')[0].trim();
                            const p3 = (p.card3_name || 'لاعب 3').split('(')[0].trim();
                            return `
                                <div class="group p-2 rounded-xl transition flex items-center justify-between gap-2 border ${isActive ? 'bg-slate-800/90 border-emerald-400 ring-1 ring-emerald-400/80 shadow-md' : 'bg-slate-800/50 border-slate-800 hover:bg-slate-800/90 hover:border-slate-700'}">
                                    <div onclick="loadTrioPreset('${p.id}')" class="flex-1 cursor-pointer min-w-0">
                                        <div class="flex items-center gap-1.5">
                                            <span class="text-xs font-black text-white truncate">${p.name}</span>
                                            ${isActive ? '<span class="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black text-[9px]">نشط ⚡</span>' : ''}
                                        </div>
                                        <div class="text-[10px] text-emerald-400/90 font-medium truncate mt-0.5">
                                            ${p1} • <strong class="text-amber-400">${p2}</strong> • ${p3}
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1 shrink-0">
                                        <button type="button" onclick="loadTrioPreset('${p.id}')" class="px-2 py-1 rounded-lg ${isActive ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-700 hover:bg-emerald-600 text-white font-bold'} text-[10px] transition" title="تطبيق هذا القالب على الكانفاس">
                                            ${isActive ? 'مُفعّل' : 'تطبيق ⚡'}
                                        </button>
                                        <button type="button" onclick="renameTrioPreset('${p.id}', event)" class="w-6 h-6 rounded-lg bg-slate-700/60 hover:bg-slate-600 text-slate-300 hover:text-white text-[10px] transition flex items-center justify-center" title="إعادة تسمية">
                                            ✏️
                                        </button>
                                        <button type="button" onclick="deleteTrioPreset('${p.id}', event)" class="w-6 h-6 rounded-lg bg-slate-700/60 hover:bg-red-600 text-slate-400 hover:text-white text-[10px] transition flex items-center justify-center" title="حذف القالب">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>الحفظ التلقائي مفعّل: يتم حفظ أي تغيير في الذاكرة المحلية تلقائياً.</span>
                    </div>
                </div>

                <!-- Spacing & Tilt Controls -->
                <div class="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-2 gap-3">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[11px] font-bold text-slate-700">تباعد الكروت (Spread):</span>
                            <span id="val_trio_spread" class="text-[10px] font-black text-emerald-700">${spreadVal}px</span>
                        </div>
                        <input type="range" min="0" max="45" value="${spreadVal}" oninput="setTrioSpread(this.value)" class="w-full accent-emerald-600 cursor-pointer">
                    </div>
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[11px] font-bold text-slate-700">ميلان الكروت (Tilt):</span>
                            <span id="val_trio_angle" class="text-[10px] font-black text-emerald-700">${angleVal}°</span>
                        </div>
                        <input type="range" min="0" max="15" value="${angleVal}" oninput="setTrioAngle(this.value)" class="w-full accent-emerald-600 cursor-pointer">
                    </div>
                </div>

                <!-- PLAYER 1 (Right Card) -->
                <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">1</span>
                            <span class="text-xs font-bold text-slate-800">اللاعب 1 (على اليمين / بالخلف):</span>
                        </div>
                        <span class="text-[10.5px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full" id="trio_name_1">
                            ${appState.card1_name || 'داروين نونيز (77)'}
                        </span>
                    </div>

                    <!-- Input + Fetch + Upload -->
                    <div class="flex gap-1.5">
                        <input type="text" id="input_trio_url_1" placeholder="ضع رابط اللاعب من FUTBIN أو FUT.GG (أو ID)" class="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600 focus:bg-white transition shadow-2xs">
                        <button id="btn_fetch_trio_1" onclick="fetchPlayerForTrio(1)" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs">
                            <span>سحب</span>
                            <span>⚡</span>
                        </button>
                        <label class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1" title="رفع صورة كرت من جهازك">
                            <span>📁</span>
                            <span class="text-[10px] font-bold hidden sm:inline">رفع</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(1, this)">
                        </label>
                    </div>

                    <!-- Price Tag Input -->
                    <div class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-[10px] font-black text-slate-600 shrink-0">💰 السعر تحت الكرت:</span>
                        <input type="text" id="input_trio_price_1" value="${appState.card1_price || ''}" placeholder="مثال: ~8,500 كوينز" oninput="setTrioPlayerPrice(1, this.value)" class="flex-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 transition">
                    </div>

                    <!-- Starter Beasts Quick Pills -->
                    <div>
                        <div class="text-[10px] text-emerald-800 font-bold mb-1 flex items-center gap-1">
                            <span>🌟 وحوش بداية اللعبة (Starter Beasts):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${starPresets.map(s => `
                                <button onclick="setTrioPlayer(1, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Stars Quick Pills -->
                    <div class="pt-1.5 border-t border-slate-100">
                        <div class="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1">
                            <span>👑 نجوم النخبة (Top Stars):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${topPresets.map(s => `
                                <button onclick="setTrioPlayer(1, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-amber-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-600 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- PLAYER 2 (Center Card Front 👑) -->
                <div class="p-3 rounded-xl bg-amber-50/40 border border-amber-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center">2</span>
                            <span class="text-xs font-black text-amber-900">اللاعب 2 (الأوسط - البارز في المقدمة 👑):</span>
                        </div>
                        <span class="text-[10.5px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full" id="trio_name_2">
                            ${appState.card2_name || 'عثمان ديمبيلي (86)'}
                        </span>
                    </div>

                    <!-- Input + Fetch + Upload -->
                    <div class="flex gap-1.5">
                        <input type="text" id="input_trio_url_2" placeholder="ضع رابط اللاعب من FUTBIN أو FUT.GG (أو ID)" class="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 text-slate-900 text-[11px] outline-none focus:border-amber-500 transition shadow-2xs">
                        <button id="btn_fetch_trio_2" onclick="fetchPlayerForTrio(2)" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs">
                            <span>سحب</span>
                            <span>⚡</span>
                        </button>
                        <label class="px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1" title="رفع صورة كرت من جهازك">
                            <span>📁</span>
                            <span class="text-[10px] font-bold hidden sm:inline">رفع</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(2, this)">
                        </label>
                    </div>

                    <!-- Price Tag Input -->
                    <div class="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-amber-200">
                        <span class="text-[10px] font-black text-amber-900 shrink-0">💰 السعر تحت الكرت:</span>
                        <input type="text" id="input_trio_price_2" value="${appState.card2_price || ''}" placeholder="مثال: ~48,000 كوينز" oninput="setTrioPlayerPrice(2, this.value)" class="flex-1 px-2.5 py-1 rounded-lg bg-amber-50/50 border border-amber-300 text-slate-900 text-xs font-bold outline-none focus:border-amber-600 transition">
                    </div>

                    <!-- Starter Beasts Quick Pills -->
                    <div>
                        <div class="text-[10px] text-amber-900 font-bold mb-1 flex items-center gap-1">
                            <span>🌟 وحوش بداية اللعبة (Starter Beasts):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${starPresets.map(s => `
                                <button onclick="setTrioPlayer(2, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-600 hover:text-white border border-amber-200/80 text-[10px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Stars Quick Pills -->
                    <div class="pt-1.5 border-t border-amber-200/50">
                        <div class="text-[10px] text-amber-800 font-bold mb-1 flex items-center gap-1">
                            <span>👑 نجوم النخبة (Top Stars):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${topPresets.map(s => `
                                <button onclick="setTrioPlayer(2, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-600 hover:text-white border border-amber-200/80 text-[10px] font-bold text-slate-600 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- PLAYER 3 (Left Card) -->
                <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">3</span>
                            <span class="text-xs font-bold text-slate-800">اللاعب 3 (على اليسار / بالخلف):</span>
                        </div>
                        <span class="text-[10.5px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full" id="trio_name_3">
                            ${appState.card3_name || 'رافاييل لياو (86)'}
                        </span>
                    </div>

                    <!-- Input + Fetch + Upload -->
                    <div class="flex gap-1.5">
                        <input type="text" id="input_trio_url_3" placeholder="ضع رابط اللاعب من FUTBIN أو FUT.GG (أو ID)" class="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600 focus:bg-white transition shadow-2xs">
                        <button id="btn_fetch_trio_3" onclick="fetchPlayerForTrio(3)" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs">
                            <span>سحب</span>
                            <span>⚡</span>
                        </button>
                        <label class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1" title="رفع صورة كرت من جهازك">
                            <span>📁</span>
                            <span class="text-[10px] font-bold hidden sm:inline">رفع</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handleTrioFileUpload(3, this)">
                        </label>
                    </div>

                    <!-- Price Tag Input -->
                    <div class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-[10px] font-black text-slate-600 shrink-0">💰 السعر تحت الكرت:</span>
                        <input type="text" id="input_trio_price_3" value="${appState.card3_price || ''}" placeholder="مثال: ~38,000 كوينز" oninput="setTrioPlayerPrice(3, this.value)" class="flex-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 transition">
                    </div>

                    <!-- Starter Beasts Quick Pills -->
                    <div>
                        <div class="text-[10px] text-emerald-800 font-bold mb-1 flex items-center gap-1">
                            <span>🌟 وحوش بداية اللعبة (Starter Beasts):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${starPresets.map(s => `
                                <button onclick="setTrioPlayer(3, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-700 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Stars Quick Pills -->
                    <div class="pt-1.5 border-t border-slate-100">
                        <div class="text-[10px] text-slate-400 font-bold mb-1 flex items-center gap-1">
                            <span>👑 نجوم النخبة (Top Stars):</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${topPresets.map(s => `
                                <button onclick="setTrioPlayer(3, '${s.imageUrl}', '${s.arName} (${s.rating})', '${s.price || ''}')" class="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-amber-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-600 transition">
                                    ${s.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (currentTemplate === 'market_drop' || currentTemplate === 'potm') {
        // Single Card Scraper for Market Drop & POTM
        html += `
            <div class="mb-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>سحب كرت اللاعب (FUTBIN / FUT.GG):</span>
                    </span>
                    <span class="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black">FC 27 الرسمي</span>
                </div>
                <div class="flex gap-2">
                    <input type="text" id="futUrlInput" 
                           onkeydown="if(event.key==='Enter') document.getElementById('btnFetchFut').click()"
                           placeholder="الصق رابط FUTBIN أو FUT.GG أو اسم اللاعب (مثلاً: bouaddi)" 
                           class="flex-1 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs">
                    <button id="btnFetchFut" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition flex items-center gap-1 shrink-0 shadow-sm cursor-pointer">
                        <span>سحب الكرت</span>
                        <span>⚡</span>
                    </button>
                </div>

                <div class="flex items-center justify-between pt-2 mt-2 border-t border-emerald-200/60">
                    <span class="text-[11px] font-bold text-slate-600">أو رفع صورة الكرت مباشرة:</span>
                    <label class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-emerald-300 text-emerald-800 text-xs font-black cursor-pointer transition flex items-center gap-1.5 shadow-xs">
                        <span>📁 رفع صورة كرت</span>
                        <input type="file" id="directCardFileInput" accept="image/*" class="hidden" onchange="handleSingleCardUpload(this)">
                    </label>
                </div>

                <div class="mt-3 pt-2 border-t border-emerald-200/60">
                    <div class="text-[11px] text-slate-600 font-bold mb-1.5">أبرز نجوم FC 27 بنقرة واحدة:</div>
                    <div class="flex flex-wrap gap-1.5">
                        ${POPULAR_FUTGG_STARS.map(star => `
                            <button class="quick-star-btn px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[11px] font-bold text-slate-700 transition shadow-xs cursor-pointer" data-url="${star.url}">
                                ${star.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Background Theme Selector (suite_posts only)
    if (window.currentStudioSuite === 'suite_posts' && currentTemplate !== 'showcase') {
        html += `
            <div class="mb-4">
                <label class="block text-xs text-slate-600 font-bold mb-1.5">خلفية التصميم:</label>
                <div class="grid grid-cols-2 gap-2">
                    <button class="bg-theme-btn ${appState.bgTheme === 'store' ? 'active ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-400' : 'bg-white border-slate-200'} px-3 py-2 rounded-xl border text-xs font-bold transition text-center shadow-xs" data-theme="store">
                        <div class="text-slate-900 font-black">🏛️ رخام المتجر الرسمي (SC)</div>
                        <div class="text-[10px] text-emerald-700 font-bold">مع الشعار وFC 27</div>
                    </button>
                    <button class="bg-theme-btn ${appState.bgTheme === 'dark' ? 'active ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-400' : 'bg-white border-slate-200'} px-3 py-2 rounded-xl border text-xs font-bold transition text-center shadow-xs" data-theme="dark">
                        <div class="text-slate-900 font-black">⚡ أرينا الجيمرز الداكنة</div>
                        <div class="text-[10px] text-slate-500">ثيم ليزر ونيون</div>
                    </button>
                </div>
            </div>
        `;
    }


    // Typography Font Family Selector (خط ثمانية / خط زين / خط الإسكندرية الافتراضي)
    const currentFont = appState.fontFamily || 'alexandria';
    html += `
        <div class="mb-4 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">🔤</span>
                    <span class="text-xs font-black text-slate-900">نوع الخط العربي (Typography):</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">3 خطوط معتمدة</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <!-- 1. Alexandria (Current Default) -->
                <button type="button" onclick="setFontFamily('alexandria')" class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${currentFont === 'alexandria' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                    <div class="flex items-center justify-between w-full mb-1">
                        <span class="text-xs font-black text-slate-900 font-preview-alexandria">خط الإسكندرية</span>
                        ${currentFont === 'alexandria' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                    </div>
                    <div class="text-[10px] text-slate-500 font-preview-alexandria mb-1.5">الخط الحالي الأساسي</div>
                    <div class="text-[11px] font-black text-emerald-700 font-preview-alexandria truncate">شحن كوينز فوري وآمن</div>
                </button>

                <!-- 2. Thmanyah Font -->
                <button type="button" onclick="setFontFamily('thmanyah')" class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${currentFont === 'thmanyah' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                    <div class="flex items-center justify-between w-full mb-1">
                        <span class="text-xs font-black text-slate-900 font-preview-thmanyah">خط ثمانية</span>
                        ${currentFont === 'thmanyah' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                    </div>
                    <div class="text-[10px] text-slate-500 font-preview-thmanyah mb-1.5">Thmanyah Sans</div>
                    <div class="text-[11px] font-black text-emerald-700 font-preview-thmanyah truncate">شحن كوينز فوري وآمن</div>
                </button>

                <!-- 3. Zain Font -->
                <button type="button" onclick="setFontFamily('zain')" class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer ${currentFont === 'zain' ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs' : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'}">
                    <div class="flex items-center justify-between w-full mb-1">
                        <span class="text-xs font-black text-slate-900 font-preview-zain">خط زين (Zain)</span>
                        ${currentFont === 'zain' ? '<span class="text-xs text-emerald-600 font-black">✓</span>' : ''}
                    </div>
                    <div class="text-[10px] text-slate-500 font-preview-zain mb-1.5">Zain Font Google</div>
                    <div class="text-[11px] font-black text-emerald-700 font-preview-zain truncate">شحن كوينز فوري وآمن</div>
                </button>
            </div>
        </div>
    `;

    // Editable Inputs
    html += `
        <!-- EA FC 27 Official Theme Quick Preset Banner -->
        <div class="mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-md flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <span class="text-emerald-400 text-sm font-black">▲</span>
                <div>
                    <div class="text-xs font-black text-white flex items-center gap-1.5">
                        <span>هوية EA FC 27 الرسمية</span>
                        <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] text-emerald-400 font-mono">NEW</span>
                    </div>
                    <div class="text-[10px] text-slate-400 font-medium">ألوان Pitch Green و Boot Black وهندسة المثلثات</div>
                </div>
            </div>
            <button type="button" onclick="applyFc27Theme()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00FFA3] to-[#00F0FF] text-slate-950 text-xs font-black shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer">تطبيق الهوية ⚡</button>
        </div>
        <div class="space-y-4">
    `;

    if (currentTemplate === 'showcase') {
        html += `
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">شارة الحدث العلوية (Badge Pill)</label>
                <input type="text" id="input_badgeText" value="${appState.badgeText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">العنوان التسويقي الرئيسي (Headline)</label>
                <input type="text" id="input_headline" value="${appState.headline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">العنوان الفرعي وتفاصيل العرض (Subheadline)</label>
                <input type="text" id="input_subheadline" value="${appState.subheadline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs text-slate-600 font-bold mb-1">🪙 سعر الكرت بالسوق</label>
                    <input type="text" id="input_marketPrice" value="${appState.marketPrice || '2,450,000 كوينز'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-emerald-800 font-mono text-xs font-black focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
                </div>
                <div>
                    <label class="block text-xs text-slate-600 font-bold mb-1">🏷️ كود الخصم</label>
                    <input type="text" id="input_promoCode" value="${appState.promoCode || 'كود خصم: SC15'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 font-mono text-xs font-black focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
                </div>
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">⚡ عرض المتجر وسرعة الشحن</label>
                <input type="text" id="input_storeOffer" value="${appState.storeOffer || 'تسليم فوري خلال دقائق بضمان 100% من الباند'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
            </div>
        `;
    } else if (currentTemplate === 'trio') {


        html += `
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">شارة الترويسة</label>
                <input type="text" id="input_badgeText" value="${appState.badgeText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">العنوان الرئيسي</label>
                <input type="text" id="input_headline" value="${appState.headline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">الوصف وعروض الشحن</label>
                <input type="text" id="input_subheadline" value="${appState.subheadline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">زر الطلب بالخاص (CTA)</label>
                <input type="text" id="input_ctaText" value="${appState.ctaText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs">
            </div>
        `;
    } else if (currentTemplate === 'market_drop') {
        html += `
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs text-slate-600 font-bold mb-1">السعر السابق (مشطوب ❌)</label>
                    <input type="text" id="input_oldPrice" value="${appState.oldPrice || '3,200,000'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
                </div>
                <div>
                    <label class="block text-xs text-slate-600 font-bold mb-1">السعر الحالي (بعد النزول 📉)</label>
                    <input type="text" id="input_newPrice" value="${appState.newPrice || '2,450,000'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-emerald-700 text-xs font-mono font-black focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
                </div>
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">شارة التوفير الفوري</label>
                <input type="text" id="input_savingBadge" value="${appState.savingBadge || 'وفر 750,000 كوينز الآن! 📉'}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">العنوان الرئيسي</label>
                <input type="text" id="input_headline" value="${appState.headline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">الوصف التحفيزي للشحن</label>
                <input type="text" id="input_subheadline" value="${appState.subheadline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
            </div>
            <div>
                <label class="block text-xs text-slate-600 font-bold mb-1">زر الطلب بالخاص (CTA)</label>
                <input type="text" id="input_ctaText" value="${appState.ctaText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-xs">
            </div>
        `;
    } else if (currentTemplate === 'market_tracker') {
        html += renderMarketTrackerControls();
    } else if (currentTemplate === 'promo_pack') {
        html += renderPromoPackControls();
    } else if (currentTemplate === 'champs_squad') {
        html += renderChampsSquadControls();
    } else if (currentTemplate === 'evo_boost') {
        html += renderEvoBoostControls();
    } else if (currentTemplate === 'social_proof') {
        html += renderSocialProofControls();
    } else if (currentTemplate === 'flash_sale') {
        html += renderFlashSaleControls();
    } else if (currentTemplate === 'loaded_accounts') {
        html += renderLoadedAccountsControls();
    } else if (currentTemplate === 'squad_makeover') {
        html += renderSquadMakeoverControls();
    } else if (currentTemplate === 'player_duel') {
        html += renderPlayerDuelControls();
    } else if (currentTemplate === 'budget_beast') {
        html += renderBudgetBeastControls();
    } else if (currentTemplate === 'player_review') {
        html += renderPlayerReviewControls();
    } else if (currentTemplate === 'custom_story') {
        html += renderCustomStoryControls();
    } else if (currentTemplate === 'sbc') {
        const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
            ? appState.banners 
            : (TEMPLATES.sbc?.defaultState?.banners || [
                { text: 'أقوى ترقية باللعبة الآن 🔥😁', bg: '#0084FF', color: '#FFFFFF' },
                { text: 'نسويلك الكمية الي تبيها و بأسعار ممتازة جداً 🚨', bg: '#E50914', color: '#FFFFFF' },
                { text: 'وسرعة كبيره بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
                { text: 'متوفر من 50 ترقية لين 1000 ترقية وكل مازادت الترقيات قل السعر 👌', bg: '#FFE0B2', color: '#B45309' },
                { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
            ]);

        html += `
            <div class="space-y-4">
                <!-- 1. Background Theme Selector -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <label class="block text-xs font-black text-slate-800 mb-2">خلفية الستوري:</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="setStorePromoBgTheme('store')" class="p-2 rounded-xl text-center font-bold text-xs border transition ${appState.bgTheme === 'store' || !appState.bgTheme ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-1 ring-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            🏟️ خلفية المتجر الرسمية
                        </button>
                        <button type="button" onclick="setStorePromoBgTheme('dark')" class="p-2 rounded-xl text-center font-bold text-xs border transition ${appState.bgTheme === 'dark' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-1 ring-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            🌌 خلفية داكنة فخمة
                        </button>
                    </div>
                </div>

                <!-- 2. SBC Asset / Full Website Challenge Card -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>🎮</span>
                            <span>بطاقة وتصميم التحدي من الموقع أو اللعبة:</span>
                        </span>
                        <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full" id="sbc_title_badge">
                            ${appState.sbcTitle || 'Marquee Matchups'}
                        </span>
                    </div>

                    <!-- Fetch by link input (Captures COMPLETE CARD via Puppeteer) -->
                    <div class="space-y-1.5">
                        <div class="flex gap-1.5">
                            <input type="text" id="sbcUrlInput" placeholder="الصق رابط صفحة التحدي من FUT.GG (مثل /sbc/challenges/...)" 
                                   onkeydown="if(event.key==='Enter') fetchSbcAssetFromLink()"
                                   class="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-600 focus:bg-white transition shadow-2xs">
                            <button id="btnFetchSbc" type="button" onclick="fetchSbcAssetFromLink()" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shrink-0 flex items-center gap-1 shadow-md shadow-emerald-600/20">
                                <span>⚡ سحب البطاقة كاملة</span>
                            </button>
                        </div>
                        <p class="text-[10px] text-slate-500 font-medium">💡 يسحب التصميم كاملاً من صفحة التحدي على FUT.GG بدقة عالية وشكل متطابق 100%.</p>
                    </div>

                    <!-- Direct File Upload & Paste Hint -->
                    <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <input type="file" id="sbcFileInput" accept="image/*" class="hidden" onchange="handleSbcFileUpload(event)">
                        <button type="button" onclick="document.getElementById('sbcFileInput').click()" class="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition flex items-center justify-center gap-1.5 border border-slate-200">
                            <span>📁 رفع لقطة شاشة من جهازك</span>
                        </button>
                        <span class="text-[11px] text-slate-600 font-bold bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                            أو اضغط <kbd class="px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-emerald-300 font-mono font-black text-[11px]">Ctrl+V</kbd> للصق
                        </span>
                    </div>

                    <!-- Quick SBC Presets (Exact Matches from Site & App) -->
                    <div class="pt-2 border-t border-slate-100">
                        <div class="text-[10.5px] text-slate-600 font-black mb-1.5 flex items-center justify-between">
                            <span>⚡ بطاقات جاهزة بنقرة واحدة (1-Click Presets):</span>
                            <span class="text-[9.5px] text-emerald-700 font-bold">100% تصميم الموقع الرسمي</span>
                        </div>
                        <div class="grid grid-cols-2 gap-1.5">
                            <button type="button" onclick="applyQuickSbcPreset('marquee')" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-right text-[11px] font-black text-slate-800 transition flex items-center gap-1.5 cursor-pointer">
                                <span>📦</span>
                                <span class="truncate">مباريات القمة (نفس لقطة الشاشة)</span>
                            </button>
                            <button type="button" onclick="applyQuickSbcPreset('league_nation')" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-right text-[11px] font-black text-slate-800 transition flex items-center gap-1.5 cursor-pointer">
                                <span>🌐</span>
                                <span class="truncate">League & Nation (FUT.GG)</span>
                            </button>
                            <button type="button" onclick="applyQuickSbcPreset('futgg_marquee')" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-right text-[11px] font-black text-slate-800 transition flex items-center gap-1.5 cursor-pointer">
                                <span>🔥</span>
                                <span class="truncate">مباريات القمة (FUT.GG)</span>
                            </button>
                            <button type="button" onclick="applyQuickSbcPreset('81_pick')" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-right text-[11px] font-black text-slate-800 transition flex items-center gap-1.5 cursor-pointer">
                                <span>🌟</span>
                                <span class="truncate">ترقية 81+ Player Pick</span>
                            </button>
                        </div>
                    </div>

                    <!-- Sliders for Scaling and Vertical Positioning -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 pt-2">
                        <div>
                            <div class="flex justify-between text-[10.5px] font-bold text-slate-600 mb-1">
                                <span>حجم صورة التحدي:</span>
                                <span id="label_sbcScale" class="text-emerald-700 font-mono font-black">${appState.sbcScale || 100}%</span>
                            </div>
                            <input type="range" min="50" max="150" step="5" value="${appState.sbcScale || 100}" oninput="setSbcScale(this.value)" class="w-full accent-emerald-600 cursor-pointer">
                        </div>
                        <div>
                            <div class="flex justify-between text-[10.5px] font-bold text-slate-600 mb-1">
                                <span>الموقع الرأسي (Y):</span>
                                <span id="label_sbcPosY" class="text-emerald-700 font-mono font-black">${appState.sbcPosY || 15}px</span>
                            </div>
                            <input type="range" min="-60" max="80" step="5" value="${appState.sbcPosY || 15}" oninput="setSbcPosY(this.value)" class="w-full accent-emerald-600 cursor-pointer">
                        </div>
                    </div>
                </div>

                <!-- 3. SBC Stacked Banners & Presets Card -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                            <div class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                <span>⭐</span>
                                <span>قوالبي وأنماط شرائط الـ SBC:</span>
                            </div>
                            <div class="text-[10px] text-slate-500 font-medium">احفظ وعدّل أنماط الشرائط بضغطة زر</div>
                        </div>
                        <button type="button" onclick="openSavePromoPresetModal()" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[10.5px] transition shadow-xs flex items-center gap-1">
                            <span>➕</span>
                            <span>حفظ كقالب جديد 💾</span>
                        </button>
                    </div>

                    <!-- User Custom SBC Presets Grid -->
                    <div>
                        <div class="text-[10.5px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                            <span class="flex items-center gap-1">
                                <span class="text-amber-500">⭐</span>
                                <span>قوالبي المخصصة لتحديات الـ SBC:</span>
                            </span>
                            <span class="text-[9.5px] text-slate-400">محفوظة بجهازك</span>
                        </div>
                        ${(() => {
                            const customPresets = window.getPromoPresets();
                            if (customPresets.length === 0) {
                                return `
                                    <div class="p-3 rounded-xl border-2 border-dashed border-emerald-300/80 bg-emerald-50/40 text-center">
                                        <div class="text-[11px] font-black text-emerald-900">لم تقم بحفظ أي قالب مخصص للـ SBC بعد 🌟</div>
                                        <p class="text-[10px] text-slate-600 mt-1 leading-relaxed">عدّل نصوص وألوان الشرائط وصورة التحدي، ثم اضغط <strong>"حفظ كقالب جديد 💾"</strong> بالأعلى ليُحفظ هنا للأبد!</p>
                                    </div>
                                `;
                            }
                            return `
                                <div class="grid grid-cols-2 gap-2">
                                    ${customPresets.map(p => {
                                        const isActive = window.activePromoPresetId === p.id;
                                        return `
                                            <div class="group relative p-2.5 rounded-xl ${isActive ? 'bg-emerald-100/90 border-2 border-emerald-500 shadow-sm' : 'bg-emerald-50/60 hover:bg-emerald-100/50 border border-emerald-200'} text-right transition cursor-pointer" onclick="applyCustomPromoPreset('${p.id}')">
                                                <div class="flex items-start justify-between gap-1 mb-1.5">
                                                    <span class="text-[11.5px] font-black ${isActive ? 'text-emerald-950' : 'text-slate-900'} truncate flex-1 flex items-center gap-1">
                                                        <span>⭐</span>
                                                        <span>${p.name}</span>
                                                    </span>
                                                    <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
                                                        <button type="button" onclick="updateCurrentPromoPreset('${p.id}', event)" class="p-1 text-[11px] text-emerald-700 hover:text-emerald-900 rounded hover:bg-emerald-200/70 transition" title="تحديث القالب">🔄</button>
                                                        <button type="button" onclick="deleteCustomPromoPreset('${p.id}', event)" class="p-1 text-[11px] text-red-500 hover:text-red-700 rounded hover:bg-red-100 transition" title="حذف القالب">🗑️</button>
                                                    </div>
                                                </div>
                                                <div class="flex items-center gap-1 mb-1.5 flex-wrap">
                                                    ${(p.banners || []).slice(0, 5).map(b => `
                                                        <span class="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs inline-block" style="background-color: ${b.bg || '#0084FF'};" title="${b.text || ''}"></span>
                                                    `).join('')}
                                                </div>
                                                <div class="text-[9.5px] ${isActive ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'} flex items-center justify-between">
                                                    <span>${(p.banners || []).length} شرائط ملونة</span>
                                                    <span class="text-[9px] text-emerald-700 underline font-black">تطبيق ↵</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `;
                        })()}
                    </div>

                    <!-- 4. Stacked Banners List Editor -->
                    <div class="pt-2 border-t border-slate-100 space-y-2">
                        <div class="flex items-center justify-between pb-1">
                            <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                <span>📝</span>
                                <span>شرائط نصوص التحدي (Instagram Stickers):</span>
                            </span>
                            <button type="button" onclick="addPromoBanner()" class="px-2.5 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-black border border-emerald-200 transition">
                                + شريط جديد
                            </button>
                        </div>

                        <!-- Quick Emoji Bar -->
                        <div class="flex items-center gap-1 overflow-x-auto py-1 px-1.5 bg-slate-100/90 rounded-xl border border-slate-200 text-sm no-scrollbar">
                            <span class="text-[9.5px] font-black text-slate-500 shrink-0 ml-1">إيموجي سريع:</span>
                            ${['🔥','⚡','👑','🤩','🥳','👏','💰','🪙','⬇️','🔒','🎮','⚽','📩','✨','🏆','💯','🚀','💎','🎯','💥'].map(em => `
                                <button type="button" onclick="insertEmojiIntoActiveBanner('${em}')" class="w-6 h-6 rounded-md bg-white hover:bg-emerald-100 hover:scale-115 active:scale-90 text-sm flex items-center justify-center transition shadow-2xs cursor-pointer shrink-0" title="إدراج ${em}">
                                    ${em}
                                </button>
                            `).join('')}
                        </div>

                        <div class="space-y-2">
                            ${banners.map((b, idx) => `
                                <div class="space-y-1.5">
                                    <div class="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center gap-1.5 transition hover:border-slate-300">
                                        <div class="flex items-center gap-1 shrink-0">
                                            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs">${idx + 1}</span>
                                            <div class="flex flex-col gap-0.5">
                                                <button type="button" onclick="movePromoBannerUp(${idx})" ${idx === 0 ? 'disabled class="w-4 h-3 rounded bg-slate-100 text-slate-300 text-[8px] flex items-center justify-center cursor-not-allowed"' : 'class="w-4 h-3 rounded bg-slate-200 hover:bg-emerald-500 hover:text-white text-slate-700 text-[8px] font-black flex items-center justify-center transition cursor-pointer active:scale-90"'} title="رفع الشريط للأعلى (تقديم)">▲</button>
                                                <button type="button" onclick="movePromoBannerDown(${idx})" ${idx === banners.length - 1 ? 'disabled class="w-4 h-3 rounded bg-slate-100 text-slate-300 text-[8px] flex items-center justify-center cursor-not-allowed"' : 'class="w-4 h-3 rounded bg-slate-200 hover:bg-emerald-500 hover:text-white text-slate-700 text-[8px] font-black flex items-center justify-center transition cursor-pointer active:scale-90"'} title="تنزيل الشريط للأسفل (تأخير)">▼</button>
                                            </div>
                                        </div>
                                        <div class="relative flex-1 flex items-center">
                                            <input type="text" id="sbcBannerInput_${idx}" value="${(b.text || '').replace(/"/g, '&quot;')}" oninput="updatePromoBannerText(${idx}, this.value)" onfocus="window.lastFocusedBannerIdx = ${idx}" placeholder="نص شريط التحدي..." class="w-full pl-7 pr-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                            <button type="button" onclick="toggleEmojiPickerForBanner(${idx})" class="absolute left-1.5 p-0.5 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-500 text-xs transition cursor-pointer" title="لوحة الإيموجي">😀</button>
                                        </div>
                                        <input type="color" value="${b.bg || '#0084FF'}" oninput="updatePromoBannerBg(${idx}, this.value)" class="w-7 h-7 rounded cursor-pointer border-0 p-0 shrink-0 shadow-2xs" title="لون خلفية الشريط">
                                        <button type="button" onclick="togglePromoBannerColor(${idx})" class="px-2 py-1 rounded text-[10px] font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs" title="تبديل لون الخط بين الأبيض والأسود">
                                            ${(b.color || '').toUpperCase() === '#FFFFFF' ? '⚪' : '⚫'}
                                        </button>
                                        ${banners.length > 1 ? `
                                        <button type="button" onclick="removePromoBanner(${idx})" class="w-6 h-6 rounded bg-red-50 hover:bg-red-500 hover:text-white text-red-600 text-xs font-black transition flex items-center justify-center shrink-0" title="حذف الشريط">✕</button>
                                        ` : ''}
                                    </div>

                                    ${window.activeEmojiPickerIdx === idx ? `
                                    <div class="p-2 rounded-xl bg-white border border-amber-300 shadow-md flex flex-wrap gap-1 items-center animate-fadeIn">
                                        <div class="w-full flex items-center justify-between pb-1 border-b border-slate-100 mb-0.5">
                                            <span class="text-[10px] font-black text-amber-900">اختر إيموجي للشريط (${idx + 1}):</span>
                                            <button type="button" onclick="toggleEmojiPickerForBanner(${idx})" class="text-[9.5px] font-bold text-slate-400 hover:text-red-500 px-1">إغلاق ✕</button>
                                        </div>
                                        ${['🔥','⚡','👑','🤩','🥳','👏','💰','🪙','⬇️','🔒','🎮','⚽','📩','✨','🏆','💯','🚀','💎','🎯','💥','📦','🛡️','🤝','💬','📢','🏷️','🚨','⏳','💪','👀','🤍','🖤','💙','💚','💛','❤️'].map(em => `
                                            <button type="button" onclick="insertEmojiIntoBanner(${idx}, '${em}')" class="w-7 h-7 rounded-lg hover:bg-amber-100 hover:scale-115 active:scale-95 text-base flex items-center justify-center transition cursor-pointer" title="إدراج ${em}">
                                                ${em}
                                            </button>
                                        `).join('')}
                                    </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>

                        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                            <span class="font-bold flex items-center gap-1 text-slate-700">
                                <span>↕️</span>
                                <span>موضع قسم الشرائط على التصميم:</span>
                            </span>
                            <div class="flex items-center gap-1.5">
                                <button type="button" onclick="nudgeLayerY('layer_sbc_banners', -15)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold text-[10.5px] border border-slate-200 transition active:scale-95" title="رفع قسم الشرائط للأعلى">
                                    ⬆️ رفع للأعلى
                                </button>
                                <button type="button" onclick="nudgeLayerY('layer_sbc_banners', 15)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold text-[10.5px] border border-slate-200 transition active:scale-95" title="تنزيل قسم الشرائط للأسفل">
                                    ⬇️ تنزيل للأسفل
                                </button>
                                <button type="button" onclick="resetLayerY('layer_sbc_banners', 40)" class="px-1.5 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-200 text-slate-500 font-bold text-[10px] border border-slate-200 transition" title="إعادة الموضع الافتراضي">
                                    ↺
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (currentTemplate === 'potm') {
        const leagueKey = appState.league || 'pl';
        const curLeague = (window.POTM_LEAGUES && window.POTM_LEAGUES[leagueKey]) || {
            name: 'الدوري الإنجليزي (Premier League)',
            shortName: 'Premier League',
            badge: '🦁 الدوري الإنجليزي الممتاز',
            accent: '#00ff85',
            accentBg: '#38003c',
            textColor: '#00ff85'
        };
        const potmStars = window.POPULAR_POTM_STARS || [];

        html += `
            <div class="space-y-4">
                <!-- 1. Background Theme Selector -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <label class="block text-xs font-black text-slate-800 mb-2">خلفية التصميم:</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="setStorePromoBgTheme('store')" class="p-2 rounded-xl text-center font-bold text-xs border transition ${appState.bgTheme === 'store' || !appState.bgTheme ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-1 ring-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            🏟️ خلفية المتجر + هالة الدوري
                        </button>
                        <button type="button" onclick="setStorePromoBgTheme('dark')" class="p-2 rounded-xl text-center font-bold text-xs border transition ${appState.bgTheme === 'dark' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-1 ring-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            🌌 خلفية داكنة فخمة
                        </button>
                    </div>
                </div>

                <!-- 2. Official Leagues Selector (5 Major Leagues) -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>🏆</span>
                            <span>الدوري الرسمي لجائزة لاعب الشهر (POTM):</span>
                        </span>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded-full border" style="color: ${curLeague.textColor || '#00ff85'}; background-color: ${curLeague.accentBg || '#38003c'}; border-color: ${curLeague.accent || '#00ff85'};">
                            ${curLeague.shortName || 'Premier League'}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        ${Object.keys(window.POTM_LEAGUES || {}).map(k => {
                            const l = window.POTM_LEAGUES[k];
                            const isAct = k === leagueKey;
                            return `
                                <button type="button" onclick="setPotmLeague('${k}')" class="p-2.5 rounded-xl border text-right transition flex flex-col justify-between gap-1 cursor-pointer ${isAct ? 'ring-2 ring-emerald-500 bg-slate-950 text-white border-transparent shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                                    <div class="text-[11px] font-black leading-snug">${l.badge}</div>
                                    <div class="text-[9.5px] font-mono opacity-85" style="color: ${isAct ? l.accent : 'inherit'};">${l.shortName}</div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 3. Quick 1-Click Popular POTM Stars -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>⭐</span>
                            <span>كروت نجوم الشهر الجاهزة (1-Click Presets):</span>
                        </span>
                        <span class="text-[10px] text-slate-400 font-bold">نقرة واحدة للتطبيق</span>
                    </div>

                    <div class="flex flex-wrap gap-1.5">
                        ${potmStars.map((star, sIdx) => {
                            const isCur = appState.playerArName === star.arName || (appState.playerName && appState.playerName.includes(star.arName));
                            return `
                                <button type="button" onclick="setPotmStar(${sIdx})" class="px-3 py-1.5 rounded-xl text-xs font-black transition border shadow-2xs flex items-center gap-1.5 cursor-pointer ${isCur ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'}">
                                    <span>${star.name}</span>
                                    <span class="text-[10px] font-mono opacity-80 px-1 py-0.2 rounded bg-black/10">${star.rating}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 4. FUT.GG / FUTBIN Card Link Fetcher & Direct Upload -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <span>🎮</span>
                            <span>سحب كرت اللاعب من FUT.GG أو FUTBIN:</span>
                        </span>
                        <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            ${appState.playerArName || appState.playerName || 'بطاقة اللاعب'}
                        </span>
                    </div>

                    <div class="space-y-1.5">
                        <div class="flex gap-1.5">
                            <input type="text" id="potmUrlInput" placeholder="الصق رابط كرت اللاعب من FUT.GG أو FUTBIN (أو ID)..." 
                                   onkeydown="if(event.key==='Enter') fetchPotmCardFromLink()"
                                   class="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-600 focus:bg-white transition shadow-2xs">
                            <button id="btnFetchPotm" type="button" onclick="fetchPotmCardFromLink()" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shrink-0 flex items-center gap-1 shadow-md shadow-emerald-600/20 cursor-pointer">
                                <span>سحب 🔍</span>
                            </button>
                        </div>
                        <p class="text-[10px] text-slate-400">💡 يقبل أي رابط لبطاقة اللاعب من FUT.GG أو FUTBIN لجلب الصورة بجودة HD وتفريغ شفاف تلقائي.</p>
                    </div>

                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-600">أو رفع صورة البطاقة يدوياً من جهازك:</span>
                        <label class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center gap-1.5">
                            <span>📁 اختر صورة</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handlePotmDirectUpload(this)">
                        </label>
                    </div>
                </div>

                <!-- 5. Content & Market Cost Inputs -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <span class="text-xs font-black text-slate-800 block pb-1 border-b border-slate-100">📝 نصوص وتفاصيل إعلان لاعب الشهر:</span>
                    
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">شارة الترويسة (الدوري وجائزة الشهر)</label>
                        <input type="text" id="input_badgeText" value="${appState.badgeText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">العنوان الرئيسي</label>
                        <input type="text" id="input_headline" value="${appState.headline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">🪙 تكلفة التحدي في السوق وعدد التشكيلات</label>
                        <input type="text" id="input_sbcCost" value="${appState.sbcCost || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-emerald-800 text-xs font-mono font-bold focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">🛡️ عرض المتجر لتقفيل التحدي وتوفير الكوينز</label>
                        <input type="text" id="input_storeOffer" value="${appState.storeOffer || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">تفاصيل الضمان وسرعة التسليم</label>
                        <input type="text" id="input_subheadline" value="${appState.subheadline || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-600 font-bold mb-1">زر الإجراء والطلب بالخاص (CTA)</label>
                        <input type="text" id="input_ctaText" value="${appState.ctaText || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-emerald-500 focus:bg-white outline-none shadow-2xs">
                    </div>
                </div>
            </div>
        `;
    }



    // Box & Button Customization Card (Only for templates with info box and CTA button like trio/market_drop, excluded for promo_pack, market_tracker, champs_squad)
    if (currentTemplate !== 'promo_pack' && currentTemplate !== 'store_promo' && currentTemplate !== 'sbc' && currentTemplate !== 'showcase' && currentTemplate !== 'market_tracker' && currentTemplate !== 'champs_squad') {
        html += `
            <div class="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>🔲</span>
                        <span>تخصيص أحجام وشكل البوكسات والأزرار</span>
                    </span>
                    <button type="button" onclick="resetBoxStyles()" class="text-[10px] text-slate-400 hover:text-slate-700 font-bold px-2 py-0.5 rounded-lg hover:bg-slate-100 transition">إعادة ضبط ↺</button>
                </div>

                <!-- Box Width Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>📏 عرض الصندوق الخلفي:</span>
                        <span id="label_boxWidth" class="text-emerald-600 font-mono font-black">${appState.boxWidth || 380}px</span>
                    </div>
                    <input type="range" id="slider_boxWidth" min="260" max="440" step="5" value="${appState.boxWidth || 380}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBoxWidth(this.value)">
                </div>

                <!-- Box Padding Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>↕️ ارتفاع وحشوة الصندوق:</span>
                        <span id="label_boxPadding" class="text-emerald-600 font-mono font-black">${appState.boxPadding || 12}px</span>
                    </div>
                    <input type="range" id="slider_boxPadding" min="6" max="24" step="2" value="${appState.boxPadding || 12}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBoxPadding(this.value)">
                </div>

                <!-- Box Radius Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>🔘 استدارة الحواف (Border Radius):</span>
                        <span id="label_boxRadius" class="text-emerald-600 font-mono font-black">${appState.boxRadius || 16}px</span>
                    </div>
                    <input type="range" id="slider_boxRadius" min="4" max="32" step="2" value="${appState.boxRadius || 16}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBoxRadius(this.value)">
                </div>

                <!-- Box Style Buttons -->
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1.5">🎨 ثيم ولون الصندوق:</label>
                    <div class="grid grid-cols-4 gap-1.5 text-center">
                        <button type="button" onclick="setBoxStyle('dark')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${(appState.boxStyle || 'dark') === 'dark' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">🖤 أسود فخم</button>
                        <button type="button" onclick="setBoxStyle('light')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${appState.boxStyle === 'light' ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">🏛️ زجاجي فاتح</button>
                        <button type="button" onclick="setBoxStyle('neon')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${appState.boxStyle === 'neon' ? 'bg-slate-900 text-emerald-400 border-emerald-400 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">⚡ نيون المتجر</button>
                        <button type="button" onclick="setBoxStyle('none')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${appState.boxStyle === 'none' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">🚫 بدون بوكس</button>
                    </div>
                </div>

                <!-- Divider: CTA Button Controls -->
                <div class="pt-3 border-t border-slate-100 space-y-3">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>🔘</span>
                        <span>تخصيص زر الطلب (CTA Button)</span>
                    </span>
                    
                    <!-- CTA Scale Slider -->
                    <div>
                        <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                            <span>🔍 حجم وزوم الزر:</span>
                            <span id="label_ctaScale" class="text-emerald-600 font-mono font-black">${Math.round((appState.ctaScale || 1.0) * 100)}%</span>
                        </div>
                        <input type="range" id="slider_ctaScale" min="0.75" max="1.3" step="0.05" value="${appState.ctaScale || 1.0}" class="w-full accent-emerald-500 cursor-pointer" oninput="setCtaScale(this.value)">
                    </div>

                    <!-- CTA Padding X Slider -->
                    <div>
                        <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                            <span>↔️ عرض حشوة الزر:</span>
                            <span id="label_ctaPaddingX" class="text-emerald-600 font-mono font-black">${appState.ctaPaddingX || 24}px</span>
                        </div>
                        <input type="range" id="slider_ctaPaddingX" min="14" max="44" step="2" value="${appState.ctaPaddingX || 24}" class="w-full accent-emerald-500 cursor-pointer" oninput="setCtaPaddingX(this.value)">
                    </div>

                    <!-- CTA Theme Buttons -->
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1.5">🎨 لون زر الطلب:</label>
                        <div class="grid grid-cols-3 gap-1.5 text-center">
                            <button type="button" onclick="setCtaTheme('cyan')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${(appState.ctaTheme || 'cyan') === 'cyan' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 border-emerald-500 font-black shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">💎 تيركواز ونيون</button>
                            <button type="button" onclick="setCtaTheme('gold')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${appState.ctaTheme === 'gold' ? 'bg-gradient-to-r from-amber-300 to-emerald-400 text-slate-950 border-amber-400 font-black shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">👑 ذهبي وملكي</button>
                            <button type="button" onclick="setCtaTheme('neon_dark')" class="px-2 py-1.5 rounded-xl border text-[10px] font-bold transition ${appState.ctaTheme === 'neon_dark' ? 'bg-slate-950 text-emerald-400 border-emerald-400 font-black shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">⚡ أسود نيون</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Background Framing & Position Controls (تحريك وتكبير الخلفية - Excluded for promo_pack, market_tracker, champs_squad)
    if (currentTemplate !== 'promo_pack' && currentTemplate !== 'market_tracker' && currentTemplate !== 'champs_squad') {
        html += `
            <div class="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>🖼️</span>
                        <span>تحريك وتكبير الخلفية (Background Framing)</span>
                    </span>
                    <button type="button" onclick="resetBgPosition()" class="text-[10px] text-emerald-600 hover:text-emerald-700 font-black px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1 shadow-2xs">
                        <span>توسيط ↺</span>
                    </button>
                </div>

                <!-- Background Y Position Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>↕️ تحريك الخلفية عمودياً (أعلى / أسفل):</span>
                        <span id="label_bgPosY" class="text-emerald-600 font-mono font-black">${appState.bgPosY || 0}px</span>
                    </div>
                    <input type="range" id="slider_bgPosY" min="-250" max="250" step="5" value="${appState.bgPosY || 0}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBgPosY(this.value)">
                </div>

                <!-- Background X Position Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>↔️ تحريك الخلفية أفقياً (يمين / يسار):</span>
                        <span id="label_bgPosX" class="text-emerald-600 font-mono font-black">${appState.bgPosX || 0}px</span>
                    </div>
                    <input type="range" id="slider_bgPosX" min="-200" max="200" step="5" value="${appState.bgPosX || 0}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBgPosX(this.value)">
                </div>

                <!-- Background Zoom/Scale Slider -->
                <div>
                    <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>🔍 زوم وتكبير الخلفية (Scale):</span>
                        <span id="label_bgScale" class="text-emerald-600 font-mono font-black">${Math.round((appState.bgScale || 1.0) * 100)}%</span>
                    </div>
                    <input type="range" id="slider_bgScale" min="0.75" max="1.8" step="0.05" value="${appState.bgScale || 1.0}" class="w-full accent-emerald-500 cursor-pointer" oninput="setBgScale(this.value)">
                </div>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;

    // Toggle layer visibility
    container.querySelectorAll('.layer-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lk = btn.dataset.layer;
            if (appState.layers && appState.layers[lk]) {
                appState.layers[lk].visible = !appState.layers[lk].visible;
                renderControls();
                renderCanvas();
            }
        });
    });

    // Fetch FUT.GG Card
    const btnFetchFut = document.getElementById('btnFetchFut');
    if (btnFetchFut) {
        btnFetchFut.addEventListener('click', () => {
            const urlInput = document.getElementById('futUrlInput');
            if (urlInput) fetchFutGGCard(urlInput.value);
        });
    }

    container.querySelectorAll('.quick-star-btn').forEach(b => {
        b.addEventListener('click', () => {
            fetchFutGGCard(b.dataset.url);
        });
    });

    // Background Theme buttons
    container.querySelectorAll('.bg-theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            appState.bgTheme = btn.dataset.theme;
            container.querySelectorAll('.bg-theme-btn').forEach(b => {
                b.classList.remove('active');
                b.className = 'bg-theme-btn bg-white border-slate-200 px-3 py-2 rounded-xl border text-xs font-bold transition text-center shadow-xs';
            });
            btn.classList.add('active');
            btn.className = 'bg-theme-btn active ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-400 px-3 py-2 rounded-xl border text-xs font-bold transition text-center shadow-xs';
            renderCanvas();
        });
    });

    // Generic input changes
    container.querySelectorAll('input, select').forEach(input => {
        if (input.id === 'futUrlInput' || input.id.startsWith('slider_') || input.id.startsWith('input_trio_url_')) return;
        input.addEventListener('input', (e) => {
            const key = e.target.id.replace('input_', '');
            appState[key] = e.target.value;
            renderCanvas();
            updateCaption();
        });
    });
}

/* =========================================================================
   STORE PROMO TEMPLATE HELPERS (ستوري المتجر الأصلية والشرائط المكدسة)
   ========================================================================= */

window.setPromoCardCount = function(count) {
    appState.cardCount = parseInt(count, 10);
    renderControls();
    renderCanvas();
    if (window.showCopyToast) {
        window.showCopyToast(`تم ضبط كروت الحدث على ${count === 2 ? 'لاعبين اثنين (ثنائي) 👥' : '3 لاعبين (تريو) ⭐'}!`);
    }
};

window.setPromoBgTheme = function(theme) {
    appState.bgTheme = theme;
    renderCanvas();
    renderControls();
};

window.applyPromoThemePreset = function(presetKey) {
    const preset = window.STORE_BANNER_THEMES && window.STORE_BANNER_THEMES[presetKey];
    if (!preset) return;
    appState.banners = JSON.parse(JSON.stringify(preset.banners));
    renderCanvas();
    renderControls();
    if (window.showCopyToast) {
        window.showCopyToast(`تم تفعيل نمط "${preset.name}" بنجاح! 🎨`);
    }
};

window.updatePromoBannerText = function(index, text) {
    if (!appState.banners) appState.banners = [];
    if (!appState.banners[index]) appState.banners[index] = { text: '', bg: '#0084FF', color: '#FFFFFF' };
    appState.banners[index].text = text;
    renderCanvas();
};

window.updatePromoBannerBg = function(index, bg) {
    if (!appState.banners) appState.banners = [];
    if (!appState.banners[index]) appState.banners[index] = { text: '', bg: '#0084FF', color: '#FFFFFF' };
    appState.banners[index].bg = bg;
    renderCanvas();
};

window.togglePromoBannerColor = function(index) {
    if (!appState.banners || !appState.banners[index]) return;
    const current = appState.banners[index].color || '#FFFFFF';
    appState.banners[index].color = current.toUpperCase() === '#FFFFFF' ? '#1E293B' : '#FFFFFF';
    renderCanvas();
    renderControls();
};

window.addPromoBanner = function() {
    if (!appState.banners) appState.banners = [];
    if (appState.banners.length >= 6) return;
    appState.banners.push({ text: 'للطلب والاستفسار بالخاص حياكم 📩', bg: '#0084FF', color: '#FFFFFF' });
    renderCanvas();
    renderControls();
};

window.removePromoBanner = function(index) {
    if (!appState.banners || appState.banners.length <= 1) return;
    appState.banners.splice(index, 1);
    renderCanvas();
    renderControls();
};

window.movePromoBannerUp = function(index) {
    if (!appState.banners || index <= 0 || index >= appState.banners.length) return;
    const item = appState.banners.splice(index, 1)[0];
    appState.banners.splice(index - 1, 0, item);
    renderCanvas();
    renderControls();
};

window.movePromoBannerDown = function(index) {
    if (!appState.banners || index < 0 || index >= appState.banners.length - 1) return;
    const item = appState.banners.splice(index, 1)[0];
    appState.banners.splice(index + 1, 0, item);
    renderCanvas();
    renderControls();
};

window.nudgeLayerY = function(layerKey, delta) {
    if (!appState.layers) appState.layers = {};
    if (!appState.layers[layerKey]) {
        const defaultTop = layerKey === 'layer_sbc_banners' ? 40 : 45;
        appState.layers[layerKey] = { y: defaultTop };
    }
    const curY = typeof appState.layers[layerKey].y === 'number' ? appState.layers[layerKey].y : 45;
    appState.layers[layerKey].y = Math.max(0, curY + delta);
    renderCanvas();
};

window.resetLayerY = function(layerKey, defaultY) {
    if (!appState.layers) appState.layers = {};
    if (!appState.layers[layerKey]) appState.layers[layerKey] = {};
    appState.layers[layerKey].y = defaultY;
    renderCanvas();
};

window.lastFocusedBannerIdx = 0;
window.activeEmojiPickerIdx = null;

window.toggleEmojiPickerForBanner = function(index) {
    window.activeEmojiPickerIdx = window.activeEmojiPickerIdx === index ? null : index;
    renderControls();
};

window.insertEmojiIntoBanner = function(index, emoji) {
    if (!appState.banners) appState.banners = [];
    if (!appState.banners[index]) return;

    window.lastFocusedBannerIdx = index;
    const input = document.getElementById(`promoBannerInput_${index}`) || document.getElementById(`sbcBannerInput_${index}`);
    if (input) {
        const start = (typeof input.selectionStart === 'number') ? input.selectionStart : input.value.length;
        const end = (typeof input.selectionEnd === 'number') ? input.selectionEnd : input.value.length;
        const val = input.value;
        const newVal = val.substring(0, start) + emoji + val.substring(end);
        input.value = newVal;
        appState.banners[index].text = newVal;
        input.focus();
        const nextPos = start + emoji.length;
        try {
            input.setSelectionRange(nextPos, nextPos);
        } catch(e) {}
    } else {
        appState.banners[index].text = (appState.banners[index].text || '') + emoji;
    }
    renderCanvas();
};

window.insertEmojiIntoActiveBanner = function(emoji) {
    const idx = (typeof window.lastFocusedBannerIdx === 'number' && window.lastFocusedBannerIdx >= 0 && window.lastFocusedBannerIdx < (appState.banners || []).length)
        ? window.lastFocusedBannerIdx
        : 0;
    window.insertEmojiIntoBanner(idx, emoji);
};

/* =========================================================================
   SBC TEMPLATE HELPERS (ستوري تحديات وترقيات الـ SBC)
   ========================================================================= */

window.setSbcScale = function(val) {
    appState.sbcScale = parseInt(val, 10) || 100;
    const label = document.getElementById('label_sbcScale');
    if (label) label.textContent = `${appState.sbcScale}%`;
    renderCanvas();
};

window.setSbcPosY = function(val) {
    appState.sbcPosY = parseInt(val, 10) || 0;
    const label = document.getElementById('label_sbcPosY');
    if (label) label.textContent = `${appState.sbcPosY}px`;
    renderCanvas();
};

window.fetchSbcAssetFromLink = async function() {
    const input = document.getElementById('sbcUrlInput');
    if (!input || !input.value.trim()) {
        alert('يرجى وضع رابط التحدي أو اللاعب من FUT.GG أو FUTBIN أو رابط مباشر لصورة');
        return;
    }
    const rawVal = input.value.trim();
    const btn = document.getElementById('btnFetchSbc');
    const origText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.innerHTML = '<span>جلب...</span> <span class="animate-spin">⏳</span>';
        btn.disabled = true;
    }

    try {
        const response = await fetch('/api/fetch-sbc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: rawVal })
        });
        const data = await response.json();

        const img = data.imageUrl || data.sbcImage || data.cardImage;
        if (data.success && img) {
            appState.sbcImageUrl = img;
            if (data.title || data.playerName) {
                appState.sbcTitle = data.title || data.playerName;
            }
            renderControls();
            renderCanvas();
            if (window.showCopyToast) {
                window.showCopyToast(`تم جلب صورة التحدي بنجاح! ⚡ (${appState.sbcTitle})`);
            }
        } else {
            alert(data.error || 'تعذر جلب صورة التحدي من هذا الرابط. يمكنك رفع لقطة الشاشة مباشرة بزر "رفع" أو لصقها بـ Ctrl+V');
        }
    } catch (err) {
        console.error('fetchSbcAssetFromLink error:', err);
        alert('حدث خطأ أثناء جلب الرابط: ' + err.message);
    } finally {
        if (btn) {
            btn.innerHTML = origText;
            btn.disabled = false;
        }
    }
};

window.handleSbcFileUpload = function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        appState.sbcImageUrl = e.target.result;
        appState.sbcTitle = file.name.replace(/\.[^/.]+$/, "") || 'صورة مرفوعة';
        renderControls();
        renderCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تم رفع لقطة الشاشة وتحديث التحدي بنجاح! 📸⚡');
        }
    };
    reader.readAsDataURL(file);
};

window.applyQuickSbcPreset = function(type) {
    if (type === 'marquee') {
        appState.sbcTitle = 'Marquee Matchups (مباريات القمة)';
        appState.sbcImageUrl = 'assets/sbc_marquee_matchups_card.png';
        appState.banners = [
            { text: 'توفرت مباريات القمة الأسبوعية الآن 🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نحل لك التحدي كامل وبأفضل الأسعار 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة كبيرة بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'ضمان كامل للنادي بدون أي تصفير أو بان 🔒', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ];
    } else if (type === 'league_nation') {
        appState.sbcTitle = 'League & Nation Advanced';
        appState.sbcImageUrl = 'assets/sbc_league_nation.png';
        appState.banners = [
            { text: 'تحديات بناء التشكيلات المتقدمة 🌐', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نحل لك أصعب التحديات بأرخص حلول الكوينز 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'واحصل على جوائز باكدجات خرافية 🤩', bg: '#E50914', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ];
    } else if (type === 'futgg_marquee') {
        appState.sbcTitle = 'Marquee Matchups (FUT.GG)';
        appState.sbcImageUrl = 'assets/sbc_futgg_marquee.png';
        appState.banners = [
            { text: 'مباريات القمة الأسبوعية نزلت رسمياً 🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'حل التحديات بـ 4 تشكيلات كاملة وتسليم فوري ⚡', bg: '#E50914', color: '#FFFFFF' },
            { text: 'ضمان كامل للنادي وبأفضل الأسعار 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ];
    } else if (type === '81_pick') {
        appState.sbcTitle = 'ترقية 81+ اختيارية (1 of 3 Player Pick)';
        appState.sbcImageUrl = 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=800/2027/sbcs/challenges/18.png';
        appState.banners = [
            { text: 'أقوى ترقية باللعبة الآن 🔥😁', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نسويلك الكمية الي تبيها و بأسعار ممتازة جداً 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة كبيره بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'متوفر من 50 ترقية لين 1000 ترقية وكل مازادت الترقيات قل السعر 👌', bg: '#FFE0B2', color: '#B45309' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ];
    } else if (type === '88_icon') {
        appState.sbcTitle = 'تحدي ترقية الأيقون 88+ (Encore Icon)';
        appState.sbcImageUrl = 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=800/2027/sbcs/challenges/19.png';
        appState.banners = [
            { text: 'تحدي الأيقون 88+ وصل رسمياً! 👑🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نسويلك التحدي كامل مع الكوينز أو بدون كوينز ⚡', bg: '#E50914', color: '#FFFFFF' },
            { text: 'ضمان كامل على النادي وسرعة تنفيذ خيالية 🔒', bg: '#38B000', color: '#FFFFFF' },
            { text: 'وفر نجوم ناديك وخلي الحل علينا بأرخص سعر 👏', bg: '#FFE0B2', color: '#B45309' },
            { text: 'للطلب والاستفسار على الخاص حياكم ⬇️', bg: '#E1F5FE', color: '#1E293B' }
        ];
    } else if (type === 'potm_mbappe' || type === 'cafu_92') {
        appState.sbcTitle = 'تحدي مبابي POTM (لاعب الشهر)';
        appState.sbcImageUrl = window.POPULAR_FUTGG_STARS?.[0]?.imageUrl || '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp';
        appState.banners = [
            { text: 'تحدي مبابي POTM متوفر الآن 🔥😁', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نخلصك التحدي كامل شامل الكوينز والتنفيذ ⚡', bg: '#E50914', color: '#FFFFFF' },
            { text: 'سرعة تنفيذ خيالية وضمان كامل للنادي 🔒', bg: '#38B000', color: '#FFFFFF' },
            { text: 'وفر نجوم ناديك وخلي الحل علينا بأرخص سعر 👏', bg: '#FFE0B2', color: '#B45309' },
            { text: 'حياكم بالخاص للاستفسار والطلب 📩', bg: '#FCE4EC', color: '#880E4F' }
        ];
    } else if (type === '80_ucl') {
        appState.sbcTitle = 'ترقية اختيار لاعب 80+ دوري الأبطال';
        appState.sbcImageUrl = 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=800/2027/sbcs/challenges/18.png';
        appState.banners = [
            { text: 'ترقية الـ 80+ دوري الأبطال مولعة 🔥⚽', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'فرصة خرافية لصيد نجوم الأبطال والحدث الحالي 🤩', bg: '#38B000', color: '#FFFFFF' },
            { text: 'متوفر باقات 50 - 100 - 200 ترقية بأسعار خيالية 💎', bg: '#FFE0B2', color: '#B45309' },
            { text: 'تنفيذ فوري وسريع وضمان ذهبي للحساب 🔒', bg: '#E50914', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#E1F5FE', color: '#1E293B' }
        ];
    }

    renderControls();
    renderCanvas();
    if (window.showCopyToast) {
        window.showCopyToast(`تم تفعيل نمط "${appState.sbcTitle}" بنجاح! ⚡`);
    }
};

// Global clipboard paste listener for SBC screenshots
window.addEventListener('paste', (e) => {
    if (currentTemplate !== 'sbc') return;
    const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = (event) => {
                appState.sbcImageUrl = event.target.result;
                appState.sbcTitle = 'لقطة شاشة (ملصقة)';
                renderControls();
                renderCanvas();
                if (window.showCopyToast) {
                    window.showCopyToast('تم لصق لقطة الشاشة وتحديث التحدي بنجاح! 📋⚡');
                }
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
});

window.setTrioPlayer = function(cardNum, imageUrl, name, price = null) {
    if (cardNum === 1) {
        appState.card1_url = imageUrl;
        appState.card1_name = name;
        if (price) appState.card1_price = price;
        const lbl = document.getElementById('trio_name_1');
        if (lbl) lbl.textContent = name;
        const priceInput = document.getElementById('input_trio_price_1');
        if (priceInput && price) priceInput.value = price;
    } else if (cardNum === 2) {
        appState.card2_url = imageUrl;
        appState.card2_name = name;
        if (price) appState.card2_price = price;
        const lbl = document.getElementById('trio_name_2');
        if (lbl) lbl.textContent = name;
        const priceInput = document.getElementById('input_trio_price_2');
        if (priceInput && price) priceInput.value = price;
    } else if (cardNum === 3) {
        appState.card3_url = imageUrl;
        appState.card3_name = name;
        if (price) appState.card3_price = price;
        const lbl = document.getElementById('trio_name_3');
        if (lbl) lbl.textContent = name;
        const priceInput = document.getElementById('input_trio_price_3');
        if (priceInput && price) priceInput.value = price;
    }
    renderCanvas();
    if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();
    if (window.showCopyToast) window.showCopyToast(`تم اختيار ${name} للثلاثي! ⚽`);
};

window.setTrioPlayerPrice = function(cardNum, val) {
    appState[`card${cardNum}_price`] = val;
    renderCanvas();
    if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();
};

window.fetchPlayerForTrio = async function(cardNum) {
    const input = document.getElementById(`input_trio_url_${cardNum}`);
    if (!input || !input.value.trim()) {
        alert('يرجى وضع رابط اللاعب من FUTBIN أو FUT.GG أو رقم ID اللاعب');
        return;
    }
    const val = input.value.trim();
    const btn = document.getElementById(`btn_fetch_trio_${cardNum}`);
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>جاري...</span> <span class="animate-spin">⏳</span>';
    }

    try {
        const res = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(val)}`);
        if (!res.ok) {
            if (window.location.hostname.includes('github.io')) {
                alert('💡 تنبيه:\nصفحة GitHub Pages هي واجهة استعراض وتصميم ثابتة (بدون خادم Node.js خلفها).\n\n⚡ لسحب الكروت تلقائياً بالرابط واستخدام محرك 4K الكامل:\n1. افتح الاستوديو عبر شبكة منزلك: http://192.168.1.2:3000\n2. أو يمكنك رفع صورة أي كرت فوراً من هاتفك بالضغط على زر المجلد (📁)\n3. أو اختر من الكروت الجاهزة السريعة المقترحة بالأسفل.');
                return;
            }
            throw new Error(`استجابة غير صالحة من السيرفر (${res.status})`);
        }
        const data = await res.json();
        if (data.success && data.cardImage) {
            const displayName = `${data.playerName}${data.rating ? ' (' + data.rating + ')' : ''}`;
            window.setTrioPlayer(cardNum, data.cardImage, displayName);
            input.value = '';
            if (window.showCopyToast) window.showCopyToast(`تم جلب كرت ${displayName} بنجاح! ⚡`);
        } else {
            alert(data.error || 'تعذر سحب كرت اللاعب. تأكد من صحة الرابط أو الـ ID');
        }
    } catch (err) {
        if (window.location.hostname.includes('github.io')) {
            alert('💡 تنبيه:\nصفحة GitHub Pages هي واجهة تصميم ثابتة.\n• لسحب الكروت تلقائياً ومحرك 4K، استخدم الرابط المحلي: http://192.168.1.2:3000\n• أو ارفع صورة الكرت مباشرة من هاتفك عبر زر المجلد 📁');
        } else {
            alert('حدث خطأ في الاتصال بالسيرفر: ' + err.message);
        }
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
};

window.handleTrioFileUpload = function(cardNum, fileInput) {
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        window.setTrioPlayer(cardNum, e.target.result, 'كرت مخصص 📁');
    };
    reader.readAsDataURL(file);
};

window.setTrioSpread = function(val) {
    appState.trioSpread = parseInt(val, 10);
    const lbl = document.getElementById('val_trio_spread');
    if (lbl) lbl.textContent = `${val}px`;
    renderCanvas();
};

window.setTrioAngle = function(val) {
    appState.trioAngle = parseInt(val, 10);
    const lbl = document.getElementById('val_trio_angle');
    if (lbl) lbl.textContent = `${val}°`;
    renderCanvas();
};

window.setBoxWidth = function(val) {
    appState.boxWidth = parseInt(val, 10);
    const label = document.getElementById('label_boxWidth');
    if (label) label.textContent = `${appState.boxWidth}px`;
    renderCanvas();
};

window.setBoxPadding = function(val) {
    appState.boxPadding = parseInt(val, 10);
    const label = document.getElementById('label_boxPadding');
    if (label) label.textContent = `${appState.boxPadding}px`;
    renderCanvas();
};

window.setBoxRadius = function(val) {
    appState.boxRadius = parseInt(val, 10);
    const label = document.getElementById('label_boxRadius');
    if (label) label.textContent = `${appState.boxRadius}px`;
    renderCanvas();
};

window.setBoxStyle = function(style) {
    appState.boxStyle = style;
    renderControls();
    renderCanvas();
};

window.setCtaScale = function(val) {
    appState.ctaScale = parseFloat(val);
    const label = document.getElementById('label_ctaScale');
    if (label) label.textContent = `${Math.round(appState.ctaScale * 100)}%`;
    renderCanvas();
};

window.setCtaPaddingX = function(val) {
    appState.ctaPaddingX = parseInt(val, 10);
    const label = document.getElementById('label_ctaPaddingX');
    if (label) label.textContent = `${appState.ctaPaddingX}px`;
    renderCanvas();
};

window.setCtaTheme = function(theme) {
    appState.ctaTheme = theme;
    renderControls();
    renderCanvas();
};

window.resetBoxStyles = function() {
    appState.boxWidth = 380;
    appState.boxPadding = 12;
    appState.boxRadius = 16;
    appState.boxStyle = 'dark';
    appState.ctaScale = 1.0;
    appState.ctaPaddingX = 24;
    appState.ctaPaddingY = 12;
    appState.ctaRadius = 9999;
    appState.ctaTheme = 'cyan';
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast('تمت إعادة ضبط أحجام الصناديق والأزرار ↺');
};

window.setBgPosY = function(val) {
    appState.bgPosY = parseInt(val, 10);
    const lbl = document.getElementById('label_bgPosY');
    if (lbl) lbl.textContent = `${appState.bgPosY}px`;
    renderCanvas();
};

window.setBgPosX = function(val) {
    appState.bgPosX = parseInt(val, 10);
    const lbl = document.getElementById('label_bgPosX');
    if (lbl) lbl.textContent = `${appState.bgPosX}px`;
    renderCanvas();
};

window.setBgScale = function(val) {
    appState.bgScale = parseFloat(val);
    const lbl = document.getElementById('label_bgScale');
    if (lbl) lbl.textContent = `${Math.round(appState.bgScale * 100)}%`;
    renderCanvas();
};

window.resetBgPosition = function() {
    appState.bgPosY = 0;
    appState.bgPosX = 0;
    appState.bgScale = 1.0;
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast('تم توسيط وإعادة ضبط أبعاد الخلفية ↺');
};

function getFc27LogoHtml() {
    const isSquare = currentRatio === 'square';
    const isPortrait = currentRatio === 'portrait';
    const style = isSquare 
        ? 'top: 14px; right: 14px; width: 34px;'
        : isPortrait 
        ? 'top: 14px; right: 14px; width: 36px;'
        : 'top: 18px; right: 16px; width: 42px;';
    
    const logoSrc = window.EMBEDDED_ASSETS?.FC27_OFFICIAL_LOGO || 'assets/fc27-official-logo.png';
    return `
        <!-- EA SPORTS FC 27 Official Transparent Logo (Always Visible & Razor-Sharp) -->
        <img src="${logoSrc}" 
             class="absolute pointer-events-none z-15" 
             style="${style} filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));" 
             alt="EA SPORTS FC 27">
    `;
}

function getScBrandingHtml() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const isSquare = currentRatio === 'square';
    const isPortrait = currentRatio === 'portrait';
    
    const scLogoWidth = isSquare ? 38 : isPortrait ? 40 : 44;
    const bottomPos = isSquare ? 8 : isPortrait ? 10 : 16;
    const gap = isSquare ? 3 : 4;
    
    const scLogoSrc = window.EMBEDDED_ASSETS?.SHOP_COIN_LOGO || window.EMBEDDED_ASSETS?.SC_LOGO || 'assets/sc-logo.png';

    return `
        <!-- ShopCoin15 SC Official Store Branding (Option B: SC Logo + Verified Handle in Unified Flex) -->
        <div class="absolute left-1/2 -translate-x-1/2 pointer-events-none z-15 flex flex-col items-center" style="bottom: ${bottomPos}px; gap: ${gap}px;">
            <img src="${scLogoSrc}" 
                 style="width: ${scLogoWidth}px; height: auto;" 
                 class="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]" 
                 alt="ShopCoin15 SC">
            <span class="${isStoreBg ? 'text-[9.5px] font-black text-slate-900 tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-300 shadow-xs whitespace-nowrap' : 'text-[9.5px] font-black text-amber-300 tracking-wider drop-shadow-md whitespace-nowrap'}" dir="ltr">
                ▲ @shop_coin15 • OFFICIAL FC 27 STORE ▲
            </span>
        </div>
    `;
}

window.applyFc27Theme = function() {
    appState.boxStyle = 'neon';
    appState.ctaTheme = 'cyan';
    appState.boxWidth = 380;
    appState.boxPadding = 14;
    appState.boxRadius = 20;
    appState.ctaScale = 1.05;
    appState.ctaPaddingX = 28;
    if (currentTemplate === 'showcase') {
        appState.bgTheme = 'store';
        appState.badgeText = '🔥 مع نزول كروت الحدث رسمياً • FC 27';
        appState.headline = 'قفل كرتك بأرخص سعر وأسرع شحن كوينز ⚡';
        appState.subheadline = 'متوفر كوينز FC 27 لجميع المنصات بضمان شامل وضريبة مغطاة 100%';
        appState.storeOffer = 'تسليم فوري خلال دقائق بضمان 100% من الباند';
        appState.marketPrice = '2,450,000 كوينز';
        appState.promoCode = 'كود خصم: SC15';
        appState.showCoinsStack = true;
        appState.showBentoBadges = true;
        appState.showPaymentChips = true;
        appState.showFcLogo = true;
        appState.showStoreLogo = true;
    } else if (currentTemplate === 'trio') {

        appState.badgeText = '▲ انطلاقة FC 27 الرسمية • شحن فوري وآمن 100% ▲';
        appState.headline = 'تبي تبدأ موسمك بأقوى تشكيلة في FC 27؟ 🔥';
        appState.subheadline = 'متوفر شحن كوينز FC 27 لجميع المنصات (PS5 • XBOX • PC) بأفضل سعر وضمان شامل الضريبة';
        appState.ctaText = 'اطلب كوينز FC 27 الآن عبر الخاص DM ⚡';
    } else if (currentTemplate === 'market_drop') {
        appState.badgeText = '▲ تنبيه نزول أسعار السوق في FC 27 📉 ▲';
        appState.headline = 'الأسعار نازلة في السوق! فرصة ما تتعوّض 🔥';
        appState.subheadline = 'السوق الآن في أدنى مستوياته.. اشحن كوينزك الآن وقفل كرتك بأرخص سعر قبل الارتفاع!';
        appState.ctaText = 'اطلب كوينزك الآن بالخاص واستغل النزول ⚡';
    } else if (currentTemplate === 'sbc') {
        appState.badgeText = '▲ تحدي SBC جديد في FC 27 ⚡ ▲';
        appState.headline = 'نزل التحدي رسمياً في FC 27! 👑';
        appState.subheadline = 'متوفر كوينز لتقفيل وحل جميع تحديات الـ SBC بأسرع وقت وبأقل تكلفة';
        appState.ctaText = 'ارسل اسم التحدي بالخاص ونشحن لك فوراً 📩';
    } else if (currentTemplate === 'potm') {
        appState.badgeText = '▲ رسميـاً: لاعب الشهر في FC 27 • POTM 🏆 ▲';
        appState.headline = 'نزل كرت لاعب الشهر رسميـاً في FC 27! 👑🔥';
        appState.subheadline = 'نوفر لك كوينز التحدي كاملة شاملة الضريبة ونقفله بحسابك بدون ما تضحي بنجوم ناديك!';
        appState.ctaText = 'ارسل اسم اللاعب بالخاص ونقفل لك التحدي فوراً 📩';
    }
    renderControls();
    renderCanvas();
    updateCaption();
    if (window.showCopyToast) window.showCopyToast('تم تطبيق ثيم هوية EA FC 27 الرسمية ⚡');
};

function getBoxStyle() {
    const width = appState.boxWidth || 380;
    const padding = appState.boxPadding || 12;
    const radius = appState.boxRadius || 16;
    const style = appState.boxStyle || 'dark';

    let bgBorder = '';
    if (style === 'dark') {
        bgBorder = 'background: rgba(10, 15, 22, 0.82); border: 1.5px solid rgba(255, 255, 255, 0.18); color: #f8fafc; box-shadow: 0 15px 35px rgba(0,0,0,0.35);';
    } else if (style === 'light') {
        bgBorder = 'background: rgba(255, 255, 255, 0.94); border: 1.5px solid rgba(0, 0, 0, 0.15); color: #090d16; box-shadow: 0 12px 30px rgba(0,0,0,0.12);';
    } else if (style === 'neon') {
        bgBorder = 'background: linear-gradient(180deg, rgba(8, 12, 22, 0.94) 0%, rgba(4, 7, 15, 0.96) 100%); border: 1.5px solid rgba(0, 255, 163, 0.65); color: #f8fafc; box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 25px rgba(0,255,163,0.22), inset 0 1px 0 rgba(255,255,255,0.12);';
    } else if (style === 'none') {
        bgBorder = 'background: transparent; border: none; color: #090d16; text-shadow: 0 1px 3px rgba(255,255,255,0.9);';
    }

    return `width: 100%; max-width: ${width}px; padding: ${padding}px; border-radius: ${radius}px; ${bgBorder} margin: 0 auto; backdrop-filter: blur(12px);`;
}

function getCtaStyle() {
    const scale = appState.ctaScale || 1.0;
    const paddingX = appState.ctaPaddingX || 24;
    const paddingY = appState.ctaPaddingY || 12;
    const radius = appState.ctaRadius || 9999;
    const theme = appState.ctaTheme || 'cyan';

    let bgStyle = '';
    if (theme === 'cyan') {
        bgStyle = 'background: linear-gradient(90deg, #00FFA3 0%, #00F0FF 50%, #00FFA3 100%); background-size: 200% auto; color: #020617; box-shadow: 0 10px 28px rgba(0,255,163,0.42), inset 0 1px 0 rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.4);';
    } else if (theme === 'gold') {
        bgStyle = 'background: linear-gradient(135deg, #FCD34D 0%, #10B981 50%, #06B6D4 100%); color: #020617; box-shadow: 0 8px 25px rgba(245,158,11,0.35);';
    } else if (theme === 'neon_dark') {
        bgStyle = 'background: #090d16; border: 2px solid #00FFA3; color: #00FFA3; box-shadow: 0 0 20px rgba(0,255,163,0.35);';
    }

    return `transform: scale(${scale}); padding: ${paddingY}px ${paddingX}px; border-radius: ${radius}px; ${bgStyle} display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 900; white-space: nowrap; cursor: pointer; transition: all 0.2s ease;`;
}

function getPriceBoxStyle() {
    const radius = appState.boxRadius || 16;
    const padding = appState.boxPadding || 14;
    const width = appState.boxWidth || 380;
    const style = appState.boxStyle || 'dark';

    let bgBorder = '';
    if (style === 'light') {
        bgBorder = 'background: rgba(255, 255, 255, 0.95); border: 1.5px solid rgba(16, 185, 129, 0.4); box-shadow: 0 12px 30px rgba(0,0,0,0.1);';
    } else if (style === 'neon') {
        bgBorder = 'background: linear-gradient(180deg, rgba(8, 12, 22, 0.94) 0%, rgba(4, 7, 15, 0.96) 100%); border: 1.5px solid rgba(0, 255, 163, 0.65); box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 25px rgba(0,255,163,0.22), inset 0 1px 0 rgba(255,255,255,0.12);';
    } else {
        bgBorder = 'background: rgba(8, 12, 18, 0.82); border: 1.5px solid rgba(16, 185, 129, 0.45); box-shadow: 0 15px 35px rgba(0,0,0,0.35);';
    }
    return `width: 100%; max-width: ${width}px; border-radius: ${radius}px; padding: ${padding}px; ${bgBorder} backdrop-filter: blur(12px);`;
}

function getCostBoxStyle() {
    const radius = appState.boxRadius || 16;
    const padding = appState.boxPadding || 14;
    const width = appState.boxWidth || 380;
    const style = appState.boxStyle || 'dark';

    let bgBorder = '';
    if (style === 'light') {
        bgBorder = 'background: rgba(255, 255, 255, 0.95); border: 1.5px solid rgba(245, 158, 11, 0.4); box-shadow: 0 12px 30px rgba(0,0,0,0.1);';
    } else if (style === 'neon') {
        bgBorder = 'background: linear-gradient(180deg, rgba(8, 12, 22, 0.94) 0%, rgba(4, 7, 15, 0.96) 100%); border: 1.5px solid rgba(0, 255, 163, 0.65); box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 25px rgba(0,255,163,0.22), inset 0 1px 0 rgba(255,255,255,0.12);';
    } else {
        bgBorder = 'background: rgba(8, 12, 18, 0.82); border: 1.5px solid rgba(245, 158, 11, 0.45); box-shadow: 0 15px 35px rgba(0,0,0,0.35);';
    }
    return `width: 100%; max-width: ${width}px; border-radius: ${radius}px; padding: ${padding}px; ${bgBorder} backdrop-filter: blur(12px);`;
}

function renderCanvas() {
    if (window.currentStudioSuite === 'suite_carousel') {
        if (window.CarouselEngine) window.CarouselEngine.renderSlideToMainCanvas();
        return;
    }
    if (window.currentStudioSuite === 'suite_reels') {
        if (window.ReelsEngine) window.ReelsEngine.renderCanvas();
        return;
    }

    const canvas = document.getElementById('exportCanvas');
    if (!canvas) return;

    const activeFont = appState.fontFamily || 'alexandria';
    canvas.classList.remove('font-family-alexandria', 'font-family-thmanyah', 'font-family-zain');
    canvas.classList.add(`font-family-${activeFont}`);

    if (currentTemplate === 'store_promo') {
        canvas.innerHTML = renderStorePromoTemplate();
    } else if (currentTemplate === 'market_tracker') {
        canvas.innerHTML = renderMarketTrackerTemplate();
    } else if (currentTemplate === 'promo_pack') {
        canvas.innerHTML = renderPromoPackTemplate();
    } else if (currentTemplate === 'champs_squad') {
        canvas.innerHTML = renderChampsSquadTemplate();
    } else if (currentTemplate === 'evo_boost') {
        canvas.innerHTML = renderEvoBoostTemplate();
    } else if (currentTemplate === 'social_proof') {
        canvas.innerHTML = renderSocialProofTemplate();
    } else if (currentTemplate === 'flash_sale') {
        canvas.innerHTML = renderFlashSaleTemplate();
    } else if (currentTemplate === 'loaded_accounts') {
        canvas.innerHTML = renderLoadedAccountsTemplate();
    } else if (currentTemplate === 'squad_makeover') {
        canvas.innerHTML = renderSquadMakeoverTemplate();
    } else if (currentTemplate === 'player_duel') {
        canvas.innerHTML = renderPlayerDuelTemplate();
    } else if (currentTemplate === 'budget_beast') {
        canvas.innerHTML = renderBudgetBeastTemplate();
    } else if (currentTemplate === 'player_review') {
        canvas.innerHTML = renderPlayerReviewTemplate();
    } else if (currentTemplate === 'custom_story') {
        canvas.innerHTML = renderCustomStoryTemplate();
    } else if (currentTemplate === 'trio') {
        canvas.innerHTML = renderTrioTemplate();
        if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();
    } else if (currentTemplate === 'market_drop') {
        canvas.innerHTML = renderMarketDropTemplate();
    } else if (currentTemplate === 'sbc') {
        canvas.innerHTML = renderSbcTemplate();
    } else if (currentTemplate === 'potm') {
        canvas.innerHTML = renderPotmTemplate();
    } else if (currentTemplate === 'showcase') {
        canvas.innerHTML = renderShowcaseTemplate();
    }


    canvas.querySelectorAll('.draggable-layer').forEach(layer => {
        const layerKey = layer.id;
        makeDraggable(layer, layerKey);
    });

    if (window.twemoji && typeof window.twemoji.parse === 'function') {
        try {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        } catch(e) {}
    }
}

function getLayerStyle(layerKey, defaultTop = 0, defaultLeft = '50%', transform = 'translateX(-50%)') {
    const layerObj = appState.layers && appState.layers[layerKey];
    if (layerObj && layerObj.x !== null && layerObj.x !== undefined) {
        return `top: ${layerObj.y}px; left: ${layerObj.x}px; transform: none; right: auto;`;
    }
    const y = (layerObj && layerObj.y !== undefined) ? layerObj.y : defaultTop;
    if (defaultLeft === 'auto') {
        const rightPos = (layerObj && layerObj.right !== undefined) ? layerObj.right : 15;
        return `top: ${y}px; right: ${rightPos}px; left: auto; transform: ${transform};`;
    }
    return `top: ${y}px; left: ${defaultLeft}; transform: ${transform}; right: auto;`;
}

function getLayerScale(layerKey) {
    return appState.layers && appState.layers[layerKey] && appState.layers[layerKey].scale ? appState.layers[layerKey].scale : 1.0;
}

function isLayerVisible(layerKey) {
    if (!appState.layers || !appState.layers[layerKey]) return true;
    return appState.layers[layerKey].visible !== false;
}

function renderLayerToolbar(layerKey) {
    const scale = getLayerScale(layerKey);
    const percent = Math.round(scale * 100);
    return `
        <div class="layer-toolbar" onclick="event.stopPropagation()">
            <button class="layer-tool-btn btn-done" onclick="event.stopPropagation(); window.deselectAllLayers()" title="إنهاء التحديد ✓">✓</button>
            <button class="layer-tool-btn" onclick="event.stopPropagation(); adjustLayerScale('${layerKey}', -0.08)" title="تصغير">-</button>
            <span class="layer-scale-badge">${percent}%</span>
            <button class="layer-tool-btn" onclick="event.stopPropagation(); adjustLayerScale('${layerKey}', 0.08)" title="تكبير">+</button>
            <button class="layer-tool-btn btn-delete" onclick="event.stopPropagation(); deleteLayer('${layerKey}')" title="حذف ✕">✕</button>
        </div>
        <div class="layer-resize-handle" title="اسحب للتكبير والتصغير"></div>
    `;
}

// 0. Template Renderer: STORE PROMO (Official Instagram Story Stacked Banners & Event Cards)
function renderStorePromoTemplate() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const isWhiteBg = appState.bgTheme === 'white';
    const bgUrl = isStoreBg ? (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png') : 'assets/story-bg.jpg';
    const bgPosX = appState.bgPosX || 0;
    const bgPosY = appState.bgPosY || 0;
    const bgScale = appState.bgScale || 1.0;

    const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
        ? appState.banners 
        : (window.STORE_BANNER_THEMES?.classic?.banners || [
            { text: 'متوفر الآن جميع كميات الكوينز 🤩', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'والشحن عليه ضمان نادي كامل 🔒', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة شحن خيالية المليون ينشحن خلال دقيقة 🔥🤯', bg: '#38B000', color: '#FFFFFF' },
            { text: 'وبأفضل الأسعار التنافسية 🥳👏', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#E1F5FE', color: '#1E293B' }
        ]);

    const cardCount = parseInt(appState.cardCount, 10) === 2 ? 2 : 3;

    const card1 = appState.card1_url || (window.STARTER_BEASTS ? STARTER_BEASTS[0].imageUrl : POPULAR_FUTGG_STARS[1].imageUrl);
    const card2 = appState.card2_url || (window.STARTER_BEASTS ? STARTER_BEASTS[1].imageUrl : POPULAR_FUTGG_STARS[0].imageUrl);
    const card3 = appState.card3_url || (window.STARTER_BEASTS ? STARTER_BEASTS[2].imageUrl : POPULAR_FUTGG_STARS[2].imageUrl);

    // Instagram style banners HTML
    const bannersHtml = banners.map((b) => {
        if (!b || !b.text || !b.text.trim()) return '';
        const bg = b.bg || '#0084FF';
        const color = b.color || '#FFFFFF';
        return `
            <div style="display: inline-block; background-color: ${bg}; color: ${color}; padding: 6px 16px; border-radius: 6px; font-weight: 800; font-size: 15px; line-height: 1.35; text-align: center; white-space: nowrap; max-width: 95%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin: 0 auto;">
                ${b.text}
            </div>
        `;
    }).filter(Boolean).join('');

    // Shadow styling based on background
    const cardShadowLeft = isWhiteBg ? 'drop-shadow(0 15px 25px rgba(0,0,0,0.25))' : 'drop-shadow(0 18px 30px rgba(0,0,0,0.75))';
    const cardShadowRight = isWhiteBg ? 'drop-shadow(0 15px 25px rgba(0,0,0,0.25))' : 'drop-shadow(0 18px 30px rgba(0,0,0,0.75))';
    const cardShadowCenter = isWhiteBg ? 'drop-shadow(0 22px 35px rgba(0,0,0,0.35))' : 'drop-shadow(0 25px 40px rgba(0,0,0,0.9)), drop-shadow(0 0 25px rgba(0,255,163,0.3))';

    // Bottom cards fan HTML
    let cardsHtml = '';
    if (cardCount === 2) {
        // 2 Cards Fan Formation (Duo)
        cardsHtml = `
            <div class="relative w-full h-[350px] flex items-center justify-center">
                ${!isWhiteBg ? `
                <!-- Kinetic Pitch Green Aura behind cards -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,rgba(0,240,255,0.06)_45%,transparent_70%)] blur-2xl -z-10"></div>
                ` : ''}

                <!-- Card 1: Left Card (Tilted Left) -->
                <div class="absolute flex flex-col items-center" style="left: 45px; top: 15px; width: 210px; z-index: 10; transform: rotate(-6deg) scale(0.95); filter: ${cardShadowLeft};">
                    <img src="${card1}" class="w-full object-contain pointer-events-none" alt="Card 1">
                    ${appState.card1_price ? `
                    <div dir="rtl" class="mt-[-12px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400 text-white text-xs font-black shadow-lg flex items-center gap-1">
                        <span>🪙</span>
                        <span>${appState.card1_price}</span>
                    </div>` : ''}
                </div>

                <!-- Card 2: Right Card (Tilted Right, in front) -->
                <div class="absolute flex flex-col items-center" style="right: 45px; top: 15px; width: 210px; z-index: 15; transform: rotate(6deg) scale(0.98); filter: ${cardShadowRight};">
                    <img src="${card2}" class="w-full object-contain pointer-events-none" alt="Card 2">
                    ${appState.card2_price ? `
                    <div dir="rtl" class="mt-[-12px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400 text-white text-xs font-black shadow-lg flex items-center gap-1">
                        <span>🪙</span>
                        <span>${appState.card2_price}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
    } else {
        // 3 Cards Fan Formation (Trio)
        cardsHtml = `
            <div class="relative w-full h-[360px] flex items-center justify-center">
                ${!isWhiteBg ? `
                <!-- Kinetic Pitch Green Aura behind cards -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,rgba(0,240,255,0.06)_45%,transparent_70%)] blur-2xl -z-10"></div>
                ` : ''}

                <!-- Card 1: Left Card (Tilted -8deg) -->
                <div class="absolute flex flex-col items-center" style="left: 18px; top: 38px; width: 190px; z-index: 10; transform: rotate(-8deg) scale(0.92); filter: ${cardShadowLeft};">
                    <img src="${card1}" class="w-full object-contain pointer-events-none" alt="Card 1">
                    ${appState.card1_price ? `
                    <div dir="rtl" class="mt-[-12px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400 text-white text-xs font-black shadow-lg flex items-center gap-1">
                        <span>🪙</span>
                        <span>${appState.card1_price}</span>
                    </div>` : ''}
                </div>

                <!-- Card 3: Right Card (Tilted +8deg) -->
                <div class="absolute flex flex-col items-center" style="right: 18px; top: 38px; width: 190px; z-index: 12; transform: rotate(8deg) scale(0.92); filter: ${cardShadowRight};">
                    <img src="${card3}" class="w-full object-contain pointer-events-none" alt="Card 3">
                    ${appState.card3_price ? `
                    <div dir="rtl" class="mt-[-12px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400 text-white text-xs font-black shadow-lg flex items-center gap-1">
                        <span>🪙</span>
                        <span>${appState.card3_price}</span>
                    </div>` : ''}
                </div>

                <!-- Card 2: Center Card (In front, elevated, straight) -->
                <div class="absolute flex flex-col items-center" style="left: 50%; top: -2px; width: 220px; z-index: 25; transform: translateX(-50%) scale(1.02); filter: ${cardShadowCenter};">
                    <img src="${card2}" class="w-full object-contain pointer-events-none" alt="Card 2 (Center)">
                    ${appState.card2_price ? `
                    <div dir="rtl" class="mt-[-12px] px-3.5 py-1 rounded-full bg-slate-950/95 border border-emerald-400 text-emerald-300 text-xs font-black shadow-xl flex items-center gap-1">
                        <span>🪙</span>
                        <span>${appState.card2_price}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
    }

    return `
        ${isWhiteBg ? `
            <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style="background-color: #FFFFFF;"></div>
        ` : `
            <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px); transform: scale(${bgScale}); transform-origin: center center;"></div>
            </div>
            ${!isStoreBg ? '<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>' : ''}

            ${getFc27LogoHtml()}
            ${getScBrandingHtml()}
        `}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Stacked Text Banners (Top Half) -->
        ${isLayerVisible('layer_store_banners') ? `
        <div id="layer_store_banners" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_store_banners', 45)}; width: max-content; max-width: 500px; z-index: 30;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_store_banners')});">
                ${bannersHtml}
            </div>
            ${renderLayerToolbar('layer_store_banners')}
        </div>
        ` : ''}

        <!-- Layer 2: Promo Event Cards (Bottom Half) -->
        ${isLayerVisible('layer_promo_cards') ? `
        <div id="layer_promo_cards" class="draggable-layer w-full text-center" style="${getLayerStyle('layer_promo_cards', 385)}; width: 450px; z-index: 20;">
            <div class="layer-scale-wrapper w-full" style="transform: scale(${getLayerScale('layer_promo_cards')});">
                ${cardsHtml}
            </div>
            ${renderLayerToolbar('layer_promo_cards')}
        </div>
        ` : ''}
    `;
}

// ==========================================
// FUTBIN MARKET TRACKER (Story 9:16 Template)
// ==========================================

const MARKET_STAR_PRESETS = [
    {
        id: 'barcola',
        name: 'باركولا (85 LW)',
        arName: 'باركولا',
        rating: '85',
        position: 'LW',
        cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50596300.9b5dfc98a731bb7f8958c0eec6247d0bc94a42cb7d86de10a1c5482685f6b716.webp',
        price: '107,000',
        trend: '5.94% (+6K)',
        trendDir: 'up',
        recentSales: '108,000 | 108,000 | 109,000 | 109,000',
        priceRange: '600 - 150,000',
        updatedText: '35 SECS AGO',
        tag: '🔥 كرت ميتا صاعد'
    },
    {
        id: 'salah',
        name: 'صلاح (87 RM)',
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
    {
        id: 'messi',
        name: 'ميسي (89 CAM)',
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
    },
    {
        id: 'mbappe',
        name: 'مبابي (91 ST)',
        arName: 'كيليان مبابي',
        rating: '91',
        position: 'ST',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
        price: '2,450,000',
        trend: '4.20% (+95K)',
        trendDir: 'up',
        recentSales: '2,460,000 | 2,460,000 | 2,480,000 | 2,480,000',
        priceRange: '10,000 - 3,500,000',
        updatedText: '12 SECS AGO',
        tag: '👑 نجم الميتا الأول'
    },
    {
        id: 'vinicius',
        name: 'فينيسيوس (90 LW)',
        arName: 'فينيسيوس جونيور',
        rating: '90',
        position: 'LW',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp',
        price: '980,000',
        trend: '7.15% (+65K)',
        trendDir: 'up',
        recentSales: '985,000 | 990,000 | 995,000 | 1,000,000',
        priceRange: '5,000 - 1,500,000',
        updatedText: '40 SECS AGO',
        tag: '⚡ سرعة خارقة وطلب عالي'
    },
    {
        id: 'bellingham',
        name: 'بيلينغهام (90 CAM)',
        arName: 'جود بيلينغهام',
        rating: '90',
        position: 'CAM',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp',
        price: '750,000',
        trend: '3.10% (-24K)',
        trendDir: 'down',
        recentSales: '750,000 | 752,000 | 755,000 | 755,000',
        priceRange: '5,000 - 1,200,000',
        updatedText: '2 MINS AGO',
        tag: '💎 فرصة قبل ارتفاع الويكند'
    },
    {
        id: 'dembele',
        name: 'ديمبيلي (86 RW)',
        arName: 'عثمان ديمبيلي',
        rating: '86',
        position: 'RW',
        cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp',
        price: '84,500',
        trend: '6.45% (+5K)',
        trendDir: 'up',
        recentSales: '85,000 | 85,000 | 86,000 | 86,000',
        priceRange: '700 - 140,000',
        updatedText: '18 SECS AGO',
        tag: '🔥 كرت 5 نجوم مهارة'
    },
    {
        id: 'yamal',
        name: 'لامين يامال (84 RW)',
        arName: 'لامين يامال',
        rating: '84',
        position: 'RW',
        cardUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-67386507.a953ece6dcf87cff76b8213692e7d57e1d31a2268e3f32596dd738c7a1591220.webp',
        price: '38,000',
        trend: '9.80% (+3.4K)',
        trendDir: 'up',
        recentSales: '38,500 | 38,500 | 39,000 | 39,000',
        priceRange: '600 - 80,000',
        updatedText: '45 SECS AGO',
        tag: '⭐ الموهبة الأكثر طلباً'
    }
];

function renderFutbinPriceBox(player, mode = 'standard') {
    if (!player) return '';
    const isUp = (player.trendDir || 'up') === 'up';
    const trendIcon = isUp ? '▲' : '▼';
    const trendColor = isUp ? '#00FF85' : '#FF4D4D';
    const trendBg = isUp ? 'rgba(0, 255, 133, 0.12)' : 'rgba(255, 77, 77, 0.14)';
    const trendBorder = isUp ? 'rgba(0, 255, 133, 0.35)' : 'rgba(255, 77, 77, 0.35)';

    const salesList = (player.recentSales || '')
        .split(/[|\n]/)
        .map(s => s.trim())
        .filter(Boolean);

    const platform = (appState.platform === 'pc') ? 'PC' : 'PS / XBOX';

    if (mode === 'compact') {
        // 3 Cards Mode (Compact width ~155px)
        return `
            <div class="w-full rounded-xl bg-[#0c1017]/95 border border-[#242b3b] p-2 text-right shadow-2xl backdrop-blur-md flex flex-col justify-between" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; direction: ltr;">
                <!-- Header: Platform & Trend -->
                <div class="flex items-center justify-between pb-1 border-b border-[#1c2230] gap-1">
                    <span class="text-[8px] font-mono font-black text-slate-400 bg-[#161a24] px-1.5 py-0.5 rounded border border-[#202738]">${platform}</span>
                    <div class="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9.5px] font-black font-mono" style="background: ${trendBg}; color: ${trendColor}; border: 1px solid ${trendBorder};">
                        <span>${player.trend || '0%'}</span>
                        <span class="text-[8.5px]">${trendIcon}</span>
                    </div>
                </div>

                <!-- Price Row -->
                <div class="py-1.5 flex items-center justify-center">
                    <div class="flex items-center gap-1">
                        <img src="assets/fc-coin.webp" class="w-4 h-4 object-contain" alt="Coin" onerror="this.src='assets/coin.png'">
                        <span class="text-sm font-black font-mono text-white tracking-tight">${player.price || '0'}</span>
                    </div>
                </div>

                <!-- Recent Sales List (2x2) -->
                ${salesList.length > 0 ? `
                <div class="pt-1 border-t border-[#1c2230]/90">
                    <div class="text-[7.5px] font-mono text-slate-400 mb-0.5 text-center">RECENT SALES</div>
                    <div class="grid grid-cols-2 gap-1 text-[7.5px] font-mono text-slate-300">
                        ${salesList.slice(0, 4).map(s => `
                            <div class="flex items-center gap-0.5 bg-[#151924] px-1 py-0.5 rounded text-center justify-center border border-[#1f2636] whitespace-nowrap overflow-hidden">
                                <img src="assets/fc-coin.webp" class="w-2.5 h-2.5 object-contain opacity-80 shrink-0" alt="c">
                                <span class="truncate whitespace-nowrap">${s}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Footer: Updated Time & Range -->
                <div class="pt-1 mt-1 border-t border-[#1c2230]/70 flex items-center justify-between text-[7px] font-mono text-slate-400">
                    <div class="flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full ${isUp ? 'bg-[#00ff85]' : 'bg-[#ff4d4d]'} animate-pulse"></span>
                        <span class="truncate">${player.updatedText || 'NOW'}</span>
                    </div>
                    <span class="truncate">PR: ${player.priceRange ? (player.priceRange.split('-')[1]?.trim() || player.priceRange) : 'MAX'}</span>
                </div>
            </div>
        `;
    }

    if (mode === 'hero') {
        // 1 Card Mode (Hero Showcase Width ~420px)
        return `
            <div class="w-full max-w-[440px] mx-auto rounded-2xl bg-[#0c1017]/95 border border-[#242b3b] p-3.5 text-right shadow-2xl backdrop-blur-md" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; direction: ltr;">
                <!-- Header: Platform, Live Status, Trend -->
                <div class="flex items-center justify-between pb-2.5 border-b border-[#1c2230] gap-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[11px] font-mono font-black text-slate-300 bg-[#161a24] px-2.5 py-0.5 rounded-md border border-[#22293b]">${platform}</span>
                        <span class="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">FUTBIN LIVE MARKET</span>
                    </div>
                    <div class="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black font-mono tracking-tight shadow-xs" style="background: ${trendBg}; color: ${trendColor}; border: 1px solid ${trendBorder};">
                        <span class="text-[10px] font-bold text-slate-300">Trend:</span>
                        <span>${player.trend || '0%'}</span>
                        <span class="text-[11px]">${trendIcon}</span>
                    </div>
                </div>

                <!-- Price Row (Large Hero Price) -->
                <div class="py-3 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <img src="assets/fc-coin.webp" class="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" alt="Coin" onerror="this.src='assets/coin.png'">
                        <span class="text-3xl font-black font-mono text-white tracking-wider">${player.price || '0'}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-[10px] font-mono text-slate-400 block">CURRENT LOWEST BIN</span>
                        <span class="text-xs font-mono font-bold ${isUp ? 'text-[#00ff85]' : 'text-[#ff4d4d]'}">${isUp ? '📈 DEMAND RISING' : '📉 MARKET DIPPING'}</span>
                    </div>
                </div>

                <!-- Recent Sales List -->
                ${salesList.length > 0 ? `
                <div class="py-2 border-t border-[#1c2230]">
                    <div class="text-[10px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                        <span>RECENT COMPLETED SALES:</span>
                        <span class="text-[9px] text-emerald-400 font-mono">VERIFIED DATA</span>
                    </div>
                    <div class="grid grid-cols-4 gap-1.5">
                        ${salesList.slice(0, 4).map(s => `
                            <div class="flex items-center justify-center gap-1 bg-[#151924] px-2 py-1 rounded-md border border-[#202738] text-[10.5px] font-mono text-slate-200 whitespace-nowrap overflow-hidden">
                                <img src="assets/fc-coin.webp" class="w-3.5 h-3.5 object-contain opacity-80 shrink-0" alt="c">
                                <span class="whitespace-nowrap truncate">${s}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Footer: Updated Time & Range -->
                <div class="pt-2 mt-1 border-t border-[#1c2230] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full ${isUp ? 'bg-[#00ff85]' : 'bg-[#ff4d4d]'} animate-pulse"></span>
                        <span>PRICE UPDATED: ${player.updatedText || 'JUST NOW'}</span>
                    </div>
                    <span>PRICE RANGE: ${player.priceRange || '600 - MAX'}</span>
                </div>
            </div>
        `;
    }

    // Standard 2-Cards Mode (Exact match with user screenshots)
    return `
        <div class="w-full rounded-2xl bg-[#0c1017]/95 border border-[#242b3b] p-2.5 text-right shadow-2xl backdrop-blur-md flex flex-col justify-between" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; direction: ltr;">
            <!-- Header: Platform Tag & Trend -->
            <div class="flex items-center justify-between pb-1.5 border-b border-[#1c2230] gap-1.5">
                <span class="text-[9.5px] font-mono font-black text-slate-400 bg-[#161a24] px-2 py-0.5 rounded border border-[#202738]">${platform}</span>
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-black font-mono tracking-tight" style="background: ${trendBg}; color: ${trendColor}; border: 1px solid ${trendBorder};">
                    <span class="text-[9px] font-bold text-slate-300">Trend:</span>
                    <span>${player.trend || '0%'}</span>
                    <span class="text-[9.5px]">${trendIcon}</span>
                </div>
            </div>

            <!-- Price Row -->
            <div class="py-2 flex items-center justify-center">
                <div class="flex items-center gap-1.5">
                    <img src="assets/fc-coin.webp" class="w-6 h-6 object-contain" alt="Coin" onerror="this.src='assets/coin.png'">
                    <span class="text-xl font-black font-mono text-white tracking-wide">${player.price || '0'}</span>
                </div>
            </div>

            <!-- Recent Sales Row (User Screenshot Structure) -->
            ${salesList.length > 0 ? `
            <div class="py-1.5 border-t border-[#1c2230]">
                <div class="text-[8.5px] font-mono font-semibold text-slate-400 mb-1 flex items-center justify-between">
                    <span>RECENT SALES:</span>
                    <span class="text-[7.5px] text-slate-400 font-mono">FUTBIN</span>
                </div>
                <div class="grid grid-cols-2 gap-1">
                    ${salesList.slice(0, 4).map(s => `
                        <div class="flex items-center justify-center gap-1 bg-[#151924] px-1 py-0.5 rounded border border-[#202738] text-[9px] font-mono text-slate-200 whitespace-nowrap overflow-hidden">
                            <img src="assets/fc-coin.webp" class="w-3 h-3 object-contain opacity-80 shrink-0" alt="c">
                            <span class="whitespace-nowrap truncate">${s}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Footer: Timestamp & Price Range -->
            <div class="pt-1.5 mt-0.5 border-t border-[#1c2230] flex items-center justify-between text-[8px] font-mono text-slate-400">
                <div class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full ${isUp ? 'bg-[#00ff85]' : 'bg-[#ff4d4d]'} animate-pulse"></span>
                    <span class="truncate">UPDATED: ${player.updatedText || 'JUST NOW'}</span>
                </div>
                <span class="truncate">PR: ${player.priceRange || '600 - MAX'}</span>
            </div>
        </div>
    `;
}

// ---------------------------------------------------------
// 7 DISTINCT MARKET DISPLAY LAYOUTS FOR CARDS & FUTBIN DATA
// ---------------------------------------------------------

// 1. Classic Stack (1, 2, or 3 cards with FUTBIN boxes below)
function renderMarketLayoutClassic(p1, p2, p3, cardCount, platform, isLightBg) {
    if (cardCount === 1) {
        return `
            <div class="w-full flex flex-col items-center gap-2">
                ${p1.tag ? `
                <div class="px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-400 text-emerald-300 text-xs font-black shadow-lg">
                    ${p1.tag}
                </div>` : ''}

                <div class="relative w-[240px] h-[270px] flex items-center justify-center">
                    <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.28)_0%,rgba(0,240,255,0.08)_50%,transparent_70%)] blur-2xl -z-10"></div>
                    <img src="${p1.cardUrl}" class="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]" alt="${p1.name}">
                </div>

                <div class="text-center">
                    <span class="text-base font-black ${isLightBg ? 'text-slate-900' : 'text-white'} drop-shadow-md">${p1.arName || p1.name}</span>
                    <span class="text-xs font-bold text-emerald-500 font-mono ml-1.5">(${p1.rating} ${p1.position})</span>
                </div>

                ${renderFutbinPriceBox(p1, 'hero')}
            </div>
        `;
    }

    if (cardCount === 2) {
        return `
            <div class="w-full flex items-start justify-center gap-3.5 px-2">
                <!-- Player 1 Column -->
                <div class="flex-1 flex flex-col items-center gap-1.5 max-w-[245px]">
                    ${p1.tag ? `
                    <div class="px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[10.5px] font-black shadow-md truncate max-w-full">
                        ${p1.tag}
                    </div>` : ''}

                    <div class="relative w-full h-[225px] flex items-center justify-center">
                        <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.22)_0%,transparent_70%)] blur-xl -z-10"></div>
                        <img src="${p1.cardUrl}" class="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" alt="${p1.name}">
                    </div>

                    <div class="text-center truncate max-w-full">
                        <span class="text-xs font-black ${isLightBg ? 'text-slate-900' : 'text-white'} drop-shadow">${p1.arName || p1.name}</span>
                        <span class="text-[10px] font-bold text-emerald-500 font-mono">(${p1.rating})</span>
                    </div>

                    ${renderFutbinPriceBox(p1, 'standard')}
                </div>

                <!-- Player 2 Column -->
                <div class="flex-1 flex flex-col items-center gap-1.5 max-w-[245px]">
                    ${p2.tag ? `
                    <div class="px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[10.5px] font-black shadow-md truncate max-w-full">
                        ${p2.tag}
                    </div>` : ''}

                    <div class="relative w-full h-[225px] flex items-center justify-center">
                        <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.20)_0%,transparent_70%)] blur-xl -z-10"></div>
                        <img src="${p2.cardUrl}" class="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" alt="${p2.name}">
                    </div>

                    <div class="text-center truncate max-w-full">
                        <span class="text-xs font-black ${isLightBg ? 'text-slate-900' : 'text-white'} drop-shadow">${p2.arName || p2.name}</span>
                        <span class="text-[10px] font-bold text-emerald-500 font-mono">(${p2.rating})</span>
                    </div>

                    ${renderFutbinPriceBox(p2, 'standard')}
                </div>
            </div>
        `;
    }

    // 3 Cards Trio
    return `
        <div class="w-full grid grid-cols-3 gap-2 px-1">
            ${[p1, p2, p3].map(p => `
                <div class="flex flex-col items-center gap-1">
                    ${p.tag ? `
                    <div class="px-1.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[9px] font-black shadow truncate max-w-full">
                        ${p.tag}
                    </div>` : ''}

                    <div class="relative w-full h-[160px] flex items-center justify-center">
                        <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]" alt="${p.name}">
                    </div>

                    <div class="text-center truncate max-w-full">
                        <span class="text-[11px] font-black ${isLightBg ? 'text-slate-900' : 'text-white'}">${p.arName || p.name}</span>
                        <span class="text-[9px] font-bold text-emerald-500 font-mono">(${p.rating})</span>
                    </div>

                    ${renderFutbinPriceBox(p, 'compact')}
                </div>
            `).join('')}
        </div>
    `;
}

// 2. Horizontal Glass Strips
function renderMarketLayoutHorizontal(p1, p2, p3, cardCount, platform, isLightBg) {
    const players = [p1, p2, p3].slice(0, cardCount);
    const cardHeight = cardCount === 3 ? 'h-[115px]' : (cardCount === 1 ? 'h-[175px]' : 'h-[135px]');
    const cardImgW = cardCount === 3 ? 'w-[95px]' : (cardCount === 1 ? 'w-[140px]' : 'w-[110px]');

    return `
        <div class="w-full flex flex-col gap-2.5 px-2">
            ${players.map(p => {
                const isUp = (p.trendDir || 'up') === 'up';
                const trendBg = isUp ? 'rgba(0, 255, 133, 0.15)' : 'rgba(255, 77, 77, 0.15)';
                const trendColor = isUp ? '#00ff85' : '#ff4d4d';
                const trendIcon = isUp ? '▲' : '▼';
                const salesList = (p.recentSales || '').split(/[|\n]/).map(s => s.trim()).filter(Boolean);

                return `
                    <div class="w-full rounded-2xl bg-[#090e18]/95 border border-[#222a3d] p-2.5 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
                        <!-- Card Cutout / Shield with Aura -->
                        <div class="${cardImgW} ${cardHeight} relative flex items-center justify-center shrink-0">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,transparent_70%)] blur-lg -z-10"></div>
                            <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="${p.name}">
                            ${p.tag ? `
                            <div class="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/95 border border-emerald-400 text-emerald-300 text-[8.5px] font-black whitespace-nowrap shadow">
                                ${p.tag}
                            </div>` : ''}
                        </div>

                        <!-- Stats & FUTBIN Market Info -->
                        <div class="flex-1 flex flex-col justify-between h-full space-y-1.5 text-right">
                            <!-- Player Name & Platform Tag -->
                            <div class="flex items-center justify-between border-b border-[#1b2233] pb-1">
                                <div class="flex items-center gap-1.5">
                                    <span class="text-sm font-black text-white">${p.arName || p.name}</span>
                                    <span class="text-[10.5px] font-mono font-bold text-emerald-400">(${p.rating} ${p.position})</span>
                                </div>
                                <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#161d2b] border border-[#232d42] text-slate-300">${platform}</span>
                            </div>

                            <!-- Big Price & Trend Row -->
                            <div class="flex items-center justify-between" dir="ltr">
                                <div class="flex items-center gap-1.5">
                                    <img src="assets/fc-coin.webp" class="w-6 h-6 object-contain drop-shadow" alt="Coin">
                                    <span class="text-2xl font-black font-mono text-white tracking-wide">${p.price}</span>
                                </div>
                                <div class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-black shadow-xs" style="background: ${trendBg}; color: ${trendColor}; border: 1px solid ${trendColor}40;">
                                    <span>${p.trend}</span>
                                    <span>${trendIcon}</span>
                                </div>
                            </div>

                            <!-- Recent Sales Mini Strip -->
                            ${salesList.length > 0 ? `
                            <div class="flex items-center gap-1 overflow-hidden" dir="ltr">
                                <span class="text-[8px] font-mono text-slate-400 shrink-0">SALES:</span>
                                <div class="flex items-center gap-1 flex-1 overflow-hidden">
                                    ${salesList.slice(0, 3).map(s => `
                                        <span class="bg-[#141a27] px-1.5 py-0.5 rounded text-[8.5px] font-mono text-slate-200 border border-[#21293b] whitespace-nowrap truncate">🪙 ${s}</span>
                                    `).join('')}
                                </div>
                            </div>` : ''}

                            <!-- Footer: Updated & Price Range -->
                            <div class="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-[#1b2233]" dir="ltr">
                                <span class="truncate">UPDATED: ${p.updatedText || 'JUST NOW'}</span>
                                <span class="text-slate-300 font-bold">PR: ${p.priceRange || '600 - MAX'}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// 3. Floating Price Shield / Overlay Badge
function renderMarketLayoutBadge(p1, p2, p3, cardCount, platform, isLightBg) {
    const players = [p1, p2, p3].slice(0, cardCount);
    const cardH = cardCount === 3 ? 'h-[175px]' : (cardCount === 1 ? 'h-[270px]' : 'h-[235px]');

    return `
        <div class="w-full flex flex-col items-center gap-2 px-1">
            <div class="w-full flex items-start justify-center gap-3">
                ${players.map(p => {
                    const isUp = (p.trendDir || 'up') === 'up';
                    const trendColor = isUp ? '#00ff85' : '#ff4d4d';
                    const trendIcon = isUp ? '▲' : '▼';
                    const salesList = (p.recentSales || '').split(/[|\n]/).map(s => s.trim()).filter(Boolean);

                    return `
                        <div class="flex-1 flex flex-col items-center max-w-[245px]">
                            <!-- Player Tag -->
                            ${p.tag ? `
                            <div class="px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[10px] font-black shadow mb-1 truncate max-w-full">
                                ${p.tag}
                            </div>` : ''}

                            <!-- Large Card Image -->
                            <div class="relative w-full ${cardH} flex items-center justify-center">
                                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.22)_0%,transparent_70%)] blur-xl -z-10"></div>
                                <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.85)]" alt="${p.name}">
                            </div>

                            <!-- Attached Floating Price Shield Badge -->
                            <div class="relative -mt-6 z-20 w-full rounded-2xl bg-[#090e18]/95 border-2 border-emerald-400/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.9)] text-center flex flex-col items-center gap-1 backdrop-blur-md">
                                <div class="w-full flex items-center justify-between text-[9px] font-mono px-1">
                                    <span class="text-slate-400 font-bold">${platform}</span>
                                    <span class="font-black" style="color: ${trendColor};">${trendIcon} ${p.trend}</span>
                                </div>

                                <div class="flex items-center justify-center gap-1.5 py-0.5" dir="ltr">
                                    <img src="assets/fc-coin.webp" class="w-5 h-5 object-contain" alt="c">
                                    <span class="text-xl font-black font-mono text-white tracking-wide">${p.price}</span>
                                </div>

                                <div class="text-[9.5px] font-mono text-slate-300 font-bold">
                                    ${p.arName || p.name} (${p.rating})
                                </div>

                                ${salesList.length > 0 ? `
                                <div class="w-full pt-1 border-t border-slate-800 text-[8px] font-mono text-slate-400 truncate text-center">
                                    SALES: ${salesList.slice(0, 2).join(' • ')}
                                </div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Ticker Underneath -->
            <div class="w-full mt-2 py-2 px-3.5 rounded-xl bg-slate-950/95 border border-emerald-500/50 flex items-center justify-between text-[10.5px] text-emerald-300 font-black shadow-lg">
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 🚨 أسعار رسمية حية من فوت بين</span>
                <span>⚡ شحن فوري وضمان شامل النادي</span>
            </div>
        </div>
    `;
}

// 4. Market Duel / VS Battle
function renderMarketLayoutVS(p1, p2, platform, isLightBg) {
    const isUp1 = (p1.trendDir || 'up') === 'up';
    const isUp2 = (p2.trendDir || 'up') === 'up';

    return `
        <div class="w-full flex flex-col items-center gap-2 px-1">
            <!-- 2 Cards Facing Each Other with VS Badge -->
            <div class="w-full flex items-center justify-center gap-2 relative">
                <!-- Card 1 -->
                <div class="flex-1 flex flex-col items-center max-w-[215px]" style="transform: rotate(2deg);">
                    <div class="relative w-full h-[200px] flex items-center justify-center">
                        <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,transparent_70%)] blur-xl -z-10"></div>
                        <img src="${p1.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]" alt="${p1.name}">
                    </div>
                    <span class="text-xs font-black ${isLightBg ? 'text-slate-900' : 'text-white'} mt-1">${p1.arName || p1.name} (${p1.rating})</span>
                </div>

                <!-- Center 3D VS Badge -->
                <div class="relative z-20 -my-2 flex flex-col items-center shrink-0">
                    <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-[0_0_25px_rgba(245,158,11,0.75)] flex items-center justify-center font-black text-slate-950 text-sm tracking-widest animate-pulse">
                        VS
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="flex-1 flex flex-col items-center max-w-[215px]" style="transform: rotate(-2deg);">
                    <div class="relative w-full h-[200px] flex items-center justify-center">
                        <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.25)_0%,transparent_70%)] blur-xl -z-10"></div>
                        <img src="${p2.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]" alt="${p2.name}">
                    </div>
                    <span class="text-xs font-black ${isLightBg ? 'text-slate-900' : 'text-white'} mt-1">${p2.arName || p2.name} (${p2.rating})</span>
                </div>
            </div>

            <!-- Unified Comparison Matrix Card -->
            <div class="w-full rounded-2xl bg-[#090e18]/95 border border-amber-500/50 p-3 shadow-2xl backdrop-blur-md">
                <div class="grid grid-cols-2 gap-3" dir="ltr">
                    <!-- Player 1 Stats -->
                    <div class="flex flex-col items-center gap-1 text-center border-r border-[#1c2436] pr-2">
                        <div class="flex items-center gap-1">
                            <img src="assets/fc-coin.webp" class="w-5 h-5 object-contain" alt="c">
                            <span class="text-lg font-black font-mono text-white">${p1.price}</span>
                        </div>
                        <div class="text-[10px] font-mono font-black ${isUp1 ? 'text-[#00ff85]' : 'text-[#ff4d4d]'}">
                            ${isUp1 ? '▲' : '▼'} ${p1.trend}
                        </div>
                        <span class="text-[8px] font-mono text-slate-400">PR: ${p1.priceRange || '600 - MAX'}</span>
                    </div>

                    <!-- Player 2 Stats -->
                    <div class="flex flex-col items-center gap-1 text-center pl-2">
                        <div class="flex items-center gap-1">
                            <img src="assets/fc-coin.webp" class="w-5 h-5 object-contain" alt="c">
                            <span class="text-lg font-black font-mono text-white">${p2.price}</span>
                        </div>
                        <div class="text-[10px] font-mono font-black ${isUp2 ? 'text-[#00ff85]' : 'text-[#ff4d4d]'}">
                            ${isUp2 ? '▲' : '▼'} ${p2.trend}
                        </div>
                        <span class="text-[8px] font-mono text-slate-400">PR: ${p2.priceRange || '600 - MAX'}</span>
                    </div>
                </div>

                <!-- Bottom Callout -->
                <div class="mt-2.5 pt-2 border-t border-[#1c2436] text-center text-xs font-black text-amber-300">
                    ⚡ أي اللاعبين تبي تقفله في تشكيلتك قبل ارتفاع فوت تشامبيونز؟
                </div>
            </div>
        </div>
    `;
}

// 5. Pro Trading Floor / Market Ticker
function renderMarketLayoutTicker(p1, p2, p3, cardCount, platform, isLightBg) {
    const players = [p1, p2, p3].slice(0, cardCount);

    return `
        <div class="w-full flex flex-col items-center gap-2 px-1">
            <!-- Top Row: Card Podiums -->
            <div class="w-full flex items-center justify-center gap-3">
                ${players.map(p => `
                    <div class="flex flex-col items-center">
                        <div class="relative w-[130px] h-[155px] flex items-center justify-center">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.22)_0%,transparent_70%)] blur-lg -z-10"></div>
                            <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)]" alt="${p.name}">
                        </div>
                        <span class="text-[11px] font-black ${isLightBg ? 'text-slate-900' : 'text-white'}">${p.arName || p.name}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Digital Market Ledger / Trading Board -->
            <div class="w-full rounded-2xl bg-[#080d16]/95 border border-[#20293d] p-3 shadow-2xl backdrop-blur-md space-y-2">
                <!-- Board Header -->
                <div class="flex items-center justify-between pb-1.5 border-b border-[#1b2336] text-[10px] font-mono">
                    <div class="flex items-center gap-1.5 text-emerald-400 font-black">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>FUTBIN LIVE TRADING BOARD</span>
                    </div>
                    <span class="text-slate-400 font-bold">${platform}</span>
                </div>

                <!-- Rows for each player -->
                <div class="space-y-1.5" dir="ltr">
                    ${players.map(p => {
                        const isUp = (p.trendDir || 'up') === 'up';
                        const trendColor = isUp ? '#00ff85' : '#ff4d4d';
                        const trendIcon = isUp ? '▲' : '▼';
                        return `
                            <div class="flex items-center justify-between bg-[#111724] px-2.5 py-1.5 rounded-xl border border-[#1e2638]">
                                <div class="flex items-center gap-2">
                                    <img src="${p.cardUrl}" class="w-6 h-8 object-contain" alt="">
                                    <div class="text-left">
                                        <span class="text-xs font-black text-white block">${p.arName || p.name}</span>
                                        <span class="text-[9px] font-mono text-slate-400">${p.rating} ${p.position}</span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1">
                                    <img src="assets/fc-coin.webp" class="w-4 h-4 object-contain" alt="c">
                                    <span class="text-sm font-black font-mono text-white">${p.price}</span>
                                </div>

                                <div class="px-2 py-0.5 rounded text-[10.5px] font-mono font-black" style="color:${trendColor}; background:${trendColor}18; border: 1px solid ${trendColor}30;">
                                    ${trendIcon} ${p.trend}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Footer Guarantee -->
                <div class="pt-1 border-t border-[#1b2336] flex items-center justify-between text-[9px] font-bold text-slate-400">
                    <span>⚡ متوسط سرعة الشحن: أقل من دقيقة</span>
                    <span class="text-emerald-400">🔒 كوينز مضمونة 100% بدون باند</span>
                </div>
            </div>
        </div>
    `;
}

// 6. Luxury Glass Pods
function renderMarketLayoutPods(p1, p2, p3, cardCount, platform, isLightBg) {
    const players = [p1, p2, p3].slice(0, cardCount);
    const podCardH = cardCount === 3 ? 'h-[135px]' : (cardCount === 1 ? 'h-[220px]' : 'h-[175px]');

    return `
        <div class="w-full flex items-center justify-center gap-3 px-1">
            ${players.map(p => {
                const isUp = (p.trendDir || 'up') === 'up';
                const trendColor = isUp ? '#00ff85' : '#ff4d4d';
                const trendIcon = isUp ? '▲' : '▼';
                const salesList = (p.recentSales || '').split(/[|\n]/).map(s => s.trim()).filter(Boolean);

                return `
                    <div class="flex-1 rounded-3xl bg-gradient-to-b from-[#0e1626]/95 via-[#090e18]/95 to-[#050811]/95 border border-emerald-500/40 p-2.5 shadow-2xl backdrop-blur-md flex flex-col items-center justify-between gap-1.5">
                        <!-- Top Tag -->
                        ${p.tag ? `
                        <div class="px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[9px] font-black truncate max-w-full">
                            ${p.tag}
                        </div>` : ''}

                        <!-- Card Float -->
                        <div class="relative w-full ${podCardH} flex items-center justify-center">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.22)_0%,transparent_70%)] blur-lg -z-10"></div>
                            <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="${p.name}">
                        </div>

                        <!-- Name & Rating -->
                        <div class="text-center truncate max-w-full">
                            <span class="text-xs font-black text-white">${p.arName || p.name}</span>
                            <span class="text-[10px] font-mono text-emerald-400 font-bold ml-1">(${p.rating})</span>
                        </div>

                        <!-- Price Capsule Bottom -->
                        <div class="w-full bg-[#121927] rounded-xl p-2 border border-[#202a3d] space-y-1 text-center" dir="ltr">
                            <div class="flex items-center justify-between text-[8px] font-mono text-slate-400">
                                <span>${platform}</span>
                                <span class="font-black" style="color: ${trendColor};">${trendIcon} ${p.trend}</span>
                            </div>

                            <div class="flex items-center justify-center gap-1 py-0.5">
                                <img src="assets/fc-coin.webp" class="w-5 h-5 object-contain" alt="c">
                                <span class="text-base font-black font-mono text-white">${p.price}</span>
                            </div>

                            ${salesList.length > 0 ? `
                            <div class="text-[7.5px] font-mono text-slate-300 truncate">
                                SALES: ${salesList.slice(0, 2).join(' | ')}
                            </div>` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// 7. Hero Spotlight & Mini Radar
function renderMarketLayoutSpotlight(p1, p2, p3, cardCount, platform, isLightBg) {
    const isUp1 = (p1.trendDir || 'up') === 'up';
    const otherPlayers = [p2, p3].slice(0, cardCount - 1);

    return `
        <div class="w-full flex items-center justify-between gap-3 px-1">
            <!-- Left Hero Showcase (Player 1) -->
            <div class="flex-1 flex flex-col items-center gap-1.5 max-w-[270px]">
                <div class="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black shadow">
                    ⭐ صفقة الرادار الأولى
                </div>

                <div class="relative w-full h-[220px] flex items-center justify-center">
                    <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.28)_0%,transparent_70%)] blur-xl -z-10"></div>
                    <img src="${p1.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)]" alt="${p1.name}">
                </div>

                <div class="text-center">
                    <span class="text-sm font-black ${isLightBg ? 'text-slate-900' : 'text-white'}">${p1.arName || p1.name}</span>
                    <span class="text-[11px] font-bold text-emerald-500 font-mono">(${p1.rating} ${p1.position})</span>
                </div>

                ${renderFutbinPriceBox(p1, 'standard')}
            </div>

            <!-- Right: Alternative Mini Deals List -->
            <div class="flex-1 flex flex-col gap-2 max-w-[220px]">
                <div class="text-xs font-black ${isLightBg ? 'text-slate-800' : 'text-white'} flex items-center gap-1">
                    <span>🔥</span>
                    <span>صفقات بديلة مقترحة:</span>
                </div>

                ${otherPlayers.length > 0 ? otherPlayers.map(p => {
                    const isUp = (p.trendDir || 'up') === 'up';
                    const trendColor = isUp ? '#00ff85' : '#ff4d4d';
                    return `
                        <div class="w-full rounded-2xl bg-[#090e18]/95 border border-[#1f273b] p-2 flex items-center gap-2 shadow-xl backdrop-blur-md">
                            <div class="w-12 h-16 shrink-0 relative flex items-center justify-center">
                                <img src="${p.cardUrl}" class="max-h-full max-w-full object-contain drop-shadow" alt="">
                            </div>
                            <div class="flex-1 text-right overflow-hidden">
                                <span class="text-xs font-black text-white block truncate">${p.arName || p.name}</span>
                                <div class="flex items-center gap-1 my-0.5" dir="ltr">
                                    <img src="assets/fc-coin.webp" class="w-3.5 h-3.5 object-contain" alt="">
                                    <span class="text-xs font-black font-mono text-white">${p.price}</span>
                                </div>
                                <span class="text-[9px] font-mono font-bold" style="color: ${trendColor};">${isUp ? '▲' : '▼'} ${p.trend}</span>
                            </div>
                        </div>
                    `;
                }).join('') : `
                    <div class="rounded-2xl bg-[#090e18]/95 border border-slate-800 p-3 text-center text-xs text-slate-400">
                        قم باختيار 2 أو 3 كروت لعرض الصفقات البديلة هنا!
                    </div>
                `}

                <!-- Urgency Box -->
                <div class="rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-950/80 border border-emerald-500/50 p-2.5 text-center">
                    <span class="text-[10.5px] font-black text-emerald-300 block">⚡ الأسعار ترتفع كل ساعة!</span>
                    <span class="text-[9px] text-slate-300">اشحن كوينزك الآن ووفّر فرق السعر</span>
                </div>
            </div>
        </div>
    `;
}

function renderMarketTrackerTemplate() {
    const activeLayout = appState.displayLayout || 'classic';
    const activeBgKey = appState.bgTheme || 'store';
    const bgMeta = (window.MARKET_BG_THEMES && window.MARKET_BG_THEMES[activeBgKey]) || {
        url: 'assets/store-bg-pure.png',
        isLight: true,
        style: ''
    };
    const bgUrl = bgMeta.url || (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png');
    const bgCustomStyle = bgMeta.style || '';
    const isLightBg = !!bgMeta.isLight;

    // Lighting Overlay (Bright & Vibrant by default, zero murky dark veil)
    const bgLighting = appState.bgLighting || (isLightBg ? 'bright' : 'medium');
    let overlayHtml = '';
    if (bgLighting === 'bright') {
        if (isLightBg) {
            overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-amber-50/15 pointer-events-none"></div>`;
        } else {
            overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"></div>`;
        }
    } else if (bgLighting === 'medium') {
        overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>`;
    } else {
        overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70 pointer-events-none"></div>`;
    }

    const cardCount = parseInt(appState.cardCount, 10) || 2;
    const p1 = appState.player1 || TEMPLATES.market_tracker.defaultState.player1;
    const p2 = appState.player2 || TEMPLATES.market_tracker.defaultState.player2;
    const p3 = appState.player3 || TEMPLATES.market_tracker.defaultState.player3;
    const platform = (appState.platform === 'pc' ? 'PC' : 'PS / XBOX');

    // Build Player Section HTML based on activeLayout
    let playersContentHtml = '';
    if (activeLayout === 'horizontal') {
        playersContentHtml = renderMarketLayoutHorizontal(p1, p2, p3, cardCount, platform, isLightBg);
    } else if (activeLayout === 'badge') {
        playersContentHtml = renderMarketLayoutBadge(p1, p2, p3, cardCount, platform, isLightBg);
    } else if (activeLayout === 'vs') {
        playersContentHtml = renderMarketLayoutVS(p1, p2, platform, isLightBg);
    } else if (activeLayout === 'ticker') {
        playersContentHtml = renderMarketLayoutTicker(p1, p2, p3, cardCount, platform, isLightBg);
    } else if (activeLayout === 'pods') {
        playersContentHtml = renderMarketLayoutPods(p1, p2, p3, cardCount, platform, isLightBg);
    } else if (activeLayout === 'spotlight') {
        playersContentHtml = renderMarketLayoutSpotlight(p1, p2, p3, cardCount, platform, isLightBg);
    } else {
        playersContentHtml = renderMarketLayoutClassic(p1, p2, p3, cardCount, platform, isLightBg);
    }

    return `
        <!-- Background -->
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: center center; ${bgCustomStyle}"></div>
        </div>
        ${overlayHtml}

        <!-- Official Logos -->
        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Market Header (Live alert badge & headlines) -->
        ${isLayerVisible('layer_market_header') ? `
        <div id="layer_market_header" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_market_header', 30)}; width: 100%; max-width: 500px; z-index: 30;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_market_header')});">
                
                <!-- Live Pulse Alert Badge -->
                <div class="px-3.5 py-1 rounded-full bg-slate-950/95 border border-emerald-500/80 shadow-xl text-emerald-400 text-[11px] font-black tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>${appState.badgeText || '🚨 رادار سوق FC 27 • تنبيه تحركات الأسعار في FUTBIN'}</span>
                </div>

                <!-- Main Story Headline -->
                <h1 class="text-xl font-black ${isLightBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'} leading-tight max-w-[460px] px-2">
                    ${appState.headline || 'الأسعار في مسار تصاعدي! اشحن كوينزك وقفّل لاعبك قبل الارتفاع 📈⚡'}
                </h1>

                <!-- Subheadline -->
                ${appState.subheadline ? `
                <p class="text-[11.5px] ${isLightBg ? 'text-slate-700 font-extrabold drop-shadow-xs' : 'text-slate-300 font-bold drop-shadow'} max-w-[430px] px-2 leading-relaxed">
                    ${appState.subheadline}
                </p>` : ''}
            </div>
            ${renderLayerToolbar('layer_market_header')}
        </div>
        ` : ''}

        <!-- Layer 2: Players & FUTBIN Price Analytics -->
        ${isLayerVisible('layer_market_players') ? `
        <div id="layer_market_players" class="draggable-layer w-full" style="${getLayerStyle('layer_market_players', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full" style="transform: scale(${getLayerScale('layer_market_players')});">
                ${playersContentHtml}
            </div>
            ${renderLayerToolbar('layer_market_players')}
        </div>
        ` : ''}

        <!-- Layer 3: Store Promo CTA Banner -->
        ${isLayerVisible('layer_market_cta') ? `
        <div id="layer_market_cta" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_market_cta', 690)}; width: 100%; max-width: 480px; z-index: 35;">
            <div class="layer-scale-wrapper w-full px-2" style="transform: scale(${getLayerScale('layer_market_cta')});">
                <div class="rounded-2xl bg-gradient-to-r from-slate-950/95 via-[#0c1524]/95 to-slate-950/95 border border-emerald-500/60 p-3 shadow-2xl backdrop-blur-md text-center space-y-2">
                    <!-- CTA Headline -->
                    <div class="text-xs font-black text-emerald-300 flex items-center justify-center gap-1.5">
                        <img src="assets/fc-coin.webp" class="w-4 h-4 object-contain" alt="c">
                        <span>${appState.ctaHeadline || 'متوفر شحن كوينز فوري لجميع المنصات بأفضل الأسعار 💰'}</span>
                    </div>

                    <!-- Order Button -->
                    <div class="py-1.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                        <span>${appState.ctaSub || 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'}</span>
                    </div>

                    <!-- Trust Tags -->
                    <div class="flex items-center justify-center gap-3 text-[9.5px] font-bold text-slate-400 pt-0.5">
                        <span>⚡ تسليم فوري</span>
                        <span>•</span>
                        <span>🛡️ ضمان وأمان كامل للنادي</span>
                        <span>•</span>
                        <span>🔒 أمان 100% بدون باند</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_market_cta')}
        </div>
        ` : ''}
    `;
}

function renderMarketTrackerControls() {
    const cardCount = parseInt(appState.cardCount, 10) || 2;
    const p1 = appState.player1 || TEMPLATES.market_tracker.defaultState.player1;
    const p2 = appState.player2 || TEMPLATES.market_tracker.defaultState.player2;
    const p3 = appState.player3 || TEMPLATES.market_tracker.defaultState.player3;
    const activePlatform = appState.platform || 'ps_xbox';
    const activeBg = appState.bgTheme || 'store';
    const activeLayout = appState.displayLayout || 'classic';
    const activeLighting = appState.bgLighting || 'bright';

    let html = `
        <div class="space-y-4">
            <!-- 0. Presentation Style Picker (7 Distinct Layouts) -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>🎨</span>
                        <span>طريقة وأسلوب عرض الأسعار والبطاقات:</span>
                    </span>
                    <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">7 أنماط مختلفة ✨</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                    ${(window.MARKET_DISPLAY_LAYOUTS || []).map(lay => `
                        <button type="button" onclick="setMarketLayout('${lay.id}')" class="p-2 rounded-xl text-right border transition flex flex-col justify-between gap-1 cursor-pointer ${activeLayout === lay.id ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-black shadow-xs' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}">
                            <div class="flex items-center gap-1.5 text-xs font-black">
                                <span>${lay.icon}</span>
                                <span>${lay.name}</span>
                            </div>
                            <div class="text-[9.5px] text-slate-500 leading-tight">${lay.desc}</div>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 1. Background Themes & Lighting Intensity -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>🖼️</span>
                        <span>خلفية الستوري وإضاءتها:</span>
                    </span>
                    <span class="text-[10px] font-black text-emerald-600">مشرقة وفاخرة 100%</span>
                </div>

                <!-- 6 Background Themes -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                    ${Object.values(window.MARKET_BG_THEMES || {}).map(bg => `
                        <button type="button" onclick="setMarketBgTheme('${bg.id}')" class="p-2 rounded-xl text-right border transition flex flex-col justify-between gap-0.5 cursor-pointer ${activeBg === bg.id ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-black shadow-xs' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}">
                            <span class="text-xs font-black truncate">${bg.name}</span>
                            <span class="text-[9px] text-slate-500 truncate">${bg.desc || ''}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Brightness Intensity -->
                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[11px] font-bold text-slate-600">إضاءة الخلفية:</span>
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="setMarketBgLighting('bright')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'bright' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                            ✨ ناصع ومشرق
                        </button>
                        <button type="button" onclick="setMarketBgLighting('medium')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'medium' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                            🌟 متوازن
                        </button>
                        <button type="button" onclick="setMarketBgLighting('dim')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'dim' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                            🎬 سينمائي
                        </button>
                    </div>
                </div>
            </div>

            <!-- 2. Card Count & Platform Selection -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>👥</span>
                        <span>عدد اللاعبين المعروضين:</span>
                    </span>
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="setMarketCardCount(1)" class="px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${cardCount === 1 ? 'bg-emerald-600 text-white font-black shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                            🌟 كرت فردي
                        </button>
                        <button type="button" onclick="setMarketCardCount(2)" class="px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${cardCount === 2 ? 'bg-emerald-600 text-white font-black shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                            👥 كرتين (ثنائي)
                        </button>
                        <button type="button" onclick="setMarketCardCount(3)" class="px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${cardCount === 3 ? 'bg-emerald-600 text-white font-black shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                            👑 3 كروت
                        </button>
                    </div>
                </div>

                <!-- Platform Selection -->
                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[11px] font-bold text-slate-600">🎮 منصة فوت بين:</span>
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="setMarketPlatform('ps_xbox')" class="py-1 px-3 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activePlatform === 'ps_xbox' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black' : 'bg-slate-50 border-slate-200 text-slate-700'}">
                            PS / XBOX
                        </button>
                        <button type="button" onclick="setMarketPlatform('pc')" class="py-1 px-3 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activePlatform === 'pc' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black' : 'bg-slate-50 border-slate-200 text-slate-700'}">
                            PC
                        </button>
                    </div>
                </div>
            </div>
    `;

    // Render individual player config blocks
    const playersToRender = [
        { index: 1, label: 'اللاعب الأول (اليمين / الرئيسي)', data: p1 },
        { index: 2, label: 'اللاعب الثاني (اليسار)', data: p2 },
        { index: 3, label: 'اللاعب الثالث (الوسط بالثلاثي)', data: p3 }
    ].slice(0, cardCount);

    playersToRender.forEach(pObj => {
        const idx = pObj.index;
        const pData = pObj.data;
        const isUp = (pData.trendDir || 'up') === 'up';

        html += `
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">${idx}</span>
                        <span>${pObj.label}:</span>
                    </span>
                    <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        ${pData.rating || '85'} ${pData.position || 'POS'}
                    </span>
                </div>

                <!-- 1-Click Star Presets for this slot -->
                <div>
                    <span class="block text-[10px] font-bold text-slate-500 mb-1">⚡ اختر نجماً جاهزاً بنقرة واحدة:</span>
                    <div class="flex items-center gap-1 flex-wrap">
                        ${MARKET_STAR_PRESETS.map(star => `
                            <button type="button" onclick="applyMarketStarPreset(${idx}, '${star.id}')" class="px-2 py-1 rounded-md text-[10px] font-bold transition bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200">
                                ${star.name}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Card Image URL / Upload / Live Fetch -->
                <div class="space-y-1.5 pt-1 border-t border-slate-100">
                    <label class="block text-[11px] font-bold text-slate-700">سحب أو رفع بطاقة اللاعب (FUT.GG):</label>
                    <div class="flex gap-1.5">
                        <input type="text" id="market_p${idx}_cardUrl" value="${pData.cardUrl || ''}" 
                               placeholder="اكتب اسم اللاعب (مثلاً Barcola أو Yamal) أو الصق رابطاً"
                               onkeydown="if(event.key==='Enter') fetchMarketPlayerCard(${idx})"
                               oninput="updateMarketPlayer(${idx}, 'cardUrl', this.value)"
                               class="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono outline-none focus:border-emerald-500 focus:bg-white">
                        <button type="button" id="btn_fetch_p${idx}" onclick="fetchMarketPlayerCard(${idx})" class="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shrink-0 transition flex items-center gap-1 shadow-xs cursor-pointer" title="سحب الكرت تلقائياً من FUT.GG">
                            <span>⚡ جلب</span>
                        </button>
                        <input type="file" id="market_p${idx}_fileInput" accept="image/*" class="hidden" onchange="handleMarketPlayerFileUpload(${idx}, event)">
                        <button type="button" onclick="document.getElementById('market_p${idx}_fileInput').click()" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 shrink-0 cursor-pointer" title="رفع صورة كرت">
                            📁 رفع
                        </button>
                    </div>
                </div>

                <!-- Player Names & Custom Tag -->
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[10.5px] font-bold text-slate-600 mb-1">اسم اللاعب:</label>
                        <input type="text" value="${pData.arName || pData.name || ''}" 
                               placeholder="باركولا"
                               oninput="updateMarketPlayer(${idx}, 'arName', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                    <div>
                        <label class="block text-[10.5px] font-bold text-slate-600 mb-1">الوسم التحفيزي:</label>
                        <input type="text" value="${pData.tag || ''}" 
                               placeholder="🔥 كرت ميتا صاعد"
                               oninput="updateMarketPlayer(${idx}, 'tag', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                </div>

                <!-- Price & Trend Direction Box -->
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div class="flex items-center justify-between">
                        <label class="text-[11px] font-black text-slate-800">💰 سعر اللاعب الحالي في فوت بين:</label>
                        <button type="button" onclick="autoGenerateMarketSales(${idx})" class="px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] transition shadow-xs flex items-center gap-1 cursor-pointer" title="يحسب مبيعات فوت بين تلقائياً بناءً على السعر">
                            <span>🪄 توليد مبيعات ورينج تلقائياً</span>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <input type="text" id="market_p${idx}_price" value="${pData.price || '107,000'}" 
                                   placeholder="107,000"
                                   oninput="updateMarketPlayer(${idx}, 'price', this.value)"
                                   class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-black font-mono outline-none focus:border-emerald-500">
                        </div>
                        <div class="flex items-center gap-1">
                            <button type="button" onclick="setMarketTrendDir(${idx}, 'up')" class="flex-1 py-1 px-2 rounded-lg text-xs font-black border transition ${isUp ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white border-slate-200 text-emerald-700 hover:bg-emerald-50'}">
                                صاعد ▲
                            </button>
                            <button type="button" onclick="setMarketTrendDir(${idx}, 'down')" class="flex-1 py-1 px-2 rounded-lg text-xs font-black border transition ${!isUp ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-white border-slate-200 text-rose-700 hover:bg-rose-50'}">
                                هابط ▼
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-1">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 mb-0.5">مؤشر التريند:</label>
                            <input type="text" value="${pData.trend || '5.94% (+6K)'}" 
                                   placeholder="5.94% (+6K)"
                                   oninput="updateMarketPlayer(${idx}, 'trend', this.value)"
                                   class="w-full px-2 py-1 rounded bg-white border border-slate-200 text-slate-800 text-[11px] font-mono outline-none focus:border-emerald-500">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 mb-0.5">وقت التحديث:</label>
                            <input type="text" value="${pData.updatedText || '35 SECS AGO'}" 
                                   placeholder="35 SECS AGO"
                                   oninput="updateMarketPlayer(${idx}, 'updatedText', this.value)"
                                   class="w-full px-2 py-1 rounded bg-white border border-slate-200 text-slate-800 text-[11px] font-mono outline-none focus:border-emerald-500">
                        </div>
                    </div>
                </div>

                <!-- Recent Sales & Price Range -->
                <div class="space-y-1.5">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">آخر مبيعات (Recent Sales - مفصولة بـ | ):</label>
                        <input type="text" id="market_p${idx}_sales" value="${pData.recentSales || ''}" 
                               placeholder="108,000 | 108,000 | 109,000 | 109,000"
                               oninput="updateMarketPlayer(${idx}, 'recentSales', this.value)"
                               class="w-full px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-mono outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">رينج السعر (Price Range):</label>
                        <input type="text" id="market_p${idx}_range" value="${pData.priceRange || ''}" 
                               placeholder="600 - 150,000"
                               oninput="updateMarketPlayer(${idx}, 'priceRange', this.value)"
                               class="w-full px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-mono outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                </div>
            </div>
        `;
    });

    // Marketing & CTA Settings
    html += `
        <!-- Story Headlines & CTA Settings -->
        <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div class="flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                <span class="text-xs font-black text-slate-900">✍️ نصوص وعروض الستوري:</span>
            </div>

            <div>
                <label class="block text-[11px] font-bold text-slate-700 mb-1">شارة التنبيه العلوية:</label>
                <input type="text" value="${appState.badgeText || ''}" 
                       oninput="appState.badgeText = this.value; renderCanvas();"
                       class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
            </div>

            <div>
                <label class="block text-[11px] font-bold text-slate-700 mb-1">العنوان الرئيسي للستوري:</label>
                <input type="text" value="${appState.headline || ''}" 
                       oninput="appState.headline = this.value; renderCanvas();"
                       class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
            </div>

            <div>
                <label class="block text-[11px] font-bold text-slate-700 mb-1">الوصف التحفيزي:</label>
                <input type="text" value="${appState.subheadline || ''}" 
                       oninput="appState.subheadline = this.value; renderCanvas();"
                       class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-500 focus:bg-white">
            </div>

            <div class="pt-2 border-t border-slate-100 space-y-2">
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">عنوان بانر المتجر (CTA):</label>
                    <input type="text" value="${appState.ctaHeadline || ''}" 
                           oninput="appState.ctaHeadline = this.value; renderCanvas();"
                           class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">نص زر الطلب عبر الخاص:</label>
                    <input type="text" value="${appState.ctaSub || ''}" 
                           oninput="appState.ctaSub = this.value; renderCanvas();"
                           class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                </div>
            </div>
        </div>
    </div>
    `;

    return html;
}

window.setMarketCardCount = function(count) {
    appState.cardCount = parseInt(count, 10) || 2;
    renderControls();
    renderCanvas();
};

window.setMarketPlatform = function(plat) {
    appState.platform = plat;
    renderControls();
    renderCanvas();
};

window.setMarketBgTheme = function(theme) {
    appState.bgTheme = theme;
    renderControls();
    renderCanvas();
};

window.setMarketLayout = function(layout) {
    appState.displayLayout = layout;
    renderControls();
    renderCanvas();
};

window.setMarketBgLighting = function(lighting) {
    appState.bgLighting = lighting;
    renderControls();
    renderCanvas();
};

window.updateMarketPlayer = function(playerIndex, field, value) {
    const key = 'player' + playerIndex;
    if (!appState[key]) {
        appState[key] = JSON.parse(JSON.stringify(TEMPLATES.market_tracker.defaultState[key] || {}));
    }
    appState[key][field] = value;
    renderCanvas();
};

window.setMarketTrendDir = function(playerIndex, dir) {
    const key = 'player' + playerIndex;
    if (!appState[key]) {
        appState[key] = JSON.parse(JSON.stringify(TEMPLATES.market_tracker.defaultState[key] || {}));
    }
    appState[key].trendDir = dir;
    renderControls();
    renderCanvas();
};

window.autoGenerateMarketSales = function(playerIndex) {
    const key = 'player' + playerIndex;
    if (!appState[key]) {
        appState[key] = JSON.parse(JSON.stringify(TEMPLATES.market_tracker.defaultState[key] || {}));
    }
    const rawPriceStr = (appState[key].price || '100,000').toString();
    const raw = parseInt(rawPriceStr.replace(/[^0-9]/g, ''), 10) || 100000;
    const isUp = (appState[key].trendDir || 'up') === 'up';

    let step = 250;
    if (raw >= 1000000) step = 10000;
    else if (raw >= 100000) step = 1000;
    else if (raw >= 20000) step = 250;
    else step = 100;

    const roundTo = (val, s) => Math.round(val / s) * s;

    const s1 = roundTo(raw + (isUp ? step : -step), step);
    const s2 = s1;
    const s3 = roundTo(raw + (isUp ? step * 2 : 0), step);
    const s4 = s3;

    appState[key].recentSales = `${s1.toLocaleString()} | ${s2.toLocaleString()} | ${s3.toLocaleString()} | ${s4.toLocaleString()}`;

    const minRange = raw > 50000 ? 1000 : 600;
    const maxRange = roundTo(raw * 1.45, raw > 500000 ? 500000 : 50000);
    appState[key].priceRange = `${minRange.toLocaleString()} - ${maxRange.toLocaleString()}`;

    const pct = (Math.random() * 4 + 2.5).toFixed(2);
    const deltaK = Math.round((raw * (parseFloat(pct) / 100)) / 1000);
    appState[key].trend = `${pct}% (${isUp ? '+' : '-'}${deltaK > 0 ? deltaK + 'K' : rawPriceStr})`;
    appState[key].updatedText = `${Math.floor(Math.random() * 50 + 10)} SECS AGO`;

    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast('تم توليد مبيعات فوت بين الذكية 🪄');
};

window.applyMarketStarPreset = function(playerIndex, presetId) {
    const preset = MARKET_STAR_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const key = 'player' + playerIndex;
    appState[key] = JSON.parse(JSON.stringify(preset));
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق كرت ${preset.name} بنجاح ⚡`);
};

window.handleMarketPlayerFileUpload = function(playerIndex, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const key = 'player' + playerIndex;
        if (!appState[key]) appState[key] = {};
        appState[key].cardUrl = e.target.result;
        renderControls();
        renderCanvas();
        if (window.showCopyToast) window.showCopyToast('تم تحميل صورة الكرت بنجاح 🖼️');
    };
    reader.readAsDataURL(file);
};

window.fetchMarketPlayerCard = async function(idx) {
    const input = document.getElementById(`market_p${idx}_cardUrl`);
    const query = input ? input.value.trim() : '';
    if (!query) {
        alert('يرجى كتابة اسم اللاعب أو رابط بطاقته من FUT.GG أو FUTBIN');
        return;
    }
    const btn = document.getElementById(`btn_fetch_p${idx}`);
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'جاري... ⏳';
    }
    try {
        const res = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data && data.success && data.cardImage) {
            const key = 'player' + idx;
            if (!appState[key]) appState[key] = {};
            appState[key].cardUrl = data.cardImage;
            if (data.playerName) {
                appState[key].name = data.playerName;
                appState[key].arName = data.playerName;
            }
            if (data.rating) appState[key].rating = data.rating;
            if (data.position) appState[key].position = data.position;
            renderControls();
            renderCanvas();
            if (window.showCopyToast) window.showCopyToast(`تم جلب كرت ${data.playerName} (${data.rating}) بنجاح ⚡`);
        } else {
            alert('تعذر جلب اللاعب، يرجى كتابة الاسم بدقة بالإنجليزية أو رفع الصورة مباشرة');
        }
    } catch(e) {
        alert('خطأ في جلب الكرت: ' + e.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>⚡ جلب</span>';
        }
    }
};


// =========================================================
// UNIVERSAL STORY BACKGROUND ENGINE & CONTROLS (6 NEW TEMPLATES)
// =========================================================

function getStoryBackgroundHtml(bgThemeKey = 'store', bgLighting = 'bright') {
    const bgMeta = (window.MARKET_BG_THEMES && window.MARKET_BG_THEMES[bgThemeKey]) || {
        url: 'assets/store-bg-pure.png',
        isLight: true,
        style: ''
    };
    const bgUrl = bgMeta.url || (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png');
    const bgCustomStyle = bgMeta.style || '';
    const isLightBg = !!bgMeta.isLight;

    let overlayHtml = '';
    if (bgLighting === 'bright') {
        if (isLightBg) {
            overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-amber-50/15 pointer-events-none"></div>`;
        } else {
            overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"></div>`;
        }
    } else if (bgLighting === 'medium') {
        overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>`;
    } else {
        overlayHtml = `<div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70 pointer-events-none"></div>`;
    }

    return `
        <!-- Background -->
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: center center; ${bgCustomStyle}"></div>
        </div>
        ${overlayHtml}

        <!-- Official Logos -->
        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>
    `;
}

function renderStoryBackgroundControls() {
    const activeBg = appState.bgTheme || 'store';
    const activeLighting = appState.bgLighting || 'bright';
    return `
        <!-- Background Theme & Lighting Controls -->
        <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
            <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span>🖼️</span>
                    <span>خلفية الستوري وإضاءتها:</span>
                </span>
                <span class="text-[10px] font-black text-emerald-600">مشرقة وفاخرة 100%</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                ${Object.values(window.MARKET_BG_THEMES || {}).map(bg => `
                    <button type="button" onclick="setStoryTemplateBgTheme('${bg.id}')" class="p-2 rounded-xl text-right border transition flex flex-col justify-between gap-0.5 cursor-pointer ${activeBg === bg.id ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-black shadow-xs' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}">
                        <span class="text-xs font-black truncate">${bg.name}</span>
                        <span class="text-[9px] text-slate-500 truncate">${bg.desc || ''}</span>
                    </button>
                `).join('')}
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-600">إضاءة الخلفية:</span>
                <div class="flex items-center gap-1">
                    <button type="button" onclick="setStoryTemplateBgLighting('bright')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'bright' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                        ✨ ناصع ومشرق
                    </button>
                    <button type="button" onclick="setStoryTemplateBgLighting('medium')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'medium' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                        🌟 متوازن
                    </button>
                    <button type="button" onclick="setStoryTemplateBgLighting('dim')" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${activeLighting === 'dim' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700'}">
                        🎬 سينمائي
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.setStoryTemplateBgTheme = function(theme) {
    appState.bgTheme = theme;
    renderControls();
    renderCanvas();
};

window.setStoryTemplateBgLighting = function(lighting) {
    appState.bgLighting = lighting;
    renderControls();
    renderCanvas();
};

function renderStoryHeader(layerKey, badgeText, headlineText, subheadlineText, isLightBg) {
    if (!isLayerVisible(layerKey)) return '';
    return `
        <div id="${layerKey}" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle(layerKey, 30)}; width: 100%; max-width: 500px; z-index: 30;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale(layerKey)});">
                ${badgeText ? `
                <div class="px-3.5 py-1 rounded-full bg-slate-950/95 border border-emerald-500/80 shadow-xl text-emerald-400 text-[11px] font-black tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>${badgeText}</span>
                </div>` : ''}

                <h1 class="text-xl font-black ${isLightBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'} leading-tight max-w-[460px] px-2">
                    ${headlineText || ''}
                </h1>

                ${subheadlineText ? `
                <p class="text-[11.5px] ${isLightBg ? 'text-slate-700 font-extrabold drop-shadow-xs' : 'text-slate-300 font-bold drop-shadow'} max-w-[430px] px-2 leading-relaxed">
                    ${subheadlineText}
                </p>` : ''}
            </div>
            ${renderLayerToolbar(layerKey)}
        </div>
    `;
}

function renderStoryCta(layerKey, ctaHeadline, ctaSub) {
    if (!isLayerVisible(layerKey)) return '';
    return `
        <div id="${layerKey}" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle(layerKey, 690)}; width: 100%; max-width: 480px; z-index: 35;">
            <div class="layer-scale-wrapper w-full px-2" style="transform: scale(${getLayerScale(layerKey)});">
                <div class="rounded-2xl bg-gradient-to-r from-slate-950/95 via-[#0c1524]/95 to-slate-950/95 border border-emerald-500/60 p-3 shadow-2xl backdrop-blur-md text-center space-y-2">
                    <div class="text-xs font-black text-emerald-300 flex items-center justify-center gap-1.5">
                        <img src="assets/fc-coin.webp" class="w-4 h-4 object-contain" alt="c">
                        <span>${ctaHeadline || 'متوفر شحن كوينز فوري لجميع المنصات بأفضل الأسعار 💰'}</span>
                    </div>

                    <div class="py-1.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                        <span>${ctaSub || 'للطلب تواصل معنا على الخاص: @shop_coin15 📩'}</span>
                    </div>

                    <div class="flex items-center justify-center gap-3 text-[9.5px] font-bold text-slate-400 pt-0.5">
                        <span>⚡ تسليم فوري</span>
                        <span>•</span>
                        <span>🛡️ ضمان وأمان كامل للنادي</span>
                        <span>•</span>
                        <span>🔒 أمان 100% بدون باند</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar(layerKey)}
        </div>
    `;
}

// ==========================================
// 1. PROMO PACK OPENING TEMPLATE & CONTROLS
// ==========================================

const PROMO_POPULAR_STARS = [
    {
        label: '🔥 مبابي (91)',
        name: 'مبابي (91)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp'
    },
    {
        label: '👑 بيلينغهام (90)',
        name: 'بيلينغهام (90)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp'
    },
    {
        label: '⚡ فينيسيوس (90)',
        name: 'فينيسيوس (90)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp'
    },
    {
        label: '🤖 هالاند (91)',
        name: 'هالاند (91)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp'
    },
    {
        label: '🤙 رونالدينيو (93)',
        name: 'رونالدينيو (93)',
        imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-28130.webp'
    },
    {
        label: '🪄 زيدان (94)',
        name: 'زيدان (94)',
        imageUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-142.webp'
    },
    {
        label: '🚀 ديمبيلي (86)',
        name: 'ديمبيلي (86)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-231443.9d2df34d7d5634b9b794266c24e87ea7079be125a6059c3cdc40db7443a0fe4d.webp'
    },
    {
        label: '💨 باركولا (85)',
        name: 'باركولا (85)',
        imageUrl: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-50596300.9b5dfc98a731bb7f8958c0eec6247d0bc94a42cb7d86de10a1c5482685f6b716.webp'
    }
];

function renderPromoPackTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const s1Url = appState.star1_url || TEMPLATES.promo_pack.defaultState.star1_url;
    const s2Url = appState.star2_url || TEMPLATES.promo_pack.defaultState.star2_url;
    const packImg = appState.packImageUrl || 'assets/fc27_jumbo_gold_pack.png';

    return `
        ${getStoryBackgroundHtml(appState.bgTheme, appState.bgLighting)}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_promo_header', appState.badgeText || TEMPLATES.promo_pack.defaultState.badgeText, appState.headline || TEMPLATES.promo_pack.defaultState.headline, appState.subheadline || TEMPLATES.promo_pack.defaultState.subheadline, isLightBg)}

        <!-- Layer 2: Promo Pack & Walkout Stars Body -->
        ${isLayerVisible('layer_promo_body') ? `
        <div id="layer_promo_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_promo_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_promo_body')});">
                
                <!-- Urgency Countdown Capsule -->
                <div class="px-4 py-1.5 rounded-full bg-red-950/95 border-2 border-red-500/80 shadow-2xl text-red-300 text-xs font-black tracking-wide flex items-center gap-2 animate-pulse">
                    <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span>${appState.timeRemaining || '⏳ متبقي: 14 ساعة فقط'}</span>
                </div>

                <!-- 3D Pack Opening Stage (Pack in center + 2 walkout cards emerging) -->
                <div class="relative w-full h-[300px] flex items-center justify-center my-1">
                    <!-- Radiance Aura -->
                    <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[280px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.32)_0%,rgba(16,185,129,0.12)_45%,transparent_70%)] blur-2xl -z-10"></div>

                    <!-- Right Walkout Card (Star 1 - Right) -->
                    <div class="absolute flex flex-col items-center" style="right: 35px; top: 12px; width: 175px; z-index: 12; transform: rotate(11deg) scale(0.92); filter: drop-shadow(0 16px 28px rgba(0,0,0,0.85));">
                        <img src="${s1Url}" class="w-full object-contain pointer-events-none" alt="">
                        <div class="mt-[-10px] px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-amber-400 text-amber-300 text-[10px] font-black shadow">
                            ⭐ ${appState.star1_name || 'نجم ووك أوت 1'}
                        </div>
                    </div>

                    <!-- Left Walkout Card (Star 2 - Left) -->
                    <div class="absolute flex flex-col items-center" style="left: 35px; top: 12px; width: 175px; z-index: 10; transform: rotate(-11deg) scale(0.92); filter: drop-shadow(0 16px 28px rgba(0,0,0,0.85));">
                        <img src="${s2Url}" class="w-full object-contain pointer-events-none" alt="">
                        <div class="mt-[-10px] px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-amber-400 text-amber-300 text-[10px] font-black shadow">
                            ⭐ ${appState.star2_name || 'نجم ووك أوت 2'}
                        </div>
                    </div>

                    <!-- Center Pack Image (Floating in front) -->
                    <div class="relative z-20 flex flex-col items-center" style="width: 225px; filter: drop-shadow(0 20px 35px rgba(0,0,0,0.9));">
                        <img src="${packImg}" class="w-full object-contain pointer-events-none" alt="Pack">
                    </div>
                </div>

                <!-- Pack Info & Coin Price Box -->
                <div class="w-full max-w-[460px] rounded-2xl bg-gradient-to-r from-[#0d1522]/95 via-[#080d17]/95 to-[#0d1522]/95 border-2 border-amber-500/70 p-3 shadow-2xl backdrop-blur-md text-center space-y-1.5">
                    <div class="text-sm font-black text-amber-300 flex items-center justify-center gap-1.5">
                        <span>🎁</span>
                        <span>${appState.packTitle || 'باكدج نجوم النخبة 85+ x10'}</span>
                    </div>

                    <div class="text-[11px] font-bold text-slate-300">
                        ${appState.packSub || 'فرصة خروج أيقونة أو لاعب حدث خارق 100%'}
                    </div>

                    <div class="pt-1 border-t border-[#1e293b] flex items-center justify-between px-3">
                        <span class="text-xs font-bold text-slate-400">سعر الباكدج بالمتجر:</span>
                        <div class="flex items-center gap-1.5" dir="ltr">
                            <img src="assets/fc-coin.webp" class="w-5 h-5 object-contain" alt="c">
                            <span class="text-lg font-black font-mono text-amber-400">${appState.packPrice || '650,000 كوينز'}</span>
                        </div>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_promo_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_promo_cta', appState.ctaHeadline || TEMPLATES.promo_pack.defaultState.ctaHeadline, appState.ctaSub || TEMPLATES.promo_pack.defaultState.ctaSub)}
    `;
}

function renderPromoPackControls() {
    const defaultS1 = TEMPLATES.promo_pack.defaultState.star1_url;
    const defaultS2 = TEMPLATES.promo_pack.defaultState.star2_url;
    const currentS1 = appState.star1_url || defaultS1;
    const currentS2 = appState.star2_url || defaultS2;
    const currentPackImg = appState.packImageUrl || 'assets/fc27_jumbo_gold_pack.png';

    return `
        <div class="space-y-4">
            <!-- 1. Pack Details & Image -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>🎁</span>
                        <span>تفاصيل باكدج المتجر والصورة:</span>
                    </span>
                    <span class="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        باك المتجر الرسمي
                    </span>
                </div>

                <!-- Pack Name -->
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">اسم الباكدج بالمتجر:</label>
                    <input type="text" value="${appState.packTitle || ''}" placeholder="اكتب اسم الباكدج (مثال: باكدج 85+ x10، باكدج الأيقونة...)" oninput="appState.packTitle = this.value; renderCanvas();" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                </div>

                <!-- Pack Image Customizer -->
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <label class="block text-[11px] font-bold text-slate-700">صورة الباكدج:</label>
                    <div class="flex items-center gap-2">
                        <div class="w-12 h-12 shrink-0 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
                            <img src="${currentPackImg}" class="max-w-full max-h-full object-contain" alt="Pack Preview">
                        </div>
                        <div class="flex-1 flex flex-col gap-1.5">
                            <input type="text" value="${appState.packImageUrl || ''}" placeholder="رابط صورة الباكدج أو ارفع سكرين شوت من المتجر" oninput="appState.packImageUrl = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] font-mono outline-none focus:border-emerald-500">
                            <div class="flex items-center gap-1.5">
                                <label class="flex-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10.5px] font-bold cursor-pointer transition flex items-center justify-center gap-1 shadow-2xs">
                                    <span>📁 رفع صورة الباك من جهازك</span>
                                    <input type="file" accept="image/*" class="hidden" onchange="handlePromoPackFileUpload('pack', this)">
                                </label>
                                <button type="button" onclick="appState.packImageUrl = 'assets/fc27_jumbo_gold_pack.png'; renderControls(); renderCanvas();" class="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold transition shadow-2xs">
                                    🔄 الافتراضي
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Price & Timer -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">سعر الباكدج بالكوينز:</label>
                        <input type="text" value="${appState.packPrice || ''}" placeholder="مثال: 650,000 كوينز" oninput="appState.packPrice = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">العداد الزمني المتبقي:</label>
                        <input type="text" value="${appState.timeRemaining || ''}" placeholder="مثال: ⏳ متبقي: 14 ساعة فقط" oninput="appState.timeRemaining = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                </div>

                <!-- Sub Description -->
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">الوصف الفرعي للباكدج:</label>
                    <input type="text" value="${appState.packSub || ''}" placeholder="مثال: فرصة خروج أيقونة أو لاعب حدث خارق 100%" oninput="appState.packSub = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                </div>
            </div>

            <!-- 2. Walkout Star Cards (Direct FUTBIN / FUT.GG Fetch) -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <span>⭐</span>
                        <span>بطاقات الووك أوت الخارجة من الباكدج (FUTBIN / FUT.GG):</span>
                    </span>
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        سحب فوري ⚡
                    </span>
                </div>

                <!-- Star 1 (Right) -->
                <div class="p-3 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">1</span>
                            <span class="text-xs font-black text-slate-800">النجم الأول (على اليمين):</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <img src="${currentS1}" class="w-6 h-8 object-contain rounded border border-slate-200 bg-white" alt="">
                            <span class="text-[10.5px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full" id="promo_star_badge_1">
                                ${appState.star1_name || 'مبابي (91)'}
                            </span>
                        </div>
                    </div>

                    <!-- Search & Fetch Input -->
                    <div class="flex gap-1.5">
                        <input type="text" id="input_promo_star_1" placeholder="ضع رابط اللاعب من FUTBIN أو FUT.GG أو اسمه (مثال: مبابي أو 231747)" class="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600 transition shadow-2xs">
                        <button id="btn_fetch_promo_star_1" type="button" onclick="fetchPromoPackStar(1)" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs cursor-pointer">
                            <span>⚡ سحب</span>
                        </button>
                        <label class="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1 shadow-2xs" title="رفع صورة كرت">
                            <span>📁 رفع</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handlePromoPackFileUpload('star1', this)">
                        </label>
                    </div>

                    <!-- Quick Popular Stars Chips -->
                    <div>
                        <div class="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1">
                            <span>🌟 اختيار سريع لنجم النخبة:</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${PROMO_POPULAR_STARS.map(s => `
                                <button type="button" onclick="setPromoPackStar(1, '${s.imageUrl}', '${s.name}')" class="px-2 py-0.5 rounded-md bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-700 transition shadow-2xs cursor-pointer">
                                    ${s.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Name override input -->
                    <div class="pt-1.5 border-t border-slate-200/70 flex items-center gap-2">
                        <label class="text-[10px] font-bold text-slate-600 shrink-0">اسم النجم المعروض:</label>
                        <input type="text" value="${appState.star1_name || ''}" placeholder="اسم النجم" oninput="appState.star1_name = this.value; renderCanvas();" class="flex-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>

                <!-- Star 2 (Left) -->
                <div class="p-3 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">2</span>
                            <span class="text-xs font-black text-slate-800">النجم الثاني (على اليسار):</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <img src="${currentS2}" class="w-6 h-8 object-contain rounded border border-slate-200 bg-white" alt="">
                            <span class="text-[10.5px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full" id="promo_star_badge_2">
                                ${appState.star2_name || 'بيلينغهام (90)'}
                            </span>
                        </div>
                    </div>

                    <!-- Search & Fetch Input -->
                    <div class="flex gap-1.5">
                        <input type="text" id="input_promo_star_2" placeholder="ضع رابط اللاعب من FUTBIN أو FUT.GG أو اسمه (مثال: بيلينغهام أو 252371)" class="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600 transition shadow-2xs">
                        <button id="btn_fetch_promo_star_2" type="button" onclick="fetchPromoPackStar(2)" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs cursor-pointer">
                            <span>⚡ سحب</span>
                        </button>
                        <label class="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1 shadow-2xs" title="رفع صورة كرت">
                            <span>📁 رفع</span>
                            <input type="file" accept="image/*" class="hidden" onchange="handlePromoPackFileUpload('star2', this)">
                        </label>
                    </div>

                    <!-- Quick Popular Stars Chips -->
                    <div>
                        <div class="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1">
                            <span>🌟 اختيار سريع لنجم النخبة:</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${PROMO_POPULAR_STARS.map(s => `
                                <button type="button" onclick="setPromoPackStar(2, '${s.imageUrl}', '${s.name}')" class="px-2 py-0.5 rounded-md bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[10px] font-bold text-slate-700 transition shadow-2xs cursor-pointer">
                                    ${s.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Name override input -->
                    <div class="pt-1.5 border-t border-slate-200/70 flex items-center gap-2">
                        <label class="text-[10px] font-bold text-slate-600 shrink-0">اسم النجم المعروض:</label>
                        <input type="text" value="${appState.star2_name || ''}" placeholder="اسم النجم" oninput="appState.star2_name = this.value; renderCanvas();" class="flex-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
            </div>

            <!-- 3. Headline & CTA Texts -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <span class="text-xs font-black text-slate-800 block">📝 نصوص الإعلان والشحن:</span>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">شارة التنبيه العلوية:</label>
                    <input type="text" value="${appState.badgeText || ''}" oninput="appState.badgeText = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">العنوان الرئيسي:</label>
                    <input type="text" value="${appState.headline || ''}" oninput="appState.headline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">الوصف التحفيزي:</label>
                    <input type="text" value="${appState.subheadline || ''}" oninput="appState.subheadline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div class="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">نص النداء للطلب (CTA):</label>
                        <input type="text" value="${appState.ctaHeadline || ''}" oninput="appState.ctaHeadline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">وصف الطلب / الحساب:</label>
                        <input type="text" value="${appState.ctaSub || ''}" oninput="appState.ctaSub = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.fetchPromoPackStar = async function(starIndex) {
    const input = document.getElementById(`input_promo_star_${starIndex}`);
    if (!input || !input.value.trim()) {
        alert('يرجى وضع رابط اللاعب من FUTBIN أو FUT.GG أو اسمه أو رقم ID اللاعب');
        return;
    }
    const val = input.value.trim();
    const btn = document.getElementById(`btn_fetch_promo_star_${starIndex}`);
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>جاري...</span> <span class="animate-spin">⏳</span>';
    }

    try {
        const res = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(val)}`);
        if (!res.ok) {
            throw new Error(`استجابة غير صالحة من السيرفر (${res.status})`);
        }
        const data = await res.json();
        if (data.success && data.cardImage) {
            const displayName = `${data.playerName}${data.rating ? ' (' + data.rating + ')' : ''}`;
            window.setPromoPackStar(starIndex, data.cardImage, displayName);
            input.value = '';
            if (window.showCopyToast) window.showCopyToast(`تم جلب كرت ${displayName} بنجاح! ⚡`);
        } else {
            alert(data.error || 'تعذر سحب كرت اللاعب. تأكد من صحة الرابط أو اسم اللاعب');
        }
    } catch (err) {
        alert('حدث خطأ أثناء سحب الكرت: ' + err.message + '\nيمكنك أيضاً رفع صورة الكرت مباشرة 📁');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
};

window.setPromoPackStar = function(starIndex, imageUrl, name) {
    if (starIndex === 1) {
        appState.star1_url = imageUrl;
        appState.star1_name = name;
    } else if (starIndex === 2) {
        appState.star2_url = imageUrl;
        appState.star2_name = name;
    }
    renderControls();
    renderCanvas();
};

window.handlePromoPackFileUpload = function(type, fileInput) {
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        if (type === 'pack') {
            appState.packImageUrl = e.target.result;
            renderControls();
            renderCanvas();
            if (window.showCopyToast) window.showCopyToast('تم تحديث صورة الباكدج بنجاح! 🎁');
        } else if (type === 'star1') {
            window.setPromoPackStar(1, e.target.result, 'كرت مخصص 1 📁');
        } else if (type === 'star2') {
            window.setPromoPackStar(2, e.target.result, 'كرت مخصص 2 📁');
        }
    };
    reader.readAsDataURL(file);
};

// ==========================================
// 2. FUT CHAMPS WEEKEND LEAGUE SQUAD TEMPLATE
// ==========================================

const CHAMPS_SQUAD_PRESETS = [
    {
        id: 'meta_15w',
        name: 'تشكيلة الـ 15 فوز (مبابي، بيلينغهام، فان دايك)',
        formation: 'خطة 4-3-2-1 الميتا',
        rankTarget: '🏆 تشكيلة رانك 1 (15+ فوز مضمون)',
        squadBudget: '850,000 كوينز',
        chemistry: '33 / 33 كيمياء كاملة',
        headline: 'التشكيلة الميتا لرانك 1 في الفوت تشامبيونز! قفلها اليوم ⚽⚡'
    },
    {
        id: 'starter_budget',
        name: 'تشكيلة البداية الاقتصادية 450k',
        formation: 'خطة 4-2-3-1 السريعة',
        rankTarget: '⚡ تشكيلة الفوز السريع بأقل ميزانية',
        squadBudget: '450,000 كوينز',
        chemistry: '33 / 33 كيمياء كاملة',
        headline: 'تشكيلة الميزانية الاقتصادية للفوت تشامبيونز! نتائج خارقة 💰🔥'
    },
    {
        id: 'vip_whales',
        name: 'تشكيلة الحيتان الأسطورية (3.2M)',
        formation: 'خطة 4-4-2 الكلاسيكية',
        rankTarget: '👑 تشكيلة الحيتان VIP (مستوى المحترفين)',
        squadBudget: '3,200,000 كوينز',
        chemistry: '33 / 33 كيمياء كاملة',
        headline: 'تشكيلة الحيتان التي لا تُهزم! سيطر على الفوت بالكامل 👑⚡'
    }
];

function renderChampsSquadTemplate() {
    appState.bgTheme = 'store';
    appState.bgLighting = 'bright';
    const isLightBg = true;
    const c1 = appState.card1 || TEMPLATES.champs_squad.defaultState.card1;
    const c2 = appState.card2 || TEMPLATES.champs_squad.defaultState.card2;
    const c3 = appState.card3 || TEMPLATES.champs_squad.defaultState.card3;

    const formatFormation = (f) => String(f || '').replace(/(\d+[-/]\d+(?:[-/]\d+)*)/g, '<span dir="ltr" class="inline-block font-mono font-black mx-0.5">$1</span>');

    return `
        ${getStoryBackgroundHtml('store', 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_champs_header', appState.badgeText || TEMPLATES.champs_squad.defaultState.badgeText, appState.headline || TEMPLATES.champs_squad.defaultState.headline, appState.subheadline || TEMPLATES.champs_squad.defaultState.subheadline, isLightBg)}

        <!-- Layer 2: Champs Squad Body -->
        ${isLayerVisible('layer_champs_body') ? `
        <div id="layer_champs_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_champs_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_champs_body')});">
                
                <!-- Tactical Badges Ribbon -->
                <div class="w-full max-w-[480px] flex items-center justify-center gap-2 text-center">
                    <div class="px-3 py-1 rounded-xl bg-slate-950/95 border border-emerald-500/80 shadow-lg text-emerald-400 text-xs font-black">
                        <span>⚽</span> <span>${formatFormation(appState.formation || 'خطة 4-3-2-1 الميتا')}</span>
                    </div>
                    <div class="px-3 py-1 rounded-xl bg-slate-950/95 border border-amber-500/80 shadow-lg text-amber-300 text-xs font-black">
                        <span>💎</span> <span>${formatFormation(appState.chemistry || '33 / 33 كيمياء كاملة')}</span>
                    </div>
                    <div class="px-3 py-1 rounded-xl bg-slate-950/95 border border-teal-500/80 shadow-lg text-teal-300 text-xs font-black">
                        <bdi>${appState.rankTarget || '🏆 رانك 1'}</bdi>
                    </div>
                </div>

                <!-- 3 Squad Core Pillars in Podium Lineup -->
                <div class="relative w-full h-[285px] flex items-center justify-center gap-2 px-1 my-1">
                    <!-- Pillar 1: Striker (Left) -->
                    <div class="flex-1 flex flex-col items-center max-w-[155px]" style="transform: rotate(-3deg);">
                        <div class="px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400 text-emerald-300 text-[9.5px] font-black truncate max-w-full mb-1">
                            ${c1.role || 'الهداف (ST)'}
                        </div>
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${c1.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c1.name}</span>
                            <span class="text-[10px] font-mono text-emerald-400 font-bold block">${c1.rating}</span>
                        </div>
                    </div>

                    <!-- Pillar 2: Midfield Playmaker (Center Elevated) -->
                    <div class="flex-1 flex flex-col items-center max-w-[170px] -mt-4 z-20">
                        <div class="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black shadow truncate max-w-full mb-1">
                            👑 ${c2.role || 'الكنترول (CAM)'}
                        </div>
                        <div class="relative w-full h-[200px] flex items-center justify-center">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.28)_0%,transparent_70%)] blur-xl -z-10"></div>
                            <img src="${c2.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)]" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c2.name}</span>
                            <span class="text-[10px] font-mono text-amber-400 font-bold block">${c2.rating}</span>
                        </div>
                    </div>

                    <!-- Pillar 3: Defender (Right) -->
                    <div class="flex-1 flex flex-col items-center max-w-[155px]" style="transform: rotate(3deg);">
                        <div class="px-2 py-0.5 rounded-full bg-slate-950/90 border border-teal-400 text-teal-300 text-[9.5px] font-black truncate max-w-full mb-1">
                            ${c3.role || 'الدفاع (CB)'}
                        </div>
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${c3.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c3.name}</span>
                            <span class="text-[10px] font-mono text-teal-400 font-bold block">${c3.rating}</span>
                        </div>
                    </div>
                </div>

                <!-- Squad Total Budget Capsule -->
                <div class="w-full max-w-[460px] rounded-2xl bg-[#090e18]/95 border-2 border-emerald-500/70 p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-between px-4">
                    <div class="text-right">
                        <span class="text-[11px] font-bold text-slate-400 block">الميزانية الإجمالية لبناء التشكيلة:</span>
                        <span class="text-xs font-black text-emerald-400">شحن فوري كامل بخصم 10% ⚡</span>
                    </div>
                    <div class="flex items-center gap-1.5" dir="ltr">
                        <img src="assets/fc-coin.webp" class="w-6 h-6 object-contain" alt="c">
                        <span class="text-xl font-black font-mono text-white">${appState.squadBudget || '850,000 كوينز'}</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_champs_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_champs_cta', appState.ctaHeadline || TEMPLATES.champs_squad.defaultState.ctaHeadline, appState.ctaSub || TEMPLATES.champs_squad.defaultState.ctaSub)}
    `;
}

function renderChampsSquadControls() {
    const c1 = appState.card1 || TEMPLATES.champs_squad.defaultState.card1;
    const c2 = appState.card2 || TEMPLATES.champs_squad.defaultState.card2;
    const c3 = appState.card3 || TEMPLATES.champs_squad.defaultState.card3;

    const players = [
        { index: 1, defaultRole: 'الهداف الحاسم (ST)', title: 'اللاعب الأول (اليمين / ST)', data: c1 },
        { index: 2, defaultRole: 'صانع الألعاب والكنترول (CAM)', title: 'اللاعب الثاني (الوسط المرتفع / CAM)', data: c2 },
        { index: 3, defaultRole: 'الجدار الدفاعي (CB)', title: 'اللاعب الثالث (اليسار / CB)', data: c3 }
    ];

    return `
        <div class="space-y-4">
            <!-- 1. Tactical Setup & Budget -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>⚔️</span>
                        <span>التكتيك وميزانية التشكيلة:</span>
                    </span>
                    <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        تشكيلة الفوت الميتا
                    </span>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">الخطة التكتيكية:</label>
                        <input type="text" value="${appState.formation || ''}" 
                               placeholder="خطة 4-3-2-1 الميتا"
                               oninput="appState.formation = this.value; renderCanvas();" 
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">ميزانية التشكيلة الإجمالية:</label>
                        <input type="text" value="${appState.squadBudget || ''}" 
                               placeholder="850,000 كوينز"
                               oninput="appState.squadBudget = this.value; renderCanvas();" 
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">الكيمياء:</label>
                        <input type="text" value="${appState.chemistry || ''}" 
                               placeholder="33 / 33 كيمياء كاملة"
                               oninput="appState.chemistry = this.value; renderCanvas();" 
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">الهدف / الرانك المتوقع:</label>
                        <input type="text" value="${appState.rankTarget || ''}" 
                               placeholder="🏆 تشكيلة رانك 1 (15+ فوز مضمون)"
                               oninput="appState.rankTarget = this.value; renderCanvas();" 
                               class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                    </div>
                </div>
            </div>

            <!-- 2. Core Players Data with Search & Upload -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>👥</span>
                        <span>ركائز ونجوم التشكيلة الثلاثة:</span>
                    </span>
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        سحب مباشر من FUT.GG ⚡
                    </span>
                </div>

                ${players.map(p => `
                    <div class="p-3 bg-slate-50/80 rounded-xl space-y-2.5 border border-slate-200">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">${p.index}</span>
                                <span class="text-xs font-black text-slate-800">${p.title}:</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <img src="${p.data.url}" class="w-6 h-8 object-contain rounded border border-slate-200 bg-white" alt="">
                                <span class="text-[10.5px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    ${p.data.name || ''} (${p.data.rating || ''})
                                </span>
                            </div>
                        </div>

                        <!-- Live Fetch or File Upload -->
                        <div class="flex gap-1.5">
                            <input type="text" id="input_champs_p${p.index}" 
                                   placeholder="ابحث باسم اللاعب (مثال: مبابي، بيلينغهام) أو رابط FUT.GG"
                                   onkeydown="if(event.key==='Enter') fetchChampsPlayerCard(${p.index})"
                                   class="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-[11px] outline-none focus:border-emerald-600 transition shadow-2xs">
                            <button id="btn_fetch_champs_p${p.index}" type="button" onclick="fetchChampsPlayerCard(${p.index})" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shrink-0 flex items-center gap-1 shadow-xs cursor-pointer">
                                <span>⚡ سحب</span>
                            </button>
                            <label class="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer transition shrink-0 flex items-center gap-1 shadow-2xs" title="رفع صورة كرت">
                                <span>📁 رفع</span>
                                <input type="file" accept="image/*" class="hidden" onchange="handleChampsPlayerUpload(${p.index}, this)">
                            </label>
                        </div>

                        <!-- Manual Fields: Name, Rating, Role -->
                        <div class="grid grid-cols-3 gap-1.5 pt-1">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">اسم اللاعب:</label>
                                <input type="text" value="${p.data.name || ''}" 
                                       placeholder="الاسم" 
                                       oninput="updateChampsPlayer(${p.index}, 'name', this.value)" 
                                       class="w-full px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">التقييم والمركز:</label>
                                <input type="text" value="${p.data.rating || ''}" 
                                       placeholder="91 ST" 
                                       oninput="updateChampsPlayer(${p.index}, 'rating', this.value)" 
                                       class="w-full px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">الدور بالتشكيلة:</label>
                                <input type="text" value="${p.data.role || p.defaultRole}" 
                                       placeholder="${p.defaultRole}" 
                                       oninput="updateChampsPlayer(${p.index}, 'role', this.value)" 
                                       class="w-full px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 mb-0.5">رابط صورة الكرت المباشر:</label>
                            <input type="text" value="${p.data.url || ''}" 
                                   placeholder="رابط الصورة" 
                                   oninput="updateChampsPlayer(${p.index}, 'url', this.value)" 
                                   class="w-full px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[10.5px] font-mono outline-none focus:border-emerald-500">
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- 3. Headlines & CTA Settings -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                    <span class="text-xs font-black text-slate-900">✍️ نصوص وعروض الستوري:</span>
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">شارة التنبيه العلوية:</label>
                    <input type="text" value="${appState.badgeText || ''}" 
                           oninput="appState.badgeText = this.value; renderCanvas();" 
                           class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">العنوان الرئيسي للستوري:</label>
                    <input type="text" value="${appState.headline || ''}" 
                           oninput="appState.headline = this.value; renderCanvas();" 
                           class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">الوصف التحفيزي:</label>
                    <input type="text" value="${appState.subheadline || ''}" 
                           oninput="appState.subheadline = this.value; renderCanvas();" 
                           class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-emerald-500 focus:bg-white">
                </div>

                <div class="pt-2 border-t border-slate-100 space-y-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">عنوان بانر المتجر (CTA):</label>
                        <input type="text" value="${appState.ctaHeadline || ''}" 
                               oninput="appState.ctaHeadline = this.value; renderCanvas();" 
                               class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">نص زر الطلب عبر الخاص:</label>
                        <input type="text" value="${appState.ctaSub || ''}" 
                               oninput="appState.ctaSub = this.value; renderCanvas();" 
                               class="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white">
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.updateChampsPlayer = function(playerIndex, field, value) {
    const key = 'card' + playerIndex;
    if (!appState[key]) {
        appState[key] = JSON.parse(JSON.stringify(TEMPLATES.champs_squad.defaultState[key] || {}));
    }
    appState[key][field] = value;
    renderCanvas();
};

window.fetchChampsPlayerCard = async function(playerIndex) {
    const input = document.getElementById(`input_champs_p${playerIndex}`);
    if (!input || !input.value.trim()) {
        alert('يرجى كتابة اسم اللاعب (مثل مبابي أو بيلينغهام) أو لصق رابط الكرت من FUT.GG أو فوت بين');
        return;
    }
    const val = input.value.trim();
    const btn = document.getElementById(`btn_fetch_champs_p${playerIndex}`);
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>جاري...</span> <span class="animate-spin">⏳</span>';
    }

    try {
        const res = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(val)}`);
        if (!res.ok) throw new Error(`خطأ في السيرفر (${res.status})`);
        const data = await res.json();
        if (data.success && data.cardImage) {
            const key = 'card' + playerIndex;
            if (!appState[key]) {
                appState[key] = JSON.parse(JSON.stringify(TEMPLATES.champs_squad.defaultState[key] || {}));
            }
            appState[key].url = data.cardImage;
            if (data.playerName) appState[key].name = data.playerName;
            if (data.rating) appState[key].rating = `${data.rating} ${data.position || ''}`.trim();
            input.value = '';
            renderControls();
            renderCanvas();
            if (window.showCopyToast) window.showCopyToast(`تم جلب كرت ${data.playerName} بنجاح! ⚡`);
        } else {
            alert(data.error || 'تعذر سحب كرت اللاعب. تأكد من الاسم أو الرابط');
        }
    } catch (e) {
        alert('حدث خطأ أثناء جلب الكرت: ' + e.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
};

window.handleChampsPlayerUpload = function(playerIndex, fileInput) {
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const key = 'card' + playerIndex;
        if (!appState[key]) {
            appState[key] = JSON.parse(JSON.stringify(TEMPLATES.champs_squad.defaultState[key] || {}));
        }
        appState[key].url = e.target.result;
        renderControls();
        renderCanvas();
        if (window.showCopyToast) window.showCopyToast(`تم رفع كرت اللاعب ${playerIndex} بنجاح! 📁`);
    };
    reader.readAsDataURL(file);
};

window.applyChampsSquadPreset = function(presetId) {
    const p = CHAMPS_SQUAD_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق ${p.name} ⚽✨`);
};

// ==========================================
// 3. EVOLUTION BEFORE & AFTER BOOST TEMPLATE
// ==========================================

const EVO_BOOST_PRESETS = [
    {
        id: 'evo_barcola',
        name: 'إيفو باركولا (80 -> 87 LW)',
        evoTitle: 'تطوير: الجناح الفولاذي (Relentless Winger)',
        evoCost: '100,000 كوينز',
        boostSummary: '+12 سرعة • +14 تسديد • +11 مراوغة',
        headline: 'حوّل كرت بـ 15 ألف إلى أسطورة أقوى من كروت الملايين! 🤯🔥'
    },
    {
        id: 'evo_dembele',
        name: 'إيفو ديمبيلي (86 -> 90 RW)',
        evoTitle: 'تطوير: ساحر المهارات (5-Star Skill Maestro)',
        evoCost: '150,000 كوينز',
        boostSummary: '+8 سرعة • +12 تسديد • +9 تمرير',
        headline: 'طوّر ديمبيلي إلى غول لا يمكن إيقافه في الفوت! ⚡⚽'
    }
];

function renderEvoBoostTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const bCard = appState.beforeCard || TEMPLATES.evo_boost.defaultState.beforeCard;
    const aCard = appState.afterCard || TEMPLATES.evo_boost.defaultState.afterCard;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme, appState.bgLighting)}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_evo_header', appState.badgeText || TEMPLATES.evo_boost.defaultState.badgeText, appState.headline || TEMPLATES.evo_boost.defaultState.headline, appState.subheadline || TEMPLATES.evo_boost.defaultState.subheadline, isLightBg)}

        <!-- Layer 2: Evo Boost Arena Body -->
        ${isLayerVisible('layer_evo_body') ? `
        <div id="layer_evo_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_evo_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_evo_body')});">
                
                <!-- Evo Badge & Activation Cost Pill -->
                <div class="px-4 py-1.5 rounded-full bg-slate-950/95 border-2 border-emerald-400 text-emerald-300 text-xs font-black shadow-xl flex items-center gap-2">
                    <span>🧬 ${appState.evoTitle || 'تطوير: الجناح الفولاذي'}</span>
                    <span>•</span>
                    <span class="text-amber-400 font-mono">🪙 ${appState.evoCost || '100,000 كوينز'}</span>
                </div>

                <!-- Side by Side: Before vs After Arena -->
                <div class="relative w-full h-[280px] flex items-center justify-center gap-2 px-1 my-1">
                    <!-- Left: Before Card -->
                    <div class="flex-1 flex flex-col items-center max-w-[210px] opacity-85">
                        <div class="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black mb-1 border border-slate-700">
                            قبل التطوير (${bCard.rating || '80'})
                        </div>
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${bCard.url}" class="max-h-full max-w-full object-contain filter grayscale-[25%] drop-shadow" alt="">
                        </div>
                        <div class="w-full bg-slate-900/90 rounded-xl p-1.5 border border-slate-800 text-center mt-1" dir="ltr">
                            <div class="text-[9.5px] font-mono text-slate-300 flex items-center justify-around font-bold">
                                <span>PAC ${bCard.pac || '89'}</span>
                                <span>SHO ${bCard.sho || '71'}</span>
                                <span>DRI ${bCard.dri || '82'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Center Transformation Surge Arrow -->
                    <div class="relative z-20 flex flex-col items-center shrink-0 -my-2">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(16,185,129,0.8)] flex items-center justify-center text-slate-950 font-black text-base animate-pulse">
                            ⚡
                        </div>
                        <span class="text-[9px] font-black text-emerald-400 mt-1 whitespace-nowrap">طفرة إيفو</span>
                    </div>

                    <!-- Right: After Card (Upgraded Beast) -->
                    <div class="flex-1 flex flex-col items-center max-w-[210px]">
                        <div class="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-black mb-1 shadow">
                            ⭐ بعد التطوير (${aCard.rating || '87'})
                        </div>
                        <div class="relative w-full h-[190px] flex items-center justify-center">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.32)_0%,transparent_70%)] blur-xl -z-10"></div>
                            <img src="${aCard.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)]" alt="">
                        </div>
                        <div class="w-full bg-[#081510]/95 rounded-xl p-1.5 border border-emerald-500 text-center mt-1" dir="ltr">
                            <div class="text-[10px] font-mono text-emerald-300 flex items-center justify-around font-black">
                                <span>PAC ${aCard.pac || '98'}🔥</span>
                                <span>SHO ${aCard.sho || '85'}🔥</span>
                                <span>DRI ${aCard.dri || '93'}🔥</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stat Boost Summary Pill -->
                <div class="w-full max-w-[460px] rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-950/90 to-emerald-950/90 border border-emerald-500/60 p-2 text-center text-xs font-black text-emerald-300 shadow-xl">
                    🔥 إجمالي التطوير: ${appState.boostSummary || '+12 سرعة • +14 تسديد • +11 مراوغة'}
                </div>
            </div>
            ${renderLayerToolbar('layer_evo_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_evo_cta', appState.ctaHeadline || TEMPLATES.evo_boost.defaultState.ctaHeadline, appState.ctaSub || TEMPLATES.evo_boost.defaultState.ctaSub)}
    `;
}

function renderEvoBoostControls() {
    return `
        <div class="space-y-4">
            <!-- 1. Background Selection -->
            ${renderStoryBackgroundControls()}

            <!-- 2. 1-Click Presets -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span class="text-xs font-black text-slate-800 block">⚡ قوالب إيفو جاهزة:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    ${EVO_BOOST_PRESETS.map(p => `
                        <button type="button" onclick="applyEvoBoostPreset('${p.id}')" class="p-2 rounded-xl text-right border transition bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-800 text-xs font-bold">
                            ${p.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 3. Evo Setup Details -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <span class="text-xs font-black text-slate-800 block">🧬 بيانات التطوير والتكلفة:</span>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">اسم الإيفولوشن:</label>
                        <input type="text" value="${appState.evoTitle || ''}" oninput="appState.evoTitle = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">تكلفة التفعيل بالكوينز:</label>
                        <input type="text" value="${appState.evoCost || ''}" oninput="appState.evoCost = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">شريط ملخص التطوير:</label>
                    <input type="text" value="${appState.boostSummary || ''}" oninput="appState.boostSummary = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>

            <!-- 4. Before & After Cards Data -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <span class="text-xs font-black text-slate-800 block">🔄 بيانات الكرت قبل وبعد:</span>
                
                <div class="p-2 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200">
                    <span class="text-[11px] font-bold text-slate-700 block">الكرت قبل التطوير:</span>
                    <div class="grid grid-cols-4 gap-1">
                        <input type="text" value="${appState.beforeCard?.pac || '89'}" placeholder="PAC" oninput="if(!appState.beforeCard) appState.beforeCard={}; appState.beforeCard.pac=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-slate-200 text-xs text-center font-mono">
                        <input type="text" value="${appState.beforeCard?.sho || '71'}" placeholder="SHO" oninput="if(!appState.beforeCard) appState.beforeCard={}; appState.beforeCard.sho=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-slate-200 text-xs text-center font-mono">
                        <input type="text" value="${appState.beforeCard?.dri || '82'}" placeholder="DRI" oninput="if(!appState.beforeCard) appState.beforeCard={}; appState.beforeCard.dri=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-slate-200 text-xs text-center font-mono">
                        <input type="text" value="${appState.beforeCard?.rating || '80 LW'}" placeholder="التقييم" oninput="if(!appState.beforeCard) appState.beforeCard={}; appState.beforeCard.rating=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-slate-200 text-xs text-center font-mono">
                    </div>
                    <input type="text" value="${appState.beforeCard?.url || ''}" placeholder="رابط صورة الكرت قبل" oninput="if(!appState.beforeCard) appState.beforeCard={}; appState.beforeCard.url=this.value; renderCanvas();" class="w-full px-2 py-1 rounded bg-white border border-slate-200 text-[10.5px] font-mono">
                </div>

                <div class="p-2 bg-emerald-50/50 rounded-xl space-y-1.5 border border-emerald-200">
                    <span class="text-[11px] font-black text-emerald-900 block">الكرت بعد التطوير (الوحش):</span>
                    <div class="grid grid-cols-4 gap-1">
                        <input type="text" value="${appState.afterCard?.pac || '98'}" placeholder="PAC" oninput="if(!appState.afterCard) appState.afterCard={}; appState.afterCard.pac=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-emerald-300 text-xs text-center font-mono font-bold">
                        <input type="text" value="${appState.afterCard?.sho || '85'}" placeholder="SHO" oninput="if(!appState.afterCard) appState.afterCard={}; appState.afterCard.sho=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-emerald-300 text-xs text-center font-mono font-bold">
                        <input type="text" value="${appState.afterCard?.dri || '93'}" placeholder="DRI" oninput="if(!appState.afterCard) appState.afterCard={}; appState.afterCard.dri=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-emerald-300 text-xs text-center font-mono font-bold">
                        <input type="text" value="${appState.afterCard?.rating || '87 LW'}" placeholder="التقييم" oninput="if(!appState.afterCard) appState.afterCard={}; appState.afterCard.rating=this.value; renderCanvas();" class="px-1.5 py-1 rounded bg-white border border-emerald-300 text-xs text-center font-mono font-bold">
                    </div>
                    <input type="text" value="${appState.afterCard?.url || ''}" placeholder="رابط صورة الكرت بعد" oninput="if(!appState.afterCard) appState.afterCard={}; appState.afterCard.url=this.value; renderCanvas();" class="w-full px-2 py-1 rounded bg-white border border-emerald-200 text-[10.5px] font-mono">
                </div>
            </div>
        </div>
    `;
}

window.applyEvoBoostPreset = function(presetId) {
    const p = EVO_BOOST_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق ${p.name} 🧬✨`);
};

// ==========================================
// 4. SOCIAL PROOF & CUSTOMER VOUCH TEMPLATE
// ==========================================

const SOCIAL_PROOF_PRESETS = [
    {
        id: 'proof_fahad',
        name: 'فهد (الرياض) - 1.5M كوينز',
        amountLoaded: '1,500,000 كوينز',
        deliveryTime: '3 دقائق و 45 ثانية',
        platform: 'PlayStation 5',
        customerName: 'فهد الشمري (الرياض)',
        reviewText: 'والله أفضل متجر تعاملت معه، سرعة خيالية وناديي في أمان تام وتم شحن المليون ونص كاملة بدون أي نقص!',
        headline: 'شحن فوري جديد تم بنجاح! ناديك في أمان تام 100% 🔒⚡'
    },
    {
        id: 'proof_khaled',
        name: 'خالد (الكويت) - 3,000,000 كوينز VIP',
        amountLoaded: '3,000,000 كوينز',
        deliveryTime: '5 دقائق و 10 ثواني',
        platform: 'XBOX Series X',
        customerName: 'خالد المطيري (الكويت)',
        reviewText: 'شحنت 3 مليون كوينز دفعة واحدة وبأقل من 6 دقائق كانت بالحساب، شغل نظيف واحترافي وتعويض ضريبة كامل 100%.',
        headline: 'توثيق شحن باقة الحيتان VIP! سرعة وأمان لا ينافسان 👑💰'
    },
    {
        id: 'proof_mohammed',
        name: 'محمد (جدة) - 800,000 كوينز',
        amountLoaded: '800,000 كوينز',
        deliveryTime: 'دقيقتين و 30 ثانية',
        platform: 'PC EA App',
        customerName: 'محمد الغامدي (جدة)',
        reviewText: 'أول مرة أجرب المتجر وكنت متخوف، لكن ما شاء الله تعامل راقي وسرعة خرافية وناديي مضمون!',
        headline: 'ثقة عملائنا هي الأساس! شحن فوري وضمان شامل النادي 🛡️✨'
    }
];

function renderSocialProofTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme, appState.bgLighting)}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_proof_header', appState.badgeText || TEMPLATES.social_proof.defaultState.badgeText, appState.headline || TEMPLATES.social_proof.defaultState.headline, appState.subheadline || TEMPLATES.social_proof.defaultState.subheadline, isLightBg)}

        <!-- Layer 2: Social Proof Review Certificate Body -->
        ${isLayerVisible('layer_proof_body') ? `
        <div id="layer_proof_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_proof_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-3" style="transform: scale(${getLayerScale('layer_proof_body')});">
                
                <!-- Main Glass Proof Certificate -->
                <div class="w-full max-w-[480px] rounded-3xl p-4 shadow-2xl space-y-3" style="background: linear-gradient(180deg, #0e1626 0%, #080d17 60%, #04070d 100%); border: 2px solid rgba(16, 185, 129, 0.8);">
                    
                    <!-- Proof Top Pill: Verified Transfer & Platform -->
                    <div class="flex items-center justify-between border-b border-[#1c2638] pb-2 text-[11px] font-bold">
                        <div class="flex items-center gap-1.5 text-emerald-400 font-black">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                            <span>${appState.proofTag || '✅ تم الشحن بنجاح وتأكيد التسليم'}</span>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-lg bg-[#141d2e] text-slate-300 font-mono border border-[#232f46]">${appState.platform || 'PlayStation 5'}</span>
                    </div>

                    <!-- Giant Amount Loaded Highlight -->
                    <div class="py-2 bg-gradient-to-r from-emerald-950/60 via-slate-950/80 to-emerald-950/60 rounded-2xl border border-emerald-500/40 text-center space-y-1">
                        <span class="text-[11px] font-bold text-slate-400">الكمية التي تم شحنها للعميل:</span>
                        <div class="flex items-center justify-center gap-2 py-0.5" dir="ltr">
                            <img src="assets/fc-coin.webp" class="w-8 h-8 object-contain drop-shadow" alt="c">
                            <span class="text-3xl font-black font-mono text-emerald-300 tracking-wider">${appState.amountLoaded || '1,500,000 كوينز'}</span>
                        </div>
                        <div class="text-[10.5px] font-bold text-amber-400">
                            ⏱️ سرعة التنفيذ: <span class="font-mono text-white">${appState.deliveryTime || '3 دقائق و 45 ثانية'}</span>
                        </div>
                    </div>

                    <!-- Customer Review Quote Box -->
                    <div class="bg-[#101726] rounded-2xl p-3 border border-[#1e2a42] text-right space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-black text-white flex items-center gap-1.5">
                                <span>👤</span>
                                <span>${appState.customerName || 'فهد الشمري (الرياض)'}</span>
                            </span>
                            <div class="text-amber-400 text-xs tracking-widest">
                                ⭐⭐⭐⭐⭐
                            </div>
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed font-bold italic pt-1 border-t border-[#1a2336]">
                            "${appState.reviewText || 'والله أفضل متجر تعاملت معه، سرعة خيالية وناديي في أمان تام وتم شحن المليون ونص كاملة بدون أي نقص!'}"
                        </p>
                    </div>

                    <!-- 3 Security Verification Badges -->
                    <div class="grid grid-cols-3 gap-1.5 pt-1 text-center">
                        <div class="p-1.5 rounded-xl bg-[#0f1726] border border-emerald-500/40 text-[9.5px] font-black text-emerald-300">
                            🔒 0% باند أمان 100%
                        </div>
                        <div class="p-1.5 rounded-xl bg-[#0f1726] border border-emerald-500/40 text-[9.5px] font-black text-emerald-300">
                            🛡️ تغطية الضريبة 100%
                        </div>
                        <div class="p-1.5 rounded-xl bg-[#0f1726] border border-emerald-500/40 text-[9.5px] font-black text-emerald-300">
                            ⚡ نظام راحة فوري
                        </div>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_proof_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_proof_cta', appState.ctaHeadline || TEMPLATES.social_proof.defaultState.ctaHeadline, appState.ctaSub || TEMPLATES.social_proof.defaultState.ctaSub)}
    `;
}

function renderSocialProofControls() {
    return `
        <div class="space-y-4">
            <!-- 1. Background Selection -->
            ${renderStoryBackgroundControls()}

            <!-- 2. 1-Click Presets -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span class="text-xs font-black text-slate-800 block">⚡ توثيقات حقيقية جاهزة:</span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    ${SOCIAL_PROOF_PRESETS.map(p => `
                        <button type="button" onclick="applySocialProofPreset('${p.id}')" class="p-2 rounded-xl text-right border transition bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-800 text-xs font-bold">
                            ${p.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 3. Transfer Details -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <span class="text-xs font-black text-slate-800 block">🤝 تفاصيل عملية الشحن:</span>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">الكمية المشحونة:</label>
                        <input type="text" value="${appState.amountLoaded || ''}" oninput="appState.amountLoaded = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">وقت التنفيذ:</label>
                        <input type="text" value="${appState.deliveryTime || ''}" oninput="appState.deliveryTime = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">المنصة:</label>
                        <input type="text" value="${appState.platform || ''}" oninput="appState.platform = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">اسم العميل والمدينة:</label>
                        <input type="text" value="${appState.customerName || ''}" oninput="appState.customerName = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">كلام وتقييم العميل:</label>
                    <textarea rows="2" oninput="appState.reviewText = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">${appState.reviewText || ''}</textarea>
                </div>
            </div>
        </div>
    `;
}

window.applySocialProofPreset = function(presetId) {
    const p = SOCIAL_PROOF_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق توثيق ${p.name} 🤝✨`);
};

// ==========================================
// 5. FLASH SALE PRICING TIERS TABLE TEMPLATE
// ==========================================

const FLASH_SALE_PRESETS = [
    {
        id: 'weekend_madness',
        name: 'عروض الويكند الحارقة (11$, 21$, 39$)',
        saleTitle: 'عروض كوينز الويكند الحارقة ⚡',
        saleExpiry: '⏳ العرض ساري حتى منتصف الليل فقط',
        headline: 'باقات الكوينز الأقوى لجميع المنصات! اختر باقتك واستلم بدقيقة 💰🔥'
    },
    {
        id: 'promo_drop_sale',
        name: 'عروض نزول الحدث (9$, 18$, 35$)',
        saleTitle: 'تخفيضات نزول الحدث الرسمي 💥',
        saleExpiry: '⏳ متبقي: 6 ساعات فقط',
        headline: 'أسعار حصرية تكسر السوق! جهّز كوينز باكدجات الحدث الآن 🎁⚡'
    }
];

function renderFlashSaleTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const t1 = appState.tier1 || TEMPLATES.flash_sale.defaultState.tier1;
    const t2 = appState.tier2 || TEMPLATES.flash_sale.defaultState.tier2;
    const t3 = appState.tier3 || TEMPLATES.flash_sale.defaultState.tier3;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme, appState.bgLighting)}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_sale_header', appState.badgeText || TEMPLATES.flash_sale.defaultState.badgeText, appState.headline || TEMPLATES.flash_sale.defaultState.headline, appState.subheadline || TEMPLATES.flash_sale.defaultState.subheadline, isLightBg)}

        <!-- Layer 2: Tiered Pricing Stack Body -->
        ${isLayerVisible('layer_sale_body') ? `
        <div id="layer_sale_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_sale_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_sale_body')});">
                
                <!-- Sale Title & Expiry Ribbon -->
                <div class="w-full max-w-[480px] py-1.5 px-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 font-black text-xs flex items-center justify-between shadow-xl">
                    <span class="flex items-center gap-1"><span>⚡</span><span>${appState.saleTitle || 'عروض كوينز الويكند الحارقة'}</span></span>
                    <span class="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-bold">${appState.saleExpiry || '⏳ ساري حتى منتصف الليل'}</span>
                </div>

                <!-- Tier 1 (500k) -->
                <div class="w-full max-w-[480px] rounded-2xl p-3 flex items-center justify-between px-4 shadow-xl" style="background: #0c1322; border: 1.5px solid #23314d;">
                    <div class="flex items-center gap-2.5">
                        <img src="assets/fc-coin.webp" class="w-8 h-8 object-contain" alt="c">
                        <div class="text-right">
                            <span class="text-sm font-black text-white block">${t1.amount || '500,000 كوينز'}</span>
                            <span class="text-[10.5px] text-emerald-400 font-bold">${t1.badge || '⚡ باقة البداية'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2" dir="ltr">
                        <span class="text-xs text-slate-400 line-through font-mono font-bold">${t1.oldPrice || '15$'}</span>
                        <span class="text-2xl font-black font-mono text-emerald-400">${t1.price || '11$'}</span>
                    </div>
                </div>

                <!-- Tier 2 (1M - Featured Bestseller with glowing gold aura) -->
                <div class="w-full max-w-[480px] rounded-2xl p-3.5 flex items-center justify-between px-4 relative scale-[1.03] shadow-[0_0_30px_rgba(245,158,11,0.45)]" style="background: linear-gradient(135deg, #182338 0%, #0d1627 100%); border: 2.5px solid #f59e0b;">
                    <div class="absolute -top-3 right-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black shadow-lg">
                        🔥 ${t2.badge || 'الأكثر طلباً • BEST SELLER ⭐'}
                    </div>
                    <div class="flex items-center gap-2.5 pt-1">
                        <img src="assets/fc-coin.webp" class="w-9 h-9 object-contain drop-shadow" alt="c">
                        <div class="text-right">
                            <span class="text-base font-black text-white block">${t2.amount || '1,000,000 كوينز'}</span>
                            <span class="text-[11px] text-amber-300 font-bold">شامل تغطية الضريبة 100% 🛡️</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 pt-1" dir="ltr">
                        <span class="text-sm text-slate-400 line-through font-mono font-bold">${t2.oldPrice || '28$'}</span>
                        <span class="text-2xl font-black font-mono text-amber-300">${t2.price || '21$'}</span>
                    </div>
                </div>

                <!-- Tier 3 (2M VIP) -->
                <div class="w-full max-w-[480px] rounded-2xl p-3 flex items-center justify-between px-4 shadow-xl" style="background: #0c1322; border: 1.5px solid #23314d;">
                    <div class="flex items-center gap-2.5">
                        <img src="assets/fc-coin.webp" class="w-8 h-8 object-contain" alt="c">
                        <div class="text-right">
                            <span class="text-sm font-black text-white block">${t3.amount || '2,000,000 كوينز'}</span>
                            <span class="text-[10.5px] text-teal-400 font-bold">${t3.badge || '👑 باقة الحيتان VIP'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2" dir="ltr">
                        <span class="text-xs text-slate-400 line-through font-mono font-bold">${t3.oldPrice || '52$'}</span>
                        <span class="text-2xl font-black font-mono text-teal-300">${t3.price || '39$'}</span>
                    </div>
                </div>

                <!-- Tax Free Guarantee -->
                <div class="text-center text-[10px] font-black text-emerald-400 pt-0.5">
                    🛡️ جميع الأسعار تشمل ضريبة الـ 5% بالكامل • تسليم فوري لجميع المنصات
                </div>
            </div>
            ${renderLayerToolbar('layer_sale_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_sale_cta', appState.ctaHeadline || TEMPLATES.flash_sale.defaultState.ctaHeadline, appState.ctaSub || TEMPLATES.flash_sale.defaultState.ctaSub)}
    `;
}

function renderFlashSaleControls() {
    return `
        <div class="space-y-4">
            <!-- 1. Background Selection -->
            ${renderStoryBackgroundControls()}

            <!-- 2. 1-Click Presets -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span class="text-xs font-black text-slate-800 block">⚡ قوالب عروض جاهزة:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    ${FLASH_SALE_PRESETS.map(p => `
                        <button type="button" onclick="applyFlashSalePreset('${p.id}')" class="p-2 rounded-xl text-right border transition bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-800 text-xs font-bold">
                            ${p.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 3. Tiers Setup -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <span class="text-xs font-black text-slate-800 block">💰 أسعار وتفاصيل الباقات الثلاث:</span>
                
                <!-- Tier 1 -->
                <div class="p-2 bg-slate-50 rounded-xl space-y-1 border border-slate-200">
                    <span class="text-[11px] font-bold text-slate-700 block">الباقة 1 (500k):</span>
                    <div class="grid grid-cols-3 gap-1">
                        <input type="text" value="${appState.tier1?.amount || '500,000 كوينز'}" oninput="if(!appState.tier1) appState.tier1={}; appState.tier1.amount=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs">
                        <input type="text" value="${appState.tier1?.oldPrice || '15$'}" oninput="if(!appState.tier1) appState.tier1={}; appState.tier1.oldPrice=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs">
                        <input type="text" value="${appState.tier1?.price || '11$'}" oninput="if(!appState.tier1) appState.tier1={}; appState.tier1.price=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs font-bold text-emerald-600">
                    </div>
                </div>

                <!-- Tier 2 -->
                <div class="p-2 bg-amber-50/50 rounded-xl space-y-1 border border-amber-200">
                    <span class="text-[11px] font-black text-amber-900 block">الباقة 2 (الأكثر طلباً 1M):</span>
                    <div class="grid grid-cols-3 gap-1">
                        <input type="text" value="${appState.tier2?.amount || '1,000,000 كوينز'}" oninput="if(!appState.tier2) appState.tier2={}; appState.tier2.amount=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border border-amber-300 text-xs">
                        <input type="text" value="${appState.tier2?.oldPrice || '28$'}" oninput="if(!appState.tier2) appState.tier2={}; appState.tier2.oldPrice=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border border-amber-300 text-xs">
                        <input type="text" value="${appState.tier2?.price || '21$'}" oninput="if(!appState.tier2) appState.tier2={}; appState.tier2.price=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border border-amber-300 text-xs font-bold text-amber-700">
                    </div>
                </div>

                <!-- Tier 3 -->
                <div class="p-2 bg-slate-50 rounded-xl space-y-1 border border-slate-200">
                    <span class="text-[11px] font-bold text-slate-700 block">الباقة 3 (الحيتان VIP 2M):</span>
                    <div class="grid grid-cols-3 gap-1">
                        <input type="text" value="${appState.tier3?.amount || '2,000,000 كوينز'}" oninput="if(!appState.tier3) appState.tier3={}; appState.tier3.amount=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs">
                        <input type="text" value="${appState.tier3?.oldPrice || '52$'}" oninput="if(!appState.tier3) appState.tier3={}; appState.tier3.oldPrice=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs">
                        <input type="text" value="${appState.tier3?.price || '39$'}" oninput="if(!appState.tier3) appState.tier3={}; appState.tier3.price=this.value; renderCanvas();" class="px-2 py-1 rounded bg-white border text-xs font-bold text-teal-600">
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.applyFlashSalePreset = function(presetId) {
    const p = FLASH_SALE_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق ${p.name} 💰✨`);
};

// 1. Template Renderer: TRIO 3 Overlapping Players
function renderTrioTemplate() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const bgUrl = isStoreBg ? (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png') : 'assets/story-bg.jpg';
    const bgPosX = appState.bgPosX || 0;
    const bgPosY = appState.bgPosY || 0;
    const bgScale = appState.bgScale || 1.0;

    const card1 = appState.card1_url || (window.STARTER_BEASTS ? STARTER_BEASTS[0].imageUrl : POPULAR_FUTGG_STARS[1].imageUrl);
    const card2 = appState.card2_url || (window.STARTER_BEASTS ? STARTER_BEASTS[1].imageUrl : POPULAR_FUTGG_STARS[0].imageUrl);
    const card3 = appState.card3_url || (window.STARTER_BEASTS ? STARTER_BEASTS[2].imageUrl : POPULAR_FUTGG_STARS[2].imageUrl);

    const spread = appState.trioSpread !== undefined ? appState.trioSpread : 18;
    const angle = appState.trioAngle !== undefined ? appState.trioAngle : 7;

    return `
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px); transform: scale(${bgScale}); transform-origin: center center;"></div>
        </div>
        ${!isStoreBg ? '<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>' : ''}

        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Top Badge -->
        ${isLayerVisible('layer_top_badge') ? `
        <div id="layer_top_badge" class="draggable-layer" style="${getLayerStyle('layer_top_badge', 25)};">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_top_badge')});">
                <div class="px-4 py-1.5 rounded-full ${isStoreBg ? 'bg-slate-950/95 border border-emerald-400 shadow-xl text-emerald-400' : 'bg-emerald-500/25 border border-emerald-400/60 backdrop-blur-md shadow-lg shadow-emerald-500/20 text-emerald-300'} text-xs font-black tracking-wide text-center flex items-center gap-1.5 whitespace-nowrap">
                    <span>▲</span>
                    <span>${appState.badgeText || 'انطلاقة FC 27 الرسمية • شحن فوري وآمن 100%'}</span>
                    <span>▲</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_top_badge')}
        </div>
        ` : ''}

        <!-- Layer 2: Main Headline -->
        ${isLayerVisible('layer_headline') ? `
        <div id="layer_headline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_headline', 62)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper max-w-[370px] mx-auto" style="transform: scale(${getLayerScale('layer_headline')});">
                <h1 class="text-2xl font-black ${isStoreBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'} leading-tight">
                    ${appState.headline || 'تبي تقفل هالثلاثي المرعب بتشكيلتك؟ 🔥'}
                </h1>
            </div>
            ${renderLayerToolbar('layer_headline')}
        </div>
        ` : ''}

        <!-- Layer 3: 3 Overlapping Player Cards (The Trio Showcase) -->
        ${isLayerVisible('layer_trio_cards') ? `
        <div id="layer_trio_cards" class="draggable-layer" style="${getLayerStyle('layer_trio_cards', 125)}; width: 420px; height: 320px;">
            <div class="layer-scale-wrapper relative w-full h-full flex items-center justify-center" style="transform: scale(${getLayerScale('layer_trio_cards')});">
                
                <!-- Kinetic Pitch Green Aura behind cards -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,rgba(0,240,255,0.06)_45%,transparent_70%)] blur-2xl -z-10"></div>

                <!-- Card 1: Right Card (Angled & Stepped Back) -->
                <div class="absolute flex flex-col items-center" style="right: ${spread}px; top: 22px; width: 185px; z-index: 10; transform: rotate(${angle}deg) scale(0.88); filter: drop-shadow(0 15px 25px rgba(0,0,0,0.65));">
                    <img src="${card1}" class="w-full object-contain pointer-events-none" alt="Card 1">
                    ${appState.card1_price ? `
                    <div dir="rtl" class="mt-[-14px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400/90 shadow-xl shadow-black/90 flex items-center gap-1.5 whitespace-nowrap z-20 pointer-events-none" style="transform: rotate(-${angle}deg); backdrop-filter: blur(8px);">
                        <span class="text-xs">🪙</span>
                        <span class="text-xs font-black text-white tracking-wide">${(appState.card1_price || '').replace(/[~-]/g, '').trim()}</span>
                    </div>` : ''}
                </div>

                <!-- Card 3: Left Card (Angled & Stepped Back) -->
                <div class="absolute flex flex-col items-center" style="left: ${spread}px; top: 22px; width: 185px; z-index: 12; transform: rotate(-${angle}deg) scale(0.88); filter: drop-shadow(0 15px 25px rgba(0,0,0,0.65));">
                    <img src="${card3}" class="w-full object-contain pointer-events-none" alt="Card 3">
                    ${appState.card3_price ? `
                    <div dir="rtl" class="mt-[-14px] px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400/90 shadow-xl shadow-black/90 flex items-center gap-1.5 whitespace-nowrap z-20 pointer-events-none" style="transform: rotate(${angle}deg); backdrop-filter: blur(8px);">
                        <span class="text-xs">🪙</span>
                        <span class="text-xs font-black text-white tracking-wide">${(appState.card3_price || '').replace(/[~-]/g, '').trim()}</span>
                    </div>` : ''}
                </div>

                <!-- Card 2: Center Card (Front, Elevated & Prominent) -->
                <div class="absolute flex flex-col items-center" style="left: 50%; top: -8px; width: 215px; z-index: 25; transform: translateX(-50%) scale(1.04); filter: drop-shadow(0 25px 35px rgba(0,0,0,0.9)), drop-shadow(0 0 25px rgba(0,255,163,0.3));">
                    <img src="${card2}" class="w-full object-contain pointer-events-none animate-float" alt="Card 2 (Center)">
                    ${appState.card2_price ? `
                    <div dir="rtl" class="mt-[-12px] px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-emerald-400 shadow-2xl shadow-emerald-500/40 flex items-center gap-1.5 whitespace-nowrap z-30 pointer-events-none" style="backdrop-filter: blur(10px);">
                        <span class="text-xs animate-pulse">🪙</span>
                        <span class="text-xs font-black text-emerald-300 tracking-wide">${(appState.card2_price || '').replace(/[~-]/g, '').trim()}</span>
                    </div>` : ''}
                </div>

            </div>
            ${renderLayerToolbar('layer_trio_cards')}
        </div>
        ` : ''}

        <!-- Layer 4: Subheadline & Store Offer -->
        ${isLayerVisible('layer_subheadline') ? `
        <div id="layer_subheadline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_subheadline', 460)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper w-full flex justify-center" style="transform: scale(${getLayerScale('layer_subheadline')});">
                <div style="${getBoxStyle()}">
                    <div class="font-bold text-xs leading-relaxed">
                        ${appState.subheadline || 'متوفر شحن كوينز لبداية FC 27 لجميع المنصات (بلايستيشن • إكسبوكس • PC) بأفضل سعر وضمان شامل الضريبة'}
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_subheadline')}
        </div>
        ` : ''}

        <!-- Layer 5: CTA Order Button -->
        ${isLayerVisible('layer_cta_btn') ? `
        <div id="layer_cta_btn" class="draggable-layer text-center flex justify-center" style="${getLayerStyle('layer_cta_btn', 535)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_cta_btn')});">
                <div style="${getCtaStyle()}">
                    <span class="text-sm font-black">${appState.ctaText || 'اطلب كوينز تشكيلة البداية بالخاص DM 📩'}</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_cta_btn')}
        </div>
        ` : ''}
    `;
}

// 2. Template Renderer: MARKET DROP ALERT
function renderMarketDropTemplate() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const bgUrl = isStoreBg ? (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png') : 'assets/story-bg.jpg';
    const bgPosX = appState.bgPosX || 0;
    const bgPosY = appState.bgPosY || 0;
    const bgScale = appState.bgScale || 1.0;
    const cardImg = appState.cardImageUrl || POPULAR_FUTGG_STARS[0].imageUrl;

    return `
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px); transform: scale(${bgScale}); transform-origin: center center;"></div>
        </div>
        ${!isStoreBg ? '<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>' : ''}

        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Top Badge -->
        ${isLayerVisible('layer_top_badge') ? `
        <div id="layer_top_badge" class="draggable-layer" style="${getLayerStyle('layer_top_badge', 22)};">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_top_badge')});">
                <div class="px-4 py-1.5 rounded-full ${isStoreBg ? 'bg-slate-950/95 border border-red-400 shadow-xl text-red-400' : 'bg-red-500/25 border border-red-400/60 backdrop-blur-md shadow-lg shadow-red-500/20 text-red-300'} text-xs font-black tracking-wide text-center flex items-center gap-1.5 whitespace-nowrap">
                    <span>▲</span>
                    <span>${appState.badgeText || 'تنبيه نزول أسعار السوق'}</span>
                    <span>▲</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_top_badge')}
        </div>
        ` : ''}

        <!-- Layer 2: Main Headline -->
        ${isLayerVisible('layer_headline') ? `
        <div id="layer_headline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_headline', 55)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper max-w-[370px] mx-auto" style="transform: scale(${getLayerScale('layer_headline')});">
                <h1 class="text-2xl font-black ${isStoreBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'} leading-tight">
                    ${appState.headline || 'الأسعار نازلة في السوق! فرصة ما تتعوض 🔥'}
                </h1>
            </div>
            ${renderLayerToolbar('layer_headline')}
        </div>
        ` : ''}

        <!-- Layer 3: Official Player Card -->
        ${isLayerVisible('layer_card') ? `
        <div id="layer_card" class="draggable-layer" style="${getLayerStyle('layer_card', 98)};">
            <div class="layer-scale-wrapper relative" style="transform: scale(${getLayerScale('layer_card')});">
                <!-- Kinetic Pitch Green Aura behind card -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.25)_0%,rgba(0,240,255,0.06)_45%,transparent_70%)] blur-2xl -z-10"></div>
                <div class="w-64 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] drop-shadow(0 0 25px rgba(0,255,163,0.25))">
                    <img src="${cardImg}" class="w-full object-contain pointer-events-none animate-float" alt="Player Card">
                </div>
            </div>
            ${renderLayerToolbar('layer_card')}
        </div>
        ` : ''}

        <!-- Layer 4: Price Drop Comparison Box -->
        ${isLayerVisible('layer_price_box') ? `
        <div id="layer_price_box" class="draggable-layer text-center flex justify-center" style="${getLayerStyle('layer_price_box', 345)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper w-full flex justify-center" style="transform: scale(${getLayerScale('layer_price_box')});">
                <div style="${getPriceBoxStyle()}" class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <div class="text-right">
                            <div class="text-[10px] text-red-400 font-bold">السعر السابق في السوق:</div>
                            <div class="text-sm font-black text-red-400 line-through font-mono">${appState.oldPrice || '3,200,000'} كوينز</div>
                        </div>
                        <div class="text-left">
                            <div class="text-[10px] text-emerald-400 font-bold">السعر الحالي بعد النزول 📉:</div>
                            <div class="text-lg font-black text-emerald-400 font-mono">${appState.newPrice || '2,450,000'} كوينز</div>
                        </div>
                    </div>
                    <div class="py-1 px-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 text-center">
                        <span class="text-xs font-black text-emerald-300">${appState.savingBadge || 'وفر 750,000 كوينز الآن! 📉'}</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_price_box')}
        </div>
        ` : ''}

        <!-- Layer 5: Subheadline -->
        ${isLayerVisible('layer_subheadline') ? `
        <div id="layer_subheadline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_subheadline', 465)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper w-full flex justify-center" style="transform: scale(${getLayerScale('layer_subheadline')});">
                <div style="${getBoxStyle()}">
                    <div class="font-bold text-xs leading-relaxed">
                        ${appState.subheadline || 'السوق الآن في أدنى مستوياته.. اشحن كوينزك الآن وقفل كرتك بأرخص سعر قبل ارتفاع السوق بالويكند!'}
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_subheadline')}
        </div>
        ` : ''}

        <!-- Layer 6: CTA Button -->
        ${isLayerVisible('layer_cta_btn') ? `
        <div id="layer_cta_btn" class="draggable-layer text-center flex justify-center" style="${getLayerStyle('layer_cta_btn', 538)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_cta_btn')});">
                <div style="${getCtaStyle()}">
                    <span class="text-sm font-black">${appState.ctaText || 'اطلب كوينزك الآن بالخاص DM واستغل النزول ⚡'}</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_cta_btn')}
        </div>
        ` : ''}
    `;
}

// 3. Template Renderer: SBC CHALLENGE SOLVER (Official Instagram Story Stacked Banners & Challenge Asset)
function renderSbcTemplate() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const bgUrl = isStoreBg ? (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png') : 'assets/story-bg.jpg';
    const bgPosX = appState.bgPosX || 0;
    const bgPosY = appState.bgPosY || 0;
    const bgScale = appState.bgScale || 1.0;

    const banners = Array.isArray(appState.banners) && appState.banners.length > 0 
        ? appState.banners 
        : (TEMPLATES.sbc?.defaultState?.banners || [
            { text: 'توفرت مباريات القمة الأسبوعية الآن 🔥', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نحل لك التحدي كامل وبأفضل الأسعار 🚨', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وسرعة كبيرة بتنفيذ الطلبات 👌', bg: '#38B000', color: '#FFFFFF' },
            { text: 'ضمان كامل للنادي بدون أي تصفير أو بان 🔒', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ]);

    const sbcAsset = appState.sbcImageUrl || 'assets/sbc_marquee_matchups_card.png';
    const scaleMultiplier = (appState.sbcScale || 100) / 100;
    const posYOffset = appState.sbcPosY !== undefined ? appState.sbcPosY : 15;

    // Instagram style banners HTML
    const bannersHtml = banners.map((b) => {
        if (!b || !b.text || !b.text.trim()) return '';
        const bg = b.bg || '#0084FF';
        const color = b.color || '#FFFFFF';
        return `
            <div style="display: inline-block; background-color: ${bg}; color: ${color}; padding: 6px 16px; border-radius: 6px; font-weight: 800; font-size: 15px; line-height: 1.35; text-align: center; white-space: nowrap; max-width: 95%; box-shadow: 0 4px 12px rgba(0,0,0,0.18); margin: 0 auto;">
                ${b.text}
            </div>
        `;
    }).filter(Boolean).join('');

    return `
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style="${appState.bgTheme === 'dark' ? 'background: radial-gradient(circle at center, #1e293b 0%, #090d16 100%);' : ''}">
            ${appState.bgTheme === 'dark' ? '' : `
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px); transform: scale(${bgScale}); transform-origin: center center;"></div>
            `}
        </div>
        ${!isStoreBg && appState.bgTheme !== 'dark' ? '<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>' : ''}

        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Stacked Text Banners (Top Half) -->
        ${isLayerVisible('layer_sbc_banners') ? `
        <div id="layer_sbc_banners" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_sbc_banners', 40)}; width: max-content; max-width: 500px; z-index: 30;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_sbc_banners')});">
                ${bannersHtml}
            </div>
            ${renderLayerToolbar('layer_sbc_banners')}
        </div>
        ` : ''}

        <!-- Layer 2: SBC Asset / Player Card (Bottom Half) -->
        ${isLayerVisible('layer_sbc_asset') ? `
        <div id="layer_sbc_asset" class="draggable-layer w-full text-center flex flex-col items-center justify-center" style="${getLayerStyle('layer_sbc_asset', 360)}; width: 480px; z-index: 20;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center justify-center" style="transform: scale(${getLayerScale('layer_sbc_asset')});">
                <!-- Kinetic Pitch Green Aura behind SBC Asset -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.18)_0%,rgba(0,240,255,0.05)_50%,transparent_75%)] blur-2xl -z-10"></div>
                <div class="relative flex flex-col items-center justify-center w-full" style="transform: translateY(${posYOffset}px) scale(${scaleMultiplier}); filter: drop-shadow(0 20px 40px rgba(0,0,0,0.85));">
                    <img src="${sbcAsset}" class="max-w-[460px] max-h-[360px] w-auto h-auto object-contain pointer-events-none rounded-2xl shadow-2xl" alt="SBC Challenge Card">
                </div>
            </div>
            ${renderLayerToolbar('layer_sbc_asset')}
        </div>
        ` : ''}
    `;
}

/* =========================================================================
   POTM (PLAYER OF THE MONTH) TEMPLATE HELPERS (قالب لاعب الشهر الرسمي)
   ========================================================================= */

window.setPotmLeague = function(leagueKey) {
    if (!window.POTM_LEAGUES || !window.POTM_LEAGUES[leagueKey]) return;
    appState.league = leagueKey;
    const league = window.POTM_LEAGUES[leagueKey];
    const pName = appState.playerArName || appState.playerName || 'اللاعب';
    appState.badgeText = `🏆 رسميـاً: ${pName} لاعب الشهر في ${league.shortName}`;
    renderControls();
    renderCanvas();
    updateCaption();
    if (window.showCopyToast) {
        window.showCopyToast(`تم تفعيل دوري ${league.name} بنجاح! 🏆✨`);
    }
};

window.setPotmStar = function(idx) {
    const list = window.POPULAR_POTM_STARS || [];
    const star = list[idx];
    if (!star) return;

    appState.cardImageUrl = star.imageUrl;
    appState.playerName = star.name.replace(/^[^\w\u0621-\u064A]+/, '').trim();
    appState.playerArName = star.arName;
    appState.rating = star.rating;
    appState.position = star.position;
    appState.league = star.league;
    appState.sbcCost = star.sbcCost;
    appState.headline = `نزل كرت ${star.arName} لاعب الشهر رسمياً! 👑🔥`;
    appState.badgeText = `🏆 رسميـاً: ${star.arName} لاعب الشهر في FC 27`;

    renderControls();
    renderCanvas();
    updateCaption();
    if (window.showCopyToast) {
        window.showCopyToast(`تم تفعيل كرت لاعب الشهر: ${star.arName} (${star.rating})! ⚡`);
    }
};

window.fetchPotmCardFromLink = function() {
    const input = document.getElementById('potmUrlInput');
    const val = input ? input.value.trim() : '';
    if (!val) {
        alert('يرجى لصق رابط بطاقة اللاعب من FUTGG أو FUTBIN أو رقم ID اللاعب');
        return;
    }
    fetchFutGGCard(val);
};

window.handlePotmDirectUpload = function(input) {
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        appState.cardImageUrl = e.target.result;
        renderControls();
        renderCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تم رفع صورة بطاقة لاعب الشهر بنجاح! 📷✨');
        }
    };
    reader.readAsDataURL(file);
};

function getPotmCostBoxStyle(league) {
    const width = appState.boxWidth || 390;
    const padding = appState.boxPadding || 12;
    const radius = appState.boxRadius || 16;
    const accent = league?.accent || '#00ff85';
    const glow = league?.glow || 'rgba(0,255,133,0.3)';
    return `width: 100%; max-width: ${width}px; border-radius: ${radius}px; padding: ${padding}px; background: rgba(8, 12, 22, 0.88); border: 1.5px solid ${accent}99; box-shadow: 0 16px 36px rgba(0,0,0,0.5), 0 0 22px ${glow}; backdrop-filter: blur(14px);`;
}

// 4. Template Renderer: PLAYER OF THE MONTH (Official EA Sports League Broadcast POTM Template)
function renderPotmTemplate() {
    const isStoreBg = appState.bgTheme === 'store' || !appState.bgTheme;
    const bgUrl = isStoreBg ? (window.EMBEDDED_ASSETS?.STORE_BG_PURE || 'assets/store-bg-pure.png') : 'assets/story-bg.jpg';
    const bgPosX = appState.bgPosX || 0;
    const bgPosY = appState.bgPosY || 0;
    const bgScale = appState.bgScale || 1.0;
    const cardImg = appState.cardImageUrl || (window.POPULAR_POTM_STARS && window.POPULAR_POTM_STARS[0]?.imageUrl) || (window.POPULAR_FUTGG_STARS && window.POPULAR_FUTGG_STARS[0]?.imageUrl);

    const leagueKey = appState.league || 'pl';
    const league = (window.POTM_LEAGUES && window.POTM_LEAGUES[leagueKey]) || {
        badge: '🦁 الدوري الإنجليزي الممتاز',
        accent: '#00ff85',
        accentBg: '#38003c',
        gradient: 'from-[#38003c] via-[#200028] to-[#040008]',
        glow: 'rgba(0, 255, 133, 0.35)',
        textColor: '#00ff85'
    };

    return `
        <!-- Background Layer -->
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bgUrl}'); background-size: cover; background-position: calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px); transform: scale(${bgScale}); transform-origin: center center;"></div>
        </div>
        
        <!-- League Atmospheric Aura & Overlays -->
        <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(circle at 50% 28%, ${league.glow} 0%, transparent 65%); opacity: 0.75;"></div>
        ${!isStoreBg ? '<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>' : '<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>'}

        ${getFc27LogoHtml()}
        ${getScBrandingHtml()}

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Official League POTM Badge -->
        ${isLayerVisible('layer_potm_badge') ? `
        <div id="layer_potm_badge" class="draggable-layer" style="${getLayerStyle('layer_potm_badge', 22)};">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_potm_badge')});">
                <div class="px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-wide text-center flex items-center gap-1.5 whitespace-nowrap shadow-xl border backdrop-blur-md max-w-[420px] mx-auto truncate"
                     style="background: linear-gradient(135deg, rgba(8, 12, 22, 0.95), ${league.accentBg}ee); border-color: ${league.accent}; color: ${league.textColor}; box-shadow: 0 8px 25px ${league.glow};">
                    <span class="text-xs">🏆</span>
                    <span class="truncate">${appState.badgeText || (league.badge + ' • POTM')}</span>
                    <span class="text-xs">🏆</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_potm_badge')}
        </div>
        ` : ''}

        <!-- Layer 2: Main Headline -->
        ${isLayerVisible('layer_headline') ? `
        <div id="layer_headline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_headline', 60)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper max-w-[390px] mx-auto" style="transform: scale(${getLayerScale('layer_headline')});">
                <h1 class="text-2xl font-black ${isStoreBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'} leading-tight">
                    ${appState.headline || 'نزل كرت مبابي لاعب الشهر رسمياً! 👑🔥'}
                </h1>
            </div>
            ${renderLayerToolbar('layer_headline')}
        </div>
        ` : ''}

        <!-- Layer 3: Official POTM Player Card -->
        ${isLayerVisible('layer_card') ? `
        <div id="layer_card" class="draggable-layer" style="${getLayerStyle('layer_card', 108)};">
            <div class="layer-scale-wrapper relative flex flex-col items-center justify-center" style="transform: scale(${getLayerScale('layer_card')});">
                <!-- Dynamic League Radial Aura behind Card -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[360px] blur-2xl -z-10"
                     style="background: radial-gradient(ellipse at center, ${league.glow} 0%, rgba(0,0,0,0) 70%);"></div>
                <div class="w-64 filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]" style="filter: drop-shadow(0 15px 35px ${league.glow});">
                    <img src="${cardImg}" class="w-full object-contain pointer-events-none animate-float" alt="POTM Card">
                </div>
            </div>
            ${renderLayerToolbar('layer_card')}
        </div>
        ` : ''}

        <!-- Layer 4: SBC Cost & Store Solution Info Card -->
        ${isLayerVisible('layer_cost_box') ? `
        <div id="layer_cost_box" class="draggable-layer text-center flex justify-center" style="${getLayerStyle('layer_cost_box', 375)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper w-full flex justify-center" style="transform: scale(${getLayerScale('layer_cost_box')});">
                <div style="${getPotmCostBoxStyle(league)}" class="space-y-2.5">
                    <!-- Market SBC Cost Row -->
                    <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/50 border border-white/10">
                        <div class="flex items-center gap-1.5">
                            <span class="text-sm">🪙</span>
                            <span class="text-[11px] text-slate-300 font-bold">تكلفة التحدي بالسوق:</span>
                        </div>
                        <span class="text-xs font-black font-mono" dir="rtl" style="color: ${league.accent}; text-shadow: 0 0 10px ${league.glow};">
                            ${(appState.sbcCost || '2,450,000 كوينز صافية').replace(/^~/, '')}
                        </span>
                    </div>
                    <!-- Store Fulfillment Solution -->
                    <div class="px-2.5 py-1 text-center font-bold text-xs leading-snug text-slate-100">
                        ${appState.storeOffer || 'نوفر لك كوينز التحدي كاملة شاملة الضريبة ونقفله بحسابك بدون ما تضحي بنجوم ناديك!'}
                    </div>
                    <!-- Trust Badges -->
                    <div class="grid grid-cols-2 gap-2 pt-0.5 text-center text-[10px] font-black">
                        <div class="py-1 px-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center gap-1">
                            <span>⚡</span>
                            <span>تسليم فوري وآمن</span>
                        </div>
                        <div class="py-1 px-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center gap-1">
                            <span>🛡️</span>
                            <span>ضمان شامل ضد الباند</span>
                        </div>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_cost_box')}
        </div>
        ` : ''}

        <!-- Layer 5: Subheadline -->
        ${isLayerVisible('layer_subheadline') ? `
        <div id="layer_subheadline" class="draggable-layer text-center flex flex-col items-center" style="${getLayerStyle('layer_subheadline', 470)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper w-full flex justify-center" style="transform: scale(${getLayerScale('layer_subheadline')});">
                <div style="${getBoxStyle()}">
                    <div class="font-bold text-xs leading-relaxed">
                        ${appState.subheadline || 'نوفر لك كوينز التحدي كاملة لجميع المنصات (PS5 • XBOX • PC) بأقل سعر وتسليم فوري!'}
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_subheadline')}
        </div>
        ` : ''}

        <!-- Layer 6: CTA Button -->
        ${isLayerVisible('layer_cta_btn') ? `
        <div id="layer_cta_btn" class="draggable-layer text-center flex justify-center" style="${getLayerStyle('layer_cta_btn', 540)}; width: max-content; max-width: 440px;">
            <div class="layer-scale-wrapper" style="transform: scale(${getLayerScale('layer_cta_btn')});">
                <div style="${getCtaStyle()}">
                    <span class="text-sm font-black">${appState.ctaText || 'ارسل اسم اللاعب بالخاص ونقفل لك التحدي فوراً 📩'}</span>
                </div>
            </div>
            ${renderLayerToolbar('layer_cta_btn')}
        ` : ''}
    `;
}


/* =========================================================================
   SHOWCASE TEMPLATE (⭐ كرت النجم وهوية المتجر الفاخرة)
   ========================================================================= */

function renderShowcaseTemplate() {
    const bgThemes = window.SHOWCASE_BG_THEMES || {};
    const curBgKey = appState.bgTheme || 'store';
    const bg = bgThemes[curBgKey] || bgThemes.store || {
        url: 'assets/store-bg-pure.png',
        cardGlow: 'rgba(0, 255, 133, 0.45)',
        isLight: true
    };

    const starsPresets = window.SHOWCASE_STARS_PRESETS || [];
    const defaultStar = starsPresets[0] || {};
    const cardImg = appState.cardImageUrl || defaultStar.cardUrl || 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp';
    const scLogoSrc = window.EMBEDDED_ASSETS?.SHOP_COIN_LOGO || window.EMBEDDED_ASSETS?.SC_LOGO || 'assets/sc-logo.png';
    const fc27LogoSrc = window.EMBEDDED_ASSETS?.FC27_OFFICIAL_LOGO || 'assets/fc27-official-logo.png';

    const isLightBg = bg.isLight;

    return `
        <!-- Background Layer: Official Store Background Asset -->
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="w-full h-full" style="background-image: url('${bg.url}'); background-size: cover; background-position: center center;"></div>
            ${isLightBg ? `
                <div class="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/30 pointer-events-none"></div>
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 20px 20px;"></div>
            ` : `
                <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none"></div>
                <div class="absolute -top-20 left-1/4 w-[500px] h-[300px] bg-gradient-to-b from-white/10 to-transparent blur-3xl -rotate-12 pointer-events-none"></div>
            `}
        </div>

        <div id="snapGuideV" class="snap-guide snap-guide-v"></div>
        <div id="snapGuideH" class="snap-guide snap-guide-h"></div>

        <!-- Layer 1: Official Header & Branding (Store SC + EA FC 27) -->
        ${isLayerVisible('layer_showcase_header') ? `
        <div id="layer_showcase_header" class="draggable-layer w-full max-w-[500px]" style="${getLayerStyle('layer_showcase_header', 14, '50%')};">
            <div class="layer-scale-wrapper w-full flex items-center justify-between px-3" style="transform: scale(${getLayerScale('layer_showcase_header')});">
                <!-- Authentic Store SC Branding -->
                ${appState.showStoreLogo !== false ? `
                <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl ${isLightBg ? 'bg-white/95 border border-slate-200/90 shadow-md text-slate-900' : 'bg-slate-950/85 border border-white/10 shadow-xl text-white'} backdrop-blur-md">
                    <img src="${scLogoSrc}" class="w-7 h-7 object-contain drop-shadow-sm" alt="ShopCoin15">
                    <div class="flex flex-col text-right">
                        <div class="flex items-center gap-1">
                            <span class="text-xs font-black">ShopCoin15</span>
                            <span class="text-amber-500 text-[11px] font-black">✓</span>
                        </div>
                        <span class="text-[9px] ${isLightBg ? 'text-slate-500 font-bold' : 'text-slate-400 font-medium'}">المتجر الأفضل والأسرع</span>
                    </div>
                </div>
                ` : '<div></div>'}

                <!-- Official Transparent EA SPORTS FC 27 Logo -->
                ${appState.showFcLogo !== false ? `
                <div class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl ${isLightBg ? 'bg-white/95 border border-slate-200/90 shadow-md' : 'bg-slate-950/85 border border-white/10 shadow-xl'} backdrop-blur-md">
                    <img src="${fc27LogoSrc}" class="h-6 w-auto object-contain drop-shadow-sm" alt="EA SPORTS FC 27">
                </div>
                ` : '<div></div>'}
            </div>
            ${renderLayerToolbar('layer_showcase_header')}
        </div>
        ` : ''}

        <!-- Layer 2: Marketing Badges & Headlines -->
        ${isLayerVisible('layer_showcase_badges') ? `
        <div id="layer_showcase_badges" class="draggable-layer w-full max-w-[480px] text-center flex flex-col items-center" style="${getLayerStyle('layer_showcase_badges', 52, '50%')};">
            <div class="layer-scale-wrapper w-full flex flex-col items-center space-y-2 px-2" style="transform: scale(${getLayerScale('layer_showcase_badges')});">
                <!-- Hardware Event Pill -->
                <div class="px-4 py-1 rounded-full text-[11px] font-black tracking-wide text-center flex items-center gap-1.5 shadow-xl border backdrop-blur-md"
                     style="background: linear-gradient(135deg, rgba(10, 15, 29, 0.95), rgba(15, 23, 42, 0.92)); border-color: #00ff85; color: #00ff85; box-shadow: 0 6px 20px rgba(0, 255, 133, 0.25);">
                    <span>🔥</span>
                    <span class="truncate">${appState.badgeText || 'مع نزول كروت الحدث رسمياً • FC 27'}</span>
                    <span>🔥</span>
                </div>

                <!-- Main Marketing Headline -->
                <h1 class="text-2xl font-black leading-tight tracking-tight max-w-[440px] ${isLightBg ? 'text-slate-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]'}">
                    ${appState.headline || 'قفل كرتك بأرخص سعر وأسرع شحن كوينز ⚡'}
                </h1>

                <!-- Subheadline & Promo Tag -->
                <p class="text-xs font-bold leading-snug drop-shadow-sm max-w-[440px] ${isLightBg ? 'text-slate-700' : 'text-slate-300'}">
                    ${appState.subheadline || 'متوفر كوينز FC 27 لجميع المنصات (PS5 • XBOX • PC) بضمان شامل وضريبة مغطاة 100%'}
                </p>
            </div>
            ${renderLayerToolbar('layer_showcase_badges')}
        </div>
        ` : ''}

        <!-- Layer 3: Center Stage Hero Card & 3D Glowing Podium with Gold Coins Stack -->
        ${isLayerVisible('layer_showcase_card') ? `
        <div id="layer_showcase_card" class="draggable-layer" style="${getLayerStyle('layer_showcase_card', 120, '50%')}; width: max-content;">
            <div class="layer-scale-wrapper relative flex flex-col items-center justify-center" style="transform: scale(${getLayerScale('layer_showcase_card')});">
                
                <!-- Dynamic Ambient Glow behind Card -->
                <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[380px] blur-3xl -z-10"
                     style="background: radial-gradient(ellipse at center, ${bg.cardGlow || 'rgba(0, 255, 133, 0.45)'} 0%, rgba(0,0,0,0) 70%);"></div>

                <!-- Official FC 27 Hero Card with Float Depth -->
                <div class="w-64 filter" style="filter: drop-shadow(0 25px 45px rgba(0,0,0,0.85));">
                    <img src="${cardImg}" class="w-full object-contain pointer-events-none animate-float" alt="FC 27 Card">
                </div>

                <!-- 3D Glowing Podium & Gold Coins Stack -->
                ${appState.showCoinsStack !== false ? `
                <div class="relative mt-[-20px] flex flex-col items-center z-10">
                    <!-- Layered 3D Metallic Gold Coins -->
                    <div class="relative flex items-center justify-center -space-x-4">
                        <!-- Coin 1 (Left) -->
                        <div class="w-10 h-10 rounded-full border-2 border-amber-200 shadow-lg flex items-center justify-center relative overflow-hidden"
                             style="background: linear-gradient(135deg, #FFE259 0%, #D97706 60%, #92400E 100%); box-shadow: 0 4px 15px rgba(245, 158, 11, 0.6), inset 0 2px 4px rgba(255,255,255,0.7); transform: rotate(-15deg);">
                            <span class="text-xs font-black text-amber-950 font-mono">🪙</span>
                        </div>
                        <!-- Coin 2 (Center Front, Raised) -->
                        <div class="w-12 h-12 rounded-full border-2 border-amber-100 shadow-xl flex items-center justify-center relative overflow-hidden z-10"
                             style="background: linear-gradient(135deg, #FFF176 0%, #F59E0B 50%, #B45309 100%); box-shadow: 0 8px 24px rgba(245, 158, 11, 0.8), inset 0 2px 6px rgba(255,255,255,0.9); transform: translateY(-4px);">
                            <div class="w-8 h-8 rounded-full border border-amber-200/80 flex items-center justify-center">
                                <span class="text-xs font-black text-amber-950 font-mono">FC</span>
                            </div>
                        </div>
                        <!-- Coin 3 (Right) -->
                        <div class="w-10 h-10 rounded-full border-2 border-amber-200 shadow-lg flex items-center justify-center relative overflow-hidden"
                             style="background: linear-gradient(135deg, #FFE259 0%, #D97706 60%, #92400E 100%); box-shadow: 0 4px 15px rgba(245, 158, 11, 0.6), inset 0 2px 4px rgba(255,255,255,0.7); transform: rotate(15deg);">
                            <span class="text-xs font-black text-amber-950 font-mono">⚡</span>
                        </div>
                    </div>
                    <!-- Gold Slogan Pill -->
                    <div class="mt-1.5 px-4 py-1 rounded-full text-[10.5px] font-black tracking-wide border shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                         style="background: linear-gradient(135deg, rgba(20, 15, 5, 0.95), rgba(40, 30, 10, 0.98)); border-color: rgba(245, 158, 11, 0.7); color: #FDE68A; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);">
                        <span class="text-amber-400">🪙</span>
                        <span>متوفر كوينز فورية للشراء والتحدي ⚡</span>
                    </div>
                </div>
                ` : ''}

            </div>
            ${renderLayerToolbar('layer_showcase_card')}
        </div>
        ` : ''}

        <!-- Layer 4: Bento Glass Data Badges (Market Price + Speed + 100% Safe Shield) -->
        ${isLayerVisible('layer_showcase_bento') && appState.showBentoBadges !== false ? `
        <div id="layer_showcase_bento" class="draggable-layer w-full max-w-[480px]" style="${getLayerStyle('layer_showcase_bento', 460, '50%')};">
            <div class="layer-scale-wrapper w-full px-3" style="transform: scale(${getLayerScale('layer_showcase_bento')});">
                <div class="grid grid-cols-2 gap-2 text-center">
                    <!-- Bento 1: Market Price -->
                    <div class="p-2.5 rounded-2xl ${isLightBg ? 'bg-white/95 border border-slate-200/90 shadow-md text-slate-900' : 'bg-slate-950/85 border border-white/10 shadow-xl text-white'} backdrop-blur-md flex items-center justify-between px-3.5">
                        <div class="flex items-center gap-1.5">
                            <span class="text-sm">🪙</span>
                            <span class="text-[11px] font-bold ${isLightBg ? 'text-slate-600' : 'text-slate-300'}">سعر الكرت بالسوق:</span>
                        </div>
                        <span class="text-xs font-black font-mono text-emerald-500" dir="rtl">${appState.marketPrice || '2,450,000 كوينز'}</span>
                    </div>

                    <!-- Bento 2: 100% Safe Shield Guarantee -->
                    <div class="p-2.5 rounded-2xl ${isLightBg ? 'bg-white/95 border border-slate-200/90 shadow-md text-slate-900' : 'bg-slate-950/85 border border-white/10 shadow-xl text-white'} backdrop-blur-md flex items-center justify-center gap-1.5">
                        <span class="text-emerald-500 text-sm">🛡️</span>
                        <span class="text-[11px] font-black text-emerald-600">ضمان 100% بدون أي تصفير أو بان</span>
                    </div>

                    <!-- Bento 3 (Full Width): Store Fulfillment Offer -->
                    <div class="col-span-2 py-2 px-3 rounded-2xl ${isLightBg ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-950' : 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'} backdrop-blur-md flex items-center justify-center gap-2 text-[11px] font-black">
                        <span>⚡</span>
                        <span>${appState.storeOffer || 'تسليم فوري خلال دقائق بضمان شامل وضريبة مغطاة 100%'}</span>
                        <span>⚡</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_showcase_bento')}
        </div>
        ` : ''}

        <!-- Layer 5: Bottom Trust Bar, Promo Code, Payment Chips & Handle -->
        ${isLayerVisible('layer_showcase_footer') ? `
        <div id="layer_showcase_footer" class="draggable-layer w-full max-w-[480px]" style="${getLayerStyle('layer_showcase_footer', 540, '50%')};">
            <div class="layer-scale-wrapper w-full px-3" style="transform: scale(${getLayerScale('layer_showcase_footer')});">
                <div class="px-4 py-2.5 rounded-2xl ${isLightBg ? 'bg-white/95 border border-slate-200/90 shadow-lg text-slate-900' : 'bg-slate-950/85 border border-white/10 shadow-2xl text-white'} backdrop-blur-md flex flex-col items-center gap-2">
                    <!-- Top Sub-row: Promo Code + Handle -->
                    <div class="flex items-center justify-between w-full pb-1.5 border-b ${isLightBg ? 'border-slate-100' : 'border-white/10'} text-[11px] font-bold">
                        <div class="flex items-center gap-1.5">
                            <span class="px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-600 font-mono text-[10.5px] font-black">
                                🏷️ ${appState.promoCode || 'كود خصم: SC15'}
                            </span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="text-amber-500 text-xs">✓</span>
                            <span class="text-[10.5px] font-mono font-black ${isLightBg ? 'text-slate-800' : 'text-slate-300'}">@shop_coin15</span>
                        </div>
                    </div>

                    <!-- Payment Chips (Apple Pay • Mada • STC Pay • Visa) -->
                    ${appState.showPaymentChips !== false ? `
                    <div class="flex items-center justify-center gap-2 flex-wrap text-[10px] font-black">
                        <span class="px-2.5 py-0.5 rounded-lg ${isLightBg ? 'bg-slate-100 border border-slate-200 text-slate-800' : 'bg-white/5 border border-white/10 text-slate-200'}"> Apple Pay</span>
                        <span class="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-600">مدى Mada</span>
                        <span class="px-2.5 py-0.5 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-600">STC Pay</span>
                        <span class="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-600">Visa / MCard</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            ${renderLayerToolbar('layer_showcase_footer')}
        </div>
        ` : ''}
    `;
}

// 1-Click Star Preset Applicator
window.applyShowcaseStar = function(idx) {
    const presets = window.SHOWCASE_STARS_PRESETS || [];
    const star = presets[idx];
    if (!star) return;

    appState.cardImageUrl = star.cardUrl;
    appState.playerName = star.arName || star.name;
    appState.playerSub = star.club || `${star.rating} ${star.position}`;
    appState.rating = star.rating;
    appState.position = star.position;
    if (star.price) {
        appState.marketPrice = star.price;
    }
    appState.headline = `وصول بطاقة ${star.arName || star.name} (${star.rating}) رسمياً! 🔥`;
    appState.badgeText = `🔥 مع نزول كرت ${star.arName || star.name} في FC 27`;

    renderControls();
    renderCanvas();
    updateCaption();
    if (window.showCopyToast) {
        window.showCopyToast(`تم تطبيق كرت: ${star.arName || star.name} ⭐⚡`);
    }
};

// Store Background Switcher
window.setShowcaseBg = function(bgKey) {
    appState.bgTheme = bgKey;
    renderControls();
    renderCanvas();
    if (window.showCopyToast) {
        const bgThemes = window.SHOWCASE_BG_THEMES || {};
        const bg = bgThemes[bgKey] || {};
        window.showCopyToast(`تم تفعيل خلفية: ${bg.name || bgKey} 🏛️✨`);
    }
};

// Gold FC Coins Stack Toggle
window.toggleShowcaseCoins = function() {
    appState.showCoinsStack = !(appState.showCoinsStack !== false);
    renderControls();
    renderCanvas();
    if (window.showCopyToast) {
        window.showCopyToast(appState.showCoinsStack !== false ? 'تم إظهار أكوام الكوينز 🪙' : 'تم إخفاء أكوام الكوينز ✕');
    }
};

// Bento Badges Toggle
window.toggleShowcaseBento = function() {
    appState.showBentoBadges = !(appState.showBentoBadges !== false);
    renderControls();
    renderCanvas();
    if (window.showCopyToast) {
        window.showCopyToast(appState.showBentoBadges !== false ? 'تم إظهار بطاقات البينتو 📱' : 'تم إخفاء بطاقات البينتو ✕');
    }
};

// Payment Chips Toggle
window.toggleShowcasePaymentChips = function() {
    appState.showPaymentChips = !(appState.showPaymentChips !== false);
    renderControls();
    renderCanvas();
};

// FC 27 Logo Toggle
window.toggleShowcaseFcLogo = function() {
    appState.showFcLogo = !(appState.showFcLogo !== false);
    renderControls();
    renderCanvas();
};

// ShopCoin15 Store Logo Toggle
window.toggleShowcaseStoreLogo = function() {
    appState.showStoreLogo = !(appState.showStoreLogo !== false);
    renderControls();
    renderCanvas();
};


// Direct single card upload helper
window.handleSingleCardUpload = function(input) {

    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        appState.cardImageUrl = e.target.result;
        renderControls();
        renderCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تم رفع صورة الكرت بنجاح! 📸⚡');
        }
    };
    reader.readAsDataURL(file);
};

// Scrape FUT.GG / FUTBIN Card or Search by Name
async function fetchFutGGCard(url) {
    if (!url || !url.trim()) {
        alert('يرجى إدخال رابط اللاعب من FUTBIN أو FUT.GG أو اسمه أو رقم ID');
        return;
    }

    const btn = document.getElementById('btnFetchFut') || document.getElementById('btnFetchPotm');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.innerHTML = 'جاري السحب... ⏳';
        btn.disabled = true;
    }

    try {
        const response = await fetch(`/api/fetch-futgg?url=${encodeURIComponent(url.trim())}`);
        let data = null;
        try {
            data = await response.json();
        } catch (jsonErr) {
            if (window.location.hostname.includes('github.io')) {
                alert('💡 تنبيه:\nصفحة GitHub Pages هي واجهة استعراض وتصميم ثابتة (بدون خادم Node.js خلفها).\n\n⚡ لسحب الكروت تلقائياً بالرابط:\n• افتح الاستوديو عبر سيرفر Render الرسمي\n• أو يمكنك رفع صورة أي كرت مباشرة بالضغط على زر "📁 رفع صورة كرت"');
                return;
            }
            throw new Error(`استجابة غير صالحة من السيرفر (${response.status})`);
        }

        if (!response.ok || !data || !data.success) {
            const msg = (data && data.error) || 'تعذر سحب صورة البطاقة من هذا الرابط، تأكد من صحة رابط اللاعب.';
            alert(`💡 ${msg}\n\nنصيحة سريعة: يمكنك رفع صورة الكرت مباشرة من جهازك بالضغط على زر "📁 رفع صورة كرت"`);
            return;
        }

        if (data.success && data.cardImage) {
            appState.cardImageUrl = data.cardImage;
            appState.playerName = data.playerName;
            appState.rating = data.rating;
            appState.position = data.position;
            appState.rarity = data.rarity;

            if (currentTemplate === 'market_drop') {
                appState.headline = `نزول سعر ${data.playerName} في FC 27! 📉🔥`;
            } else if (currentTemplate === 'sbc') {
                appState.headline = `نزل تحدي ${data.playerName} رسميـاً في FC 27! 👑`;
            } else if (currentTemplate === 'potm') {
                appState.headline = `نزل كرت ${data.playerName} لاعب الشهر رسمياً! 👑🔥`;
                appState.badgeText = `🏆 رسميـاً: ${data.playerName} لاعب الشهر في FC 27`;
            } else if (currentTemplate === 'showcase') {
                appState.headline = `وصول بطاقة ${data.playerName} (${data.rating}) رسمياً! 🔥`;
                appState.badgeText = `🔥 مع نزول كرت ${data.playerName} في FC 27 رسمياً`;
            }


            renderControls();
            renderCanvas();
            updateCaption();
            if (window.showCopyToast) window.showCopyToast(`تم سحب كرت ${data.playerName} (${data.rating}) لـ FC 27! ⚡`);
        }
    } catch (err) {
        console.error('Error fetching card:', err);
        if (window.location.hostname.includes('github.io')) {
            alert('💡 تنبيه:\nأنت تتصفح من GitHub Pages (واجهة ثابتة).\n• لسحب الكروت تلقائياً: استخدم رابط السيرفر المباشر\n• أو ارفع صورة الكرت مباشرة 📁');
        } else {
            alert('حدث خطأ أثناء سحب البطاقة: ' + err.message + '\n\nيمكنك رفع صورة الكرت مباشرة بالضغط على "📁 رفع صورة كرت"');
        }
    } finally {
        if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
}

function initCopywriterControls() {
    document.querySelectorAll('.copy-style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCopyStyle = btn.dataset.style;
            document.querySelectorAll('.copy-style-btn').forEach(b => {
                b.classList.remove('active');
                b.className = 'copy-style-btn px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600 shadow-xs';
            });
            btn.classList.add('active');
            btn.className = 'copy-style-btn active px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-xs';
            updateCaption();
        });
    });
}

function updateCaption() {
    const captionText = document.getElementById('captionText');
    if (!captionText) return;

    const caption = CopywriterEngine.generate(currentTemplate, appState, currentCopyStyle);
    captionText.value = caption;
}

function copyCaptionToClipboard() {
    const captionEl = document.getElementById('captionText');
    if (captionEl) {
        navigator.clipboard.writeText(captionEl.value).then(() => {
            if (window.showCopyToast) window.showCopyToast('تم نسخ الكابشن والهاشتاغات بنجاح! 🚀');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}

window.showCopyToast = function(msg = 'تم بنجاح! 🚀') {
    const toast = document.getElementById('copyToast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
};


// ============================================================================
// 7. LOADED ACCOUNTS READY TO PLAY TEMPLATE (🎮 حسابات جاهزة للبيع)
// ============================================================================

const LOADED_ACCOUNTS_PRESETS = [
    {
        id: 'acc_ps5',
        name: 'حساب بلايستيشن 5 (2.5M كوينز)',
        platform: 'PlayStation 5',
        coinsBalance: '2,500,000 كوينز',
        marketStatus: '✅ الماركت مفتوح بالويب آب واللعبة',
        clubLevel: 'ديفيجن 2 • نادي نظيف 100%',
        accountEmail: 'إيميل أساسي أصلي قابل للنقل بالكامل',
        priceTag: '79$',
        oldPrice: '99$',
        headline: 'حساب بلايستيشن 5 محمل بـ 2.5M كوينز كاش جاهز للعب! ⚡🔥'
    },
    {
        id: 'acc_xbox',
        name: 'حساب إكس بوكس سيريس (1.8M كوينز)',
        platform: 'XBOX Series X/S',
        coinsBalance: '1,800,000 كوينز',
        marketStatus: '✅ الماركت مفتوح بالويب آب واللعبة',
        clubLevel: 'ديفيجن 3 • تشكيلة ذهبية قوية',
        accountEmail: 'إيميل أساسي أول مع كامل البيانات الأصلية',
        priceTag: '59$',
        oldPrice: '75$',
        headline: 'حساب إكس بوكس جاهز للنزول بالـ 1.8M كوينز وماركت مفتوح! 🎮💰'
    },
    {
        id: 'acc_pc',
        name: 'حساب PC جاهز (3.2M كوينز VIP)',
        platform: 'PC EA App / Steam',
        coinsBalance: '3,200,000 كوينز',
        marketStatus: '✅ الماركت مفتوح بالويب آب واللعبة',
        clubLevel: 'ديفيجن إليت • نادي أساطير VIP',
        accountEmail: 'إيميل موثق 100% مع ضمان شامل المتجر',
        priceTag: '99$',
        oldPrice: '125$',
        headline: 'حساب PC خارق بـ 3.2 مليون كوينز وماركت مفتوح فوراً! 👑⚡'
    }
];

function renderLoadedAccountsTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.loaded_accounts.defaultState;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_acc_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Account Specs & Coins Body -->
        ${isLayerVisible('layer_acc_body') ? `
        <div id="layer_acc_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_acc_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_acc_body')});">
                
                <!-- Platform & Market Open Ribbon -->
                <div class="w-full max-w-[480px] py-1.5 px-3.5 rounded-2xl flex items-center justify-between shadow-xl" style="background: #0d1627; border: 1.5px solid #233758;">
                    <div class="flex items-center gap-1.5 text-emerald-400 text-xs font-black">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>${appState.marketStatus || def.marketStatus}</span>
                    </div>
                    <span class="px-3 py-0.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-bold font-mono">
                        🎮 ${appState.platform || def.platform}
                    </span>
                </div>

                <!-- Giant Coins Balance Card -->
                <div class="w-full max-w-[480px] rounded-3xl p-4 shadow-2xl text-center space-y-1" style="background: linear-gradient(135deg, #101c30 0%, #080f1c 100%); border: 2.5px solid #f59e0b; box-shadow: 0 0 35px rgba(245,158,11,0.35);">
                    <span class="text-xs font-bold text-slate-300 block">الرصيد الكاش المحمل بالحساب جاهز فوراً:</span>
                    <div class="flex items-center justify-center gap-2.5 py-1" dir="ltr">
                        <img src="assets/fc-coin.webp" class="w-9 h-9 object-contain drop-shadow" alt="c">
                        <span class="text-4xl font-black font-mono text-amber-300 tracking-wide">${appState.coinsBalance || def.coinsBalance}</span>
                    </div>
                    <div class="text-[11px] font-black text-emerald-400">
                        ⚡ جاهز لبناء أي فريق تحلم به بدون تضييع وقت
                    </div>
                </div>

                <!-- Account Security & Level Details Grid -->
                <div class="w-full max-w-[480px] grid grid-cols-2 gap-2 text-right">
                    <div class="p-2.5 rounded-2xl shadow" style="background: #0c1424; border: 1px solid #1f2d47;">
                        <span class="text-[10px] text-slate-400 block font-bold">مستوى النادي والمنافسات:</span>
                        <span class="text-xs font-black text-white block mt-0.5">🏆 ${appState.clubLevel || def.clubLevel}</span>
                    </div>
                    <div class="p-2.5 rounded-2xl shadow" style="background: #0c1424; border: 1px solid #1f2d47;">
                        <span class="text-[10px] text-slate-400 block font-bold">بيانات الحساب والإيميل:</span>
                        <span class="text-xs font-black text-emerald-300 block mt-0.5 truncate">📧 ${appState.accountEmail || def.accountEmail}</span>
                    </div>
                </div>

                <!-- Pricing & Instant Delivery Capsule -->
                <div class="w-full max-w-[480px] rounded-2xl p-2.5 px-4 flex items-center justify-between shadow-xl" style="background: #090e18; border: 1.5px solid #10b981;">
                    <div class="text-right">
                        <span class="text-[11px] font-bold text-slate-400 block">سعر الحساب الكامل بالبيانات:</span>
                        <span class="text-xs font-black text-emerald-400">⚡ تسليم الإيميل والباسورد فوراً عبر الخاص</span>
                    </div>
                    <div class="flex items-center gap-2" dir="ltr">
                        <span class="text-xs text-slate-500 line-through font-mono font-bold">${appState.oldPrice || def.oldPrice}</span>
                        <span class="text-2xl font-black font-mono text-emerald-300">${appState.priceTag || def.priceTag}</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_acc_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_acc_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderLoadedAccountsControls() {
    return `
        <div class="space-y-4">
            <!-- Presets Row -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <label class="block text-xs font-black text-slate-800 mb-2">نماذج حسابات جاهزة بنقرة واحدة:</label>
                <div class="grid grid-cols-1 gap-1.5">
                    ${LOADED_ACCOUNTS_PRESETS.map(p => `
                        <button type="button" onclick="applyLoadedAccountsPreset('${p.id}')" class="w-full py-2 px-3 text-right rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-between">
                            <span>🎮 ${p.name}</span>
                            <span class="font-mono text-emerald-600 font-black">${p.priceTag}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Background & Lighting -->
            ${renderStoryBackgroundControls()}

            <!-- Account Details Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">مواصفات الحساب ورصيد الكوينز:</label>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">المنصة (Platform):</label>
                        <input type="text" value="${appState.platform || ''}" oninput="appState.platform = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">رصيد الكوينز:</label>
                        <input type="text" value="${appState.coinsBalance || ''}" oninput="appState.coinsBalance = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">حالة سوق الانتقالات (الويب آب):</label>
                    <input type="text" value="${appState.marketStatus || ''}" oninput="appState.marketStatus = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">مستوى النادي / ديفيجن:</label>
                    <input type="text" value="${appState.clubLevel || ''}" oninput="appState.clubLevel = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">بيانات الإيميل والأمان:</label>
                    <input type="text" value="${appState.accountEmail || ''}" oninput="appState.accountEmail = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">السعر المخفض:</label>
                        <input type="text" value="${appState.priceTag || ''}" oninput="appState.priceTag = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">السعر السابق (الشطب):</label>
                        <input type="text" value="${appState.oldPrice || ''}" oninput="appState.oldPrice = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.applyLoadedAccountsPreset = function(presetId) {
    const p = LOADED_ACCOUNTS_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق ${p.name} 🎮✨`);
};



// ============================================================================
// 9. SQUAD MAKEOVER TEMPLATE (🛠️ تجديد التشكيلة قبل / بعد)
// ============================================================================

const SQUAD_MAKEOVER_PRESETS = [
    {
        id: 'makeover_elite',
        name: 'ترقية من ديفيجن 4 إلى إليت (850k كوينز)',
        beforeRank: 'ديفيجن 4 • كيمياء 23/33 (تشكيلة عادية)',
        afterRank: 'ديفيجن إليت 👑 • كيمياء 33/33 (تشكيلة ميتا)',
        upgradeCost: '850,000 كوينز',
        headline: 'حوّلنا فريق عميلنا من ديفيجن 4 إلى ديفيجن إليت بالكوينز! 🤯⚡'
    },
    {
        id: 'makeover_champs',
        name: 'ترقية الـ 15 فوز فوت تشامبيونز (1.2M كوينز)',
        beforeRank: '9 انتصارات فقط في الويكند (رانك 5)',
        afterRank: '15 فوز مضمون • رانك 1 و 2 🏆',
        upgradeCost: '1,200,000 كوينز',
        headline: 'تطوير شامل لنادي العميل أوصله لرانك 1 في الفوت تشامبيونز! ⚔️🔥'
    }
];

function renderSquadMakeoverTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.squad_makeover.defaultState;
    const c1Url = appState.card1_url || def.card1_url;
    const c2Url = appState.card2_url || def.card2_url;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_makeover_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Before & After Overhaul Body -->
        ${isLayerVisible('layer_makeover_body') ? `
        <div id="layer_makeover_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_makeover_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_makeover_body')});">
                
                <!-- Before / After Stages Side by Side -->
                <div class="w-full max-w-[480px] rounded-3xl p-3.5 shadow-2xl flex items-center justify-between gap-2" style="background: #090e18; border: 2px solid #1f2e48;">
                    
                    <!-- Left: Before State (Struggling) -->
                    <div class="flex-1 rounded-2xl p-2.5 text-center flex flex-col items-center opacity-85" style="background: #111a2b; border: 1px solid #243554;">
                        <span class="px-2 py-0.5 rounded-full bg-red-950 text-red-300 text-[10px] font-black border border-red-500/50 mb-2">
                            ❌ قبل التطوير
                        </span>
                        <div class="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl my-1">
                            📉
                        </div>
                        <span class="text-[11px] font-black text-slate-300 block mt-1 leading-snug">
                            ${appState.beforeRank || def.beforeRank}
                        </span>
                        <span class="text-[9.5px] font-bold text-slate-400 mt-1">خسائر متتالية ومعاناة بالدفاع</span>
                    </div>

                    <!-- Middle: Transformation Energy Bolt -->
                    <div class="flex flex-col items-center shrink-0">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center text-slate-950 font-black text-base animate-pulse">
                            ⚡
                        </div>
                        <span class="text-[9px] font-black text-amber-400 mt-1 whitespace-nowrap">ترقية المتجر</span>
                    </div>

                    <!-- Right: After State (Dominating Elite) -->
                    <div class="flex-1 rounded-2xl p-2.5 text-center flex flex-col items-center" style="background: linear-gradient(180deg, #132438 0%, #0d1a29 100%); border: 1.5px solid #10b981;">
                        <span class="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-black border border-emerald-500/60 mb-2">
                            ⭐ بعد التطوير
                        </span>
                        <div class="flex items-center justify-center gap-1 my-1">
                            <img src="${c1Url}" class="w-12 h-14 object-contain drop-shadow" alt="">
                            <img src="${c2Url}" class="w-12 h-14 object-contain drop-shadow" alt="">
                        </div>
                        <span class="text-[11px] font-black text-emerald-300 block mt-1 leading-snug">
                            ${appState.afterRank || def.afterRank}
                        </span>
                        <span class="text-[9.5px] font-bold text-amber-300 mt-1">صلابة وسيطرة مطلقة 👑</span>
                    </div>
                </div>

                <!-- Total Upgrade Investment Capsule -->
                <div class="w-full max-w-[480px] rounded-2xl p-2.5 px-4 flex items-center justify-between shadow-xl" style="background: #090e18; border: 1.5px solid #f59e0b;">
                    <div class="text-right">
                        <span class="text-[11px] font-bold text-slate-400 block">الميزانية الإجمالية لتجديد التشكيلة بالكامل:</span>
                        <span class="text-xs font-black text-amber-400">شحن فوري كامل + نصائح تكتيكية مجانية</span>
                    </div>
                    <div class="flex items-center gap-1.5" dir="ltr">
                        <img src="assets/fc-coin.webp" class="w-6 h-6 object-contain" alt="c">
                        <span class="text-xl font-black font-mono text-white">${appState.upgradeCost || def.upgradeCost}</span>
                    </div>
                </div>

                <!-- Consultation Invitation Box -->
                <div class="w-full max-w-[480px] rounded-2xl p-2.5 text-right shadow" style="background: #0c1424; border: 1px solid #1e2c45;">
                    <span class="text-[10.5px] font-bold text-slate-300 flex items-center gap-1.5">
                        <span>💬</span>
                        <span>أرسل تشكيلتك الحالية على الخاص.. ونعطيك أفضل 3 تبديلات ميتا ترفع مستواك فوراً مع خصم خاص!</span>
                    </span>
                </div>
            </div>
            ${renderLayerToolbar('layer_makeover_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_makeover_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderSquadMakeoverControls() {
    return `
        <div class="space-y-4">
            <!-- Presets Row -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <label class="block text-xs font-black text-slate-800 mb-2">نماذج تجديد التشكيلة بنقرة واحدة:</label>
                <div class="grid grid-cols-1 gap-1.5">
                    ${SQUAD_MAKEOVER_PRESETS.map(p => `
                        <button type="button" onclick="applySquadMakeoverPreset('${p.id}')" class="w-full py-2 px-3 text-right rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-between">
                            <span>🛠️ ${p.name}</span>
                            <span class="font-mono text-emerald-600 font-black">${p.upgradeCost}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Background & Lighting -->
            ${renderStoryBackgroundControls()}

            <!-- Makeover Details Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">بيانات التجديد والترقية:</label>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">حالة الفريق قبل التطوير:</label>
                    <input type="text" value="${appState.beforeRank || ''}" oninput="appState.beforeRank = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">حالة الفريق بعد التطوير:</label>
                    <input type="text" value="${appState.afterRank || ''}" oninput="appState.afterRank = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">تكلفة كوينز التطوير:</label>
                    <input type="text" value="${appState.upgradeCost || ''}" oninput="appState.upgradeCost = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>
        </div>
    `;
}

window.applySquadMakeoverPreset = function(presetId) {
    const p = SQUAD_MAKEOVER_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق تجديد ${p.name} 🛠️✨`);
};



// ============================================================================
// 11. PLAYER DUEL & STORY POLL TEMPLATE (🥊 معركة النجوم وتصويت الستوري)
// ============================================================================

const PLAYER_DUEL_PRESETS = [
    {
        id: 'duel_mbappe_vini',
        name: 'مبابي ضد فينيسيوس (91 ST vs 90 LW)',
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
        headline: 'مبابي ضد فينيسيوس: من المهاجم الأفضل لناديك في الفوت؟ 🤔🔥'
    },
    {
        id: 'duel_jude_fede',
        name: 'بيلينغهام ضد فان دايك (صانع اللعب vs الجدار)',
        card1: {
            name: 'جود بيلينغهام',
            rating: '90 CAM',
            stat1: '80 سرعة',
            stat2: '86 تسديد',
            stat3: '88 مراوغة',
            price: '480,000 كوينز',
            url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp'
        },
        card2: {
            name: 'فيرجيل فان دايك',
            rating: '89 CB',
            stat1: '78 سرعة',
            stat2: '90 دفاع',
            stat3: '86 فيزيكال',
            price: '320,000 كوينز',
            url: '/api/image-proxy?url=https%3A%2F%2Fgame-assets.fut.gg%2Fcdn-cgi%2Fimage%2Fquality%3D85%2Cformat%3Dauto%2Cwidth%3D600%2F2027%2Ffutgg-player-item-card%2F27-203376.17f57c8f215fff6f4edef3889583cc487fefce9b4e7ce1eeba235d634b7424b8.webp'
        },
        headline: 'سؤال الويكند: تستثمر كوينزك في الهجوم أم الجدار الدفاعي؟ ⚔️🛡️'
    }
];

function renderPlayerDuelTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.player_duel.defaultState;
    const c1 = appState.card1 || def.card1;
    const c2 = appState.card2 || def.card2;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_duel_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Duel Cards & Poll Area Body -->
        ${isLayerVisible('layer_duel_body') ? `
        <div id="layer_duel_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_duel_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_duel_body')});">
                
                <!-- 2 Cards Facing Each Other with 3D VS -->
                <div class="relative w-full h-[270px] flex items-center justify-center gap-2 px-1">
                    
                    <!-- Card 1 (Right) -->
                    <div class="flex-1 flex flex-col items-center max-w-[210px] transform -rotate-2">
                        <div class="relative w-full h-[185px] flex items-center justify-center">
                            <img src="${c1.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="">
                        </div>
                        <div class="w-full rounded-xl p-1.5 text-center mt-1" style="background: #0d1524; border: 1px solid #1e2c44;">
                            <span class="text-xs font-black text-white block">${c1.name}</span>
                            <div class="text-[9.5px] font-mono text-emerald-400 font-bold flex justify-around mt-0.5">
                                <span>${c1.stat1}</span>
                                <span>${c1.stat2}</span>
                            </div>
                            <span class="text-[10px] font-mono text-amber-300 font-black block mt-0.5">${c1.price}</span>
                        </div>
                    </div>

                    <!-- Center Fiery VS Emblem -->
                    <div class="relative z-20 flex flex-col items-center shrink-0 -my-3">
                        <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 p-[2px] shadow-[0_0_22px_rgba(239,68,68,0.8)] flex items-center justify-center text-slate-950 font-black text-sm">
                            VS
                        </div>
                    </div>

                    <!-- Card 2 (Left) -->
                    <div class="flex-1 flex flex-col items-center max-w-[210px] transform rotate-2">
                        <div class="relative w-full h-[185px] flex items-center justify-center">
                            <img src="${c2.url}" class="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]" alt="">
                        </div>
                        <div class="w-full rounded-xl p-1.5 text-center mt-1" style="background: #0d1524; border: 1px solid #1e2c44;">
                            <span class="text-xs font-black text-white block">${c2.name}</span>
                            <div class="text-[9.5px] font-mono text-teal-400 font-bold flex justify-around mt-0.5">
                                <span>${c2.stat1}</span>
                                <span>${c2.stat2}</span>
                            </div>
                            <span class="text-[10px] font-mono text-amber-300 font-black block mt-0.5">${c2.price}</span>
                        </div>
                    </div>
                </div>

                <!-- Instagram Poll Sticker Area Simulation -->
                <div class="w-full max-w-[460px] py-2 px-3 rounded-2xl text-center space-y-1" style="background: #0a111e; border: 1.5px dashed #3b82f6;">
                    <span class="text-[11px] font-bold text-slate-300 block">🗳️ مساحة مخصصة لستيكر تصويت إنستغرام (Poll Sticker):</span>
                    <div class="text-xs font-black text-blue-400">
                        ${appState.pollPrompt || def.pollPrompt}
                    </div>
                </div>

                <!-- Price Guarantee Capsule -->
                <div class="w-full max-w-[460px] rounded-2xl p-2 text-center" style="background: #090e18; border: 1px solid #10b981;">
                    <span class="text-xs font-black text-emerald-400">
                        ⚡ كوينز النجمين متوفرة تسليم فوري لناديك بأفضل سعر في السوق!
                    </span>
                </div>
            </div>
            ${renderLayerToolbar('layer_duel_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_duel_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderPlayerDuelControls() {
    return `
        <div class="space-y-4">
            <!-- Presets Row -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <label class="block text-xs font-black text-slate-800 mb-2">مواجهات جاهزة بنقرة واحدة:</label>
                <div class="grid grid-cols-1 gap-1.5">
                    ${PLAYER_DUEL_PRESETS.map(p => `
                        <button type="button" onclick="applyPlayerDuelPreset('${p.id}')" class="w-full py-2 px-3 text-right rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-between">
                            <span>🥊 ${p.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Background & Lighting -->
            ${renderStoryBackgroundControls()}

            <!-- Duel Details Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">سؤال الاستفتاء والتصويت:</label>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">نص الاستفتاء (Poll Question):</label>
                    <input type="text" value="${appState.pollPrompt || ''}" oninput="appState.pollPrompt = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>
        </div>
    `;
}

window.applyPlayerDuelPreset = function(presetId) {
    const p = PLAYER_DUEL_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق مواجهة ${p.name} 🥊✨`);
};


// ============================================================================
// 12. BUDGET BEAST META SQUAD TEMPLATE (💎 تشكيلة الميزانية الذكية)
// ============================================================================

const BUDGET_BEAST_PRESETS = [
    {
        id: 'budget_attack',
        name: 'هجوم الرعب بـ 250 ألف كوينز',
        squadCost: '250,000 كوينز فقط',
        squadTitle: 'ثلاثي الهجوم الخارق الميتا',
        highlightPill: '⚡ سرعة جنونية + إنهاء قاتل بـ 250k',
        headline: 'تشكيلة الـ 250 ألف كوينز الميتا التي تجلد فرق الملايين! 🤯🔥'
    },
    {
        id: 'budget_mid_def',
        name: 'وسط ودفاع فولاذي بـ 350 ألف كوينز',
        squadCost: '350,000 كوينز فقط',
        squadTitle: 'الجدار الدفاعي ومحاور الكنترول',
        highlightPill: '🛡️ افتكاك بدني وقوة حديدية بـ 350k',
        headline: 'قفل دفاعك ووسطك بـ 350 ألف كوينز فقط! قوة لا تقهر 🛡️⚡'
    }
];

function renderBudgetBeastTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.budget_beast.defaultState;
    const c1 = appState.card1 || def.card1;
    const c2 = appState.card2 || def.card2;
    const c3 = appState.card3 || def.card3;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_budget_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Budget Beasts Lineup Body -->
        ${isLayerVisible('layer_budget_body') ? `
        <div id="layer_budget_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_budget_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2" style="transform: scale(${getLayerScale('layer_budget_body')});">
                
                <!-- Highlight Ribbon -->
                <div class="px-4 py-1 rounded-full text-xs font-black shadow-lg" style="background: #0d1728; border: 1.5px solid #00FFA3; color: #00FFA3;">
                    ${appState.highlightPill || def.highlightPill}
                </div>

                <!-- 3 Overpowered Budget Beasts in Podium Formation -->
                <div class="relative w-full h-[285px] flex items-center justify-center gap-2 px-1 my-1">
                    <!-- Left Beast -->
                    <div class="flex-1 flex flex-col items-center max-w-[155px]" style="transform: rotate(-3deg);">
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${c1.url}" class="max-h-full max-w-full object-contain drop-shadow" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c1.name}</span>
                            <span class="text-[9.5px] text-emerald-400 font-bold block">${c1.trait}</span>
                        </div>
                    </div>

                    <!-- Center Beast (Elevated) -->
                    <div class="flex-1 flex flex-col items-center max-w-[170px] -mt-3 z-20">
                        <div class="relative w-full h-[195px] flex items-center justify-center">
                            <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.3)_0%,transparent_70%)] blur-xl -z-10"></div>
                            <img src="${c2.url}" class="max-h-full max-w-full object-contain drop-shadow" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c2.name}</span>
                            <span class="text-[9.5px] text-amber-400 font-bold block">${c2.trait}</span>
                        </div>
                    </div>

                    <!-- Right Beast -->
                    <div class="flex-1 flex flex-col items-center max-w-[155px]" style="transform: rotate(3deg);">
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${c3.url}" class="max-h-full max-w-full object-contain drop-shadow" alt="">
                        </div>
                        <div class="text-center truncate max-w-full mt-1">
                            <span class="text-xs font-black ${isLightBg ? 'text-slate-950' : 'text-white'}">${c3.name}</span>
                            <span class="text-[9.5px] text-teal-400 font-bold block">${c3.trait}</span>
                        </div>
                    </div>
                </div>

                <!-- Squad Cost Pill -->
                <div class="w-full max-w-[460px] rounded-2xl p-2.5 px-4 flex items-center justify-between shadow-xl" style="background: #090e18; border: 1.5px solid #10b981;">
                    <div class="text-right">
                        <span class="text-[11px] font-bold text-slate-400 block">تكلفة التشكيلة الإجمالية كاملة:</span>
                        <span class="text-xs font-black text-emerald-400">⚡ شحن فوري بخصم خاص للمبتدئين</span>
                    </div>
                    <div class="flex items-center gap-1.5" dir="ltr">
                        <img src="assets/fc-coin.webp" class="w-6 h-6 object-contain" alt="c">
                        <span class="text-xl font-black font-mono text-white">${appState.squadCost || def.squadCost}</span>
                    </div>
                </div>
            </div>
            ${renderLayerToolbar('layer_budget_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_budget_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderBudgetBeastControls() {
    return `
        <div class="space-y-4">
            <!-- Presets Row -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <label class="block text-xs font-black text-slate-800 mb-2">تشكيلات ميزانية جاهزة بنقرة واحدة:</label>
                <div class="grid grid-cols-1 gap-1.5">
                    ${BUDGET_BEAST_PRESETS.map(p => `
                        <button type="button" onclick="applyBudgetBeastPreset('${p.id}')" class="w-full py-2 px-3 text-right rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-between">
                            <span>💎 ${p.name}</span>
                            <span class="font-mono text-emerald-600 font-black">${p.squadCost}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Background & Lighting -->
            ${renderStoryBackgroundControls()}

            <!-- Budget Details Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">بيانات التشكيلة والميزانية:</label>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">الميزانية الإجمالية:</label>
                    <input type="text" value="${appState.squadCost || ''}" oninput="appState.squadCost = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">شريط التمييز العلوي:</label>
                    <input type="text" value="${appState.highlightPill || ''}" oninput="appState.highlightPill = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>
        </div>
    `;
}

window.applyBudgetBeastPreset = function(presetId) {
    const p = BUDGET_BEAST_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق ${p.name} 💎✨`);
};


// ============================================================================
// 13. PLAYER CARD VERDICT & REVIEW TEMPLATE (🔍 مراجعة الكرت بعد 50 مباراة)
// ============================================================================

const PLAYER_REVIEW_PRESETS = [
    {
        id: 'review_mbappe',
        name: 'مراجعة كيليان مبابي 91 ST (تقييم 9.8/10)',
        playerName: 'كيليان مبابي (91 ST)',
        playerPrice: '1,850,000 كوينز',
        gamesPlayed: '50 مباراة فوت تشامبيونز',
        goalsStats: '68 هدف ⚽ • 24 أسيست 👟',
        pro1: '🟢 سرعة انفجارية مستحيل اللحاق به',
        pro2: '🟢 إنهاء قاتل بالقدمين من أي زاوية',
        con1: '🔴 سعره مرتفع ويحتاج ميزانية مخصصة',
        finalScore: '9.8 / 10',
        headline: 'مراجعة مبابي بعد 50 مباراة فوت: هل يستاهل كوينزه؟ 🤔🔥'
    },
    {
        id: 'review_vvd',
        name: 'مراجعة فيرجيل فان دايك 89 CB (تقييم 9.6/10)',
        playerName: 'فيرجيل فان دايك (89 CB)',
        playerPrice: '320,000 كوينز',
        gamesPlayed: '50 مباراة في الديفيجن رايفلز',
        goalsStats: 'افتكاك 94% 🛡️ • 0 أخطاء فادحة',
        pro1: '🟢 جدار دفاعي يقطع كل الكرات العرضية',
        pro2: '🟢 قوة بدنية خارقة تفتك الكرة بدون أخطاء',
        con1: '🔴 يحتاج تسريع كيميائي بالـ Shadow',
        finalScore: '9.6 / 10',
        headline: 'مراجعة فان دايك بعد 50 مباراة: هل هو المدافع الأقوى؟ 🛡️⚡'
    }
];

function renderPlayerReviewTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.player_review.defaultState;
    const cardUrl = appState.playerCardUrl || def.playerCardUrl;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_review_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Player Review Card & Verdict Body -->
        ${isLayerVisible('layer_review_body') ? `
        <div id="layer_review_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_review_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-2.5" style="transform: scale(${getLayerScale('layer_review_body')});">
                
                <!-- Main Review Slate -->
                <div class="w-full max-w-[480px] rounded-3xl p-4 shadow-2xl flex items-center justify-between gap-3" style="background: linear-gradient(135deg, #0e1627 0%, #080d17 100%); border: 2px solid #25395c;">
                    
                    <!-- Right: Large Player Card -->
                    <div class="w-[170px] shrink-0 flex flex-col items-center">
                        <div class="relative w-full h-[180px] flex items-center justify-center">
                            <img src="${cardUrl}" class="max-h-full max-w-full object-contain drop-shadow" alt="">
                        </div>
                        <span class="text-xs font-black text-white block mt-1">${appState.playerName || def.playerName}</span>
                        <span class="text-[10.5px] font-mono text-amber-300 font-black block mt-0.5">${appState.playerPrice || def.playerPrice}</span>
                    </div>

                    <!-- Left: Performance & Verdict Details -->
                    <div class="flex-1 text-right space-y-2">
                        
                        <!-- Games & Stats Pill -->
                        <div class="p-2 rounded-xl bg-slate-950/90 border border-slate-800 space-y-0.5">
                            <span class="text-[10px] text-slate-400 block font-bold">🎮 ${appState.gamesPlayed || def.gamesPlayed}</span>
                            <span class="text-xs font-black text-emerald-400 block">${appState.goalsStats || def.goalsStats}</span>
                        </div>

                        <!-- Pros & Cons List -->
                        <div class="space-y-1 text-[10px] font-bold">
                            <div class="text-emerald-300">${appState.pro1 || def.pro1}</div>
                            <div class="text-emerald-300">${appState.pro2 || def.pro2}</div>
                            <div class="text-red-400">${appState.con1 || def.con1}</div>
                        </div>

                        <!-- Final Score Stamp -->
                        <div class="p-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400 flex items-center justify-between px-3">
                            <span class="text-[10.5px] font-black text-slate-300">التقييم النهائي:</span>
                            <span class="text-xl font-black font-mono text-amber-300">${appState.finalScore || def.finalScore} ⭐</span>
                        </div>
                    </div>
                </div>

                <!-- Instant Purchase Capsule -->
                <div class="w-full max-w-[480px] rounded-2xl p-2 text-center" style="background: #090e18; border: 1.5px solid #10b981;">
                    <span class="text-xs font-black text-emerald-400">
                        💰 الكرت يستاهل كل كوينز! شحن ميزانيته متوفر فوراً لناديك بأفضل سعر
                    </span>
                </div>
            </div>
            ${renderLayerToolbar('layer_review_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_review_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderPlayerReviewControls() {
    return `
        <div class="space-y-4">
            <!-- Presets Row -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <label class="block text-xs font-black text-slate-800 mb-2">مراجعات جاهزة بنقرة واحدة:</label>
                <div class="grid grid-cols-1 gap-1.5">
                    ${PLAYER_REVIEW_PRESETS.map(p => `
                        <button type="button" onclick="applyPlayerReviewPreset('${p.id}')" class="w-full py-2 px-3 text-right rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-between">
                            <span>🔍 ${p.name}</span>
                            <span class="font-mono text-emerald-600 font-black">${p.finalScore}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Background & Lighting -->
            ${renderStoryBackgroundControls()}

            <!-- Review Details Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">بيانات تقييم ومراجعة اللاعب:</label>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">اسم اللاعب ورتبه:</label>
                    <input type="text" value="${appState.playerName || ''}" oninput="appState.playerName = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">سعر اللاعب في السوق:</label>
                    <input type="text" value="${appState.playerPrice || ''}" oninput="appState.playerPrice = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">المباريات المجربة:</label>
                        <input type="text" value="${appState.gamesPlayed || ''}" oninput="appState.gamesPlayed = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">الأهداف والإحصائيات:</label>
                        <input type="text" value="${appState.goalsStats || ''}" oninput="appState.goalsStats = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">التقييم النهائي:</label>
                    <input type="text" value="${appState.finalScore || ''}" oninput="appState.finalScore = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>
        </div>
    `;
}

window.applyPlayerReviewPreset = function(presetId) {
    const p = PLAYER_REVIEW_PRESETS.find(x => x.id === presetId);
    if (!p) return;
    Object.keys(p).forEach(k => {
        if (k !== 'id' && k !== 'name') appState[k] = p[k];
    });
    renderControls();
    renderCanvas();
    if (window.showCopyToast) window.showCopyToast(`تم تطبيق مراجعة ${p.name} 🔍✨`);
};


// ============================================================================
// 14. CUSTOM STORY TEMPLATE (✨ قالب خاص - تصميمك المخصص)
// ============================================================================

function renderCustomStoryTemplate() {
    const isLightBg = (window.MARKET_BG_THEMES[appState.bgTheme || 'store']?.isLight) ?? true;
    const def = TEMPLATES.custom_story.defaultState;

    return `
        ${getStoryBackgroundHtml(appState.bgTheme || 'store', appState.bgLighting || 'bright')}

        <!-- Layer 1: Header -->
        ${renderStoryHeader('layer_custom_header', appState.badgeText || def.badgeText, appState.headline || def.headline, appState.subheadline || def.subheadline, isLightBg)}

        <!-- Layer 2: Custom Design Body -->
        ${isLayerVisible('layer_custom_body') ? `
        <div id="layer_custom_body" class="draggable-layer w-full text-center flex flex-col items-center" style="${getLayerStyle('layer_custom_body', 165)}; width: 510px; z-index: 25;">
            <div class="layer-scale-wrapper w-full flex flex-col items-center gap-3" style="transform: scale(${getLayerScale('layer_custom_body')});">
                
                <!-- Main Custom Canvas Area -->
                <div class="w-full max-w-[480px] rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md" style="background: linear-gradient(135deg, rgba(14, 22, 38, 0.92) 0%, rgba(8, 13, 23, 0.96) 100%); border: 2px solid rgba(16, 185, 129, 0.4); box-shadow: 0 0 35px rgba(16, 185, 129, 0.2);">
                    
                    <!-- Decorative Top Glow -->
                    <div class="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full"></div>

                    <!-- Custom Card Header Tag -->
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                        <div class="flex items-center gap-2 text-emerald-400 font-black text-xs">
                            <span class="text-base">✨</span>
                            <span>CUSTOM STUDIO TEMPLATE</span>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold text-[10.5px]">
                            قالب مخصص بانتظار فكرتك 🎨
                        </span>
                    </div>

                    <!-- Dynamic Custom Elements Area (Built per user's prompt) -->
                    <div class="py-6 px-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
                        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] flex items-center justify-center shadow-lg">
                            <div class="w-full h-full bg-[#080d18] rounded-[14px] flex items-center justify-center text-2xl">
                                🎨
                            </div>
                        </div>

                        <h4 class="text-sm font-black text-white">
                            ${appState.customHeadline || 'مساحة التصميم المخصص جاهزة!'}
                        </h4>

                        <p class="text-xs text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
                            ${appState.customDesc || 'اشرح لي الآن في الدردشة فكرة التصميم، العناصر، الألوان، وأي صور أو جداول تريدها، وسأقوم ببرمجتها وتطبيقها هنا مباشرة بدقة 4K!'}
                        </p>

                        <!-- Flexible Feature Tags Container -->
                        <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
                            <span class="px-3 py-1 rounded-xl bg-slate-950 border border-slate-700 text-[11px] font-bold text-slate-300">
                                ⚡ ${appState.customText1 || 'عنصر مخصص 1'}
                            </span>
                            <span class="px-3 py-1 rounded-xl bg-slate-950 border border-slate-700 text-[11px] font-bold text-slate-300">
                                💎 ${appState.customText2 || 'عنصر مخصص 2'}
                            </span>
                        </div>
                    </div>

                    <!-- Trust / Footer Guarantee -->
                    <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10.5px] font-bold text-slate-400">
                        <span>🛡️ متجر ShopCoin15 الرسمي</span>
                        <span class="text-emerald-400 font-black">⚡ تسليم فوري بالخاص</span>
                    </div>

                </div>
            </div>
            ${renderLayerToolbar('layer_custom_body')}
        </div>
        ` : ''}

        <!-- Layer 3: CTA -->
        ${renderStoryCta('layer_custom_cta', appState.ctaHeadline || def.ctaHeadline, appState.ctaSub || def.ctaSub)}
    `;
}

function renderCustomStoryControls() {
    return `
        <div class="space-y-4">
            <!-- Instruction Notice -->
            <div class="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/40 text-right space-y-1.5 shadow-sm">
                <div class="flex items-center gap-2 text-emerald-400 font-black text-xs">
                    <span>✨</span>
                    <span>قالب خاص مخصص:</span>
                </div>
                <p class="text-[11px] font-bold text-slate-300 leading-relaxed">
                    اشرح لي في الدردشة فكرة التصميم بالكامل وسأقوم ببرمجة وتطبيق كافة تفاصيلها هنا فوراً وتجهيز حقولها!
                </p>
            </div>

            <!-- Background & Lighting Controls -->
            ${renderStoryBackgroundControls()}

            <!-- Custom Story Form -->
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-right">
                <label class="block text-xs font-black text-slate-800 border-b pb-1.5">بيانات ونصوص القالب:</label>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">شارة الستوري العلوية (Badge):</label>
                    <input type="text" value="${appState.badgeText || ''}" oninput="appState.badgeText = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">العنوان الرئيسي:</label>
                    <input type="text" value="${appState.headline || ''}" oninput="appState.headline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">الوصف الفرعي:</label>
                    <input type="text" value="${appState.subheadline || ''}" oninput="appState.subheadline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">نص مخصص 1:</label>
                        <input type="text" value="${appState.customText1 || ''}" oninput="appState.customText1 = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-600 mb-1">نص مخصص 2:</label>
                        <input type="text" value="${appState.customText2 || ''}" oninput="appState.customText2 = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-600 mb-1">عنوان زر الطلب (CTA):</label>
                    <input type="text" value="${appState.ctaHeadline || ''}" oninput="appState.ctaHeadline = this.value; renderCanvas();" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
            </div>
        </div>
    `;
}



