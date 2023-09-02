/* eslint-disable no-param-reassign */
import { Category } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './ActionCreators';

interface CategoriesState {
  isLoading: boolean;
  error: string;
  categories?: Category[];
}

const initialState: CategoriesState = {
  isLoading: false,
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
  },
});

export { categoriesSlice };

export default categoriesSlice.reducer;
