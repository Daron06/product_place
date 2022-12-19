import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { Category, StatusEnum } from 'services/types';

import { BlogCategoriesApi } from '../../../../services/api/admin/BlogCategoriesApi';
import { CreateCategorySchema } from '../../../../utils/validationSchemas/admin/createCategorySchema';
import { ApproveCategory } from '../ApproveCategory';
import { UploadedImage } from '../UploadImages/types';

export interface CategoryStaffCreateProps {
  category?: Category;
}

export interface CategoryStaffCreateFieldsProps {
  name: string;
  status: StatusEnum | string;
  image?: string & FieldError;
}

export const BlogCategoryCreate: React.FC<CategoryStaffCreateProps> = ({ category }): React.ReactElement => {
  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];

  const form = useForm<CategoryStaffCreateFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateCategorySchema),
    defaultValues: {
      name: category?.name,
      status: category?.status ?? StatusEnum.ACTIVE,
      image: category?.image ?? '',
    },
  });

  React.useEffect(() => {
    form.register('image');
  }, []);

  const addCategory = async (data: CategoryStaffCreateFieldsProps): Promise<void> => {
    try {
      await BlogCategoriesApi.add(data);
    } catch (error) {
      console.warn('addCategory:', error);
    }
  };

  const updateCategory = async (id: string, params: CategoryStaffCreateFieldsProps): Promise<void> => {
    try {
      await BlogCategoriesApi.update(id, params);
    } catch (error) {
      console.warn('updateRequest:', error);
    }
  };

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      form.setValue('image', img.url, { shouldValidate: true });
    }
  };

  const handleDeleteImage = (): void => {
    form.setValue('image', undefined, { shouldValidate: true });
  };

  const categoryImage = category?.image
    ? [
        {
          url: category.image,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  const onSubmit = async (fields: CategoryStaffCreateFieldsProps): Promise<void> => {
    const data = {
      name: fields.name,
      status: fields.status,
      image: fields.image,
    };
    if (category) {
      await updateCategory(String(category.id), data);
    } else {
      await addCategory(data);
    }
    await push(pathRouter);
  };

  return (
    <FormProvider {...form}>
      <ApproveCategory
        title="New category"
        data={category}
        onSubmit={onSubmit}
        image={categoryImage}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
      />
    </FormProvider>
  );
};
