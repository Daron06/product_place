import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner, StatusEnum } from 'services/types';

import { BannersApi } from '../../../../services/api/admin/BannersApi';
import { FormBannersSchema } from '../../../../utils/validationSchemas/admin/formBannersSchema';
import { ApproveBanner } from '../ApproveBanner';
import { UploadedImage } from '../UploadImages/types';

export interface BannerStaffCreateProps {
  banner?: Banner;
}

export const BannersStaffForm: React.FC<BannerStaffCreateProps> = ({ banner }): React.ReactElement => {
  const { asPath, push } = useRouter();
  const pathRouter = asPath.split(asPath.includes('create') ? '/create' : '/edit')[0];
  const { openAlert } = useAlert();
  const form = useForm<Banner>({
    mode: 'onChange',
    resolver: yupResolver(FormBannersSchema),
    defaultValues: {
      title: banner?.title,
      position: banner?.position,
      status: banner?.status ?? StatusEnum.ACTIVE,
      image: banner?.image ?? '',
      type: 'masterClass',
      subTitle: banner?.subTitle || '',
      expirationDate: banner?.expirationDate,
      buttonText: banner?.buttonText,
      link: banner?.link,
      extraLabel: banner?.extraLabel,
    },
  });

  React.useEffect(() => {
    form.register('image');
    form.register('type');
    form.register('expirationDate');
    form.register('position');
    form.register('subTitle');
  }, []);

  const addBanner = async (data: Banner): Promise<void> => {
    try {
      await BannersApi.add(data);
      openAlert('The item has been successfully saved', 'success');
    } catch (error) {
      openAlert('Error sending request', 'error');
      console.warn('addBanner:', error);
    }
  };

  const updateBanner = async (id: string, params: Banner): Promise<void> => {
    try {
      await BannersApi.update({ id, params });
      openAlert('The item has been successfully saved', 'success');
    } catch (error) {
      openAlert('Error sending request', 'error');
      console.warn('updateRequest:', error);
    }
  };

  const handleImagesChange = (images: UploadedImage[]): void => {
    const img = images.find((obj) => obj.name);
    if (img) {
      form.setValue('image', img.url, { shouldValidate: true });
    }
  };

  const handleDeleteImage = (): void => {
    form.setValue('image', undefined, { shouldValidate: true });
  };

  const categoryImage = banner?.image
    ? [
        {
          url: banner.image,
          name: '',
          id: '',
          createdAt: '',
        },
      ]
    : undefined;

  const onSubmit = async (fields: Banner): Promise<void> => {
    if (banner) {
      await updateBanner(String(banner.id), fields);
    } else {
      await addBanner(fields);
    }
    await push(pathRouter);
  };

  return (
    <FormProvider {...form}>
      <ApproveBanner
        title="New banner"
        data={banner}
        onSubmit={onSubmit}
        image={categoryImage}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
      />
    </FormProvider>
  );
};
