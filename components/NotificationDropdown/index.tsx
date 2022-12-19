import { Badge, IconButton, List, Popover, Typography } from '@material-ui/core';
import { Result } from 'components/Result';
import Axios from 'core/axios';
import format from 'date-fns/format';
import ar from 'date-fns/locale/ar-SA';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { Notification } from 'redux/ducks/user/types/state';
import { Endpoints } from 'services/api/endpoints';

import { Icon } from '../Icon';
import styles from './NotificationDropdown.module.scss';

export const NotificationDropdown: React.FC = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [newItem, setNewItem] = React.useState<Notification[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [loadItems, setLoadItems] = React.useState<boolean>(false);

  const open = Boolean(anchorEl);
  const { t, currentLanguage } = useTranslate('header');

  const toggleOpenPopup = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);

    (async (): Promise<void> => {
      await Axios.put(`${Endpoints.NOTIFICATIONS}/read`);
    })();

    if (newItem?.length) {
      const newItemRead = newItem.map((item) => {
        if (item?.readAt === null) {
          return { ...item, readAt: new Date() };
        }
        return item;
      });

      setNewItem(newItemRead);
    }
  };

  React.useEffect(() => {
    setLoadItems(true);
    (async (): Promise<void> => {
      const { data } = await Axios.get(`${Endpoints.NOTIFICATIONS}?take=10&page=${pageCount}`);
      setNewItem((prev) => [...prev, ...data.items]);
      setTotalCount(data.meta.total);
    })();
    setLoadItems(false);
  }, [pageCount]);

  const onScroll = (e: any): void => {
    if (
      !loadItems &&
      e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight &&
      totalCount - pageCount * 10 > 0
    ) {
      setPageCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className={styles.notification}>
        <IconButton onClick={toggleOpenPopup}>
          <Badge color="primary" variant="dot" invisible={newItem.every((item) => item.readAt !== null)}>
            <Icon type="notification" />
          </Badge>
        </IconButton>
      </div>
      <Popover
        classes={{
          paper: styles.notificationPopup,
        }}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
      >
        <div className="content pl-25 pr-25 pb-25">
          <Typography className={styles.title} variant="overline" display="block">
            <b className="opacity-6">{t('notification').title}</b>
          </Typography>

          <div onScroll={onScroll} className={styles.notificationList}>
            <List>
              {newItem.length ? (
                newItem.map((notification) => {
                  return (
                    <li key={notification.id} className={!notification.readAt ? styles.newItem : undefined}>
                      <div className={styles.listContent}>
                        <h4>
                          {currentLanguage === 'ar'
                            ? notification.data.title__ar || notification.data.title
                            : notification.data.title}
                        </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              currentLanguage === 'ar'
                                ? notification.data.text__ar || notification.data.text
                                : notification.data.text,
                          }}
                        />
                        <span>
                          {format(
                            new Date(notification.createdAt),
                            'd MMM Y',
                            currentLanguage === 'ar' ? { locale: ar } : undefined,
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="mb-40 mt-30">
                  <Result title={t('notification').empty} />
                </div>
              )}
            </List>
          </div>
        </div>
      </Popover>
    </>
  );
};
