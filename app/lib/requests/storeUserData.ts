import { USER_COOKIE, USER_HEADERS } from '@/auth/constants';
import { fetchUserImageBlob } from '@/auth/utils/authUtils';
import { MSUserData } from '@/types/types';
import Cookies from 'js-cookie';

const storeUserData = async (userData: MSUserData) => {
  const authToken = Cookies.get(USER_COOKIE.RestAuth);

  const req = await fetch('http://localhost:3002/user/', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...(userData && { [USER_HEADERS.X_Data]: userData }),
    },
    body: JSON.stringify({ userData }),
  });
  const res = await req.json();

  // create profilePic image?
  const imgBlob = await fetchUserImageBlob();

  const formData = new FormData();
  formData.append('image', imgBlob!, 'upload.jpg');
  formData.append('email', userData.mail);

  const req2 = await fetch('http://localhost:3002/images', {
    method: 'POST',
    headers: {},
    body: formData,
  });

  const { url } = await req2.json();
  console.log(url);

  return res;
};

export default storeUserData;
