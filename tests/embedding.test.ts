import { getEmbedding } from "../src/skills/embeddings";

async function run() {
  const embedding = await getEmbedding(
    "charming craftsman home with mountain views"
  );

  console.log("Embedding generated successfully.");
  console.log("Dimensions:", embedding.length);
  console.log("First 5 values:", embedding.slice(0, 5));
}

run().catch((error) => {
  console.error("Embedding test failed:");
  console.error(error);
});
