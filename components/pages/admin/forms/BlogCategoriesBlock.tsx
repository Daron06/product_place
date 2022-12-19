import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BlogCategoriesApi } from 'services/api/admin/BlogCategoriesApi';
import { BlogCategory } from 'services/types';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { AutocompleteTagsField } from '../AutocompleteTagsField';

interface IngredientsBlockProps {
  fieldName?: string;
  disabled?: boolean;
  marginZero?: boolean;
  itemCategory?: BlogCategory;
}

export const BlogCategoriesBlock: React.FC<IngredientsBlockProps> = ({
  fieldName = 'category',
  marginZero = false,
  disabled = false,
  itemCategory,
}) => {
  const [items, setItems] = React.useState<BlogCategory[]>([]);
  const { register, errors, setValue } = useFormContext();

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const data = await BlogCategoriesApi.getAll({});
        setItems(data.items);
      } catch (error) {
        console.error('StatisticDashboard error', error);
      }
    })();
  }, []);

  React.useEffect(() => {
    register(fieldName);
  }, []);

  const onChange = (value: unknown[]): void => {
    setValue(fieldName, value, { shouldValidate: !!value });
  };

  return (
    <div className="pb-20">
      <WhiteBlock title="Category" description="" marginZero={marginZero} disabled={disabled}>
        {items && (
          <>
            <AutocompleteTagsField
              error={undefined}
              options={items}
              onChangeTags={onChange}
              placeholder="Select category"
              isMultiple={false}
              defaultValue={itemCategory}
            />
            {errors[fieldName] && (
              <p className="error-label">{errors[fieldName]?.name?.message || errors[fieldName]?.message}</p>
            )}
          </>
        )}
      </WhiteBlock>
    </div>
  );
};
