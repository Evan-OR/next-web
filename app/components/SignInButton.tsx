import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        const res = await instance.loginPopup({
            scopes: ['openid', 'profile', 'User.Read'],
        });

        if (res && res.account) {
            console.log('SETTING ACTIVE ACCOUNT');
            instance.setActiveAccount(res.account);
        }
    };

    return <Button onClick={handleLogin}>Sign in with Microsoft</Button>;
};

export default SignInButton;
