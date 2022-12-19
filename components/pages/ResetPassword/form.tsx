import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { PasswordField } from 'components/PasswordField';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AdminPasswordSchema } from 'utils/validationSchemas/admin/adminPasswordSchema';

import ArrowGreenSvg from '../../../assets/icons/arrow-left-green.svg';
import { useIsLoading } from '../../../hooks/useIsLoading';
import styles from '../../AuthModal/AuthModal.module.scss';
import { Button } from '../../Button';

export type ResetFormFieldsProps = {
  password: string;
  passwordConfirm: string;
};

type ResetPasswordFormProps = {
  onSubmit: (formFields: ResetFormFieldsProps) => void;
};

export const ResetPasswordPageForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const { t } = useTranslate('reset-password');
  const { t: validationT } = useTranslate('validation');
  const { register, errors, handleSubmit, watch } = useForm<ResetFormFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(AdminPasswordSchema(validationT)),
  });
  const [isLoading] = useIsLoading();
  const [password, passwordConfirm] = [watch('password'), watch('passwordConfirm')];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        label={t('label-new-password')}
        name="password"
        placeholder={t('placeholder-new-password')}
        register={register}
        type="password"
        autocomplete="new-password"
        error={errors.password?.message}
        value={password}
      />
      <PasswordField
        label={t('password-confirm')}
        name="passwordConfirm"
        placeholder={t('placeholder-confirm-password')}
        register={register}
        type="password"
        autocomplete="new-password"
        error={errors.passwordConfirm?.message}
        value={passwordConfirm}
      />
      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        style={{ height: 50 }}
        variant="contained"
        color="secondary"
        fullWidth
      >
        {t('save-button')}
      </Button>

      <div className={styles.authModalGoBack}>
        <Link href="/">
          <a href="/">
            <span role="presentation" className={clsx('link', styles.authModalGoBackText)}>
              <ArrowGreenSvg />
              {t('go-home')}
            </span>
          </a>
        </Link>
      </div>
    </form>
  );
};
