import { Chip as MauiChip, ChipProps as MauiChipProps } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './Chip.module.scss';

export interface ChipProps extends MauiChipProps {
  popovered?: boolean;
  popoverTitle?: string;
  onApply?: () => void;
  onClear?: () => void;
  popoverClasses?: {
    paper?: string;
    popoverBody?: string;
  };
  testId?: string;
  disableApplyButton?: boolean;
}

export const Chip: React.FC<Omit<ChipProps, 'children'>> = ({
  color,
  className,
  classes,
  disabled,
  disableApplyButton,
  popovered,
  popoverTitle,
  children,
  clickable,
  popoverClasses,
  deleteIcon,
  onClear,
  label,
  onClick,
  onApply,
  variant,
  testId,
  icon,
}): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (popovered) {
      setAnchorEl(event.currentTarget);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleApply = (): void => {
    handleClose();

    if (onApply) {
      onApply();
    }
  };

  const open = Boolean(anchorEl);

  const { t } = useTranslate('chip');

  return (
    <>
      <MauiChip
        disabled={disabled}
        deleteIcon={<div>{deleteIcon}</div>}
        clickable={clickable}
        color={color}
        className={className}
        classes={classes}
        onDelete={onClear}
        onClick={handleClick}
        label={label}
        variant={variant}
        data-test-id={testId || `chip_${label}`}
        icon={icon}
      />
      {popovered && (
        <Popover
          anchorEl={anchorEl}
          classes={{
            paper: clsx(styles.popoverPaper, popoverClasses?.paper),
          }}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          marginThreshold={0}
        >
          <div className={styles.popoverContent}>
            <div className={styles.popoverHead}>
              <Typography variant="overline" className={styles.overline}>
                {popoverTitle}
              </Typography>
            </div>
            <div className={clsx(styles.popoverBody, popoverClasses?.popoverBody)}>{children}</div>
            <div
              className={`${styles.popoverFooter} d-flex align-items-center justify-content-between filter-chip-footer`}
            >
              {onClear ? (
                <button type="button" onClick={onClear} className={clsx(styles.button, styles.buttonClear)}>
                  Clear
                </button>
              ) : (
                <div />
              )}
              <Button
                color="secondary"
                disabled={disableApplyButton}
                onClick={handleApply}
                classes={{ root: styles.button, label: styles.buttonLabel }}
                variant="contained"
                data-test-id={`${testId ? `${testId}-` : ''}button-apply`}
              >
                {t('apply')}
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
};
