'use client';

import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { USER_COOKIE } from '../auth/constants';

export const TestAuthButton = () => {
    const fetchEndPoint = async () => {
        const accessToken = Cookies.get(USER_COOKIE.Auth);

        const res = await fetch('http://localhost:3002/auth/test', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const jsonRes = await res.json();

        console.log(jsonRes);
    };

    return <Button onClick={fetchEndPoint}>Test Auth</Button>;
};
