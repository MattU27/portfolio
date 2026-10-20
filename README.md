# Matt Banto - developer portfolio

Portfolio for John Matthew Banto, a Manila-based full-stack developer. Built with Next.js, React, TypeScript and Tailwind CSS. Includes project summaries, experience, an approved resume, portrait and a complete 4:58 captioned proof-of-work video.

The walkthrough demonstrates E-Bidding and Shipment Tracking with fictional test data. The user confirmed all displayed details are dummy data and requested the uncensored recording. The original recording remains unchanged; the served copy is compressed to 1280 x 720. It loads on demand and has native playback controls.

## Local development

Requires Node.js 20.9+ and npm.

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Check with `npm run lint`, `npm run typecheck` and `npm run build`.

## GitHub Pages

The GitHub Actions workflow builds and deploys a static export on pushes to main. Enable Pages with GitHub Actions as the publishing source. The repository name becomes the site's path prefix. Images, video, captions and resume links support this prefix.

To create the same export locally:

```powershell
$env:GITHUB_PAGES='true'
$env:PAGES_BASE_PATH='/portfolio'
npm run build
```

The generated out/ folder is excluded from Git. No database, server credentials or paid hosting plan is required.

## Content and evidence

Profile and project copy: lib/content.ts. Main layout: app/page.tsx. Walkthrough: components/full-walkthrough.tsx. Local media preparation: scripts/prepare-full-walkthrough.cjs (requires the original source recording).

The approved resume is 104,363 bytes, SHA-256 9a4f103811b828171d7279495fa2260898da40888db222d56dd3b663a3939cbc. The original Stitch export code.html, DESIGN.md and screen.png is preserved for design reference; generated accomplishment claims from it were not treated as factual evidence. CONTENT-AUDIT.md and review/ document earlier implementation checks and revisions. Raw frame/OCR audit data and superseded media are excluded from Git.
