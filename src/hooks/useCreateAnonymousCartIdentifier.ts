import { CartResourceIdentifier } from '@commercetools/platform-sdk';
import { AuthStatus } from '../reducers/AuthSlice';
import toaster from '../services/toaster';
import { useAppSelector } from './redux';

export default function useCreateAnonymousCartIdentifier() {
  const { authStatus } = useAppSelector((state) => state.authReducer);
  const { cart } = useAppSelector((state) => state.cartReducer);

  let anonymousCart: CartResourceIdentifier | undefined;
  if (authStatus === AuthStatus.AnonymousFlow) {
    if (!cart) {
      toaster.showError('Anonymous cart trouble!');
    } else {
      anonymousCart = { id: cart.id, key: cart.key, typeId: 'cart' };
    }
  }
  return anonymousCart;
}
