# Local verification — 20 October 2026

Tested the production build served at http://127.0.0.1:3000 in Chromium 155.

Full walkthrough update: replaced per-project snippets in the interface with one complete 298-second edited recording and an opening-frame poster. The final build, lint, TypeScript and responsive functional suite pass. Media playback, seeking, caption tracks, keyboard disclosure controls and layout pass at 1440px, 768px and 360px. See MEDIA-REVIEW.md and full-walkthrough-results.json for the source selections, privacy review and acceptance evidence. Raw review frames are excluded from Git tracking and public serving.

Portrait update: added the user-approved photo to the hero, with descriptive alternative text and responsive image loading. The public source copy matches the attachment SHA-256. Rebuilt and reran lint, TypeScript, and the full responsive browser check successfully; screenshots now include the portrait. Desktop accessibility scan again reports zero violations.

- Production build, ESLint, and TypeScript checks passed after the final contrast correction.
- At 1440×1000, 768×1024, and 360×800: no horizontal overflow, out-of-viewport content, broken section targets, broken images, or visible link/button targets below 44px high. Full-page screenshots were captured and visually reviewed on desktop and mobile.
- Work navigation clicked successfully at each size. All section link destinations exist. Mobile navigation remains visible.
- Keyboard Tab exposed the skip link with a 3px visible outline; Enter navigated to main content.
- Clipboard copying succeeded and the clipboard contained the correct address. A simulated clipboard rejection displayed the fallback message. The mailto link remains available.
- GitHub, LinkedIn, and email destinations match the supplied contacts. No messages were sent and no external contact application was launched.
- Both résumé links share one destination. HTTP response, PDF byte count, SHA-256, browser download event, and suggested filename all passed.
- Reduced-motion preference changes scroll behavior to `auto`.
- No browser console errors, page errors, or HTTP responses of 400 or above occurred in the functional acceptance run.
- Axe 4.12.1 reported **zero violations** on desktop and 360px mobile. Its one incomplete category concerns decorative arrow glyph contrast, which was visually reviewed. This is an automated audit plus visual/keyboard checks, not a full assistive-technology certification.
- `npm audit --omit=dev`: zero vulnerabilities. The full dependency audit reports five high entries propagated from an unresolved `braces` pattern-parsing denial-of-service issue in the ESLint development dependency chain. No forced downgrade or speculative override was applied.
- The original three export files retain their pre-edit SHA-256 hashes. The approved résumé source and served copy match the user-provided SHA-256.

## Evidence files

- `browser-results.json`: functional results and viewport measurements.
- `accessibility-desktop.json`, `accessibility-mobile.json`: automated accessibility reports.
- `desktop.png`, `tablet.png`, `mobile.png`: complete rendered pages.
- `desktop-first-screen.png`, `mobile-first-screen.png`: first-screen previews.

The browser script is `tests/browser-check.cjs`; it expects Playwright to be available and `PORTFOLIO_CDP` to name an existing local Chromium CDP endpoint. Set `PORTFOLIO_URL` to override the default URL. The run used Codex's bundled Playwright and a local agent-browser session; no Playwright runtime dependency was added to the portfolio.
