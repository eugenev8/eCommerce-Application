import { TokenStore } from '@commercetools/sdk-client-v2';
import { createAnonymousApiRoot, createPasswordApiRoot, createTokenApiRoot } from '../sdk/root';
import { AppDispatch } from '../store';
import { authSlice } from './AuthSlice';

const loginAnonymous = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authorization());
    const anonymousId = crypto.randomUUID();
    const apiRoot = await createAnonymousApiRoot(anonymousId);
    await apiRoot.get().execute();
    dispatch(authSlice.actions.authorizationAnonymousSuccess({ apiRoot, anonymousId }));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(authSlice.actions.authorizationError(e.message));
    }
  }
};

const loginPassword = (email: string, password: string) => async (dispatch: AppDispatch) => {
  async function setCustomerTokenCallback(tokenStore: TokenStore) {
    const apiRoot = await createTokenApiRoot(tokenStore.token);
    dispatch(
      authSlice.actions.authorizationLoginSuccess({
        customerToken: tokenStore.token,
        refreshToken: tokenStore.refreshToken || '',
        apiRoot,
      })
    );
  }

  try {
    dispatch(authSlice.actions.authorization());
    const apiRoot = await createPasswordApiRoot(email, password, setCustomerTokenCallback);
    await apiRoot.me().get().execute();
  } catch (e) {
    if (e instanceof Error) {
      dispatch(authSlice.actions.authorizationError(e.message));
    }
  }
};

export { loginAnonymous, loginPassword };
