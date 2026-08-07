# Redback.ai — Product Requirements Document (PRD)

> **Version:** 1.0  
> **Project:** redback.ai  
> **Status:** Draft  
> **Last Updated:** August 2026

---

# Table of Contents

1. Project Overview
2. Objectives
3. Target Audience
4. Core Features
5. Artificial Intelligence
6. Non-Functional Requirements
7. Technology Stack
8. System Architecture
9. AI Pipeline
10. Database Design
11. API Modules
12. Application Screens
13. User Flow
14. UI/UX Requirements
15. Security
16. Future Enhancements
17. Deliverables
18. Success Criteria
19. Roadmap

---

# 1. Project Overview

## Project Name

**redback.ai**

## Project Type

AI-powered Mobile Application

## Description

**redback.ai** is an AI-powered mobile application that helps users identify spider species using computer vision and artificial intelligence.

Users simply take a photo or upload an existing image, and the application identifies the spider while providing scientific information, habitat, venom details, conservation status, and educational content.

The application also serves as a biodiversity platform where users can build their own observation journal and contribute to citizen science.

---

# 2. Objectives

- Identify spider species using AI image recognition
- Educate users about spiders and biodiversity
- Provide scientifically accurate information
- Help distinguish venomous and non-venomous species
- Encourage wildlife observation
- Support citizen science initiatives
- Build a personal observation journal
- Promote environmental awareness

---

# 3. Target Audience

- Nature enthusiasts
- Students
- Teachers
- Researchers
- Wildlife photographers
- Hikers
- Gardeners
- Families
- Citizen scientists
- Environmental organizations

---

# 4. Core Features

## 4.1 AI Spider Identification

Users can:

- Capture photos using the camera
- Upload images
- Receive AI predictions
- View confidence scores
- Compare similar species
- Save results

---

## 4.2 Species Information

Every species page includes:

- Common name
- Scientific name
- Family
- Genus
- Description
- Physical characteristics
- Average size
- Color variations
- Habitat
- Geographic distribution
- Diet
- Hunting behavior
- Lifespan
- Reproduction
- Activity period
- Ecological role
- Predators
- Conservation status
- Venom information
- Bite symptoms
- First-aid recommendations
- Image gallery
- Similar species

---

## 4.3 Interactive Distribution Map

- Worldwide distribution
- Country occurrence
- Habitat visualization
- Observation locations
- Heatmaps
- GPS integration

---

## 4.4 Search & Filters

Search by:

- Species name
- Scientific name
- Family
- Genus
- Color
- Size
- Habitat
- Region
- Venom level
- Activity period
- Conservation status

---

## 4.5 Personal Collection

Users can:

- Save favorite species
- Organize collections
- View identification history
- Export observations

---

## 4.6 Observation Journal

Each observation stores:

- Photo
- Species
- GPS coordinates
- Date
- Time
- Weather
- Personal notes
- Confidence score

---

## 4.7 Educational Center

Includes:

- Interactive quizzes
- Daily spider facts
- Spider myths vs facts
- Beginner guides
- Scientific articles
- Safety guides

---

# 5. Artificial Intelligence

The AI system provides:

- Object detection
- Spider localization
- Image classification
- Species recognition
- Confidence scoring
- Similar species suggestions
- Educational summaries
- RAG-based scientific information

---

# 6. Non-Functional Requirements

- Identification under 3 seconds
- Responsive UI
- Android support
- iOS support
- Offline mode
- Cloud synchronization
- Accessibility support
- Multi-language support
- Secure authentication
- High availability

---

# 7. Technology Stack

## Mobile

- React Native
- Expo
- TypeScript
- Expo Router

## State Management

- Zustand
- TanStack Query

## Backend

- NestJS
- Node.js

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- Refresh Tokens

## Storage

- AWS S3
- Cloudinary

## AI

- YOLO
- Vision Transformer
- RAG
- OpenAI / Gemini

## Maps

- Mapbox
- Google Maps

## Infrastructure

- Docker
- GitHub Actions
- Coolify
- AWS

---

