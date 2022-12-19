import { ListItem } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { OrderByProduct } from '../../services/types';
import styles from './Sortby.module.scss';

export interface SortByProps {
  title?: string;
  items: OrderByProduct[];
  onSortSelect: (value: OrderByProduct) => void;
  value: OrderByProduct;
}

export const SortBy: React.FC<SortByProps> = ({ onSortSelect, value, items }): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSortValueSelect = (sortValue: OrderByProduct): void => {
    onSortSelect(sortValue);
    handleClose();
  };

  const { t } = useTranslate('sort-by');
  const SortType = {
    name: t('name-ascending'),
    '-name': t('name-descending'),
    price: t('price-ascending'),
    '-price': t('price-descending'),
  };

  return (
    <>
      <div onClick={handleClick} role="presentation" className={`${styles.root} d-flex align-items-center`}>
        <Typography className={styles.title}>{t('title')}</Typography>
        <Typography>{SortType[value]}</Typography>
        <div className={styles.chevron}>
          <ChevronRightRounded />
        </div>
      </div>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {items.map((item) => (
          <ListItem key={item} onClick={(): void => handleSortValueSelect(item)} button>
            <Typography className={styles.popoverItem} key={item}>
              {SortType[item]}
            </Typography>
          </ListItem>
        ))}
      </Popover>
    </>
  );
};
