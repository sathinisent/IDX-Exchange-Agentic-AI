# Week 2: Natural Language Property Search

## Goal

Week 2 focuses on converting free-text real estate queries into structured filter objects that can later be used to query the `rets_property` table.

Example input:

"Show me 3-bedroom condos in Irvine under $1.5M with a pool."

Example output:

```json
{
  "city": "Irvine",
  "maxPrice": 1500000,
  "beds": 3,
  "baths": null,
  "sqft": null,
  "type": "Condominium",
  "pool": "True",
  "hasView": null,
  "maxHOA": null
}
