import { graphConfig } from './msalConfig';

export const graphUserData = async (accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  const res = await fetch(graphConfig.meEndpoint, options);
  return res.json();
};

export const graphProfilePic = async (accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  const res = await fetch(graphConfig.profilePicEndpoint, options);
  const imageBlob = await res.blob();
  return { url: URL.createObjectURL(imageBlob), blob: imageBlob };
};
