import { useState } from 'react';
import { CartDraft, LineItemDraft, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addNewLineItem,
  createCustomerCart,
  getCustomerCart,
  MyCartUpdateWithCartId,
} from '../../reducers/ActionCreators';
import toaster from '../../services/toaster';

function MainPage() {
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string>('');
  const [variantId, setVariantId] = useState<number>(1);
  const cart = useAppSelector((state) => state.cartReducer.cart);

  const CURRENCY = 'USD';

  function handleCreateCart() {
    const lineItemDraft: LineItemDraft = { productId, variantId };
    const cartDraft: CartDraft = { currency: CURRENCY, lineItems: [lineItemDraft] };
    dispatch(createCustomerCart(cartDraft));
  }

  function handleGetActiveCart() {
    dispatch(getCustomerCart());
  }

  function isProductInCart(id: string, variant: number) {
    if (!cart) return false;
    return cart.lineItems.some((lineItem) => lineItem.productId === id && lineItem.variant.id === variant);
  }

  function handleAddNewLineItemById() {
    if (!productId) {
      toaster.showError('Please set product Id!');
      return;
    }
    if (!cart) {
      toaster.showError('Please load or create cart!');
      return;
    }
    if (isProductInCart(productId, variantId)) {
      toaster.showError('Product is already in your cart!');
      return;
    }
    const updateAction: MyCartUpdateAction = { action: 'addLineItem', productId, variantId };
    const updates: MyCartUpdateWithCartId = { version: cart.version, actions: [updateAction], cartId: cart.id };
    dispatch(addNewLineItem(updates));
  }

  return (
    <div className={`${styles.mainPage}`}>
      <h1>Main page</h1>
      <NavLink to="/">Main (you are here)</NavLink>
      <br />
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/register">Sign up</NavLink>
      <br />
      <br />

      <button type="button" onClick={handleCreateCart} disabled={!!cart}>
        Create
      </button>

      <br />
      <br />
      <button type="button" onClick={handleGetActiveCart} disabled={!!cart}>
        Get Cart
      </button>
      <br />
      <br />
      <button type="button" onClick={handleAddNewLineItemById} disabled={!cart}>
        Add product variant by id and Variant
      </button>
      <br />
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="product Id"
        style={{ width: '400px' }}
      />
      <br />
      <input
        type="number"
        value={variantId}
        onChange={(e) => setVariantId(+e.target.value)}
        placeholder="variantId"
        min={1}
        max={4}
      />
      <p>bfe1da8a-579c-4a09-8f85-f93b6a92257b</p>
      <p>da0e438c-0db6-442d-9614-7780a70c8b67</p>
      <p>84dd986d-12c9-4088-beff-3c4aeca70fea</p>
      <p>3462e8ed-287f-4d28-8518-be9036a60d60</p>
    </div>
  );
}

export default MainPage;
