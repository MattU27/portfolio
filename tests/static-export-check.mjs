// Local-only static asset/HTTP verification; this does not replace browser QA.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
(async () => {
  const root = path.resolve(process.env.EXPORT_DIR || 'out');
  const prefix = process.env.PAGES_BASE_PATH || '';
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const assets = [...new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1].replaceAll('&amp;', '&')).filter(x => x.startsWith('/')))];
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (prefix && !pathname.startsWith(`${prefix}/`)) { res.writeHead(404).end(); return; }
    let file = path.join(root, pathname.slice(prefix.length));
    if (!file.startsWith(`${root}/`) && file !== root) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file += '/index.html';
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.pdf': 'application/pdf', '.vtt': 'text/vtt', '.mp4': 'video/mp4' })[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const asset of assets) {
      if (prefix) assert.ok(asset.startsWith(`${prefix}/`), `Missing prefix: ${asset}`);
      const response = await fetch(origin + asset); assert.equal(response.status, 200, asset); await response.arrayBuffer();
    }
    for (const name of ['/media/full-walkthrough.mp4', '/media/walkthrough-chapters.vtt', '/404.html']) {
      const response = await fetch(origin + prefix + name); assert.equal(response.status, 200, name); await response.arrayBuffer();
    }
    const pdf = await fetch(origin + prefix + '/resume/John_Matthew_Banto_Developer_Resume.pdf');
    assert.equal(pdf.headers.get('content-type'), 'application/pdf');
    const bytes = Buffer.from(await pdf.arrayBuffer()); assert.equal(bytes.length, 104363);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), '9a4f103811b828171d7279495fa2260898da40888db222d56dd3b663a3939cbc');
    const result = { prefix, assetsChecked: assets.length, directVideoChapters404: true, originalResumeHash: true, browserChecks: false };
    fs.mkdirSync('review/redesign', { recursive: true });
    fs.writeFileSync(`review/redesign/static-${prefix ? 'pages' : 'root'}.json`, JSON.stringify(result, null, 2) + '\n');
    console.log(result);
  } finally { await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
