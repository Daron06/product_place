import { Avatar, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Immutable } from 'immer';
import React from 'react';
import { FieldError } from 'react-hook-form';

import { ChefsApi } from '../../services/api/admin/ChefsApi';
import styles from './AutocompleteField.module.scss';

export interface AutocompleteOptionItem {
  id?: string | number;
  name: string;
  name__ar?: string | null;
  image?: string;
  description?: string;
  slug?: string;
}

interface AutocompleteFieldProps<T> {
  items: T[] | Immutable<Partial<T>[]>;
  defaultValue?: T;
  placeholder?: string;
  error?: FieldError;
  name: string;
  onChange?: (option: T | null) => void;
  onInputChange?: (value: string) => void;
  value?: T;
  inputValue?: string;
  autoFocus?: boolean;
}

export function AutocompleteField<T extends AutocompleteOptionItem>({
  error,
  items,
  inputValue,
  placeholder,
  name,
  onChange,
  onInputChange,
  value,
  autoFocus,
  defaultValue,
}: AutocompleteFieldProps<T>): React.ReactElement {
  const [options, setOptions] = React.useState<AutocompleteFieldProps<T>['items']>(items);
  const inputRef = React.useRef<HTMLInputElement>();
  const [open, setOpen] = React.useState(false);
  const isChefField = name === 'chef';

  React.useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.querySelector('input')?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (!isChefField) {
      setOptions(items);
    }
  }, [items, isChefField]);

  React.useEffect(() => {
    if (open && isChefField) {
      (async () => {
        const data = await ChefsApi.getAll({
          query: inputValue,
        });
        setOptions(
          data.items.map(
            (obj) =>
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
  }, [open, inputValue, isChefField]);

  return (
    <>
      <Autocomplete<T, undefined, undefined, true>
        defaultValue={defaultValue}
        options={options as T[]}
        onInputChange={onInputChange ? (_, val: string): void => onInputChange(val) : undefined}
        getOptionLabel={(option): string => option.name ?? ''}
        classes={{
          listbox: 'scroll',
          paper: styles.autocompletePaper,
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        data-test-id={`${name}-field`}
        value={value}
        ref={inputRef}
        onChange={onChange ? (_, item): void => onChange(typeof item === 'object' ? item : null) : undefined}
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
