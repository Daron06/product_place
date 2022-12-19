import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { DynamicLinks } from 'components/pages/admin/DynamicLinks';
import { SupplierContactInformationStepFieldsProps } from 'components/pages/admin/RegisterSupplier/types';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SupplierContactInfoProps {
  name?: string;
  email?: string;
  phone?: string;
  links?: string[];
}

export const SupplierContactInfo: React.FC<SupplierContactInfoProps> = () => {
  const { control, errors, register } = useFormContext();

  return (
    <WhiteBlock title="Contact information" className="mb-20">
      <FormField
        error={errors.contactInfo?.name?.message}
        label="Contact person"
        name="contactInfo.name"
        placeholder="Full name"
        register={register}
      />
      <FormField
        label="Email"
        name="contactInfo.email"
        placeholder="example@gmail.com"
        register={register}
        error={errors.contactInfo?.email?.message}
      />
      <CustomPhoneInput label="Phone" name="contactInfo.phone" />
      <div>
        {/* TODO need to the rename genereic^ because for registration supplier will use same component */}
        <DynamicLinks<SupplierContactInformationStepFieldsProps>
          errors={errors}
          name="contactInfo.links"
          control={control}
          register={register}
          text="Company website"
        />
      </div>
    </WhiteBlock>
  );
};
