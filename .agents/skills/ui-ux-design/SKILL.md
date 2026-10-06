---
name: ui-ux-design
description: >-
  Comprehensive UI/UX design standards, visual hierarchy, design tokens, interaction patterns, accessibility (WCAG AA/AAA), and design system architecture. Use when designing, reviewing, or styling user interfaces, micro-interactions, components, and user flows.
---

# UI/UX Design System & Product Design Skill

This skill defines the definitive principles, patterns, and checklists for crafting world-class, accessible, and delightful digital user experiences.

---

## 1. Core UX Laws & Psychological Foundations

1. **Fitts's Law**: 
   - The time to acquire a target is a function of the distance to and size of the target.
   - Interactive elements (buttons, toggles, links) must have an active hit target of at least **44 × 44 pt/dp**.
   - Place primary actions close to user rest zones (e.g. bottom screen thumb zones).

2. **Hick's Law**:
   - The time it takes to make a decision increases with the number and complexity of choices.
   - Minimize cognitive overload. Group related actions, use progressive disclosure, and keep options per step ≤ 4–5.

3. **Jakob's Law**:
   - Users spend most of their time on other products. Familiar mental models (e.g., standard back arrows, search iconography, tab bars) outperform idiosyncratic patterns.

4. **Miller's Law & Chunking**:
   - The average person can keep 7 (± 2) items in their working memory. Group information into discrete cards or logical blocks with clear visual headers.

---

## 2. Visual Hierarchy & Spatial Grid

### The 8-Point Grid System
- All margins, paddings, gaps, and dimensions must align to multiples of **8** (or **4** for compact micro-spacing):
  - `Spacing.xs`: 4px
  - `Spacing.sm`: 8px
  - `Spacing.md`: 12px / 16px
  - `Spacing.lg`: 20px / 24px
  - `Spacing.xl`: 32px

### Typography Scale & Hierarchy
Every screen must have a clear visual anchor:
- **Display / H1 (28–32pt, Bold/800)**: Immediate emotional hook and orientation. Maximum 1 per screen.
- **Section Title / H2 (18–22pt, 700)**: Logical segment boundaries.
- **Card Title / H3 (15–17pt, 600–700)**: Content identifiers.
- **Body Regular (13–15pt, 400–500)**: Readable running text with line height at 1.4–1.6× font size.
- **Caption / Meta (11–12pt, 500–600)**: Timestamps, secondary labels, and tags.

### Visual Weight & Contrast
- Differentiate importance using:
  1. Font weight (`800` vs `400`)
  2. Color contrast (`Palette.ink` for primary vs `Palette.muted` for metadata)
  3. Spatial grouping (proximity indicates relationship)

---

## 3. Color Architecture & Accessibility (WCAG 2.1)

### Functional Color Palette
- **Primary / Brand**: 1 signature hue (e.g. Redback Coral `#E04836`) reserved for primary CTAs and active states.
- **Secondary / Botanical**: Earthy tones (e.g. Deep Forest Moss `#2C4A3E`) for containers, tags, and secondary modules.
- **Surfaces & Canvas**: Warm naturalist paper (`#FBF9F4`) and clean card white (`#FFFFFF`). Avoid pure harsh blacks (`#000000`); use deep charcoal ink (`#17211F`).
- **Semantic Feedback**:
  - **Success / Valid**: Green / Sage (`#2C4A3E` / `#E6EFEA`)
  - **Warning / Hazard**: Amber / Gold (`#E59824` / `#FFF4DE`)
  - **Danger / Medical Alert**: Crimson Red (`#D32F2F` / `#FDE8E4`)

### Contrast Check (WCAG AA/AAA)
- Normal text (< 18pt) requires a minimum contrast ratio of **4.5:1** against the background.
- Large text (≥ 18pt bold or ≥ 24pt regular) requires a minimum of **3:1**.
- UI components and graphical objects require at least **3:1** against adjacent colors.

---

## 4. Interactive Feedback & State Checklist

Every interactive element must provide feedback across all 5 fundamental states:
1. **Default**: Clear visual affordance indicating clickability.
2. **Hover / Pressed**: Subtle scale reduction (`0.97`) or opacity change (`0.92–0.95`).
3. **Focused**: Visible accessibility outline / border highlight.
4. **Loading / Pending**: Spinner or skeleton shimmer without resizing the container.
5. **Disabled**: Reduced opacity (`0.4–0.5`), desaturated colors, and disabled touch handlers.

---

## 5. Form Design & Error Handling

- **Floating / Clear Labels**: Always show what field is being filled even when text is typed.
- **Actionable Error Messages**: Never say just "Invalid field". Specify what is wrong (e.g. *"Password must contain at least 6 characters and 1 special symbol"*).
- **Inline Validation**: Validate on blur or after typing pause, never while the user is actively typing their first character.
- **Accessible Inputs**: Form inputs must support password toggles (`Eye` / `EyeOff`), clear buttons, and appropriate keyboard types (`email-address`, `numeric`, `default`).

---

## 6. Zero Drop-Shadow Naturalist Aesthetics

- Avoid heavy artificial drop shadows (`box-shadow: 0 10px 30px rgba(0,0,0,0.25)`).
- Create elevation through:
  1. **Border definition**: Subtle warm borders (`1px solid #EAE6DE`).
  2. **Tonal background contrast**: White cards (`#FFFFFF`) floating on naturalist paper (`#FBF9F4`).
  3. **Pills & Badges**: Organic soft fills (`#FDEBE7`, `#E6EFEA`, `#FFF4DE`) with matching high-contrast text.
