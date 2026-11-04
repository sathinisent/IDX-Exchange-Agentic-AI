import { getSemanticCandidates } from "../src/db/semanticQueries";

async function run() {
  const listings = await getSemanticCandidates(5);

  console.log(`Found ${listings.length} active listings.\n`);

  for (const listing of listings) {
    console.log(`${listing.L_Address}, ${listing.L_City}`);
    console.log(`Price: $${Number(listing.price).toLocaleString()}`);
    console.log(`Beds: ${listing.beds} | Baths: ${listing.baths}`);
    console.log(`Remarks: ${listing.L_Remarks?.slice(0, 150)}...`);
    console.log("-----------------------------");
  }
}

run().catch((error) => {
  console.error("Semantic candidate test failed:");
  console.error(error);
});
