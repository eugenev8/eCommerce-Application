import { useAppSelector } from './redux';
import { AuthStatus } from '../reducers/AuthSlice';

export default function useLoadingStateStatus() {
  const { isLoading: authIsLoading, authStatus } = useAppSelector((state) => state.authReducer);
  const { isLoading: categoriesIsLoading } = useAppSelector((state) => state.categoriesReducer);
  return authStatus === AuthStatus.Initial || authIsLoading || categoriesIsLoading;
}
