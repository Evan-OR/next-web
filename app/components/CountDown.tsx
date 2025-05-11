'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
  linearProgressClasses,
  darken,
} from '@mui/material';
import {
  ClientToServerEvents,
  HighestBidderMessage,
  ServerToClientEvents,
  TimerMessage,
  WinnerBidData,
} from '../types/types';
import { Socket } from 'socket.io-client';
import BidWinner from './BidWinner';

interface LinearBarProps {
  customColor: string;
}

const LinearBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'customColor',
})<LinearBarProps>(({ customColor }) => {
  return {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: darken(customColor, 0.5),
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: customColor,
    },
  };
});

type CountDownProps = TimerMessage & {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  timerFinished: boolean;
};

export const CountDown = ({ startTime, duration, msg, socket, timerFinished }: CountDownProps) => {
  const theme = useTheme();
  const endTime = startTime + duration * 1_000;
  const [timeRemaining, setTimeRemaining] = useState(endTime - Date.now());
  const [highestBidder, setHightestBidder] = useState<HighestBidderMessage | null>(null);
  const [finalDetails, setFinalDetails] = useState<WinnerBidData>({
    amount: 0,
    timestamp: 0,
    userData: null,
  });

  useEffect(() => {
    if (endTime < Date.now()) {
      setTimeRemaining(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(endTime - Date.now());
    }, 100);

    return () => clearInterval(timer);
  }, [timeRemaining, endTime]);

  useEffect(() => {
    if (socket) {
      socket.on('biddingUpdate', (highestBidderMessage: HighestBidderMessage) => {
        setHightestBidder(highestBidderMessage);
        console.log(highestBidderMessage);
      });

      socket.on('timerComplete', (data) => {
        console.log(data);
        setFinalDetails(data.finalBidData);
      });

      socket.on('timerComplete', (data) => {
        setHightestBidder(null);
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket]);

  const calculatePercentageLeft = (currentTime: number, endTime: number) => {
    const totalDurationMillis = endTime - startTime;
    const remainingTimeMillis = endTime - currentTime;
    const percentageTimeLeft = (remainingTimeMillis / totalDurationMillis) * 100;
    return percentageTimeLeft;
  };

  const getTimeInSeconds = Math.ceil(timeRemaining / 1_000);

  const placeBid = (amount: number) => {
    if (!socket) {
      console.error('NO WEBSOCKET CONNECTION!');
      return;
    }

    socket.emit('placeBid', { amount });
  };

  const textColor = timeRemaining === 0 ? theme.palette.success.main : 'inherit';
  const barColor =
    timeRemaining === 0
      ? theme.palette.success.main
      : timeRemaining < 10_000
      ? theme.palette.warning.main
      : theme.palette.primary.main;

  return (
    <Paper elevation={2} sx={{ position: 'absolute', width: 'calc(100% - 32px)', zIndex: 1 }}>
      <Box p={1}>
        {!timerFinished ? (
          <>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h6">{msg}</Typography>
              <Typography variant="h6" color={barColor}>
                {getTimeInSeconds}
              </Typography>
            </Box>
            <LinearBar
              variant="determinate"
              value={calculatePercentageLeft(Date.now(), endTime)}
              customColor={barColor}
            />
            <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {highestBidder ? (
                  <Box display={'flex'} alignItems={'center'}>
                    <Avatar
                      alt={highestBidder.username}
                      src={highestBidder.profilePic}
                      slotProps={{
                        img: {
                          loading: 'lazy',
                        },
                      }}
                      sx={{ width: '50px', height: '50px' }}
                    />

                    <Stack>
                      <Typography variant="body1" px={1}>
                        {highestBidder.username}
                      </Typography>
                      <Typography variant="body2" px={1} color={textColor}>
                        {highestBidder.bid.toLocaleString('en-IE', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </Typography>
                    </Stack>
                  </Box>
                ) : (
                  <div style={{ height: '50px' }}>No bids yet...</div>
                )}
              </Box>
              <Box>
                <Button
                  disabled={timeRemaining === 0}
                  onClick={highestBidder ? () => placeBid(highestBidder.bid + 1) : () => placeBid(1)}
                >
                  Bid{' '}
                  {highestBidder
                    ? (highestBidder.bid + 1).toLocaleString('en-IE', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      })
                    : '€1'}
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <BidWinner finalDetails={finalDetails} />
        )}
      </Box>
    </Paper>
  );
};
