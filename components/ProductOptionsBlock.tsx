import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography/Typography';
import clsx from 'clsx';
import styles from 'components/ProductOptionsList/ProductOptionsList.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { ProductOption } from '../redux/ducks/products/types/contracts';
import { normalizeChefStoreOptions } from '../utils/normalizers/normalizeChefStoreOptions';
import { ProductOptionsList } from './ProductOptionsList';

export type SelectedIdsRecord = Record<string, number>;

interface ProductOptionsBlockProps {
  options: ProductOption[];
  value?: SelectedIdsRecord;
  selectable?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: string }>) => void;
}

export const ProductOptionsBlock: React.FC<ProductOptionsBlockProps> = ({
  options,
  value,
  onChange,
  selectable = false,
}) => {
  const variations = normalizeChefStoreOptions(options);
  const selectedId = value && Object.values(value)[0];
  const selectedVariation = options.find((obj) => obj.id === selectedId);
  const { getTranslatedText } = useTranslate();

  return (
    <RadioGroup
      name="option"
      className="d-flex align-items-center flex-row ml-10"
      value={selectedVariation?.option.id}
      onChange={onChange}
    >
      {variations.map((obj) => {
        return (
          <div key={obj.id}>
            <Typography className={clsx('fw-bold', styles.groupTitle)}>{getTranslatedText(obj, 'name')}</Typography>
            <div className="mb-10 mt-10">
              <ProductOptionsList items={obj.options} selectable={selectable} type={obj.type} />
            </div>
          </div>
        );
      })}
    </RadioGroup>
  );
};
