import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const ImportantInformation: React.FC<{ name: string }> = ({ name }): React.ReactElement => {
  const { control, register } = useFormContext();
  const { append, fields, remove } = useFieldArray<{ value: string }>({
    control,
    name,
  });

  return (
    <div>
      {fields?.map(
        (item, index): React.ReactElement => (
          <div className="d-flex align-items-start" key={item.id}>
            <FormField
              className="flex-auto"
              defaultValue={item.value}
              register={register}
              formFieldsRef
              name={`${name}[${index}].value`}
              textarea
            />
            <IconButton className="ml-20" onClick={(): void => remove(index)}>
              <Icon type="close" />
            </IconButton>
          </div>
        ),
      )}
      <div onClick={(): void => append({ value: '' })}>
        <Typography color="secondary" className="link">
          + Add more
        </Typography>
      </div>
    </div>
  );
};
