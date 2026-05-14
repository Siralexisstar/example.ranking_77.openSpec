## Context

The current frontend is still using the starter Vite/React screen in `src/App.tsx`, with presentation styles concentrated in `src/App.css` and `src/index.css`. There is no established product identity yet, and the existing UI does not communicate a premium CrossFit or athlete-ranking experience.

This change introduces the first intentional design system for the site, using the current single-page application entry point as the foundation. The implementation must support a modern, high-performance visual direction inspired by premium training brands while keeping the product centered on rankings rather than a generic fitness marketing page.

Constraints for this phase:
- The codebase is small and should avoid premature complexity.
- The design must work responsively on desktop and mobile from the first pass.
- The visual style must feel current and premium without relying on heavy animation or large media payloads.
- The result should leave a clean path for future ranking views, filters, athlete detail surfaces, and data-backed sections.

## Goals / Non-Goals

**Goals:**
- Replace the starter screen with a homepage-style experience that establishes the site's visual identity.
- Define a reusable visual system through global tokens for color, spacing, typography, surfaces, and motion.
- Present the product as a competitive athlete ranking platform, not only as a training or promotional website.
- Build a responsive layout strategy that preserves hierarchy, readability, and CTA clarity across desktop and mobile.
- Create a section structure that can later connect to real ranking data without redesigning the entire shell.

**Non-Goals:**
- Building the full ranking data model, filters, or backend integrations.
- Introducing a routing system or multiple production pages in this phase.
- Adding a third-party UI framework or animation library.
- Finalizing brand copy, SEO content, or localization strategy.
- Defining athlete profile flows, authentication, or result submission interactions beyond visual placeholders.

## Decisions

### 1. Use a single ranking-focused landing composition in `src/App.tsx`

The first implementation should replace the starter content with a structured landing page in the existing application shell. The page should be composed of distinct sections that communicate brand, ranking relevance, and product purpose in a clear order.

Recommended section sequence:
- Hero with strong headline, short supporting text, and primary CTA.
- Ranking preview section showing a leaderboard-style surface.
- Category or metric strip highlighting divisions, benchmarks, or scoring dimensions.
- Athlete spotlight or performance statement section to humanize the competitive angle.
- Final CTA/footer area that closes with authority.

Why this approach:
- It keeps the initial implementation simple and easy to review.
- It gives the product a strong first impression immediately.
- It creates reusable sections that can later become page-level components.

Alternative considered:
- Building several pages or introducing routing now. Rejected because the current story is about general site design, not navigation architecture.

### 2. Establish the visual system through CSS tokens in `src/index.css`

Global design tokens should be defined in `src/index.css` for color palette, typography, spacing rhythm, border treatment, shadows, and motion timing. Page-specific compositions can remain in `src/App.css` initially, with the option to split styles later if the page is decomposed into feature components.

The visual direction should avoid the default light-purple Vite look and instead use a more athletic, premium palette. A likely direction is:
- Deep neutral base colors for authority and contrast.
- Warm metallic, sand, chalk, or red-orange accents to evoke performance training spaces.
- High-contrast headline color and softer secondary text for scanability.

Why this approach:
- It centralizes the visual language in one place.
- It reduces restyling cost when more ranking screens are added.
- It matches the current project scale without introducing CSS architecture overhead too early.

Alternative considered:
- Adopting a UI library or utility framework. Rejected because the project is still small and needs a distinctive visual identity rather than generic component defaults.

### 3. Prioritize editorial hierarchy over decorative complexity

The homepage should feel premium through typography, rhythm, contrast, layered backgrounds, and disciplined section composition rather than through heavy decorative effects. The design should take cues from current CrossFit and performance-brand patterns:
- Large headlines with compact supporting copy.
- Strong section transitions.
- Card surfaces that resemble rankings, stats, or performance dashboards.
- Layered gradients, subtle grid or texture patterns, and restrained motion.

Why this approach:
- It keeps the site elegant and fast.
- It aligns better with a ranking product where information clarity matters.
- It ages better than trend-heavy effects that can quickly feel noisy.

Alternative considered:
- Relying on oversized media, autoplay video, or highly animated hero treatments. Rejected due to implementation cost, performance risk, and weaker information density.

### 4. Make the ranking preview the centerpiece of credibility

Even though this story only covers the general design, the homepage should visually prove that rankings are the product's core. The ranking preview should therefore be treated as a hero-adjacent or immediately-following section with strong visual prominence.

