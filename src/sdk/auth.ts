import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  TokenStore,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { Customer, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const apiLink = import.meta.env.VITE_SDK_API_LINK;
const authLink = import.meta.env.VITE_SDK_AUTH_LINK;
const projectKey = import.meta.env.VITE_SDK_PROJECT_KEY;
const clientId = import.meta.env.VITE_SDK_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SDK_CLIENT_SECRET;
const scopes = import.meta.env.VITE_SDK_SCOPES.split(',');

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
    scopes,
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
    scopes,
    fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
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

async function getCustomerToken(
  customerSignin: CustomerSignin,
  setCustomerDataCallback: (customer: Customer) => void
): Promise<TokenStore> {
  return new Promise<TokenStore>((resolve, reject) => {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: authLink,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: { username: customerSignin.email, password: customerSignin.password },
      },
      tokenCache: {
        get: () => ({ token: '', expirationTime: 0 }),
        set: (data) => resolve(data),
      },
      scopes,
      fetch,
    };
    const client = new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .build();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

    apiRoot
      .login()
      .post({ body: customerSignin })
      .execute()
      .then((customerRes) => {
        setCustomerDataCallback(customerRes.body.customer);
      })
      .catch((e) => {
        if (e instanceof Error) {
          reject(e);
        } else {
          reject(new Error('Unknown error!'));
        }
      });
  });
}

export { getCredentialsFlowApiRoot, getAnonymousFlowApiRoot, getTokenFlowApiRoot, getCustomerToken };
