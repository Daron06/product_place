import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';

import { AutocompleteOptionItem } from '../../../AutocompleteField';
import { Icon } from '../../../Icon';
import styles from './IngredientList.module.scss';

export interface IngredientsListProps {
  items: AutocompleteOptionItem[];
  onRemove?: (item: AutocompleteOptionItem) => void;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ items, onRemove }) => {
  const { acceptLanguage } = React.useContext(LanguageContext);
  if (!items) {
    return null;
  }

  return (
    <List classes={{ root: styles.requiredList }}>
      {items.map((item) => (
        <div key={item.image}>
          <ListItem classes={{ root: styles.requiredListItem }} data-test-id="required-list-item">
            <ListItemAvatar>
              <Avatar src={item.image} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <span className={styles.requiredInputField}>
                  {acceptLanguage === 'ar' ? item.name__ar || item.name : item.name}
                </span>
              }
            />
            {onRemove && (
              <ListItemSecondaryAction>
                <IconButton onClick={(): void => onRemove(item)} edge="end" aria-label="delete">
                  <Icon type="close" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider component="li" />
        </div>
      ))}
    </List>
  );
};
