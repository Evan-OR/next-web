'use client';

import { Box, Button, Divider, Link, styled, Typography } from '@mui/material';
import NavAccountDisplay from './NavAccountDisplay';

const NavButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const NavLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

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

                <NavAccountDisplay />
            </Box>
        </Box>
    );
};
