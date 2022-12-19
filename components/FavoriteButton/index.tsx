import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import HeartSvg from '../../assets/icons/heart.svg';
import styles from './FavoriteButton.module.scss';

export interface FavoriteButtonProps {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  active = false,
  onClick,
  variant,
}): React.ReactElement => {
  return (
    <IconButton
      data-test-id="favorite-button"
      type="button"
      onClick={onClick}
      classes={{
        root: styles.favoriteButtonRoot,
        label: clsx(styles.favoriteButtonLabel, {
          [styles.favoriteButtonLabelActive]: active,
          [styles.favoriteButtonPage]: variant === 'page',
        }),
      }}
    >
      <HeartSvg />
    </IconButton>
  );
};
