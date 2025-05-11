import { Box } from '@mui/material';
import React from 'react';

const PorfileInfoDisplay = ({ keyName, value }: { keyName: string; value: any }) => {
  const propertyNameMap = {
    givenName: (v: any) => ['First Name', v],
    surname: (v: any) => ['Last Name', value],
    username: (v: any) => ['Username', value],
    wallet: (v: any) => ['Wallet', value],
    email: (v: any) => ['Email', value],
    registrationDate: (v: any) => ['Sign Up Date', new Date(value).toLocaleDateString()],
    isSeller: (v: any) => ['Seller', value.toString()],
  };

  const [formattedKey, formattedValue] = propertyNameMap[keyName as keyof typeof propertyNameMap](value);

  return (
    <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
      <div>{formattedKey}</div>
      <div>{formattedValue}</div>
    </Box>
  );
};

export default PorfileInfoDisplay;
