interface FacetName {
  attribute: string;
  nameEn: string;
}

const FACETS_NAMES: FacetName[] = [
  {
    attribute: 'OS',
    nameEn: 'Operating system',
  },
  {
    attribute: 'CPU',
    nameEn: 'Processor',
  },
  {
    attribute: 'RAM',
    nameEn: 'Memory',
  },
  {
    attribute: 'HDD',
    nameEn: 'Hard disk',
  },
  {
    attribute: 'Diagonal',
    nameEn: 'Diagonal',
  },
];

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

export { FACETS_NAMES, SORTING_TYPES };
