import RealStream from '@/components/RealStream';
import StreamSkeleton from '@/components/StreamSkeleton';
import { Box, Typography } from '@mui/material';

const page = async () => {
  return (
    <Box width={'70%'}>
      <Typography variant="h5" style={{ color: 'white' }}>
        Live
      </Typography>

      <Box width={'100%'} display={'flex'} gap={4} flexWrap={'wrap'} justifyContent={'space-around'}>
        <RealStream />
        {Array(14).fill(<StreamSkeleton />)}
      </Box>
    </Box>
  );
};

export default page;
