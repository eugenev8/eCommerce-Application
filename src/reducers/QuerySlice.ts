/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacetName, INITIAL_SORTING_TYPE } from '../sdk/types';

export const ROOT_CATEGORY = 'root';

interface FilterQuery extends FacetName {
  values: string[];
}

export type QueryState = {
  filters: FilterQuery[];
  priceFilter: FilterQuery | null;
  sort: string;
  search: string;
  category?: string;
  limit: number;
  offset: number;
};

const initialState: QueryState = {
  filters: [],
  priceFilter: null,
  search: '',
  category: ROOT_CATEGORY,
  sort: INITIAL_SORTING_TYPE.queryString,
  limit: 10,
  offset: 0,
};

interface QueryData extends FacetName {
  value: string;
}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    loadQueriesFromParams(_, action: PayloadAction<QueryState>) {
      return action.payload;
    },
    addFilterQuery(state, action: PayloadAction<QueryData>) {
      const { payload } = action;
      const filter = state.filters.find((filterItem) => filterItem.attribute === payload.attribute);
      if (!filter) {
        state.filters.push({ ...payload, values: [payload.value] });
      } else {
        filter.values.push(payload.value);
      }
    },
    removeFilterQuery(state, action: PayloadAction<QueryData>) {
      const { payload } = action;
      const indexInState = state.filters.findIndex((filterItem) => filterItem.attribute === payload.attribute);
      if (indexInState === -1) return;
      if (!state.filters[indexInState].values.includes(payload.value)) return;
      if (state.filters[indexInState].values.length === 1) {
        state.filters.splice(indexInState, 1);
        return;
      }
      state.filters[indexInState].values = state.filters[indexInState].values.filter(
        (value) => value !== payload.value
      );
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    addPriceFilter(state, action: PayloadAction<FilterQuery>) {
      state.priceFilter = action.payload;
    },
    changePriceFilter(state, action: PayloadAction<string[]>) {
      if (state.priceFilter) state.priceFilter.values = action.payload;
    },
    deletePriceFilter(state) {
      state.priceFilter = null;
    },
    changeSearchText(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { reducer: queryReducer, actions: queryActions } = querySlice;
