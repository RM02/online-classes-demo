import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(req) {

    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    if (!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = '/account'
        url.search = `login=true`
        
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/courses'],
}