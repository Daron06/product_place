import Typography from '@material-ui/core/Typography';
import { AddEventDate, EventDate } from 'components/AddEventDate';
import { EventDatesList } from 'components/EventDatesList';
import { FormField } from 'components/FormField';
import { Select } from 'components/Select';
import React, { useContext } from 'react';
import { ArrayField, useFormContext } from 'react-hook-form';
import { durationBetween } from 'utils/date/convertDateToMinutes';

import { useList } from '../../../../hooks/useList';
import { ErrorText } from '../../../ErrorText';
import { AdminChefTableContext } from '../staff/chef-table';

const durationTimes = [
  {
    value: '60',
    name: '1 hour',
  },
  {
    value: '120',
    name: '2 hours',
  },
  {
    value: '180',
    name: '3 hours',
  },
  {
    value: '240',
    name: '4 hours',
  },
  {
    value: '300',
    name: '5 hours',
  },
  {
    value: '360',
    name: '6 hours',
  },
  {
    value: '420',
    name: '7 hours',
  },
  {
    value: '480',
    name: '8 hours',
  },
];

export interface DateEventsBlockProps {
  defaultDatesValue?: EventDate[];
  type?: 'chefTable' | 'masterClass';
}

type DateFields = Partial<ArrayField<EventDate, 'id'>>;

export const DateEventsBlock: React.FC<DateEventsBlockProps> = ({ type }): React.ReactElement => {
  const { errors, formState, register } = useFormContext();
  const { dates, setChefTableDates } = useContext(AdminChefTableContext);
  const isMountedRef = React.useRef(false);
  const [showAddForm, setVisibleAddForm] = React.useState(false);
  const [editDate, setEditDate] = React.useState<DateFields | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [duration, setDuration] = React.useState<string>('60');

  const [fields, add, remove, update, set] = useList<EventDate>(dates);

  React.useEffect(() => {
    if (dates && !isMountedRef.current) {
      set(dates);
      isMountedRef.current = true;
    }
  }, [dates]);

  React.useEffect(() => {
    setChefTableDates(fields);
  }, [fields]);

  const onAddEvent = (dateObj: EventDate): void => {
    const { from } = dateObj;
    const { to } = dateObj;
    const newObj = { ...dateObj, from, to };
    if (currentIndex === null) {
      add(newObj);
    } else {
      const currentDate = fields[currentIndex];
      update({
        newValue: { ...newObj, id: currentDate.id, url: currentDate.url },
        index: currentIndex,
      });
    }
    setVisibleAddForm(false);
    setCurrentIndex(null);
  };

  const onClickEditDate = (index: number): void => {
    const currentEvent = fields[index];
    const currentDuration = durationBetween([currentEvent.from, currentEvent.to]);
    setDuration(String(currentDuration));
    setEditDate(currentEvent);
    setVisibleAddForm(true);
    setCurrentIndex(index);
  };

  const onCloseForm = (): void => {
    setCurrentIndex(null);
    setVisibleAddForm(false);
  };

  const onChangeRepeat = (index: number, checked: boolean): void => {
    const currentDate = fields[index];
    update({
      newValue: { ...currentDate, isWeekly: checked },
      index,
    });
  };

  const onChangeDuration = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const obj = durationTimes.find((time) => time.value === event.target.value);
    if (obj) {
      setDuration(obj.value);
    }
  };

  return (
    <>
      {type !== 'chefTable' && (
        <>
          <p className="fw-bold">How many days does the masterclass last?</p>
          <div style={{ width: 100 }}>
            <FormField name="days" type="number" defaultValue="1" register={register} />
          </div>
        </>
      )}

      {fields.length > 0 && (
        <div className="mb-20">
          <EventDatesList
            onChangeRepeat={onChangeRepeat}
            items={fields}
            onRemove={(index): void => remove({ index })}
            onEditDateClick={onClickEditDate}
            editIndex={currentIndex}
            errors={errors}
          />
        </div>
      )}
      {showAddForm ? (
        <>
          <Select
            defaultValue={duration}
            onChange={onChangeDuration}
            items={durationTimes}
            label="Duration"
            name="duration"
            fullWidth
          />
          <AddEventDate value={editDate} duration={Number(duration)} onCancel={onCloseForm} onEventAdd={onAddEvent} />
        </>
      ) : (
        <Typography onClick={(): void => setVisibleAddForm(true)} color="secondary" className="link d-ib">
          + Add more
        </Typography>
      )}
      {formState.isSubmitted && errors.dates?.message && <ErrorText focus>{errors.dates?.message}</ErrorText>}
    </>
  );
};
