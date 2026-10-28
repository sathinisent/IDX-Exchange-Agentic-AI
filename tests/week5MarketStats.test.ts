import { marketStatsAgent } from "../src/skills/marketStatsAgent";

async function run() {
  const cities = ["Irvine", "San Jose", "Pasadena"];

  for (const city of cities) {
    console.log("\n==============================");
    console.log(`Testing ${city}`);
    console.log("==============================\n");

    const result = await marketStatsAgent(city);

    console.log(result.response);
  }
}

run().catch((error) => {
  console.error("Week 5 market stats test failed:");
  console.error(error);
});
