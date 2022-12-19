import React from 'react';

export const useInputFocus = (): [boolean, { onFocus: () => void; onBlur: () => void }] => {
  const [isFocused, setFocused] = React.useState<boolean>(false);

  return [
    isFocused,
    {
      onFocus: (): void => setFocused(true),
      onBlur: (): void => setFocused(false),
    },
  ];
};
