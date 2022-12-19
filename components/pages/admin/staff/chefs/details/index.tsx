import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomPhoneInput from 'components/CustomPhoneInput';
import styles from 'components/FormField/FormField.module.scss';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { SummaryDetailsList } from 'components/pages/admin/SummaryDetailsList';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import format from 'date-fns/format';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StatusEnum } from 'services/types';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';

import { useAlert } from '../../../../../../hooks/useAlert';
import { Chef } from '../../../../../../redux/ducks/products/types/contracts';
import { User } from '../../../../../../redux/ducks/user/types/state';
import { ChefsApi } from '../../../../../../services/api/admin/ChefsApi';
import { staffChefNormalizer } from '../../../../../../utils/normalizers/StaffChefNormalizer';
import { StaffChefProfileSchema } from '../../../../../../utils/validationSchemas/staffChefProfileSchema';
import { FormField } from '../../../../../FormField';
import { WhiteBlock } from '../../../../../WhiteBlock/WhiteBlock';
import { ChangeAvatarBlock } from '../../../ChangeAvatarBlock';
import { ChangeStatusBlock } from '../../../ChangeStatusBlock';
import { DynamicLinks } from '../../../DynamicLinks';
import { DynamicWorkingExperience } from '../../../DynamicWorkingExperience';
import { PasswordForm } from '../../../PasswordForm';
import { WorkingExperienceItem } from '../../../Register';
import { AboutChef } from './AboutChef';

interface StaffChefProfileProps {
  data?: Chef & { user?: User; chefStatus?: StatusEnum; description: string; status: string };
}

export interface StaffChefFormFields {
  id: string;
  name: string;
  jobRole: string;
  description: string;
  image: string;
  cover: string;
  links: { value: string }[];
  workingExperience: readonly WorkingExperienceItem[];
  email: string;
  phone: string;
  password: string;
  status: string;
  passwordConfirm?: string;
}

export const StaffChefProfile: React.FC<StaffChefProfileProps> = ({ data }) => {
  const form = useForm<StaffChefFormFields>({
    mode: 'onChange',
    resolver: yupResolver(StaffChefProfileSchema),
    defaultValues: {
      cover: data?.cover ?? undefined,
      name: data?.name,
      jobRole: data?.jobRole,
      description: data?.description,
      image: data?.image,
      links:
        data && data.links.length > 0
          ? data?.links.map((value) => ({ value: value.replace(/http(s)?:\/\//, '') }))
          : [{ value: '' }],
      workingExperience:
        data?.workingExperience.map((obj) => ({
          name: obj.name,
          description: obj.description,
          photo: obj.photo,
        })) || [],
      phone: data?.user?.phone || '',
      email: data?.user?.email || '',
      status: data?.status ?? '',
    },
  });

  const { openAlert } = useAlert();

  React.useEffect(() => {
    form.register('status');
    form.register('cover');
  }, []);

  const isEditingMode = !!data;

  // TODO Refactoring the CreateHeader and include the code bellow inside component
  let submitButtonContent: React.ReactNode = 'Submit';

  if (form.formState?.isSubmitting) {
    submitButtonContent = <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} />;
  } else if (!isEditingMode) {
    submitButtonContent = 'Save';
  }

  const onSubmit = async (formFields: StaffChefFormFields): Promise<void> => {
    if (data) {
      try {
        const normalizedFields = staffChefNormalizer({
          ...formFields,
          id: String(data.user?.id),
        });
        if (isEditingMode) {
          await ChefsApi.update(data.id, normalizedFields);
        } else {
          await ChefsApi.create(normalizedFields);
        }
        openAlert("The chef's info has been successfully saved", 'success');
      } catch (error) {
        if (error.response.status === 422) {
          const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
          normalizedErrors.forEach((err) => {
            form.setError(err.field.split('.')[1] as any, { message: err.message, shouldFocus: true });
          });
          openAlert(
            `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
              .map((el) => el.message)
              .join(', ')}`,
            'error',
          );
        } else {
          openAlert(`An error occurred while saving: ${error?.message}`, 'error');
          console.error(error);
        }
      }
    }
  };

  const handleCoverImageChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      form.setValue('cover', img.url, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleDeleteImage = (): void => {
    form.setValue('cover', '', { shouldValidate: true, shouldDirty: true });
  };

  const coverImage = data?.cover
    ? [
        {
          url: data.cover,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  return (
    <FormProvider {...form}>
      <div className="p-30">
        <CreateHeader
          handleSubmit={form.handleSubmit(onSubmit)}
          title={data?.name ? 'Edit' : 'Create'}
          submitButtonText={submitButtonContent}
          submitButtonDisabled={form.formState.isSubmitting}
        />
        <main className="adminDataUpsertPageGrid">
          <section className="adminDataUpsertSectionGrid">
            <AboutChef />
            <WhiteBlock title="Working Experience">
              <DynamicWorkingExperience />
              {form.errors.workingExperience && <p className="error-label">Working experience is required</p>}
            </WhiteBlock>
            <WhiteBlock title="Contacts">
              <FormField label="Email" name="email" register={form.register} error={form.errors?.email?.message} />
              <CustomPhoneInput label="Phone" name="phone" />
              <DynamicLinks errors={form.errors} control={form.control} register={form.register} />
            </WhiteBlock>
            <PasswordForm />
          </section>
          <aside>
            <ChangeStatusBlock />
            <ChangeAvatarBlock />
            <WhiteBlock title="Cover">
              <div className="d-flex justify-content-center flex-column">
                <UploadImages
                  maxImageCount={1}
                  images={coverImage}
                  control={form.control}
                  error={form.formState?.isSubmitted ? form.errors.cover?.message : undefined}
                  controllable={false}
                  onChangeImages={handleCoverImageChange}
                  onDeleteImage={handleDeleteImage}
                />
              </div>
            </WhiteBlock>
            {data && (
              <SummaryDetailsList
                items={[{ name: 'Registration date', value: format(new Date(data?.createdAt), 'd/MM/yyyy') }]}
              />
            )}
          </aside>
        </main>
      </div>
    </FormProvider>
  );
};
