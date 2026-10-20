/* eslint-disable @typescript-eslint/no-require-imports -- Independent local browser acceptance. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
(async()=>{
 const browser=await chromium.connectOverCDP(process.env.PORTFOLIO_CDP);
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage(); const base='http://127.0.0.1:3003/portfolio/';
 const errors=[],bad=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url());});page.on('request',r=>requests.push(r.url()));
 const results=[];
 for(const width of [360,768,1440]){
  requests.length=0;await page.setViewportSize({width,height:1000});await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('video').count(),0);assert.equal(requests.some(u=>u.includes('.mp4')),false);
  assert.equal(await page.locator('.project-proof').count(),2);
  const reserves=await page.locator('.project-proof img').evaluateAll(xs=>xs.map(x=>({width:x.width,height:x.height,w:x.getAttribute('width'),h:x.getAttribute('height'),loading:x.loading,alt:x.alt})));
  for(const r of reserves){assert.equal(r.w,'1280');assert.equal(r.h,'720');assert.equal(r.loading,'lazy');assert.ok(r.alt.length>30);assert.ok(r.width>0&&r.height>0);}
  for(const image of await page.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}
  const proofLinks=await page.locator('.project-proof figure > a').evaluateAll(xs=>xs.map(x=>({href:x.getAttribute('href'),label:x.getAttribute('aria-label'),target:x.target,rel:x.rel})));
  for(const link of proofLinks){assert.ok(link.href.startsWith('/portfolio/media/'));assert.ok(link.label.includes('new tab'));assert.equal(link.target,'_blank');assert.ok(link.rel.includes('noopener'));assert.equal((await context.request.get(new URL(link.href,base).href)).status(),200);}
  const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length,small:[...document.querySelectorAll('a,button,summary')].filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0&&!x.classList.contains('skip-link')&&r.height<43;}).map(x=>({text:x.textContent.trim(),height:x.getBoundingClientRect().height})),svgs:[...document.querySelectorAll('svg')].filter(x=>x.getAttribute('aria-hidden')!=='true'||x.getAttribute('focusable')!=='false').length,headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(x=>({level:+x.tagName[1],text:x.textContent.trim()}))}));
  assert.equal(metrics.overflow,false);assert.deepEqual(metrics.broken,[]);assert.equal(metrics.missingAlt,0);assert.deepEqual(metrics.small,[]);assert.equal(metrics.svgs,0);assert.equal(metrics.headings.filter(x=>x.level===1).length,1);
  for(let i=1;i<metrics.headings.length;i++)assert.ok(metrics.headings[i].level<=metrics.headings[i-1].level+1);
  assert.equal(await page.locator('.experience-company').filter({hasText:'GAKKEN Philippines'}).count(),2);
  assert.match(await page.locator('#experience').innerText(),/hands-on technical concerns/);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`review/refinement-${width}-full.png`,fullPage:true});await page.locator('#work').screenshot({path:`review/refinement-${width}-work.png`});
  await page.goto(base,{waitUntil:'networkidle'});await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Skip to content');
  const focus=await page.evaluate(()=>({style:getComputedStyle(document.activeElement).outlineStyle,width:getComputedStyle(document.activeElement).outlineWidth}));assert.equal(focus.style,'solid');assert.ok(parseFloat(focus.width)>=2);await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();assert.equal(new URL(page.url()).hash,'#work');
  for(const href of await page.locator('a[href^="#"]').evaluateAll(xs=>xs.map(x=>x.getAttribute('href'))))assert.equal(await page.locator(href).count(),1);
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await page.emulateMedia({reducedMotion:'no-preference'});
  const summary=page.locator('.walkthrough summary');await summary.focus();await page.keyboard.press('Enter');const video=page.locator('video');await video.waitFor({state:'visible'});
  assert.deepEqual(await video.evaluate(v=>({controls:v.controls,autoplay:v.autoplay,preload:v.preload,paused:v.paused})),{controls:true,autoplay:false,preload:'none',paused:true});
  const info=await video.evaluate(async v=>{v.load();if(v.readyState<1)await new Promise((res,rej)=>{v.addEventListener('loadedmetadata',res,{once:true});v.addEventListener('error',rej,{once:true});});await v.play();return{duration:v.duration,width:v.videoWidth,height:v.videoHeight};});assert.equal(info.duration,298);assert.equal(info.width,1280);assert.equal(info.height,720);await page.waitForFunction(()=>document.querySelector('video').currentTime>0.2);await video.evaluate(v=>v.pause());
  for(const t of [90,280,297]){await video.evaluate((v,t)=>{v.currentTime=t;},t);await page.waitForFunction(t=>{const v=document.querySelector('video');return v&&!v.seeking&&Math.abs(v.currentTime-t)<.2&&v.readyState>=2;},t);}
  const chapters=await video.evaluate(async v=>{const e=v.querySelector('track');e.track.mode='hidden';if(e.readyState!==2)await new Promise((res,rej)=>{e.addEventListener('load',res,{once:true});e.addEventListener('error',rej,{once:true});});return{kind:e.kind,cues:e.track.cues.length};});assert.deepEqual(chapters,{kind:'chapters',cues:5});await video.evaluate(v=>v.play());await summary.click();await page.waitForFunction(()=>document.querySelector('video').paused);
  const pdf=await context.request.get(new URL('/portfolio/resume/John_Matthew_Banto_Developer_Resume.pdf',base).href);assert.equal(pdf.status(),200);const bytes=await pdf.body();assert.equal(bytes.length,104363);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'9a4f103811b828171d7279495fa2260898da40888db222d56dd3b663a3939cbc');
  const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download résumé (PDF)'}).click();const download=await downloadPromise;assert.equal(await download.failure(),null);assert.equal(download.suggestedFilename(),'John_Matthew_Banto_Developer_Resume.pdf');
  results.push({width,reserves,proofLinks,metrics,keyboardSkipAndFocus:focus,anchors:true,reducedMotion:true,video:info,seeks:[90,280,297],chapters,pauseOnClose:true,resumeHashAndDownload:true});
 }
 const accessibility=[];
 for(const width of [360,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base,{waitUntil:'networkidle'});
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const report=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  fs.writeFileSync(`review/refinement-axe-${width}.json`,JSON.stringify(report,null,2));
  accessibility.push({width,violations:report.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:report.incomplete.map(v=>v.id)});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);fs.writeFileSync('review/refinement-results.json',JSON.stringify({base,results,accessibility,errors,bad},null,2));console.log('Refinement checks passed at360/768/1440.');await context.close();await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
