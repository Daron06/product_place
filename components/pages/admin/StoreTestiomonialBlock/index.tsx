import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import styles from 'components/pages/admin/AdminStoreDetails/AdminChefStoreUpsert.module.scss';
import { UploadImages } from 'components/pages/admin/UploadImages';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const StoreTestimonialBlock: React.FC = (): React.ReactElement => {
  const { control, setValue } = useFormContext();

  const handleChangeImages = (arr: UploadedImage[]): void => {
    setValue(
      'media',
      arr.filter((obj) => obj.name),
      { shouldValidate: true },
    );
  };

  return (
    <Paper elevation={0}>
      <div className="p-20">
        <Typography className={styles.boldText}>Testimonial</Typography>
        <FormField name="testimonial" textarea />
        <UploadImages control={control} onChangeImages={handleChangeImages} />
        <div className="mt-20">
          <div className={styles.videoBlock}>
            <Icon className="mr-30" type="big-video" />
            <div className="d-flex flex-column">
              <Typography className={styles.videoTitle} variant="h4">
                Upload video
              </Typography>
              <Typography className={styles.videoRecipeText} variant="body1">
                You can upload a video file up to 1GB
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
