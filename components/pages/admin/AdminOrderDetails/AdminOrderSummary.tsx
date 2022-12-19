import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

import styles from './AdminOrderDetails.module.scss';

interface AdminOrderSummaryProps {
  loading: boolean;
  summary: string;
  total: string;
  vat: string;
  delivery: string;
}
export const AdminOrderSummary: React.FC<AdminOrderSummaryProps> = ({
  loading,
  summary,
  total,
  vat,
  delivery,
}): React.ReactElement => {
  return (
    <div className="d-flex justify-content-end pr-20 pb-30 pt-20">
      <div className={styles.orderSummaryWrapper}>
        {loading ? (
          <>
            <Skeleton width="100px" />
            <Skeleton width="50px" />
            <Skeleton width="100px" />
            <Skeleton width="50px" />
            <Skeleton width="100px" />
            <Skeleton width="50px" />
            <Skeleton width="100px" />
            <Skeleton width="50px" />
          </>
        ) : (
          <>
            <div className={styles.orderSummary}>
              <span>Order Summary</span>
              <span>Delivery</span>
              <span>VAT 5%</span>
              <span>Total</span>
            </div>
            <div>
              <span>AED {summary}</span>
              <span>AED {delivery}</span>
              <span>AED {vat}</span>
              <span>
                <span className="fw-bold">AED {total}</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
