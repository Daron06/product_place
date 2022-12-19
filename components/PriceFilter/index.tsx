import Slider from '@material-ui/core/Slider';
import { ValueLabelProps } from '@material-ui/core/Slider/Slider';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import { Chip } from 'components/Chip';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './PriceFilter.module.scss';

export interface PriceFilterProps {
  classes?: {
    root?: string;
    label?: string;
  };
  label?: string;
  onApply?: (priceRange: [number, number]) => void;
  onReset?: () => void;
  range: [number, number];
  value?: [number, number];
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  classes,
  onApply,
  onReset,
  range,
  value,
}): React.ReactElement => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>(value || range);
  const [isApplied, setIsApplied] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (value) {
      setPriceRange(value);
      setIsApplied(true);
    }
  }, [value]);

  const handlePriceRangeChange = (_: unknown, newValue: number | number[]): void => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const [minPrice, maxPrice] = newValue;

    if (minPrice > maxPrice) {
      setPriceRange([maxPrice, minPrice]);
    } else {
      setPriceRange([minPrice, maxPrice]);
    }
  };

  const onPriceRangeApply = (): void => {
    if (priceRange && onApply) {
      onApply(priceRange);
      setIsApplied(true);
    }
  };

  const handleFilterReset = (): void => {
    setPriceRange(range);
    if (onReset) {
      onReset();
      setIsApplied(false);
    }
  };

  const ValueLabel: React.FC<ValueLabelProps & { index: number }> = (props) => {
    const { children, value: val, index } = props;
    return React.cloneElement(
      children,
      {
        className: clsx(children.props.className),
      },
      <span className={styles.thumbWrapper}>
        <span className={clsx(styles.thumb, { [styles.rightThumb]: index === 1 })}>{val}</span>
      </span>,
    );
  };

  const { t } = useTranslate('booking-filters');

  return (
    <Chip
      popoverClasses={{
        popoverBody: styles.popoverBody,
      }}
      color={isApplied ? 'primary' : 'default'}
      classes={{
        root: classes?.root,
        label: classes?.label,
      }}
      deleteIcon={<ClearIcon />}
      popoverTitle={t('price-range')}
      label={t('price')}
      onApply={onPriceRangeApply}
      onClear={isApplied ? handleFilterReset : undefined}
      testId="price-filter"
      popovered
    >
      <div className={styles.sliderWrapper}>
        <Slider
          aria-labelledby="range-slider"
          classes={{ root: styles.slider }}
          defaultValue={priceRange}
          valueLabelFormat={(val): string => `AED ${val}`}
          ValueLabelComponent={ValueLabel as React.ElementType<ValueLabelProps>}
          min={range[0]}
          max={range[1]}
          step={10}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          value={priceRange}
        />
      </div>
    </Chip>
  );
};
