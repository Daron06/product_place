import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { FormField } from 'components/FormField';
import { SelectColor } from 'components/SelectColor';
import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DashboardRole, OptionVariants } from 'services/types';
import * as yup from 'yup';

import styles from './ColorForm.module.scss';

interface EditColorFormProps {
  colorData: OptionVariants | null;
  onCancel: () => void;
  onSave: (fields: OptionVariants) => void;
  role?: DashboardRole;
}

export const VariationColorForm: React.FC<EditColorFormProps> = ({ colorData, onCancel, onSave }) => {
  const { errors, register, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().trim().required('Name is requared'),
        color: yup.string().trim().required('Color is requared'),
      }),
    ),
    defaultValues: {
      name: '',
      color: '',
      price: '',
    },
  });

  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    if (colorData) {
      const nameKey = acceptLanguage === 'en' ? 'name' : `name__${acceptLanguage}`;
      const nameValue = colorData[nameKey];
      setValue('name', nameValue, { shouldValidate: true });
      setValue('color', colorData.color, { shouldValidate: true });
    } else {
      setValue('name', '', { shouldValidate: false });
      setValue('color', '', { shouldValidate: false });
    }
  }, [colorData, acceptLanguage]);

  const color = watch('color');

  const onSelectColor = (value: string): void => {
    if (!value.includes('NaN')) {
      setValue('color', value, { shouldValidate: true });
    }
  };

  return (
    <>
      <div className={styles.optionEditingForm}>
        <div className="d-flex pl-5">
          <SelectColor name="color" register={register} onChange={onSelectColor} value={color} />

          <div className="d-flex flex-column">
            <FormField
              label="Name"
              placeholder="Enter name"
              className={styles.selectColorFormInput}
              error={errors.name?.message}
              register={register}
              name="name"
            />
            <div className={styles.selectColorFormInput}>
              <FormField
                label="HEX code"
                placeholder="#fff"
                className={styles.selectColorFormInput}
                error={errors.color?.message}
                register={register}
                name="color"
              />
            </div>
            <div className="d-flex"></div>
          </div>
        </div>
        <div className={styles.optionEditingFormActions}>
          <>
            {colorData && (
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button color="primary" variant="contained" className="ml-20" onClick={handleSubmit(onSave)}>
              {colorData ? 'Save' : 'Add'}
            </Button>
          </>
        </div>
      </div>
    </>
  );
};
