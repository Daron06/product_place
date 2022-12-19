import { MenuItem, Select } from '@material-ui/core';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';

import styles from './LanguageSelect.module.scss';

export const LanguageSelect: React.FC = (): React.ReactElement => {
  const { acceptLanguage, setLanguage } = React.useContext(LanguageContext);

  React.useEffect(() => {
    setLanguage('en');
  }, []);

  const handleChange = (e): void => {
    setLanguage(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Select
        onChange={handleChange}
        value={acceptLanguage}
        fullWidth
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          getContentAnchorEl: null,
          className: styles.itemsWrapper,
        }}
      >
        <MenuItem value="en">
          <Icon className="mr-5" type="flag-gbr" width={22} height={14} />
          <span className={clsx(styles.item)}>en</span>
        </MenuItem>
        <MenuItem className={clsx(styles.item, styles.ar)} value="ar">
          <Icon className="mr-5" type="flag-uae" width={22} height={14} />
          <span className={clsx(styles.item)}>uae</span>
        </MenuItem>
      </Select>
      <Icon width={10} height={7} type="arrow-down" />
    </div>
  );
};
