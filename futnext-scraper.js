const path = require('path');
const fs = require('fs');

const FALLBACK_PACKS = [
    {
        id: 'futnext_foundations_xi_pack',
        name: 'Foundations XI Pack',
        arName: 'باكدج فاونديشن 11 (Foundations XI)',
        isPromo: true,
        img: 'https://game-assets.futnext.com/packs/22.png',
        desc: 'Includes 1 Gold Player Pick (1 of 5), rated 82 or higher and 1 Gold Player Pick (1 of 5), rated 81 or higher. Also includes 9 Gold Player Items. All items untradeable.',
        arDesc: 'يشمل باقة اختيار لاعب ذهبي (1 من 5) بتقييم 82+ ولاعب بتقييم 81+ و 9 لاعبين ذهبيين 🔥',
        expires: '⏳ متبقي: 4 أيام و 23 ساعة',
        points: '750 FC Points',
        cost: '60,000 كوينز',
        costRaw: '60K',
        headline: 'باكدج فاونديشن 11 نزل بالمتجر! فرصة نارية للووك أوت 🎁🔥',
        badgeText: '🚨 باكدج متجر حصري • ينتهي قريباً'
    },
    {
        id: 'futnext_baseline_gold_players_pack',
        name: 'Baseline Gold Players Pack',
        arName: 'باكدج بيسلاين الذهبي (Baseline Gold)',
        isPromo: true,
        img: 'https://game-assets.futnext.com/packs/3.png',
        desc: 'Includes 5 Gold Player Items, with 1 guaranteed to be rated 80 or higher.',
        arDesc: 'يشمل 5 لاعبين ذهبيين مع لاعب مضمون بتقييم 80 أو أعلى ⚡',
        expires: '⏳ متبقي: 4 أيام و 23 ساعة',
        points: '400 FC Points',
        cost: '25,000 كوينز',
        costRaw: '25K',
        headline: 'باكدج بيسلاين الذهبي نزل بالمتجر بـ 25 ألف كوينز فقط! ⚡🎁',
        badgeText: '⚡ باكدج اقتصادي وسريع بالمتجر'
    },
    {
        id: 'futnext_jumbo_rare_players_pack',
        name: 'Jumbo Rare Players Pack',
        arName: 'جامبو رير بلايرز (100K Pack)',
        isPromo: true,
        img: 'https://game-assets.futnext.com/packs/4.png',
        desc: '24 Rare Gold Players, all rare with guaranteed high-rated walkouts.',
        arDesc: '24 لاعب ذهبي نادر بالكامل مع ضمان نجوم ووك أوت وأيقونات 👑',
        expires: '⏳ متبقي: 24 ساعة فقط',
        points: '2,000 FC Points',
        cost: '100,000 كوينز',
        costRaw: '100K',
        headline: 'باكدج الـ 100K نزل بالمتجر! أكبر فرصة لاقتناص نجوم الميتا 💎🔥',
        badgeText: '🔥 باكدج الـ 100K الأقوى بالمتجر'
    },
    {
        id: 'futnext_ultimate_pack',
        name: 'Ultimate Pack',
        arName: 'ألتيميت باك (125K Pack)',
        isPromo: true,
        img: 'https://game-assets.futnext.com/packs/22.png',
        desc: '30 Rare Gold Players with the highest walkout probability.',
        arDesc: '30 لاعب ذهبي نادر مع أعلى نسبة لخروج نجوم التيم أوف ذا ويك والأيقونات 🌟',
        expires: '⏳ متبقي: 12 ساعة فقط',
        points: '2,500 FC Points',
        cost: '125,000 كوينز',
        costRaw: '125K',
        headline: 'باكدج الألتيميت 125K الخارق نزل بالمتجر! حان وقت الحظ الأسطوري 👑🎁',
        badgeText: '👑 الباكدج الملكي الأقوى • Ultimate Pack'
    }
];

