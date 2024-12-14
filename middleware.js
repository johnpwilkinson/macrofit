import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

function addCustomHeaders(request) {
  const { pathname } = request.nextUrl;

  // Add custom header for /nutrition route
  if (pathname.startsWith("/nutrition")) {
    const response = NextResponse.next();
    response.headers.set(
      "x-custom-data",
      JSON.stringify({
        section: "nutrition",
        crumbDecoration: "Active Nutrition Plan",
      })
    );
    return response;
  }
  if (pathname.startsWith("/fitness")) {
    const response = NextResponse.next();
    response.headers.set(
      "x-custom-data",
      JSON.stringify({
        section: "fitness",
        crumbDecoration: "Active Fitness Plan",
      })
    );
    return response;
  }
  if (pathname.startsWith("/logbook")) {
    const response = NextResponse.next();
    response.headers.set(
      "x-custom-data",
      JSON.stringify({
        section: "logbook",
        crumbDecoration: "",
      })
    );
    return response;
  }
  // For other routes, just pass through
  return NextResponse.next();
}

// export default function middleware(req) {
//   return withAuth(req);
// }
export default async function middleware(request) {
  // First, apply Kinde authentication
  const authResult = await withAuth(request);

  // If authentication failed or redirected, return that result
  if (authResult instanceof Response) {
    return authResult;
  }

  // If authentication passed, apply custom headers
  return addCustomHeaders(request);
}

export const config = {
  matcher: [
    "/nutrition",
    "/fitness",
    "/account",
    "/logbook",
    "/logbook/:path*",
  ],
};
