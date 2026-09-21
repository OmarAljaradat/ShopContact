/**
 * ShopCoin15 - Smart AI Caption Engine for EA FC 27 Content
 * Produces natural, engaging, logical Arabic social media captions for Instagram Reels, Posts, and TikTok.
 * NO robotic ad spam, NO clunky translated slogans ("عبي واسرع بالحصول على").
 * 100% authentic gamer / football community voice with engagement triggers.
 */

const https = require('https');

// Extract clean player names and position from idea text
function parseIdeaContext(ideaText, extraPlayers = []) {
    const text = (ideaText || '').trim();
    const lower = text.toLowerCase();

    // 1. Detect Position
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

    // 2. Detect Category / Theme
    const isIcons = lower.includes('icon') || lower.includes('hero') || text.includes('أيقون') || text.includes('ايقون') || text.includes('أساطير') || text.includes('اساطير') || text.includes('هيرو');
    const isStarter = text.includes('بداية') || text.includes('بدايات') || text.includes('رخيص') || text.includes('رخاص') || text.includes('ميزانية') || text.includes('اقتصادي') || lower.includes('starter') || lower.includes('budget');
    const isVersus = text.includes('مقارنة') || text.includes('ضد') || text.includes('صراع') || lower.includes('vs') || text.includes('مين أفضل') || text.includes('مين تختار');
    const isMeta = text.includes('ميتا') || text.includes('ميتّا') || text.includes('أقوى') || text.includes('أفضل') || text.includes('توب') || text.includes('افضل');

    // 3. Known famous player detection from text or extraPlayers
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
}

/**
 * Local Smart Football Copywriter Engine (100% Reliable Offline Fallback)
 * Formats logical, conversational, community-first Arabic captions.
 */
function generateLocalSmartCaption(ideaText, style = 'discussion', extraPlayers = []) {
    const ctx = parseIdeaContext(ideaText, extraPlayers);
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

    // ─────────────────────────────────────────────────────────────────
    // STYLE 1: 💬 DISCUSSION (نقاش كروي وميتّا - التركيز على التفاعل واللعب)
    // ─────────────────────────────────────────────────────────────────
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

    // ─────────────────────────────────────────────────────────────────
    // STYLE 2: 🔥 TREND & REELS (سريع، جذاب، عفوي للريلز والتيك توك)
    // ─────────────────────────────────────────────────────────────────
    if (style === 'trend') {
        let hook = `احفظ الفيديو عندك عشان ترجع له وقت ما تبني تشكيلتك 📌⚡\n\n${title} في FC 27:`;
        let body = `المفاضلة باللعبة حالياً تعتمد على اللي يقدم لك أعلى قيمة داخل الملعب. كروت تجمع بين السرعة الفائقة والإنهاء النظيف بدون تعقيد.${playersListStr ? `\n\n💎 الاختيارات: ${playersListStr}` : ''}`;
        let cta = `👇 اكتب بالتعليقات: كم تقيم هذي الخيارات من 10؟\n\nتابع الحساب للمزيد من كروت ونصائح FC 27 اليومية 📲\nكوينز ناديك جاهزة وفورية مع @shop_coin15 عبر الخاص 📩`;

        return `${hook}\n\n${body}\n\n${cta}\n\n${hashtags} #ريلز_فيفا #تيك_توك_فيفا`;
    }

    // ─────────────────────────────────────────────────────────────────
    // STYLE 3: 💡 TACTICS & PRO TIPS (تحليلي فني ومركز على القيمة الفنية)
    // ─────────────────────────────────────────────────────────────────
    if (style === 'tactics') {
        let hook = `تحليل فني مختصر: كيف تختار الأنسب لتشكيلتك في ${title}؟ 🧠⚽`;
        let body = `في آليات اللعب الجديدة لـ FC 27:\n• الـ PlayStyles+ تصنع فارق أكبر من أرقام الكرت المجردة.\n• ردة الفعل والـ Agility هي اللي تمنحك أفضلية بالمرتدات السريعة.\n• الاستثمار في كروت متوازنة يوفر عليك كوينز طائلة على المدى البعيد.${playersListStr ? `\n\n📋 كروت يُنصح بالتركيز عليها: ${playersListStr}` : ''}`;
        let question = `📌 نصيحة اليوم: ركز على جودة الكرت داخل الملعب وتجربة المحترفين قبل الشراء.\n\nمن خلال تجربتك، مين الكرت اللي يستاهل كل كوينز اندفعت فيه؟ 👇\n\nشحن وتطوير فريقك بأمان واحترافية: @shop_coin15 🛡️`;

        return `${hook}\n\n${body}\n\n${question}\n\n${hashtags}`;
    }

    // ─────────────────────────────────────────────────────────────────
    // STYLE 4: 👑 STORE SUBTLE (كروي راقي مع إشارة خفيفة ومحترمة للمتجر)
    // ─────────────────────────────────────────────────────────────────
    let hook = `طوّر تشكيلتك بذكاء ونافس على أعلى رانك في FC 27 👑⚡`;
    let body = `${title}\n\nامتلاك النجوم اللي تصنع الفارق بالوقت الحاسم ما عاد يحتاج انتظار الحظ من الباكات المجهولة.${playersListStr ? ` نجوم مثل (${playersListStr}) يعطوا ناديك هيبة استثنائية من الدقيقة الأولى.` : ''}`;
    let storePlug = `متجر @shop_coin15 يوفر لك كوينز ناديك بأعلى معايير الأمان وسرعة التسليم لجميع المنصات (PS5 / Xbox / PC) مع ضمان كامل 🔒\n\n📩 للطلب والاستفسار: حياك الله عبر الرسائل الخاصة DM`;
    let question = `👇 شاركنا بتعليق: مين أول لاعب ناوي تضمه لناديك اليوم؟`;

    return `${hook}\n\n${body}\n\n${question}\n\n${storePlug}\n\n${hashtags}`;
}

