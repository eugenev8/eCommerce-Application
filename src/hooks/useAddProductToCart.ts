import { CartDraft } from '@commercetools/platform-sdk';
import apiRoots from '../sdk/apiRoots';

// look to state

export const useAddProductToCart = async () => {
  const possibleCart: CartDraft = {
    currency: 'USD',
    customerId: 'test',
    lineItems: [
      {
        key: 'toddler_trousers',
        productId: '687cf607-4220-4c66-9508-7960a07148ad',
        variantId: 1,
      },
    ],
  };
  const responseAsync = async () => apiRoots.CredentialsFlow.carts().post({ body: possibleCart });
  const result = await responseAsync;
  console.log(result);
};
export default useAddProductToCart;
