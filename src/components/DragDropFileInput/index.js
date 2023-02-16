import { useState, useRef } from 'react';

import { FaFileUpload, FaFileImage, FaTimesCircle } from 'react-icons/fa';

import styles from './index.module.scss';

const DragDropFileInput = ({
  name,
  title,
  type,
  files,
  handleImagesInput,
  handleDeleteImage,
  className,
  dropzoneClassName,
  fileListClassName,
}) => {
  const icon = {
    image: <FaFileImage />,
  };

  const [isDragging, setIsDragging] = useState(false);

  const hiddenInputRef = useRef();

  const handleClick = (e) => {
    hiddenInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImagesInput(e);
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
              ? `${files.length} files have been selected`
              : `${files.length} file has been selected`}
          </p>
        )}
        <input
          type="file"
          multiple
          onChange={handleImagesInput}
          ref={hiddenInputRef}
          name={name}
          hidden
          accept="image/*"
        />
      </div>
      {files.length > 0 && (
        <ul className={`${styles.files_list} ${fileListClassName}`}>
          {files.map((file) => (
            <li key={file.name}>
              <i>{icon[type]}</i>
              <p>{file.name}</p>
              <i
                onClick={() => handleDeleteImage(file.name)}
                className={styles.delete}
              >
                <FaTimesCircle />
              </i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DragDropFileInput;
