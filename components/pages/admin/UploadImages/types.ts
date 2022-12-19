import { CancelTokenSource } from 'axios';

export interface ImageObj {
  url: string;
  name: string;
  isLoading?: boolean;
  cancelTokenSource?: CancelTokenSource;
}

export interface UploadedImage {
  url: string;
  name: string;
  id: string;
  createdAt?: string;
}
