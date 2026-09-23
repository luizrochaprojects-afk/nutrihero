# NutriHero — Sistema Visual · Pulso

**Direção:** Pulso (escolhida em `02-brand-direction-menu.html`, materializada em `02-brand-direction-visual.html`).
**Status:** Sistema travado. Pronto para implementação sem follow-up.
**Para:** dev/designer copiar tokens direto para Tailwind config, CSS variables ou design tokens JSON.

---

## 0. Tokens prontos para colar (CSS variables)

```css
:root {
  /* — Surface / neutral scale — */
  --c-vazio:    #06070A;  /* page background */
  --c-aco-800:  #0D0F14;  /* panel surface */
  --c-aco-700:  #13151C;  /* card surface */
  --c-linha-600:#1E212A;  /* elevated / hover surface */
  --c-linha-500:#2A2E3A;  /* dividers, ghost button borders */
  --c-cinza-400:#5A5E68;  /* muted text, disabled */
  --c-cinza-300:#8F8B81;  /* secondary text */
  --c-giz-200:  #BDB9AF;  /* tertiary text on dark */
  --c-giz-100:  #EEEBE3;  /* primary text · "Giz" */

  /* — Identity / signal — */
  --c-arco:     #FF5B1F;  /* HERO color · action · pulse · CTA */
  --c-arco-50:  rgba(255, 91, 31, 0.50);
  --c-arco-14:  rgba(255, 91, 31, 0.14);
  --c-atencao:  #F7D74C;  /* single warning state · 1×/week */

  /* — Type — */
  --f-display:  'Archivo', sans-serif;          /* weights 400/500/600/700/900 */
  --f-narrow:   'Archivo Narrow', sans-serif;   /* weights 500/600/700 */
  --f-mono:     'JetBrains Mono', monospace;    /* weights 400/500/700 */

  /* — Spacing (4px base) — */
  --s-0: 0px;
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 20px;
  --s-6: 24px;
  --s-8: 32px;
  --s-10: 40px;
  --s-12: 48px;
  --s-16: 64px;
  --s-20: 80px;
  --s-24: 96px;

  /* — Radius — */
  --r-0: 0;
  --r-1: 2px;
  --r-2: 4px;
  --r-3: 8px;
  /* NUNCA acima de 8px. Pílula proibido. */

  /* — Motion — */
  --ease-pulso: cubic-bezier(0.2, 1, 0.2, 1);
  --t-instant: 100ms;
  --t-fast:    200ms;
  --t-medium:  320ms;
  --t-slow:    600ms;
}
```

---

## 1. Sistema de cor

### Hero color (carrega a identidade)

| Token | HEX | Papel |
|---|---|---|
| **`--c-arco`** | **`#FF5B1F`** | **Cor da marca.** Aparece em: botão de recalibrar, deltas ao vivo, linha de pulso, "I" do wordmark. Máximo **2 elementos por tela**. Se há um terceiro, refazer. |

### Secondary system (escala neutra · 8 passos)

| Token | HEX | Papel | Contraste vs Giz-100 |
|---|---|---|---|
| `--c-vazio` | `#06070A` | Page background. Mais profundo que preto comum — referência: tinta de offset preto absoluto. | 15.8:1 ✓ AAA |
| `--c-aco-800` | `#0D0F14` | Panel surface (containers cheios) | 14.9:1 ✓ AAA |
| `--c-aco-700` | `#13151C` | Card surface (Aço · nível 2 do brief Pulso) | 13.2:1 ✓ AAA |
| `--c-linha-600` | `#1E212A` | Elevated (botão ghost hover, dropdown) | 11.8:1 ✓ AAA |
| `--c-linha-500` | `#2A2E3A` | Dividers, bordas de botão ghost | 9.6:1 ✓ AAA |
| `--c-cinza-400` | `#5A5E68` | Texto desabilitado, muted | 4.2:1 ✓ AA Large |
| `--c-cinza-300` | `#8F8B81` | Texto secundário (Cinza do brief) | 5.9:1 ✓ AA |
| `--c-giz-200` | `#BDB9AF` | Texto terciário, deltas negativos em mono | 9.4:1 ✓ AAA |
| `--c-giz-100` | `#EEEBE3` | **Texto primário · "Giz".** Nunca branco puro #FFF. | — |

