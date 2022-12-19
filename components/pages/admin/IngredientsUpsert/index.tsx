import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, IconButton, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { AutocompleteField } from 'components/AutocompleteField';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { useIngredients } from 'hooks/useProductDetails/useIngredients';
import { Immutable } from 'immer';
import { LanguageContext } from 'layouts/AdminLayout';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldError, FormProvider, useController, useForm } from 'react-hook-form';
import { DashboardRole, Ingredient, LangSelectType, StatusEnum, Supplier } from 'services/types';
import {
  CreateStaffIngredientSchema,
  CreateSupplierIngredientSchema,
} from 'utils/validationSchemas/admin/createIngredientSchema';

interface IngredientsUpsertProps {
  ingredient?: Ingredient;
  role: DashboardRole;
  suppliers?: Immutable<Supplier[]>;
}

interface IngredientFieldsProps {
  name: string;
  image: string & FieldError;
  status: StatusEnum;
  supplier: {
    name: string;
    slug: string;
    id: string;
  } & FieldError;
}

export const IngredientsUpsert: React.FC<IngredientsUpsertProps> = ({
  ingredient,
  role,
  suppliers,
}): React.ReactElement => {
  const router = useRouter();
  const [autoCompleteValue, setAutoCompleteValue] = React.useState<Supplier | undefined>(ingredient?.supplier);
  const { addNewIngredient, updateIngredientRequest, addedUpdatedItem } = useIngredients();

  const form = useForm<IngredientFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(role === DashboardRole.STAFF ? CreateStaffIngredientSchema : CreateSupplierIngredientSchema),
    defaultValues: {
      image: ingredient?.image ?? '',
      name: ingredient?.name,
      status: ingredient?.status ?? StatusEnum.ACTIVE,
      supplier: ingredient?.supplier
        ? { name: ingredient?.supplier.name, slug: ingredient?.supplier.slug, id: ingredient?.supplier.id }
        : undefined,
    },
  });

  const { control, formState, errors, handleSubmit, register, setValue, getValues } = form;

  const { supplier } = getValues();

  const {
    field: { ref, onChange, value: ingredientStatusValue, name },
  } = useController({
    name: 'status',
    control,
    defaultValue: ingredient?.status ?? StatusEnum.ACTIVE,
  });

  React.useEffect(() => {
    register('image');
    register('supplier');
  }, [register]);

  const handleAutocompleteChange = (data): void => {
    setValue('supplier', data, { shouldValidate: true });
    setAutoCompleteValue(data);
  };

  const handleClearAutocomplete = (): void => {
    setValue('supplier', undefined, { shouldValidate: true });
    setAutoCompleteValue(undefined);
  };

  const onSubmit = async (fields): Promise<void> => {
    const data = {
      name: fields.name,
      image: fields.image,
      status: fields.status,
      supplier: fields.supplier
        ? {
            id: fields.supplier?.id ?? '',
            name: fields.supplier?.name ?? '',
            slug: fields.supplier?.slug ?? '',
          }
        : undefined,
    };

    if (ingredient) {
      await updateIngredientRequest(String(ingredient.id), data);
    } else {
      await addNewIngredient(data);
    }
  };

  React.useEffect(() => {
    if (addedUpdatedItem && !ingredient) {
      const redirectUrl = `edit/${addedUpdatedItem.id}`;
      router.push(redirectUrl);
    }
  }, [addedUpdatedItem]);

  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (ingredient) {
    submitButtonText = 'Save';
  }

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      setValue('image', img.url, { shouldValidate: true });
    }
  };

  const ingredientImage = ingredient?.image
    ? [
        {
          url: ingredient.image,
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
    if (ingredient) {
      translatedFieldsSets(['name'], ingredient, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader
          title={!ingredient?.name ? 'Create ingredient' : 'Edit ingredient'}
          handleSubmit={handleSubmit(onSubmit)}
          submitButtonText={submitButtonText}
          isSubmitting={!!formState?.isSubmitting}
          isLanguageSelect
        />
      </div>
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          {role === DashboardRole.STAFF && (
            <Paper elevation={0} className="mb-20 p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                Cloud kitchen
              </Typography>
              {!autoCompleteValue && (
                <AutocompleteField
                  error={errors.supplier?.message}
                  items={suppliers ?? []}
                  name="supplier"
                  onChange={handleAutocompleteChange}
                  placeholder="Select require..."
                  value={(supplier as unknown) as Supplier}
                />
              )}
              {autoCompleteValue && (
                <div className="d-flex align-items-center">
                  <Avatar src={autoCompleteValue.image} />
                  <div className="d-flex flex-column ml-10">
                    <Typography>{autoCompleteValue.name}</Typography>
                    <Typography className="fz-large-13 text-color-600 text-truncate">
                      {autoCompleteValue.description}
                    </Typography>
                  </div>
                  <div className="ml-auto">
                    <IconButton onClick={handleClearAutocomplete}>
                      <Icon type="close" />
                    </IconButton>
                  </div>
                </div>
              )}
            </Paper>
          )}
          <Paper elevation={0} className="mb-20">
            <div className="p-20">
              <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
                General
              </Typography>
              <FormField
                label="Name"
                name="name"
                placeholder="Enter ingredient name"
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
