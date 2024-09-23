import { Avatar, Box, Button, Link, styled, Typography } from '@mui/material';
import useActiveAccount from '../../hooks/useActiveAccount';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';

const NavLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

const NavAccountDisplay = () => {
    const { instance } = useMsal();
    const user = useActiveAccount();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return user ? (
        <Box display={'flex'} alignItems={'center'} gap={1}>
            <Avatar alt={user.name} />
            <Typography variant="body1">{user.name}</Typography>
            <Button onClick={() => instance.logoutPopup()}>Log out</Button>
        </Box>
    ) : (
        <>
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
        </>
    );
};

export default NavAccountDisplay;
