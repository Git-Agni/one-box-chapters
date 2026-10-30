/**
 * The homepage A/B block, lifted from gethandler.ai's src/middleware.ts.
 * Paste it into the site's middleware (Next 15) or proxy.ts (Next 16, export `proxy`).
 * `isPreviewHost` is whatever the site already uses to noindex preview deployments.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  HOME_B_PATH,
  HOME_VARIANT_COOKIE,
  HOME_VARIANT_MAX_AGE_SECONDS,
  homeBShare,
  homeVariantCookieDomain,
  pickHomeVariant,
} from "@/lib/home-variant";

export function homeSplit(request: NextRequest, isPreviewHost = false): NextResponse | null {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host");

  // Arm b is only ever served as `/`. A direct hit on the hidden path goes back to `/`
  // (307: the path may be reused once the test is over).
  if (pathname === "/home-b" || pathname.startsWith("/home-b/")) {
    const target = new URL(request.url);
    target.pathname = "/";
    const backRes = new NextResponse(null, { status: 307, headers: { location: target.toString() } });
    if (isPreviewHost) backRes.headers.set("X-Robots-Tag", "noindex, nofollow");
    return backRes;
  }

  if (pathname !== "/") return null;

  const share = homeBShare();
  const { variant, fresh } = pickHomeVariant(request.cookies.get(HOME_VARIANT_COOKIE)?.value, share, Math.random());
  const homeRes =
    variant === "b" ? NextResponse.rewrite(new URL(`${HOME_B_PATH}${search}`, request.url)) : NextResponse.next();
  if (fresh) {
    homeRes.cookies.set(HOME_VARIANT_COOKIE, variant, {
      path: "/",
      maxAge: HOME_VARIANT_MAX_AGE_SECONDS,
      sameSite: "lax",
      domain: homeVariantCookieDomain(host),
    });
  }
  if (isPreviewHost) homeRes.headers.set("X-Robots-Tag", "noindex, nofollow");
  return homeRes;
}
