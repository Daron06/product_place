import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Cuisine } from 'redux/ducks/products/types/contracts';
import { CuisinesApi } from 'services/api/admin/CuisinesApi';
import { StatusEnum } from 'services/types';
import { CreateCuisineSchema } from 'utils/validationSchemas/admin/createCuisineSchema';

import { ApproveRequired } from '../ApproveRequired';
import { RequiredStaffCreateFieldsProps } from '../RequiredStaffCreate';

interface CuisineUpsertProps {
  cuisine?: Cuisine;
}

export const CuisineUpsert: React.FC<CuisineUpsertProps> = ({ cuisine }): React.ReactElement => {
  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];
  const { openAlert } = useAlert();
  const form = useForm<RequiredStaffCreateFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateCuisineSchema),
    defaultValues: {
      name: cuisine?.name,
      status: cuisine?.status ?? StatusEnum.ACTIVE,
    },
  });

  const addNewCuisine = async (data: RequiredStaffCreateFieldsProps): Promise<void> => {
    try {
      await CuisinesApi.add(data);
    } catch (error) {
      console.warn('addNewCuisine:', error);
    }
  };

  const onSubmit = async (fields: RequiredStaffCreateFieldsProps): Promise<void> => {
    const data = {
      name: fields.name,
      status: fields.status,
    };

    try {
      if (cuisine) {
        await CuisinesApi.update({ id: String(cuisine.id), params: data });
      } else {
        await addNewCuisine(data);
      }
      await push(`${pathRouter}`);
      openAlert('Successfully saved', 'success');
    } catch (err) {
      openAlert('Error sending request', 'error');
      console.warn('onSubmit cuisine', err);
    }
  };

  return (
    <FormProvider {...form}>
      <ApproveRequired placeholder="Enter cuisine name" title="New cuisine type" data={cuisine} onSubmit={onSubmit} />
    </FormProvider>
  );
};
