import { Cart } from '@commercetools/platform-sdk';

const cart: Cart = {
  id: '',
  version: 0,
  lineItems: [],
  customLineItems: [],
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
  totalPrice: { type: 'centPrecision', centAmount: 840, currencyCode: 'USD', fractionDigits: 2 },
};

export default cart;
