export type RagDocument = {
  title: string;
  content: string;
};

export const ragDocuments: RagDocument[] = [
  {
    title: "Real Estate Data Analyst Primer",
    content: `
Days on Market (DOM) measures how long a property has been listed before going under contract or selling.

DOM is typically calculated as the number of calendar days between the ListingContractDate and either the date the status changed to Pending or the CloseDate, depending on the platform.

Low DOM generally indicates stronger demand, while high DOM can indicate weaker demand or an overpriced listing.

The ratio of ClosePrice to ListPrice is often called the sale-to-list or list-to-close ratio.

A ratio above 1.0 means the property sold above the list price and may indicate a competitive seller's market.

A ratio below 1.0 means the property sold below list price and may indicate buyer leverage or an overpriced listing.
    `.trim(),
  },

  {
    title: "Trestle Property Metadata",
    content: `
DaysOnMarket is the number of days the listing is on market, as defined by MLS business rules.

CumulativeDaysOnMarket is the number of days the property is on market across listing periods, as defined by MLS business rules.

ClosePrice is the amount of money paid by the purchaser to the seller for the property under the agreement.

CloseDate is the date the purchase agreement was fulfilled.

StandardStatus represents the state of the listing contract, including Active, Active Under Contract, Closed, Expired, Pending, Withdrawn, and Canceled.

City is the city in the listing address.

UnparsedAddress is a full text representation of the property address.

PropertyType and PropertySubType describe the property classification.

LivingArea represents the living area of the property.

ListPrice represents the listing price.

YearBuilt represents the year the property was constructed.
    `.trim(),
  },

  {
    title: "Week 5 Market Statistics",
    content: `
The market statistics agent uses california_sold data.

Core calculated metrics include average close price, median close price, average price per square foot, average days on market, list-to-close ratio, number of sales, and 12-month price trend.

List-to-close ratio is calculated using ClosePrice divided by ListPrice.

The agent groups recent residential sales by city and analyzes transactions from california_sold.

Example outputs include median sale price, average sale price, average price per square foot, average days on market, list-to-close ratio, sales count, and market trend.
    `.trim(),
  },

  {
    title: "IDX Exchange Schema Reference",
    content: `
california_sold includes MLS sold transaction fields such as:

ListingKey
UnparsedAddress
City
PostalCode
CloseDate
ClosePrice
OriginalListPrice
ListPrice
DaysOnMarket
BedroomsTotal
BathroomsTotalInteger
LivingArea
PropertyType
PropertySubType
YearBuilt
ListAgentFullName
ListOfficeName
BuyerOfficeName
PoolPrivateYN
ViewYN
FireplaceYN
AssociationFee
Latitude
Longitude

rets_property contains active listing fields including:

L_ListingID
L_DisplayId
L_Address
L_City
L_Zip
L_Class
L_Type_
L_Keyword2
LM_Dec_3
L_SystemPrice
LM_Int2_3
L_Status
L_Remarks
YearBuilt
AssociationFee
PoolPrivateYN
ViewYN
FireplaceYN
PhotoCount
    `.trim(),
  },
];
