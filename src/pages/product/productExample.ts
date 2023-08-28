import { Product } from '@commercetools/platform-sdk';

const product = {
  id: '687cf607-4220-4c66-9508-7960a07148ad',
  version: 35,
  versionModifiedAt: '2023-08-27T11:29:12.712Z',
  lastMessageSequenceNumber: 19,
  createdAt: '2023-07-31T13:56:33.640Z',
  lastModifiedAt: '2023-08-27T11:29:12.712Z',
  lastModifiedBy: {
    isPlatformClient: true,
  },
  createdBy: {
    isPlatformClient: true,
    user: {
      typeId: 'user',
      id: '1e9de15d-62ea-4576-8a94-bd9ac2181bc7',
    },
  },
  productType: {
    typeId: 'product-type',
    id: '3196f857-35d0-492c-bafe-78ea87c2277f',
  },
  masterData: {
    current: {
      name: {
        'en-US': 'Sample Toddler Trousers',
      },
      categories: [
        {
          typeId: 'category',
          id: 'b73048cc-25e2-4e6d-baf3-0d77c2bec191',
        },
      ],
      categoryOrderHints: {},
      slug: {
        'en-US': 'sample-toddler-trousers',
      },
      masterVariant: {
        id: 1,
        sku: '855484',
        key: '855484',
        prices: [
          {
            id: 'eb2ff232-903d-4ce1-a81b-b20d8a5b1ddc',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2599,
              fractionDigits: 2,
            },
            country: 'US',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2339,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
          {
            id: '344ee9b6-0aa3-4245-a18d-10b098636510',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 2299,
              fractionDigits: 2,
            },
            country: 'DE',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2069,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
        ],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-uPwBAUpB.jpg',
            dimensions: {
              w: 1200,
              h: 1200,
            },
          },
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-Z7CSIEMu.gif',
            dimensions: {
              w: 612,
              h: 792,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58-ffb5MuzU.jpg',
            dimensions: {
              w: 465,
              h: 580,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-7QQsbjjJ.jpg',
            dimensions: {
              w: 730,
              h: 973,
            },
          },
        ],
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Small',
              label: 'Small',
            },
          },
          {
            name: 'fit',
            value: {
              key: 'Straight',
              label: 'Straight',
            },
          },
          {
            name: 'color',
            value: {
              key: 'White',
              label: 'White',
            },
          },
          {
            name: 'length',
            value: {
              key: 'Ankle',
              label: 'Ankle',
            },
          },
        ],
        assets: [],
      },
      variants: [
        {
          id: 2,
          sku: '855485',
          key: '855485',
          prices: [
            {
              id: '7760bdf5-b3c5-4a9a-a55f-200a143617b7',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2799,
                fractionDigits: 2,
              },
              country: 'US',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 2519,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
            {
              id: '02b765a3-e451-4078-a9a0-d63e74548530',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2299,
                fractionDigits: 2,
              },
              country: 'DE',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 2069,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
          ],
          images: [
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58-kkyy88YL.jpg',
              dimensions: {
                w: 465,
                h: 580,
              },
            },
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-SbjnediW.gif',
              dimensions: {
                w: 612,
                h: 792,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-5s-Fzh8B.jpg',
              dimensions: {
                w: 730,
                h: 973,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-Am0aWnYZ.jpg',
              dimensions: {
                w: 1200,
                h: 1200,
              },
            },
          ],
          attributes: [
            {
              name: 'size',
              value: {
                key: 'Medium',
                label: 'Medium',
              },
            },
            {
              name: 'fit',
              value: {
                key: 'Straight',
                label: 'Straight',
              },
            },
            {
              name: 'color',
              value: {
                key: 'White',
                label: 'White',
              },
            },
            {
              name: 'length',
              value: {
                key: 'Ankle',
                label: 'Ankle',
              },
            },
          ],
          assets: [],
        },
        {
          id: 3,
          sku: '855486',
          key: '855486',
          prices: [
            {
              id: 'cc02b0ed-1dd0-4717-8ae2-7272bf7c12f5',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2599,
                fractionDigits: 2,
              },
              country: 'US',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 2339,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
            {
              id: '677be74a-6bbd-4ae4-b61f-723e9d3da633',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2299,
                fractionDigits: 2,
              },
              country: 'DE',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 2069,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
          ],
          images: [
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-U0RhZApm.jpg',
              dimensions: {
                w: 730,
                h: 973,
              },
            },
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-i2b2bEGD.gif',
              dimensions: {
                w: 612,
                h: 792,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58--ihYqAJX.jpg',
              dimensions: {
                w: 465,
                h: 580,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-T-H6ynf1.jpg',
              dimensions: {
                w: 1200,
                h: 1200,
              },
            },
          ],
          attributes: [
            {
              name: 'size',
              value: {
                key: 'Large',
                label: 'Large',
              },
            },
            {
              name: 'fit',
              value: {
                key: 'Straight',
                label: 'Straight',
              },
            },
            {
              name: 'color',
              value: {
                key: 'White',
                label: 'White',
              },
            },
            {
              name: 'length',
              value: {
                key: 'Ankle',
                label: 'Ankle',
              },
            },
          ],
          assets: [],
        },
      ],
      searchKeywords: {},
    },
    staged: {
      name: {
        'en-US': 'Sample Toddler Trousers',
      },
      categories: [
        {
          typeId: 'category',
          id: 'b73048cc-25e2-4e6d-baf3-0d77c2bec191',
        },
      ],
      categoryOrderHints: {},
      slug: {
        'en-US': 'sample-toddler-trousers',
      },
      masterVariant: {
        id: 1,
        sku: '855484',
        key: '855484',
        prices: [
          {
            id: 'eb2ff232-903d-4ce1-a81b-b20d8a5b1ddc',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2599,
              fractionDigits: 2,
            },
            country: 'US',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2339,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
          {
            id: '344ee9b6-0aa3-4245-a18d-10b098636510',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 2299,
              fractionDigits: 2,
            },
            country: 'DE',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2069,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
        ],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-uPwBAUpB.jpg',
            dimensions: {
              w: 1200,
              h: 1200,
            },
          },
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-Z7CSIEMu.gif',
            dimensions: {
              w: 612,
              h: 792,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58-ffb5MuzU.jpg',
            dimensions: {
              w: 465,
              h: 580,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-7QQsbjjJ.jpg',
            dimensions: {
              w: 730,
              h: 973,
            },
          },
        ],
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Small',
              label: 'Small',
            },
          },
          {
            name: 'fit',
            value: {
              key: 'Straight',
              label: 'Straight',
            },
          },
          {
            name: 'color',
            value: {
              key: 'White',
              label: 'White',
            },
          },
          {
            name: 'length',
            value: {
              key: 'Ankle',
              label: 'Ankle',
            },
          },
        ],
        assets: [],
      },
      variants: [
        {
          id: 2,
          sku: '855485',
          key: '855485',
          prices: [
            {
              id: '7760bdf5-b3c5-4a9a-a55f-200a143617b7',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2799,
                fractionDigits: 2,
              },
              country: 'US',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 2519,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
            {
              id: '02b765a3-e451-4078-a9a0-d63e74548530',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2299,
                fractionDigits: 2,
              },
              country: 'DE',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 2069,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
          ],
          images: [
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58-kkyy88YL.jpg',
              dimensions: {
                w: 465,
                h: 580,
              },
            },
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-SbjnediW.gif',
              dimensions: {
                w: 612,
                h: 792,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-5s-Fzh8B.jpg',
              dimensions: {
                w: 730,
                h: 973,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-Am0aWnYZ.jpg',
              dimensions: {
                w: 1200,
                h: 1200,
              },
            },
          ],
          attributes: [
            {
              name: 'size',
              value: {
                key: 'Medium',
                label: 'Medium',
              },
            },
            {
              name: 'fit',
              value: {
                key: 'Straight',
                label: 'Straight',
              },
            },
            {
              name: 'color',
              value: {
                key: 'White',
                label: 'White',
              },
            },
            {
              name: 'length',
              value: {
                key: 'Ankle',
                label: 'Ankle',
              },
            },
          ],
          assets: [],
        },
        {
          id: 3,
          sku: '855486',
          key: '855486',
          prices: [
            {
              id: 'cc02b0ed-1dd0-4717-8ae2-7272bf7c12f5',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2599,
                fractionDigits: 2,
              },
              country: 'US',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 2339,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
            {
              id: '677be74a-6bbd-4ae4-b61f-723e9d3da633',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2299,
                fractionDigits: 2,
              },
              country: 'DE',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 2069,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
            {
              id: 'a59ef8c1-7dda-48d0-91ea-f9b7e7d4e55c',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 3400,
                fractionDigits: 2,
              },
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 3060,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: '88c45228-5ff0-403b-9e28-436d0641c251',
                },
              },
            },
          ],
          images: [
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/toddler-100-cotton-c-U0RhZApm.jpg',
              dimensions: {
                w: 730,
                h: 973,
              },
            },
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-i2b2bEGD.gif',
              dimensions: {
                w: 612,
                h: 792,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/61sQt4IXd0L._AC_UY58--ihYqAJX.jpg',
              dimensions: {
                w: 465,
                h: 580,
              },
            },
            {
              url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/s-l1200-T-H6ynf1.jpg',
              dimensions: {
                w: 1200,
                h: 1200,
              },
            },
          ],
          attributes: [
            {
              name: 'size',
              value: {
                key: 'Large',
                label: 'Large',
              },
            },
            {
              name: 'fit',
              value: {
                key: 'Straight',
                label: 'Straight',
              },
            },
            {
              name: 'color',
              value: {
                key: 'White',
                label: 'White',
              },
            },
            {
              name: 'length',
              value: {
                key: 'Ankle',
                label: 'Ankle',
              },
            },
          ],
          assets: [],
        },
      ],
      searchKeywords: {},
    },
    published: true,
    hasStagedChanges: true,
  },
  key: 'toddler_trousers',
  taxCategory: {
    typeId: 'tax-category',
    id: '985ef787-69d1-4d34-9e4b-601b95112add',
  },
  priceMode: 'Standalone',
  lastVariantId: 3,
} as Product;
export default product;
