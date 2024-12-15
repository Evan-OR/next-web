import { Button } from '@mui/material';
import NavLinkButton from './NavLinkButton';
import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/auth/constants';
import { User } from '@/types/types';
import { NavLoggedInAccount } from './NavLoggedInAccount';

const NavAccountDisplay = async () => {
  const headersList = cookies();
  const userDataCookie = headersList.get(USER_COOKIE.Data)?.value;
  const userData: User = userDataCookie ? JSON.parse(userDataCookie) : undefined;

  return userData ? (
    <NavLoggedInAccount userData={userData} />
  ) : (
    <>
      <NavLinkButton href="/auth" isNavButton={false}>
        <Button variant="text" color="primary">
          Login
        </Button>
      </NavLinkButton>
    </>
  );
};

export default NavAccountDisplay;
