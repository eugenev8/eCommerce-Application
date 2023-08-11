import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { getAnonymousFlowClient, getPasswordFlowClient, getTokenFlowClient } from './clients';
import ADMIN_ACCESS from './AdminAccess';

async function createAnonymousApiRoot(anonymousId: string) {
  const client = getAnonymousFlowClient(anonymousId);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ADMIN_ACCESS.projectKey });
  return apiRoot;
}

async function createPasswordApiRoot(
  email: string,
  password: string,
  setCustomerTokenCallback: (tokenStore: TokenStore) => void
) {
  const client = getPasswordFlowClient(email, password, setCustomerTokenCallback);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ADMIN_ACCESS.projectKey });
  return apiRoot;
}

async function createTokenApiRoot(token: string) {
  const client = getTokenFlowClient(token);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ADMIN_ACCESS.projectKey });
  return apiRoot;
}

export { createAnonymousApiRoot, createPasswordApiRoot, createTokenApiRoot };
