import { IPublicClientApplication } from '@azure/msal-browser';
import { USER_COOKIE } from '../constants';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { loginRequest } from './msalConfig';
import Cookies from 'js-cookie';
import { graphUserData, graphProfilePic } from './graph';

export const handleLogin = async (instance: IPublicClientApplication, router: AppRouterInstance) => {
    const res = await instance.loginPopup({
        scopes: ['openid', 'profile', 'User.Read'],
    });

    if (res && res.account) {
        instance.setActiveAccount(res.account);

        const tokenRes = await instance.acquireTokenSilent({
            ...loginRequest,
            account: res.account,
        });

        const userData = await graphUserData(tokenRes.accessToken);

        // Setting user auth cookie
        Cookies.set(USER_COOKIE.Auth, tokenRes.accessToken);
        Cookies.set(USER_COOKIE.Data, JSON.stringify(userData));

        router.push('/');
        router.refresh();
    }
};

export const handleLogout = async (instance: IPublicClientApplication, router: AppRouterInstance) => {
    const res = await instance.logoutPopup();
    console.log('logout res: ', res);
    await instance.clearCache();

    Cookies.remove(USER_COOKIE.Auth);
    Cookies.remove(USER_COOKIE.Data);

    router.push('/');
    router.refresh();
};

export const fetchUserImageUrl = async () => {
    const authCookie = Cookies.get(USER_COOKIE.Auth);
    let imageUrl = '';

    if (authCookie) {
        imageUrl = await graphProfilePic(authCookie);
    }

    return imageUrl;
};