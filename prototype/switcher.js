(function () {
  const KEY = 'nh.variants';
  const DEV_KEY = 'nh.dev';
  const THEME_KEY = 'nh.theme';
  const inIframe = window.self !== window.top;
  /* Dentro da moldura desktop (device.html) os cenários de teste seguem o toggle da moldura */
  const inShell = inIframe && (function () { try { return !!window.parent.NH_SHELL; } catch (_) { return false; } })();
  if (inShell) document.documentElement.classList.add('in-shell');

  /* — Theme helpers — */
  function loadTheme() {
    try { return sessionStorage.getItem(THEME_KEY) || 'light'; } catch (_) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { sessionStorage.setItem(THEME_KEY, theme); } catch (_) {}
    document.querySelectorAll('.nh-theme-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
  }

  /* Apply saved theme immediately to avoid flash */
  document.documentElement.setAttribute('data-theme', loadTheme());

  /* Expose theme API for use in individual screens (e.g. perfil.html) */
  window.NH_THEME = { apply: applyTheme, load: loadTheme };

  const DEFAULTS = {
    onboarding: 'short',
    bf: 'measure-first',
    paywall: 'post-projection',
    reajust: 'ticker',
    weekly: 'home-card',
  };

  function load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? Object.assign({}, DEFAULTS, JSON.parse(raw)) : Object.assign({}, DEFAULTS);
    } catch (_) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function save(v) {
    try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (_) {}
  }

  const variants = load();

  const handler = {
    set(target, prop, value) {
      target[prop] = value;
      save(target);
      return true;
    },
  };

  window.NH_VARIANTS = new Proxy(variants, handler);

  /* — Variant-aware route resolver — */
  const FIRST_REAJUST_KEY = 'nh.first-reajust-shown';
  window.NH_NAV = {
    afterOnboarding() {
      if (variants.paywall === 'pre-bf') return 'paywall-pre-bf.html';
      return 'bf-method-' + variants.bf + '.html';
    },
    afterPaywallPreBf() {
      return 'bf-method-' + variants.bf + '.html';
    },
    afterBf() {
      return 'projection.html';
    },
    afterProjection() {
      if (variants.paywall === 'post-projection') return 'paywall-post-projection.html';
      return 'home.html';
    },
    afterPaywall() {
      return 'home.html';
    },
    fromHomeReajust() {
      return 'reajust-' + variants.reajust + '.html';
    },
    afterReajust() {
      try {
        if (variants.paywall === 'post-first-reajust' && !sessionStorage.getItem(FIRST_REAJUST_KEY)) {
          sessionStorage.setItem(FIRST_REAJUST_KEY, '1');
          return 'paywall-post-first-reajust.html';
        }
      } catch (_) {}
      return 'home.html';
    },
    weeklyScreen() {
      return 'weekly-' + variants.weekly + '.html';
    },
  };

  /* — Auto-rewrite anchors with data-nh-next — */
  function rewriteLinks() {
    document.querySelectorAll('[data-nh-next]').forEach(function (el) {
      const fn = el.getAttribute('data-nh-next');
      if (typeof window.NH_NAV[fn] !== 'function') return;
      const href = window.NH_NAV[fn]();
      if (el.tagName === 'A') el.setAttribute('href', href);
      else el.addEventListener('click', function (e) { e.preventDefault(); window.location.href = href; });
    });
  }
  if (document.readyState !== 'loading') rewriteLinks();
  else document.addEventListener('DOMContentLoaded', rewriteLinks);

  /* — Dev switcher panel — */
  const FORKS = [
    { key: 'onboarding', label: 'Onboarding', opts: [
      { v: 'short', l: 'Short' },
      { v: 'full', l: 'Full' },
    ] },
    { key: 'bf', label: 'BF method', opts: [
      { v: 'measure-first', l: 'Medidas' },
      { v: 'photo-first', l: 'Foto' },
    ] },
    { key: 'paywall', label: 'Paywall', opts: [
      { v: 'pre-bf', l: 'Pre-BF' },
      { v: 'post-projection', l: 'Post-proj' },
      { v: 'post-first-reajust', l: 'Post-reaj' },
    ] },
    { key: 'reajust', label: 'Reajust', opts: [
      { v: 'ticker', l: 'Ticker' },
      { v: 'modal', l: 'Modal' },
      { v: 'drawer', l: 'Drawer' },
    ] },
    { key: 'weekly', label: 'Weekly', opts: [
      { v: 'home-card', l: 'Home card' },
      { v: 'dedicated', l: 'Dedicated' },
      { v: 'notification', l: 'Notif' },
    ] },
  ];

  const SCREENS = [
    { v: '../index.html', l: '↦ Index (start)' },
    { v: 'cold-open.html', l: 'cold-open' },
    { v: 'onboarding-short.html', l: 'onboarding-short' },
    { v: 'onboarding-full.html', l: 'onboarding-full' },
    { v: 'bf-method-measure-first.html', l: 'bf · measure-first' },
    { v: 'bf-method-photo-first.html', l: 'bf · photo-first' },
    { v: 'projection.html', l: 'projection' },
    { v: 'paywall-pre-bf.html', l: 'paywall · pre-bf' },
    { v: 'paywall-post-projection.html', l: 'paywall · post-projection' },
    { v: 'paywall-post-first-reajust.html', l: 'paywall · post-first-reajust' },
    { v: 'home.html', l: 'home' },
    { v: 'reajust-ticker.html', l: 'reajust · ticker' },
    { v: 'reajust-modal.html', l: 'reajust · modal' },
    { v: 'reajust-drawer.html', l: 'reajust · drawer' },
    { v: 'meal-log.html', l: 'meal-log' },
    { v: 'weekly-home-card.html', l: 'weekly · home-card' },
    { v: 'weekly-dedicated.html', l: 'weekly · dedicated' },
    { v: 'weekly-notification.html', l: 'weekly · notification' },
    { v: 'perfil.html', l: 'perfil' },
    { v: 'ajustes.html', l: 'ajustes' },
    { v: 'assinatura.html', l: 'ajustes · assinatura' },
    { v: 'legal.html?doc=termos', l: 'ajustes · termos' },
    { v: 'legal.html?doc=privacidade', l: 'ajustes · privacidade' },
    { v: 'excluir-conta.html', l: 'ajustes · excluir conta' },
    { v: '../compare.html', l: '↦ Compare' },
  ];

  function currentScreen() {
    const p = window.location.pathname;
    const seg = p.split('/').pop() || 'index';
    if (!seg || seg === '' || seg === 'screens') return 'index.html';
    return seg.endsWith('.html') ? seg : (seg + '.html');
  }

  function buildSwitcher() {
    if (document.getElementById('nh-switcher')) return;
    const sw = document.createElement('div');
    sw.id = 'nh-switcher';
    sw.className = 'nh-switcher';

    const collapsedKey = 'nh.sw-collapsed';
    if (sessionStorage.getItem(collapsedKey) === '1') sw.classList.add('collapsed');

    const header = document.createElement('div');
    header.className = 'nh-sw-header';
    header.innerHTML = '<span class="nh-sw-title">DEV · VARIANT SWITCHER</span><span class="nh-sw-chev">—</span>';
    header.addEventListener('click', function () {
      sw.classList.toggle('collapsed');
      sessionStorage.setItem(collapsedKey, sw.classList.contains('collapsed') ? '1' : '0');
    });

    const body = document.createElement('div');
    body.className = 'nh-sw-body';

    /* Jump-to-step */
    const jump = document.createElement('div');
    jump.className = 'nh-sw-jump';
    jump.innerHTML = '<label>JUMP TO SCREEN</label>';
    const sel = document.createElement('select');
    SCREENS.forEach(function (s) {
      const opt = document.createElement('option');
      opt.value = s.v; opt.textContent = s.l;
      if (s.v === currentScreen()) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', function () {
      const target = sel.value;
      if (target.startsWith('../')) window.location.href = target;
      else window.location.href = target;
    });
    jump.appendChild(sel);
    body.appendChild(jump);

    /* Fork rows */
    FORKS.forEach(function (fork) {
      const row = document.createElement('div');
      row.className = 'nh-sw-fork';
      row.innerHTML = '<span class="nh-sw-fork-label">' + fork.label + '</span>';
      const seg = document.createElement('div');
      seg.className = 'nh-sw-seg';
      fork.opts.forEach(function (opt) {
        const btn = document.createElement('button');
        btn.textContent = opt.l;
        btn.dataset.v = opt.v;
        if (variants[fork.key] === opt.v) btn.classList.add('active');
        btn.addEventListener('click', function () {
          variants[fork.key] = opt.v;
          window.NH_VARIANTS[fork.key] = opt.v;
          seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          /* Edge case: if currently on a paywall screen and paywall changed, jump to the new paywall */
          const cur = currentScreen();
          if (fork.key === 'paywall' && cur.startsWith('paywall-')) {
            window.location.href = 'paywall-' + opt.v + '.html';
            return;
          }
          if (fork.key === 'reajust' && cur.startsWith('reajust-')) {
            window.location.href = 'reajust-' + opt.v + '.html';
            return;
          }
          if (fork.key === 'bf' && cur.startsWith('bf-method-')) {
            window.location.href = 'bf-method-' + opt.v + '.html';
            return;
          }
          if (fork.key === 'weekly' && cur.startsWith('weekly-')) {
            window.location.href = 'weekly-' + opt.v + '.html';
            return;
          }
          if (fork.key === 'onboarding' && cur.startsWith('onboarding-')) {
            window.location.href = 'onboarding-' + opt.v + '.html';
            return;
          }
          /* Otherwise just reload to recompute resolved data-nh-next links */
          window.location.reload();
        });
        seg.appendChild(btn);
      });
      row.appendChild(seg);
      body.appendChild(row);
    });

    /* Reset footer */
    const footer = document.createElement('div');
    footer.className = 'nh-sw-footer';
    const reset = document.createElement('button');
    reset.className = 'nh-sw-reset';
    reset.textContent = 'Reset journey';
    reset.addEventListener('click', function () {
      sessionStorage.removeItem('nh.state');
      sessionStorage.removeItem('nh.variants');
      sessionStorage.removeItem('nh.first-reajust-shown');
      Object.assign(variants, DEFAULTS);
      window.location.href = currentScreen().match(/index\.html/) ? '../index.html' : '../index.html';
    });
    footer.appendChild(reset);
    body.appendChild(footer);

    sw.appendChild(header);
    sw.appendChild(body);
    document.body.appendChild(sw);
  }

  if (!inIframe) {
    if (document.readyState !== 'loading') buildSwitcher();
    else document.addEventListener('DOMContentLoaded', buildSwitcher);
  }

  /* — Dev mode detection — */
  const params = new URLSearchParams(window.location.search);
  const devFromUrl = params.get('dev') === '1';
  const devFromHash = window.location.hash === '#dev';
  const devFromStorage = sessionStorage.getItem(DEV_KEY) === '1';

  if (inShell && devFromStorage) {
    document.documentElement.classList.add('dev-mode');
  } else if (!inIframe && (devFromUrl || devFromHash || devFromStorage)) {
    document.documentElement.classList.add('dev-mode');
    sessionStorage.setItem(DEV_KEY, '1');
  }

  /* — Corner double-tap detector (4 taps in 1s, top-right 60×60px) — */
  let tapCount = 0;
  let tapTimer = null;

  document.addEventListener('click', function (e) {
    const { clientX, clientY } = e;
    const nearRight = clientX > window.innerWidth - 60;
    const nearTop = clientY < 60;
    if (!nearRight || !nearTop) return;

    tapCount++;
    if (tapTimer) clearTimeout(tapTimer);
    tapTimer = setTimeout(function () { tapCount = 0; }, 1000);

    if (tapCount >= 4) {
      tapCount = 0;
      const isDevMode = document.documentElement.classList.toggle('dev-mode');
      sessionStorage.setItem(DEV_KEY, isDevMode ? '1' : '0');
    }
  });
})();
