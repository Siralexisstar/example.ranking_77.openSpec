# Architecture

This project is a user interface built entirely with React. Its purpose is to let users enter daily CrossFit WOD results and display daily, weekly, and monthly rankings in a clear, fast, and professional way.

The application is designed as a SPA deployed on Vercel. In an initial phase, it can work with local data, mocks, or a simple API; the architecture should make it possible to connect a backend, database, or external services later without rewriting the whole UI.

## Goals

- Register daily WOD results in a simple way.
- Display daily, weekly, and monthly rankings.
- Keep the user experience clean, consistent, and easy to scan.
- Separate presentation logic, data transformation, and service access.
- Support continuous deployment through GitHub Actions and Vercel.

## General Structure

The UI is organized around reusable components, business views, and data services.

```text
src/
  assets/        Static visual assets.
  components/    Reusable UI components.
  features/      Domain-based feature modules.
  pages/         Main application screens.
  services/      API access, adapters, and data sources.
  types/         Shared TypeScript types.
  utils/         Pure utilities and helpers.
```

The structure can grow progressively. For a simple UI, it is not necessary to create every folder from the beginning, but this separation should be preserved once business logic or shared components appear.

## Main Domains

The core product concepts are:

- `Athlete`: a person participating in the WODs.
- `Wod`: a daily workout with a date, name, type, and description.
- `Result`: the result registered by an athlete for a specific WOD.
- `Ranking`: a classification calculated from results.
- `Period`: the time range used for daily, weekly, or monthly rankings.

These models should be defined with TypeScript to avoid inconsistencies between forms, tables, filters, and services.

## Layers

### Presentation

Contains React components responsible for rendering the interface:

- Forms to submit results.
- Ranking tables or lists.
- Filters by date, WOD, category, or athlete.
- Loading, empty, and error states.

Visual components should be predictable, accessible, and consistent. The UI should not depend on magic values or ranking logic embedded directly in JSX.

### State and Data

The application can start with local React state. If the project grows, data access should be centralized through hooks or specialized services.

Examples:

- `useWods()`
- `useResults()`
- `useRankings(period)`

These hooks can consume local mock data at first and a real API later.

### Ranking Logic

Ranking calculation should remain separate from visual components.

The logic should cover:

- Sorting by score, time, repetitions, or the criterion defined by the WOD.
- Ties.
- Filters by day, week, and month.
- Normalization of user-entered data.

Separating this logic makes calculations easier to test and prevents UI tables from accumulating business rules.

### Services

Services encapsulate access to external sources:

- REST API or serverless endpoints.
- Mock data for development.
- Future integrations with authentication or storage.

The UI should consume these services through functions or hooks without knowing the transport details.

## UI Principles

The interface should follow basic patterns of a professional application:

- Clear visual hierarchy.
- Forms with visible validation.
- Loading, error, and empty states.
- Readable and sortable tables when appropriate.
- Responsive design for mobile and desktop.
- Consistent components for spacing, color, typography, and interaction.
- Basic accessibility: sufficient contrast, form labels, and keyboard navigation.

The application should prioritize operational clarity over decorative composition. Users should be able to submit results and check rankings with very few actions.

## Expected Evolution

The architecture is prepared to evolve toward:

- Real result persistence.
- User or admin authentication.
- Categories by gender, level, or box.
- Athlete history.
- Statistics dashboards.
- Ranking exports.
- Integration with notifications or automations.
