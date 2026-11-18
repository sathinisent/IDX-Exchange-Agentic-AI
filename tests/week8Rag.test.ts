import { ragAgent } from "../src/skills/ragAgent";

async function run() {
  const questions = [
    "What does DOM mean?",
    "What columns are in california_sold?",
    "What is a list-to-close ratio?",
  ];

  for (const question of questions) {
    console.log("\n==============================");
    console.log(`QUESTION: ${question}`);
    console.log("==============================\n");

    const result = await ragAgent(question);

    console.log(result.answer);

    console.log("\nSources:");
    for (const source of result.sources) {
      console.log(`- ${source}`);
    }
  }
}

run().catch((error) => {
  console.error("Week 8 RAG test failed:");
  console.error(error);
});
