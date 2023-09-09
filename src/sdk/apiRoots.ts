import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Cart } from '@commercetools/platform-sdk';
import { getCredentialsFlowApiRoot } from './auth';
import cart from '../pages/basket/basket';

type ApiRoots = {
  cart: Cart;
  CredentialsFlow: ByProjectKeyRequestBuilder;
  AnonymousFlow: ByProjectKeyRequestBuilder | null;
  TokenFlow: ByProjectKeyRequestBuilder | null;
};

const apiRoots: ApiRoots = {
  CredentialsFlow: getCredentialsFlowApiRoot(),
  AnonymousFlow: null,
  TokenFlow: null,
  cart,
};

export default apiRoots;