### Accent (sharp, intentional, raro)

| Token | HEX | Papel | Contraste vs Vazio |
|---|---|---|---|
| **`--c-atencao`** | **`#F7D74C`** | **Único estado de aviso.** Indulgência semanal: álcool, jantar tarde, escapada de sábado. Usado **1× por semana, não 1× por dia**. Se vira rotina, perde força. | 13.4:1 ✓ AAA |

### Application-specific states (regras de uso)

| State | Token | HEX | Lógica funcional |
|---|---|---|---|
| **No plano** | `--c-arco` | `#FF5B1F` | Linha de pulso 2px sob o número-manchete, animação 2.0s/loop. Sem chip verde — Pulso não usa verde. |
| **Fora do plano** | `--c-arco` (acelerado) | `#FF5B1F` | Mesma cor da linha, animação 0.8s/loop. Sinal: ritmo, não cor nova. |
| **Indulgência semanal** | `--c-atencao` | `#F7D74C` | Chip Atenção em refeição registrada como exceção. Máximo 1× por semana visível. |
| **Δ positivo (kcal extra)** | `--c-arco` | `#FF5B1F` | "+180 kcal @ 19:30" em ticker. Sempre Arco. |
| **Δ negativo (kcal removido)** | `--c-giz-200` | `#BDB9AF` | "−180 kcal" em mono, muted. **Menos alarmante** que extra — você não está em perigo, está renivelando. |
| **Destructive** | `--c-arco` em ghost button | — | Sem vermelho. Botão ghost com borda Arco + texto Arco. Hover preenche. |
| **Disabled** | `--c-cinza-400` | `#5A5E68` | Opacity 0.4 sobre o componente original. |
| **Live indicator** | `--c-arco` | `#FF5B1F` | Bullet ● 8px + "AO VIVO" em Archivo Narrow caps. |

### Forbidden (não negociável)

- ❌ Verde — qualquer tom. Inclusive lima.
- ❌ Azul — qualquer tom. Inclusive ciano "diag".
- ❌ Vermelho dedicado — Arco substitui em todos os usos de alerta.
- ❌ Branco puro `#FFFFFF` — use Giz-100.
- ❌ Gradients decorativos (roxo→azul, etc.).
- ❌ Modo claro. Página nunca clareia além de Aco-800.

---

## 2. Tipografia

### Famílias

| Token | Família | Pesos | Fonte | Papel |
|---|---|---|---|---|
| **Display** | **Archivo** | 400 · 500 · 600 · 700 · **900** | Google Fonts (gratuita) | Manchetes, números-herói (Black 900), corpo (Regular 400 / Medium 500) |
| **Narrow** | **Archivo Narrow** | 500 · 600 · 700 | Google Fonts (gratuita) | Tickers, rótulos, eyebrows. Sempre uppercase + tracking positivo. |
| **Mono** | **JetBrains Mono** | 400 · 500 · 700 | Google Fonts (gratuita) | Todo dígito que importa precisão. Tabular figures. |

**Por que Archivo:** geométrica esportiva, próxima de condensada no Black, sem estética cliche de academia. Família única cobre display + body sem trocar voz.
**Por que JetBrains Mono:** tabular figures (números alinham em colunas), legibilidade IBM-grade, comunica "estes dados importam".

### Type scale (mobile-first, 16px base)

