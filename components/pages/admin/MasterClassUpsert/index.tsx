import { yupResolver } from '@hookform/resolvers/yup';
import { MasterClassUpsertFieldsProps } from 'components/pages/admin/MasterClassUpsert/types';
import { countOfPeoplesTemp, languages } from 'components/pages/admin/staff/chef-table/constants';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import keyBy from 'lodash/keyBy';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { Item } from 'services/types';
import { productParametersNormalizer } from 'utils/normalizers/ProductParametersNormalizer';
import { CreateChefTableFormSchema } from 'utils/validationSchemas/admin/createChefTableSchema';

import { AdminMasterClassView } from './View';

interface AdminMasterClassUpsertProps {
  masterClass?: Product;
  title: string;
}

export const AdminMasterClassUpsert: React.FC<AdminMasterClassUpsertProps> = ({
  masterClass,
  title,
}): React.ReactElement => {
  const router = useRouter();
  const { control, formState, errors, handleSubmit, register, setValue } = useForm<MasterClassUpsertFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateChefTableFormSchema),
    defaultValues: {
      countOfPeople: masterClass?.additionalInfo?.countOfPeople,
      description: masterClass?.description,
      duration: masterClass?.additionalInfo?.duration,
      dates: masterClass?.dates,
      language: masterClass?.additionalInfo?.language,
      name: masterClass?.name,
      program: masterClass?.additionalInfo?.program,
      price: masterClass?.price,
      media: masterClass?.media,
      required: masterClass?.required || [],
      type: masterClass?.additionalInfo?.type || 'external',
    },
  });

  React.useEffect(() => {
    register('countOfPeople');
    register('language');
    register('media');
    register('price');
    register('program');
    setValue('required', masterClass?.required || [], { shouldValidate: true });
    register('type');
  }, [register]);

  const onSubmit = async (formFields: MasterClassUpsertFieldsProps): Promise<void> => {
    const data = productParametersNormalizer({
      ...formFields,
      additionalInfo: {
        countOfPeople: Number(formFields.countOfPeople),
        duration: formFields.duration,
        program: formFields.program,
        language: formFields.language,
        timeTable: formFields.timeTable,
        requestAllergies: formFields.requestAllergies,
        importantInformation: formFields.importantInformation?.map((item) => item.value) ?? [],
      },
    });
    try {
      if (masterClass) {
        await AdminProductsApi.update(AdminEndpoints.CHEFS_TABLE, masterClass.id, data);
      } else {
        await AdminProductsApi.create(AdminEndpoints.CHEFS_TABLE, data);
        await router.push(`/admin/chefs-table`);
      }
    } catch (err) {
      console.warn('onSubmit menu', err);
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
    const laguagesKeyBy = keyBy(languages, 'value');
    setValue('language', laguagesKeyBy[event.target.value as string].value);
  };

  const handleChangeCountOfPeople = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const countOfPeopleKeyBy = keyBy(countOfPeoplesTemp.masterClass.online, 'value');
    setValue('countOfPeople', countOfPeopleKeyBy[event.target.value as string].id);
  };

  const handleDurationChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    setValue('duration', Number(event.target.value), { shouldValidate: true });
  };

  return (
    <AdminMasterClassView
      control={control}
      countOfPeople={masterClass?.additionalInfo?.countOfPeople ?? 6}
      countOfPeoples={countOfPeoplesTemp.masterClass.online}
      duration={masterClass?.additionalInfo?.duration ?? 30}
      errors={errors}
      formState={formState}
      handleSubmit={handleSubmit(onSubmit)}
      isEditing={!!masterClass}
      images={masterClass?.media}
      language={masterClass?.additionalInfo?.language ?? languages[0].name}
      languages={languages}
      onChangeImages={handleImagesChange}
      onChangeAutocomplete={handleAutocompleteChange}
      onChangeLanguage={handleChangeLanguage}
      onChangeCountOfPeople={handleChangeCountOfPeople}
      onDurationChange={handleDurationChange}
      price={masterClass?.price ?? 0}
      register={register}
      required={masterClass?.required}
      setValue={setValue}
      title={title}
    />
  );
};
