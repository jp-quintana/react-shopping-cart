export const DUMMY_PRODUCTS = [
  {
    id: 1,
    productId: 1001,
    productName: 'De Gira',
    variants: [
      {
        variantId: 100101,
        color: 'blanca',
        price: { raw: 3600, html: '3.600' },
        type: 'Remera',
        collections: 'remeras',
        url: 'remera-de-gira-blanca',
        productThumbnail: require('assets/images/productos-remera-de-gira-blanca-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-remera-de-gira-blanca-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-remera-de-gira-blanca-2.jpg'),
          },
        ],
        inventoryLevels: [
          { sku: 'REMDGBLSM101', value: 'S', stock: 0 },
          { sku: 'REMDGBLMD101', value: 'M', stock: 12 },
          { sku: 'REMDGBLLG101', value: 'L', stock: 22 },
          { sku: 'REMDGBLXL101', value: 'XL', stock: 13 },
          { sku: 'REMDGBLXX101', value: 'XXL', stock: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    productId: 1002,
    productName: 'Ojos',
    variants: [
      {
        varianId: 100201,
        color: 'negra',
        price: { raw: 3400, html: '3.400' },
        type: 'Remera',
        collections: 'remeras',
        url: 'remera-ojos-negra',
        productThumbnail: require('assets/images/productos-remera-ojos-negra-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-remera-ojos-negra-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-remera-ojos-negra-2.jpg'),
          },
        ],
        inventoryLevels: [
          { sku: 'REMOJNGSM201', value: 'S', stock: 12 },
          { sku: 'REMOJNGMD201', value: 'M', stock: 24 },
          { sku: 'REMOJNGLG201', value: 'L', stock: 15 },
          { sku: 'REMOJNGXL201', value: 'XL', stock: 0 },
          { sku: 'REMOJNGXX201', value: 'XXL', stock: 0 },
        ],
      },
    ],
  },
  {
    id: 3,
    productId: 2001,
    productName: 'De Gira',
    variants: [
      {
        variantId: 200101,
        color: 'blanco',
        price: { raw: 6400, html: '6400' },
        type: 'Hoodie',
        collections: 'buzos',
        url: 'hoodie-de-gira-blanco',
        productThumbnail: require('assets/images/productos-hoodie-de-gira-blanco-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-hoodie-de-gira-blanco-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-hoodie-de-gira-blanco-2.jpg'),
          },
        ],
        inventoryLevels: [
          { sku: 'BUZDGBLSM101', value: 'S', stock: 16 },
          { sku: 'BUZDGBLMD101', value: 'M', stock: 0 },
          { sku: 'BUZDGBLLG101', value: 'L', stock: 32 },
          { sku: 'BUZDGBLXL101', value: 'XL', stock: 10 },
          { sku: 'BUZDGBLXX101', value: 'XXL', stock: 8 },
        ],
      },
      {
        variantId: 200102,
        color: 'negro',
        price: { raw: 6400, html: '6400' },
        type: 'Hoodie',
        collections: 'buzos',
        url: 'hoodie-de-gira-negro',
        productThumbnail: require('assets/images/productos-hoodie-de-gira-negro-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-hoodie-de-gira-negro-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-hoodie-de-gira-negro-2.jpg'),
          },
        ],
        inventoryLevels: [
          { sku: 'BUZDGNGSM101', value: 'S', stock: 2 },
          { sku: 'BUZDGNGMD101', value: 'M', stock: 11 },
          { sku: 'BUZDGNGLG101', value: 'L', stock: 22 },
          { sku: 'BUZDGNGXL101', value: 'XL', stock: 0 },
          { sku: 'BUZDGNGXX101', value: 'XXL', stock: 6 },
        ],
      },
    ],
  },
  {
    id: 4,
    productId: 2002,
    productName: 'Flaakko',
    variants: [
      {
        variantId: 200201,
        color: 'negro',
        price: { raw: 5600, html: '5.600' },
        type: 'Buzo',
        collections: 'buzos',
        url: 'buzo-flaakko-negro',
        productThumbnail: require('assets/images/productos-buzo-flaakko-negro-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-buzo-flaakko-negro-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-buzo-flaakko-negro-2.jpg'),
          },
        ],
        inventoryLevels: [
          { sku: 'BUZFLNGSM201', value: 'S', stock: 10 },
          { sku: 'BUZFLNGMD201', value: 'M', stock: 5 },
          { sku: 'BUZFLNGLG201', value: 'L', stock: 18 },
          { sku: 'BUZFLNGXL201', value: 'XL', stock: 19 },
          { sku: 'BUZFLNGXX201', value: 'XXL', stock: 7 },
        ],
      },
    ],
  },
  {
    id: 5,
    productId: 3001,
    productName: 'Baires',
    variants: [
      {
        variantId: 300101,
        color: 'blanco',
        price: { raw: 3300, html: '3.300' },
        type: 'Gorro',
        collections: 'accesorios',
        url: 'gorro-baires-blanco',
        productThumbnail: require('assets/images/productos-gorro-baires-blanco-1.jpg'),
        images: [
          {
            id: 1,
            src: require('assets/images/productos-gorro-baires-blanco-1.jpg'),
          },
          {
            id: 2,
            src: require('assets/images/productos-gorro-baires-blanco-2.jpg'),
          },
        ],
        inventoryLevels: [{ sku: 'ACCBABLMD101', value: 'M', stock: 12 }],
      },
    ],
  },
];
