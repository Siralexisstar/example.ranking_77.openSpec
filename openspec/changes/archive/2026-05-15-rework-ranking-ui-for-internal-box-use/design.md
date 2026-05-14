## Context

The current React SPA is still organized as a single promotional-style homepage inside `src/App.tsx`, with visual emphasis on marketing language and broad competition storytelling. The new scope shifts the app toward internal box operations: a coach or athlete should immediately see how many athletes are being tracked, what trainings are scheduled this week, who is ranked, how to join the ranking, and how to log in to register WOD results.

The project currently uses React and TypeScript without routing, form, or carousel dependencies. That constraint is useful here because the requested experience can remain lightweight if the redesign is implemented with typed mock data, reusable presentation components, and a minimal navigation model instead of adding infrastructure that the product does not yet need.

## Goals / Non-Goals

**Goals:**
- Replace the current landing-page information architecture with an internal dashboard ordered around operational relevance.
- Provide a clear top-level navigation entry for login and result registration without introducing unnecessary framework complexity.
- Support a weekly training carousel using mock data that works well on desktop and mobile.
- Present ranking entries with quick athlete recognition through thumbnail-style avatars and structured ranking metadata.
- Allow internal users to submit WOD results for today or a previous date through a simple authenticated flow that remains functional after refresh.
- Keep domain shapes explicit in TypeScript so dashboard data and result entry flows can evolve into a real backend later.

**Non-Goals:**
- Real backend authentication or authorization.
- Persistent server-side storage for athletes, WODs, or results.
- Automatic recalculation of rankings from newly submitted WOD results.
- Multi-box support, payment flows, marketing pages, or public sign-up funnels.
- Complex analytics dashboards beyond the summary metrics needed for the homepage hero replacement.

## Decisions

### 1. Reorganize the app into page-level views with an internal-first information hierarchy

The application will move from a monolithic promotional homepage to a small page-driven structure:
- Internal dashboard view
- Login view
- WOD result entry view

The dashboard order will be fixed as:
1. Box activity summary and participation metrics
2. Weekly training carousel
3. Athlete ranking list
4. Join-the-ranking section

This order matches the user request and keeps the highest-frequency internal tasks closest to the top. The current hero copy and commercial framing will be removed rather than softened, because the product goal has changed from aspirational presentation to daily utility.

Alternatives considered:
- Keep the current layout and only replace copy. Rejected because the current structure still behaves like a marketing page.
- Put the join section above rankings. Rejected because ranking visibility is the main reason to open the app.

### 2. Use lightweight hash-based navigation instead of adding `react-router`

The project currently has no routing dependency. To support a separate login/result tab without increasing complexity, top-level navigation will use hash-based views such as `#/dashboard`, `#/login`, and `#/results`. `src/App.tsx` will act as the route shell and delegate each screen to page components under `src/pages/`.

This approach gives the app:
- Deep-linkable internal views
- Browser back/forward support
- A clear “redirect” feeling when users move from the dashboard to login or result entry
- No new dependency or route configuration burden

Alternatives considered:
- Add `react-router`. Rejected for this scope because the app only needs a few views and no nested routing.
- Use local component state only. Rejected because it would not preserve URL state and would feel less like navigating to another tab.

### 3. Introduce typed mock domain data and a small service layer

Shared TypeScript models will be introduced under `src/types/` for:
- Athlete
- Athlete ranking entry
- Training session
- Join request draft
- Auth session
- WOD result submission

Mocked source data will live in `src/services/mockData.ts`, with transformation or persistence helpers in `src/services/`. This keeps business data out of visual components and aligns with the project principle of separating presentation from data shaping.

For this change, the service layer should include:
- Static mock athletes and rankings
- Static weekly training schedule
- Simple auth/session helpers
- Result registration persistence helpers

Alternatives considered:
- Keep all mock arrays directly inside page components. Rejected because it couples future backend replacement to view files.
- Introduce a state management library. Rejected because the data flow remains simple.

### 4. Implement athlete thumbnails as generated avatars, not photo assets

The ranking list needs quick athlete recognition, but the feature does not require managing real image files yet. Each athlete entry will therefore include avatar metadata such as initials and a color token, rendered by a reusable avatar component instead of loading raster photos from `src/assets/`.

This keeps the UI consistent and avoids creating an asset pipeline for placeholder headshots while still satisfying the need for a distinct thumbnail per athlete.

