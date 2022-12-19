import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { Alert } from '@material-ui/lab';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import FacebookSvg from '../../../assets/icons/auth/facebook.svg';
import GoogleSvg from '../../../assets/icons/auth/google.svg';
import InstagramSvg from '../../../assets/icons/auth/instagram.svg';
import LinkedInSvg from '../../../assets/icons/auth/linkedin.svg';
import TwitterSvg from '../../../assets/icons/auth/twitter.svg';
import styles from '../../AuthModal/AuthModal.module.scss';
import { FormField } from '../../FormField';
import { PasswordField } from '../../PasswordField';

export type LoginFormFieldsProps = {
  email: string;
  password: string;
  remember: boolean;
};

export interface LoginFormViewProps {
  errors: FieldErrors<LoginFormFieldsProps>;
  handleSubmit: ReturnType<UseFormMethods<LoginFormFieldsProps>['handleSubmit']>;
  register: UseFormMethods<LoginFormFieldsProps>['register'];
  control: UseFormMethods<LoginFormFieldsProps>['control'];
  passwordValue: string;
  isLoading?: boolean;
  authErrorMessage?: string;
  successMessage?: string;
  handleClickResetPassword: () => void;
  handleClickSignUp: () => void;
  showSocialAuth?: boolean;
}

export const LoginFormView: React.FC<LoginFormViewProps> = ({
  errors,
  handleSubmit,
  isLoading,
  authErrorMessage,
  successMessage,
  handleClickResetPassword,
  handleClickSignUp,
  register,
  passwordValue,
  control,
  showSocialAuth,
}): React.ReactElement => {
  const { t } = useTranslate('header');
  const loginText = t('login-popup');
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label={loginText.email.text}
        name="email"
        placeholder={loginText.email.placeholder}
        register={register}
        error={errors.email?.message}
      />

      <PasswordField
        label={loginText.password.text}
        name="password"
        placeholder={loginText.password.placeholder}
        register={register}
        type="password"
        error={errors.password?.message}
        value={passwordValue}
      />

      <div className={styles.authModalRememberField}>
        <FormControlLabel
          control={
            <Controller
              as={<Checkbox name="remember" color="primary" />}
              name="remember"
              type="checkbox"
              control={control}
              defaultValue
            />
          }
          label={loginText.remember}
        />
        <span role="presentation" onClick={handleClickResetPassword} className="link">
          {loginText.forgot}
        </span>
      </div>

      <Button
        disabled={isLoading || Object.keys(errors).length > 0}
        type="submit"
        style={{ height: 50 }}
        variant="contained"
        color="secondary"
        data-test-id="auth-modal-login-button"
        fullWidth
      >
        {isLoading ? (
          <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} />
        ) : (
          loginText.login
        )}
      </Button>

      {authErrorMessage && (
        <div>
          <br />
          <Alert severity="error">{loginText['auth-error-message']}</Alert>
        </div>
      )}

      {successMessage && (
        <div>
          <br />
          <Alert severity="success">{successMessage}</Alert>
        </div>
      )}

      {showSocialAuth && (
        <>
          <div className={styles.authModalSeparator}>
            <span>or</span>
          </div>

          <ul className={styles.authModalSocialButtons}>
            <li>
              <IconButton type="button">
                <FacebookSvg />
              </IconButton>
            </li>
            <li>
              <IconButton type="button">
                <GoogleSvg />
              </IconButton>
            </li>
            <li>
              <IconButton type="button">
                <TwitterSvg />
              </IconButton>
            </li>
            <li>
              <IconButton type="button">
                <LinkedInSvg />
              </IconButton>
            </li>
            <li>
              <IconButton type="button">
                <InstagramSvg />
              </IconButton>
            </li>
          </ul>
        </>
      )}

      <p className={styles.authModalBottomSignUp}>
        {loginText.footer}{' '}
        <span onClick={handleClickSignUp} role="presentation" className="link">
          {loginText['sign-up']}
        </span>
      </p>
    </form>
  );
};
