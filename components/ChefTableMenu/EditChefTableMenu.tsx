import { yupResolver } from '@hookform/resolvers/yup';
import { List } from '@material-ui/core';
import { Button } from 'components/Button';
import { FormField } from 'components/FormField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DashboardRole } from 'services/types';
import * as yup from 'yup';

import { ChefTableMenuOptions } from '.';
import styles from './ChefTableMenu.module.scss';

interface EditChefTableMenuProps {
  chefPrice?: string | number;
  price?: string | number;
  spots?: string | number;
  onCancel: () => void;
  onSave: (fields: ChefTableMenuOptions) => void;
  role?: DashboardRole;
  menuName?: string;
  menuNameAr?: string;
  acceptLanguage?: 'en' | 'ar';
}

export const EditChefTableMenu: React.FC<EditChefTableMenuProps> = ({
  onCancel,
  onSave,
  spots,
  price,
  chefPrice,
  menuName,
  menuNameAr,
  acceptLanguage = 'en',
  role = DashboardRole.STAFF,
}) => {
  const { errors, register, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        chefPrice: yup
          .number()
          .positive('Chef price must be a positive number')
          .typeError('Chef price must be a number')
          .required('Chef price is required'),
        spots: yup
          .number()
          .integer()
          .positive('Spots must be a positive number')
          .typeError('Spots must be a number')
          .required('Spots is required'),
        ...(role === DashboardRole.STAFF
          ? {
              price: yup
                .number()
                .positive('Price must be a positive number')
                .typeError('Price must be a number')
                .required('Price is required'),
            }
          : {}),
        name: yup.string().required('Menu name is required'),
        ...(acceptLanguage === 'ar' && { name__ar: yup.string().required('Menu name is required') }),
      }),
    ),
  });

  return (
    <List>
      <div>
        <FormField
          defaultValue={String(acceptLanguage === 'en' ? menuName ?? '' : menuNameAr ?? '')}
          error={errors.name?.message}
          name={acceptLanguage === 'en' ? 'name' : 'name__ar'}
          label="Menu name"
          register={register}
          placeholder="Menu name"
        />
        <input
          name={acceptLanguage === 'ar' ? 'name' : 'name__ar'}
          value={String(acceptLanguage === 'ar' ? menuName ?? '' : menuNameAr ?? '')}
          ref={register}
          hidden
        />
      </div>
      <div className={styles.optionEditingForm}>
        <FormField
          defaultValue={String(chefPrice ?? '')}
          error={errors.chefPrice?.message}
          name="chefPrice"
          label="Chef price"
          register={register}
          placeholder="100"
          suffix="AED"
          className="inputNum"
        />

        <div hidden={role === DashboardRole.CHEF}>
          <FormField
            defaultValue={String(price ?? '')}
            error={errors.price?.message}
            name="price"
            label="unknown Price"
            register={register}
            placeholder="100"
            suffix="AED"
            className="inputNum"
          />
        </div>
        <FormField
          defaultValue={String(spots ?? '')}
          error={errors.spots?.message}
          name="spots"
          label="# of spots"
          register={register}
          placeholder="100"
          className="inputNum"
        />
      </div>
      <div className={styles.optionEditingFormActions}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" className="ml-20" onClick={handleSubmit(onSave)}>
          Save
        </Button>
      </div>
    </List>
  );
};
