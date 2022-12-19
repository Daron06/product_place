import React from 'react';

import { AcceptedType, useFileUpload } from '../../../../hooks/useFileUpload';
import { ErrorText } from '../../../ErrorText';
import { Icon } from '../../../Icon';
import { UploadedFileView } from '../UploadImages/UploadedFileView';
import styles from './UploadFile.module.scss';
import { UploadFileView } from './View';

interface UploadFileProps {
  onSuccessUpload: (url: string) => void;
  error?: string;
  value?: string | null;
  title: string;
  acceptedTypes?: AcceptedType[];
  isPDF?: boolean;
  testId?: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({
  onSuccessUpload,
  error,
  value,
  acceptedTypes,
  title,
  isPDF,
  testId,
}): React.ReactElement => {
  const { files, inputRef, onClickUpload, onRemoveFile, onSelectFile } = useFileUpload({
    acceptedTypes,
    value: value ? [{ id: '', name: '', url: value || '' }] : undefined,
  });
  const file = files[0];

  React.useEffect(() => {
    if (file) {
      onSuccessUpload(file.url);
    }
  }, [file]);

  const handleRemoveFile = (): void => {
    if (file) {
      onRemoveFile(0);
      onSuccessUpload('');
    }
  };

  let uploadFileView: React.ReactElement;

  if (!file) {
    uploadFileView = (
      <UploadFileView onClick={onClickUpload} onSelectFile={onSelectFile} inputRef={inputRef} title={title} />
    );
  } else if (isPDF) {
    uploadFileView = (
      <UploadedFileView className={styles.block} isLoading={file.isLoading} onRemove={handleRemoveFile}>
        <Icon type="pdf" />
      </UploadedFileView>
    );
  } else {
    uploadFileView = (
      <UploadedFileView
        className={styles.block}
        isLoading={file.isLoading}
        onRemove={handleRemoveFile}
        imageUrl={file.url}
      />
    );
  }

  return (
    <div data-test-id={testId}>
      {uploadFileView}
      {error && <ErrorText focus>{error}</ErrorText>}
    </div>
  );
};
