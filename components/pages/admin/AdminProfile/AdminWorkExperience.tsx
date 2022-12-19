import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { staffChefNormalizer } from 'utils/normalizers/StaffChefNormalizer';
import * as yup from 'yup';

import { DynamicWorkingExperience } from '../DynamicWorkingExperience';
import { StaffChefFormFields } from '../staff/chefs/details';
import { AdminChefProfileProps } from '.';
import styles from './AdminProfile.module.scss';

const schema = yup.object().shape({
  workingExperience: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string(),
        photo: yup.string(),
        name: yup.string().required('Enter your company name'),
        description: yup.string().required('Enter your role in company'),
      }),
    )
    .required(),
});

export const AdminWorkExperience: React.FC<AdminChefProfileProps> = ({ details }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm<StaffChefFormFields>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      workingExperience:
        details?.chef?.workingExperience.map((obj) => ({
          id: obj.id,
          name: obj.name,
          photo: obj.photo,
          description: obj.description,
        })) || [],
    },
  });

  const { handleSubmit, errors } = form;

  const onSubmit = async (data: StaffChefFormFields): Promise<void> => {
    setLoading(true);
    try {
      if (details && details.chef) {
        const normalizedFields = staffChefNormalizer({
          ...data,
          links: details.chef.links.length > 0 ? details.chef.links.map((value) => ({ value })) : [{ value: '' }],
          image: details.chef.image,
          name: details.chef.name,
          cover: details?.chef?.cover,
          jobRole: details.chef.jobRole,
          description: details.chef.description,
          status: details.chef.status,
          phone: details.phone,
          email: details.email,
          id: String(details?.id),
        });
        await ChefsApi.update(details.chef.id, normalizedFields);
        openAlert('The new work experience has been successfully saved', 'success');
      }
    } catch (error) {
      openAlert('An error occurred while saved a new work experience', 'error');
      console.error('ERROR:', error);
    }

    setLoading(false);
  };

  return (
    <Paper elevation={0} className="p-30 pt-10">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <FormProvider {...form}>
            <DynamicWorkingExperience />
          </FormProvider>
          {errors.workingExperience && <p className="error-label">Working experience is required</p>}

          <div className="mt-30">
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
        </div>
      </form>
    </Paper>
  );
};
