import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase/config';

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFiles = async (directory, { currentFiles, newFiles }) => {
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
    console.log(productInfo, variants);

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

    let product = {
      ...productData,
      id: uuid(),
      model: formattedModel,
      type: formattedType,
      description: formattedDescription,
      variantUrls: [],
      variants: [...variants],
    };

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

      const checkColor = variant.color[1];

      if (checkColor) {
        // agarrar 2 letras primera palabra y 1 segunda
        // else agarrar 3 letras de la palabra unica
      }

      const { inventory: variantInventory, ...variantContent } = variant;

      variantContent.inventoryLevels = [];

      for (const size of selectedSizes) {
        const sku = product.sku + variant;
      }
    }
  };
  return { uploadFiles, createProduct, isLoading, error };
};
