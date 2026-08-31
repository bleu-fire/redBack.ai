# Product Requirements Document — redback.ai

## 1. Vision

Build an accessible spider-exploration platform that turns a photograph into an understandable species identification experience while helping users learn about spiders and biodiversity.

## 2. Problem

People frequently encounter spiders without knowing what species they are looking at. Existing identification workflows can be difficult for non-specialists, while generic AI answers may be inconsistent or poorly sourced.

## 3. Solution

A mobile application lets a user capture or upload an image. The backend validates and processes the image, invokes a vision model, resolves the prediction against a scientific species catalog, and returns a ranked result with confidence, taxonomy, habitat, distribution, behavior, venom/toxicity context, conservation status, and sources.

## 4. Target users

- Nature enthusiasts
- Students
- Teachers
- Researchers
- Wildlife photographers
- Hikers
- Gardeners
- Families
- Citizen scientists

## 5. Goals

- Fast spider image identification.
- Explain results in clear language.
- Provide scientific context and sources.
- Distinguish identification confidence from medical/toxicity claims.
- Support search and educational discovery.

## 6. Non-goals for current scope

- Guaranteed species-level identification.
- Medical diagnosis or bite treatment.
- Autonomous emergency response.
- Social network functionality.
- Notifications, quizzes, favorites, or a separate learning-module system.

## 7. User journey

`Splash → Onboarding → Auth → Home → Camera/Upload → AI Results → Species Details`

Secondary discovery path:

`Home → Search → Species Details`

Education path:

`Home → Learning Center`

Account path:

`Home → User Profile → Settings`

## 8. Success metrics

- Identification completion rate.
- Median time from image submission to result.
- Result-view rate.
- Species-detail engagement.
- Search success rate.
- User-reported identification usefulness.
- AI abstention/low-confidence rate.
- API error rate.

## 9. Functional requirements

### Authentication
- Register with full name, email, password.
- Login and receive access token.
- Authenticated `/me` endpoint.
- Logout by deleting local credentials; server-side refresh-token revocation may be added later.

### Identification
- Capture image with device camera.
- Select image from device.
- Validate file type and size.
- Upload securely.
- Show processing state.
- Return ranked predictions.
- Show confidence and an explicit low-confidence state.

### Species details
- Common name.
- Scientific name.
- Taxonomy.
- Habitat.
- Geographic distribution.
- Behavior.
- Venom/toxicity information with careful wording.
- Conservation status when available.
- Sources/references.
- Similar species.

### Search
- Search by common/scientific name.
- Paginated results.
- Species detail navigation.

### Learning Center
- AI-assisted educational explanations backed by structured species data.
- Topics can include anatomy, identification clues, habitat, behavior, and safety.

### Profile/settings
- View/update profile basics.
- Privacy settings.
- Account/session management.
- App preferences.

## 10. UX requirements

- Mobile-first.
- Clear primary action on Home.
- Accessible typography and contrast.
- Avoid presenting confidence as certainty.
- Show source attribution near scientific claims.
- Handle no-match and low-quality images gracefully.
