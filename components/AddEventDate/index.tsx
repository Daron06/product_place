import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { DatePicker } from 'components/DatePicker';
import { TimeRangeSlider } from 'components/TimeRangeSlider';
import format from 'date-fns/format';
import React from 'react';
import { ArrayField } from 'react-hook-form';
import { ProductDates } from 'redux/ducks/products/types/contracts';
import { convertDateToMinutes } from 'utils/date/convertDateToMinutes';
import { convertMinutesToHours } from 'utils/date/convertMinutesToHours';

import styles from './AddEventDate.module.scss';

export type EventDate = Pick<ProductDates, 'date' | 'day' | 'from' | 'isWeekly' | 'to' | 'url'> & { id?: string };

interface AddEventDateProps {
  value?: Partial<ArrayField<EventDate, 'id'>> | null;
  duration: number;
  onEventAdd: (data: EventDate) => void;
  onCancel: (value?: boolean) => void;
}

export const AddEventDate: React.FC<AddEventDateProps> = ({
  value,
  duration,
  onEventAdd,
  onCancel,
}): React.ReactElement => {
  const [dateValue, setDateValue] = React.useState('');
  const [isWeekly, toggleIsWeekly] = React.useState<boolean>(false);
  const [sliderValue, setSliderValue] = React.useState<[number, number]>([720, 780]);

  React.useEffect(() => {
    if (duration && sliderValue) {
      setSliderValue([sliderValue[0], sliderValue[0] + Number(duration)]);
    }
  }, [duration]);

  React.useEffect(() => {
    if (value?.date) {
      setDateValue(value?.date);
    }

    if (value?.from && value?.to) {
      setSliderValue(convertDateToMinutes([value?.from, value?.to]));
    }

    if (value?.isWeekly) {
      toggleIsWeekly(value?.isWeekly);
    }
  }, [value]);

  const handleSelectDate = (date: Date): void => {
    setDateValue(format(new Date(date), 'EEEE, MMM dd, yyyy'));
  };

  const handleRepeatChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    toggleIsWeekly(event.target.checked);
  };

  const handleTimeRangeChange = (range): void => {
    setSliderValue(range);
  };

  const handleAddNewEventDate = (): void => {
    if (sliderValue) {
      const [from, to] = convertMinutesToHours(sliderValue);
      onEventAdd({
        day: dateValue.split(',')[0],
        date: dateValue,
        from,
        to,
        isWeekly,
        url: '',
      });
    }
  };

  return (
    <>
      <div className="mb-40">
        <div className="d-flex align-items-center">
          <DatePicker<Date>
            classes={{ root: styles.datepicker, input: styles.datepickerInput }}
            name="Date"
            minDate={new Date()}
            onSelect={handleSelectDate}
            value={dateValue}
            label="Date"
          />
          <FormControlLabel
            className="mt-20"
            control={<Checkbox checked={isWeekly} name="isWeekly" color="secondary" onChange={handleRepeatChange} />}
            label="Repeat"
          />
        </div>
      </div>
      <div className="mb-20">
        <TimeRangeSlider duration={duration} value={sliderValue} onChange={handleTimeRangeChange} />
      </div>
      <div className={styles.controlsBtns}>
        <Button color="secondary" variant="outlined" onClick={(): void => onCancel(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!dateValue}
          variant="contained"
          className="ml-10"
          onClick={handleAddNewEventDate}
        >
          Save
        </Button>
      </div>
    </>
  );
};
