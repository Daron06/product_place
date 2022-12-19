import { yupResolver } from '@hookform/resolvers/yup';
import { Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormField } from 'components/FormField';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { LanguageContext } from 'layouts/AdminLayout';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldError, FormProvider, useController, useForm } from 'react-hook-form';
import { BlogCategoriesApi } from 'services/api/admin/BlogCategoriesApi';
import { DashboardRole, Ingredient, LangSelectType, StatusEnum } from 'services/types';
import { CreateSupplierIngredientSchema } from 'utils/validationSchemas/admin/createIngredientSchema';

interface IngredientsUpsertProps {
  category?: Ingredient;
  role: DashboardRole;
}

interface IngredientFieldsProps {
  name: string;
  image: string & FieldError;
  status: StatusEnum;
}

export const BlogCategoriesUpsert: React.FC<IngredientsUpsertProps> = ({ category }): React.ReactElement => {
  const router = useRouter();
  const pathRouter = router.asPath.split('/').slice(1, 5).join('/');
  const form = useForm<IngredientFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateSupplierIngredientSchema),
    defaultValues: {
      image: category?.image ?? '',
      name: category?.name,
      status: category?.status ?? StatusEnum.ACTIVE,
    },
  });

  const { control, formState, errors, handleSubmit, register, setValue } = form;

  const {
    field: { ref, onChange, value: ingredientStatusValue, name },
  } = useController({
    name: 'status',
    control,
    defaultValue: category?.status ?? StatusEnum.ACTIVE,
  });

  React.useEffect(() => {
    register('image');
  }, [register]);

  const onSubmit = async (fields): Promise<void> => {
    const data = {
      name: fields.name,
      image: fields.image,
      status: fields.status,
    };

    if (category) {
      await BlogCategoriesApi.update(String(category.id), data);
    } else {
      await BlogCategoriesApi.add(data);
    }
    await router.push(`/${pathRouter}`);
  };

  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (category) {
    submitButtonText = 'Save';
  }

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      setValue('image', img.url, { shouldValidate: true });
    }
  };

  const ingredientImage = category?.image
    ? [
        {
          url: category.image,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  const { acceptLanguage } = React.useContext(LanguageContext);
  const translatedFieldsSets = (
    translatedFields: Array<string>,
    allFieldsObj: Record<string, any>,
    lang: LangSelectType,
  ): void => {
    translatedFields.forEach((fieldName) => {
      const key = lang === 'en' ? fieldName : `${fieldName}__${lang}`;
      const value = allFieldsObj[key];
      setValue(fieldName, value);
    });
  };
  React.useEffect(() => {
    if (category) {
      translatedFieldsSets(['name'], category, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader
          title={!category?.name ? 'Create category' : 'Edit category'}
          handleSubmit={handleSubmit(onSubmit)}
          submitButtonText={submitButtonText}
          isSubmitting={!!formState?.isSubmitting}
          isLanguageSelect={category?.name ? true : false}
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
              <Typography className="fz-large-14 mb-10">Image</Typography>
              <FormProvider {...form}>
                <UploadImages
                  control={control}
                  controllable={false}
                  error={formState?.isSubmitted ? ((errors.image?.message as unknown) as string) : undefined}
                  images={ingredientImage}
                  maxImageCount={1}
                  onChangeImages={handleImagesChange}
                />
              </FormProvider>
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
                value={ingredientStatusValue}
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
