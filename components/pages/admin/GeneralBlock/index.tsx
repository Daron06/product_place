import { Typography } from '@material-ui/core';
import { FormField } from 'components/FormField';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { Select } from 'components/Select';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { useTranslatedFields } from 'hooks/useTranslatedFields';
import { LanguageContext } from 'layouts/AdminLayout';
import orderBy from 'lodash/orderBy';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectDirectoriesData } from 'redux/ducks/directories/selectors';
import { Cuisine, Product } from 'redux/ducks/products/types/contracts';

interface GeneralBlockProps {
  cuisine?: Cuisine['id'];
  images?: UploadedImage[];
  marginZero?: boolean;
  disabled?: boolean;
  isLanguageSelect?: boolean;
  itemData?: Product | null;
}

export const GeneralInfoBlock: React.FC<GeneralBlockProps> = ({
  cuisine,
  images,
  marginZero = false,
  disabled = false,
  isLanguageSelect,
  itemData,
}): React.ReactElement => {
  const { cuisines } = useSelector(selectDirectoriesData);
  const { control, formState, errors, register, setValue } = useFormContext();

  React.useEffect(() => {
    register('cuisine');
  }, [register]);

  const handleImagesChange = (array: UploadedImage[]): void => {
    setValue(
      'media',
      array.filter((obj) => obj.name),
      { shouldValidate: true },
    );
  };

  const onChangeCuisine = (event: React.ChangeEvent<{ value: unknown }>): void => {
    if (cuisines) {
      const obj = cuisines.find((item) => Number(item.id) === Number(event.target.value));
      if (obj) {
        setValue('cuisine', obj, { shouldValidate: true });
      } else {
        throw new Error('Selected cuisine not founded in cuisines array');
      }
    }
  };

  const { translatedData } = useTranslatedFields();
  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    if (itemData && isLanguageSelect) {
      translatedData(['name', 'description', 'shortDescription'], itemData, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="pb-20">
      <WhiteBlock marginZero={marginZero} disabled={disabled}>
        <div className="pb-10">
          <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
            General
          </Typography>
          <FormField
            error={errors.name?.message}
            label="Name"
            name="name"
            placeholder="Enter chef table name"
            register={register}
          />
          <FormField
            error={errors.description?.message}
            label="Description"
            name="description"
            placeholder="Enter description"
            register={register}
            textarea
          />
          {cuisines && (
            <>
              <Select
                label="Cuisine"
                items={orderBy(cuisines, 'name', 'asc').map((item) => ({
                  name: item.name,
                  value: String(item.id),
                }))}
                data-test-id="cuisine-select"
                defaultValue={cuisine}
                name="cuisine"
                onChange={onChangeCuisine}
              />
              {errors.cuisine?.message && (
                <p className="error-label" data-test-id="cuisine-error-message">
                  {errors.cuisine?.message}
                </p>
              )}
            </>
          )}
          <UploadImages
            onChangeImages={handleImagesChange}
            error={formState?.isSubmitted ? errors.media?.message : undefined}
            images={images}
            control={control}
            controllable={false}
          />
        </div>
      </WhiteBlock>
    </div>
  );
};
