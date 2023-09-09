import { CartDraft } from '@commercetools/platform-sdk';
import apiRoots from '../sdk/apiRoots';

export const useAddProductToCart = () => {
  const possibleCart: CartDraft = {
    currency: 'USD',
    customerId: 'test',
  };
  const response = async () => apiRoots.CredentialsFlow.carts().post({ body: possibleCart });
  console.log(response);
};
export default useAddProductToCart;
