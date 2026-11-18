import { recommendationAgent } from "../src/skills/recommendationAgent";

async function run() {
  const targetAddress = "582 Pasture Ave";

  console.log(
    `Finding recommendations similar to ${targetAddress}...\n`
  );

  const results = await recommendationAgent(targetAddress);

  console.log(`Top ${results.length} recommendations:\n`);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const listing = result.listing;

    console.log(`${i + 1}. ${listing.L_Address}, ${listing.L_City}`);

    console.log(
      `$${Number(listing.price).toLocaleString()} | ` +
      `${listing.beds} bed | ${listing.baths} bath | ` +
      `${listing.sqft} sqft`
    );

    console.log(`Hybrid score: ${result.score}`);
    console.log(
      `Structured: ${result.structuredScore} / 60`
    );
    console.log(
      `Semantic: ${result.semanticScore.toFixed(2)} / 40`
    );

    console.log(
      `Comp-supported price: $${Number(
        result.comp.comp_price
      ).toLocaleString()}`
    );

    console.log(
      `Price difference vs comps: ${result.comp.delta_pct}%`
    );

    console.log(
      `Recent comps used: ${result.comp.comp_count}`
    );

    console.log("-----------------------------");
  }
}

run().catch((error) => {
  console.error("Week 7 recommendation test failed:");
  console.error(error);
});
