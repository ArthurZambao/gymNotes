import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// No Next.js 16, o 'proxy' funciona como um porteiro entre a requisição e a página
export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isHomePage = pathname === '/home' || pathname === '/';

  // Lógica de Redirecionamento
  if (isHomePage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

// O matcher continua sendo exportado separadamente
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};