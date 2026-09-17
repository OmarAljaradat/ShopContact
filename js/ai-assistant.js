/**
 * ShopCoin15 AI Studio Assistant (Gemini Engine)
 * Template-Aware & Specialized for FC 27 Studio
 */

const TEMPLATE_AI_META = {
    store_promo: {
        badgeName: '📱 ستوري المتجر الأصلية',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        placeholder: 'اكتب فكرة الستوري بلهجتك (مثال: ترويج كوينز بضمان وسرعة شحن، أو بيع حسابات، أو أفضل 3 لاعبين للبداية)...',
        quickChips: [
            { label: '🔥 ترويج كوينز (3 لاعبين)', prompt: 'ستوري ترويج توفر كوينز لحدث التوتي بـ 3 لاعبين وسرعة شحن خيالية وضمان نادي كامل' },
            { label: '👥 ترويج كوينز (كرتين)', prompt: 'ستوري ترويج كوينز سريعة بلاعبين اثنين فقط وأسعار تنافسية' },
            { label: '👑 ترويج بيع الحسابات', prompt: 'ستوري ترويج بيع حسابات جاهزة وتغيير كامل المعلومات ليصير الحساب ملكك' },
            { label: '⚡ وحوش البداية الرخاص', prompt: 'ستوري عن أفضل 3 لاعبين تبدأ فيهم أسعارهم رخيصة وقويين وبدون كلام كثير' }
        ]
    },
    trio: {
        badgeName: '👑 تريو 3 لاعبين (بوست)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        placeholder: 'اكتب فكرة التريو (مثال: ثلاثي هجوم مدريد، أو أقوى 3 مدافعين باللعبة، أو نجوم بداية اللعبة مع أسعارهم)...',
        quickChips: [
            { label: '⚔️ ثلاثي هجوم مدريد', prompt: 'بوست تريو عن ثلاثي هجوم ريال مدريد مبابي وفينيسيوس ورودريغو مع أسعارهم وفرصة الشحن' },
            { label: '🛡️ أقوى 3 مدافعين باللعبة', prompt: 'بوست تريو عن أفضل 3 مدافعين صلبين باللعبة وأسعارهم التقريبية' },
            { label: '💎 ثلاثي الأحلام للتوتي', prompt: 'بوست تريو عن أفضل 3 بطاقات بحدث التوتي ونصيحة شحن الكوينز قبل ارتفاعهم' },
            { label: '⚡ ثلاثي السرعة الاقتصادي', prompt: 'بوست تريو عن أسرع 3 أجنحة في FC 27 وأسعارهم التنافسية' }
        ]
    },
    market_drop: {
        badgeName: '📉 هبوط الأسعار (بوست)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        placeholder: 'اكتب فكرة هبوط السعر (مثال: هبوط سعر مبابي 700 ألف كوينز، أو كراش فينيسيوس وفرصة الشحن الفوري)...',
        quickChips: [
            { label: '📉 هبوط سعر مبابي', prompt: 'بوست هبوط سعر بطاقة مبابي 700 ألف كوينز وفرصة تاريخية للشحن الآن' },
            { label: '🔥 كراش سوق فينيسيوس', prompt: 'بوست هبوط سعر فينيسيوس جونيور في السوق وفرصة الشحن السريع' },
            { label: '⚡ انهيار أسعار كروت الذهب', prompt: 'بوست هبوط عام في أسعار نجوم الذهب وفرصة بناء تشكيلة بأسعار رخيصة' },
            { label: '🚨 تنبيه كراش سوق الويكند', prompt: 'بوست تنبيه نزول السوق بعد جوائز الفوت تشامبيونز وفرصة الشحن' }
        ]
    },
    sbc: {
        badgeName: '⚡ ستوري تحديات وترقيات الـ SBC',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        placeholder: 'اكتب اسم التحدي أو فكرة الترويج (مثال: ترقية 81+ بيك، تحدي الأيقون، باقات من 50 لـ 1000 ترقية مع الضمان)...',
        quickChips: [
            { label: '🌟 ترقية 81+ اختيارية', prompt: 'ستوري ترويج حل وترقية 81+ اختيارية متوفر من 50 لين 1000 ترقية وسرعة تنفيذ وضمان نادي' },
            { label: '👑 تحدي الأيقون 88+', prompt: 'ستوري ترويج حل تحدي الأيقون 88+ مع كوينز أو بدون كوينز بأرخص سعر وتنفيذ سريع' },
            { label: '🏆 تحدي مبابي POTM', prompt: 'ستوري ترويج تقفيل تحدي مبابي لاعب الشهر POTM الجديد وتوفير الكوينز كاملة بحسابك' },
            { label: '⚽ ترقية +80 دوري الأبطال', prompt: 'ستوري ترويج ترقية 80+ دوري الأبطال باقات كميات كبيرة وأسعار تنافسية' }
        ]
    },
    potm: {
        badgeName: '🏆 لاعب الشهر (POTM)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        placeholder: 'اكتب اسم لاعب الشهر أو الدوري (مثال: مبابي لاعب الشهر بالدوري الإسباني، كول بالمر بالدوري الإنجليزي)...',
        quickChips: [
            { label: '👑 مبابي 92 (LaLiga)', prompt: 'بوست إعلان كرت مبابي 92 لاعب الشهر في الدوري الإسباني وتوفير كوينز التحدي وحله بالكامل' },
            { label: '⚡ كول بالمر 88 (PL)', prompt: 'بوست إعلان كول بالمر 88 لاعب الشهر في الدوري الإنجليزي وتكلفة التحدي بالسوق وعرض المتجر' },
            { label: '💎 لامين يامال 87 (LaLiga)', prompt: 'بوست لاعب الشهر لامين يامال 87 للدوري الإسباني وتقفيل التحدي بدون تضحية بنجوم النادي' },
            { label: '🛡️ نجم الشهر بالدوري الإيطالي', prompt: 'بوست لاعب الشهر للدوري الإيطالي سيريا آي كفاراتسخيليا وتوفير الكوينز اللازمة' }
        ]
    }
};

