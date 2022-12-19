import clsx from 'clsx';
import { Icon } from 'components/Icon';
import dynamic from 'next/dynamic';
import React from 'react';

import style from './Calendar.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SimpleReactCalendar = dynamic<any>(() => import('simple-react-calendar'), { ssr: false });

export type DateIntervals = {
  start: Date;
  end: Date;
};

export interface CalendarProps {
  disabledIntervals?: DateIntervals[];
  highlighted?: DateIntervals;
  classes?: {
    root?: string;
  };
  minDate?: Date;
  mode: 'range' | 'single';
  onSelect?: (date: Date & DateIntervals) => void;
  onMonthChange?: (data: unknown) => void;
  onDayHover?: (data: unknown) => void;
  onSelectionProgress?: (data: unknown) => void;
  rangeLimit?: number;
  size?: 'large' | 'small';
  selected?: Date | DateIntervals | null;
}

export const Calendar: React.FC<CalendarProps> = ({
  classes,
  disabledIntervals,
  highlighted,
  minDate,
  mode,
  onSelect,
  onMonthChange,
  onDayHover,
  onSelectionProgress,
  rangeLimit,
  selected,
  size,
}): React.ReactElement => {
  const rootCls = clsx(style.root, classes?.root, {
    [style.large]: size === 'large',
    [style.small]: size === 'small',
  });

  return (
    <div className={rootCls}>
      <SimpleReactCalendar
        minDate={minDate}
        disabledIntervals={disabledIntervals}
        headerNextArrow={<Icon type="chevron-right" />}
        headerPrevArrow={<Icon type="chevron-right" />}
        highlighted={highlighted}
        mode={mode}
        onSelect={onSelect}
        onMonthChange={onMonthChange}
        onDayHover={onDayHover}
        onSelectionProgress={onSelectionProgress}
        rangeLimit={rangeLimit}
        selected={selected}
        today={new Date()}
      />
    </div>
  );
};
