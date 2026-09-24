# redBack.ai Troubleshooting Guide

Common issues encountered across the redBack.ai mobile (Expo SDK 54 / React 19) and backend (Express / TypeScript / MongoDB) environments.

---

## 1. Mobile & Metro Bundling Issues

### Issue: `Unable to resolve "assets/..." from "components/..."`
- **Cause**: Metro bundler resolves static assets starting without `./`, `../`, or an alias as npm packages in `node_modules`.
- **Fix**: Always prefix asset imports with the `@/` project alias configured in `tsconfig.json`:
  ```tsx
  // ❌ Incorrect:
  <ImageBackground source={require("assets/images/spider-bg.png")}>

  // ✅ Correct:
  <ImageBackground source={require("@/assets/images/spider-bg.png")}>
  ```

### Issue: Duplicate Route Warnings or Conflicting Navigation
- **Cause**: Having both `login.tsx` and `LoginScreen.tsx` (or PascalCase route files) in `app/`.
- **Fix**: Use only lowercase/kebab-case filenames (`login.tsx`, `register.tsx`). Delete any PascalCase route files.

### Issue: Safe Area & Dynamic Island Inset Clipping
- **Cause**: Screen content rendering behind the status bar or dynamic island on iOS.
- **Fix**: Always import and wrap screens with `SafeAreaView` from `react-native-safe-area-context` or use `useSafeAreaInsets()`:
  ```tsx
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  const insets = useSafeAreaInsets();
  <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
  ```

### Issue: Lucide Icon Prop Warnings
- **Cause**: Passing incorrect color or size props to `lucide-react-native` icons.
- **Fix**: Always pass explicit `size={number}` and `color={string}`:
  ```tsx
  import { Camera } from 'lucide-react-native';
  import { Palette } from '@/constants/theme';

  <Camera size={24} color={Palette.coral} />
  ```

### Issue: Invalid Flexbox Values (`justifyContent: 'bott'`)
- **Cause**: React Native `justifyContent` accepts only:
  - `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'`
- **Fix**: Ensure valid flexbox properties.

---

## 2. Backend & Database Issues

### Issue: MongoDB Connection Refused (`connect ECONNREFUSED 127.0.0.1:27017`)
- **Cause**: Local MongoDB container is not running.
- **Fix**: Start the MongoDB container using Docker Compose:
  ```bash
  docker compose up -d
  ```
  Verify status:
  ```bash
  docker compose ps
  ```

### Issue: Missing JWT Secrets or Environment Variables
- **Cause**: `.env` file not created from `.env.example`.
- **Fix**: Copy template:
  ```bash
  cd backend && cp .env.example .env
  ```
