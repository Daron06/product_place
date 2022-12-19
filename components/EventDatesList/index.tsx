import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { EventDate } from 'components/AddEventDate';
import { Icon } from 'components/Icon';
import format from 'date-fns/format';
import get from 'lodash/get';
import Link from 'next/link';
import React from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import { ProductDates } from '../../redux/ducks/products/types/contracts';
import { ErrorText } from '../ErrorText';
import styles from './EventDatesList.module.scss';

interface EventDatesListProps {
  items?: Partial<EventDate>[];
  onRemove: (index: number) => void;
  onEditDateClick: (index: number) => void;
  editIndex: number | null;
  onChangeRepeat: (index: number, checked: boolean) => void;
  errors: FieldErrors<{
    dates: ProductDates[];
  }>;
}

interface ControlledTextProps {
  defaultValue: string | undefined;
  name: string;
  value: string | undefined;
}

interface EventDateLabelProps extends Partial<ControlledTextProps> {
  day: string;
  date: string;
  isWeekly: boolean | undefined;
  onSwitch: (checked: boolean) => void;
}

const EventDateLabel: React.FC<EventDateLabelProps> = ({ isWeekly, day, date, onSwitch }): React.ReactElement => {
  return (
    <FormControlLabel
      classes={{ label: styles.text }}
      control={
        <Switch
          checked={isWeekly}
          color="secondary"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onSwitch(event.target.checked)}
        />
      }
      label={isWeekly ? <span>Weekly on {day}</span> : <span>{format(new Date(date), 'EEEE, MMM dd, yyyy')}</span>}
    />
  );
};

export const EventDatesList: React.FC<EventDatesListProps> = ({
  items,
  onEditDateClick,
  onRemove,
  editIndex,
  onChangeRepeat,
  errors,
}): React.ReactElement | null => {
  if (!items) {
    return null;
  }

  return (
    <ul>
      {items.map((field, index) => (
        <div key={field.id}>
          <li className={styles.item} key={field.date}>
            <div className={styles.dateBlock}>
              <EventDateLabel
                isWeekly={field.isWeekly}
                day={field.day ?? ''}
                date={field.date ?? ''}
                onSwitch={(checked): void => onChangeRepeat(index, checked)}
              />
            </div>
            <div className={styles.growBlock}>
              <Typography className={styles.text}>{field.from} to</Typography>
              <Typography className={styles.text}>
                &nbsp;
                {field.to}
              </Typography>
              {field.url && (
                <Link href={field.url}>
                  <IconButton className="ml-30">
                    <Icon type="link" />
                  </IconButton>
                </Link>
              )}
            </div>
            <div className="d-flex align-items-center ml-auto">
              {editIndex !== index ? (
                <>
                  <IconButton color="secondary" onClick={(): void => onEditDateClick(index)}>
                    <Icon type="launch" />
                  </IconButton>
                  <IconButton className={styles.closeIcon} onClick={(): void => onRemove(index)}>
                    <Icon type="close" />
                  </IconButton>
                </>
              ) : (
                <div style={{ height: 41, width: 41 }} />
              )}
            </div>
          </li>
          {get(errors, `dates[${index}].date.message`) && <ErrorText text="The selected date has passed" focus />}
        </div>
      ))}
    </ul>
  );
};
