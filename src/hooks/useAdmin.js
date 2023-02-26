import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import {
  writeBatch,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase/config';

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const skuSizeCode = {
    s: 'sm',
    m: 'md',
    l: 'lg',
    xl: 'xl',
    xxl: 'xx',
  };

  const uploadFiles = async (directory, { currentFiles, newFiles }) => {
    const batch = writeBatch(db);
    const updatedFiles = [...currentFiles];

    for (const newFile of newFiles) {
      const isImage = !!newFile.type.match(`image.*`);

      if (isImage) {
        const checkForExistingImage = currentFiles.find(
          (image) => image.name === newFile.name
        );

        const id = uuid();
        const uploadPath = `${directory}/${id}/${newFile.name}`;
        const storageRef = ref(storage, uploadPath);
        await uploadBytes(storageRef, newFile);
        const fileURL = await getDownloadURL(storageRef);

        if (!checkForExistingImage) {
          updatedFiles.push({ id, name: newFile.name, src: fileURL });
        }
      }
    }

    return updatedFiles;
  };

  const createProduct = async ({ productData, variants }) => {
    const formattedModel = productData.model
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    const formattedType = productData.type
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    const formattedDescription = productData.description
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    const {
      sku: productBaseSku,
      sizes: selectedSizes,
      ...productProps
    } = productData;

    const productId = uuid();

    let product = {
      ...productProps,
      model: formattedModel,
      type: formattedType,
      description: formattedDescription,
      variantSlugs: [],
      variants: [],
    };

    const batch = writeBatch(db);

    for (let variant of variants) {
      let variantSlug = `${product.type} ${product.model}`;
      if (variant.colorDisplay) {
        variantSlug += ` ${variant.colorDisplay}`;
      } else {
        variantSlug += ` ${variant.color}`;
      }

      const formattedVariantSlug = variantSlug
        .replaceAll(' ', '-')
        .toLowerCase();

      product.variantSlugs.push(formattedVariantSlug);

      const colorSplit = variant.color.split(' ');
      let skuColor;

      if (colorSplit.length > 1) {
        skuColor = colorSplit[0].substr(0, 1) + colorSplit[1].substr(0, 2);
      } else {
        skuColor = variant.color.substr(0, 3);
      }

      const { inventory: variantInventory, ...variantContent } = variant;

      variantContent.slug = formattedVariantSlug;

      variantContent.inventoryLevels = [];

      for (const size of selectedSizes) {
        const sku =
          `${productBaseSku}-${skuColor}-${skuSizeCode[size]}`.toUpperCase();

        variantContent.inventoryLevels.push({ sku });

        const skuInventory = {
          productId,
          stock: variantInventory[size],
          value: size,
        };

        const skuInventoryRef = doc(db, 'inventory', sku);

        batch.set(skuInventoryRef, skuInventory);
      }
      product.variants.push(variantContent);
    }

    await batch.commit();

    const productRef = doc(db, 'products', productId);

    await setDoc(productRef, product);
  };

  const getProduct = async (productId) => {
    const productRef = doc(db, 'products', productId);
    const docSnap = await getDoc(productRef);

    const product = { id: docSnap.id, ...docSnap.data() };

    let images = [];

    for (const variant of product.variants) {
      images = [...images, ...variant.images];
    }

    let inventory = [];

    const inventoryRef = collection(db, 'inventory');

    const qInv = query(inventoryRef, where('productId', '==', product.id));
    const inventorySnapshot = await getDocs(qInv);

    inventorySnapshot.forEach((doc) => {
      inventory.push({ id: doc.id, ...doc.data() });
    });

    const currentInventoryLevels = [];

    for (let i = 0; i < product.variants.length; i++) {
      let variantInventory = {};
      for (const item of product.variants[i].inventoryLevels) {
        const skuInventoryLevel = inventory.find((sku) => sku.id === item.sku);

        const value = skuInventoryLevel.value;
        const stock = skuInventoryLevel.stock;

        variantInventory = { ...variantInventory, [value]: stock };
        currentInventoryLevels.push({ ...item, ...skuInventoryLevel });
      }

      product.variants[i].inventory = variantInventory;
      delete product.variants[i].inventoryLevels;
    }

    const sizesInput = {
      s: false,
      m: false,
      l: false,
      xl: false,
      xxl: false,
    };

    const selectedSizes = Object.keys(product.variants[0].inventory);

    console.log(selectedSizes);

    for (const value of selectedSizes) {
      sizesInput[value] = true;
    }

    product.images = images;
    product.sizesInput = sizesInput;
    product.sizes = selectedSizes;
    product.currentInventoryLevels = currentInventoryLevels;
    product.baseSku = currentInventoryLevels[0].id.split('-')[0];

    console.log(product);

    return product;
  };

  return { uploadFiles, createProduct, getProduct, isLoading, error };
};
