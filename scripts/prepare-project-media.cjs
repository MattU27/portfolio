/* eslint-disable @typescript-eslint/no-require-imports -- Local CommonJS media preparation utility. */
// Reproducible local excerpts from the user-authorized existing walkthrough.
// No source recording is changed; only edited derivatives enter public/media.
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const source = process.argv[2];
if (!source || !fs.existsSync(source)) throw new Error('Pass the local source walkthrough path.');
const out = path.join(__dirname, '..', 'public', 'media');
fs.mkdirSync(out, { recursive: true });
const box = (x, y, w, h, enable) => `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=0x173f32:t=fill${enable ? `:enable='${enable}'` : ''}`;
const outputFrame = 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0x173f32,setsar=1';
const biddingOrganization = box(550, 335, 385, 34);
const biddingValues = [
  [468, 557, 300, 36], [468, 654, 300, 36],
  [820, 568, 85, 28], [820, 665, 85, 28],
  [980, 568, 120, 28], [980, 665, 120, 28],
  [1180, 568, 120, 28], [1180, 665, 120, 28],
  [1380, 568, 220, 28], [1380, 665, 220, 28],
].map(args => box(...args));
const biddingCrop = 'crop=1370:685:405:150';
const shipmentCrop = 'crop=1200:680:500:140';
function run(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`FFmpeg failed: ${result.status}`);
}
function excerpt(name, start, duration, filters) {
  run(['-ss', String(start), '-i', source, '-t', String(duration), '-map_metadata', '-1', '-an', '-vf', filters.join(','), '-r', '24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', path.join(out, name)]);
}
function still(name, timestamp, filters) {
  run(['-ss', String(timestamp), '-i', source, '-frames:v', '1', '-map_metadata', '-1', '-vf', filters.join(','), '-q:v', '2', '-y', path.join(out, name)]);
}
// Stable bid-price screen: crop excludes account/sidebar and bottom workflow names.
excerpt('e-bidding-excerpt.mp4', 112, 12, [biddingOrganization, ...biddingValues, biddingCrop, outputFrame]);
// The poster is an earlier empty form; only its organizational selection is concealed.
still('e-bidding-preview.jpg', 113, [biddingOrganization, biddingCrop, outputFrame]);
// Shipment form only: excludes account, requests list, addresses and tracking records.
// Stop before the calendar/date selection. Join the separate logistics stage;
// this is an edited excerpt, not a claim of an uninterrupted user session.
run(['-ss', '192', '-t', '15', '-i', source, '-ss', '212', '-t', '12', '-i', source,
  '-filter_complex', `[0:v]${shipmentCrop},${outputFrame},setpts=PTS-STARTPTS[v0];[1:v]${box(700, 499, 235, 42)},${shipmentCrop},${outputFrame},setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]`,
  '-map', '[v]', '-map_metadata', '-1', '-an', '-r', '24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', path.join(out, 'shipment-excerpt.mp4')]);
still('shipment-preview.jpg', 200, [shipmentCrop, outputFrame]);
fs.writeFileSync(path.join(out, 'e-bidding.vtt'), `WEBVTT

00:00.000 --> 00:12.000
Bid-price line items. Entered values concealed.
`);
fs.writeFileSync(path.join(out, 'shipment.vtt'), `WEBVTT

00:00.000 --> 00:15.000
Request direction, priority and required-field feedback.

00:15.000 --> 00:27.000
Logistics details. Entered cost concealed.
`);
console.log('Created two redacted excerpts, two screenshots and two caption tracks.');
