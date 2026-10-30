# The A/B split

The new page never replaces the old one directly. Middleware decides an arm on the first request for `/`, keeps the visitor there with a cookie, and serves arm b by rewriting `/` to the hidden route. The address bar, canonical and every link stay `/`.

## Pieces (copy from `kit/next/`)

1. `home-variant.ts`: `homeBShare()` reads the share env (0 to 100, default 50), `pickHomeVariant(cookie, share, rand)` returns the arm and whether to write the cookie, `homeVariantCookieDomain(host)` scopes the cookie to the parent domain so the app subdomain can read it, `readHomeVariant()` reads it in the browser. Rename the cookie per site (`hdl_home`, `flm_home`, ...).
2. `home-variant.test.ts`: the share edges (0 ends the test and ignores the cookie, 100 ships b and rewrites old a cookies, junk values fall back).
3. `middleware-snippet.ts`: the `/` rewrite and the 307 from the direct hidden path back to `/`. On Next 16 the file is `proxy.ts` and the export is `proxy`, same body.
4. Analytics, in arm b's client root:
   - `registerSuperProps({ home_variant: "b" })` and `capture("home_ab_exposed", { home_variant: "b" })`
   - arm a does the same with "a"
   - onboarding (or the install click, or the booking) registers the super prop from the cookie, so every downstream event carries the arm
5. A saved funnel: `home_ab_exposed` then the box submit then the step that matters, broken down by `home_variant`.

## Switches

- `HOME_B_SHARE=0` ends the test, everyone gets arm a.
- `HOME_B_SHARE=100` ships arm b and moves arm-a cookies over.
- Changing it needs a redeploy.

## Reading it

- At about a week: check exposure is near the share, then the funnel by arm, then ten replays per arm.
- Call it at 3 to 4 weeks on small traffic, on the step that matters, not on box clicks.
- When b wins: move arm b to the real route, delete arm a, keep the cookie code for the next test.
