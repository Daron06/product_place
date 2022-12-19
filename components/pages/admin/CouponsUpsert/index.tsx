import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Chef } from 'redux/ducks/products/types/contracts';
import { Coupon, CouponsApi } from 'services/api/admin/CouponsApi';
import { StatusEnum } from 'services/types';
import { CreateCouponSchema } from 'utils/validationSchemas/admin/createCouponSchema';

import { AdminCouponsUpsertView } from './View';

interface CouponsUpsertProps {
  coupon?: Coupon;
  title: string;
}

export interface CouponsUpsertFieldsProps {
  code: string;
  status: StatusEnum | string;
  chefs: Chef[];
  sections: string[];
  expirationDate: string;
  maxUsesCount: string;
  type: string;
  description?: string;
  value: string;
}

export type CouponsNormalize = Omit<CouponsUpsertFieldsProps, 'chefs'> & { chefs: { id: string }[] };

export enum ProductTypesCoupon {
  warehouse = 'warehouse',
  chefStore = 'chefStore',
  chefTable = 'chefTable',
  masterClass = 'masterClass',
  menu = 'menu',
  recipe = 'recipe',
}

export const CouponsUpsert: React.FC<CouponsUpsertProps> = ({ title, coupon }): React.ReactElement => {
  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];
  const { openAlert } = useAlert();

  const form = useForm<CouponsUpsertFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateCouponSchema),
    defaultValues: {
      code: coupon?.code,
      status: coupon?.status || StatusEnum.ACTIVE,
      chefs: coupon?.chefs || [],
      sections: coupon?.sections || [],
      expirationDate: coupon?.expirationDate && format(new Date(coupon.expirationDate), 'MM-dd-yyyy'),
      maxUsesCount: coupon?.maxUsesCount,
      type: coupon?.type || 'discount',
      description: coupon?.description,
      value: coupon?.value,
    },
  });

  const { register, handleSubmit } = form;
  const onSubmit = async (fields: CouponsUpsertFieldsProps): Promise<void> => {
    const normalize: CouponsNormalize = {
      ...fields,
      expirationDate: format(new Date(fields.expirationDate), 'MM-dd-yyyy'),
      chefs: [
        ...fields.chefs.map((i) => ({
          id: i.id,
        })),
      ],
    };

    try {
      if (coupon) {
        await CouponsApi.update({ id: coupon.id, params: normalize });
        openAlert('Successfully saved', 'success');
      } else {
        await CouponsApi.add(normalize);
        openAlert('Successfully created', 'success');
        await push(pathRouter);
      }
    } catch (err) {
      openAlert('Error while create coupon', 'error');
      console.warn('Coupon create error', err);
    }
  };

  React.useEffect(() => {
    register('chefs');
    register('status');
    register('type');
    register('sections');
  }, []);

  return (
    <FormProvider {...form}>
      <AdminCouponsUpsertView
        status={coupon?.status || StatusEnum.ACTIVE}
        title={title}
        handleSubmit={handleSubmit(onSubmit)}
        chefs={coupon?.chefs || []}
        isEditing
      />
    </FormProvider>
  );
};
