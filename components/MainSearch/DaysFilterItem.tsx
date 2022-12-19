import { Typography } from '@material-ui/core';
import { DateIntervals } from 'components/Calendar';
import { DateFilter } from 'components/DateFilter';
import styles from 'components/MainSearch/MainSearch.module.scss';
import React from 'react';

export interface DaysFilterItemProps {
  onFilterApply: (ids: any) => void;
  onFilterReset: () => void;
  title: string;
  label: string;
}

export const DaysFilterItem: React.FC<DaysFilterItemProps> = ({ label, onFilterApply, onFilterReset, title }) => {
  return (
    <div className={styles.filterItem}>
      <Typography className={styles.blockTitle} variant="body2">
        {title}
      </Typography>
      <DateFilter<DateIntervals>
        minDate={new Date()}
        classes={{
          chipRoot: styles.chip,
          chipLabel: styles.chipLabel,
        }}
        label={label}
        mode="range"
        onReset={onFilterReset}
        onApply={onFilterApply}
      />
    </div>
  );
};
