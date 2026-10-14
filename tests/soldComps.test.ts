import { getSoldComps } from "../src/db/propertyQueries";

async function run() {
  try {
    const comps = await getSoldComps("Irvine", 12);

    console.log(`Found ${comps.length} sold comp(s):`);

    for (const comp of comps.slice(0, 5)) {
      console.log({
        listingKey: comp.ListingKey,
        address: comp.UnparsedAddress,
        city: comp.City,
        closeDate: comp.CloseDate,
        closePrice: comp.ClosePrice,
        beds: comp.BedroomsTotal,
        baths: comp.BathroomsTotalInteger,
        sqft: comp.LivingArea,
        type: comp.PropertyType,
        subtype: comp.PropertySubType,
      });
    }
  } catch (error) {
    console.error("Sold comps query failed:");
    console.error(error);
  }
}

run();
