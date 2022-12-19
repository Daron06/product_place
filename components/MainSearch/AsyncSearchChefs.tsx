import { InputBase, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearIcon from '@material-ui/icons/Clear';
import { Skeleton } from '@material-ui/lab';
import { useDebounceEffect } from 'ahooks';
import React from 'react';

import { useAlert } from '../../hooks/useAlert';
import { Chef } from '../../redux/ducks/products/types/contracts';
import { ChefApi } from '../../services/api/ChefApi';
import { Checkbox } from '../Checkbox';
import { Chip } from '../Chip';
import styles from '../FilterList/FilterList.module.scss';
import { Icon } from '../Icon';
import mainSearchStyles from './MainSearch.module.scss';

interface AsyncSearchChefProps {
  title: string;
  label: string;
  onFilterApply: (ids: number[]) => void;
  onFilterReset: () => void;
  placeholder: string;
  popoverTitle: string;
}

export const AsyncSearchChef: React.FC<AsyncSearchChefProps> = ({
  title,
  label,
  placeholder,
  popoverTitle,
  onFilterApply,
  onFilterReset,
}) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [data, setData] = React.useState<Chef[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Chef[]>([]);
  const [filterApplied, setFilterApplied] = React.useState(false);
  const lastLengthRef = React.useRef(4);
  const { openAlert } = useAlert();

  const handleSearch = (event: React.ChangeEvent<{ value: string }>): void => {
    const { value } = event.currentTarget;
    setSearchText(value);
    setLoading(true);
  };

  const onToggleChecked = (chef: Chef): void => {
    const obj = selectedIds.find((o) => +o.id === +chef.id);
    if (obj) {
      setSelectedIds((prev) => prev.filter((o) => +o.id !== +chef.id));
    } else {
      setSelectedIds((prev) => [...prev, chef]);
    }
  };

  const handleApply = (): void => {
    setFilterApplied(true);
    setSearchText('');
    onFilterApply(selectedIds.map((o) => +o.id));
  };

  const handleFilterReset = (): void => {
    setFilterApplied(false);
    setSelectedIds([]);
    onFilterReset();
  };

  useDebounceEffect(
    () => {
      (async (): Promise<void> => {
        try {
          setLoading(true);
          const json = await ChefApi.getAll({ query: searchText });
          setData(json.items);
          lastLengthRef.current = json.items.length || 4;
          setLoading(false);
        } catch (err) {
          openAlert(`An error occurred while search`, 'error');
        }
      })();
    },
    [searchText],
    { wait: 200 },
  );

  return (
    <div className={mainSearchStyles.filterItem}>
      <Typography className={mainSearchStyles.blockTitle} variant="body2">
        <b>{title}</b>
      </Typography>
      <Chip
        deleteIcon={<ClearIcon />}
        classes={{
          root: mainSearchStyles?.chip,
          label: mainSearchStyles?.chipLabel,
        }}
        popoverClasses={{
          popoverBody: styles.popoverBody,
        }}
        label={
          filterApplied
            ? selectedIds
                .filter((o) => selectedIds.some((s) => s.id === o.id))
                .map((o) => o.name)
                .join(', ')
            : label
        }
        popoverTitle={popoverTitle}
        onApply={handleApply}
        onClear={filterApplied ? handleFilterReset : undefined}
        popovered
      >
        <div className={styles.search}>
          <InputBase
            type="text"
            fullWidth
            onChange={handleSearch}
            placeholder={placeholder}
            autoFocus
            startAdornment={
              <div className={styles.searchIcon}>
                <Icon type="search" />
              </div>
            }
            value={searchText}
          />
          {searchText && (
            <div className={styles.searchIconClear} onClick={(): void => setSearchText('')}>
              <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 320 320" width="10px">
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
              </svg>
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-30">
            {[...Array(lastLengthRef.current)].map((_, index) => (
              <div className={styles.skeletonLine} key={index}>
                <Skeleton key={index} variant="rect" width={190} height={15} className={styles.skeletonItem} />
                <Skeleton key={index} variant="rect" width={21} height={21} className={styles.skeletonItem} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {filterApplied &&
              selectedIds.map((item) => (
                <FormControlLabel
                  key={String(item.id)}
                  classes={{ root: styles.formControl }}
                  control={
                    <Checkbox
                      checked={selectedIds.some((o) => o.id === item.id)}
                      onChange={(): void => onToggleChecked(item)}
                    />
                  }
                  label={item.name}
                  value={item.id}
                />
              ))}
            {data
              .filter((o) => (!filterApplied ? true : !selectedIds.some((s) => s.id === o.id)))
              .map((item) => (
                <FormControlLabel
                  key={String(item.id)}
                  classes={{ root: styles.formControl }}
                  control={
                    <Checkbox
                      checked={selectedIds.some((o) => o.id === item.id)}
                      onChange={(): void => onToggleChecked(item)}
                    />
                  }
                  label={item.name}
                  value={item.id}
                />
              ))}
          </>
        )}
      </Chip>
    </div>
  );
};
