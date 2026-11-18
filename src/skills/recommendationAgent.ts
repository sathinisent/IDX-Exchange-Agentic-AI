import {
  getListingByAddress,
  getRecommendationCandidates,
  validateWithComps,
  type CompValidation,
} from "../db/recommendationQueries";

import type { SemanticListing } from "../db/semanticQueries";

import {
  getEmbedding,
  getEmbeddings,
  cosineSimilarity,
} from "./embeddings";

export type RecommendationResult = {
  listing: SemanticListing;
  score: number;
  structuredScore: number;
  semanticScore: number;
  comp: CompValidation;
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

function calculateStructuredScore(
  target: SemanticListing,
  candidate: SemanticListing
): number {
  let score = 0;

  const priceDiff = Math.abs(
    Number(target.price) - Number(candidate.price)
  );

  if (priceDiff < 50000) {
    score += 20;
  } else if (priceDiff < 150000) {
    score += 12;
  } else if (priceDiff < 300000) {
    score += 5;
  }

  if (Number(target.beds) === Number(candidate.beds)) {
    score += 15;
  }

  if (target.L_City === candidate.L_City) {
    score += 15;
  }

  const sqftDiff = Math.abs(
    Number(target.sqft) - Number(candidate.sqft)
  );

  if (sqftDiff < 300) {
    score += 10;
  } else if (sqftDiff < 700) {
    score += 5;
  }

  return score;
}

export async function recommendationAgent(
  targetAddress: string
): Promise<RecommendationResult[]> {
  const target = await getListingByAddress(targetAddress);

  if (!target) {
    throw new Error(`Target listing not found: ${targetAddress}`);
  }

  const candidates = await getRecommendationCandidates(
    target,
    50
  );

  if (candidates.length === 0) {
    return [];
  }

  const targetEmbedding = await getEmbedding(
    buildListingText(target)
  );

  const candidateEmbeddings = await getEmbeddings(
    candidates.map(buildListingText)
  );

  const scored = candidates.map((candidate, index) => {
    const structuredScore = calculateStructuredScore(
      target,
      candidate
    );

    const similarity = cosineSimilarity(
      targetEmbedding,
      candidateEmbeddings[index]
    );

    const semanticScore = similarity * 40;

    return {
      candidate,
      structuredScore,
      semanticScore,
      score: structuredScore + semanticScore,
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const topFive = scored.slice(0, 5);

  const results: RecommendationResult[] = [];

  for (const result of topFive) {
    const comp = await validateWithComps(
      result.candidate.L_City,
      Number(result.candidate.sqft),
      Number(result.candidate.price)
    );

    results.push({
      listing: result.candidate,
      score: Number(result.score.toFixed(2)),
      structuredScore: result.structuredScore,
      semanticScore: Number(
        result.semanticScore.toFixed(2)
      ),
      comp,
    });
  }

  return results;
}
