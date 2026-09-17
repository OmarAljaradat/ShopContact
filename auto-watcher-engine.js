/**
 * Auto-Watcher & Auto-Designer Engine for EA FC Daily 8:00 PM Content
 * - Watches FUT.GG for new SBC releases
 * - Sends interactive Telegram notifications with Approval / Studio Edit / Ignore buttons
 * - Generates 100% WYSIWYG 4K Story designs with shop_coin15 store branding & banners
 * - Formulates marketing captions and sends directly to Telegram
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, 'data');
const SEEN_FILE = path.join(DATA_DIR, 'seen_sbcs.json');
const PENDING_FILE = path.join(DATA_DIR, 'pending_sbcs.json');

const DEFAULT_BOT_TOKEN = '8903974669:AAGv7_Wpb-0ujiNVTpnhdrXOXOOzOi8rHFg';
const DEFAULT_CHAT_ID = '1965859902';
const STUDIO_BASE_URL = 'https://shopcoin15-studio.onrender.com';

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SEEN_FILE)) {
        fs.writeFileSync(SEEN_FILE, '[]', 'utf8');
    }
    if (!fs.existsSync(PENDING_FILE)) {
        fs.writeFileSync(PENDING_FILE, '{}', 'utf8');
    }
}

function getSeenList() {
    ensureDataDir();
    try {
        const raw = fs.readFileSync(SEEN_FILE, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (e) {
        return [];
    }
}

function addSeenUrl(url) {
    ensureDataDir();
    const list = getSeenList();
    if (!list.includes(url)) {
        list.push(url);
        fs.writeFileSync(SEEN_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
}

function getPendingMap() {
    ensureDataDir();
    try {
        const raw = fs.readFileSync(PENDING_FILE, 'utf8');
        return JSON.parse(raw || '{}');
    } catch (e) {
        return {};
    }
}

function savePendingSbc(id, data) {
    ensureDataDir();
    const map = getPendingMap();
    map[id] = data;
    fs.writeFileSync(PENDING_FILE, JSON.stringify(map, null, 2), 'utf8');
}

// Scrape active SBC links from FUT.GG
function fetchLatestSbcUrls() {
    return new Promise((resolve) => {
        https.get('https://www.fut.gg/sbc/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                const links = [];
                const regex = /href="(\/sbc\/(?:challenges|upgrades|players|icons|heroes)\/[^"'\s]+)"/gi;
                let match;
                while ((match = regex.exec(body)) !== null) {
                    let fullUrl = match[1];
                    if (!fullUrl.startsWith('http')) {
                        fullUrl = `https://www.fut.gg${fullUrl}`;
                    }
                    if (!fullUrl.endsWith('/')) fullUrl += '/';
                    if (!links.includes(fullUrl)) {
                        links.push(fullUrl);
                    }
                }
                resolve(links);
            });
        }).on('error', (err) => {
            console.warn('[Auto-Watcher fetch error]', err.message);
            resolve([]);
        });
    });
}

class AutoWatcherEngine {
    constructor() {
        this.isRunning = false;
        this.lastCheckTime = null;
        this.timer = null;
        this.isProcessing = false;
    }

    init({ port, ensureNativePage, sendTelegramRequest, resolveSbcOrPlayer }) {
        this.port = port || 3000;
        this.ensureNativePage = ensureNativePage;
        this.sendTelegramRequest = sendTelegramRequest;
        this.resolveSbcOrPlayer = resolveSbcOrPlayer;

        ensureDataDir();
        this.startScheduler();
        console.log('🤖 [Auto-Watcher Engine] نظام مراقبة وتصميم محتوى الساعة 8:00 مساءً مفعّل في الخلفية!');
    }

    startScheduler() {
        if (this.timer) clearInterval(this.timer);
        this.isRunning = true;

        // Check every 60 seconds
        this.timer = setInterval(() => {
            this.checkScheduleWindow();
        }, 60 * 1000);
    }

    checkScheduleWindow() {
        const now = new Date();
        const utcHour = now.getUTCHours();
        const utcMin = now.getUTCMinutes();
        const jordanHour = (utcHour + 3) % 24;

        // Peak 8 PM window: between 19:55 and 20:30 (Jordan/KSA time)
        const isPeakWindow = (jordanHour === 19 && utcMin >= 55) || (jordanHour === 20 && utcMin <= 30);

        if (isPeakWindow || utcMin % 10 === 0) {
            this.checkAndProcessNewSbc(false).catch(err => {
                console.warn('[Auto-Watcher Periodic Notice]', err.message);
            });
        }
    }

    // Send interactive prompt to Telegram with Approval, Studio link, and Ignore buttons
    async promptUserForSbc(targetUrl) {
        console.log(`🤖 [Auto-Watcher] تجهيز تنبيه تفاعلي للتحدي: ${targetUrl}`);
        const sbcData = await this.resolveSbcOrPlayer(targetUrl);
        let cleanTitle = (sbcData.title || sbcData.playerName || 'تحدي SBC جديد')
            .replace(/ - EA SPORTS.*$/i, '')
            .replace(/ - FUT\.GG.*$/i, '')
            .replace(/^New/i, '')
            .trim();

        if (cleanTitle.toLowerCase().includes('marquee')) {
            cleanTitle = 'مباريات القمة (Marquee Matchups)';
        } else if (cleanTitle.toLowerCase().includes('gold upgrade')) {
            cleanTitle = 'ترقية ذهبية (Gold Upgrade)';
        }

        const sbcId = 'sbc_' + Math.random().toString(36).substring(2, 9);
        savePendingSbc(sbcId, { url: targetUrl, title: cleanTitle });
        addSeenUrl(targetUrl);

        const promptText = `🚨 <b>رصد محتوى / تحدي جديد في FC 27!</b>\n\n📌 <b>اسم التحدي:</b> ${cleanTitle}\n🌐 <b>المصدر:</b> FUT.GG\n\n<b>هل ترغب في إنشاء وتصميم ستوري إنستغرام لهذا المحتوى؟</b>`;

        const studioUrl = `${STUDIO_BASE_URL}/?template=sbc&sbcTitle=${encodeURIComponent(cleanTitle)}&sbcUrl=${encodeURIComponent(targetUrl)}`;

        await this.sendTelegramRequest({
            botToken: DEFAULT_BOT_TOKEN,
            endpoint: 'sendMessage',
            fields: {
                chat_id: DEFAULT_CHAT_ID,
                text: promptText,
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            { text: '🎨 صمم الستوري الآن (4K)', callback_data: `act:design:${sbcId}` }
                        ],
                        [
                            { text: '✏️ فتح في الاستوديو وتعديل النصوص', url: studioUrl }
                        ],
                        [
                            { text: '❌ تجاهل هذا التحدي', callback_data: `act:ignore:${sbcId}` }
                        ]
                    ]
                })
            }
        });

        console.log(`📢 [Auto-Watcher] تم إرسال تنبيه طلب الموافقة لتحدي ${cleanTitle} إلى التيليجرام بنجاح!`);
        return { success: true, title: cleanTitle, sbcId, targetUrl };
    }

    // Handles incoming updates from Telegram Webhook (button clicks & messages)
    async handleTelegramUpdate(update) {
        if (!update) return;

        // 1. Handle Callback Queries from Interactive Buttons
        if (update.callback_query) {
            const cq = update.callback_query;
            const data = cq.data || '';
            const chatId = cq.message?.chat?.id || DEFAULT_CHAT_ID;
            const messageId = cq.message?.message_id;

            if (data.startsWith('act:design:')) {
                const sbcId = data.replace('act:design:', '');
                const sbcMap = getPendingMap();
                const sbcInfo = sbcMap[sbcId];

                if (!sbcInfo) {
                    await this.sendTelegramRequest({
                        botToken: DEFAULT_BOT_TOKEN,
                        endpoint: 'answerCallbackQuery',
                        fields: { callback_query_id: cq.id, text: 'عذراً، لم يتم العثور على بيانات هذا التحدي' }
                    });
                    return;
                }

                await this.sendTelegramRequest({
                    botToken: DEFAULT_BOT_TOKEN,
                    endpoint: 'answerCallbackQuery',
                    fields: { callback_query_id: cq.id, text: 'جاري تصميم الستوري الآن بدقة 4K... ⏳' }
                });

                if (messageId) {
                    await this.sendTelegramRequest({
                        botToken: DEFAULT_BOT_TOKEN,
                        endpoint: 'editMessageText',
                        fields: {
                            chat_id: chatId,
                            message_id: messageId,
                            text: `⏳ <b>جاري تصميم ستوري 4K للتحدي:</b>\n📌 <b>${sbcInfo.title}</b>\nيرجى الانتظار ثوانٍ معدودة...`,
                            parse_mode: 'HTML'
                        }
                    }).catch(() => {});
                }

                try {
                    await this.autoDesignAndSend(sbcInfo.url, true);

                    if (messageId) {
                        await this.sendTelegramRequest({
                            botToken: DEFAULT_BOT_TOKEN,
                            endpoint: 'editMessageText',
                            fields: {
                                chat_id: chatId,
                                message_id: messageId,
                                text: `✅ <b>تم تصميم وإرسال ستوري التحدي بنجاح!</b>\n📌 <b>${sbcInfo.title}</b>\nتحقق من الصورة والكابشن في الأسفل ⬇️`,
                                parse_mode: 'HTML'
                            }
                        }).catch(() => {});
                    }
                } catch (err) {
                    console.error('[Design Error]', err);
                    await this.sendTelegramRequest({
                        botToken: DEFAULT_BOT_TOKEN,
                        endpoint: 'sendMessage',
                        fields: {
                            chat_id: chatId,
                            text: `⚠️ حدث خطأ أثناء التصميم: ${err.message}`
                        }
                    });
                }
            } else if (data.startsWith('act:ignore:')) {
                const sbcId = data.replace('act:ignore:', '');
                const sbcMap = getPendingMap();
                const sbcInfo = sbcMap[sbcId];
                const title = sbcInfo ? sbcInfo.title : 'التحدي';

                await this.sendTelegramRequest({
                    botToken: DEFAULT_BOT_TOKEN,
                    endpoint: 'answerCallbackQuery',
                    fields: { callback_query_id: cq.id, text: 'تم تجاهل هذا التحدي 👍' }
                });

                if (messageId) {
                    await this.sendTelegramRequest({
                        botToken: DEFAULT_BOT_TOKEN,
                        endpoint: 'editMessageText',
                        fields: {
                            chat_id: chatId,
                            message_id: messageId,
                            text: `❌ <b>تم تجاهل:</b> ${title}\n(لن يتم إنشاء ستوري لهذا المحتوى بناءً على اختيارك).`,
                            parse_mode: 'HTML'
                        }
                    }).catch(() => {});
                }
            }
            return;
        }

        // 2. Handle Text Messages from Omar (Links or Commands)
        if (update.message && update.message.text) {
            const text = update.message.text.trim();
            const chatId = update.message.chat.id;

            if (text.includes('fut.gg')) {
                const urlMatch = text.match(/https?:\/\/[^\s]+/);
                if (urlMatch) {
                    await this.promptUserForSbc(urlMatch[0]);
                }
            } else if (text === '/check' || text === 'فحص') {
                await this.sendTelegramRequest({
                    botToken: DEFAULT_BOT_TOKEN,
                    endpoint: 'sendMessage',
                    fields: {
                        chat_id: chatId,
                        text: '🔍 جاري فحص تحديات ومحتوى FUT.GG الآن...'
                    }
                });
                const res = await this.checkAndProcessNewSbc(false);
                if (!res.newFound) {
                    await this.sendTelegramRequest({
                        botToken: DEFAULT_BOT_TOKEN,
                        endpoint: 'sendMessage',
                        fields: {
                            chat_id: chatId,
                            text: '✅ لا توجد تحديات جديدة حالياً، كل المحتوى تم رصده مسبقاً.'
                        }
                    });
                }
            }
        }
    }

    // High-Resolution 4K Story Designer and Dispatcher
    async autoDesignAndSend(targetUrl, forceSend = false) {
        if (!targetUrl) throw new Error('رابط التحدي مطلوب');

        console.log(`🤖 [Auto-Watcher] جاري معالجة وتصميم التحدي: ${targetUrl}`);

        // 1. Fetch authentic card asset & title
        const sbcData = await this.resolveSbcOrPlayer(targetUrl);
        if (!sbcData || (!sbcData.sbcImage && !sbcData.cardImage)) {
            throw new Error('تعذر سحب بيانات وبطاقة التحدي من FUT.GG');
        }

        let cleanTitle = (sbcData.title || sbcData.playerName || 'تحدي SBC جديد')
            .replace(/ - EA SPORTS.*$/i, '')
            .replace(/ - FUT\.GG.*$/i, '')
            .replace(/^New/i, '')
            .trim();

        if (cleanTitle.toLowerCase().includes('marquee')) {
            cleanTitle = 'مباريات القمة (Marquee Matchups)';
        } else if (cleanTitle.toLowerCase().includes('gold upgrade')) {
            cleanTitle = 'ترقية ذهبية (Gold Upgrade)';
        }

        const sbcImg = sbcData.sbcImage || sbcData.cardImage;

        // 2. Render 4K Story via Native Chrome Page
        const page = await this.ensureNativePage(this.port);
        if (!page) throw new Error('محرك المتصفح غير جاهز لتصيير الصورة');

        await page.setViewport({
            width: 1080,
            height: 1920,
            deviceScaleFactor: 2
        });

        // 4 Clean, Punchy Banners with Optimal Proportions & Breathing Space
        const banners = [
            { text: `نزل تحدي ${cleanTitle} رسميـاً 🔥`, bg: '#0084FF', color: '#FFFFFF' },
            { text: 'نوفر لك الكوينز ونحل التحدي بحسابك 👌', bg: '#E50914', color: '#FFFFFF' },
            { text: 'سرعة تنفيذ وضمان كامل للنادي بدون بان 🔒⚡', bg: '#38B000', color: '#FFFFFF' },
            { text: 'للطلب والاستفسار بالخاص حياكم ⬇️⬇️', bg: '#E1F5FE', color: '#1E293B' }
        ];

        // Ensure studio DOM is fully loaded and ready
        const hasStudio = await page.evaluate(() => typeof window.selectTemplate === 'function').catch(() => false);
        if (!hasStudio) {
            await page.goto(`http://127.0.0.1:${this.port}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
            await page.waitForFunction(() => typeof window.selectTemplate === 'function', { timeout: 10000 });
        }

        // Evaluate inside page to construct 100% genuine studio DOM
        await page.evaluate(async ({ title, imgUrl, bannerItems }) => {
            if (typeof window.selectTemplate === 'function') {
                window.selectTemplate('sbc');
            } else {
                currentTemplate = 'sbc';
            }
            currentRatio = 'story';
            appState.sbcTitle = title;
            if (imgUrl) {
                appState.sbcImageUrl = imgUrl;
            }
            appState.banners = bannerItems;

            // Optimize layer spacing for aesthetic balance
            appState.layers = appState.layers || {};
            if (appState.layers.layer_sbc_banners) {
                appState.layers.layer_sbc_banners.y = 45;
                appState.layers.layer_sbc_banners.scale = 1.0;
            }
            if (appState.layers.layer_sbc_asset) {
                appState.layers.layer_sbc_asset.y = 350;
                appState.layers.layer_sbc_asset.scale = 1.05;
            }

            if (typeof renderControls === 'function') renderControls();
            if (typeof renderCanvas === 'function') renderCanvas();
            if (typeof updateCaption === 'function') updateCaption();

            // Wait for images & fonts
            if (document.fonts) await document.fonts.ready;
            const imgs = Array.from(document.querySelectorAll('#exportCanvas img'));
            await Promise.all(imgs.map(img => {
                if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                return new Promise(res => {
                    img.addEventListener('load', res, { once: true });
                    img.addEventListener('error', res, { once: true });
                    setTimeout(res, 3000);
                });
            }));
            await new Promise(r => setTimeout(r, 120));
        }, { title: cleanTitle, imgUrl: sbcImg, bannerItems: banners });

        const cardEl = await page.evaluateHandle(() => document.getElementById('exportCanvas'));
        if (!cardEl) throw new Error('عنصر exportCanvas غير موجود في المحرك');

        const screenshotBuffer = await cardEl.screenshot({
            type: 'jpeg',
            quality: 96
        });

        // 3. Formulate Marketing Caption
        const caption = `⚡ نزل رسميـاً تحدي: ${cleanTitle} في FC 27! 👑

نوفر لك الكوينز المطلوبة وننفذ لك التحدي بحسابك بأمان وضمان كامل للنادي 🛡️🔥

📌 مميزات متجر @shop_coin15:
✅ كوينز صافية شاملة الضريبة لجميع المنصات (PS5 • XBOX • PC)
✅ أمان وضمان كامل للنادي من التصفير والبان
✅ سرعة تنفيذ فائقة وتسليم فوري ومباشر

📩 للطلب والاستفسار تواصل معنا عبر الخاص DM
حساب المتجر الرسمي: @shop_coin15

#FC27 #FC26 #EAFC #SBC #تحديات_فيفا #shop_coin15 #كوينز`;

        // 4. Send directly to Telegram
        await this.sendTelegramRequest({
            botToken: DEFAULT_BOT_TOKEN,
            endpoint: 'sendPhoto',
            fields: {
                chat_id: DEFAULT_CHAT_ID,
                caption: caption
            },
            fileField: 'photo',
            fileBuffer: screenshotBuffer,
            fileName: `sbc_auto_${Date.now()}.jpg`,
            fileMime: 'image/jpeg'
        });

        // Save to seen list
        addSeenUrl(targetUrl);
        console.log(`✅ [Auto-Watcher] تم إرسال تصميم ${cleanTitle} بنجاح إلى التليجرام!`);

        return {
            success: true,
            title: cleanTitle,
            url: targetUrl,
            sentAt: new Date().toISOString()
        };
    }

    async checkAndProcessNewSbc(forceSend = false) {
        if (this.isProcessing) return { skipped: true, reason: 'عملية فحص جارية حالياً' };
        this.isProcessing = true;
        this.lastCheckTime = new Date().toISOString();

        try {
            console.log('🤖 [Auto-Watcher] جاري فحص أحدث التحديات من FUT.GG...');
            const links = await fetchLatestSbcUrls();
            if (!links || links.length === 0) {
                return { success: false, error: 'لم يتم العثور على تحديات حالياً' };
            }

            const seenList = getSeenList();
            let target = null;

            if (forceSend) {
                target = links[0];
            } else {
                for (const link of links) {
                    if (!seenList.includes(link)) {
                        target = link;
                        break;
                    }
                }
            }

            if (!target) {
                console.log('🤖 [Auto-Watcher] لا توجد تحديات جديدة لم يتم رصدها بعد.');
                return { success: true, message: 'كافة التحديات الحالية تمت معالجتها مسبقاً', newFound: false };
            }

            const res = await this.promptUserForSbc(target);
            return { success: true, newFound: true, prompted: true, result: res };
        } finally {
            this.isProcessing = false;
        }
    }

    getStatus() {
        const seenList = getSeenList();
        return {
            active: this.isRunning,
            lastCheckTime: this.lastCheckTime,
            seenCount: seenList.length,
            seenList: seenList.slice(-10),
            isProcessing: this.isProcessing
        };
    }
}

const autoWatcher = new AutoWatcherEngine();
module.exports = autoWatcher;
