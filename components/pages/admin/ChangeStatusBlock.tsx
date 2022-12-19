import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '../../Select';

export const ChangeStatusBlock: React.FC = () => {
  const { control, setValue } = useFormContext();

  return (
    <WhiteBlock title="Status" className="pb-0">
      <Controller
        control={control}
        name="status"
        render={({ value }): React.ReactElement => (
          <Select
            items={[
              { value: 'pending', name: 'Pending' },
              { value: 'active', name: 'Active' },
              { value: 'disabled', name: 'Disabled' },
              { value: 'blocked', name: 'Blocked' },
            ]}
            onChange={(e): void => setValue('status', e.target.value, { shouldValidate: true, shouldDirty: true })}
            value={value}
            fullWidth
          />
        )}
      />
    </WhiteBlock>
  );
};
