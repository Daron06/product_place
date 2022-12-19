import { FormField } from 'components/FormField';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

interface ProductPriceBlockProps {
  name: string;
  title: string;
  subtitle?: string;
  marginZero?: boolean;
}

export const ProductPriceBlock: React.FC<ProductPriceBlockProps> = ({
  name,
  title,
  subtitle,
  marginZero,
}): React.ReactElement => {
  const { errors, register } = useFormContext();

  return (
    <WhiteBlock title={title} description={subtitle} marginZero={marginZero}>
      <FormField
        className="mb-10 mt-20 inputNum"
        error={errors[name]?.message}
        name={name}
        register={register}
        type="number"
        suffix="AED"
      />
    </WhiteBlock>
  );
};
