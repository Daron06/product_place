import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import { Icon } from '../../../Icon';
import styles from './UploadImages.module.scss';

interface UploadedFileViewProps {
  imageUrl?: string;
  isLoading?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const UploadedFileView: React.FC<UploadedFileViewProps> = ({
  imageUrl,
  isLoading,
  onRemove,
  children,
  className,
}): React.ReactElement => {
  return (
    <div
      style={
        imageUrl
          ? {
              backgroundImage: !imageUrl?.includes('blob')
                ? `url(${imageUrl}?width=${130 * 2}&height=${60 * 2})`
                : `url(${imageUrl})`,
            }
          : {}
      }
      className={clsx(styles.uploadedImage, className, { [styles.uploadedImageLoading]: isLoading })}
    >
      {isLoading && <CircularProgress size={28} />}
      {!isLoading && children}
      {onRemove && (
        <div onClick={onRemove} className={styles.uploadedImageRemoveButton}>
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
      )}
    </div>
  );
};
