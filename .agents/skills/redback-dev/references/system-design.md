# redBack.ai System Design & Architecture Specification

Welcome to the comprehensive **System Design & Architecture Specification** for redBack.ai. This document details the **Modern Modular Monolith** backend architecture, **Pinecone Vector Database** AI vision pipeline, full-stack data flow, and medical safety guardrails.

---

## 1. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Tier1 ["Tier 1: Mobile Client (React Native / Expo SDK 54)"]
        Scanner["Camera Scanner (/scanner)"]
        Explorer["Taxonomy Explorer (/(tabs)/explore)"]
        Cache["Offline Sighting Cache (AsyncStorage)"]
        UI["Field-Journal UI (Serif + Sans)"]
        Scanner --> UI
        UI --> Cache
    end

    subgraph Tier2 ["Tier 2: Modern Modular Monolith Backend (Express.js / TypeScript)"]
        SharedKernel["Shared Kernel (Auth Middleware, Error Handler, Upload)"]
        AuthModule["Auth Module\n(JWT, User Domain)"]
        SpeciesModule["Species Catalog Module\n(Taxonomy, Field Guide)"]
        IdentModule["Identification Module\n(AI Orchestration, Sightings)"]
        LearnModule["Learning Module\n(Topics, Quizzes, Citizen Science)"]
        
        SharedKernel --> AuthModule
        SharedKernel --> SpeciesModule
        SharedKernel --> IdentModule
        SharedKernel --> LearnModule
    end

    subgraph Tier3 ["Tier 3: AI Vision & Vector Pipeline"]
        Embedder["Vision Embedding Generator (CLIP/SigLIP)"]
        Pinecone[("Pinecone Vector Database\n(Visual Similarity & Fast K-NN)")]
        VisionModel["Multimodal AI Vision Model\n(Morphology Verification)"]
        ConfidenceCheck{"Confidence >= 70%?"}
        Ranker["Taxonomy Normalizer & Ranker"]
        Fallback["Genus / Family Level Fallback"]
        
        Embedder --> Pinecone
        Pinecone --> VisionModel
        VisionModel --> ConfidenceCheck
        ConfidenceCheck -- Yes --> Ranker
        ConfidenceCheck -- No --> Fallback
    end

    subgraph Tier4 ["Tier 4: Persistence & Storage"]
        MongoDB[("MongoDB (Mongoose)\nStructured Species, Users & Observations")]
        CloudStorage[("Cloud Object Storage\nOptimized Spider Photos")]
    end

    Scanner -- "POST /api/v1/identifications (multipart)" --> SharedKernel
    IdentModule -- "Image Buffer" --> Embedder
    Ranker --> MongoDB
    Fallback --> MongoDB
    IdentModule --> CloudStorage
```

---

## 2. Backend Architecture: Modern Modular Monolith

Rather than a tightly-coupled traditional MVC or overly complex distributed microservices, redBack.ai employs a **Modern Modular Monolith**.

### Core Architecture Principles
1. **Domain-Driven Bounded Contexts**:
   Each feature area lives in an isolated module inside `backend/src/modules/` containing its own:
   - **Routes** (`*.routes.ts`): Express endpoint mappings.
   - **Controller** (`*.controller.ts`): HTTP request parsing, status codes, and input validation.
   - **Service** (`*.service.ts`): Pure domain business logic, independent of Express `req/res`.
   - **Model** (`*.model.ts`): Mongoose schema definitions and typings.
2. **Explicit Dependency Flow**:
   Modules communicate directly through well-defined service contracts or domain events, preventing spaghetti controller dependencies.
3. **Shared Kernel (`backend/src/shared/`)**:
   Cross-cutting infrastructure concerns are encapsulated in `shared/`:
   - `shared/middlewares/`: Authentication JWT verification, rate limiting, and Multer file upload handling.
   - `shared/errors/`: Centralized `AppError` class and global `error.middleware.ts`.
   - `shared/utils/`: Common helpers, formatting, and logging.

### Modules Breakdown
- **`modules/auth`**: User registration, login, JWT issuance, profile updates, and password hashing with bcrypt.
- **`modules/species`**: Curated scientific catalog, taxonomical hierarchy (Order, Family, Genus, Species), search queries, and distribution filters.
- **`modules/identification`**: Multi-stage identification orchestration, Pinecone vector querying, vision model inference, and sighting history.
- **`modules/learning`**: Interactive learning topics, spider anatomy diagrams, quizzes, and citizen science education.

---

## 3. AI & Vector Pipeline: Pinecone Vector Database Integration

redBack.ai uses a high-performance **dual-stage AI identification pipeline** integrating **Pinecone Vector Database** for instant visual similarity search alongside multimodal reasoning models:

```text
[Spider Photo]
      │
      ▼
