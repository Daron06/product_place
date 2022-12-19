import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { SupplierChefSummary } from 'redux/ducks/admin/supplier/chefs/types/contracts';

import { StatusEnum } from '../../../../services/types';

interface SupplierSummaryProps {
  loading: boolean;
  status?: StatusEnum;
  summary?: SupplierChefSummary;
}

export const SupplierSummary: React.FC<SupplierSummaryProps> = ({ loading, status, summary }): React.ReactElement => {
  return (
    <div>
      <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
        Summary
      </Typography>
      <ul className="d-flex flex-column">
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          {loading ? (
            <>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={100} />
            </>
          ) : (
            <>
              <Typography className="text-color-600" variant="body2">
                Status
              </Typography>
              {status === 'active' ? (
                <Typography className="fw-bold" color="secondary" variant="body2">
                  {status}
                </Typography>
              ) : (
                <Typography className="fw-bold" style={{ opacity: 0.6 }} variant="body2">
                  {status}
                </Typography>
              )}
            </>
          )}
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          {loading ? (
            <>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={100} />
            </>
          ) : (
            <>
              <Typography className="text-color-600" variant="body2">
                Items
              </Typography>
              <Typography className="fw-bold" color="secondary" variant="body2">
                {summary?.products}
              </Typography>
            </>
          )}
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          {loading ? (
            <>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={100} />
            </>
          ) : (
            <>
              <Typography className="text-color-600" variant="body2">
                # of orders
              </Typography>
              <Typography className="fw-bold" color="secondary" variant="body2">
                {summary?.orders}
              </Typography>
            </>
          )}
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          {loading ? (
            <>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={100} />
            </>
          ) : (
            <>
              <Typography className="text-color-600" variant="body2">
                Total earned
              </Typography>
              <Typography className="fw-bold" variant="body2">
                AED {summary?.earn}
              </Typography>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};
