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

window.currentFitScale = 1.0;

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
    if (window.updateCanvasViewportScale) window.updateCanvasViewportScale();
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
    initState();
    initTemplateSelector();
    initRatioSelector();
    initResolutionSelector();
    initCopywriterControls();
    updateRatioSelectorForTemplate();
    updateCaptionVisibility();
    renderControls();
    renderCanvas();
    updateCaption();
    if (window.AiAssistant && typeof window.AiAssistant.onTemplateChanged === 'function') {
        window.AiAssistant.onTemplateChanged(currentTemplate);
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
    Object.keys(TEMPLATES).forEach(key => {
        const tmpl = TEMPLATES[key];
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

function updateRatioSelectorForTemplate() {
    const isStoryOnly = currentTemplate === 'store_promo' || currentTemplate === 'sbc';
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
    if (currentTemplate === 'store_promo' || currentTemplate === 'sbc') {
        captionSection.style.display = 'none';
    } else {
        captionSection.style.display = '';
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
        b.classList.toggle('active', Object.keys(TEMPLATES)[i] === key);
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
    if (currentTemplate === 'store_promo' || currentTemplate === 'sbc') {
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

                    <div class="space-y-2">
                        ${banners.map((b, idx) => `
                            <div class="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center gap-2">
                                <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0">${idx + 1}</span>
                                <input type="text" value="${(b.text || '').replace(/"/g, '&quot;')}" oninput="updatePromoBannerText(${idx}, this.value)" placeholder="نص الشريط..." class="flex-1 px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                <input type="color" value="${b.bg || '#0084FF'}" oninput="updatePromoBannerBg(${idx}, this.value)" class="w-7 h-7 rounded cursor-pointer border-0 p-0 shrink-0" title="لون خلفية الشريط">
                                <button type="button" onclick="togglePromoBannerColor(${idx})" class="px-2 py-1 rounded text-[10px] font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0" title="تبديل لون الخط بين الأبيض والأسود">
                                    ${(b.color || '').toUpperCase() === '#FFFFFF' ? '⚪' : '⚫'}
                                </button>
                                ${banners.length > 1 ? `
                                <button type="button" onclick="removePromoBanner(${idx})" class="w-6 h-6 rounded bg-red-50 hover:bg-red-100 text-red-600 text-xs font-black transition flex items-center justify-center shrink-0" title="حذف الشريط">✕</button>
                                ` : ''}
                            </div>
                        `).join('')}
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

    // Template Specific Player Selectors
    if (currentTemplate === 'trio') {
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
    } else {
        // Single Card Scraper for Market Drop & SBC
        html += `
            <div class="mb-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>سحب كرت اللاعب الأصلي من FUT.GG:</span>
                    </span>
                    <span class="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black">FC 27 الرسمي</span>
                </div>
                <div class="flex gap-2">
                    <input type="text" id="futUrlInput" placeholder="ضع رابط اللاعب من fut.gg (مثال: https://www.fut.gg/players/...)" class="flex-1 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs">
                    <button id="btnFetchFut" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition flex items-center gap-1 shrink-0 shadow-sm">
                        <span>سحب الكرت</span>
                        <span>⚡</span>
                    </button>
                </div>

                <div class="mt-3">
                    <div class="text-[11px] text-slate-600 font-bold mb-1.5">أبرز نجوم FC 27 بنقرة واحدة:</div>
                    <div class="flex flex-wrap gap-1.5">
                        ${POPULAR_FUTGG_STARS.map(star => `
                            <button class="quick-star-btn px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[11px] font-bold text-slate-700 transition shadow-xs" data-url="${star.url}">
                                ${star.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Background Theme Selector
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

    if (currentTemplate === 'trio') {
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

                        <div class="space-y-2">
                            ${banners.map((b, idx) => `
                                <div class="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center gap-2">
                                    <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0">${idx + 1}</span>
                                    <input type="text" value="${(b.text || '').replace(/"/g, '&quot;')}" oninput="updatePromoBannerText(${idx}, this.value)" placeholder="نص شريط التحدي..." class="flex-1 px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                                    <input type="color" value="${b.bg || '#0084FF'}" oninput="updatePromoBannerBg(${idx}, this.value)" class="w-7 h-7 rounded cursor-pointer border-0 p-0 shrink-0" title="لون خلفية الشريط">
                                    <button type="button" onclick="togglePromoBannerColor(${idx})" class="px-2 py-1 rounded text-[10px] font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0" title="تبديل لون الخط بين الأبيض والأسود">
                                        ${(b.color || '').toUpperCase() === '#FFFFFF' ? '⚪' : '⚫'}
                                    </button>
                                    ${banners.length > 1 ? `
                                    <button type="button" onclick="removePromoBanner(${idx})" class="w-6 h-6 rounded bg-red-50 hover:bg-red-100 text-red-600 text-xs font-black transition flex items-center justify-center shrink-0" title="حذف الشريط">✕</button>
                                    ` : ''}
                                </div>
                            `).join('')}
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

    // Box & Button Customization Card (Only for templates with info box and CTA button like trio/market_drop)
    if (currentTemplate !== 'store_promo' && currentTemplate !== 'sbc') {
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

    // Background Framing & Position Controls (تحريك وتكبير الخلفية)
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
    if (currentTemplate === 'trio') {
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
    const canvas = document.getElementById('exportCanvas');
    if (!canvas) return;

    const activeFont = appState.fontFamily || 'alexandria';
    canvas.classList.remove('font-family-alexandria', 'font-family-thmanyah', 'font-family-zain');
    canvas.classList.add(`font-family-${activeFont}`);

    if (currentTemplate === 'store_promo') {
        canvas.innerHTML = renderStorePromoTemplate();
    } else if (currentTemplate === 'trio') {
        canvas.innerHTML = renderTrioTemplate();
        if (window.triggerAutoSaveTrio) window.triggerAutoSaveTrio();
    } else if (currentTemplate === 'market_drop') {
        canvas.innerHTML = renderMarketDropTemplate();
    } else if (currentTemplate === 'sbc') {
        canvas.innerHTML = renderSbcTemplate();
    } else if (currentTemplate === 'potm') {
        canvas.innerHTML = renderPotmTemplate();
    }

    canvas.querySelectorAll('.draggable-layer').forEach(layer => {
        const layerKey = layer.id;
        makeDraggable(layer, layerKey);
    });
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
            <div style="display: inline-block; background-color: ${bg}; color: ${color}; padding: 7px 18px; border-radius: 6px; font-weight: 800; font-size: 16.5px; line-height: 1.35; text-align: center; max-width: 86%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin: 0 auto; word-break: break-word;">
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
            <div style="display: inline-block; background-color: ${bg}; color: ${color}; padding: 7px 18px; border-radius: 6px; font-weight: 800; font-size: 16.5px; line-height: 1.35; text-align: center; max-width: 86%; box-shadow: 0 4px 12px rgba(0,0,0,0.18); margin: 0 auto; word-break: break-word;">
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
        </div>
        ` : ''}
    `;
}

// Scrape FUT.GG Card
async function fetchFutGGCard(url) {
    if (!url || (!url.includes('fut.gg') && !url.includes('futbin.com') && !url.match(/^\d+$/) && !url.startsWith('http'))) {
        alert('يرجى إدخال رابط صالح من موقع FUTBIN أو FUT.GG أو رقم ID اللاعب');
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
        if (!response.ok) {
            if (window.location.hostname.includes('github.io')) {
                alert('💡 تنبيه:\nصفحة GitHub Pages هي واجهة استعراض وتصميم ثابتة (بدون خادم Node.js خلفها).\n\n⚡ لسحب الكروت تلقائياً بالرابط:\n• افتح الاستوديو عبر شبكة المنزل: http://192.168.1.2:3000\n• أو يمكنك رفع صورة أي كرت مباشرة بالضغط على زر المجلد 📁');
                return;
            }
            throw new Error(`استجابة غير صالحة من السيرفر (${response.status})`);
        }
        const data = await response.json();

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
            }

            renderControls();
            renderCanvas();
            updateCaption();
            if (window.showCopyToast) window.showCopyToast(`تم سحب كرت ${data.playerName} (${data.rating}) لـ FC 27! ⚡`);
        } else {
            alert('تعذر سحب صورة البطاقة من هذا الرابط، تأكد من صحة رابط اللاعب.');
        }
    } catch (err) {
        console.error('Error fetching FUT.GG card:', err);
        if (window.location.hostname.includes('github.io')) {
            alert('💡 تنبيه:\nأنت تتصفح من GitHub Pages (واجهة ثابتة).\n• لسحب الكروت تلقائياً: افتح http://192.168.1.2:3000\n• أو ارفع صورة الكرت مباشرة 📁');
        } else {
            alert('حدث خطأ أثناء سحب البطاقة: ' + err.message);
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
