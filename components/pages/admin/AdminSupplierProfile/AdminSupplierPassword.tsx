import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import { PasswordField } from 'components/PasswordField';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { AdminPasswordSchema } from 'utils/validationSchemas/admin/adminPasswordSchema';

import styles from '../AdminProfile/AdminProfile.module.scss';
import { AdminProfileSupplierProps } from '.';

export const AdminSupplierPassword: React.FC<AdminProfileSupplierProps> = ({ details, type }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm<{ password: string; passwordConfirm: string }>({
    mode: 'onChange',
    resolver: yupResolver(AdminPasswordSchema(null)),
  });
  const { handleSubmit, watch, register, errors } = form;

  const onSubmit = async (formFields: { password: string; passwordConfirm: string }): Promise<void> => {
    setLoading(true);

    try {
      const preparedData = {
        company: {
          ...details?.supplier?.company,
        },
        contactInfo: {
          ...details?.supplier?.contactInfo,
        },
        password: formFields.password,
      };

      await SupplierApi.update(type, preparedData);
      openAlert('The new password has been successfully saved', 'success');
    } catch (error) {
      openAlert('An error occurred while saved a new password', 'error');
      console.error(error);
    }

    setLoading(false);
  };

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  return (
    <Paper elevation={0} className="p-30">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <PasswordField
            label="New password"
            name="password"
            placeholder="Enter new password"
            register={register}
            type="password"
            error={errors.password?.message}
            value={password}
          />
          <div className={styles.password}>
            <PasswordField
              label="Repeat Password"
              name="passwordConfirm"
              placeholder="Repeat Password"
              register={register}
              type="password"
              error={errors.passwordConfirm?.message}
              value={passwordConfirm}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            classes={{ root: styles.submitButton }}
            variant="contained"
            color="secondary"
            className="mt-10"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
