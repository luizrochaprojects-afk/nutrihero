(function () {
  const KEY = 'nh.state';
  const DEFAULTS = {
    day: 0,
    bf_current: 24.3,
    bf_projected_90d: 19.8,
    target_kcal: 2000,
    consumed_kcal: 0,
    /**
     * Each meals_logged entry:
     * {
     *   slot: 'cafe' | 'lanche-am' | 'almoco' | 'lanche-pm' | 'jantar',
     *   source: 'manual' | 'photo' | 'audio',
     *   items: [{ name, qty, unit, kcal, confidence }],
     *   totalKcal: number,
     *   loggedAt: ISO string,
     *   photoUrl: dataURL | null,
     *   syncStatus: 'synced' | 'queued',
     * }
     */
    meals_logged: [],
    weekly_pattern: null,
    /**
     * Anamnese — preenchida em onboarding-{short,full}.
     * {goal, sex, year, weight, height, activity, meals, habits?}
     */
    anamnese: null,
    /* Assinatura: { active: bool, since: ISO string } ou null — gravada nos paywalls */
    subscription: null,
    /* Última recalibração: ISO string ou null */
    last_reajust_at: null,
    /* 'applied' | 'kept' | null */
    reajust_choice: null,
    /* Flash bag: one-shot UI messages set by one screen and consumed by the next */
    flash: null,
  };

  function load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? Object.assign({}, DEFAULTS, JSON.parse(raw)) : Object.assign({}, DEFAULTS);
    } catch (_) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function save(state) {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
  }

  const state = load();

  state.reset = function () {
    Object.assign(state, DEFAULTS);
    state.meals_logged = [];
    state.consumed_kcal = 0;
    state.flash = null;
    save(state);
  };

  /**
   * Add a meal entry, updating consumed_kcal in the same write.
   * Replaces any existing entry for the same slot (re-log scenario).
   */
  state.addMeal = function (entry) {
    if (!entry || !entry.slot) return;
    const existing = state.meals_logged.findIndex(m => m.slot === entry.slot);
    if (existing >= 0) {
      state.consumed_kcal -= state.meals_logged[existing].totalKcal || 0;
      state.meals_logged.splice(existing, 1);
    }
    state.meals_logged.push(entry);
    state.consumed_kcal += entry.totalKcal || 0;
    save(state);
  };

  state.consumeFlash = function () {
    const f = state.flash;
    state.flash = null;
    save(state);
    return f;
  };

  const handler = {
    set(target, prop, value) {
      target[prop] = value;
      if (typeof value !== 'function') save(target);
      return true;
    },
  };

  window.NH_STATE = new Proxy(state, handler);
})();
