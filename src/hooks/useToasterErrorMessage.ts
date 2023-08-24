import { useEffect } from 'react';
import { useAppSelector } from './redux';
import toaster from '../services/toaster';

export default function useToasterErrorMessage() {
  const { error } = useAppSelector((store) => store.authReducer);

  useEffect(() => {
    if (error !== '') {
      toaster.showError(error);
    }
  }, [error]);
}
