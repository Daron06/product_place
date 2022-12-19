import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Dropdown } from '../../Dropdown';
import { Icon } from '../../Icon';
import { AdminGoBackButton } from './AdminGoBackButton';
import { LanguageSelect } from './LanguageSelect';
import { RecipeCreateFieldsProps } from './RecipeCreate/types';

export interface CreateHeaderProps {
  title: string;
  isSubmitting?: boolean;
  handleSubmit?: ReturnType<UseFormMethods<RecipeCreateFieldsProps>['handleSubmit']>;
  submitButtonText?: React.ReactNode;
  submitButtonDisabled?: boolean;
  isLanguageSelect?: boolean;
}

export const CreateHeader: React.FC<CreateHeaderProps> = ({
  children,
  title,
  isSubmitting = false,
  submitButtonDisabled = false,
  handleSubmit,
  submitButtonText,
  isLanguageSelect = false,
}): React.ReactElement => {
  return (
    <div className={adminLayoutStyles.head}>
      <div className={adminLayoutStyles.headTitle}>
        <AdminGoBackButton />
        <Typography variant="h4">{title}</Typography>
      </div>
      <div className="d-flex">
        {children && (
          <div className="mr-20">
            <Dropdown
              overlay={
                <Button
                  classes={{ root: clsx(adminLayoutStyles.button, 'pl-20') }}
                  startIcon={
                    <div className={adminLayoutStyles.buttonIcon}>
                      <Icon type="action" />
                    </div>
                  }
                  variant="outlined"
                >
                  Action
                </Button>
              }
            >
              {children}
            </Dropdown>
          </div>
        )}
        {isLanguageSelect && <LanguageSelect />}
        {handleSubmit && (
          <Button
            disabled={submitButtonDisabled || isSubmitting}
            onClick={handleSubmit}
            data-test-id="submit-button"
            classes={{ root: clsx(adminLayoutStyles.button, 'ml-10 pl-20 pr-20') }}
            color="secondary"
            variant="contained"
          >
            {submitButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};
