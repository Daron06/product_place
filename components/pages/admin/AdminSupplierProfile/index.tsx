import { yupResolver } from '@hookform/resolvers/yup';
import { Paper } from '@material-ui/core';
import { useAlert } from 'hooks/useAlert';
import { Immutable } from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserData } from 'redux/ducks/user/actionsCreators';
import { User } from 'redux/ducks/user/types/state';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { DashboardRole } from 'services/types';
import { SupplierRegisterAboutSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import { Button } from '../../../Button';
import styles from '../AdminProfile/AdminProfile.module.scss';
import { SupplierAbout } from '../staff/suppliers/details/SupplierAbout';

export interface AdminProfileSupplierProps {
  details?: Immutable<User> | null;
  type: 'supplier' | 'cloud-kitchen';
  role?: DashboardRole;
}

interface AdminSupplierProfileFormFields {
  company: {
    name: string;
    type: string;
    description: string;
    image: string;
  };
}

export const AdminSupplierProfile: React.FC<AdminProfileSupplierProps> = ({ details, type }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { openAlert } = useAlert();

  const form = useForm<AdminSupplierProfileFormFields>({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterAboutSchema),
    defaultValues: {
      company: {
        name: details?.supplier?.company?.name,
        type: details?.supplier?.company?.type,
        description: details?.supplier?.company?.description,
        image: details?.supplier?.company?.image,
      },
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (formFields: AdminSupplierProfileFormFields): Promise<void> => {
    try {
      setLoading(true);

      const preparedData = {
        contactInfo: { ...details?.supplier?.contactInfo },
        ...formFields,
      };
      dispatch(
        setUserData({
          ...details,
          image: formFields.company.image,
          supplier: { ...details?.supplier, name: formFields.company.name },
        } as User),
      );
      await SupplierApi.update(type, preparedData);
      openAlert('The new profile info has been successfully saved', 'success');
    } catch (error) {
      openAlert('An error occurred while saved a new profile info', 'error');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Paper elevation={0} className="p-30">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <FormProvider {...form}>
            <SupplierAbout image={details?.supplier?.company?.image} />
          </FormProvider>
          <Button
            loading={loading}
            type="submit"
            classes={{ root: styles.submitButton }}
            variant="contained"
            color="secondary"
            className="mt-20"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
