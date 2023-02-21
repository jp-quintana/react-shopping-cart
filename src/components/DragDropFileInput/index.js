import { useState, useRef } from 'react';

import {
  FaFileUpload,
  FaFileImage,
  FaTimesCircle,
  FaEllipsisH,
} from 'react-icons/fa';

import styles from './index.module.scss';

const DragDropFileInput = ({
  name,
  title,
  type,
  files,
  accept,
  handleFileInput,
  handleDeleteFile,
  className,
  dropzoneClassName,
  fileListClassName,
  previewFiles,
  previewImages,
}) => {
  const icon = {
    image: <FaFileImage />,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const hiddenInputRef = useRef();

  const handleClick = (e) => {
    hiddenInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleFileInput(e);
    setIsLoading(false);
    setIsDragging(false);
  };

  return (
    <div className={className}>
      <div
        className={`${styles.dropzone} ${dropzoneClassName} ${
          isDragging ? styles.dragging : ''
        }`}
        onClick={handleClick}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <>
          {isLoading && (
            <>
              <p className={styles.legend}>Uploading</p>
              <i>
                <FaEllipsisH />
              </i>
            </>
          )}
          {!isLoading && (
            <>
              <i>
                <FaFileUpload />
              </i>
              {files.length === 0 && (
                <>
                  <p className={styles.legend}>Choose {title || 'Files'}</p>
                </>
              )}
              {files.length > 0 && (
                <p className={styles.legend}>
                  {files.length > 1
                    ? `${files.length} files have been uploaded`
                    : `${files.length} file has been uploaded`}
                </p>
              )}
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                ref={hiddenInputRef}
                name={name}
                hidden
                accept={accept}
              />
            </>
          )}
        </>
      </div>
      {previewFiles && (
        <>
          {files.length > 0 && (
            <ul className={`${styles.files_list} ${fileListClassName}`}>
              {files.map((file) => (
                <li key={file.name}>
                  <i>{icon[type]}</i>
                  <p>{file.name}</p>
                  <i
                    onClick={() => handleDeleteFile(file.name)}
                    className={styles.delete}
                  >
                    <FaTimesCircle />
                  </i>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {previewImages && (
        <>
          {files.length > 0 && (
            <ul className={`${styles.images_list} ${fileListClassName}`}>
              {files.map((file) => (
                <li key={file.name}>
                  <img src={file.src} alt="" />
                  <i
                    onClick={() => handleDeleteFile(file.name)}
                    className={styles.delete}
                  >
                    <FaTimesCircle />
                  </i>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default DragDropFileInput;
