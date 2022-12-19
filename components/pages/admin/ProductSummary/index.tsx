import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Rating } from 'components/Rating';
import React from 'react';
import { DashboardRole } from 'services/types';

interface ProductSummaryProps {
  role?: DashboardRole;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({ role }): React.ReactElement => {
  return (
    <div>
      <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
        Summary
      </Typography>
      <ul className="d-flex flex-column">
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <Typography className="text-color-600" variant="body2">
            Customer rating
          </Typography>
          <Rating value={4} />
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <Typography className="text-color-600" variant="body2">
            Reviews
          </Typography>
          <Typography className="fw-bold" color="secondary" variant="body2">
            12
          </Typography>
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <Typography className="text-color-600" variant="body2">
            # of orders
          </Typography>
          <Typography className="fw-bold" color="secondary" variant="body2">
            24
          </Typography>
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          {role === DashboardRole.CHEF ? (
            <Typography className="text-color-600" variant="body2">
              Your income
            </Typography>
          ) : (
            <Typography className="text-color-600" variant="body2">
              Chef income
            </Typography>
          )}
          <Typography className="fw-bold" variant="body2">
            AED 4538
          </Typography>
        </li>
      </ul>
    </div>
  );
};
