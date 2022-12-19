import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { EditColorForm, EditColorFormFields } from 'components/pages/admin/SupplierWarehouseCreate/forms/EditColorForm';
import pick from 'lodash/pick';
import Link from 'next/link';
import React from 'react';

import { useList } from '../../../../../hooks/useList';
import { DashboardRole, Option, OptionVariants } from '../../../../../services/types';
import { getOptionsById } from '../../../../../utils/getOptionsById';
import { Icon } from '../../../../Icon';
import { WhiteBlock } from '../../../../WhiteBlock/WhiteBlock';
import { ColorsList } from '../../variations/ColorForm/ColorsList';
import { SupplierWarehouseCreateContext } from '../index';
import styles from '../SupplierWarehouseCreate.module.scss';

export interface ColorFormProps {
  id: number | string;
  title: string;
  onRemove: () => void;
  role: DashboardRole.STAFF | DashboardRole.SUPPLIER;
  value: OptionVariants[];
  onChange: (arr: ColorFormFields[]) => void;
  type: Option['type'];
}

export interface ColorFormFields {
  id?: string | number;
  option_id?: number;
  price: string | number;
  msrpPrice?: number | string;
  supplierPrice?: number | string;
  chefPrice?: number | string;
  name: string;
  inventory: string;
  sku: string;
  color?: string;
}

export const ColorForm: React.FC<ColorFormProps> = ({ id, title, onRemove, type, role, value, onChange }) => {
  const [colors, addColor, removeColor, update] = useList<ColorFormFields>(value || []);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingIndex, setIsEditingIndex] = React.useState<number | null>(null);
  const { allVariations } = React.useContext(SupplierWarehouseCreateContext);
  const options = getOptionsById(allVariations, Number(id));

  const onSubmit = (obj: ColorFormFields): void => {
    addColor(obj);
    setIsAdding(false);
  };

  React.useEffect(() => {
    onChange(colors);
  }, [colors]);

  const selectedColors = colors.map((color) => {
    const obj = options.find(
      (option) => Number(color.option_id) === Number(option.id) || Number(color.id) === Number(option.id),
    );
    return {
      id: Number(color.id),
      name: obj?.name || '',
      supplierPrice: color?.supplierPrice ?? 0,
      color: obj?.color || '',
      slug: '',
      inventory: color?.inventory,
      sku: color?.sku,
      ...(role === 'staff'
        ? {
            price: Number(color.price),
            msrpPrice: color?.msrpPrice ?? 0,
            chefPrice: color?.chefPrice ?? 0,
          }
        : {}),
    };
  });

  const handleEditColorItem = (fields: EditColorFormFields): void => {
    if (editingIndex === null) {
      throw new Error('The editingIndex is not a number');
    }

    const current = colors[editingIndex];
    update({
      newValue: {
        ...current,
        ...pick(fields, ['price', 'chefPrice', 'msrpPrice', 'supplierPrice', 'inventory', 'sku']),
      },
      index: editingIndex,
      id,
    });
    setIsEditingIndex(null);
  };

  const notSelectedColors = options.filter((o) => !selectedColors.find((color) => o.id === color.id));
  const handleColorRemove = (index: number): void => {
    const colorId = selectedColors[index].id;
    setIsEditingIndex(null);
    removeColor({ id: colorId });
  };

  return (
    <WhiteBlock title={title} className={clsx('position-r', styles.block)}>
      <div className={clsx('d-flex', styles.blockActions)}>
        <Link href={`/admin/${role}/warehouse/variations/${id}`}>
          <IconButton color="secondary" onClick={(): void => {}}>
            <Icon type="launch" />
          </IconButton>
        </Link>
        <IconButton onClick={onRemove}>
          <Icon type="close" />
        </IconButton>
      </div>
      <ColorsList
        role={role}
        items={selectedColors}
        onRemove={handleColorRemove}
        onColorEdit={(colorId): void => setIsEditingIndex(colorId)}
        editIndex={editingIndex}
        type={type}
      />
      {editingIndex !== null && (
        <EditColorForm
          supplierPrice={colors[editingIndex].supplierPrice}
          msrpPrice={colors[editingIndex].msrpPrice}
          chefPrice={colors[editingIndex].chefPrice}
          price={colors[editingIndex].price}
          sku={colors[editingIndex].sku}
          inventory={colors[editingIndex].inventory}
          onCancel={(): void => setIsEditingIndex(null)}
          onSave={handleEditColorItem}
          isEditing
          role={role}
        />
      )}
      {isAdding && (
        <EditColorForm<ColorFormFields>
          onSave={onSubmit}
          role={role}
          options={notSelectedColors}
          onCancel={(): void => setIsAdding(false)}
        />
      )}
      {!isAdding && notSelectedColors.length > 0 && (
        <Typography color="secondary" className="d-ib link" onClick={(): void => setIsAdding(true)}>
          + Add more
        </Typography>
      )}
    </WhiteBlock>
  );
};
