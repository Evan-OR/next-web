import Chat from '@/components/Chat';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Box } from '@mui/material';
import React from 'react';

type StreamPageProps = {
  params: {
    streamId: string;
  };
};

export default function StreamPage({ params: { streamId } }: StreamPageProps) {
  return (
    <>
      <main style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box display="flex" height={'99%'} maxWidth="100vw" gap={1} m={1}>
          <VideoPlayer streamId={streamId} />
          <Chat streamId={streamId} />
        </Box>
      </main>
    </>
  );
}
