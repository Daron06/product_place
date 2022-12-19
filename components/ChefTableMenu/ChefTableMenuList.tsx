import { Divider, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Icon } from 'components/Icon';
import React from 'react';
import { DashboardRole } from 'services/types';

import { ChefTableMenuOptions } from '.';
import styles from './ChefTableMenu.module.scss';

interface EditChefTableMenuListProps {
  items: ChefTableMenuOptions[];
  role: DashboardRole;
  onRemove: (id) => void;
  onMenuItemEdit: (id) => void;
  editIndex: null | number;
  acceptLanguage: 'en' | 'ar';
}

export const EditChefTableMenuList: React.FC<EditChefTableMenuListProps> = ({
  items,
  onRemove,
  onMenuItemEdit,
  acceptLanguage,
  role = DashboardRole.STAFF,
  editIndex = null,
}) => {
  return items.length ? (
    <List component="nav" className="mb-20" classes={{ padding: styles.listItem }}>
      {items.map(
        (item, index) =>
          item && (
            <div key={item?.id}>
              <ListItem classes={{ root: styles.listItem }}>
                <div style={{ width: '400px', marginRight: '50px' }} className="d-flex align-items-center">
                  <ListItemText primary={`${acceptLanguage === 'en' ? item.name : item.name__ar || ''}`} />
                </div>

                <div className="d-flex align-items-center flex-auto">
                  <div className="mr-30">
                    <Typography className="text-color-600">Chef Price</Typography>
                    <Typography>AED {item?.chefPrice ?? 0}</Typography>
                  </div>
                  {role === DashboardRole.STAFF && (
                    <div>
                      <Typography className="text-color-600 mr-30">unknown Price</Typography>
                      <Typography>AED {item?.price ?? 0}</Typography>
                    </div>
                  )}
                  <div>
                    <Typography className="text-color-600"># of spots</Typography>
                    <Typography>{item?.spots ?? 0}</Typography>
                  </div>
                </div>

                {editIndex === null && (
                  <>
                    <IconButton className={styles.closeIcon} onClick={(): void => onMenuItemEdit?.(index)}>
                      <Icon type="launch" />
                    </IconButton>
                    <IconButton className={styles.closeIcon} onClick={(): void => onRemove(index)}>
                      <Icon type="close" />
                    </IconButton>
                  </>
                )}
              </ListItem>
              <Divider />
            </div>
          ),
      )}
    </List>
  ) : null;
};
