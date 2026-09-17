/**
 * Auto-Watcher & Auto-Designer Engine for EA FC Daily 8:00 PM Content
 * - Periodically watches FUT.GG for new SBC releases
 * - Generates 100% WYSIWYG 4K Story designs with shop_coin15 store branding & banners
 * - Formulates marketing captions and sends directly to Telegram
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, 'data');
const SEEN_FILE = path.join(DATA_DIR, 'seen_sbcs.json');

const DEFAULT_BOT_TOKEN = '8903974669:AAGv7_Wpb-0ujiNVTpnhdrXOXOOzOi8rHFg';
const DEFAULT_CHAT_ID = '1965859902';

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SEEN_FILE)) {
        fs.writeFileSync(SEEN_FILE, '[]', 'utf8');
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

        // Run interval every 60 seconds
        this.timer = setInterval(() => {
            this.checkScheduleWindow();
        }, 60 * 1000);
    }

    checkScheduleWindow() {
        // Jordan / KSA timezone is UTC+3
        const now = new Date();
        const utcHour = now.getUTCHours();
        const utcMin = now.getUTCMinutes();
        const jordanHour = (utcHour + 3) % 24;

        // Peak 8 PM window: between 19:55 and 20:30 (Jordan/KSA time)
        const isPeakWindow = (jordanHour === 19 && utcMin >= 55) || (jordanHour === 20 && utcMin <= 30);

        // Check during peak window every minute, or every 10 minutes during the rest of the day
        if (isPeakWindow || utcMin % 10 === 0) {
            this.checkAndProcessNewSbc(false).catch(err => {
                console.warn('[Auto-Watcher Periodic Notice]', err.message);
            });
        }
    }

    async autoDesignAndSend(targetUrl, forceSend = false) {
        if (!targetUrl) throw new Error('رابط التحدي مطلوب');

        const seenList = getSeenList();
        if (seenList.includes(targetUrl) && !forceSend) {
            return { skipped: true, reason: 'تمت معالجة هذا التحدي مسبقاً' };
        }

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

        // Arabic title enhancer
        if (cleanTitle.toLowerCase().includes('marquee')) {
            cleanTitle = 'مباريات القمة (Marquee Matchups)';
        } else if (cleanTitle.toLowerCase().includes('gold upgrade')) {
            cleanTitle = 'ترقية ذهبية (Gold Upgrade)';
        }

        const sbcImg = sbcData.sbcImage || sbcData.cardImage;

        // 2. Render 4K Story via persistent Native Chrome Page
        const page = await this.ensureNativePage(this.port);
        if (!page) throw new Error('محرك المتصفح غير جاهز لتصيير الصورة');

        await page.setViewport({
            width: 1080,
            height: 1920,
            deviceScaleFactor: 2
        });

        const banners = [
            { text: `نزل تحدي ${cleanTitle} رسميـاً 🔥🤩`, bg: '#0084FF', color: '#FFFFFF' },
            { text: 'شامل الكوينز وتنفيذ التحديات بالكامل 👌', bg: '#E50914', color: '#FFFFFF' },
            { text: 'وضمان كامل للنادي وسرعة خيالية ⚡', bg: '#38B000', color: '#FFFFFF' },
            { text: 'متوفر شحن جميع المنصات بأفضل الأسعار 🥳', bg: '#0084FF', color: '#FFFFFF' },
            { text: 'للطلب على الخاص حياكم ⬇️⬇️', bg: '#FCE4EC', color: '#880E4F' }
        ];

        // Evaluate inside page to construct 100% genuine studio DOM
        await page.evaluate(async ({ title, imgUrl, bannerItems }) => {
            if (typeof switchTemplate === 'function') {
                switchTemplate('sbc');
            } else {
                currentTemplate = 'sbc';
            }
            currentRatio = 'story';
            appState.sbcTitle = title;
            if (imgUrl) {
                appState.sbcImageUrl = imgUrl;
            }
            appState.banners = bannerItems;

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

        const cardEl = await page.$('#exportCanvas');
        if (!cardEl) throw new Error('عنصر exportCanvas غير موجود في المحرك');

        const screenshotBuffer = await cardEl.screenshot({
            type: 'jpeg',
            quality: 96
        });

        // 3. Marketing Caption formulation
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

        // 5. Send Alert ping message
        await this.sendTelegramRequest({
            botToken: DEFAULT_BOT_TOKEN,
            endpoint: 'sendMessage',
            fields: {
                chat_id: DEFAULT_CHAT_ID,
                text: `🚨 <b>رصد محتوى الساعة 8 الجديد:</b>\nتم رصد وتصميم ستوري تحدي <b>${cleanTitle}</b> بدقة 4K وإرسالها لك بنجاح! 🚀📱`,
                parse_mode: 'HTML'
            }
        }).catch(e => console.warn('[Auto-Watcher Alert notice]', e.message));

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

            const res = await this.autoDesignAndSend(target, forceSend);
            return { success: true, newFound: true, result: res };
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
