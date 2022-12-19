import React from 'react';
import ReactPlayer from 'react-player';

export interface VideoPlayerProps {
  url: string;
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <ReactPlayer
      url={url}
      config={{
        file: {
          forceHLS: !isSafari,
          forceVideo: true,
          hlsVersion: '0.12.4',
          hlsOptions: {
            xhrSetup: (context): void => {
              context.withCredentials = true;
              context.credentials = 'include';
            },
          },
          attributes: {
            crossorigin: 'use-credentials',
          },
        },
      }}
      controls
    />
  );
};
