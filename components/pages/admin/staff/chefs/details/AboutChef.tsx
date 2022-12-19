import { FormField } from 'components/FormField';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const AboutChef: React.FC = () => {
  const { register, errors } = useFormContext();

  React.useEffect(() => {
    register('birthday');
  }, [register]);

  return (
    <WhiteBlock>
      <FormField label="Full name" name="name" register={register} error={errors?.name?.message} />
      <FormField label="Current role" name="jobRole" register={register} error={errors?.jobRole?.message} />
      <FormField label="About" name="description" register={register} error={errors?.description?.message} textarea />
    </WhiteBlock>
  );
};
