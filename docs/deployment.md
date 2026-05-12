# Deployment

The application will be deployed to Vercel as a React SPA generated with Vite. The recommended flow is to use GitHub as the main repository, GitHub Actions for automated validation, and Vercel for previews and production deployments.

## Target Environment

- Development and CI runtime: Node.js 20.
- UI framework: React with Vite.
- Hosting: Vercel.
- Version control: GitHub.
- Automation: GitHub Actions.

## Relevant Scripts

The main project commands are:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Expected usage:

- `npm run dev`: starts the local development server.
- `npm run build`: compiles TypeScript and generates the production build.
- `npm run lint`: validates code quality and style rules.
- `npm run preview`: serves the generated build locally.

## Branching Flow

A simple flow is recommended:

- `main`: stable branch deployable to production.
- Feature branches: functional changes, fixes, or documentation.
- Pull requests: review before merging into `main`.

Each pull request should run at least lint and build before being merged.

## GitHub Actions

The minimum recommended action should validate that the project installs dependencies, passes lint, and builds correctly with Node 20.

Base example:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
```

If tests are added in the future, they should also run in this workflow.

## Vercel

Expected Vercel configuration:

- Framework preset: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- Install command: `npm ci`.
- Node.js version: 20.

Vercel can connect directly to the GitHub repository to create:

- Preview deployments for pull requests.
- Production deployment when merging into `main`.

## Environment Variables

If the UI consumes an API, public variables for Vite must use the `VITE_` prefix.

Examples:

```text
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=production
```

Secrets must not be included in variables exposed to the frontend. Any secret should remain in backend services, serverless functions, or private provider configuration.

## Production Checklist

Before deploying to production:

- The build completes without errors.
- Lint reports no issues.
- The application has loading, error, and empty states.
- Forms validate the minimum required data.
- The UI works on mobile and desktop.
- Environment variables are configured in Vercel.
- Pull request previews are reviewed before merging.

## Rollback Strategy

Vercel allows reverting to a previous deployment from its dashboard. If a deployment introduces a critical issue:

1. Revert to the previous stable deployment in Vercel.
2. Create a fix in a separate branch.
3. Validate with GitHub Actions and a preview deployment.
4. Merge again into `main`.
