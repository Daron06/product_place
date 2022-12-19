import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from 'redux/ducks/user/actionsCreators';
import { selectUserData } from 'redux/ducks/user/selectors';
import { UserApi } from 'services/api/UserApi';

import { useAlert } from '../../../../../hooks/useAlert';
import { useTranslate } from '../../../../../hooks/useTranslate';
import { ProfileTabTitle } from '../../ProfileTabTitle';
import styles from './NotificationTab.module.scss';

export const NotificationTab: React.FC = (): React.ReactElement => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const { t } = useTranslate('profile');
  const { openAlert } = useAlert();

  const [state, setState] = React.useState({
    isEmailNotification: userData?.isEmailNotification,
    isPushNotification: userData?.isPushNotification,
    isSmsNotification: userData?.isSmsNotification,
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (userData) {
      const newUserData = { ...userData, [event.target.name]: event.target.checked };
      dispatch(setUserData(newUserData));
      try {
        await UserApi.update(newUserData);
      } catch (err) {
        openAlert(t('notifications.error-saving'), 'error');
      }
    }
  };

  return (
    <>
      <ProfileTabTitle value={t('notifications.title')} />
      <div className={styles.payments}>
        <p>{t('notifications.text')}</p>
        <div>
          <p>{t('notifications.email')}</p>
          <FormControlLabel
            control={<Switch checked={state.isEmailNotification} onChange={handleChange} name="isEmailNotification" />}
            label=""
          />
        </div>

        <div>
          <p>{t('notifications.push-notification')}</p>
          <FormControlLabel
            control={<Switch checked={state.isPushNotification} onChange={handleChange} name="isPushNotification" />}
            label=""
          />
        </div>

        <div>
          <p>{t('notifications.sms')}</p>
          <FormControlLabel
            control={<Switch checked={state.isSmsNotification} onChange={handleChange} name="isSmsNotification" />}
            label=""
          />
        </div>
      </div>
    </>
  );
};
