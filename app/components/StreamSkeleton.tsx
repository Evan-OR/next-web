import { Box, Skeleton } from '@mui/material';
import React from 'react';

const StreamSkeleton = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <Skeleton variant="rounded" width={220} height={118} />
      <Box display={'flex'} gap={1}>
        <Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>

        <Box width={161}>
          <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default StreamSkeleton;
