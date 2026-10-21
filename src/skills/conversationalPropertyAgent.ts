import { parsePropertyQuery } from "./propertySearchParser";
import {
  getSession,
  updateSession,
} from "./sessionMemory";
import {
  searchActiveListings,
  type ListingRow,
} from "../db/propertyQueries";

export type AgentResponse = {
  message: string;
  listings?: ListingRow[];
};

export async function conversationalPropertyAgent(
  userId: string,
  message: string
): Promise<AgentResponse> {
  const parsed = await parsePropertyQuery(message);

  const updates: Record<string, any> = {};

  if (parsed.city) updates.city = parsed.city;
  if (parsed.maxPrice !== null) updates.maxPrice = parsed.maxPrice;
  if (parsed.beds !== null) updates.beds = parsed.beds;
  if (parsed.baths !== null) updates.baths = parsed.baths;
  if (parsed.type) updates.type = parsed.type;
  if (parsed.pool) updates.pool = parsed.pool;

  updateSession(userId, updates);

  const session = getSession(userId);

  if (!session.city) {
    return {
      message: "What city would you like to search in?",
    };
  }

  if (!session.maxPrice) {
    return {
      message: "What is your maximum budget?",
    };
  }

  if (!session.type) {
    return {
      message:
        "What type of property do you prefer — condo, townhome, or single family?",
    };
  }

  const filters = {
    city: session.city ?? null,
    maxPrice: session.maxPrice ?? null,
    beds: session.beds ?? null,
    baths: session.baths ?? null,
    sqft: null,
    type: session.type ?? null,
    pool: session.pool ?? null,
    hasView: null,
    maxHOA: null,
  };

  const listings = await searchActiveListings(filters, 1, 5);

  updateSession(userId, {
    lastResults: listings,
    conversationStep: session.conversationStep + 1,
  });

  if (listings.length === 0) {
    return {
      message:
        "I couldn't find any matching active listings. Try changing your budget or property preferences.",
      listings: [],
    };
  }

  return {
    message: `I found ${listings.length} matching active listings.`,
    listings,
  };
}
