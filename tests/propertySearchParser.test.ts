import { parsePropertyQuery } from "../src/skills/propertySearchParser";

async function runTests() {
  const tests = [
    {
      query: "Show me 3-bedroom condos in Irvine under $1.5M with a pool.",
      expected: {
        city: "Irvine",
        maxPrice: 1500000,
        beds: 3,
        type: "Condominium",
        pool: "True",
      },
    },
    {
      query: "Find 4 bed single family homes in San Jose under $2M.",
      expected: {
        city: "San Jose",
        maxPrice: 2000000,
        beds: 4,
        type: "SingleFamilyResidence",
      },
    },
    {
      query: "Show townhomes in Fremont under $900k with a view.",
      expected: {
        city: "Fremont",
        maxPrice: 900000,
        type: "Townhouse",
        hasView: "True",
      },
    },
    {
      query: "Find 2-bedroom condos in Oakland under $750000.",
      expected: {
        city: "Oakland",
        maxPrice: 750000,
        beds: 2,
        type: "Condominium",
      },
    },
    {
      query: "Show 3 bed 2.5 bath homes in Pasadena under $1.2M.",
      expected: {
        city: "Pasadena",
        maxPrice: 1200000,
        beds: 3,
        baths: 2.5,
      },
    },
    {
      query: "Find single family homes in San Mateo with at least 1800 sqft.",
      expected: {
        city: "San Mateo",
        sqft: 1800,
        type: "SingleFamilyResidence",
      },
    },
    {
      query: "Show condos in Newport Beach with a pool and view.",
      expected: {
        city: "Newport Beach",
        type: "Condominium",
        pool: "True",
        hasView: "True",
      },
    },
    {
      query: "Find land in Sacramento under $500k.",
      expected: {
        city: "Sacramento",
        maxPrice: 500000,
        type: "UnimprovedLand",
      },
    },
    {
      query: "Show townhomes in Sunnyvale with HOA under $450.",
      expected: {
        city: "Sunnyvale",
        maxPrice: null,
        type: "Townhouse",
        maxHOA: 450,
      },
    },
    {
      query: "Find 4-bedroom homes in Cupertino under $3M with a pool and HOA below $600.",
      expected: {
        city: "Cupertino",
        maxPrice: 3000000,
        beds: 4,
        pool: "True",
        maxHOA: 600,
      },
    },
  ];

  let passed = 0;

  for (let i = 0; i < tests.length; i++) {
    const result = await parsePropertyQuery(tests[i].query);

    const success = Object.entries(tests[i].expected).every(
      ([key, value]) =>
        result[key as keyof typeof result] === value
    );

    if (success) {
      console.log(`PASS Test ${i + 1}: ${tests[i].query}`);
      passed++;
    } else {
      console.log(`FAIL Test ${i + 1}: ${tests[i].query}`);
      console.log("Expected:", tests[i].expected);
      console.log("Received:", result);
    }
  }

  console.log(`\n${passed}/${tests.length} tests passed.`);
}

runTests();