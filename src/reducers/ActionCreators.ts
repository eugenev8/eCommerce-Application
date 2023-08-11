import { createAnonymousApiRoot } from '../sdk/root';
import { AppDispatch } from '../store';
import { authSlice } from './AuthSlice';

// eslint-disable-next-line import/prefer-default-export
export const anonymousLogin = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authorization());
    const anonymousId = crypto.randomUUID();
    const rootApi = await createAnonymousApiRoot(anonymousId);
    await rootApi.get().execute();
    dispatch(authSlice.actions.authorizationAnonymousSuccess({ rootApi, anonymousId }));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(authSlice.actions.authorizationAnonymousError(e.message));
    }
  }
};
