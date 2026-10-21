# Week 4: Conversational Property Search Agent

## Goal

Week 4 transforms the single-turn property search from Week 3 into a multi-turn conversational experience.

The agent remembers user preferences within a session, asks follow-up questions when information is missing, and progressively refines the property search.

## Session Memory

Session memory is implemented in:

`src/skills/sessionMemory.ts`

Each user session can store:

- city
- maximum price
- bedrooms
- bathrooms
- property type
- pool preference
- previous listing results
- conversation step

## Conversational Agent

The conversational search logic is implemented in:

`src/skills/conversationalPropertyAgent.ts`

The agent:

1. Parses each user message.
2. Updates the user's stored session preferences.
3. Checks which search criteria are still missing.
4. Asks follow-up questions when needed.
5. Queries `rets_property` once enough information has been collected.
6. Stores the returned listings in session memory.

## Example Conversation

User:

`Find homes in Irvine`

Agent:

`What is your maximum budget?`

User:

`Under $1.2M`

Agent:

`What type of property do you prefer — condo, townhome, or single family?`

User:

`Single family with at least 3 beds`

Agent:

`I found 4 matching active listings.`

## Result Formatting

The returned listings include:

- address
- price
- bedrooms
- bathrooms
- square footage
- property type
- days on market
- photo count

## Testing

The multi-turn conversation test is located at:

`tests/week4Conversation.test.ts`

The test successfully demonstrated session memory and progressive query refinement using real `rets_property` results.

## Week 4 Deliverable

Week 4 is complete: the conversational property search agent remembers user preferences across multiple messages, asks follow-up questions, refines the search, and returns matching active listings.
