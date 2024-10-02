'use client';

import { ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import React from 'react';
import { msalConfig } from './msalConfig';

const pca = new PublicClientApplication(msalConfig);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return <MsalProvider instance={pca}>{children}</MsalProvider>;
};
