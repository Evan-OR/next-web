'use client';

import { Box, Button, Divider, styled, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const NavButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const NavLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
}));

export const NavBar = () => {
    return (
        <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} p={3} width={'100%'}>
            <Box>
                <NavLink href={'/'} style={{ color: 'inherit' }}>
                    <Typography variant="h5">
                        Stream<b>Sell</b>
                    </Typography>
                </NavLink>
            </Box>
            <Box display={'flex'} gap={3}>
                <NavLink href={'/'}>
                    <NavButton variant="text" color="inherit" disableRipple>
                        Home
                    </NavButton>
                </NavLink>

                <NavLink href={'/streams'}>
                    <NavButton variant="text" color="inherit" disableRipple>
                        Streams
                    </NavButton>
                </NavLink>

                <Divider orientation="vertical" flexItem />

                <NavLink href={'/auth'}>
                    <Button variant="text" color="primary">
                        Login
                    </Button>
                </NavLink>

                <NavLink href={'/auth'}>
                    <Button variant="text" color="primary">
                        Sign Up
                    </Button>
                </NavLink>
            </Box>
        </Box>
    );
};
