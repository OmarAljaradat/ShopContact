/**
 * TikTok API Engine for ShopCoin15 Studio
 * Implements OAuth 2.0 and Content Posting API (v2)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'tiktok-config.json');
const TOKEN_FILE = path.join(DATA_DIR, 'tiktok-token.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('[TikTok Engine] Failed to read config:', e.message);
    }
    return {
        client_key: 'sbaw2mu1xu5lx5kicv',
        client_secret: 'p9SewTw0o45ZMprFGSSxpM6nA0yRq8Ef',
        redirect_uri: 'https://shopcoin15-studio.onrender.com/api/tiktok/callback',
        scopes: 'user.info.basic,video.upload'
    };
}

function getToken() {
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('[TikTok Engine] Failed to read token:', e.message);
    }
    return null;
}

function saveToken(tokenData) {
    try {
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('[TikTok Engine] Failed to save token:', e.message);
        return false;
    }
}

function getAuthUrl(stateParam) {
    const config = getConfig();
    const state = stateParam || 'shopcoin15_' + Date.now();
    const scopes = config.scopes || 'user.info.basic,video.upload';
    const redirect = encodeURIComponent(config.redirect_uri);
    return `https://www.tiktok.com/v2/auth/authorize/?client_key=${config.client_key}&scope=${scopes}&response_type=code&redirect_uri=${redirect}&state=${state}`;
}

async function exchangeCodeForToken(code) {
    const config = getConfig();
    const params = new URLSearchParams();
    params.append('client_key', config.client_key);
    params.append('client_secret', config.client_secret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', config.redirect_uri);

    const postData = params.toString();

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'open.tiktokapis.com',
            path: '/v2/oauth/token/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', async () => {
                try {
                    const json = JSON.parse(body);
                    const accessToken = (json.data && json.data.access_token) || json.access_token;
                    const refreshToken = (json.data && json.data.refresh_token) || json.refresh_token;
                    const openId = (json.data && json.data.open_id) || json.open_id;
                    const scope = (json.data && json.data.scope) || json.scope;
                    const expiresIn = (json.data && json.data.expires_in) || json.expires_in || 86400;
                    const refreshExpiresIn = (json.data && json.data.refresh_expires_in) || json.refresh_expires_in || 31536000;

                    if (accessToken) {
                        const tokenRecord = {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            open_id: openId,
                            scope: scope,
                            expires_at: Date.now() + (expiresIn * 1000),
                            refresh_expires_at: Date.now() + (refreshExpiresIn * 1000),
                            updated_at: new Date().toISOString()
                        };

                        // Attempt to fetch profile username
                        try {
                            const profile = await fetchUserInfo(tokenRecord.access_token);
                            if (profile) {
                                tokenRecord.username = profile.username || profile.display_name || 'shop_coin15';
                                tokenRecord.display_name = profile.display_name || 'ShopCoin15';
                                tokenRecord.avatar_url = profile.avatar_url || '';
                            } else {
                                tokenRecord.username = 'shop_coin15';
                            }
                        } catch (pErr) {
                            console.warn('[TikTok Engine] Profile lookup notice:', pErr.message);
                            tokenRecord.username = 'shop_coin15';
                        }

                        saveToken(tokenRecord);
                        resolve(tokenRecord);
                    } else {
                        const errMsg = json.error ? (json.error.message || json.error.code) : body;
                        reject(new Error(errMsg || 'فشل الحصول على تصريح تيك توك'));
                    }
                } catch (err) {
                    reject(new Error('استجابة غير صالحة من تيك توك: ' + body.slice(0, 150)));
                }
            });
        });

        req.on('error', err => reject(new Error('تعذر الاتصال بسيرفر تيك توك: ' + err.message)));
        req.setTimeout(25000, () => {
            req.destroy();
            reject(new Error('انتهت مهلة الاتصال مع تيك توك (25s)'));
        });
        req.write(postData);
        req.end();
    });
}

async function refreshAccessToken() {
    const token = getToken();
    if (!token || !token.refresh_token) {
        throw new Error('لا يوجد رمز تجديد (Refresh Token)');
    }

    const config = getConfig();
    const params = new URLSearchParams();
    params.append('client_key', config.client_key);
    params.append('client_secret', config.client_secret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', token.refresh_token);

    const postData = params.toString();

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'open.tiktokapis.com',
            path: '/v2/oauth/token/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    const newAccess = (json.data && json.data.access_token) || json.access_token;
                    const newRefresh = (json.data && json.data.refresh_token) || json.refresh_token;
                    const newExpires = (json.data && json.data.expires_in) || json.expires_in || 86400;

                    if (newAccess) {
                        token.access_token = newAccess;
                        if (newRefresh) token.refresh_token = newRefresh;
                        token.expires_at = Date.now() + (newExpires * 1000);
                        token.updated_at = new Date().toISOString();
                        saveToken(token);
                        resolve(token);
                    } else {
                        reject(new Error(json.error ? (json.error.message || json.error.code) : 'فشل تجديد رمز الدخول'));
                    }
                } catch (e) {
                    reject(new Error('خطأ في استجابة تيك توك للتجديد: ' + body.slice(0, 100)));
                }
            });
        });

        req.on('error', err => reject(err));
        req.write(postData);
        req.end();
    });
}

async function getValidAccessToken() {
    const token = getToken();
    if (!token || !token.access_token) return null;

    // If token expires in less than 5 minutes, refresh it automatically
    if (token.expires_at && token.expires_at - Date.now() < 300000) {
        try {
            console.log('[TikTok Engine] Access token near expiry, refreshing...');
            const refreshed = await refreshAccessToken();
            return refreshed.access_token;
        } catch (err) {
            console.warn('[TikTok Engine] Refresh failed, trying current token:', err.message);
        }
    }
    return token.access_token;
}

async function fetchUserInfo(accessToken) {
    return new Promise((resolve) => {
        const req = https.request({
            hostname: 'open.tiktokapis.com',
            path: '/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.data && json.data.user) {
                        resolve(json.data.user);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.end();
    });
}

/**
 * Publish a video buffer directly to TikTok via Content Posting API
 * @param {Buffer} videoBuffer - MP4 / WebM video buffer
 * @param {string} caption - Post title & hashtags
 * @param {string} privacyLevel - 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY'
 */
