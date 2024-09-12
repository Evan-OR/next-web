'use client';

import { Box, Button, Divider, styled, Typography } from '@mui/material';
import React from 'react';

const NavButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

export const NavBar = () => {
    return (
        <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} p={3} width={'100%'}>
            <Box>
                <Typography variant="h5">
                    Stream<b>Sell</b>
                </Typography>
            </Box>
            <Box display={'flex'} gap={3}>
                <NavButton variant="text" color="inherit" disableRipple>
                    First
                </NavButton>
                <NavButton variant="text" color="inherit" disableRipple>
                    Second
                </NavButton>
                <NavButton variant="text" color="inherit" disableRipple>
                    Third
                </NavButton>
                <Divider orientation="vertical" flexItem />
                <Button variant="text" color="primary">
                    Login
                </Button>
                <Button variant="text" color="primary">
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};
