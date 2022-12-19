import orderBy from 'lodash/orderBy';
import { useRouter } from 'next/router';
import React from 'react';

import { DashboardRole, Option, Supplier } from '../../../../services/types';
import { Button } from '../../../Button';
import InfoBlock from '../../../InfoBlock';
import { Modal } from '../../../Modal';
import { Select } from '../../../Select';
import { SupplierWarehouseCreateContext } from '.';
import styles from './SupplierWarehouseCreate.module.scss';

interface AddVariationModalProps {
  open?: boolean;
  onClose: () => void;
  onAdd: (item: Option) => void;
  selectedVariations: Option[];
  formIsDirty?: boolean;
  role: DashboardRole.SUPPLIER | DashboardRole.STAFF;
}

function getInfoText(role: DashboardRole, supplier?: Supplier): string {
  if (role === DashboardRole.STAFF) {
    return supplier ? `Supplier «${supplier?.name}» no have variations` : 'Select a supplier before adding variations';
  }
  return 'You no have variations';
}

export const AddVariationModal: React.FC<AddVariationModalProps> = ({
  open,
  onAdd,
  onClose,
  selectedVariations = [],
  formIsDirty,
  role,
}) => {
  const router = useRouter();
  const { allVariations, supplier } = React.useContext(SupplierWarehouseCreateContext);
  const [optionSlug, setOptionSlug] = React.useState<string>();
  const selectedOption = allVariations.find((obj) => obj.slug === optionSlug) as Option;

  const addVariation = (): void => {
    if (optionSlug) {
      onAdd(selectedOption);
      onClose();
      setOptionSlug(undefined);
    }
  };

  const openCreateVariationsPage = (): void => {
    if (
      formIsDirty &&
      !confirm('You have unsaved changes that cannot be reverted. Are you sure you want to exit this form?')
    ) {
      return;
    }
    router.push(`/admin/${role}/warehouse/variations/create`);
  };

  return (
    <Modal size="xs" title="New variation" open={open} onClose={onClose}>
      {allVariations.length > 0 ? (
        <Select
          items={orderBy(allVariations, 'name', 'asc').map((obj) => ({
            name: obj.name,
            value: obj.slug,
            disabled: selectedVariations.some((o) => o.id === obj.id),
          }))}
          onChange={(e): void => setOptionSlug(e.target.value as string)}
          value={optionSlug}
          fullWidth
        />
      ) : (
        <InfoBlock type="warning" text={getInfoText(role, supplier)} />
      )}
      {optionSlug && (
        <div className="d-flex align-items-center justify-content-between">
          <Button onClick={onClose} color="secondary" variant="outlined" className="mr-10">
            Cancel
          </Button>
          <Button onClick={addVariation} color="secondary" variant="contained">
            Add
          </Button>
        </div>
      )}
      {!selectedOption && (
        <Button
          onClick={openCreateVariationsPage}
          className={styles.createNewVariationButton}
          color="secondary"
          variant="contained"
        >
          Create new variation
        </Button>
      )}
    </Modal>
  );
};
