import { semanticPropertySearch } from "../src/skills/semanticPropertySearch";

async function run() {
  const searchQuery =
    "modern spacious family home with open floor plan and updated kitchen";

  console.log(`Search: "${searchQuery}"\n`);

  const results = await semanticPropertySearch(searchQuery, 5);

  console.log(`Top ${results.length} semantic matches:\n`);

  for (const result of results) {
    const listing = result.listing;

    console.log(`${listing.L_Address}, ${listing.L_City}`);
    console.log(`Price: $${Number(listing.price).toLocaleString()}`);
    console.log(
      `${listing.beds} bed | ${listing.baths} bath | ${listing.sqft} sqft`
    );
    console.log(
      `Similarity: ${result.similarity.toFixed(4)}`
    );
    console.log(
      `Remarks: ${listing.L_Remarks.slice(0, 140)}...`
    );
    console.log("-----------------------------");
  }
}

run().catch((error) => {
  console.error("Week 6 semantic search test failed:");
  console.error(error);
});
