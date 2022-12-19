import { AutocompleteField } from 'components/AutocompleteField';
import React from 'react';

import { LocationApi } from '../../services/api/LocationApi';
import styles from './AreaField.module.scss';

interface AreaFieldProps {
  onChange?: (value: AreaItem | null) => void;
  type?: 'area' | 'city';
  name?: string;
  label?: string;
  defaultValue?: string;
  error?: string;
  // TODO need to the typing
  value?: any;
}

export type AreaItem = { code: string; name: string; cityCode?: string };

export const AreaField: React.FC<AreaFieldProps> = ({
  onChange,
  label = 'Area',
  type = 'area',
  name = 'area',
  defaultValue = '',
  error,
  value,
}) => {
  const [items, setArea] = React.useState<AreaItem[]>([]);
  const [inputValue, setInputValue] = React.useState<string>(defaultValue);

  React.useEffect(() => {
    const locationApi = LocationApi[type];

    locationApi({ q: inputValue || '' }).then((data) => {
      setArea(data);
    });
  }, [type, inputValue]);

  return (
    <>
      <span className={styles.areaFieldLabel}>{label}</span>
      <AutocompleteField
        onChange={onChange}
        onInputChange={(v): void => setInputValue(v)}
        name={name}
        items={items}
        value={value}
        inputValue={inputValue}
      />
      {error && <p className="error-label">{error}</p>}
    </>
  );
};
