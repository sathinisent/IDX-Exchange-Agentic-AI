import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getEmbedding(text: string): Promise<number[]> {
  const cleanedText = text.replace(/\n/g, " ").trim().slice(0, 8000);

  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: cleanedText,
    config: {
      outputDimensionality: 768,
    },
  });

  const values = result.embeddings?.[0]?.values;

  if (!values) {
    throw new Error("No embedding returned by Gemini.");
  }

  return values;
}

export async function getEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const cleanedTexts = texts.map((text) =>
    text.replace(/\n/g, " ").trim().slice(0, 8000)
  );

  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: cleanedTexts,
    config: {
      outputDimensionality: 768,
    },
  });

  if (!result.embeddings) {
    throw new Error("No embeddings returned by Gemini.");
  }

  return result.embeddings.map((embedding) => {
    if (!embedding.values) {
      throw new Error("Embedding values missing.");
    }

    return embedding.values;
  });
}

export function cosineSimilarity(
  a: number[],
  b: number[]
): number {
  if (a.length !== b.length) {
    throw new Error("Embedding dimensions do not match.");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (
    Math.sqrt(magnitudeA) *
    Math.sqrt(magnitudeB)
  );
}
