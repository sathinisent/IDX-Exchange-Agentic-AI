import type { ListingRow, SoldRow } from "../db/propertyQueries";

export function formatActiveListing(listing: ListingRow): string {
  return [
    `${listing.L_Address}, ${listing.L_City}`,
    `$${Number(listing.price).toLocaleString()}`,
    `${listing.beds} bed | ${listing.baths} bath | ${listing.sqft} sqft`,
    `Type: ${listing.type}`,
    `Days on Market: ${listing.DaysOnMarket}`,
  ].join("\n");
}

export function formatSoldComp(comp: SoldRow): string {
  return [
    `${comp.UnparsedAddress}, ${comp.City}`,
    `Sold for $${Number(comp.ClosePrice).toLocaleString()}`,
    `${comp.BedroomsTotal} bed | ${comp.BathroomsTotalInteger} bath | ${comp.LivingArea} sqft`,
    `Type: ${comp.PropertySubType}`,
    `Close Date: ${comp.CloseDate}`,
  ].join("\n");
}
