import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const accessCookie = request.cookies.get("access_cookie");
    const cookie_value = accessCookie?.value;
    const url = request.nextUrl.clone();

    if (url.pathname === '/') {
        url.pathname = '/home';
        return NextResponse.redirect(url);
    }


    if (url.pathname.startsWith("/admin/dashboard")) {

        let is_admin;

        // if (!cookie_value) {
        //     url.pathname = "/pages/auth/signin";
        //     return NextResponse.redirect(url);
        // }
        
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}users/get-user/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie_value}`
                }
            });

            is_admin = response.data.user?.super_user;
            console.log("is admin", is_admin)

            if (!response.data.user.super_user) {
                return NextResponse.redirect(new URL('/home', request.url));
            }

            return NextResponse.next();

        } catch (error) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/admin/dashboard/:path*'
    ],
};