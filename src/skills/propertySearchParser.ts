export type PropertyFilters = {
  city: string | null;
  maxPrice: number | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  type: string | null;
  pool: string | null;
  maxHOA: number | null;
  hasView: string | null;
};

export async function parsePropertyQuery(query: string): Promise<PropertyFilters> {
  const cityMatch = query.match(/in ([A-Za-z\s]+?)(?:\s+under|\s+with|\s+at|$)/i);
const priceMatches = [...query.matchAll(/under \$?([\d,.]+)(k|m)?/gi)];
  const priceMatch = priceMatches.find((match) => {
  const beforeMatch = query.slice(0, match.index).toLowerCase();
  return !/(hoa|association fee)\s*$/.test(beforeMatch);
});
  const bedsMatch = query.match(/(\d+)[\s-]*(bed|beds|bedroom|bedrooms)/i);
  const bathsMatch = query.match(/(\d+(?:\.5)?)[\s-]*(bath|baths|bathroom|bathrooms)/i);
  const sqftMatch = query.match(/(\d+)[\s,]*(sqft|sq ft|square feet)/i);

  const poolMatch = /pool/i.test(query);
  const viewMatch = /view/i.test(query);
  const hoaMatch = query.match(/(?:hoa|association fee)\s*(?:under|below|less than)?\s*\$?([\d,.]+)/i);

  const typeMap: Record<string, string> = {
    condo: "Condominium",
    condominium: "Condominium",
    townhome: "Townhouse",
    townhouse: "Townhouse",
    "single family": "SingleFamilyResidence",
    land: "UnimprovedLand",
  };

  const typeKey = Object.keys(typeMap).find((key) =>
    query.toLowerCase().includes(key)
  );

  let maxPrice: number | null = null;

  if (priceMatch) {
    maxPrice = Number(priceMatch[1].replace(/,/g, ""));

    if (priceMatch[2]?.toLowerCase() === "k") {
      maxPrice *= 1000;
    }

    if (priceMatch[2]?.toLowerCase() === "m") {
      maxPrice *= 1_000_000;
    }
  }

  return {
    city: cityMatch?.[1]?.trim() || null,
    maxPrice,
    beds: bedsMatch ? Number(bedsMatch[1]) : null,
    baths: bathsMatch ? Number(bathsMatch[1]) : null,
    sqft: sqftMatch ? Number(sqftMatch[1]) : null,
    type: typeKey ? typeMap[typeKey] : null,
    pool: poolMatch ? "True" : null,
    hasView: viewMatch ? "True" : null,
    maxHOA: hoaMatch ? Number(hoaMatch[1].replace(/,/g, "")) : null,
  };
}
