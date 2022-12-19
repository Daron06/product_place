import { FormControlLabel, Typography } from '@material-ui/core';
import { AutocompleteField } from 'components/AutocompleteField';
import { Checkbox } from 'components/Checkbox';
import { ChefTableMenu } from 'components/ChefTableMenu';
import { FormField } from 'components/FormField';
import { AdminChefTableUpsertViewProps } from 'components/pages/admin/ChefTableUpsert/types';
import { RequiredList } from 'components/pages/admin/RequiredList';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { Select } from 'components/Select';
import _get from 'lodash/get';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StatusArr } from 'redux/ducks/products/types/contracts';
import { UserRole } from 'redux/ducks/user/types/state';
import { DashboardRole, StatusEnum } from 'services/types';

import { AddAddressProps } from '../../../AddAddress';
import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { AdminEditingHeader } from '../AdminEditingHeader';
import { AutocompleteBlock } from '../AutocompleteBlock';
import { DateEventsBlockProps } from '../DateEventsBlock';
import { EventVenueProps } from '../EventVenue';
import { ImportantInformation } from '../ImportantInformation';
import { UploadFile } from '../UploadFile';
import { UploadFileBlock } from '../UploadFileBlock';
import styles from './ChefsTableUpsert.module.scss';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });
const AddAddress = dynamic<AddAddressProps>(() => import('components/AddAddress').then((m) => m.AddAddress), {
  ssr: false,
});
const DateEventsBlock = dynamic<DateEventsBlockProps>(
  () => import('../DateEventsBlock').then((m) => m.DateEventsBlock),
  {
    ssr: false,
  },
);
const EventVenue = dynamic<EventVenueProps>(
  () => import('components/pages/admin/EventVenue').then((m) => m.EventVenue),
  {
    ssr: false,
  },
);

