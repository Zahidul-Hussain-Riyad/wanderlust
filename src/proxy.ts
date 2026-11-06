import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    }) 
    console.log(session);
    const user = session?.user;
    if(!user) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }
    console.log(user);
}



export const config = {
  matcher: [
    '/add-destination', 
    '/my-bookings', 
    '/destination/:path'
  ],
}