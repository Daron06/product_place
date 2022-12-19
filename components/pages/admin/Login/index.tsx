import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import { LoginFormFieldsProps, LoginFormView } from 'components/Authorization/LoginForm/View';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useIsLoading } from '../../../../hooks/useIsLoading';
import { setUserData } from '../../../../redux/ducks/user/actionsCreators';
import { AuthChefApi } from '../../../../services/api/admin/AuthChefApi';
import { deleteCookie, setCookie } from '../../../../utils/cookieUtils';
import { LoginFormSchema } from '../../../../utils/validationSchemas/loginFormSchema';
import { ResetPasswordForm } from '../../../AuthModal/forms/ResetPasswordForm';
import adminStyles from '../Admin.module.scss';
import styles from './AdminLogin.module.scss';

const AdminLoginForm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [visibleForm, setVisibleForm] = React.useState<'login' | 'forgot'>('login');
  const [isLoading, loading, loaded] = useIsLoading();
  const [authErrorMessage, setAuthErrorMessage] = React.useState<string>();
  const { handleSubmit, register, control, errors, watch } = useForm<LoginFormFieldsProps>({
    resolver: yupResolver(LoginFormSchema(null)),
  });

  const { password } = watch();

  const onSubmit = async (formFields: LoginFormFieldsProps): Promise<void> => {
    try {
      loading();
      deleteCookie('token');
      const { token, data, role } = await AuthChefApi.login(formFields);
      dispatch(setUserData(data));
      setCookie('token', token);
      if (role === 'SUPPLIER') {
        router.replace('/admin/supplier');
      } else if (role === 'CHEF') {
        router.replace('/admin/chef');
      } else if (role === 'CLOUD_KITCHEN') {
        router.replace('/admin/cloud-kitchen');
      } else if (role === 'STAFF') {
        router.replace('/admin/staff');
      }
      setAuthErrorMessage(undefined);
    } catch (err) {
      if (err.response?.data?.message) {
        setAuthErrorMessage(err.response?.data?.message);
      } else {
        setAuthErrorMessage('Incorrect login or password');
      }
      console.error(err);
      loaded();
    }
  };

  const handleClickResetPassword = (): void => {
    setVisibleForm('forgot');
  };

  const handleClickSignUp = (): void => {
    router.push('/admin/register/choose-role');
  };

  return (
    <div className={styles.wrapper}>
      <div className={adminStyles.topInfo}>
        <Typography variant="h3">Admin Login</Typography>
        <Typography>It&apos;s good to see you again!</Typography>
      </div>
      <div className={adminStyles.form}>
        {visibleForm === 'login' ? (
          <LoginFormView
            authErrorMessage={authErrorMessage}
            errors={errors}
            handleClickResetPassword={handleClickResetPassword}
            handleClickSignUp={handleClickSignUp}
            handleSubmit={handleSubmit(onSubmit)}
            passwordValue={password}
            register={register}
            control={control}
            isLoading={isLoading}
          />
        ) : (
          <ResetPasswordForm onBack={(): void => setVisibleForm('login')} page="admin" />
        )}
      </div>
    </div>
  );
};

export default AdminLoginForm;
