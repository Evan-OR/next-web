import { IPublicClientApplication } from '@azure/msal-browser';
import { USER_COOKIE } from '../constants';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { loginRequest } from './msalConfig';
import Cookies from 'js-cookie';
import { graphUserData, graphProfilePic } from './graph';
import storeUserData from '@/lib/requests/storeUserData';

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

    const MSUserData = await graphUserData(tokenRes.accessToken);

    // Setting user auth cookie
    Cookies.set(USER_COOKIE.GraphAuth, tokenRes.accessToken);
    Cookies.set(USER_COOKIE.RestAuth, res.account.idToken || '');

    try {
      const res = await storeUserData(MSUserData);
      Cookies.set(USER_COOKIE.Data, JSON.stringify(res['userData']));
    } catch {
      console.error('Failed to store user information!');
    }

    router.push('/');
    router.refresh();
  }
};

export const handleLogout = async (instance: IPublicClientApplication, router: AppRouterInstance) => {
  const res = await instance.logoutPopup();
  console.log('logout res: ', res);
  await instance.clearCache();

  Cookies.remove(USER_COOKIE.GraphAuth);
  Cookies.remove(USER_COOKIE.RestAuth);
  Cookies.remove(USER_COOKIE.Data);

  router.push('/');
  router.refresh();
};

export const fetchUserImageBlob = async () => {
  const authCookie = Cookies.get(USER_COOKIE.GraphAuth);
  let imageUrl = null;

  if (authCookie) {
    const { blob } = await graphProfilePic(authCookie);
    imageUrl = blob;
  }

  return imageUrl;
};