| Token | Família | Peso | Tamanho | Tracking | Line-height | Uso |
|---|---|---|---|---|---|---|
| `display-hero` | Archivo | 900 | clamp(80px, 16vw, 140px) | −0.045em | 0.86 | Wordmark, número do kcal na home |
| `display-1` | Archivo | 900 | 56px | −0.04em | 0.88 | "Plano mudou.", "Sexta é tarde." |
| `display-2` | Archivo | 900 | 32px | −0.03em | 0.95 | Section headers, títulos de tela |
| `display-3` | Archivo | 900 | 22px | −0.02em | 1.0 | Subhead, títulos secundários |
| `ticker-lg` | Archivo Narrow | 500 | 22px | +0.14em | 1.0 | Hero tickers, **UPPERCASE** |
| `ticker-md` | Archivo Narrow | 500 | 14px | +0.14em | 1.0 | Tickers padrão, **UPPERCASE** |
| `ticker-sm` | Archivo Narrow | 500 | 10px | +0.18em | 1.1 | Mini-tickers, eyebrows, **UPPERCASE** |
| `label` | Archivo Narrow | 500 | 13px | +0.14em | 1.2 | Form labels, chip text, **UPPERCASE** |
| `body-lg` | Archivo | 400 | 18px | 0 | 1.5 | Copy longo (paywall, descrições) |
| `body` | Archivo | 400 | 16px | 0 | 1.5 | Corpo padrão |
| `body-sm` | Archivo | 400 | 14px | 0 | 1.5 | Notas, captions |
| `caption` | Archivo | 500 | 11px | +0.04em | 1.4 | Metadados, hints |
| `data-xl` | JetBrains Mono | 700 | 112px | −0.04em | 0.86 | Número-herói (kcal do dia, % gordura) |
| `data-lg` | JetBrains Mono | 700 | 72px | −0.035em | 0.86 | Delta gigante ("−4,1kg") |
| `data-md` | JetBrains Mono | 500 | 32px | −0.02em | 1.0 | Input numérico (peso, altura) |
| `data` | JetBrains Mono | 500 | 16px | 0 | 1.5 | Macros, linhas tabulares |
| `data-sm` | JetBrains Mono | 500 | 12px | +0.04em | 1.4 | Timestamps, IDs |
| `data-xs` | JetBrains Mono | 500 | 10px | +0.12em | 1.4 | Labels técnicos, **UPPERCASE** |

### Filosofia de espaçamento textual

- **Display:** apertado (tracking negativo, line-height < 1) — tipo edge-to-edge sangra a borda.
- **Body:** padrão (tracking 0, line-height 1.5) — leitura confortável em copy longo.
- **Tickers / labels:** espaçado (tracking +0.12 a +0.18em) — tipografia técnica que respira.
- **Mono:** apertado em hero, padrão em tabela. Sempre tabular (`font-feature-settings: 'tnum'`).

### Regras inegociáveis de tipo

1. **Pulso não tem voz itálica.** Zero ocorrência de `font-style: italic` na UI.
2. **Nada de Inter, Roboto, Arial, Space Grotesk, Poppins, Montserrat, system fonts.**
3. **Display sempre uppercase.** Archivo Black em minúsculas perde personalidade — é caixa alta sempre.
4. **Narrow sempre uppercase + tracking positivo.** Nunca em caixa baixa.
5. **Mono só para dígitos que se atualizam.** Nome de usuário, e-mail, etc → Archivo, não Mono.

---

## 3. Layout

### Filosofia de densidade

**Dual-mode comprometido — baseado em tipo de tela:**

| Modo | Quando | Características |
|---|---|---|
| **Operacional · denso** | Home, registro de refeição, semana, configurações | Tipografia compacta, múltiplas linhas de dado, ticker visível, margem mínima |
| **Ritual · respirado** | Splash, paywall, projeção do eu futuro, recalibrar | Tipografia ENORME (display-hero), 60%+ da tela é ar, 1 CTA, no máximo 3 elementos |

Nunca aplique a mesma régua nos dois. Operacional sufoca quando respirado, ritual fica frio quando denso.

