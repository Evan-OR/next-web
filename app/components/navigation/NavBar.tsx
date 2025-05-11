import { Box, Divider, Typography } from '@mui/material';
import NavAccountDisplay from './NavAccountDisplay';
import NavLinkButton from './NavLinkButton';

export const NavBar = () => {
  return (
    <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} p={1} width={'100%'} minHeight={'68px'}>
      <Box>
        <NavLinkButton href="/" isNavButton={false}>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" width={'40px'}>
              <path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
            </svg>
            <Typography variant="h5">
              Stream<b>Sell</b>
            </Typography>
          </Box>
        </NavLinkButton>
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={3}>
        <NavLinkButton href="/" text="Home" isNavButton></NavLinkButton>
        <NavLinkButton href="/streams" text="Streams" isNavButton></NavLinkButton>

        <Divider orientation="vertical" flexItem />

        <NavAccountDisplay />
      </Box>
    </Box>
  );
};
