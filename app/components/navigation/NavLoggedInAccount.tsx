'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProfilePicture from './ProfilePicture';
import { Box, Button, Menu, MenuItem, styled, Typography } from '@mui/material';
import { User } from '@/types/types';
import { useMsal } from '@azure/msal-react';
import { handleLogout } from '@/auth/utils/authUtils';

type NavLoggedInAccountProps = {
  userData: User;
};

const NavButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

export const NavLoggedInAccount = ({ userData }: NavLoggedInAccountProps) => {
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
      <NavButton color="inherit" onClick={(e) => handleClick(e)}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
          <ProfilePicture email={userData.mail} />
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
            <Typography variant="body1" lineHeight={1.2}>
              {userData.username}
            </Typography>
            <Typography variant="caption" lineHeight={1.2}>
              €{userData.wallet}
            </Typography>
          </Box>
        </Box>
      </NavButton>
      <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={profile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
