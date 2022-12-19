import { Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import { Checkbox } from 'components/Checkbox';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { DateEventsBlock } from 'components/pages/admin/DateEventsBlock';
import { MasterClassUpsertViewProps } from 'components/pages/admin/MasterClassUpsert/types';
import { RequiredList } from 'components/pages/admin/RequiredList';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { Select } from 'components/Select';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller } from 'react-hook-form';

import { BookedDates } from '../BookedDates';
import { ProductSummary } from '../ProductSummary';
import styles from './MasterClassUpsert.module.scss';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });

export const AdminMasterClassView: React.FC<MasterClassUpsertViewProps> = ({
  control,
  countOfPeople,
  countOfPeoples,
  errors,
  formState,
  handleSubmit,
  isEditing,
  images,
  language,
  languages,
  onChangeImages,
  onChangeAutocomplete,
  onChangeLanguage,
  onChangeCountOfPeople,
  price,
  register,
  required,
  setValue,
  title,
}): React.ReactElement => {
  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (isEditing) {
    submitButtonText = 'Save';
  }

  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader
          title={title}
          handleSubmit={handleSubmit}
          submitButtonText={submitButtonText}
          isSubmitting={!!formState?.isSubmitting}
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
                placeholder="Enter chef table name"
                register={register}
                error={errors.name?.message}
              />
              <FormField
                label="Description"
                name="description"
                placeholder="Enter description"
                register={register}
                error={errors.description?.message}
                textarea
              />
              <UploadImages
                onChangeImages={onChangeImages}
                error={formState?.isSubmitted ? ((errors.media?.message as unknown) as string) : undefined}
                images={images}
                control={control}
              />
            </div>
          </Paper>
          <Paper elevation={0} className="mb-20">
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Programm
              </Typography>
              <Editor name="program" onChange={(data): void => setValue('program', data, { shouldValidate: true })} />
            </div>
          </Paper>
          <Paper elevation={0} className="mb-20">
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Appliances & Utensils required
              </Typography>
              <RequiredList
                onChange={(items): void => onChangeAutocomplete('required', items)}
                error={formState?.isSubmitted ? errors.required?.message : undefined}
                value={required}
              />
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Dates and time
              </Typography>
              <DateEventsBlock />
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Address
              </Typography>
              <Select
                defaultValue="1"
                fullWidth
                items={[
                  {
                    value: '1',
                    name: 'Al Khabaisi - Dubai - United Arab Emirates',
                  },
                ]}
                label="Saved Address"
                name="address"
                onChange={(): void => {}}
              />
              <Typography color="secondary" className="link">
                + Add New Address
              </Typography>
            </div>
          </Paper>
        </section>
        <aside className="adminDataUpsertAsideGrid">
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Type
              </Typography>
              <Controller
                control={control}
                name="type"
                render={({ value }): React.ReactElement => (
                  <RadioGroup defaultValue={String(value)} name="type">
                    <FormControlLabel value="restaurant" control={<Radio />} label="At external Location" />
                    <FormControlLabel value="home" control={<Radio />} label="At customer home" />
                  </RadioGroup>
                )}
              />
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Chef price
                <Typography className="mt-10">
                  Specify the price of the product including the chef`s commission
                </Typography>
              </Typography>
              <div className={styles.priceBlock}>
                <FormField name="price" register={register} defaultValue={String(price)} />
                <Typography className={styles.endAdornment}>AED</Typography>
              </div>
              {errors.price?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.price?.message}
                </p>
              )}
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                unknown price
                <Typography className="mt-10">
                  Specify the price of the product including the chef`s commission
                </Typography>
              </Typography>
              <div className={styles.priceBlock}>
                <FormField name="price" register={register} defaultValue={String(price)} />
                <Typography className={styles.endAdornment}>AED</Typography>
              </div>
              {errors.price?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.price?.message}
                </p>
              )}
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Group size
                <Typography className="mt-10">How many people can participate in this master class?</Typography>
              </Typography>
              <Select
                defaultValue={String(countOfPeople)}
                items={countOfPeoples.map((item) => ({ name: item.name, value: item.id }))}
                label="Count of people"
                name="countOfPeople"
                onChange={onChangeCountOfPeople}
              />
              {errors.countOfPeople?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.countOfPeople?.message}
                </p>
              )}
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Meal kit delivery
                <Typography className="mt-10">Include box delivery within Dubai for an additional fee</Typography>
              </Typography>
              <FormControlLabel
                className="mb-10"
                control={<Checkbox checked name="unknownPrice" color="secondary" />}
                label="Include"
              />
              <div className={styles.priceBlock}>
                <FormField
                  className={styles.inputunknownPrice}
                  name="price"
                  register={register}
                  defaultValue={String(price)}
                />
                <div className={styles.startAdornment}>
                  <Icon className={styles.searchIcon} type="search" />
                </div>
              </div>
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Language
                <Typography className="mt-10">What language will the table be in?</Typography>
              </Typography>
              <Select
                items={languages}
                label="Language"
                fullWidth
                name="language"
                onChange={onChangeLanguage}
                defaultValue={language}
              />
              {errors.language?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.language?.message}
                </p>
              )}
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <ProductSummary />
            </div>
          </Paper>
          <Paper elevation={0}>
            <div className="p-20">
              <BookedDates />
            </div>
          </Paper>
        </aside>
      </div>
    </div>
  );
};
