import { yupResolver } from '@hookform/resolvers/yup';
import { AreaItem } from 'components/AreaField/AreaField';
import {
  AdminChefTableUpsertViewProps,
  ChefTableUpsertFieldsProps,
} from 'components/pages/admin/ChefTableUpsert/types';
import { defaultValues, getCountOfPeople, languages } from 'components/pages/admin/staff/chef-table/constants';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { useAlert } from 'hooks/useAlert';
import { LanguageContext } from 'layouts/AdminLayout';
import keyBy from 'lodash/keyBy';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectDirectoriesData } from 'redux/ducks/directories/selectors';
import { Chef, Media, Product, StatusArr } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole, Item } from 'services/types';
import { productParametersNormalizer } from 'utils/normalizers/ProductParametersNormalizer';
import { switchTranslatedFields } from 'utils/switchTranslatedFields';
import {
  StaffEditChefTableSchema,
  StaffEditMasterclassSchema,
} from 'utils/validationSchemas/admin/staffEditChefTableSchema';

import { calcMaxDurationFromDates } from '../../../../../utils/date/calcMaxDurationFromDates';
import {
  CreateChefTableFormSchema,
  CreateEditMasterclassSchema,
  DatesSchema,
} from '../../../../../utils/validationSchemas/admin/createChefTableSchema';
import { EventDate } from '../../../../AddEventDate';
import { AdminChefTableUpsertView } from '../../ChefTableUpsert/View';

interface AdminChefTableUpsertProps {
  chefTableData?: Product;
  title: string;
  productType: AdminChefTableUpsertViewProps['productType'];
  role?: DashboardRole;
  editPage: boolean;
}

interface AdminChefTableContextProps {
  images?: UploadedImage[];
  area?: AreaItem;
  dates?: EventDate[];
  setChefTableDates: React.Dispatch<React.SetStateAction<EventDate[]>>;
}

export const chooseScheme = {
  staffchefTable: StaffEditChefTableSchema,
  staffmasterClass: StaffEditMasterclassSchema,
  chefchefTable: CreateChefTableFormSchema,
  chefmasterClass: CreateEditMasterclassSchema,
};

export const AdminChefTableContext = React.createContext<AdminChefTableContextProps>({} as AdminChefTableContextProps);

