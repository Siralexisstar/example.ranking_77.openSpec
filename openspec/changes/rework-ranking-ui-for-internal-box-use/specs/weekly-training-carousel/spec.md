## ADDED Requirements

### Requirement: Weekly training overview carousel
The system SHALL present the current week's scheduled trainings in a carousel-style overview on the homepage.

#### Scenario: User reaches the training section
- **WHEN** the weekly training section is shown
- **THEN** the user can identify multiple scheduled training sessions for the current week
- **AND** each session is presented as an individual training card within the carousel

### Requirement: Training cards show essential workout context
The system SHALL display enough information in each training card for athletes to understand the planned session.

#### Scenario: User inspects a training card
- **WHEN** a training card is visible
- **THEN** the card shows the training day or date
- **AND** the card shows the workout name or focus
- **AND** the card shows supporting details that help the athlete understand the session

### Requirement: Carousel remains usable across devices
The system SHALL allow users to browse weekly trainings comfortably on both desktop and mobile devices.

#### Scenario: User browses the weekly trainings on a narrow screen
- **WHEN** the carousel is shown on a mobile-width viewport
- **THEN** the user can move through the training cards without horizontal page overflow
- **AND** the currently visible training card remains readable

