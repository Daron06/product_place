import { yupResolver } from '@hookform/resolvers/yup';
import { ModalContext, ModalContextInterface } from 'components/AuthModal';
import { LoginFormFieldsProps, LoginFormView } from 'components/Authorization/LoginForm/View';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSignIn, setErrors } from '../../../redux/ducks/user/actionsCreators';
import {
  selectUserAuthErrorMessage,
  selectUserData,
  selectUserErrors,
  selectUserStatusLoading,
} from '../../../redux/ducks/user/selectors';
import { LoginFormSchema } from '../../../utils/validationSchemas/loginFormSchema';

interface LoginFormProps {
  showSocialAuth?: boolean;
  successMessage?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ showSocialAuth, successMessage }): React.ReactElement => {
  const dispatch = useDispatch();
  const modalContext = React.useContext(ModalContext) as ModalContextInterface;
  const isLoading = useSelector(selectUserStatusLoading);
  const authErrorMessage = useSelector(selectUserAuthErrorMessage);
  const responseErrors = useSelector(selectUserErrors);
  const userData = useSelector(selectUserData);
  const { t: validationT } = useTranslate('validation');
  const { handleSubmit, register, control, errors, watch, setError } = useForm<LoginFormFieldsProps>({
    resolver: yupResolver(LoginFormSchema(validationT)),
  });

  const { password } = watch();

  const onSubmit = (data: LoginFormFieldsProps): void => {
    dispatch(fetchSignIn(data));
  };

  const handleClickPasswordReset = (): void => {
    modalContext.setFormType('reset');
  };

  const handleClickSignUp = (): void => {
    modalContext.setFormType('register');
  };

  React.useEffect(() => {
    return (): void => {
      dispatch(setErrors(undefined));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (responseErrors) {
      responseErrors.forEach((error) => {
        setError(error.field as keyof LoginFormFieldsProps, {
          type: 'manual',
          message: error.message,
        });
      });
    }
  }, [setError, responseErrors]);

  React.useEffect(() => {
    if (userData) {
      modalContext.onClose();
    }
  }, [modalContext, userData]);

  return (
    <LoginFormView
      authErrorMessage={authErrorMessage}
      successMessage={successMessage}
      errors={errors}
      handleClickResetPassword={handleClickPasswordReset}
      handleClickSignUp={handleClickSignUp}
      handleSubmit={handleSubmit(onSubmit)}
      passwordValue={password}
      isLoading={isLoading}
      register={register}
      showSocialAuth={showSocialAuth}
      control={control}
    />
  );
};
