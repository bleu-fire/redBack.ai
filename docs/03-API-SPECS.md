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
    "message": "redBack.ai API khddama bikhir!",
    "timestamp": "2026-09-20T14:20:00.000Z"
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

