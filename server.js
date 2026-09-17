const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const autoWatcher = require('./auto-watcher-engine');

let puppeteer = null;
try {
    puppeteer = require('puppeteer-core');
} catch (e) {
    console.warn('[Native Engine] puppeteer-core not loaded:', e.message);
}

let sparticuzChromium = null;
try {
    sparticuzChromium = require('@sparticuz/chromium');
} catch (e) {
    // Optional on Windows
}

// Known browser paths on Windows & Linux Cloud environments
const POSSIBLE_BROWSER_PATHS = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

async function getBrowserExecutable() {
    for (const p of POSSIBLE_BROWSER_PATHS) {
        if (fs.existsSync(p)) return p;
    }
    if (sparticuzChromium) {
        try {
            const p = await sparticuzChromium.executablePath();
            if (p) return p;
        } catch (e) {
            console.warn('[Sparticuz Chromium Notice]', e.message);
        }
    }
    return null;
}

let nativeBrowser = null;
let nativePage = null;
let renderQueue = Promise.resolve();

async function ensureNativePage(port) {
    if (nativePage && !nativePage.isClosed()) {
        return nativePage;
    }
    if (!puppeteer) return null;
    const execPath = await getBrowserExecutable();
    if (!execPath) return null;

    if (!nativeBrowser || !nativeBrowser.isConnected()) {
        const launchArgs = sparticuzChromium ? sparticuzChromium.args : [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--hide-scrollbars'
        ];
        nativeBrowser = await puppeteer.launch({
            executablePath: execPath,
            headless: sparticuzChromium ? sparticuzChromium.headless : 'new',
            args: launchArgs
        });
    }

    nativePage = await nativeBrowser.newPage();
    // Warm up the page by navigating to the studio
    try {
        await nativePage.goto(`http://127.0.0.1:${port}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await nativePage.waitForFunction(() => typeof window.selectTemplate === 'function', { timeout: 10000 });
        if (nativePage.evaluate) {
            await nativePage.evaluate(() => document.fonts && document.fonts.ready);
        }
    } catch (e) {
        console.warn('[Native Engine Warmup]', e.message);
    }
    return nativePage;
}

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf'
};

// Helper to fetch FUT.GG SBC page data (Captures COMPLETE card element directly from the site)
async function fetchFutGGSbcPage(targetUrl) {
    // 1. Try Puppeteer full card capture first for 100% authentic website design
    if (puppeteer) {
        const execPath = getBrowserExecutable();
        if (execPath) {
            let browser = null;
            try {
                browser = await puppeteer.launch({
                    executablePath: execPath,
                    headless: 'new',
                    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--hide-scrollbars']
                });
                const page = await browser.newPage();
                await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
                let resp = await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 25000 });

                // If URL was a 404 or shorthand, try auto-resolving slug from FUT.GG main SBC directory
                if (!resp || resp.status() === 404) {
                    const slugMatch = targetUrl.match(/\/sbc\/(?:[^\/]+\/)?([^\/]+)/i);
                    const slug = slugMatch ? slugMatch[1].toLowerCase().replace(/^[\d-]+/, '') : '';
                    if (slug) {
                        try {
                            await page.goto('https://www.fut.gg/sbc/', { waitUntil: 'networkidle2', timeout: 20000 });
                            const resolvedUrl = await page.evaluate((s) => {
                                const anchors = Array.from(document.querySelectorAll('a[href*="/sbc/"]'));
                                for (const a of anchors) {
                                    if (a.href.toLowerCase().includes(s)) return a.href;
                                }
                                return null;
                            }, slug);
                            if (resolvedUrl) {
                                await page.goto(resolvedUrl, { waitUntil: 'networkidle2', timeout: 25000 });
                            }
                        } catch(e) {}
                    }
                }

                // Find the main SBC card container on FUT.GG
                const cardFound = await page.evaluate(() => {
                    const candidates = Array.from(document.querySelectorAll('div[class*="group/sbc"], div[class*="rounded-lg"][class*="p-1"]'));
                    if (candidates.length > 0) {
                        candidates[0].setAttribute('id', 'futgg-captured-card');
                        return true;
                    }
                    const heading = document.querySelector('h1, h2, h3');
                    if (heading) {
                        let cur = heading;
                        while (cur && cur !== document.body) {
                            if (cur.offsetWidth > 350 && cur.offsetHeight > 180 && cur.offsetHeight < 600) {
                                cur.setAttribute('id', 'futgg-captured-card');
                                return true;
                            }
                            cur = cur.parentElement;
                        }
                    }
                    return false;
                });

                if (cardFound) {
                    const el = await page.$('#futgg-captured-card');
                    if (el) {
                        const rawBuffer = await el.screenshot({ type: 'png' });
                        const title = await page.evaluate(() => {
                            const h = document.querySelector('#futgg-captured-card h3, #futgg-captured-card h2, h1');
                            return h ? h.textContent.trim().replace(/^New/i, '').trim() : 'تحدي SBC';
                        });
                        await browser.close();
                        const base64Data = Buffer.isBuffer(rawBuffer) ? rawBuffer.toString('base64') : Buffer.from(rawBuffer).toString('base64');
                        const dataUrl = `data:image/png;base64,${base64Data}`;
                        return {
                            success: true,
                            title: title,
                            playerName: title,
                            sbcImage: dataUrl,
                            cardImage: dataUrl
                        };
                    }
                }
            } catch (err) {
                console.warn('[FUT.GG Puppeteer Capture Notice]', err.message);
            } finally {
                if (browser) {
                    try { await browser.close(); } catch(e) {}
                }
            }
        }
    }

    // 2. Fallback to HTTP parser if Puppeteer unavailable or on error
    return new Promise((resolve, reject) => {
        https.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : `https://www.fut.gg${res.headers.location}`;
                return fetchFutGGSbcPage(nextUrl).then(resolve).catch(reject);
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    let sbcImage = '';
                    const sbcImgMatch = data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+\/sbcs\/[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+futgg-player-item-card[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+player-item-card[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+player-item\/[^"'\s]+/i);
                    if (sbcImgMatch) {
                        sbcImage = sbcImgMatch[0].replace(/width=\d+/, 'width=500');
                    }

                    const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
                    let title = 'تحدي SBC';
                    if (titleMatch) {
                        title = titleMatch[1].replace(/ - EA SPORTS.*$/i, '').replace(/ - FUT\.GG.*$/i, '').trim();
                    }

                    if (!sbcImage) {
                        return reject(new Error('تعذر العثور على صورة التحدي في صفحة FUT.GG'));
                    }

                    resolve({
                        success: true,
                        title: title,
                        playerName: title,
                        sbcImage: `/api/image-proxy?url=${encodeURIComponent(sbcImage)}`,
                        cardImage: `/api/image-proxy?url=${encodeURIComponent(sbcImage)}`
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Helper to fetch FUT.GG player page data
function fetchFutGGPage(targetUrl) {
    return new Promise((resolve, reject) => {
        https.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Follow redirect
                const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : `https://www.fut.gg${res.headers.location}`;
                return fetchFutGGPage(nextUrl).then(resolve).catch(reject);
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    let cardImage = '';
                    const cardImgMatch = data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+futgg-player-item-card[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+player-item-card[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+player-item-social-small[^"'\s]+/i) ||
                                         data.match(/https:\/\/game-assets\.fut\.gg\/cdn-cgi\/image\/[^"'\s]+player-item\/[^"'\s]+/i);
                    
                    if (cardImgMatch) {
                        cardImage = cardImgMatch[0].replace(/width=\d+/, 'width=500');
                    }

                    const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
                    let playerName = 'اللاعب';
                    if (titleMatch) {
                        playerName = titleMatch[1].replace(/ EA FC.*$/i, '').replace(/ - FUT\.GG.*$/i, '').trim();
                    }

                    const descMatch = data.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
                    let rating = '84';
                    let position = 'ST';
                    let rarity = 'Gold Rare';

                    if (descMatch) {
                        const versionMatch = descMatch[1].match(/Latest version:\s*([^\d]+)\s+(\d{2})\s+([A-Z]+)/i) ||
                                             descMatch[1].match(/(\d{2})\s+([A-Z]+)/i);
                        if (versionMatch) {
                            if (versionMatch.length >= 4) {
                                rarity = versionMatch[1].trim();
                                rating = versionMatch[2].trim();
                                position = versionMatch[3].trim();
                            } else {
                                rating = versionMatch[1].trim();
                                position = versionMatch[2].trim();
                            }
                        }
                    }

                    if (!cardImage) {
                        return reject(new Error('تعذر العثور على بطاقة اللاعب في الصفحة'));
                    }

                    const proxiedImg = `/api/image-proxy?url=${encodeURIComponent(cardImage)}`;
                    resolve({
                        success: true,
                        title: playerName,
                        playerName,
                        rating,
                        position,
                        rarity,
                        cardImage: proxiedImg,
                        sbcImage: proxiedImg
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Universal Player & SBC Resolver (Supports FUTBIN, FUT.GG SBC & Players, ID, direct URL, Base64)
function resolveSbcOrPlayer(rawInput) {
    return new Promise((resolve, reject) => {
        let input = (rawInput || '').trim();
        if (!input) {
            return reject(new Error('يرجى وضع رابط من futbin أو fut.gg أو رقم ID اللاعب'));
        }

        // 1. Direct Base64 Data URL
        if (input.startsWith('data:image/')) {
            return resolve({
                success: true,
                title: 'صورة مخصصة',
                playerName: 'تحدي SBC',
                rating: '',
                position: '',
                rarity: '',
                cardImage: input,
                sbcImage: input
            });
        }

        // 2. Direct Image URL
        if (input.match(/^https?:\/\/.*\.(png|webp|jpg|jpeg)(\?.*)?$/i)) {
            const proxied = `/api/image-proxy?url=${encodeURIComponent(input)}`;
            return resolve({
                success: true,
                title: 'صورة من رابط',
                playerName: 'تحدي SBC',
                rating: '',
                position: '',
                rarity: '',
                cardImage: proxied,
                sbcImage: proxied
            });
        }

        // 3. Extract Player ID from FUTBIN, FUT.GG, or direct digits
        let playerId = null;
        const idInUrl = input.match(/(?:player|players)\/(\d+)/i) || input.match(/^(\d{4,8})$/);
        if (idInUrl) {
            playerId = idInUrl[1];
        }

        let targetUrl = input;
        if (playerId) {
            targetUrl = `https://www.fut.gg/players/${playerId}/`;
        } else if (input.includes('futbin.com')) {
            const anyDigits = input.match(/\/(\d{4,8})/);
            if (anyDigits) {
                targetUrl = `https://www.fut.gg/players/${anyDigits[1]}/`;
            }
        }

        // If targetUrl doesn't have protocol, add https://
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = `https://${targetUrl}`;
        }

        if (targetUrl.includes('fut.gg/sbc/')) {
            return fetchFutGGSbcPage(targetUrl).then(resolve).catch(reject);
        }

        fetchFutGGPage(targetUrl).then(resolve).catch(reject);
    });
}
const resolvePlayerCard = resolveSbcOrPlayer;

// Helper to proxy images for CORS safety
function proxyImage(imageUrl, clientRes) {
    try {
        const parsed = new URL(imageUrl);
        const protocol = parsed.protocol === 'https:' ? https : http;

        protocol.get(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.fut.gg/'
            }
        }, (imgRes) => {
            if (imgRes.statusCode >= 300 && imgRes.statusCode < 400 && imgRes.headers.location) {
                const nextUrl = imgRes.headers.location.startsWith('http') ? imgRes.headers.location : new URL(imgRes.headers.location, imageUrl).href;
                return proxyImage(nextUrl, clientRes);
            }
            clientRes.writeHead(imgRes.statusCode, {
                'Content-Type': imgRes.headers['content-type'] || 'image/webp',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400'
            });
            imgRes.pipe(clientRes);
        }).on('error', (err) => {
            clientRes.writeHead(500, { 'Content-Type': 'text/plain' });
            clientRes.end('Image proxy error: ' + err.message);
        });
    } catch (err) {
        clientRes.writeHead(400, { 'Content-Type': 'text/plain' });
        clientRes.end('Invalid Image URL');
    }
}

const DEFAULT_GEMINI_KEY = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6KylIL7Cl2oIxcpJchaGN1I5gSFQ6D9BLgoBi4N2_p4yw';

function callGemini(apiKey, userPrompt, activeTemplate = 'store_promo') {
    const key = apiKey || DEFAULT_GEMINI_KEY;
    const candidateModels = [
        'gemini-flash-lite-latest',
        'gemini-3.1-flash-lite-preview',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest'
    ];

    const templatePrompts = {
        store_promo: `المستخدم يعمل حصراً على قالب: (📱 ستوري المتجر الأصلية - store_promo).
هذا القالب مصمم لقصص إنستغرام (Story 9:16) ويتكون من شرائط نصوص ملونة مكدسة بأعلى الستوري (تشبه ملصقات إنستغرام الحماسية) مع كروت الحدث (2 أو 3 كروت) بالأسفل.
التعليمات الصارمة لهذا القالب:
- ضع "template": "store_promo" ولا تغيره أبداً.
- عدد الكروت (cardCount):
  * إذا طلب المستخدم صراحة "لاعبين 2" أو "كرتين" أو ذكر اسم لاعبين اثنين فقط: ضع "cardCount": 2 واقترح لاعبين اثنين فقط في suggestedPlayers.
  * إذا طلب 3 لاعبين، أو لاعبين بالجمع، أو لم يحدد رقماً: ضع "cardCount": 3 واقترح 3 لاعبين.
- شرائط النصوص الملونة المكدسة (banners):
  مصفوفة من 3 إلى 5 كائنات، كل كائن { "text": "...", "bg": "#HEX", "color": "#HEX" }:
  * شريط 1: توفر الكوينز أو الحسابات مع إيموجي (مثال: "متوفر الآن جميع كميات الكوينز 🤩" أو "متوفر جميع أنواع الحسابات بمتجرنا 🤩"). خلفية زرقاء "#0084FF" أو خضراء "#38B000" بنص أبيض "#FFFFFF".
  * شريط 2: أمان وضمان النادي (مثال: "والشحن عليه ضمان نادي كامل 🔒" أو "وضمان كامل للنادي 👌"). خلفية حمراء "#E50914" أو ثلجية "#E0F7FA" بنص داكن "#1E293B".
  * شريط 3: سرعة الشحن الفائقة (مثال: "وسرعة شحن خيالية المليون ينشحن خلال دقيقة 🔥🤯" أو "ومدة الشحن اقل من 5 دقائق 🤩🤯"). خلفية خضراء حيوية "#38B000" بنص أبيض "#FFFFFF".
  * شريط 4: الأسعار التنافسية أو ميزة الحساب (مثال: "وبأفضل الأسعار التنافسية 🥳👏" أو "كامل معلومات الحساب بتتغير ويصير الحساب ملكك 🔥👌"). خلفية زرقاء "#0084FF" أو صفراء "#FFF9C4" بنص غامق "#B45309".
  * شريط 5 (الأخير): دعوة الطلب بالخاص (CTA) مع أسهم (مثال: "للطلب على الخاص حياكم ⬇️⬇️"). خلفية سماوية فاتحة "#E1F5FE" أو كحلي داكن "#1E293B" بنص مناسب.
- اللاعبون المقترحون (suggestedPlayers):
  * كروت اقتصادية / بداية / رخاص: اختر من ["نونيز", "ديمبيلي", "لياو", "تونالي", "نكونكو", "كييزا", "ساكا"].
  * نجوم كبار / توتي / أبطال: اختر من ["مبابي", "فينيسيوس جونيور", "بيلينغهام", "هالاند", "رودري"].
- إذا طلب المستخدم أسعار تحت الكروت املأ: "card1Price", "card2Price", "card3Price" (مثال: "~8,500 كوينز").
- لا حاجة لكابشن طويل لأن الستوري لا يملك كابشن تغذية.`,

        trio: `المستخدم يعمل حصراً على قالب: (👑 تريو 3 لاعبين متداخلين - trio).
هذا القالب مصمم لمنشورات وبوستات التغذية على إنستغرام (Post 1:1 أو 4:5)، ويعرض 3 بطاقات رسمية متداخلة مع نصوص تسويقية وكابشن كامل.
التعليمات الصارمة لهذا القالب:
- ضع "template": "trio" ولا تغيره أبداً.
- "suggestedPlayers": مصفوفة من 3 لاعبين متناغمين تتناسب مع الفكرة (مثال: 3 مدافعين، أو ثلاثي هجوم، أو تشكيلة بداية).
- أسعار الكروت بالكوينز: "card1Price", "card2Price", "card3Price" (مثال: "~48,000 كوينز").
- "badgeText": شارة علوية بارزة (مثال: "⚡ تشكيلة بداية FC 27 النارية • شحن فوري وآمن 100%").
- "headline": عنوان رئيسي كخطاف تسويقي قوي يجذب عشاق اللعبة.
- "subheadline": نص تسويقي يقنع العميل بالشحن من متجر @shop_coin15 مع ذكر الضمان وشامل الضريبة.
- "ctaText": زر الدعوة للطلب (مثال: "اطلب كوينزك الآن بالخاص DM 📩").
- "caption": كابشن إنستغرام كامل واحترافي يبدأ بهوك مشوق، نقاط توضيحية لأسعار اللاعبين، مميزات الشحن، ودعوة للطلب مع هاشتاغات ذات صلة.`,

        market_drop: `المستخدم يعمل حصراً على قالب: (📉 هبوط أسعار السوق وفرصة الشحن - market_drop).
هذا القالب مخصص لبوستات إنستغرام لتنبيه اللاعبين بهبوط أو كراش سعر كرت نجم معين وتحفيزهم على سرعة الشحن لاقتناصه.
التعليمات الصارمة لهذا القالب:
- ضع "template": "market_drop" ولا تغيره أبداً.
- "suggestedPlayers": مصفوفة تحتوي على اسم اللاعب المعني بالهبوط (كرت واحد).
- "oldPrice": السعر القديم بالكوينز (مثال: "3,200,000").
- "newPrice": السعر المخفض الحالي بالكوينز (مثال: "2,450,000").
- "savingBadge": شارة التوفير (مثال: "وفر 750,000 كوينز الآن! 📉").
- "badgeText": شارة التنبيه (مثال: "🚨 تنبيه هبوط أسعار السوق").
- "headline": عنوان جذاب عن النزول وفرصة الشحن الفوري.
- "subheadline": نص توضيحي بأن السوق في أدنى مستوياته وفرصة الشحن قبل ارتفاع الويكند ليغ.
- "ctaText": زر الإجراء (مثال: "اطلب كوينزك الآن بالخاص DM واستغل النزول ⚡").
- "caption": كابشن إنستغرام تحليلي عن هبوط سعر الكرت وأهميته الفنية وتوفير الكوينز فورا.`,

        sbc: `المستخدم يعمل حصراً على قالب: (⚡ ستوري تحديات وترقيات الـ SBC - sbc).
هذا القالب مصمم لقصص إنستغرام (Story 9:16) لتقديم خدمات متجر @shop_coin15 للتحديات والترقيات (حل التحديات، شامل الكوينز والتنفيذ، باقات ترقيات من 50 إلى 1000 ترقية، ضمان النادي، سرعة التنفيذ).
ويتكون من شرائط نصوص ملونة مكدسة بأعلى الشاشة (banners) مع صورة التحدي أو كرت اللاعب بالأسفل.
التعليمات الصارمة لهذا القالب:
- ضع "template": "sbc" ولا تغيره أبداً.
- "sbcTitle": اسم التحدي أو الترقية (مثال: "ترقية 81+ اختيارية" أو "أيكون اختياري +88" أو "كافو 92 Winter Wildcards").
- شرائط النصوص الملونة المكدسة (banners): مصفوفة من 3 إلى 5 عناصر { "text": "...", "bg": "#HEX", "color": "#HEX" }:
  * شريط 1 (العنوان الجذاب): اسم الترقية أو نوع التحدي (مثال: "أقوى ترقية باللعبة الآن 🔥😁" أو "أيكون اختياري +88 🔥😁" أو "أقوى ظهير باللعبة متوفر في متجرنا 🤩"). خلفية زرقاء "#0084FF" بنص أبيض "#FFFFFF".
  * شريط 2 (عرض الخدمة): توفير الخدمة والأسعار وتنفيذ التحدي (مثال: "نسويلك الكمية الي تبيها و بأسعار ممتازة جداً 🚨" أو "نعملك البكج 3 مرات شامل الكوينز وتنفيذ التحديات 🤯" أو "نعملك اللاعب شامل الكوينز وتنفيذ التحديات بسعر ممتاز جداً 👌"). خلفية حمراء "#E50914" أو خضراء "#38B000" بنص أبيض "#FFFFFF".
  * شريط 3 (الضمان والسرعة): أمان النادي وسرعة التسليم (مثال: "وسرعة كبيره بتنفيذ الطلبات 👌" أو "وضمان كامل للنادي 🫡"). خلفية خضراء "#38B000" أو حمراء "#E50914" بنص أبيض.
  * شريط 4 (الكميات أو الأسعار): توفر الكميات (مثال: "متوفر من 50 ترقية لين 1000 ترقية وكل مازادت الترقيات قل السعر 👌" أو "من 50 ترقية لين 5000 🫡" أو "وبسعر ممتاز جداً 👌"). خلفية رملية "#FFE0B2" بنص "#B45309" أو صفراء.
  * شريط 5 (الدعوة للطلب بالخاص): دعوة للطلب مع أسهم (مثال: "للطلب على الخاص حياكم ⬇️⬇️"). خلفية وردية فاتحة "#FCE4EC" بنص داكن "#880E4F" أو سماوية.
- "suggestedPlayers": اسم اللاعب أو التحدي المقترح.`,

        potm: `المستخدم يعمل حصراً على قالب: (🏆 لاعب الشهر - Player of the Month - potm).
هذا القالب مخصص حصرياً للإعلان عن بطاقات وتحديات لاعبي الشهر (POTM) للدوريات الخمس الكبرى (Premier League, LaLiga, Serie A, Bundesliga, Ligue 1) وتقديم خدمات متجر @shop_coin15 لتقفيل التحدي وتوفير الكوينز اللازمة.
التعليمات الصارمة لهذا القالب:
- ضع "template": "potm" ولا تغيره أبداً.
- حدد الدوري المناسب في "league": واحد من ["pl", "laliga", "serie_a", "bundesliga", "ligue1"] بناء على اللاعب المذكور أو المطلوب (مثال: مبابي/فينيسيوس/يامال -> "laliga"، بالمر/ساكا/هالاند -> "pl"، كفاراتسخيليا/لاوتارو -> "serie_a"، موسيالا/كين -> "bundesliga"، ديمبيلي/باركولا -> "ligue1").
- "suggestedPlayers": مصفوفة تحتوي على اسم لاعب الشهر المطلوب (كرت واحد فقط).
- "playerName": اسم اللاعب بالإنجليزية أو العربية (مثال: "Kylian Mbappé" أو "Cole Palmer").
- "playerArName": اسم اللاعب بالعربية (مثال: "كيليان مبابي" أو "كول بالمر").
- "rating": تقييم بطاقة لاعب الشهر (مثال: "92" أو "88").
- "position": مركز اللاعب (مثال: "ST" أو "CAM" أو "RW").
- "badgeText": شارة علوية فخمة بالدوري ولاعب الشهر (مثال: "🏆 رسميـاً: لاعب الشهر في الدوري الإسباني • LaLiga POTM" أو "🦁 رسميـاً: كول بالمر لاعب الشهر في البريميرليغ").
- "headline": عنوان جذاب ناري يعلن عن نزول الكرت رسمياً في اللعبة (مثال: "نزل كرت مبابي 92 لاعب الشهر رسمياً! 👑🔥").
- "sbcCost": تكلفة التحدي في السوق وعدد التشكيلات المطلوبة بالكوينز (مثال: "~2,450,000 كوينز صافية (20 تشكيلة)" أو "~480,000 كوينز (6 تشكيلات)").
- "storeOffer": تفاصيل عرض وخدمة المتجر لتقفيل التحدي بدون تضحية بنجوم النادي وبأفضل سعر للكوينز (مثال: "نوفر لك كوينز التحدي كاملة شاملة الضريبة ونقفله بحسابك بدون ما تضحي بنجوم ناديك!").
- "subheadline": ميزات الشحن والضمان (مثال: "متوفر شحن وتغطية فورية لجميع المنصات (PS5 • XBOX • PC) بضمان شامل الضريبة والباند").
- "ctaText": زر الإجراء للطلب السريع بالخاص (مثال: "ارسل اسم اللاعب بالخاص ونقفل لك التحدي فوراً 📩").
- "caption": كابشن إنستغرام كامل ومحترف يحلل طاقات كرت لاعب الشهر، تكلفة التحدي بالسوق، وعرض المتجر للتقفيل مع هاشتاغات الدوريات وFC 27.`
    };

    const targetGuidance = templatePrompts[activeTemplate] || templatePrompts.store_promo;

    const systemPrompt = `أنت خبير تسويق محتوى ومصمم إعلانات أول محترف متخصص في مجتمع ألعاب EA FC 27 ومتجر شحن الكوينز (@shop_coin15).
مهمتك: فهم طلب وفكرة المستخدم بدقة والالتزام التام بالقالب الذي اختاره المستخدم.
${targetGuidance}

أرجع النتيجة حصراً بصيغة JSON نظيفة بدون أي علامات markdown:
{
  "template": "${activeTemplate}",
  "league": "pl",
  "cardCount": 3,
  "banners": [
    { "text": "متوفر الآن جميع كميات الكوينز 🤩", "bg": "#0084FF", "color": "#FFFFFF" },
    { "text": "والشحن عليه ضمان نادي كامل 🔒", "bg": "#E50914", "color": "#FFFFFF" },
    { "text": "وسرعة شحن خيالية المليون ينشحن خلال دقيقة 🔥🤯", "bg": "#38B000", "color": "#FFFFFF" },
    { "text": "وبأفضل الاسعار 🥳👏", "bg": "#0084FF", "color": "#FFFFFF" },
    { "text": "للطلب على الخاص حياكم ⬇️⬇️", "bg": "#E1F5FE", "color": "#1E293B" }
  ],
  "suggestedPlayers": ["لاعب 1", "لاعب 2", "لاعب 3"],
  "playerName": "",
  "playerArName": "",
  "rating": "",
  "position": "",
  "card1Price": "",
  "card2Price": "",
  "card3Price": "",
  "badgeText": "",
  "headline": "",
  "subheadline": "",
  "ctaText": "",
  "oldPrice": "",
  "newPrice": "",
  "savingBadge": "",
  "sbcCost": "",
  "storeOffer": "",
  "caption": "...",
  "marketingAngle": "شرح استراتيجية التصميم والتسويق لهذا القالب"
};`;

    const payload = JSON.stringify({
        contents: [
            {
                parts: [
                    { text: systemPrompt },
                    { text: `القالب النشط الحالي: ${activeTemplate}\nفكرة المستخدم وموضوع البوست المطلوب: ${userPrompt}` }
                ]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    function trySingleModel(model) {
        return new Promise((resolve, reject) => {
            const req = https.request({
                hostname: 'generativelanguage.googleapis.com',
                path: `/v1beta/models/${model}:generateContent?key=${key}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                }
            }, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const json = JSON.parse(body);
                            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (text) {
                                const parsed = JSON.parse(text);
                                return resolve(parsed);
                            }
                            return reject(new Error('Empty content received from model'));
                        } catch (e) {
                            return reject(new Error('Failed to parse model JSON output: ' + e.message));
                        }
                    }
                    return reject(new Error(`Model ${model} returned HTTP ${res.statusCode}: ${body.slice(0, 150)}`));
                });
            });
            req.on('error', reject);
            req.setTimeout(15000, () => {
                req.destroy();
                reject(new Error(`Model ${model} request timed out after 15s`));
            });
            req.write(payload);
            req.end();
        });
    }

    return (async () => {
        let lastError = null;
        for (const m of candidateModels) {
            try {
                const res = await trySingleModel(m);
                return res;
            } catch (err) {
                lastError = err;
                console.warn(`[Gemini Fallback] Model ${m} failed: ${err.message}. Trying next model...`);
            }
        }
        throw lastError || new Error('All Gemini models failed to respond');
    })();
}

// Helper for Telegram Bot API requests (Supports JSON and Multipart/form-data for image buffers)
function sendTelegramRequest({ botToken, endpoint, fields = {}, fileField = null, fileBuffer = null, fileName = null, fileMime = null }) {
    return new Promise((resolve, reject) => {
        if (!botToken) return reject(new Error('يرجى تزويد رمز البوت (Bot Token)'));
        
        let cleanToken = botToken.trim();
        const tokenMatch = cleanToken.match(/\d+:[A-Za-z0-9_-]+/);
        if (tokenMatch) {
            cleanToken = tokenMatch[0];
        } else {
            cleanToken = cleanToken.replace(/^bot/i, '');
        }

        // Clean chat_id if provided
        if (fields && fields.chat_id) {
            let cid = String(fields.chat_id).trim();
            const idMatch = cid.match(/-?\d+/);
            if (idMatch && !cid.startsWith('@')) {
                fields.chat_id = idMatch[0];
            }
        }

        if (fileField && fileBuffer) {
            // Multipart/form-data
            const boundary = '----ShopCoinTelegramBoundary' + Math.random().toString(36).substring(2);
            const chunks = [];

            for (const [key, val] of Object.entries(fields)) {
                if (val !== undefined && val !== null && val !== '') {
                    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`));
                }
            }

            chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${fileField}"; filename="${fileName || 'image.jpg'}"\r\nContent-Type: ${fileMime || 'image/jpeg'}\r\n\r\n`));
            chunks.push(fileBuffer);
            chunks.push(Buffer.from(`\r\n--${boundary}--\r\n`));

            const fullPayload = Buffer.concat(chunks);

            const req = https.request({
                hostname: 'api.telegram.org',
                path: `/bot${cleanToken}/${endpoint}`,
                method: 'POST',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Content-Length': fullPayload.length
                }
            }, (res) => {
                let resBody = '';
                res.on('data', c => resBody += c);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(resBody);
                        if (json.ok) {
                            resolve(json.result);
                        } else {
                            let desc = json.description || 'خطأ غير معروف من تيليجرام';
                            if (desc.includes('Unauthorized') || desc.includes('token')) {
                                desc = 'رمز البوت (Bot Token) غير صالح. تأكد من نسخه بدقة من @BotFather.';
                            } else if (desc.includes('chat not found')) {
                                desc = 'لم يتم العثور على المحادثة! تأكد من فتح البوت في تيليجرام والضغط على زر Start (/start) أولاً.';
                            } else if (desc.includes('bot was blocked')) {
                                desc = 'البوت محظور في حسابك! يرجى إلغاء حظر البوت في تيليجرام.';
                            }
                            reject(new Error(desc));
                        }
                    } catch (e) {
                        reject(new Error(`استجابة غير صالحة من تيليجرام: ${resBody.slice(0, 100)}`));
                    }
                });
            });

            req.on('error', (err) => reject(new Error('تعذر الاتصال بخوادم تيليجرام: ' + err.message)));
            req.setTimeout(25000, () => {
                req.destroy();
                reject(new Error('انتهت مهلة الاتصال مع خوادم تيليجرام (25s)'));
            });
            req.write(fullPayload);
            req.end();
        } else {
            // Standard JSON Request
            const payload = JSON.stringify(fields);
            const req = https.request({
                hostname: 'api.telegram.org',
                path: `/bot${cleanToken}/${endpoint}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                }
            }, (res) => {
                let resBody = '';
                res.on('data', c => resBody += c);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(resBody);
                        if (json.ok) {
                            resolve(json.result);
                        } else {
                            let desc = json.description || 'خطأ غير معروف من تيليجرام';
                            if (desc.includes('Unauthorized') || desc.includes('token')) {
                                desc = 'رمز البوت (Bot Token) غير صالح. تأكد من نسخه بدقة من @BotFather.';
                            } else if (desc.includes('chat not found')) {
                                desc = 'لم يتم العثور على المحادثة! تأكد من فتح البوت في تيليجرام والضغط على زر Start (/start) أولاً.';
                            }
                            reject(new Error(desc));
                        }
                    } catch (e) {
                        reject(new Error(`استجابة غير صالحة: ${resBody.slice(0, 100)}`));
                    }
                });
            });

            req.on('error', (err) => reject(new Error('تعذر الاتصال بخوادم تيليجرام: ' + err.message)));
            req.setTimeout(15000, () => {
                req.destroy();
                reject(new Error('انتهت مهلة الاتصال مع خوادم تيليجرام (15s)'));
            });
            req.write(payload);
            req.end();
        }
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const reqPath = decodeURIComponent(parsedUrl.pathname);

    // API: Fetch Player Card & SBC Asset (FUTBIN / FUT.GG / ID / Direct Image / Base64)
    if (reqPath === '/api/fetch-futgg' || reqPath === '/api/fetch-card' || reqPath === '/api/fetch-sbc') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const payload = JSON.parse(body || '{}');
                    const targetUrl = payload.url || payload.id || payload.image || '';
                    if (!targetUrl) {
                        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ success: false, error: 'يرجى إدخال الرابط أو الصورة' }));
                        return;
                    }
                    resolveSbcOrPlayer(targetUrl)
                        .then(result => {
                            if (result && (result.sbcImage || result.cardImage) && !result.imageUrl) {
                                result.imageUrl = result.sbcImage || result.cardImage;
                            }
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                            res.end(JSON.stringify(result));
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                            res.end(JSON.stringify({ success: false, error: err.message }));
                        });
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: e.message }));
                }
            });
            return;
        }

        const targetUrl = parsedUrl.searchParams.get('url') || parsedUrl.searchParams.get('id');
        if (!targetUrl) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ success: false, error: 'يرجى إدخال رابط التحدي أو اللاعب أو رقم الـ ID' }));
            return;
        }

        resolveSbcOrPlayer(targetUrl)
            .then(result => {
                if (result && (result.sbcImage || result.cardImage) && !result.imageUrl) {
                    result.imageUrl = result.sbcImage || result.cardImage;
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            });
        return;
    }

    // Handle CORS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // API: Image Proxy (Bypasses CORS for html2canvas)
    if (reqPath === '/api/image-proxy') {
        const imgUrl = parsedUrl.searchParams.get('url');
        if (!imgUrl) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing url');
            return;
        }
        proxyImage(imgUrl, res);
        return;
    }

    // API: Direct Server Download (Authentic HTTP Attachment Stream)
    if (reqPath === '/api/download-image' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const dataUrl = payload.dataUrl || payload.imageData;
                if (!dataUrl || typeof dataUrl !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ error: 'Missing dataUrl parameter' }));
                    return;
                }
                const filename = payload.filename || 'shop_coin15_export.jpg';
                const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const isPng = filename.toLowerCase().endsWith('.png');

                res.writeHead(200, {
                    'Content-Type': isPng ? 'image/png' : 'image/jpeg',
                    'Content-Disposition': `attachment; filename="${filename}"`,
                    'Content-Length': buffer.length,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(buffer);
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // API: AI Marketing & Content Generation (Gemini Engine)
    if (reqPath === '/api/ai-generate' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const userPrompt = payload.prompt || payload.idea || '';
                const userKey = payload.apiKey || '';
                const activeTemplate = payload.template || 'store_promo';

                if (!userPrompt.trim()) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'يرجى إدخال فكرة أو موضوع البوست المطلوب' }));
                    return;
                }

                const result = await callGemini(userKey, userPrompt, activeTemplate);
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(JSON.stringify({ success: true, data: result }));
            } catch (err) {
                console.error('[AI Generation Error]', err);
                res.writeHead(500, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ success: false, error: err.message || 'تعذر توليد الفكرة عبر الذكاء الاصطناعي' }));
            }
        });
        return;
    }

    // API: Telegram Webhook (Callback queries from inline buttons & chat messages)
    if (reqPath === '/api/telegram-webhook' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));

            try {
                const update = JSON.parse(body || '{}');
                if (autoWatcher && typeof autoWatcher.handleTelegramUpdate === 'function') {
                    await autoWatcher.handleTelegramUpdate(update);
                }
            } catch (err) {
                console.error('[Telegram Webhook Error]', err.message);
            }
        });
        return;
    }

    // API: Auto-detect Telegram Chat ID from getUpdates
    if (reqPath === '/api/telegram-get-chat-id') {
        const botToken = (parsedUrl.searchParams.get('botToken') || '8903974669:AAGv7_Wpb-0ujiNVTpnhdrXOXOOzOi8rHFg').trim();
        const cleanToken = botToken.replace(/^bot/i, '');
        https.get(`https://api.telegram.org/bot${cleanToken}/getUpdates`, (apiRes) => {
            let body = '';
            apiRes.on('data', c => body += c);
            apiRes.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.ok && json.result && json.result.length > 0) {
                        for (let i = json.result.length - 1; i >= 0; i--) {
                            const msg = json.result[i].message || json.result[i].channel_post || json.result[i].my_chat_member;
                            const chat = msg && (msg.chat || msg.from);
                            if (chat && chat.id) {
                                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                                res.end(JSON.stringify({
                                    success: true,
                                    chatId: String(chat.id),
                                    name: chat.first_name || chat.username || 'المستخدم'
                                }));
                                return;
                            }
                        }
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'لم يتم العثور على رسالة جديدة. تأكد من فتح البوت والضغط على Start أولاً!' }));
                } catch (e) {
                    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: e.message }));
                }
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ success: false, error: err.message }));
        });
        return;
    }

    // API: Telegram Test Connection
    if (reqPath === '/api/telegram-test' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const botToken = (payload.botToken || '').trim();
                const chatId = (payload.chatId || '').trim();

                if (!botToken) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'يرجى إدخال رمز البوت (Bot Token)' }));
                    return;
                }
                if (!chatId) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'يرجى إدخال معرّف المحادثة (Chat ID)' }));
                    return;
                }

                const msgText = `👋 <b>أهلاً بك!</b>\n\nتم ربط استوديو متجر <b>@shop_coin15</b> مع التليجرام بنجاح! 🎉\nالآن يمكنك إرسال أي تصميم بدقة 4K مع الكابشن بضغطة زر واحدة مباشرة إلى هاتفك لتنزيله ستوري. 🚀✨`;

                await sendTelegramRequest({
                    botToken,
                    endpoint: 'sendMessage',
                    fields: {
                        chat_id: chatId,
                        text: msgText,
                        parse_mode: 'HTML'
                    }
                });

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: true, message: 'تم إرسال رسالة الاختبار إلى حسابك في تليجرام بنجاح! 🎉' }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // API: Telegram Send Design & Caption
    if (reqPath === '/api/telegram-send' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const botToken = (payload.botToken || '').trim();
                const chatId = (payload.chatId || '').trim();
                const dataUrl = payload.dataUrl || '';
                const caption = (payload.caption || '').trim();
                const asDocument = !!payload.asDocument;

                if (!botToken || !chatId) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'يرجى ضبط رمز البوت (Bot Token) ومعرّف المحادثة (Chat ID) من الإعدادات أولاً' }));
                    return;
                }
                if (!dataUrl) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: 'لم يتم استلام بيانات صورة التصميم' }));
                    return;
                }

                const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                const fileBuffer = Buffer.from(base64Data, 'base64');
                const isPng = dataUrl.startsWith('data:image/png') || asDocument;

                const endpoint = asDocument ? 'sendDocument' : 'sendPhoto';
                const fileField = asDocument ? 'document' : 'photo';
                const fileName = `shop_coin15_${Date.now()}.${isPng ? 'png' : 'jpg'}`;
                const fileMime = isPng ? 'image/png' : 'image/jpeg';

                // Telegram caption limit is 1024 characters for media
                const photoCaption = caption.length > 1024 ? caption.slice(0, 1000) + '...' : caption;

                await sendTelegramRequest({
                    botToken,
                    endpoint,
                    fields: {
                        chat_id: chatId,
                        caption: photoCaption
                    },
                    fileField,
                    fileBuffer,
                    fileName,
                    fileMime
                });

                // If caption was long, send the full text in a second message
                if (caption.length > 1024) {
                    await sendTelegramRequest({
                        botToken,
                        endpoint: 'sendMessage',
                        fields: {
                            chat_id: chatId,
                            text: caption
                        }
                    }).catch(e => console.warn('[Telegram Full Caption Followup Warning]', e.message));
                }

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: true, message: 'تم إرسال التصميم والكابشن إلى تليجرام بنجاح! 🚀📱' }));
            } catch (err) {
                console.error('[Telegram Send Error]', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // API: Auto-Watcher Trigger (Manual or Automated Check & Design)
    if (reqPath === '/api/auto-watcher/trigger' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const forceSend = payload.forceSend !== undefined ? !!payload.forceSend : true;
                const customUrl = payload.url || null;

                let result;
                if (customUrl) {
                    result = await autoWatcher.autoDesignAndSend(customUrl, forceSend);
                } else {
                    result = await autoWatcher.checkAndProcessNewSbc(forceSend);
                }

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: true, data: result }));
            } catch (err) {
                console.error('[Auto-Watcher Trigger Error]', err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // API: Auto-Watcher Status
    if (reqPath === '/api/auto-watcher/status') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(autoWatcher.getStatus()));
        return;
    }

    // API: Check Native Engine Status
    if (reqPath === '/api/native-status') {
        const hasPuppeteer = !!puppeteer;
        getBrowserExecutable().then(browserPath => {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({
                available: !!(hasPuppeteer && browserPath),
                browserPath: browserPath ? path.basename(browserPath) : null
            }));
        }).catch(err => {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ available: false, error: err.message }));
        });
        return;
    }

    // API: Ultra 1:1 Native Chrome Render Engine (100% WYSIWYG)
    if (reqPath === '/api/render-native' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            renderQueue = renderQueue.then(async () => {
                try {
                    const payload = JSON.parse(body);
                    const { html, className, filename, format, quality } = payload;
                    
                    const page = await ensureNativePage(PORT);
                    if (!page) {
                        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ error: 'محرك المتصفح غير متوفر محلياً' }));
                        return;
                    }

                    const isSquare = className && (className.includes('canvas-square') || className.includes('canvas-post'));
                    const isPortrait = className && className.includes('canvas-portrait');
                    let targetWidth = 1080;
                    let targetHeight = 1920;
                    if (isSquare) {
                        targetWidth = 1080;
                        targetHeight = 1080;
                    } else if (isPortrait) {
                        targetWidth = 1080;
                        targetHeight = 1350;
                    } else {
                        targetWidth = 1080;
                        targetHeight = 1920;
                    }

                    // Set target viewport (deviceScaleFactor: 2 for Ultra-HD sharp export)
                    await page.setViewport({
                        width: targetWidth,
                        height: targetHeight,
                        deviceScaleFactor: 2
                    });

                    // Update DOM directly in persistent Chrome instance and enforce pure sharp 90-degree rectangle
                    await page.evaluate(async ({ html, className }) => {
                        const stage = document.getElementById('canvasScaleStage');
                        if (stage) {
                            stage.style.borderRadius = '0px';
                            stage.style.overflow = 'visible';
                            stage.style.boxShadow = 'none';
                            stage.style.border = 'none';
                        }
                        const el = document.getElementById('exportCanvas');
                        if (el) {
                            el.className = className;
                            el.innerHTML = html;
                            el.style.borderRadius = '0px';
                            el.style.boxShadow = 'none';
                            el.style.border = 'none';
                            el.style.margin = '0px';
                        }

                        // Explicit font pre-loading for the active font-family
                        if (className && className.includes('font-family-thmanyah')) {
                            try {
                                await Promise.all([
                                    document.fonts.load('400 24px "Thmanyah Sans"'),
                                    document.fonts.load('700 24px "Thmanyah Sans"'),
                                    document.fonts.load('900 24px "Thmanyah Sans"')
                                ]);
                            } catch (e) {}
                        } else if (className && className.includes('font-family-zain')) {
                            try {
                                await Promise.all([
                                    document.fonts.load('400 24px "Zain"'),
                                    document.fonts.load('700 24px "Zain"'),
                                    document.fonts.load('800 24px "Zain"'),
                                    document.fonts.load('900 24px "Zain"')
                                ]);
                            } catch (e) {}
                        } else {
                            try {
                                await Promise.all([
                                    document.fonts.load('400 24px "Alexandria"'),
                                    document.fonts.load('700 24px "Alexandria"'),
                                    document.fonts.load('900 24px "Alexandria"')
                                ]);
                            } catch (e) {}
                        }

                        if (document.fonts) await document.fonts.ready;
                        const imgs = Array.from(document.querySelectorAll('#exportCanvas img'));
                        await Promise.all(imgs.map(img => {
                            if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                            return new Promise(resolve => {
                                img.addEventListener('load', resolve, { once: true });
                                img.addEventListener('error', resolve, { once: true });
                                setTimeout(resolve, 4000); // 4s fallback safety timeout
                            });
                        }));
                        await new Promise(r => setTimeout(r, 120));
                        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                    }, { html, className });

                    const cardEl = await page.$('#exportCanvas');
                    if (!cardEl) {
                        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ error: 'عنصر التصميم غير موجود' }));
                        return;
                    }

                    const isPng = (format || '').toLowerCase() === 'png' || (filename || '').toLowerCase().endsWith('.png');
                    const buffer = await cardEl.screenshot({
                        type: isPng ? 'png' : 'jpeg',
                        quality: isPng ? undefined : (quality || 96)
                    });

                    const outFilename = filename || (isPng ? 'shop_coin15_native_4k.png' : 'shop_coin15_native_4k.jpg');

                    res.writeHead(200, {
                        'Content-Type': isPng ? 'image/png' : 'image/jpeg',
                        'Content-Disposition': `attachment; filename="${encodeURIComponent(outFilename)}"`,
                        'Content-Length': buffer.length,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    });
                    res.end(buffer);
                } catch (err) {
                    console.error('[Native Engine Error]', err);
                    if (!res.headersSent) {
                        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ error: err.message }));
                    }
                }
            }).catch(err => {
                console.error('[Native Queue Error]', err);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        });
        return;
    }

    // Static Files Handling
    let filePath = reqPath === '/' || reqPath === '' ? '/index.html' : reqPath;
    const safePath = path.normalize(path.join(__dirname, filePath));

    if (!safePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access Denied');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });

        fs.createReadStream(safePath).pipe(res);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`🚀 متجر shop_coin15 - استوديو التصاميم والمحتوى جاهز!`);
    console.log(`🌐 الرابط المحلي: http://localhost:${PORT}`);
    console.log(`⚡ أداة سحب كروت FUT.GG مفعّلة تلقائياً!`);
    console.log(`👑 محرك التصدير الجذري (Native 1:1 Chrome Engine) مفعّل!`);
    console.log(`====================================================`);

    // Initialize 8:00 PM Auto-Watcher immediately so it is always operational
    autoWatcher.init({
        port: PORT,
        ensureNativePage,
        sendTelegramRequest,
        resolveSbcOrPlayer
    });

    // Pre-warm native browser in background for lightning-fast exports
    ensureNativePage(PORT).then(p => {
        if (p) {
            console.log(`✅ [Native Engine] محرك المتصفح جاهز في الذاكرة لاستخراج صور 100% متطابقة وفورية!`);
        }
    }).catch(err => {
        console.warn(`⚠️ [Native Engine Warmup Notice] ${err.message}`);
    });
});
