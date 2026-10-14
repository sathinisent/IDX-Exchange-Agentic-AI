# Week 3: MLS Database Integration

## Goal

Week 3 connects the natural-language filters created in Week 2 to the local MySQL MLS databases.

The implementation uses parameterized SQL queries to safely retrieve data from:

- `rets_property` for active listings
- `california_sold` for sold comps

## Database Connection

The MySQL connection layer is implemented in:

`src/db/mysql.ts`

It uses a connection pool and environment variables for database credentials.

## Active Listing Search

The active listing query is implemented in:

`src/db/propertyQueries.ts`

It accepts the structured filters created by the Week 2 parser and applies them to `rets_property`.

Supported filters include:

- city
- maximum price
- minimum bedrooms
- minimum bathrooms
- minimum square footage
- property type
- pool
- view
- maximum HOA fee

The query uses parameterized SQL and supports pagination through `LIMIT` and `OFFSET`.

## Sold Comps

The same database layer also queries `california_sold` to retrieve recent residential sold transactions by city.

The sold comps query returns fields including:

- address
- close date
- close price
- bedrooms
- bathrooms
- living area
- property type
- property subtype

## Result Formatting

Formatting functions are implemented in:

`src/skills/propertyFormatter.ts`

These convert raw database rows into cleaner property cards for downstream agents and user-facing responses.

## Integration Test

The integration test is located at:

`tests/week3Integration.test.ts`

Example query:

`Find homes in Irvine under $2M.`

The test successfully:

1. Parses the natural-language query.
2. Generates structured filters.
3. Queries `rets_property`.
4. Returns active listings.
5. Queries `california_sold`.
6. Returns recent sold comps.
7. Formats both result types into readable property cards.

## Week 3 Deliverable

Week 3 is complete: the project can accept natural-language property filters from Week 2, query both MLS tables using parameterized SQL, paginate active listing results, and return formatted property information.