### Grid

- **Mobile-first.** Single column. Margem externa **16px (`--s-4`)**, nunca acima.
- **Tipo display sangra até 4px da borda** — o número herói é maior que a área de leitura confortável de propósito. Lê edge-to-edge.
- **Botão CTA full-bleed** dentro da margem de 16px.
- **Desktop (pós-MVP):** 12 colunas, gutter 16px, max-width 1440px, padding-x 64px.

### Asymmetry rules (intencional, não decorativa)

| Onde | Como | Por quê |
|---|---|---|
| Header da home | BF% à esquerda, kcal restante à direita — não centralizado | "Status de telemetria", lê como cockpit |
| Botão de recalibrar | Full-bleed na base, levemente offset para direita (8px) | Ergonomia de polegar destro + assimetria de propósito |
| Hero numbers | Texto alinhado à esquerda, sangrando a borda direita | Tipo edge-to-edge, sensação de "transbordando o frame" |
| Projeção de foto | 2 fotos em grid 50/50, mas a futura tem 3px de fio Arco à direita | Marca o "destino" sem centralizar |

### Spacing scale (base 4px)

| Token | Valor | Uso típico |
|---|---|---|
| `--s-0` | 0 | reset |
| `--s-1` | 4 | gap entre chips, padding interno mínimo |
| `--s-2` | 8 | gap entre items de lista compacta, padding de chip |
| `--s-3` | 12 | padding de meal card, gap entre rows tabulares |
| `--s-4` | 16 | **margem externa padrão**, padding de container |
| `--s-5` | 20 | padding de card grande |
| `--s-6` | 24 | gap entre seções pequenas |
| `--s-8` | 32 | gap entre seções, padding de hero card |
| `--s-10` | 40 | padding superior de tela ritual |
| `--s-12` | 48 | gap entre blocos hero |
| `--s-16` | 64 | padding-x de container desktop |
| `--s-20` | 80 | padding-y de seções de doc |
| `--s-24` | 96 | padding-y de seções de cover/hero |

### Z-axis (elevação sem sombra)

Pulso é monocromático escuro — sombras lêem mal. Elevação se faz por cor de fundo + borda ocasional.

| Layer | Token | Background | Borda |
|---|---|---|---|
| z-0 | page | `--c-vazio` | — |
| z-1 | panel | `--c-aco-800` | — |
| z-2 | card | `--c-aco-700` | — |
| z-3 | hover state | `--c-linha-600` | `1px --c-linha-500` |
| z-4 | modal / dropdown | `--c-linha-600` | `1px --c-linha-500` |

**Modal overlay:** `background-color: rgba(6, 7, 10, 0.75)` + `backdrop-filter: blur(4px)`.
**Sem `box-shadow` em nenhuma camada.** Quando precisar destacar (botão hover, card focado): glow sutil via `box-shadow: 0 0 0 1px var(--c-arco), 0 24px 60px -20px var(--c-arco-14)`. Glow é Arco, não preto.

---

## 4. Component spec

### Button — primary (`btn-primary`)

| Prop | Valor |
|---|---|
| Background | `--c-arco` |
| Text color | `--c-vazio` |
| Font | Archivo Black 900, 14-18px, uppercase, tracking +0.04em |
| Padding | `14px 20px` (default), `18px 24px` (hero) |
| Radius | `--r-2` (4px) |
| Border | none |
| Height | 48px (default), **72px (Recalibrar — peça-herói)** |
| Width | full-bleed (default) |
| Cursor | pointer |

**Estados:**
| Estado | Mudança |
|---|---|
| `:hover` | `opacity: 0.92` + `transform: scaleY(0.98)` · transição 200ms |
| `:active` | `transform: scale(0.96)` · 100ms |
| `:focus-visible` | `outline: 2px solid var(--c-arco); outline-offset: 3px` |
| `:disabled` | `opacity: 0.4; cursor: not-allowed` |

