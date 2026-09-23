/* Desktop → abre a tela dentro da moldura de celular (device.html).
   Mobile, tablets em retrato e iframes seguem direto. `?frame=0` desliga. */
(function () {
  if (window.self !== window.top) return;
  if (new URLSearchParams(location.search).get('frame') === '0') return;
  if (!window.matchMedia('(min-width: 900px) and (min-height: 560px)').matches) return;
  var script = document.currentScript;
  if (!script) return;
  var base = new URL('.', script.src).href;
  if (location.href.indexOf(base) !== 0) return;
  var rel = location.href.slice(base.length) || 'index.html';
  document.documentElement.style.visibility = 'hidden';
  location.replace(base + 'device.html#' + rel);
})();
