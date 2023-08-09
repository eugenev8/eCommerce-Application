type Credentials = {
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
};

type Accesses = {
  READONLY: Credentials;
  ADMIN: Credentials;
  SPA: Credentials;
};

const ACCESSES: Accesses = {
  READONLY: {
    projectKey: 'svhg732edc720d',
    clientId: 'NFIgwjJFHoL10Ay7jMTxV5ru',
    clientSecret: 'W_aE3NW2CsRvJqRMqoUc5zK4HqUm-g6y',
    scopes:
      'view_staged_quotes:svhg732edc720d,view_messages:svhg732edc720d,view_business_units:svhg732edc720d,view_products:svhg732edc720d,view_quotes:svhg732edc720d,view_shipping_methods:svhg732edc720d,view_cart_discounts:svhg732edc720d,view_discount_codes:svhg732edc720d,view_audit_log:svhg732edc720d,view_customers:svhg732edc720d,view_customer_groups:svhg732edc720d,view_states:svhg732edc720d,view_types:svhg732edc720d,view_payments:svhg732edc720d,view_connectors_deployments:svhg732edc720d,view_import_containers:svhg732edc720d,view_order_edits:svhg732edc720d,view_orders:svhg732edc720d,view_product_selections:svhg732edc720d,view_connectors:svhg732edc720d,view_quote_requests:svhg732edc720d,view_tax_categories:svhg732edc720d,view_standalone_prices:svhg732edc720d,view_associate_roles:svhg732edc720d,view_published_products:svhg732edc720d,view_shopping_lists:svhg732edc720d,view_project_settings:svhg732edc720d,view_categories:svhg732edc720d,view_attribute_groups:svhg732edc720d,view_key_value_documents:svhg732edc720d,view_stores:svhg732edc720d',
  },
  ADMIN: {
    projectKey: 'svhg732edc720d',
    clientId: 'q6wpq4NpUNJjS2ztD5a_-DSC',
    clientSecret: 'FjO0Xm_Zm8C8f4X206dMJzWt2TRGujkt',
    scopes: 'manage_project:svhg732edc720d',
  },
  SPA: {
    projectKey: 'svhg732edc720d',
    clientId: 'ccV8FDyAi_hAzttDnglhTUao',
    clientSecret: 'DCpdo1Gon1u46LUIdLPDQFs64EcyqWR7',
    scopes:
      'manage_my_payments:svhg732edc720d,manage_my_quote_requests:svhg732edc720d,manage_my_shopping_lists:svhg732edc720d,manage_my_orders:svhg732edc720d,create_anonymous_token:svhg732edc720d,view_published_products:svhg732edc720d,view_categories:svhg732edc720d,manage_my_quotes:svhg732edc720d,manage_my_profile:svhg732edc720d,manage_my_business_units:svhg732edc720d',
  },
};

export default ACCESSES;
