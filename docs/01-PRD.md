# Product Requirements Document (PRD) — redBack.ai

## 1. Executive Summary
**redBack.ai** is an AI-powered spider identification, educational taxonomy, and venom safety mobile application. It empowers explorers, biologists, students, and outdoor enthusiasts to instantly identify spider species via camera or gallery photos, understand their toxicity risk, and access first-aid and behavioral knowledge.

---

## 2. Problem Statement
- **Fear & Misidentification:** Most people experience arachnophobia or struggle to differentiate harmless common spiders (like House Spiders) from medically significant venomous species (like Redback or Funnel-web).
- **Safety & Delayed Medical Response:** In areas with venomous spiders, immediate identification can save lives and assist emergency personnel.
- **Scattered Educational Information:** High-quality arachnology taxonomy is typically locked in academic papers or field guides, inaccessible to common users.

---

## 3. User Personas
1. **The Outdoor Explorer / Hiker:** Encounters unknown spiders in nature, needs instant offline/online danger level identification.
2. **The Student / Bio-Enthusiast:** Interested in learning arachnid taxonomy, anatomy, and cataloging personal sightings.
3. **The Household Resident:** Spots a spider in the garden or bedroom, needs quick identification to know if children or pets are in danger.

---

## 4. Key Functional Features

### 4.1 Authentication & Profile
- User registration and login (JWT-based).
- Personal observation history (sightings catalog).
- Saved species bookmarks.

### 4.2 AI Vision & Instant Identification
- In-app camera scanner with grid viewfinder.
- Image upload from device gallery.
- Ranked species prediction with confidence percentages.
- Automatic safety flags: **Harmless**, **Mildly Venomous**, **Medically Significant / Dangerous**.
- Fallback to Genus/Family level if AI confidence is `< 70%`.

### 4.3 Encyclopedia & Exploration Catalog
- Comprehensive catalog of arachnid species.
- Multi-criteria search (scientific name, common name).
- Filtering by family (e.g., *Theridiidae*, *Araneidae*, *Salticidae*).
- Detailed species profile: distribution, habitat, behavior, venom analysis, and high-resolution photo gallery.

### 4.4 Learning Center & Community Safety
- Educational guides: Spider anatomy, spiders vs insects, bite prevention.
- Mandatory medical disclaimer banner on all identification screens.

