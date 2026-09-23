// NutriHero · Jornada · finish layout
// Adds column headers, per-screen labels, and journey connectors to the
// 17 image frames already uploaded by upload_assets.
//
// HOW TO RUN:
//   1. Open the FigJam board (private)
//   2. Menu → Plugins → Development → Import plugin from manifest...
//   3. Select this manifest.json
//   4. Menu → Plugins → Development → NutriHero · Jornada · finish layout
//   5. Wait ~3s. Done.

(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const X0 = 200, Y0 = 250, COL_STRIDE = 360, ROW_STRIDE = 695, W = 280, H = 605;
  const ARCO = { r: 1, g: 0.357, b: 0.122 };       // #FF5B1F
  const ATENCAO = { r: 0.969, g: 0.843, b: 0.298 }; // #F7D74C
  const GIZ_300 = { r: 0.55, g: 0.55, b: 0.6 };
  const GIZ_500 = { r: 0.35, g: 0.35, b: 0.4 };

  const screens = [
    // [nodeId, name, col, row, isBaseline]
    ['1:2',  'cold-open',                  0, 0, true],
    ['2:2',  'onboarding-short',           1, 0, true],
    ['3:2',  'onboarding-full',            1, 1, false],
    ['4:2',  'bf-method-measure-first',    2, 0, true],
    ['5:2',  'bf-method-photo-first',      2, 1, false],
    ['6:2',  'projection',                 3, 0, true],
    ['8:2',  'paywall-post-projection',    4, 0, true],
    ['7:2',  'paywall-pre-bf',             4, 1, false],
    ['9:2',  'paywall-post-first-reajust', 4, 2, false],
    ['10:2', 'home',                       5, 0, true],
    ['17:2', 'meal-log',                   5, 1, true],
    ['11:2', 'reajust-ticker',             6, 0, true],
    ['12:2', 'reajust-modal',              6, 1, false],
    ['13:2', 'reajust-drawer',             6, 2, false],
    ['14:2', 'weekly-home-card',           7, 0, true],
    ['15:2', 'weekly-dedicated',           7, 1, false],
    ['16:2', 'weekly-notification',        7, 2, false],
  ];
  const byName = Object.fromEntries(screens.map(s => [s[1], s[0]]));

  const headers = [
    [0, '01 · ENTRADA'],
    [1, '02 · ANAMNESE'],
    [2, '03 · BF %'],
    [3, '04 · PROJEÇÃO'],
    [4, '05 · PAYWALL'],
    [5, '06 · HOME · LOG'],
    [6, '07 · REAJUSTE'],
    [7, '08 · SEMANAL'],
  ];

  // 1) Column headers
  for (const [col, text] of headers) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Bold' };
    t.fontSize = 18;
    t.characters = text;
    t.x = X0 + col * COL_STRIDE;
    t.y = 110;
    t.name = 'header-col-' + col;
  }

  // 2) Per-screen labels
  for (const [id, name, col, row, isBaseline] of screens) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Medium' };
    t.fontSize = 13;
    t.characters = name;
    t.fills = isBaseline
      ? [{ type: 'SOLID', color: ARCO }]
      : [{ type: 'SOLID', color: GIZ_300 }];
    t.x = X0 + col * COL_STRIDE;
    t.y = Y0 + row * ROW_STRIDE - 30;
    t.name = 'label-' + name;
  }

  // 3) Connectors
  // Edge spec: { from, to, kind, label? }
  //  kind: 'baseline' (solid Arco arrow), 'fork' (dashed, Giz, no arrowhead — pairs of variants), 'fallback' (dashed Atencao with arrow)
  const edges = [
    // Baseline journey
    { from: 'cold-open',                to: 'onboarding-short',         kind: 'baseline' },
    { from: 'onboarding-short',         to: 'bf-method-measure-first',  kind: 'baseline' },
    { from: 'bf-method-measure-first',  to: 'projection',               kind: 'baseline' },
    { from: 'projection',               to: 'paywall-post-projection',  kind: 'baseline' },
    { from: 'paywall-post-projection',  to: 'home',                     kind: 'baseline' },
    { from: 'home',                     to: 'reajust-ticker',           kind: 'baseline', label: 'reajustar' },
    { from: 'reajust-ticker',           to: 'home',                     kind: 'baseline', label: 'aplicar' },
    { from: 'home',                     to: 'meal-log',                 kind: 'baseline', label: 'registrar' },
    { from: 'meal-log',                 to: 'home',                     kind: 'baseline', label: 'salvar' },
    { from: 'home',                     to: 'weekly-home-card',         kind: 'baseline', label: 'dia 7' },

    // Fork variants (vertical pairs — show "this OR that" at same stage)
    { from: 'onboarding-short',         to: 'onboarding-full',          kind: 'fork', label: '≤ 60s vs ≤ 90s' },
    { from: 'bf-method-measure-first',  to: 'bf-method-photo-first',    kind: 'fork', label: 'medidas vs foto' },
    { from: 'paywall-post-projection',  to: 'paywall-pre-bf',           kind: 'fork', label: 'pré-BF' },
    { from: 'paywall-post-projection',  to: 'paywall-post-first-reajust',kind: 'fork', label: 'após 1º reajuste' },
    { from: 'reajust-ticker',           to: 'reajust-modal',            kind: 'fork', label: 'modal' },
    { from: 'reajust-ticker',           to: 'reajust-drawer',           kind: 'fork', label: 'drawer' },
    { from: 'weekly-home-card',         to: 'weekly-dedicated',         kind: 'fork', label: 'tela cheia' },
    { from: 'weekly-home-card',         to: 'weekly-notification',      kind: 'fork', label: 'push' },

    // Fallback edge: BF foto não detectou → cai para medidas
    { from: 'bf-method-photo-first',    to: 'bf-method-measure-first',  kind: 'fallback', label: 'não consegui' },
  ];

  for (const e of edges) {
    const fromId = byName[e.from], toId = byName[e.to];
    if (!fromId || !toId) continue;
    const c = figma.createConnector();
    c.connectorStart = { endpointNodeId: fromId, magnet: 'AUTO' };
    c.connectorEnd   = { endpointNodeId: toId,   magnet: 'AUTO' };
    c.connectorStartStrokeCap = 'NONE';
    c.connectorEndStrokeCap = e.kind === 'fork' ? 'NONE' : 'ARROW_LINES';
    c.connectorLineType = 'ELBOWED';

    if (e.kind === 'baseline') {
      c.strokes = [{ type: 'SOLID', color: ARCO }];
      c.strokeWeight = 3;
    } else if (e.kind === 'fork') {
      c.strokes = [{ type: 'SOLID', color: GIZ_500 }];
      c.strokeWeight = 1.5;
      c.dashPattern = [4, 4];
    } else { // fallback
      c.strokes = [{ type: 'SOLID', color: ATENCAO }];
      c.strokeWeight = 2;
      c.dashPattern = [6, 4];
    }

    if (e.label && c.text) {
      c.text.fontName = { family: 'Inter', style: 'Medium' };
      c.text.fontSize = 11;
      c.text.characters = e.label;
    }
    c.name = e.from + ' → ' + e.to;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin('NutriHero jornada · pronto · ' + edges.length + ' conectores criados.');
})();
