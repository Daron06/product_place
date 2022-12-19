import clsx from 'clsx';
import { FormField } from 'components/FormField';
import { ProductPriceBlock } from 'components/pages/admin/ProductPriceBlock';
import { useTranslatedFields } from 'hooks/useTranslatedFields';
import { LanguageContext } from 'layouts/AdminLayout';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';
import { Product } from 'redux/ducks/products/types/contracts';
import { DashboardRole, Option, Supplier } from 'services/types';

import adminLayoutStyles from '../../../../layouts/AdminLayout/AdminLayout.module.scss';
import { Button } from '../../../Button';
import { Select } from '../../../Select';
import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { AutocompleteBlock } from '../AutocompleteBlock';
import { CreateHeader } from '../CreateHeader';
import menuStyles from '../MenuCreate/MenuCreate.module.scss';
import { PreparationTimeBlock } from '../PreparationTimeBlock';
import { ProductFlagsBlock } from '../ProductFlagsBlock';
import { UploadImages } from '../UploadImages';
import { UploadedImage } from '../UploadImages/types';
import { SupplierWarehouseCreateContext } from '.';
import { AddVariationModal } from './AddVariationModal';
import { ColorForm, ColorFormFields } from './forms/ColorForm';
import styles from './SupplierWarehouseCreate.module.scss';

const Editor = dynamic(import('../../../Editor'), { ssr: false });

const warehouseStatuses = [
  {
    value: 'active',
    name: 'Active',
  },
  {
    value: 'blocked',
    name: 'Blocked',
  },
  {
    value: 'pending',
    name: 'Pending',
  },
  {
    value: 'rejected',
    name: 'Rejected',
  },
  {
    value: 'stopped',
    name: 'Stopped',
  },
  {
    value: 'disabled',
    name: 'Disabled',
  },
];

