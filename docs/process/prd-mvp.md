# PRD — NutriHero MVP

**Status:** Draft v1
**Owner:** founder (PM) + product lead
**Target launch:** August 2026 (to capture the Sep–Feb fitness peak)
**Source docs:** `docs/00-brief.md`, `docs/01-brand-direction.md`, `docs/03-visual-system.md`, `docs/05-dev-handoff.md`
**Audience:** junior developers (mobile + back + IA) implementing the first shippable version

---

## 1. Introduction / Overview

**NutriHero** is a Brazilian mobile app for body recomposition (lose fat / gain muscle simultaneously). It replaces two things that existing diet apps do poorly:

1. **Calorie engine.** Competitors (StrongApp, MyFitnessPal, Yazio) use BMI — weight, height, age. BMI doesn't separate fat from muscle, so the suggested caloric zone has a large error margin. NutriHero uses **body fat percentage** as the central variable, calculated via body measurements *and* a photo-based AI estimation.
2. **Diet adjustment cadence.** Traditional nutritionists recalibrate diets every ~3 months on a return visit. NutriHero recalibrates **every day** (single-button reajustment after each meal) and **every week** (pattern detection: late-night hunger, weekend excess, glycemic peaks, low adherence).

The product positioning is *"nutricionista de bolso"* — a pocket nutritionist that re-decides the diet in real time as the user eats (or doesn't).

**The MVP must prove the core thesis:** a fairer calorie engine + continuous reajustment generates better adherence and conversion than BMI-based competitors. Everything not in service of that thesis is deferred.

---

## 2. Goals

1. **Validate adherence to the reajustment loop.** Achieve **≥30% D7 retention** (% of installs still active 7 days later) — the primary success metric.
2. **Validate the paywall.** Achieve **≥40% paywall conversion** on day-0 (% of users who reach the paywall and submit card-on-file for the 7-day trial).
3. **Validate the calorie engine.** ≥70% of activated users complete the body-fat calculation (measurements *or* photo).
4. **Ship in time for the Sep–Oct peak.** Submit to App Store + Play Store by **end of August 2026**.
5. **Hold scope.** Ship only the 5 core flows below; no gamification, no community, no marketplace, no workout module.

---

## 3. User Stories

### 3.1 Activation (first session)

- **As a follower of a partner influencer who just clicked an Instagram link,** I want to understand within 60 seconds why this app is different from MyFitnessPal, so I decide whether it's worth my card.
- **As a new user mid-cutting,** I want to enter my measurements *or* take a photo and see my projected body in 90 days, so the photo step doesn't feel like a chore.
- **As someone who hates entering credit cards,** I want to know exactly when I'll be charged and what I'm signing up for, before I type anything.

### 3.2 Daily routine

- **As a user mid-day who just ate something unplanned,** I want to tap *one* button, tell the app what I ate (photo, voice, or type), and get my remaining-day diet rewritten on the spot — no scrolling through a menu.
- **As a user at 22h who skipped lunch,** I want the app to redistribute my remaining 1500 kcal across the meals left in the day, not lecture me about what I "should have done."
- **As a user who forgot to log dinner last night,** I want to add it retroactively without breaking my streak or my numbers.

### 3.3 Weekly review

- **As a user opening the app on Monday morning,** I want a 1-screen summary of last week's pattern ("você estoura à noite às quartas") and one proposed adjustment, so I either accept it or ignore it in 10 seconds.

---

## 4. Functional Requirements

### 4.1 Onboarding — Anamnese (FR-1 to FR-8)

1. **FR-1.** The system must collect a goal selection: *cut fat* / *gain muscle* / *recomposition*. Single choice, required.
2. **FR-2.** The system must collect: birth year, biological sex (M/F), current weight (kg), height (cm), activity level (sedentário / 1–2x semana / 3–4x semana / 5+x semana).
3. **FR-3.** The system must ask preferred meal frequency per day (3 / 4 / 5 / 6 refeições). Required.
4. **FR-4.** The system must ask 3–5 habit questions used by weekly pattern detection: *typical late-night hunger?*, *weekend over-eating?*, *cravings for sweets?*, *water intake?*, *alcohol on weekends?*. Multi-choice; skippable individually.
5. **FR-5.** The onboarding flow must take **≤90 seconds median** for a user who skips habit questions.
6. **FR-6.** Anamnese answers must be editable post-onboarding from a Profile screen (read/write).
7. **FR-7.** No back-button trap: every step must allow returning to the previous step without losing already-entered data.
8. **FR-8.** Copy/tone follows `01-brand-direction.md` §4: imperative second-person, no emoji, no "ops!" friendly errors.

### 4.2 Body Fat % Calculation (FR-9 to FR-16)

9. **FR-9.** The system must offer **two methods** at the start of the BF% step: (a) measurements, (b) photo. User chooses one; can switch later.
10. **FR-10. Measurements method:** the system must collect neck (cm), waist (cm), and hip (cm, F only). It must compute BF% using the **U.S. Navy formula** (the standard formula for these three measurements).
11. **FR-11. Photo method:** the system must capture three photos — frente / lado / costas — using `expo-camera`, send them to the IA backend, and receive a single BF% estimate. The IA estimation method is owned by the IA dev; the PRD only requires the contract (3 photos in → BF% number out, with a confidence range).
12. **FR-12.** Photos must **never persist on-device**. They upload to the backend, the backend returns a signed URL stored against the user record, and the local copy is discarded.
13. **FR-13.** The BF% result screen must show: the number with one decimal (e.g., `24.3%`), the method used, and the date.
14. **FR-14.** If photo upload or IA call fails, the system must fall back to "Use suas medidas em vez disso" — a one-tap path to FR-10. Never block the user behind a failed photo.
15. **FR-15.** The system must compute **TDEE (total daily energy expenditure)** using the Katch–McArdle formula (uses lean body mass, which requires BF%), then apply the user's activity level multiplier.
16. **FR-16.** The system must compute a **caloric zone** as TDEE ± 500 kcal, with the directional shift (deficit for cutting, surplus for muscle gain) determined by FR-1.

### 4.3 Future Body Projection (FR-17 to FR-20)

17. **FR-17.** Immediately after FR-13, the system must show a **stylized projection screen**: silhouette + current BF% number + projected BF% number at 30 / 60 / 90 / 180 days. **No AI-generated image of the user.**
18. **FR-18.** Projection math: assume linear progression at 0.5–1% BF reduction per month (cutting) or equivalent lean mass gain (bulking), bounded by physiological floors. The exact formula is owned by the nutritionist consultants; the PRD requires the output be **deterministic given inputs**, not a black box.
19. **FR-19.** The projection screen is the **emotional hook** before the paywall. It must visually emphasize the *delta* (current → 90d) using the hero color `--c-arco` (`#FF5B1F`) per `03-visual-system.md`.
20. **FR-20.** Projection numbers must remain visible (read-only) in the Profile screen after paywall.

### 4.4 Paywall + Trial (FR-21 to FR-28)

21. **FR-21.** The paywall must appear **immediately after FR-17** (projection screen) — not before, not after the first meal log.
22. **FR-22.** The paywall must collect a credit card (card-on-file) via a PCI-compliant gateway (recommend Stripe or local equivalent — backend dev decision).
23. **FR-23.** Trial duration: **7 days free**, full feature access.
24. **FR-24.** Charge logic: card is authorized on day 0 (R$0 hold or equivalent), **charged on day 7** unless user cancels.
25. **FR-25.** Cancellation must be available in-app via Profile → "Cancelar assinatura" — no support email required. Cancelling before day 7 prevents the charge.
26. **FR-26.** Paywall copy must transparently state: (a) "Você será cobrado em 7 dias", (b) the exact charge amount, (c) "Cancele a qualquer momento antes da cobrança." Per FR-8 tone.
27. **FR-27.** Pricing for v1: a single monthly plan. Exact R$ value is a business decision pending; the backend must read it from config, not hardcode it.
28. **FR-28.** If card authorization fails, the user gets a "Tentar outro cartão" path; the app does **not** grant access without a valid card.

### 4.5 Initial Diet Generation (FR-29 to FR-33)

29. **FR-29.** Immediately post-paywall, the system must generate a diet for **today** that fits the user's caloric zone (FR-16) divided by chosen meal count (FR-3).
30. **FR-30.** The first generated diet is shown as: N meal cards, each with kcal target + 2–3 example foods. Cards must be readable in <10 seconds — no nutritional treatises.
31. **FR-31.** The diet generation logic is owned by the IA dev + nutritionist consultants. The PRD requires the contract: `{caloric_target, meal_count, user_preferences}` → `[{meal_name, kcal, suggested_foods[]}, ...]`.
32. **FR-32.** No food database UX in v1 — the user does not pick from a list of 50,000 foods. The IA returns suggestions; the user logs what they actually ate via FR-34/35/36.
33. **FR-33.** The generated diet must persist server-side and be re-fetchable. If the user reinstalls the app, the diet survives.

### 4.6 Daily Food Log (FR-34 to FR-42)

34. **FR-34. Manual input.** The system must allow logging a meal by: meal slot (café / almoço / jantar / lanche), free-text description, kcal estimate. The IA backend converts free-text → kcal if user leaves kcal blank.
35. **FR-35. Photo input.** The system must allow capturing a photo of the plate via `expo-camera`. Photo uploads to IA backend, returns identified foods + kcal estimate. User can edit the estimate before confirming.
36. **FR-36. Audio input.** The system must allow recording audio ("comi 200g de frango com arroz e brócolis"). Audio uploads to IA backend (speech-to-text + parsing), returns same output as FR-35.
37. **FR-37. WhatsApp input is OUT of v1.** See Non-Goals §5.
38. **FR-38.** Every logged meal must be editable (re-tap, change kcal, change description) and deletable for the current day. After day rollover (00:00 BRT), entries are locked.
39. **FR-39.** The Home screen must always show: today's total kcal consumed, the caloric target, and the *remaining* zone — large numbers in `--f-mono` per `03-visual-system.md`.
40. **FR-40.** If a meal log API call fails (offline, IA timeout), the system must queue the entry locally and retry in the background. The UI shows a "syncing…" indicator, never a blocking error.
41. **FR-41.** Each logged meal must be timestamped with device time, converted to BRT server-side.
42. **FR-42.** Per FR-12, plate photos do **not** persist on-device. Audio recordings same policy.

### 4.7 Daily Reajustment Button (FR-43 to FR-50) — CORE

> This is the product's defining interaction. Per `docs/05-dev-handoff.md`, the entire app gravitates around this button. It must be the primary action on the Home screen.

43. **FR-43.** The Home screen must show **one** prominent button labeled "Reajustar dieta" in `--c-arco`, sized and placed per the `Recalibrate` screen spec in `05-dev-handoff.md`.
44. **FR-44.** Tapping the button must take the user to the Recalibrate screen in **≤200ms** (no loading spinner).
45. **FR-45.** The Recalibrate screen must show: meals already eaten today (read-only summary), kcal consumed vs target, and the proposed redistribution of remaining kcal across remaining meals.
46. **FR-46.** The user confirms with a single CTA "Aplicar reajuste." On confirm, the day's remaining meal plan is overwritten server-side and re-rendered on Home.
47. **FR-47.** Reajustment must be possible **multiple times per day** without penalty.
48. **FR-48.** If the user has consumed more than the day's target, the system must propose either: (a) zero remaining intake + carry-over to tomorrow's deficit, or (b) accept the over-consumption and resume normal plan tomorrow. User chooses; no auto-decision.
49. **FR-49.** If no meals have been logged yet, the button is still active and shows the original plan unchanged — never disabled.
50. **FR-50.** Every reajustment must be logged server-side (timestamp, before-state, after-state). This data feeds the weekly pattern detection (§4.8) *and* the success metric (Goals §2 #1).

### 4.8 Weekly Pattern Reajustment (FR-51 to FR-56)

51. **FR-51.** Once per week (Monday 06:00 BRT, configurable), the backend must run a pattern detection job over the previous 7 days of meal log + reajustment data.
52. **FR-52.** Pattern catalog (v1): *fome à noite*, *exagero no fim de semana*, *pico glicêmico*, *baixa adesão* (<3 days logged). The catalog is owned by nutritionist consultants; the PRD requires that the IA backend output **at most one detected pattern + one proposed adjustment** per week.
53. **FR-53.** When a pattern is detected, the next Home open of the week must surface a **Weekly Pattern card** with: the detected pattern, a 1-line explanation, the proposed adjustment, and two CTAs: "Aplicar" / "Ignorar."
54. **FR-54.** "Aplicar" overwrites the next 7 days of generated diets with the adjusted version. "Ignorar" dismisses the card; the pattern can re-appear next week if still present.
55. **FR-55.** If no pattern is detected (or adherence is too low to detect anything), no card is shown — do not invent patterns to fill space.
56. **FR-56.** The Weekly Pattern card must use `--c-atencao` (`#F7D74C`) — the single allowed warning color per `03-visual-system.md`.

### 4.9 Profile + Account (FR-57 to FR-61)

57. **FR-57.** The Profile screen must show: current BF%, caloric target, goal (FR-1), subscription status (trial/active/cancelled), and next charge date.
58. **FR-58.** The user must be able to re-do the BF% calculation (measurements or photo) at any time. New value overwrites the old; history is kept server-side for the progress view.
59. **FR-59.** The user must be able to cancel the subscription (FR-25) and log out.
60. **FR-60.** No social features in v1: no friends list, no leaderboard, no shared progress. See Non-Goals §5.
61. **FR-61.** Account creation: email + password OR Apple/Google sign-in. Backend dev's call on provider — `expo-auth-session` recommended.

---

## 5. Non-Goals (Out of Scope)

The MVP **must not** include the following — these are real product opportunities but distract from validating the core thesis:

- **Gamification.** No streaks, no points, no badges, no XP.
- **ONG credits.** The "earn credits to donate" mechanic is post-MVP.
- **Community / social.** No friends, no group challenges, no leaderboards, no shared progress screens.
- **Workout module.** No exercise tracking, no training plans, no posture analysis from the body photos.
- **Supplement marketplace.** No in-app purchase of suplementos, no supplement-brand integrations.
- **B2B partner features.** No co-branded onboarding for partner suppliers; no white-label flows.
- **WhatsApp meal logging.** The kick-off mentioned WhatsApp as an input — explicitly deferred to v1.1 per user decision.
- **AI-generated future-body image.** Per FR-17, the projection is stylized (silhouette + numbers), not a generated photo.
- **Full food database picker.** No 50,000-item searchable food list. IA estimates from free-text/photo/audio.
- **Nutritionist marketplace.** No "book a real nutritionist" feature.
- **Analytics dashboards for the user.** Beyond the Home and Weekly Pattern screens, no charts, no graphs, no exports.
- **Multi-language.** Portuguese (Brazil) only. No EN/ES/etc.
- **Tablet/web.** Mobile only (iOS + Android via Expo).
- **A/B testing infrastructure.** Per the brief (out of scope).
- **Full branding system / animated logo / sonic identity.** Per the brief (out of scope).
- **Legal/regulatory validation of the nutritional formulas.** This is the responsibility of the nutritionist consultants signing the methodology — not in the dev scope.

---

## 6. Design Considerations

- **Source of truth:** all visual decisions live in `docs/03-visual-system.md` (tokens) and `docs/05-dev-handoff.md` (per-screen behavior). Do not improvise.
- **Dark mode only.** Page bg `#06070A`, primary text `#EEEBE3`.
- **Hero color rule:** `--c-arco` (`#FF5B1F`) max **2 elements per screen**. The Reajustar button always counts as one.
- **No greens, no blues, no italics, no pill shapes, no emoji.** Per `01-brand-direction.md` §4.
- **Typography:** Archivo (display) + Archivo Narrow + JetBrains Mono. All via Google Fonts.
- **Signature component:** `<PulsoLine />` — implement and validate **first**, before any screen, per `05-dev-handoff.md` TL;DR.
- **5 core screens to build (in order):** Home → Recalibrate → Body Projection → Meal Log → Weekly Pattern.
- **Tone of voice:** operator / tool, not coach / wellness. Imperative second-person. Examples in `01-brand-direction.md` §4.

---

## 7. Technical Considerations

- **Stack** (per `05-dev-handoff.md` §1): Expo SDK 51+ managed, React Native, Expo Router, NativeWind v4, Reanimated 3 + Moti, Zustand + TanStack Query, react-hook-form + zod, expo-camera, expo-secure-store + AsyncStorage.
- **Backend / IA contracts** (need to be locked early — block dev work otherwise):
  - `POST /bf-from-photos` → returns `{bf_percent: number, confidence: number}`
  - `POST /diet/generate` → returns the meal cards described in FR-31
  - `POST /meal/from-photo`, `POST /meal/from-audio`, `POST /meal/from-text` → all return `{foods: [{name, kcal, grams}], total_kcal: number}`
  - `POST /reajustment/preview` and `POST /reajustment/apply` for FR-45/46
  - `GET /weekly-pattern` for FR-51
- **Photos and audio must not persist on-device.** Upload → use → discard. Per FR-12, FR-42.
- **Offline tolerance:** the meal log must queue locally and retry (FR-40). The reajustment button **does** require connectivity (server computes the redistribution).
- **Payment gateway:** Stripe or a Brazilian equivalent (recommend Stripe for international cards from launch). PCI scope must stay with the gateway; the app never sees raw card data.
- **EAS builds** for CI. Preview profile for influencer testing (partner influencers), production for the stores.
- **Time zone:** all server-side timestamps in UTC, client converts to BRT for display. Day rollover (FR-38) is BRT-based.

---

## 8. Success Metrics

| Metric | Target | How measured |
|---|---|---|
| **D7 retention (primary)** | **≥30%** | % of installs that open the app on day 7+ |
| Paywall conversion | ≥40% | % of paywall-reached users who submit a card |
| Day-7 charge survival | ≥60% | % of card-on-file users who do not cancel before day 7 |
| BF% calculation completion | ≥70% | % of activated users who complete FR-9 → FR-13 |
| Reajustment button frequency | ≥4 taps / active user / week | Counted via FR-50 logs |
| Onboarding time (median) | ≤90s | From first open to FR-21 paywall (skipping habit Qs) |
| Photo-flow drop-off | ≤40% | % of users who start FR-11 and abandon (FR-14 fallback counts as completion) |

Measurement window: first 30 days post-launch. Targets are MVP-validation thresholds — below them, the thesis is in question; at/above them, justify Phase 2 (gamification, partnerships, workout module).

---

## 9. Open Questions

1. **Pricing.** What is the monthly R$ amount for v1? FR-27 references a config value; the business needs to set it before paywall copy is final.
2. **IA cost ceiling per user.** Kick-off estimated a low single-digit BRL IA cost per user/month at full usage. If actual costs are higher (e.g., photo IA more expensive than predicted), does pricing rise or does usage get capped?
3. **Nutritionist sign-off process.** Who signs which methodology, by when? The brand promise leans on this; the PRD assumes it happens in parallel to dev but doesn't block launch.
4. **App Store review risk.** Day-0 card-on-file with 7-day trial is fine on both stores, but the copy in FR-26 must match each store's policy language. Legal/store-compliance review needed before submission.
5. **Influencer launch coordination.** Partner influencers — what launch day? Affects which week the metrics window starts.
6. **Weekly pattern catalog v1.** §4.8 lists 4 patterns; nutritionist consultants need to confirm these are the right starting set and provide the adjustment recipes.
7. **Photo BF% accuracy threshold.** What confidence score (FR-11) is "good enough" to show the result vs. fall back to measurements? Needs IA dev + nutritionist alignment.
8. **Data retention / LGPD.** Photo uploads, audio uploads, body measurements — what is the retention policy and where does the LGPD-required consent flow appear? Likely in onboarding before FR-9; needs legal review.
