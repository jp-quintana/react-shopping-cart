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

  return { uploadFiles, isLoading, error };
};
