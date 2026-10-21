import { formatActiveListing } from "../src/skills/propertyFormatter";
import { conversationalPropertyAgent } from "../src/skills/conversationalPropertyAgent";
import { clearSession } from "../src/skills/sessionMemory";

async function run() {
  const userId = "test-user-1";

  clearSession(userId);

  const messages = [
    "Find homes in Irvine",
    "Under $1.2M",
    "Single family with at least 3 beds",
  ];

  for (const message of messages) {
    console.log("\nUSER:");
    console.log(message);

    const response = await conversationalPropertyAgent(userId, message);

    console.log("\nAGENT:");
    console.log(response.message);

    if (response.listings && response.listings.length > 0) {
      console.log("\nLISTINGS:");

      for (const listing of response.listings) {
          console.log("\n--------------------");
  console.log(formatActiveListing(listing));
  console.log(`Photos: ${listing.PhotoCount}`);
}
    }
  }
}

run().catch((error) => {
  console.error("Week 4 conversation test failed:");
  console.error(error);
});
