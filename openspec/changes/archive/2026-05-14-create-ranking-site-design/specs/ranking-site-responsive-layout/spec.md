## ADDED Requirements

### Requirement: Responsive layout across desktop and mobile
The site SHALL adapt its primary layout for both desktop and mobile screens without losing readability, hierarchy, or usability.

#### Scenario: User opens the site on a desktop-width viewport
- **WHEN** the site is rendered on a wide screen
- **THEN** major sections use the available space to create a premium, balanced composition
- **AND** content remains easy to scan without excessive empty space or cramped grouping

#### Scenario: User opens the site on a mobile-width viewport
- **WHEN** the site is rendered on a narrow screen
- **THEN** content stacks or reflows into a mobile-friendly layout
- **AND** text remains readable without horizontal overflow
- **AND** primary actions remain easy to reach and activate

### Requirement: Ranking preview remains understandable on small screens
The site SHALL preserve the meaning of ranking-oriented content when viewed on mobile devices.

#### Scenario: User views ranking content on mobile
- **WHEN** a ranking preview or leaderboard-style block is shown on a small screen
- **THEN** athlete order, comparative emphasis, and supporting labels remain understandable
- **AND** the user does not need to interpret a compressed desktop table to understand the standings

### Requirement: Touch-friendly responsive interaction surfaces
The site SHALL provide responsive interaction surfaces that support both pointer and touch-based use.

#### Scenario: User interacts with primary actions on mobile
- **WHEN** the user taps a primary action or interactive surface on a mobile device
- **THEN** the control has enough visual prominence and tap-friendly sizing to be used comfortably

