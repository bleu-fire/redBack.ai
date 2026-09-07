# Testing Strategy

## Unit tests

Cover:
- Auth services.
- Password verification.
- DTO validation.
- Confidence-band calculation.
- Species matching.
- AI output normalization.

## Integration tests

Cover:
- Auth endpoints with a test database.
- Identification endpoint with a mocked AI provider.
- Species search.
- Source retrieval.

## E2E tests

Critical flow:

`Register → Login → Home → Upload → Identification Result → Species Details`

## AI evaluation

Maintain a fixed evaluation set containing:
- Clear images.
- Low-quality images.
- Non-spider images.
- Visually similar species.
- Different lighting/backgrounds.
- Multiple spider families.

Track top-1 accuracy, top-k accuracy, abstention quality, false confidence, and latency.

## Security tests

- Auth bypass.
- IDOR checks.
- Rate limiting.
- File upload validation.
- Malicious payload handling.
- Token expiry.
- NoSQL/Mongoose query injection checks.

## Definition of done

A feature is complete when it has tests, validation/error states, documentation, telemetry where appropriate, and no known secret leakage.
