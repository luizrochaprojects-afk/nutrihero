# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NutriHero** (formerly ProjectFit) is a Brazilian nutrition app targeting the Sept–Feb fitness peak season. The product thesis: most diet apps use BMI (shallow math), while NutriHero uses body fat percentage as the central variable and shifts diet adjustment from quarterly (nutritionist visits) to daily/weekly (app).

This repo is a **design + planning workspace**, not application code. The 3-week design sprint is essentially complete; deliverables 01–05 in `docs/` are canon for whoever builds the app next. The repo is also published as a **public portfolio case** — keep it anonymized (see below).

## Core MVP Thesis

Two things hold the product together:
1. **Fairer calorie engine** — body fat % via measurements or photo, not BMI
2. **Continuous diet reajustment** — daily/weekly recalibration, not quarterly

Everything else (gamification, ONG credits, workout module, supplement marketplace, community, B2B brand partnerships) is post-MVP.

## MVP Scope (What's In)

- **Onboarding**: anamnese (goal, habits, meal frequency), body measurements or photo, body fat % calculation, future body projection
- **Paywall + trial**: day-0 card-on-file, charge on day 7, transparent copy about terms
- **Initial diet generation**: translating the calculation into readable, actionable output
- **Daily food log**: photo, audio, manual input, WhatsApp
- **Diet reajustment button**: the central interaction — must be the primary daily action, not buried in a menu ("open app → eat → tap → follow")
- **Weekly reajustment**: pattern detection (late-night hunger, weekend excess, glycemic spikes, low adherence) + proposed adjustments
- **Minimal progress/motivation**: enough to sustain weeks 1–2 without full gamification

## Key Design Decisions

- **Photo flow is high drop-off risk**: The future body projection is the incentive to take the photo. Must have a fallback (measurements only). Paywall placement relative to photo must be designed carefully.
- **Reajustment button is the core UX**: The entire app should be designed around it. It cannot be a secondary action.
- **Paywall at day 0** with card-on-file is defensible given partner-influencer credibility, but requires very clear and honest terms communication.

## What's Explicitly Out of MVP

Gamification, ONG credits, workout module, community, supplement marketplace, B2B brand features, full branding/design system, A/B testing, analytics instrumentation, legal/regulatory validation of nutrition formulas.

## Locked Brand & Visual Direction — "Pulso"

The aesthetic direction is **committed**, not exploratory. Reopening these decisions costs rework.

- **Dark only.** Page bg `#06070A` (`--c-vazio`), primary text `#EEEBE3` (`--c-giz-100`).
- **Hero color `#FF5B1F`** (`--c-arco`) — used on the recalibrate button, live deltas, pulse line, and the "I" in the wordmark. **Max 2 instances per screen.**
- **Atenção `#F7D74C`** is the *only* warning color. No greens, no blues, no italics.
- **Typography:** Archivo (display) + Archivo Narrow + JetBrains Mono — all via Google Fonts.
- **Signature component:** `<PulsoLine />` — must be built and validated *before* any screen.
- **Radius cap:** 8px. Pills are banned.
- **Tone of voice:** operator/tool, not coach/wellness. Second-person, imperative verbs, exposed decimals. No emoji, no "ops!".

Full token set, contrast ratios, component states, and motion specs are in `docs/03-visual-system.md`. Use it verbatim — do not improvise tokens.

## Recommended Implementation Stack

Defined in `docs/05-dev-handoff.md` §1. Summary:

- **Expo SDK 51+** (managed) + **React Native** + **Expo Router**
- **NativeWind v4** for styling — the tokens in `03-visual-system.md` map directly
- **Reanimated 3** + **Moti** for motion (Pulso line, ticker, count-up)
- **Zustand** (client state) + **TanStack Query** (server state)
- **react-hook-form** + **zod** for forms
- **expo-camera** + **expo-image-picker** for meal/body photos
- **EAS** for builds

The Pulso direction is tech-agnostic at the token level — if a different stack is already in flight (SwiftUI, Flutter), ignore §1.1 of the handoff and implement the tokens directly. Webview-based stacks (Cordova/Ionic) are ruled out: the pulse line and ticker need fluid motion on low-end Android devices, which is most of the target audience.

## Repository Layout

- `README.md` — portfolio case study (entry point on GitHub)
- `index.html` — redirects to `prototype/` (GitHub Pages root)
- `docs/00-brief.md` — anonymized product brief (context, scope, hypotheses)
- `docs/01-brand-direction.md` — committed creative brief (audience, personality, voice)
- `docs/02-brand-direction-menu.html` + `02-brand-direction-visual.html` — direction selection + visual exploration that produced "Pulso"
- `docs/03-visual-system.md` + `03-visual-system.html` — locked design system (colors, type, spacing, motion, components)
- `docs/04-visual-identity.md` + `04-visual-identity.html` — logo system, app icon, screen mockups
- `docs/05-dev-handoff.md` — final dev handoff (stack, tokens, screen-by-screen behavior, build order)
- `docs/process/` — PRD, prototype task plan, UX flow notes (excalidraw), Figma export
- `docs/images/` — images used by the README and docs
- `prototype/` — **navigable HTML prototype** (no build, static). 9 baseline screens + 8 variants across 5 forks. `frame.js` (in every screen head) sends desktop viewports (≥900px) to `device.html`, a phone frame with journey/variant/theme controls; mobile opens screens directly. `compare.html` is the side-by-side sheet. All paths are relative so it works under a GitHub Pages subpath. Reviewer guide in `prototype/README.md`.
- `assets/brand/` — exported SVGs (wordmark variants, app icon, favicon, monochrome marks)
- `_private/` — **gitignored.** Original proposal (with pricing), kick-off transcript, founder draft screens, process renders. Never publish.

## Working in This Repo

- **Language:** All design deliverables and product docs are in **Brazilian Portuguese**. Match that when editing existing files. New scratch notes can be English.
- **Numbering:** docs follow the `NN-name.md` convention (`01-brand-direction`, `02-…`, `03-…`). Keep it.
- **Status of design files:** `01–05` are "travados" (locked). Edits should be corrections/clarifications, not re-explorations. If a decision genuinely needs to reopen, flag it explicitly — don't quietly mutate the canon.
- **Brand assets in `assets/brand/`** are the source of truth — don't regenerate logos in-line in markdown files when an SVG already exists.
- **Anonymization (public repo):** never commit names of the founders, partner influencers or partner brands, pricing/contract terms, or anything from `_private/`. Refer to them generically ("founder", "influenciadores parceiros", "marca parceira de suplementos").
