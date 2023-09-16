import { MyCartAddLineItemAction, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import { MyCartUpdateAdvanced, createCart, updateCart } from '../reducers/ActionCreators/Cart';
import { authActions, AuthStatus } from '../reducers/AuthSlice';
import apiRoots from '../sdk/apiRoots';
import { getAnonymousFlowApiRoot, getTokenFlowApiRoot } from '../sdk/auth';
import tokenStores from '../sdk/tokenStores';
import { useAppDispatch, useAppSelector } from './redux';

export default function useManageCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const authStatus = useAppSelector((state) => state.authReducer.authStatus);
  const isCartLoading = useAppSelector((state) => state.cartReducer.isLoading);

  async function initAnonymousFlowWithEmptyCart() {
    const apiRoot = getAnonymousFlowApiRoot();

    const cartResponse = await dispatch(createCart(apiRoot));

    if (cartResponse.type.includes('rejected')) {
      dispatch(authActions.setAuthStatus(AuthStatus.CredentialsFlow));
      throw new Error('Error - anonymous cart not created!');
    }

    apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
    dispatch(authActions.setAuthStatus(AuthStatus.AnonymousFlow));

    return cartResponse.payload;
  }

  function findItemInCart(productId: string, variantId: number) {
    return cart?.lineItems.find((lineItem) => lineItem.productId === productId && lineItem.variant.id === variantId);
  }

  async function addLineItem(productId: string, variantId: number) {
    let userCart = cart;
    let apiRoot;

    switch (authStatus) {
      case AuthStatus.Initial:
        throw new Error('Error with initialization!');
      case AuthStatus.CredentialsFlow: {
        const newAnonymousCart = await initAnonymousFlowWithEmptyCart();
        if (typeof newAnonymousCart === 'object') {
          apiRoot = apiRoots.AnonymousFlow;
          userCart = newAnonymousCart;
        } else {
          throw new Error('Error with initialization anonymous flow!');
        }
        break;
      }
      case AuthStatus.AnonymousFlow:
        apiRoot = apiRoots.AnonymousFlow;
        break;
      case AuthStatus.CustomerFlow:
        apiRoot = apiRoots.CustomerFlow;
        break;
      default:
    }

    if (!userCart) {
      throw new Error('Error - cart is missing!');
    }

    if (!apiRoot) {
      throw new Error('Error - apiRoot is not initialized!');
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
      apiRoot,
    };

    return dispatch(updateCart(updates));
  }

  function removeLineItem(lineItemId: string, quantity?: number) {
    let apiRoot;

    switch (authStatus) {
      case AuthStatus.Initial:
        throw new Error('Error with initialization!');
      case AuthStatus.CredentialsFlow:
        throw new Error(`Credentials Flow has no carts!`);
      default:
        apiRoot = apiRoots[authStatus];
    }

    if (!apiRoot) {
      throw new Error('Error - apiRoot is not initialized!');
    }

    if (!cart) {
      throw new Error('Error - cart must be in anon/customer flow!');
    }

    const updateAction: MyCartRemoveLineItemAction = { action: 'removeLineItem', lineItemId, quantity };

    const updates: MyCartUpdateAdvanced = {
      version: cart.version,
      actions: [updateAction],
      cartId: cart.id,
      apiRoot,
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
