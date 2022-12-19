import { CircularProgress, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import { FormField } from 'components/FormField';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import format from 'date-fns/format';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Banner, BannerPositionType, StatusEnum } from 'services/types';

import { DatePicker } from '../../DatePicker';
import { Select } from '../../Select';
import { CreateHeader } from './CreateHeader';
import { UploadImages } from './UploadImages';
import { ImageObj, UploadedImage } from './UploadImages/types';

interface ApproveCategoryProps {
  data?: Banner;
  onSubmit: (fields: Banner) => Promise<void>;
  title: string;
  image?: UploadedImage[];
  onImagesChange?: (arr: UploadedImage[]) => void;
  onDeleteImage?: (data: ImageObj) => void;
}

export const ApproveBanner: React.FC<ApproveCategoryProps> = ({
  data,
  onSubmit,
  title,
  image,
  onImagesChange,
  onDeleteImage,
}) => {
  const { register, control, errors, formState, handleSubmit, setValue, watch } = useFormContext();
  const {
    field: { ref, onChange, value: statusValue, name },
  } = useController({
    name: 'status',
    control,
  });
  const [dateValue, setDateValue] = React.useState(`${data?.expirationDate || ''}`);
  const position = watch('position');

  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (data) {
    submitButtonText = 'Save';
  }

  const handleChangeType = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setValue('type', e.target.value, { shouldValidate: true });
  };

  const handleChangePosition = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setValue('position', e.target.value, { shouldValidate: true });
  };

  const handleSelectDate = (date: Date): void => {
    setValue('expirationDate', format(new Date(date), 'yyyy-MM-dd'));
    setDateValue(format(new Date(date), 'yyyy-MM-dd'));
  };

  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader
          title={title}
          handleSubmit={handleSubmit(onSubmit)}
          submitButtonText={submitButtonText}
          isSubmitting={!!formState?.isSubmitting}
        />
      </div>
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          <Paper elevation={0} className="mb-20">
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Position
              </Typography>
              <Select
                defaultValue={data?.position || 'selectPosition'}
                placeholder="Select Position"
                items={[
                  { value: 'selectPosition', name: 'Select Position', id: 'selectPosition' },
                  {
                    value: BannerPositionType.HOMEPAGE_SLIDER,
                    name: 'Homepage slider',
                    id: BannerPositionType.HOMEPAGE_SLIDER,
                  },
                  {
                    value: BannerPositionType.CHEF_STORE_TOP_1,
                    name: "Chef's store top 1",
                    id: BannerPositionType.CHEF_STORE_TOP_1,
                  },
                  {
                    value: BannerPositionType.CHEF_STORE_TOP_2,
                    name: "Chef's store top 2",
                    id: BannerPositionType.CHEF_STORE_TOP_2,
                  },
                  {
                    value: BannerPositionType.CHEF_STORE_TOP_3,
                    name: "Chef's store top 3",
                    id: BannerPositionType.CHEF_STORE_TOP_3,
                  },
                  {
                    value: BannerPositionType.CHEF_STORE_TOP_4,
                    name: "Chef's store top 4",
                    id: BannerPositionType.CHEF_STORE_TOP_4,
                  },
                  {
                    value: BannerPositionType.CHEF_STORE_MIDDLE,
                    name: "Chef's store middle",
                    id: BannerPositionType.CHEF_STORE_MIDDLE,
                  },
                ]}
                name="position"
                onChange={handleChangePosition}
              />
            </div>
          </Paper>
          {position !== 'selectPosition' && (
            <Paper elevation={0} className="mb-20">
              <div className="p-20">
                <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                  General
                </Typography>
                <FormField
                  label="Title"
                  name="title"
                  placeholder="Enter banner title"
                  register={register}
                  error={errors.title?.message}
                />
                {position === BannerPositionType.HOMEPAGE_SLIDER && (
                  <>
                    <FormField
                      label="Sub title"
                      name="subTitle"
                      placeholder="Enter banner sub title"
                      register={register}
                      error={errors.subTitle?.message}
                    />

                    <Select
                      defaultValue={data?.type}
                      items={[
                        { value: 'masterClass', name: 'Master Class', id: 'masterClass' },
                        { value: 'chefTable', name: 'Chef Table', id: 'chefTable' },
                      ]}
                      label="Type"
                      name="type"
                      onChange={handleChangeType}
                    />
                  </>
                )}

                {position === BannerPositionType.CHEF_STORE_MIDDLE && (
                  <>
                    <FormField
                      label="Name of the product"
                      name="subTitle"
                      placeholder="Enter name of the product"
                      register={register}
                      error={errors.subTitle?.message}
                    />
                  </>
                )}

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

                <FormField
                  label={position === BannerPositionType.CHEF_STORE_MIDDLE ? 'Product Link' : 'Banner link'}
                  name="link"
                  placeholder={
                    position === BannerPositionType.CHEF_STORE_MIDDLE ? 'Enter a product Link' : ' Enter a banner link'
                  }
                  register={register}
                  error={errors.link?.message}
                />

                {position === BannerPositionType.HOMEPAGE_SLIDER && (
                  <FormField
                    label="Button text"
                    name="buttonText"
                    placeholder="Enter a button text"
                    register={register}
                    error={errors.buttonText?.message}
                  />
                )}
              </div>
            </Paper>
          )}
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

          <Paper elevation={0}>
            <div className="p-20">
              <DatePicker<Date>
                classes={{ root: styles.datepicker, input: styles.datepickerInput }}
                name="Date"
                minDate={new Date()}
                onSelect={handleSelectDate}
                value={dateValue}
                label="Date"
              />

              <RadioGroup
                value=""
                name="expirationDate"
                ref={ref}
                onChange={(): void => {
                  setValue('expirationDate', '');
                }}
              >
                <FormControlLabel value="" control={<Radio />} label="Indefinitely" />
              </RadioGroup>
            </div>
          </Paper>
        </aside>
      </div>
    </div>
  );
};
