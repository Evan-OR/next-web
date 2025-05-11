import { Box, Typography } from '@mui/material';
import React from 'react';

type CompletedBid = {
  title: string;
  amount: number;
  date: number;
  seller: string;
};

const CompletedBid = ({ bid }: any) => {
  const completedBid = bid as CompletedBid;

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Typography variant="body1" fontWeight={'bold'}>
          {completedBid.title}
        </Typography>
        <Typography variant="caption">{completedBid.seller}</Typography>
      </Box>

      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
        <Typography variant="body1" fontWeight={'bold'}>
          €{completedBid.amount}
        </Typography>
        <Typography variant="caption">{new Date(completedBid.date).toLocaleDateString()}</Typography>
      </Box>
    </Box>
  );
};

export default CompletedBid;
