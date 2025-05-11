import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/auth/constants';
import { User } from '@/types/types';
import { Box, Divider, Paper, Typography } from '@mui/material';
import ProfilePicture from '@/components/navigation/ProfilePicture';
import PorfileInfoDisplay from '@/components/profile/PorfileInfoDisplay';
import CompletedBid from '@/components/CompletedBid';

const ProfilePage = async () => {
  const cookiesList = cookies();
  const cookieValue = cookiesList.get(USER_COOKIE.Data)?.value;
  const userData: User | null = cookieValue ? JSON.parse(cookieValue) : null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const padding = 2;

  const formatData = ({ givenName, surname, username, isSeller, wallet, mail, registration_date }: User) => {
    return {
      givenName,
      surname,
      username,
      isSeller,
      wallet,
      email: mail,
      registrationDate: registration_date,
    };
  };

  const getData = async () => {
    const requestURL = `${API_URL}bids/${userData?._id || ''}`;
    const res = await fetch(requestURL);

    const data = await res.json();

    return data;
  };

  const previousCompletedBids = await getData();

  return userData ? (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <Paper variant="outlined" sx={{ width: '500px' }}>
        <Box display={'flex'} flexDirection={'column'} p={padding}>
          <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
            <ProfilePicture
              styles={{ width: '100px', height: 'auto', border: 'solid 2px white' }}
              email={userData.mail}
            />

            {Object.entries(formatData(userData)).map(([key, value]) => (
              <PorfileInfoDisplay keyName={key} value={value} />
            ))}
          </Box>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ width: '500px' }}>
        <Box p={padding}>
          <Box>
            <Typography variant="h5">Completed Purchases</Typography>
          </Box>
          <Box mt={2}>
            {previousCompletedBids.map((bid: any, i: number) => (
              <Box>
                <CompletedBid bid={bid} />
                {i < previousCompletedBids.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  ) : (
    <div>No User Data</div>
  );
};

export default ProfilePage;
