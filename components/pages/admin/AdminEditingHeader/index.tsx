import CircularProgress from '@material-ui/core/CircularProgress';
import { CreateHeader, CreateHeaderProps } from 'components/pages/admin/CreateHeader';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface AdminEditingHeaderProps {
  isEditing: boolean;
  title: CreateHeaderProps['title'];
  onSubmit: CreateHeaderProps['handleSubmit'];
  submitButtonDisabled?: boolean;
  isLanguageSelect?: boolean;
}

export const AdminEditingHeader: React.FC<AdminEditingHeaderProps> = ({
  isEditing,
  title,
  onSubmit,
  submitButtonDisabled,
  isLanguageSelect = false,
}): React.ReactElement => {
  const { formState } = useFormContext();
  let submitButtonText: React.ReactNode = 'Submit';

  if (formState?.isSubmitting) {
    submitButtonText = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (isEditing) {
    submitButtonText = 'Save';
  }

  return (
    <div className="mb-30">
      <CreateHeader
        isLanguageSelect={isLanguageSelect}
        title={title}
        handleSubmit={onSubmit}
        submitButtonText={submitButtonText}
        submitButtonDisabled={formState?.isSubmitting || submitButtonDisabled}
      />
    </div>
  );
};
