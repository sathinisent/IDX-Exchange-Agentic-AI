import { query } from "./mysql";
import type { SemanticListing } from "./semanticQueries";

export async function getListingByAddress(
  address: string
): Promise<SemanticListing | null> {
  const sql = `
    SELECT
      L_ListingID,
      L_Address,
      L_City,
      L_SystemPrice AS price,
      L_Keyword2 AS beds,
      LM_Dec_3 AS baths,
      LM_Int2_3 AS sqft,
      L_Type_ AS type,
      YearBuilt,
      L_Remarks
    FROM rets_property
    WHERE L_Status = "Active"
      AND L_Address = ?
    LIMIT 1
  `;

  const rows = await query<SemanticListing>(sql, [address]);

  return rows[0] ?? null;
}

export async function getRecommendationCandidates(
  target: SemanticListing,
  limit = 50
): Promise<SemanticListing[]> {
  const sql = `
    SELECT
      L_ListingID,
      L_Address,
      L_City,
      L_SystemPrice AS price,
      L_Keyword2 AS beds,
      LM_Dec_3 AS baths,
      LM_Int2_3 AS sqft,
      L_Type_ AS type,
      YearBuilt,
      L_Remarks
    FROM rets_property
    WHERE L_Status = "Active"
      AND L_ListingID <> ?
      AND L_Remarks IS NOT NULL
      AND TRIM(L_Remarks) <> ""
      AND L_SystemPrice BETWEEN ? AND ?
    ORDER BY ABS(L_SystemPrice - ?)
    LIMIT ?
  `;

  const minPrice = Number(target.price) * 0.6;
  const maxPrice = Number(target.price) * 1.4;

  return query<SemanticListing>(sql, [
    target.L_ListingID,
    minPrice,
    maxPrice,
    target.price,
    limit,
  ]);
}

export type CompValidation = {
  avg_ppsf: number;
  comp_count: number;
  comp_price: number;
  list_price: number;
  delta_pct: number;
};

export async function validateWithComps(
  city: string,
  sqft: number,
  price: number
): Promise<CompValidation> {
  const sql = `
    SELECT
      AVG(ClosePrice / NULLIF(LivingArea, 0)) AS avg_ppsf,
      COUNT(*) AS comp_count
    FROM california_sold
    WHERE City = ?
      AND PropertyType = "Residential"
      AND LivingArea BETWEEN ? AND ?
      AND CloseDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
  `;

  const rows = await query<any>(sql, [
    city,
    sqft * 0.8,
    sqft * 1.2,
  ]);

  const avgPpsf = Number(rows[0]?.avg_ppsf ?? 0);
  const compCount = Number(rows[0]?.comp_count ?? 0);

  const compPrice = avgPpsf > 0 ? avgPpsf * sqft : 0;

  const deltaPct =
    compPrice > 0
      ? ((price - compPrice) / compPrice) * 100
      : 0;

  return {
    avg_ppsf: Math.round(avgPpsf),
    comp_count: compCount,
    comp_price: Math.round(compPrice),
    list_price: price,
    delta_pct: Number(deltaPct.toFixed(1)),
  };
}
