# Week 8: Retrieval-Augmented Generation (RAG)

## Goal

Week 8 builds a document-aware RAG assistant that answers real estate and MLS questions using indexed source material rather than relying only on model knowledge.

## Indexed Knowledge Sources

The RAG system uses:

- Real Estate Data Analyst Primer
- Trestle Property Metadata
- Week 5 Market Statistics
- IDX Exchange Schema Reference

These sources cover:

- Real estate terminology
- Days on Market (DOM)
- List-to-close ratio
- MLS / RESO-standard fields
- california_sold schema fields
- Market statistics definitions

## RAG Source Definitions

Implemented in:

`src/skills/ragSources.ts`

This file contains the source content used by the RAG index.

## Chunking and Indexing

Implemented in:

`src/skills/ragIndex.ts`

The pipeline:

1. Splits source documents into overlapping text chunks
2. Generates embeddings for each chunk
3. Stores the source, chunk, and embedding
4. Embeds the user's question
5. Calculates cosine similarity
6. Retrieves the most relevant chunks

## RAG Agent

Implemented in:

`src/skills/ragAgent.ts`

The agent:

1. Builds and caches the RAG index
2. Retrieves the top relevant chunks
3. Passes only the retrieved context to the language model
4. Instructs the model to answer only from the provided sources
5. Returns both the answer and the supporting source names

The generation model used is:

`gemini-3.5-flash-lite`

Gemini embeddings are used for retrieval.

## Example Questions

The Week 8 system successfully answers:

### What does DOM mean?

DOM stands for Days on Market and measures how long a property has been listed before going under contract or selling.

### What columns are in california_sold?

The RAG system retrieves schema fields including:

- ListingKey
- UnparsedAddress
- City
- PostalCode
- CloseDate
- ClosePrice
- ListPrice
- DaysOnMarket
- BedroomsTotal
- BathroomsTotalInteger
- LivingArea
- PropertyType
- PropertySubType
- YearBuilt
- and additional MLS fields

### What is a list-to-close ratio?

The list-to-close ratio is calculated by dividing ClosePrice by ListPrice.

## Testing

Retrieval test:

`tests/ragRetrieval.test.ts`

End-to-end RAG test:

`tests/week8Rag.test.ts`

The final test successfully returned grounded answers for all three required Week 8 questions.

## Week 8 Deliverable

Week 8 is complete: the project includes a RAG skill that retrieves relevant indexed source chunks and generates grounded answers for real estate concepts, california_sold schema questions, and market terminology.
