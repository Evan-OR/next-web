import { REGISTRATION_ERRORS } from './constants';

const emailRegx =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const nciRegex = /ncirl\.ie/;

export const validateEmail = (email: string | undefined): string => {
    if (!email) return REGISTRATION_ERRORS.REQUIRED;
    if (!nciRegex.test(email)) return REGISTRATION_ERRORS.EMAIL.NOT_NCI_EMAIL;
    if (!emailRegx.test(email)) return REGISTRATION_ERRORS.EMAIL.INVALID;
    return '';
};

export const validatePassword = (password: string | undefined, confirmPassword: string | undefined): string => {
    if (!password) return REGISTRATION_ERRORS.REQUIRED;
    if (password !== confirmPassword) return REGISTRATION_ERRORS.PASSWORD.NOT_THE_SAME;
    return '';
};

export const validateUsername = (username: string | undefined): string => {
    if (!username) return REGISTRATION_ERRORS.REQUIRED;
    return '';
};
