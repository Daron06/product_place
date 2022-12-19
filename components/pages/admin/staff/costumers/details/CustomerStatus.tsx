import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '../../../../../Select';

export const CustomerStatus: React.FC = () => {
  const { control, setValue } = useFormContext();

  return (
    <WhiteBlock title="Status">
      <Controller
        control={control}
        name="isActive"
        render={({ value }): React.ReactElement => (
          <Select
            items={[
              { value: true, name: 'Activated' },
              { value: false, name: 'Deactivated' },
            ]}
            onChange={(e): void => setValue('isActive', e.target.value, { shouldValidate: true })}
            value={value}
            fullWidth
          />
        )}
      />
    </WhiteBlock>
  );
};
