# ADR-002: Treat AI Identification as Probabilistic

## Status
Accepted

## Decision

Redback shall never represent an AI prediction as guaranteed identification. The product must support ranked candidates and low-confidence/unknown states.

## Reason

Visual spider identification can be difficult even for experts, and model confidence is not automatically calibrated probability.

## Consequence

UX, API contracts, analytics, and testing must preserve uncertainty rather than forcing a single species answer.
