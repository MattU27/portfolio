/* eslint-disable @typescript-eslint/no-require-imports -- Local browser acceptance utility. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.connectOverCDP(process.env.PORTFOLIO_CDP);
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  page.on('console', e=>{if(e.type()==='error') errors.push(e.text());});
  const base=process.env.PORTFOLIO_URL || 'http://127.0.0.1:3000';
  const results=[];
  for(const width of [1440,768,360]) {
    const videoRequests=[];
    const listen=request=>{if(request.url().includes('/media/full-walkthrough.mp4'))videoRequests.push(request.url());};
    page.on('request',listen);
    await page.setViewportSize({width,height:1000});
    await page.goto(base,{waitUntil:'networkidle'});
    assert.equal(await page.locator('video').count(),0);
    assert.equal(await page.locator('.project-media').count(),0);
    assert.equal(videoRequests.length,0);
    const section=page.locator('.walkthrough');
    await section.scrollIntoViewIfNeeded();
    await section.locator('img').evaluate(img=>img.decode());
    if(width!==768) await section.screenshot({path:`review/full-walkthrough-${width}-closed.png`});
    const summary=section.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    const video=section.locator('video');
    await video.waitFor({state:'visible'});
    assert.equal(await section.locator('.walkthrough-thumbnail').isVisible(),false);
    const initial=await video.evaluate(v=>({autoplay:v.autoplay,paused:v.paused,preload:v.preload,controls:v.controls}));
    assert.deepEqual(initial,{autoplay:false,paused:true,preload:'none',controls:true});
    assert.equal(videoRequests.length,0);
    const info=await video.evaluate(async v=>{
      v.load();
      await new Promise((resolve,reject)=>{
        if(v.readyState>=1)return resolve();
        v.addEventListener('loadedmetadata',resolve,{once:true});
        v.addEventListener('error',()=>reject(new Error('Video load failed')),{once:true});
      });
      await v.play();
      return {duration:v.duration,width:v.videoWidth,height:v.videoHeight};
    });
    assert.ok(Math.abs(info.duration-298)<0.1);
    assert.equal(info.width,1280);
    assert.equal(info.height,720);
    await page.waitForFunction(()=>document.querySelector('video').currentTime>0.4);
    await video.evaluate(v=>v.pause());
    const seeks=[];
    for(const time of [44,90,150,205,240,280,297.5]) {
      await video.evaluate((v,t)=>{v.currentTime=t;},time);
      await page.waitForFunction(t=>{const v=document.querySelector('video');return !v.seeking&&Math.abs(v.currentTime-t)<0.15&&v.readyState>=2;},time);
      seeks.push(time);
    }
    const track=await video.evaluate(async v=>{
      const t=v.querySelector('track');t.track.mode='hidden';
      if(t.readyState!==2)await new Promise((resolve,reject)=>{t.addEventListener('load',resolve,{once:true});t.addEventListener('error',()=>reject(new Error('Chapter load failed')),{once:true});});
      return {cues:t.track.cues.length,kind:t.kind};
    });
    assert.equal(track.kind,'chapters');
    assert.equal(track.cues,5);
    await video.evaluate(v=>{v.currentTime=1;});
    await page.waitForFunction(()=>!document.querySelector('video').seeking);
    if(width!==768) await section.screenshot({path:`review/full-walkthrough-${width}-open.png`});
    await video.evaluate(v=>v.play());
    await summary.click();
    await page.waitForFunction(()=>document.querySelector('video').paused);
    assert.equal(await section.locator('.walkthrough-thumbnail').isVisible(),true);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    assert.equal(overflow,false);
    results.push({viewport:width,info,seeks,chapters:track,initial,closedDoesNotLoadVideo:true,keyboardDisclosure:true,pauseOnClose:true,overflow});
    page.off('request',listen);
  }
  assert.deepEqual(errors,[]);
  fs.writeFileSync('review/full-walkthrough-results.json',JSON.stringify({results,errors},null,2));
  console.log('Full walkthrough passed: 298s playback/seeking, lazy video loading, no autoplay, keyboard disclosure, chapters, pause on close, and responsive layouts.');
  await context.close();await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
