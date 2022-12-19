import CloseIcon from '@material-ui/icons/Close';
import { WorkingExperienceItem } from 'components/pages/admin/Register';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import CameraSvg from '../../assets/icons/camera.svg';
import RemoveSvg from '../../assets/icons/close.svg';
import { useFileUpload } from '../../hooks/useFileUpload';
import styles from './WorkingExperience.module.scss';

interface WorkingExperienceProps {
  isRemovable?: boolean;
  onRemove: () => void;
  error?: FieldErrors<WorkingExperienceItem>;
  index: number;
  value?: WorkingExperienceItem;
  uploadUrl?: string;
}

export const WorkingExperience: React.FC<WorkingExperienceProps> = ({
  isRemovable,
  onRemove,
  error,
  value,
  index,
  uploadUrl,
}): React.ReactElement => {
  const { formState, register, setValue } = useFormContext();
  const { files, inputRef, onClickUpload, onSelectFile, onRemoveFile } = useFileUpload({
    acceptedTypes: ['jpeg', 'jpg', 'png'],
    single: true,
    value: [{ id: '', name: '', url: value?.photo || '' }],
    uploadUrl,
  });
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const errorText = error?.name?.message || error?.description?.message;
  const photoUrl = files[0]?.url;

  React.useEffect(() => {
    setValue(`workingExperience[${index}].photo`, photoUrl, { shouldValidate: true });
  }, [photoUrl]);

  return (
    <div className={styles.workingExperience}>
      <input style={{ display: 'none' }} ref={inputFileRef} type="file" />
      <div className={styles.workingExperienceBlock}>
        <div className={styles.workingExperienceInfo}>
          <div role="presentation" className={styles.workingExperienceAvatar}>
            {!photoUrl ? (
              <div onClick={onClickUpload} className={styles.workingExperienceAvatarEmpty}>
                <CameraSvg />
              </div>
            ) : (
              <>
                <div className={styles.removeIcon}>
                  <CloseIcon onClick={(): boolean => onRemoveFile(0)} style={{ fontSize: 16 }} />
                </div>
                <img
                  onClick={onClickUpload}
                  src={photoUrl}
                  className={styles.workingExperienceAvatar}
                  alt="Company logo"
                />
              </>
            )}
            <input onChange={onSelectFile} ref={inputRef} type="file" hidden />
            <input
              defaultValue={photoUrl || ''}
              name={`workingExperience[${index}].photo`}
              ref={register()}
              type="text"
              hidden
            />
          </div>

          <div className={styles.workingExperienceInputs}>
            <input
              className={styles.workingExperienceCompanyName}
              placeholder="Company name"
              defaultValue={value?.name || ''}
              name={`workingExperience[${index}].name`}
              ref={register()}
            />
            <input
              className={styles.workingExperienceCompanyPosition}
              placeholder="Enter your position in company"
              defaultValue={value?.description || ''}
              name={`workingExperience[${index}].description`}
              ref={register()}
            />
          </div>
        </div>
        <div role="presentation" className={styles.workingExperienceAction} data-test-id="remove-working-experience">
          {isRemovable && <RemoveSvg onClick={onRemove} className="removeIcon" />}
        </div>
      </div>
      {errorText && formState.isSubmitted && (
        <p className={styles.errorLabel} data-test-id="workingExperience-error-message">
          {errorText}
        </p>
      )}
    </div>
  );
};