export const AdminChefTableUpsertView: React.FC<AdminChefTableUpsertViewProps> = ({
  address,
  countOfPeople,
  countOfPeoples,
  isEditing,
  images,
  language,
  languages,
  onChangeImages,
  onChangeAutocomplete,
  onChangeLanguage,
  requestAllergies,
  title,
  timeTable,
  handleSubmit,
  eventType,
  chef,
  chefs,
  status,
  productType,
  editPage,
  isFree,
  instruction,
  role = DashboardRole.CHEF,
}) => {
  const { register, setValue, errors, formState, control, watch } = useFormContext();
  const linkType = watch('type');

  const onUploadFile = (url: string): void => {
    setValue('chatFileUrl', url, { shouldValidate: true });
  };

  const makeFree = productType === 'masterClass' && eventType !== 'at-restaurant';

  if (countOfPeoples && !isEditing) {
    setValue('countOfPeople', countOfPeoples[0].id, { shouldValidate: true });
  }

  return (
    <div className="p-30">
      <AdminEditingHeader isLanguageSelect={editPage} isEditing={isEditing} title={title} onSubmit={handleSubmit} />
      <div className={styles.root}>
        <section className={styles.rootSection}>
          {role === DashboardRole.STAFF && (
            <AutocompleteBlock items={chefs} name="chef" title="Chef" value={chef} role={UserRole.CHEF} />
          )}
          <WhiteBlock title="General" className="p-20 mb-30">
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
              error={formState?.isSubmitted ? errors.media?.message : undefined}
              images={images}
              control={control}
            />
          </WhiteBlock>
          {productType === 'chefTable' && (
            <>
              <WhiteBlock title="Menu description" className="p-20 mb-30">
                <FormField
                  name="shortDescription"
                  placeholder="Enter menu description"
                  register={register}
                  error={errors.shortDescription?.message}
                  textarea
                />
              </WhiteBlock>
              <WhiteBlock title="Menu" className="p-20 mb-30">
                <ChefTableMenu role={role} />
              </WhiteBlock>
            </>
          )}

          {productType === 'masterClass' && (
            <WhiteBlock title="Program" className="p-20 mb-30">
              <Editor name="program" onChange={(data): void => setValue('program', data, { shouldValidate: true })} />
            </WhiteBlock>
          )}
          {productType === 'chefTable' && (
            <>
              <WhiteBlock title="Special requests & allergies" className="mb-30 p-20">
                <FormField name="requestAllergies" textarea register={register} defaultValue={requestAllergies} />
              </WhiteBlock>
              <WhiteBlock title="Time at the table" className="mb-30 p-20">
                <FormField name="timeTable" textarea register={register} defaultValue={timeTable} />
              </WhiteBlock>
              <WhiteBlock title="Important information" className="mb-30 p-20">
                <ImportantInformation name="importantInformation" />
              </WhiteBlock>
            </>
          )}
          <WhiteBlock title="Appliances & Utensils required" className="mb-30 p-20">
            <Controller
              control={control}
              name="required"
              render={({ value }): React.ReactElement => (
                <RequiredList
                  onChange={(items): void => onChangeAutocomplete('required', items)}
                  error={formState?.isSubmitted ? errors.required?.message : undefined}
                  value={value}
                />
              )}
            />
          </WhiteBlock>
          {eventType !== 'recorded' && (
            <WhiteBlock title="Dates and time" className="p-20 mb-30">
              <DateEventsBlock type={productType} />
            </WhiteBlock>
          )}
          {eventType === 'at-restaurant' && (
            <WhiteBlock title="Address">
              <AddAddress address={address} chef={chef} role={role} />
            </WhiteBlock>
          )}
          {linkType === 'recorded' && (
            <>
              <WhiteBlock title="Vimeo link">
                <p>
                  Upload the video file to <span className="text-secondary">Vimeo</span> and provide a link to it below
                </p>

                <FormField placeholder="https://" name="vimeoUrl" register={register} />

                <Controller
                  control={control}
                  name="chatFileUrl"
                  render={({ value }) => (
                    <UploadFile
                      onSuccessUpload={onUploadFile}
                      error={_get(errors, `chatFileUrl.message`)}
                      value={value}
                      title="Upload chat"
                      testId="upload-chat-history"
                      isPDF
                    />
                  )}
                />
              </WhiteBlock>
              <WhiteBlock title="Duration">
                <p>How long is the video (in minutes)</p>

                <FormField type="number" name="duration" register={register} />
              </WhiteBlock>
            </>
          )}
        </section>
        <aside>
          {role === DashboardRole.STAFF && (
            <WhiteBlock title="Status" className="p-20">
              <Select
                name="status"
                defaultValue={status}
                items={StatusArr.map(({ slug, name }) => ({ value: slug, name }))}
                onChange={(e): void => setValue('status', e.target.value, { shouldValidate: true })}
                fullWidth
              />
            </WhiteBlock>
          )}
          {role === DashboardRole.CHEF && status === StatusEnum.ACTIVE && (
            <WhiteBlock title="Status" className="p-20 mt-0">
              <div className="d-flex justify-content-between align-items-center pb-10">
                <span className={styles.statusApprovation}>unknown approvation</span>
                <div className="d-flex align-items-center">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="#47D7AC" />
                    <path
                      d="M4 9.17647L6.88 12L13 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.approvedStatus}>Approved</span>
                </div>
              </div>
            </WhiteBlock>
          )}
          <EventVenue type={productType} />
          {productType === 'masterClass' && (
            <WhiteBlock
              className="p-20"
              title="Chef price"
              description="List the price per person including ingredients, manpower and chef commission"
            >
              <div
                className={`${makeFree || styles.disabledItem} 'cursor-p'`}
                onClick={(): void => setValue('isFree', !isFree, { shouldValidate: true })}
              >
                <Controller
                  control={control}
                  name="isFree"
                  render={({ value }): React.ReactElement => (
                    <FormControlLabel
                      style={{ pointerEvents: 'none' }}
                      control={<Checkbox checked={value} name="isFree" value={value} />}
                      label="Free access"
                    />
                  )}
                />
              </div>

              <FormField
                name="chefPrice"
                register={register}
                type="number"
                className={`${styles.priceInput} ${isFree && styles.disabledItem} inputNum`}
                error={errors.chefPrice?.message}
                suffix="AED"
                placeholder={isFree ? 'Free' : '0'}
              />
            </WhiteBlock>
          )}
          {role === DashboardRole.STAFF && productType === 'masterClass' && (
            <>
              <WhiteBlock
                className="p-20 mt-0"
                title="unknown price"
                description="List the price per person including unknown Commission"
              >
                <FormField
                  name="price"
                  register={register}
                  type="number"
                  className={`${styles.priceInput} ${isFree && styles.disabledItem} inputNum`}
                  error={errors.price?.message}
                  suffix="AED"
                  placeholder={isFree ? 'Free' : '0'}
                />
              </WhiteBlock>
            </>
          )}
          {eventType !== 'recorded' && (
            <WhiteBlock className="p-20 mt-0">
              <Typography className={styles.blockTitle} variant="h6">
                {productType === 'chefTable' ? 'Seats' : 'Group Size'}
                <Typography className="mt-10">
                  How many people can participate on this{' '}
                  {productType === 'chefTable' ? 'Chef`s table' : 'master class'}?
                </Typography>
              </Typography>
              <AutocompleteField
                name="countOfPeople"
                items={countOfPeoples.map((item) => ({ name: item.name, value: item.id }))}
                defaultValue={{
                  name: String(countOfPeople || countOfPeoples[0].name),
                  value: String(countOfPeople || countOfPeoples[0].id),
                }}
                onInputChange={(v): void => setValue('countOfPeople', v, { shouldValidate: true })}
              />
              {errors.countOfPeople?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.countOfPeople?.message}
                </p>
              )}
            </WhiteBlock>
          )}
          <WhiteBlock className="p-20 mt-0">
            <Typography className={styles.blockTitle} variant="h6">
              Language
              <Typography className="mt-10">What language will the table be in?</Typography>
            </Typography>
            <Select
              items={languages}
              label="Language"
              name="language"
              onChange={onChangeLanguage}
              defaultValue={String(language)}
            />
            {formState.isSubmitted && errors.language?.message && (
              <p className="error-label" data-test-id="cuisine-error-message">
                {errors.language?.message}
              </p>
            )}
          </WhiteBlock>
          {role === DashboardRole.STAFF && productType === 'masterClass' && eventType !== 'at-restaurant' && (
            <UploadFileBlock
              description="You can attach a pdf booklet to the masterclass (optional)"
              title="Masterclass booklet"
              instruction={instruction}
              marginZero
            />
          )}
        </aside>
      </div>
    </div>
  );
};
