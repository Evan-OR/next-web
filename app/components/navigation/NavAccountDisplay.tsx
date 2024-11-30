import { Button } from '@mui/material';
import NavLinkButton from './NavLinkButton';
import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/app/auth/constants';
import { UserData } from '@/app/types/types';
import { NavLoggedInAccount } from './NavLoggedInAccount';

const NavAccountDisplay = async () => {
    const headersList = cookies();
    const userDataCookie = headersList.get(USER_COOKIE.Data)?.value;
    const userData: UserData = userDataCookie ? JSON.parse(userDataCookie) : undefined;

    const username = userData ? userData.givenName : '';

    return username ? (
        <NavLoggedInAccount username={username} />
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
