import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@material-ui/core';
import { FormField } from 'components/FormField';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { useAlert } from 'hooks/useAlert';
import { LanguageContext } from 'layouts/AdminLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AdminBlogApi } from 'services/api/admin/BlogApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { BlogItem, LangSelectType } from 'services/types';
import { CreateBlogFormSchema } from 'utils/validationSchemas/admin/createBlogSchema';

import { AdminEditingHeader } from '../AdminEditingHeader';
import { BlogCategoriesBlock } from '../forms/BlogCategoriesBlock';
import { ProductStatusChangeBlock } from '../ProductStatusChangeBlock';
import { UploadImages } from '../UploadImages';
import { UploadedImage } from '../UploadImages/types';
import { BlogCreateProps } from './types';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });

export const BlogCreate: React.FC<BlogCreateProps> = ({ title, blogData }): React.ReactElement => {
  const { openAlert } = useAlert();
  const router = useRouter();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateBlogFormSchema),
    defaultValues: {
      description: blogData?.description,
      shortDescription: blogData?.shortDescription,
      image: blogData?.image,
      title: blogData?.title,
      status: blogData?.status,
      category: blogData?.category,
    },
  });

  const { errors, control, register, setValue } = form;

  React.useEffect(() => {
    form.register('image');
    form.register('category');
  }, []);

  const onSubmit = async (formFields: BlogItem): Promise<void> => {
    const data = formFields;

    if (!blogData && !data) {
      throw new Error('The blog data is undefined');
    }

    try {
      if (blogData) {
        await AdminBlogApi.update(AdminEndpoints.BLOG, blogData.id, data);
        openAlert('Successfully updated item', 'success');
        await router.push(`/admin/staff/blog`);
      } else {
        await AdminBlogApi.create(AdminEndpoints.BLOG, data);
        openAlert('Successfully added item', 'success');
        await router.push(`/admin/staff/blog`);
      }
    } catch (error) {
      openAlert('An error has occurred', 'error');
      console.warn('onSubmit menu', error);
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

  const blogImage = blogData?.image
    ? [
        {
          url: blogData.image,
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
      const value = allFieldsObj[key] ? allFieldsObj[key] : '';
      setValue(fieldName, value);
    });
  };
  React.useEffect(() => {
    if (blogData) {
      translatedFieldsSets(['title', 'description', 'shortDescription'], blogData, acceptLanguage);
    }
  }, [acceptLanguage]);

  return (
    <FormProvider {...form}>
      <div className="p-30">
        <AdminEditingHeader
          isLanguageSelect={blogData ? true : false}
          isEditing
          title={title}
          onSubmit={form.handleSubmit(onSubmit)}
        />
        <div className="adminDataUpsertPageGrid">
          <section className="adminDataUpsertSectionGrid">
            <WhiteBlock title="" className="p-20 mb-30">
              <FormField
                label="Title"
                name="title"
                placeholder="Enter post title"
                register={register}
                error={errors.title?.message}
              />
              <div>
                <Typography variant="h6">Description</Typography>
                <Editor
                  name="description"
                  onChange={(data): void => setValue('description', data, { shouldValidate: true })}
                />
                {errors?.description?.message && <p className="error-label">{errors?.description?.message}</p>}
              </div>

              <div className="mt-20">
                <FormField
                  label="Short description"
                  name="shortDescription"
                  placeholder="Enter dish name"
                  register={register}
                  error={errors.shortDescription?.message}
                  textarea
                />
              </div>

              <div>
                <Typography className="fz-large-14 fw-bold mb-10">Image</Typography>
                <UploadImages
                  control={control}
                  controllable={false}
                  error={errors.image?.message || undefined}
                  images={blogImage}
                  maxImageCount={1}
                  onChangeImages={handleImagesChange}
                  onDeleteImage={handleDeleteImage}
                />
              </div>
            </WhiteBlock>
          </section>
          <aside className="adminDataUpsertAsideGrid">
            <>
              <ProductStatusChangeBlock value={blogData?.status} marginZero />
              <BlogCategoriesBlock itemCategory={blogData?.category} />
            </>
          </aside>
        </div>
      </div>
    </FormProvider>
  );
};
