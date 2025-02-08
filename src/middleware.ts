"use client";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const protectedRoutes: Record<string, string[]> = {
  student: ["/dashboard", "/user/leave", "/user/leavestatus"],
  faculty: ["/dashboard", "/user/manage"],
  admin: ["/dashboard", "/admin", "/user/admin", "/user/manage"],
};
const commonRoutes = ["/dashboard", "/profile", "/logout"]; //protected
const authRoutes = ["/login", "/register", "/password/forgetpassword"];
const publicRoutes = ["/logout"];

export default async function middleware(req: NextRequest) {
  const token = await req.cookies.get("jwt")?.value;
  console.log(token)
  const nextUrlPath = req.nextUrl.pathname;

  if (nextUrlPath.startsWith("/api")) {
    return NextResponse.next();
  }

  if (nextUrlPath.startsWith("/_next/") || nextUrlPath.startsWith("/.next/")) {
    return NextResponse.next();
  }

  if (
    publicRoutes.some((route) =>
      new RegExp(`^${route}(?:/|$)`).test(nextUrlPath)
    )
  ) {
    return NextResponse.next();
  }

  if (authRoutes.some((route) => nextUrlPath.startsWith(route))) {
    if (token) {
      try {
        const secretKey = process.env.SECRETKEY;
        const secretBytes = new TextEncoder().encode(secretKey);
        const { payload } = (await jose.jwtVerify(token, secretBytes)) as {
          payload: { data: { role: string; _id: string } };
        };
        const role: string = payload?.data?.role;
        const userProtectedRoutes = protectedRoutes[role] || [];

        const dashboardURL = new URL(
          userProtectedRoutes[0] || "/dashboard",
          req.nextUrl.origin
        );
        return NextResponse.redirect(dashboardURL.toString());
      } catch (error) {
        console.error("Token verification failed:", error);
        const response = NextResponse.redirect(
          new URL("/login", req.nextUrl.origin)
        );
        response.cookies.delete("jwt");
        return response;
      }
    }
    return NextResponse.next();
  }

  const allProtectedRoutes = [
    ...Object.values(protectedRoutes).flat(),
    ...commonRoutes,
  ];

  if (
    allProtectedRoutes.some((route) =>
      new RegExp(`^${route}(?:/|$)`).test(nextUrlPath)
    )
  ) {
    if (!token) {
      const loginURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(loginURL.toString());
    }
    try {
      const secretKey = process.env.SECRETKEY;
      const secretBytes = new TextEncoder().encode(secretKey);
      const { payload } = (await jose.jwtVerify(token, secretBytes)) as {
        payload: { data: { role: string; _id: string } };
      };
      const role = payload?.data?.role;

      const userProtectedRoutes = protectedRoutes[role] || [];
      const allUserProtectedRoutes = [...commonRoutes, ...userProtectedRoutes];
      

      if (
        !allUserProtectedRoutes.some((route) =>
          new RegExp(`^${route}(?:/|$)`).test(nextUrlPath)
        )
      ) {
        const dashboardURL = new URL(
          allUserProtectedRoutes[0] || "/dashboard",
          req.nextUrl.origin
        );
        return NextResponse.redirect(dashboardURL.toString());
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/login", req.nextUrl.origin)
      );
      response.cookies.delete("jwt");
      return response;
    }
  }

  return NextResponse.next();
}
