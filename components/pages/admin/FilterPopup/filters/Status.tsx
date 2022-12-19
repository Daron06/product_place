import { InputBase } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import CheckboxList from '../../../../CheckboxList';
import { Icon } from '../../../../Icon';
import styles from '../FilterPopup.module.scss';

const statusItems = [
  { name: 'Completed', value: 'completed' },
  { name: 'Pending', value: 'pending' },
  { name: 'Canceled', value: 'canceled' },
  { name: 'To invoice', value: 'invoice' },
  { name: 'Returned', value: 'returned' },
];

export const StatusFilter = (): React.ReactElement => {
  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <div className="d-flex flex-column">
      <div className={clsx(styles.search, 'mt-20 mb-20')}>
        <InputBase
          className="pb-10"
          type="text"
          placeholder="Search allergies..."
          startAdornment={
            <div className={styles.searchIcon}>
              <Icon type="search" />
            </div>
          }
          onChange={(e): void => setSearchText(e.target.value)}
          fullWidth
        />
      </div>

      <CheckboxList items={statusItems.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()))} />
    </div>
  );
};