async function publishVideo(videoBuffer, caption, privacyLevel = 'SELF_ONLY') {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
        throw new Error('حساب تيك توك غير مربوط بعد. يرجى الضغط على زر ربط تيك توك أولاً!');
    }

    if (!videoBuffer || videoBuffer.length === 0) {
        throw new Error('ملف الفيديو غير موجود أو فارغ.');
    }

    // Step 1: Initialize Video Publish
    const initPayload = JSON.stringify({
        post_info: {
            title: caption || 'ريلز جديد من متجر shop_coin15 ⚽⚡ #fc27 #fifa #eafc',
            privacy_level: privacyLevel, // In Sandbox/Draft, SELF_ONLY is guaranteed to work immediately
            disable_duet: false,
            disable_stitch: false,
            disable_comment: false,
            video_cover_timestamp_ms: 1000
        },
        source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoBuffer.length,
            chunk_size: videoBuffer.length,
            total_chunk_count: 1
        }
    });

    console.log(`[TikTok Engine] Initializing publish (${(videoBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);

    const initResult = await new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'open.tiktokapis.com',
            path: '/v2/post/publish/video/init/',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(initPayload)
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.data && json.data.upload_url) {
                        resolve(json.data);
                    } else {
                        const msg = json.error ? `${json.error.code}: ${json.error.message}` : body;
                        reject(new Error(msg));
                    }
                } catch (e) {
                    reject(new Error('استجابة غير صالحة من تيك توك عند التهيئة: ' + body.slice(0, 100)));
                }
            });
        });

        req.on('error', err => reject(err));
        req.write(initPayload);
        req.end();
    });

    // Step 2: Upload Video binary chunks to upload_url
    console.log(`[TikTok Engine] Uploading binary to TikTok upload endpoint...`);
    const uploadUrl = new URL(initResult.upload_url);

    await new Promise((resolve, reject) => {
        const req = https.request({
            hostname: uploadUrl.hostname,
            path: uploadUrl.pathname + uploadUrl.search,
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Range': `bytes 0-${videoBuffer.length - 1}/${videoBuffer.length}`,
                'Content-Length': videoBuffer.length
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(true);
                } else {
                    reject(new Error(`فشل رفع ملف الفيديو (HTTP ${res.statusCode}): ${body.slice(0, 100)}`));
                }
            });
        });

        req.on('error', err => reject(err));
        req.write(videoBuffer);
        req.end();
    });

    console.log(`[TikTok Engine] Video uploaded successfully! Publish ID: ${initResult.publish_id}`);

    return {
        success: true,
        publishId: initResult.publish_id,
        message: 'تم إرسال الفيديو إلى تيك توك بنجاح! 🚀🎉'
    };
}

module.exports = {
    getConfig,
    getToken,
    saveToken,
    getAuthUrl,
    exchangeCodeForToken,
    refreshAccessToken,
    getValidAccessToken,
    fetchUserInfo,
    publishVideo
};
