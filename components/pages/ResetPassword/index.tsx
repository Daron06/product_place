import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';

import { useAlert } from '../../../hooks/useAlert';
import { AuthApi } from '../../../services/api/AuthApi';
import adminStyles from '../admin/Admin.module.scss';
import { ResetFormFieldsProps, ResetPasswordPageForm } from './form';
import styles from './ResetPassword.module.scss';

const ResetPassword = (): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslate('reset-password');
  const { token } = router.query;
  const { openAlert } = useAlert();
  const onSubmit = async (formFields: ResetFormFieldsProps): Promise<void> => {
    try {
      await AuthApi.resetPassword({
        token: token as string,
        password: formFields.password,
        passwordConfirm: formFields.passwordConfirm,
      });
      openAlert(t('password-successfully'), 'success');
    } catch (err) {
      console.error(err);
      openAlert(t('error-password'), 'error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={adminStyles.topInfo}>
        <Typography variant="h3">{t('title')}</Typography>
        <Typography>{t('description')}</Typography>
      </div>
      <div className={adminStyles.form}>
        <ResetPasswordPageForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ResetPassword;