const AiAssistant = {
    getApiKey() {
        return localStorage.getItem('shopcoin15_gemini_api_key') || '';
    },

    setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem('shopcoin15_gemini_api_key', key.trim());
        } else {
            localStorage.removeItem('shopcoin15_gemini_api_key');
        }
    },

    onTemplateChanged(templateKey) {
        const meta = TEMPLATE_AI_META[templateKey] || TEMPLATE_AI_META.store_promo;
        const badgeEl = document.getElementById('aiActiveTemplateBadge');
        if (badgeEl) {
            badgeEl.textContent = meta.badgeName;
            badgeEl.className = `px-2 py-0.5 rounded-md font-extrabold text-[10px] border transition-all duration-200 ${meta.badgeColor}`;
        }

        const inputEl = document.getElementById('aiPromptInput');
        if (inputEl) {
            inputEl.placeholder = meta.placeholder;
        }

        const chipsContainer = document.getElementById('aiQuickChips');
        if (chipsContainer) {
            chipsContainer.innerHTML = meta.quickChips.map(chip => `
                <button type="button" onclick="AiAssistant.applyQuickPrompt('${chip.prompt.replace(/'/g, "\\'")}')" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-[10px] font-bold text-slate-600 transition shadow-2xs">
                    ${chip.label}
                </button>
            `).join('');
        }
    },

    async generate(promptText = null) {
        const inputEl = document.getElementById('aiPromptInput');
        const prompt = (promptText || (inputEl ? inputEl.value : '')).trim();

        if (!prompt) {
            alert('يرجى كتابة فكرة أو موضوع البوست المطلوب في الخانة المخصصة');
            if (inputEl) inputEl.focus();
            return;
        }

        const btn = document.getElementById('btnAiGenerate');
        const originalBtnHtml = btn ? btn.innerHTML : '';

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>جاري صياغة الفكرة وتصميم القالب... 🤖⏳</span>';
            btn.classList.add('opacity-75', 'pointer-events-none');
        }

        const resultPill = document.getElementById('aiMarketingAngleResult');
        if (resultPill) resultPill.classList.add('hidden');

        try {
            const userKey = this.getApiKey();
            const activeTpl = (typeof currentTemplate !== 'undefined' && currentTemplate) ? currentTemplate : 'store_promo';

            const res = await fetch('/api/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    template: activeTpl,
                    apiKey: userKey
                })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'تعذر معالجة الفكرة بواسطة الذكاء الاصطناعي');
            }

            const aiData = data.data;
            this.lastPrompt = prompt;
            this.applyToStudio(aiData);

            if (resultPill && aiData.marketingAngle) {
                resultPill.innerHTML = `
                    <div class="flex items-start gap-2">
                        <span class="text-amber-400 font-bold text-sm">💡</span>
                        <div>
                            <span class="font-black text-white text-[11px]">الاستراتيجية التسويقية (${activeTpl}):</span>
                            <p class="text-[10px] text-slate-300 mt-0.5 leading-relaxed">${aiData.marketingAngle}</p>
                        </div>
                    </div>
                `;
                resultPill.classList.remove('hidden');
            }

            if (window.showCopyToast) {
                window.showCopyToast('تم تطبيق فكرة الذكاء الاصطناعي على القالب بنجاح! 🤖⚡');
            }

        } catch (err) {
            console.error('[AI Assistant Error]', err);
            alert('خطأ في توليد فكرة الـ AI: ' + err.message);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalBtnHtml;
                btn.classList.remove('opacity-75', 'pointer-events-none');
            }
        }
    },

    applyToStudio(aiData) {
        if (!aiData) return;

        const promptLower = (this.lastPrompt || '').toLowerCase();

        // 1. Template-Specific Application (STRICT: Never force template switch)
        if (currentTemplate === 'store_promo') {
            // Card count: 2 or 3
            if (aiData.cardCount) {
                appState.cardCount = parseInt(aiData.cardCount, 10) === 2 ? 2 : 3;
            } else if (promptLower.includes('لاعبين 2') || promptLower.includes('2 لاعبين') || promptLower.includes('كرتين') || promptLower.includes('ثنائي')) {
                appState.cardCount = 2;
            } else {
                appState.cardCount = 3;
            }

            // Stacked Banners
            if (Array.isArray(aiData.banners) && aiData.banners.length > 0) {
                appState.banners = aiData.banners;
            }
        } else if (currentTemplate === 'trio') {
            if (aiData.badgeText) appState.badgeText = aiData.badgeText;
            if (aiData.headline) appState.headline = aiData.headline;
            if (aiData.subheadline) appState.subheadline = aiData.subheadline;
            if (aiData.ctaText) appState.ctaText = aiData.ctaText;
            if (aiData.card1Price) appState.card1_price = aiData.card1Price;
            if (aiData.card2Price) appState.card2_price = aiData.card2Price;
            if (aiData.card3Price) appState.card3_price = aiData.card3Price;
        } else if (currentTemplate === 'market_drop') {
            if (aiData.oldPrice) appState.oldPrice = aiData.oldPrice;
            if (aiData.newPrice) appState.newPrice = aiData.newPrice;
            if (aiData.savingBadge) appState.savingBadge = aiData.savingBadge;
            if (aiData.badgeText) appState.badgeText = aiData.badgeText;
            if (aiData.headline) appState.headline = aiData.headline;
            if (aiData.subheadline) appState.subheadline = aiData.subheadline;
            if (aiData.ctaText) appState.ctaText = aiData.ctaText;
        } else if (currentTemplate === 'sbc') {
            if (Array.isArray(aiData.banners) && aiData.banners.length > 0) {
                appState.banners = aiData.banners;
            }
            if (aiData.sbcTitle) appState.sbcTitle = aiData.sbcTitle;
            if (aiData.sbcCost) appState.sbcCost = aiData.sbcCost;
            if (aiData.badgeText) appState.badgeText = aiData.badgeText;
            if (aiData.headline) appState.headline = aiData.headline;
            if (aiData.subheadline) appState.subheadline = aiData.subheadline;
            if (aiData.ctaText) appState.ctaText = aiData.ctaText;
        } else if (currentTemplate === 'potm') {
            if (aiData.league) appState.league = aiData.league;
            if (aiData.sbcCost) appState.sbcCost = aiData.sbcCost;
            if (aiData.storeOffer) appState.storeOffer = aiData.storeOffer;
            if (aiData.badgeText) appState.badgeText = aiData.badgeText;
            if (aiData.headline) appState.headline = aiData.headline;
            if (aiData.subheadline) appState.subheadline = aiData.subheadline;
            if (aiData.ctaText) appState.ctaText = aiData.ctaText;
            if (aiData.playerName) appState.playerName = aiData.playerName;
            if (aiData.playerArName) appState.playerArName = aiData.playerArName;
            if (aiData.rating) appState.rating = aiData.rating;
            if (aiData.position) appState.position = aiData.position;
        }

        // 2. Intelligent Player Matching
        if (Array.isArray(aiData.suggestedPlayers) && aiData.suggestedPlayers.length > 0) {
            this.matchSuggestedPlayers(aiData.suggestedPlayers);
        }

        // 3. Card prices in store_promo if requested
        if (currentTemplate === 'store_promo') {
            if (aiData.card1Price) appState.card1_price = aiData.card1Price;
            if (aiData.card2Price) appState.card2_price = aiData.card2Price;
            if (aiData.card3Price) appState.card3_price = aiData.card3Price;
        }

        // 4. Feed caption for templates that have captions (trio, market_drop, potm) - sbc and store_promo are story-only
        if (currentTemplate !== 'store_promo' && currentTemplate !== 'sbc' && aiData.caption) {
            window.aiGeneratedCaption = aiData.caption;
            const captionEl = document.getElementById('captionText');
            if (captionEl) {
                captionEl.value = aiData.caption;
            }
        }

        // 5. Refresh UI and canvas
        if (typeof renderControls === 'function') renderControls();
        if (typeof renderCanvas === 'function') renderCanvas();
        if (typeof triggerAutoSaveTrio === 'function') triggerAutoSaveTrio();
    },

    matchSuggestedPlayers(players) {
        const promptLower = (this.lastPrompt || '').toLowerCase();
        const isStarterMode = promptLower.includes('تبدا') || 
                              promptLower.includes('بداية') || 
                              promptLower.includes('وحوش') || 
                              promptLower.includes('starter') || 
                              promptLower.includes('رخيص') || 
                              promptLower.includes('اسعارهم');

        const starterList = window.STARTER_BEASTS || [];
        const topList = window.POPULAR_FUTGG_STARS || [];
        const catalog = isStarterMode ? [...starterList, ...topList] : [...topList, ...starterList];

        const findCard = (keyword) => {
            if (!keyword) return null;
            const cleanKey = keyword.toLowerCase().replace(/[^a-z0-9\u0621-\u064A]/gi, ' ').trim();
            const tokens = cleanKey.split(/\s+/).filter(t => t.length > 2);
            return catalog.find(item => {
                const name = (item.name || '').toLowerCase();
                const arName = (item.arName || '').toLowerCase();
                return (tokens.length > 0 && tokens.some(tok => name.includes(tok) || arName.includes(tok))) ||
                       name.includes(cleanKey) || arName.includes(cleanKey);
            });
        };

        if (currentTemplate === 'store_promo' || currentTemplate === 'trio') {
            const card1 = findCard(players[0]) || (isStarterMode ? starterList[0] : topList[1]);
            const card2 = findCard(players[1]) || (isStarterMode ? starterList[1] : topList[0]);
            const card3 = findCard(players[2]) || (isStarterMode ? starterList[2] : topList[2]);

            if (card1) {
                appState.card1_url = card1.imageUrl;
                appState.card1_name = card1.name;
                if (card1.price && !appState.card1_price) appState.card1_price = card1.price;
            }
            if (card2) {
                appState.card2_url = card2.imageUrl;
                appState.card2_name = card2.name;
                if (card2.price && !appState.card2_price) appState.card2_price = card2.price;
            }
            if (card3) {
                appState.card3_url = card3.imageUrl;
                appState.card3_name = card3.name;
                if (card3.price && !appState.card3_price) appState.card3_price = card3.price;
            }
        } else if (currentTemplate === 'sbc') {
            const card = findCard(players[0]);
            if (card) {
                appState.sbcImageUrl = card.imageUrl;
                appState.sbcTitle = card.arName || card.name;
            }
        } else if (currentTemplate === 'market_drop') {
            const card = findCard(players[0]) || catalog[0];
            if (card) {
                appState.cardImageUrl = card.imageUrl;
                appState.playerName = card.arName || card.name;
                appState.playerArName = card.arName || card.name;
                if (card.rating) appState.rating = card.rating;
                if (card.position) appState.position = card.position;
            }
        } else if (currentTemplate === 'potm') {
            const potmStars = window.POPULAR_POTM_STARS || [];
            const cleanKey = (players[0] || '').toLowerCase().replace(/[^a-z0-9\u0621-\u064A]/gi, ' ').trim();
            const card = potmStars.find(p => {
                const n = (p.name || '').toLowerCase();
                const an = (p.arName || '').toLowerCase();
                return n.includes(cleanKey) || an.includes(cleanKey) || cleanKey.includes(an);
            }) || findCard(players[0]) || potmStars[0];

            if (card) {
                appState.cardImageUrl = card.imageUrl;
                appState.playerName = card.name;
                appState.playerArName = card.arName || card.name;
                if (card.rating) appState.rating = card.rating;
                if (card.position) appState.position = card.position;
                if (card.league && !appState.league) appState.league = card.league;
                if (card.sbcCost && !appState.sbcCost) appState.sbcCost = card.sbcCost;
            }
        }
    },

    applyQuickPrompt(promptText) {
        const inputEl = document.getElementById('aiPromptInput');
        if (inputEl) {
            inputEl.value = promptText;
        }
        this.generate(promptText);
    },

    openKeySettingsModal() {
        const currentKey = this.getApiKey();
        const entered = prompt(
            'أدخل مفتاح Google Gemini API الخاص بك (اختياري، يوجد مفتاح افتراضي يعمل تلقائياً):',
            currentKey
        );
        if (entered !== null) {
            this.setApiKey(entered);
            if (window.showCopyToast) {
                window.showCopyToast(entered.trim() ? 'تم حفظ مفتاح Gemini API بنجاح! 🔑' : 'تمت استعادة المفتاح الافتراضي للموقع ↺');
            }
        }
    }
};

window.AiAssistant = AiAssistant;
