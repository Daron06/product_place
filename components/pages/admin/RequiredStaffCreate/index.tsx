import { yupResolver } from '@hookform/resolvers/yup';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import type { FieldError } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { RequiredApi } from 'services/api/admin/RequiredApi';
import { RequiredType, StatusEnum } from 'services/types';
import { CreateRequiredSchema } from 'utils/validationSchemas/admin/createRequiredSchema';

import { ApproveRequired } from '../ApproveRequired';

export interface RequiredStaffCreateProps {
  required?: RequiredType;
}

export interface RequiredStaffCreateFieldsProps {
  name: string;
  image?: string & FieldError;
  status: StatusEnum | string;
}

export const RequiredStaffCreate: React.FC<RequiredStaffCreateProps> = ({ required }): React.ReactElement => {
  const [addedUpdatedItem, setAddedUpdatedItem] = React.useState<RequiredType>();

  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];
  const { openAlert } = useAlert();

  const form = useForm<RequiredStaffCreateFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateRequiredSchema),
    defaultValues: {
      image: required?.image ?? '',
      name: required?.name,
      status: required?.status ?? StatusEnum.ACTIVE,
    },
  });

  const addNewRequired = async (data: RequiredStaffCreateFieldsProps): Promise<void> => {
    try {
      const { data: addedRequared } = await RequiredApi.add(data);
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(addedRequared);
    } catch (error) {
      console.warn('addNewRequired:', error);
    }
  };

  const updateRequiredRequest = async (id: string, params: RequiredStaffCreateFieldsProps): Promise<void> => {
    try {
      const { data: updatedRequared } = await RequiredApi.update({ id, params });
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(updatedRequared);
    } catch (error) {
      console.warn('updateRequiredRequest:', error);
    }
  };

  React.useEffect(() => {
    form.register('image');
  }, []);

  const onSubmit = async (fields: RequiredStaffCreateFieldsProps): Promise<void> => {
    const data = {
      name: fields.name,
      image: fields.image,
      status: fields.status,
    };

    if (required) {
      await updateRequiredRequest(String(required.id), data);
    } else {
      await addNewRequired(data);
    }
  };

  React.useEffect(() => {
    if (addedUpdatedItem && !required) {
      const redirectUrl = `${pathRouter}/edit/${addedUpdatedItem.id}`;
      push(redirectUrl);
    }
  }, [addedUpdatedItem]);

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      form.setValue('image', img.url, { shouldValidate: true });
    }
  };

  const handleDeleteImage = (): void => {
    form.setValue('image', undefined, { shouldValidate: true });
  };

  const requiredImage = required?.image
    ? [
        {
          url: required.image,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  return (
    <FormProvider {...form}>
      <ApproveRequired
        title={required ? required.name : 'New required'}
        data={addedUpdatedItem || required}
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        requiredImage={requiredImage}
        onDeleteImage={handleDeleteImage}
      />
    </FormProvider>
  );
};
