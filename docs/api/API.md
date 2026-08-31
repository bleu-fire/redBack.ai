# API Specification

Base path: `/api/v1`

## Authentication

### POST `/auth/register`
Request:
```json
{"fullname":"Jane Doe","email":"jane@example.com","password":"strong-password"}
```
Response:
```json
{"message":"User registered successfully","user":{"id":"uuid","fullname":"Jane Doe","email":"jane@example.com"},"token":"jwt"}
```

### POST `/auth/login`
Request:
```json
{"email":"jane@example.com","password":"strong-password"}
```

### GET `/auth/me`
Requires `Authorization: Bearer <token>`.

## Identification

### POST `/identifications`
Multipart form-data:
- `image`: image file

Response shape:
```json
{
  "id":"uuid",
  "status":"completed",
  "predictions":[
    {
      "speciesId":"uuid",
      "scientificName":"Genus species",
      "commonName":"Example spider",
      "confidence":0.87,
      "confidenceBand":"high"
    }
  ]
}
```

### GET `/identifications/:id`
Returns the stored normalized result.

## Species

### GET `/species/:id`
Returns canonical species data and sources.

### GET `/species/search?q=wolf%20spider&page=1&limit=20`
Searches common/scientific names.

## Learning

### GET `/learning/topics`
Returns available educational topics.

### GET `/learning/topics/:slug`
Returns a topic and its source metadata.

## Standard errors

```json
{"statusCode":400,"code":"VALIDATION_ERROR","message":"Invalid image"}
```

Use stable machine-readable `code` values. Do not expose provider secrets or internal stack traces.
