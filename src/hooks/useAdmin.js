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

  const createProduct = ({ productInfo, variants }) => {
    console.log(productInfo, variants);
    let product = { ...productInfo };

    const formattedType = product.type.replace(/\s+/g, ' ').trim();

    console.log('formattedType', formattedType);

    const formattedModel = product.model.replace(/\s+/g, ' ').trim();

    console.log('formattedModel', formattedModel);

    const variantSlugs = [];
    for (const variant of variants) {
      let variantSlug = `${product.type} ${product.model}`;
      if (variant.colorDisplay) {
        variantSlug += ` ${variant.colorDisplay}`;
      } else {
        variantSlug += ` ${variant.color}`;
      }

      variantSlugs.push(variantSlug.replaceAll(' ', '-').toLowerCase());
    }

    console.log('variantSlugs', variantSlugs);
  };
  return { uploadFiles, createProduct, isLoading, error };
};
