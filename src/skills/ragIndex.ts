import { ragDocuments } from "./ragSources";
import {
  getEmbedding,
  getEmbeddings,
  cosineSimilarity,
} from "./embeddings";

export type IndexedChunk = {
  source: string;
  chunk: string;
  embedding: number[];
};

export function chunkText(
  text: string,
  chunkSize = 600,
  overlap = 100
): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);

    chunks.push(text.slice(start, end));

    if (end === text.length) {
      break;
    }

    start += chunkSize - overlap;
  }

  return chunks;
}

export async function buildRagIndex(): Promise<IndexedChunk[]> {
  const chunkRecords: {
    source: string;
    chunk: string;
  }[] = [];

  for (const doc of ragDocuments) {
    const chunks = chunkText(doc.content);

    for (const chunk of chunks) {
      chunkRecords.push({
        source: doc.title,
        chunk,
      });
    }
  }

  const embeddings = await getEmbeddings(
    chunkRecords.map((item) => item.chunk)
  );

  return chunkRecords.map((item, index) => ({
    ...item,
    embedding: embeddings[index],
  }));
}

export async function retrieveRelevantChunks(
  query: string,
  index: IndexedChunk[],
  topK = 4
) {
  const queryEmbedding = await getEmbedding(query);

  const scored = index.map((item) => ({
    source: item.source,
    chunk: item.chunk,
    similarity: cosineSimilarity(
      queryEmbedding,
      item.embedding
    ),
  }));

  scored.sort(
    (a, b) => b.similarity - a.similarity
  );

  return scored.slice(0, topK);
}
