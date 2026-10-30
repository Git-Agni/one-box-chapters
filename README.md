# One Box, Then Chapters

A free, open-source (MIT) Claude Code skill for rebuilding a product homepage: a small H1 that says what the product is, one box in the hero that lets a visitor try the product for free, then one-screen chapters that each show the product doing one thing. It ships as a sticky-cookie 50/50 A/B against your current homepage, under a page-weight budget, so the data picks the winner.

Built by [Agniverse](https://agniverse.co). We used it to rebuild [gethandler.ai](https://gethandler.ai) (a TikTok agent for app makers) on 2026-10-28 and [flamme.app](https://flamme.app) (a couples app) on 2026-10-30. Both are live as A/B tests.

## What it does

- Walks your agent through the work in order: read the current page and your inspiration sites, pick the box, list the chapters, build on a hidden route, review in numbered rounds with screenshots, ship as an A/B, prove the new page is lighter, read the funnel afterwards.
- Hero rules learned the hard way: the H1 is the plain "what it is" line, the button is short and says free, the box is visible on load on desktop and phone, and a hero that already works stays.
- Chapter rules: each fits one screen, something moves in every one, real data only, claims carry a plain-words source.
- A Next.js A/B kit: the split helper with tests, the middleware (or Next 16 `proxy.ts`) block, exposure and click events, a share switch from 0 to 100.
- A performance budget: transform-only entrances, `content-visibility: auto` on chapters, and the new page may not be heavier or slower than the old one.

## Install

```bash
git clone https://github.com/Git-Agni/one-box-chapters ~/.claude/skills/one-box-chapters
```

Then ask your agent to redesign your homepage, or to "do the one-box-chapters treatment" on it. The skill loads on its own. Put your own project ids and habits in a `LOCAL.md` next to `SKILL.md`; it is gitignored and the skill reads it first.

## What's inside

- `SKILL.md`: the method, the hero and chapter rules, the done list
- `references/handler-case.md`: the gethandler.ai build and every review note
- `references/flamme-case.md`: the flamme.app build, where the box moved out of the hero
- `references/ab-split.md`: wiring and reading the A/B
- `references/perf-budget.md`: measuring both arms
- `kit/next/`: the A/B helper, its tests and the middleware block
- `kit/chapters.css`: base hero and chapter layout

## License

MIT. Made by [Agniverse](https://agniverse.co), more free tools at [agniverse.co/open-source](https://agniverse.co/open-source).
