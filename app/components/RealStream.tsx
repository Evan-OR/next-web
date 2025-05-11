import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const RealStream = () => {
  return (
    <Link href="/streams/123">
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Box width={220} height={118} sx={{ backgroundImage: 'red', borderRadius: '4px' }}>
          <img
            src="https://livebiddingprojectimages.blob.core.windows.net/images/Untitled-2.png"
            width={'100%'}
            height={'auto'}
          ></img>
        </Box>
        <Box display={'flex'} gap={1}>
          <Box>
            <Avatar src="https://livebiddingprojectimages.blob.core.windows.net/images/x21357913@student.ncirl.ie"></Avatar>
          </Box>

          <Box>
            <Typography variant="body1" color="white" sx={{ textDecoration: 'none' }}>
              Presentation Day!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default RealStream;
