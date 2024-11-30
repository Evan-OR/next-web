import { Box, Divider, Typography } from '@mui/material';
import NavAccountDisplay from './NavAccountDisplay';
import NavLinkButton from './NavLinkButton';

export const NavBar = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
            p={1}
            width={'100%'}
            minHeight={'68px'}
        >
            <Box>
                <NavLinkButton href="/" isNavButton={false}>
                    <Typography variant="h5">
                        Stream<b>Sell</b>
                    </Typography>
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
