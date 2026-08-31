# AI Identification Pipeline

## Objective

Convert a spider image into a ranked, structured set of candidate species while preserving uncertainty.

## Pipeline

1. Validate image.
2. Optional preprocessing: orientation, resize, metadata stripping.
3. Run vision model.
4. Request structured JSON output.
5. Validate JSON against a schema.
6. Normalize scientific names.
7. Match candidates against the species catalog.
8. Apply confidence thresholds.
9. Return top candidates plus uncertainty state.
10. Attach trusted source data from the catalog.

## Model prompt requirements

The model should be instructed to:
- Identify only what can reasonably be inferred from the image.
- Return multiple candidates when uncertain.
- Never fabricate a species record.
- Separate visual identification from toxicity/medical claims.
- Return a reason/evidence summary suitable for users.

## Output contract

```json
{
  "isSpider": true,
  "quality": "good",
  "predictions": [
    {
      "scientificName": "Genus species",
      "commonName": "Example spider",
      "confidence": 0.82,
      "visualEvidence": ["leg morphology", "abdomen pattern"]
    }
  ]
}
```

## Confidence policy

Suggested bands:
- `high`: ≥ 0.80
- `medium`: 0.55–0.79
- `low`: < 0.55

These are product thresholds, not calibrated scientific probabilities. They must be evaluated against a real validation dataset before being described as statistically meaningful.

## Safety

Never say an image is definitively safe or dangerous based solely on an AI prediction. Venom/toxicity content should come from curated scientific sources and should be framed as informational.

## Provider abstraction

Create an interface such as:

```ts
interface VisionIdentificationProvider {
  identify(input: IdentificationInput): Promise<IdentificationOutput>;
}
```

Provider implementations can then be replaced without changing domain logic.