# 8. System Architecture

```text
Mobile App

↓

API Gateway

↓

NestJS Backend

↓

PostgreSQL
Redis
S3 Storage

↓

AI Service

↓

Detection

↓

Classification

↓

RAG

↓

LLM

↓

Results
```

---

# 9. AI Pipeline

```text
Capture Image

↓

Quality Check

↓

Spider Detection

↓

Crop Spider

↓

Species Classification

↓

Top Predictions

↓

Confidence Score

↓

RAG Knowledge Search

↓

LLM Summary

↓

Display Result
```

---

# 10. Database Design

## Users

| Field | Type |
|--------|------|
| id | UUID |
| full_name | String |
| email | String |
| password | String |
| avatar | String |
| created_at | Timestamp |

---

## Species

| Field | Type |
|--------|------|
| id | UUID |
| scientific_name | String |
| common_name | String |
| family | String |
| genus | String |
| description | Text |
| habitat | String |
| distribution | Text |
| diet | String |
| lifespan | String |
| venom_level | Enum |
| conservation_status | String |
| image_url | String |

---

## Observations

| Field | Type |
|--------|------|
| id | UUID |
| user_id | UUID |
| species_id | UUID |
| latitude | Float |
| longitude | Float |
| image_url | String |
| notes | Text |
| confidence | Float |
| observation_date | Timestamp |

---

## Favorites

| Field | Type |
|--------|------|
| id | UUID |
| user_id | UUID |
| species_id | UUID |

---

# 11. Backend Modules

- Authentication
- Users
- Species
- AI
- Search
- Maps
- Favorites
- Observations
- Notifications
- Learning
- Quiz
- Analytics
- Admin

---

# 12. Application Screens

- Splash
- Onboarding
- Login
- Register
- Home
- Scanner
- Upload
- AI Result
- Species Details
- Search
- Favorites
- Observation Journal
- Interactive Map
- Learning Center
- Quiz
- Notifications
- Profile
- Settings

---

# 13. User Flow

```text
Open App

↓

Login

↓

Home

↓

Take Photo

↓

AI Scan

↓

Results

↓

Species Details

↓

Save Observation

↓

Journal

↓

Profile
```

---

# 14. UI/UX Requirements

## Design Principles

- Modern
- Minimal
- Nature-inspired
- Mobile-first
- Fast
- Accessible

## Color Palette

| Color | Usage |
|--------|------|
| Forest Green | Primary |
| Earth Brown | Secondary |
| White | Background |
| Light Gray | Surface |
| Natural Beige | Accent |

---

# 15. Security

- JWT Authentication
- Refresh Tokens
- bcrypt password hashing
- HTTPS
- Input validation
- Rate limiting
- CORS
- Secure cloud storage
- GDPR-friendly privacy
- Audit logs

---

# 16. Future Enhancements

- Real-time camera identification
- Offline AI model
- Video recognition
- Augmented Reality
- Community observations
- Species leaderboard
- AI wildlife chatbot
- Insect identification
- Scorpion identification
- Snake identification
- Plant identification
- Bird identification

---

# 17. Deliverables

- Android App
- iOS App
- REST API
- PostgreSQL Database
- AI Identification Service
- Documentation
- Design System
- Source Code
- CI/CD Pipeline
- Deployment Infrastructure

---

# 18. Success Criteria

The project will be considered successful when:

- AI accuracy exceeds **90%**
- Identification completes in **under 3 seconds**
- Users can identify and save species
- The application provides an intuitive user experience
- Scientific information is reliable and regularly updated
- The application achieves high user satisfaction
- Offline mode functions correctly
- Cloud synchronization is reliable

---

# 19. Development Roadmap

## Phase 1

- Authentication
- Database
- Species catalog
- AI integration
- Camera scanner

---

## Phase 2

- Observation journal
- Interactive maps
- Search
- Favorites

---

## Phase 3

- Learning center
- Quizzes
- Notifications
- Analytics

---

## Phase 4

- Offline AI
- AR mode
- Community
- Multi-species recognition
- AI chatbot

---
