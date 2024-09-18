'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { validateEmail, validatePassword, validateUsername } from './authUtils';

const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

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

    useEffect(() => {
        console.log(formErrors);
    }, [formErrors]);

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

            <Button onClick={onSubmit} size="large">
                Sign Up
            </Button>
        </Stack>
    );
};

export default Login;
