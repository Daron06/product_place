import { CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useAlert } from '../../hooks/useAlert';
import { useFileUpload } from '../../hooks/useFileUpload';
import { Icon } from '../Icon';
import styles from './AvatarUpload.module.scss';

interface AvatarUploadProps {
  classes?: {
    avatar?: string;
  };
  onUpload?: (uploadedAvatar: string) => void;
  onDeleteImage?: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ classes, onUpload, onDeleteImage }) => {
  const { formState, errors, watch, register, setValue } = useFormContext();
  const { openAlert } = useAlert();
  const isMounted = React.useRef(false);
  const { files, inputRef, onClickUpload, onRemoveFile, onSelectFile, setValues, isLoading } = useFileUpload({
    acceptedTypes: ['jpeg', 'jpg', 'png'],
    value: [],
    single: true,
    onSuccess: () =>
      openAlert(
        <>
          The avatar has been uploaded successfully. Click the <b>Submit</b> button to save your changes.
        </>,
        'success',
      ),
  });

  const initialAvatar = watch('image');
  const uploadedAvatar = files?.[0]?.url;

  React.useEffect(() => {
    register('image');
  }, []);

  React.useEffect(() => {
    if (initialAvatar && !isMounted.current) {
      setValues([{ id: 0, url: initialAvatar, name: '' }]);
      isMounted.current = true;
    }
  }, [initialAvatar]);

  React.useEffect(() => {
    setValue('image', uploadedAvatar, { shouldValidate: true, shouldDirty: true });
    if (uploadedAvatar !== initialAvatar) {
      onUpload?.(uploadedAvatar);
    }
  }, [uploadedAvatar]);

  const handleDeleteImage = (): void => {
    if (onDeleteImage) {
      onDeleteImage();
    }
    onRemoveFile(0);
  };

  return (
    <div className="d-flex flex-column text-center">
      <div className={clsx(classes?.avatar, styles.wrapper)}>
        {files.length > 0 && (
          <div className={styles.removeBtnWr}>
            <IconButton className={styles.removeBtn} onClick={handleDeleteImage}>
              <Icon type="close" />
            </IconButton>
          </div>
        )}
        <div
          onClick={onClickUpload}
          className={clsx(classes?.avatar, styles.avatarImg, { [styles.avatarImgLoading]: isLoading })}
        >
          <div className={styles.avatarLoader}>{isLoading && <CircularProgress size={28} />}</div>
          <img
            src={`${
              uploadedAvatar
                ? `${isLoading ? `${uploadedAvatar}` : `${uploadedAvatar}?width=150&height=150`}`
                : '/static/no_avatar.svg'
            }`}
            alt="Avatar"
          />
          {!isLoading && (
            <svg
              className={styles.avatarPlaceholder}
              style={{ display: 'none' }}
              width="30"
              height="26"
              viewBox="0 0 30 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1923 0.0800781C9.57203 0.0800781 8.1775 1.22227 7.85875 2.80805L7.58516 4.16008H4.11875C2.24078 4.16008 0.71875 5.68211 0.71875 7.56008V21.8401C0.71875 23.718 2.24078 25.2401 4.11875 25.2401H25.8787C27.7567 25.2401 29.2787 23.718 29.2787 21.8401V7.56008C29.2787 5.68211 27.7567 4.16008 25.8787 4.16008H22.4123L22.1388 2.80805C21.82 1.22227 20.4255 0.0800781 18.8052 0.0800781H11.1923ZM14.9987 7.56008C18.752 7.56008 21.7987 10.6068 21.7987 14.3601C21.7987 18.1134 18.752 21.1601 14.9987 21.1601C11.2455 21.1601 8.19875 18.1134 8.19875 14.3601C8.19875 10.6068 11.2455 7.56008 14.9987 7.56008ZM14.9987 8.92008C11.9998 8.92008 9.55875 11.3612 9.55875 14.3601C9.55875 17.359 11.9998 19.8001 14.9987 19.8001C17.9977 19.8001 20.4387 17.359 20.4387 14.3601C20.4387 11.3612 17.9977 8.92008 14.9987 8.92008Z"
                fill={uploadedAvatar ? 'white' : 'black'}
                fillOpacity="0.7"
              />
            </svg>
          )}
        </div>
        <input type="file" ref={inputRef} onChange={onSelectFile} hidden />
      </div>
      {formState?.isSubmitted && errors?.image?.message && <p className="error-label">{errors.image?.message}</p>}
    </div>
  );
};
