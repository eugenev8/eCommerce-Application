const PROJECT_CURRENCY = 'USD';

interface FacetName {
  attribute: string;
  nameEn: string;
  query: string;
  prefix?: string;
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
    prefix: 'GB',
  },
  {
    attribute: 'HDD',
    query: 'variants.attributes.HDD',
    nameEn: 'Hard disk',
    prefix: 'GB',
  },
  {
    attribute: 'Diagonal',
    query: 'variants.attributes.Diagonal',
    nameEn: 'Diagonal',
    prefix: '"',
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

const INITIAL_SORTING_TYPE = SORTING_TYPES[0];

const NAME_LOCALE = 'en-US';

type SearchQueryType = {
  queryArgs: {
    markMatchingVariants?: boolean;
    filter: string[];
    'filter.facets'?: string | string[];
    'filter.query'?: string | string[];
    facet?: string[];
    sort?: string | string[];
    limit?: number;
    offset?: number;
    'text.EN-US'?: string;
    fuzzy?: boolean;
  };
};

export { FACETS_NAMES, SORTING_TYPES, PRICE_FACET, SEARCH_FACET, NAME_LOCALE, INITIAL_SORTING_TYPE, PROJECT_CURRENCY };
export type { FacetName, SearchQueryType };
