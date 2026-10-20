// Run against a local production preview with Playwright available on NODE_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');

(async () => {
  const browser = await chromium.connectOverCDP(process.env.PORTFOLIO_CDP);
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  const errors = [];
  const failedResponses = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });
  const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
  fs.mkdirSync('review', { recursive: true });
  const results = [];
  for (const [name, width, height] of [['desktop', 1440, 1000], ['tablet', 768, 1024], ['mobile', 360, 800]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base, { waitUntil: 'networkidle' });
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    assert.match(await page.title(), /John Matthew Banto|Matt Banto/);
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll('main *')].filter(e => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
      }).map(e => e.tagName + '.' + e.className),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h === '#' || !document.getElementById(h.slice(1))),
      brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      smallTargets: [...document.querySelectorAll('a,button')].filter(e => !e.classList.contains('skip-link') && e.getBoundingClientRect().height < 43).map(e => e.textContent.trim()),
    }));
    assert.ok(layout.document <= width, JSON.stringify(layout));
    assert.deepEqual(layout.overflowing, []);
    assert.deepEqual(layout.brokenAnchors, []);
    assert.deepEqual(layout.brokenImages, []);
    assert.deepEqual(layout.smallTargets, []);
    await page.screenshot({ path: `review/${name}.png`, fullPage: true });
    if (name !== 'tablet') await page.screenshot({ path: `review/${name}-first-screen.png` });
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true }).click();
    await page.waitForFunction(() => location.hash === '#work');
    const copy = page.getByRole('button', { name: /Copy email/ });
    await copy.click();
    await page.getByRole('status').filter({ hasText: 'Email copied to clipboard.' }).waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'johnmatthewbanto333@gmail.com');
    results.push({ name, width, height, layout, navigation: 'passed', emailCopy: 'passed' });
  }
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: async () => { throw new Error('test denial'); } }));
  await page.getByRole('button', { name: /Copy email/ }).click();
  await page.getByRole('status').filter({ hasText: /Couldn’t copy/ }).waitFor();
  const links = await page.locator('a').evaluateAll(elements => elements.map(e => e.getAttribute('href')));
  assert.ok(links.includes('mailto:johnmatthewbanto333@gmail.com'));
  assert.ok(links.includes('https://github.com/MattU27'));
  assert.ok(links.includes('https://www.linkedin.com/in/john-matthew-banto-593008392/'));
  const resumeLinks = [...new Set(links.filter(h => h && h.endsWith('.pdf')))];
  assert.equal(resumeLinks.length, 1);
  const pdf = await context.request.get(base + resumeLinks[0]);
  assert.equal(pdf.status(), 200);
  const pdfBytes = await pdf.body();
  assert.equal(pdfBytes.length, 104363);
  assert.equal(crypto.createHash('sha256').update(pdfBytes).digest('hex'), '9a4f103811b828171d7279495fa2260898da40888db222d56dd3b663a3939cbc');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download résumé (PDF)' }).click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'John_Matthew_Banto_Developer_Resume.pdf');
  assert.equal(await download.failure(), null);
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Skip to content');
  const focus = await page.evaluate(() => ({ style: getComputedStyle(document.activeElement).outlineStyle, width: getComputedStyle(document.activeElement).outlineWidth }));
  assert.equal(focus.style, 'solid');
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#main');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.deepEqual(errors, []);
  assert.deepEqual(failedResponses, []);
  fs.writeFileSync('review/browser-results.json', JSON.stringify({ results, clipboardFailure: 'passed', resume: 'verified bytes and hash', keyboardSkipAndFocus: focus, reducedMotion: 'passed', errors, failedResponses }, null, 2));
  console.log('Passed responsive layouts, anchors, touch targets, clipboard success/failure, contact links, PDF bytes/hash, keyboard skip/focus, reduced motion, and console/network checks.');
  await context.close();
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
