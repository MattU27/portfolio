/* eslint-disable @typescript-eslint/no-require-imports -- Local media preparation utility. */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.join(__dirname, '..');
const source = process.argv[2];
if (!source || !fs.existsSync(source)) throw new Error('Source video is required.');
if (createHash('sha256').update(fs.readFileSync(source)).digest('hex') !== 'd36edddb24cbb0d7e8b7e202f860b84ff888c5be8faa4bf9e7f45d595a8813ca') throw new Error('Unexpected source recording.');
// The user confirmed all displayed details are dummy data and requested no masks.
function run(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error',...args],{cwd:root,stdio:'inherit'});if(r.status!==0)throw new Error('FFmpeg failed');}
run(['-i',source,'-map_metadata','-1','-an','-vf',"scale=1280:720",'-r','24','-c:v','libx264','-preset','medium','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','-y','public/media/full-walkthrough.mp4']);
run(['-ss','1','-i',source,'-frames:v','1','-map_metadata','-1','-vf','scale=1280:720','-q:v','2','-y','public/media/walkthrough-poster.jpg']);
fs.writeFileSync(path.join(root,'public/media/walkthrough-chapters.vtt'),`WEBVTT

00:00.000 --> 00:16.000
Introduction and contribution

00:16.000 --> 02:40.000
E-Bidding

02:40.000 --> 02:58.000
What I learned

02:58.000 --> 04:52.000
Shipment Tracking

04:52.000 --> 04:58.000
Closing
`);
console.log('Prepared complete 298-second uncensored walkthrough, opening-frame poster and chapter track.');

