# Statement of Work & Project Specifications (Cahier des Charges) — redBack.ai

---

## 1. Project Overview & Context

- **Project Name:** redBack.ai
- **Application Type:** AI-Powered Spider Identification, Venom Safety & Educational Taxonomy Mobile Application.
- **Core Mission:** Empower outdoor explorers, students, biologists, and everyday households to instantly identify spider species through real-time camera capture or gallery uploads, understand toxicity risk levels, and access critical bite safety knowledge.
- **Key Deliverables:**
  1. Instant species detection with confidence scoring.
  2. Toxicity and venom severity classification (Harmless, Mildly Venomous, Medically Significant / Dangerous).
  3. Actionable first-aid guidance paired with an unavoidable emergency medical disclaimer.
  4. Searchable arachnid knowledge base and personal observation logging.

---

## 2. Target Audience & User Personas

1. **The Outdoor Explorer / Hiker:** Encounters wild spiders in nature, camps, or hiking trails; requires quick, reliable hazard risk identification.
2. **The Biology Student / Enthusiast:** Studies arachnology; seeks taxonomic classifications, anatomical facts, and tools to build a personal sighting collection.
3. **The Household Resident:** Spots an unfamiliar spider in a garden, bathroom, or garage; needs fast answers on potential threats to children or domestic pets.

---

## 3. Functional Requirements

### 3.1 Authentication & User Management Module
- New user account registration with salted and hashed passwords (`bcrypt`).
- Secure login generating JSON Web Tokens (`JWT`).
- Token validation and authenticated session persistence.
- Role-based route authorization via Express middleware (`auth.middleware.ts`).

### 3.2 AI Vision & Identification Pipeline Module
- Integrated camera viewfinder with alignment grid (`mobile/app/scanner.tsx`).
- Image upload support with client-side cropping and review (`mobile/app/upload.tsx`).
- Multi-tier classification logic:
  - **Confidence ≥ 70%:** Return ranked species match, scientific/common name, and venom risk badge.
  - **Confidence < 70%:** Fallback to genus/family tier (e.g., *Latrodectus sp.* or *Theridiidae*) and prompt user to retake the photo with improved lighting or a closer angle.
- **Mandatory Medical Disclaimer:** Permanent visual warning clearly stating that AI results are educational and never substitute professional emergency medical treatment.

### 3.3 Encyclopedia & Exploration Module
- Indexed catalog containing comprehensive species records.
- Real-time search query matching common names or scientific names.
- Multi-family filters (e.g., *Theridiidae*, *Araneidae*, *Salticidae*) and paginated responses (default: 10, max: 50) for mobile performance.
- Deep species profiles detailing taxonomy, native habitat, geographical distribution, nocturnal/diurnal behavior, and photo galleries.

### 3.4 Sighting Observations & History Module
- Ability for authenticated users to log individual spider encounters.
- Record storage including captured photo URL, identified species ID, timestamp, and optional geographical coordinates (GPS).
- Personal statistics dashboard displaying total sightings, unique species discovered, and timeline.

### 3.5 Learning Center & Settings Module
- Educational guides (spider vs. insect morphology, web construction types, emergency bite response).
- User preferences: Dark / Light visual theme toggle.
- Internationalization support (English, Arabic, Japanese).

---

## 4. Technical Architecture & Non-Functional Requirements

### 4.1 Technology Stack
- **Front-End (Mobile):** React Native with Expo SDK 54, utilizing Expo Router for file-based routing across 13 standardized screens.
- **Back-End (API):** Node.js runtime with Express.js written in TypeScript (ES2021). Structured using **Feature-Based / Modular Architecture**:
  - `src/modules/auth/`
  - `src/modules/species/`
  - `src/modules/identifications/`
  - `src/modules/observations/`
- **Database:** MongoDB document store managed through Mongoose ODM.
- **Testing:** Standalone unit tests powered by TypeScript execution runners.

### 4.2 Security & Performance Standards
- **Zero Client-Side Secrets:** AI vision API keys and database connection strings must reside exclusively in backend environment variables (`.env`).
- **Response Latency:** Sub-1.5s response time for catalog queries; sub-3s response time for AI image inference.
- **Data Protection:** Standardized error handling preventing stack trace leaks; centralized `error.middleware.ts` for safe client messaging.

---

## 5. Screen Routing Map (13 Core Screens)

| # | Screen | Route Path | File Location | Primary Function |
|---|---|---|---|---|
| 1 | **Splash** | `/` | `mobile/app/index.tsx` | App startup, logo animation, session check |
| 2 | **Onboarding** | `/onboarding` | `mobile/app/onboarding.tsx` | Feature walkthrough and value proposition |
| 3 | **Login** | `/(auth)/login` | `mobile/app/(auth)/login.tsx` | User authentication form |
| 4 | **Register** | `/(auth)/register` | `mobile/app/(auth)/register.tsx` | Account registration form |
| 5 | **Home** | `/(tabs)` | `mobile/app/(tabs)/index.tsx` | Daily facts, quick scan CTA, recent sightings |
| 6 | **Scanner** | `/scanner` | `mobile/app/scanner.tsx` | Live camera viewfinder for spider photos |
| 7 | **Upload** | `/upload` | `mobile/app/upload.tsx` | Gallery selector with cropping & preview |
| 8 | **AI Results** | `/results` | `mobile/app/results.tsx` | Ranked species prediction, confidence %, venom badge |
| 9 | **Species Details** | `/species/[id]` | `mobile/app/species/[id].tsx` | Detailed taxonomic profile, venom info, distribution |
| 10 | **Explore** | `/(tabs)/explore` | `mobile/app/(tabs)/explore.tsx` | Searchable catalog with family filter tabs |
| 11 | **Learn** | `/(tabs)/learn` | `mobile/app/(tabs)/learn.tsx` | Anatomy guides, bite safety, myth busting |
| 12 | **Profile** | `/(tabs)/profile` | `mobile/app/(tabs)/profile.tsx` | User stats, discovery collection, saved sightings |
| 13 | **Settings** | `/settings` | `mobile/app/settings.tsx` | Theme selection, language preferences, legal disclaimers |

---

## 6. Implementation Sprints & Roadmap

- **Sprint 1 — Core Foundation & Exploration:**
  - Standardize backend modular architecture and Mongoose schemas.
  - Implement authentication pipeline (`auth.service.ts`, JWT, bcrypt) and mobile login/register screens.
  - Seed initial spider database catalog and build mobile Explore catalog with search.
- **Sprint 2 — AI Vision Engine & Observations:**
  - Build camera scanner and image gallery picker screens.
  - Integrate backend AI Vision endpoint with confidence evaluation and toxicity badges.
  - Implement user observation logging and history tracking.
- **Sprint 3 — Education, Polish & Production Release:**
  - Complete Learning Center screens and multi-language support.
  - Execute test suite (`npm test`) and resolve all TypeScript validations.
  - Generate standalone release bundle (Android APK via Expo EAS).
