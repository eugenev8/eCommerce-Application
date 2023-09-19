import { useAppSelector } from './redux';
import { AuthStatus } from '../reducers/AuthSlice';

export default function useLoginStatus() {
  const { authStatus } = useAppSelector((store) => store.authReducer);

  return authStatus === AuthStatus.CustomerFlow;
}
