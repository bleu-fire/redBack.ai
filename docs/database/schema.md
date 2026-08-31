# Database Schema

PostgreSQL is the source of truth for structured application and species metadata.

## Core tables

### users
- `id` UUID PK
- `fullname` VARCHAR
- `email` VARCHAR UNIQUE
- `password_hash` VARCHAR
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

### species
- `id` UUID PK
- `scientific_name` VARCHAR UNIQUE
- `common_name` VARCHAR nullable
- `kingdom` VARCHAR
- `phylum` VARCHAR
- `class_name` VARCHAR
- `order_name` VARCHAR
- `family` VARCHAR
- `genus` VARCHAR
- `species_epithet` VARCHAR nullable
- `description` TEXT
- `habitat` TEXT
- `distribution` TEXT
- `behavior` TEXT
- `venom_info` TEXT
- `conservation_status` VARCHAR nullable
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

### species_sources
- `id` UUID PK
- `species_id` FK
- `source_name`
- `source_url`
- `source_type`
- `retrieved_at`

### identifications
- `id` UUID PK
- `user_id` FK nullable
- `image_object_key`
- `status`
- `model_provider`
- `model_name`
- `created_at`
- `completed_at` nullable

### identification_predictions
- `id` UUID PK
- `identification_id` FK
- `species_id` FK nullable
- `raw_label` VARCHAR
- `confidence` DECIMAL
- `rank` INTEGER

### learning_topics
- `id` UUID PK
- `slug` VARCHAR UNIQUE
- `title` VARCHAR
- `content` TEXT
- `source_id` FK nullable

## Relationships

`users 1—N identifications`

`identifications 1—N identification_predictions`

`species 1—N identification_predictions`

`species 1—N species_sources`

## Indexes

- `users(email)` unique.
- `species(scientific_name)` unique.
- Trigram/full-text indexes for species search.
- `identifications(user_id, created_at)`.
- `identification_predictions(identification_id, rank)`.
