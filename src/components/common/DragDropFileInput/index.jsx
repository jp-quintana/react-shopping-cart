import { useState, useRef } from 'react';

import {
  FaFileUpload,
  FaFileImage,
  FaTimesCircle,
  FaTimes,
  FaEllipsisH,
} from 'react-icons/fa';

import { CenterModal, ConfirmModal } from 'components/common';

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
  needsConfirmOnDelete,
  additionalConfirmText,
}) => {
  const icon = {
    image: <FaFileImage />,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [fileToBeDeleted, setFileToBeDeleted] = useState(null);

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

  const handleDeleteOnConfirm = () => {
    handleDeleteFile(fileToBeDeleted);
    setFileToBeDeleted(null);
    setIsConfirmOpen(false);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setFileToBeDeleted(null);
  };

  // TODO: Check if preview files works

  return (
    <>
      {needsConfirmOnDelete && (
        <CenterModal
          toggleModal={closeConfirm}
          modalClassName={styles.confirm_modal}
        >
          {isConfirmOpen && (
            <ConfirmModal
              isConfirmOpen={isConfirmOpen}
              handleConfirm={handleDeleteOnConfirm}
              handleCancel={closeConfirm}
              text={`Are you sure you want to delete this ${
                title.split('s')[0] || 'file'
              }? This image will also be removed from any variant currently using it. ${additionalConfirmText}`}
            />
          )}
        </CenterModal>
      )}
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
                      onClick={
                        !needsConfirmOnDelete
                          ? () => handleDeleteFile(file.name)
                          : () => {
                              setIsConfirmOpen(true);
                              setFileToBeDeleted(file.name);
                            }
                      }
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
                      onClick={
                        !needsConfirmOnDelete
                          ? () => handleDeleteFile(file.name)
                          : () => {
                              setIsConfirmOpen(true);
                              setFileToBeDeleted(file.name);
                            }
                      }
                      className={styles.delete}
                    >
                      <FaTimes />
                    </i>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DragDropFileInput;
