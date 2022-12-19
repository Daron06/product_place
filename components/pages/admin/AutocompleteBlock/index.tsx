import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AutocompleteField, AutocompleteOptionItem } from 'components/AutocompleteField';
import { Icon } from 'components/Icon';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { Immutable } from 'immer';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UserRole } from 'redux/ducks/user/types/state';

import { AutocompleteChefsField } from '../../../AutocompleteField/AutocompleteChefsField';

interface AutocompleteBlockProps<T> {
  disabled?: boolean;
  items?: T[] | Immutable<T[]> | null;
  name: string;
  title: string;
  value?: T | undefined;
  onChange?: (data: T) => void;
  role?: UserRole;
}

export function AutocompleteBlock<T extends AutocompleteOptionItem>({
  disabled = false,
  items,
  name,
  title,
  onChange,
  value,
  role = UserRole.SUPPLIER,
}: AutocompleteBlockProps<T>): React.ReactElement {
  const { errors, register, setValue } = useFormContext();
  const [autoCompleteValue, setAutoCompleteValue] = React.useState<T | undefined>(value);

  React.useEffect(() => {
    register(name);
  }, [name, register]);

  const handleAutocompleteChange = (data): void => {
    setValue(name, data, { shouldValidate: true });
    setAutoCompleteValue(data);
    onChange?.(data);
  };

  const handleClearAutocomplete = (): void => {
    // TODO Implement autofocus after cleaning input
    setValue(name, null, { shouldValidate: true });
    setAutoCompleteValue(undefined);
  };

  return (
    <WhiteBlock title={title} disabled={disabled}>
      {!autoCompleteValue &&
        (name === 'chef' ? (
          <AutocompleteChefsField
            error={role === UserRole.SUPPLIER ? errors.supplier?.message || errors.chef?.message : errors.chef?.message}
            items={items ?? []}
            name={name}
            onChange={handleAutocompleteChange}
            placeholder={`Select ${name}...`}
            value={value}
            autoFocus
          />
        ) : (
          <AutocompleteField
            error={role === UserRole.SUPPLIER ? errors.supplier?.message || errors.chef?.message : errors.chef?.message}
            items={items ?? []}
            name={name}
            onChange={handleAutocompleteChange}
            placeholder={`Select ${name}...`}
            value={value}
            inputValue=""
            autoFocus
          />
        ))}
      {autoCompleteValue && (
        <div className="d-flex align-items-center">
          <Avatar src={autoCompleteValue.image} />
          <div className="d-flex flex-column ml-10">
            <Typography>{autoCompleteValue.name}</Typography>
            <Typography className="fz-large-13 text-color-600 text-truncate">
              {autoCompleteValue.description}
            </Typography>
          </div>
          <div className="ml-auto">
            <IconButton onClick={handleClearAutocomplete}>
              <Icon type="close" />
            </IconButton>
          </div>
        </div>
      )}
    </WhiteBlock>
  );
}
