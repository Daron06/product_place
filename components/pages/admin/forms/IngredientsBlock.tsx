import _get from 'lodash/get';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { AutocompleteTagsField } from '../AutocompleteTagsField';

interface IngredientsBlockProps {
  name?: string;
  disabled?: boolean;
  marginZero?: boolean;
  productName?: 'recipe' | 'menu';
  items:
    | ImmutableDirectoriesState['data']['suppliers']
    | ImmutableDirectoriesState['data']['cloudKitchens']
    | null
    | undefined;
}

export const IngredientsBlock: React.FC<IngredientsBlockProps> = ({
  name = 'ingredients',
  marginZero = false,
  disabled = false,
  items,
}) => {
  const { register, control, errors, formState, setValue, getValues } = useFormContext();

  const { supplier } = getValues();
  const isMounted = React.useRef<boolean>();

  const ingredients = items?.find((o) => supplier?.id === o.id)?.ingredients || [];

  const onChange = (values: unknown[]): void => {
    setValue(name, values, { shouldValidate: true });
  };

  React.useEffect(() => {
    register(name);
  }, []);

  React.useEffect(() => {
    if (isMounted.current && !supplier) {
      onChange([]);
    }
    isMounted.current = true;
  }, [supplier]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ value }): React.ReactElement => (
        <div className="pb-20">
          <WhiteBlock
            title="Ingredients"
            description="List the ingredients included in this recipe"
            marginZero={marginZero}
            disabled={disabled}
          >
            <AutocompleteTagsField
              error={formState?.isSubmitted ? _get(errors, `${name}.message`) : undefined}
              options={ingredients}
              onChangeTags={onChange}
              placeholder="Ingredients"
              testId="ingredients-field"
              value={value}
            />
          </WhiteBlock>
        </div>
      )}
    />
  );
};
