import Popover from '@material-ui/core/Popover';
import { Calendar, CalendarProps, DateIntervals } from 'components/Calendar';
import { FormField } from 'components/FormField';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import styles from './DatePicker.module.scss';

interface DatePickerProps<T> {
  classes?: {
    input?: string;
    root?: string;
  };
  error?: string;
  label?: string;
  minDate?: CalendarProps['minDate'];
  name: string;
  onSelect: (date: Date) => void;
  register?: UseFormMethods<T>['register'];
  value: string;
}

export function DatePicker<T extends Date | DateIntervals>({
  classes,
  error,
  register,
  label,
  minDate,
  name,
  onSelect,
  value,
}: DatePickerProps<T>): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onDateSelect = (date: Date): void => {
    if (onSelect) {
      onSelect(date);
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={classes?.root} onClick={handleClick}>
        <FormField
          className={classes?.input}
          error={error}
          label={label}
          name={name}
          placeholder="Select date"
          readOnly
          register={register}
          defaultValue={value}
        />
      </div>

      <Popover
        classes={{
          paper: styles.paper,
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
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
        <Calendar
          classes={{ root: styles.calendar }}
          minDate={minDate}
          mode="single"
          onSelect={onDateSelect}
          selected={new Date(value)}
        />
      </Popover>
    </>
  );
}