Alternatives considered:
- Add placeholder image files for each athlete. Rejected because it increases maintenance and is not necessary for an internal MVP.
- Show text-only rows. Rejected because the request explicitly asks for a thumbnail per athlete.

### 5. Build the weekly training carousel with CSS scroll snap and simple controls

The weekly training section should feel browsable without requiring a heavy carousel package. The recommended implementation is a horizontally scrollable card rail with CSS scroll snap, optional previous/next controls, and accessible labeling for each session.

This approach works well because:
- The number of training cards per week is small and known
- Mobile devices benefit from native swipe behavior
- Desktop users can still use buttons or horizontal scrolling
- No external dependency is needed

Alternatives considered:
- Add a carousel library. Rejected because it adds weight and complexity to a simple content rail.
- Stack the weekly trainings vertically. Rejected because the request explicitly asks for a carousel.

### 6. Make login functional through local session persistence, then gate result entry

The login feature should work functionally within the scope of an internal app, even though there is no backend. The app will therefore implement a mock login flow backed by `localStorage`, storing a minimal session object once the user enters accepted internal credentials or an allowed athlete identity.

The navigation behavior will be:
- Dashboard login CTA sends users to `#/login`
- Successful login redirects to `#/results`
- Logged-in users can submit a WOD for today or a previous date
- Logged-out users attempting to open `#/results` are redirected to `#/login`

This satisfies the acceptance criteria around login and result registration while keeping the technical model intentionally small.

Alternatives considered:
- No persistence, session only in memory. Rejected because a refresh would make the flow feel broken.
- Fake login button with no gated state. Rejected because the acceptance criteria require functional login behavior.

### 7. Store WOD submissions locally and validate them with native form patterns plus utility helpers

Result entry will be implemented as a controlled form with native inputs for:
- Workout date
- WOD name
- Result value
- Result unit or format
- Optional notes

Validation will combine:
- Required HTML form fields
- Basic typed validation helpers in `src/utils/validation.ts`
- User-facing error messages near the relevant inputs

Submitted results will be stored in `localStorage` through a service helper and echoed back in a recent-results summary on the result page so users can verify that the registration succeeded.

Alternatives considered:
- Add a form library and schema validator. Rejected because the form is still small and the acceptance criteria emphasize a functional, optimized model rather than a complex one.
- Accept any payload without validation. Rejected because operational data entry needs visible guardrails.

### 8. Refactor source files toward the expected project structure

The implementation should use the existing source tree expectations instead of keeping everything in `src/App.tsx`. A practical target structure is:
- `src/pages/` for dashboard, login, and result entry views
- `src/components/` for reusable cards, section headers, avatar, buttons, and carousel controls
- `src/services/` for mock data and local storage/session helpers
- `src/types/` for shared domain models
- `src/utils/` for validation and formatting helpers

This preserves a straightforward path for future backend integration and prevents the redesign from becoming another oversized single-file page.

Alternatives considered:
- Keep all new code in `src/App.tsx` and `src/App.css`. Rejected because the requested functionality is broader than a one-file landing page.

## Risks / Trade-offs

- [Mock authentication may be mistaken for real security] → Clearly isolate it as a frontend-only session helper and keep credentials/config mock-driven so it can be replaced later.
- [Hash navigation is less flexible than a router library] → Keep route parsing centralized in `src/App.tsx` so migration to `react-router` remains easy if the app grows.
- [LocalStorage data can become malformed or stale] → Use namespaced keys, defensive parsing, and safe fallbacks to empty state.
- [Weekly training carousel may feel awkward on some desktop widths] → Combine scroll snap with explicit controls and responsive card widths.
- [Generated avatars provide less identity than real photos] → Use stable initials and color tokens so the list remains recognizable without extra asset management.
- [Registered WODs will not automatically alter rankings in this scope] → Surface this behavior clearly in the result-entry confirmation and keep ranking calculation out of the UI layer for later implementation.

## Migration Plan

This is a frontend-only change with no server migration. Deployment consists of shipping the new SPA bundle and allowing the app to initialize its mock data and local storage keys client-side.

Rollback is a simple frontend revert. If users already created local result entries, those stored records can be ignored safely by older builds because they are client-local and do not affect any backend schema.

## Open Questions

- Should login use a shared box access code, predefined athlete identities, or a simple coach/athlete selector for the initial internal version?
- Should submitted WOD results appear only as confirmation history, or should they also populate a pending review list on the dashboard in a later change?
- Does “unirte al ranking” mean self-registration only, or should the section explicitly route through coach approval messaging in the first implementation?
