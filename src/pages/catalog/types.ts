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

enum QueryActionKind {
  AddFilterQuery = 'AddFilterQuery',
  RemoveFilterQuery = 'RemoveFilterQuery',
  ChangeSorting = 'ChangeSorting',
}

type QueryAction = {
  type: QueryActionKind;
  payload: string;
};

type QueryState = {
  filters: string[];
  facet: string[];
  sort: string;
};

export { facetsNames, QueryActionKind };
export type { QueryState, QueryAction };
