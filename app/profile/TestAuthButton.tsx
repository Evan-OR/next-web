'use client';

import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { USER_COOKIE, USER_HEADERS } from '../auth/constants';

export const TestAuthButton = () => {
    const authToken = Cookies.get(USER_COOKIE.RestAuth);
    const userData = Cookies.get(USER_COOKIE.Data);
    console.log('userData: ', userData);

    const fetchEndPoint = async () => {
        const res = await fetch('http://localhost:3002/auth/test', {
            headers: {
                Authorization: `Bearer ${authToken}`,
                ...(userData && { [USER_HEADERS.X_Data]: userData }),
            },
        });
        const jsonRes = await res.json();

        console.log(jsonRes);
    };

    return <Button onClick={fetchEndPoint}>Test Auth</Button>;
};
