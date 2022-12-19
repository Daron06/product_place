import { Select } from 'components/Select';
import keyBy from 'lodash/keyBy';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductStatus, StatusArr } from 'redux/ducks/products/types/contracts';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

export interface ProductStatusChangeBlockProps {
  // TODO: This type need to fix
  value?: ProductStatus;
  marginZero?: boolean;
}

export const ProductStatusChangeBlock: React.FC<ProductStatusChangeBlockProps> = ({
  value,
  marginZero,
}): React.ReactElement => {
  const { register, setValue } = useFormContext();

  React.useEffect(() => {
    register('status');
  }, [register]);

  const handleStatusChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const statusesByKey = keyBy(StatusArr, 'slug');
    setValue('status', statusesByKey[event.target.value as string].slug, { shouldValidate: true });
  };

  return (
    <WhiteBlock title="Status" marginZero={marginZero}>
      <Select
        defaultValue={value}
        items={StatusArr.map((item) => ({
          name: item.name,
          value: item.slug,
        }))}
        name="status"
        onChange={handleStatusChange}
        fullWidth
      />
    </WhiteBlock>
  );
};
