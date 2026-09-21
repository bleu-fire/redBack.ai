# Mobile Screen Map — redBack.ai

The mobile application is built using Expo Router with 13 core screens mapped below:

---

## Screen Routing Table

| # | Screen Name | Route Path | File Location | Key Purpose |
|---|---|---|---|---|
| 1 | **Splash** | `/` | `mobile/app/index.tsx` | App startup, brand animation, token validation |
| 2 | **Onboarding** | `/onboarding` | `mobile/app/onboarding.tsx` | Feature carousel, educational value proposition |
| 3 | **Login** | `/(auth)/login` | `mobile/app/(auth)/login.tsx` | User login screen |
| 4 | **Register** | `/(auth)/register` | `mobile/app/(auth)/register.tsx` | New account registration |
| 5 | **Home Dashboard** | `/(tabs)` | `mobile/app/(tabs)/index.tsx` | Daily spider fact, quick scan CTA, recent sightings |
| 6 | **Camera Scanner** | `/scanner` | `mobile/app/scanner.tsx` | Live camera viewfinder to photograph spiders |
| 7 | **Upload Image** | `/upload` | `mobile/app/upload.tsx` | Gallery selector with crop & preview |
| 8 | **AI Results** | `/results` | `mobile/app/results.tsx` | Top species matches, confidence %, venom danger badge |
| 9 | **Species Details** | `/species/[id]` | `mobile/app/species/[id].tsx` | Deep species profile: taxonomy, venom, habitat |
| 10 | **Explore / Search**| `/(tabs)/explore` | `mobile/app/(tabs)/explore.tsx` | Search catalog with family filtering & pagination |
| 11 | **Learning Center** | `/(tabs)/learn` | `mobile/app/(tabs)/learn.tsx` | Anatomy lessons, bite first-aid, myths vs facts |
| 12 | **Profile** | `/(tabs)/profile` | `mobile/app/(tabs)/profile.tsx` | User stats, past scans, personal collection |
| 13 | **Settings** | `/settings` | `mobile/app/settings.tsx` | Theme toggle, language switch, medical disclaimer |

---

## Expo Router Rules
1. **Lowercase Only**: Always use kebab-case or lowercase filenames (e.g. `login.tsx`, not `LoginScreen.tsx`).
2. **One File Per Route**: Never duplicate screen files in `app/`.
3. **Leading Slash in Navigation**: Always use `router.push('/(tabs)/explore')`.
4. **Dynamic Routes**: Use bracket syntax for parameters (e.g. `app/species/[id].tsx`).

