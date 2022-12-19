import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Dropdown } from 'components/Dropdown';
import React from 'react';
import { AdminEndpoints } from 'services/api/endpoints';
import { OrderStatus } from 'services/api/OrderApi';
import { DashboardRole, StatusEnum } from 'services/types';

import styles from './ProductStatus.module.scss';

export interface ProductStatusProps {
  status: StatusEnum | OrderStatus;
  editable?: boolean;
  role?: DashboardRole | AdminEndpoints;
}
// role === DashboardRole.STAFF || (editable && status !== 'pending' && status !== 'processing');
const canEditStatus = (editable, status, role): boolean => {
  if (!editable || status === 'stopped') {
    return false;
  }
  if (role === DashboardRole.STAFF) {
    return true;
  }
  if (status === 'pending' || status === 'processing') {
    return false;
  }
  return true;
};

export const ProductStatusDropdown: React.FC<ProductStatusProps> = ({ children, status, role, editable = true }) => {
  const name = status.toLocaleLowerCase();
  const editableStatus = canEditStatus(editable, name, role);
  const rootCls = clsx(styles.root, styles[name], {
    [styles.editable]: editable,
  });

  return (
    <Dropdown
      classes={{
        root: styles.dropdownRoot,
        popper: editableStatus ? undefined : styles.popper,
      }}
      overlay={
        <div className={rootCls}>
          <Typography className={styles.statusText} variant="inherit">
            {name}
          </Typography>
          {editableStatus && (
            <div className={styles.chevronIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path
                  opacity="0.6"
                  d="M1 1L4 4L7 1"
                  stroke="#373737"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};
