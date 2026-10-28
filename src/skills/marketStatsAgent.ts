import {
  getCityMarketSummary,
  getMonthlyTrend,
} from "../db/marketQueries";

export async function marketStatsAgent(city: string) {
  const summary = await getCityMarketSummary(city);
  const trend = await getMonthlyTrend(city, 12);

  if (!summary) {
    return {
      response: `I couldn't find enough market data for ${city}.`,
    };
  }

  let trendDirection = "stable";
  let trendPct = 0;

  if (trend.length >= 2) {
    const firstPrice = Number(trend[0].avg_price);
    const lastPrice = Number(trend[trend.length - 1].avg_price);

    if (firstPrice > 0) {
      trendPct = ((lastPrice - firstPrice) / firstPrice) * 100;

      if (trendPct > 2) {
        trendDirection = "rising";
      } else if (trendPct < -2) {
        trendDirection = "falling";
      }
    }
  }

  const response = [
    `Market Summary for ${city}`,
    `Median sale price: $${Number(summary.median_close_price).toLocaleString()}`,
    `Average sale price: $${Number(summary.avg_close_price).toLocaleString()}`,
    `Average price per sqft: $${Number(summary.avg_price_per_sqft).toLocaleString()}`,
    `Average days on market: ${summary.avg_dom}`,
    `List-to-close ratio: ${summary.list_to_close_pct}%`,
    `Sales in last 12 months: ${summary.sold_count}`,
    `12-month price trend: ${trendDirection} (${trendPct.toFixed(1)}%)`,
  ].join("\n");

  return {
    response,
    summary,
    trend,
  };
}
