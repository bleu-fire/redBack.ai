# redBack.ai — The Master Design System & Architecture Specification
**Official Blueprint & Single Source of Truth for Product, UX, and Engineering**

> **"redBack.ai is not an AI spider scanner; it is a field-learning system that uses AI to help people become better observers, identifiers, and safer explorers."**

**Core Experience Loop:**  
`Discover → Observe → Capture → Identify → Learn & Safety → Record → Explore → Get Better`

---

## 01. Absolute Product & Design Rules

1. **AI is Probabilistic & Educational:**
   - Never promise 100% certainty. Always show confidence (`82% confidence`).
   - Distinguish **Strong Evidence** (morphology, color pattern, posture) from **Uncertainty** (angle, lighting, missing traits).
2. **Field Usability First:**
   - High sunlight legibility, high contrast, uncluttered viewports.
   - Touch targets must strictly be `>= 48 × 48dp`.
3. **Emergency Mode Overrides Everything:**
   - On bite suspicion or medical alert: **ZERO XP, ZERO Reddy, ZERO animations, ZERO gamification**.
   - Clear, calm, authoritative clinical steps (`STAY CALM. FOLLOW THESE STEPS.`).
4. **No Unicode Emojis in the UI:**
   - Use strictly unified **Lucide Vector Icons** (`20–24px`, `1.5–2px` stroke weight).
5. **Color Hierarchy (60 / 30 / 10):**
   - **60% Canvas & Neutral:** Warm Naturalist Parchment (`#FAF7F2`) and Card Surfaces (`#FFFFFF`).
   - **30% Structure & Text:** Deep Alpine Ink (`#18201E`), Muted Text (`#6B7672`), Borders (`#E4DDD3`).
   - **10% Semantic Signals:**
     - Primary Action: Forest Green (`#2B8A3E`, pressed `#1E6332`).
     - Danger / Emergency: Crimson (`#E03131`, pressed `#B02525`).
     - Warning / Attention: Amber (`#F59E0B`).
     - Achievement / XP: Solar Gold (`#FAB005`).

---

## 02. The 5 Core Navigation Pillars + 2 Global Utilities

```text
┌────────────────────────────────────────────────────────┐
│                        VIEWPORT                        │
│                                                        │
├────────────────────────────────────────────────────────┤
│   HOME   │   IDENTIFY   │   LEARN   │   EXPLORE   │   JOURNAL   │
└────────────────────────────────────────────────────────┘
Global Floating/Contextual Utilities: [ NATURALIST CHAT ]  [ EMERGENCY SOS ]
```

---

## 03. Tier 1 Master Prompts (Production Screen Specifications)

---

### Page 1: The Field Scanner (Full-Screen Camera Lens) — `mobile/app/(tabs)/scanner.tsx`
**Tier:** 1 (Critical)  
**Philosophy:** Fast, rugged, distraction-free. No mascot over lens. Full priority to the specimen.

```markdown
PROMPT:
Act as a Senior Mobile Product Designer & Design Engineer for outdoor field instruments (Garmin & AllTrails).
Implement the production React Native camera screen for "redBack.ai".

- Screen: Field Wildlife Scanner (CameraView)
- Architecture:
  1. Top Minimal HUD:
     - Left: Semi-translucent pill badge: "High Atlas • Offline Ready" with a 6px green satellite status indicator.
     - Right: 48x48dp tactile circular Flashlight toggle (Lucide Flashlight icon).
  2. Center Viewfinder:
     - 280x280dp tactical framing brackets (thin 2px forest-moss corners).
     - State-based contextual guidance text floating underneath:
       * Default: "Hold steady • Macro focus at 20–30cm"
       * Closer: "Move closer to capture abdomen pattern"
     - ZERO mascot animations covering the camera feed. Keep 100% unobstructed view.
  3. Bottom Action Deck:
     - Left: Gallery import button (48x48dp rounded card, Lucide Image icon, subtle depth).
     - Center: Mega Field Shutter Button (72x72dp, double-ring tactile button, Forest Green #2B8A3E with 4px tactile depth #1E6332, haptic feedback on press).
     - Right: Emergency Bite SOS button (48x48dp, Crimson outline #E03131 with Lucide Plus / FirstAid icon).
- Sunlight Legibility: Strict high contrast, anti-glare typography, zero unnecessary floating labels.
```

