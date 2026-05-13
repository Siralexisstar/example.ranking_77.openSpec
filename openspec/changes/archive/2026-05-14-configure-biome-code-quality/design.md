## Context

The repository is a Vite 8 + React 19 + TypeScript 6 application that currently exposes only an ESLint-based quality gate through `npm run lint`. Formatting, import ordering, and most style normalization are not enforced through a single repository-standard workflow, and the current setup does not run the same quality gate automatically on commit and push.

This change introduces a new primary code quality tool and must preserve the developer ergonomics of a small frontend codebase:
- local commands must be simple and package-manager driven;
- React-specific correctness coverage must remain comparable to the current ESLint setup;
- TypeScript type-checking must remain outside the formatter/linter flow;
- hook automation must work reliably for contributors using Git on different operating systems;
- JSON files must remain standards-compliant even though the JavaScript/TypeScript style baseline requires trailing commas where syntax permits them.

## Goals / Non-Goals

**Goals:**
- Make Biome the primary repository tool for formatting, linting, and import organization.
- Enforce the requested style baseline with double quotes, semicolons, and trailing commas in JavaScript-family files.
- Provide explicit local scripts for formatting and validation.
- Run code quality checks automatically on commit and push.
- Preserve the existing build-time type-check and Vite build gate as the source of truth for TypeScript correctness and release readiness.
- Replace the current ESLint-first workflow where Biome provides equivalent coverage for the active stack.

**Non-Goals:**
- Replacing TypeScript semantic type-checking with Biome.
- Adding CI-only behavior that differs from the local branch workflow.
- Expanding the change into test tooling, editor-specific workspace settings, or broader repository restructuring.
- Enabling HTML formatting for `index.html` in this first pass while Biome HTML support remains a lower-value target for this project.

## Decisions

### 1. Use `@biomejs/biome` as the single primary formatter and linter

Biome will become the main repository code quality tool for supported source and config files, replacing the current ESLint-first workflow. The implementation will remove `eslint.config.js` and the ESLint-specific dependencies once equivalent Biome coverage is in place.

Rationale:
- Biome combines formatting, linting, and import organization in one tool, which directly matches the requested simplification.
- The official CLI supports a single `check` command that runs formatting, linting, and import sorting together.
- Keeping both ESLint and Biome as first-class gates would create duplicate diagnostics and unclear ownership of style rules.

Alternatives considered:
- Keep ESLint for linting and add Biome only for formatting. Rejected because it keeps the current split-brain tooling model.
- Keep both tools in parallel for an extended transition. Rejected because this repository is still small enough to migrate in one focused change.

### 2. Create an explicit `biome.json` baseline aligned with the current stack

The Biome configuration will:
- enable Git VCS integration and respect `.gitignore`;
- ignore unknown file types so whole-repo commands can run safely from the repository root;
- explicitly set JavaScript and JSX quote style to double quotes;
- explicitly enforce semicolons and trailing commas for JavaScript-family files;
- keep CSS formatting enabled with double quotes;
- leave JSON valid and standards-compliant even though trailing commas are required for JavaScript-family files;
- enable import organization and retain React-focused lint coverage by relying on Biome recommended rules plus an explicit Fast Refresh-oriented rule.

The React-specific baseline will preserve the current quality intent by relying on Biome coverage for:
- hook call placement;
- exhaustive dependency validation;
- Fast Refresh-friendly component export structure.

For Vite compatibility, the Fast Refresh-oriented rule will be configured with the option that allows constant exports alongside components when appropriate.

Alternatives considered:
- Rely on Biome defaults without explicitly pinning the requested style decisions. Rejected because the change is meant to establish a visible repository policy, not rely on implicit defaults.
- Include `index.html` in the first configuration pass. Rejected because Biome documents HTML support as experimental, and formatting that file does not deliver enough immediate value to justify that risk.

### 3. Preserve familiar local npm entry points and add a full validation gate

The repository will expose a small command set through `package.json`:
- a formatting script that applies Biome fixes to supported files;
- a Biome validation script that checks formatting, linting, and import organization;
- a full validation script that combines the Biome validation step with the existing `tsc -b && vite build` gate.

The current `lint` entry point should be preserved as a contributor-friendly alias, but it will point to Biome-driven validation instead of ESLint.

Rationale:
- Contributors already expect quality checks to be available through npm scripts.
- A dedicated full validation script creates one reusable contract for push-time enforcement.
- Keeping the build gate separate honors the requirement that Biome does not replace TypeScript type-checking.

Alternatives considered:
- Expose only raw Biome commands and rely on developers to remember the right flags. Rejected because the acceptance criteria explicitly call for project scripts.

### 4. Use Lefthook for commit and push automation

The branch workflow automation will use Lefthook with:
- a `pre-commit` hook that runs Biome with safe write fixes against staged files;
- a `pre-push` hook that runs the full repository validation script.

Rationale:
- Biome’s official git hooks documentation provides first-class Lefthook recipes for staged-file and push-file workflows.
- Lefthook is cross-platform and can manage both `pre-commit` and `pre-push` without an extra staged-file helper dependency.
- This project is being worked on from Windows as well as Git-based branch workflows, so reducing shell-specific hook logic is valuable.

Alternatives considered:
- Husky plus lint-staged. Rejected because it adds an additional dependency and more moving parts for the same outcome.
- Raw shell hooks in `.git/hooks`. Rejected because repository-managed hook installation and cross-platform consistency are weaker.

## Risks / Trade-offs

- [JSON cannot adopt trailing commas universally] → Keep trailing comma enforcement scoped to JavaScript-family files and allow JSON to remain valid according to its syntax rules.
- [Initial migration may touch many files through formatting and import reordering] → Run the migration as a dedicated repo-wide normalization step so functional changes are not mixed with style churn.
- [Biome’s React Fast Refresh rule is not a byte-for-byte replacement for the current ESLint plugin] → Configure the explicit component-export rule for Vite-friendly behavior and verify the existing app entry and component modules against it during implementation.
- [Push-time full validation is slower than a lint-only hook] → Limit `pre-commit` to staged-file Biome fixes and reserve the full build/type gate for `pre-push`.

## Migration Plan

1. Add Biome and Lefthook as development dependencies.
2. Create `biome.json` with the repository baseline and supported-file scope.
3. Update `package.json` scripts for format, lint/check, full validation, and hook installation.
4. Add Lefthook configuration for `pre-commit` and `pre-push`.
5. Remove `eslint.config.js` and the ESLint-only dependencies.
6. Run the repository formatting and validation flow, then commit the normalized result.

Rollback strategy:
- restore the previous ESLint script/configuration and dependencies;
- remove Biome and Lefthook configuration files;
- remove the new hook automation and validation scripts.

## Open Questions

None. This design assumes the requested trailing comma rule applies where the language syntax allows it, while JSON files remain standards-compliant.
