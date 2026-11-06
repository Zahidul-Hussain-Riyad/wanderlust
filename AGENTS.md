# wanderlust

Next.js 16 App Router app (React 19, npm, single package). Routes live in `src/app`; feature components in `src/components`.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — bare `eslint` at repo root (flat config in `eslint.config.mjs`)
- `npm run build` — production build
- No test script exists; use `npm run lint` + `npm run build` as verification.

## Non-default config (next.config.ts)

- `cacheComponents: true` — async data must not break prerender; wrap dynamic async components in `<Suspense>`.
- `reactCompiler: true` — don't add manual `useMemo`/`useCallback`/`memo`; the compiler handles it (via `babel-plugin-react-compiler`).
- `partialPrefetching: true`
- Tailwind is v4 CSS-first: no `tailwind.config.js`; theme tokens live in `src/app/globals.css` (`@theme inline`); CSS compiles via Turbopack.

## shadcn/ui

- Style `base-nova` (`components.json`); CLI-generated components in `src/components/ui` (~63 files) — treat as generated code; build features in separate components.
- Path alias `@/*` → `src/*`; theme tokens available as Tailwind utilities (e.g. `bg-primary`, `text-muted-foreground`).
- Root layout (`src/app/layout.tsx`) sets the site font (Josefin Sans via `next/font`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
