import { IconButton } from '@material-ui/core';
import { Icon } from 'components/Icon';
import { VideoPlayerProps } from 'components/VideoPlayer';
import { useFileUpload } from 'hooks/useFileUpload';
import dynamic from 'next/dynamic';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UploadApi } from 'services/api/admin/UploadApi';

import { useAlert } from '../../../../hooks/useAlert';
import { Product } from '../../../../redux/ducks/products/types/contracts';
import styles from './RecipeStepsBlock.module.scss';

const VideoPlayer = dynamic<VideoPlayerProps>(() => import('components/VideoPlayer').then((m) => m.VideoPlayer), {
  ssr: false,
});

export const RecipeVideo: React.FC = () => {
  const { openAlert } = useAlert();
  const { watch, setValue, register } = useFormContext<Product>();
  const [progressBar, setProgressBar] = React.useState(0);
  const isUploading = progressBar > 0;
  const video = watch('video');

  const uploadFileProgress = (progress: number): void => {
    setProgressBar(progress);
  };

  const { files, inputRef, onClickUpload, onSelectFile, onRemoveFile } = useFileUpload({
    acceptedTypes: ['mp4', 'avi'],
    single: true,
    maxSize: 250,
    value: [{ id: video?.id || '', url: video?.url || '', name: 'video' }],
    onProgress: (value): void => uploadFileProgress(value),
    onError: (err) => {
      if (err.includes('size')) {
        openAlert(err, 'error');
      }
    },
  });

  const videoUrl = files[0]?.url;

  const intervalRef = React.useRef<any>(null);

  const fetchVideoDetails = async (): Promise<ReturnType<typeof UploadApi.getDetails> | null> => {
    try {
      const data = await UploadApi.getDetails(String(files[0]?.id));
      if (data) {
        setValue('video', { id: data?.id, url: data?.url, status: data?.status }, { shouldValidate: true });
      }
      return data;
    } catch (error) {
      clearInterval(intervalRef.current);
      alert('Error when uploading video');
      return null;
    }
  };

  React.useEffect(() => {
    register('video.url');
    register('video.id');
    register('video.status');
  }, [register]);

  React.useEffect(() => {
    if (!video?.id && video?.status !== 'complete' && videoUrl && !videoUrl.includes('blob')) {
      intervalRef.current = setInterval(async () => {
        const data = await fetchVideoDetails();

        if (data?.status === 'complete' || data?.status === 'unknown') {
          clearInterval(intervalRef.current);
        }

        if (data?.status === 'unknown') {
          alert('Error when uploading video');
        }
      }, 3000);
    }
  }, [videoUrl]);

  const onDeleteVideo = (): boolean => {
    const answer = onRemoveFile(0);
    if (answer) {
      setProgressBar(0);
      setValue('video.url', null, { shouldValidate: true });
      setValue('video.id', null, { shouldValidate: true });
      setValue('video.status', 'init', { shouldValidate: true });
    }
    return answer;
  };

  const onStopUploading = (): void => {
    try {
      const file = files[0];
      if (onDeleteVideo() && file?.cancelTokenSource) {
        file.cancelTokenSource.cancel();
      }
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  const renderBlock = (content: React.ReactNode): React.ReactElement => {
    return (
      <div>
        <div className={styles.titleBlock}>
          <span className={styles.title}>Video (optional)</span>
          {video?.id && (
            <IconButton onClick={onDeleteVideo}>
              <Icon type="close" />
            </IconButton>
          )}
        </div>
        {content}
      </div>
    );
  };

  if (video?.id) {
    if (video?.status === 'processing' || video?.status === 'progressing' || video?.status === 'init') {
      return renderBlock(
        <div className={styles.videoBlockPending}>
          <div>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="31.5" stroke="#47D7AC" />
              <path d="M18 33L27 42L46 23" stroke="#47D7AC" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Uploaded</p>
          </div>
          <span>
            Video processing is in progress, playback will be available a little later. You can save the Meal Kit
            without waiting for processing.
          </span>
        </div>,
      );
    }

    if (video?.status === 'complete') {
      return renderBlock(
        <div className={styles.videoPlayer}>
          <VideoPlayer url={video.url} />
        </div>,
      );
    }

    return renderBlock(<div className={styles.videoPlayer}>Unknown error when uploading video</div>);
  }

  if (isUploading) {
    return renderBlock(
      <div className={styles.videoBlock}>
        <div className={styles.stopUploadingButton}>
          <IconButton onClick={onStopUploading}>
            <Icon type="close" />
          </IconButton>
        </div>
        <p className="m-auto" style={{ zIndex: 1 }}>
          Uploading video in progress...
        </p>
        <div className={styles.progressUpload} style={{ width: `${progressBar}%` }} />
      </div>,
    );
  }

  return renderBlock(
    <div onClick={onClickUpload} className={styles.videoBlock} style={{ cursor: 'pointer' }}>
      <div className={styles.videoUpload}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="31.5" stroke="#47D7AC" />
          <path
            d="M37.5806 31.5V40H17V23H37.5806V31.5ZM37.5806 31.5L46 40V23L37.5806 31.5Z"
            stroke="#1CBD8D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.videoText}>
        <p>Upload Video</p>
        <span>
          You can upload a video file up to <b>250MB</b>
        </span>
      </div>
      <input onChange={onSelectFile} ref={inputRef} type="file" hidden />
    </div>,
  );
};
