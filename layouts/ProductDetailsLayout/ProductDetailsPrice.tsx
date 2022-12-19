import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

interface ProductDetailsPriceProps {
  loading: boolean;
  value?: number;
  commissionPrice?: string;
}

export const ProductDetailsPrice: React.FC<ProductDetailsPriceProps> = ({ commissionPrice, value, loading }) => {
  return (
    <div className="d-flex mb-15">
      <Typography className="fw-bold fz-large-18">{loading ? <Skeleton variant="text" /> : `AED ${value}`}</Typography>
      {loading ? (
        <Skeleton variant="text" />
      ) : (
        commissionPrice && (
          <Typography className="ml-10 text-color-600">
            Your commission: &nbsp;{' '}
            <Typography component="span" className="text-color-900 fz-large-16">
              AED {commissionPrice}
            </Typography>
          </Typography>
        )
      )}
    </div>
  );
};
