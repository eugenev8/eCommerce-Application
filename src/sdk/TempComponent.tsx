import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginAnonymous, loginPassword } from '../reducers/ActionCreators';
import { authSlice } from '../reducers/authSlice';
import { apiRoots } from './roots';

export default function TempComponent() {
  const [email, setEmail] = useState<string>('test_email@gmial.com');
  const [password, setPassword] = useState<string>('123456');
  const [productsCount, setProductsCount] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const dispatch = useAppDispatch();
  const { anonymousId, customerToken, refreshToken, error, isLoading, authStatus } = useAppSelector(
    (store) => store.authReducer
  );

  function handleGetProductsCount() {
    async function getProductsCount() {
      if (!apiRoots[authStatus]) {
        dispatch(authSlice.actions.authorizationError('!apiRoots[authStatus]'));
        setProductsCount('');
        return;
      }
      try {
        const res = await apiRoots[authStatus]?.products().get().execute();
        if (res) setProductsCount(`${String(res.body.count)} (${new Date().toLocaleString()})`);
      } catch (e) {
        if (e instanceof Error) dispatch(authSlice.actions.authorizationError(e.message));
      }
    }
    getProductsCount();
  }

  function handleGetUserName() {
    async function getUserName() {
      if (!apiRoots[authStatus]) {
        dispatch(authSlice.actions.authorizationError('!apiRoots[authStatus]'));
        setProductsCount('');
        return;
      }
      try {
        const name = await apiRoots[authStatus]?.me().get().execute();
        if (name) setUserName(`${name.body.firstName}  (${new Date().toLocaleString()})`);
      } catch (e) {
        if (e instanceof Error) dispatch(authSlice.actions.authorizationError(e.message));
      }
    }

    getUserName();
  }

  return (
    <>
      <p>AuthStatus: {authStatus}</p>
      <p>AnonimousId: {anonymousId}</p>
      <p>CustomerToken: {customerToken}</p>
      <p>RefreshToken: {refreshToken}</p>
      <p style={{ color: 'red', fontWeight: 700 }}>Error: {error}</p>
      <button
        onClick={async () => {
          dispatch(loginAnonymous());
        }}
        type="button"
        disabled={Boolean(anonymousId) || Boolean(customerToken) || isLoading}
      >
        Login Anon
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          dispatch(loginPassword({ username: email, password }));
        }}
        type="button"
        disabled={Boolean(customerToken) || isLoading}
      >
        Login
      </button>

      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />

      <br />
      <br />

      <button
        onClick={() => {
          dispatch(authSlice.actions.logout());
        }}
        type="button"
      >
        Logout
      </button>

      <br />
      <br />
      <button onClick={() => handleGetProductsCount()} type="button" disabled={isLoading}>
        Get products count
      </button>
      <br />
      <br />
      <p>Products: {productsCount}</p>
      <br />
      <br />
      <button onClick={() => handleGetUserName()} type="button" disabled={isLoading}>
        get user name
      </button>
      <br />
      <br />
      <p>User Name: {userName}</p>
    </>
  );
}
