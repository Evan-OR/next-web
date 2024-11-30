'use client';

import { ReactNode } from 'react';
import { Button, Link, styled } from '@mui/material';

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
  return (
    <NavLink href={href}>
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
