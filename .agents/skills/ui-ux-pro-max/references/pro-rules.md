# Common Rules for Professional UI + Pre-Delivery Checklist

Load this file before final delivery of native/mobile app UI (iOS/Android/React Native/Flutter), or when reviewing UI polish, visual consistency, and micro-interactions.

---

## 1. Icons & Visual Elements

| Rule | Standard | Avoid | Why It Matters |
|------|----------|--------|----------------|
| **No Emoji as Structural Icons** | Use vector-based icons (e.g., Lucide, `@expo/vector-icons`). | Using emojis (🎨 🚀 ⚙️) for navigation, settings, or system controls. | Emojis are font-dependent, inconsistent across platforms, and cannot be controlled via design tokens. |
| **Vector-Only Assets** | Use SVG or platform vector icons that scale cleanly and support theming. | Raster PNG icons that blur or pixelate. | Ensures scalability, crisp rendering, and dark/light mode adaptability. |
| **Contextual Semantics** | Hide decorative icons beside visible text from accessibility tree; give standalone icons an accessible label. | Treating icon names as permanently decorative or interactive. | The same glyph serves different purposes across different contexts. |
| **Stable Interaction States** | Use color, opacity, or elevation transitions for press states without changing layout bounds. | Layout-shifting transforms that jitter surrounding content. | Prevents unstable interactions and preserves smooth 60fps motion on mobile. |
| **Consistent Icon Sizing** | Define icon sizes as design tokens (e.g. 16, 20, 24, 32). | Mixing arbitrary values like 19pt, 23pt, 27pt randomly. | Maintains rhythm and visual hierarchy across the interface. |
| **Stroke Consistency** | Use consistent stroke width within the same layer (e.g. 1.5px or 2px). | Mixing hairline and thick stroke styles arbitrarily. | Inconsistent strokes reduce perceived polish and cohesion. |
| **Touch Target Minimum** | Minimum 44pt on iOS and 48dp on Android; expand hit slop when visual icon is small. | Small icons without expanded tap area. | Eliminates tap frustration and mis-clicks. |

---

## 2. Mobile Touch & Interaction Guidelines

| Rule | Best Practice | Anti-Pattern |
|------|---------------|--------------|
| **Tap Feedback** | Provide clear pressed feedback (opacity `0.9`, scale `0.98`) within 80–150ms. | No visual reaction when tapped. |
| **Touch Target Minimum** | Keep tap areas $\ge 44 \times 44\text{ pt}$ (iOS) or $\ge 48 \times 48\text{ dp}$ (Android). | Tiny tap targets (< 40pt) without hit slop. |
| **Thumb Zone Placement** | Primary actions in the bottom 30% of the screen. | Primary CTAs placed in upper screen corners. |
| **Disabled State Clarity** | Use disabled props, reduced opacity (`0.45`), and clear helper text explaining why. | Button looks active but clicking does nothing. |
| **Haptic Feedback** | Subtle haptics (`selectionAsync`, `notificationAsync`) on meaningful milestones. | Constant aggressive vibrations on every scroll tick. |

---

## 3. Pre-Delivery Visual Quality Checklist

- [ ] **Contrast Verification**: All body text $\ge 4.5:1$ against canvas background.
- [ ] **Dynamic Safe Areas**: Root screen uses `useSafeAreaInsets()` to prevent notch and home-bar collisions.
- [ ] **Keyboard Avoidance**: Form screens wrap inputs in `KeyboardAvoidingView`.
- [ ] **No Raw Hex Values**: Colors reference centralized design tokens (`Palette.moss`, `Palette.coral`).
- [ ] **Typography Scale**: Strictly adheres to Display Serif + Modern Sans pairs.
- [ ] **Zero Layout Shifts**: Images define explicit aspect ratios or dimensions (`width`, `height`).
