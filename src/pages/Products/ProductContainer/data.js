export const DUMMY_PRODUCTS = [
  {
    id: 1,
    modelId: 1001,
    modelName: 'De Gira',
    variants: [
      {
        productId: 100101,
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
          { id: 1, value: 'S', stock: 0 },
          { id: 2, value: 'M', stock: 12 },
          { id: 3, value: 'L', stock: 22 },
          { id: 4, value: 'XL', stock: 13 },
          { id: 5, value: 'XXL', stock: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    modelId: 1002,
    modelName: 'Ojos',
    variants: [
      {
        productId: 100201,
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
          { id: 1, value: 'S', stock: 12 },
          { id: 2, value: 'M', stock: 24 },
          { id: 3, value: 'L', stock: 15 },
          { id: 4, value: 'XL', stock: 0 },
          { id: 5, value: 'XXL', stock: 0 },
        ],
      },
    ],
  },
  {
    id: 3,
    modelId: 2001,
    modelName: 'De Gira',
    variants: [
      {
        productId: 200101,
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
          { id: 1, value: 'S', stock: 16 },
          { id: 2, value: 'M', stock: 0 },
          { id: 3, value: 'L', stock: 32 },
          { id: 4, value: 'XL', stock: 10 },
          { id: 5, value: 'XXL', stock: 8 },
        ],
      },
      {
        productId: 200102,
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
          { id: 1, value: 'S', stock: 2 },
          { id: 2, value: 'M', stock: 11 },
          { id: 3, value: 'L', stock: 22 },
          { id: 4, value: 'XL', stock: 0 },
          { id: 5, value: 'XXL', stock: 6 },
        ],
      },
    ],
  },
  {
    id: 4,
    modelId: 2002,
    modelName: 'Flaakko',
    variants: [
      {
        productId: 200201,
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
          { id: 1, value: 'S', stock: 10 },
          { id: 2, value: 'M', stock: 5 },
          { id: 3, value: 'L', stock: 18 },
          { id: 4, value: 'XL', stock: 19 },
          { id: 5, value: 'XXL', stock: 7 },
        ],
      },
    ],
  },
  {
    id: 5,
    modelId: 3001,
    modelName: 'Baires',
    variants: [
      {
        productId: 300101,
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
        inventoryLevels: [{ id: 1, value: 'M', stock: 12 }],
      },
    ],
  },
];
