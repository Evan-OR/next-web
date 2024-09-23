import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: '15626022-b08f-429e-a0de-b96baac8f346',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
};

export const loginRequest = {
    scopes: ['User.Read'],
};

export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