1. Feature Extraction (Vision Embedder)
   Converts image into a high-dimensional dense embedding vector (e.g. 512/768-dim)
      │
      ▼
2. Pinecone Vector Similarity Search
   K-NN query against indexed reference catalog of arachnid species embeddings
   - Metric: Cosine similarity
   - Metadata filtering: e.g., { "country": "Australia", "family": "Theridiidae" }
   - Top-K: Returns candidate species IDs with vector similarity scores in < 50ms
      │
      ▼
3. Multimodal Vision Verification & Evidence
   Vision model validates visual markers (e.g. red hourglass/stripe, eye arrangement, leg spines)
   and produces structured user-facing evidence
      │
      ▼
4. Confidence Evaluation & Fallback
   - Confidence >= 70%: Confirmed Species match (e.g. Latrodectus hasselti)
   - Confidence < 70%: Fallback to Genus/Family level (e.g. Latrodectus sp.) + photo guidance
      │
      ▼
5. Catalog Enrichment & Venom Safety
   Fetches full scientific taxonomy and attaches mandatory medical disclaimer
```

---

## 4. Venom Safety & Legal Safeguards

Because redBack.ai identifies medically significant species (e.g. *Latrodectus hasselti*, *Atrax robustus*):

1. **Mandatory Disclaimer Contract**: Every identification payload returned by `/api/v1/identifications` must include:
   ```json
   {
     "disclaimer": "redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care."
   }
   ```
2. **Venom Severity Tiers**:
   - `harmless`: No venom risk to humans (e.g., Garden Orb-weaver).
   - `low`: Mild local irritation (e.g., Huntsman).
   - `moderate`: Painful bite, local swelling, systemic reaction rare.
   - `medically_significant`: Severe neurotoxic or necrotic symptoms requiring medical assessment (e.g., Redback).
   - `severe`: Potentially life-threatening, emergency antivenom indicated (e.g., Sydney Funnel-web).
3. **Medical Advice Prohibition**: The backend must never provide self-treatment, tourniquet recommendations, or delay emergency response.

---

## 5. Mobile UI & Screen Architecture (12-Screen Master Topology)

Visual Blueprint: [`mobile/assets/design/redBack.ai_Spider_Discovery_App_UI-1.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/redBack.ai_Spider_Discovery_App_UI-1.png)

The mobile client (Tier 1) orchestrates 12 interconnected screens organized into 4 primary domain loops:

```mermaid
flowchart TD
    subgraph Loop1 ["Loop 1: Onboarding & Authentication"]
        S1["Screen 1: Onboarding Carousel\n(/onboarding)"]
        S2["Screen 2: Login & Auth\n(/(auth)/login)"]
        S1 -->|Get Started| S2
    end

    subgraph Loop2 ["Loop 2: Field Sighting & Vision AI Pipeline"]
        S3["Screen 3: Explorer Home\n(/(tabs)/index)"]
        S4["Screen 4: Camera Scanner\n(/scanner)"]
        S5["Screen 5: AI Identification Result\n(/results)"]
        S6["Screen 6: Species Detail & Facts\n(/species/:id)"]
        
        S2 -->|Authenticated Session| S3
        S3 -->|Tap Shutter / FAB| S4
        S4 -->|Capture & Vector Query| S5
        S5 -->|View Deep Taxonomy| S6
    end

    subgraph Loop3 ["Loop 3: Taxonomy & Biodiversity Discovery"]
        S7["Screen 7: Explore Species Grid\n(/(tabs)/explore)"]
        S8["Screen 8: Nearby Species Map\n(/map)"]
        
        S3 -->|Explore Tab| S7
        S7 -->|Toggle Map View| S8
        S8 -->|Select Pin| S6
        S7 -->|Select Card| S6
    end

    subgraph Loop4 ["Loop 4: Learning Academy & Citizen Community"]
        S9["Screen 9: Learning Hub & Streak\n(/(tabs)/learn)"]
        S10["Screen 10: Quiz & Anatomy Lesson\n(/learn/:topicId)"]
        S11["Screen 11: Profile & Achievements\n(/(tabs)/profile)"]
        S12["Screen 12: Community Sighting Feed\n(/(tabs)/community)"]
        
        S3 -->|Learn Tab| S9
        S9 -->|Start Topic| S10
        S10 -->|XP Awarded| S11
        S3 -->|Community Tab| S12
    end
```

