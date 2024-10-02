export const REGISTRATION_ERRORS = {
    EMAIL: {
        ALREADY_IN_USE: 'Email already in use!',
        NOT_NCI_EMAIL: 'Please use NCI email!',
        INVALID: 'Please use a valid email!',
    },
    USERNAME: {},
    PASSWORD: {
        TOO_SHORT: 'Password must be at least 8 characters in length!',
        NOT_THE_SAME: 'Passwords must be the same!',
    },
    REQUIRED: 'Required',
};

export const USER_COOKIE = {
    RestAuth: 'userRestAuth',
    GraphAuth: 'userGraphAuth',
    Data: 'userData',
    ProfilePic: 'pp',
};

export const USER_HEADERS = {
    X_Data: 'x-user-data',
};
