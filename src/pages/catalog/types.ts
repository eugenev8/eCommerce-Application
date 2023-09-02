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
  query: 'variants.price.centAmount:range',
  nameEn: 'Price',
};

interface SortingType {
  name: string;
  queryString: string;
}

const SORTING_TYPES: SortingType[] = [
  {
    name: 'price ↓',
    queryString: 'price desc',
  },
  {
    name: 'price ↑',
    queryString: 'price asc',
  },
  {
    name: 'name ↓',
    queryString: 'name.en-us desc',
  },
  {
    name: 'name ↑',
    queryString: 'name.en-us asc',
  },
];

export { FACETS_NAMES, SORTING_TYPES, PRICE_FACET };
export type { FacetName };
