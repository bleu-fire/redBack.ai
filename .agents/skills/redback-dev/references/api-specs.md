# redBack.ai Backend API & Database Reference

This document provides quick reference contracts for the Express.js REST API and Mongoose models in `backend/src/`.

---

## 1. Mongoose Models (`backend/src/models/`)

### `User` (`user.model.ts`)
- `name`: String (required)
- `email`: String (required, unique, indexed)
- `passwordHash`: String (required, selected: false by default)
- `role`: `'user' | 'admin'` (default: `'user'`)
- `savedIdentifications`: Array of `ObjectId` refs to `Identification`
- `createdAt`, `updatedAt`: Timestamps

### `Species` (`species.model.ts`)
- `scientificName`: String (required, unique, indexed) e.g., *"Latrodectus hasselti"*
- `commonName`: String (required, indexed) e.g., *"Redback Spider"*
- `family`: String (required) e.g., *"Theridiidae"*
- `genus`: String (required) e.g., *"Latrodectus"*
- `order`: String (default: *"Araneae"*)
- `class`: String (default: *"Arachnida"*)
- `venom`:
  - `toxicityLevel`: `'harmless' | 'low' | 'moderate' | 'medically_significant' | 'severe'`
  - `description`: String
  - `symptoms`: `[String]`
- `habitat`: `[String]`
- `distribution`: `[String]` (e.g., `['Australia', 'New Zealand']`)
- `conservationStatus`: `'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD'`
- `sources`: `[{ name: String, url: String }]`

### `Identification` (`identification.model.ts`)
- `userId`: `ObjectId` ref to `User`
- `imageUrl`: String (required)
- `predictions`:
  - `speciesId`: `ObjectId` ref to `Species`
  - `scientificName`: String
  - `confidence`: Number (0.0 to 1.0)
  - `rank`: Number (1 to 5)
- `topPrediction`: Embedded top match
- `uncertaintyLevel`: `'high' | 'moderate' | 'low'`
- `createdAt`: Timestamp

---

## 2. Express Endpoints (`/api/v1`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register new user account |
| `POST` | `/api/v1/auth/login` | Public | Login with email & password, returns JWT |
| `GET` | `/api/v1/auth/me` | Bearer | Fetch authenticated user profile |
| `GET` | `/api/v1/species` | Public | List species with search & filter (`?q=&family=`) |
| `GET` | `/api/v1/species/:id` | Public | Get full scientific profile by ID or scientific name |
| `POST` | `/api/v1/identifications` | Bearer | Upload image (`multipart/form-data`) & invoke AI pipeline |
| `GET` | `/api/v1/identifications` | Bearer | Get user identification history |
| `GET` | `/api/v1/identifications/:id` | Bearer | Get single identification details |
| `GET` | `/api/v1/learning` | Public | List educational learning topics |
| `GET` | `/api/v1/learning/:id` | Public | Get learning module content |

---

## 3. Error Response Contract

All errors must return standardized JSON:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Human readable explanation",
  "errors": []
}
```
Use `AppError` class:
```ts
throw new AppError('Invalid image format. Supported formats: JPEG, PNG, WEBP.', 400);
```

