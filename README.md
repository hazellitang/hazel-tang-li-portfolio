# Hazel Tang — Interactive Portfolio

An editorial archive and personal scrapbook built with React + Vite + GSAP for moving image, production, visual research, commercial content, and theatre.

Current navigation: About Me → Work Outcome → Film Production → Theater → Skills.

The site includes a multilingual interface, responsive archive navigation, a poster-led Lichico outcome case, 4:3 film objects, full project narratives, explicit-playback video players, an accessible image lightbox, a theatre poster wall, and a connected skills research board.

GSAP powers the sequenced hero entrance, scroll-triggered editorial reveals, desktop navigation behavior, film/theatre card choreography, player expansion, project-drawer entrances, and gallery lightbox transitions. Motion is scoped and automatically cleaned up through `@gsap/react`; `prefers-reduced-motion` is respected throughout.

## Run locally

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Content updates

- About Me, project records, TikTok links, images, video links, and multilingual copy live in `src/data.ts`.
- Page structure, interactions, and GSAP timelines live in `src/App.tsx`.
- Visual tokens, responsive layout, and motion live in `src/styles.css`.
- Posters, stills, the downloadable CV, and web-ready media live in `public/`.

See `StackBlitz导入与编辑说明.md` for a non-technical import and editing guide.

The optional `?figma` reference sheet is intentionally retained so selected static frames can still be compared in Figma. The live website remains the source of truth for animation and video behavior.
