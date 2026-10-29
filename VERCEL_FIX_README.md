# Vercel build repair

This clean project fixes the failed Vercel build by restoring the missing source files:

- `src/FigmaSheet.tsx`
- `src/styles.css`
- `src/vite-env.d.ts`

It also excludes `node_modules`, `dist`, generated build files, and the duplicated files whose names end in ` 2` or ` 3`.

## Safest upload method (GitHub Desktop)

1. Quit the local development server if it is running.
2. In Finder, open `/Users/itspocket/Documents/GitHub/hazel-tang-li-portfolio`.
3. Make a backup copy of that folder first.
4. Keep the hidden `.git` folder. Replace all other visible project contents with the contents of this repaired folder.
5. Open GitHub Desktop. Confirm that the repository shows the restored source files and many deleted `node_modules`, `dist`, and duplicate files.
6. Commit with: `Fix Vercel build and clean repository`.
7. Push to `main`.
8. Vercel will redeploy automatically. The build command remains `npm run build`.

Do not upload `node_modules` or `dist` again. They are generated automatically during deployment.
