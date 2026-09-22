# redback.ai — Spider Explorer AI

redback.ai is a mobile-first AI application for identifying spider species from photographs and presenting reliable scientific and educational information about the identified species.

## Documentation

- **PRD (Product Requirements):** [`docs/01-PRD.md`](docs/01-PRD.md)
- **System Architecture & Stack:** [`docs/02-ARCHITECTURE.md`](docs/02-ARCHITECTURE.md)
- **API Specifications & Endpoints:** [`docs/03-API-SPECS.md`](docs/03-API-SPECS.md)
- **Mobile Screen Map (Expo Router):** [`docs/04-SCREEN-MAP.md`](docs/04-SCREEN-MAP.md)

## Current product scope

The current Redback screen list contains 13 screens:
1. Splash
2. Onboarding
3. Login
4. Register
5. Home
6. Camera Scanner
7. Upload Image
8. AI Results
9. Species Details
10. Search
11. Learning Center
12. User Profile
13. Settings

Notification, quiz, favorite, and standalone learning-module features were removed from the earlier class-diagram scope. Learning content remains represented by the Learning Center screen and can be powered through the AI/API approach.

## System Architecture & Class Diagram

The core architecture follows the MVC pattern separating Mongoose domain models from API controllers:

```mermaid
classDiagram
direction TB

%% ==========================================
%% 1. MODELS / ENTITIES (Properties & Methods)
%% ==========================================

class User {
    %% --- Properties (Attributes) ---
    +ObjectId _id
    +String name
    +String email
    +String password
    +String avatar
    +String role
    +Date createdAt
    +Date updatedAt

    %% --- Methods (Operations) ---
    +comparePassword(String candidatePassword) Boolean
    +generateAuthToken() String
    +toSafeObject() Object
}

class Species {
    %% --- Properties (Attributes) ---
    +ObjectId _id
    +String scientificName
    +String commonName
    +String family
    +String genus
    +String description
    +String habitat
    +String distribution
    +String behavior
    +String venomInfo
    +String conservationStatus
    +Array~String~ imageUrls
    +Date createdAt
    +Date updatedAt

    %% --- Methods (Operations) ---
    +isVenomous() Boolean
    +getPrimaryImage() String
    +getSummary() String
}

class Identification {
    %% --- Properties (Attributes) ---
    +ObjectId _id
    +ObjectId userId
    +String imageUrl
    +String status
    +String uncertaintyLevel
    +Date createdAt
    +Date updatedAt

    %% --- Methods (Operations) ---
    +getTopPrediction() Prediction
    +isConfirmed() Boolean
    +addPrediction(Prediction prediction) void
}

class Prediction {
    %% --- Properties (Attributes) ---
    +ObjectId speciesId
    +String scientificName
    +String commonName
    +Number confidence
    +Number rank
    +String confidenceBand

    %% --- Methods (Operations) ---
    +isHighConfidence() Boolean
    +getConfidencePercentage() String
}

class LearningTopic {
    %% --- Properties (Attributes) ---
    +ObjectId _id
    +String slug
    +String title
    +String content
    +String category
    +String sourceUrl
    +Date createdAt
    +Date updatedAt

    %% --- Methods (Operations) ---
    +getReadingTime() Number
    +getSummary() String
}

%% ==========================================
%% 2. CONTROLLERS (Properties & Methods)
%% ==========================================

class AuthController {
    %% --- Properties (Dependencies) ---
    -AuthService authService

    %% --- Methods (API Handlers) ---
    +register(Request req, Response res, NextFunction next) Promise
    +login(Request req, Response res, NextFunction next) Promise
    +getAllUsers(Request req, Response res, NextFunction next) Promise
}

class SpeciesController {
    %% --- Properties (Dependencies) ---
    -SpeciesModel speciesModel

    %% --- Methods (API Handlers) ---
    +createSpecies(Request req, Response res, NextFunction next) Promise
    +getAllSpecies(Request req, Response res, NextFunction next) Promise
    +searchSpecies(Request req, Response res, NextFunction next) Promise
    +getSpeciesById(Request req, Response res, NextFunction next) Promise
    +updateSpecies(Request req, Response res, NextFunction next) Promise
    +deleteSpecies(Request req, Response res, NextFunction next) Promise
}

class IdentificationsController {
    %% --- Properties (Dependencies) ---
    -AIService aiService
    -IdentificationModel idModel

    %% --- Methods (API Handlers) ---
    +createIdentification(Request req, Response res, NextFunction next) Promise
    +getAllIdentifications(Request req, Response res, NextFunction next) Promise
    +getIdentificationById(Request req, Response res, NextFunction next) Promise
}

class LearningController {
    %% --- Properties (Dependencies) ---
    -LearningModel learningModel

    %% --- Methods (API Handlers) ---
    +getAllTopics(Request req, Response res, NextFunction next) Promise
    +getTopicBySlug(Request req, Response res, NextFunction next) Promise
    +createTopic(Request req, Response res, NextFunction next) Promise
}

%% ==========================================
%% 3. RELATIONSHIPS
%% ==========================================

%% Model Relationships
User "1" --> "*" Identification : creates
Identification "1" *-- "*" Prediction : contains
Prediction "*" --> "1" Species : references

%% Controller to Model Dependencies
AuthController ..> User : manages
SpeciesController ..> Species : manages
IdentificationsController ..> Identification : processes
LearningController ..> LearningTopic : manages
```

## Suggested stack

- Mobile: React Native + Expo + Expo Router
- Backend: Express.js (TypeScript) + MongoDB (Mongoose)
- Auth: JWT + bcrypt/argon2-equivalent password hashing
- AI integration: external vision-capable AI API, abstracted behind the backend
- Scientific/search data: curated database plus external/open biodiversity sources where licensing and reliability permit
- Storage: object storage for uploaded images
- Optional async jobs: Redis + BullMQ

## Principles

1. AI predictions are probabilistic, not absolute.
2. Venom/toxicity information must be presented conservatively and with source attribution.
3. Scientific names and taxonomy should be traceable to authoritative sources.
4. User images are private by default.
5. API keys and model credentials never live in the mobile client.
