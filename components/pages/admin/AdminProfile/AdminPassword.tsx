import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import { PasswordField } from 'components/PasswordField';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { staffChefNormalizer } from 'utils/normalizers/StaffChefNormalizer';
import { AdminPasswordSchema } from 'utils/validationSchemas/admin/adminPasswordSchema';

import { StaffChefFormFields } from '../staff/chefs/details';
import { AdminChefProfileProps } from '.';
import styles from './AdminProfile.module.scss';

export const AdminPassword: React.FC<AdminChefProfileProps> = ({ details }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm<StaffChefFormFields>({
    mode: 'onChange',
    resolver: yupResolver(AdminPasswordSchema(null)),
  });

  const { handleSubmit, errors, register, watch } = form;

  const onSubmit = async (data: StaffChefFormFields): Promise<void> => {
    setLoading(true);

    try {
      if (details && details.chef) {
        const normalizedFields = staffChefNormalizer({
          ...data,
          password: data.password,
          jobRole: details.chef.jobRole,
          image: details.chef.image,
          name: details.chef.name,
          description: details.chef.description,
          workingExperience: details.chef.workingExperience,
          status: details.chef.status,
          links: details.chef.links.length > 0 ? details.chef.links.map((value) => ({ value })) : [{ value: '' }],
          phone: details.phone,
          email: details.email,
          id: String(details.id),
        });

        await ChefsApi.update(details.chef.id, normalizedFields);
        openAlert('The new password has been successfully saved', 'success');
      }
    } catch (error) {
      openAlert('An error occurred while saved a new password', 'error');
      console.error('ERROR:', error);
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
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
