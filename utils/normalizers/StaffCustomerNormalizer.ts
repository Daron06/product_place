import { StaffCustomerFormFields } from '../../components/pages/admin/staff/costumers/details';
import { StatusEnum } from '../../services/types';

export const staffCustomerNormalizer = (
  formFields: StaffCustomerFormFields,
): Omit<StaffCustomerFormFields, 'birthday' | 'isActive'> & {
  birthday: string | null;
  isActive: boolean;
} => {
  return {
    firstName: formFields.firstName || '',
    lastName: formFields.lastName || '',
    image: formFields.image || '',
    email: formFields.email || '',
    phone: formFields.phone || '',
    birthday: formFields.birthday || null,
    gender: formFields.gender || null,
    password: formFields.password || undefined,
    isActive: formFields.isActive === 'true',
    status: formFields.status || StatusEnum.PENDING,
  };
};
