# Functional Requirements

## FR-01 Authentication
The system shall allow registration and login using email and password.

## FR-02 Image intake
The system shall accept camera captures and gallery uploads supported by the mobile OS.

## FR-03 Validation
The backend shall reject unsupported media types, oversized payloads, malformed requests, and abusive request rates.

## FR-04 Identification
The backend shall submit valid images to the configured vision provider and normalize its response into Redback's internal result format.

## FR-05 Species resolution
Predictions should be mapped to canonical species records where possible.

## FR-06 Confidence
Every prediction shall include a normalized confidence value or confidence band. The UI shall support an abstention/uncertain state.

## FR-07 Scientific information
Species pages shall expose structured scientific fields and source metadata.

## FR-08 Search
Users shall be able to search species by common and scientific name.

## FR-09 Learning
The Learning Center shall provide educational content without implying that generated content is authoritative when it is not sourced.

## FR-10 Privacy
Uploaded images and account data shall not be publicly accessible by default.

## FR-11 Observability
The backend shall log request IDs, latency, failures, model provider status, and safe operational metadata without logging passwords or raw sensitive payloads.

## FR-12 Error handling
The mobile app shall provide actionable states for network errors, unsupported images, low confidence, unavailable AI provider, and expired authentication.
