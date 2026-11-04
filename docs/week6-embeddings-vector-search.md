# Week 6: Embeddings & Vector Search

## Goal

Week 6 adds semantic property search using vector embeddings and cosine similarity.

Instead of only using exact structured filters, the search can understand the meaning of a free-text description such as:

"modern spacious family home with open floor plan and updated kitchen"

## Embedding Provider

The internship handbook demonstrates OpenAI embeddings.

For this implementation, Gemini embeddings were used because Gemini was the available API provider for the project environment.

Model used:

`gemini-embedding-001`

Embedding size:

`768 dimensions`

## Embedding Utilities

Implemented in:

`src/skills/embeddings.ts`

The module provides:

- Single-text embedding generation
- Batch embedding generation
- Cosine similarity calculation

## Semantic Listing Query

Implemented in:

`src/db/semanticQueries.ts`

The query retrieves active listings from `rets_property` that contain listing remarks.

Fields include:

- Listing ID
- Address
- City
- Price
- Beds
- Baths
- Square footage
- Property type
- Year built
- Listing remarks

## Semantic Property Search

Implemented in:

`src/skills/semanticPropertySearch.ts`

The search process:

1. Retrieve active listing candidates from `rets_property`
2. Convert each listing into descriptive text
3. Generate embeddings for the listings
4. Generate an embedding for the user's free-text search
5. Calculate cosine similarity
6. Sort listings by similarity score
7. Return the top 5 results

## Example Search

Search query:

`modern spacious family home with open floor plan and updated kitchen`

Example results included:

- 582 Pasture Ave, Lathrop
- 800 Los Positos Drive, Milpitas
- 503 E Fiorino Street, Mountain House
- 350 S. Fairway Dr, Lake Arrowhead
- 515 E Fiorino Street, Mountain House

The highest similarity score was approximately:

`0.6107`

## Testing

Files:

`tests/embedding.test.ts`

Verifies that Gemini successfully generates a 768-dimensional embedding.

`tests/semanticCandidates.test.ts`

Verifies that active listings with remarks can be retrieved from `rets_property`.

`tests/week6SemanticSearch.test.ts`

Verifies end-to-end semantic property search and returns the top 5 listings ranked by cosine similarity.

## Week 6 Deliverable

Week 6 is complete: the project can accept a free-text property description and return the top 5 semantically similar active listings using embeddings and cosine similarity.
