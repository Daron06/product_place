import { Button, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { DynamicLinks } from 'components/pages/admin/DynamicLinks';
import { DynamicWorkingExperience } from 'components/pages/admin/DynamicWorkingExperience';
import { AdminRegisterFormFieldsInterface } from 'components/pages/admin/Register';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import adminStyles from '../Admin.module.scss';
import styles from './AdminRegister.module.scss';

export interface AdminRegisterFormViewProps {
  errors: FieldErrors<AdminRegisterFormFieldsInterface>;
  handleSubmit: ReturnType<UseFormMethods<AdminRegisterFormFieldsInterface>['handleSubmit']>;
  register: UseFormMethods<AdminRegisterFormFieldsInterface>['register'];
  control: UseFormMethods<AdminRegisterFormFieldsInterface>['control'];
  onAddWorkingExperience?: () => void;
  isLoading?: boolean;
}

export const AdminRegisterFormView: React.FC<AdminRegisterFormViewProps> = ({
  errors,
  handleSubmit,
  register,
  control,
  isLoading = false,
}): React.ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={adminStyles.topInfo}>
        <Typography variant="h3">Get a chef account</Typography>
        <Typography>
          Join the unknown family of Chefs and help revolutionize the food scene in the Middle east.
        </Typography>
      </div>
      <div className={adminStyles.form}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <Typography variant="h6">About</Typography>
          <div className={styles.formField}>
            <FormField
              label="First name"
              name="firstName"
              placeholder="Enter your first name"
              error={errors.firstName?.message}
              register={register}
            />
          </div>
          <div className={styles.formField}>
            <FormField
              label="Last name"
              name="lastName"
              placeholder="Enter your last name"
              error={errors.lastName?.message}
              register={register}
            />
          </div>
          <div className={styles.formField}>
            <FormField
              label="Current role"
              name="jobRole"
              placeholder="Enter your Current role "
              error={errors.jobRole?.message}
              register={register}
            />
          </div>
          <div className={styles.formField}>
            <FormField
              label="About"
              name="about"
              placeholder="Tell us more about yourself"
              error={errors.about?.message}
              register={register}
              textarea
            />
          </div>
          <Typography variant="h6">Working Experience</Typography>
          <DynamicWorkingExperience uploadUrl="/upload" />
          <br />
          <Typography variant="h6">Contacts</Typography>
          <div className={styles.formField}>
            <FormField
              label="Email"
              name="email"
              placeholder="Enter your Email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className={styles.formField}>
            <CustomPhoneInput label="Phone" name="phone" />
          </div>
          <DynamicLinks errors={errors} control={control} register={register} />
          <Button
            disabled={Object.keys(errors).length > 0 || isLoading}
            type="submit"
            className={styles.submitButton}
            variant="contained"
            color="secondary"
          >
            {isLoading ? (
              <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} />
            ) : (
              'Complete'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
