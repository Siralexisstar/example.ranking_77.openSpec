# ranking_77_ui

React 19 + TypeScript 6 + Vite 8 frontend scaffold for the ranking UI project.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm

## Scripts

- `npm run dev`: start the Vite dev server
- `npm run build`: run TypeScript project builds and create the production bundle
- `npm run format`: apply Biome formatting, lint fixes, and import organization
- `npm run check:biome`: validate formatting, linting, and import organization
- `npm run lint`: alias for `npm run check:biome`
- `npm run validate`: run Biome validation and the production build gate
- `npm run hooks:install`: install repository-managed Git hooks with Lefthook

## Code Quality

This repository uses [Biome](https://biomejs.dev/) as the primary formatter and linter, and [Lefthook](https://lefthook.dev/) to run repository-managed checks on commit and push.

- `pre-commit` runs Biome on staged supported files
- `pre-push` runs `npm run validate`
