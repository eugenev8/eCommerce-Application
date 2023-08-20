import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getCredentialsFlowApiRoot } from './auth';

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

export default apiRoots;
