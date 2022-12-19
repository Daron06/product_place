import { CancelToken } from 'axios';
import Axios from 'core/axios';

import { UploadedImage } from '../components/pages/admin/UploadImages/types';

export const uploadFile = async (
  file: File,
  cancelToken?: CancelToken,
  onProgress?: (value: number) => void,
  uploadUrl?: string,
): Promise<UploadedImage> => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject): void => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      Axios.post<unknown, { data: UploadedImage }>(uploadUrl || '/admin/upload', formData, {
        cancelToken,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress(progressEvent) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percent);
          }
        },
      })
        .then(({ data }): void => resolve(data))
        .catch((err): void => reject(err));
    } catch (err: any) {
      console.warn('UploadFileError', err);
      // eslint-disable-next-line no-underscore-dangle
      if (err.__CANCEL__) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject(null);
      }
      reject(err);
    }
  });
};
