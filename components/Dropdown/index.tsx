import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { PopperPlacementType } from '@material-ui/core/Popper/Popper';
import clsx from 'clsx';
import React from 'react';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  classes?: {
    paper?: string;
    popper?: string;
    root?: string;
  };
  overlay: React.ReactElement;
  placement?: PopperPlacementType;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  classes,
  overlay,
  placement = 'bottom-end',
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <div
        ref={anchorRef}
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleToggle}
        role="button"
        aria-pressed="false"
        className={clsx(styles.root, classes?.root)}
      >
        {overlay}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        className={clsx(styles.popper, classes?.popper)}
        role={undefined}
        transition
        disablePortal
        placement={placement}
      >
        {({ TransitionProps }): React.ReactElement => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
            <Paper elevation={0} className={clsx(styles.paper, classes?.paper)}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} onClick={handleClose}>
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
