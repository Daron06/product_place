import { FieldError } from 'react-hook-form';

import { BlogItem } from '../../../../services/types';
import { UploadedImage } from '../UploadImages/types';

export interface BlogCreateProps {
  title: string;
  blogData?: BlogItem;
  isEditing?: boolean;
}

export interface BlogCreateFieldsProps {
  title: string;
  description: string;
  image: UploadedImage[] & FieldError;
  short_description: string;
  category_id: number;
}
