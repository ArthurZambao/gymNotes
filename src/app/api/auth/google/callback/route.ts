import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const refreshToken = searchParams.get('refreshToken');

  if (!token || !refreshToken) {
    return NextResponse.redirect(new URL('/login?error=google', request.url));
  }

  const isProduction = process.env.NODE_ENV === 'production';

  const response = NextResponse.redirect(new URL('/home', request.url));

  response.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    path: '/',
    maxAge: 60 * 15, // 15 minutes (match access token expiry)
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days (match refresh token expiry)
  });

  return response;
}
