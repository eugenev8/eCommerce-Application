import { createSlice } from '@reduxjs/toolkit';

interface BasketState {
  productID: string | null;
  userID: string | null;
  id: string | null;
  quantity: number | 1;
  sku: number | undefined;
  isLogged: boolean;
  isRegistred: boolean;
  isProductRemoved: false;
  totalPrice: number | undefined;
  subTotalPrice: number | undefined;
}

const initialState: BasketState = {
  productID: null,
  userID: null,
  id: null,
  quantity: 1,
  sku: undefined,
  isLogged: false,
  isRegistred: false,
  isProductRemoved: false,
  totalPrice: undefined,
  subTotalPrice: undefined,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
});

export { basketSlice };

export default basketSlice.reducer;
