import {
  buildRagIndex,
  retrieveRelevantChunks,
} from "../src/skills/ragIndex";

async function run() {
  console.log("Building RAG index...\n");

  const index = await buildRagIndex();

  console.log(
    `Indexed ${index.length} document chunks.\n`
  );

  const query = "What does DOM mean?";

  console.log(`Question: ${query}\n`);

  const results = await retrieveRelevantChunks(
    query,
    index,
    4
  );

  for (let i = 0; i < results.length; i++) {
    console.log(`${i + 1}. ${results[i].source}`);
    console.log(
      `Similarity: ${results[i].similarity.toFixed(4)}`
    );
    console.log(results[i].chunk);
    console.log("-----------------------------");
  }
}

run().catch((error) => {
  console.error("RAG retrieval test failed:");
  console.error(error);
});
