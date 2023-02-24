import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { writeBatch, doc, collection, setDoc } from 'firebase/firestore';
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

  const createProduct = async ({ productInfo, variants }) => {
    const formattedModel = productInfo.model
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    const formattedType = productInfo.type
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    const formattedDescription = productInfo.description
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    const {
      sku: productBaseSku,
      sizes: productSizes,
      ...productData
    } = productInfo;

    const selectedSizes = Object.keys(productSizes).filter(
      (key) => productSizes[key]
    );

    const productId = uuid();

    let product = {
      ...productData,
      model: formattedModel,
      type: formattedType,
      description: formattedDescription,
      variantUrls: [],
      variants: [...variants],
    };

    const batch = writeBatch(db);

    // crear slugs
    for (let variant of product.variants) {
      let variantSlug = `${product.type} ${product.model}`;
      if (variant.colorDisplay) {
        variantSlug += ` ${variant.colorDisplay}`;
      } else {
        variantSlug += ` ${variant.color}`;
      }

      product.variantUrls.push(variantSlug.replaceAll(' ', '-').toLowerCase());

      // crear skus
      const colorSplit = variant.color.split(' ');
      let skuColor;

      if (colorSplit.length > 0) {
        skuColor = colorSplit[0].substr(0, 1) + colorSplit[1].substr(0, 2);
      } else {
        skuColor = variant.color.substr(0, 3);
      }

      const { inventory: variantInventory, ...variantContent } = variant;

      variantContent.inventoryLevels = [];

      for (const size of selectedSizes) {
        const sku =
          `${productBaseSku}-${skuColor}-${skuSizeCode[size]}`.toUpperCase();
        variantContent.inventoryLevels.push(sku);

        const skuInventory = {
          productId,
          stock: variantInventory[size],
          value: size,
        };

        // const skuInventoryRef = doc(db, 'inventory', sku);

        // batch.set(skuInventoryRef, skuInventory);
      }
    }

    // await batch.commit();

    // const productRef = doc(collection(db, 'products', productId));

    // await setDoc(productRef, product);

    console.log(product);
  };

  return { uploadFiles, createProduct, isLoading, error };
};
