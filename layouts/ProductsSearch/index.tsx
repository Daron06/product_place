import { Search } from 'components/Search';
import React from 'react';

export interface ProductsSearchProps {
  onSubmitSearch?: (value: string) => void;
  onSearchQueryChange?: (value: string) => void;
  value?: string;
  placeholder: string;
}

export const ProductsSearch: React.FC<ProductsSearchProps> = ({
  onSearchQueryChange,
  onSubmitSearch,
  value,
  placeholder,
}) => {
  return (
    <div className="mb-30">
      <Search placeholder={placeholder} onChange={onSearchQueryChange} onSubmit={onSubmitSearch} value={value} />
    </div>
  );
};
