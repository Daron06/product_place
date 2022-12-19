import { yupResolver } from '@hookform/resolvers/yup';
import {
  AdminChefTableUpsertViewProps,
  ChefTableUpsertFieldsProps,
} from 'components/pages/admin/ChefTableUpsert/types';
import { getCountOfPeople, languages } from 'components/pages/admin/staff/chef-table/constants';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { LanguageContext } from 'layouts/AdminLayout';
import keyBy from 'lodash/keyBy';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole, Item } from 'services/types';
import { productParametersNormalizer } from 'utils/normalizers/ProductParametersNormalizer';
import { switchTranslatedFields } from 'utils/switchTranslatedFields';
import { CreateChefTableFormSchema } from 'utils/validationSchemas/admin/createChefTableSchema';

import { useAlert } from '../../../../hooks/useAlert';
import { selectDirectoriesData } from '../../../../redux/ducks/directories/selectors';
import { responseErrorsNormalize } from '../../../../utils/responseErrorsNormalize';
import { AdminChefTableUpsertView } from './View';

interface AdminChefTableUpsertProps {
  data?: Product;
  title: string;
  role?: DashboardRole;
  productType?: AdminChefTableUpsertViewProps['productType'];
  editPage: boolean;
}

interface AdminChefTableContextProps {
  images?: UploadedImage[];
  area?: string;
}
export const AdminChefTableContext = React.createContext<AdminChefTableContextProps>({} as AdminChefTableContextProps);

