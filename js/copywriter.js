/**
 * Smart Arabic Gamer Copywriter Engine for ShopCoin15
 * 100% Tailored for Instagram Posts, Stories, and Reels.
 * Supports:
 * - Direct Store Templates (trio, market_drop, sbc, potm, showcase)
 * - Smart AI Caption Generation (Community-first, logical, non-robotic, engaging)
 */

const CopywriterEngine = {
    // ---------------------------------------------------------
    // 1. Context Parser (Extracts positions, themes, and stars)
    // ---------------------------------------------------------
    parseIdeaContext(ideaText, extraPlayers = []) {
        const text = (ideaText || '').trim();
        const lower = text.toLowerCase();

        let position = '';
        let positionAr = '';
        if (lower.includes('cam') || text.includes('صانع') || text.includes('صناع')) {
            position = 'CAM'; positionAr = 'صناع اللعب (CAM)';
        } else if (lower.includes('cb') || text.includes('دفاع') || text.includes('مدافع') || text.includes('قلوب دفاع') || text.includes('قلب دفاع')) {
            position = 'CB'; positionAr = 'قلوب الدفاع (CB)';
        } else if (lower.includes('st') || text.includes('مهاجم') || text.includes('هجوم') || text.includes('رأس حربة') || text.includes('مهاجمين')) {
            position = 'ST'; positionAr = 'المهاجمين ورؤوس الحربة (ST)';
        } else if (lower.includes('cm') || text.includes('وسط') || text.includes('محور') || text.includes('ارتكاز') || lower.includes('cdm')) {
            position = 'CM/CDM'; positionAr = 'لاعبي الوسط والمحور (CM/CDM)';
        } else if (lower.includes('rw') || lower.includes('rm') || text.includes('جناح يمين') || text.includes('يمين')) {
            position = 'RW'; positionAr = 'الأجنحة الهجومية';
        } else if (lower.includes('lw') || lower.includes('lm') || text.includes('جناح يسار') || text.includes('يسار') || text.includes('أجنحة')) {
            position = 'LW'; positionAr = 'الأجنحة الهجومية';
        } else if (lower.includes('gk') || text.includes('حارس') || text.includes('حراس') || text.includes('حراسة')) {
            position = 'GK'; positionAr = 'حراسة المرمى (GK)';
        }

        const isIcons = lower.includes('icon') || lower.includes('hero') || text.includes('أيقون') || text.includes('ايقون') || text.includes('أساطير') || text.includes('اساطير') || text.includes('هيرو');
        const isStarter = text.includes('بداية') || text.includes('بدايات') || text.includes('رخيص') || text.includes('رخاص') || text.includes('ميزانية') || text.includes('اقتصادي') || lower.includes('starter') || lower.includes('budget');
        const isVersus = text.includes('مقارنة') || text.includes('ضد') || text.includes('صراع') || lower.includes('vs') || text.includes('مين أفضل') || text.includes('مين تختار');
        const isMeta = text.includes('ميتا') || text.includes('ميتّا') || text.includes('أقوى') || text.includes('أفضل') || text.includes('توب') || text.includes('افضل');

        const knownStars = [
            { en: 'Pelé', ar: 'بيليه' },
            { en: 'Cruyff', ar: 'كرويف' },
            { en: 'Zidane', ar: 'زيدان' },
            { en: 'Zico', ar: 'زيكو' },
            { en: 'Kaká', ar: 'كاكا' },
            { en: 'Ronaldo', ar: 'رونالدو' },
            { en: 'Messi', ar: 'ميسي' },
            { en: 'Mbappé', ar: 'مبابي' },
            { en: 'Haaland', ar: 'هالاند' },
            { en: 'Vinícius', ar: 'فينيسيوس' },
            { en: 'Bellingham', ar: 'بيلينغهام' },
            { en: 'Valverde', ar: 'فالفيردي' },
            { en: 'Rodri', ar: 'رودري' },
            { en: 'Saliba', ar: 'صليبا' },
            { en: 'Van Dijk', ar: 'فان دايك' },
            { en: 'Militão', ar: 'ميليتاو' },
            { en: 'Rüdiger', ar: 'روديغر' },
            { en: 'Walker', ar: 'ووكر' },
            { en: 'Theo Hernández', ar: 'ثيو هيرنانديز' },
            { en: 'Yamal', ar: 'يامال' },
            { en: 'Salah', ar: 'صلاح' },
            { en: 'Courtois', ar: 'كورتوا' },
            { en: 'Alisson', ar: 'أليسون' }
        ];

        const detectedPlayers = [];
        knownStars.forEach(star => {
            if (text.includes(star.ar) || lower.includes(star.en.toLowerCase())) {
                detectedPlayers.push(star.ar);
            }
        });

        if (Array.isArray(extraPlayers)) {
            extraPlayers.forEach(p => {
                const pName = (typeof p === 'string' ? p : (p.name || p.arName || '')).trim();
                if (pName && !detectedPlayers.includes(pName)) {
                    detectedPlayers.push(pName);
                }
            });
        }

        return {
            cleanTitle: text,
            position,
            positionAr,
            isIcons,
            isStarter,
            isVersus,
            isMeta,
            players: detectedPlayers.slice(0, 5)
        };
    },

    // ---------------------------------------------------------
    // 2. High-Quality Smart Arabic Copywriter (Zero Robotic Spam)
    // ---------------------------------------------------------
    generateLocalSmartCaption(ideaText, style = 'discussion', extraPlayers = []) {
        const ctx = this.parseIdeaContext(ideaText, extraPlayers);
        const title = ctx.cleanTitle || 'أقوى كروت FC 27';
        const playersListStr = ctx.players.length > 0 ? ctx.players.join(' • ') : '';

        const hashtags = [
            '#FC27',
            '#UltimateTeam',
            '#EAFC27',
            '#فيفا27',
            ctx.position ? `#${ctx.position}_FC27` : '#تشكيلة_الموسم',
            '#فوت27',
            '#ShopCoin15'
        ].join(' ');

        // STYLE 1: 💬 DISCUSSION (نقاش كروي وميتّا)
        if (style === 'discussion') {
            let hook = '';
            let body = '';
            let question = '';

            if (ctx.isVersus) {
                hook = `مقارنة تشعل الحيرة في FC 27.. مين يستاهل مكان أساسي بتشكيلتك؟ 🔥⚽`;
                body = `المقارنة هنا مش بس أرقام على الورق، الفارق الحقيقي يظهر بالانسيابية داخل الملعب وأسلوب اللعب التكتيكي (PlayStyles+). كرت يعطيك سرعة ارتداد خيالية، وكرت ثاني يعطيك ثبات وقوة بدنية ما تنهزم.`;
                question = `👇 صوتك يحسمها:\nلو الخيار بيدك وميزانيتك تكفي لاعب واحد منهم، مين تختار بدون تردد؟`;
            } else if (ctx.isIcons) {
                hook = `هيبة أساطير اللعبة وذكريات الكورة الجميلة مع كروت الـ Heroes & Icons في FC 27 👑✨`;
                body = `كروت تصنع الفارق باللحظات الصعبة في الفوت تشامبيونز، التمركز الذكي وإنهاء الهجمات من أنصاف الفرص هو اللي يبرر قيمتها العالية في السوق.${playersListStr ? `\n\n📌 الأسماء الحاضرة: ${playersListStr}` : ''}`;
                question = `👀 سؤال للمتابعين:\nمين الأيقونة أو الهيرو اللي تشوفه الحلم الأول لناديك هذا الموسم؟`;
            } else if (ctx.isStarter) {
                hook = `بناء تشكيلة البداية بذكاء هو اللي يضمن لك فوز مريح في أول أسابيع FC 27 💡⚽`;
                body = `مش لازم تحرق كل كوينزك على كرت واحد غالي، في كروت اقتصادية أدائها داخل المستطيل الأخضر ينافس كروت الملايين بفضل سرعتها وملاءمتها للميتّا الحالية.`;
                question = `🗣️ شاركنا بالتعليقات:\nمين أفضل كرت اقتصادي جربته وصنع لك الفارق من أول أسبوع؟`;
            } else if (ctx.position) {
                hook = `مركز ${ctx.positionAr} في FC 27.. خيارات تصنع لك الأمان وتتحكم برتم المباريات بالكامل ⚡🎯`;
                body = `بعد تجربة اللعبة والوقوف على أسلوب اللعب الجديد، هذي الأسماء أثبتت أنها الأفضل حالياً في مركزها من حيث التوازن الدفاعي والانسيابية.${playersListStr ? `\n\n⭐ أبرز الكروت: ${playersListStr}` : ''}`;
                question = `👇 تتفق مع هذا الترتيب؟\nولا في لاعب تشوفه مظلوم ويستحق يكون بالقائمة؟`;
            } else {
                hook = `كلام منطقي عن ${title} في FC 27 🔥`;
                body = `التفاصيل الصغيرة وسرعة الحركة هي اللي تحسم مواجهات الرايفلز والتشامبيونز. اختيارك للكرت المناسب لأسلوب لعبك أهم بكثير من مجرد الرايتينغ المكتوب على البطاقة.${playersListStr ? `\n\n⚽ الأسماء: ${playersListStr}` : ''}`;
                question = `💬 اعطنا رأيك بالتعليقات: مين لاعبك المفضل بهذي الفئة؟`;
            }

            return `${hook}\n\n${body}\n\n${question}\n\n---\n⚡ متجر @shop_coin15 — كوينز مضمونة 100% لتطوير ناديك، حياك على الخاص 📩\n\n${hashtags}`;
        }

        // STYLE 2: 🔥 TREND & REELS (سريع للريلز والتيك توك)
        if (style === 'trend') {
            let hook = `احفظ الفيديو عندك عشان ترجع له وقت ما تبني تشكيلتك 📌⚡\n\n${title} في FC 27:`;
            let body = `المفاضلة باللعبة حالياً تعتمد على اللي يقدم لك أعلى قيمة داخل الملعب. كروت تجمع بين السرعة الفائقة والإنهاء النظيف بدون تعقيد.${playersListStr ? `\n\n💎 الاختيارات: ${playersListStr}` : ''}`;
            let cta = `👇 اكتب بالتعليقات: كم تقيم هذي الخيارات من 10؟\n\nتابع الحساب للمزيد من كروت ونصائح FC 27 اليومية 📲\nكوينز ناديك جاهزة وفورية مع @shop_coin15 عبر الخاص 📩`;

            return `${hook}\n\n${body}\n\n${cta}\n\n${hashtags} #ريلز_فيفا #تيك_توك_فيفا`;
        }

        // STYLE 3: 💡 TACTICS (تحليل وتكتيك)
        if (style === 'tactics') {
            let hook = `تحليل فني مختصر: كيف تختار الأنسب لتشكيلتك في ${title}؟ 🧠⚽`;
            let body = `في آليات اللعب الجديدة لـ FC 27:\n• الـ PlayStyles+ تصنع فارق أكبر من أرقام الكرت المجردة.\n• ردة الفعل والـ Agility هي اللي تمنحك أفضلية بالمرتدات السريعة.\n• الاستثمار في كروت متوازنة يوفر عليك كوينز طائلة على المدى البعيد.${playersListStr ? `\n\n📋 كروت يُنصح بالتركيز عليها: ${playersListStr}` : ''}`;
            let question = `📌 نصيحة اليوم: ركز على جودة الكرت داخل الملعب وتجربة المحترفين قبل الشراء.\n\nمن خلال تجربتك، مين الكرت اللي يستاهل كل كوينز اندفعت فيه؟ 👇\n\nشحن وتطوير فريقك بأمان واحترافية: @shop_coin15 🛡️`;

            return `${hook}\n\n${body}\n\n${question}\n\n${hashtags}`;
        }

        // STYLE 4: 👑 STORE SUBTLE (توصية راقية للمتجر)
        let hook = `طوّر تشكيلتك بذكاء ونافس على أعلى رانك في FC 27 👑⚡`;
        let body = `${title}\n\nامتلاك النجوم اللي تصنع الفارق بالوقت الحاسم ما عاد يحتاج انتظار الحظ من الباكات المجهولة.${playersListStr ? ` نجوم مثل (${playersListStr}) يعطوا ناديك هيبة استثنائية من الدقيقة الأولى.` : ''}`;
        let storePlug = `متجر @shop_coin15 يوفر لك كوينز ناديك بأعلى معايير الأمان وسرعة التسليم لجميع المنصات (PS5 / Xbox / PC) مع ضمان كامل 🔒\n\n📩 للطلب والاستفسار: حياك الله عبر الرسائل الخاصة DM`;
        let question = `👇 شاركنا بتعليق: مين أول لاعب ناوي تضمه لناديك اليوم؟`;

        return `${hook}\n\n${body}\n\n${question}\n\n${storePlug}\n\n${hashtags}`;
    },

    // ---------------------------------------------------------
    // 3. Main AI Caption Interface (Server API + Local Fallback)
    // ---------------------------------------------------------
    async generateAiCaption({ idea, style = 'discussion', players = [], apiKey = '' }) {
        const cleanIdea = (idea || '').trim();
        if (!cleanIdea) {
            throw new Error('يرجى كتابة فكرة أو عنوان للكابشن');
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const res = await fetch('/api/ai-caption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({ idea: cleanIdea, style, players, apiKey })
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                if (data && data.caption) {
                    return data;
                }
            }
        } catch (e) {
            console.warn('[CopywriterEngine] Server AI caption endpoint skipped, using local smart engine:', e.message);
        }

        // Instant Fallback to Local Smart Football Engine
        const localText = this.generateLocalSmartCaption(cleanIdea, style, players);
        return {
            success: true,
            source: 'local_smart_engine',
            caption: localText,
            style
        };
    },

    // ---------------------------------------------------------
    // 4. Legacy Template Generator (Maintained for existing canvas)
    // ---------------------------------------------------------
    generate(templateId, state, style = 'hype') {
        if (window.aiGeneratedCaption) {
            return window.aiGeneratedCaption;
        }

        const hashtags = '#FC27 #EA_FC27 #فيفا27 #FIFA27 #كوينز_فيفا27 #shop_coin15 #التيم_تيت27 #fut27 #سوني5 #تحديات_fc27 #اكسبلور_fc27';

        if (templateId === 'showcase') {
            const player = state.playerName || 'النجم';
            const rating = state.rating || '90';
            const headline = state.headline || 'قفل كرتك بأرخص سعر وأسرع شحن كوينز ⚡';
            const promo = state.promoCode || 'كود خصم: SC15';
            const priceLine = state.marketPrice ? `💰 سعر الكرت بالسوق: ${state.marketPrice}\n` : '';
            const offerLine = state.storeOffer ? `⚡ ${state.storeOffer}\n` : '';

            if (style === 'hype') {
                return `${headline}\n\n` +
                    `نزل كرت ${player} (${rating}) رسميـاً في FC 27! 🌟👑\n` +
                    (priceLine ? `${priceLine}` : '') +
                    `بدل ما تعتمد على الحظ والبكجات.. امتلك الكرت بـ كوينز صافية ومضمونة من متجرنا بأفضل سعر في السوق!\n\n` +
                    (offerLine ? `${offerLine}` : '') +
                    `⚡ نقل آمن 100% بدون أي تصفير أو بان\n` +
                    `⚡ شامل ضريبة EA بالكامل (تستلم كوينزك صافية)\n` +
                    `⚡ سرعة تنفيذ وتسليم فوري لجميع المنصات (PS5 / Xbox / PC)\n` +
                    `🏷️ ${promo}\n\n` +
                    `ارسل اسم اللاعب أو الكمية المطلوبة بالخاص وحياك الله 📩👇\n\n` +
                    `${hashtags}`;
            } else if (style === 'direct') {
                return `متوفر الآن شحن كوينز FC 27 لشراء ${player} أو أي لاعب ببالك فوراً ⚡\n\n` +
                    (priceLine ? `• ${priceLine}` : '') +
                    `• أسعار منافسة وسرعة خيالية بالتنفيذ\n` +
                    `• ضمان شامل وأمان كامل لحسابك 100%\n` +
                    `• ${promo}\n\n` +
                    `للطلب والاستفسار تواصل معنا عبر الخاص DM 📩\n\n` +
                    `${hashtags}`;
            } else {
                return `ضمان وأمان حسابك في أيدٍ أمينة مع متجر @shop_coin15 🛡️\n\n` +
                    `نوفر لك كوينز شراء كرت ${player} بأحدث طرق النقل الآمنة 100% وبدون أي مخاطر على ناديك.\n` +
                    (priceLine ? `${priceLine}` : '') +
                    `تقييمات وثقة مئات العملاء على مدار المواسم.\n\n` +
                    `تواصل معنا على الخاص DM وابدأ اللعب بنجومك المفضلين 👑\n\n` +
                    `${hashtags}`;
            }
        } else if (templateId === 'store_promo' || templateId === 'trio') {
            const isStarter = (state.badgeText || '').includes('بداية') || (state.headline || '').includes('بداية');

            if (style === 'hype') {
                if (isStarter) {
                    return `تبي تبدأ تشكيلتك بقوة وتكتسح المنافسين من أول يوم في FC 27؟ 🔥👑\n\n` +
                        `مع انطلاقة اللعبة.. بناء تشكيلة قوية وسريعة من البداية يحتاج كوينز مضمونة وبأفضل سعر!\n\n` +
                        `متجر @shop_coin15 يوفر لك كوينز بداية الموسم فوراً:\n` +
                        `⚡ تسليم فوري وآمن 100% بدون أي مخاطر\n` +
                        `⚡ تغطية ضريبة EA كاملة (تستلم كوينزك صافية)\n` +
                        `⚡ متوفر لجميع المنصات (PS5 / Xbox / PC)\n\n` +
                        `لا تضيع وقتك.. تواصل معنا بالخاص DM واطلب كوينز تشكيلة البداية الحين 📩👇\n\n` +
                        `${hashtags}`;
                }
                return `تبي تقفل هالثلاثي المرعب بتشكيلتك في FC 27؟ 🔥👑\n\n` +
                    `بدل ما تعتمد على الحظ والبكجات المجهولة.. متجر @shop_coin15 يوفر لك كوينز فيفا 27 فوري وبأفضل سعر في السوق!\n\n` +
                    `⚡ نقل آمن 100% بدون باند وبدون تصفير\n` +
                    `⚡ شامل ضريبة EA كاملة (تستلم كوينزك صافية)\n` +
                    `⚡ متوفر لجميع المنصات (PS5 / Xbox / PC)\n\n` +
                    `حياكم الله بالخاص DM واطلب كوينزك الحين وجهز تشكيلة الفوت تشامبيونز 📩👇\n\n` +
                    `${hashtags}`;
            } else if (style === 'direct') {
                return `متوفر شحن كوينز FC 27 لجميع المنصات بأسرع تسليم وأقوى الأسعار ⚡\n\n` +
                    `• نقل يدوي آمن 100%\n` +
                    `• تغطية ضريبة الـ 5% بالكامل\n` +
                    `• دعم فني مستمر وسرعة تنفيذ\n\n` +
                    `تواصل معنا على الخاص DM وحياكم الله جميعاً 📩\n\n` +
                    `${hashtags}`;
            } else {
                return `أمان حسابك هو أولويتنا الأولى في @shop_coin15 🛡️\n\n` +
                    `شحن كوينز FC 27 بأعلى درجات الأمان والضمان الشامل.\n` +
                    `أكثر من 10,000 عملية شحن ناجحة وتقييمات عملاء موثقة على مدار المواسم.\n\n` +
                    `حياكم الله بالخاص DM واستفسر عن الباقات المتوفرة 💬\n\n` +
                    `${hashtags}`;
            }
        } else if (templateId === 'market_drop') {
            const player = state.playerArName || state.playerName || 'اللاعب';
            const oldPrice = state.oldPrice || '3,200,000';
            const newPrice = state.newPrice || '2,450,000';
            const saving = state.savingBadge || 'وفر 750,000 كوينز الآن! 📉';

            if (style === 'hype') {
                return `الأسعار في سوق FC 27 ناااازلة قاع.. فرصة الشحن ما تتعوض! 📉🔥\n\n` +
                    `كرت ${player} نزل من ${oldPrice} إلى ${newPrice} كوينز! (${saving}) ⚽\n\n` +
                    `استغل نزول السوق اليوم واشحن كوينزك مع @shop_coin15 قبل ما ترتفع الأسعار نهاية الأسبوع مع تصفيات الويكند!\n\n` +
                    `⚡ تسليم فوري وآمن 100% شامل الضريبة\n` +
                    `الكميات متوفرة الآن.. نط على الخاص DM واحجز كوينزك واستغل النزول 📩👇\n\n` +
                    `${hashtags}`;
            } else if (style === 'direct') {
                return `تنبيه هبوط أسعار السوق في FC 27 📉\n\n` +
                    `أسعار اللاعبين حالياً في أفضل نقطة للشراء. وفّر كوينز واشحن مع @shop_coin15 بأقل تكلفة.\n\n` +
                    `• شامل الضريبة 100%\n` +
                    `• تسليم سريع لكافة المنصات (PS5 / Xbox / PC)\n\n` +
                    `الطلب متاح الآن عبر الخاص DM 📩\n\n` +
                    `${hashtags}`;
            } else {
                return `شراء الكوينز وقت نزول السوق هو الذكاء الحقيقي في FC 27 🧠💰\n\n` +
                    `اشحن رصيدك بأمان تام مع @shop_coin15 واشترِ نجومك بأرخص سعر ممكن.\n` +
                    `نقل مضمون وخالي من أي مخاطر 🤝\n\n` +
                    `تفضل بالخاص DM ونخدمك فوراً 💬\n\n` +
                    `${hashtags}`;
            }
        } else if (templateId === 'sbc') {
            const player = state.playerArName || state.playerName || 'اللاعب';
            const cost = state.sbcCost || '~450,000 كوينز صافية';

            if (style === 'hype') {
                return `رسمياً.. نزل تحدي ${player} في FC 27! 👑🔥\n\n` +
                    `بدل ما تفرك وتضيع وقتك وتضحي بنجوم ناديك الأساسيين وتخرب تشكيلتك.. متجر @shop_coin15 مجهز لك كوينز التحدي كاملة!\n\n` +
                    `تكلفة التحدي: ${cost}\n` +
                    `⚡ نوفر لك الكوينز كاملة صافية وشاملة ضريبة الـ 5%\n` +
                    `🛡️ نقل يدوي آمن 100% بدون أي مخاطر\n\n` +
                    `ارسل اسم التحدي بالخاص DM ونشحن لك برمشة عين 📩👇\n\n` +
                    `${hashtags}`;
            } else if (style === 'direct') {
                return `تحدي ${player} متوفر الآن في FC 27 ⚡\n\n` +
                    `محتاج كوينز لقفل التحدي بأسرع وقت؟\n` +
                    `متجر @shop_coin15 يوفر لك كل الكميات المطلوبة بأفضل سعر وضمان شامل.\n\n` +
                    `تواصل معنا عبر الخاص DM 📩\n\n` +
                    `${hashtags}`;
            } else {
                return `قفل تحديات الـ SBC في FC 27 وأنت مرتاح البال مع @shop_coin15 🛡️\n\n` +
                    `لا تضحي بنجوم فريقك.. اشحن كوينز وقفل التحدي بدون أي ضرر لتشكيلتك الأساسية.\n` +
                    `نقل آمن، فوري، وموثوق 100% 🤝\n\n` +
                    `حياكم الله بالخاص DM 📩\n\n` +
                    `${hashtags}`;
            }
        } else if (templateId === 'potm') {
            const player = state.playerArName || state.playerName || 'اللاعب';
            const cost = state.sbcCost || '~2,450,000 كوينز';
            const league = (window.POTM_LEAGUES && window.POTM_LEAGUES[state.league])?.name || 'الدوري';

            if (style === 'hype') {
                return `رسمياً.. كرت ${player} لاعب الشهر (POTM) نزل في FC 27! 🏆🔥\n\n` +
                    `أقوى كرت نزل باللعبة بطاقات خارقة وتألق مستحق في ${league}!\n\n` +
                    `🪙 تكلفة التحدي بالسوق: ${cost}\n` +
                    `🛡️ عرض متجر @shop_coin15:\n` +
                    `نوفر لك كوينز التحدي كاملة صافية شاملة الضريبة ونقفله بحسابك بدون ما تضحي بنجوم ناديك الأساسيين!\n\n` +
                    `⚡ تسليم فوري وآمن 100% بدون أي مخاطر\n` +
                    `⚡ متوفر لجميع المنصات (PS5 / Xbox / PC)\n\n` +
                    `ارسل اسم اللاعب بالخاص DM ونقفل لك التحدي فوراً 📩👇\n\n` +
                    `${hashtags} #POTM #لاعب_الشهر #FIFA27 #FC27`;
            } else if (style === 'direct') {
                return `تحدي لاعب الشهر POTM: ${player} متاح الآن في FC 27 ⚡\n\n` +
                    `تكلفة التحدي بالسوق: ${cost}\n\n` +
                    `متجر @shop_coin15 يوفر لك الكوينز والتنفيذ المباشر بأفضل الأسعار وضمان شامل.\n\n` +
                    `تواصل معنا عبر الخاص DM للطلب الفوري 📩\n\n` +
                    `${hashtags} #POTM #لاعب_الشهر`;
            } else {
                return `قفل بطاقة لاعب الشهر ${player} بأمان وضمان كامل مع @shop_coin15 🛡️\n\n` +
                    `لا تفرّط في نجوم فريقك أو بنك الكوينز.. اشحن بأفضل سعر وقفل الكرت في ناديك بأسرع وقت.\n` +
                    `شحن موثوق 100% وتغطية ضريبة EA كاملة 🤝\n\n` +
                    `تفضل بالخاص DM ونخدمك على الفور 💬\n\n` +
                    `${hashtags} #POTM #لاعب_الشهر`;
            }
        }
        return '';
    }
};

window.CopywriterEngine = CopywriterEngine;
