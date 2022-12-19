import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { GenderRadioGroup } from 'components/GenderRadioGroup';
import { PasswordField } from 'components/PasswordField';
import ProfileDate from 'components/ProfileDate';
import format from 'date-fns/format';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { setUserData } from 'redux/ducks/user/actionsCreators';
import { selectUserData } from 'redux/ducks/user/selectors';
import { Notification } from 'redux/ducks/user/types/state';
import { UserApi } from 'services/api/UserApi';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { Address } from '../../../../../services/types';
import { ProfileSchema } from '../../../../../utils/validationSchemas/createCustomerSchema';
import { ProfileTabTitle } from '../../ProfileTabTitle';
import styles from './SettingsTab.module.scss';

interface UserFavoriteItem {
  id: string;
  typeId: number;
  type: ProductType;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsFormFieldsProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday?: string | null;
  gender?: 0 | 1 | null;
  favorites: UserFavoriteItem[];
  addresses: Address[];
  image: string;
  password: string;
  passwordConfirm: string;
  notifications: Notification[];
  isEmailNotification: boolean;
  isPushNotification: boolean;
  isSmsNotification: boolean;
}

export const SettingsTab: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const user = useSelector(selectUserData);
  const { openAlert } = useAlert();
  const { t: validationT } = useTranslate('validation');
  const { t } = useTranslate('profile');

  const form = useForm<SettingsFormFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema(validationT)),
    defaultValues: {
      birthday: user?.birthday && format(new Date(user?.birthday), 'MM-dd-yyyy'),
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const { handleSubmit, register, errors, watch, control } = form;
  const dispatch = useDispatch();
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const onSubmit = async (data: SettingsFormFieldsProps): Promise<void> => {
    setLoading(true);
    const obj = { ...user, ...data };

    try {
      dispatch(setUserData(obj));
      await UserApi.update(obj);

      if (data.password.length) {
        await UserApi.updatePassword({ password, passwordConfirm });
      }
      openAlert(t('settings.success-info'), 'success');
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });

        openAlert(`${normalizedErrors.map((el) => el.message).join(', ')}`, 'error');
      } else {
        openAlert(t('settings.error-info'), 'error');
        console.error(error);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <ProfileTabTitle value={t('settings.title')} />
      <div className={styles.settings}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.nameField}>
            <FormField
              label={t('settings.first-name')}
              name="firstName"
              placeholder={t('settings.first-name-placeholder')}
              error={errors.firstName?.message}
              register={register}
            />
            <FormField
              label={t('settings.last-name')}
              name="lastName"
              placeholder={t('settings.last-name-placeholder')}
              error={errors.lastName?.message}
              register={register}
            />
          </div>

          <div className={styles.formField}>
            <FormField
              label={t('settings.email')}
              name="email"
              placeholder={t('settings.email-placeholder')}
              error={errors.email?.message}
              register={register}
            />
          </div>
          <FormProvider {...form}>
            <div className={styles.formField}>
              <div className={styles.formField}>
                <CustomPhoneInput label={t('settings.phone')} name="phone" />
              </div>
            </div>
            <ProfileDate />
          </FormProvider>
          <GenderRadioGroup control={control} gender={user?.gender} />
          <div className={styles.password}>
            <PasswordField
              label={t('settings.new-password')}
              name="password"
              placeholder={t('settings.new-password-placeholder')}
              register={register}
              type="password"
              autocomplete="new-password"
              error={errors.password?.message}
              value={password}
            />
          </div>
          <div className={styles.password}>
            <PasswordField
              autocomplete="new-password"
              label={t('settings.repeat-password')}
              name="passwordConfirm"
              placeholder={t('settings.repeat-password-placeholder')}
              register={register}
              type="password"
              error={errors.passwordConfirm?.message}
              value={passwordConfirm}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className={styles.submitButton}
            variant="contained"
            color="secondary"
          >
            {t('settings.save-button')}
          </Button>
        </form>
      </div>
    </>
  );
};
