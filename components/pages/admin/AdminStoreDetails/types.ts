import { UseFormMethods } from 'react-hook-form';
import { Product } from 'redux/ducks/products/types/contracts';

export interface AdminStoreDetailsViewProps {
  handleSubmit: ReturnType<UseFormMethods<any>['handleSubmit']>;
  data: Product;
}
