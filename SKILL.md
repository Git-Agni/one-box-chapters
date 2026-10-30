---
name: one-box-chapters
description: Rebuild a product homepage or landing page the way the Handler homepage was rebuilt in October 2026 - a small H1 that says what the product is, ONE box in the hero that hands the visitor a free taste, then one-screen chapters that each show the product doing one thing, shipped as a sticky-cookie A/B against the old page under a page-weight budget, and judged by the funnel and replays afterwards. Use when asked to redesign or rebuild a product homepage or landing page, to "do the Handler treatment", when the request says "one box", "chapters" or "like the new Handler homepage", or when inspiration sites are handed over for a homepage. Not for blog posts, comparison pages (use aeo-comparison-pages) or app screens.
---

# One box, then chapters

The method behind gethandler.ai's new homepage (live as an A/B since 2026-10-28) and flamme.app's (since 2026-10-30). The page tells a visitor what the product is in one small line, lets them try it in one box, then walks them through one-screen chapters where something visibly happens in each. It never replaces the old page outright: it ships as a 50/50 split and the data decides.

Read `references/handler-case.md` for the worked example (and `references/flamme-case.md` for a second one) and every review note the founder gave. Read `references/ab-split.md` before wiring the test and `references/perf-budget.md` before you call it done. If a `LOCAL.md` sits next to this file (gitignored), read it first: it holds your own project ids, paths and habits.

## The order of work

1. **Read before you draw.** Scan the current homepage end to end (text, sections, what each one is for, page weight, LCP on a throttled phone). Scan the inspiration sites you were given. Pull the real data the page can show (product output, counts, proof) from the repo or API. Write down what the current page says that must survive: claims, FAQ, structured data, the canonical.
2. **Decide the box.** What can a visitor do in the hero that gives them something real before signup? Handler: paste your app link, get six TikTok picks. A couples app: answer tonight's question. A service: paste your URL, get a three-line teardown. If nothing can be tried, the box is the one primary action (store buttons, book a call) and the stage beside it shows the product running.
3. **Write the chapter list.** One chapter per thing the product does, in the order a new user meets it. Each gets a one-line title in the visitor's words and one moving demo. Cut any chapter that only says something instead of showing it.
4. **Build it as a sample on a hidden route** (`/home-b`, noindex while it is a preview, never in the sitemap or nav). Reuse the site's header, footer, FAQ, pricing and structured data. Do not fork them.
5. **Review in rounds with screenshots.** Desktop 1440x900 and phone 390x844, the first screen of each, plus a full-page shot. Send them to the owner. Number the changes they ask for and answer each one by number in the next round. Nothing visible ships before they approve it.
6. **Ship as an A/B, not a swap.** Middleware rewrite of `/` with a sticky cookie and a share env var. Exposure event plus a variant super property that follows the visitor into onboarding. See `references/ab-split.md` and `kit/`.
7. **Prove it is lighter.** Arm b must weigh no more than arm a and must not paint later. Put the before and after numbers in the PR.
8. **Read it afterwards.** At about a week, check the funnel by arm and watch ten replays per arm. Call the test at 3 to 4 weeks, or when one arm is clearly ahead on the step that matters (onboarding, install, booking), not on clicks.

## The hero

- **The H1 is the small line that says what it is.** "TikTok agent for app makers", not the slogan. The big line under it is display copy in a `<p>`.
- **The hero holds four things:** the H1, the display line, one short definition (a question H2 such as "What does X do for my app?" plus two sentences is good for GEO), and the box.
- **One line under the box, centered under it.** It says what the visitor gets ("Your first 6 picks are one free scan away."). No "No credit card", no "No link handy?", no second CTA.
- **The button is short and says the price:** "Scan free", "Get it free". Never "Get started".
- **The box and its button are visible on load** at 1440x900 and at 390x844. If they are not, move the hero up before anything else.
- **Desktop:** copy left, a live stage right (the product running on real data). Copy sits a little below the top of the stage, not flush with it.
- **Phone:** everything centered, generous side padding (at least 20px), the stage goes under the box.
- **If the current hero is already clean and loved, keep it** (Flamme, 2026-10-30). A box squeezed into a good hero makes the left column crowded. Keep the live art and copy, add at most one small live touch on the art, put a "Try ..." cue at the bottom of the hero, and make the box the first chapter. Show the owner the old hero next to the new one and let them decide.

## Chapters

- **Each chapter fits one screen** at 1440x900. If it does not fit, it is two chapters or it has too much in it.
- **Something happens in every chapter.** A count runs, a card flips, a cursor types, a before turns into an after. A static image with a caption is not a chapter. Step three of a three-step strip needs the most motion, because that is where the payoff is.
- **Use real data,** loaded server-side and revalidated (Handler: outlier library, hourly). Fake numbers get caught.
- **Claims carry an asterisk with the source in plain words and no date:** "* As advertised on each tool's own site." Comparison tapes must not clip on either breakpoint.
- **A long call to action breaks onto its own line** when it names a second offer ("Let Agniverse Media handle it" sits on the next line).
- **Close with:** pricing (reuse the site's component), FAQ (same entries as the structured data), a finale with the box again, and the footer.
- **No side quests.** Anything that dilutes the one story goes, even if it is cool (the Handler phone farm was removed: "it dilutes and confuses").

## Motion and weight

- Entrance animations move with `transform` only. Never animate the hero's `opacity` from 0, it delays LCP.
- Every chapter gets `content-visibility: auto` with a `contain-intrinsic-size`, so the browser paints the hero first.
- Respect `prefers-reduced-motion` (MotionConfig `reducedMotion="user"` plus a CSS kill switch).
- Pause loops that are off screen. No video autoplay above the fold. Images through the framework's image component with real `sizes`.
- Budget: arm b total transfer at or under arm a, LCP at or under arm a, on a throttled phone. Handler hit 800 KB / 0.6 s against 1.6 MB / 1.1 s.

## Copy

Cut AI tells from every visible line (an unslop-style pass). No em or en dashes. Keep the site's own words for claims that already rank. One idea per sentence.

## SEO and GEO must survive the swap

Arm b is served at `/` with the homepage's own canonical, Open Graph and structured data, and it is NOT noindex in production (a crawler in arm b is reading the homepage). The FAQ JSON-LD must match the FAQ on the page. The direct `/home-b` URL 307s back to `/`.

## Done means

- [ ] Sample approved round by round, numbered answers to each note
- [ ] Box and button visible on load, desktop and phone
- [ ] Every chapter fits one screen and moves
- [ ] A/B wired: cookie, share env, exposure event, variant super prop, funnel saved
- [ ] Perf numbers for both arms in the PR, arm b not heavier
- [ ] Canonical, OG, JSON-LD identical in both arms
- [ ] Unslop pass on every line
- [ ] A note somewhere durable with the test name, the share switch and the date to read it
