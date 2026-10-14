import { parsePropertyQuery } from "../src/skills/propertySearchParser";
import {
  searchActiveListings,
  getSoldComps,
} from "../src/db/propertyQueries";
import {
  formatActiveListing,
  formatSoldComp,
} from "../src/skills/propertyFormatter";

async function run() {
  const userQuery = "Find homes in Irvine under $2M.";

  console.log("USER QUERY:");
  console.log(userQuery);

  const filters = await parsePropertyQuery(userQuery);

  console.log("\nPARSED FILTERS:");
  console.log(filters);

  const listings = await searchActiveListings(filters, 1, 3);

  console.log("\nACTIVE LISTINGS:");

  for (const listing of listings) {
    console.log("\n--------------------");
    console.log(formatActiveListing(listing));
  }

  const comps = await getSoldComps("Irvine", 12);

  console.log("\nSOLD COMPS:");

  for (const comp of comps.slice(0, 3)) {
    console.log("\n--------------------");
    console.log(formatSoldComp(comp));
  }
}

run().catch((error) => {
  console.error("Week 3 integration test failed:");
  console.error(error);
});
