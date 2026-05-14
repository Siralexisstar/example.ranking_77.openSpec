## 1. Foundation And Data Setup

- [x] 1.1 Reorganize the frontend into page, component, service, type, and utility modules that support the internal dashboard, login, and result-entry flows
- [x] 1.2 Define shared TypeScript models for athletes, ranking entries, training sessions, join requests, auth session state, and WOD result submissions
- [x] 1.3 Create mock data sources and local storage helpers for weekly trainings, ranked athletes, login session state, join requests, and WOD result history

## 2. Internal Dashboard Experience

- [x] 2.1 Replace the current marketing-oriented homepage with an internal dashboard shell and hash-based navigation between dashboard, login, and result-entry views
- [x] 2.2 Build the top summary section with total ranked athletes and additional internal box activity metrics
- [x] 2.3 Implement the weekly training carousel with mock weekly sessions, readable training cards, and responsive browsing behavior
- [x] 2.4 Implement the athlete ranking section with ordered entries, athlete names, thumbnail-style avatars, and ranking metadata that remains easy to scan on mobile
- [x] 2.5 Add the join-the-ranking section with internal-focused messaging, a lightweight request flow, and submission confirmation

## 3. Login And WOD Registration

- [x] 3.1 Implement the login view and session flow so users can authenticate from the dashboard and gain access to result registration
- [x] 3.2 Protect the WOD result registration view so unauthenticated users are redirected to the login flow
- [x] 3.3 Build the WOD result form with required fields for workout date, workout identity, result value, and optional notes
- [x] 3.4 Persist successful WOD submissions locally and show confirmation or recent-result feedback for current-day and past-date registrations
- [x] 3.5 Add validation and inline feedback that prevent incomplete WOD submissions from being recorded

## 4. Visual Polish And Verification

- [x] 4.1 Rework the visual system and responsive styling so the app feels like an internal box tool instead of a commercial landing page
- [x] 4.2 Verify desktop and mobile behavior for dashboard sections, carousel browsing, ranking readability, join flow, login, and WOD registration
- [x] 4.3 Run the repository validation workflow and resolve any formatting, lint, type-check, or build issues introduced by the redesign
