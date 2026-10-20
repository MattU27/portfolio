# Local refinement acceptance - 21 October 2026

Local changes only; no commit, push or deployment. The existing repository was clean at the start (HEAD 19f6039). Existing framework, dependencies, Pages configuration and original export retained.

Ran npm run lint, npm run typecheck and the GitHub Pages static build with GITHUB_PAGES=true and PAGES_BASE_PATH=/portfolio. Existing browser-check.cjs and full-walkthrough-check.cjs passed. The PDF-request test now resolves the shared resume URL correctly when the test base includes /portfolio/.

Independent tests/refinement-check.cjs passed against the actual static export at 360, 768 and 1440 pixels: no overflow; decoded images with alt text; meaningful heading order; full-size screenshot links; touch target sizes; SVG decorative semantics; skip link and visible focus; anchors; reduced motion; no initial MP4 request; full video play, seek to 90/280/297 seconds, chapter cues and pause on close; approved resume hash and download. No page/console errors or 400+ responses. Axe scans at 360 and 1440 reported zero violations and zero incomplete checks.

Actual browser screenshots: refinement-{360,768,1440}-{full,work}.png. Desktop and mobile work sections were visually reviewed. The new evidence images total 142,184 bytes, use lazy loading and explicit 1280 x 720 dimensions to reserve layout space. Source checks are in refinement-preserved-assets.json; the approved resume, portrait and full video match HEAD byte for byte.

Limits: tested in Chromium using responsive desktop viewports, not physical phones, Safari, Firefox or a screen reader. Automated accessibility results do not establish full assistive-technology conformance. No fabricated technical decision or outcome was added. The user confirmed hands-on employee support and primarily system development during the internship, but did not supply a specific project architecture decision or challenge.

Older verification history follows below.

# Publishing update - 21 October 2026

Removed all censoring at the user's request after confirmation that the recording contains dummy data. Complete final video decoded without errors. Local lint, TypeScript and GitHub Pages export passed. GitHub Actions independently passed dependency installation, lint, TypeScript and the static export. The deployment is published at https://mattu27.github.io/portfolio/ from https://github.com/MattU27/portfolio.

The asset prefix is applied to the portrait, video, preview, chapters and resume, while local development retains root URLs. See pages-acceptance.json for independent browser acceptance results. Earlier entries below record prior revisions, including the now-superseded censored edit.

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

Publication approval: the user subsequently authorized committing, pushing and deploying this reviewed refinement on 21 October 2026. Earlier local-only notes describe the review stage.
