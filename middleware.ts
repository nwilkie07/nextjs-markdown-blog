// Temporarily disabled for debugging
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     // This function runs after authentication is verified
//     return;
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Allow access to auth-related paths without authentication
//         const publicPaths = ['/auth/signin', '/auth/error', '/api/auth'];
//         const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));
//         
//         if (isPublicPath) {
//           return true;
//         }
//         
//         // Require authentication for all other paths
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api/auth (auth API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - auth (auth pages)
//      */
//     "/((?!api/auth|_next/static|_next/image|favicon.ico|auth).*)",
//   ],
// };

export default function middleware() {
  // Temporarily disabled
  return;
}

export const config = {
  matcher: [],
};
