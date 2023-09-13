import { MyCartAddLineItemAction, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import { MyCartUpdateAdvanced, createCart, updateCart } from '../reducers/ActionCreators/Cart';
import { authSlice, AuthStatus } from '../reducers/AuthSlice';
import apiRoots from '../sdk/apiRoots';
import { getAnonymousFlowApiRoot, getTokenFlowApiRoot } from '../sdk/auth';
import tokenStores from '../sdk/tokenStores';
import { useAppDispatch, useAppSelector } from './redux';

export default function useManageCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const authStatus = useAppSelector((state) => state.authReducer.authStatus);
  const isCartLoading = useAppSelector((state) => state.cartReducer.isLoading);

  async function initAnonymousFlowWithFirstProduct() {
    apiRoots.AnonymousFlow = getAnonymousFlowApiRoot();
    const authResponse = dispatch(authSlice.actions.setAuthStatus(AuthStatus.AnonymousFlow));
    const cartResponse = await dispatch(createCart(AuthStatus.AnonymousFlow));
    if (cartResponse.type.includes('fulfilled')) {
      apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
    } else {
      dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
      throw new Error('Error - cart not created!');
    }

    return { cartResponse: cartResponse.payload, authResponse: authResponse.payload };
  }

  function findItemInCart(productId: string, variantId: number) {
    return cart?.lineItems.find((lineItem) => lineItem.productId === productId && lineItem.variant.id === variantId);
  }

  async function addLineItem(productId: string, variantId: number) {
    let userCart = cart;
    let currentAuth = authStatus;

    if (authStatus === AuthStatus.CredentialsFlow || authStatus === AuthStatus.Initial) {
      const { cartResponse, authResponse } = await initAnonymousFlowWithFirstProduct();
      userCart = typeof cartResponse === 'object' ? cartResponse : null;
      currentAuth = authResponse;
    }

    if (!userCart) {
      throw new Error('Error - cart not created!');
    }

    const updateAction: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId,
      variantId,
    };

    const updates: MyCartUpdateAdvanced = {
      version: userCart.version,
      actions: [updateAction],
      cartId: userCart.id,
      authStatus: currentAuth,
    };

    return dispatch(updateCart(updates));
  }

  function removeLineItem(lineItemId: string, quantity?: number) {
    if (authStatus === AuthStatus.CredentialsFlow || authStatus === AuthStatus.Initial) {
      throw new Error(`Flow ${authStatus}`);
    }
    if (!cart) {
      throw new Error('Error - cart must be in anon/customer flow!');
    }

    const updateAction: MyCartRemoveLineItemAction = { action: 'removeLineItem', lineItemId, quantity };
    const updates: MyCartUpdateAdvanced = {
      version: cart.version,
      actions: [updateAction],
      cartId: cart.id,
      authStatus,
    };
    return dispatch(updateCart(updates));
  }

  return {
    cart,
    findItemInCart,
    addLineItem,
    removeLineItem,
    isCartLoading,
  };
}
