# ADR-003: Source Scientific Claims

## Status
Accepted

## Decision

Structured species facts should be stored with source metadata. AI-generated explanations should use those facts as grounding context and should not silently become the canonical scientific record.

## Consequence

The data model includes `species_sources`, and ingestion pipelines need source/version tracking.
