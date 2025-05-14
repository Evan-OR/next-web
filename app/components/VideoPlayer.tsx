'use client';

import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

type VideoPlayer = {
  streamId: string;
};

export const VideoPlayer = ({ streamId }: VideoPlayer) => {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const videoSrc = `https://48.209.33.228:8080/hls/${streamId}.m3u8`;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          liveDurationInfinity: true,
        });
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.muted = true;
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }
  }, [videoSrc]);

  return (
    <div style={{ width: '100%' }}>
      <video
        style={{
          aspectRatio: '16 / 9',
          width: '100%',
          borderRadius: '4px',
        }}
        ref={videoRef}
        controls
      ></video>
    </div>
  );
};
