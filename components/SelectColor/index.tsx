import 'react-colorful/dist/index.css';

import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { UseFormMethods } from 'react-hook-form';

import styles from './SelectColor.module.scss';

interface SelectColorProps {
  onChange?: (color: string) => void;
  error?: string;
  name?: string;
  register?: UseFormMethods['register'];
  value: string;
}

export const SelectColor: React.FC<SelectColorProps> = ({ onChange, error, name, register, value = '' }) => {
  return (
    <div className={styles.selectColorFormPicker}>
      <b>Select color</b>
      <HexColorPicker onChange={onChange} color={value} />
      <input ref={register} name={name} value={value} hidden readOnly />
      {error && <p className="error-label">{error}</p>}
    </div>
  );
};
