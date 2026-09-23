# Tasks — NutriHero High-Fidelity Prototype (with variants)

**Goal:** produce a navigable HTML prototype that resolves the 5 open journey decisions (onboarding length, BF% method, paywall placement, reajustment UI, weekly pattern surfacing) by shipping named variants the team can A/B visually.

**Not in scope:** real backend, real payment, real auth, persistence, automated tests. This prototype proves the *journey*, not the implementation.

**Source documents:**
- `docs/process/prd-mvp.md` — functional requirements
- `docs/01-brand-direction.md` — voice and tone, audience implications
- `docs/03-visual-system.md` — locked tokens (colors, type, spacing, motion, radius)
- `docs/05-dev-handoff.md` — per-screen behavior notes, the 5 core screens
- `assets/brand/` — exported logo/icon SVGs

## Relevant Files

- `prototype/index.html` — Entry point; loads the variant-switcher and routes to the first journey step.
- `prototype/tokens.css` — Verbatim CSS variables from `03-visual-system.md` §0 (colors, type, spacing, radius, motion).
- `prototype/components.css` — Shared component styles (PulsoLine, Ticker, ArcGauge, meal card, CTA, paywall, weekly card) sourced from `03-visual-system.md` component sections.
- `prototype/switcher.js` — Variant-switcher overlay logic + `sessionStorage` persistence so navigation respects the reviewer's chosen variants.
- `prototype/state.js` — Tiny static state machine (current day, logged meals, BF%, projected BF%) so screens stay coherent across navigation.
- `prototype/screens/cold-open.html` — App-open / splash screen with the hero pitch.
- `prototype/screens/onboarding-short.html` — Variant A: 5-question anamnese (≤60s).
- `prototype/screens/onboarding-full.html` — Variant B: 8-question anamnese including habit questions (≤90s).
- `prototype/screens/bf-method-measure-first.html` — Variant A: measurements-first BF% flow.
- `prototype/screens/bf-method-photo-first.html` — Variant B: photo-first BF% flow with measurement fallback (PRD FR-14).
- `prototype/screens/projection.html` — Future-body projection screen (stylized, no AI image, per PRD FR-17).
- `prototype/screens/paywall-pre-bf.html` — Variant A: paywall before BF% calc.
- `prototype/screens/paywall-post-projection.html` — Variant B: paywall after the projection (PRD's locked position).
- `prototype/screens/paywall-post-first-reajust.html` — Variant C: paywall delayed until after the first reajustment.
- `prototype/screens/home.html` — Home: kcal totals, the Reajustar button, weekly card slot.
- `prototype/screens/reajust-modal.html` — Variant A: full-screen modal with confirmation CTA.
- `prototype/screens/reajust-drawer.html` — Variant B: inline bottom drawer.
- `prototype/screens/reajust-ticker.html` — Variant C: in-place PulsoLine animated rewrite of the day's plan.
- `prototype/screens/meal-log.html` — Meal log with the 3 input modes (manual, photo, audio) per PRD FR-34/35/36.
- `prototype/screens/weekly-home-card.html` — Variant A: pattern card embedded in Home.
- `prototype/screens/weekly-dedicated.html` — Variant B: dedicated full-screen review.
- `prototype/screens/weekly-notification.html` — Variant C: notification-first entry.
- `prototype/compare.html` — Side-by-side comparison sheet; reads `?fork=` to pick which fork to compare.
- `prototype/README.md` — Reviewer guide for the founder: how to walk through, what each variant tests, what decision is being requested.

### Notes

- This is a static HTML prototype — no build step, no test runner. Verification is visual walkthrough on a real iPhone and a real mid-range Android.
- All colors, type, and spacing must come from `tokens.css`. Hardcoded values in screen HTML are a regression — fix at the token, not the screen.
- The variant switcher is **hidden by default** (toggle via a corner double-tap or `?dev=1` query param). The founder sees the canonical journey on first open; switcher is only for review sessions.
- Hero color `--c-arco` (`#FF5B1F`) max 2 elements per screen, per `03-visual-system.md`. The Reajustar button always counts as one.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Set up prototype scaffolding
  - [x] 0.1 Create `prototype/` and `prototype/screens/` directories
  - [x] 0.2 Copy the locked CSS variables from `docs/03-visual-system.md` §0 verbatim into `prototype/tokens.css` (do not improvise values)
  - [x] 0.3 In `prototype/tokens.css`, import the Google Fonts links for Archivo (400/500/600/700/900), Archivo Narrow (500/600/700), and JetBrains Mono (400/500/700)
  - [x] 0.4 Create `prototype/components.css` with reset + base styles (page bg `var(--c-vazio)`, primary text `var(--c-giz-100)`, default `font-family: var(--f-display)`)
  - [x] 0.5 In `components.css`, define base classes: `.screen` (max-width 420px iPhone-style frame for desktop preview, full-width on mobile), `.cta-primary` (uses `--c-arco`), `.cta-ghost` (border `--c-linha-500`), `.mono` (uses `--f-mono`), `.label-narrow` (uses `--f-narrow` uppercase)
  - [x] 0.6 Create `prototype/state.js` exposing a single global `NH_STATE` object with defaults: `{day: 0, bf_current: 24.3, bf_projected_90d: 19.8, target_kcal: 2000, consumed_kcal: 0, meals_logged: [], weekly_pattern: null}`. Persist to `sessionStorage` under key `nh.state`. Expose `NH_STATE.reset()`.
  - [x] 0.7 Create `prototype/switcher.js` exporting `NH_VARIANTS` object with defaults: `{onboarding: 'short', bf: 'measure-first', paywall: 'post-projection', reajust: 'ticker', weekly: 'home-card'}`. Persist to `sessionStorage` under key `nh.variants`. Read-only stub at this stage — UI comes in 3.0.
  - [x] 0.8 Create `prototype/index.html` — minimal: loads `tokens.css` + `components.css` + `state.js` + `switcher.js`, shows a 1-screen "Tap to start" page that routes to `screens/cold-open.html` carrying current variant choices as query params or sessionStorage
  - [x] 0.9 Create stub HTML files (just `<title>` + linked CSS + a centered "TODO" label) for all 17 screen files listed in Relevant Files so links don't 404 during development
  - [x] 0.10 Open `index.html` in a browser — confirm dark bg `#06070A`, Archivo loads (check DevTools → Network), and the "Tap to start" CTA appears in `#FF5B1F`

- [x] 1.0 Build the baseline journey (one canonical path, no variants yet)
  - [x] 1.1 Build `screens/cold-open.html` — splash with the wordmark from `assets/brand/mark-primary.svg`, a 1-line pitch ("Seu nutricionista de bolso. Recalibra cada refeição."), and a single CTA "Começar" routing to `onboarding-short.html` (the baseline variant)
  - [x] 1.2 Build `screens/onboarding-short.html` — 5 questions in a vertical stack: (1) goal: cut/bulk/recomp, (2) sex + birth-year, (3) weight + height, (4) activity level, (5) meal frequency. Per-question progress bar in `--c-arco`. Bottom-sticky CTA. Tone per `01-brand-direction.md` §4.
  - [x] 1.3 Build `screens/bf-method-measure-first.html` — heading "Calcular sua zona", two large method cards (Medidas / Foto), Medidas card visually primary. Tap Medidas → inline reveal of neck/waist/hip inputs. CTA "Calcular".
  - [x] 1.4 Build the BF% result reveal inside `bf-method-measure-first.html` — large `var(--f-mono)` number with one decimal (`24.3%`), method label, "Continuar" CTA routing to `projection.html`
  - [x] 1.5 Build `screens/projection.html` per PRD FR-17 — silhouette (CSS shape or simple SVG, no photo), current BF% + projected at 30/60/90/180 days, delta highlighted in `--c-arco`. CTA "Manter ritmo" routing to `paywall-post-projection.html` (baseline variant)
  - [x] 1.6 Build `screens/paywall-post-projection.html` — projection mini-recap at top, single monthly plan card, transparent trial copy ("Você será cobrado em 7 dias · cancele a qualquer momento"), stubbed card input fields (not functional), CTA "Liberar acesso" routing to `home.html`
  - [x] 1.7 Build `screens/home.html` — top: today's date in `--f-narrow` uppercase, large mono kcal numbers (consumed/target/remaining), the PulsoLine component placeholder (animated stroke), weekly card slot (empty by default), bottom: the single prominent "Reajustar dieta" CTA in `--c-arco`. CTA routes to `reajust-ticker.html` (baseline variant).
  - [x] 1.8 Build the meal-list section on `home.html` — N cards (one per planned meal), each with kcal target + 2–3 example foods. Tap a card → `meal-log.html?slot=<id>`.
  - [x] 1.9 Build `screens/reajust-ticker.html` (baseline variant) — shows meals already eaten, animated "rewrite" sequence of the remaining meals using PulsoLine motion (CSS animation, no JS-heavy ticker yet), confirm CTA "Aplicar reajuste" routing back to `home.html` with updated `NH_STATE.meals_logged`
  - [x] 1.10 Build `screens/meal-log.html` — three input modes as tabs (Manual / Foto / Áudio). Each tab shows the static UI for that mode (no actual capture). Confirm CTA returns to `home.html`.
  - [x] 1.11 Build `screens/weekly-home-card.html` (baseline variant) — used by `home.html` when `NH_STATE.weekly_pattern` is set. Card uses `--c-atencao` (`#F7D74C`) per PRD FR-56. Two CTAs: "Aplicar" / "Ignorar".
  - [x] 1.12 Wire the canonical baseline route end-to-end: `index.html → cold-open → onboarding-short → bf-method-measure-first → projection → paywall-post-projection → home → reajust-ticker → home → (after 7 simulated days, toggle via a dev shortcut on Home) weekly-home-card`
  - [x] 1.13 Walk the baseline journey on desktop Chrome at 390×844 viewport (iPhone 14 sim). Confirm: zero broken links, no `console.error`, no layout overflow, hero color appears max twice per screen.

- [x] 2.0 Ship variants at the 5 decision points
  - [x] 2.1 Onboarding Variant B — `screens/onboarding-full.html`: 8 questions = the 5 short + 3 habit questions (late-night hunger / weekend excess / sweet cravings). Same visual language; progress bar adjusts.
  - [x] 2.2 BF% Variant B — `screens/bf-method-photo-first.html`: Foto card visually primary, 3-photo capture screens (front/side/back) using `assets/brand/` placeholder silhouettes, simulated 2s "analisando..." with PulsoLine, then BF% result. Include the FR-14 fallback: a small "Não consegui — usar medidas" link always visible.
  - [x] 2.3 Paywall Variant A — `screens/paywall-pre-bf.html`: paywall shown *before* BF% calc. Copy emphasizes the engine ("Para calcular sua zona, libere o motor"). CTA routes to `bf-method-measure-first.html` (or whichever bf variant is active per switcher).
  - [x] 2.4 Paywall Variant C — `screens/paywall-post-first-reajust.html`: identical layout to baseline paywall, but triggered after the user's first reajustment (Home → Reajustar → confirm → paywall). Copy emphasizes "Você viu como funciona. Mantenha o ritmo."
  - [x] 2.5 Reajustment Variant A — `screens/reajust-modal.html`: full-screen modal taking over the viewport, redistribution shown as a static list with deltas (`+200 kcal`, `-150 kcal`) in `--c-arco`, single bottom CTA. No animation.
  - [x] 2.6 Reajustment Variant B — `screens/reajust-drawer.html`: bottom sheet (60% viewport height), the Home dimmed and visible behind. Inline confirmation; tapping outside dismisses.
  - [x] 2.7 Weekly Variant B — `screens/weekly-dedicated.html`: full-screen review with the detected pattern, a kcal-by-day chart (static SVG bars), the proposed adjustment as a card, two CTAs.
  - [x] 2.8 Weekly Variant C — `screens/weekly-notification.html`: simulated notification banner overlay on Home, tap → opens the dedicated screen. Use a CSS-only "iOS notification" treatment over the Home screenshot.
  - [x] 2.9 Update routing in each variant so the rest of the journey still works regardless of fork choice. Use `NH_VARIANTS` from `switcher.js` to resolve the next screen at each fork (e.g., "after projection, go to paywall-${NH_VARIANTS.paywall}.html").
  - [x] 2.10 Walk each variant end-to-end (12 walks: 2 onboarding × 1 = 2, 2 bf × 1 = 2, 3 paywall × 1 = 3, 3 reajust × 1 = 3, 3 weekly = 3, minus overlap). For each walk, confirm visual integrity and no broken routes.

- [x] 3.0 Build the variant-switcher overlay
  - [x] 3.1 Add a hidden-by-default switcher container to `components.css` — fixed bottom-right, `--c-aco-700` bg, `--c-linha-500` border, `--r-2` radius. Hidden via `display: none` on `body:not(.dev-mode)`.
  - [x] 3.2 In `switcher.js`, detect `?dev=1` in URL → set `document.body.classList.add('dev-mode')` and persist `nh.dev = true` in `sessionStorage` so it survives navigation. (Also: `#dev` hash detection since `serve` strips query on .html redirect.)
  - [x] 3.3 Add a corner double-tap detector (4 taps in 1s on a 60×60 invisible hit area in the top-right corner) as the secondary way to toggle dev mode — for in-person demos where typing `?dev=1` is awkward.
  - [x] 3.4 Render the switcher panel content: one row per fork (Onboarding / BF / Paywall / Reajust / Weekly), each with a segmented control showing the available variants. Highlight the current selection in `--c-arco`.
  - [x] 3.5 On variant change, update `NH_VARIANTS` in memory + `sessionStorage`, then reload the current screen so the new variant takes effect. Edge case: if changing `paywall` while on the paywall screen, route to the new paywall variant directly. (Implemented for all 5 forks.)
  - [x] 3.6 Add a "Reset journey" button at the bottom of the switcher that clears `NH_STATE` and `NH_VARIANTS` and routes to `index.html`.
  - [x] 3.7 Add a "Jump to step" dropdown at the top of the switcher listing all screens — for reviewers who want to inspect a single screen without walking the journey.
  - [x] 3.8 Test: with switcher open, change paywall variant, walk forward — confirm new paywall variant loads. Change back, confirm baseline returns. Reload page — confirm choice persisted via sessionStorage.

- [x] 4.0 Add the comparison sheet
  - [x] 4.1 Create `prototype/compare.html` — reads `?fork=<name>` query param. Default to `?fork=paywall` if missing.
  - [x] 4.2 In `compare.html`, render N iframes side-by-side (CSS grid, equal columns), one per variant of the selected fork. Each iframe loads the variant's screen at iPhone width (`width: 390px; height: 844px`).
  - [x] 4.3 Above each iframe, label the variant name in `--f-narrow` uppercase, plus a 1-line "what this tests" caption pulled from a hardcoded `compare.html` table.
  - [x] 4.4 Add a top nav strip on `compare.html` with one button per fork (Onboarding · BF · Paywall · Reajust · Weekly), updating `?fork=` on click without reload.
  - [x] 4.5 Confirm `compare.html?fork=paywall` shows 3 paywall variants side-by-side; `?fork=reajust` shows 3 reajustment variants; etc.
  - [x] 4.6 On narrow viewports (<900px), collapse the grid into a horizontal scroll with snap-to-column for in-person tablet/phone review.

- [x] 5.0 Polish + reviewer handoff
  - [ ] 5.1 Cross-device check on a real iPhone (Safari): dark bg renders, Archivo loads, hero color appears as `#FF5B1F`, no overflow, taps register on the Reajustar CTA in under 100ms perceived latency. _Requer device físico — checklist preparado: safe-area insets, viewport-fit=cover, apple-mobile-web-app-capable, manifest.webmanifest, touch-action: manipulation, tap-highlight transparent._
  - [ ] 5.2 Cross-device check on a real mid-range Android (Chrome): same checks. If Archivo fails to load, fall back order is set in `tokens.css` (`'Archivo', system-ui, sans-serif`). _Requer device físico — fallback `'Archivo', sans-serif` já configurado._
  - [x] 5.3 Audit each screen for the "max 2 hero-color elements" rule from `03-visual-system.md`. Fix any regressions at the screen level. _Corrigido em home (streak/Próximo) e reajust-ticker (deltas negativos → giz-200 per spec)._
  - [x] 5.4 Audit copy across all screens against `01-brand-direction.md` §4 — no emoji, no "Ops!", imperative second-person, no italics anywhere. _Grep verificou: zero `font-style: italic`, zero "Ops!", zero emoji._
  - [x] 5.5 Write `prototype/README.md` for the founder with: (a) how to open and walk the baseline (3 min), (b) how to toggle dev mode and switch variants, (c) the variant matrix table with the decision being asked at each fork, (d) where the open questions from the PRD §9 are surfaced visually.
  - [x] 5.6 Update `CLAUDE.md` "Repository Layout" section to list `prototype/` and its purpose so future Claude sessions know it exists.
  - [x] 5.7 Take 5 screenshot stills (one per fork, showing the chosen baseline variant) for inclusion in a future review slide deck. Save to `prototype/screenshots/`.
  - [ ] 5.8 Final walkthrough with the founder (or a stand-in): record which variant they pick at each fork. Write the picks into a 1-page `prototype/decisions.md` and update the PRD's open questions accordingly. _Bloqueado em stakeholder (founder)._
