import { useState } from 'react';
import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createCart, MyCartUpdateAdvanced, PROJECT_CURRENCY, updateCart } from '../../reducers/ActionCreators/Cart';
import toaster from '../../services/toaster';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import { authSlice, AuthStatus } from '../../reducers/AuthSlice';
import apiRoots from '../../sdk/apiRoots';
import { getAnonymousFlowApiRoot, getTokenFlowApiRoot } from '../../sdk/auth';
import tokenStores from '../../sdk/tokenStores';

function MainPage() {
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string>('');
  const [variantId, setVariantId] = useState<number>(1);
  const { authStatus } = useAppSelector((state) => state.authReducer);
  const cart = useAppSelector((state) => state.cartReducer.cart);

  function getLineItemFromCart() {
    return cart?.lineItems.find((lineItem) => lineItem.productId === productId && lineItem.variant.id === variantId);
  }

  function addNewLineItemInCart() {
    if (!cart) {
      toaster.showError('Error - cart must be in anon/customer flow!');
      return;
    }

    if (getLineItemFromCart()) {
      toaster.showError('Product is already in your cart!');
      return;
    }
    const updateAction: MyCartUpdateAction = { action: 'addLineItem', productId, variantId };
    const updates: MyCartUpdateAdvanced = {
      version: cart.version,
      actions: [updateAction],
      cartId: cart.id,
      authStatus,
    };
    dispatch(updateCart(updates));
  }

  function initAnonymousFlowWithFirstProduct() {
    apiRoots.AnonymousFlow = getAnonymousFlowApiRoot();
    dispatch(authSlice.actions.setAuthStatus(AuthStatus.AnonymousFlow));
    dispatch(createCart(AuthStatus.AnonymousFlow)).then((data) => {
      if (data.type.includes('fulfilled')) {
        apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
      } else {
        dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
      }
    });
  }

  function handleRemoveLineItem() {
    if (!productId) {
      toaster.showError('Please set product Id!');
      return;
    }
    if (authStatus === AuthStatus.CredentialsFlow || authStatus === AuthStatus.Initial) {
      toaster.showError(`Flow ${authStatus}`);
      return;
    }
    if (!cart) {
      toaster.showError('Error - cart must be in anon/customer flow!');
      return;
    }
    const lineItem = getLineItemFromCart();
    if (!lineItem) {
      toaster.showError(`This product is not in the cart!`);
      return;
    }
    const updateAction: MyCartUpdateAction = { action: 'removeLineItem', lineItemId: lineItem.id };
    const updates: MyCartUpdateAdvanced = {
      version: cart.version,
      actions: [updateAction],
      cartId: cart.id,
      authStatus,
    };
    dispatch(updateCart(updates));
  }

  function handleAddNewLineItem() {
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

        <button type="button" onClick={handleAddNewLineItem}>
          Add product variant by id and Variant
        </button>
        <br />

        <br />
        <button type="button" onClick={handleRemoveLineItem}>
          Remove Variant
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
