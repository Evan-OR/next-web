'use client';

import { TextField, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { validateEmail, validatePassword, validateUsername } from './authUtils';
import SignInButton from '../components/SignInButton';
import { useMsal } from '@azure/msal-react';
import { callMsGraph } from './utils/graph';
import { loginRequest } from './utils/msalConfig';

const Login = () => {
    // const { instance, accounts } = useMsal();
    // console.log('accounts: ', accounts[0]);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    const [graphData, setGraphData] = useState(null);

    const [formErrors, setFormErrors] = useState({
        email: '',
        username: '',
        password: '',
    });

    const onSubmit = () => {
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        const errors = {
            email: validateEmail(email),
            username: validateUsername(username),
            password: validatePassword(password, confirmPassword),
            confirmPassword: validatePassword(confirmPassword, password),
        };

        setFormErrors(errors);
    };

    // console.log(formErrors);
    // const RequestProfileData = async () => {
    //     // Silently acquires an access token which is then attached to a request for MS Graph data
    //     await instance.initialize();
    //     instance.setActiveAccount(accounts[0]);
    //     if (!instance.getActiveAccount()) return;

    //     instance
    //         .acquireTokenSilent({
    //             ...loginRequest,
    //             account: accounts[0],
    //         })
    //         .then((response) => {
    //             console.log(response.accessToken);
    //             callMsGraph(response.accessToken).then((response) => setGraphData(response));
    //         });
    // };

    // useEffect(() => {
    //     RequestProfileData();
    // }, []);

    // useEffect(() => {
    //     console.log(graphData);
    // }, [graphData]);

    return (
        <Stack gap={2} sx={{ width: '300px' }}>
            <Typography variant="h5">Sign up using NCI email</Typography>
            <TextField
                error={!!formErrors.email}
                helperText={formErrors.email}
                inputRef={emailRef}
                label="Email"
                required
            ></TextField>
            {/* <TextField
                error={!!formErrors.username}
                helperText={formErrors.username}
                inputRef={usernameRef}
                label="Username"
                required
            ></TextField> */}
            <TextField
                error={!!formErrors.password}
                helperText={formErrors.password}
                inputRef={passwordRef}
                type="password"
                label="Password"
                required
            ></TextField>
            <TextField
                error={!!formErrors.password}
                helperText={formErrors.password}
                inputRef={confirmPasswordRef}
                type="password"
                label="Confirm password"
                required
            ></TextField>

            <SignInButton />
        </Stack>
    );
};

export default Login;
