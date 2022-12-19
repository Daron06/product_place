import { CircularProgress, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import { FormField } from 'components/FormField';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import { useTranslatedFields } from 'hooks/useTranslatedFields';
import { LanguageContext } from 'layouts/AdminLayout';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Category, StatusEnum } from 'services/types';

import { CreateHeader } from './CreateHeader';
import { RequiredStaffCreateFieldsProps } from './RequiredStaffCreate';
import { UploadImages } from './UploadImages';
import { ImageObj, UploadedImage } from './UploadImages/types';

interface ApproveCategoryProps {
  data?: Category;
  onSubmit: (fields: RequiredStaffCreateFieldsProps) => Promise<void>;
  title: string;
  image?: UploadedImage[];
  onImagesChange?: (arr: UploadedImage[]) => void;
  onDeleteImage?: (data: ImageObj) => void;
}

export const ApproveCategory: React.FC<ApproveCategoryProps> = ({
  data,
  onSubmit,
  title,
  image,
  onImagesChange,
  onDeleteImage,
}) => {
  const { register, control, errors, formState, handleSubmit } = useFormContext();
  const { translatedData } = useTranslatedFields();
  const {
    field: { ref, onChange, value: statusValue, name },
  } = useController({
    name: 'status',
    control,
  });

  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (data) {
    submitButtonText = 'Save';
  }

  const { acceptLanguage } = React.useContext(LanguageContext);

  React.useEffect(() => {
    if (data) {
      translatedData(['name'], data, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader
          title={title}
          handleSubmit={handleSubmit(onSubmit)}
          submitButtonText={submitButtonText}
          isSubmitting={!!formState?.isSubmitting}
          isLanguageSelect
        />
      </div>
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          <Paper elevation={0} className="mb-20">
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                General
              </Typography>
              <FormField
                label="Name"
                name="name"
                placeholder="Enter category name"
                register={register}
                error={errors.name?.message}
              />

              {onImagesChange && (
                <div>
                  <Typography className="fz-large-14 fw-bold mb-10">Image</Typography>
                  <UploadImages
                    control={control}
                    controllable={false}
                    error={formState?.isSubmitted ? errors.image?.message : undefined}
                    images={image}
                    maxImageCount={1}
                    onChangeImages={onImagesChange}
                    onDeleteImage={onDeleteImage}
                  />
                </div>
              )}
            </div>
          </Paper>
        </section>
        <aside className="adminDataUpsertAsideGrid">
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className={styles.blockTitle} variant="h6">
                Status
              </Typography>
              <RadioGroup
                value={statusValue}
                name={name}
                ref={ref}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  onChange((event.target as HTMLInputElement).value)
                }
              >
                <FormControlLabel value={StatusEnum.ACTIVE} control={<Radio />} label="Active" />
                <FormControlLabel value={StatusEnum.DISABLED} control={<Radio />} label="Disabled" />
              </RadioGroup>
            </div>
          </Paper>
        </aside>
      </div>
    </div>
  );
};
