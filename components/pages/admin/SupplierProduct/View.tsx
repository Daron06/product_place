import { Avatar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DashboardRole } from 'services/types';

import adminLayoutStyles from '../../../../layouts/AdminLayout/AdminLayout.module.scss';
import { ProductDetailsInfo } from '../../../../layouts/ProductDetailsLayout/ProductDetailsInfo';
import { Product, StatusArr } from '../../../../redux/ducks/products/types/contracts';
import { Select } from '../../../Select';
import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { CreateHeader } from '../CreateHeader';
import { IngredientsList } from '../IngredientsList/IngredientsList';
import { PreparationTimeBlock } from '../PreparationTimeBlock';
import stylesUploadFile from '../UploadFile/UploadFile.module.scss';
import { UploadedFileView } from '../UploadImages/UploadedFileView';
import { SupplierProductContext } from '.';
import styles from './SupplierProduct.module.scss';

interface SupplierProductProps {
  data?: Product;
  role: DashboardRole;
}

const roleName = {
  supplier: 'Supplier',
  'cloud-kitchen': 'Cloud Kitchen',
};

export const SupplierProductView: React.FC<SupplierProductProps> = ({ data, role }) => {
  const { handleSubmit, register, errors, formState, setValue, control } = useFormContext();
  const { onSubmit } = React.useContext(SupplierProductContext);
  const isPending = data?.status === 'pending';

  if (!data) {
    return null;
  }

  return (
    <div className="ml-30 mt-30 mr-30">
      <CreateHeader
        title="Go back"
        handleSubmit={handleSubmit(onSubmit)}
        submitButtonText="Save"
        submitButtonDisabled={Object.keys(errors).length > 0 || data.status === 'pending'}
        isSubmitting={formState.isSubmitting}
      />
      <div className="d-flex align-items-start">
        <div className={adminLayoutStyles.leftSide}>
          <WhiteBlock>
            {data.media.map((obj) => (
              <img key={obj.id} src={obj.url} alt={obj.name} className={styles.recipePhoto} />
            ))}
            <h1 className={styles.recipeTitle}>{data.name}</h1>
            <p className={styles.recipeSecondInfo}>
              Calories {data.productInfo?.calories}kcal, Fat {data.productInfo?.fat}g, Proteins{' '}
              {data.productInfo?.proteins}g, Carbs {data.productInfo?.carbs}g
            </p>
            <ProductDetailsInfo cuisine="Family" allergens={data.allergens} />
            <p className={styles.recipeDescription}>{data.description}</p>
          </WhiteBlock>
          <WhiteBlock title="IngredientsAdminTable">
            <IngredientsList items={data.ingredients} />
          </WhiteBlock>
        </div>
        <div className={clsx(adminLayoutStyles.rightSide, 'ml-30')}>
          <WhiteBlock
            title="Status"
            description={
              isPending
                ? 'Your product is being reviewed by the administrator. After approval you can change the status and price'
                : ''
            }
            status={isPending ? 'warning' : undefined}
          >
            <Controller
              control={control}
              name="status"
              render={({ value }): React.ReactElement => (
                <Select
                  items={StatusArr.map(({ slug, name }) => ({ value: slug, name }))}
                  onChange={(e): void => setValue('status', e.target.value)}
                  value={value}
                  disabled={isPending}
                  fullWidth
                />
              )}
            />
          </WhiteBlock>
          <WhiteBlock title="Chef">
            <div className="d-flex align-items-center">
              <Avatar src={!data.chef.image.includes('.') ? '/static/no_avatar.svg' : data.chef.image} />
              <Typography className="ml-15">{data.chef.name}</Typography>
            </div>
          </WhiteBlock>
          <PreparationTimeBlock
            subtitle="Pick Up / Collecting time for Delivery Agent"
            name="preparationTime"
            title="Order processing time"
          />

          <WhiteBlock
            title={`${roleName[role]} price`}
            description={
              role === DashboardRole.SUPPLIER
                ? "Specify the price of the product including the chef's commission"
                : undefined
            }
          >
            <FormField
              name="supplierPrice"
              register={register}
              type="number"
              error={errors.supplierPrice?.message}
              min={0}
              placeholder="Enter price for chef recipe (AED)"
              suffix="AED"
              disabled={isPending}
              className="inputNum"
            />
          </WhiteBlock>
          {data.instruction && (
            <WhiteBlock
              title="Preparation instruction"
              description="Cloud kitchen instructions on how to cook the dish and the quantities needed "
            >
              <a href={data.instruction} target="_blank" rel="noreferrer">
                <UploadedFileView className={stylesUploadFile.block}>
                  <Icon type="pdf" />
                </UploadedFileView>
              </a>
            </WhiteBlock>
          )}
        </div>
      </div>
    </div>
  );
};
