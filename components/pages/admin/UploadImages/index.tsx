import useSet from 'ahooks/lib/useSet';
import Axios from 'axios';
import React from 'react';
import { useFormContext, UseFormMethods } from 'react-hook-form';

import { useAlert } from '../../../../hooks/useAlert';
import { uploadFile } from '../../../../utils/uploadFile';
import { MenuCreateViewProps } from '../MenuCreate/types';
import { ImageObj, UploadedImage } from './types';
import { UploadImagesView } from './View';

interface UploadImagesProps extends Pick<MenuCreateViewProps, 'onChangeImages'> {
  controllable?: boolean;
  control?: UseFormMethods['control'];
  error?: string;
  images?: UploadedImage[];
  maxImageCount?: number;
  mode?: 'avatar' | 'images';
  onDeleteImage?: (data: ImageObj) => void;
  uploadUrl?: string;
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  controllable = true,
  maxImageCount = 10,
  mode = 'images',
  onChangeImages,
  onDeleteImage,
  error,
  images: uploadedImages,
  control,
  uploadUrl = '/admin/upload/image',
}): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { register, formState } = useFormContext();
  const { openAlert } = useAlert();

  const [images, { add, remove }] = useSet<ImageObj>(
    uploadedImages
      ? uploadedImages.map((item) => ({
          url: item.url,
          name: item.name,
        }))
      : [],
  );

  const onClickUpload = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  React.useEffect(() => {
    register('media');
  }, []);

  React.useEffect(() => {
    onChangeImages([...images] as UploadedImage[]);
  }, [images]);

  const onRemoveImage = (imageObj: ImageObj, event?: React.MouseEvent): void => {
    event?.stopPropagation();
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to cancel the upload?')) {
      if (imageObj.cancelTokenSource) {
        imageObj.cancelTokenSource.cancel();
      }

      remove(imageObj);

      if (onDeleteImage) {
        onDeleteImage(imageObj);
      }
    }
  };

  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (typeof window !== 'undefined' && event.target.files) {
      const file = event.target.files[0];
      const maxSize = file.size;

      if (maxSize >= 1024 ** 2 * 10) {
        openAlert('Image is too large', 'error');
        return;
      }

      if (file) {
        const cancelTokenSource = Axios.CancelToken.source();
        const urlObj = window.URL.createObjectURL(file);
        const placeholderObj: ImageObj = {
          url: urlObj,
          name: '',
          isLoading: true,
          cancelTokenSource,
        };
        add(placeholderObj);
        try {
          const uploadedFile = await uploadFile(file, cancelTokenSource.token, undefined, uploadUrl);
          if (uploadedFile && !(uploadedFile instanceof Error)) {
            remove(placeholderObj);
            if (!uploadedFile.url.includes('blob')) {
              add({
                url: uploadedFile.url,
                name: uploadedFile.name,
              });
            }
          }
        } catch (err) {
          // openAlert(err, 'error');
          console.warn(err);
          remove(placeholderObj);
        }
      }
    }
  };

  return (
    <UploadImagesView
      mode={mode}
      maxImageCount={maxImageCount}
      controllable={controllable}
      ref={inputRef}
      onClickUpload={onClickUpload}
      onRemoveImage={onRemoveImage}
      onSelectFile={onSelectFile}
      images={[...images]}
      error={formState.isSubmitted ? error : ''}
      control={control}
    />
  );
};
