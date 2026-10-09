# redBack.ai — Comprehensive UI/UX Product Audit & Redesign Roadmap
**Auditor:** Senior Mobile Product Designer + Design Engineer  
**Standard:** Adventure Naturalist Design System (AllTrails × NatGeo × Duolingo × Garmin)  
**Target Personas:**  
1. **Hikers & Explorers:** Fast triage, sunlight clarity, survival safety, one-handed ergonomics.  
2. **Students & Teachers:** Morphology reasoning, look-alike comparisons, interactive quizzes, evidence-based learning.

---

## 1. Executive Summary & Critical Findings

| Screen | Current State / Flaws | Required Redesign (Adventure Naturalist Standard) | Status |
| :--- | :--- | :--- | :---: |
| **Scanner** (`scanner.tsx`) | Outdated reticle, no macro distance guidance, generic icon buttons, missing direct SOS trigger. | Full-screen rugged lens, 280dp tactical brackets, contextual guidance ("Hold steady • 20-30cm"), 72dp double-ring Forest Green shutter, direct Emergency SOS button. | 🟡 In Progress |
| **Results** (`results.tsx`) | Generic "AI match 96%" banner, lacks evidence breakdown, no look-alike species comparison, no instant 3-step hiker action card. | 6-Layer Architecture: (1) Photo, (2) Probabilistic Confidence, (3) Risk Level Banner, (4) Instant 3-Step Hiker Action card, (5) Evidence vs Uncertainty Breakdown, (6) Look-alike Comparison & Quiz. | 🟡 In Progress |
| **Expedition Home** (`index.tsx`) | Improved, but needs seamless integration with new `AppButton` and `SpeciesCard` tokens. | Field Expedition HQ: Clean header metrics (Observer Lv, 5d Streak, XP), 180dp Identify Hero Card, Nearby Biome radar, and SpiderDex progress. | 🟢 Completed |
| **Naturalist Chat** (`chat.tsx`) | Rebuilt with full observation context card, evidence points, action steps, quick prompt chips, and next steps deck. | Matched 100% to the Naturalist AI Assistant critical design board. | 🟢 Completed |
| **Learning Path** (`learn.tsx`) | Text-heavy, doesn't follow the 4-level competency progression (Observer → Identifier → Naturalist → Safety Scout). | Structured competency path with circular tactile nodes, interactive scenario challenges ("You spot a spider under a rock..."), and XP rewards. | 🟡 Next |
| **Explore Bestiary** (`explore.tsx`) | Component crash resolved, but needs regional filter pills, discovery progress tracker, and clean 2-column cards. | National Geographic style Bestiary with regional filters, locked vs unlocked silhouettes, and macro facts. | 🟡 Next |
| **Emergency SOS** (`safety/`) | Buried inside learn tab or partial links. | Standalone clinical crisis overlay: ZERO gamification, ZERO Reddy, high-contrast red/white, 1-tap call (141/150). | 🟡 Next |
