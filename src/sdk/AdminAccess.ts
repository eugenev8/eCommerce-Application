type Credentials = {
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  authLink: string;
  apiLink: string;
};

const ADMIN_ACCESS: Credentials = {
  projectKey: 'svhg732edc720d',
  clientId: 'q6wpq4NpUNJjS2ztD5a_-DSC',
  clientSecret: 'FjO0Xm_Zm8C8f4X206dMJzWt2TRGujkt',
  scopes: 'manage_project:svhg732edc720d',
  authLink: 'https://auth.europe-west1.gcp.commercetools.com',
  apiLink: 'https://api.europe-west1.gcp.commercetools.com',
};

export default ADMIN_ACCESS;