The preview should simulate the eventual product language:
- Ordered athlete rows.
- Score emphasis.
- Category labels or movement tags.
- Clear separation between top performers and supporting entries.

Why this approach:
- It reduces the risk that the site feels like a generic fitness landing page.
- It aligns the design system with future product surfaces from day one.
- It gives future implementation a stable visual reference for real leaderboard components.

Alternative considered:
- Introducing rankings only lower on the page after brand storytelling. Rejected because it delays the core value proposition.

### 5. Build responsive behavior mobile-first with content stacking, not scaled-down desktop layouts

The responsive approach should be defined at the section level. On mobile, the layout should prioritize stacked content, comfortable spacing, strong tap targets, and preserved ranking readability. Desktop should add density and side-by-side layouts only where they improve scanability.

Implementation guidance:
- Use one-column defaults and progressively enhance at tablet and desktop breakpoints.
- Keep hero copy width constrained for readability.
- Convert multi-column ranking and stat areas into vertical cards or horizontally scroll-safe surfaces when necessary.
- Preserve table-like understanding for rankings without forcing tiny desktop tables onto mobile.

Why this approach:
- The product will likely be checked quickly on phones by athletes and gym communities.
- Mobile-first styling prevents desktop assumptions from degrading the ranking experience.

Alternative considered:
- Designing primarily for desktop and collapsing later. Rejected because ranking interfaces often become unreadable when mobile is treated as an afterthought.

### 6. Use lightweight assets and CSS-built atmosphere first

The first version should favor CSS gradients, overlays, borders, and texture-inspired backgrounds over large media dependencies. Existing placeholder assets in `src/assets` can be removed or replaced once the new UI is implemented, but the design should not depend on heavy image usage to succeed.

If imagery is added later, it should be:
- Cropped tightly around athletic action or equipment.
- Used sparingly as emphasis, not as the only source of visual quality.
- Optimized for web delivery and responsive layout behavior.

Why this approach:
- It keeps the landing page fast and easier to evolve.
- It avoids locking the design to temporary imagery choices.

Alternative considered:
- Building the whole identity around hero photography. Rejected because it increases dependency on asset quality and can overshadow the ranking product itself.

### 7. Preserve accessibility and restrained motion as part of the design baseline

The visual redesign should include accessible contrast, semantic headings, clear button states, and focus visibility. Motion should be limited to meaningful reveal or hover transitions and should not be required to understand the interface.

Why this approach:
- It supports operational clarity and future product expansion.
- It prevents the premium direction from turning into a low-usability showcase.

Alternative considered:
- Maximizing motion for visual impact. Rejected because the product needs to feel sharp and usable, not theatrical.

## Risks / Trade-offs

- [Risk] Inspiration from premium training sites can drift into a generic marketing aesthetic -> Mitigation: keep the ranking preview and competitive framing near the top of the page.
- [Risk] A bold visual direction may reduce readability if contrast and spacing are over-stylized -> Mitigation: define tokens with accessibility in mind and validate the layout at mobile sizes early.
- [Risk] Implementing all visual ideas directly in `App.tsx` and `App.css` can become hard to maintain -> Mitigation: use this pass to establish structure, then split sections into reusable components if the page grows.
- [Risk] CSS-only atmosphere may initially feel less rich than media-heavy references -> Mitigation: prioritize typography, card treatment, and section hierarchy so the design still feels intentional without large assets.
- [Risk] Ranking previews may imply real functionality before data integration exists -> Mitigation: treat early leaderboard content as presentational scaffolding with wording that does not misrepresent live data.

## Migration Plan

1. Replace the starter content in `src/App.tsx` with the new homepage structure.
2. Redefine global tokens and base typography in `src/index.css`.
3. Rebuild page-level styling in `src/App.css` around the new sections and breakpoints.
4. Remove or stop referencing starter assets that no longer match the design direction.
5. Validate desktop and mobile layouts locally before moving on to deeper ranking features.

Rollback strategy:
- Revert the homepage composition and related style changes if the new visual direction proves unsuitable.
- Because this change is presentation-only, rollback does not require data migration or API coordination.

## Open Questions

- Should the first visual pass lean more toward a dark performance aesthetic or a lighter premium editorial aesthetic?
- Will the homepage ranking preview represent a daily leaderboard, a weekly leaderboard, or a mixed showcase of ranking states?
- Does the product need room in the hero for gym/brand messaging, or should it focus exclusively on athlete competition and standings?
