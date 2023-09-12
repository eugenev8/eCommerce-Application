import { useState } from 'react';
import { CartDraft, LineItemDraft, MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNewLineItem, createAnonymousCart, PROJECT_CURRENCY } from '../../reducers/ActionCreators/CartActions';
import toaster from '../../services/toaster';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import { AuthStatus } from '../../reducers/AuthSlice';
import apiRoots from '../../sdk/apiRoots';
import { getTokenFlowApiRoot } from '../../sdk/auth';
import tokenStores from '../../sdk/tokenStores';

function MainPage() {
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string>('');
  const [variantId, setVariantId] = useState<number>(1);
  const { authStatus } = useAppSelector((state) => state.authReducer);
  const cart = useAppSelector((state) => state.cartReducer.cart);

  function createCartDraft(): CartDraft {
    const lineItemDraft: LineItemDraft = { productId, variantId };
    return { currency: PROJECT_CURRENCY, lineItems: [lineItemDraft] };
  }

  function isProductInCart(id: string, variant: number) {
    if (!cart) return false;
    return cart.lineItems.some((lineItem) => lineItem.productId === id && lineItem.variant.id === variant);
  }

  function addNewLineItemInCart() {
    if (!cart) {
      toaster.showError('Error - cart must be in customer flow!');
      return;
    }
    if (isProductInCart(productId, variantId)) {
      toaster.showError('Product is already in your cart!');
      return;
    }
    const updateAction: MyCartUpdateAction = { action: 'addLineItem', productId, variantId };
    const updates: MyCartUpdate = {
      version: cart.version,
      actions: [updateAction],
    };
    dispatch(addNewLineItem(updates));
  }

  function initAnonymousFlowWithFirstProduct() {
    dispatch(createAnonymousCart(createCartDraft())).then((data) => {
      if (data.type.includes('fulfilled')) {
        apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
      }
    });
  }

  function handleAddNewLineItemById() {
    if (!productId) {
      toaster.showError('Please set product Id!');
      return;
    }

    switch (authStatus) {
      case AuthStatus.CustomerFlow:
      case AuthStatus.AnonymousFlow:
        addNewLineItemInCart();
        break;
      case AuthStatus.CredentialsFlow:
        initAnonymousFlowWithFirstProduct();
        break;
      default:
        toaster.showError('AuthStatus trouble! Initial?');
    }
  }

  return (
    <div className={`${styles.mainPage}`}>
      <AnimatedContainer>
        <h1>Main page</h1>
        <NavLink to="/">Main (you are here)</NavLink>
        <br />
        <NavLink to="/login">Login</NavLink>
        <br />
        <NavLink to="/register">Sign up</NavLink>
        <br />
        <br />

        <button type="button" onClick={handleAddNewLineItemById}>
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
      </AnimatedContainer>
    </div>
  );
}

export { PROJECT_CURRENCY };

export default MainPage;
