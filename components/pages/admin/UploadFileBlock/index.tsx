import { UploadFile } from 'components/pages/admin/UploadFile';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

export interface UploadFileBlockProps {
  instruction?: string | null;
  marginZero?: boolean;
  description?: string;
  title?: string;
}

export const UploadFileBlock: React.FC<UploadFileBlockProps> = ({
  instruction,
  marginZero,
  description = 'Cloud kitchen instructions on how to cook the dish and the quantities needed (optional)',
  title = 'Preparation instruction',
}): React.ReactElement => {
  const { errors, register, setValue } = useFormContext();

  React.useEffect(() => {
    register('instruction');
  }, [register]);

  const onChangeInstruction = (url: string): void => {
    setValue('instruction', url, { shouldValidate: true });
  };

  return (
    <WhiteBlock title={title} description={description} marginZero={marginZero}>
      <UploadFile
        onSuccessUpload={onChangeInstruction}
        acceptedTypes={['pdf']}
        error={errors.instruction?.message}
        value={instruction}
        title="Upload PDF"
        testId="upload-pdf"
        isPDF
      />
    </WhiteBlock>
  );
};
