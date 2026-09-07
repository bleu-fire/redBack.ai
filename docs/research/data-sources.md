# Spider Data & Research Sources

## Data requirements

The species catalog should support:
- Canonical scientific name.
- Taxonomy.
- Common names.
- Geographic distribution.
- Habitat.
- Behavior.
- Venom/toxicity information.
- Conservation status.
- Source attribution.
- External identifiers where available.

## Source strategy

Prefer authoritative biodiversity and taxonomy databases, museum/university resources, and openly licensed datasets. Record the source and retrieval date for every imported fact set.

## Data ingestion rules

1. Verify licensing/terms before ingestion.
2. Normalize taxonomy.
3. Preserve source identifiers.
4. Avoid silently overwriting conflicting facts.
5. Flag records needing manual review.
6. Store retrieval timestamps.
7. Keep an import/version history for large dataset updates.

## Scale

The project should be designed for a very large catalog (tens of thousands of spider species) without requiring every record to be loaded into the mobile client.

## Search strategy

Use MongoDB text indexes across `scientificName`, `commonName`, and `family` for catalog scale. Add a dedicated search engine (e.g., Elasticsearch or Atlas Search) only if real-world traffic and fuzzy requirements demonstrate the need.
