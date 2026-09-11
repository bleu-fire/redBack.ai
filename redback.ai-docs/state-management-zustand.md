# Frontend State Management (Zustand)

## Overview
In the redBack.ai mobile application (React Native / Expo), we use **Zustand** as our global state management library. It acts as a centralized "store" for data that needs to be accessed by multiple screens or components across the application.

## Why Zustand?
Instead of Redux or React's Context API, we opted for Zustand because:
- **Simplicity:** It requires minimal boilerplate to set up and use.
- **Performance:** It only re-renders components that subscribe to the specific pieces of state that have changed.

## Key Responsibilities of Zustand in redBack.ai

### 1. Managing Authentication & Login State
In `_layout.tsx`, the application routing depends on whether a user is authenticated or not (e.g., `IsAuth`).
- Zustand holds the `isAuthenticated` boolean globally.
- When a user logs in via the `LoginScreen`, we call a Zustand action (e.g., `setAuth(true)`).
- The `_layout.tsx` subscribes to this state and automatically switches from the `(auth)` stack to the main `(tabs)` stack.

### 2. Storing the JWT Auth Token
Upon successful login, the backend returns a JSON Web Token (JWT).
- Zustand stores this token securely in memory.
- Any network request made to the backend (e.g., uploading an image for AI identification) retrieves the token from the Zustand store to attach it to the `Authorization` header.

### 3. Sharing Data Between Screens
Zustand acts as a central repository for cross-screen data. For example:
- A user uploads an image on the **Scanner** screen and receives a species prediction.
- If that prediction history needs to be displayed on a **History** or **Profile** screen, both screens can read from the Zustand store without relying on complex navigation parameters or prop-drilling.

## Next Steps for Implementation
1. Install the package in the mobile directory: `npm install zustand`
2. Create a `store.ts` (or `useAuthStore.ts`) file to initialize the state.
3. Integrate the store into `mobile/app/_layout.tsx` and the authentication screens.
