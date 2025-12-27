# Copilot / AI Agent Instructions for Aesthetix Studio

Purpose: quick, actionable notes to get an AI coding agent productive in this repo.

- **Run / build:**
  - Install: `npm install`
  - Dev server: `npm run dev` (Vite)
  - Build: `npm run build`; Preview: `npm run preview`
  - Set `GEMINI_API_KEY` in `.env.local` for AI features referenced by README.

- **Entry points & routing:**
  - App boots in `src/index.tsx` (configures Amplify from `amplify_outputs.json`).
  - Routes are defined in `src/App.tsx` with a `Layout` wrapper and nested pages (`src/pages/*`).
  - To add a new page: create `src/pages/MyPage.tsx`, import it in `src/App.tsx`, and add a `<Route path="my" element={<MyPage/>} />`.

- **UI / component patterns:**
  - Presentational components live under `src/components/` with subfolders `layout/` and `sections/`.
  - `Layout.tsx` exports `NAV_ITEMS` (source of truth for header/footer navigation).
  - Many section components accept flags like `isFullPage` and use `useNavigate`/`useLocation` for routing.
  - Assets are referenced with absolute paths from `public/` (e.g. `<img src="/images/about.webp" />`).

- **Types / data shapes:**
  - Shared interfaces live in `src/types.ts` (`NavItem`, `Project`, `Service`, `ProcessStep`).
  - When adding model-like data, follow these interfaces and extend only when necessary.

- **Styling & build tech:**
  - Uses Vite + React + TypeScript (`vite`, `@vitejs/plugin-react`).
  - Tailwind CSS configured via `tailwind.config.js` and `postcss.config.js`; base imports in `src/index.css`.
  - Use Tailwind utility classes; design tokens (e.g. `font-display`, `font-sans`, `bg-studio-base`) are used consistently.

- **Amplify / backend integration:**
  - `aws-amplify` is configured using `amplify_outputs.json`. If that file is empty the app will warn but still mount.
  - Backend code lives under `amplify/` — changes to backend require regenerate `amplify_outputs.json` and reconfiguring Amplify.
  - GraphQL endpoint and auth are present in `amplify_outputs.json` (AppSync + Cognito) — use Amplify libraries when interacting with backend.

- **Conventions & caveats:**
  - Prefer small, single-responsibility components located under `components/` and `sections/`.
  - Use `NAV_ITEMS` from `Layout.tsx` rather than duplicating navigation arrays.
  - Images/fonts live in `public/` and are referenced by root-relative paths; do not import binary assets into TSX unless necessary.
  - No test framework or linting configured in repo — avoid adding tests or linters without coordinating.

- **Examples**
  - Add a route (edit `src/App.tsx`):

```tsx
import NewPage from './pages/NewPage';
...
<Route path="new" element={<NewPage />} />
```

- **Files to inspect first when debugging or changing behavior:**
  - `src/index.tsx` (Amplify initialization)
  - `src/App.tsx` (routes)
  - `src/components/layout/Layout.tsx` (navigation, Outlet)
  - `src/components/sections/*` (examples of section structure and props)
  - `amplify_outputs.json` and `amplify/` (backend integration)
  - `tailwind.config.js`, `postcss.config.js`, `src/index.css` (styling pipeline)

If anything here is unclear or you'd like this tailored (more examples, tests, CI rules), tell me which area to expand.
