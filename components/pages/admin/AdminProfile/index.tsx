import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Typography } from '@material-ui/core';
import { AvatarUpload } from 'components/AvatarUpload';
import { FormField } from 'components/FormField';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { useAlert } from 'hooks/useAlert';
import { Immutable } from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserData } from 'redux/ducks/user/actionsCreators';
import { User } from 'redux/ducks/user/types/state';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { staffChefNormalizer } from 'utils/normalizers/StaffChefNormalizer';
import * as yup from 'yup';

import { StaffChefFormFields } from '../staff/chefs/details';
import styles from './AdminProfile.module.scss';

export interface AdminChefProfileProps {
  details?: Immutable<User> | null;
}

const schema = yup.object().shape({
  name: yup.string().required('First name is required'),
  jobRole: yup.string(),
  description: yup.string(),
  image: yup.string().required('Avatar image is required'),
  cover: yup.string().required('Cover image is required').typeError('Cover image is required'),
});

export const AdminProfile: React.FC<AdminChefProfileProps> = ({ details }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { openAlert } = useAlert();

  const form = useForm<StaffChefFormFields>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: details?.chef?.name,
      jobRole: details?.chef?.jobRole,
      description: details?.chef?.description,
      image: details?.chef?.image,
      cover: details?.chef?.cover,
    },
  });

  const { handleSubmit, register, errors } = form;

  React.useEffect(() => {
    register('cover');
  }, []);

  const onSubmit = async (data: StaffChefFormFields): Promise<void> => {
    setLoading(true);

    try {
      if (details && details.chef) {
        const normalizedFields = staffChefNormalizer({
          ...data,
          links: details.chef.links.length > 0 ? details.chef.links.map((value) => ({ value })) : [{ value: '' }],
          status: details.chef.status,
          phone: details.phone,
          email: details.email,
          workingExperience: details.chef.workingExperience,
          id: String(details?.id),
        });
        dispatch(setUserData({ ...details, image: data.image, chef: { ...details?.chef, name: data.name } }));
        await ChefsApi.update(details?.chef.id, normalizedFields);
        openAlert('The new profile info has been successfully saved', 'success');
      }
    } catch (error) {
      openAlert('An error occurred while saved a new profile info', 'error');
      console.error('ERROR:', error);
    }

    setLoading(false);
  };

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      form.setValue('cover', img.url, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleDeleteImage = (): void => {
    form.setValue('cover', '', { shouldValidate: true, shouldDirty: true });
  };

  const coverImage = details?.chef?.cover
    ? [
        {
          url: details.chef.cover,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  return (
    <Paper elevation={0} className="p-30">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <FormField
            label="First Name"
            name="name"
            placeholder="Enter your first name"
            error={errors.name?.message}
            register={register}
          />

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
              label="About yourself"
              name="description"
              placeholder="Tell us more about yourself"
              error={errors.description?.message}
              register={register}
              textarea
            />
          </div>
          <div className="mt-25 mb-20">
            <Typography className="mb-10 fw-bold fz-large-13 text-color-900">
              Upload a cover for your profile
            </Typography>
            <FormProvider {...form}>
              <UploadImages
                maxImageCount={1}
                images={coverImage}
                control={form.control}
                controllable={false}
                error={form.formState?.isSubmitted ? errors.cover?.message : undefined}
                onChangeImages={handleImagesChange}
                onDeleteImage={handleDeleteImage}
              />
            </FormProvider>
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
        <div className="mt-25">
          <FormProvider {...form}>
            <AvatarUpload />
          </FormProvider>
        </div>
      </form>
    </Paper>
  );
};
