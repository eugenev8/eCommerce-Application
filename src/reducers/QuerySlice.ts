/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacetName, SORTING_TYPES } from '../pages/catalog/types';

interface FilterQuery extends FacetName {
  values: string[];
}

export type QueryState = {
  filters: FilterQuery[];
  sort: string;
};

const initialState: QueryState = {
  filters: [],
  sort: SORTING_TYPES[0].queryString,
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
      const indexInState = state.filters.findIndex((filter) => filter.attribute === payload.attribute);
      if (indexInState < 0) {
        state.filters.push({ ...payload, values: [payload.value] });
        return state;
      }
      state.filters[indexInState].values.push(payload.value);
      return state;
    },
    removeFilterQuery(state, action: PayloadAction<QueryData>) {
      const { payload } = action;
      const indexInState = state.filters.findIndex((filter) => filter.attribute === payload.attribute);
      if (indexInState < 0) return state;
      if (!state.filters[indexInState].values.includes(payload.value)) return state;
      if (state.filters[indexInState].values.length === 1) {
        state.filters.splice(indexInState, 1);
        return state;
      }
      state.filters[indexInState].values = state.filters[indexInState].values.filter(
        (value) => value !== payload.value
      );

      return state;
    },
    clearCustomerData() {
      return initialState;
    },
  },
});

export { querySlice };

export default querySlice.reducer;
