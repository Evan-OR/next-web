'use client';

import React from 'react';
import ProfilePicture from './ProfilePicture';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMsal } from '@azure/msal-react';
import { handleLogout } from '@/app/auth/utils/authUtils';

type NavLoggedInAccountProps = {
    username: string;
};

const NavButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

export const NavLoggedInAccount = ({ username }: NavLoggedInAccountProps) => {
    const router = useRouter();
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const profile = () => {
        router.push('/profile');
        handleClose();
    };

    const logout = async () => {
        await handleLogout(instance, router);
        handleClose();
    };

    return (
        <div>
            <NavButton onClick={handleClick} color="inherit">
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    <ProfilePicture />
                    {username}
                </Box>
            </NavButton>
            <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={profile}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};
