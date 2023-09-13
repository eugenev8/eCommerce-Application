/* eslint-disable no-param-reassign */
import { Category } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './ActionCreators/Categories';

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
      state.error = '';
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Undefined?';
    });
  },
});

export { categoriesSlice };

export default categoriesSlice.reducer;
