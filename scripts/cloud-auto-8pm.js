/**
 * Standalone Cloud Runner for GitHub Actions 8:00 PM SBC Job
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

async function run() {
    console.log('🚀 [Cloud 8PM Runner] Starting local server...');
    const serverProcess = spawn('node', ['server.js'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
    });

    serverProcess.on('error', (err) => {
        console.error('Server process error:', err);
        process.exit(1);
    });

    // Wait 5 seconds for server and Chrome warmup
    await new Promise(r => setTimeout(r, 5000));

    console.log('🤖 [Cloud 8PM Runner] Triggering Auto-Watcher check...');
    const postData = JSON.stringify({ forceSend: false });

    const result = await new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/auto-watcher/trigger',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve({ raw: body });
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });

    console.log('🏁 [Cloud 8PM Runner] Result:', JSON.stringify(result, null, 2));

    // Wait 2 seconds before clean shutdown
    await new Promise(r => setTimeout(r, 2000));
    serverProcess.kill('SIGTERM');
    process.exit(0);
}

run().catch(err => {
    console.error('Fatal Cloud Runner Error:', err);
    process.exit(1);
});