export const AdminStaffChefTableUpsert: React.FC<AdminChefTableUpsertProps> = ({
  title,
  chefTableData,
  productType = 'chefTable',
  role = DashboardRole.STAFF,
  editPage,
}) => {
  const router = useRouter();
  const [chefTableDates, setChefTableDates] = React.useState<EventDate[]>(chefTableData?.dates || []);
  const [images, setImages] = React.useState<Media[]>(chefTableData?.media || []);
  const [countOfPeopleForType, setCountOfPeopleForType] = React.useState(chefTableData?.additionalInfo?.countOfPeople);
  const { chefs } = useSelector(selectDirectoriesData);
  const { openAlert } = useAlert();

  const form = useForm<ChefTableUpsertFieldsProps & { chef: Chef }>({
    mode: 'onChange',
    resolver: yupResolver(chooseScheme[role + productType]),
    defaultValues: {
      countOfPeople: chefTableData?.additionalInfo?.countOfPeople ?? defaultValues.countOfPeople,
      chef: chefTableData?.chef,
      dates: chefTableData?.dates,
      description: chefTableData?.description,
      description__ar: chefTableData?.description__ar,
      shortDescription: chefTableData?.shortDescription || '',
      shortDescription__ar: chefTableData?.shortDescription__ar || '',
      duration: chefTableData?.additionalInfo?.duration ?? defaultValues.duration,
      importantInformation: chefTableData?.additionalInfo?.importantInformation?.map((item) => ({ value: item })),
      importantInformation__ar: chefTableData?.additionalInfo?.importantInformation__ar?.map((item) => ({
        value: item,
      })),
      language: chefTableData?.additionalInfo?.language ?? languages[0]?.name,
      name: chefTableData?.name,
      name__ar: chefTableData?.name__ar,
      program: chefTableData?.additionalInfo?.program || '',
      program__ar: chefTableData?.additionalInfo?.program__ar || '',
      price: chefTableData?.price ?? undefined,
      chefPrice: String(chefTableData?.chefPrice) ?? undefined,
      media: chefTableData?.media,
      required: chefTableData?.required || [],
      requestAllergies: chefTableData?.additionalInfo?.requestAllergies,
      requestAllergies__ar: chefTableData?.additionalInfo?.requestAllergies__ar,
      days: chefTableData?.additionalInfo?.days,
      timeTable: chefTableData?.additionalInfo?.timeTable,
      timeTable__ar: chefTableData?.additionalInfo?.timeTable__ar,
      type: chefTableData?.additionalInfo?.type || 'at-home',
      status: chefTableData?.status,
      address: chefTableData?.address,
      vimeoUrl: chefTableData?.vimeoUrl,
      menuOptions: chefTableData?.menuOptions,
      isFree: chefTableData?.isFree || false,
      instruction: chefTableData?.instruction || '',
    },
  });

  const { handleSubmit, register, setValue, watch } = form;
  const eventType = watch('type') as AdminChefTableUpsertViewProps['eventType'];

  const { acceptLanguage } = React.useContext(LanguageContext);

  const isFree = watch('isFree');

  React.useEffect(() => {
    setValue('chefPrice', isFree ? 'Free' : chefTableData?.chefPrice || 0, { shouldValidate: true });
    setValue('price', isFree ? 'Free' : chefTableData?.price || 0, { shouldValidate: true });
  }, [isFree]);

  React.useEffect(() => {
    if (watch('type') !== 'recorded' && watch('type') !== 'at-home') {
      setValue('isFree', false, { shouldValidate: true });
    }
  }, [watch('type')]);

  React.useEffect(() => {
    switchTranslatedFields(
      setValue,
      ['name', 'timeTable', 'description', 'program', 'requestAllergies', 'importantInformation', 'shortDescription'],
      {
        name: chefTableData?.name || '',
        name__ar: chefTableData?.name__ar || '',
        description: chefTableData?.description || '',
        description__ar: chefTableData?.description__ar || '',
        shortDescription: chefTableData?.shortDescription || '',
        shortDescription__ar: chefTableData?.shortDescription__ar || '',
        program: chefTableData?.additionalInfo?.program || '',
        program__ar: chefTableData?.additionalInfo?.program__ar || '',
        requestAllergies: chefTableData?.additionalInfo?.requestAllergies || '',
        timeTable: chefTableData?.additionalInfo?.timeTable || '',
        timeTable__ar: chefTableData?.additionalInfo?.timeTable__ar || '',
        requestAllergies__ar: chefTableData?.additionalInfo?.requestAllergies__ar || '',
        importantInformation: chefTableData?.additionalInfo?.importantInformation?.map((item) => ({ value: item })),
        importantInformation__ar: chefTableData?.additionalInfo?.importantInformation__ar?.map((item) => ({
          value: item,
        })),
      },
      acceptLanguage,
    );
  }, [acceptLanguage]);

  const countOfPeoples = getCountOfPeople(productType, eventType);
  React.useEffect(() => {
    getCountOfPeople(productType, eventType);
    const index = Number(eventType === 'at-home' && productType !== 'chefTable');
    const value =
      Number(
        countOfPeoples.find((i) => Number(i.name) === Number(chefTableData?.additionalInfo?.countOfPeople))?.id || NaN,
      ) || +defaultValues.countOfPeople[index];
    setCountOfPeopleForType(value);
    setValue('countOfPeople', value, { shouldValidate: true });
  }, [eventType]);

  React.useEffect(() => {
    register('status');
    register('countOfPeople');
    register('duration');
    register('language');
    register('price');
    register('program');
    register('required');
    setValue('required', chefTableData?.required || [], { shouldValidate: true });
    register('requestAllergies');
    register('timeTable');
    register('type');
    register('address');
    register('dates');
    register('vimeoUrl');
  }, [chefTableData?.required, register, setValue]);

  React.useEffect(() => {
    if (eventType !== 'recorded') {
      (async (): Promise<void> => {
        if (!chefTableDates?.length) {
          form.setValue('dates', chefTableDates, { shouldValidate: true, shouldDirty: true });
          form.setError('dates', { message: 'Dates is required', shouldFocus: true });
        } else {
          form.clearErrors('dates');
          form.setValue('dates', chefTableDates, { shouldValidate: true, shouldDirty: true });
        }
        const { errors: dateErrors } = await yupResolver(DatesSchema)(chefTableDates);
        Object.values(dateErrors).forEach((obj, i) => {
          if (obj.date) {
            form.setError(`dates[${i}]`, { message: obj.date.message, shouldFocus: true });
          }
        });
      })();
    }
  }, [chefTableDates, form.errors]);

  const onSubmit = async (formFields: ChefTableUpsertFieldsProps): Promise<void> => {
    const status = StatusArr.find((obj) => obj.slug === formFields.status);

    const data = productParametersNormalizer({
      ...formFields,
      isFree: formFields.isFree,
      price: formFields.price ? formFields.price : 0,
      chefPrice: formFields.chefPrice ? String(formFields.chefPrice) : '0',
      status: status?.slug,
      address: eventType === 'at-restaurant' ? formFields.address : undefined,
      ...(productType === 'chefTable' && {
        menuOptions:
          acceptLanguage === 'ar'
            ? formFields.menuOptions?.map((item) => ({ ...item, name: item.name__ar }))
            : formFields.menuOptions,
      }),
      media: images,
      additionalInfo: {
        countOfPeople: Number(formFields.countOfPeople) || 4,
        days: formFields.days,
        duration: calcMaxDurationFromDates(formFields.dates),
        program: formFields.program,
        type: formFields.type,
        language: formFields.language,
        timeTable: formFields.timeTable,
        requestAllergies: formFields.requestAllergies,
        importantInformation:
          formFields.importantInformation?.filter((item) => Boolean(item.value))?.map((item) => item.value) ?? [],
      },
      dates: chefTableDates.map((obj) => {
        const find = chefTableData?.dates.find((o) => o.date === obj.date && o.from === obj.from);
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
      if (chefTableData) {
        await AdminProductsApi.update(
          productType === 'masterClass' ? AdminEndpoints.MASTER_CLASS : AdminEndpoints.CHEFS_TABLE,
          chefTableData.id,
          data,
        );
      } else {
        await AdminProductsApi.create(
          productType === 'masterClass' ? AdminEndpoints.MASTER_CLASS : AdminEndpoints.CHEFS_TABLE,
          data,
        );
        await router.push(`/admin/${role}/${productType === 'masterClass' ? 'master-classes' : 'chef-table'}`);
      }
      openAlert('Successfully saved', 'success');
    } catch (err) {
      openAlert('Error sending request', 'error');
      console.warn('onSubmit menu', err);
    }
  };

  const handleImagesChange = (arr: UploadedImage[]): void => {
    const value = arr.filter((obj) => obj.name);
    setImages([...value]);
    form.setValue('media', [...value]);
  };

  const handleAutocompleteChange = (fieldName: string, arr: Item[]): void => {
    setValue(fieldName, arr, { shouldValidate: true });
  };

  const handleChangeLanguage = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const languagesKeyBy = keyBy(languages, 'value');
    setValue('language', languagesKeyBy[event.target.value as string].value, { shouldValidate: true });
  };

  const handleChangeCountOfPeople = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const countOfPeopleKeyBy = keyBy(countOfPeoples, 'id');
    setValue('countOfPeople', countOfPeopleKeyBy[event.target.value as string].id, { shouldValidate: true });
  };

  const currentChef = form.watch('chef');

  return (
    <FormProvider {...form}>
      <AdminChefTableContext.Provider
        value={{
          area: chefTableData?.addresses[0]?.area,
          images: chefTableData?.addresses?.[0]?.images.map((url) => ({ id: '', url, name: url })),
          dates: chefTableDates,
          setChefTableDates,
        }}
      >
        <AdminChefTableUpsertView
          countOfPeople={countOfPeopleForType}
          countOfPeoples={countOfPeoples}
          handleSubmit={handleSubmit(onSubmit)}
          isEditing={!!chefTableData}
          images={images}
          language={chefTableData?.additionalInfo?.language ?? defaultValues.language}
          languages={languages}
          onChangeImages={handleImagesChange}
          onChangeAutocomplete={handleAutocompleteChange}
          onChangeLanguage={handleChangeLanguage}
          onChangeCountOfPeople={handleChangeCountOfPeople}
          requestAllergies={chefTableData?.additionalInfo?.requestAllergies ?? ''}
          title={title}
          timeTable={chefTableData?.additionalInfo?.timeTable ?? ''}
          eventType={eventType}
          chef={currentChef}
          status={chefTableData?.status}
          chefs={chefs}
          productType={productType}
          address={chefTableData?.address}
          role={role}
          editPage={editPage}
          isFree={isFree}
          instruction={chefTableData?.instruction}
        />
      </AdminChefTableContext.Provider>
    </FormProvider>
  );
};
