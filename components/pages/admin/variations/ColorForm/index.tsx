import Typography from '@material-ui/core/Typography/Typography';
import pick from 'lodash/pick';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useList } from '../../../../../hooks/useList';
import { DashboardRole, OptionVariants } from '../../../../../services/types';
import { ColorsList } from './ColorsList';
import { VariationColorForm } from './VariationColorForm';

export const ColorForm: React.FC<{ role: DashboardRole.STAFF | DashboardRole.SUPPLIER; morePrice: boolean }> = ({
  role,
  morePrice,
}) => {
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [colorData, setColorData] = React.useState<OptionVariants | null>(null);
  const isMountedRef = React.useRef(false);
  const { errors: contextErrors, getValues, setValue: setMainFormValue, formState: mainFormState } = useFormContext();
  const { options } = getValues();
  const { 0: fields, 1: add, 2: remove, 3: update, 4: set } = useList<OptionVariants>([]);

  const handleAddColor = (values: OptionVariants): void => {
    add(values);
    setEditingIndex(null);
  };

  React.useEffect(() => {
    setMainFormValue('options', fields, { shouldValidate: true });
  }, [fields]);

  React.useEffect(() => {
    if (options && !isMountedRef.current) {
      set(options);
      isMountedRef.current = true;
    }
  }, [options]);

  const handleUpdateColor = (colors: OptionVariants): void => {
    if (editingIndex === null) {
      throw new Error('The editingIndex is not a number');
    }
    const current = fields[editingIndex];
    update({
      newValue: {
        ...current,
        ...pick(colors, ['name', 'color', 'price']),
      },
      index: editingIndex,
      id: current.id,
    });
    setEditingIndex(null);
  };

  React.useEffect(() => {
    if (editingIndex !== null) {
      setColorData(fields[editingIndex]);
    } else {
      setColorData(null);
    }
  }, [editingIndex]);

  return (
    <>
      {fields.length > 0 && (
        <ColorsList
          onColorEdit={(colorId): void => setEditingIndex(colorId)}
          editIndex={editingIndex}
          items={fields}
          onRemove={(index): void => remove({ index })}
          role={role}
          morePrice={morePrice}
        />
      )}
      <VariationColorForm
        colorData={colorData}
        onCancel={(): void => setEditingIndex(null)}
        onSave={editingIndex !== null ? handleUpdateColor : handleAddColor}
        role={role}
      />
      {mainFormState.isSubmitted && contextErrors.options?.message && (
        <Typography color="error">{contextErrors.options?.message}</Typography>
      )}
    </>
  );
};
