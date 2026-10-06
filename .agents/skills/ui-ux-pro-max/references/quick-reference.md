# Quick Reference — Full UX Guidelines Index

This reference catalogs the industry-standard UX guidelines covering Accessibility, Touch & Interaction, Performance, and Design Systems.

---

### 1. Accessibility (WCAG 2.2 AA / Critical)
- `color-contrast`: Minimum 4.5:1 ratio for normal text (large text 3:1).
- `focus-states`: Visible focus rings on interactive elements (2–4px).
- `alt-text`: Descriptive alt text for all informative imagery.
- `aria-labels` / `accessibilityLabel`: Required on all icon-only buttons.
- `keyboard-nav`: Logical tab order matching visual flow.
- `color-not-only`: Never convey state or status purely through color alone (always combine with icons or badges).
- `dynamic-type`: Support system text scaling without text truncation.
- `reduced-motion`: Respect `prefers-reduced-motion` settings.

---

### 2. Touch & Interaction (Critical)
- `touch-target-size`: Minimum $44 \times 44\text{ pt}$ (iOS) / $48 \times 48\text{ dp}$ (Android).
- `touch-spacing`: Minimum 8px gap between interactive hit targets.
- `hover-vs-tap`: Never rely on hover states for primary interaction on touch devices.
- `loading-buttons`: Disable button during async operations; show spinner.
- `press-feedback`: Visual response within 100ms of user tap.
- `safe-area-awareness`: Keep primary touch targets away from notch, dynamic island, and gesture bars.

---

### 3. Performance & 60fps Scrolling (High)
- `image-dimension`: Declare explicit width/height to prevent Cumulative Layout Shift (CLS).
- `virtualize-lists`: Virtualize lists with > 15 items via `FlatList` / `FlashList`.
- `main-thread-budget`: Keep per-frame work under ~16ms for smooth 60fps execution.
- `progressive-loading`: Use skeleton screens / shimmer instead of blocking spinners for operations > 1s.
- `cache-first-data`: Persist data locally via AsyncStorage for offline browsing in remote field locations.

---

### 4. Layout, Hierarchy & Motion
- `8-point-grid`: All layout padding and gaps follow multiples of 8 (or 4 for micro-spacing).
- `fitts-law-placement`: High-frequency triggers positioned in natural bottom thumb zones.
- `meaningful-motion`: Animate transforms (`scale`, `translateY`) and `opacity`; avoid animating layout dimensions.
