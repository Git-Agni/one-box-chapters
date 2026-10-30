# Worked example: gethandler.ai, October 2026

Next.js App Router. Arm b lives in `src/app/home-b/`, served at `/` by `src/middleware.ts`. Shipped as an A/B on 2026-10-28, review fixes the same day.

## Where it came from

It started from a phoneuse.com teardown on X and one question: what could Handler take from it? What carried over: a page that runs the product in front of you, a scan-first hero, chapters that read like a story instead of a feature grid. What did not: their device farm theatre.

## The chapters

| Chapter | What happens on screen |
| --- | --- |
| Hero | H1 "TikTok agent for app makers", display line "Your app's next winner is already on TikTok.", question H2 + definition, the scan box. Stage on the right runs a live scan over real niches. |
| Baseline | Real posts from the library at their normal views, so "outlier" has a reference point. |
| Turn | One niche flips: the outlier lights up against its baseline. |
| Teardown | One real outlier gets taken apart: hook, format, why it worked. |
| Dupe wipe | The outlier turns into a script for your app (step 3 got extra motion after review). |
| Compare | Price tape against the other tools, "* As advertised on each tool's own site." |
| Plug in | Where Handler sits in your week: picks, chat, scripts. |
| Pricing, FAQ, Finale, Media band | Reused components. Finale repeats the box. The Media band offers the done-for-you service on its own line. |

## The founder's review notes, in order

Round 1 (sample at /preview/feed):
1. The small "TikTok agent for app makers" line is the H1.
2. Declutter the hero to description, box, and "Your first 6 picks are one free scan away." under it. Remove "No credit card" and "No link handy".
3. Remove the phone farm chapter entirely. It dilutes and confuses.
4. Run it as an A/B against the current homepage.
5. Make sure the page is light.

Round 2 (live in arm b):
1. Button says "Scan free". The picks line is centered under the box.
2. Move the hero up so the scan button is visible on load.
3. Phone: center everything, more side padding.
4. Sections were taller than the screen. Tighten them.
5. "Dupe the one you like" needs more happening.
6. The compare tape was clipped. Keep the asterisk line, drop the date.
7. "Let Agniverse Media handle it" goes on its own line.

Round 3:
1. On desktop the hero copy should sit a bit lower, more centered against the stage.

## Results to compare against

- Weight on a throttled phone: arm b about 800 KB, LCP about 0.6 s. Arm a about 1.6 MB, LCP about 1.1 s. The first paint was late until chapters got `content-visibility: auto`.
- On a small site only big differences show. Plan 3 to 4 weeks.
- The funnel review after launch found the real leaks were after signup (early paywalls, dead ends), fixed the next day. The homepage is one step, read the whole funnel.

## Gotchas from this build

- Vercel's Ignored Build Step cancelled every PR preview, so review ran on local screenshots and then on the live arm.
- A repo path with an emoji in it broke the build. Build from an ASCII path.
- Never `pkill -f` a pattern that matches your own shell command.
