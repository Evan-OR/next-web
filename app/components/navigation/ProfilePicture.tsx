import { Avatar } from '@mui/material';

const ProfilePicture = ({ email }: any) => {
  const iamgeUrl = `https://livebiddingprojectimages.blob.core.windows.net/images/${email}`;

  return iamgeUrl ? <Avatar src={iamgeUrl} /> : <Avatar alt={''} />;
};

export default ProfilePicture;
