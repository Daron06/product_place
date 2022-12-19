import { InputBase } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearIcon from '@material-ui/icons/Clear';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { Checkbox } from 'components/Checkbox';
import { Chip } from 'components/Chip';
import { Icon } from 'components/Icon';
import React from 'react';

import styles from './FilterList.module.scss';

type FilterItem<T> = { name: string; value: T };

export interface FilterListProps<T> {
  classes?: {
    chipRoot?: string;
    chipLabel?: string;
  };
  disabled?: boolean;
  items: FilterItem<T>[];
  onApply?: (ids: T[]) => void;
  onReset?: () => void;
  label: string;
  placeholder?: string;
  searchable?: boolean;
  values?: T[];
  radio?: boolean;
  testId?: string;
  popoverTitle?: string;
  isLoading?: boolean;
}

export function FilterList<T>({
  classes,
  disabled,
  items,
  values = [],
  onApply,
  onReset,
  label,
  placeholder,
  searchable = true,
  radio = false,
  isLoading = false,
  testId,
  popoverTitle,
}: FilterListProps<T>): React.ReactElement {
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedIds, setSelectedIds] = React.useState(values);
  const [filterApplied, setFilterApplied] = React.useState(false);

  React.useEffect(() => {
    if (values?.length) {
      setFilterApplied(true);
      setSelectedIds(values);
    }
  }, [values]);

  const handleApply = (): void => {
    setFilterApplied(true);
    setSearchText('');
    if (onApply) {
      onApply(selectedIds);
    }
  };

  const onToggleChecked = (value: T): void => {
    if (radio) {
      setSelectedIds([]);
    }

    if (selectedIds.includes(value)) {
      setSelectedIds((prev) => prev.filter((val) => val !== value));
    } else {
      setSelectedIds((prev) => [...prev, value]);
    }
  };

  const handleSearch = (event: React.ChangeEvent<{ value: string }>): void => {
    const { value } = event.currentTarget;
    setSearchText(value);
  };

  const handleFilterReset = (): void => {
    setFilterApplied(false);
    setSelectedIds([]);
    if (onReset) {
      onReset();
    }
  };

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase().trim()));

  return (
    <Chip
      disabled={disabled}
      color={filterApplied ? 'primary' : 'default'}
      classes={{
        root: classes?.chipRoot,
        label: classes?.chipLabel,
      }}
      deleteIcon={<ClearIcon />}
      popoverClasses={{
        popoverBody: styles.popoverBody,
      }}
      label={label}
      popoverTitle={popoverTitle || label}
      disableApplyButton={!filteredItems.length || !selectedIds.length}
      onApply={handleApply}
      onClear={filterApplied ? handleFilterReset : undefined}
      testId={testId}
      popovered
    >
      <div className="d-flex flex-column">
        {searchable && (
          <div className={styles.search}>
            <InputBase
              type="text"
              fullWidth
              onChange={handleSearch}
              placeholder={placeholder}
              startAdornment={
                <div className={styles.searchIcon}>
                  <Icon type="search" />
                </div>
              }
              value={searchText}
            />
            {!filteredItems.length && (
              <div className={styles.searchIconClear} onClick={(): void => setSearchText('')}>
                <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 320 320" width="10px">
                  <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
              </div>
            )}
          </div>
        )}

        {isLoading
          ? [...Array(5)].map((_, index) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                variant="rect"
                width={230}
                height={15}
                className={clsx('mb-15', styles.skeletonItem)}
              />
            ))
          : filteredItems.map((item) => (
              <FormControlLabel
                key={String(item.value)}
                classes={{ root: styles.formControl }}
                control={
                  <Checkbox
                    checked={selectedIds.includes(item.value)}
                    onChange={(): void => onToggleChecked(item.value)}
                  />
                }
                label={item.name}
                value={item.value}
                data-test-id={`${testId}-item`}
                data-test-value={item.value}
              />
            ))}
      </div>
    </Chip>
  );
}
