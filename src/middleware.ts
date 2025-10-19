import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"



export async function middleware(request: NextRequest){
    const token = await getToken({req:request, secret: process.env.NEXTAUTH_SECRET});
    const url = request.nextUrl
    // console.log("url => ", url);

    if(token &&
        (
            url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/verify')
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if(!token && url.pathname.startsWith('/dashboard') ){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next();
}
 

// kon kon se path pr middleware run krna h
export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/verify',
        // '/dashboard/:path*',
        '/verify/:path*'
    ],
}