---

### Page 2: Identification & Evidence Breakdown — `mobile/app/results.tsx`
**Tier:** 1 (Critical)  
**Philosophy:** Instant danger triage in 1.5 seconds, followed by evidence-based reasoning, look-alikes, and learning.

```markdown
PROMPT:
Act as a Principal Product Designer for National Geographic and clinical emergency tools.
Implement the species identification results screen for "redBack.ai".

- Screen: Identification Result & Evidence Breakdown
- Hierarchy:
  1. Layer 1 (Photo): High-res cropped observation image (Radii: 16, aspect ratio 16:10).
  2. Layer 2 (Identity & Probabilistic Confidence):
     - Common Name: "Redback Spider" (H2 24pt Bold).
     - Scientific Name: "Latrodectus hasselti" (Caption 14pt Italic).
     - Probabilistic Badge: "82% confidence" (Pill badge, #F3EFE8, dark text).
  3. Layer 3 (Risk Level):
     - If High Medical Risk: Clean, bold banner with Lucide AlertOctagon: "HIGH MEDICAL RELEVANCE".
     - If Harmless: Soft sage banner with Lucide CheckCircle2: "HARMLESS FIELD ALLY".
  4. Layer 4 (Hiker Action Card):
     - 3 pictogram steps with Lucide vector icons:
       * Lucide Move: "Keep Distance (> 1m)"
       * Lucide ShieldX: "Do Not Handle"
       * Lucide Bandage: "Bite Protocol: Pressure Immobilization"
     - Full-width button: "Open Emergency First Aid Steps" (Crimson #E03131, 52dp height).
  5. Layer 5 (Reasoning & Evidence Breakdown):
     - Section: "Why this identification?"
     - Strong Evidence Cards:
       * Lucide CheckCircle2: "Distinct abdominal red/orange stripe"
       * Lucide CheckCircle2: "Spherical dark body structure"
       * Lucide CheckCircle2: "Irregular tangle-web posture"
     - Uncertain / Missing Features:
       * Lucide HelpCircle: "Need side profile for leg articulation"
  6. Layer 6 (Look-Alike Comparison & Learning):
     - Compare Card: "Redback vs False Widow (Steatoda grossa)" with side-by-side thumbnail comparison and key distinguishing feature.
     - Action: "Save to Field Journal (+50 XP)" (Forest Green #2B8A3E, 52dp height).
```

---

### Page 3: Expedition Hub (Field Headquarters) — `mobile/app/(tabs)/index.tsx`
**Tier:** 1 (Critical)  
**Philosophy:** Not a generic dashboard. The user's field headquarters connecting active expeditions, learning, and nearby species.

```markdown
PROMPT:
Act as a Principal UX Architect.
Implement the Expedition Home Dashboard for "redBack.ai".

- Screen: Expedition Hub (Field Headquarters)
- Header:
  - Eyebrow: "FIELD EXPEDITION HQ"
  - Greeting: "Good morning, [User Name]" (H2 24pt Bold).
  - Metrics Row:
    * Level Pill: Lucide Compass icon • "Field Observer • Lv. 3"
    * Streak Pill: Lucide Flame icon • "5d streak" (Solar Amber #FAB005)
    * XP Pill: Lucide Sparkles icon • "840 XP"
- Primary Action Hero (Identify Species):
  - Large, inviting 180dp hero card with dark moss background and macro spider illustration.
  - Title: "Identify a Spider" (H3 20pt Bold).
  - Subtitle: "Photograph something you found in the field."
  - Large tactile Shutter Trigger Button (52x52dp, Forest Green #2B8A3E, Lucide Camera icon).
- Secondary Section 1: "Continue Learning":
  - Field training card: "How to read spider morphology" with progress bar (60%) and "Continue" button.
- Secondary Section 2: "Species Near You (Current Biome)":
  - Horizontal carousel of local species cards (Redback Spider, Jumping Spider, Huntsman, Orb Weaver).
  - Each card shows: Thumbnail, common name, threat indicator dot (Green/Amber/Red), and distance.
- Secondary Section 3: "Field Tools":
  - Emergency First-Aid Matrix card (Offline ready, Crimson accent).
  - SpiderDex Bestiary collection progress card.
```

