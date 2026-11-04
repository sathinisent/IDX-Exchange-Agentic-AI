import {
  getEmbedding,
  getEmbeddings,
  cosineSimilarity,
} from "./embeddings";

import {
  getSemanticCandidates,
  SemanticListing,
} from "../db/semanticQueries";

export type SemanticSearchResult = {
  listing: SemanticListing;
  similarity: number;
};

function buildListingText(listing: SemanticListing): string {
  return [
    `${listing.type} in ${listing.L_City}, California.`,
    `${listing.beds} beds and ${listing.baths} baths.`,
    `${listing.sqft} square feet.`,
    `Built in ${listing.YearBuilt}.`,
    `Price $${listing.price}.`,
    listing.L_Remarks,
  ].join(" ");
}

export async function semanticPropertySearch(
  searchQuery: string,
  topK = 5
): Promise<SemanticSearchResult[]> {
  const listings = await getSemanticCandidates(25);

  if (listings.length === 0) {
    return [];
  }

  const listingTexts = listings.map(buildListingText);

  const queryEmbedding = await getEmbedding(searchQuery);
  const listingEmbeddings = await getEmbeddings(listingTexts);

  const scored = listings.map((listing, index) => ({
    listing,
    similarity: cosineSimilarity(
      queryEmbedding,
      listingEmbeddings[index]
    ),
  }));

  scored.sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, topK);
}
