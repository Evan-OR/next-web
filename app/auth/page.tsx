'use client';

import { Stack, Typography, Button, NoSsr } from '@mui/material';
import { handleLogin, handleLogout } from './utils/authUtils';
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { instance } = useMsal();
    // console.log(instance.getAllAccounts()[0]);
    const router = useRouter();

    return (
        <Stack gap={2} sx={{ width: '300px' }}>
            <Typography variant="h5">Sign up using NCI email</Typography>
            {/* <img src={'/NCI_Logo.png'} /> */}
            <NoSsr>
                {instance.getActiveAccount() ? (
                    <Button onClick={() => handleLogout(instance, router)}>Log out</Button>
                ) : (
                    <Button onClick={() => handleLogin(instance, router)}>Sign in with Microsoft</Button>
                )}
            </NoSsr>
        </Stack>
    );
};

export default Login;
