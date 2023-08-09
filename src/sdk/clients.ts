import {
  ClientBuilder,
  type Client,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import ACCESSES from './Accesses';

const { projectKey, clientId, clientSecret, scopes } = ACCESSES.ADMIN;
const scopesArr = scopes.split(',');

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

function getPasswordFlowClient(username: string, password: string): Client {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password,
      },
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

function getAnonimousFlowClient(): Client {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId: 'AAAaaaSSSsss!',
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

export { getAnonimousFlowClient, getPasswordFlowClient };
