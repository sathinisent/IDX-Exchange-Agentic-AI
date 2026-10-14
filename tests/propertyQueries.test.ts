import { parsePropertyQuery } from "../src/skills/propertySearchParser";
import { searchActiveListings } from "../src/db/propertyQueries";

async function run() {
  const userQuery = "Find homes in Irvine under $2M.";
  const filters = await parsePropertyQuery(userQuery);

  console.log("Parsed filters:");
  console.log(filters);

  const listings = await searchActiveListings(filters, 1, 5);

  console.log(`\nFound ${listings.length} listing(s):`);

  for (const listing of listings) {
    console.log({
      id: listing.L_ListingID,
      address: listing.L_Address,
      city: listing.L_City,
      price: listing.price,
      beds: listing.beds,
      baths: listing.baths,
      sqft: listing.sqft,
      type: listing.type,
      pool: listing.PoolPrivateYN,
    });
  }
}

run().catch((error) => {
  console.error("Property search failed:");
  console.error(error);
});
