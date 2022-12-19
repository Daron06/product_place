import { IconButton } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import usePrevious from 'ahooks/lib/usePrevious';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React, { FC } from 'react';

import { Button } from '../Button';
import styles from './Search.module.scss';

export interface SearchProps {
  classes?: {
    root?: string;
    singleInput?: string;
  };
  onSubmit?: (value: string) => void;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  isMainSearch?: boolean;
}

export const Search: FC<SearchProps> = ({
  classes,
  children,
  onChange,
  placeholder,
  value = '',
  loading = false,
  onSubmit,
  isMainSearch = false,
}): React.ReactElement => {
  const [valueSearch, setValueSearch] = React.useState<string>(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const prevValueSearch = usePrevious(valueSearch);
  const disableSearchButton = loading || !valueSearch || valueSearch === prevValueSearch;
  const { t } = useTranslate('search');

  React.useEffect(() => {
    if (value !== valueSearch) {
      setValueSearch(value);
    }
  }, [value]);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(valueSearch);
    }
    if (onChange) {
      onChange(valueSearch);
    }
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValueSearch(event.target.value);
    if (event.target.value === '' && onChange) {
      onChange('');
    }
  };

  const onClear = (): void => {
    setValueSearch('');
    onChange?.('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className={clsx(styles.root, classes?.root)}>
        {children && <div className={styles.multipleList}>{Boolean(children) && children}</div>}
        {!children && (
          <div className={styles.inputWrapper}>
            <InputBase
              classes={{ input: classes?.singleInput }}
              type="text"
              fullWidth
              placeholder={placeholder}
              onChange={onChangeSearch}
              startAdornment={
                <div className={styles.searchIcon}>
                  <Icon type="search" />
                </div>
              }
              value={valueSearch || ''}
              inputRef={inputRef}
            />
          </div>
        )}
        {valueSearch && (
          <IconButton className="mr-15" onClick={onClear}>
            <Icon type="close" />
          </IconButton>
        )}
        <Button
          color="primary"
          classes={{ root: styles.buttonSearch }}
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          disabled={!isMainSearch && disableSearchButton}
        >
          <Icon type="search-bold" className={styles.searchButtonIcon} />
          <span className={styles.searchButtonText}>{t('search')}</span>
        </Button>
      </div>
    </form>
  );
};
