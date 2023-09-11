import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getCredentialsFlowApiRoot } from './auth';

type ApiRoots = {
  CredentialsFlow: ByProjectKeyRequestBuilder;
  AnonymousFlow: ByProjectKeyRequestBuilder | null;
  CustomerFlow: ByProjectKeyRequestBuilder | null;
};

const apiRoots: ApiRoots = {
  CredentialsFlow: getCredentialsFlowApiRoot(),
  AnonymousFlow: null,
  CustomerFlow: null,
};

export default apiRoots;
