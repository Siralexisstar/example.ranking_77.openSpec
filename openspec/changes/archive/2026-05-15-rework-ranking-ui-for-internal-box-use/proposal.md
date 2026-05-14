## Why

The current homepage presents the product more like a commercial landing page than an internal tool for a single CrossFit box. This change is needed now to realign the application around the daily operational needs of coaches and athletes: seeing weekly training context, reviewing rankings quickly, and registering WOD results through a simple authenticated flow.

## What Changes

- Replace the current marketing-oriented homepage structure with an internal ranking dashboard focused on useful box activity and athlete participation.
- Update the first screen so it summarizes ranking participation with athlete totals and other operational metrics instead of promotional copy.
- Add a weekly training carousel with mock training data to preview the box's scheduled sessions.
- Add a ranking section that lists athletes with names and lightweight profile thumbnails for faster recognition.
- Add a section for joining the ranking so new athletes from the box can request or start participation.
- Add a login entry point and a dedicated result registration view where authenticated users can submit the WOD result for today or another date when it was not recorded on time.
- Ensure the redesigned experience remains functional, lightweight, and aligned with an internal-use product rather than a sales or marketing site.

## Capabilities

### New Capabilities
- `internal-ranking-dashboard`: Defines the internal homepage experience, including operational summary content, non-commercial layout, and section order for box usage.
- `weekly-training-carousel`: Defines how weekly training sessions are presented in a scrollable or carousel-based overview using mock schedule data.
- `athlete-ranking-directory`: Defines the ranking list presentation with athlete identity details such as name and thumbnail within the main dashboard.
- `wod-result-login-and-entry`: Defines the login access point and the authenticated flow for submitting WOD results for the current day or a different workout date.
- `ranking-join-intake`: Defines the section and interaction needed for additional box athletes to join or request inclusion in the ranking.

### Modified Capabilities
- None.

## Impact

- Affects the main frontend experience, including homepage content structure, navigation, and visual tone.
- Requires new UI flows for login and WOD result entry, plus mock data support for weekly trainings and athlete thumbnails.
- Likely impacts shared TypeScript domain models for athletes, WODs, and result submission, even if persistence remains mocked in this scope.