---

### Page 4: Emergency Mode (Clinical Crisis Overlay) — `mobile/app/safety/emergency.tsx`
**Tier:** 1 (Critical)  
**Philosophy:** Extreme crisis usability. ZERO gamification. ZERO mascot. ZERO jokes. High medical authority.

```markdown
PROMPT:
Implement the Emergency Bite Protocol Screen for "redBack.ai".

- Critical Constraints: NO XP. NO STREAKS. NO REDDY. NO PLAYFUL ANIMATIONS. NO EMOJIS.
- Screen: Emergency Response Guide
- Top Banner:
  - "STAY CALM. DO NOT RUN OR ELEVATE HEART RATE." (H2 24pt Bold Crimson).
  - 1-Tap Emergency Call CTA: Lucide PhoneCall "Call Emergency Services (141 / 150)" (60dp height, Crimson background, bold white text).
- Numbered Clinical Steps (Step-by-step with clear pictograms):
  - Step 1: "Keep bitten limb still and lower than heart level."
  - Step 2: "Apply broad pressure immobilization bandage firmly over bite (Do NOT tourniquet, do NOT cut, do NOT suck venom)."
  - Step 3: "Immobilize limb with a splint if available."
  - Step 4: "Photograph spider from safe distance for antivenom verification at hospital."
- Emergency Contacts:
  - "Morocco Poison Control (CAPM): 0537-68-64-64"
  - "Nearest Medical Facility Locator"
- Offline Indicator: Lucide WifiOff icon: "Working 100% Offline with verified clinical guidelines."
```

---

## 04. Tier 2 Master Prompts (Core Features)

---

### Page 5: Naturalist AI Assistant (Contextual Chat) — `mobile/app/chat.tsx`
**Tier:** 2 (Core)  
**Philosophy:** An expert arachnologist and wilderness first responder, not a generic chatbot.

```markdown
PROMPT:
Implement the Naturalist AI Chat screen for "redBack.ai".

- Header:
  - Reddy avatar wearing safari hat, subtitle: "Field Assistant • Online", green status dot.
  - Emergency shortcut button in header: Crimson pill with Lucide Plus icon.
- Observation Context Card (when opened from a scan):
  - Top card showing thumbnail, "Current Observation: Redback Spider (82% confidence)", High Risk badge.
- Message Feed:
  - User Bubbles: Tactical Forest Green (#1E4D36), white typography, timestamp, checkmarks.
  - Reddy Assistant Bubbles: Off-white cards (#FFFFFF) with 1.5px border (#E4DDD3), tactile depth.
  - Structured Response Content:
    * Supporting Evidence points with Lucide CheckCircle2 icons.
    * Uncertainty box (#FBF8F0) with Lucide HelpCircle icons.
    * Numbered action recommendations.
    * Field photography tip box (#F5EFE6) with Lucide Camera icon.
- Quick Context Prompts:
  - Horizontal chips: "Compare with similar", "Explain evidence", "Show anatomy".
- Suggested Next Steps:
  - 3 cards above input: "Take another photo", "Learn anatomy", "Take a quiz".
- Input Deck:
  - 48dp tactile camera button, rounded text input, voice mic button, Forest Green tactile Send button.
```

---

### Page 6: Learning Path & Field Academy — `mobile/app/(tabs)/learn.tsx`
**Tier:** 2 (Core)  
**Philosophy:** Progressive field training path (Field Observer → Identifier → Naturalist → Safety Scout).

