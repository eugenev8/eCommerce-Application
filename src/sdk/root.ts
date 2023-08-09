import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getAnonimousFlowClient, getPasswordFlowClient } from './clients';
import ACCESSES from './Accesses';

async function createClientApiRoot(email: string, password: string) {
  const client = getPasswordFlowClient(email, password);

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ACCESSES.READONLY.projectKey });
  try {
    const res = await apiRoot.me().get().execute();
    localStorage.setItem('clientId', res.body.id);
    return apiRoot;
  } catch {
    throw new Error('Yoo!');
  }
}

async function createAnonApiRoot() {
  const client = getAnonimousFlowClient();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ACCESSES.READONLY.projectKey });
  console.log(await apiRoot.customers().get().execute());
  return apiRoot;
}

export { createClientApiRoot, createAnonApiRoot };
