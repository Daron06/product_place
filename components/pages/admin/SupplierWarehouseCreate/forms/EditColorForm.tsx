import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { FormField } from 'components/FormField';
import { Select } from 'components/Select';
import React from 'react';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { DashboardRole, OptionVariants } from 'services/types';
import * as yup from 'yup';

import styles from '../SupplierWarehouseCreate.module.scss';

export interface EditColorFormFields {
  id?: string;
  msrpPrice: number;
  supplierPrice: number;
  chefPrice: number;
  price: number;
}

interface EditColorFormProps<T> {
  supplierPrice?: string | number;
  chefPrice?: string | number;
  msrpPrice?: string | number;
  price?: string | number;
  sku?: string | number;
  inventory?: string | number;
  onCancel: () => void;
  onSave: (fields: UnpackNestedValue<T>) => void;
  options?: OptionVariants[];
  isEditing?: boolean;
  role?: DashboardRole;
}

export function EditColorForm<T = EditColorFormFields>({
  onCancel,
  onSave,
  supplierPrice,
  chefPrice,
  msrpPrice,
  price,
  options,
  sku,
  inventory,
  isEditing = false,
  role,
}: EditColorFormProps<T>): React.ReactElement {
  const { errors, register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        id: isEditing ? yup.string() : yup.string().required('Variation type is required'),
        msrpPrice: yup
          .number()
          .positive('MSRP price must be a positive number')
          .typeError('MSRP price must be a number')
          .required('MSRP price is required'),
        inventory: yup
          .number()
          .integer()
          .positive('Inventory must be a positive number')
          .typeError('Inventory must be a number')
          .required('Inventory is required'),
        sku: yup.string().required('SKU is required'),
        supplierPrice: yup
          .number()
          .positive('Vendor price must be a positive number')
          .typeError('Vendor price must be a number')
          .required('Vendor price  is required'),
        ...(role === DashboardRole.STAFF
          ? {
              chefPrice: yup
                .number()
                .positive('Chef commission must be a positive number')
                .typeError('Chef commission must be a number')
                .required('Chef commission is required'),
            }
          : {}),
        ...(role === DashboardRole.STAFF
          ? {
              price: yup
                .number()
                .positive('Price must be a positive number')
                .typeError('Price must be a number')
                .required('Price is required'),
            }
          : {}),
        name: yup.string(),
      }),
    ),
  });

  React.useEffect(() => {
    register('id');
  }, []);

  return (
    <>
      {options && (
        <Select
          items={options.map((val) => ({
            name: val.name,
            value: String(val.id),
          }))}
          placeholder="Select color"
          onChange={(event): void => setValue('id', event.target.value as string, { shouldValidate: true })}
          error={errors.id?.message}
        />
      )}
      <div className={styles.optionEditingForm}>
        <input name="name" value="color" ref={register} hidden />
        {role === DashboardRole.STAFF && (
          <FormField
            defaultValue={String(chefPrice ?? '')}
            name="chefPrice"
            label="Chef commission"
            error={errors.chefPrice?.message}
            register={register}
            placeholder="100"
            suffix="AED"
            className="inputNum"
          />
        )}
        <FormField
          defaultValue={String(msrpPrice ?? '')}
          error={errors.msrpPrice?.message}
          name="msrpPrice"
          label="MSRP price"
          register={register}
          placeholder="100"
          suffix="AED"
          className="inputNum"
        />
        <FormField
          defaultValue={String(supplierPrice ?? '')}
          error={errors.supplierPrice?.message}
          name="supplierPrice"
          label={role === DashboardRole.STAFF ? 'Vendor price' : 'Price'}
          register={register}
          placeholder="100"
          suffix="AED"
          className="inputNum"
        />
        {role === DashboardRole.STAFF && (
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
        )}
        <FormField
          defaultValue={String(inventory ?? '')}
          error={errors.inventory?.message}
          name="inventory"
          label="Inventory"
          register={register}
          placeholder="Number of items in stock"
          className="inputNum"
        />
        <FormField
          defaultValue={String(sku ?? '')}
          error={errors.sku?.message}
          name="sku"
          label="Sku"
          register={register}
          placeholder="Stock keeping unit"
        />
        <div className={styles.optionEditingFormActions}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" className="ml-20" onClick={handleSubmit(onSave)}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
