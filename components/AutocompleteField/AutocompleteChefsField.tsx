import { Avatar, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Immutable } from 'immer';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { StaffApi } from 'services/api/admin/StaffApi';

import { ChefsApi } from '../../services/api/admin/ChefsApi';
import { ResponseItems, StatusEnum } from '../../services/types';
import styles from './AutocompleteField.module.scss';
import { AutocompleteOptionItem } from './index';

interface AutocompleteChefsFieldProps<T> {
  items?: T[] | Immutable<Partial<T>[]>;
  defaultValue?: T;
  placeholder?: string;
  error?: FieldError;
  name: string;
  onChange?: (option: T | null) => void;
  value?: T;
  autoFocus?: boolean;
}

export function AutocompleteChefsField<T extends AutocompleteOptionItem>({
  error,
  items,
  placeholder,
  name,
  onChange,
  value,
  autoFocus,
  defaultValue,
}: AutocompleteChefsFieldProps<T>): React.ReactElement {
  const [options, setOptions] = React.useState<AutocompleteChefsFieldProps<T>['items']>(items || []);
  const inputRef = React.useRef<HTMLInputElement>();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.querySelector('input')?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (open) {
      (async () => {
        const searchAsyncMethod = name === 'chef' ? ChefsApi.getAll : StaffApi.getSuppliers;
        const data = (await searchAsyncMethod({
          query: inputValue,
          status: StatusEnum.ACTIVE,
        })) as ResponseItems<any>;
        setOptions(
          data.items.map(
            (obj) =>
              obj &&
              ({
                id: obj.id,
                name: obj.name,
                image: obj.image,
                description: obj.description,
                slug: obj.slug,
              } as T),
          ),
        );
      })();
    }
  }, [open, inputValue]);

  const handleChangeAutocomplete = (_, item: any): void => {
    if (onChange) {
      onChange(typeof item === 'object' ? item : null);
      setTimeout(() => {
        setInputValue('');
      });
    }
  };

  return (
    <>
      <Autocomplete<T, undefined, undefined, true>
        defaultValue={defaultValue}
        inputValue={inputValue}
        options={options as T[]}
        onInputChange={(_, val: string): void => setInputValue(val)}
        getOptionLabel={(option): string => option.name ?? ''}
        classes={{
          listbox: 'scroll',
          paper: styles.autocompletePaper,
        }}
        onOpen={(): void => setOpen(true)}
        onClose={(): void => setOpen(false)}
        data-test-id={`${name}-field`}
        value={value}
        ref={inputRef}
        onChange={onChange ? handleChangeAutocomplete : undefined}
        renderOption={(option): React.ReactElement => (
          <span className={styles.listItem} data-test-id={`${name}-item`}>
            {option.image && (
              <ListItemAvatar style={{ minWidth: 45 }}>
                <Avatar className={styles.listImage} alt={option.name} src={option.image} />
              </ListItemAvatar>
            )}
            <ListItemText
              className={styles.popupListItemText}
              primary={<b>{option.name}</b>}
              secondary={
                option.description && (
                  <>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {option.description.substr(0, 40)}
                    </Typography>
                  </>
                )
              }
            />
          </span>
        )}
        renderInput={(params): React.ReactElement => (
          <TextField
            name={name}
            classes={{
              root: styles.autocompleteInputRoot,
            }}
            {...params}
            value={inputValue}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
            placeholder={placeholder}
          />
        )}
        freeSolo
      />
      {error && (
        <p className="error-label" data-test-id={`${name}-error-message`}>
          {error}
        </p>
      )}
    </>
  );
}
