# Perf budget

Arm b must not be heavier or slower than arm a. Measure both, put the numbers in the PR.

## Measure

Production build, not dev. Throttled phone profile (Lighthouse mobile, or Chrome DevTools "Fast 4G" plus 4x CPU).

```bash
npx lighthouse http://localhost:3000/ --preset=perf --form-factor=mobile --only-categories=performance --output=json --output-path=./lh-a.json
```

Force an arm with the cookie (`--extra-headers='{"Cookie":"hdl_home=b"}'`) and run it again. Record total transfer, LCP, CLS, TBT for each arm.

## Rules that kept Handler light

- The hero LCP element is text or a priority image. Its entrance moves with `transform` only (`@keyframes rise { from { transform: translateY(14px) } }`), never opacity from 0.
- `.chapter { content-visibility: auto; contain-intrinsic-size: auto 1100px; }` so below-the-fold chapters do not block the first paint.
- Motion library features loaded lazily, `MotionConfig reducedMotion="user"`.
- Fonts: one display face, one body face, subset, `display: swap`.
- No autoplay video above the fold. Images through the framework image component with real `sizes`.
- Data for the chapters fetched server-side with revalidate, never on the client at load.
