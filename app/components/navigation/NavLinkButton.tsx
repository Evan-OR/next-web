'use client';

import { ReactNode } from 'react';
import { Button, Link, styled, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

const NavButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const NavLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

type NavLinkButtonProps = {
    href: string;
    isNavButton: boolean;
    text?: string;
    children?: ReactNode;
};

const NavLinkButton = ({ href, text, isNavButton, children }: NavLinkButtonProps) => {
    const pathname = usePathname();
    const theme = useTheme();

    // Checking if button is active and not the main logo
    const color = href === pathname && text ? theme.palette.primary.main : 'inherit';
    return (
        <NavLink href={href} style={{ color: color }}>
            {isNavButton ? (
                <NavButton variant="text" color="inherit" disableRipple>
                    {text}
                </NavButton>
            ) : (
                children
            )}
        </NavLink>
    );
};

export default NavLinkButton;
