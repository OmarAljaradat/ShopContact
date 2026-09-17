/**
 * ShopCoin15 Studio - Reels Covers & Viral Hooks Engine (9:16)
 * Built for High-Impact Instagram Reels, TikTok & Shorts
 * Features: Instagram Safe Zone Overlay, Viral Hooks Bank, 4K Cover Export
 */

window.ReelsEngine = (function() {
    let state = {
        title: 'أكبر غلطة تدمر ناديك في FC 27 وأنت ما تدري! 🚨',
        subtitle: 'شاهد الفيديو لتتعلم كيف تحمي حسابك وتشحن بأمان 100%',
        badge: '🚨 تنبيه هام للاعبي فيفا',
        bgTheme: 'dark_stadium', // 'dark_stadium', 'neon_cyan', 'gold_luxury'
        playerName: 'Kylian Mbappé',
        playerArName: 'كيليان مبابي',
        cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp',
        showSafeZone: true,
        coverStyle: 'bold_headline', // 'bold_headline', 'split_duel', 'urgent_alert'
        scriptNotes: 'ابدأ الفيديو مباشرة بدون مقدمات طويلة واعرض الكرت بالثانية الأولى!'
    };

    const VIRAL_HOOKS = [
        {
            category: '🛡️ أمان الحساب وتجنب التصفير',
            hooks: [
                {
                    title: 'أكبر غلطة تدمر ناديك في FC 27 وأنت ما تدري! 🚨',
                    desc: 'هوود تحذيري يمس أهم مخاوف اللاعبين، يرفع معدل المشاهدة حتى النهاية.',
                    script: 'وقف الفيديو عندك! لو تشحن كوينز بهذي الطريقة حسابك معرض للباند بأي لحظة.. شوف كيف تشحن بطريقة آمنة 100% مع @shop_coin15 بدون أي قلق.'
                },
                {
                    title: 'ليه حسابات فيفا تتصفر فجأة؟ وكيف تحمي ناديك! 🔒',
                    desc: 'هوود توعوي تعليمي يكسب ثقة المتابع فوراً.',
                    script: 'أكثر من 80% من التصفير سببه التحويل العشوائي.. عشان كذا بمتجر shop_coin15 نوفر لك ضمان نادي كامل وشحن ببروتوكول آمن.'
                },
                {
                    title: 'لو سويت هالحركة وأنت تشحن كوينز.. ودع تشكيلتك! ⚠️',
                    desc: 'هوود صدمة وفضول عالي جداً.',
                    script: 'انتبه تدخل الحساب أو تعدل الباسورد أثناء تنفيذ الشحن! التزم بهالخطوات البسيطة وطلبك ينتهي بأقل من دقيقة.'
                }
            ]
        },
        {
            category: '⚡ توفير كوينز واستغلال السوق',
            hooks: [
                {
                    title: 'وفر 500k كوينز من قيمة هذا التحدي بهذي الخدعة! 💸',
                    desc: 'هوود توفير كوينز يجذب كل من يحل تحديات الـ SBC.',
                    script: 'بدل ما تضحي ببطاقات ناديك وتدفع ملايين، متجر shop_coin15 يحل لك التحدي ويوفر لك الكوينز بأرخص سعر بالسوق.'
                },
                {
                    title: 'السوق انهار اليوم! 3 لاعبين لازم تشتريهم فوراً 📉🔥',
                    desc: 'هوود عاجل يستغل هبوط الأسعار يوم الأحد أو الخميس.',
                    script: 'أسعار نجوم اللعبة نزلت لأدنى نقطة! هذي فرصتك تشحن كوينز وتقفل تشكيلة أحلامك قبل ما ترتفع الأسعار بالويكند.'
                },
                {
                    title: 'سر تجميع أول مليون كوينز في FC 27 بأسهل طريقة 🤯',
                    desc: 'هوود الطموح وبناء الثروة في اللعبة.',
                    script: 'تبي مليون كوينز بحسابك اليوم وبدون ما تضيع وقتك بالتجارة؟ اطلب كوينزك بضمان شامل من @shop_coin15 وخلك جاهز لأقوى كروت.'
                }
            ]
        },
        {
            category: '👑 مقارنات وتشكيلات خارقة',
            hooks: [
                {
                    title: 'أقوى تشكيلة فوت تشامبيونز بميزانية 300k كوينز بس! ⚽',
                    desc: 'هوود للتشكيلات الاقتصادية الفعالة (Meta Squads).',
                    script: 'مو لازم ملايين عشان تجيب رانك عالي بالفوت! هذي تشكيلة ميتا متكاملة بـ 300 ألف بس، ولو ناقصك كوينز الخاص مفتوح لخدمتك.'
                },
                {
                    title: 'مبابي العادي ولا نسخة لاعب الشهر؟ الصدمة بعد التجربة! 👑',
                    desc: 'هوود المقارنة الشائعة بين الكروت الباهظة.',
                    script: 'هل يستاهل تدفع فرق مليون كوينز على نسخة الـ POTM؟ جربت النسختين والفرق بالملعب بيفاجئك!'
                }
            ]
        },
        {
            category: '🚀 سرعة وضمان متجر shop_coin15',
            hooks: [
                {
                    title: 'المليون ينشحن خلال دقيقة واحدة بس! أسرع شحن شفته ⚡',
                    desc: 'هوود استعراض السرعة القياسية وإبهار المتابع.',
                    script: 'طلبت كوينز من @shop_coin15 وما كملت دقيقة إلا والرصيد واصل بحسابي مع ضمان كامل للنادي.. أفضل تجربة شحن ممكن تجربها.'
                }
            ]
        }
    ];

    function getState() {
        return state;
    }

    function updateField(field, value) {
        state[field] = value;
        renderCanvas();
    }

    function toggleSafeZone() {
        state.showSafeZone = !state.showSafeZone;
        const btn = document.getElementById('btnToggleSafeZone');
        if (btn) {
            btn.classList.toggle('active', state.showSafeZone);
            btn.textContent = state.showSafeZone ? '📐 خطوط الأمان مفعلة (Safe Zone On)' : '📐 خطوط الأمان مخفية (Safe Zone Off)';
        }
        renderCanvas();
    }

    function applyViralHook(hookObj) {
        state.title = hookObj.title;
        state.subtitle = hookObj.desc;
        state.scriptNotes = hookObj.script;
        renderEditorControls();
        renderCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تم تطبيق الهوك على غلاف الريل بنجاح! 🎬✨');
        }
    }

    function copyHookScript(scriptText) {
        navigator.clipboard.writeText(scriptText).then(() => {
            if (window.showCopyToast) {
                window.showCopyToast('تم نسخ سكريبت الريلز للحافظة! 📋🎙️');
            }
        });
    }

    function renderCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_reels') return;

        // Base reels ratio: 9:16 Story format
        canvas.className = 'canvas-story relative overflow-hidden';
        canvas.setAttribute('data-canvas-ratio', 'story');

        const innerHtml = `
            <!-- Reels Cover Design Canvas (9:16) -->
            <div class="absolute inset-0 bg-[#06080F] overflow-hidden select-none">
                <!-- Dynamic High-Impact Studio Background -->
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(225,29,72,0.25),transparent_60%)]"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,132,255,0.2),transparent_65%)]"></div>
                
                <!-- Texture Grid Overlay -->
                <div class="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <!-- Top Brand Capsule -->
                <div class="absolute top-10 right-8 left-8 flex items-center justify-between z-20">
                    <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-xl">
                        <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        <span class="text-xs font-black text-white">REELS • @SHOP_COIN15</span>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-black">
                        🎬 غلاف ريلز
                    </span>
                </div>

                <!-- Badge -->
                <div class="absolute top-24 right-8 left-8 z-20">
                    <span class="inline-block px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-xs border border-rose-400/40 shadow-xl shadow-rose-600/30">
                        ${state.badge || '🚨 تنبيه هام'}
                    </span>
                </div>

                <!-- Main Viral Title (Cover Hook) - Positioned in the Feed Square Safe Zone -->
                <div class="absolute top-36 right-8 left-8 z-20 text-right">
                    <h1 class="text-2xl font-black text-white leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-['Alexandria']">
                        ${state.title}
                    </h1>
                    <div class="mt-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-200 font-medium font-['Cairo'] leading-relaxed">
                        ${state.subtitle}
                    </div>
                </div>

                <!-- Center/Bottom Big Player Card graphic -->
                ${state.cardUrl ? `
                    <div class="absolute bottom-28 right-0 left-0 flex justify-center items-end z-10 pointer-events-none">
                        <div class="relative">
                            <div class="absolute -inset-6 bg-gradient-to-t from-rose-500/25 via-amber-500/20 to-transparent blur-3xl rounded-full"></div>
                            <img src="${state.cardUrl}" alt="Player Card" class="w-64 h-auto max-h-[380px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] filter drop-shadow-2xl">
                        </div>
                    </div>
                ` : ''}

                <!-- Bottom CTA Strip -->
                <div class="absolute bottom-10 right-8 left-8 flex items-center justify-between z-20 bg-slate-950/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-black text-emerald-400">⚡ متجر الكوينز المعتمد</span>
                    </div>
                    <span class="text-[11px] font-bold text-slate-300">تابع الحساب لمزيد من النصائح ↗</span>
                </div>

                <!-- Instagram Safe Zone Guide Overlay (Visible on Screen, Excluded on Demand) -->
                ${state.showSafeZone ? `
                    <div class="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between border-2 border-dashed border-rose-400/40">
                        <!-- Top Header UI Hazard Area (Stories / Reels Title) -->
                        <div class="h-24 bg-rose-500/10 border-b border-rose-400/30 flex items-center justify-center">
                            <span class="text-[10px] font-black text-rose-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                                ⚠️ منطقة محجوبة: شريط العنوان والبحث
                            </span>
                        </div>

                        <!-- Center 1:1 Feed Grid Square Preview (1080x1080) -->
                        <div class="my-auto h-[450px] border-y-2 border-emerald-400/50 relative flex items-center justify-between px-3">
                            <span class="text-[10px] font-black text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-400/40">
                                🟩 منطقة ظهور الغلاف في البروفايل (1:1 Feed Grid)
                            </span>
                            <!-- Right Side Hazard (Instagram Likes & Comments Column) -->
                            <div class="w-16 h-full bg-rose-500/10 border-r border-rose-400/30 flex items-center justify-center">
                                <span class="text-[9px] font-bold text-rose-300 -rotate-90 bg-black/60 px-1.5 py-0.5 rounded">
                                    ❤️ أزرار التفاعل
                                </span>
                            </div>
                        </div>

                        <!-- Bottom Caption & Audio Hazard Area -->
                        <div class="h-32 bg-rose-500/10 border-t border-rose-400/30 flex items-center justify-center">
                            <span class="text-[10px] font-black text-rose-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                                ⚠️ منطقة محجوبة: كابشن الفيديو والصوت وزر المتابعة
                            </span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        canvas.innerHTML = innerHtml;
        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, {
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
        }
    }

    function renderEditorControls() {
        const container = document.getElementById('suite_reels_panel');
        if (!container) return;

        let html = `
            <div class="space-y-4">
                <!-- Safe Zone Control Switch -->
                <div class="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">📐</span>
                            <span class="font-black text-rose-950">منطقة أمان إنستغرام (Safe Zone):</span>
                        </div>
                        <button type="button" id="btnToggleSafeZone" onclick="ReelsEngine.toggleSafeZone()" 
                                class="px-3 py-1.5 rounded-xl ${state.showSafeZone ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'} font-black text-[11px] transition shadow-xs">
                            ${state.showSafeZone ? '📐 خطوط الأمان مفعلة' : '📐 خطوط الأمان مخفية'}
                        </button>
                    </div>
                    <p class="text-[10.5px] text-rose-900/80 leading-relaxed font-medium">
                        💡 تضمن خطوط الأمان عدم تغطية نصوص الغلاف بأزرار الإعجاب أو وصف الفيديو، وضمان ظهور العنوان كاملاً في مربع البروفايل (Feed Grid).
                    </p>
                </div>

                <!-- Viral Hook Bank -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2.5 shadow-xs">
                    <div class="flex items-center justify-between">
                        <span class="font-black text-slate-900 flex items-center gap-1.5">
                            <span>🔥 بنك الهوكات الفيروسية لريلز فيفا:</span>
                        </span>
                        <span class="text-[10px] text-emerald-600 font-bold">جاهز بنقرة واحدة ✨</span>
                    </div>

                    <div class="space-y-3 max-h-56 overflow-y-auto pr-1">
        `;

        VIRAL_HOOKS.forEach((cat) => {
            html += `
                <div class="space-y-1.5">
                    <div class="text-[11px] font-black text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">${cat.category}</div>
            `;
            cat.hooks.forEach((h) => {
                html += `
                    <div class="p-2.5 rounded-xl border border-slate-200 hover:border-rose-400 bg-slate-50/50 hover:bg-white transition space-y-1.5">
                        <div class="font-black text-slate-900 text-xs leading-snug">${h.title}</div>
                        <div class="text-[10.5px] text-slate-500 line-clamp-1">${h.desc}</div>
                        <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
                            <button type="button" onclick='ReelsEngine.applyViralHook(${JSON.stringify(h)})' class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-[10.5px] transition flex items-center gap-1">
                                <span>استخدام كعنوان للغلاف ✨</span>
                            </button>
                            <button type="button" onclick='ReelsEngine.copyHookScript(${JSON.stringify(h.script)})' class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10.5px] transition flex items-center gap-1">
                                <span>نسخ سكريبت الفيديو 🎙️</span>
                            </button>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        });

        html += `
                    </div>
                </div>

                <!-- Cover Inputs -->
                <div class="space-y-3">
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">مانشيت الغلاف (Hook Title):</label>
                        <textarea rows="2" oninput="ReelsEngine.updateField('title', this.value)"
                                  class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black leading-relaxed outline-none focus:border-rose-500 focus:bg-white transition resize-none">${state.title}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">الوصف الفرعي (Subtitle):</label>
                        <input type="text" value="${(state.subtitle || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateField('subtitle', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-rose-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">شارة الترويسة (Badge):</label>
                        <input type="text" value="${(state.badge || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateField('badge', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-rose-500 focus:bg-white transition">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-slate-700 mb-1">رابط صورة كرت اللاعب (FUT.GG WebP):</label>
                        <input type="text" value="${(state.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="ReelsEngine.updateField('cardUrl', this.value)"
                               class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono outline-none focus:border-rose-500 focus:bg-white transition">
                    </div>
                </div>

                <!-- Video Script Notes Box -->
                <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-black text-amber-950 flex items-center gap-1.5">
                            <span>🎙️ سكريبت مقترح لأول 10 ثوانٍ من الفيديو:</span>
                        </span>
                        <button type="button" onclick="ReelsEngine.copyHookScript(ReelsEngine.getState().scriptNotes)" class="text-amber-800 font-bold hover:underline text-[11px]">
                            نسخ 📋
                        </button>
                    </div>
                    <div class="text-xs text-amber-900 font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-200">
                        ${state.scriptNotes || 'اكتب هنا ملاحظات سريعة لتسجيل الفيديو.'}
                    </div>
                </div>

                <!-- Reels Export Actions -->
                <div class="pt-2 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="ReelsEngine.exportReelCover()" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-rose-600/25">
                        <span>👑 تصدير غلاف الريل بدقة 4K فائقة (Native 4K)</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.sendReelTelegram()" class="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-sm">
                        <span>🚀 إرسال الغلاف فوراً لهاتفك عبر التليجرام</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    async function exportReelCover() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }
        // Temporarily hide safe zone guide for export
        const prevSafe = state.showSafeZone;
        state.showSafeZone = false;
        renderCanvas();
        await new Promise(r => setTimeout(r, 200));

        await window.CanvasExporter.downloadNative('exportCanvas', 'jpg', 'reels_cover_shopcoin15');

        // Restore safe zone
        state.showSafeZone = prevSafe;
        renderCanvas();
    }

    async function sendReelTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        const prevSafe = state.showSafeZone;
        state.showSafeZone = false;
        renderCanvas();
        await new Promise(r => setTimeout(r, 200));

        const caption = `🎬 غلاف ريلز جديد:\n${state.title}\n\n🎙️ سكريبت أول 10 ثوانٍ:\n${state.scriptNotes}\n\n@shop_coin15`;
        await window.TelegramManager.sendDesignInternal('exportCanvas', caption);

        state.showSafeZone = prevSafe;
        renderCanvas();
    }

    return {
        getState,
        updateField,
        toggleSafeZone,
        applyViralHook,
        copyHookScript,
        renderCanvas,
        renderEditorControls,
        exportReelCover,
        sendReelTelegram
    };
})();
