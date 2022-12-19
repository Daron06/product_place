import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import React from 'react';

const CheckedIcon = (
  <div className="d-flex">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M21 9V15C21 18.3137 18.3137 21 15 21H7C3.68629 21 1 18.3137 1 15V7C1 3.68629 3.68629 1 7 1H16"
        stroke="#47D7AC"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M6 10.5L10 14.5L20 3.5" stroke="#47D7AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const UnCheckedIcon = (
  <div className="d-flex">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1" y="1" width="20" height="20" rx="6" stroke="#E0E0E0" strokeWidth="2" />
    </svg>
  </div>
);

export const Checkbox = React.forwardRef<HTMLInputElement, MuiCheckboxProps>(function Checkbox(
  { checked, classes, color, disabled, id, indeterminate, inputProps, onChange, onClick, required, size, value },
  ref,
): React.ReactElement {
  return (
    <MuiCheckbox
      checked={checked}
      indeterminateIcon={CheckedIcon}
      checkedIcon={CheckedIcon}
      classes={classes}
      color={color}
      disabled={disabled}
      icon={UnCheckedIcon}
      id={id}
      indeterminate={indeterminate}
      inputProps={inputProps}
      inputRef={ref}
      onChange={onChange}
      onClick={onClick}
      required={required}
      size={size}
      value={value}
    />
  );
});
