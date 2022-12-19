import clsx from 'clsx';
import React from 'react';

import stylesProductDetailsLayout from '../../layouts/ProductDetailsLayout/ProductDetailsLayout.module.scss';
import { Button } from '../Button';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  totalPrice?: number;
  onClick?: () => void;
  textAED: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  children,
  totalPrice = 0,
  onClick,
  textAED,
  isLoading = false,
  disabled = false,
}): React.ReactElement => {
  return (
    <Button
      loading={isLoading}
      disabled={disabled}
      onClick={onClick}
      className={clsx(stylesProductDetailsLayout.addToCardButton, styles.addCartButton)}
      color="secondary"
      size="large"
      variant="contained"
    >
      {totalPrice > 0 && (
        <span className={stylesProductDetailsLayout.totalLight}>
          {textAED} {totalPrice}
        </span>
      )}
      <span className={stylesProductDetailsLayout.totalBold}>{children}</span>
    </Button>
  );
};
