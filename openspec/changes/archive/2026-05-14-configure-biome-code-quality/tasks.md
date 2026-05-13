## 1. Tooling foundation

- [x] 1.1 Add `@biomejs/biome` and Lefthook as development dependencies and remove the ESLint-specific packages that this migration replaces.
- [x] 1.2 Remove the current ESLint configuration file once the Biome-based workflow is ready to take ownership of repository code quality.

## 2. Repository configuration

- [x] 2.1 Create the Biome configuration file with Git-aware scanning, unknown-file handling, explicit double quotes, semicolons, trailing commas for JavaScript-family files, and React-aligned lint coverage for the Vite stack.
- [x] 2.2 Update `package.json` with formatting, Biome validation, full validation, and hook installation scripts that contributors can run locally.
- [x] 2.3 Add Lefthook commit and push hooks so staged changes are normalized on commit and the full validation gate runs before push.

## 3. Migration verification

- [x] 3.1 Run the repository-wide Biome formatting workflow and review any source changes caused by style normalization or import ordering.
- [x] 3.2 Run the Biome validation and full build validation workflows to confirm the new quality gate passes for the current codebase.
- [x] 3.3 Confirm commit and push hooks invoke the expected workflows without introducing unsupported-file failures in the repository root.
