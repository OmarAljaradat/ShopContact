/**
 * Telegram Bot Client Engine - ShopCoin15 Studio
 * 1-Click 4K Ultra Story Export directly to phone via Telegram
 */

const TelegramManager = {
    TOKEN_KEY: 'shopcoin_telegram_token',
    CHAT_ID_KEY: 'shopcoin_telegram_chat_id',
    AS_DOC_KEY: 'shopcoin_telegram_as_document',

    DEFAULT_TOKEN: '8903974669:AAGv7_Wpb-0ujiNVTpnhdrXOXOOzOi8rHFg',
    DEFAULT_CHAT_ID: '1965859902',

    getToken() {
        return (localStorage.getItem(this.TOKEN_KEY) || this.DEFAULT_TOKEN).trim();
    },

    getChatId() {
        return (localStorage.getItem(this.CHAT_ID_KEY) || this.DEFAULT_CHAT_ID).trim();
    },

    getAsDocument() {
        return localStorage.getItem(this.AS_DOC_KEY) === 'true';
    },

    setToken(token) {
        localStorage.setItem(this.TOKEN_KEY, (token || this.DEFAULT_TOKEN).trim());
    },

    setChatId(chatId) {
        localStorage.setItem(this.CHAT_ID_KEY, (chatId || this.DEFAULT_CHAT_ID).trim());
    },

    async autoDetectChatId() {
        const token = this.getToken();
        const detectBtn = document.getElementById('tgBtnAutoDetect');
        const originalText = detectBtn ? detectBtn.innerHTML : '';
        if (detectBtn) {
            detectBtn.disabled = true;
            detectBtn.innerHTML = 'جاري الفحص... ⏳';
        }
        this.showStatus('info', 'جاري البحث عن رسالتك في البوت...');
        try {
            const res = await fetch(`/api/telegram-get-chat-id?botToken=${encodeURIComponent(token)}`);
            const data = await res.json();
            if (data.success && data.chatId) {
                this.setChatId(data.chatId);
                const chatIdInput = document.getElementById('tgChatIdInput');
                if (chatIdInput) chatIdInput.value = data.chatId;
                this.showStatus('success', `🎉 تم جلب معرفك بنجاح (${data.name || data.chatId})! اضغط الآن "اختبار الاتصال" للتأكيد.`);
            } else {
                this.showStatus('error', '⚠️ لم نجد رسالتك بعد! افتح البوت بالرابط واضغط له Start أو اكتب له أي رسالة، ثم اضغط هذا الزر مجدداً.');
            }
        } catch (e) {
            this.showStatus('error', 'خطأ في الاتصال: ' + e.message);
        } finally {
            if (detectBtn) {
                detectBtn.disabled = false;
                detectBtn.innerHTML = originalText;
            }
        }
    },

    setAsDocument(val) {
        localStorage.setItem(this.AS_DOC_KEY, val ? 'true' : 'false');
    },

    isConfigured() {
        return !!(this.getToken() && this.getChatId());
    },

    openSettingsModal() {
        const modal = document.getElementById('telegramSettingsModal');
        if (!modal) return;

        const tokenInput = document.getElementById('tgBotTokenInput');
        const chatIdInput = document.getElementById('tgChatIdInput');
        const asDocCheckbox = document.getElementById('tgAsDocumentCheckbox');
        const statusEl = document.getElementById('tgStatusMessage');

        if (tokenInput) tokenInput.value = this.getToken();
        if (chatIdInput) chatIdInput.value = this.getChatId();
        if (asDocCheckbox) asDocCheckbox.checked = this.getAsDocument();
        if (statusEl) {
            statusEl.className = 'hidden';
            statusEl.innerHTML = '';
        }

        modal.classList.remove('hidden');
    },

    closeSettingsModal() {
        const modal = document.getElementById('telegramSettingsModal');
        if (modal) modal.classList.add('hidden');
    },

    saveSettings() {
        const tokenInput = document.getElementById('tgBotTokenInput');
        const chatIdInput = document.getElementById('tgChatIdInput');
        const asDocCheckbox = document.getElementById('tgAsDocumentCheckbox');

        const token = tokenInput ? tokenInput.value.trim() : '';
        const chatId = chatIdInput ? chatIdInput.value.trim() : '';
        const asDoc = asDocCheckbox ? asDocCheckbox.checked : false;

        this.setToken(token);
        this.setChatId(chatId);
        this.setAsDocument(asDoc);

        if (window.showCopyToast) {
            window.showCopyToast('تم حفظ إعدادات تيليجرام بنجاح! 💾⚡');
        }
        this.closeSettingsModal();
    },

    async testConnection() {
        const tokenInput = document.getElementById('tgBotTokenInput');
        const chatIdInput = document.getElementById('tgChatIdInput');
        const statusEl = document.getElementById('tgStatusMessage');
        const testBtn = document.getElementById('tgBtnTest');

        const token = tokenInput ? tokenInput.value.trim() : this.getToken();
        const chatId = chatIdInput ? chatIdInput.value.trim() : this.getChatId();

        if (!token) {
            this.showStatus('error', '⚠️ يرجى إدخال رمز البوت (Bot Token)');
            return;
        }
        if (!chatId) {
            this.showStatus('error', '⚠️ يرجى إدخال معرّف المحادثة (Chat ID)');
            return;
        }

        // Save current inputs temporarily
        this.setToken(token);
        this.setChatId(chatId);

        if (testBtn) {
            testBtn.disabled = true;
            testBtn.innerHTML = 'جاري التحقق... ⏳';
        }
        this.showStatus('info', 'جاري إرسال رسالة اختبارية إلى حسابك في تليجرام... 🚀');

        try {
            const res = await fetch('/api/telegram-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ botToken: token, chatId: chatId })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                this.showStatus('success', '🎉 ' + (data.message || 'تم الاتصال بنجاح! افتح تيليجرام وستجد رسالة الترحيب'));
            } else {
                this.showStatus('error', '❌ خطأ: ' + (data.error || 'تعذر الاتصال بالبوت'));
            }
        } catch (err) {
            this.showStatus('error', '❌ فشل الاتصال بالسيرفر: ' + err.message);
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.innerHTML = '⚡ اختبار الاتصال الآن';
            }
        }
    },

    showStatus(type, msg) {
        const statusEl = document.getElementById('tgStatusMessage');
        if (!statusEl) return;

        statusEl.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'bg-red-50', 'text-red-800', 'border-red-200', 'bg-blue-50', 'text-blue-800', 'border-blue-200');

        if (type === 'success') {
            statusEl.classList.add('bg-emerald-50', 'text-emerald-800', 'border', 'border-emerald-200', 'p-3', 'rounded-xl', 'text-xs', 'font-bold');
        } else if (type === 'error') {
            statusEl.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200', 'p-3', 'rounded-xl', 'text-xs', 'font-bold');
        } else {
            statusEl.classList.add('bg-blue-50', 'text-blue-800', 'border', 'border-blue-200', 'p-3', 'rounded-xl', 'text-xs', 'font-bold');
        }
        statusEl.innerHTML = msg;
    },

    async sendDesignInternal(elementId = 'exportCanvas', captionOverride = null) {
        if (!this.isConfigured()) {
            this.openSettingsModal();
            this.showStatus('info', '💡 يرجى إدخال رمز البوت والـ Chat ID مرة واحدة لتفعيل الإرسال لتليجرام!');
            return;
        }

        const token = this.getToken();
        const chatId = this.getChatId();
        const asDoc = this.getAsDocument();

        let caption = captionOverride;
        if (!caption) {
            const captionEl = document.getElementById('captionText');
            caption = captionEl ? captionEl.value : '';
            if (!caption && typeof CopywriterEngine !== 'undefined') {
                caption = CopywriterEngine.generate(currentTemplate, appState, currentCopyStyle);
            }
        }

        const source = document.getElementById(elementId);
        if (!source) throw new Error('لم يتم العثور على عنصر التصميم!');

        let dataUrl = null;
        try {
            const clone = source.cloneNode(true);
            clone.querySelectorAll('.layer-toolbar, .layer-resize-handle, .snap-guide').forEach(el => el.remove());

            const activeFont = (typeof appState !== 'undefined' && appState.fontFamily) || 'alexandria';
            const fontClass = `font-family-${activeFont}`;
            const targetClassName = (source.className || '').replace(/font-family-\w+/g, '').trim() + ` ${fontClass}`;

            const fontCssString = activeFont === 'thmanyah' 
                ? "'Thmanyah Sans', Alexandria, sans-serif" 
                : (activeFont === 'zain' ? "'Zain', Cairo, sans-serif" : "'Alexandria', Cairo, sans-serif");
            const fontStyleRule = `<style>#${elementId}, #${elementId} * { font-family: ${fontCssString} !important; }</style>`;

            const res = await fetch('/api/render-native', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    html: fontStyleRule + clone.innerHTML,
                    className: targetClassName,
                    filename: 'telegram_design.jpg',
                    format: 'jpg',
                    quality: 98
                })
            });

            if (res.ok) {
                const blob = await res.blob();
                dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            }
        } catch (err) {
            console.warn('[Telegram Native Render Fallback]', err.message);
        }

        if (!dataUrl && typeof CanvasExporter !== 'undefined') {
            const canvas = await CanvasExporter.renderToCanvas(elementId, true);
            dataUrl = canvas.toDataURL('image/jpeg', 0.98);
        }

        if (!dataUrl) throw new Error('تعذر إنشاء صورة التصميم بدقة فائقة');

        const sendRes = await fetch('/api/telegram-send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                botToken: token,
                chatId: chatId,
                dataUrl: dataUrl,
                caption: caption,
                asDocument: asDoc
            })
        });

        const sendData = await sendRes.json();
        if (!sendRes.ok || !sendData.success) {
            throw new Error(sendData.error || 'تعذر الإرسال إلى تيليجرام');
        }
    },

    async sendCurrentDesign() {
        if (!this.isConfigured()) {
            this.openSettingsModal();
            this.showStatus('info', '💡 يرجى إدخال رمز البوت والـ Chat ID مرة واحدة فقط لتفعيل الإرسال السريع بهاتفك!');
            return;
        }

        if (window.showCopyToast) {
            window.showCopyToast('جاري تجهيز التصميم 4K وإرساله للتليجرام... 🚀⏳');
        }

        const btns = document.querySelectorAll('.btn-telegram-action');
        btns.forEach(b => {
            b.disabled = true;
            b.classList.add('opacity-60', 'pointer-events-none');
        });

        try {
            await this.sendDesignInternal('exportCanvas', null);
            if (window.showCopyToast) {
                window.showCopyToast('تم إرسال التصميم والكابشن إلى تيليجرام بنجاح! 🚀📱 افتح المحادثة الآن');
            }
        } catch (error) {
            console.error('[Telegram Send Error]', error);
            alert('حدث خطأ أثناء الإرسال للتليجرام: ' + error.message);
        } finally {
            btns.forEach(b => {
                b.disabled = false;
                b.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    }
};

window.TelegramManager = TelegramManager;

window.triggerAutoWatcher = async function() {
    const btn = document.getElementById('btnTriggerAutoWatcher');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>جاري الرصد والتصميم... ⏳</span>';
    }

    if (window.showCopyToast) {
        window.showCopyToast('🤖 جاري فحص محتوى وتحديات الساعة 8 من FUT.GG وتصميم الستوري فوراً...');
    }

    try {
        const res = await fetch('/api/auto-watcher/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ forceSend: true })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            const title = data.data?.result?.title || data.data?.title || 'التحدي الجديد';
            if (window.showCopyToast) {
                window.showCopyToast(`🎉 تم رصد وتصميم ستوري (${title}) وإرسالها فوراً إلى هاتفك بالتليجرام! 🚀📱`);
            }
        } else {
            alert('تنبيه: ' + (data.error || 'لم يتم العثور على تحديات جديدة حالياً'));
        }
    } catch (err) {
        alert('حدث خطأ أثناء رصد المحتوى: ' + err.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
};

