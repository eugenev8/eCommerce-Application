import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '@commercetools/platform-sdk';
import apiRoots from '../../sdk/apiRoots';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import { authSlice } from '../AuthSlice';

const getCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const categoriesRes = await apiRoots.CredentialsFlow.categories().get().execute();
      return categoriesRes.body.results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// eslint-disable-next-line import/prefer-default-export
export { getCategories };
