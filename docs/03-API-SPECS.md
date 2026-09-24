# API Specifications — redBack.ai

Base URL: `http://<host>:3000/api`

---

## 1. System Health
### `GET /health`
- **Description:** Verifies server status.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "redBack.ai API running successfully",
    "timestamp": "2026-09-24T12:00:00.000Z"
  }
  ```

---

## 2. Authentication Module (`/api/auth`)

### `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "Karim Explorer",
    "email": "karim@redback.ai",
    "password": "securepassword"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "data": {
      "user": {
        "id": "67...a1",
        "name": "Karim Explorer",
        "email": "karim@redback.ai",
        "role": "user"
      }
    }
  }
  ```

### `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "karim@redback.ai",
    "password": "securepassword"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "data": {
      "user": { "id": "...", "name": "...", "email": "...", "role": "user" }
    }
  }
  ```

### `GET /api/auth/users`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Returns all registered users (passwords excluded).

---

## 3. Species Module (`/api/species`)

### `GET /api/species`
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10, max: 50)
  - `search`: Case-insensitive regex match against `commonName` or `scientificName`
  - `family`: Filter by spider family (e.g., `Theridiidae`)
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "results": 10,
    "data": [
      {
        "_id": "67...b2",
        "scientificName": "Latrodectus hasselti",
        "commonName": "Redback Spider",
        "family": "Theridiidae",
        "venomInfo": "Highly venomous neurotoxin",
        "imageUrls": ["https://..."]
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
  ```

### `GET /api/species/:id`
- **Description:** Retrieve full profile of a single species by MongoDB ObjectId.

### `GET /api/species/by-scientific-name/:name`
- **Description:** Direct lookup used by AI Vision results mapper.

### `POST /api/species`
- **Description:** Create a new species entry (Admin protected).

---

## 4. Identification & Pinecone Vector Search Module (`/api/identifications`)

### `POST /api/identifications/detect`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body:** `image` (JPEG/PNG/WEBP binary buffer, max 5MB)
- **Workflow:**
  1. Image feature extraction generates dense embedding vector.
  2. **Pinecone Vector Database** executes K-NN cosine similarity search against species index.
  3. Multimodal Vision Model evaluates morphology and produces visual evidence explanation.
  4. Species profile and venom safety metadata enriched from MongoDB.
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "disclaimer": "redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care.",
    "data": {
      "topMatch": {
        "scientificName": "Latrodectus hasselti",
        "commonName": "Redback Spider",
        "confidence": 0.96,
        "confidenceBand": "high",
        "vectorSimilarity": 0.94,
        "toxicityLevel": "medically_significant",
        "visualEvidence": ["distinctive dorsal red stripe", "globular abdomen"]
      },
      "candidates": [
        {
          "scientificName": "Steatoda capensis",
          "commonName": "False Katipo",
          "confidence": 0.03
        }
      ]
    }
  }
  ```

### `GET /api/identifications`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns authenticated user's observation journal history.
