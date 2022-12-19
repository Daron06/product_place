import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import clsx from 'clsx';
import React from 'react';

import styles from './PopupList.module.scss';

interface PopupListProps {
  items: Array<{
    imageUrl: string;
    name: string;
    description: string;
  }>;
  anchor: HTMLDivElement | null;
}

export const PopupList: React.FC<PopupListProps> = ({ items, anchor }): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(anchor);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Popover
      anchorEl={anchorEl}
      classes={{
        paper: styles.popoverPaper,
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
    >
      <List className={clsx(styles.popupList, 'scroll')}>
        {items.map((item) => (
          <>
            <ListItem alignItems="center" button>
              <ListItemAvatar style={{ minWidth: 45 }}>
                <Avatar className={styles.popupListImage} alt="Remy Sharp" src={item.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                className={styles.popupListItemText}
                primary={<b>{item.name}</b>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Popover>
  );
};
