import { USER_COOKIE, USER_HEADERS } from '@/auth/constants';
import Cookies from 'js-cookie';

const storeUserData = async () => {
  const authToken = Cookies.get(USER_COOKIE.RestAuth);
  const userData = Cookies.get(USER_COOKIE.Data);

  const req = await fetch('http://localhost:3002/user/', {
    method: 'Post',
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...(userData && { [USER_HEADERS.X_Data]: userData }),
    },
    body: JSON.stringify({ userData }),
  });
  const res = await req.json();
  console.log(res);
};

export default storeUserData;
