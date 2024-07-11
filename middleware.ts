export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/users/:path*",
    "/dashboard",
    "/app/:path*",
    "/other/:path*",
    "/help/:path*",
  ],
};
