import {
  ClientBuilder,
  type Client,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';

import ADMIN_ACCESS from './AdminAccess';

const { projectKey, clientId, clientSecret, scopes, apiLink, authLink } = ADMIN_ACCESS;
const scopesArr = scopes.split(',');

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiLink,
  fetch,
};

function getAnonymousFlowClient(anonymousId: string): Client {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: authLink,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId,
    },
    scopes: scopesArr,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .build();
}

function getPasswordFlowClient(
  username: string,
  password: string,
  setCustomerTokenCallback: (tokenStore: TokenStore) => void
): Client {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authLink,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password,
      },
    },
    tokenCache: {
      get: () => ({ token: '', expirationTime: 0 }),
      set: setCustomerTokenCallback,
    },
    scopes: scopesArr,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();
}

function getTokenFlowClient(token: string): Client {
  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(`Bearer ${token}`, { force: true })
    .build();
}

export { getAnonymousFlowClient, getPasswordFlowClient, getTokenFlowClient };
