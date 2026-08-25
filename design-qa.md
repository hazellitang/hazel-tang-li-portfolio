# Lichico Case Study — Design QA

## Scope

- Updated only the Lichico project section.
- Preserved the existing navigation, typography, global palette and page structure.
- Reference visual language: `qa/reference-existing.png`.
- Final desktop capture: `qa/implementation-desktop.png` at 1440 × 1000.
- Side-by-side review: `qa/reference-vs-implementation.png`.

## Visual review

- The warm archive-paper palette, hairline rules, editorial serif headings and technical mono labels remain consistent with the existing portfolio.
- The project now follows a three-part story: Project Overview, Working Files and Campaign Outcome.
- Working files are limited to four high-value artifacts, with authentic source-document texture retained.
- The Black Friday and OGR outcomes use an equal two-column composition on desktop and a readable single-column sequence on mobile.
- Poster crops, local videos and BTS images preserve their intended aspect ratios without stretching.

## Interaction review

- Six local HTML5 videos switch correctly; the selected video loads with `readyState: 4` and no media error.
- Evidence and BTS images open and close in the lightbox.
- GSAP hover behavior is scoped to the Lichico evidence and BTS cards and cleans up on unmount.
- Desktop and 390 px mobile layouts report no horizontal overflow.
- Section anchors account for the fixed header.

## Build verification

- TypeScript project build: passed.
- Vite production build: passed.
- Final bundle: CSS 82.55 kB; JavaScript 380.43 kB before gzip.

passed
