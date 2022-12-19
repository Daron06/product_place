import React from 'react';

import { UploadBlockView } from '../UploadImages/UploadBlockView';

interface UploadFileViewProps {
  onClick: () => void;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
  title: string;
}

export const UploadFileView: React.FC<UploadFileViewProps> = ({
  onClick,
  onSelectFile,
  inputRef,
  title,
}): React.ReactElement => (
  <UploadBlockView onClick={onClick} onSelectFile={onSelectFile} ref={inputRef} title={title} />
);
