@echo off
chcp 65001 >nul
title متجر ShopCoin15 - تشغيل الاستوديو المحلي
color 0A

echo ==========================================================
echo    🚀 جاري تشغيل استوديو متجر ShopCoin15 المحلي الفائق
echo ==========================================================
echo.

cd /d "c:\Users\omarj\OneDrive\Desktop\Contact ShopCoin15"

:: Check if port 3000 is already listening
netstat -ano | findstr :3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ السيرفر المحلي يعمل مسبقاً على المنفذ 3000!
) else (
    echo ⏳ جاري تشغيل خادم Node.js...
    start /min "ShopCoin15 Local Server" node server.js
    timeout /t 2 /nobreak >nul
)

echo 🌐 جاري فتح الاستوديو في المتصفح...
start http://localhost:3000/?suite=suite_reels

echo.
echo ==========================================================
echo  🎉 الاستوديو جاهز ويعمل الآن بنجاح!
echo  ⚡ سرعة التصدير: 5 إلى 8 ثوانٍ فقط بدقة 1080x1920 Full HD
echo  💾 سيتم حفظ الفيديوهات تلقائياً على سطح المكتب (Desktop)
echo ==========================================================
echo.
timeout /t 4