/**
 * Main External + Internal Hybrid AI Caption Generator
 * Calls Google Gemini when API key is provided/available, with seamless local AI fallback.
 */
async function generateCaptionWithAi({ idea, style = 'discussion', players = [], apiKey = '' }) {
    const rawIdea = (idea || '').trim();
    if (!rawIdea) {
        throw new Error('يرجى كتابة فكرة أو عنوان للكابشن');
    }

    const key = apiKey || process.env.GEMINI_API_KEY || '';

    // If Gemini key is set and not our placeholder dummy, attempt calling Google Gemini
    if (key && !key.startsWith('AQ.Ab8RN6K')) {
        try {
            const systemPrompt = `أنت كاتب محتوى خبير ومحترف لمجتمع ألعاب EA Sports FC 27 وإنستغرام وتيك توك.
مهمتك: كتابة كابشن إنستغرام أو ريلز احترافي وجذاب ومنطقي باللغة العربية بناءً على الفكرة المعطاة.

شروط وقواعد صارمة جداً:
1. ممنوع نهائياً الإعلانات الرخيصة والمبتذلة أو عبارات التسويق الروبوتية مثل "عبي كوينز" أو "اسرع بالحصول على" أو "سارع بالشراء".
2. اكتب بأسلوب كروي جذاب وطبيعي يفهمه لاعبو فيفا وعشاق الكورة (مثل: الميتّا، سرعة الارتداد، البدنيات، الويكند ليغ، الفوت تشامبيونز، التمركز).
3. الهيكل المطلوب:
   - سطر أول (Hook): عبارة افتتاحية ذكية تلفت النظر وتفتح الشهية للقراءة.
   - فقرة قصيرة (سطرين إلى 3 أسطر): تحليل منطقي كروي للفكرة واللاعبين وأهميتهم.
   - سؤال تفاعلي ذكي: يحرك التعليقات ويدفع المتابعين للمشاركة والتصويت.
   - سطر إشارة خفيف ومهذب للمتجر بالختام: (مثال: متجر @shop_coin15 كوينز ناديك جاهزة ومضمونة عبر الخاص 📩).
   - 5 إلى 7 هاشتاغات نظيفة ومركزة.
4. النمط المطلوب: ${style === 'trend' ? 'سريع وجذاب لريلز وتيك توك' : (style === 'tactics' ? 'تحليلي وتكتيكي فني' : 'نقاش كروي وميتّا مع المتابعين')}.
أخرج فقط نص الكابشن النهائي مباشرة باللغة العربية بدون مقدمات أو ملاحظات.`;

            const payload = JSON.stringify({
                contents: [{
                    parts: [
                        { text: systemPrompt },
                        { text: `فكرة الكابشن المطلوبة: ${rawIdea}\nاللاعبين المعنيين: ${players.join(', ')}` }
                    ]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 600
                }
            });

            const candidateModels = ['gemini-flash-latest', 'gemini-1.5-flash', 'gemini-2.0-flash'];
            for (const model of candidateModels) {
                try {
                    const text = await new Promise((resolve, reject) => {
                        const req = https.request({
                            hostname: 'generativelanguage.googleapis.com',
                            path: `/v1beta/models/${model}:generateContent?key=${key}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': Buffer.byteLength(payload)
                            }
                        }, (res) => {
                            let data = '';
                            res.on('data', chunk => data += chunk);
                            res.on('end', () => {
                                if (res.statusCode >= 200 && res.statusCode < 300) {
                                    try {
                                        const json = JSON.parse(data);
                                        const outText = json.candidates?.[0]?.content?.parts?.[0]?.text;
                                        if (outText && outText.trim()) return resolve(outText.trim());
                                    } catch (e) {}
                                }
                                reject(new Error(`Model ${model} returned ${res.statusCode}`));
                            });
                        });
                        req.on('error', reject);
                        req.setTimeout(8000, () => { req.destroy(); reject(new Error('Timeout')); });
                        req.write(payload);
                        req.end();
                    });

                    if (text && text.length > 30) {
                        return {
                            success: true,
                            source: 'gemini',
                            model: model,
                            caption: text,
                            style: style
                        };
                    }
                } catch (mErr) {
                    // Try next model or fallback
                }
            }
        } catch (apiErr) {
            console.warn('[AI Caption Engine] External Gemini call failed, falling back to local engine:', apiErr.message);
        }
    }

    // High-Fidelity Local Smart Football Engine Fallback
    const localCaption = generateLocalSmartCaption(rawIdea, style, players);
    return {
        success: true,
        source: 'local_smart_engine',
        caption: localCaption,
        style: style
    };
}

module.exports = {
    generateCaptionWithAi,
    generateLocalSmartCaption,
    parseIdeaContext
};
