# redBack.ai Modern Design System Specification

Welcome to the definitive **Design System Specification** for redBack.ai. This system bridges **naturalist field-journal authenticity** with **modern, responsive mobile UI standards** for React Native and Expo SDK 54.

Visual references:
- **UI Kit & Components**: [`mobile/assets/design/ui-components-kit.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/ui-components-kit.png)
- **Explorer & Scanner Flow**: [`mobile/assets/design/explorer-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/explorer-ui-concept.png)
- **Learning & Taxonomy Flow**: [`mobile/assets/design/student-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/student-ui-concept.png)
- **Authentication Flow**: [`mobile/assets/design/auth-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/auth-ui-concept.png)

---

## 1. Color Palette Tokens

All colors are defined in [`mobile/constants/theme.ts`](file:///c:/Users/user/Desktop/redBack.ai/mobile/constants/theme.ts).

| Token Name | Hex Code | Role & Usage | Visual Category |
|---|---|---|---|
| `Palette.coral` | `#E04836` | Signature Redback Crimson. Primary CTA buttons, active tab indicators, camera trigger. | Brand Primary |
| `Palette.coralSoft` | `#FDEBE7` | Soft coral background for warning badges, hazard highlights, and alert cards. | Accent / Alert |
| `Palette.coralDark` | `#C83D32` | Pressed button states, high-contrast borders. | Interactive |
| `Palette.moss` | `#2C4A3E` | Deep botanical forest green. Secondary cards, learning headers, organic containers. | Ecological Brand |
| `Palette.mossSoft` | `#E6EFEA` | Soft sage green. Non-venomous/common species pills, progress indicators. | Ecological Subtle |
| `Palette.canvas` | `#FBF9F4` | Warm naturalist paper canvas. Global screen background. | Surface Base |
| `Palette.paper` | `#FFFFFF` | Pure white. Floating cards, modal sheets, bottom tab bar. | Card Surface |
| `Palette.ink` | `#17211F` | Deep charcoal ink. Primary display headings, high-contrast text. | Typography |
| `Palette.muted` | `#6E7773` | Subdued gray-green slate. Subtitles, metadata, inactive tab icons. | Typography Subtle |
| `Palette.line` | `#EAE6DE` | Warm border delimiter for cards, dividers, input outlines. | Border |
| `Palette.gold` | `#E59824` | Solar amber. Streak flames, XP counters, "Popular" tags, quiz rewards. | Gamification |
| `Palette.danger` | `#D32F2F` | Medical alert red. Venomous classification, urgent bite warnings. | Safety Critical |

---

## 2. Typography Pairings

redBack.ai employs an editorial naturalist hierarchy:

```text
Display & Headings: Editorial Serif (ui-serif, Georgia, Times New Roman)
Body & Interactive: Crisp Modern Sans-Serif (system-ui, -apple-system, Roboto)
Data & Taxa Codes:  Monospace (ui-monospace, SFMono-Regular, Menlo)
```

### Hierarchy Scale
- **Display Hero (H1)**: 28–32pt, Serif, Bold (`#17211F`). Used for: *"Good to see you, Explorer."*, *"Redback spider"*, *"Spider Anatomy"*.
- **Section Heading (H2)**: 20–24pt, Serif or Heavy Sans (`#17211F`).
- **Card Title (H3)**: 16–18pt, SemiBold/Bold (`#17211F`).
- **Body Regular**: 14–15pt, Sans-serif, Regular (`#3C4543`), Line-height: 20–22pt.
- **Scientific Name**: 13–14pt, Serif, *Italic* (`#6E7773`), e.g. *Latrodectus hasselti*.
- **Caption / Pill Label**: 11–12pt, Sans-serif, Bold/Medium, Letter-spacing +0.5.
- **Stats / Metric Counter**: 24–30pt, Heavy Sans-serif (`#17211F`).

---

## 3. Core Component Blueprints

### A. Primary Action Button (CTA)
- **Container**: `backgroundColor: Palette.coral`, `borderRadius: 24`, `height: 54`, `paddingHorizontal: 20`.
- **Layout**: Centered or Space-between with text on the left and a circle with right arrow (`ChevronRight` or `ArrowRight`) on the right.
- **Typography**: `color: '#FFFFFF'`, `fontSize: 16`, `fontWeight: '700'`.

### B. Secondary & OAuth Buttons
- **Dark Secondary**: `backgroundColor: Palette.moss`, `borderRadius: 24`, white text.
- **Outlined / White**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 24`, dark ink text.

### C. Featured / Spotlight Species Card
- **Container**: `backgroundColor: Palette.paper` or `Palette.moss`, `borderRadius: 24`, `overflow: 'hidden'`, subtle border `1px solid Palette.line`.
- **Image**: High-definition spider imagery with `contentFit="cover"`.
- **Tags**: Floating badges (`Venomous`, `Common`, `Spotlight`) positioned top-left over the image or metadata container.

### D. Soft Safety Warning Card
- **Container**: `backgroundColor: Palette.coralSoft`, `borderColor: Palette.dangerBorder`, `borderWidth: 1`, `borderRadius: 18`, `padding: 16`.
- **Icon**: `AlertTriangle` in `#D32F2F`.
- **Typography**: Title in bold red, body in `#17211F` reminding users that identification is educational and to seek emergency care for bites.

### E. Observation Metrics (3-Column Counter)
- **Container**: White paper card (`Palette.paper`), `borderRadius: 20`, `padding: 16`, horizontal flex with 2 vertical line dividers (`Palette.line`).
- **Columns**:
  1. `2,847` (Identified)
  2. `156` (In Catalog)
  3. `12` (Habitats)

### F. Pill Tags & Badges
- **Venomous**: `backgroundColor: Palette.coralSoft`, text `Palette.danger`, label *"⚠️ Venomous"*.
- **Common**: `backgroundColor: Palette.mossSoft`, text `Palette.moss`, label *"🌿 Common"*.
- **AI Match**: `backgroundColor: '#1E352C'`, text `'#FFFFFF'`, label *"✓ AI IDENTIFICATION 96% match"*.
- **Popular / Streak**: `backgroundColor: Palette.goldSoft`, text `Palette.gold`, label *"🔥 7 day streak"*.

### G. Form Inputs
- **Container**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 16`, `height: 52`, `paddingHorizontal: 16`.
- **Elements**: Leading naturalist icon (`Mail`, `Lock`, `User`) in `#6E7773`, text input, trailing password visibility toggle (`Eye` / `EyeOff`).

---

## 4. Spacing & Border Radii Standards

```ts
Spacing: {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32
}
Radii: {
  sm: 10, md: 14, lg: 18, xl: 22, xxl: 28, pill: 9999
}
```

- **Cards**: `Radii.xl` (22pt) or `Radii.xxl` (28pt)
- **Buttons**: `Radii.xxl` (24–28pt) or `Radii.pill`
- **Badges/Pills**: `Radii.pill` (9999)
- **Inputs**: `Radii.md` (14–16pt)