### Button — ghost (`btn-ghost`)

- Background: `transparent`
- Border: `1px solid var(--c-linha-500)`
- Text: `var(--c-giz-100)`, font igual ao primary
- `:hover` → border `var(--c-arco)`, text `var(--c-arco)` (sem fill)
- Outros estados iguais ao primary

### Button — destructive (`btn-destructive`)

- Background: `transparent`
- Border: `1px solid var(--c-arco)`
- Text: `var(--c-arco)`, font igual
- Copy: imperativo em caps ("APAGAR TUDO", "REMOVER CONTA")
- `:hover` → background `var(--c-arco)`, text `var(--c-vazio)` (preenche)

### Input — numérico (`input-num`)

- Background: `transparent`
- Border: none, **`border-bottom: 1px solid var(--c-linha-500)`**
- Text: JetBrains Mono 700, 28px (`data-md`), `var(--c-giz-100)`, **alinhamento direito**
- Padding: `8px 0`
- Unit chip (à direita): Archivo Black 700, 11px, `var(--c-arco)`, uppercase, tracking +0.08em — sem background, só texto
- `:focus` → `border-bottom: 1px solid var(--c-arco)` · 200ms
- Placeholder: `var(--c-cinza-400)`, JetBrains Mono 500 — some no focus, não move

### Input — texto (`input-text`)

- Background: `var(--c-aco-700)`
- Border: none
- Text: Archivo 500, 16px (`body`), `var(--c-giz-100)`
- Padding: `14px 16px`
- Radius: `--r-2` (4px)
- `:focus-visible` → `outline: 2px solid var(--c-arco); outline-offset: 2px`
- Placeholder: `var(--c-cinza-400)`

### Card / Surface (`card`)

- Background: `var(--c-aco-700)`
- Border: none (separação via espaço ou divider `1px solid var(--c-linha-500)`)
- Radius: `--r-3` (8px)
- Padding: `--s-4` a `--s-5` (16-20px)
- Sem sombra
- `:hover` (quando clicável) → background `var(--c-linha-600)` · 200ms

### Meal card (`meal-card`)

| Prop | Valor |
|---|---|
| Background | `var(--c-aco-700)` |
| Border-left | `2px solid` — **`--c-arco`** se feito, **`--c-linha-500`** se pendente |
| Radius | 0 (deliberadamente sem radius para reforçar leitura tabular) |
| Padding | `12px 14px` |
| Header (nome refeição) | Archivo 600, 13px, uppercase, `--c-giz-100` |
| Kcal | JetBrains Mono 500, 14px, `--c-giz-100` (feito) ou `--c-cinza-400` (pendente) |
| Items (lista alimentos) | Archivo 400, 11px, `--c-cinza-300` |
| Opacity | 0.65 quando `pendente` |

### Pulso de Recalibração (`pulso-line`) · **componente-assinatura**

```css
.pulso-line {
  height: 2px;
  background: var(--c-arco);
  transform-origin: left center;
  animation: pulse-on-plan 2.0s var(--ease-pulso) infinite;
}
.pulso-line.off-plan {
  animation-duration: 0.8s;  /* mais rápido = fora do plano */
}
@keyframes pulse-on-plan {
  0%, 100% { opacity: 0.5; transform: scaleX(0.85); }
  50%      { opacity: 1.0; transform: scaleX(1.0); }
}
```

- **Largura:** match exato com o número-manchete acima
- **Posição:** imediatamente abaixo do número, gap 14px
- **Estado "no plano":** 2.0s loop
- **Estado "fora do plano":** 0.8s loop — visivelmente acelerado, mesma cor
- **Hover/tap:** pausa animação, mostra tooltip com `% de adesão da semana`
- **v1.1:** vira som também — frequência 220Hz, vol −42dB, loop 1.6s

### Ticker bar (`ticker`)

