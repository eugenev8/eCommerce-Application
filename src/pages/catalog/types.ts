interface FacetName {
  attribute: string;
  nameEn: string;
  query: string;
}

const FACETS_NAMES: FacetName[] = [
  {
    attribute: 'OS',
    query: 'variants.attributes.OS',
    nameEn: 'Operating system',
  },
  {
    attribute: 'CPU',
    query: 'variants.attributes.CPU',
    nameEn: 'Processor',
  },
  {
    attribute: 'RAM',
    query: 'variants.attributes.RAM',
    nameEn: 'Memory',
  },
  {
    attribute: 'HDD',
    query: 'variants.attributes.HDD',
    nameEn: 'Hard disk',
  },
  {
    attribute: 'Diagonal',
    query: 'variants.attributes.Diagonal',
    nameEn: 'Diagonal',
  },
];

const PRICE_FACET: FacetName = {
  attribute: 'price',
  query: 'variants.price.centAmount',
  nameEn: 'Price',
};

const SEARCH_FACET: FacetName = {
  attribute: 'search',
  query: 'searchKeywords.en-US.text',
  nameEn: 'Key search',
};

interface SortingType {
  name: string;
  queryString: string;
}

const SORTING_TYPES: SortingType[] = [
  {
    name: 'price \u2193',
    queryString: 'price desc',
  },
  {
    name: 'price \u2191',
    queryString: 'price asc',
  },
  {
    name: 'name \u2193',
    queryString: 'name.en-us desc',
  },
  {
    name: 'name \u2191',
    queryString: 'name.en-us asc',
  },
];

export { FACETS_NAMES, SORTING_TYPES, PRICE_FACET, SEARCH_FACET };
export type { FacetName };
