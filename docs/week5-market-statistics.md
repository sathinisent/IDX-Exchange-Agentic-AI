# Week 5: Market Statistics Agent

## Goal

Week 5 builds a market analytics agent powered by the `california_sold` table.

The agent summarizes residential market conditions for a California city using recent sold transaction data.

## Market Metrics

The implementation calculates:

- Median sale price
- Average sale price
- Average price per square foot
- Average days on market
- List-to-close price ratio
- Number of sales in the last 12 months
- 12-month price trend

## Database Queries

The market analytics queries are implemented in:

`src/db/marketQueries.ts`

The queries use `california_sold` and filter for residential transactions within the requested time period.

## Market Statistics Agent

The agent is implemented in:

`src/skills/marketStatsAgent.ts`

It retrieves the market summary and monthly trend data, then converts the results into a readable market report.

## Example Output

Example for Irvine:

```text
Market Summary for Irvine

Median sale price: $1,494,444
Average sale price: $1,743,563
Average price per sqft: $811
Average days on market: 39.7
List-to-close ratio: 98%
Sales in last 12 months: 1102
12-month price trend: rising (2.6%)
