import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectDirectoriesData } from 'redux/ducks/directories/selectors';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { CategoryItem, DashboardRole, Option, Supplier } from 'services/types';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';

import { useAlert } from '../../../../hooks/useAlert';
import { Product } from '../../../../redux/ducks/products/types/contracts';
import { WarehouseApi } from '../../../../services/api/admin/WarehouseApi';
import {
  createSupplierWarehouseNormalizer,
  SupplierWarehouseCreateFields,
} from '../../../../utils/normalizers/CreateSupplierWarehouseNormalizer';
import { normalizeChefStoreOptions } from '../../../../utils/normalizers/normalizeChefStoreOptions';
import {
  CreateStaffWarehouseSchema,
  CreateWarehouseSchema,
} from '../../../../utils/validationSchemas/admin/createWarehouseSchema';
import { UploadedImage } from '../UploadImages/types';
import { SupplierWarehouseCreateView } from './View';

interface SupplierWarehouseCreateContextProps {
  onSubmit: (values: SupplierWarehouseCreateFields) => void;
  categories: CategoryItem[];
  selectedOptions: Option[];
  allVariations: Option[];
  media: UploadedImage[];
  supplier?: Supplier;
  status: string;
}
export const SupplierWarehouseCreateContext = React.createContext<SupplierWarehouseCreateContextProps>(
  {} as SupplierWarehouseCreateContextProps,
);

interface SupplierWarehouseCreateProps {
  role: DashboardRole.STAFF | DashboardRole.SUPPLIER;
  data?: Product;
  categories: CategoryItem[];
  isEditingPage?: boolean;
}

export const SupplierWarehouseCreate: React.FC<SupplierWarehouseCreateProps> = ({
  data,
  categories,
  isEditingPage,
  role,
}) => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const defaultValues = {
    name: data?.name,
    description: data?.description,
    media: data?.media,
    category: data?.category?.slug,
    supplierPrice: data?.supplierPrice,
    inventory: data?.inventory,
    msrpPrice: data?.msrpPrice,
    chefPrice: data?.chefPrice,
    price: data?.price,
    status: data?.status,
    options: data?.options,
    supplier: data?.supplier,
    shortDescription: data?.shortDescription,
    additionalInfo: {
      preparationTime: data?.additionalInfo?.preparationTime,
    },
    productFlags: data?.additionalInfo?.productFlags,
  };

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(role === DashboardRole.STAFF ? CreateStaffWarehouseSchema : CreateWarehouseSchema),
    defaultValues,
  });

  const [allVariations, setVariations] = React.useState<Option[]>([]);
  const { suppliers } = useSelector(selectDirectoriesData);
  const { supplier } = form.watch();

  React.useEffect(() => {
    form.register('category');
    form.register('description');
    form.register('chefPrice');
    form.register('msrpPrice');
    form.register('supplierPrice');
    form.register('options');
    form.register('media');
    form.register('status');
    form.register('shortDescription');
  }, []);

  React.useEffect(() => {
    if (role === 'staff') {
      if (supplier) {
        // TODO Solve something with the number of items received
        WarehouseApi.getOptionsBySupplier(supplier?.id, { query: '', take: 0, page: 1 }).then(({ items }) => {
          setVariations(items);
        });
      }
    } else {
      WarehouseApi.getVariations({ query: '', take: 0, page: 1 }).then(({ items }) => {
        setVariations(items);
      });
    }
  }, [supplier]);

  const onSubmit = async (values: SupplierWarehouseCreateFields): Promise<void> => {
    try {
      const formData = createSupplierWarehouseNormalizer(values, categories, role);

      if (formData) {
        let api;
        if (role === DashboardRole.STAFF || role === DashboardRole.SUPPLIER) {
          api = data
            ? AdminProductsApi.update.bind(this, AdminEndpoints.SUPPLIER_WAREHOUSE, data.id)
            : AdminProductsApi.create.bind(this, AdminEndpoints.SUPPLIER_WAREHOUSE);
        }
        const responseData: Product | undefined = await api(formData);
        openAlert('Successfully saved', 'success');
        if (!data && responseData) {
          await router.push(`/admin/${role}/warehouse/edit/${responseData.id}`);
        }
      } else {
        openAlert(`Please select categories`, 'error');
      }
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });
        openAlert(
          `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
            .map((el) => el.message)
            .join(', ')}`,
          'error',
        );
      } else {
        openAlert(`An error occurred while saving: ${error?.message}`, 'error');
        console.error(error);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <SupplierWarehouseCreateContext.Provider
        value={{
          onSubmit,
          categories,
          selectedOptions: normalizeChefStoreOptions(defaultValues.options ?? [], true),
          allVariations,
          media: data?.media || [],
          status: data?.status ?? '',
          supplier: data?.supplier || supplier,
        }}
      >
        <SupplierWarehouseCreateView
          role={role}
          suppliers={suppliers}
          supplier={supplier}
          isEditingPage={isEditingPage}
          productFlags={data?.additionalInfo?.productFlags}
          itemData={data}
        />
      </SupplierWarehouseCreateContext.Provider>
    </FormProvider>
  );
};
