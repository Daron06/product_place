import { Chip, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { FieldError } from 'react-hook-form';

import { Icon } from '../../../Icon';
import styles from './AutocompleteTagsField.module.scss';

export interface AutocompleteTagsFieldProps {
  // TODO: Сделать типизацию в зависимости от получаемых данных
  onChangeTags: (arr: any) => void;
  renderIcon?: (option: any) => React.ReactNode;
  options: Readonly<any[]>;
  value?: any[];
  error?: FieldError;
  placeholder?: string;
  testId?: string;
  isMultiple?: boolean;
  defaultValue?: any;
}

export const AutocompleteTagsField: React.FC<AutocompleteTagsFieldProps> = ({
  onChangeTags,
  error,
  value,
  defaultValue,
  renderIcon,
  options,
  placeholder = 'Select options...',
  testId,
  isMultiple = true,
}): React.ReactElement => {
  return (
    <>
      <Autocomplete
        options={options as any[]}
        value={value}
        defaultValue={defaultValue}
        onChange={(_, values): void => onChangeTags(values)}
        getOptionLabel={(option): string => option.name}
        getOptionSelected={(option, val): boolean => option.id === val.id}
        data-test-id={testId}
        renderOption={(option): React.ReactElement => (
          <div className={styles.autocompleteTagsListItem} data-test-id={`${testId}-item`}>
            {renderIcon && <div className={styles.autocompleteTagsListItemIcon}>{renderIcon(option)}</div>}
            <span>{option.name}</span>
          </div>
        )}
        classes={{
          paper: styles.paper,
        }}
        renderInput={(params): React.ReactElement => (
          <TextField classes={{ root: styles.autocompleteTagsFieldInput }} {...params} placeholder={placeholder} />
        )}
        renderTags={(tags, getTagProps): React.ReactElement[] => {
          return tags.map((option, index) => (
            <Chip
              classes={{
                root: styles.autocompleteTagsFieldTag,
                deleteIcon: styles.autocompleteTagsFieldTagDelete,
                label: styles.autocompleteTagsFieldTagLabel,
              }}
              key={option.id}
              label={
                <>
                  {renderIcon && <div className={styles.autocompleteTagsFieldTagIcon}>{renderIcon(option)}</div>}
                  {option.name}
                </>
              }
              deleteIcon={
                <Icon
                  height={16}
                  width={16}
                  viewBox={{
                    height: 18,
                    width: 18,
                  }}
                  type="close"
                  className={styles.autocompleteTagsItemRemoveIcon}
                />
              }
              {...getTagProps({ index })}
            />
          ));
        }}
        filterSelectedOptions
        multiple={isMultiple}
      />
      {error && <p className="error-label">{error}</p>}
    </>
  );
};
