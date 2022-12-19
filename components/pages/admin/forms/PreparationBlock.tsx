import _get from 'lodash/get';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';
import { UploadFile } from '../UploadFile';

interface PreparationBlockProps {
  name?: string;
  onSuccessUpload: (url: string) => void;
}

export const PreparationBlock: React.FC<PreparationBlockProps> = ({ name = 'instruction', onSuccessUpload }) => {
  const { errors, control } = useFormContext();

  return (
    <WhiteBlock
      title="Preparation instruction"
      description="Instructions on how to cook the dish and the quantities needed (optional)"
    >
      <Controller
        control={control}
        name={name}
        render={({ value }): React.ReactElement => (
          <UploadFile
            onSuccessUpload={onSuccessUpload}
            error={_get(errors, `${name}.message`)}
            value={value}
            title="Upload PDF"
            testId="upload-pdf"
            isPDF
          />
        )}
      />
    </WhiteBlock>
  );
};
