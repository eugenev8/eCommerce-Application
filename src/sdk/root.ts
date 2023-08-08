import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import client from './client';

// type Nullable<T> = T | null;
export type Credentials = {
  projectKey: string; // Nullable<string>;
  clientID: string; // Nullable<string>;
  clientSecret: string; // Nullable<string>;
  scopes: string; // Nullable<string>;
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
