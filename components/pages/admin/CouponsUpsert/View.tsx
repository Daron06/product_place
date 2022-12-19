import { Divider } from '@material-ui/core';
import { FormField } from 'components/FormField';
import ProfileDate from 'components/ProfileDate';
import { Select } from 'components/Select';
import React from 'react';
import { Controller, useFormContext, UseFormMethods } from 'react-hook-form';
import { Chef, StatusArr } from 'redux/ducks/products/types/contracts';
import { StatusEnum } from 'services/types';

import { AutocompleteChefsList } from '../../../AutocompleteChefsList';
import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { AdminEditingHeader } from '../AdminEditingHeader';
import styles from './AdminCouponsUpsertView.module.scss';
import { CouponSections } from './CouponSections';

export enum CouponTypeEnum {
  AMOUNT = 'amount',
  DISCOUNT = 'discount',
}

const couponType = [
  {
    id: '1',
    value: CouponTypeEnum.DISCOUNT,
    name: '% discount',
  },
  {
    id: '2',
    value: CouponTypeEnum.AMOUNT,
    name: 'Amount',
  },
];

interface AdminCouponsUpsertViewProps {
  isEditing: boolean;
  title: string;
  handleSubmit: ReturnType<UseFormMethods<AdminCouponsUpsertViewProps>['handleSubmit']>;
  status?: StatusEnum;
  chefs?: Chef[];
}

export const AdminCouponsUpsertView: React.FC<AdminCouponsUpsertViewProps> = ({
  isEditing,
  title,
  handleSubmit,
  status,
  chefs,
}) => {
  const { register, setValue, errors, watch, control } = useFormContext();
  const { type } = watch();

  const handleChangeAutocomplete = (value: Chef[]): void => {
    setValue('chefs', value, { shouldValidate: true });
  };

  return (
    <div className="p-30">
      <AdminEditingHeader isEditing={isEditing} title={title} onSubmit={handleSubmit} />
      <div className={styles.root}>
        <section className={styles.rootSection}>
          <WhiteBlock className="p-20 mb-30">
            <div className={styles.generateCouponWrapper}>
              <FormField label="Code" name="code" placeholder="Enter code" register={register} showError={false} />
              <button
                className={styles.generateCouponButton}
                type="button"
                onClick={(): void =>
                  setValue('code', Math.random().toString(36).toUpperCase().replace('0.', ''), { shouldValidate: true })
                }
              >
                Generate coupon code
              </button>
            </div>
            {errors.code?.message && <p style={{ color: 'red', marginTop: -10 }}>{errors.code?.message}</p>}

            <FormField
              label="Description (optional)"
              name="description"
              placeholder="Enter notes"
              register={register}
              error={errors.description?.message}
              textarea
            />

            <p style={{ marginBottom: 0, fontWeight: 700, fontSize: '13px' }}>Coupon type</p>
            <div className={styles.generateCouponWrapper}>
              <Controller
                control={control}
                name="type"
                render={({ value }): React.ReactElement => (
                  <Select
                    value={value || couponType[0].value}
                    items={couponType}
                    placeholder="Coupon type"
                    onChange={(e): void => setValue('type', e.target.value, { shouldValidate: true })}
                  />
                )}
              />

              <FormField
                suffix={type === 'discount' ? '%' : 'AED'}
                register={register}
                name="value"
                showError={false}
                type="number"
                className={`${styles.couponTypeValue} inputNum`}
              />
            </div>
            {errors.value?.message && (
              <p style={{ color: 'red', marginTop: -10, marginLeft: 205 }}>{errors.value?.message}</p>
            )}

            <FormField
              name="maxUsesCount"
              register={register}
              type="number"
              error={errors.maxUsesCount?.message}
              placeholder="0"
              label="Maximum number of uses"
              className={styles.maxCountUses}
            />
            <ProfileDate type="expirationDate" notEarlier />
          </WhiteBlock>
          <WhiteBlock title="Included" className="p-20 mb-30">
            <p className="fw-bold">Chefs</p>
            <AutocompleteChefsList onChange={handleChangeAutocomplete} items={chefs} name="chef" />

            <Divider className="mt-20 mb-20" />

            <p className="fw-bold">Sections</p>
            <CouponSections />
          </WhiteBlock>
        </section>
        <aside>
          <WhiteBlock title="Status" className="p-20">
            <Select
              name="status"
              defaultValue={status}
              items={StatusArr.map(({ slug, name }) => ({ value: slug, name }))}
              onChange={(e): void => setValue('status', e.target.value, { shouldValidate: true })}
              fullWidth
            />
          </WhiteBlock>
        </aside>
      </div>
    </div>
  );
};
