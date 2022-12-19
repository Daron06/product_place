import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { ModalContext, ModalContextInterface } from 'components/AuthModal';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneSchema } from 'utils/validationSchemas/createCustomerSchema';
import * as yup from 'yup';

import { AppContext } from '../../../pages/_app';
import { fetchSignIn, fetchSignUp, setErrors } from '../../../redux/ducks/user/actionsCreators';
import {
  selectUserErrors,
  selectUserStatusError,
  selectUserStatusLoading,
  selectUserStatusSuccess,
} from '../../../redux/ducks/user/selectors';
import { FormField } from '../../FormField';
import { PasswordField } from '../../PasswordField';
import styles from '../AuthModal.module.scss';

export type RegisterFormFieldsProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const schema = (
  t: any,
): yup.ObjectSchema<
  yup.Shape<
    object | undefined,
    {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
    }
  >,
  object
> => {
  return yup.object().shape({
    firstName: yup.string().required(t('first-name-required')),
    lastName: yup.string().required(t('last-name-required')),
    email: yup.string().trim().email(t('email-format')).required(t('email-required')),
    phone: PhoneSchema(t),
    password: yup.string().required(t('password-required')).min(8, t('password-format')),
  });
};

const isDev = ['localhost:3000', 'dev.unknown.me'].includes(typeof window !== 'undefined' ? window.location.host : '');

export const RegisterForm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const modalContext = React.useContext(ModalContext) as ModalContextInterface;
  const { fastRegisterUrl, setAuthOpenForm } = React.useContext(AppContext);
  const isLoading = useSelector(selectUserStatusLoading);
  const isSuccess = useSelector(selectUserStatusSuccess);
  const responseErrors = useSelector(selectUserErrors);
  const formError = useSelector(selectUserStatusError);
  const { t } = useTranslate('header');
  const { t: validationT } = useTranslate('validation');

  const form = useForm<RegisterFormFieldsProps>({
    resolver: yupResolver(schema(validationT)),
    defaultValues: {
      firstName: isDev ? String(Math.random() * 10000) : '',
      lastName: isDev ? String(Math.random() * 10000) : '',
      email: isDev ? Math.random() * 10000 + '@rhyta.com' : '',
      phone: isDev ? '+971 54 569 ' + Math.round(Math.random() * 9999) : '',
      password: isDev ? 'Qwerty123' : '',
    },
  });

  const signUpText = t('signup-popup');
  const { handleSubmit, register, errors, watch, setError, reset } = form;
  const { password } = watch();

  const onSubmit = (data: RegisterFormFieldsProps): void => {
    dispatch(fetchSignUp({ ...data }));
  };

  React.useEffect(() => {
    if (responseErrors) {
      responseErrors.forEach((error) => {
        setError(error.field as keyof RegisterFormFieldsProps, {
          type: 'manual',
          message: validationT(`backend-${error.field + `${error.message.includes('exist') ? '-exist' : ''}`}-answer`),
        });
      });
    }
  }, [setError, responseErrors]);

  React.useEffect(() => {
    return (): void => {
      dispatch(setErrors(undefined));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (isSuccess) {
      (async (): Promise<void> => {
        const values = form.getValues();
        await dispatch(
          fetchSignIn({
            email: values.email,
            password: values.password,
            remember: true,
          }),
        );
        setAuthOpenForm(undefined);
        if (fastRegisterUrl) {
          await router.push(fastRegisterUrl);
        }
      })();
      reset();
    }
  }, [isSuccess, fastRegisterUrl, modalContext, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label={signUpText['first-name'].text}
        name="firstName"
        placeholder={signUpText['first-name'].placeholder}
        error={errors.firstName?.message}
        register={register}
      />

      <FormField
        label={signUpText['last-name'].text}
        name="lastName"
        placeholder={signUpText['last-name'].placeholder}
        error={errors.lastName?.message}
        register={register}
      />

      <FormField
        label={signUpText.email.text}
        name="email"
        placeholder={signUpText.email.placeholder}
        error={errors.email?.message}
        register={register}
      />

      <FormProvider {...form}>
        <CustomPhoneInput label={signUpText.phone} name="phone" />
      </FormProvider>

      <PasswordField
        label={signUpText.password.text}
        name="password"
        placeholder={signUpText.password.placeholder}
        type="password"
        error={errors.password?.message}
        value={password}
        register={register}
      />

      {formError && (
        <>
          <Alert severity="error">{signUpText.error}</Alert>
          <br />
        </>
      )}

      {isSuccess && (
        <>
          <Alert severity="success">{signUpText.success}</Alert>
          <br />
        </>
      )}
      <div className="pt-20 pb-15">
        {signUpText.agree.text}{' '}
        <span className="text-secondary">
          <a href="/docs/privacy_policy.html">{signUpText.agree.policy}</a>
        </span>{' '}
        {signUpText.agree['second-text']}{' '}
        <span className="text-secondary">
          <a href="/docs/terms_and_conditions.html">{signUpText.agree.terms}</a>
        </span>
      </div>
      <Button
        disabled={isLoading || Object.keys(errors).length > 0}
        type="submit"
        style={{ height: 50 }}
        variant="contained"
        color="secondary"
        data-test-id="auth-modal-create-button"
        fullWidth
      >
        {isLoading ? (
          <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} thickness={5} />
        ) : (
          signUpText.button
        )}
      </Button>

      <div className={styles.authModalSeparator}>
        <span>{signUpText.or}</span>
      </div>

      <p className={styles.authModalBottomSignUp}>
        {signUpText.footer}{' '}
        <span role="presentation" onClick={(): void => modalContext.setFormType('login')} className="link">
          {signUpText.login}
        </span>
      </p>
    </form>
  );
};
