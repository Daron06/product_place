import { Typography } from '@material-ui/core';
import { RecipeSteps, RecipeStepsViewProps } from 'components/pages/admin/RecipeSteps';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { RecipeVideo } from './RecipeVideo';

interface RecipeStepsBlockProps {
  steps?: RecipeStepsViewProps['steps'];
  marginZero?: boolean;
  disabled?: boolean;
}

export const RecipeStepsBlock: React.FC<RecipeStepsBlockProps> = ({
  steps,
  marginZero = false,
  disabled = false,
}): React.ReactElement => {
  const { control, errors, formState, register, unregister, setValue } = useFormContext();

  return (
    <div className="pb-20">
      <WhiteBlock marginZero={marginZero} disabled={disabled}>
        <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
          Recipe
        </Typography>
        <RecipeVideo />
        <RecipeSteps
          register={register}
          unregister={unregister}
          control={control}
          errors={errors}
          steps={steps}
          setValue={setValue}
          formState={formState}
        />
      </WhiteBlock>
    </div>
  );
};
