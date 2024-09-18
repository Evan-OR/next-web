import Chat from '@/app/components/Chat';
import { VideoPlayer } from '@/app/components/VideoPlayer';
import { Box, Typography } from '@mui/material';
import React from 'react';

type StreamPageProps = {
    params: {
        streamId: string;
    };
};

export default function StreamPage({ params: { streamId } }: StreamPageProps) {
    return (
        <>
            <Typography variant="h5">StreamId: {streamId}</Typography>
            <main style={{ position: 'relative', width: '100%' }}>
                <Box display="flex" maxWidth="100vw" gap={1} m={1}>
                    <VideoPlayer />
                    <Chat />
                </Box>
            </main>
        </>
    );
}
