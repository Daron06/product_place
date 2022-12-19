import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFlagsArr } from 'redux/ducks/products/types/contracts';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

export interface ProductFlagsBlockProps {
  productFlags?: ('chilled' | 'dry')[];
  marginZero?: boolean;
}

export const ProductFlagsBlock: React.FC<ProductFlagsBlockProps> = ({
  productFlags,
  marginZero,
}): React.ReactElement => {
  const { register, setValue } = useFormContext();
  const [selectedFlags, setSelectedFlags] = React.useState(productFlags || ['dry']);

  const onClickCheckbox = async (name: 'chilled' | 'dry'): Promise<void> => {
    setSelectedFlags([name]);
  };

  React.useEffect(() => {
    register('additionalInfo.productFlags');
    setValue('additionalInfo.productFlags', selectedFlags, { shouldValidate: true });
  }, [selectedFlags, register, setValue]);

  return (
    <WhiteBlock title="Transportation" marginZero={marginZero}>
      <div className="d-flex">
        {ProductFlagsArr.map((item) => (
          <div key={item.id} className="cursor-p" onClick={(): Promise<void> => onClickCheckbox(item.slug)}>
            <RadioGroup name={item.slug} className="d-flex align-items-center flex-row ml-10" value={item.slug}>
              <FormControlLabel
                style={{ pointerEvents: 'none' }}
                control={
                  <Radio
                    color="primary"
                    checked={selectedFlags && selectedFlags.includes(item.slug)}
                    name={item.slug}
                    value={item.slug}
                  />
                }
                label={item.name}
              />
            </RadioGroup>
          </div>
        ))}
      </div>
    </WhiteBlock>
  );
};
