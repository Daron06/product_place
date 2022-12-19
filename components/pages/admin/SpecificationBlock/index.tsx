import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FormField } from 'components/FormField';
import { Icon, IconName } from 'components/Icon';
import { AutocompleteTagsField } from 'components/pages/admin/AutocompleteTagsField';
import styles from 'components/pages/admin/MenuCreate/MenuCreate.module.scss';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';
import { ProductInfo } from 'redux/ducks/products/types/contracts';
import { Item } from 'services/types';

export interface SpecificationBlockProps {
  allergens?: Item[];
  allergensOptions: ImmutableDirectoriesState['data']['allergens'];
  productInfo: ProductInfo | null;
  marginZero?: boolean;
  disabled?: boolean;
}

export const SpecificationBlock: React.FC<SpecificationBlockProps> = ({
  allergensOptions,
  productInfo,
  marginZero = false,
  disabled = false,
}) => {
  const { formState, errors, register, setValue, control } = useFormContext();

  React.useEffect(() => {
    register('allergens');
  }, [register]);

  return (
    <div className="pb-20">
      <WhiteBlock marginZero={marginZero} disabled={disabled}>
        <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
          Specification
        </Typography>
        <Controller
          control={control}
          name="allergens"
          render={({ value }): React.ReactElement => (
            <AutocompleteTagsField
              error={formState?.isSubmitted ? errors.allergens?.message : undefined}
              value={value}
              options={allergensOptions?.map((item) => ({ id: item.id, slug: item.slug, name: item.name })) || []}
              renderIcon={(option): React.ReactElement => <Icon type={option.slug as IconName} />}
              onChangeTags={(tags: Item[]): void => setValue('allergens', tags, { shouldValidate: true })}
              placeholder="Allergens"
            />
          )}
        />
        <div className={clsx(styles.specificationsFields, 'mt-20')}>
          <FormField
            defaultValue={String(productInfo?.calories)}
            label="Calories"
            name="calories"
            placeholder="kcal"
            register={register}
            error={errors.calories?.message}
            className={styles.specificationsField}
            type="number"
          />
          <FormField
            defaultValue={String(productInfo?.proteins)}
            label="Proteins"
            name="proteins"
            placeholder="g"
            register={register}
            error={errors.proteins?.message}
            className={styles.specificationsField}
            type="number"
          />
          <FormField
            defaultValue={String(productInfo?.fat)}
            label="Fat"
            name="fat"
            placeholder="g"
            register={register}
            error={errors.fat?.message}
            className={styles.specificationsField}
            type="number"
          />
          <FormField
            defaultValue={String(productInfo?.carbs)}
            label="Carbs"
            name="carbs"
            placeholder="g"
            register={register}
            error={errors.carbs?.message}
            className={styles.specificationsField}
            type="number"
          />
        </div>
      </WhiteBlock>
    </div>
  );
};
