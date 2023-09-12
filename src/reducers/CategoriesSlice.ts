/* eslint-disable no-param-reassign */
import { Category } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './ActionCreators/CategoriesActions';

interface CategoriesState {
  isLoading: boolean;
  error: string;
  categories: Category[] | null;
}

const initialState: CategoriesState = {
  isLoading: false,
  categories: null,
  error: '',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.categories = action.payload;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      return state;
    });
  },
});

export { categoriesSlice };

export default categoriesSlice.reducer;