```css
.ticker {
  height: 36px;
  border-top: 1px solid rgba(255, 91, 31, 0.5);
  border-bottom: 1px solid rgba(255, 91, 31, 0.5);
  overflow: hidden; white-space: nowrap;
  display: flex; align-items: center;
}
.ticker-inner {
  display: inline-block;
  animation: ticker 24s linear infinite;
  font-family: var(--f-narrow);
  font-weight: 500;
  font-size: 13px;
  color: var(--c-arco);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}
.ticker-inner span { padding: 0 22px; }
.ticker-inner span::before { content: '·'; padding-right: 22px; color: rgba(255, 91, 31, 0.5); }
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- **Conteúdo duplicado inline** (renderizar a mesma sequência 2× para loop infinito sem corte)
- **24s/loop** — natural reading speed
- **1 ticker por tela.** Dois tickers competindo = um errado.
- **Posição:** sob o número-herói ou no rodapé da tela. Nunca no meio.

### Arc Gauge (`arc`) · 270° gauge para % gordura, % meta, sequência

- SVG 200×200 viewBox
- Background arc: `stroke="var(--c-linha-500)"`, `stroke-width="14"`, `stroke-linecap="round"`
- Progress arc: `stroke="var(--c-arco)"`, `stroke-width="14"`, `stroke-linecap="round"`
- Center number: Archivo Black 900, **44-48px**, `var(--c-giz-100)`, letter-spacing −2px
- Below number: JetBrains Mono 500, 9-10px, `var(--c-cinza-300)`, letter-spacing +2px, **UPPERCASE**
- Ângulo: arco vai de 222° a 138° (270° total, abertura para baixo)

### Chip — Atenção (`chip-atencao`)

- Background: `var(--c-atencao)`
- Text: `var(--c-vazio)`
- Font: Archivo Black 900, 10-12px, uppercase, tracking +0.10em
- Padding: `4px 10px`
- Radius: `--r-1` (2px)
- **Usage rule:** 1× por semana máximo. Se aparece 3× na mesma semana, refazer a copy.

### Live indicator (`live-dot`)

- Bullet: `●` 8px Arco
- Text: "AO VIVO" em Archivo Narrow 500, 11px, Arco, uppercase, tracking +0.18em
- Sem background, sem border, gap interno 6px

### Eyebrow / screen meta (`eyebrow`)

- Layout: flex justify-between
- Esquerda (contexto): Archivo Narrow 500, 11px, `--c-cinza-300`, uppercase, tracking +0.18em
- Direita (status): mesma fonte, `--c-arco` se ao vivo, `--c-cinza-300` se neutro
- Posição: topo de toda tela operacional

### Bar chart (`bar-chart`) · para revisão semanal

- 7 barras (semana) em grid `repeat(7, 1fr)`, gap 4px
- Altura container: 88-100px
- Barra default: `var(--c-linha-500)`
- Barra do dia em alerta: `var(--c-arco)` (estouro)
- Barra de indulgência prevista: `var(--c-atencao)` (sábado social)
- Sem labels nas barras — labels embaixo em mono uppercase

---

## 5. Sistema de ícones

### Estilo

- **Outline (stroke), nunca filled.**
- **Stroke weight: 2px** (constante em todos os tamanhos)
- **Stroke linecap: square.** Nunca round.
- **Stroke linejoin: miter.** Nunca round.
- **Sem cantos arredondados.** Geometria pura.
- **Cor padrão:** `--c-giz-100`. Estado ativo: `--c-arco`.

### Tamanhos (grid de 4px)

| Token | Tamanho | Uso |
|---|---|---|
| `icon-xs` | 12px | Inline em texto pequeno |
| `icon-sm` | 16px | Inline em body |
| `icon-md` | 20px | **Default UI** (navigation, list items) |
| `icon-lg` | 24px | Action buttons, headers |
| `icon-xl` | 32px | Empty states, hero icons |
| `icon-2xl` | 48px | Splash, onboarding ilustrativos |

### Source

- **Base library:** Tabler Icons (free, MIT) — stroke 2px, square caps já compatíveis
- **Customizações Pulso-específicas (devem ser desenhadas):**

| Ícone | Metáfora Pulso (não use o padrão) |
|---|---|
| Recalibrar | **Forma de onda estilizada com seta** (não circle-refresh nem rotate-arrow) |
| Tirar foto | **Colchetes de enquadramento `[ ]`** (não camera) |
| Calendar / semana | **Stack de 7 linhas horizontais** com a do dia em Arco (não calendar grid) |
| Profile / conta | **Único ponto dentro de círculo outline** (não person silhouette) |
| Settings | **Marca única de dial** (não gear) |
| Refeição feita | **Tick sólido em mono spacing** (não checkmark cursive) |
| Plano mudou | **Triângulo apontando direita + linha de onda** |

### Regra de ouro

Se o ícone genérico da Tabler funciona, use. Se for um conceito Pulso-específico (recalibrar, projeção, ticker), desenhe custom.

---

## 6. Motion

### Personalidade em 3 palavras

**Rápido · Cinético · Sem ornamento**

### Easing curves

| Token | Cubic-bezier | Uso |
|---|---|---|
| `--ease-pulso` | `cubic-bezier(0.2, 1, 0.2, 1)` | **Curva padrão.** Fast in, slow out. Tudo usa esta. |
| `--ease-linear` | `linear` | Tickers contínuos (marquise) |

**Forbidden:**
- ❌ `cubic-bezier(0.68, -0.55, 0.27, 1.55)` (bounce / overshoot)
- ❌ `ease-in-out` decorativo
- ❌ Spring physics
- ❌ Qualquer easing com elasticidade

### Duration scale

| Token | Valor | Uso |
|---|---|---|
| `--t-instant` | 100ms | Button press feedback (scale + opacity) |
| `--t-fast` | 200ms | UI state changes (hover, focus, disabled toggle) |
| `--t-medium` | 320ms | Entrance transitions, count-up de numerais, transição entre telas |
| `--t-slow` | 600ms | **Pulso de armar** (flash Arco antes de o plano mudar) |
| `--t-ticker` | 24s/loop | Ticker marquise |
| `--t-pulse` | 2.0s/loop (no plano) · 0.8s/loop (fora) | Pulso de Recalibração |

### Entrance patterns

| Tipo | Pattern |
|---|---|
| Número-herói | `count-up de 0 até valor final` em `--t-medium`, ease-out · sem fade |
| Texto (display) | `translateY(16px → 0) + opacity(0 → 1)` em `--t-medium` |
| Card | `opacity(0 → 1)` em `--t-fast`, sem translate |
| Ticker | aparece a 100% opacity, animação começa imediatamente |
| Body projection (eu do futuro) | **Hard cut + flash de 1 frame (40ms) em Giz**, depois exibe a nova foto. SEM dissolve. |

### Exit patterns

- `opacity(1 → 0)` em `--t-fast`
- Opcional `translateY(0 → -8px)` para texto

### High-priority moments (onde motion vale o gasto)

1. **Pulso de Recalibração** — contínuo, nunca para enquanto a tela está viva. É a marca em movimento.
2. **Estado "Plano mudou"** — flash Arco de **600ms** (`--t-slow`) que **arma a tela**, depois o novo plano entra batendo em `--t-medium`.
3. **Reveal da projeção corporal** — corte seco + flash de 1 frame em Giz. Sem dissolve, sem morph.
4. **Count-up de numerais ao entrar na tela** — kcal restante anima de 0 até valor final em 320ms.

### What to avoid

- ❌ Parallax no scroll (Pulso é tela-por-tela, não scroll-driven)
- ❌ Loading spinners "felizes" (use Pulso de Recalibração acelerado em vez)
- ❌ Hover micro-animations em todos os botões (só em elementos clicáveis)
- ❌ Fade in de tudo (números fazem count-up, texto translata, só decorações fazem fade)
- ❌ Animação de checkmark "victorioso" ao registrar refeição (use mudança da borda left de linha-500 → Arco em `--t-fast`)
- ❌ Skeleton loaders com shimmer
- ❌ Confetti, particle effects, hearts, qualquer celebração

---

## 7. The one thing they will remember forever

**A linha laranja de 2px que pulsa sob o número.**

Não é o logo. Não é a cor. Não é a tipografia. É a **Pulso de Recalibração** — uma linha fina que vive sob o kcal do dia, pulsando lentamente quando você está no plano, mais rápido quando não está. No segundo mês de uso, o usuário sente a aceleração antes de ler o número. Em um screenshot na timeline de um influenciador parceiro, é a única coisa que precisa estar visível para alguém reconhecer NutriHero.

Se um componente do sistema for sacrificado em qualquer reescrita futura, **este é o último a sair**.

---

## 8. Implementação · checklist de handoff

Para o dev abrir o repo e começar:

1. [ ] Adicionar Google Fonts no `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;900&family=Archivo+Narrow:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
   ```
2. [ ] Colar bloco `:root { ... }` da seção §0 em `app/globals.css` (ou equivalente)
3. [ ] Configurar `font-feature-settings: 'tnum'` no JetBrains Mono globalmente
4. [ ] Setar `body { background: var(--c-vazio); color: var(--c-giz-100); font-family: var(--f-display); font-weight: 400; }`
5. [ ] Componentes — implementar nesta ordem:
   - Button (primary, ghost, destructive)
   - Input (numérico + texto)
   - **Pulso de Recalibração** (componente-assinatura — testar isoladamente antes)
   - Ticker bar
   - Meal card
   - Arc Gauge
   - Eyebrow + Live indicator
6. [ ] Configurar `prefers-reduced-motion: reduce` — desabilita ticker + Pulso (acessibilidade)
7. [ ] Tabular figures: `font-variant-numeric: tabular-nums` em todo elemento JetBrains Mono
8. [ ] Validar contraste com axe DevTools — todos os pares de texto vs background devem passar AA mínimo

---

## 9. Tailwind config snippet (se aplicável)

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        vazio:    '#06070A',
        'aco-800':'#0D0F14',
        'aco-700':'#13151C',
        'linha-600':'#1E212A',
        'linha-500':'#2A2E3A',
        'cinza-400':'#5A5E68',
        'cinza-300':'#8F8B81',
        'giz-200': '#BDB9AF',
        'giz-100': '#EEEBE3',
        arco:     '#FF5B1F',
        atencao:  '#F7D74C',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        narrow:  ['Archivo Narrow', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'pulso-1': '2px',
        'pulso-2': '4px',
        'pulso-3': '8px',
        // sem 'lg', 'xl', 'full' — proibido em Pulso
      },
      transitionTimingFunction: {
        pulso: 'cubic-bezier(0.2, 1, 0.2, 1)',
      },
      transitionDuration: {
        instant: '100ms',
        fast:    '200ms',
        medium:  '320ms',
        slow:    '600ms',
      },
    },
  },
};
```

---

## 10. O que este documento NÃO resolve

- Tradução para Figma library (variables/components) — entrega separada
- Sons da identidade sonora (Pulso vira som no v1.1) — handoff de áudio separado
- Empty states ilustrados — desenhar caso a caso, seguindo princípios
- Estados de loading customizados — usar Pulso de Recalibração acelerado por padrão
- Onboarding visual completo — depende do passo 3 (`/execute-visual-identity`)
- Logo final ilustrada — passo 3

---

**Próximo passo:** `/execute-visual-identity` para materializar estes tokens em logo, app icon, 8+ mockups e sistema de motion final.
