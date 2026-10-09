---
name: redback-ui-architecture
description: >-
  Principal Mobile Product Design, Layout Architecture, and Design Engineering
  system for redBack.ai. Enforces the Adventure Naturalist personality, strict 8pt
  spacing grid, 20px page padding, One Screen = One Primary Decision rule, tactile
  1.5px/3px card depth, and progressive disclosure layout balancing.
---

# redBack.ai — UI/UX Architecture & Layout System

## 1. Role & Product Personality
- **Role:** Principal Mobile Product Designer & Senior Design Engineer.
- **Product:** redBack.ai — Field intelligence companion for wildlife encounters.
- **Core Experience:** Observe → Investigate → Identify → Understand → Assess → Learn → Record.
- **Aesthetic:** **Adventure Naturalist** (AllTrails utility × NatGeo authority × Duolingo retention × Garmin clarity).
- **Tone:** Calm, intelligent, field-ready, reliable, scientific, modern, human, practical.
- **Strictly Avoid:** Generic AI chatbot UI, cyberpunk/neon accents, random gradients, decorative cards, random emojis, or "vibe-coded" layouts.

---

## 2. Golden UX Rules

### Rule 1: ONE SCREEN = ONE PRIMARY DECISION
Every screen must answer exactly one primary user question:
- **Home:** *"What should I do next?"*
- **Identify / Scanner:** *"How do I capture this observation?"*
- **Result:** *"What did I find? Is it safe?"*
- **Species Detail:** *"Why is this species likely? What are its traits?"*
- **Compare:** *"Which species is more likely and what is the difference?"*
- **Learn:** *"What competency should I master next?"*
- **Journal:** *"What have I documented in the field?"*
- **Safety / Emergency:** *"What clinical action do I take immediately?"*

### Rule 2: SUBTRACTION BEFORE ADDITION
Never add a card or widget just to fill empty space. If an element does not directly help the user understand, decide, navigate, act, or learn: **remove it**.

### Rule 3: STRICT ZERO UNICODE EMOJIS
Use strictly Lucide vector icons (`lucide-react-native`). No emojis in UI labels, badges, or buttons.

---

## 3. Global App Shell & Layout Grid

### Global Page Padding: 20px
All major content aligns to the exact same left and right edges (`Spacing.xl = 20` or `Spacing.lg = 16` depending on safe boundaries):
```text
20px
│
├── Header
├── Content
├── Cards
├── Sections
└── Actions
│
20px
```

### 8pt Spacing Scale
Never use arbitrary values (e.g. 13px, 17px, 27px, 31px):
```ts
Spacing = {
  xs: 4,      // micro spacing
  sm: 8,      // tight spacing
  md: 12,     // small component spacing
  lg: 16,     // default component spacing
  xl: 20,     // page margin / content padding
  xxl: 24,    // content separation
  xxxl: 32,   // section separation
}
```

---

## 4. 60 / 30 / 10 Color System

- **60% Neutral Background:** Warm Canvas Parchment (`#FAF7F2`)
- **30% Structure & Surfaces:** Card White (`#FFFFFF`), Ink Primary (`#18201E`), Muted Ink (`#6B7672`), Borders (`#E4DDD3`)
- **10% Functional Accents (Communicates Meaning Only):**
  - **Forest Green (`#2B8A3E`, pressed `#1E6332`):** Primary action, active states, verified traits.
  - **Crimson (`#E03131`, pressed `#B02525`):** ONLY for emergency, dangerous species, clinical warnings.
  - **Solar Amber (`#F59E0B`):** Caution, uncertainty, attention.
  - **Achievement Gold (`#FAB005`):** XP, milestones, streaks.

---

## 5. Tactile Card & Button Architecture

### Tactile Physical Card Depth
All primary cards must feature physical depth rather than flat borders or floating blur:
```ts
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: Radii.lg, // 16-20px
  borderWidth: 1.5,
  borderColor: '#E4DDD3',
  borderBottomWidth: 3,
  borderBottomColor: '#D8D0C5',
  padding: Spacing.md,
}
```

### Touch Targets
- Minimum touch target: **48 × 48dp**.
- Primary CTA height: **50–52dp**.

---

## 6. Layout Balancer Strategy (Long Text)
When dealing with variable-length text (scientific summaries, clinical advice, trivia):
- Use `<TruncatedText numberOfLines={2 | 3} expandLabel="..." collapseLabel="..." />`.
- Prevents cards from breaking layout heights while preserving full progressive disclosure depth.

---

## 7. Emergency & Safety Protocol Rules
- **ZERO gamification:** No XP, no streak badges, no Reddy mascot, no playful animation during emergency bite triage.
- High medical authority with instant 1-tap phone dialer.
