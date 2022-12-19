import Axios, { CancelTokenSource } from 'axios';
import React from 'react';

import { uploadFile } from '../utils/uploadFile';
import { useIsLoading } from './useIsLoading';
import { useList } from './useList';

export type FileObj = {
  id: string | number;
  name: string;
  url: string;
  isLoading?: boolean;
  cancelTokenSource?: CancelTokenSource;
};

type ReturnProps = {
  files: FileObj[];
  inputRef: React.RefObject<HTMLInputElement>;
  onClickUpload: () => void;
  onRemoveFile: (index: number) => boolean;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  setValues: (arr: FileObj[]) => void;
  isLoading: boolean;
};

export type AcceptedType = 'jpg' | 'jpeg' | 'png' | 'pdf' | 'mp4' | 'avi';

const fileTypes: Record<AcceptedType, string> = {
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
  avi: 'video/avi',
};

interface UseFileUploadProps {
  acceptedTypes?: AcceptedType[];
  maxSize?: number;
  value?: FileObj[];
  single?: boolean;
  onSuccess?: () => void;
  onError?: (obj: string) => void;
  onProgress?: (value: number) => void;
  uploadUrl?: string;
}

export function useFileUpload({
  acceptedTypes,
  value = [],
  single,
  uploadUrl,
  onError,
  onSuccess,
  onProgress,
  maxSize,
}: UseFileUploadProps = {}): ReturnProps {
  const { 0: files, 1: add, 2: remove, 4: set } = useList<FileObj>(value);
  const [isLoading, loading, loaded] = useIsLoading(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current && acceptedTypes) {
      inputRef.current.accept = Object.entries(fileTypes)
        .reduce<string[]>((prev, [type, val]) => {
          if (acceptedTypes?.includes(type as AcceptedType)) {
            prev.push(val);
          }
          return prev;
        }, [])
        .join(',');
    }
  }, [acceptedTypes]);

  const onClickUpload = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const onRemoveFile = (index: number): boolean => {
    const response = window.confirm('Are you sure you want to cancel the upload?');
    if (typeof window !== 'undefined' && response) {
      const file = files[index];
      if (file.cancelTokenSource) {
        file.cancelTokenSource.cancel();
      }
      remove({ index });
    }
    return response;
  };

  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (typeof window !== 'undefined' && event.target.files) {
      const file = event.target.files[0];
      const fileType = file.type.split('/')[1];
      let error = '';

      if (acceptedTypes && !acceptedTypes.includes(fileType as AcceptedType)) {
        error = `This file type is not allowed. Only: ${acceptedTypes}`;
      }

      if (maxSize && file.size > maxSize * 1024 * 1024) {
        error = `The file size is too large. Max size: ${maxSize} Mb.`;
      }

      if (error) {
        if (onError) {
          onError(error);
        }
        console.warn(error);
        return;
      }

      if (file) {
        const cancelTokenSource = Axios.CancelToken.source();
        const urlObj = window.URL.createObjectURL(file);
        const placeholderObj: FileObj = {
          id: Math.round(Math.random() * 1000),
          url: urlObj,
          name: '',
          isLoading: true,
          cancelTokenSource,
        };
        if (single) {
          set([placeholderObj]);
        } else {
          add(placeholderObj);
        }
        loading();
        const uploadedFile = await uploadFile(file, cancelTokenSource.token, onProgress, uploadUrl);
        loaded();
        if (onSuccess) {
          onSuccess();
        }
        remove({ id: placeholderObj.id });
        if (uploadedFile && !(uploadedFile instanceof Error)) {
          if (single) {
            set([
              {
                id: uploadedFile.id || placeholderObj.id,
                url: uploadedFile.url,
                name: uploadedFile.name,
              },
            ]);
          } else {
            add({
              id: uploadedFile.id || placeholderObj.id,
              url: uploadedFile.url,
              name: uploadedFile.name,
            });
          }
        } else if (onError) {
          onError('Error uploading file');
        }
      }
    }
  };

  return { files: [...files], inputRef, onClickUpload, onSelectFile, onRemoveFile, setValues: set, isLoading };
}
