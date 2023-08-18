import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  TokenStore,
  AuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import ADMIN_ACCESS from './AdminAccess';

const { projectKey, clientId, clientSecret, scopes, apiLink, authLink } = ADMIN_ACCESS;
const scopesArr = scopes.split(',');

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiLink,
  fetch,
};

function getCredentialsFlowApiRoot(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authLink,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: scopesArr,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  return apiRoot;
}

function getAnonymousFlowApiRoot(anonymousId: string): ByProjectKeyRequestBuilder {
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

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  return apiRoot;
}

function getPasswordFlowApiRoot(
  user: UserAuthOptions,
  setCustomerTokenCallback: (tokenStore: TokenStore) => void
): ByProjectKeyRequestBuilder {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authLink,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user,
    },
    tokenCache: {
      get: () => ({ token: '', expirationTime: 0 }),
      set: setCustomerTokenCallback,
    },
    scopes: scopesArr,
    fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  return apiRoot;
}

function getTokenFlowApiRoot(token: string): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(`Bearer ${token}`, { force: true })
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  return apiRoot;
}

async function getCustomerToken(user: UserAuthOptions): Promise<TokenStore> {
  return new Promise<TokenStore>((resolve, reject) => {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: authLink,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user,
      },
      tokenCache: {
        get: () => ({ token: '', expirationTime: 0 }),
        set: (data) => resolve(data),
      },
      scopes: scopesArr,
      fetch,
    };
    const client = new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .build();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

    apiRoot
      .login()
      .post({ body: { email: user.username, password: user.password } })
      .execute()
      .catch((e) => {
        if (e instanceof Error) {
          reject(e);
        } else {
          reject(new Error('errrr'));
        }
      });
  });
}

type ApiRoots = {
  CredentialsFlow: ByProjectKeyRequestBuilder;
  AnonymousFlow: ByProjectKeyRequestBuilder | null;
  TokenFlow: ByProjectKeyRequestBuilder | null;
};

const apiRoots: ApiRoots = {
  CredentialsFlow: getCredentialsFlowApiRoot(),
  AnonymousFlow: null,
  TokenFlow: null,
};

export {
  getCredentialsFlowApiRoot,
  getAnonymousFlowApiRoot,
  getPasswordFlowApiRoot,
  getTokenFlowApiRoot,
  apiRoots,
  getCustomerToken,
};
