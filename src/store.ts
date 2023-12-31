import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/AuthSlice';
import { customerReducer } from './reducers/CustomerSlice';
import { categoriesReducer } from './reducers/CategoriesSlice';
import { queryReducer } from './reducers/QuerySlice';
import { cartReducer } from './reducers/CartSlice';

const rootReducer = combineReducers({
  authReducer,
  customerReducer,
  categoriesReducer,
  queryReducer,
  cartReducer,
});

export function setupStore() {
  return configureStore({ reducer: rootReducer });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
