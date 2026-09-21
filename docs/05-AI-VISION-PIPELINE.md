# AI Vision Pipeline & Safety Safeguards — redBack.ai

## 1. Identification Pipeline Overview

```text
[User Camera / Gallery]
          │
          ▼
[Base64 / Multipart Image Upload]
          │
          ▼
[Backend Vision Router: /api/identifications/detect]
          │
          ▼
[AI Model Vision Analysis] ──► Extracts: Scientific Name Candidate + Confidence Score
          │
          ▼
[Confidence Evaluator]
     ├─ Confidence >= 70% ──► Query Species DB by Scientific Name ──► Return Ranked Match & Venom Warning
     │
     └─ Confidence < 70%  ──► Fallback to Genus/Family Level ──► Prompt User for Clearer Angle / Lighting
```

---

## 2. Spider Domain Safeguards & Medical Disclaimer

### Mandatory Medical Disclaimer
Because redBack.ai operates in a domain where dangerous spiders (*Latrodectus hasselti*, *Atrax robustus*) may be encountered:

> **IMPORTANT:**
> *"redBack.ai provides educational species identification assistance only. Never handle wild spiders. If bitten by a spider or experiencing severe symptoms (pain, sweating, nausea, difficulty breathing), seek immediate emergency medical care."*

This banner is displayed on:
1. The **AI Results screen** (`results.tsx`)
2. The **Species Details screen** (`species/[id].tsx`)
3. The **Settings / Legal disclaimers screen** (`settings.tsx`)

---

## 3. Toxicity Risk Levels
Every identified spider is categorized into one of 3 clear UI badges:
- 🟢 **Harmless:** Minimal or non-existent venom risk to humans (e.g., *Pholcus phalangioides* / Daddy Longlegs).
- 🟡 **Mildly Venomous / Painful Bite:** Can cause localized swelling or sharp pain, not life-threatening (e.g., *Eriophora transmarina* / Garden Orb Weaver).
- 🔴 **Medically Significant / Dangerous:** High-potency neurotoxin or necrotic venom requiring medical vigilance (e.g., *Latrodectus hasselti* / Redback Spider).

