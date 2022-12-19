import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { ModalContext, ModalContextInterface } from 'components/AuthModal';
import { useAlert } from 'hooks/useAlert';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ArrowGreenSvg from '../../../assets/icons/arrow-left-green.svg';
import { useIsLoading } from '../../../hooks/useIsLoading';
import { AuthChefApi } from '../../../services/api/admin/AuthChefApi';
import { Button } from '../../Button';
import { FormField } from '../../FormField';
import styles from '../AuthModal.module.scss';

type FormFieldsProps = {
  email: string;
};

const schema = (
  t,
): yup.ObjectSchema<
  yup.Shape<
    object | undefined,
    {
      email: string;
    }
  >,
  object
> => {
  return yup.object().shape({
    email: yup.string().trim().email(t('email-format')).required(t('email-required')),
  });
};

type ResetPasswordFormProps = {
  onBack?: () => void;
  page: 'website' | 'admin';
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onBack, page }) => {
  const { openAlert } = useAlert();
  const router = useRouter();
  const { t } = useTranslate('header');
  const { t: validationT } = useTranslate('validation');
  const modalContext = React.useContext(ModalContext) as ModalContextInterface;
  const { register, errors, handleSubmit } = useForm<FormFieldsProps>({
    resolver: yupResolver(schema(validationT)),
  });
  const [isLoading, loading, loaded] = useIsLoading();
  const [passGenerated, setPassgenerated] = React.useState(false);

  const resetText = t('reset-popup');
  const handleClickButton = (): void => {
    if (!onBack) {
      modalContext.setFormType('login');
    } else {
      onBack();
    }
  };

  const resetPasswordAnswer = (text): string => {
    if (text.includes('User is not activated')) {
      return resetText['reset-password-not-activated'];
    }
    if (text.includes('Email not found')) {
      return resetText['reset-password-not-found'];
    }
    if (text.includes('User not found')) {
      return resetText['user-not-found'];
    }
    if (text.includes('Login or password is incorrect')) {
      return resetText['login-or-password-incorrect'];
    }
    return text;
  };

  const onSubmit = async (data: { email: string }): Promise<void> => {
    try {
      loading();
      if (page === 'website') {
        await AuthChefApi.resetPasswordWeb(data.email);
        openAlert(resetText['reset-password-successfully'], 'success');
        setPassgenerated(true);
      } else {
        await AuthChefApi.resetPassword(data.email);
        router.push('/admin/register/success');
      }
    } catch (err) {
      console.warn(err);
      openAlert(`${resetText['reset-password-error']}: ${resetPasswordAnswer(err?.response?.data?.message)}`, 'error');
    } finally {
      loaded();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.authModalResetDescription}>{resetText.description}</p>

      <FormField
        label={resetText.email.text}
        name="email"
        placeholder={resetText.email.placeholder}
        register={register}
        error={errors.email?.message}
      />

      {passGenerated && <p className={styles.authModalResetDescription}>{resetText['password-generate']}</p>}

      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        style={{ height: 50 }}
        variant="contained"
        color="secondary"
        fullWidth
      >
        {resetText.button}
      </Button>

      <div className={styles.authModalGoBack}>
        <span role="presentation" className={clsx('link', styles.authModalGoBackText)} onClick={handleClickButton}>
          <ArrowGreenSvg />
          {resetText.link}
        </span>
      </div>
    </form>
  );
};
