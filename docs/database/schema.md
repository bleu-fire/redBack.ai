# Database Schema

MongoDB (via Mongoose) is the source of truth for structured application, species metadata, identifications, and educational content.

## Core Collections & Mongoose Models

### `users` (`UserModel`)
- `_id`: ObjectId (PK)
- `fullname`: String (required, trimmed)
- `email`: String (required, unique, lowercase, trimmed)
- `passwordHash`: String (required)
- `avatarUrl`: String (optional)
- `createdAt`: Date (timestamp)
- `updatedAt`: Date (timestamp)

### `species` (`SpeciesModel`)
- `_id`: ObjectId (PK)
- `scientificName`: String (required, unique, trimmed)
- `commonName`: String (optional, trimmed)
- `family`: String (optional, trimmed)
- `genus`: String (optional, trimmed)
- `description`: String (optional)
- `habitat`: String (optional)
- `distribution`: String (optional)
- `behavior`: String (optional)
- `venomInfo`: String (optional)
- `conservationStatus`: String (optional)
- `imageUrls`: Array of Strings (default: `[]`)
- `createdAt`: Date (timestamp)
- `updatedAt`: Date (timestamp)

### `identifications` (`IdentificationModel`)
- `_id`: ObjectId (PK)
- `userId`: ObjectId (ref: `User`, optional)
- `imageUrl`: String (required)
- `status`: String (enum: `['pending', 'completed', 'failed']`, default: `'pending'`)
- `predictions`: Array of Embedded Subdocuments (`PredictionSchema`):
  - `speciesId`: ObjectId (ref: `Species`, optional)
  - `scientificName`: String (required)
  - `commonName`: String (optional)
  - `confidence`: Number (required, 0.0 - 1.0)
  - `confidenceBand`: String (enum: `['high', 'medium', 'low']`, default: `'medium'`)
- `createdAt`: Date (timestamp)
- `updatedAt`: Date (timestamp)

### `learningtopics` (`LearningTopicModel`)
- `_id`: ObjectId (PK)
- `slug`: String (required, unique, lowercase, trimmed)
- `title`: String (required, trimmed)
- `content`: String (required)
- `category`: String (optional, trimmed)
- `sourceUrl`: String (optional, trimmed)
- `createdAt`: Date (timestamp)
- `updatedAt`: Date (timestamp)

## Document Relationships

- `User 1 — N Identification` (via `userId` reference on `Identification`)
- `Identification 1 — N Prediction` (embedded subdocument array within `Identification`)
- `Prediction N — 1 Species` (via `speciesId` reference inside prediction items)

## Indexes

- `users`: `{ email: 1 }` (unique)
- `species`: `{ scientificName: 1 }` (unique)
- `species`: `{ scientificName: "text", commonName: "text", family: "text" }` (compound text index for catalog search)
- `learningtopics`: `{ slug: 1 }` (unique)
- `identifications`: `{ userId: 1, createdAt: -1 }`
