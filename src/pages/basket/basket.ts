import { Cart /* , CentPrecisionMoney  */ } from '@commercetools/platform-sdk';

const cart: Cart = {
  id: '',
  version: 0,
  lineItems: [],
  customLineItems: [],
  /* totalPrice: {centAmount, currencyCode}, */
  taxMode: '',
  taxRoundingMode: '',
  taxCalculationMode: '',
  inventoryMode: '',
  cartState: '',
  shippingMode: '',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: '',
  createdAt: '',
  lastModifiedAt: '',
};

export default cart;
