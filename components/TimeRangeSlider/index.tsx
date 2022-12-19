import Slider from '@material-ui/core/Slider';
import { ValueLabelProps } from '@material-ui/core/Slider/Slider';
import clsx from 'clsx';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import React from 'react';
import { convertMinutesToHours } from 'utils/date/convertMinutesToHours';

interface TimeRangeSliderProps {
  duration: number;
  onChange: (value: [number, number]) => void;
  onChangeCommitted?: (range: [number, number]) => void;
  value: [number, number];
}

const SLIDER_MAX_VALUE = 1439;
const SLIDER_STEP = 30;

export const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  duration,
  onChange,
  value,
}): React.ReactElement | null => {
  const getNewSliderValues = (from: number, till: number): [number, number] | null => {
    if (!value.length) {
      return null;
    }

    const [currentValueFrom, currentValueTill] = value;

    if (from >= currentValueFrom && till >= currentValueTill) {
      return [till - duration, till];
    }

    return [from, from + duration];
  };

  const handleSliderChange = (_: React.ChangeEvent<unknown>, sliderValue: number | number[]): void => {
    if (Array.isArray(sliderValue)) {
      const [inputValueFrom, inputValueTill] = sliderValue;

      const newValues = getNewSliderValues(inputValueFrom, inputValueTill);
      if (newValues) {
        onChange(newValues);
      }
    }
  };

  const ValueLabel: React.FC<ValueLabelProps> = (props): React.ReactElement => {
    return React.cloneElement(
      props.children,
      {
        className: clsx(props.children.props.className),
      },
      <span className={styles.thumbWrapper}>
        <span className={styles.thumb}>{convertMinutesToHours(Number(props.value))}</span>
      </span>,
    );
  };

  if (!value.length) {
    return null;
  }

  return (
    <Slider
      aria-labelledby="discrete-slider"
      classes={{
        thumb: styles.thumb,
        mark: styles.sliderMarks,
      }}
      marks
      min={0}
      max={SLIDER_MAX_VALUE}
      onChange={handleSliderChange}
      step={SLIDER_STEP}
      valueLabelDisplay="auto"
      value={value}
      ValueLabelComponent={ValueLabel}
    />
  );
};
