import { FormField } from 'components/FormField';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

export interface PreparationTimeBlockProps {
  // TODO: This type need to fix
  value?: number;
  marginZero?: boolean;
  name: string;
  title: string;
  subtitle: string;
}

export const PreparationTimeBlock: React.FC<PreparationTimeBlockProps> = ({
  marginZero,
  name,
  title,
  subtitle,
}): React.ReactElement => {
  const { register, errors } = useFormContext();

  return (
    <WhiteBlock title={title} description={subtitle} marginZero={marginZero}>
      <FormField
        className="mb-10 mt-20 inputNum"
        error={errors[name]?.message}
        name={name}
        register={register}
        type="number"
      />
    </WhiteBlock>
  );
};
