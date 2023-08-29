/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterQuery = {
  attribute: string;
  values: string[];
};

type QueryState = {
  filters: FilterQuery[];
  sort: string;
};

const initialState: QueryState = {
  filters: [],
  sort: 'price desc',
};

type QueryData = {
  attribute: string;
  value: string;
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    addFilterQuery(state, action: PayloadAction<QueryData>) {
      const { payload } = action;
      const indexInState = state.filters.findIndex((filter) => filter.attribute === payload.attribute);
      if (indexInState < 0) {
        state.filters.push({ attribute: payload.attribute, values: [payload.value] });
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
