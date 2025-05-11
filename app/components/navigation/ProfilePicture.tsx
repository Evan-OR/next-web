import { Avatar } from '@mui/material';

const ProfilePicture = ({ email, styles = {} }: any) => {
  const iamgeUrl = `https://livebiddingprojectimages.blob.core.windows.net/images/${email}`;

  return iamgeUrl ? <Avatar src={iamgeUrl} style={{ ...styles }} /> : <Avatar alt={''} />;
};

export default ProfilePicture;
