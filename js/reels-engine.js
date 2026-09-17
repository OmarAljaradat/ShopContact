/**
 * ShopCoin15 Studio - EA FC 27 Reels Engine (Version 2.0)
 * 1. Strictly text on screen + background music (NO voiceover complexity).
 * 2. Pure idea bank where user has 100% control over players.
 * 3. 100% Authentic EA Sports FC 27 marble background & official EA FC 27 and ShopCoin15 logos.
 * 4. Draggable elements on canvas with PERSISTENT SAVED POSITIONS per archetype.
 * 5. Two dedicated sections: 🏆 الترتيب التنازلي (Countdown) & ⚔️ مقارنة العمالقة (Versus Duel).
 */

window.ReelsEngine = (function() {
    // ---- 1. DEFAULT LAYOUT POSITIONS (Percentages) ----
    const DEFAULT_LAYOUTS = {
        countdown: {
            rank: { top: 10, left: 50 },
            title: { top: 20, left: 50 },
            card: { top: 33, left: 50, scale: 1.0 },
            playerName: { top: 76, left: 50 },
            fcLogo: { top: 4, right: 6 },
            scLogo: { bottom: 4, left: 50 }
        },
        versus: {
            title: { top: 12, left: 50 },
            cardA: { top: 28, left: 27, scale: 0.92 },
            cardB: { top: 28, left: 73, scale: 0.92 },
            vsBadge: { top: 46, left: 50 },
            question: { top: 76, left: 50 },
            fcLogo: { top: 4, right: 6 },
            scLogo: { bottom: 4, left: 50 }
        }
    };

    // Load persisted layouts from localStorage if available
    function loadSavedLayouts() {
        try {
            const saved = localStorage.getItem('shopcoin15_reel_layouts_v2');
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    countdown: { ...DEFAULT_LAYOUTS.countdown, ...(parsed.countdown || {}) },
                    versus: { ...DEFAULT_LAYOUTS.versus, ...(parsed.versus || {}) }
                };
            }
        } catch (e) {
            console.warn('Could not load saved layouts:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_LAYOUTS));
    }

    // ---- 2. CURATED VIRAL IDEAS (Angles & Hooks ONLY - User picks players) ----
    const VIRAL_IDEAS = {
        countdown: [
            {
                id: 'cd_starter_strikers',
                title: 'أفضل 5 مهاجمين للبدايات في FC 27 ⚽🔥',
                subtitle: 'كروت اقتصادية تصنع لك الفارق من أول أسبوع!',
                badge: '🔥 مهاجمين البدايات',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى تريند حماسية سريعة 125 BPM'
            },
            {
                id: 'cd_physical_beasts',
                title: 'أقوى 5 لاعبين بدنياً في FC 27 💪🧱',
                subtitle: 'كروت تفوز بأي التحام بالكتف بدون أي رحمة!',
                badge: '🧱 جدار فولاذي',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى بيس قوي وضخم (Heavy Bass)'
            },
            {
                id: 'cd_fastest_wingers',
                title: 'أسرع 5 صواريخ على الأطراف في FC 27 ⚡🚀',
                subtitle: 'سرعة +93 تسارع مرعب لا يلحقه أي ظهير!',
                badge: '⚡ أسرع أجنحة',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى إيقاع سريع متصاعد (Speed Beat)'
            },
            {
                id: 'cd_meta_defenders',
                title: 'أقوى 5 قلوب دفاع للفوت تشامبيونز 🛡️⚔️',
                subtitle: 'تدخلات تلقائية تقفل على أقوى مهاجمي الخصم!',
                badge: '🛡️ دفاع حديدي',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى درامية حماسية'
            },
            {
                id: 'cd_budget_gems',
                title: '5 جواهر خارقة تحت 20 ألف كوينز 💎💸',
                subtitle: 'أداء يفوق الكروت المليونية بأسعار بسيطة!',
                badge: '💎 كروت رخيصة ميتّا',
                defaultRanks: ['5', '4', '3', '2', '1'],
                musicTip: 'موسيقى تريند ريلز إلكترونية'
            },
            {
                id: 'cd_saudi_stars',
                title: 'أعلى اللاعبين السعوديين تقييماً في FC 27 🇸🇦🦅',
                subtitle: 'فخر دوري روشن وطاقات خارقة بالدفاع والسرعة!',
                badge: '🇸🇦 نجوم روشن',
                defaultRanks: ['4', '3', '2', '1'],
                musicTip: 'موسيقى حماسية وطنية'
            }
        ],
        versus: [
            {
                id: 'vs_bellingham_valverde',
                title: 'بيلينغهام ولا فالفيردي؟ صراع خط الوسط 👑⚔️',
                subtitle: 'صوت بالتعليقات: مين يستحق يقود خط وسطك؟',
                badge: '⚔️ رأس برأس (DUEL)',
                playerA: { name: 'Jude Bellingham', arName: 'بيلينغهام', rating: '90', statHighlight: 'صناعة وإنهاء 87', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp' },
                playerB: { name: 'Federico Valverde', arName: 'فالفيردي', rating: '88', statHighlight: 'سرعة وافتكاك 88', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp' },
                question: 'مين تختار لخط وسطك؟ صوت بالتعليقات 👇'
            },
            {
                id: 'vs_mbappe_haaland',
                title: 'مبابي ولا هالاند؟ من هو المهاجم الفتاك؟ ⚡🤖',
                subtitle: 'صراع السرعة والمراوغة ضد القوة البدنية والإنهاء!',
                badge: '⚔️ صراع الهدافين',
                playerA: { name: 'Kylian Mbappé', arName: 'مبابي', rating: '91', statHighlight: 'سرعة 97 + مهارة 5★', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231747.1b49b357729ba7dbf174dc4aa1e8519ce230b98ad399360e364a59f4b3477f07.webp' },
                playerB: { name: 'Erling Haaland', arName: 'هالاند', rating: '91', statHighlight: 'بدنية 90 + تسديد 93', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-239085.5302941a50a927b565c122945958880e418b56c6cf7a76f88179fa24ec510b57.webp' },
                question: 'القوة البدنية ولا السرعة والمراوغة؟ صوتك يهمنا 👇'
            },
            {
                id: 'vs_vinicius_leao',
                title: 'فينيسيوس ولا لياو؟ أفضل جناح أيسر ميتّا 🪄🌪️',
                subtitle: 'مراوغة 5 نجوم وسرعة تفجيرية على الرواق الأيسر!',
                badge: '⚔️ ملوك الجناح',
                playerA: { name: 'Vinícius Jr.', arName: 'فينيسيوس', rating: '90', statHighlight: 'سرعة 96 + مهارة 5★', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-238794.6715e80f49fb5360b92261f8bd984f7178a47066cff3bfcd2c1b7dd57db13fbf.webp' },
                playerB: { name: 'Rafael Leão', arName: 'لياو', rating: '86', statHighlight: 'طول وجسم + سرعة 93', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-50573369.a6f3940ce2ccb7d0c1b6486a36ceb97173930a64d05373132b440d62f8ab9fcf.webp' },
                question: 'مين جناحك الأساسي في تشكيلتك؟ 👇'
            },
            {
                id: 'vs_rodri_tonali',
                title: 'رودري ولا تونالي؟ أفضل صخرة ارتكاز دفاعي 🛡️🛑',
                subtitle: 'الخبرة والتمركز أم السرعة والضغط الشرس؟',
                badge: '⚔️ صخرة الوسط',
                playerA: { name: 'Rodri', arName: 'رودري', rating: '91', statHighlight: 'دفاع 87 + تمرير 86', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-231866.15741f3f4953470b2b606a68800c4b6ec0eebe161b9435060ba0073494e92618.webp' },
                playerB: { name: 'Sandro Tonali', arName: 'تونالي', rating: '85', statHighlight: 'سرعة 86 + لياقة 90', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-241096.b3c01d216c9bc7ed2cbf008664c7582161526a0c5ec870bbb97236a9334b4ab9.webp' },
                question: 'مين المحور اللي تثق فيه بالفوت؟ 👇'
            }
        ]
    };

    // ---- 3. STATE MANAGEMENT ----
    let state = {
        activeSection: 'countdown', // 'countdown' or 'versus'
        theme: 'ea_marble_clean', // 'ea_marble_clean', 'dark_stadium', 'neon_meta'
        title: 'أفضل 5 مهاجمين للبدايات في FC 27 ⚽🔥',
        subtitle: 'كروت اقتصادية تصنع لك الفارق من أول أسبوع!',
        badge: '🔥 مهاجمين البدايات',
        slides: [],
        currentSlideIndex: 0,
        isPlaying: false,
        slideDuration: 2.5,
        playbackTimer: null,
        timelineProgress: 0,
        showSafeZone: false,
        dragEnabled: true,
        selectedDragElement: null,
        layouts: loadSavedLayouts()
    };

    // Helper to get asset URL
    function getAsset(key, fallbackPath) {
        if (window.EMBEDDED_ASSETS && window.EMBEDDED_ASSETS[key]) {
            return window.EMBEDDED_ASSETS[key];
        }
        return fallbackPath;
    }

    // Initialize Default Reel based on Section
    function initSection(sectionKey) {
        state.activeSection = sectionKey || 'countdown';
        const ideaList = VIRAL_IDEAS[state.activeSection] || VIRAL_IDEAS.countdown;
        applyIdea(ideaList[0], false);
    }

    // Switch between Sections (Countdown vs Versus)
    function switchSection(sectionKey) {
        pausePlayback();
        initSection(sectionKey);
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();
        if (window.showCopyToast) {
            const title = sectionKey === 'countdown' ? '🏆 قسم الترتيب التنازلي' : '⚔️ قسم مقارنة العمالقة';
            window.showCopyToast(`تم فتح ${title}! ✨`);
        }
    }

    // Apply an Idea from the Bank
    function applyIdea(ideaObj, showToast = true) {
        state.title = ideaObj.title;
        state.subtitle = ideaObj.subtitle;
        state.badge = ideaObj.badge;

        if (state.activeSection === 'countdown') {
            // Build Slides for Countdown: Intro + 5 Card Slots + Outro
            const ranks = ideaObj.defaultRanks || ['5', '4', '3', '2', '1'];
            const newSlides = [
                { type: 'intro', title: ideaObj.title, subtitle: ideaObj.subtitle, badge: ideaObj.badge }
            ];

            ranks.forEach((rankNum, idx) => {
                newSlides.push({
                    type: 'player_card',
                    rank: rankNum,
                    playerName: 'اسم اللاعب',
                    playerArName: `اللاعب رقم ${rankNum}`,
                    rating: '85',
                    position: 'ST',
                    cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
                    badges: ['⚡ سرعة 90', '🔥 ميتّا', '💰 كوينز مناسبة']
                });
            });

            newSlides.push({
                type: 'outro',
                title: 'متجر ShopCoin15 - كوينز فورية ⚡',
                subtitle: 'شحن آمن 100% مع ضمان نادي كامل وبأفضل الأسعار',
                badge: '👑 متجر الكوينز المعتمد'
            });

            state.slides = newSlides;
        } else {
            // Versus Duel: Slide 0: Hook Intro, Slide 1: Head-to-Head Battle, Slide 2: Outro
            state.slides = [
                {
                    type: 'intro',
                    title: ideaObj.title,
                    subtitle: ideaObj.subtitle,
                    badge: ideaObj.badge
                },
                {
                    type: 'versus_card',
                    title: ideaObj.title,
                    playerA: ideaObj.playerA || { name: 'Player A', arName: 'اللاعب الأول', rating: '90', statHighlight: 'طاقات 90', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-252371.49e4acdf2d78496f4951f41725cd17fb8efb118d99a69ba074ab76fc62d70735.webp' },
                    playerB: ideaObj.playerB || { name: 'Player B', arName: 'اللاعب الثاني', rating: '88', statHighlight: 'طاقات 88', cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-246669.cab7c7f82f8442d8ba57fc15e5f49728247141eac35add86238cdc54e7916495.webp' },
                    question: ideaObj.question || 'صوت بالتعليقات: من تختار لفريقك؟ 👇'
                },
                {
                    type: 'outro',
                    title: 'متجر ShopCoin15 - كوينز فورية ⚡',
                    subtitle: 'شحن آمن 100% مع ضمان نادي كامل وبأفضل الأسعار',
                    badge: '👑 متجر الكوينز المعتمد'
                }
            ];
        }

        state.currentSlideIndex = 0;
        pausePlayback();
        renderEditorControls();
        renderCanvas();
        if (typeof renderPlayerToolbar === 'function') renderPlayerToolbar();

        if (showToast && window.showCopyToast) {
            window.showCopyToast(`تم اختيار: ${ideaObj.title}! يمكنك الآن تعديل اللاعبين كما تحب ✍️`);
        }
    }

    // ---- 4. DRAG & DROP POSITIONING ENGINE (WITH PERSISTENCE) ----
    let activeDrag = null;

    function initCanvasDragHandlers() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        canvas.onmousedown = onDragStart;
        canvas.ontouchstart = onDragStart;

        window.onmousemove = onDragMove;
        window.ontouchmove = onDragMove;

        window.onmouseup = onDragEnd;
        window.ontouchend = onDragEnd;
    }

    function onDragStart(e) {
        if (!state.dragEnabled) return;
        const target = e.target.closest('[data-drag-id]');
        if (!target) return;

        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const canvas = document.getElementById('exportCanvas');
        const canvasRect = canvas.getBoundingClientRect();

        const elemRect = target.getBoundingClientRect();
        const offsetX = clientX - elemRect.left;
        const offsetY = clientY - elemRect.top;

        const dragId = target.getAttribute('data-drag-id');
        state.selectedDragElement = dragId;

        activeDrag = {
            dragId,
            target,
            offsetX,
            offsetY,
            canvasRect
        };

        target.classList.add('ring-2', 'ring-emerald-400', 'ring-offset-2');
    }

    function onDragMove(e) {
        if (!activeDrag) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const canvasRect = activeDrag.canvasRect;
        const posX = clientX - canvasRect.left - activeDrag.offsetX;
        const posY = clientY - canvasRect.top - activeDrag.offsetY;

        // Convert to percentages (0 to 100)
        let leftPercent = Math.round((posX / canvasRect.width) * 100);
        let topPercent = Math.round((posY / canvasRect.height) * 100);

        leftPercent = Math.max(0, Math.min(100, leftPercent));
        topPercent = Math.max(0, Math.min(100, topPercent));

        // Update in memory layout
        const secLayout = state.layouts[state.activeSection];
        if (!secLayout[activeDrag.dragId]) secLayout[activeDrag.dragId] = {};
        secLayout[activeDrag.dragId].top = topPercent;
        secLayout[activeDrag.dragId].left = leftPercent;

        // Direct DOM update for instant smooth drag
        activeDrag.target.style.top = `${topPercent}%`;
        activeDrag.target.style.left = `${leftPercent}%`;
    }

    function onDragEnd() {
        if (!activeDrag) return;
        if (activeDrag.target) {
            activeDrag.target.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-2');
        }
        activeDrag = null;
        renderCanvas();
    }

    // Save positions permanently for this archetype
    function saveLayoutPositions() {
        try {
            localStorage.setItem('shopcoin15_reel_layouts_v2', JSON.stringify(state.layouts));
            if (window.showCopyToast) {
                window.showCopyToast('تم حفظ وتثبيت مواقع العناصر بنجاح لكل الريلزات القادمة! 💾🔒');
            }
        } catch (e) {
            console.error('Error saving layout:', e);
        }
    }

    // Reset positions to default
    function resetLayoutPositions() {
        state.layouts[state.activeSection] = JSON.parse(JSON.stringify(DEFAULT_LAYOUTS[state.activeSection]));
        try {
            localStorage.setItem('shopcoin15_reel_layouts_v2', JSON.stringify(state.layouts));
        } catch (e) {}
        renderCanvas();
        if (window.showCopyToast) {
            window.showCopyToast('تمت إعادة تعيين المواقع الافتراضية بنجاح! 🔄');
        }
    }

    function toggleDragLock() {
        state.dragEnabled = !state.dragEnabled;
        const btn = document.getElementById('btnToggleDragLock');
        if (btn) {
            btn.innerHTML = state.dragEnabled ? '<span>🔓 السحب مباشر مفعّل</span>' : '<span>🔒 تم قفل المواقع</span>';
            btn.classList.toggle('bg-emerald-600', state.dragEnabled);
            btn.classList.toggle('bg-slate-700', !state.dragEnabled);
        }
        renderCanvas();
    }

    // ---- 5. SLIDE & PLAYER CARD MANAGEMENT (User Full Control) ----
    function addPlayerSlide() {
        const newRank = (state.slides.filter(s => s.type === 'player_card').length + 1).toString();
        const newSlide = {
            type: 'player_card',
            rank: newRank,
            playerName: 'لاعب جديد',
            playerArName: 'لاعب جديد',
            rating: '86',
            position: 'ST',
            cardUrl: 'https://game-assets.fut.gg/cdn-cgi/image/quality=85,format=auto,width=600/2027/futgg-player-item-card/27-253072.b01bd10077579d6ac45096ea658f3725f2951793cc9543ab9775cd0e7b909ede.webp',
            badges: ['⚡ سرعة', '🔥 ميتّا']
        };

        // Insert before outro
        const outroIdx = state.slides.findIndex(s => s.type === 'outro');
        if (outroIdx !== -1) {
            state.slides.splice(outroIdx, 0, newSlide);
            state.currentSlideIndex = outroIdx;
        } else {
            state.slides.push(newSlide);
            state.currentSlideIndex = state.slides.length - 1;
        }

        renderEditorControls();
        renderCanvas();
        if (window.showCopyToast) window.showCopyToast('تمت إضافة بطاقة لاعب جديدة! يمكنك تعديلها الآن ➕');
    }

    function deleteCurrentSlide() {
        if (state.slides.length <= 2) {
            alert('لا يمكن حذف المزيد من السلايدات.');
            return;
        }
        state.slides.splice(state.currentSlideIndex, 1);
        if (state.currentSlideIndex >= state.slides.length) {
            state.currentSlideIndex = state.slides.length - 1;
        }
        renderEditorControls();
        renderCanvas();
        if (window.showCopyToast) window.showCopyToast('تم حذف السلايد 🗑️');
    }

    function updateCurrentSlideField(field, val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide[field] = val;
        renderCanvas();
    }

    function updateVersusField(playerKey, field, val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide || slide.type !== 'versus_card') return;
        if (!slide[playerKey]) slide[playerKey] = {};
        slide[playerKey][field] = val;
        renderCanvas();
    }

    // ---- 6. INTERACTIVE VIDEO PLAYER ----
    function playPlayback() {
        if (state.isPlaying) return;
        state.isPlaying = true;
        updatePlayerUi();

        const tickMs = 50;
        let elapsed = 0;
        const totalMs = (state.slideDuration || 2.5) * 1000;

        if (state.playbackTimer) clearInterval(state.playbackTimer);

        state.playbackTimer = setInterval(() => {
            elapsed += tickMs;
            state.timelineProgress = Math.min(100, (elapsed / totalMs) * 100);

            const bars = [document.getElementById('reelTimelineBar'), document.getElementById('toolbarTimelineBar')];
            bars.forEach(b => { if (b) b.style.width = `${state.timelineProgress}%`; });

            if (elapsed >= totalMs) {
                elapsed = 0;
                state.timelineProgress = 0;
                if (state.currentSlideIndex < state.slides.length - 1) {
                    state.currentSlideIndex++;
                } else {
                    state.currentSlideIndex = 0;
                }
                renderCanvas();
                updatePlayerUi();
            }
        }, tickMs);
    }

    function pausePlayback() {
        state.isPlaying = false;
        if (state.playbackTimer) {
            clearInterval(state.playbackTimer);
            state.playbackTimer = null;
        }
        state.timelineProgress = 0;
        const bars = [document.getElementById('reelTimelineBar'), document.getElementById('toolbarTimelineBar')];
        bars.forEach(b => { if (b) b.style.width = '0%'; });
        updatePlayerUi();
    }

    function togglePlayPause() {
        if (state.isPlaying) pausePlayback();
        else playPlayback();
    }

    function nextSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex < state.slides.length - 1) ? state.currentSlideIndex + 1 : 0;
        renderCanvas();
        updatePlayerUi();
    }

    function prevSlide() {
        pausePlayback();
        state.currentSlideIndex = (state.currentSlideIndex > 0) ? state.currentSlideIndex - 1 : state.slides.length - 1;
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
            toolbarBtnPlay.innerHTML = state.isPlaying ? '<span>⏸️ إيقاف</span>' : '<span>▶️ تشغيل</span>';
            toolbarBtnPlay.classList.toggle('bg-amber-500', state.isPlaying);
            toolbarBtnPlay.classList.toggle('bg-emerald-600', !state.isPlaying);
        }

        const current = state.slides[state.currentSlideIndex];
        let name = 'خطاف البداية';
        if (current) {
            if (current.type === 'player_card') name = `#${current.rank} - ${current.playerArName || current.playerName}`;
            if (current.type === 'versus_card') name = 'مقارنة كرتين (VS)';
            if (current.type === 'outro') name = 'سلايد الختام';
        }
        const slideText = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length} (${name})`;

        const ind = document.getElementById('reelSlideIndicator');
        if (ind) ind.textContent = slideText;
        const toolInd = document.getElementById('toolbarSlideIndicator');
        if (toolInd) toolInd.textContent = `سلايد ${state.currentSlideIndex + 1}/${state.slides.length}`;

        const dots = document.getElementById('reelDotsContainer');
        if (dots) {
            dots.querySelectorAll('.reel-dot').forEach((d, i) => {
                if (i === state.currentSlideIndex) {
                    d.className = 'reel-dot w-6 h-2 rounded-full bg-emerald-500 transition-all shadow-xs';
                } else {
                    d.className = 'reel-dot w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer';
                }
            });
        }
    }

    // ---- 7. HIGH-FIDELITY CANVAS RENDERING (OFFICIAL ASSETS & DRAGGABLE BLOCKS) ----
    function renderCanvas() {
        const canvas = document.getElementById('exportCanvas');
        if (!canvas) return;

        const currentSuite = window.currentStudioSuite || 'suite_stories';
        if (currentSuite !== 'suite_reels') return;

        canvas.className = 'canvas-story relative overflow-hidden select-none';
        canvas.setAttribute('data-canvas-ratio', 'story');

        if (!state.slides || state.slides.length === 0) {
            initSection(state.activeSection);
            return;
        }

        const currentSlide = state.slides[state.currentSlideIndex] || state.slides[0];
        const layout = state.layouts[state.activeSection] || DEFAULT_LAYOUTS[state.activeSection];

        // 1. Authentic Background from Real Reels (with EA pitch markings)
        const bgUrl = getAsset('STORE_BG_PURE', 'assets/store-bg-pure.png');
        const fcLogoUrl = getAsset('FC27_OFFICIAL_LOGO', 'assets/fc27-official-logo.png');
        const scLogoUrl = getAsset('SC_LOGO', 'assets/sc-logo.png');

        // Dynamic Position Styles Helper
        const posStyle = (cfg, transformExtra = '') => {
            if (!cfg) return '';
            let s = 'position: absolute; ';
            if (cfg.top !== undefined) s += `top: ${cfg.top}%; `;
            if (cfg.bottom !== undefined) s += `bottom: ${cfg.bottom}%; `;
            if (cfg.left !== undefined) s += `left: ${cfg.left}%; `;
            if (cfg.right !== undefined) s += `right: ${cfg.right}%; `;
            const baseTransform = (cfg.left === 50 && cfg.right === undefined) ? 'translateX(-50%)' : '';
            const fullTransform = [baseTransform, transformExtra].filter(Boolean).join(' ');
            if (fullTransform) s += `transform: ${fullTransform}; `;
            return s;
        };

        const dragCursor = state.dragEnabled ? 'cursor-move' : 'cursor-default';

        // FC 27 Logo Block
        const fcLogoHtml = `
            <div data-drag-id="fcLogo" class="z-30 select-none ${dragCursor}" style="${posStyle(layout.fcLogo)}">
                <img src="${fcLogoUrl}" alt="EA FC 27" class="w-12 h-auto object-contain drop-shadow-md">
            </div>
        `;

        // Shop Coin Logo Block
        const scLogoHtml = `
            <div data-drag-id="scLogo" class="z-30 select-none flex flex-col items-center justify-center ${dragCursor}" style="${posStyle(layout.scLogo)}">
                <img src="${scLogoUrl}" alt="ShopCoin15" class="w-14 h-auto object-contain drop-shadow-md">
            </div>
        `;

        let bodyHtml = '';

        if (currentSlide.type === 'intro') {
            // INTRO HOOK SLIDE
            bodyHtml = `
                <div class="absolute inset-0 flex flex-col items-center justify-center px-10 text-center z-20">
                    <div class="mb-4 inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black shadow-sm tracking-wide">
                        ${currentSlide.badge || state.badge}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-slate-950 leading-snug font-['Alexandria'] drop-shadow-sm max-w-md">
                        ${currentSlide.title || state.title}
                    </h1>
                    <p class="mt-5 text-sm md:text-base font-bold text-slate-600 max-w-sm leading-relaxed font-['Cairo']">
                        ${currentSlide.subtitle || state.subtitle}
                    </p>
                    <div class="mt-8 flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-md shadow-xs animate-bounce">
                        <span class="text-base">👇</span>
                        <span class="text-xs font-black text-slate-800">
                            ${state.activeSection === 'versus' ? 'شاهد المقارنة المباشرة' : 'شاهد الترتيب بالكامل'}
                        </span>
                    </div>
                </div>
            `;
        } else if (currentSlide.type === 'player_card') {
            // COUNTDOWN PLAYER CARD SLIDE (100% Draggable Blocks)
            const cardScale = layout.card?.scale || 1.0;
            bodyHtml = `
                <!-- 1. Rank Block -->
                <div data-drag-id="rank" class="z-20 flex flex-col items-center text-center select-none ${dragCursor}" style="${posStyle(layout.rank)}">
                    <div class="text-6xl md:text-7xl font-black text-[#0E382B] font-['Alexandria'] drop-shadow-md leading-none">
                        ${currentSlide.rank || '1'}
                    </div>
                </div>

                <!-- 2. Title Block -->
                <div data-drag-id="title" class="z-20 text-center px-6 select-none ${dragCursor}" style="${posStyle(layout.title)}">
                    <div class="text-base md:text-lg font-black text-slate-950 font-['Alexandria'] leading-tight drop-shadow-xs max-w-xs mx-auto">
                        ${state.title}
                    </div>
                </div>

                <!-- 3. Card & Badges Block -->
                <div data-drag-id="card" class="z-20 flex flex-col items-center justify-center select-none ${dragCursor}" style="${posStyle(layout.card, `scale(${cardScale})`)}">
                    <div class="relative">
                        <div class="absolute -inset-6 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>
                        <img src="${currentSlide.cardUrl}" alt="${currentSlide.playerName}" 
                             class="w-64 md:w-72 h-auto max-h-[400px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]">
                    </div>

                    <!-- Badges -->
                    <div class="mt-3 flex items-center justify-center gap-1.5 flex-wrap max-w-xs">
                        ${(currentSlide.badges || []).map(b => `
                            <span class="px-2.5 py-1 rounded-xl bg-white/95 text-slate-900 border border-slate-200 text-[11px] font-black shadow-xs">
                                ${b}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- 4. Player Name / Sub-headline Block -->
                <div data-drag-id="playerName" class="z-20 text-center select-none px-4 ${dragCursor}" style="${posStyle(layout.playerName)}">
                    <div class="text-2xl md:text-3xl font-black text-slate-950 font-['Alexandria'] drop-shadow-sm">
                        ${currentSlide.playerArName || currentSlide.playerName}
                    </div>
                    <div class="text-xs font-black text-[#00A84D] mt-0.5">
                        في FC 27
                    </div>
                </div>
            `;
        } else if (currentSlide.type === 'versus_card') {
            // VERSUS DUEL SLIDE (Card A vs Card B)
            const pA = currentSlide.playerA || {};
            const pB = currentSlide.playerB || {};

            bodyHtml = `
                <!-- 1. Title Header -->
                <div data-drag-id="title" class="z-20 text-center px-6 select-none ${dragCursor}" style="${posStyle(layout.title)}">
                    <span class="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-[10.5px] font-black mb-1.5 shadow-xs">
                        ${state.badge || '⚔️ صراع العمالقة'}
                    </span>
                    <h2 class="text-2xl md:text-3xl font-black text-slate-950 font-['Alexandria'] leading-tight drop-shadow-xs max-w-sm mx-auto">
                        ${currentSlide.title || state.title}
                    </h2>
                </div>

                <!-- 2. Player Card A (Right side in RTL) -->
                <div data-drag-id="cardA" class="z-20 flex flex-col items-center select-none ${dragCursor}" style="${posStyle(layout.cardA, `scale(${layout.cardA?.scale || 0.92})`)}">
                    <div class="relative">
                        <img src="${pA.cardUrl}" alt="${pA.name}" class="w-48 md:w-56 h-auto max-h-[310px] object-contain drop-shadow-2xl">
                    </div>
                    <div class="mt-2 text-center">
                        <div class="text-sm font-black text-slate-950 font-['Alexandria']">${pA.arName || pA.name}</div>
                        <div class="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 mt-1">${pA.statHighlight || ''}</div>
                    </div>
                </div>

                <!-- 3. VS Badge Center -->
                <div data-drag-id="vsBadge" class="z-25 flex items-center justify-center select-none ${dragCursor}" style="${posStyle(layout.vsBadge)}">
                    <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 text-white font-black text-lg flex items-center justify-center shadow-xl border-2 border-white animate-pulse">
                        VS
                    </div>
                </div>

                <!-- 4. Player Card B (Left side in RTL) -->
                <div data-drag-id="cardB" class="z-20 flex flex-col items-center select-none ${dragCursor}" style="${posStyle(layout.cardB, `scale(${layout.cardB?.scale || 0.92})`)}">
                    <div class="relative">
                        <img src="${pB.cardUrl}" alt="${pB.name}" class="w-48 md:w-56 h-auto max-h-[310px] object-contain drop-shadow-2xl">
                    </div>
                    <div class="mt-2 text-center">
                        <div class="text-sm font-black text-slate-950 font-['Alexandria']">${pB.arName || pB.name}</div>
                        <div class="text-[10.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 mt-1">${pB.statHighlight || ''}</div>
                    </div>
                </div>

                <!-- 5. Bottom Interactive Question Hook -->
                <div data-drag-id="question" class="z-20 text-center select-none px-4 ${dragCursor}" style="${posStyle(layout.question)}">
                    <div class="inline-block px-5 py-2.5 rounded-2xl bg-white/95 border border-slate-200 text-slate-950 font-black text-xs md:text-sm shadow-md font-['Alexandria']">
                        ${currentSlide.question || 'صوت بالتعليقات: من تختار لفريقك؟ 👇'}
                    </div>
                </div>
            `;
        } else if (currentSlide.type === 'outro') {
            // OUTRO CTA SLIDE
            bodyHtml = `
                <div class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20">
                    <img src="${scLogoUrl}" alt="ShopCoin15" class="w-20 h-auto object-contain mb-3 drop-shadow-lg animate-pulse">

                    <h2 class="text-3xl md:text-4xl font-black text-slate-950 leading-snug font-['Alexandria']">
                        متجر ShopCoin15
                    </h2>
                    <div class="text-sm font-bold text-emerald-700 mt-1">
                        شحن كوينز فوري وآمن 100% ⚡
                    </div>

                    <div class="mt-6 space-y-2.5 w-full max-w-sm text-right">
                        <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm shrink-0">🔒</span>
                            <div>
                                <div class="text-xs font-black text-slate-900">ضمان نادي كامل</div>
                                <div class="text-[10.5px] text-slate-500">حماية تامة من التصفير ببروتوكول تحويل آمن</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm shrink-0">⚡</span>
                            <div>
                                <div class="text-xs font-black text-slate-900">سرعة تنفيذ قياسية</div>
                                <div class="text-[10.5px] text-slate-500">المليون ينشحن خلال دقيقة واحدة بس</div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-7 px-6 py-3 rounded-2xl bg-slate-900 text-white font-black text-xs shadow-lg">
                        للطلب حياك على الخاص: @shop_coin15 📩
                    </div>
                </div>
            `;
        }

        // Safe Zone Overlay
        const safeZoneHtml = state.showSafeZone ? `
            <div class="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between border-2 border-dashed border-rose-500/50">
                <div class="h-24 bg-rose-500/10 border-b border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">⚠️ شريط العنوان</span>
                </div>
                <div class="my-auto h-[450px] border-y-2 border-emerald-400/60 flex items-center justify-between px-3">
                    <span class="text-[10px] font-black text-emerald-400 bg-black/80 px-2 py-0.5 rounded">🟩 مربع الفيد (1:1 Feed)</span>
                    <div class="w-16 h-full bg-rose-500/10 border-r border-rose-400/30 flex items-center justify-center">
                        <span class="text-[9px] font-bold text-rose-300 -rotate-90 bg-black/70 px-1.5 py-0.5 rounded">❤️ التفاعل</span>
                    </div>
                </div>
                <div class="h-32 bg-rose-500/10 border-t border-rose-400/30 flex items-center justify-center">
                    <span class="text-[10px] font-black text-rose-300 bg-black/70 px-2.5 py-0.5 rounded-full">⚠️ الكابشن والصوت</span>
                </div>
            </div>
        ` : '';

        canvas.innerHTML = `
            <div class="absolute inset-0 overflow-hidden bg-cover bg-center" style="background-image: url('${bgUrl}');">
                ${fcLogoHtml}
                ${scLogoHtml}
                ${bodyHtml}
                ${safeZoneHtml}
            </div>
        `;

        initCanvasDragHandlers();

        if (window.twemoji && typeof window.twemoji.parse === 'function') {
            window.twemoji.parse(canvas, { folder: 'svg', ext: '.svg', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' });
        }
    }

    // ---- 8. EDITOR CONTROLS (PANEL) ----
    function renderEditorControls() {
        const container = document.getElementById('suite_reels_panel');
        if (!container) return;

        const isCountdown = state.activeSection === 'countdown';
        const ideaList = VIRAL_IDEAS[state.activeSection] || [];
        const currentSlide = state.slides[state.currentSlideIndex];

        let html = `
            <div class="space-y-4">

                <!-- 1. SECTION TABS (Countdown vs Versus) -->
                <div class="p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-1.5">
                    <button type="button" onclick="ReelsEngine.switchSection('countdown')" id="subtab_countdown" 
                            class="flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${isCountdown ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}">
                        <span>🏆 الترتيب التنازلي (5 -> 1)</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.switchSection('versus')" id="subtab_versus" 
                            class="flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${!isCountdown ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}">
                        <span>⚔️ مقارنة العمالقة (كرتين)</span>
                    </button>
                </div>

                <!-- 2. ELEMENT POSITIONING & PERSISTENCE CONTROLS -->
                <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="text-sm">🎯</span>
                            <span class="text-xs font-black text-emerald-950">تحريك العناصر وتثبيت المواضع:</span>
                        </div>
                        <button type="button" id="btnToggleDragLock" onclick="ReelsEngine.toggleDragLock()" 
                                class="px-2.5 py-1 rounded-lg ${state.dragEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'} text-[10.5px] font-black transition">
                            ${state.dragEnabled ? '🔓 السحب المباشر مفعّل' : '🔒 تم قفل المواقع'}
                        </button>
                    </div>
                    <p class="text-[10.5px] text-emerald-900/80 leading-relaxed font-medium">
                        💡 يمكنك سحب أي عنصر (الرانك، العنوان، الكرت) بالماوس/اللمس مباشرة على الشاشة. ثم اضغط <b>تثبيت المواضع</b> لتثبت تلقائياً لكل الريلزات القادمة!
                    </p>
                    <div class="flex items-center gap-2 pt-1 border-t border-emerald-200/60">
                        <button type="button" onclick="ReelsEngine.saveLayoutPositions()" class="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition shadow-xs flex items-center justify-center gap-1">
                            <span>💾 تثبيت المواضع لهذا النمط</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.resetLayoutPositions()" class="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[11px] transition">
                            <span>🔄 إعادة تعيين</span>
                        </button>
                    </div>
                </div>

                <!-- 3. VIRAL HOOKS BANK (Angles ONLY) -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                            <span>💡 بنك أفكار ${isCountdown ? 'الترتيب التنازلي' : 'صراع العمالقة'}:</span>
                        </span>
                        <span class="text-[10px] text-emerald-600 font-bold">بضغطة واحدة ✨</span>
                    </div>

                    <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                        ${ideaList.map(idea => `
                            <div class="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-white transition space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${idea.badge}</span>
                                    <span class="text-[9.5px] font-bold text-slate-400">${idea.musicTip || 'موسيقى تريند'}</span>
                                </div>
                                <div class="font-black text-slate-900 text-xs leading-snug">${idea.title}</div>
                                <div class="text-[10.5px] text-slate-500 line-clamp-1">${idea.subtitle}</div>
                                <div class="pt-1 flex items-center justify-end border-t border-slate-100">
                                    <button type="button" onclick='ReelsEngine.loadIdeaById("${idea.id}")' class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10.5px] transition flex items-center gap-1 shadow-xs">
                                        <span>تطبيق هذه الفكرة 🎬</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 4. SLIDE & PLAYER CUSTOMIZER (User in Full Control) -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-slate-900">
                            تعديل السلايد الحالي (${state.currentSlideIndex + 1}/${state.slides.length}):
                        </span>
                        ${isCountdown ? `
                            <button type="button" onclick="ReelsEngine.addPlayerSlide()" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10.5px] font-black transition flex items-center gap-1">
                                <span>➕ إضافة كرت</span>
                            </button>
                        ` : ''}
                    </div>

                    ${renderSlideForm(currentSlide)}
                </div>

                <!-- 5. SAFE ZONE -->
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                        <span>📐</span>
                        <span class="font-bold text-slate-700">خطوط أمان إنستغرام وتيك توك:</span>
                    </div>
                    <button type="button" id="btnToggleSafeZone" onclick="ReelsEngine.toggleSafeZone()" 
                            class="px-3 py-1.5 rounded-xl ${state.showSafeZone ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'} font-black text-[11px] transition shadow-xs">
                        ${state.showSafeZone ? '📐 مفعلة' : '📐 مخفية'}
                    </button>
                </div>

                <!-- 6. EXPORT ACTIONS -->
                <div class="pt-2 border-t border-slate-200 space-y-2">
                    <button type="button" onclick="ReelsEngine.exportReelVideo()" id="btnExportVideo" 
                            class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-105 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer">
                        <span>🎬 تصدير فيديو الريل بدقة 60FPS (MP4 / WebM)</span>
                    </button>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" onclick="ReelsEngine.exportAllSlidesBatch()" class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>📸 تحميل كافة السلايدات</span>
                        </button>
                        <button type="button" onclick="ReelsEngine.sendReelTelegram()" class="py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-[11px] transition flex items-center justify-center gap-1 shadow-sm">
                            <span>🚀 إرسال لتليجرام</span>
                        </button>
                    </div>
                </div>

            </div>
        `;

        container.innerHTML = html;
    }

    function renderSlideForm(slide) {
        if (!slide) return '';

        if (slide.type === 'intro') {
            return `
                <div class="space-y-2.5">
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">عنوان الريل المانشيت (Hook Title):</label>
                        <textarea rows="2" oninput="ReelsEngine.updateCurrentSlideField('title', this.value); ReelsEngine.updateTitle(this.value);"
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
                            <label class="block text-[11px] font-black text-slate-700 mb-1">رقم الرانك (الترتيب):</label>
                            <input type="text" value="${slide.rank || '1'}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('rank', this.value)"
                                   class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black text-center outline-none focus:border-emerald-500">
                        </div>
                        <div>
                            <label class="block text-[11px] font-black text-slate-700 mb-1">اسم اللاعب بالعربي:</label>
                            <input type="text" value="${(slide.playerArName || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateCurrentSlideField('playerArName', this.value)"
                                   class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-emerald-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">رابط صورة كرت اللاعب (FUT.GG WebP أو رابط مباشر):</label>
                        <input type="text" value="${(slide.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="ReelsEngine.updateCurrentSlideField('cardUrl', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[10.5px] font-mono outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">شارات ومميزات الكرت (افصل بينها بفاصلة):</label>
                        <input type="text" value="${(slide.badges || []).join(' , ')}" 
                               onchange="ReelsEngine.updateBadges(this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-emerald-500">
                    </div>
                    <div class="pt-1 flex justify-end">
                        <button type="button" onclick="ReelsEngine.deleteCurrentSlide()" class="text-rose-600 hover:text-rose-800 font-bold text-[10.5px] transition flex items-center gap-1">
                            <span>🗑️ حذف هذا السلايد</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (slide.type === 'versus_card') {
            const pA = slide.playerA || {};
            const pB = slide.playerB || {};
            return `
                <div class="space-y-3">
                    <!-- Player A -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span class="text-[11px] font-black text-slate-900 block">اللاعب الأول (اليمين):</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="الاسم بالعربي" value="${(pA.arName || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateVersusField('playerA', 'arName', this.value)"
                                   class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold">
                            <input type="text" placeholder="أبرز ميزة (مثل: سرعة 96)" value="${(pA.statHighlight || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateVersusField('playerA', 'statHighlight', this.value)"
                                   class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs">
                        </div>
                        <input type="text" placeholder="رابط كرت اللاعب A" value="${(pA.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="ReelsEngine.updateVersusField('playerA', 'cardUrl', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[10.5px] font-mono">
                    </div>

                    <!-- Player B -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span class="text-[11px] font-black text-slate-900 block">اللاعب الثاني (اليسار):</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="الاسم بالعربي" value="${(pB.arName || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateVersusField('playerB', 'arName', this.value)"
                                   class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold">
                            <input type="text" placeholder="أبرز ميزة (مثل: بدنية 90)" value="${(pB.statHighlight || '').replace(/"/g, '&quot;')}" 
                                   oninput="ReelsEngine.updateVersusField('playerB', 'statHighlight', this.value)"
                                   class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs">
                        </div>
                        <input type="text" placeholder="رابط كرت اللاعب B" value="${(pB.cardUrl || '').replace(/"/g, '&quot;')}" 
                               onchange="ReelsEngine.updateVersusField('playerB', 'cardUrl', this.value)"
                               class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[10.5px] font-mono">
                    </div>

                    <!-- Question Hook -->
                    <div>
                        <label class="block text-[11px] font-black text-slate-700 mb-1">سؤال التفاعل أسفل المقارنة:</label>
                        <input type="text" value="${(slide.question || '').replace(/"/g, '&quot;')}" 
                               oninput="ReelsEngine.updateCurrentSlideField('question', this.value)"
                               class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="text-xs font-bold text-slate-500 leading-relaxed">
                    سلايد الختام يعرض شعار متجر ShopCoin15 وضمان النادي ورابط الطلب عبر الخاص @shop_coin15.
                </div>
            `;
        }
    }

    function updateTitle(val) {
        state.title = val;
        renderCanvas();
    }

    function updateBadges(val) {
        const slide = state.slides[state.currentSlideIndex];
        if (!slide) return;
        slide.badges = val.split(',').map(s => s.trim()).filter(Boolean);
        renderCanvas();
    }

    function loadIdeaById(ideaId) {
        const list = VIRAL_IDEAS[state.activeSection] || [];
        const idea = list.find(x => x.id === ideaId);
        if (idea) applyIdea(idea, true);
    }

    // ---- 9. PLAYER TOOLBAR (BELOW CANVAS) ----
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
                        <span>▶️ تشغيل</span>
                    </button>
                    <button type="button" onclick="ReelsEngine.nextSlide()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black transition" title="السلايد التالي">
                        التالي ⏩
                    </button>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <span id="toolbarSlideIndicator" class="text-[11px] font-black text-emerald-400">
                        سلايد ${state.currentSlideIndex + 1}/${state.slides.length}
                    </span>
                    <div class="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div id="toolbarTimelineBar" class="bg-emerald-400 h-full w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <button type="button" onclick="ReelsEngine.exportReelVideo()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-black text-xs transition flex items-center gap-1 shadow-md shadow-emerald-600/20">
                    <span>🎬 تحميل فيديو</span>
                </button>
            </div>
        `;
        updatePlayerUi();
    }

    // ---- 10. EXPORTERS (VIDEO & SLIDES) ----
    async function exportReelVideo() {
        const btn = document.getElementById('btnExportVideo');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>⏳ جاري تسجيل الفيديو بدقة 60FPS...</span>';
        }

        pausePlayback();
        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        state.showSafeZone = false;
        state.dragEnabled = false;

        try {
            if (window.showCopyToast) {
                window.showCopyToast('بدأ تسجيل فيديو الريل بدقة 60FPS.. يرجى الانتظار ثوانٍ! 🎬⚡');
            }

            const recordCanvas = document.createElement('canvas');
            recordCanvas.width = 1080;
            recordCanvas.height = 1920;
            const ctx = recordCanvas.getContext('2d');

            const stream = recordCanvas.captureStream(60);
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';
            if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) mimeType = 'video/mp4;codecs=avc1';

            const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 });
            const chunks = [];
            recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

            const recordingComplete = new Promise(resolve => {
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

            const domNode = document.getElementById('exportCanvas');
            const totalSlides = state.slides.length;
            const msPerSlide = (state.slideDuration || 2.5) * 1000;

            for (let i = 0; i < totalSlides; i++) {
                state.currentSlideIndex = i;
                renderCanvas();
                await new Promise(r => setTimeout(r, 200));

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

                    const framesCount = Math.floor((msPerSlide / 1000) * 30);
                    const frameInterval = msPerSlide / framesCount;

                    for (let f = 0; f < framesCount; f++) {
                        const progress = f / framesCount;
                        const scale = 1.0 + (progress * 0.015);
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
                window.showCopyToast('تم تحميل فيديو الريل بنجاح! جاهز للنشر مع موسيقاك 🚀🎉');
            }
        } catch (err) {
            console.error('Video export error:', err);
            alert('تعذر تصدير الفيديو مباشرة: ' + err.message);
        } finally {
            state.showSafeZone = prevSafe;
            state.dragEnabled = prevDrag;
            state.currentSlideIndex = 0;
            renderCanvas();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span>🎬 تصدير فيديو الريل بدقة 60FPS (MP4 / WebM)</span>';
            }
        }
    }

    async function exportAllSlidesBatch() {
        if (!window.CanvasExporter) {
            alert('محرك التصدير غير متاح.');
            return;
        }

        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        state.showSafeZone = false;
        state.dragEnabled = false;
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
        state.dragEnabled = prevDrag;
        state.currentSlideIndex = 0;
        renderCanvas();

        if (window.showCopyToast) {
            window.showCopyToast('تم تنزيل جميع السلايدات بجودة 4K! 👑');
        }
    }

    async function sendReelTelegram() {
        if (!window.TelegramManager) {
            alert('مدير التليجرام غير متاح.');
            return;
        }
        const prevSafe = state.showSafeZone;
        const prevDrag = state.dragEnabled;
        state.showSafeZone = false;
        state.dragEnabled = false;
        renderCanvas();
        await new Promise(r => setTimeout(r, 200));

        const caption = `🎬 ريلز FC 27 جاهز للنشر:\n${state.title}\n${state.subtitle}\n\n@shop_coin15`;
        await window.TelegramManager.sendDesignInternal('exportCanvas', caption);

        state.showSafeZone = prevSafe;
        state.dragEnabled = prevDrag;
        renderCanvas();
    }

    // Initial setup
    initSection('countdown');

    return {
        getState: () => state,
        switchSection,
        applyIdea,
        loadIdeaById,
        playPlayback,
        pausePlayback,
        togglePlayPause,
        nextSlide,
        prevSlide,
        goToSlide,
        setSlideDuration,
        toggleSafeZone,
        toggleDragLock,
        saveLayoutPositions,
        resetLayoutPositions,
        addPlayerSlide,
        deleteCurrentSlide,
        updateCurrentSlideField,
        updateVersusField,
        updateTitle,
        updateBadges,
        renderCanvas,
        renderEditorControls,
        renderPlayerToolbar,
        exportReelVideo,
        exportAllSlidesBatch,
        sendReelTelegram
    };
})();
