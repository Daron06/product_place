/* eslint-disable @typescript-eslint/no-var-requires,global-require */
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { uploadFile } from 'utils/uploadFile';

import { ErrorText } from '../ErrorText';
import styles from './Editor.module.scss';

interface IEditor {
  name: string;
  onChange: (data: string) => void;
  minToolbar?: boolean;
}

const { CKEditor } = require('@ckeditor/ckeditor5-react');
const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

class MyUploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload(): any {
    return this.loader.file.then(
      // eslint-disable-next-line consistent-return
      async (file: File): Promise<{ default: string } | undefined> => {
        try {
          const { url } = await uploadFile(file, undefined, undefined, '/admin/upload/image');
          return { default: url };
        } catch (error: any) {
          alert('Error while upload image');
          console.warn('Error while upload image', error);
        }
      },
    );
  }
}

const Editor: React.FC<IEditor> = ({ name, onChange, minToolbar = false }) => {
  const { control, errors, formState, watch } = useFormContext();

  const toolbarSettings = minToolbar ? ['bold', 'italic'] : ClassicEditor.defaultConfig.toolbar;

  return (
    <>
      <div className={styles.editorRoot}>
        <Controller
          control={control}
          name={name}
          render={(): React.ReactElement => (
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: toolbarSettings,
                mediaEmbed: {
                  previewsInData: true,
                },
              }}
              data={watch(name)}
              onChange={(_: any, editor: any): void => {
                const data = editor.getData();
                onChange(data as string);
              }}
              onReady={(editor: any): void => {
                // eslint-disable-next-line no-param-reassign
                editor.plugins.get('FileRepository').createUploadAdapter = (loader: any): MyUploadAdapter => {
                  return new MyUploadAdapter(loader);
                };
              }}
            />
          )}
        />
      </div>
      {formState.isSubmitted && errors.program?.message && <ErrorText focus>{errors.program?.message}</ErrorText>}
    </>
  );
};

export default Editor;