---

## 6. Card Theme Architecture & Domain Data Binding

All cards in the UI conform to strict **Flat Design Standards** (zero drop-shadows, 1px warm borders `#EAE6DE`, and soft organic surfaces). Each card theme binds directly to backend domain modules:

| Card Theme | Visual Surface | Domain Module | Data Model / Payload |
|---|---|---|---|
| `HeroDiscoveryCard` | Moss `#2C4A3E`, 24px radii, 3D spider graphic | `identification` | Quick camera action, daily featured species summary |
| `FieldMetricsCard` | Paper `#FFFFFF`, 1px line, 20px radii, 3 cols | `auth` & `species` | `user.stats.identified`, `catalog.totalCount`, `user.stats.habitats` |
| `SpeciesGridCard` | Paper `#FFFFFF`, 1px line, 16px radii, 1:1 image | `species` | `SpeciesSummaryDTO` (name, binomial, thumbnail, venomSeverity) |
| `SpeciesListCard` | Paper `#FFFFFF`, 1px line, 16px radii, left thumb | `species` | `FeaturedSpeciesDTO` (name, binomial, thumbUrl, statusTag) |
| `SafetyWarningCard`| CoralSoft `#FDEBE7`, 1px danger border, Alert icon | `shared/safety` | Mandatory disclaimer + venom severity triage warning |
| `QuickFactsGridCard`| Paper `#FFFFFF`, Sage icon circle, 16px radii | `species` | `morphology` (size, lifespan, preyDiet, habitatRange) |
| `LearningHeroCard` | Moss `#2C4A3E`, 24px radii, spider anatomy visual | `learning` | `TopicDTO` (title, estMinutes, xpReward, progressPct) |
| `QuizOptionCard`   | Paper `#FFFFFF`, letter pill, moss border on select| `learning` | `QuizQuestion.options` (key, label, isCorrect) |
| `QuizFeedbackCard` | MossSoft `#E6EFEA`, 18px radii, check circle | `learning` | `QuizEvaluationDTO` (isCorrect, explanation, nextTopicId) |
| `CommunityFeedCard`| Paper `#FFFFFF`, 1px line, 18px radii, photo | `identification` | `PublicObservationDTO` (author, photoUrl, notes, likes, comments) |
| `MapPreviewCard`   | Paper `#FFFFFF` floating sheet, 18px radii | `species` | `GeoSightingDTO` (speciesName, distanceKm, thumbnail) |

---

## 7. Mobile State & Offline Persistence Strategy

1. **Session & Auth State (`AsyncStorage`)**:
   - `auth_token`: Stored via `AsyncStorageManagement.setToken(jwt)`.
   - `user_data`: Stored via `AsyncStorageManagement.setUserData(user)`.
   - Splash redirect: Verified in `mobile/app/index.tsx` before routing to `/(tabs)` or `/onboarding`.
2. **Offline Sighting Cache**:
   - When offline or in remote field conditions without 4G/5G, photo sightings queue in local SQLite/AsyncStorage storage (`offline_sightings`).
   - Syncs automatically to `/api/v1/identifications` when connectivity resumes.
3. **Optimized Image Ingestion**:
   - Photos taken in Camera Scanner are compressed locally before vector transmission (max 1080px dimension, 80% JPEG quality) to ensure sub-second vector uploads.

