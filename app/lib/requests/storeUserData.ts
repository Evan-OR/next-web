import { USER_COOKIE, USER_HEADERS } from '@/auth/constants';
import { MSUserData } from '@/types/types';
import Cookies from 'js-cookie';

const storeUserData = async (userData: MSUserData) => {
  const authToken = Cookies.get(USER_COOKIE.RestAuth);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/user/';
  const req = await fetch(API_URL, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...(userData && { [USER_HEADERS.X_Data]: userData }),
    },
    body: JSON.stringify({ userData }),
  });
  const res = await req.json();
  return res;
};

export default storeUserData;
