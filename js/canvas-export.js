/**
 * High-Resolution Canvas Exporter for ShopCoin15
 * Isolated Sandbox Architecture (100% WYSIWYG, Zero Crop, Zero Scroll-Drift)
 */

const CanvasExporter = {
    // Default export resolution: '2k' (1440p QHD) or '1080p' (Full HD)
    resolution: '2k',

    setResolution(res) {
        if (res === '2k' || res === '1080p') {
            this.resolution = res;
            if (typeof window.updateResolutionUI === 'function') {
                window.updateResolutionUI(res);
            }
        }
    },

    async renderToCanvas(elementId, isJpg = true, customRes = null) {
        const source = document.getElementById(elementId);
        if (!source) {
            throw new Error('لم يتم العثور على عنصر المعاينة للتصدير!');
        }

        const isPortrait = source.classList.contains('canvas-portrait');
        const isSquare = source.classList.contains('canvas-square');

        const width = isPortrait ? 480 : isSquare ? 500 : 450;
        const height = isPortrait ? 600 : isSquare ? 500 : 800;

        // 1. Create an isolated off-screen sandbox at document root
        // Positioned offscreen (left: -9999px) so it never flashes or causes visual jump
        const sandbox = document.createElement('div');
        sandbox.style.position = 'fixed';
        sandbox.style.top = '0px';
        sandbox.style.left = '-9999px';
        sandbox.style.width = `${width}px`;
        sandbox.style.height = `${height}px`;
        sandbox.style.zIndex = '-99999';
        sandbox.style.pointerEvents = 'none';
        sandbox.style.overflow = 'hidden';
        sandbox.style.background = '#0B0D13';
        sandbox.style.direction = 'rtl';
        sandbox.style.borderRadius = '0px';
        sandbox.style.boxShadow = 'none';
        sandbox.style.border = 'none';
        sandbox.id = 'export_sandbox_runtime';
        const activeFont = (typeof appState !== 'undefined' && appState.fontFamily) || 'alexandria';
        const fontClass = `font-family-${activeFont}`;
        sandbox.className = (source.className || '').replace(/font-family-\w+/g, '').trim() + ` ${fontClass}`;

        const fontCssString = activeFont === 'thmanyah' 
            ? "'Thmanyah Sans', Alexandria, sans-serif" 
            : (activeFont === 'zain' ? "'Zain', Cairo, sans-serif" : "'Alexandria', Cairo, sans-serif");
        const fontStyleRule = `<style>#export_sandbox_runtime, #export_sandbox_runtime * { font-family: ${fontCssString} !important; }</style>`;

        // 2. Clone the live preview content with all user positions, scale, and text
        sandbox.innerHTML = fontStyleRule + source.innerHTML;

        // 3. Clean up interactive elements (handles, toolbars, outlines, guides)
        sandbox.querySelectorAll('.layer-toolbar, .layer-resize-handle, .snap-guide').forEach(el => el.remove());
        sandbox.querySelectorAll('.draggable-layer').forEach(el => {
            el.classList.remove('is-dragging', 'is-selected');
            el.style.outline = 'none';
            el.style.boxShadow = 'none';
        });

        // 4. Ensure all images inside sandbox are decoded
        const imgs = Array.from(sandbox.querySelectorAll('img'));
        await Promise.all(imgs.map(img => {
            if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
            return new Promise(r => { img.onload = r; img.onerror = r; });
        }));

        document.body.appendChild(sandbox);

        // Universal Arabic Baseline Optical Alignment Hook:
        // html2canvas miscalculates the vertical baseline of Arabic fonts (Alexandria, Cairo)
        // by using Latin character metrics, pushing Arabic glyphs ~25-28% too low.
        // By hooking CanvasRenderingContext2D text drawing methods during export,
        // we lift every Arabic word by (fontSize * 0.28) dynamically regardless of resolution or template!
        const origFillText = CanvasRenderingContext2D.prototype.fillText;
        const origStrokeText = CanvasRenderingContext2D.prototype.strokeText;

        const hook = function(origFn) {
            return function(text, x, y, maxWidth) {
                let shift = 0;
                if (text && typeof text === 'string') {
                    const match = String(this.font || '').match(/([0-9.]+)px/);
                    const fontSize = match ? parseFloat(match[1]) : 14;
                    shift = fontSize * 0.40;
                }
                return origFn.call(this, text, x, y - shift, maxWidth);
            };
        };

        CanvasRenderingContext2D.prototype.fillText = hook(origFillText);
        CanvasRenderingContext2D.prototype.strokeText = hook(origStrokeText);

        try {
            // Ensure typography and Google Fonts are settled
            if (document.fonts) {
                await document.fonts.ready;
            }
            await new Promise(r => requestAnimationFrame(r));
            await new Promise(r => setTimeout(r, 60));

            // Target Resolution Scale Multiplier:
            // 2K Mode (QHD 1440p): Story -> 1440x2560 (scale 3.2), Portrait -> 1440x1800 (scale 3.0), Square -> 2048x2048 (scale 4.096)
            // 1080p Mode: Story -> 1080x1920 (scale 2.4), Portrait -> 1080x1350 (scale 2.25), Square -> 1080x1080 (scale 2.16)
            const currentRes = customRes || this.resolution || '2k';
            let targetWidth = 1080;
            if (currentRes === '2k') {
                targetWidth = isSquare ? 2048 : 1440;
            }
            const targetScale = targetWidth / width;

            const capturedCanvas = await html2canvas(sandbox, {
                scale: targetScale,
                useCORS: true,
                allowTaint: false,
                backgroundColor: isJpg ? '#FFFFFF' : null,
                logging: false,
                imageTimeout: 15000,
                width: width,
                height: height,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                windowWidth: width,
                windowHeight: height
            });

            // Solid background layer for flawless JPEG export
            let finalCanvas = capturedCanvas;
            if (isJpg) {
                const solidCanvas = document.createElement('canvas');
                solidCanvas.width = capturedCanvas.width;
                solidCanvas.height = capturedCanvas.height;
                const ctx = solidCanvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, solidCanvas.width, solidCanvas.height);
                ctx.drawImage(capturedCanvas, 0, 0);
                finalCanvas = solidCanvas;
            }

            return finalCanvas;
        } finally {
            // Restore original Canvas text methods
            CanvasRenderingContext2D.prototype.fillText = origFillText;
            CanvasRenderingContext2D.prototype.strokeText = origStrokeText;

            // Always clean up sandbox element
            if (sandbox.parentNode) {
                sandbox.parentNode.removeChild(sandbox);
            }
        }
    },

    // Method 1: Ultra 1:1 Native Chrome Engine (The Radical 100% WYSIWYG Solution)
    async downloadNative(elementId, format = 'jpg') {
        const isJpg = format.toLowerCase() === 'jpg' || format.toLowerCase() === 'jpeg';
        const ext = isJpg ? 'jpg' : 'png';
        const resTag = '4K_NATIVE';
        const filename = `shop_coin15_FC27_${typeof currentTemplate !== 'undefined' ? currentTemplate : 'design'}_${resTag}_${Date.now()}.${ext}`;

        const source = document.getElementById(elementId);
        if (!source) {
            alert('لم يتم العثور على عنصر المعاينة!');
            return;
        }

        const downloadBtns = document.querySelectorAll('.btn-download-action');
        downloadBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'pointer-events-none');
        });

        if (window.showCopyToast) {
            window.showCopyToast(`جاري استخراج الصورة بمحرك المتصفح الحقيقي (Native 100% Engine)... 👑⏳`);
        }

        try {
            // Clean up any temporary UI handles from clone if needed
            const clone = source.cloneNode(true);
            clone.querySelectorAll('.layer-toolbar, .layer-resize-handle, .snap-guide').forEach(el => el.remove());

            const activeFont = (typeof appState !== 'undefined' && appState.fontFamily) || 'alexandria';
            const fontClass = `font-family-${activeFont}`;
            const targetClassName = (source.className || '').replace(/font-family-\w+/g, '').trim() + ` ${fontClass}`;

            const fontCssString = activeFont === 'thmanyah' 
                ? "'Thmanyah Sans', Alexandria, sans-serif" 
                : (activeFont === 'zain' ? "'Zain', Cairo, sans-serif" : "'Alexandria', Cairo, sans-serif");
            const fontStyleRule = `<style>#exportCanvas, #exportCanvas * { font-family: ${fontCssString} !important; }</style>`;

            const res = await fetch('/api/render-native', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    html: fontStyleRule + clone.innerHTML,
                    className: targetClassName,
                    filename: filename,
                    format: ext,
                    quality: 98
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'تعذر الاتصال بمحرك السيرفر');
            }

            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

            if (window.showCopyToast) {
                window.showCopyToast(`تم استخراج وتنزيل الصورة بمحرك المتصفح الأصلي 100% متطابقة تماماً! 👑🎯`);
            }
            return true;
        } catch (err) {
            console.warn('[Native Engine Notice] Falling back to client canvas:', err.message);
            // Seamless client-side fallback
            return this.exportCanvas(elementId, format, filename);
        } finally {
            downloadBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    },

    async exportCanvas(elementId, format = 'jpg', filename = null) {
        const isJpg = format.toLowerCase() === 'jpg' || format.toLowerCase() === 'jpeg';
        const ext = isJpg ? 'jpg' : 'png';
        const mimeType = isJpg ? 'image/jpeg' : 'image/png';
        const resTag = (this.resolution || '2k').toUpperCase();

        if (!filename) {
            filename = `shop_coin15_FC27_${typeof currentTemplate !== 'undefined' ? currentTemplate : 'design'}_${resTag}_${Date.now()}.${ext}`;
        }

        // If running under HTTP server, use the Native 1:1 Engine for flawless export
        if (window.location.protocol.startsWith('http')) {
            try {
                const nativeSuccess = await this.downloadNative(elementId, format);
                if (nativeSuccess) return;
            } catch (e) {
                console.warn('[Auto-Native fallback to canvas]', e);
            }
        }

        const downloadBtns = document.querySelectorAll('.btn-download-action');
        downloadBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'pointer-events-none');
        });

        try {
            const canvas = await this.renderToCanvas(elementId, isJpg);
            const dataUrl = canvas.toDataURL(mimeType, isJpg ? 0.98 : 1.0);

            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            if (window.showCopyToast) {
                window.showCopyToast(`تم تنزيل التصميم (${ext.toUpperCase()}) بدقة ${resTag} (${canvas.width}x${canvas.height}) فائقة النقاء! 🚀`);
            }
        } catch (error) {
            console.error('Export Error:', error);
            alert('حدث خطأ أثناء تصدير الصورة: ' + error.message);
        } finally {
            downloadBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    },

    downloadImage(elementId, filename = null) {
        return this.downloadNative(elementId, 'jpg');
    },

    downloadJpg(elementId) {
        return this.downloadNative(elementId, 'jpg');
    },

    downloadPng(elementId) {
        return this.downloadNative(elementId, 'png');
    },

    // Method 2: Direct Server Download (Authentic HTTP Attachment Stream)
    async downloadViaServer(elementId, format = 'jpg') {
        return this.downloadNative(elementId, format);
    },

    // Method 3: Open High-Res Modal with Direct Save-As & Right-Click
    async openImageModal(elementId) {
        const downloadBtns = document.querySelectorAll('.btn-download-action');
        downloadBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'pointer-events-none');
        });

        const resTag = (this.resolution || '2k').toUpperCase();
        if (window.showCopyToast) {
            window.showCopyToast(`جاري تجهيز الصورة بدقة ${resTag} للمعاينة والحفظ... ⏳`);
        }

        try {
            const canvas = await this.renderToCanvas(elementId, true);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
            const filename = `shop_coin15_FC27_${resTag}_${Date.now()}.jpg`;

            let modal = document.getElementById('highResImageModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'highResImageModal';
                modal.className = 'fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none';
                document.body.appendChild(modal);
            }

            modal.innerHTML = `
                <div class="relative max-w-2xl w-full bg-[#0E0F15] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col items-center animate-fade-in" style="max-height: 94vh;">
                    <div class="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <div class="flex items-center gap-2">
                            <span class="text-emerald-400 font-black text-sm">📸 حفظ مباشر (كليك يمين > Save Image As)</span>
                            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">دقة ${resTag} فائقة الوضوح (${canvas.width}x${canvas.height})</span>
                        </div>
                        <button onclick="document.getElementById('highResImageModal').remove()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500 text-white font-bold flex items-center justify-center transition">✕</button>
                    </div>

                    <div class="overflow-auto flex-1 w-full flex items-center justify-center py-2" style="max-height: 65vh;">
                        <img id="modalPreviewImg" src="${dataUrl}" alt="ShopCoin15 Export" class="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/15 cursor-zoom-in" title="انقر كليك يمين لاختيار Save image as">
                    </div>

                    <div class="w-full pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
                        <a href="${dataUrl}" download="${filename}" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 hover:opacity-90 transition">
                            ⬇️ حفظ إلى الجهاز (Download ${resTag} JPG)
                        </a>
                        <button onclick="window.open('${dataUrl}', '_blank')" class="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition">
                            🌐 فتح في تبويب مستقل
                        </button>
                        <button onclick="CanvasExporter.copyToClipboard('${elementId}')" class="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition">
                            📋 نسخ للحافظة
                        </button>
                    </div>
                    <p class="text-[11px] text-emerald-400/90 mt-2.5 text-center font-semibold">
                        💡 يمكنك أيضاً النقر بالزر الأيمن (كليك يمين) مباشرة على الصورة واختيار <b>"Save image as... / حفظ الصورة باسم"</b>
                    </p>
                </div>
            `;
        } catch (err) {
            console.error('Modal error:', err);
            alert('حدث خطأ أثناء فتح المعاينة: ' + err.message);
        } finally {
            downloadBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    },

    async copyToClipboard(elementId) {
        const downloadBtns = document.querySelectorAll('.btn-download-action');
        downloadBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'pointer-events-none');
        });

        try {
            const canvas = await this.renderToCanvas(elementId, false);
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    if (window.showCopyToast) {
                        window.showCopyToast('تم نسخ التصميم للحافظة بنجاح! الصقه في واتساب أو إنستا 📋✨');
                    }
                } catch(e) {
                    // Fallback to JPG download
                    this.downloadJpg(elementId);
                }
            });
        } catch (err) {
            console.error('Clipboard copy error:', err);
            this.downloadJpg(elementId);
        } finally {
            downloadBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    },

    /**
     * Real Hardware/Browser Screenshot (100% WYSIWYG Mirror)
     * Directly captures the browser rendering surface using Screen Capture API
     */
    async captureRealScreenshot(elementId = 'exportCanvas', format = 'jpg') {
        const source = document.getElementById(elementId);
        if (!source) {
            alert('لم يتم العثور على عنصر المعاينة للتصوير!');
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            alert('عذراً، متصفحك لا يدعم ميزة التقاط الشاشة المباشرة. يمكنك استخدام زر "تحميل 2K JPG" العادي.');
            return;
        }

        const downloadBtns = document.querySelectorAll('.btn-download-action');
        downloadBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'pointer-events-none');
        });

        try {
            if (typeof window.showCopyToast === 'function') {
                window.showCopyToast('اختر تبويب الصفحة الحالية (This Tab) لالتقاط السكرين شوت 📸');
            }

            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: 'browser',
                    frameRate: { ideal: 30 }
                },
                audio: false,
                preferCurrentTab: true
            });

            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true;
            await video.play();

            // Allow video stream frame to render cleanly
            await new Promise(r => setTimeout(r, 350));

            // Viewport snapshot
            const fullCanvas = document.createElement('canvas');
            fullCanvas.width = video.videoWidth;
            fullCanvas.height = video.videoHeight;
            const fullCtx = fullCanvas.getContext('2d');
            fullCtx.drawImage(video, 0, 0);

            // Immediately stop stream to remove any sharing indicator
            stream.getTracks().forEach(track => track.stop());

            // Compute exact element coordinates relative to window
            const rect = source.getBoundingClientRect();
            const scaleX = video.videoWidth / window.innerWidth;
            const scaleY = video.videoHeight / window.innerHeight;

            const cropX = Math.round(rect.left * scaleX);
            const cropY = Math.round(rect.top * scaleY);
            const cropW = Math.round(rect.width * scaleX);
            const cropH = Math.round(rect.height * scaleY);

            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = cropW;
            cropCanvas.height = cropH;
            const cropCtx = cropCanvas.getContext('2d');
            cropCtx.drawImage(fullCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

            const isJpg = format.toLowerCase() === 'jpg' || format.toLowerCase() === 'jpeg';
            const ext = isJpg ? 'jpg' : 'png';
            const mimeType = isJpg ? 'image/jpeg' : 'image/png';
            const dataUrl = cropCanvas.toDataURL(mimeType, 0.98);

            const filename = `shop_coin15_FC27_screenshot_${Date.now()}.${ext}`;
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (typeof window.showCopyToast === 'function') {
                window.showCopyToast('تم التقاط سكرين شوت حقيقي وحفظه بنجاح! 📸🚀');
            }
        } catch (err) {
            console.error('Screenshot error:', err);
            if (err.name !== 'NotAllowedError') {
                alert('حدث خطأ أثناء أخذ لقطة الشاشة: ' + err.message);
            }
        } finally {
            downloadBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'pointer-events-none');
            });
        }
    }
};
