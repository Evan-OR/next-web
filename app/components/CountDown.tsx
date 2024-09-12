import React, { useEffect, useState } from 'react';
import { Avatar, Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { ClientToServerEvents, HighestBidderMessage, ServerToClientEvents, TimerMessage } from '../types/types';
import { Socket } from 'socket.io-client';

type CountDownProps = TimerMessage & {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

export const CountDown = ({ startTime, duration, msg, socket }: CountDownProps) => {
    const endTime = startTime + duration * 1_000;
    const [timeRemaining, setTimeRemaining] = useState(endTime - Date.now());
    const [highestBidder, setHightestBidder] = useState<HighestBidderMessage | null>(null);

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
        setHightestBidder(null);
    }, [startTime]);

    useEffect(() => {
        if (socket) {
            socket.on('biddingUpdate', (highestBidderMessage: HighestBidderMessage) => {
                setHightestBidder(highestBidderMessage);
                console.log(highestBidderMessage);
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

    const getTimeInSeconds = () => Math.ceil(timeRemaining / 1_000);

    const textColor = timeRemaining < 10_000 ? 'warning' : 'inherit';
    const barColour = timeRemaining < 10_000 ? 'warning' : 'primary';

    return (
        <Paper elevation={2} sx={{ position: 'absolute', width: 'calc(100% - 32px)', zIndex: 1 }}>
            <Box p={1}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h6">{msg}</Typography>
                    <Typography variant="h6" color={textColor}>
                        {getTimeInSeconds()}
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={calculatePercentageLeft(Date.now(), endTime)}
                    color={barColour}
                />
                <Box my={2} display={'flex'} justifyContent={'space-between'}>
                    {highestBidder ? (
                        <>
                            <Box>Highest Bidder</Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Stack alignItems={'flex-end'}>
                                    <Typography variant="body1" px={1}>
                                        {highestBidder.username}
                                    </Typography>
                                    <Typography variant="body2" px={1} color={barColour}>
                                        {highestBidder.bid.toLocaleString('en-IE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </Typography>
                                </Stack>

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
                            </Box>
                        </>
                    ) : (
                        <div>No bids yet...</div>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};
