import { useEffect } from 'react';
import { useAppSelector } from './redux';
import toaster from '../services/toaster';

export default function useToasterErrorMessage() {
  const { error: authError } = useAppSelector((store) => store.authReducer);
  const { error: cartError } = useAppSelector((store) => store.cartReducer);
  const { error: customerError } = useAppSelector((store) => store.customerReducer);
  const { error: categoriesError } = useAppSelector((store) => store.categoriesReducer);

  useEffect(() => {
    if (authError !== '') {
      toaster.showError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (cartError !== '') {
      toaster.showError(cartError);
    }
  }, [cartError]);

  useEffect(() => {
    if (customerError !== '') {
      toaster.showError(customerError);
    }
  }, [customerError]);

  useEffect(() => {
    if (categoriesError !== '') {
      toaster.showError(categoriesError);
    }
  }, [categoriesError]);
}
