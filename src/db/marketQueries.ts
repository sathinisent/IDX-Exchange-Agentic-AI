import { query } from "./mysql";

export type MarketSummary = {
  city: string;
  sold_count: number;
  avg_close_price: number;
  median_close_price: number;
  avg_price_per_sqft: number;
  avg_dom: number;
  list_to_close_pct: number;
};

export type MonthlyTrend = {
  month: string;
  sales: number;
  avg_price: number;
  avg_dom: number;
};

export async function getCityMarketSummary(
  city: string
): Promise<MarketSummary | null> {
  const sql = `
    SELECT
      City AS city,
      COUNT(*) AS sold_count,
      ROUND(AVG(ClosePrice), 0) AS avg_close_price,
      ROUND(
        AVG(ClosePrice / NULLIF(LivingArea, 0)),
        0
      ) AS avg_price_per_sqft,
      ROUND(AVG(DaysOnMarket), 1) AS avg_dom,
      ROUND(
        AVG(ClosePrice / NULLIF(ListPrice, 0)) * 100,
        1
      ) AS list_to_close_pct
    FROM california_sold
    WHERE City = ?
      AND PropertyType = "Residential"
      AND CloseDate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      AND LivingArea > 0
    GROUP BY City
  `;

  const rows = await query<any>(sql, [city]);

  if (rows.length === 0) {
    return null;
  }

  const medianSql = `
    SELECT ClosePrice
    FROM california_sold
    WHERE City = ?
      AND PropertyType = "Residential"
      AND CloseDate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      AND ClosePrice IS NOT NULL
    ORDER BY ClosePrice
  `;

  const prices = await query<any>(medianSql, [city]);

  let median = 0;

  if (prices.length > 0) {
    const middle = Math.floor(prices.length / 2);

    if (prices.length % 2 === 0) {
      median =
        (Number(prices[middle - 1].ClosePrice) +
          Number(prices[middle].ClosePrice)) /
        2;
    } else {
      median = Number(prices[middle].ClosePrice);
    }
  }

  return {
    ...rows[0],
    median_close_price: Math.round(median),
  };
}

export async function getMonthlyTrend(
  city: string,
  months = 12
): Promise<MonthlyTrend[]> {
  const sql = `
    SELECT
      DATE_FORMAT(CloseDate, "%Y-%m") AS month,
      COUNT(*) AS sales,
      ROUND(AVG(ClosePrice), 0) AS avg_price,
      ROUND(AVG(DaysOnMarket), 1) AS avg_dom
    FROM california_sold
    WHERE City = ?
      AND PropertyType = "Residential"
      AND CloseDate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
    GROUP BY DATE_FORMAT(CloseDate, "%Y-%m")
    ORDER BY month
  `;

  return query<MonthlyTrend>(sql, [city, months]);
}
