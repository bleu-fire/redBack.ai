# redBack.ai Mobile Screen Map (13 Core Screens)

This document maps all 13 core screens defined in `docs/screen-map.md` to their corresponding Expo Router file paths.

---

## Screen Routing Table

| # | Screen Name | Route Path | File Location | Purpose & Key Features |
|---|---|---|---|---|
| 1 | **Splash** | `/` | `mobile/app/index.tsx` | Brand display, app initialization, auth state check |
| 2 | **Onboarding** | `/onboarding` | `mobile/app/onboarding.tsx` | Value proposition walkthrough, feature overview |
| 3 | **Login** | `/(auth)/login` | `mobile/app/(auth)/login.tsx` | User authentication, navigation to register / main app |
| 4 | **Register** | `/(auth)/register` | `mobile/app/(auth)/register.tsx` | New user account creation |
| 5 | **Home** | `/(tabs)` | `mobile/app/(tabs)/index.tsx` | Main dashboard: quick camera scan, recent IDs, daily spider fact |
| 6 | **Camera Scanner** | `/scanner` | `mobile/app/scanner.tsx` | Live camera viewfinder, capture spider image |
| 7 | **Upload Image** | `/upload` | `mobile/app/upload.tsx` | Gallery image picker, crop / preview before identification |
| 8 | **AI Results** | `/results` | `mobile/app/results.tsx` | Ranked species prediction, confidence %, venom warning, match cards |
| 9 | **Species Details** | `/species/[id]` | `mobile/app/species/[id].tsx` | Deep species profile: taxonomy, venom severity, habitat, distribution map |
| 10 | **Search / Explore** | `/(tabs)/explore` | `mobile/app/(tabs)/explore.tsx` | Search species catalog by common/scientific name, family filter |
| 11 | **Learning Center** | `/(tabs)/learn` | `mobile/app/(tabs)/learn.tsx` | Educational modules: anatomy, spider vs insect, bite safety |
| 12 | **User Profile** | `/(tabs)/profile` | `mobile/app/(tabs)/profile.tsx` | User stats, past saved identifications, sighting count |
| 13 | **Settings** | `/settings` | `mobile/app/settings.tsx` | App preferences, dark/light theme, account management, legal & disclaimers |

---

## Expo Router File-Naming Rules

1. **Lowercase Only**: Always use kebab-case or lowercase filenames (e.g., `login.tsx`, not `LoginScreen.tsx`).
2. **One File Per Route**: Never create multiple files representing the same route in `app/`.
3. **Leading Slash in Navigation**: Always pass routes starting with `/` (e.g. `router.replace('/(tabs)')` or `router.push('/(auth)/register')`).
4. **Dynamic Routes**: Use bracket syntax for parameters (e.g. `app/species/[id].tsx` accessible via `useLocalSearchParams()`).