```markdown
PROMPT:
Implement the Learning Hub for "redBack.ai".

- Screen: Arachnology & Field Academy
- Structure:
  1. Top Level Progress:
     - Level badge: "Level 1: Field Observer" (H2 24pt Bold).
     - Subtitle: "Learn to observe, compare, and identify spiders in the field."
     - Progress bar: "3 / 5 Competencies Completed".
  2. Vertical Competency Path:
     - Module 1: "How to observe a spider without touching it" (Completed, Forest Green checkmark).
     - Module 2: "Body parts & key identification features" (Completed, Forest Green checkmark).
     - Module 3: "Color is evidence, not proof" (Active, solar gold pulsing ring).
     - Module 4: "Photo tips for reliable ID" (Locked, Lucide Lock icon).
     - Module 5: "Field scenario challenge" (Locked, Lucide Lock icon).
  3. Interactive Scenario Preview:
     - "Field Scenario: You spot a spider under a rock while setting up camp. What is your first move?"
     - Options: Observe from distance, Move closer, Pick up rock, Touch web.
     - Explanation of real-world safety reasoning.
```

---

### Page 7: Field Journal & Observation Records — `mobile/app/(tabs)/journal.tsx`
**Tier:** 2 (Core)  
**Philosophy:** Personal naturalist record that turns passive scanning into verified lifelong discovery.

```markdown
PROMPT:
Implement the Field Journal screen for "redBack.ai".

- Screen: Personal Expedition Journal
- Top Summary Metrics:
  - 3 stats cards in a row:
    * 24 Species Observed
    * 12 Field Locations
    * 8 Competency Badges
- Interactive Map & Expedition View:
  - Map card showing "Atlas Mountains Expedition" with observation pinpoints.
- Recent Observations Feed:
  - Observation Card:
    * High-res specimen thumbnail.
    * Common Name & Scientific Name.
    * Date & Location ("3 Nov 2026 • Oukaïmeden, Atlas").
    * Confidence score: "82% confidence".
    * Tags: "Venomous" / "Harmless" / "Verified by Naturalist AI".
  - Floating Primary CTA: "Add Observation" (Forest Green #2B8A3E, 52dp height, Lucide Plus icon).
```

---

### Page 8: The Arachnid Bestiary (Catalog) — `mobile/app/(tabs)/explore.tsx`
**Tier:** 3 (Exploration)  
**Philosophy:** Scientific species catalog with regional discovery mechanics.

```markdown
PROMPT:
Implement the Regional Species Explorer for "redBack.ai".

- Search & Filter Deck:
  - Search bar with Lucide Search icon: "Search by common name, genus, or region...".
  - Filter chips: "All", "Morocco (Atlas)", "Australia", "High Risk", "Harmless", "Jumping", "Orb-weavers".
- Discovery Progress Banner:
  - "Regional Discovery: 18 / 64 Species Documented (28%)" with progress line.
- 2-Column Species Grid:
  - SpeciesGridCard: High-res photo, bold common name, italic scientific name, risk badge (High Risk / Caution / Harmless).
  - Pressing a card opens the full Species Detail modal.
```

---

## 05. Summary Table for Developers & Designers

| Screen | Tier | Priority | Core Responsibility |
| :--- | :---: | :---: | :--- |
| **Scanner** | 1 | Critical | Unobstructed lens, tactical reticle, instant shutter. |
| **Results** | 1 | Critical | 1.5s danger verdict + evidence list + look-alikes. |
| **Home Hub** | 1 | Critical | Field headquarters, identify trigger, nearby radar. |
| **Emergency SOS** | 1 | Critical | ZERO gamification, clinical steps, 1-tap call. |
| **Naturalist Chat** | 2 | Core | Contextual observation assistant with structured chips. |
| **Learning Path** | 2 | Core | Competency progression (Field Observer → Naturalist). |
| **Field Journal** | 2 | Core | Personal discovery logs, locations, and confidence records. |
| **Explore Bestiary** | 3 | Exploration | Regional species catalog, filters, and macro anatomy. |
