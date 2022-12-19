import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import styles from 'components/ProductOptionsList/ProductOptionsList.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

interface ProductOptionsItemProps {
  color?: string;
  name: string;
  price: number;
  type?: string;
}
export const ProductOptionsItem: React.FC<ProductOptionsItemProps> = ({ color, price, name, type }) => {
  const { t } = useTranslate('product-details');

  return (
    <div className="d-flex align-items-center">
      {type === 'color' && <div className={styles.color} style={{ backgroundColor: color }} />}
      <div className={clsx(styles.ml10, 'd-flex flex-column p-10 flex')}>
        <Typography className="text-capitalize fz-large-14">{name}</Typography>
        <Typography className="fw-bold fz-large-14">
          {t('aed')} {price}
        </Typography>
      </div>
    </div>
  );
};
