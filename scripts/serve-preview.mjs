// Bind only loopback; serves a local build, never publishes it.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.env.EXPORT_DIR || 'out');
const prefix = process.env.PREVIEW_BASE_PATH ?? '/portfolio';
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.vtt': 'text/vtt', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  if (prefix && !pathname.startsWith(`${prefix}/`)) { res.writeHead(404).end(); return; }
  let file = path.resolve(root, `.${pathname.slice(prefix.length)}`);
  if (!file.startsWith(`${root}/`) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file += '/index.html';
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end('Not found'); return; }
  const size = fs.statSync(file).size;
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.setHeader('Accept-Ranges', 'bytes');
  const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
  if (range) {
    const start = Number(range[1]); const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
    res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    fs.createReadStream(file, { start, end }).pipe(res); return;
  }
  res.setHeader('Content-Length', size); fs.createReadStream(file).pipe(res);
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${server.address().port}${prefix}/`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
