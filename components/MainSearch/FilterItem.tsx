import { Typography } from '@material-ui/core';
import { FilterList } from 'components/FilterList';
import styles from 'components/MainSearch/MainSearch.module.scss';
import React, { FC } from 'react';

export type FilterListItem = { name: string; value: number };

interface FilterItemProps {
  items: Array<FilterListItem>;
  title: string;
  label: string;
  onFilterApply: (ids: number[]) => void;
  onFilterReset: () => void;
  placeholder?: string;
  popoverTitle?: string;
}

export const FilterItem: FC<FilterItemProps> = ({
  items,
  title,
  onFilterApply,
  onFilterReset,
  label,
  popoverTitle,
  placeholder = 'placeholder',
}): React.ReactElement => {
  return (
    <div className={styles.filterItem}>
      <Typography className={styles.blockTitle} variant="body2">
        {title}
      </Typography>
      <FilterList<number>
        items={items}
        classes={{
          chipRoot: styles.chip,
          chipLabel: styles.chipLabel,
        }}
        onApply={onFilterApply}
        onReset={onFilterReset}
        label={label}
        placeholder={placeholder}
        popoverTitle={popoverTitle}
      />
    </div>
  );
};
