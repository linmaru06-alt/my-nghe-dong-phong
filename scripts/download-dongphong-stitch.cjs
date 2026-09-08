const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.STITCH_API_KEY || '';
const PROJECT_ID = process.env.STITCH_PROJECT_ID || '15022634810535798204';
const MCP_URL = 'https://stitch.googleapis.com/mcp';

const OUT_DIR = path.resolve('stitch/designs');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    if (!url) return resolve(false);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`Lỗi tải file: ${dest}`, err.message);
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function fetchScreens() {
  console.log('📡 Đang truy xuất danh sách 27 màn hình của Mỹ Nghệ Đông Phong từ Stitch...');
  
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_screens',
        arguments: { projectId: PROJECT_ID }
      }
    })
  });

  const data = await res.json();
  const parsed = JSON.parse(data.result.content[0].text);
  const screens = parsed.screens || [];

  console.log(`✅ Tìm thấy ${screens.length} màn hình thiết kế. Bắt đầu tải về...`);

  const summary = [];

  for (let i = 0; i < screens.length; i++) {
    const s = screens[i];
    const screenId = s.name.split('/').pop();
    const safeTitle = (s.title || `screen-${i+1}`).replace(/[\/\\?%*:|"<>]/g, '_');
    const folderName = `${String(i + 1).padStart(2, '0')}_${safeTitle}`;
    const screenDir = path.join(OUT_DIR, folderName);

    if (!fs.existsSync(screenDir)) {
      fs.mkdirSync(screenDir, { recursive: true });
    }

    process.stdout.write(`[${i + 1}/${screens.length}] Đang tải: ${s.title}... `);

    let htmlSaved = false;
    let imgSaved = false;

    if (s.htmlCode?.downloadUrl) {
      await downloadFile(s.htmlCode.downloadUrl, path.join(screenDir, 'index.html'));
      htmlSaved = true;
    }

    if (s.screenshot?.downloadUrl) {
      await downloadFile(s.screenshot.downloadUrl, path.join(screenDir, 'screenshot.png'));
      imgSaved = true;
    }

    fs.writeFileSync(path.join(screenDir, 'metadata.json'), JSON.stringify(s, null, 2));

    summary.push({
      index: i + 1,
      id: screenId,
      title: s.title,
      deviceType: s.deviceType || 'DESKTOP',
      width: s.width,
      height: s.height,
      folder: path.relative(process.cwd(), screenDir),
      hasHtml: htmlSaved,
      hasScreenshot: imgSaved
    });

    console.log('Xong!');
  }

  fs.writeFileSync(path.join(OUT_DIR, 'dongphong-screens-summary.json'), JSON.stringify(summary, null, 2));
  console.log('\n🎉 ĐÃ TẢI HOÀN TẤT TOÀN BỘ 27 MÀN HÌNH MỸ NGHỆ ĐÔNG PHONG VÀO stitch/designs/');
}

fetchScreens().catch(console.error);
