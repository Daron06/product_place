import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import React, { FC } from 'react';

import styles from './AddCartButtons.module.scss';

export type AddCartButtonsProps = {
  count?: number;
  size: 'small' | 'large';
  disabled?: boolean;
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  onPlus: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMinus: (event: React.MouseEvent<HTMLButtonElement>) => void;
  whenDontShow?: number;
};

export const AddCartButtons: FC<AddCartButtonsProps> = ({
  count,
  size,
  onPlus,
  onMinus,
  plusDisabled,
  minusDisabled,
  disabled,
  whenDontShow = 0,
}) => {
  const buttonSize = size === 'small' ? 32 : 40;

  return (
    <div>
      {count === whenDontShow ? (
        <Button
          disabled={disabled}
          onClick={onPlus}
          style={{ minWidth: buttonSize, width: buttonSize, height: buttonSize }}
          color="secondary"
          variant="contained"
          className={styles.button}
          data-testid="plusButton"
          aria-label="Add to Cart button"
        >
          <AddRoundedIcon fontSize="small" />
        </Button>
      ) : (
        <div className={styles.buyCount}>
          <Button
            onClick={onMinus}
            style={{ minWidth: buttonSize, width: buttonSize, height: buttonSize }}
            color="primary"
            variant="outlined"
            disabled={minusDisabled}
            className={styles.button}
            data-testid="minusButton"
          >
            <RemoveRoundedIcon />
          </Button>
          <b data-testid="count">{count}</b>
          <Button
            onClick={onPlus}
            style={{ minWidth: buttonSize, width: buttonSize, height: buttonSize }}
            disabled={plusDisabled}
            color="primary"
            variant="outlined"
            className={styles.button}
            data-testid="plusButton"
          >
            <AddRoundedIcon fontSize="small" />
          </Button>
        </div>
      )}
    </div>
  );
};
