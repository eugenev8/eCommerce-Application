import {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartRemoveLineItemAction,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { CustomFieldsDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/type';
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

  let curCart = cart;
  let curAuthStatus = authStatus;

  async function initAnonymousFlowWithEmptyCart() {
    const apiRoot = getAnonymousFlowApiRoot();

    const cartResponse = await dispatch(createCart(apiRoot));
    if (typeof cartResponse.payload !== 'object') {
      dispatch(authActions.setAuthStatus(AuthStatus.CredentialsFlow));
      throw new Error('Error - anonymous cart not created!');
    }

    curCart = cartResponse.payload;
    curAuthStatus = AuthStatus.AnonymousFlow;
    apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
    dispatch(authActions.setAuthStatus(AuthStatus.AnonymousFlow));
  }

  function findItemInCart(productId: string, variantId: number) {
    return cart?.lineItems.find((lineItem) => lineItem.productId === productId && lineItem.variant.id === variantId);
  }

  function getCurrentApiRoot() {
    switch (curAuthStatus) {
      case AuthStatus.Initial:
        throw new Error('Error with initialization!');
      case AuthStatus.CredentialsFlow:
        throw new Error(`Credentials Flow has no carts!`);
      default:
        if (apiRoots[curAuthStatus] === null) {
          throw new Error('Error - apiRoot is not initialized!');
        } else return apiRoots[curAuthStatus]!; // хз почему null находит
    }
  }

  function sendUpdate(actions: MyCartUpdateAction[]) {
    if (!curCart) {
      throw new Error('!Cart');
    }

    const apiRoot = getCurrentApiRoot();

    const updates: MyCartUpdateAdvanced = {
      version: curCart.version,
      actions,
      cartId: curCart.id,
      apiRoot,
    };

    return dispatch(updateCart(updates));
  }

  async function addLineItem(productId: string, variantId: number, categoryId: string) {
    try {
      if (authStatus === AuthStatus.CredentialsFlow) {
        await initAnonymousFlowWithEmptyCart();
      }
    } catch (e) {
      return Promise.reject(e);
    }

    const customFieldDraft: CustomFieldsDraft = {
      type: { typeId: 'type', key: 'lineitemCategoryId' },
      fields: { categoryId },
    };

    const updateAction: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId,
      variantId,
      custom: customFieldDraft,
    };
    return (await sendUpdate([updateAction])).meta.requestStatus === 'fulfilled';
  }

  async function removeLineItem(lineItemId: string, quantity?: number) {
    const updateAction: MyCartRemoveLineItemAction = { action: 'removeLineItem', lineItemId, quantity };

    return (await sendUpdate([updateAction])).meta.requestStatus === 'fulfilled';
  }
  async function clearCart() {
    const newCart = await dispatch(createCart(getCurrentApiRoot()));
    return newCart.meta.requestStatus === 'fulfilled';
  }

  async function applyPromoCode(code: string) {
    const updateAction: MyCartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code,
    };
    return (await sendUpdate([updateAction])).meta.requestStatus === 'fulfilled';
  }

  return {
    cart,
    clearCart,
    findItemInCart,
    addLineItem,
    removeLineItem,
    applyPromoCode,
    isCartLoading,
  };
}
