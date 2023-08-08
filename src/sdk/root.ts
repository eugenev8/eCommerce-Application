import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import client from './client';

export type Credentials = {
  projectKey: string;
  clientID: string;
  clientSecret: string;
  scopes: string;
};

export default function rootApi({
  projectKey,
  clientID,
  clientSecret,
  scopes,
}: Credentials): ByProjectKeyRequestBuilder {
  return createApiBuilderFromCtpClient(client(projectKey, clientID, clientSecret, scopes)).withProjectKey({
    projectKey,
  });
}
