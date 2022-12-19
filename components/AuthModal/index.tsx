import { RegisterForm } from 'components/AuthModal/forms/RegisterForm';
import { FormType } from 'components/AuthModal/types';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { LoginForm } from '../Authorization/LoginForm';
import { Modal } from '../Modal';
import { ResetPasswordForm } from './forms/ResetPasswordForm';

export interface AuthModalProps {
  initForm?: FormType;
  open?: boolean;
  infoText?: string;
  onClose: () => void;
}

export interface ModalContextInterface {
  formType: FormType;
  setFormType: React.Dispatch<React.SetStateAction<FormType>>;
  onClose: () => void;
}
export const ModalContext = React.createContext({});

export const AuthModal = ({
  open = false,
  onClose,
  initForm = 'login',
  infoText,
}: AuthModalProps): React.ReactElement => {
  const [formType, setFormType] = React.useState<FormType>(initForm);
  const { t } = useTranslate('header');

  React.useEffect(() => {
    setFormType(initForm);
  }, [initForm]);

  const FormDialog: { [key: string]: { title: string; component: React.ReactElement } } = {
    login: {
      title: t('form-dialog').login,
      component: <LoginForm successMessage={infoText} />,
    },
    register: { title: t('form-dialog').register, component: <RegisterForm /> },
    reset: { title: t('form-dialog').reset, component: <ResetPasswordForm page="website" /> },
  };

  return (
    <Modal size="xs" title={FormDialog[formType].title} open={open} onClose={onClose}>
      <ModalContext.Provider
        value={{
          formType,
          onClose,
          setFormType,
        }}
      >
        {FormDialog[formType].component}
      </ModalContext.Provider>
    </Modal>
  );
};
