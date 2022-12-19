import { Typography } from '@material-ui/core';
import { ErrorText } from 'components/ErrorText';
import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DashboardRole } from 'services/types';

import { EditChefTableMenuList } from './ChefTableMenuList';
import { EditChefTableMenu } from './EditChefTableMenu';

interface ChefTableMenuProps {
  role: DashboardRole;
  menuOptions?: ChefTableMenuOptions[];
}

export interface ChefTableMenuOptions {
  chefPrice: number;
  price: number;
  name: string;
  name__ar: string;
  spots: number;
  id?: number;
}

export const ChefTableMenu: React.FC<ChefTableMenuProps> = ({ role }) => {
  const { register, setValue, errors, formState, watch } = useFormContext();
  const [isAdding, setIsAdding] = React.useState(false);
  const [menu, setMenu] = React.useState<ChefTableMenuOptions[] | []>(watch('menuOptions') || []);
  const [editingIndex, setIsEditingIndex] = React.useState<number | null>(null);
  const { acceptLanguage } = React.useContext(LanguageContext);

  React.useEffect(() => {
    register('menuOptions');
    setValue('menuOptions', menu, { shouldValidate: true });
  }, [menu]);

  const onSubmit = (obj: ChefTableMenuOptions): void => {
    setMenu((prev) => [...prev, { ...obj, price: obj.price || 0 }]);
    setIsAdding(false);
  };

  const handleMenuItemRemove = (id: number): void => {
    setMenu((prev) => prev.filter((_, i) => i !== id));
  };

  const handleMenuItemChange = (obj: ChefTableMenuOptions): void => {
    setMenu((prev: ChefTableMenuOptions[]) =>
      prev.map((element, i) => {
        if (i === editingIndex) {
          return { ...obj, price: obj.price || 0 };
        }
        return element;
      }),
    );
    setIsAdding(false);
    setIsEditingIndex(null);
  };

  return (
    <div>
      <EditChefTableMenuList
        role={role}
        items={menu}
        onRemove={handleMenuItemRemove}
        onMenuItemEdit={(itemId): void => setIsEditingIndex(itemId)}
        editIndex={editingIndex}
        acceptLanguage={acceptLanguage}
      />
      {editingIndex !== null && (
        <EditChefTableMenu
          chefPrice={menu[editingIndex]?.chefPrice}
          menuName={menu[editingIndex]?.name}
          menuNameAr={menu[editingIndex]?.name__ar}
          acceptLanguage={acceptLanguage}
          price={menu[editingIndex]?.price}
          spots={menu[editingIndex]?.spots}
          onCancel={(): void => setIsEditingIndex(null)}
          onSave={handleMenuItemChange}
          role={role}
        />
      )}

      {isAdding && <EditChefTableMenu onSave={onSubmit} role={role} onCancel={(): void => setIsAdding(false)} />}
      {!isAdding && (
        <>
          <Typography color="secondary" className="d-ib link" onClick={(): void => setIsAdding(true)}>
            + Add menu item
          </Typography>
          {formState.isSubmitted && <ErrorText focus>{errors?.menuOptions?.message}</ErrorText>}
        </>
      )}
    </div>
  );
};
