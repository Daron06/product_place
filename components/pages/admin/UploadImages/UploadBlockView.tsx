import React from 'react';

import { Icon } from '../../../Icon';
import styles from './UploadImages.module.scss';

interface UploadBlockViewProps {
  onClick: () => void;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

export const UploadBlockView = React.forwardRef<HTMLInputElement, UploadBlockViewProps>(function UploadBlockView(
  { onClick, onSelectFile, title },
  ref,
): React.ReactElement {
  return (
    <div className={styles.uploadBlock} onClick={onClick}>
      <input onChange={onSelectFile} type="file" ref={ref} style={{ display: 'none' }} data-id-test="upload-image" />
      <Icon type="plus-green" />
      <span className={styles.uploadBlockText}>{title}</span>
    </div>
  );
});