export const SupplierWarehouseCreateView: React.FC<{
  role: DashboardRole.SUPPLIER | DashboardRole.STAFF;
  suppliers?: ImmutableDirectoriesState['data']['suppliers'];
  supplier?: Supplier;
  isEditingPage?: boolean;
  productFlags?: ('chilled' | 'dry')[];
  itemData?: Product;
}> = ({ isEditingPage, role, suppliers, supplier, productFlags, itemData }) => {
  const [visibleModal, setVisibleModal] = React.useState<boolean>();
  const { handleSubmit, register, errors, formState, setValue, control, getValues, watch } = useFormContext();
  const { onSubmit, categories, selectedOptions: initialSelectedOptions, media, status } = React.useContext(
    SupplierWarehouseCreateContext,
  );
  const [variations, setVariations] = React.useState<Option[]>(initialSelectedOptions || []);
  const variationInitialized = React.useRef(false);
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, ColorFormFields[]>>({});

  const watchedOptions = watch('options');

  const handleAddVariation = (item: Option): void => {
    setVariations((prev) => [...prev, { ...item, options: [] }]);
  };

  const onChangeImages = (arr: UploadedImage[]): void => {
    setValue('media', arr, { shouldValidate: true });
  };

  const removeVariation = (id: number): void => {
    setVariations((prev) => prev.filter((obj) => obj.id !== id));
    setSelectedOptions((prev) => omit(prev, id));
  };

  const handleStatusChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const statusesKeyBy = keyBy(warehouseStatuses, 'value');
    setValue('status', statusesKeyBy[event.target.value as string].value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  React.useEffect(() => {
    if (!variationInitialized.current && selectedOptions.length) {
      setVariations(initialSelectedOptions);
      variationInitialized.current = true;
    }
  }, [selectedOptions]);

  React.useEffect(() => {
    setValue('options', Object.values(selectedOptions).flat(), { shouldValidate: true });
  }, [selectedOptions]);

  const emptyAddedVariations = !watchedOptions?.length;

  const { translatedData } = useTranslatedFields();
  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    if (itemData) {
      translatedData(['name', 'description', 'shortDescription'], itemData, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="ml-30 mt-30 mr-30">
      <CreateHeader
        title="Go back"
        handleSubmit={handleSubmit(onSubmit)}
        submitButtonText="Save"
        isSubmitting={formState.isSubmitting}
        isLanguageSelect
      />
      <div className="d-flex align-items-start">
        <div className={adminLayoutStyles.leftSide}>
          {role === DashboardRole.STAFF && (
            <>
              <AutocompleteBlock
                items={suppliers}
                name="supplier"
                value={supplier}
                title="Supplier"
                disabled={Boolean(getValues('supplier') && isEditingPage)}
              />
              {errors.supplier?.message && (
                <p style={{ color: 'red', marginTop: '-20px' }}> {errors.supplier?.message}</p>
              )}
            </>
          )}
          <WhiteBlock title="General">
            <FormField
              label="Name"
              name="name"
              placeholder="Enter variation name"
              error={errors.name?.message}
              register={register}
            />
            <Controller
              control={control}
              name="category"
              render={({ value }): React.ReactElement => (
                <Select
                  label="Category"
                  items={orderBy(categories, 'name', 'asc').map((obj) => ({
                    id: String(obj.id),
                    value: obj.slug,
                    name: obj.name,
                  }))}
                  onChange={(e): void => setValue('category', e.target.value, { shouldValidate: true })}
                  value={value}
                  error={errors.category?.message}
                  fullWidth
                />
              )}
            />

            <WhiteBlock className="p-0" title="Short description">
              <Editor
                name="shortDescription"
                onChange={(data): void => setValue('shortDescription', data, { shouldValidate: true })}
                minToolbar
              />
              {errors?.shortDescription?.message && <p className="error-label">{errors?.shortDescription?.message}</p>}
            </WhiteBlock>

            <div className="mt-15">
              <span className={menuStyles.formLabel}>Images</span>
              <UploadImages
                onChangeImages={onChangeImages}
                error={errors.media?.message}
                images={media}
                control={control}
                controllable={false}
              />
            </div>
          </WhiteBlock>
          {variations.map((obj) => (
            <ColorForm
              key={obj.id}
              id={obj.id}
              title={obj.name}
              role={role}
              onRemove={(): void => removeVariation(obj.id)}
              value={obj.options}
              type={obj.type}
              onChange={(arr): void => {
                setSelectedOptions((prev) => ({
                  ...prev,
                  [obj.id]: arr,
                }));
              }}
            />
          ))}
          <Button
            onClick={(): void => setVisibleModal(true)}
            className={styles.addVariationButton}
            variant="outlined"
            fullWidth
          >
            + Add Variation
          </Button>
          {errors?.options?.message && <p className="error-label">{errors?.options?.message}</p>}
          <AddVariationModal
            open={visibleModal}
            onAdd={handleAddVariation}
            onClose={(): void => setVisibleModal(false)}
            selectedVariations={variations}
            formIsDirty={formState.isDirty}
            role={role}
          />
          <WhiteBlock title="Description">
            <Editor
              name="description"
              onChange={(data): void => setValue('description', data, { shouldValidate: true })}
            />
            {errors?.description?.message && <p className="error-label">{errors?.description?.message}</p>}
          </WhiteBlock>
        </div>
        <div className={clsx(menuStyles.rightSide, 'ml-30')}>
          {role === 'staff' && (
            <WhiteBlock title="Status" className="mb-20">
              <Select
                fullWidth
                items={warehouseStatuses}
                onChange={handleStatusChange}
                name="status"
                defaultValue={status}
              />
            </WhiteBlock>
          )}
          <div className={!emptyAddedVariations ? styles.disabledRightSide : ''}>
            {role === 'staff' && (
              <div className="mt-20">
                <ProductPriceBlock name="chefPrice" subtitle="Specify the Chef’s commission" title="Chef commission" />
              </div>
            )}
            <WhiteBlock
              title={role === DashboardRole.STAFF ? 'Vendor price' : 'Price'}
              description={
                role === DashboardRole.STAFF
                  ? 'This is the vendor price to unknown'
                  : 'Specify the price of the product to unknown'
              }
            >
              <FormField
                name="supplierPrice"
                error={errors.supplierPrice?.message}
                register={register}
                suffix="AED"
                placeholder="0"
                type="number"
                min={1}
                max={100000}
                className="inputNum"
                disabled={!emptyAddedVariations}
              />
            </WhiteBlock>
            <WhiteBlock
              title="Inventory"
              description="Indicate the number of items in stock. In the future, the number will be updated automatically."
            >
              <FormField
                name="inventory"
                error={errors.inventory?.message}
                register={register}
                type="number"
                placeholder="0"
                disabled={!emptyAddedVariations}
              />
            </WhiteBlock>
            <WhiteBlock title="MSRP price" description="Specify recommended sales price">
              <FormField
                name="msrpPrice"
                error={errors.msrpPrice?.message}
                register={register}
                type="number"
                placeholder="0"
                min={1}
                max={100000}
                disabled={!emptyAddedVariations}
              />
            </WhiteBlock>
            {role === 'staff' && (
              <div className="mt-20">
                <ProductPriceBlock
                  name="price"
                  subtitle="This the final price to customer"
                  title="unknown Price"
                  marginZero
                />
              </div>
            )}
          </div>
          <PreparationTimeBlock
            subtitle="Pick Up / Collecting time for Delivery Agent"
            name="additionalInfo.preparationTime"
            title="Order processing time"
          />
          <ProductFlagsBlock productFlags={productFlags} />
        </div>
      </div>
    </div>
  );
};
