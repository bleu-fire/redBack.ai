# redBack.ai Mobile Screen Map (13 Core Screens)

This document maps all 13 core screens to their Expo Router paths, visual design concepts, and designated UI components.

Design Assets Reference:
- **Explorer & Scanner**: [`mobile/assets/design/explorer-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/explorer-ui-concept.png)
- **Learning & Taxonomy**: [`mobile/assets/design/student-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/student-ui-concept.png)
- **Authentication**: [`mobile/assets/design/auth-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/auth-ui-concept.png)
- **UI Kit**: [`mobile/assets/design/ui-components-kit.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/ui-components-kit.png)

---

## Screen Routing & UI Component Table

| # | Screen Name | Route Path | File Location | Design Concept | Key UI Components |
|---|---|---|---|---|---|
| 1 | **Splash** | `/` | `mobile/app/index.tsx` | Brand Identity | `redback-logo-white.png`, 3D Spider Asset, Activity Indicator |
| 2 | **Onboarding** | `/onboarding` | `mobile/app/onboarding.tsx` | Field Journal | Hero carousel, naturalist tagline, Primary CTA Button |
| 3 | **Login** | `/(auth)/login` | `mobile/app/(auth)/login.tsx` | `auth-ui-concept.png` | Naturalist foliage background, Floating Input with Icons, Coral CTA, Apple Button |
| 4 | **Register** | `/(auth)/register` | `mobile/app/(auth)/register.tsx` | `auth-ui-concept.png` | *"Start your field notes"*, Full name input, Email & Password, Seal Badge |
| 5 | **Home** | `/(tabs)` | `mobile/app/(tabs)/index.tsx` | `explorer-ui-concept.png` | *"Good to see you, Explorer"*, Identify CTA Card, 3-column stats, Spotlight Species card |
| 6 | **Camera Scanner** | `/scanner` | `mobile/app/scanner.tsx` | `explorer-ui-concept.png` | Viewfinder reticle, Zoom controls (.5, 1x, 3x), Shutter Button, Shutter Modes |
| 7 | **Upload Image** | `/upload` | `mobile/app/upload.tsx` | Explorer flow | Photo gallery picker, aspect preview, Crop & Submit CTA |
| 8 | **AI Results** | `/results` | `mobile/app/results.tsx` | `explorer-ui-concept.png` | Top match photo, `96% Match` badge, `Venomous` pill, Safety Warning Card |
| 9 | **Species Details** | `/species/[id]` | `mobile/app/species/[id].tsx` | `explorer-ui-concept.png` | Taxonomy tabs (About, Safety, Habitat, Similar), Distribution map, High-res gallery |
| 10 | **Search / Explore** | `/(tabs)/explore` | `mobile/app/(tabs)/explore.tsx` | `explorer-ui-concept.png` | Search bar, Filter chips (All, Common, Venomous, Jumping), 2-column species grid |
| 11 | **Learning Center** | `/(tabs)/learn` | `mobile/app/(tabs)/learn.tsx` | `student-ui-concept.png` | Lesson hero card, Spider anatomy interactive diagram, Quiz module, 7-day streak pill |
| 12 | **User Profile** | `/(tabs)/profile` | `mobile/app/(tabs)/profile.tsx` | `student-ui-concept.png` | Explorer avatar, Level & XP progress bar, My Learning circular gauges, Saved species |
| 13 | **Settings** | `/settings` | `mobile/app/settings.tsx` | System preferences | Theme toggle, Account details, Medical Safety Disclaimer, Version & Credits |

---

## Expo Router File-Naming & Navigation Rules

1. **Lowercase Only**: Always use kebab-case or lowercase filenames (e.g., `login.tsx`, never `LoginScreen.tsx`).
2. **One File Per Route**: Never create duplicate routes in `app/`.
3. **Leading Slash in Navigation**: Always pass routes starting with `/` (e.g. `router.replace('/(tabs)')` or `router.push('/(auth)/register')`).
4. **Dynamic Routes**: Use bracket syntax for parameters (e.g. `app/species/[id].tsx` accessible via `useLocalSearchParams<{ id: string }>()`).