async function scrapeFutnextPacks() {
    const dataDir = path.join(__dirname, 'data');
    const cacheFile = path.join(dataDir, 'futnext_packs.json');

    let puppeteer = null;
    try {
        puppeteer = require('puppeteer-core');
    } catch(e) {
        console.warn('[FUTNext] puppeteer-core not found, using fallback.');
        return getFallbackOrCached();
    }

    const possiblePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser'
    ];
    let execPath = possiblePaths.find(p => fs.existsSync(p));
    if (!execPath) {
        return getFallbackOrCached();
    }

    let browser = null;
    try {
        browser = await puppeteer.launch({
            executablePath: execPath,
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

        console.log('[FUTNext] Scraping active promo packs...');
        await page.goto('https://futnext.com/packs?category=2&page=1', { waitUntil: 'networkidle2', timeout: 15000 });
        await new Promise(r => setTimeout(r, 1500));

        const scraped = await page.evaluate(() => {
            const results = [];
            const images = Array.from(document.querySelectorAll('img[alt*="Pack"]'));

            images.forEach(img => {
                let card = img.parentElement;
                for (let i = 0; i < 8; i++) {
                    if (!card) break;
                    if (card.innerText.includes('COST') || card.innerText.includes('POINTS') || card.innerText.includes('EXPIRES')) break;
                    card = card.parentElement;
                }
                if (!card) return;

                const name = img.alt ? img.alt.trim() : '';
                const rawImg = img.src || '';
                const match = rawImg.match(/https:\/\/game-assets\.futnext\.com\/packs\/[0-9]+\.png/);
                const highResImg = match ? match[0] : rawImg;
                const lines = card.innerText.split('\n').map(l => l.trim()).filter(Boolean);

                let desc = '';
                let expires = '';
                let points = '';
                let cost = '';
                let avgReturns = '';

                for (let i = 0; i < lines.length; i++) {
                    const l = lines[i];
                    if (l === 'AVERAGE RETURNS' && lines[i+1]) avgReturns = lines[i+1];
                    if (l === 'EXPIRES' && lines[i+1]) {
                        expires = lines[i+1];
                        if (lines[i+2] && lines[i+2].includes('left')) expires += ' ' + lines[i+2];
                    }
                    if (l === 'POINTS' && lines[i+1]) points = lines[i+1];
                    if (l === 'COST' && lines[i+1]) cost = lines[i+1];
                    if (l.startsWith('Includes') || l.startsWith('Contains')) desc = l;
                }

                if (name) {
                    results.push({
                        name,
                        img: highResImg,
                        desc,
                        expires,
                        points,
                        cost,
                        avgReturns
                    });
                }
            });
            return results;
        });

        await browser.close();

        if (scraped && scraped.length > 0) {
            const enriched = scraped.map(p => {
                const costClean = p.cost ? (p.cost.endsWith('K') ? (parseInt(p.cost, 10) * 1000).toLocaleString('en-US') + ' كوينز' : p.cost + ' كوينز') : '60,000 كوينز';
                const timeClean = p.expires ? `⏳ متبقي: ${p.expires.replace('left', '').trim()}` : '⏳ متبقي: لفترة محدودة';
                return {
                    id: 'futnext_' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                    name: p.name,
                    arName: `باكدج ${p.name}`,
                    isPromo: true,
                    img: p.img,
                    desc: p.desc,
                    arDesc: p.desc,
                    expires: timeClean,
                    points: p.points ? `${p.points} FC Points` : '',
                    cost: costClean,
                    costRaw: p.cost,
                    avgReturns: p.avgReturns,
                    headline: `باكدج ${p.name} نزل بالمتجر الآن! لا تفوت فرصة الأيقون 🎁🔥`,
                    badgeText: `🚨 باكدج متجر حصري • ${timeClean}`
                };
            });

            // Also keep popular classic packs if available
            FALLBACK_PACKS.slice(2).forEach(fb => {
                if (!enriched.some(x => x.name.toLowerCase() === fb.name.toLowerCase())) {
                    enriched.push(fb);
                }
            });

            if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
            fs.writeFileSync(cacheFile, JSON.stringify(enriched, null, 2), 'utf-8');
            return enriched;
        }

        return getFallbackOrCached();
    } catch(err) {
        console.warn('[FUTNext] Scrape error, falling back:', err.message);
        if (browser) {
            try { await browser.close(); } catch(e){}
        }
        return getFallbackOrCached();
    }
}

function getFallbackOrCached() {
    const cacheFile = path.join(__dirname, 'data', 'futnext_packs.json');
    if (fs.existsSync(cacheFile)) {
        try {
            return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
        } catch(e){}
    }
    return FALLBACK_PACKS;
}

module.exports = {
    scrapeFutnextPacks,
    getFallbackOrCached,
    FALLBACK_PACKS
};
