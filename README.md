# OWCS Bracket Builder

An interactive OWCS 2025 World Finals bracket builder built with Nuxt 4 + Vue 3 + TailwindCSS.  
Pick winners, set scores (FT2/FT3/FT4), and share the entire bracket using a short encoded URL.

## Features

- **Live bracket editing** for all upper/lower/finals rounds (12-team double elimination).
- **Score-aware inputs** (auto-clamps based on series format and validates winner when max is reached).
- **Shareable state token**: compact byte-packed encoding → very short URLs (works with GitHub Pages base path).
- **Reset / clear controls**, clipboard copy helper, and dynamic stats (matches completed).
- **Participating Teams panel** with collapsible UX on mobile, team logos, roster roles, and lazy-loading icons.
- **Responsive UI** themed after Liquipedia, with animated collapsible transitions and custom footer.

## Stack & Tooling

- [Nuxt 4](https://nuxt.com/) + [Vue 3](https://vuejs.org/) + [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS 3](https://tailwindcss.com/) + custom gradients/components
- [Vite](https://vitejs.dev/) dev server
- TypeScript + composables (`useBracket`, `useTeamDetails`)
- GitHub Actions deployment to GitHub Pages

## Getting Started

Clone and install:

```bash
git clone https://github.com/nhansds/owcsBracket.git
cd owcsBracket
pnpm install
```

Run locally:

```bash
pnpm dev
# http://localhost:3000
```

Generate static build (used for GitHub Pages):

```bash
pnpm generate
# Output: .output/public
```

Preview production build:

```bash
pnpm preview
```

## GitHub Pages Deployment

This project ships with `.github/workflows/deploy.yml`. On every push to `main`:

1. Install deps with pnpm.
2. Run `pnpm generate`.
3. Publish `.output/public` to the `gh-pages` branch via `peaceiris/actions-gh-pages`.

## Project Structure

- `app/pages/index.vue` – layout, bracket sections, share/reset logic.
- `app/components/BracketRound.vue` & `BracketMatchCard.vue` – match rendering + score inputs.
- `app/components/TeamsList.vue` – collapsible roster grid with role icons.
- `app/components/TeamDetailsPanel.vue` – detailed view for hovered/clicked teams.
- `app/composables/useBracket.ts` – state management, propagation, encoding/decoding.
- `app/data/*.ts` – teams, matches, metadata.
- `public/teams` & `public/roles` – logos and role icons.

## Environment

- Node 20.x recommended (used in CI).
- Package manager: pnpm 9.x (`pnpm install`, `pnpm dev`, `pnpm generate`…).

## License

MIT © Nhans De Sousa. Default repository terms apply.
