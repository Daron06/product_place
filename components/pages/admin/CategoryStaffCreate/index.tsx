import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import type { FieldError } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { Category, StatusEnum } from 'services/types';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';

import { CategoriesApi } from '../../../../services/api/admin/CategoriesApi';
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

export const CategoryStaffCreate: React.FC<CategoryStaffCreateProps> = ({ category }): React.ReactElement => {
  const [addedUpdatedItem, setAddedUpdatedItem] = React.useState<Category>();
  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];
  const { openAlert } = useAlert();

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
      const { data: addedCategory } = await CategoriesApi.add(data);
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(addedCategory);
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });
        openAlert(
          `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
            .map((el) => el.message)
            .join(', ')}`,
          'error',
        );
      } else {
        openAlert(`An error occurred while saving: ${error?.message}`, 'error');
        console.error(error);
      }
    }
  };

  const updateCategory = async (id: string, params: CategoryStaffCreateFieldsProps): Promise<void> => {
    try {
      const { data: updatedCategory } = await CategoriesApi.update({ id, params });
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(updatedCategory);
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });
        openAlert(
          `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
            .map((el) => el.message)
            .join(', ')}`,
          'error',
        );
      } else {
        openAlert(`An error occurred while saving: ${error?.message}`, 'error');
        console.error(error);
      }
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
  };

  React.useEffect(() => {
    if (addedUpdatedItem && !category) {
      const redirectUrl = `${pathRouter}/edit/${addedUpdatedItem.id}`;
      push(redirectUrl);
    }
  }, [addedUpdatedItem]);

  return (
    <FormProvider {...form}>
      <ApproveCategory
        title={category ? category.name : 'New category'}
        data={category}
        onSubmit={onSubmit}
        image={categoryImage}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
      />
    </FormProvider>
  );
};
