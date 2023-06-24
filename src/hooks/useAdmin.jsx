import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import {
  writeBatch,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { db, storage } from 'db/config';

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
    setError(null);
    try {
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
    } catch (err) {
      setError(err);
    }
  };

  const deleteFile = (directory, file) => {
    const uploadPath = `${directory}/${file.id}/${file.name}`;
    const storageRef = ref(storage, uploadPath);

    deleteObject(storageRef);
  };

  const getProduct = async (productId) => {
    setError(null);
    setIsLoading(true);

    try {
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
          const skuInventoryLevel = inventory.find(
            (sku) => sku.id === item.sku
          );

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

      for (const value of selectedSizes) {
        sizesInput[value] = true;
      }

      product.images = images;
      product.sizesInput = sizesInput;
      product.sizes = selectedSizes;
      product.currentInventoryLevels = currentInventoryLevels;
      product.baseSku = currentInventoryLevels[0].id.split('-')[0];

      setIsLoading(false);

      return product;
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const createProduct = async ({ productData, variants, images }) => {
    setError(null);
    setIsLoading(true);

    try {
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

      let currentImagesInUse = [];

      const batch = writeBatch(db);

      for (let variant of variants) {
        currentImagesInUse = [...currentImagesInUse, ...variant.images];

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
            stock: variantInventory[size] || 0,
            value: size,
          };

          const skuInventoryRef = doc(db, 'inventory', sku);

          batch.set(skuInventoryRef, skuInventory);
        }
        product.variants.push(variantContent);
      }

      const currentImagesInUseNames = currentImagesInUse.map(
        (image) => image.name
      );

      const imagesToBeDeleted = images.filter(
        (image) => !currentImagesInUseNames.includes(image.name)
      );

      if (imagesToBeDeleted.length > 0) {
        for (const image of imagesToBeDeleted) {
          const uploadPath = `product-images/${image.id}/${image.name}`;
          const storageRef = ref(storage, uploadPath);

          deleteObject(storageRef);
        }
      }

      await batch.commit();

      const productRef = doc(db, 'products', productId);

      await setDoc(productRef, product);

      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const editProduct = async ({
    productData,
    variants,
    currentInventoryLevels,
    images,
    imagesMarkedForRemoval,
  }) => {
    setError(null);
    setIsLoading(true);

    try {
      for (const image of imagesMarkedForRemoval) {
        const uploadPath = `product-images/${image.id}/${image.name}`;
        const storageRef = ref(storage, uploadPath);

        deleteObject(storageRef);
      }

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

      let product = {
        ...productProps,
        model: formattedModel,
        type: formattedType,
        description: formattedDescription,
        variantSlugs: [],
        variants: [],
      };

      let currentImagesInUse = [];

      const currentProductSkus = currentInventoryLevels.map(
        (variant) => variant.sku
      );
      const newProductSkus = [];

      const batch = writeBatch(db);

      for (let variant of variants) {
        currentImagesInUse = [...currentImagesInUse, ...variant.images];

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
          newProductSkus.push(sku);

          const skuInventory = {
            productId: product.id,
            stock: variantInventory[size] || 0,
            value: size,
          };

          const skuInventoryRef = doc(db, 'inventory', sku);

          batch.set(skuInventoryRef, skuInventory);
        }
        product.variants.push(variantContent);
      }

      const currentImagesInUseNames = currentImagesInUse.map(
        (image) => image.name
      );

      const imagesToBeDeleted = images.filter(
        (image) => !currentImagesInUseNames.includes(image.name)
      );

      if (imagesToBeDeleted.length > 0) {
        for (const image of imagesToBeDeleted) {
          const uploadPath = `product-images/${image.id}/${image.name}`;
          const storageRef = ref(storage, uploadPath);

          deleteObject(storageRef);
        }
      }

      const skusToBeDeleted = currentProductSkus.filter(
        (sku) => !newProductSkus.includes(sku)
      );

      if (skusToBeDeleted.length > 0) {
        for (const sku of skusToBeDeleted) {
          const skuInventoryRef = doc(db, 'inventory', sku);
          batch.delete(skuInventoryRef);
        }
      }

      await batch.commit();

      const productRef = doc(db, 'products', product.id);

      await setDoc(productRef, product);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteVariant = async ({ productId, variantId }) => {
    setError(null);
    setIsLoading(true);

    try {
      const productRef = doc(db, 'products', productId);

      const docSnap = await getDoc(productRef);

      let product = { id: docSnap.id, ...docSnap.data() };

      const variantToBeDeleted = product.variants.find(
        (variant) => variant.id === variantId
      );

      for (const image of variantToBeDeleted.images) {
        const uploadPath = `product-images/${image.id}/${image.name}`;
        const storageRef = ref(storage, uploadPath);

        deleteObject(storageRef);
      }

      const batch = writeBatch(db);

      for (const item of variantToBeDeleted.inventoryLevels) {
        const skuInventoryRef = doc(db, 'inventory', item.sku);

        batch.delete(skuInventoryRef);
      }
      await batch.commit();

      const updatedVariants = product.variants.filter(
        (variant) => variant.id !== variantId
      );

      product.variants = [...updatedVariants];

      if (product.variants.length > 0) {
        await setDoc(productRef, product);
      } else {
        await deleteDoc(productRef);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setError(null);
    setIsLoading(true);

    try {
      const productRef = doc(db, 'products', productId);

      const docSnap = await getDoc(productRef);

      let product = { id: docSnap.id, ...docSnap.data() };

      const batch = writeBatch(db);

      for (const variant of product.variants) {
        for (const image of variant.images) {
          const uploadPath = `product-images/${image.id}/${image.name}`;
          const storageRef = ref(storage, uploadPath);

          deleteObject(storageRef);
        }

        for (const item of variant.inventoryLevels) {
          const skuInventoryRef = doc(db, 'inventory', item.sku);

          batch.delete(skuInventoryRef);
        }
      }

      await batch.commit();

      await deleteDoc(productRef);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return {
    uploadFiles,
    deleteFile,
    createProduct,
    editProduct,
    deleteVariant,
    deleteProduct,
    getProduct,
    isLoading,
    error,
  };
};
