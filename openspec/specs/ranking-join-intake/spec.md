## Purpose

Define the lightweight internal intake flow that allows additional box athletes to request inclusion in the ranking.

## Requirements

### Requirement: Join-the-ranking section on the homepage
The system SHALL provide a dedicated section where additional box athletes can start the process of joining the ranking.

#### Scenario: Athlete is not yet part of the ranking
- **WHEN** a user reaches the join section on the homepage
- **THEN** the page explains that additional athletes can request entry into the ranking
- **AND** the section provides a clear action to start that process

### Requirement: Join request captures enough identity information
The system SHALL collect the minimum information needed to identify the athlete requesting to join the ranking.

#### Scenario: Athlete submits a join request
- **WHEN** the athlete completes the join flow
- **THEN** the system captures the identifying information required for the request
- **AND** the athlete receives confirmation that the request was submitted

### Requirement: Join flow remains lightweight and internal-focused
The system SHALL present the join process as an internal participation flow rather than as a public acquisition or marketing funnel.

#### Scenario: User reads the join section
- **WHEN** the join section is displayed
- **THEN** the messaging focuses on joining the box ranking experience
- **AND** the section avoids commercial sales-oriented framing
