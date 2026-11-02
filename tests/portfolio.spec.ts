import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
const widths = [[320,568],[360,800],[390,844],[768,1024],[1024,768],[1440,900]];
for (const [width, height] of [[1024,768],[1440,900]]) test(`editorial opening exposes real work ${width}`, async ({ page }) => {
  await page.setViewportSize({width,height});
  await page.goto('./');
  await expect(page.locator('h1')).toHaveText('John Matthew Banto.');
  await expect(page.locator('.masthead img')).toHaveCount(0);
  await expect(page.locator('#about .profile-portrait img')).toHaveCount(1);
  const evidence = await page.locator('.project-01 .project-visual img').boundingBox();
  expect(evidence).not.toBeNull();
  expect(evidence!.y).toBeLessThan(height - 100);
  const opening = await page.locator('.masthead').boundingBox();
  expect(opening!.y + opening!.height).toBeLessThanOrEqual(440);
});
for (const [width,height] of widths) test(`responsive layout and accessibility ${width}`, async ({ page }) => {
  await page.setViewportSize({width,height});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('./');
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty('complete',true);
    expect(await img.evaluate(e=>(e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await expect(page.locator('h1')).toHaveCount(1);
  for(const href of await page.locator('a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')!))) await expect(page.locator(href)).toHaveCount(1);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(axe.violations).toEqual([]);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:`review/redesign/desktop-mobile-${width}.png`,fullPage:true});
  expect(errors).toEqual([]);
});
test('keyboard, anchors and reduced motion',async({page})=>{
  await page.goto('./');await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused();
  const focus=await page.locator('.skip-link').evaluate(e=>({width:getComputedStyle(e).outlineWidth,style:getComputedStyle(e).outlineStyle}));
  expect(parseFloat(focus.width)).toBeGreaterThanOrEqual(2);expect(focus.style).not.toBe('none');
  await page.keyboard.press('Enter');expect(new URL(page.url()).hash).toBe('#main');
  for(const name of ['Work','About','Experience','Contact']) {await page.getByRole('navigation').getByRole('link',{name:new RegExp(`^${name}`)}).click();expect(new URL(page.url()).hash).toBe(`#${name.toLowerCase()}`);}
  await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
test('video loads only on demand; plays, closes, reopens',async({page})=>{
  const requests:string[]=[];page.on('request',r=>{if(r.url().includes('.mp4')) requests.push(r.url())});
  await page.goto('./');await page.locator('.walkthrough').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
  expect(requests).toEqual([]);await expect(page.locator('video')).toHaveCount(0);
  const summary=page.locator('.walkthrough-player > summary');await summary.focus();await page.keyboard.press('Enter');
  const video=page.locator('video');await expect(video).toBeVisible();
  expect(await video.evaluate((v: HTMLVideoElement)=>({controls:v.controls,preload:v.preload,autoplay:v.autoplay,paused:v.paused}))).toEqual({controls:true,preload:'none',autoplay:false,paused:true});
  await video.evaluate(async (v: HTMLVideoElement)=>{v.load();await v.play()});await expect.poll(()=>video.evaluate((v: HTMLVideoElement)=>v.currentTime)).toBeGreaterThan(0);
  await summary.click();await expect(video).toHaveJSProperty('paused',true);
  await summary.click();await expect(video).toBeVisible();await expect(video).toHaveJSProperty('paused',true);
});
test('clipboard success and denial',async({page,context})=>{
  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('./');
  const button=page.getByRole('button',{name:/Copy email/});await button.click();
  await expect(page.getByRole('status')).toHaveText('Email copied to clipboard.');
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('johnmatthewbanto333@gmail.com');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('Denied'))}}));
  await button.click();await expect(page.getByRole('status')).toContainText('Use the email link or select the address');
});
test('resume original bytes and chapter paths',async({page,request})=>{
  await page.goto('./');const link=page.getByRole('link',{name:/Download résumé/});const href=await link.getAttribute('href');
  const response=await request.get(new URL(href!,page.url()).href);expect(response.status()).toBe(200);expect(response.headers()['content-type']).toContain('pdf');
  const bytes=await response.body();expect(bytes.length).toBe(104363);expect(createHash('sha256').update(bytes).digest('hex')).toBe('9a4f103811b828171d7279495fa2260898da40888db222d56dd3b663a3939cbc');
  const chapters=await request.get(new URL('./media/walkthrough-chapters.vtt',page.url()).href);expect(chapters.status()).toBe(200);expect(await chapters.text()).toContain('WEBVTT');
});
test('no-JS useful content and direct video fallback',async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(baseURL!);
  await expect(page.locator('h1')).toBeVisible();await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('a[href$="full-walkthrough.mp4"]').first()).toBeVisible();await context.close();
});
