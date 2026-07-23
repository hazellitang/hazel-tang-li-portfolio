# Hazel Tang — Interactive Portfolio

An editorial, cinematic React + Vite portfolio for commercial content, moving image, theatre production, and visual storytelling.

Current page order: Hero → About Me → Lichico/TikTok case → Films → Theatre → Core Skills → Contact.

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
- Page structure and interactions live in `src/App.tsx`.
- Visual tokens, responsive layout, and motion live in `src/styles.css`.
- Posters and the downloadable CV live in `public/`.

See `StackBlitz导入与编辑说明.md` for a non-technical import and editing guide.

The Figma capture helper in `index.html` is intentionally retained so the page can be recaptured into Figma later.
