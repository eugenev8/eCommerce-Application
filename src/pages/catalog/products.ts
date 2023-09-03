import { ProductProjection } from '@commercetools/platform-sdk';

const products = [
  {
    id: '84dd986d-12c9-4088-beff-3c4aeca70fea',
    version: 18,
    productType: {
      typeId: 'product-type',
      id: '7c4477f1-27c0-4072-addd-0e12cc3e951b',
    },
    name: {
      'en-US': 'Apple MacBook Air 13 Late 2020',
    },
    description: {
      'en-US': 'The MacBook Air with M1 packs MacBook Pro-like power and amazing battery life',
    },
    categories: [
      {
        typeId: 'category',
        id: 'bc01baf5-51bf-4da8-9c35-8b45eb6a6f95',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'apple-macbook-air-13-late-2020',
    },
    metaTitle: {
      'en-US': '',
    },
    metaDescription: {
      'en-US': '',
    },
    variants: [
      {
        attributes: [
          {
            name: 'RAM',
            value: 8,
          },
          {
            name: 'Diagonal',
            value: 13.3,
          },
          {
            name: 'HDD',
            value: 512,
          },
          {
            name: 'OS',
            value: 'macOS',
          },
          {
            name: 'CPU',
            value: 'M1',
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/48nng-xbRqJEVG.jpg',
            dimensions: {
              w: 600,
              h: 600,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/MacBook_Air_Apple_M1-AqLB05qK.jpg',
            dimensions: {
              w: 1218,
              h: 720,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/_hero_horiz_MacBook--kF94d7AF.jpg',
            dimensions: {
              w: 1000,
              h: 1000,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/epl-nout-ToNgx6GW.jpg',
            dimensions: {
              w: 1000,
              h: 563,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/gPvyaz76tASn87RCGuSd-ftjvsRgw.jpg',
            dimensions: {
              w: 1920,
              h: 1080,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/vpavic_4291_20201113-23HTPDj-.jpg',
            dimensions: {
              w: 2040,
              h: 1360,
            },
          },
        ],
        prices: [
          {
            id: 'b81e0017-176a-4388-b347-b7558695ea68',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 89900,
              fractionDigits: 2,
            },
          },
        ],
        sku: '1234571',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'RAM',
          value: 8,
        },
        {
          name: 'Diagonal',
          value: 13.3,
        },
        {
          name: 'HDD',
          value: 256,
        },
        {
          name: 'OS',
          value: 'macOS',
        },
        {
          name: 'CPU',
          value: 'M1',
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/MacBook_Air_Apple_M1-OEnNGv_N.jpg',
          dimensions: {
            w: 1218,
            h: 720,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/epl-nout-4MtapCPL.jpg',
          dimensions: {
            w: 1000,
            h: 563,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/48nng-ofL7CVh0.jpg',
          dimensions: {
            w: 600,
            h: 600,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/_hero_horiz_MacBook--vNuB6gyP.jpg',
          dimensions: {
            w: 1000,
            h: 1000,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/gPvyaz76tASn87RCGuSd-f6tHuJOx.jpg',
          dimensions: {
            w: 1920,
            h: 1080,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/vpavic_4291_20201113-kdkzMUVU.jpg',
          dimensions: {
            w: 2040,
            h: 1360,
          },
        },
      ],
      prices: [
        {
          id: '37c0d8e1-fd5f-4ddc-8535-f6d352a22afb',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 79900,
            fractionDigits: 2,
          },
        },
      ],
      sku: '1234570',
      id: 1,
    },
    searchKeywords: {
      'en-US': [
        {
          text: 'Apple MacBook Air',
        },
      ],
    },
    hasStagedChanges: false,
    published: true,
    key: 'Apple MacBook Air 13 Late 2020',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    priceMode: 'Embedded',
    createdAt: '2023-08-28T20:46:06.542Z',
    lastModifiedAt: '2023-08-28T20:49:20.934Z',
  },
  {
    id: '08b051f9-e41a-4c70-ba7f-772be8d77d72',
    version: 20,
    productType: {
      typeId: 'product-type',
      id: '7c4477f1-27c0-4072-addd-0e12cc3e951b',
    },
    name: {
      'en-US': 'Surface Laptop 4',
    },
    description: {
      'en-US': 'The speed and style you need to power through projects and assignments.',
    },
    categories: [
      {
        typeId: 'category',
        id: '0a4b479b-3cf7-4a56-bbdb-750a1f0b77ba',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'surface-laptop-4',
    },
    metaTitle: {
      'en-US': 'Surface Laptop 4',
    },
    metaDescription: {
      'en-US': 'The speed and style you need to power through projects and assignments.',
    },
    variants: [
      {
        attributes: [
          {
            name: 'RAM',
            value: 8,
          },
          {
            name: 'Diagonal',
            value: 13.5,
          },
          {
            name: 'HDD',
            value: 256,
          },
          {
            name: 'OS',
            value: 'Windows 11',
          },
          {
            name: 'CPU',
            value: 'AMD Ryzen 5',
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/images-jzFqvPHr.jpg',
            dimensions: {
              w: 278,
              h: 181,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/4013563765-JxyT0MEm.jpg',
            dimensions: {
              w: 770,
              h: 770,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/3830948005-WP4iQ86I.jpg',
            dimensions: {
              w: 770,
              h: 770,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/48nng-LwHsVKrm.jpg',
            dimensions: {
              w: 1082,
              h: 639,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/20220127_161326-nGSe8Oy1.jpg',
            dimensions: {
              w: 4000,
              h: 3000,
            },
          },
        ],
        prices: [
          {
            id: '7353485c-d50e-44af-b1e7-ae747d7a6320',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 59900,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 53311,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '9a43395d-25d0-4bfd-8d09-2e87e451602a',
              },
            },
          },
        ],
        sku: '1234561',
        id: 2,
      },
      {
        attributes: [
          {
            name: 'RAM',
            value: 16,
          },
          {
            name: 'Diagonal',
            value: 13.5,
          },
          {
            name: 'HDD',
            value: 512,
          },
          {
            name: 'OS',
            value: 'Windows 11',
          },
          {
            name: 'CPU',
            value: 'AMD Ryzen 5',
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/images-eRYq-cA6.jpg',
            dimensions: {
              w: 278,
              h: 181,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/3830948005-xXe5UjrZ.jpg',
            dimensions: {
              w: 770,
              h: 770,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/4013563765-Rme11EBb.jpg',
            dimensions: {
              w: 770,
              h: 770,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/48nng-68liPMXD.jpg',
            dimensions: {
              w: 1082,
              h: 639,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/20220127_161326-mTKGAQKz.jpg',
            dimensions: {
              w: 4000,
              h: 3000,
            },
          },
        ],
        prices: [
          {
            id: 'cae037d7-fff7-4786-b643-cfc4a9a9708c',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 69900,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 62211,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '9a43395d-25d0-4bfd-8d09-2e87e451602a',
              },
            },
          },
        ],
        sku: '1234563',
        id: 3,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'RAM',
          value: 8,
        },
        {
          name: 'Diagonal',
          value: 13.5,
        },
        {
          name: 'HDD',
          value: 127,
        },
        {
          name: 'OS',
          value: 'Windows 11',
        },
        {
          name: 'CPU',
          value: 'AMD Ryzen 5',
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/images-UvpY45CQ.jpg',
          dimensions: {
            w: 278,
            h: 181,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/4013563765-IhrswABm.jpg',
          dimensions: {
            w: 770,
            h: 770,
          },
        },
        {
          url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/20220127_161326-7rt91loW.jpg',
          dimensions: {
            w: 4000,
            h: 3000,
          },
        },
      ],
      prices: [
        {
          id: 'b61223f3-1cfa-4e1a-bf91-97d8146a0bb2',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 52900,
            fractionDigits: 2,
          },
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 47081,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '9a43395d-25d0-4bfd-8d09-2e87e451602a',
            },
          },
        },
      ],
      sku: '1234560',
      id: 1,
    },
    searchKeywords: {
      'en-US': [
        {
          text: 'Microsoft Surface Laptop',
        },
      ],
    },
    hasStagedChanges: false,
    published: true,
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    priceMode: 'Embedded',
    createdAt: '2023-08-28T20:28:44.179Z',
    lastModifiedAt: '2023-08-28T20:40:46.620Z',
  },
  {
    id: 'da5a5fc8-25b6-4dd7-90a4-f1becdd491bf',
    version: 2,
    productType: {
      typeId: 'product-type',
      id: 'db192d72-a74d-4c4b-8935-5d7b66fcb486',
    },
    name: {
      'en-US': 'Sample Prom Dress',
    },
    categories: [
      {
        typeId: 'category',
        id: 'a822c654-e461-4414-9d99-47a9c435be8e',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-prom-dress',
    },
    variants: [
      {
        attributes: [
          {
            name: 'color',
            value: {
              key: 'Pink',
              label: 'Pink',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/dress2-_nh_EhPL.png',
            dimensions: {
              w: 1779,
              h: 1920,
            },
          },
        ],
        prices: [
          {
            id: '4bd51b46-fe24-46f2-b1ee-33d75a85be1b',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 12500,
              fractionDigits: 2,
            },
            country: 'ES',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 12000,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '7026e660-d94e-4a25-8d8d-c90bec992eb5',
              },
            },
          },
          {
            id: 'd0562d16-b6ef-41d2-8040-575bef6d1fc5',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 15000,
              fractionDigits: 2,
            },
            country: 'AU',
          },
        ],
        key: '214452',
        sku: '214452',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'color',
          value: {
            key: 'Floral',
            label: 'Floral',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/floral-_WoTefrz.jpeg',
          dimensions: {
            w: 411,
            h: 420,
          },
        },
      ],
      prices: [
        {
          id: 'bbe0ffc6-d5cb-4a3a-aafb-1b0e7585dd5b',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 24795,
            fractionDigits: 2,
          },
          country: 'DE',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 24295,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '7026e660-d94e-4a25-8d8d-c90bec992eb5',
            },
          },
        },
        {
          id: '753a4772-6021-4133-8178-632949676ac0',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 17500,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      key: '711595',
      sku: '711595',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'prom_dress',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.639Z',
    lastModifiedAt: '2023-07-31T13:56:35.108Z',
  },
  {
    id: '6e761bb3-c48d-4d9c-88d3-b7ec68315c79',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '4b8b81af-0b5f-49e9-92f5-c3c57172789b',
    },
    name: {
      'en-US': 'Sample Sport Coat',
    },
    categories: [
      {
        typeId: 'category',
        id: '0db9e4a5-b2d2-40aa-a6d0-ce0d09c80710',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-sport-coat',
    },
    variants: [
      {
        attributes: [
          {
            name: 'sleeve_length',
            value: {
              key: 'Normal',
              label: 'Normal',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/coat-Keqv_ZSU.jpeg',
            dimensions: {
              w: 150,
              h: 150,
            },
          },
        ],
        prices: [
          {
            id: '39a7997b-4614-4429-af90-f1be323c481f',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 20000,
              fractionDigits: 2,
            },
            country: 'AU',
          },
          {
            id: '2f154b0c-b0f2-4825-8c83-73947a4f8187',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 15000,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        key: '692458',
        sku: '692458',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'sleeve_length',
          value: {
            key: 'Crop',
            label: 'Crop',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/coat-VmXqw3Xo.jpeg',
          dimensions: {
            w: 225,
            h: 225,
          },
        },
      ],
      prices: [
        {
          id: '2cdebed1-034c-4d58-a996-8bd6d7cf6023',
          value: {
            type: 'centPrecision',
            currencyCode: 'AUD',
            centAmount: 20000,
            fractionDigits: 2,
          },
          country: 'AU',
        },
        {
          id: '062b3696-7b8b-452a-99f3-03af13bae199',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 15000,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      key: '692457',
      sku: '692457',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'sport_coat',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.643Z',
    lastModifiedAt: '2023-07-31T13:56:33.643Z',
  },
  {
    id: '8b85f539-6408-4eba-8c55-3fd72a09a5ca',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '0884ac1c-8748-4df6-a77c-e888c599bb31',
    },
    name: {
      'en-US': 'Sample Tote Bag',
    },
    categories: [
      {
        typeId: 'category',
        id: 'a822c654-e461-4414-9d99-47a9c435be8e',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-tote-bag',
    },
    variants: [
      {
        attributes: [
          {
            name: 'type',
            value: {
              key: 'Bag',
              label: 'Bag',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/bag-371ygCjz.png',
            dimensions: {
              w: 675,
              h: 800,
            },
          },
        ],
        prices: [
          {
            id: '8216b4da-7b14-4c05-89f0-25318b907b28',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 17500,
              fractionDigits: 2,
            },
            country: 'US',
          },
          {
            id: '8b7fb106-f9c3-4011-b974-977e84fe44c6',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 15000,
              fractionDigits: 2,
            },
            country: 'DE',
          },
        ],
        key: '124965',
        sku: '124965',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'type',
          value: {
            key: 'Bag',
            label: 'Bag',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/tote-V4lrDZ9Q.png',
          dimensions: {
            w: 766,
            h: 800,
          },
        },
      ],
      prices: [
        {
          id: 'e53b2d25-6964-488c-b4f1-ecc8afac37bf',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 13999,
            fractionDigits: 2,
          },
          country: 'US',
        },
        {
          id: '58434223-a3d7-4e6c-bb8b-e4d6a9e667ef',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 12099,
            fractionDigits: 2,
          },
          country: 'DE',
        },
      ],
      key: '718289',
      sku: '718289',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'tote_bag',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.666Z',
    lastModifiedAt: '2023-07-31T13:56:33.666Z',
  },
  {
    id: '78ef32dc-51de-4cca-9aac-7cbf77e9c5fd',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '4b8b81af-0b5f-49e9-92f5-c3c57172789b',
    },
    name: {
      'en-US': 'Sample Denim Jacket',
    },
    categories: [
      {
        typeId: 'category',
        id: '0db9e4a5-b2d2-40aa-a6d0-ce0d09c80710',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-denim-jacket',
    },
    variants: [
      {
        attributes: [
          {
            name: 'sleeve_length',
            value: {
              key: 'Extra Long',
              label: 'Extra Long',
            },
          },
          {
            name: 'cotton',
            value: false,
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/denim-pmNAetyM.jpeg',
            dimensions: {
              w: 225,
              h: 225,
            },
          },
        ],
        prices: [
          {
            id: '746f3482-840b-4eb3-8e22-2a3ede007421',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 10000,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: 'eeda3bb6-d685-490b-803a-f17f6e59db58',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 10000,
              fractionDigits: 2,
            },
            country: 'ES',
          },
          {
            id: 'c90b689e-0b0d-4202-888c-f7b1cc489b27',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 9000,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        key: '996025',
        sku: '996025',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'sleeve_length',
          value: {
            key: 'Normal',
            label: 'Normal',
          },
        },
        {
          name: 'cotton',
          value: false,
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/denim-_KAoINSX.jpeg',
          dimensions: {
            w: 225,
            h: 225,
          },
        },
      ],
      prices: [
        {
          id: 'e3ec1ac1-253f-410f-8626-4c9f5980bc1f',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 10000,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: '16f72db9-954b-462d-b097-6d9f79b924ad',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 10000,
            fractionDigits: 2,
          },
          country: 'ES',
        },
        {
          id: '49669e65-0b75-4903-bf2e-64036554020e',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 9000,
            fractionDigits: 2,
          },
          country: 'US',
        },
        {
          id: 'f4dac216-ea40-4290-9dc2-0262caac8655',
          value: {
            type: 'centPrecision',
            currencyCode: 'AUD',
            centAmount: 9500,
            fractionDigits: 2,
          },
          country: 'AU',
        },
      ],
      key: '996024',
      sku: '996024',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'denim_jacket',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.663Z',
    lastModifiedAt: '2023-07-31T13:56:33.663Z',
  },
  {
    id: '1d342a97-5b96-4daa-b1d7-54b1fec811dd',
    version: 3,
    productType: {
      typeId: 'product-type',
      id: 'db192d72-a74d-4c4b-8935-5d7b66fcb486',
    },
    name: {
      'en-US': 'Sample Summer Dress',
    },
    categories: [
      {
        typeId: 'category',
        id: 'a822c654-e461-4414-9d99-47a9c435be8e',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-summer-dress',
    },
    variants: [
      {
        attributes: [
          {
            name: 'color',
            value: {
              key: 'Pink',
              label: 'Pink',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/pinkdress-kKvWVHgG.png',
            dimensions: {
              w: 199,
              h: 254,
            },
          },
        ],
        prices: [
          {
            id: '4480e1f5-2355-46b6-a863-2399d8e489e6',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 7500,
              fractionDigits: 2,
            },
            country: 'US',
          },
          {
            id: 'a2b94405-5edb-4a71-8e64-20e7651f47cb',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 7500,
              fractionDigits: 2,
            },
            country: 'AU',
          },
        ],
        key: '439502',
        sku: '439502',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'color',
          value: {
            key: 'White',
            label: 'White',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/dress-nsVCck7f.jpeg',
          dimensions: {
            w: 276,
            h: 298,
          },
        },
      ],
      prices: [
        {
          id: '54504b08-b14f-449f-8f85-37d64c32acb6',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 7500,
            fractionDigits: 2,
          },
          country: 'DE',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 7000,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '7026e660-d94e-4a25-8d8d-c90bec992eb5',
            },
          },
        },
        {
          id: 'ef81cbdf-5280-40fb-9388-97bae34d4ddd',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 8000,
            fractionDigits: 2,
          },
          country: 'ES',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 7500,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '7026e660-d94e-4a25-8d8d-c90bec992eb5',
            },
          },
        },
        {
          id: 'ad6074aa-5890-4997-b016-0a575bd3ce99',
          value: {
            type: 'centPrecision',
            currencyCode: 'AUD',
            centAmount: 7000,
            fractionDigits: 2,
          },
          country: 'AU',
        },
      ],
      key: '791840',
      sku: '791840',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'summer_dress',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.645Z',
    lastModifiedAt: '2023-08-28T15:52:05.301Z',
  },
  {
    id: 'b915cd5a-9ea3-4b07-b2b5-5f13455f1691',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '0884ac1c-8748-4df6-a77c-e888c599bb31',
    },
    name: {
      'en-US': 'Sample Necklace',
    },
    categories: [
      {
        typeId: 'category',
        id: 'a822c654-e461-4414-9d99-47a9c435be8e',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-necklace',
    },
    variants: [
      {
        attributes: [
          {
            name: 'type',
            value: {
              key: 'Jewelry',
              label: 'Jewelry',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/necklace-KmP7rQDP.png',
            dimensions: {
              w: 209,
              h: 241,
            },
          },
        ],
        prices: [
          {
            id: '4bb5b526-9cb3-44c5-af3f-2f1d7f257e6d',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 1575,
              fractionDigits: 2,
            },
            country: 'AU',
          },
        ],
        key: '42610',
        sku: '42610',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'type',
          value: {
            key: 'Jewelry',
            label: 'Jewelry',
          },
        },
        {
          name: 'engraving',
          value: 'Happy Anniversary',
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/necklace-TRlWhVSq.png',
          dimensions: {
            w: 103,
            h: 122,
          },
        },
      ],
      prices: [
        {
          id: '66adbd91-3fee-4064-8bb4-0881b4e3dfce',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 5000,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: '46cd96bf-c262-4654-a040-5a4f5faa4404',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5000,
            fractionDigits: 2,
          },
          country: 'US',
        },
        {
          id: 'b7a32eda-d76f-4a7b-9b91-8104b01f7b91',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 5000,
            fractionDigits: 2,
          },
          country: 'ES',
        },
      ],
      key: '752502',
      sku: '752502',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'necklace',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.683Z',
    lastModifiedAt: '2023-07-31T13:56:33.683Z',
  },
  {
    id: 'ca2c543f-ad37-4548-98fb-bcd6d5d63e55',
    version: 2,
    productType: {
      typeId: 'product-type',
      id: '3196f857-35d0-492c-bafe-78ea87c2277f',
    },
    name: {
      'en-US': 'Sample Skinny Jeans',
    },
    categories: [
      {
        typeId: 'category',
        id: '765dd123-fc69-4cb2-adbd-a63e4f0c3ad0',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-skinny-jeans',
    },
    variants: [
      {
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
              key: 'Slim',
              label: 'Slim',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/pants-qbuZJH9h.jpeg',
            dimensions: {
              w: 100,
              h: 150,
            },
          },
        ],
        prices: [
          {
            id: '1bf31cd6-1464-420c-8ea2-0f805b3186db',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 4999,
              fractionDigits: 2,
            },
            country: 'DE',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 4499,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
          {
            id: '34584783-fd1a-4441-977e-7027d82f55df',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4500,
              fractionDigits: 2,
            },
            country: 'US',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 4050,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
        ],
        key: '349700',
        sku: '349700',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'fit',
          value: {
            key: 'Slim',
            label: 'Slim',
          },
        },
        {
          name: 'size',
          value: {
            key: 'Medium',
            label: 'Medium',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/skinny-QJz4Jcme.jpeg',
          dimensions: {
            w: 183,
            h: 275,
          },
        },
      ],
      prices: [
        {
          id: '5600001f-2516-4909-9e2a-ab371f2a1aea',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 4999,
            fractionDigits: 2,
          },
          country: 'DE',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 4499,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '88c45228-5ff0-403b-9e28-436d0641c251',
            },
          },
        },
        {
          id: 'd7b92cee-d215-4484-8972-37ebc185d5bc',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 4500,
            fractionDigits: 2,
          },
          country: 'US',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4050,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '88c45228-5ff0-403b-9e28-436d0641c251',
            },
          },
        },
      ],
      key: '396594',
      sku: '396594',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'skinny_jeans',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.640Z',
    lastModifiedAt: '2023-07-31T13:56:35.301Z',
  },
  {
    id: 'dfee15df-8402-4602-855e-3d01dc1eef8b',
    version: 32,
    productType: {
      typeId: 'product-type',
      id: '3196f857-35d0-492c-bafe-78ea87c2277f',
    },
    name: {
      'en-US': 'Sample Flair Jeans',
    },
    categories: [
      {
        typeId: 'category',
        id: '765dd123-fc69-4cb2-adbd-a63e4f0c3ad0',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-flair-jeans',
    },
    variants: [
      {
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
              key: 'Flair',
              label: 'Flair',
            },
          },
          {
            name: 'color',
            value: {
              key: 'Black',
              label: 'Black',
            },
          },
          {
            name: 'length',
            value: {
              key: 'Extra Long',
              label: 'Extra Long',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/Business-Law-2%20(2)-gKojJmzS.jpg',
            label: '1',
            dimensions: {
              w: 1972,
              h: 1306,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/48b612ca55f719191dd5-GFnyo6-h.jpg',
            label: '4',
            dimensions: {
              w: 800,
              h: 600,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/marsh6673q_lawyers_p-6yGgM893.png',
            label: '2',
            dimensions: {
              w: 1024,
              h: 1024,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/marsh6673q_Lawyers_p-88z-22gA.png',
            label: '5',
            dimensions: {
              w: 1024,
              h: 1024,
            },
          },
          {
            url: 'https://11ca2385b11cec2d0af1-821664327c5e3dd687eec8bdb3eec1f8.ssl.cf3.rackcdn.com/Business-Law-2-RR7ARibB.jpg',
            label: '3',
            dimensions: {
              w: 4928,
              h: 3264,
            },
          },
        ],
        prices: [
          {
            id: '4d5fe5f1-f77f-439c-bea1-9bfba6aaed96',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4400,
              fractionDigits: 2,
            },
            key: 'fdgs',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 3960,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '88c45228-5ff0-403b-9e28-436d0641c251',
              },
            },
          },
        ],
        key: '54643567456',
        sku: '54343534',
        id: 2,
      },
    ],
    masterVariant: {
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
            key: 'Flair',
            label: 'Flair',
          },
        },
        {
          name: 'color',
          value: {
            key: 'Blue',
            label: 'Blue',
          },
        },
        {
          name: 'length',
          value: {
            key: 'Crop',
            label: 'Crop',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://images.wrangler.com/is/image/Wrangler/13MWZPW-HERO?$KDP-XXLARGE$',
          label: '1',
          dimensions: {
            w: 1460,
            h: 1947,
          },
        },
        {
          url: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F04%2Ffa%2F04fa5792dc372c3b5f5c4de1332f641602470736.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]',
          label: '2',
          dimensions: {
            w: 768,
            h: 1152,
          },
        },
        {
          url: 'https://storage.sg.content-cdn.io/cdn-cgi/image/%7Bwidth%7D,%7Bheight%7D,quality=75,format=auto/in-resources/21e9ae3c-de72-4391-9c4a-c7af58447630/Images/ProductImages/Source/Levis-Mens-512-Slim-Taper-Jeans-288331149_01_Front.jpg',
          label: '3',
          dimensions: {
            w: 1034,
            h: 1376,
          },
        },
      ],
      prices: [
        {
          id: '452fb9d0-0ae4-4f3f-b6d7-46aa3a40dc53',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 4400,
            fractionDigits: 2,
          },
          key: 'fdgr',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 3960,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: '88c45228-5ff0-403b-9e28-436d0641c251',
            },
          },
        },
      ],
      key: '346273643',
      sku: '32545346',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'flair_jeans',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    priceMode: 'Embedded',
    createdAt: '2023-07-31T13:56:33.654Z',
    lastModifiedAt: '2023-08-26T17:07:42.429Z',
  },
  {
    id: '4704ba88-d9db-45dc-ad58-0129606430a6',
    version: 8,
    productType: {
      typeId: 'product-type',
      id: '7ec396b5-18d3-4be8-96ba-9d0ca13fdf7a',
    },
    name: {
      'en-US': 'Sample Anniversary Shirt',
    },
    categories: [
      {
        typeId: 'category',
        id: 'b373e8c1-bc63-4b7a-89c0-c960f551775d',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-anniversary-shirt',
    },
    variants: [
      {
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Medium',
              label: 'Medium',
            },
          },
        ],
        assets: [],
        images: [],
        prices: [
          {
            id: 'b0af4e82-08f2-43a8-be64-a4cd175f30e6',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2799,
              fractionDigits: 2,
            },
          },
        ],
        id: 2,
      },
      {
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Large',
              label: 'Large',
            },
          },
        ],
        assets: [],
        images: [],
        prices: [
          {
            id: '0294f644-f56f-4954-8241-386f756b0189',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 3400,
              fractionDigits: 2,
            },
          },
        ],
        id: 3,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'size',
          value: {
            key: 'Small',
            label: 'Small',
          },
        },
      ],
      assets: [],
      images: [],
      prices: [
        {
          id: 'b56d09ae-dbeb-4ffe-9ef4-a14cab597c10',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2799,
            fractionDigits: 2,
          },
        },
      ],
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'anniversary_shirt',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.640Z',
    lastModifiedAt: '2023-08-29T08:32:01.638Z',
  },
  {
    id: '08a1fc4f-a2a3-49ea-88b1-8a70b645793e',
    version: 2,
    productType: {
      typeId: 'product-type',
      id: '7ec396b5-18d3-4be8-96ba-9d0ca13fdf7a',
    },
    name: {
      'en-US': 'Sample Halloween Top',
    },
    categories: [
      {
        typeId: 'category',
        id: '0db9e4a5-b2d2-40aa-a6d0-ce0d09c80710',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-halloween-top',
    },
    variants: [
      {
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Large',
              label: 'Large',
            },
          },
          {
            name: 'color',
            value: {
              key: 'Multi-Color',
              label: 'Multi-Color',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/multi-TjZTRFuz.jpeg',
            dimensions: {
              w: 900,
              h: 700,
            },
          },
        ],
        prices: [
          {
            id: '4358d09c-a8ad-4ec4-b951-01266053b52c',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 3000,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: 'ca3520eb-a0f2-41fa-adbe-b09e2a9666b6',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 3000,
              fractionDigits: 2,
            },
            country: 'US',
          },
          {
            id: '7102e7f5-d2e5-40cc-bc75-fe52a704e748',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 3300,
              fractionDigits: 2,
            },
            country: 'ES',
          },
        ],
        key: '828329',
        sku: '828329',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'size',
          value: {
            key: 'Medium',
            label: 'Medium',
          },
        },
        {
          name: 'color',
          value: {
            key: 'Purple',
            label: 'Purple',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/purple-5xg50uIz.png',
          dimensions: {
            w: 215,
            h: 235,
          },
        },
      ],
      prices: [
        {
          id: '8cde0a44-a5c5-43c0-9a2e-4d90d23404bb',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 2500,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: '55a317d6-ff69-4c87-acb3-15a4333831f2',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2500,
            fractionDigits: 2,
          },
          country: 'US',
        },
        {
          id: '5c572b45-abcf-4bc7-bd03-cf5c12144ac1',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 2500,
            fractionDigits: 2,
          },
          country: 'ES',
        },
      ],
      key: '888035',
      sku: '888035',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'Halloween Top',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.677Z',
    lastModifiedAt: '2023-08-28T15:52:22.424Z',
  },
  {
    id: '1dad38fa-5c5b-4b2d-8f0a-8137042f3868',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '7ec396b5-18d3-4be8-96ba-9d0ca13fdf7a',
    },
    name: {
      'en-US': 'Sample Maternity Top',
    },
    categories: [
      {
        typeId: 'category',
        id: 'a357b94f-b8bc-461e-9d5a-d0fdc3afc6b9',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-maternity-top',
    },
    variants: [
      {
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Medium',
              label: 'Medium',
            },
          },
          {
            name: 'color',
            value: {
              key: 'Green',
              label: 'Green',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/greenshirt-7_8SGLVB.png',
            dimensions: {
              w: 262,
              h: 300,
            },
          },
        ],
        prices: [
          {
            id: 'fc7a5092-2fcc-43b6-a073-3d9d9ea70da0',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 2695,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: 'b8dcc5c6-e285-42be-acf7-7f01aa601a12',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 2500,
              fractionDigits: 2,
            },
            country: 'AU',
          },
        ],
        key: '118717',
        sku: '118717',
        id: 2,
      },
      {
        attributes: [
          {
            name: 'size',
            value: {
              key: 'Large',
              label: 'Large',
            },
          },
          {
            name: 'color',
            value: {
              key: 'Green',
              label: 'Green',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/greenshirt-lOB-DcqK.png',
            dimensions: {
              w: 262,
              h: 300,
            },
          },
        ],
        prices: [
          {
            id: '728df6b7-2722-4506-988f-11a725364c53',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 2695,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: 'bd60ba17-20d6-41f3-8a1c-62b6fd0df357',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 2500,
              fractionDigits: 2,
            },
            country: 'AU',
          },
        ],
        key: '118718',
        sku: '118718',
        id: 3,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'size',
          value: {
            key: 'Small',
            label: 'Small',
          },
        },
        {
          name: 'color',
          value: {
            key: 'Green',
            label: 'Green',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/greenshirt-__gg4rwo.png',
          dimensions: {
            w: 262,
            h: 300,
          },
        },
      ],
      prices: [
        {
          id: '7dc9b909-9ceb-4d6e-b958-ae4ba8857401',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 2695,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: '44ea1c1d-dc4b-413c-8179-0f50ea24652f',
          value: {
            type: 'centPrecision',
            currencyCode: 'AUD',
            centAmount: 2500,
            fractionDigits: 2,
          },
          country: 'AU',
        },
      ],
      key: '118716',
      sku: '118716',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'maternity_top',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.680Z',
    lastModifiedAt: '2023-07-31T13:56:33.680Z',
  },
  {
    id: '687cf607-4220-4c66-9508-7960a07148ad',
    version: 36,
    productType: {
      typeId: 'product-type',
      id: '3196f857-35d0-492c-bafe-78ea87c2277f',
    },
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
    variants: [
      {
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
        key: '855485',
        sku: '855485',
        id: 2,
      },
      {
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
        key: '855486',
        sku: '855486',
        id: 3,
      },
    ],
    masterVariant: {
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
      key: '855484',
      sku: '855484',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'toddler_trousers',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    priceMode: 'Standalone',
    createdAt: '2023-07-31T13:56:33.640Z',
    lastModifiedAt: '2023-08-28T15:52:29.086Z',
  },
  {
    id: '3446a6d7-3f77-4974-a26e-9b1bd8b55d85',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '0884ac1c-8748-4df6-a77c-e888c599bb31',
    },
    name: {
      'en-US': 'Sample Sandals',
    },
    categories: [
      {
        typeId: 'category',
        id: 'fe89c8ba-8eba-4afa-9ecf-413725777d14',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'sample-sandals',
    },
    variants: [
      {
        attributes: [
          {
            name: 'type',
            value: {
              key: 'Shoes',
              label: 'Shoes',
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/sandals-nDN7Ajoe.jpeg',
            dimensions: {
              w: 219,
              h: 230,
            },
          },
        ],
        prices: [
          {
            id: '1369619e-4589-4f5d-8d4f-d1082fe7b14b',
            value: {
              type: 'centPrecision',
              currencyCode: 'AUD',
              centAmount: 1199,
              fractionDigits: 2,
            },
            country: 'AU',
          },
          {
            id: '2fa8d9c6-b5e8-48da-8532-f359cbb81ff8',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1000,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        key: '148097',
        sku: '148097',
        id: 2,
      },
    ],
    masterVariant: {
      attributes: [
        {
          name: 'type',
          value: {
            key: 'Shoes',
            label: 'Shoes',
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/sandals-hd5LHY6T.png',
          dimensions: {
            w: 227,
            h: 222,
          },
        },
      ],
      prices: [
        {
          id: '321096bc-f8bb-4e2d-b134-86d8c41b94f2',
          value: {
            type: 'centPrecision',
            currencyCode: 'AUD',
            centAmount: 2500,
            fractionDigits: 2,
          },
          country: 'AU',
        },
        {
          id: 'de087ee0-013c-4cf3-a5df-6ee0c02c336b',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 3000,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: 'ed8a9ad6-2462-4aac-b0d7-716a314b6fe0',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2799,
            fractionDigits: 2,
          },
          country: 'US',
        },
        {
          id: '6d75ab75-ddf5-465d-ae0e-2934cf96e83d',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 3000,
            fractionDigits: 2,
          },
          country: 'ES',
        },
      ],
      key: '148096',
      sku: '148096',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'sandals',
    taxCategory: {
      typeId: 'tax-category',
      id: '985ef787-69d1-4d34-9e4b-601b95112add',
    },
    createdAt: '2023-07-31T13:56:33.673Z',
    lastModifiedAt: '2023-07-31T13:56:33.673Z',
  },
] as ProductProjection[];

export default products;
