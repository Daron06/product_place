import Typography from '@material-ui/core/Typography';
import { FormField } from 'components/FormField';
import styles from 'components/pages/admin/RegisterSupplier/RegisterSupplier.module.scss';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SupplierAboutProps {
  image?: string;
}

export const SupplierAbout: React.FC<SupplierAboutProps> = ({ image }) => {
  const { formState, errors, control, register, setValue } = useFormContext();

  React.useEffect(() => {
    register('company.image');
    register('company.type');
  });

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      setValue('company.image', img.url, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleDeleteImage = (): void => {
    setValue('company.image', '', { shouldValidate: true });
  };

  const companyLogo = image
    ? [
        {
          url: image,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  return (
    <>
      <FormField error={errors.company?.name?.message} label="Company name" name="company.name" register={register} />
      <FormField
        error={errors.company?.description?.message}
        label="About company"
        name="company.description"
        register={register}
        textarea
      />
      <div>
        <div className="mb-10">
          <Typography className={styles.formLabel} variant="caption">
            Company logo
          </Typography>
        </div>
        <UploadImages
          uploadUrl="/upload"
          maxImageCount={1}
          images={companyLogo}
          control={control}
          controllable={false}
          error={formState?.isSubmitted ? errors.company?.image?.message : undefined}
          onChangeImages={handleImagesChange}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </>
  );
};
