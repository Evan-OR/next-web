import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { USER_COOKIE } from './app/auth/constants';

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();

    const cookieList = cookies();
    const userAuth = cookieList.get(USER_COOKIE.RestAuth)?.value;

    if (!userAuth) return NextResponse.redirect(new URL('/auth', req.url));

    return res;
};

export const config = {
    matcher: '/profile',
};
