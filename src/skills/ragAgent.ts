import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

import {
  buildRagIndex,
  retrieveRelevantChunks,
  type IndexedChunk,
} from "./ragIndex";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let cachedIndex: IndexedChunk[] | null = null;

async function getIndex() {
  if (!cachedIndex) {
    cachedIndex = await buildRagIndex();
  }

  return cachedIndex;
}

export async function ragAgent(question: string) {
  const index = await getIndex();

  const chunks = await retrieveRelevantChunks(
    question,
    index,
    4
  );

  const context = chunks
    .map(
      (item, index) =>
        `[Source ${index + 1}: ${item.source}]\n${item.chunk}`
    )
    .join("\n\n");

  const prompt = `
You are a real estate knowledge assistant.

Answer the question using ONLY the source context below.

If the answer is not supported by the context, say:
"I don't have enough information in the indexed sources to answer that."

Keep the answer concise and factual.

SOURCE CONTEXT:

${context}

QUESTION:
${question}
  `.trim();

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const answer =
    response.text ??
    "I couldn't generate an answer.";

  return {
    question,
    answer,
    sources: chunks.map((item) => item.source),
  };
}
