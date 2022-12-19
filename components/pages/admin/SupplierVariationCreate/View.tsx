import { FormField } from 'components/FormField';
import { AutocompleteBlock } from 'components/pages/admin/AutocompleteBlock';
import { useTranslatedFields } from 'hooks/useTranslatedFields';
import { LanguageContext } from 'layouts/AdminLayout';
import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectSuppliersDirectory } from 'redux/ducks/directories/selectors';
import { DashboardRole } from 'services/types';

import adminLayoutStyles from '../../../../layouts/AdminLayout/AdminLayout.module.scss';
import { Select } from '../../../Select';
import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { CreateHeader } from '../CreateHeader';
import { ColorForm } from '../variations/ColorForm';
import { SizeForm } from '../variations/SizeForm';
import { SupplierCreateVariantFormData, SupplierVariationCreateContext } from '.';

const variationsTypesArr = [
  { value: 'color', name: 'Color' },
  { value: 'size', name: 'Size' },
];

interface VariationCreateViewProps {
  itemData?: SupplierCreateVariantFormData | null;
}

export const SupplierVariationCreateView: React.FC<VariationCreateViewProps> = ({ itemData }): React.ReactElement => {
  const { handleSubmit, register, errors, formState, setValue, control, watch } = useFormContext();
  const { onSubmit, role } = React.useContext(SupplierVariationCreateContext);
  const suppliers = useSelector(selectSuppliersDirectory);
  const { supplier } = useContext(SupplierVariationCreateContext);

  const type = watch('type');

  React.useEffect(() => {
    if (role === DashboardRole.STAFF) {
      register('supplier');
    }
  }, []);

  const { translatedData } = useTranslatedFields();
  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    if (itemData) {
      translatedData(['name', 'description'], itemData, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="ml-30 mt-30 mr-30">
      <CreateHeader
        title="Go back"
        handleSubmit={handleSubmit(onSubmit)}
        submitButtonText="Save"
        submitButtonDisabled={Object.keys(errors).length > 0}
        isSubmitting={formState.isSubmitting}
        isLanguageSelect
      />
      <div className="d-flex align-items-start mt-30">
        <div className={adminLayoutStyles.leftSide}>
          {role === DashboardRole.STAFF && suppliers && (
            <AutocompleteBlock items={suppliers} name="supplier" title="Supplier" value={supplier} />
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
              name="type"
              render={({ value }): React.ReactElement => (
                <Select
                  label="Type"
                  items={variationsTypesArr}
                  onChange={(e): void => {
                    setValue('type', e.target.value, { shouldValidate: true });
                    setValue('options', [], { shouldValidate: true });
                  }}
                  value={value}
                  error={errors.type?.message}
                  fullWidth
                />
              )}
            />
            <FormField
              label="Description"
              name="description"
              placeholder="Some description..."
              error={errors.description?.message}
              register={register}
              textarea
            />
          </WhiteBlock>
          {type === 'color' && (
            <WhiteBlock title="Color variations">
              <ColorForm role={role} morePrice={false} />
            </WhiteBlock>
          )}
          {type === 'size' && (
            <WhiteBlock title="Size variations">
              <SizeForm />
            </WhiteBlock>
          )}
        </div>
      </div>
    </div>
  );
};
