import { Divider, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';

import { DashboardRole, OptionVariants } from '../../../../../services/types';
import { Icon } from '../../../../Icon';
import { ColorFormProps } from '../../SupplierWarehouseCreate/forms/ColorForm';
import styles from './ColorForm.module.scss';

interface ColorsListProps {
  items: Array<Partial<OptionVariants> | undefined>;
  onRemove: (index: number) => void;
  role?: DashboardRole.STAFF | DashboardRole.SUPPLIER;
  onColorEdit?: (index: number, data?: any) => void;
  editIndex?: number | null;
  type?: ColorFormProps['type'];
  morePrice?: boolean;
}

export const ColorsList: React.FC<ColorsListProps> = ({
  items,
  onColorEdit,
  onRemove,
  role = DashboardRole.SUPPLIER,
  editIndex,
  type = 'color',
  morePrice = true,
}) => {
  const [nameKey, setNameKey] = React.useState<string>('name');
  const { acceptLanguage } = React.useContext(LanguageContext);
  React.useEffect(() => {
    const key = acceptLanguage === 'en' ? 'name' : `name__${acceptLanguage}`;
    setNameKey(key);
  }, [acceptLanguage]);

  return items.length > 0 ? (
    <List component="nav" className="mb-20">
      {items.map(
        (item, index) =>
          item && (
            <div key={item?.id}>
              <ListItem classes={{ root: styles.colorItem }}>
                <div className="d-flex align-items-center">
                  {type === 'color' && (
                    <div
                      className={styles.colorVariant}
                      style={{ backgroundColor: item.color, border: '1px solid #ededed' }}
                    />
                  )}
                  <div className="d-flex align-items-center">
                    <ListItemText primary={`${item[nameKey] || item.name}`} />
                  </div>
                </div>
                {role === 'staff' && morePrice && (
                  <div className="d-flex align-items-center flex-auto">
                    <div className="mr-50">
                      <Typography className="text-color-600">Chef commission</Typography>
                      <Typography>AED {item?.chefPrice ?? 0}</Typography>
                    </div>
                    <div className="mr-50">
                      <Typography className="text-color-600">Vendor price</Typography>
                      <Typography>AED {item?.supplierPrice ?? 0}</Typography>
                    </div>
                    <div className="mr-50">
                      <Typography className="text-color-600">MSRP</Typography>
                      <Typography>AED {item?.msrpPrice ?? 0}</Typography>
                    </div>
                    <div>
                      <Typography className="text-color-600">unknown Price</Typography>
                      <Typography>AED {item?.price ?? 0}</Typography>
                    </div>
                  </div>
                )}
                <div className="ml-auto d-flex align-items-center mr-40">
                  <Typography className="fz-large-14">{item?.inventory ?? 0} items</Typography>
                </div>

                {editIndex === null && (
                  <IconButton className={styles.closeIcon} onClick={(): void => onColorEdit?.(index, item)}>
                    <Icon type="launch" />
                  </IconButton>
                )}
                {onRemove && (
                  <IconButton className={styles.closeIcon} onClick={(): void => onRemove(index)}>
                    <Icon type="close" />
                  </IconButton>
                )}
              </ListItem>
              <Divider />
            </div>
          ),
      )}
    </List>
  ) : null;
};
