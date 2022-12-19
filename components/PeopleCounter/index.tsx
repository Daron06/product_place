import Typography from '@material-ui/core/Typography';
import useMap from 'ahooks/lib/useMap';
import clsx from 'clsx';
import { AddCartButtons } from 'components/AddCartButtons';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './PeopleCounter.module.scss';

interface PeopleCounterProps {
  classes?: {
    root?: string;
  };
  maxCount?: number | undefined;
  onChange: (value: { [k: string]: number }) => void;
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  guests: { [k: string]: number };
  minusIsDisabled?: boolean;
}

export const PeopleCounter: React.FC<PeopleCounterProps> = ({
  classes,
  maxCount,
  onChange,
  plusDisabled,
  minusDisabled,
  guests,
  minusIsDisabled = true,
}) => {
  const [map, { set, get }] = useMap<string, number>([['adults', 1]]);
  const { t } = useTranslate('checkout');

  React.useEffect(() => {
    if (map.get('adults') !== guests.adults) {
      set('adults', guests.adults);
    }
  }, [guests]);

  const rootClsx = clsx(styles.item, classes?.root);
  const maxCountExceeded = (): boolean => {
    const totalCount = Number(get('adults'));
    return Boolean(maxCount && totalCount === maxCount);
  };

  const handleOnPlus = (key: string): void => {
    if (maxCountExceeded()) {
      return;
    }

    set(key, (get(key) || 0) + 1);
    onChange(Object.fromEntries(map));
  };

  const handleOnMinus = (key: string): void => {
    set(key, (get(key) || 0) - 1);
    onChange(Object.fromEntries(map));
  };

  return (
    <>
      {Array.from(map).map(
        ([key, value]): React.ReactElement => (
          <div
            key={`${key}-${value}`}
            className={`d-flex align-items-center justify-content-between ${rootClsx}`}
            data-testid={key}
          >
            <Typography className={styles.key}>{key === 'adults' ? t('people') : key}</Typography>
            <AddCartButtons
              count={value}
              disabled={maxCountExceeded()}
              plusDisabled={plusDisabled}
              minusDisabled={(minusIsDisabled && guests.adults === 1) || minusDisabled}
              onPlus={(): void => handleOnPlus(key)}
              onMinus={(): void => handleOnMinus(key)}
              size="large"
            />
          </div>
        ),
      )}
    </>
  );
};
