import { WinnerBidData } from '@/types/types';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';

type BidWinnerProps = {
  finalDetails: WinnerBidData;
};

const BidWinner = ({ finalDetails: { amount, timestamp, userData } }: BidWinnerProps) => {
  const profilePicSize = '60px';
  return (
    <Box>
      {userData ? (
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <Box>
            <Typography variant="h6">Final Winner</Typography>
          </Box>
          <Divider />
          <Box display={'flex'} gap={1}>
            <Avatar
              alt={userData.username}
              src={userData.profilePic || ''}
              slotProps={{
                img: {
                  loading: 'lazy',
                },
              }}
              sx={{ width: profilePicSize, height: profilePicSize }}
            />
            <Box display={'flex'} flexDirection={'column'} alignContent={'space-around'}>
              <Typography variant="body1">{userData.username}</Typography>
              <Typography variant="body1">€{amount}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <>NO BUYER</>
      )}
    </Box>
  );
};

export default BidWinner;
