## Why

The project currently relies on ESLint only, which leaves formatting, import organization, and most code-style enforcement split across ad hoc editor behavior instead of a single repo-standard workflow. Adopting Biome now will centralize code quality for the current Vite, React 19, and TypeScript stack while enforcing the same standards locally and on branch commit/push flows.

## What Changes

- Install and configure Biome as the primary tool for formatting and linting supported source files in the project.
- Define a repository-wide code style baseline that enforces double quotes, trailing commas, and semicolons.
- Add local npm scripts for formatting and validation so contributors can run the workflow consistently without editor-specific setup.
- Add branch workflow automation so Biome validation runs on commit and push, reducing drift before code reaches shared branches.
- Preserve TypeScript type-checking and production build validation as a separate step rather than treating Biome as a type checker replacement.
- Retire the current ESLint-first	 workflow where Biome provides equivalent coverage for the active stack.

## Capabilities

### New Capabilities

- `code-quality`: Standardize formatting, linting, and branch-level validation for supported project files using Biome as the primary code quality tool.

### Modified Capabilities

- None.

## Impact

- Affected code: repository tooling configuration, package scripts, and git hook automation.
- Affected dependencies: Biome plus any hook orchestration dependencies needed for commit and push enforcement.
- Affected systems: local developer workflow, commit validation, push validation, and CI-aligned code quality expectations.
