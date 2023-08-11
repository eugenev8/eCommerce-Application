import { useState } from 'react';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { createAnonymousApiRoot, createPasswordApiRoot, createTokenApiRoot } from './root';

export default function TempComponent() {
  const [anonymousId, setAnonymousId] = useState<string>('');

  const [email, setEmail] = useState<string>('test_email@gmial.com');
  const [password, setPassword] = useState<string>('123456');

  const [customerId, setCustomerId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerToken, setCustomerToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [productsCount, setProductsCount] = useState<string>('');

  const [curRootApi, setCurRootApi] = useState<ByProjectKeyRequestBuilder>();

  function handleAnonymousLogin() {
    async function log() {
      try {
        setErrorMessage('');
        const newAnonymousId = crypto.randomUUID();
        const rootApi = await createAnonymousApiRoot(newAnonymousId);
        setCurRootApi(rootApi);
        setAnonymousId(newAnonymousId);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    }

    log();
  }

  function handlePasswordLogin() {
    async function log() {
      async function setCustomerTokenCallback(tokenStore: TokenStore) {
        setCustomerToken(tokenStore.token);
        const rootApi = await createTokenApiRoot(tokenStore.token);
        setCurRootApi(rootApi);
      }

      try {
        setErrorMessage('');
        const rootApi = await createPasswordApiRoot(email, password, setCustomerTokenCallback);
        const res = await rootApi.me().get().execute();
        setCustomerId(res.body.id);
        setAnonymousId('');
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    }

    log();
  }

  function handleLogout() {
    setAnonymousId('');
    setCustomerId('');
    setCustomerName('');
    setCustomerToken('');
    setCurRootApi(undefined);
  }

  function handleGetProductsCount() {
    async function getProductsCount() {
      if (!curRootApi) {
        setErrorMessage('You need to log in!');
        return;
      }
      try {
        const res = await curRootApi.products().get().execute();
        setProductsCount(`${String(res.body.count)} ========== ${new Date().toLocaleString()}`);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    }

    getProductsCount();
  }

  return (
    <>
      <p>AnonimousId: {anonymousId}</p>
      <p>CustomerId: {customerId}</p>
      <p>CustomerToken: {customerToken}</p>
      <p>CustomerName: {customerName}</p>
      <p style={{ color: 'red', fontWeight: 700 }}>Error: {errorMessage}</p>
      <button
        onClick={() => handleAnonymousLogin()}
        type="button"
        disabled={Boolean(anonymousId) || Boolean(customerId)}
      >
        Login Anon
      </button>
      <br />
      <br />
      <button onClick={() => handlePasswordLogin()} type="button" disabled={Boolean(customerToken)}>
        Login
      </button>

      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />

      <br />
      <br />
      {curRootApi && (
        <button onClick={() => handleLogout()} type="button">
          Logout
        </button>
      )}
      <br />
      <br />
      <button onClick={() => handleGetProductsCount()} type="button">
        Get products count
      </button>
      <br />
      <br />
      {productsCount && <p>Products: {productsCount}</p>}
    </>
  );
}
