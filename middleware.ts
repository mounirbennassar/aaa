import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const STAFF_ROLES = ['ADMIN', 'MANAGER']

/**
 * Edge gate for the admin area. Every /admin/* route except the login page
 * requires a valid staff JWT; otherwise the user is redirected to the login
 * page with a callbackUrl. API routes enforce their own checks in-handler.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // The login page must stay public, otherwise unauthenticated users can't sign in.
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isStaff = typeof token?.role === 'string' && STAFF_ROLES.includes(token.role)

  if (!isStaff) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
