/* eslint-disable react/no-array-index-key */
import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import React from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';

import { Icon } from '../../../Icon';
import { ImageObj } from './types';
import styles from './UploadImages.module.scss';

interface UploadImagesViewProps {
  onClickUpload: () => void;
  onRemoveImage: (imageObj: ImageObj, event?: React.MouseEvent) => void;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  images: ImageObj[];
  error?: string;
  control?: UseFormMethods['control'];
  controllable: boolean;
  maxImageCount: number;
  mode?: 'avatar' | 'images';
}

export const UploadImagesView = React.forwardRef<HTMLInputElement, UploadImagesViewProps>(function UploadImagesView(
  { controllable, onClickUpload, onSelectFile, images, maxImageCount, mode, onRemoveImage, error, control },
  ref,
): React.ReactElement {
  return (
    <>
      <div className={styles.filesList}>
        {maxImageCount > images.length && (
          <div className={clsx({ [styles.uploadBlock]: mode === 'images' })} onClick={onClickUpload}>
            <input
              onChange={onSelectFile}
              type="file"
              ref={ref}
              style={{ display: 'none' }}
              data-id-test="upload-image"
              accept=".jpg, .jpeg, .png"
            />

            {mode === 'images' ? (
              <>
                <Icon type="plus-green" />
                <span className={styles.uploadBlockText}>Upload Images</span>
              </>
            ) : (
              <div className="position-r">
                <div className={!images[0] || images[0]?.isLoading ? styles.avatarUploader : ''}>
                  {!images[0] && (
                    <div className={styles.cameraIcon}>
                      <Icon type="camera" />
                    </div>
                  )}
                  <div className={styles.avatarLoader}>{images[0]?.isLoading && <CircularProgress size={28} />}</div>
                  <Avatar style={{ width: 140, height: 140 }} src={images[0]?.url} />
                </div>

                {images[0] && (
                  <div
                    onClick={(event): void => onRemoveImage(images[0], event)}
                    className={styles.avatarUploaderRemoveIcon}
                  >
                    <Icon
                      height={22}
                      width={22}
                      viewBox={{
                        height: 22,
                        width: 22,
                      }}
                      type="close"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {mode !== 'avatar' &&
          images.map((image, index) => (
            <div
              key={index}
              style={{
                backgroundImage: image.url.includes('blob')
                  ? `url(${image.url}`
                  : `url(${image.url}?width=${130 * 2}&height=${60 * 2})`,
              }}
              className={clsx(styles.uploadedImage, { [styles.uploadedImageLoading]: image.isLoading })}
            >
              {image.isLoading && <CircularProgress size={28} />}
              <div onClick={(): void => onRemoveImage(image)} className={styles.uploadedImageRemoveButton}>
                <Icon
                  height={12}
                  width={12}
                  viewBox={{
                    height: 22,
                    width: 22,
                  }}
                  type="close"
                />
              </div>
              {controllable && (
                <Controller
                  control={control}
                  name={`media[${index}]`}
                  defaultValue={image}
                  render={({ value, name }): React.ReactElement => (
                    <input
                      type="text"
                      data-id-test="upload-image-value"
                      name={name}
                      style={{ display: 'none' }}
                      value={value}
                      readOnly
                    />
                  )}
                />
              )}
            </div>
          ))}
      </div>
      {error && (
        <p className="error-label" data-test-id="upload-image--error-message">
          {error}
        </p>
      )}
    </>
  );
});
