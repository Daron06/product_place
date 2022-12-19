import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import { Button } from 'components/Button';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import { LanguageContext } from 'layouts/AdminLayout';
import { pick } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { OptionVariants } from 'services/types';
import * as yup from 'yup';

import { useList } from '../../../../../hooks/useList';
import styles from './SizeForm.module.scss';

export const SizeFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const SizeForm: React.FC = () => {
  const isMountedRef = React.useRef(false);
  const { getValues, errors: contextErrors, setValue: setMainFormValue, formState: mainFormState } = useFormContext();
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [nameKey, setNameKey] = React.useState<string>('name');
  const { options } = getValues();
  const { 0: fields, 1: add, 2: remove, 3: update, 4: set } = useList<OptionVariants>([]);
  const { register, errors, formState, reset, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SizeFormSchema),
    defaultValues: {
      name: '',
      price: '',
    },
  });

  React.useEffect(() => {
    if (options && !isMountedRef.current) {
      set(options);
      isMountedRef.current = true;
    }
  }, [options]);

  React.useEffect(() => {
    setMainFormValue('options', fields, { shouldValidate: true });
  }, [fields]);

  const handleUpdateSize = (sizes: OptionVariants): void => {
    if (editingIndex === null) {
      throw new Error('The editingIndex is not a number');
    }
    const current = fields[editingIndex];
    update({
      newValue: {
        ...current,
        ...pick(sizes, ['name', 'price']),
      },
      index: editingIndex,
      id: current.id,
    });
    setEditingIndex(null);
  };

  const onSubmit = (values: OptionVariants): void => {
    if (editingIndex !== null) {
      handleUpdateSize(values);
    } else {
      add(values);
    }
    reset();
  };

  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    const key = acceptLanguage === 'en' ? 'name' : `name__${acceptLanguage}`;
    setNameKey(key);
    if (editingIndex !== null) {
      const nameValue = fields[editingIndex][key];
      setValue('name', nameValue, { shouldValidate: true });
    } else {
      setValue('name', '', { shouldValidate: false });
    }
  }, [editingIndex, acceptLanguage]);

  return (
    <>
      {fields.length > 0 && (
        <List component="nav" className="mb-20">
          {fields.map(
            (item, index) =>
              item && (
                <div key={item.id + item.name}>
                  <ListItem>
                    <div className="d-flex align-items-center flex-auto">
                      <ListItemText primary={item[nameKey] ? item[nameKey] : item.name} />
                      <input name={`options[${index}].price`} hidden />
                    </div>
                    {editingIndex === null && (
                      <IconButton className={styles.closeIcon} onClick={(): void => setEditingIndex(index)}>
                        <Icon type="launch" />
                      </IconButton>
                    )}
                    {remove && (
                      <IconButton onClick={(): void => remove({ index })}>
                        <Icon type="close" />
                      </IconButton>
                    )}
                  </ListItem>
                  <Divider />
                </div>
              ),
          )}
        </List>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex">
          <div className={styles.inputWrapper}>
            <FormField
              label="Name"
              placeholder="Enter name"
              error={errors.name?.message}
              register={register}
              name="name"
            />

            <div className="d-flex">
              {editingIndex !== null && (
                <div className="mr-10">
                  <Button variant="outlined" onClick={(): void => setEditingIndex(null)}>
                    Cancel
                  </Button>
                </div>
              )}
              <Button
                disabled={!isEmpty(errors) || !formState.isValid}
                type="submit"
                color="primary"
                variant="contained"
              >
                {editingIndex !== null ? 'Save' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {mainFormState.isSubmitted && contextErrors.options?.message && (
        <Typography color="error">{contextErrors.options?.message}</Typography>
      )}
    </>
  );
};
