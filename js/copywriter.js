/**
 * Smart Arabic Gamer Copywriter Engine for ShopCoin15
 * 100% Tailored for the 3 Direct Store Templates:
 * 1. trio: تريو 3 لاعبين متداخلين
 * 2. market_drop: هبوط أسعار السوق
 * 3. sbc: تقفيل تحديات الـ SBC
 */

const CopywriterEngine = {
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
            } else { // trust
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
            } else { // trust
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
