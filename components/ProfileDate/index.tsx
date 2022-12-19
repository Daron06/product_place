import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import { Calendar } from 'components/Calendar';
import { Chip } from 'components/Chip';
import format from 'date-fns/format';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useTranslate } from '../../hooks/useTranslate';
import { FieldMask } from '../FieldMask';
import styles from './ProfileDate.module.scss';

interface ProfileDateProps {
  type?: 'birthday' | 'expirationDate';
  notEarlier?: boolean;
  i18n?: {
    birthday?: string;
    expiration?: string;
    birthdayPlaceholder?: string;
    expirationPlaceholder?: string;
  };
}

const defaultI18n: ProfileDateProps['i18n'] = {
  birthday: 'Date of birth',
  expiration: 'Expiration date',
  birthdayPlaceholder: 'Birthday is empty',
  expirationPlaceholder: 'Expiration date is empty',
};

const ProfileDate: React.FC<ProfileDateProps> = ({ type = 'birthday', notEarlier, i18n = defaultI18n }) => {
  const { setValue, watch } = useFormContext();
  const { t } = useTranslate('profile');
  const currentDay = watch(type);
  const [date, setDate] = React.useState<Date>(
    new Date(type === 'birthday' ? currentDay || '1,1,1990' : currentDay || new Date()),
  );

  const handleSelectDate = (): void => {
    setValue(type, format(date, 'MM-dd-yyyy'), { shouldValidate: true });
  };

  React.useEffect(() => {
    if (currentDay) {
      const [month, day, year] = currentDay.split('-').map(Number);
      const formatDate = new Date();
      formatDate.setFullYear(year, month - 1, day);
      setDate(formatDate);
    }
  }, [currentDay]);

  return (
    <div className={styles.root}>
      <FieldMask
        label={type === 'birthday' ? t('settings.date-of-birth', { defaultValue: i18n.birthday }) : i18n.expiration}
        format="##-##-####"
        name={type}
        placeholder={
          type === 'birthday'
            ? t('settings.date-of-birth-placeholder', { defaultValue: i18n.birthdayPlaceholder })
            : i18n.expirationPlaceholder
        }
      />
      <div className={styles.calendar}>
        <Chip
          className={styles.chipWrapper}
          popoverClasses={{
            paper: styles.dateFilterPaper,
            popoverBody: styles.datePopoverBody,
          }}
          icon={<CalendarTodayOutlinedIcon />}
          popovered
          onApply={handleSelectDate}
          disableApplyButton={isNaN(date.getTime())}
        >
          <Calendar minDate={notEarlier ? new Date() : undefined} mode="single" selected={date} onSelect={setDate} />
        </Chip>
      </div>
    </div>
  );
};

export default ProfileDate;
