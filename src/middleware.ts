import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';
import { locales, getLocale } from './middleware/i18n';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url));
    }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|vercel.svg|next.svg|fonts/|share/|branding/|troncodrilo-game|game_assets/|game-index.js).*)",
  ],
};