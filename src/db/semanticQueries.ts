import { query } from "./mysql";

export type SemanticListing = {
  L_ListingID: string;
  L_Address: string;
  L_City: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  YearBuilt: number;
  L_Remarks: string;
};

export async function getSemanticCandidates(
  limit = 25
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
      AND L_Remarks IS NOT NULL
      AND TRIM(L_Remarks) <> ""
    LIMIT ?
  `;

  return query<SemanticListing>(sql, [limit]);
}
