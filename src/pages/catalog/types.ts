interface FacetName {
  attribute: string;
  nameEn: string;
}

const facetsNames: FacetName[] = [
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

const FacetQueries = [
  'variants.attributes.OS',
  'variants.attributes.CPU',
  'variants.attributes.RAM',
  'variants.attributes.HDD',
  'variants.attributes.Diagonal',
];

// eslint-disable-next-line import/prefer-default-export
export { facetsNames, FacetQueries };
