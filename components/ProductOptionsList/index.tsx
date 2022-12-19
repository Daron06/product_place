import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import styles from 'components/ProductOptionsList/ProductOptionsList.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { OptionVariants } from '../../services/types';
import { ProductOptionsItem } from './ProductOptionsItem';

interface ProductOptionsListProps {
  items?: Readonly<OptionVariants[]>;
  selectable?: boolean;
  type?: string;
}

export const ProductOptionsList: React.FC<ProductOptionsListProps> = ({
  items,
  selectable = false,
  type,
}): React.ReactElement => {
  const { getTranslatedText } = useTranslate();

  if (!items || !items.length) {
    return <Typography>No colors specified</Typography>;
  }

  return (
    <>
      {items.map((item) => (
        <FormControlLabel
          className={clsx(styles.colorBlock, { [styles.selectable]: !selectable }, 'mb-15')}
          key={item.id}
          control={selectable ? <Radio /> : <span />}
          label={
            <ProductOptionsItem
              name={getTranslatedText(item, 'name')}
              color={item.color}
              price={item.price}
              type={type}
            />
          }
          value={String(item.id)}
        />
      ))}
    </>
  );
};