export const AdminChefTableUpsert: React.FC<AdminChefTableUpsertProps> = ({
  data,
  role,
  title,
  editPage,
  productType = 'chefTable',
}): React.ReactElement => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { chefs } = useSelector(selectDirectoriesData);

  const goBackLink = typeof window !== 'undefined' ? location.href.replace(/create|edit\/\d+/, '') : '';
  const form = useForm<ChefTableUpsertFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateChefTableFormSchema),
    defaultValues: {
      address: data?.address ?? undefined,
      chef: data?.chef,
      countOfPeople: data?.additionalInfo?.countOfPeople ?? '10',
      dates: data?.dates,
      description: data?.description,
      description__ar: data?.description__ar,
      shortDescription: data?.shortDescription || '',
      shortDescription__ar: data?.shortDescription__ar || '',
      duration: data?.additionalInfo?.duration ?? 30,
      importantInformation: data?.additionalInfo?.importantInformation.map((item) => ({ value: item })),
      importantInformation__ar: data?.additionalInfo?.importantInformation__ar?.map((item) => ({
        value: item,
      })),
      language: data?.additionalInfo?.language ?? languages[0].name,
      name: data?.name,
      name__ar: data?.name__ar,
      program: data?.additionalInfo?.program || '',
      program__ar: data?.additionalInfo?.program__ar || '',
      price: data?.price ?? undefined,
      chefPrice: String(data?.chefPrice) ?? undefined,
      media: data?.media,
      required: data?.required || [],
      requestAllergies: data?.additionalInfo?.requestAllergies,
      requestAllergies__ar: data?.additionalInfo?.requestAllergies__ar,
      timeTable: data?.additionalInfo?.timeTable,
      timeTable__ar: data?.additionalInfo?.timeTable__ar,
      type: data?.additionalInfo?.type || 'at-home',
      status: data?.status,
      chatFileUrl: data?.chatFileUrl || '',
      menuOptions: data?.menuOptions || [],
      isFree: data?.isFree || false,
      instruction: data?.instruction || null,
    },
  });

  React.useEffect(() => {
    form.register('countOfPeople');
    form.register('language');
    form.register('address');
    form.register('status');
    form.register('dates');
    form.register('chef');
  }, []);

  const { handleSubmit, setValue, watch } = form;
  const { acceptLanguage } = React.useContext(LanguageContext);

  const isFree = watch('isFree');

  React.useEffect(() => {
    setValue('chefPrice', isFree ? 'Free' : data?.chefPrice || 0, { shouldValidate: true });
    setValue('price', isFree ? 'Free' : data?.price || 0, { shouldValidate: true });
  }, [isFree]);

  React.useEffect(() => {
    if (watch('type') !== 'recorded' && watch('type') !== 'at-home') {
      setValue('isFree', false, { shouldValidate: true });
    }
  }, [watch('type')]);

  React.useEffect(() => {
    switchTranslatedFields(
      setValue,
      [
        'name',
        'description',
        'program',
        'requestAllergies',
        'timeTable',
        'importantInformation',
        'shortDescription',
        'instruction',
      ],
      {
        name: data?.name || '',
        name__ar: data?.name__ar || '',
        description: data?.description || '',
        description__ar: data?.description__ar || '',
        timeTable: data?.additionalInfo?.timeTable || '',
        timeTable__ar: data?.additionalInfo?.timeTable__ar || '',
        shortDescription: data?.shortDescription || '',
        shortDescription__ar: data?.shortDescription__ar || '',
        instruction: data?.instruction || '',
        instruction__ar: data?.instruction__ar || '',
        program: data?.additionalInfo?.program || '',
        program__ar: data?.additionalInfo?.program__ar || '',
        requestAllergies: data?.additionalInfo?.requestAllergies || '',
        requestAllergies__ar: data?.additionalInfo?.requestAllergies__ar || '',
        importantInformation: data?.additionalInfo?.importantInformation?.map((item) => ({ value: item })),
        importantInformation__ar: data?.additionalInfo?.importantInformation__ar?.map((item) => ({
          value: item,
        })),
      },
      acceptLanguage,
    );
  }, [acceptLanguage]);

  const eventType = watch('type') as AdminChefTableUpsertViewProps['eventType'];
  const countOfPeoples = getCountOfPeople(productType, eventType);

  const onSubmit = async (formFields: ChefTableUpsertFieldsProps): Promise<void> => {
    const endpoint = productType === 'chefTable' ? AdminEndpoints.CHEFS_TABLE : AdminEndpoints.MASTER_CLASS;

    const normalizedData = productParametersNormalizer({
      ...formFields,
      isFree: formFields.isFree,
      price: formFields.price ? formFields.price : 0,
      chefPrice: formFields.chefPrice ? String(formFields.chefPrice) : '0',
      status: formFields.status,
      address: eventType === 'at-restaurant' ? formFields.address : undefined,
      additionalInfo: {
        countOfPeople: Number(formFields.countOfPeople),
        duration: Number(formFields.duration),
        program: formFields.program,
        type: formFields.type,
        language: formFields.language,
        timeTable: formFields.timeTable,
        requestAllergies: formFields.requestAllergies,
        importantInformation: formFields.importantInformation?.map((item) => item.value) ?? [],
      },
      dates: formFields.dates.map((obj) => {
        const find = data?.dates.find((o) => o.date === obj.date && o.from === obj.from);
        if (find) {
          return {
            ...obj,
            id: find.id,
          };
        }
        return obj;
      }),
    });

    try {
      if (data) {
        await AdminProductsApi.update(endpoint, data.id, normalizedData);
        openAlert('Successfully saved', 'success');
      } else {
        await AdminProductsApi.create(endpoint, normalizedData);
        openAlert('Successfully created', 'success');
        await router.push(goBackLink);
      }
    } catch (err) {
      if (err.response.status === 422) {
        // TODO: сделать валидацию с бэкэнда
        console.warn(responseErrorsNormalize(err.response?.data?.errors));
      }
      console.warn('onSubmit menu', err);
      openAlert(`Error when saving: ${err.message}`, 'error');
    }
  };

  const handleImagesChange = (arr: UploadedImage[]): void => {
    setValue(
      'media',
      arr.filter((obj) => obj.name),
      { shouldValidate: true },
    );
  };

  const handleAutocompleteChange = (fieldName: string, arr: Item[]): void => {
    setValue(fieldName, arr, { shouldValidate: true });
  };

  const handleChangeLanguage = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const languagesKeyBy = keyBy(languages, 'value');
    setValue('language', languagesKeyBy[event.target.value as string].value, { shouldValidate: true });
  };

  const handleChangeCountOfPeople = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const countOfPeopleKeyBy = keyBy(countOfPeoples, 'value');
    setValue('countOfPeople', countOfPeopleKeyBy[event.target.value as string].id, { shouldValidate: true });
  };

  const currentChef = form.watch('chef');

  return (
    <FormProvider {...form}>
      <AdminChefTableContext.Provider
        value={{
          area: data?.address?.area?.name,
          images: data?.address?.images.map((item) => ({ id: '', url: item, name: item })),
        }}
      >
        <AdminChefTableUpsertView
          chefs={chefs}
          address={data?.address}
          countOfPeople={data?.additionalInfo?.countOfPeople ?? +countOfPeoples[0].name}
          countOfPeoples={countOfPeoples}
          chef={currentChef}
          handleSubmit={handleSubmit(onSubmit)}
          isEditing={!!data}
          images={data?.media}
          language={data?.additionalInfo?.language ?? languages[0].name}
          languages={languages}
          onChangeImages={handleImagesChange}
          onChangeAutocomplete={handleAutocompleteChange}
          onChangeLanguage={handleChangeLanguage}
          onChangeCountOfPeople={handleChangeCountOfPeople}
          requestAllergies={data?.additionalInfo?.requestAllergies ?? ''}
          title={title}
          timeTable={data?.additionalInfo?.timeTable ?? ''}
          productType={productType}
          eventType={eventType}
          role={role}
          status={data?.status}
          editPage={editPage}
          isFree={isFree}
          instruction={data?.instruction}
        />
      </AdminChefTableContext.Provider>
    </FormProvider>
  );
};
