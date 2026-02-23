/**
 * Next.js Middleware — runs on the Edge before every matched request.
 * Protects routes and handles auth redirects.
 */

import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
    "/dashboard",
    "/profile",
    "/teams",
    "/matches/create",
    "/settings",
    "/notifications",
    "/search",
    "/user",
];

const authRoutes = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    // Protected routes → must be logged in
    const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
    if (isProtected && !token) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Auth routes → already logged in → redirect to home
    const isAuthRoute = authRoutes.some((p) => pathname.startsWith(p));
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/teams/:path*",
        "/matches/create",
        "/settings/:path*",
        "/notifications/:path*",
        "/search/:path*",
        "/user/:path*",
        "/auth/login",
        "/auth/signup",
    ],
};
