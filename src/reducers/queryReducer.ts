export enum QueryActionKind {
  AddFilterQuery = 'AddFilterQuery',
  RemoveFilterQuery = 'RemoveFilterQuery',
  ChangeSorting = 'ChangeSorting',
}

type QueryData = {
  attribute: string;
  value: string;
};

export type QueryAction = {
  type: QueryActionKind;
  payload: QueryData;
};

export type FilterQuery = {
  attribute: string;
  values: string[];
};

export type QueryState = {
  filters: FilterQuery[];
  facet: string[];
  sort: string;
};
function queryReducer(state: QueryState, action: QueryAction) {
  const { type, payload } = action;

  let filterInState: FilterQuery | undefined;
  let newFilter: FilterQuery;
  let newFilters: FilterQuery[];

  switch (type) {
    case QueryActionKind.AddFilterQuery:
      filterInState = state.filters.find((filter) => filter.attribute === payload.attribute);
      if (!filterInState) {
        return { ...state, filters: [...state.filters, { attribute: payload.attribute, values: [payload.value] }] };
      }
      newFilter = { attribute: filterInState.attribute, values: [...filterInState.values, payload.value] };
      newFilters = [...state.filters.filter((filter) => filter !== filterInState), newFilter];
      return { ...state, filters: newFilters };
    case QueryActionKind.RemoveFilterQuery:
      filterInState = state.filters.find((filter) => filter.attribute === payload.attribute);
      if (!filterInState) return state;
      if (!filterInState.values.includes(payload.value)) return state;
      if (filterInState.values.length === 1) {
        return { ...state, filters: state.filters.filter((filter) => filter.attribute !== payload.attribute) };
      }
      newFilter = {
        attribute: filterInState.attribute,
        values: filterInState.values.filter((value) => value !== payload.value),
      };
      newFilters = [...state.filters.filter((filter) => filter !== filterInState), newFilter];
      return { ...state, filters: newFilters };
    case QueryActionKind.ChangeSorting:
      return { ...state, sort: payload.value };
    default:
      return state;
  }
}

export { queryReducer };
