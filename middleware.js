import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/forum(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Exclude Clerk's API routes from middleware
  if (req.nextUrl.pathname.startsWith('/api/clerk')) {
    return; // Allow Clerk's internal API routes to proceed
  }

  // Protect routes defined in isProtectedRoute
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip internal paths, static files, and Clerk's API routes
    '/((?!_next|api/clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (except Clerk's internal routes)
    '/(api|trpc)(.*)',
  ],
};
