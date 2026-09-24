# redBack.ai Backend API & Modular Monolith Contracts

This document specifies the domain contracts, Mongoose models, and Pinecone vector integration for the **Modern Modular Monolith** in `backend/src/`.

---

## 1. Modular Monolith Architecture (`backend/src/modules/`)

```text
backend/src/modules/
├── auth/           # User authentication & credentials
├── species/        # Species taxonomy & field guide catalog
├── identification/ # Multi-stage AI vision & Pinecone vector search
└── learning/       # Citizen science modules & quizzes
```

---

## 2. Domain Models & Schemas

### `modules/auth/user.model.ts`
- `name`: String (required)
- `email`: String (required, unique, indexed)
- `passwordHash`: String (required, selected: false by default)
- `role`: `'user' | 'admin'` (default: `'user'`)
- `savedIdentifications`: Array of `ObjectId` refs to `Identification`
- `createdAt`, `updatedAt`: Timestamps

### `modules/species/species.model.ts`
- `scientificName`: String (required, unique, indexed) e.g., *"Latrodectus hasselti"*
- `commonName`: String (required, indexed) e.g., *"Redback Spider"*
- `family`: String (required) e.g., *"Theridiidae"*
- `genus`: String (required) e.g., *"Latrodectus"*
- `order`: String (default: *"Araneae"*)
- `class`: String (default: *"Arachnida"*)
- `pineconeVectorId`: String (indexed reference to Pinecone embedding)
- `venom`:
  - `toxicityLevel`: `'harmless' | 'low' | 'moderate' | 'medically_significant' | 'severe'`
  - `description`: String
  - `symptoms`: `[String]`
- `habitat`: `[String]`
- `distribution`: `[String]` (e.g., `['Australia', 'New Zealand']`)
- `conservationStatus`: `'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD'`
- `sources`: `[{ name: String, url: String }]`

### `modules/identification/identification.model.ts`
- `userId`: `ObjectId` ref to `User`
- `imageUrl`: String (required)
- `vectorEmbeddingId`: String (Pinecone query reference)
- `predictions`:
  - `speciesId`: `ObjectId` ref to `Species`
  - `scientificName`: String
  - `commonName`: String
  - `vectorSimilarity`: Number (0.0 to 1.0 from Pinecone)
  - `confidence`: Number (0.0 to 1.0 final combined score)
  - `confidenceBand`: `'high' | 'moderate' | 'low'`
  - `rank`: Number (1 to 5)
  - `visualEvidence`: `[String]`
- `topPrediction`: Embedded top match
- `uncertaintyLevel`: `'high' | 'moderate' | 'low'`
- `disclaimer`: String (Mandatory medical disclaimer)
- `createdAt`: Timestamp

### `modules/learning/learning-topic.model.ts`
- `slug`: String (required, unique, indexed)
- `title`: String (required)
- `content`: String (required)
- `category`: String (e.g. `'anatomy'`, `'bite-safety'`, `'biodiversity'`)
- `quizQuestions`: `[{ question: String, options: [String], correctIndex: Number }]`
- `createdAt`, `updatedAt`: Timestamps

---

## 3. Pinecone Vector Configuration (`backend/src/config/pinecone.ts`)

- **Index Name**: `redback-spider-vision`
- **Metric**: `cosine`
- **Dimension**: `512` (or `768` depending on embedding model)
- **Metadata Indexed**:
  - `speciesId`: MongoDB ObjectId
  - `scientificName`: String
  - `family`: String
  - `region`: Array of country/state codes (e.g. `['AU', 'NSW', 'QLD']`)
  - `toxicityLevel`: String

---

## 4. REST Endpoints by Domain Module (`/api/v1`)

### Auth Module (`/api/v1/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register new explorer account |
| `POST` | `/api/v1/auth/login` | Public | Login with email & password, returns JWT |
| `GET` | `/api/v1/auth/me` | Bearer | Fetch authenticated explorer profile |

### Species Module (`/api/v1/species`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/species` | Public | Search & list species (`?q=&family=&region=`) |
| `GET` | `/api/v1/species/:id` | Public | Full scientific taxa profile & venom data |

### Identification Module (`/api/v1/identifications`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/identifications` | Bearer | Upload photo (`multipart`), query Pinecone & vision model |
| `GET` | `/api/v1/identifications` | Bearer | Get user observation journal history |
| `GET` | `/api/v1/identifications/:id` | Bearer | Get specific identification with safety disclaimer |

### Learning Module (`/api/v1/learning`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/learning` | Public | List educational articles & topics |
| `GET` | `/api/v1/learning/:id` | Public | Get topic details & quiz payload |

---

## 5. Mandatory Safety Disclaimer Contract

All responses from `/api/v1/identifications` must include:
```json
{
  "disclaimer": "redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care."
}
```

---

## 6. Shared Error Response Contract

All errors return standardized JSON managed by `shared/errors/error.middleware.ts`:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Human readable explanation",
  "errors": []
}
```
