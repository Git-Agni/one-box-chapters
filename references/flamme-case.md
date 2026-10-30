# Second example: flamme.app, October 2026

Flamme is a couples app (iOS and Android). Next.js 16, so the split lives in `proxy.ts` instead of `middleware.ts`. Live as a 50/50 A/B since 2026-10-30.

## What the box became

Nothing in Flamme can be tried without two phones, so the box borrows the app's core loop: visitors answer tonight's question on the page, the answer gets "sealed until your partner answers in Flamme", and then the store buttons appear. Nothing is sent anywhere. The question changes daily (a list of seven, picked by day, page revalidated hourly).

## The chapters

| Chapter | What happens on screen |
| --- | --- |
| Hero | The live hero, unchanged (see below), plus a streak chip on the art that ticks 23 to 24 and a "Try tonight's question" cue. |
| Tonight's question | The box, and beside it a phone where two sealed answers open together. |
| The drift | A chat fills with logistics ("did you pay the electric?") until the daily question drops in. |
| Answer apart, open together | Two blurred answer cards unblur at the same moment. |
| Widgets | A days-together counter runs, a mood cycles, the partner's local time shows. |
| Guru | The AI coach answers a chores argument with something to try tonight. |
| Proof, finale | Stats, testimonials, press, then the box again. |

## The review note that changed the skill

The first sample put a small H1, a definition and the box into the hero. The founder's answer: the old hero was clean and the left side got crowded. Keep the live hero and its art, move the box one scroll down. That is now a hero rule in `SKILL.md`: when the current hero is already good, keep it and make the box the first chapter.

## Numbers

- Weight on a throttled phone: arm b 663 KB / LCP 0.78 s, arm a 688 KB / LCP 0.82 s.
- Measured on store-button clicks per arm (`home_store_click`), with `home_ab_exposed` for exposure and `home_box_answered` for the box.
