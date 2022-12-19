import { Divider, Paper } from '@material-ui/core';
import React from 'react';

import { AdminChefProfileProps } from '.';
import { AdminAccountingTable } from './AdminAccountingTable';
import styles from './AdminProfile.module.scss';

export const AdminAccounting: React.FC<AdminChefProfileProps> = ({ details }): React.ReactElement => {
  return (
    <div className={styles.accounting}>
      <Paper elevation={0} className={styles.accountingOrders}>
        <p>Transactions</p>
        <AdminAccountingTable orders={details} />
      </Paper>

      <Paper elevation={0} className={styles.accountingBalance}>
        <div className={styles.balanceHeader}>
          <p className={styles.titleBalance}>Balance</p>
          <p className={styles.balance}>AED 253201</p>
          <p className={styles.totalText}>Total disbursed to date</p>
          <p className={styles.total}>AED 34200</p>
        </div>
        <Divider />
        <div className={styles.balanceFooter}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" stroke="#373737" />
            <rect
              x="8.96094"
              y="9.73047"
              width="2.07692"
              height="5.15385"
              rx="0.5"
              stroke="#373737"
              strokeLinejoin="round"
            />
            <circle cx="9.9994" cy="6.1537" r="1.03846" stroke="#373737" />
          </svg>

          <span>Funds will be disbursed and credited to your bank account every Monday.</span>
        </div>
      </Paper>
    </div>
  );
};
