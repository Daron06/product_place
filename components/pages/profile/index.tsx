import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import RoomIcon from '@material-ui/icons/Room';
import SettingsIcon from '@material-ui/icons/Settings';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import clsx from 'clsx';
import { AvatarUpload } from 'components/AvatarUpload';
import { useAlert } from 'hooks/useAlert';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from 'redux/ducks/user/actionsCreators';
import { UserApi } from 'services/api/UserApi';

import { selectUserData } from '../../../redux/ducks/user/selectors';
import styles from './Profile.module.scss';

export interface ProfileProps {
  onChangeTab: (tabName: string) => void;
  activeTab: string;
}

export const Profile: React.FC<ProfileProps> = ({ onChangeTab, activeTab }) => {
  const dispatch = useDispatch();
  const { openAlert } = useAlert();
  const user = useSelector(selectUserData);
  const { t, currentLanguage } = useTranslate('profile');
  const navigation = t('navigation');
  const form = useForm({
    defaultValues: {
      image: user?.image,
    },
  });

  React.useEffect(() => {
    form.register('image');
  }, []);

  const handleChangeAvatar = async (image: string): Promise<void> => {
    try {
      if (user && image && !image.includes('blob:')) {
        await UserApi.update({ image });
        dispatch(setUserData({ ...user, image }));
        openAlert('The new profile avatar has been successfully saved', 'success');
      }
    } catch (error) {
      openAlert('An error occurred while saved a new profile avatar', 'error');
      console.error(error);
    }
  };

  const handleDeleteAvatar = async (): Promise<void> => {
    try {
      if (user) {
        await UserApi.update({ image: null });
        dispatch(setUserData({ ...user, image: null }));
        openAlert('Profile avatar successfully deleted', 'success');
      }
    } catch (error) {
      console.error(error);
      openAlert('An error occurred while delete a profile avatar', 'error');
    }
  };

  return (
    <>
      <div className={clsx(styles.config, { [styles.arabConfig]: currentLanguage === 'ar' })}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <div className={styles.muiavatar}>
              <FormProvider {...form}>
                <AvatarUpload
                  classes={{ avatar: styles.avatarUpload }}
                  onUpload={handleChangeAvatar}
                  onDeleteImage={handleDeleteAvatar}
                />
              </FormProvider>
            </div>
          </div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className={styles.nav}>
          <Tabs
            TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
            indicatorColor="primary"
            textColor="secondary"
            onChange={(_: unknown, name: string): void => onChangeTab(name)}
            value={activeTab}
            orientation="vertical"
          >
            <Tab icon={<SettingsIcon />} label={navigation[0]} value="" />
            <Tab icon={<TurnedInNotIcon />} label={navigation[1]} value="orders" />
            <Tab icon={<RoomIcon />} label={navigation[2]} value="delivery" />
            <Tab icon={<FavoriteBorderIcon />} label={navigation[3]} value="favorites" />
            <Tab icon={<NotificationsNoneIcon />} label={navigation[4]} value="notification" />
          </Tabs>
        </div>
      </div>
    </>
  );
};
