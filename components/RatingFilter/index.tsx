import { FormControlLabel, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import useSet from 'ahooks/lib/useSet';
import { Checkbox } from 'components/Checkbox';
import { Chip } from 'components/Chip';
import { FilterListProps } from 'components/FilterList';
import styles from 'components/FilterList/FilterList.module.scss';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

type RatingFilterProps = Pick<FilterListProps<number>, 'classes' | 'onApply' | 'onReset' | 'label'>;

export const RatingFilter: React.FC<RatingFilterProps> = ({ classes, onApply, onReset, label }): React.ReactElement => {
  const [selectedIds, { add, remove, reset }] = useSet<number>([]);

  const handleFilterApply = (): void => {
    if (onApply) {
      onApply([...selectedIds]);
    }
  };

  const handleFilterReset = (): void => {
    reset();
    if (onReset) {
      onReset();
    }
  };

  const onToggleChecked = (value: number | string): void => {
    if (selectedIds.has(Number(value))) {
      return void remove(Number(value));
    }

    if (typeof value === 'string') {
      reset();
      return void add(Number(value));
    }

    remove(0);
    return void add(value);
  };

  const { t } = useTranslate('rating-filter');

  return (
    <Chip
      color={selectedIds.size ? 'primary' : 'default'}
      classes={{
        root: classes?.chipRoot,
        label: classes?.chipLabel,
      }}
      deleteIcon={<ClearIcon />}
      popoverClasses={{
        popoverBody: styles.popoverBody,
      }}
      label={label}
      popoverTitle={label}
      onApply={handleFilterApply}
      onClear={selectedIds.size ? handleFilterReset : undefined}
      popovered
    >
      <div className="d-flex flex-column">
        {[5, 4, 3, 2, 1, 0].map((item) => (
          <FormControlLabel
            key={item}
            classes={{ root: styles.formControl }}
            control={<Checkbox checked={selectedIds.has(Number(item))} onChange={(): void => onToggleChecked(item)} />}
            value={item}
            label={
              Number(item) > 0 ? (
                <div className="d-flex">
                  {Array.from(Array(item).keys()).map((count) => (
                    <div className={styles.thumbsUp} key={count}>
                      <Icon type="thumbs-up" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex">
                  <div className={styles.nothingThumbsUp}>
                    <Icon type="thumbs-up" />
                  </div>
                  <Typography className={styles.tumbsText} variant="body2">
                    {t('no-rating')}
                  </Typography>
                </div>
              )
            }
          />
        ))}
      </div>
    </Chip>
  );
};
