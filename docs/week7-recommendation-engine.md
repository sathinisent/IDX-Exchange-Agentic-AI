# Week 7: Recommendation Engine

## Goal

Week 7 builds a hybrid property recommendation engine that combines structured listing similarity with semantic embedding similarity.

The system starts with a listing the user likes, finds comparable active listings from `rets_property`, ranks them, and validates recommended prices using recent sold data from `california_sold`.

## Hybrid Scoring

The recommendation score combines:

- Structured similarity: up to 60 points
- Semantic similarity: up to 40 points

Structured scoring considers:

- Price difference
- Bedroom count
- City match
- Square footage difference

Semantic similarity uses listing embeddings and cosine similarity.

## Recommendation Database Layer

Implemented in:

`src/db/recommendationQueries.ts`

The module provides:

- Target listing lookup
- Active recommendation candidate retrieval
- Recent sold comp validation

## Comp Validation

For each recommended listing, the system uses recent sold properties in the same city with similar square footage.

It calculates:

- Average price per square foot
- Number of recent comps
- Estimated comp-supported property value
- Percentage difference between list price and comp-supported price

## Recommendation Agent

Implemented in:

`src/skills/recommendationAgent.ts`

The recommendation flow is:

1. Load the target listing
2. Retrieve active candidate listings
3. Generate an embedding for the target
4. Generate embeddings for candidates
5. Calculate structured similarity score
6. Calculate semantic similarity score
7. Combine the scores
8. Rank the candidates
9. Select the top 5
10. Validate each recommended listing against recent sold comps

## Example

Target listing:

`582 Pasture Ave, Lathrop`

Example top recommendation:

`408 N Palm Springs, Mountain House`

- List price: $775,000
- Hybrid score: 75.78
- Structured score: 45 / 60
- Semantic score: 30.78 / 40
- Comp-supported price: $933,401
- Price difference vs comps: -17%
- Recent comps used: 11

## Testing

Database test:

`tests/recommendationQueries.test.ts`

End-to-end recommendation test:

`tests/week7Recommendation.test.ts`

The final test successfully returned 5 recommended active listings, hybrid similarity scores, and comp-validated price assessments.

## Week 7 Deliverable

Week 7 is complete: the recommendation engine returns the top 5 similar active listings using hybrid structured and semantic scoring, with comp-validated pricing sourced from `california_sold`.
