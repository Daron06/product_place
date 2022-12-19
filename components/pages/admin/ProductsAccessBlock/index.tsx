import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

interface ProductAccessBlockProps {
  title: string;
  marginZero?: boolean;
}

export const ProductAccessBlock: React.FC<ProductAccessBlockProps> = ({ title, marginZero }): React.ReactElement => {
  const { control, watch } = useFormContext();
  const isFree: string = watch('isFree');

  return (
    <WhiteBlock title={title} marginZero={marginZero}>
      <Controller
        as={
          <RadioGroup defaultValue={String(isFree)} row>
            <FormControlLabel data-test-id="access-recipe-variant-1" value="true" control={<Radio />} label="Free" />
            <FormControlLabel
              data-test-id="access-recipe-variant-2"
              value="false"
              control={<Radio />}
              label="After payment"
            />
          </RadioGroup>
        }
        name="isFree"
        control={control}
        defaultValue={String(isFree)}
      />
    </WhiteBlock>
  );
};
