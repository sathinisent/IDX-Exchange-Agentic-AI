import {
  getListingByAddress,
  getRecommendationCandidates,
  validateWithComps,
} from "../src/db/recommendationQueries";

async function run() {
  const target = await getListingByAddress("582 Pasture Ave");

  if (!target) {
    console.log("Target listing not found.");
    return;
  }

  console.log("Target:");
  console.log(target.L_Address, target.L_City);
  console.log(`$${Number(target.price).toLocaleString()}`);
  console.log();

  const candidates = await getRecommendationCandidates(target, 5);

  console.log(`Found ${candidates.length} candidates.`);

  for (const listing of candidates) {
    console.log(
      `${listing.L_Address}, ${listing.L_City} - $${Number(
        listing.price
      ).toLocaleString()}`
    );
  }

  const comp = await validateWithComps(
    target.L_City,
    Number(target.sqft),
    Number(target.price)
  );

  console.log("\nComp validation:");
  console.log(comp);
}

run().catch((error) => {
  console.error("Recommendation query test failed:");
  console.error(error);
});
