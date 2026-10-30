/**
 * home-variant.ts - the homepage A/B (one-box-chapters kit, from gethandler.ai 2026-10-28).
 *
 * Arm "a" is the homepage as it was. Arm "b" is the chapter homepage in src/app/home-b. The middleware
 * assigns a visitor to an arm on their first request for `/`, keeps them there with a sticky
 * cookie, and serves arm b by rewriting `/` to /home-b - so the address bar, the canonical
 * and every link stay `/` in both arms. /home-b itself is never reachable directly.
 *
 * HOME_B_SHARE (Vercel env, "0" to "100", default 50) is the percent of NEW visitors sent to
 * arm b. "0" ends the test: everyone gets arm a and the cookie is ignored. "100" ships b.
 * Changing it needs a redeploy.
 *
 * The cookie is scoped to the parent domain (SITE_DOMAIN) so an app subdomain can tag its
 * onboarding events with the arm. Rename HOME_VARIANT_COOKIE per site (hdl_home, flm_home).
 */

export type HomeVariant = "a" | "b";

export const HOME_VARIANT_COOKIE = "site_home";
export const HOME_VARIANT_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
export const HOME_B_PATH = "/home-b/";

const DEFAULT_B_SHARE = 50;

/** Percent (0-100) of new visitors sent to arm b. Anything unparseable falls back to 50. */
export function homeBShare(raw: string | undefined = process.env.HOME_B_SHARE): number {
  if (raw === undefined || raw.trim() === "") return DEFAULT_B_SHARE;
  const n = Number(raw);
  if (!Number.isFinite(n)) return DEFAULT_B_SHARE;
  return Math.min(100, Math.max(0, n));
}

/**
 * The arm for this request. A valid cookie wins while the test runs; otherwise `rand` (0-1)
 * decides and `fresh` says the cookie needs writing. With share 0 the test is off: arm a,
 * nothing written.
 */
export function pickHomeVariant(
  cookie: string | undefined,
  share: number,
  rand: number,
): { variant: HomeVariant; fresh: boolean } {
  if (share <= 0) return { variant: "a", fresh: false };
  if (share >= 100) return { variant: "b", fresh: cookie !== "b" };
  if (cookie === "a" || cookie === "b") return { variant: cookie, fresh: false };
  return { variant: rand * 100 < share ? "b" : "a", fresh: true };
}

/** Set to the site's apex domain. */
export const SITE_DOMAIN = "example.com";

/** `.example.com` on the real hosts (so an app subdomain can read it), no domain elsewhere. */
export function homeVariantCookieDomain(host: string | null | undefined): string | undefined {
  const h = (host ?? "").split(":")[0].toLowerCase();
  return h === SITE_DOMAIN || h.endsWith(`.${SITE_DOMAIN}`) ? `.${SITE_DOMAIN}` : undefined;
}

/** The visitor's arm from the cookie, or null when they never landed on `/` during the test. */
export function readHomeVariant(): HomeVariant | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${HOME_VARIANT_COOKIE}=(a|b)(?:;|$)`));
  return match ? (match[1] as HomeVariant) : null;
}
