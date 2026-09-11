# redBack.ai Troubleshooting Guide

Common issues encountered across the redBack.ai mobile (Expo) and backend (Express/MongoDB) environments.

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

### Issue: Invalid Flexbox Values (`justifyContent: 'bott'`)
- **Cause**: React Native `justifyContent` accepts only:
  - `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'`
- **Fix**: Ensure valid flexbox properties:
  ```tsx
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ```

### Issue: Full-Screen Background Image Sizing
- **Cause**: Wrapping individual buttons or child elements instead of the screen root container.
- **Fix**: Wrap the screen component's root in `ImageBackground`:
  ```tsx
  import { ImageBackground } from 'expo-image';

  <ImageBackground
    source={require('@/assets/images/spider-bg.png')}
    style={{ flex: 1, width: '100%', height: '100%' }}
    contentFit="cover"
  >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
      {/* Screen contents */}
    </View>
  </ImageBackground>
  ```

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

