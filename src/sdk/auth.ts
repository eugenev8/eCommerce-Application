import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { customerTokenCache, anonymousTokenCache } from './tokenStores';

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

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
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
    tokenCache: anonymousTokenCache,
    scopes,
    fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

function getTokenFlowApiRoot(token: string): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(`Bearer ${token}`, { force: true })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

async function getCustomerData(customerSignin: CustomerSignin) {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authLink,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: { username: customerSignin.email, password: customerSignin.password },
    },
    tokenCache: customerTokenCache,
    scopes,
    fetch,
  };
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

  return apiRoot.login().post({ body: customerSignin }).execute();
}

export { getCredentialsFlowApiRoot, getAnonymousFlowApiRoot, getTokenFlowApiRoot, getCustomerData };
