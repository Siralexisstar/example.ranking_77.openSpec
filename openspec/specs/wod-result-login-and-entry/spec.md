## Purpose

Define the authenticated WOD result entry flow so athletes can log in and register current or past workout results with validation.

## Requirements

### Requirement: Login entry point for result registration
The system SHALL provide a visible login entry point for users who need to register WOD results.

#### Scenario: User wants to add a WOD result from the homepage
- **WHEN** the user is on the main dashboard
- **THEN** the user can find an action to begin the login flow
- **AND** that action leads the user toward result registration access

### Requirement: Result registration requires an authenticated session
The system SHALL require users to authenticate before accessing the WOD result registration experience.

#### Scenario: Unauthenticated user attempts to access result registration
- **WHEN** a user without an active session opens the result registration view
- **THEN** the system redirects or routes the user to the login flow
- **AND** the result registration form is not available until login succeeds

#### Scenario: User successfully logs in
- **WHEN** the user submits valid login information
- **THEN** the system creates an active session
- **AND** the user gains access to the WOD result registration view

### Requirement: Users can register current or past-date WOD results
The system SHALL allow authenticated users to record results for the current day or for another date when the workout was not completed on time.

#### Scenario: User registers today's WOD result
- **WHEN** an authenticated user submits a result for the current date
- **THEN** the system stores the result successfully
- **AND** the user receives confirmation that the registration was recorded

#### Scenario: User registers a result for a different date
- **WHEN** an authenticated user selects a date other than today and submits a WOD result
- **THEN** the system accepts the result for that selected date
- **AND** the confirmation reflects that the result was recorded for the chosen workout date

### Requirement: Result registration validates required workout data
The system SHALL prevent incomplete WOD submissions from being recorded.

#### Scenario: User submits the form without required information
- **WHEN** an authenticated user attempts to register a WOD result with missing required fields
- **THEN** the system keeps the submission from being recorded
- **AND** the user is shown clear validation feedback for the missing information
