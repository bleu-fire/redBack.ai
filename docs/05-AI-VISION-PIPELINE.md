# AI Vision & Pinecone Vector Pipeline — redBack.ai

## 1. Dual-Stage Identification Pipeline Overview

redBack.ai combines **Pinecone Vector Database** for ultra-fast visual similarity retrieval with **Multimodal Vision Models** for morphological reasoning and verification:

```text
[User Camera / Gallery]
          │
          ▼
[Multipart Image Upload to /api/v1/identifications]
          │
          ▼
[Stage 1: Vision Feature Embedder]
Extracts dense embedding vector (e.g. 512/768-dim) from spider photo
          │
          ▼
[Stage 2: Pinecone Vector Similarity Search]
K-NN search against indexed catalog of species image embeddings
- Metric: Cosine similarity
- Metadata filtering: region (e.g. Australia / AU) and habitat
- Returns top candidate species IDs in < 50ms
          │
          ▼
[Stage 3: Multimodal Vision Model Verification]
Analyzes morphology, checks key identifying marks (hourglass, eyes, leg spines),
and outputs structured JSON with explanation
          │
          ▼
[Confidence Evaluator]
     ├─ Combined Confidence >= 70% ──► Query MongoDB for full taxonomy & venom profile ──► Return Ranked Match
     │
     └─ Combined Confidence < 70%  ──► Fallback to Genus/Family Level ──► Prompt User for Clearer Angle / Lighting
```

---

## 2. Spider Domain Safeguards & Medical Disclaimer

### Mandatory Medical Disclaimer
Because redBack.ai operates in a domain where dangerous spiders (*Latrodectus hasselti*, *Atrax robustus*) may be encountered:

> **IMPORTANT:**
> *"redBack.ai provides educational species identification assistance only. Never handle wild spiders. If bitten by a spider or experiencing severe symptoms (pain, sweating, nausea, difficulty breathing), seek immediate emergency medical care."*

This banner is displayed on:
1. The **AI Results screen** (`results.tsx`) via `<SafetyCard />`
2. The **Species Details screen** (`species/[id].tsx`)
3. The **Settings / Legal disclaimers screen** (`settings.tsx`)

---

## 3. Toxicity Risk Levels
Every identified spider is categorized into one of 3 clear UI badges:
- 🟢 **Harmless:** Minimal or non-existent venom risk to humans (e.g., *Pholcus phalangioides* / Daddy Longlegs).
- 🟡 **Mildly Venomous / Painful Bite:** Can cause localized swelling or sharp pain, not life-threatening (e.g., *Eriophora transmarina* / Garden Orb Weaver).
- 🔴 **Medically Significant / Dangerous:** High-potency neurotoxin or necrotic venom requiring medical vigilance (e.g., *Latrodectus hasselti* / Redback Spider).
