import ClearIcon from '@material-ui/icons/Clear';
import { Calendar, CalendarProps, DateIntervals } from 'components/Calendar';
import { Chip } from 'components/Chip';
import React from 'react';

import styles from './DateFilter.module.scss';

interface DateFilterProps<T> {
  disabled?: boolean;
  highlighted?: CalendarProps['highlighted'];
  mode?: CalendarProps['mode'];
  minDate?: CalendarProps['minDate'];
  onApply?: (date: T) => void;
  onReset: () => void;
  value?: T;
  classes?: {
    chipRoot?: string;
    chipLabel?: string;
  };
  label?: string;
}

export function DateFilter<T extends Date | DateIntervals>({
  classes,
  disabled,
  highlighted,
  mode = 'single',
  onApply,
  onReset,
  value,
  label,
  minDate,
}: DateFilterProps<T>): React.ReactElement {
  const [selectedDate, setSelectedDate] = React.useState<T | undefined>(value);

  const handleDateApply = (): void => {
    if (selectedDate) {
      onApply?.(selectedDate);
    }
  };

  const handleSelectDate = (date): void => {
    if (date instanceof Date || typeof date === 'string' || typeof date === 'number') {
      throw new Error(`Then handleSelectDate function passed ${typeof date}, but he expected DateIntervals interface`);
    }
    setSelectedDate(date);
  };

  const handleFilterReset = (): void => {
    onReset();
    setSelectedDate(undefined);
  };

  return (
    <Chip
      disabled={disabled}
      popoverClasses={{
        paper: styles.dateFilterPaper,
        popoverBody: styles.datePopoverBody,
      }}
      classes={{
        root: classes?.chipRoot,
        label: classes?.chipLabel,
      }}
      color={selectedDate ? 'primary' : 'default'}
      deleteIcon={<ClearIcon />}
      popoverTitle="Date"
      label={label || 'Day'}
      onApply={handleDateApply}
      onClear={selectedDate ? handleFilterReset : undefined}
      disableApplyButton={Boolean(!selectedDate)}
      popovered
    >
      <Calendar
        highlighted={highlighted}
        selected={selectedDate}
        mode={mode}
        minDate={minDate}
        onSelect={handleSelectDate}
      />
    </Chip>
  );
}
