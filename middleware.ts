import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TOKEN_KEY = process.env.TOKEN_KEY!;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.method !== 'OPTIONS') {
    const authHeader = request.headers.get('Authorization') || '';
    const [_, token] = authHeader.split('Bearer ');

    if (!token) {
      return NextResponse.rewrite(
        new URL('/api/error/unauthorized', request.url)
      );
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(TOKEN_KEY));
      return response;
    } catch (err) {
      return NextResponse.rewrite(
        new URL('/api/error/unauthorized', request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/api/location/:path*',
    '/api/stocks/:path*',
    '/api/weather/:path*',
    '/api/chat',
    '/api/music',
    '/api/unlock'
  ]
};
