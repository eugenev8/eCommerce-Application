import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const date = new Date().toISOString();

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export default function client(projectKey: string, clientId: string, clientSecret: string, scopes: string): Client {
  const scopesArr = scopes.split(',');
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: scopesArr,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withUserAgentMiddleware({
      libraryName: `${date}-typescript-sdk-v2`,
    })
    .withLoggerMiddleware()
    .build();
}
