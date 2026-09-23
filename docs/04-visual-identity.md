# NutriHero — Identidade Visual · Pulso · Execução

**Direção:** Pulso (`02-brand-direction-visual.html`)
**Sistema:** Tokens travados em `03-visual-system.md`
**Status:** Identidade comprometida. Pronta para implementação.
**Companion:** `04-visual-identity.html` — renderização visual do que está descrito aqui.

---

## 1. Sistema de logo

### 1.1 Conceito

A marca tem **dois elementos visuais formalmente irmãos** que coexistem sem competir:

| Elemento | Forma | Uso |
|---|---|---|
| **Wordmark** | "NUTR**I**HERO" — Archivo Black 900, todas as letras em Giz, **apenas o "I" central em Arco** | Splash, header de UI, marketing, manifesto |
| **Mark (Pulso)** | Stroke vertical Arco + disco Arco preenchido no ponto médio | App icon, favicon, marca compacta em mídia social, marca em pé-de-página |

O Mark é uma destilação ortogonal da signature do produto (a Pulso de Recalibração — linha que bate sob o número do dia). A linha é a marca; o disco é a batida. **A marca É o produto.**

### 1.2 Origem conceitual

- O **stroke vertical** = a "linha de pulso" que vive sob o número-manchete do app. A mesma linha que pulsa devagar quando você está no plano, rápido quando não está.
- O **disco no meio** = a batida capturada — o exato momento da recalibração. Um pulso, parado no tempo.
- A leitura imediata: tipografia "i". A leitura próxima: timeline vertical com uma batida no meio. Ambas lêem como NutriHero.

### 1.3 Geometria do Mark

```
Frame de referência: 64 × 64 unidades

  ┌──────────────────────────────┐
  │                              │
  │            ┌──┐              │ ← stroke top: y=8
  │            │  │              │
  │            │  │              │
  │            │  │              │
  │          ┌─┴──┴─┐            │ ← disco top: y=23
  │         ╱       ╲            │
  │        │         │           │
  │        │    ●    │           │ ← centro: (32, 32)
  │        │         │           │
  │         ╲       ╱            │
  │          └─┬──┬─┘            │ ← disco bottom: y=41
  │            │  │              │
  │            │  │              │
  │            │  │              │
  │            └──┘              │ ← stroke bottom: y=56
  │                              │
  └──────────────────────────────┘
```

| Elemento | Spec |
|---|---|
| Stroke vertical | `x: 29-35` (largura 6) · `y: 8-56` (altura 48) · `fill: #FF5B1F` · cantos retos (sem arredondamento) |
| Disco | `cx: 32, cy: 32` · `r: 9` · `fill: #FF5B1F` |
| Frame | 64×64 unidades (escala proporcional para qualquer tamanho) |

**SVG implementação:**
```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="29" y="8" width="6" height="48" fill="#FF5B1F"/>
  <circle cx="32" cy="32" r="9" fill="#FF5B1F"/>
</svg>
```

### 1.4 Geometria do Wordmark

- Família: **Archivo Black 900**
- Caixa: **alta** (sem variante minúscula)
- Letter-spacing: `−0.045em`
- Line-height: `0.86`
- Letras N-U-T-R-H-E-R-O: `--c-giz-100` (#EEEBE3)
- Letra **I (posição 5)**: `--c-arco` (#FF5B1F)
- Espaçamento entre letras: padrão da fonte (não ajustar individualmente)
- Sem tracking modificado por letra

### 1.5 Primary lockup

**Horizontal (default):**
```
[MARK]    NUTRIHERO
   ↑ gap 1 H-height
```
- Mark à esquerda, wordmark à direita
- Gap entre eles: igual à altura do `H` do wordmark (≈86% da altura total)
- Mark altura: 100% da H-height do wordmark
- Alinhamento: baseline do wordmark + center do mark

**Stacked (vertical, para apps verticais / app icon assistive):**
```
   [MARK]
NUTRIHERO
```
- Mark acima, wordmark abaixo
- Gap: `--s-3` (12px no tamanho de referência)
- Mark altura: 1.6× H-height do wordmark abaixo

### 1.6 Variantes

| Variante | Background | Stroke | Disco | Wordmark |
|---|---|---|---|---|
| **Primary · Dark** | `--c-vazio` (#06070A) | Arco | Arco | Giz · I em Arco |
| **Primary · Light** | `--c-giz-100` (#EEEBE3) — apenas para contextos forçados (papel, parceria com marca onde fundo é claro) | Arco | Arco | Vazio · I em Arco |
| **Mono · Dark** | Vazio | Giz | Giz | Giz (sem destaque do I) — uso em moeda, gravação a laser, contextos sem cor |
| **Mono · Light** | Giz | Vazio | Vazio | Vazio |
| **Reversed** | Arco preenchendo o background | Vazio | Vazio | Vazio | Uso em momentos de alta intensidade — paywall, "PLANO MUDOU" full-screen |

### 1.7 Tamanhos mínimos legíveis

| Aplicação | Tamanho mínimo do Mark | Wordmark legível? |
|---|---|---|
| Splash | 64px | sim (junto) |
| Header de UI | 24px | sim (junto) |
| Favicon (browser tab) | 16px | **só Mark** |
| App icon iOS/Android | 60px @1x (180px @3x) | **só Mark** |
| Marca em rodapé | 14px | sim (compacto) |
| Botão de share em redes | 32px | **só Mark** |

**Regra:** abaixo de 60px, o wordmark some. Só o Mark sobrevive. Esse é o teste de força da marca — a linha vertical Arco com o disco precisa ser reconhecível sozinha.

### 1.8 Por que esta marca é ownable

| Clichê de categoria evitado | Como Pulso resolve |
|---|---|
| Apps de dieta: maçã, folha, garfo, prato | Sem referência alimentar nenhuma — a marca é sobre o tempo, não a comida |
| Apps de fitness: figura humana, halter, abs, chamas | Sem referência corporal nem força bruta |
| Apps de saúde: cruz, gota, coração, ECG horizontal | Vertical (não horizontal), pontuado por disco (não onda) — ECG cliché evitado |
| Startups SaaS: gradiente roxo, "playful" geometric blob | Cor única, geometria literal, sem brincadeira |
| Letterforms genéricos: "N" estilizado, monograma de iniciais | A marca usa o "i" (letra do meio do nome), não a primeira — sutilmente subversivo |

**O que torna a marca ownable:** a coincidência entre a forma (vertical line + dot) e o componente-assinatura do produto (Pulso de Recalibração). Em screenshot de qualquer tela do app, a marca está implícita na linha sob o número diário. Marca e produto são o mesmo gesto.

---

## 2. App Icon

### 2.1 Estrutura

| Camada | Spec |
|---|---|
| Canvas master | 1024 × 1024 (iOS reference) · também 512 (Android maskable) |
| Background | Solid `--c-vazio` (#06070A) · sem gradient, sem textura |
| Foreground | Mark (vertical stroke + disco) escalado para 60% da altura do canvas |
| Mark posicionamento | Centrado horizontal e verticalmente |
| Stroke weight em 1024 canvas | 96px (escala linear do 6 do canvas 64) |
| Disco diameter em 1024 canvas | 288px (escala linear do 18 do canvas 64) |
| Shape mask | Sem máscara aplicada — Vazio sólido full-bleed; o OS aplica seu próprio mask (rounded-square iOS, círculo Android adaptive) |
| Notch / iOS safe area | Mark fica em zona safe (margem de 102px = 10% do canvas) |

### 2.2 Comportamento em escala pequena

| Tamanho | O que sobrevive | O que cai |
|---|---|---|
| 1024px (App Store) | tudo | nada |
| 180px (iOS @3x) | tudo nítido | nada |
| 60px (iOS @1x) | stroke vertical + disco ainda legíveis | clareza dos cantos retos do stroke |
| 32px (browser tab grande) | linha vertical Arco contra Vazio · disco vira ponto difuso mas perceptível | refinamento de proporção |
| 16px (favicon) | **só a barra Arco sobrevive como sinal vertical** · o disco vira parte do stroke | distinção do disco |

**Teste de 16px:** mesmo perdendo o disco, a barra vertical Arco contra Vazio em 16px é distintiva. Não há outro app de nutrição/fitness com essa cara — todos os concorrentes têm logos circulares verdes/vermelhos/azuis em 16px.

### 2.3 Variantes de plataforma

| Plataforma | Tratamento |
|---|---|
| iOS | Rounded square mask (aplicado pelo iOS), Vazio full-bleed, Mark centrado |
| Android adaptive | Foreground layer: Mark a 60% · Background layer: Vazio solid · ambos full-bleed (Android decide o crop) |
| macOS | Squircle padrão, Vazio + Mark |
| Web favicon | SVG inline, 16×16 e 32×32 versions (no 32 o disco fica reduzido) |
| PWA | 192px, 512px, maskable + non-maskable variants |
| watchOS (futuro) | Circular crop — Mark centrado, sem disco (disco perderia em 38px round) |

### 2.4 Notification icon (Android monochrome)

- Tela só permite branco em formato silhueta
- Implementação: stroke + disco em branco puro, Vazio transparente
- O sistema Android tinta automaticamente com a cor do app

---

## 3. Screen mockups

Cinco telas core. Cada uma é uma cena-prova da identidade.

### 3.1 — Tela 01 · Home / Daily Dashboard

**Layout:**
- Status bar nativo (top 22px reservado)
- Eyebrow row em `y: 32-44px` — duas colunas: "TER · 19 MAI" (esquerda) + "● NO PLANO" (direita, Arco)
- Hero number block em `y: 50-160px` — número kcal em `data-xl` (112px JetBrains Mono Bold), sangrando a borda esquerda em 16px da margem
- Sub-line em `y: 168-186px` — "/ 2.496 KCAL · 88%" em `display-3` (22px Archivo Black, Arco)
- **Pulso de Recalibração** em `y: 200-202px` — linha 2px Arco, animação 2.0s/loop, largura igual ao número-manchete
- Macros stack em `y: 220-330px` — 5 linhas tabulares em `data` (16px JetBrains Mono), label em Cinza-300, valor em Giz-100, divider 1px Linha-500 entre rows
- Ticker bar em `y: bottom-66px` (sticky) — height 36px, border-top/bottom Arco 50%, conteúdo em `ticker-md`, marquise 24s
- CTA primary em `y: bottom-14px` (sticky) — "Recalibrar jantar" em Archivo Black 12px caps, fundo Arco, altura 48px, full-bleed menos 12px margin

**Composição:**
- Dominante: o número `2.184` em 112px que ocupa 30% vertical da tela
- Recede: macros em mono, ticker laranja
- Flow direction: vertical descendente — olho cai do número-manchete pela linha de pulso, passa pelos macros, encontra o ticker rolando, conclui no CTA

**Standout element:** **a linha laranja pulsando sob o número.** Mesmo em screenshot estático, a linha é a única peça que não tem equivalente em nenhum outro app de dieta. Ela é o ícone visual do produto.

**Typography in context:**
- `data-xl` (112px Mono Bold) — kcal número
- `display-3` (22px Archivo Black caps Arco) — sub do número
- `ticker-md` (14px Narrow caps Arco) — ticker
- `data` (16px Mono) — macros valor
- `data-xs` (10px Mono caps Cinza-300) — macros label
- `label` (13px Narrow caps) — eyebrow

**Color in context:**
- Background: Vazio
- Hero number: Giz-100
- Acento (Pulso line + ticker + CTA + "NO PLANO" dot): Arco — exatamente 4 ocorrências, todas funcionais
- Macros: Giz-100 (valor) + Cinza-300 (label)
- Dividers: Linha-500

**Empty / loading state:**
- Background Vazio
- No lugar do número-manchete: skeleton vazio 112px tall + um Pulso line acelerado (0.8s) — em vez de shimmer
- Macros: 5 rows com `var(--c-linha-600)` ocupando o lugar dos valores, sem animação
- Ticker: mostra apenas " · CARREGANDO · "
- Tempo target: < 800ms até número aparecer com count-up

---

### 3.2 — Tela 02 · Recalibrate State

**Layout:**
- Status bar
- Eyebrow row em `y: 32-44px` — "RECALIBRANDO" (esquerda) + "● ARMANDO" (direita, Arco)
- Hero title em `y: 60-180px` — duas linhas em `display-1` (56px Archivo Black 900):
  - Linha 1: "PLANO" em Giz-100
  - Linha 2: "**MUDOU.**" em Arco
- Ticker laranja em `y: 200-236px` — height 36px, border-top/bottom Arco (não 50%, mas 100% — destacado), conteúdo: "+180 KCAL @ 19:30 · +24G PROTEÍNA · PULAR LANCHE · RENIVELAR 21:40 ·"
- Diagnóstico em `y: 256-380px` — texto em `data` (16px Mono) com line-height 1.6:
  ```
  Você pulou o café. O jantar fica maior.
  O plano ainda bate a meta da semana.

  Δ café manhã · −510 kcal
  Δ jantar     · +330 kcal
  Δ lanche     · −180 kcal
  Meta semanal · intacta
  ```
- CTA dual em `y: bottom-14px` — dois botões side by side:
  - Primary (60% largura): "Aceitar" — Arco fundo
  - Ghost (40% largura): "O que mudou?" — border Linha-500

**Composição:**
- Dominante: "MUDOU." em Arco — único uso de Arco gigante em texto em todo o app
- Visual flow: olho começa em "PLANO" (Giz), aterrissa em "MUDOU." (Arco) — efeito impactante mesmo em screenshot
- Ticker logo abaixo cria a sensação de movimento contínuo durante a leitura

**Standout element:** o **"MUDOU."** em Arco 56pt, descendo do "PLANO" em Giz. Esse é o momento de mais alta intensidade tipográfica do app inteiro. Em vez de modal alert ("Are you sure?"), o produto te informa com peso editorial.

**Typography in context:**
- `display-1` (56px Archivo Black caps) — hero title
- `ticker-md` (14px Narrow caps Arco) — ticker
- `data` (16px Mono) — corpo do diagnóstico
- `label` (13px Narrow caps) — eyebrow

**Color in context:**
- Background: Vazio
- "MUDOU." em Arco — única instância grande de Arco em tipografia no app
- Ticker borders em Arco solid (não 50% como no Home) — para sinalizar urgência
- Diagnóstico body em Cinza-300, valores em Giz-100

**Empty / loading state:**
- Não tem "loading" — esta tela aparece após um cálculo do servidor
- Se cálculo demora > 200ms: a tela renderiza o título "PLANO MUDOU." mas o ticker fica vazio com " · CALCULANDO · " · diagnóstico mostra "—"
- **Arming flash** (pré-tela): a tela anterior (Home) recebe um flash Arco de 600ms full-screen ANTES desta tela aparecer — "arma" psicologicamente o usuário para a transição

---

### 3.3 — Tela 03 · Body Projection (Mirror Reveal)

> **Atualização (mai/2026):** o layout descrito a seguir é o **Mirror Reveal** — escolhido em `prototype/compare.html?fork=projection` após teste das 3 variantes (Espelho, Delta-manchete, Trajetória). A versão original empilhava `−4,1KG display-1` + subtitle de composição corporal + dual CTA — desfeito porque ficou "frio, mui ble" (feedback do founder) e porque dual CTA "Mostrar 6 meses" não fazia parte do MVP. Spec executável vive em `05-dev-handoff.md §6.3`.

**Layout (3 element blocks, ritual):**
- Status bar
- Back btn `y: 16px` (cromo padrão)
- Eyebrow row em `y: 56-68px` — "**VOCÊ · 22 · AGO · 2026**" em Narrow caps 11pt **Arco** (data computada `today + 90 dias`, atualiza em runtime)
- Headline `y: 88-160px` — "**Daqui a / 90 dias.**" em `display-2` (32pt Archivo Black, 2 linhas, line-height 0.95) Giz-100
- Photo grid `y: 200-560px` (flex stretch · centraliza vertical) — 2 colunas iguais, gap 12px:
  - Coluna esquerda (HOJE): foto P&B alto contraste, fundo Aco-700, sem fio · stamp "HOJE" canto sup-esq em Narrow Cinza-300 · BF% canto inf-esq em Mono 28pt Giz-100
  - Coluna direita (FUTURO): foto P&B alto contraste + **fio Arco 3px na borda direita** · stamp "FUTURO" Giz-200 · BF% Mono 28pt **Giz-100** (não Arco — budget!)
- Kicker `y: 580-624px`:
  - PulsoLine 2px Cinza-300 estática full-width (assinatura, sem pulse Arco — budget)
  - Linha kg: "**−3.2** kg de gordura" — `−3.2` em Mono 26pt **Arco** · `kg de gordura` em Narrow caps 11pt Giz-200
- CTA em `y: bottom-24px`: **"Manter ritmo"** Button-primary full-bleed Arco (CTA único, sem ghost)

**Tríade Arco (instâncias permitidas):**
1. Eyebrow data — *quando*
2. Fio Arco direita do FUTURO — *quem é*
3. Número kg no kicker — *quanto*

Mais CTA primary = 4ª permitida (peça-âncora). Nada além disso recebe Arco.

**Composição:**
- Dominante: a foto da direita com o fio Arco
- Visual flow: olho desce do título → compara fotos → cai no kicker kg em Arco → CTA
- Equal-weight visual entre HOJE e FUTURO (comparação honesta, não manipulada por scale)

**Standout element:** o **reveal sequence** (ver §5.3) é o que distingue esta tela de qualquer tabela "before/after". Sem a chegada cinematográfica, a tela vira planilha.

**Typography in context:**
- `display-2` (32pt Archivo Black) — headline
- `label` (11pt Narrow caps) — eyebrow data + stamps das silhuetas + label "kg de gordura"
- `data-md` (26pt Mono Bold) — kg kicker
- Mono 28pt — BF% nas silhuetas

**Color in context:**
- Background: Vazio (dark only)
- Photos: B&W puro (sem tint Arco no corpo)
- Fio na foto futura: Arco 3px solid (borda direita)
- BF% futuro: Giz-100 (não Arco — preserva budget)
- PulsoLine entre fotos e kicker: Cinza-300 estática (não pulsa)
- Kicker "−3.2" em Arco · "kg de gordura" em Narrow Giz-200

**Empty / loading state:**
- A tela **é o próprio reveal** — HOJE renderiza imediatamente, FUTURO fica em estado "analyzing" (stamp `Análise · 0.0s → 0.6s` com dot Arco pulsando) por 600ms
- Em prod: se a IA real demorar > 2s, o stamp continua tickando ao tempo real
- Em > 30s: timeout · fallback "Continuar sem projeção" (mostra só HOJE + kicker estimado por % isolado)

---

### 3.4 — Tela 04 · Meal Log Entry (Foto + Quick-edit)

**Layout (modal full-screen):**
- Top bar `y: 0-56px`: botão "✕" cancelar (esquerda, Giz-100) + texto "REGISTRAR · ALMOÇO" centrado (Narrow caps) + "12:14" (direita, Mono Cinza-300)
- Photo capture area `y: 56-460px`: full-bleed da foto tirada, B&W ainda não convertido (a conversão acontece no histórico)
  - Overlay no canto inferior-esquerdo: chip Arco "ANÁLISE 1.4s" enquanto IA processa
  - Quando análise pronta: chip Arco vira "612 KCAL · P 38 · C 64 · F 18" em Mono
- Detection list `y: 480-620px`: 3-5 rows do que a IA detectou:
  ```
  ARROZ INTEGRAL · 120g · 132 kcal      [editar]
  FRANGO GRELHADO · 180g · 296 kcal     [editar]
  BRÓCOLIS · 80g · 28 kcal              [editar]
  AZEITE · 1 colher · 120 kcal          [editar]
  ```
  Cada row: nome em Archivo 500 14px Giz-100, peso+kcal em Mono Cinza-300, "[editar]" em Narrow caps Arco
- CTA `y: bottom-14px`:
  - Primary: "Salvar refeição" — Arco
  - Ghost: "Registrar manual" — Linha-500 border

**Composição:**
- Dominante: a foto da refeição (mas em P&B desde captura — diferente de outros apps que mantém colorida)
- Recede: lista de detecção em mono
- Visual flow: olho na foto, depois desce para verificar o que foi detectado, edita se necessário, salva

**Standout element:** **a foto em P&B desde o instante da captura.** Nenhum outro app de dieta converte foto de refeição em P&B — todos mantêm colorido para "apetite." NutriHero converte porque NÃO É UM FEED DE COMIDA. É um instrumento de medição. Foto em P&B = "vamos analisar, não admirar."

**Typography in context:**
- `label` (13px Narrow caps) — top bar contexto
- `data-sm` (12px Mono) — timestamp
- `body-sm` (14px Archivo 500) — items da lista
- `data-sm` (12px Mono) — peso/kcal por item
- `data-md` (16px Mono) — chip de análise total

**Color in context:**
- Background: Vazio
- Photo: B&W (preto puro + branco puro permitido aqui, é foto)
- Chip de análise: Arco fundo, Vazio texto
- "[editar]" links: Arco
- CTA primary: Arco

**Empty / loading state:**
- Antes da foto: viewport da câmera com brackets em Giz-100 nas 4 esquinas + texto Arco "ENQUADRAR · 3s" pulsando
- Durante análise IA (1.4s): chip Arco com texto "ANÁLISE 1.4s" + tiny pulse line abaixo do chip
- Se IA falha em detectar: lista vazia + botão Ghost "Registrar manual" vira primary

---

### 3.5 — Tela 05 · Weekly Pattern Review

**Layout:**
- Status bar
- Eyebrow em `y: 32-44px` — "SEMANA 14" (esquerda) + "DOM · FECHANDO" (direita, Arco)
- Hero title em `y: 60-160px` — `display-1` (56px Archivo Black):
  - "SEXTA É" em Giz-100
  - "**TARDE.**" em Arco
- Bar chart em `y: 188-288px` — 7 barras (S T Q Q S S D), grid `repeat(7, 1fr)` gap 4px:
  - Domingo a quarta: Linha-500 (alturas variando 30-48%)
  - Sexta: **Arco** (altura 92% — estouro do plano)
  - Sábado: **Atenção** (altura 64% — indulgência marcada)
  - Domingo: Linha-500 (altura 36%)
- Day labels em `y: 296-310px` — S T Q Q [S] [S] D em Mono Cinza-300 (5 letras Cinza-300, [S] da sexta em Arco, [S] do sábado em Atenção)
- Diagnóstico em `y: 330-490px` — texto em `data` (16px Mono):
  ```
  Jantar médio sex · 22:14.
  Movendo 280 kcal para a âncora 19:30.

  Recomendação:
  Antecipar lanche tarde para 16:30
  nas próximas 2 semanas.
  Validar resultado dia 7.
  ```
- CTA único em `y: bottom-14px` — "Aplicar" em Archivo Black caps, fundo Arco, full-bleed

**Composição:**
- Dominante: a barra Arco do dia da sexta — pico visual claro
- Sábado em Atenção quebra a monotonia neutra do resto da semana
- Title "TARDE." em Arco rima visualmente com a barra Arco abaixo

**Standout element:** **a única barra Arco no meio da semana neutra.** O gráfico inteiro é em Linha-500 silencioso, exceto uma barra que grita em Arco — a sexta. Sem legenda, sem tooltip, sem cor codificada por categoria. A leitura é instantânea: algo aconteceu sexta.

**Typography in context:**
- `display-1` (56px Archivo Black) — title
- `data-sm` (12px Mono) — day labels
- `data` (16px Mono) — diagnóstico body
- `label` (13px Narrow caps) — eyebrow

**Color in context:**
- Background: Vazio
- Chart: Linha-500 (default) + Arco (alerta) + Atenção (indulgência)
- "TARDE." em Arco em hero title — única vez na semana que Arco é usado em manchete
- Atenção amarelo aparece **uma única vez** (a barra do sábado + a letra "S" do label) — exatamente como a regra "1× por semana" do sistema

**Empty / loading state:**
- Antes do diagnóstico calculado: chart aparece imediatamente (dados já estavam no client), mas hero title fica em "ANALISANDO PADRÃO..." em Mono enquanto IA processa
- Após processamento: count-up da altura das barras (300ms ease-out) seguido do hero title trocando para o resultado real ("SEXTA É TARDE.") com translateY animation

---

## 4. Domain visualization

### 4.1 A visualização-âncora: Pulso de Recalibração

Esta é a peça-mãe. Já especificada em §4 do sistema visual. Repetindo o essencial para identidade:

| State | Visual | Animação |
|---|---|---|
| No plano | Linha 2px Arco sob o número-manchete | 2.0s/loop, scaleX 0.85→1.0 |
| Fora do plano | Mesma linha, mesma cor | 0.8s/loop — aceleração visível |
| Recalibrando | Linha "arma": flash 600ms Arco full-width | Single flash, depois plano novo entra |
| Sem dados (offline) | Linha estática 50% opacity, sem animação | none |

A linha é a marca em uso, presente em **8 das 23 telas do app**. Em todo lugar que tem número-manchete, tem linha de pulso.

### 4.2 Arc Gauge — composição corporal

| State | Visual |
|---|---|
| % gordura medida | Arc Arco preenchendo proporção, número Archivo Black centrado |
| Tendência positiva (perdendo gordura) | Arc Arco + tick mark menor 4px Cinza-300 mostrando posição de 30 dias atrás (referência) |
| Sem dados / antes da 1ª medição | Arc em Linha-500 vazio, número centrado é "—" em Cinza-400 |

### 4.3 Bar chart — semana

Sempre exatamente 7 barras. Domingo da semana atual + 6 dias anteriores. Sem variação na contagem — semanal sempre é semanal. Para histórico longo, navegação por semana (não scroll horizontal infinito).

### 4.4 Horizonte calórico — REJEITADO

A "linha do dia" (Horizonte Calórico) era a assinatura do **Telemetria**, não do Pulso. Não usar.

Para mostrar evolução intra-dia de calorias, em Pulso a forma é: macros em mono tabular se atualizando (`168/196` rola para `186/196` quando o usuário registra). Sem curva. Sem gráfico.

### 4.5 Forbidden visualizations

- ❌ Pizza chart / donut chart — substituído pelo Arc Gauge (270°)
- ❌ Stacked bar (macros empilhados em barra única)
- ❌ Line chart de tendência longa (gráfico no estilo "stock") — para tendência, usar barra semanal × 4 (mês)
- ❌ Heat map (calendar heat map estilo GitHub) — sufoca o sinal
- ❌ Gauge analógico tipo velocímetro com agulha — pertence ao Telemetria
- ❌ Bubble chart, scatter plot, treemap — não há ocasião no produto

---

## 5. Motion design

7 interações-chave, em ordem de prioridade.

### 5.1 — Pulso de Recalibração (signature, continuous)

| Prop | Valor |
|---|---|
| **Trigger** | Mount de qualquer tela com número-manchete |
| **Feeling** | Lento, vivo, ambiente |
| **Timing** | 2.0s/loop (no plano), 0.8s/loop (fora) · `--ease-pulso` |
| **O que move** | Linha 2px Arco — scaleX 0.85↔1.0 + opacity 0.5↔1.0 |
| **Por que importa** | É a marca em movimento. Ausência dela quebra a identidade. Se a linha não pulsa, é bug, não decisão de design. |

### 5.2 — Plano mudou (arming flash + entrada)

| Prop | Valor |
|---|---|
| **Trigger** | Usuário toca "Recalibrar jantar" na Home |
| **Feeling** | Urgente, decidido, sem indecisão |
| **Timing** | Flash 600ms Arco full-screen → entrada do novo plano em 320ms `--ease-pulso` |
| **O que move** | Tela inteira (overlay Arco com opacity 0→0.95→0) + número-manchete (count-up para novo valor) + ticker (rola conteúdo novo) |
| **Por que importa** | A recalibração é o momento mais alto do produto. Sem este flash, o usuário não percebe que "algo mudou" — vira só uma transição genérica. |

### 5.3 — Revelação da projeção corporal (Mirror Reveal — hard cut)

| Prop | Valor |
|---|---|
| **Trigger** | Análise simulada da IA completa (640ms após a tela montar, com HOJE já visível) |
| **Feeling** | Cinema, ruptura, "olha o que aconteceu" |
| **Timing** | 0–600ms estado "analyzing" (HOJE renderizada · FUTURO com stamp `Análise · X.Xs` pulsando) · 640ms **flash Giz 40ms** full-screen · 680ms FUTURO materializa com count-up dos BF% · 1100ms PulsoLine fade-in · 1500ms count-up do kg kicker |
| **O que move** | Stamp tickando vira flash Giz vira silhueta FUTURO + count-ups — sequência total ~1.8s do mount ao kg final, mas o **aha** está concentrado nos 40ms do cut |
| **Por que importa** | Sem o flash Giz, o lado FUTURO "aparecer suave" lê como tabela. Com o flash, lê como filme. A chegada é a virada emocional que carrega a paywall pós-projeção. |
| **Reduced-motion** | Toda a sequência colapsa: tela monta com HOJE + FUTURO já visíveis, BF% no valor final, kicker no valor final. Sem flash, sem count-ups. |

### 5.4 — Registro de refeição salvo (success state)

| Prop | Valor |
|---|---|
| **Trigger** | Usuário tap "Salvar refeição" no flow de meal log |
| **Feeling** | Confirmação seca, sem celebração |
| **Timing** | 200ms `--ease-pulso` |
| **O que move** | Meal card recém-criado entra de baixo com translateY(20px → 0) + opacity(0 → 1) · border-left muda de Linha-500 (pendente) para Arco (feito) em outros 200ms |
| **Por que importa** | Sem confetti, sem checkmark "vitorioso", sem som. Pulso é precisão — registrar refeição é uma operação, não um achievement. |

### 5.5 — Erro / falha (sem alarme)

| Prop | Valor |
|---|---|
| **Trigger** | Sync falha, IA não detecta, network down |
| **Feeling** | Discreto, recuperável |
| **Timing** | 320ms `--ease-pulso` |
| **O que move** | Aparece chip em Atenção amarelo (não Hazard red — Pulso não usa vermelho) com texto "RECONECTAR · 0:14" · botão de retry ghost em Linha-500 |
| **Por que importa** | Pulso não pune o usuário com red alerts. Erro é informação, não fracasso. |

### 5.6 — Skeleton → conteúdo (loading reveal)

| Prop | Valor |
|---|---|
| **Trigger** | Mount inicial de tela com dados remotos |
| **Feeling** | Veloz, sem espera ansiosa |
| **Timing** | Skeleton renderiza em < 80ms, conteúdo final em < 800ms |
| **O que move** | Skeleton tem Pulso line acelerado (0.8s/loop) no lugar do número-manchete · count-up do 0 para valor final em 320ms quando dado chega |
| **Por que importa** | Skeleton com shimmer estilo Apple é cliché. Pulso resolve "loading" usando seu próprio componente-signature acelerado — coerência total. |

### 5.7 — A interação que alguém menciona pro amigo

**O ticker que muda em tempo real durante a recalibração.**

| Prop | Valor |
|---|---|
| **Trigger** | Durante o estado "Recalibrar" (Tela 02), o ticker no topo rola conteúdo em tempo real (não pré-gerado) |
| **Feeling** | Vivo, urgente, "está acontecendo agora" |
| **Timing** | Conteúdo do ticker se atualiza a cada 600ms (cada item novo entra na queue da direita) · velocidade da marquise: constante 24s/loop |
| **O que move** | Itens individuais no ticker (cada `<span>` é um delta calculado) + cor (se delta é grande, vira temporariamente Atenção por 1.2s) |
| **Por que importa** | Em vez de "loading..." durante um recálculo, o usuário vê o pensamento da IA acontecendo. "Cara, o app fica vivo, parece que está pensando" — esse é o moment-de-amigo. |

---

## 6. Atmosfera visual

### 6.1 Background system

- **Único:** solid `--c-vazio` (#06070A) em toda página.
- **Zero gradient** decorativo. Único uso de gradient aceitável: fotos B&W com leve vinheta para escurecer cantos (intrínseco à foto, não overlay).
- **Zero texture / noise** em UI. Grain só em fotos.
- **Zero radial glow** ambiente (estilo Vercel landing pages com "spotlight"). Pulso é flat.

### 6.2 Modelo de profundidade

Elevação **por cor**, não por sombra:

```
z-0  vazio    #06070A   — page
z-1  aco-800  #0D0F14   — panel (containers grandes)
z-2  aco-700  #13151C   — card (meal card, hero card)
z-3  linha-600 #1E212A  — elevated (hover, dropdown)
z-4  linha-600 + 1px Linha-500 border — modal/sheet
```

**Sem box-shadow em camada nenhuma.** Quando precisar focus ring: outline 2px Arco offset 3px (não shadow).

### 6.3 Texture / grain

- **Em UI:** zero.
- **Em fotos (corpo + refeição):** grão analógico ligado, intensity 18%, scale 1.4×, blend `overlay`.
- O grão é o que diferencia foto de produto de "renderização" — sinaliza realidade.

### 6.4 Sistema de overlay

| Element | Spec |
|---|---|
| Modal backdrop | `background-color: rgba(6, 7, 10, 0.78)` + `backdrop-filter: blur(4px)` |
| Drawer (bottom sheet) | Aco-700 background, border-top 1px Linha-500, slide-up de 100% height |
| Tooltip | Aco-700 background, 1px Linha-500 border, padding 8px 12px, `data-sm` Mono, max-width 240px |
| Snackbar | Aparece a 16px de baixo, Aco-700, 1px Linha-500 border, 4s timeout, slide-up |

### 6.5 Fonte de luz

**Não há.** Pulso é desenhado num espaço sem direção de luz. Não há "highlight" no topo de um botão, não há "shadow" embaixo. Tudo é flat-shaded, todos os elementos têm a mesma fonte (nenhuma).

Isso é uma decisão de identidade — apps com light source simulam realidade física (botões 3D). Pulso assume que está numa tela, não num mundo. Tipografia carrega o trabalho que sombras carregariam.

---

## 7. Product feel

**Usar NutriHero por 10 minutos sente assim:**

Você abre o app e vê um número grande — `2.184` — com uma linha laranja fina batendo abaixo dele, lenta. Você sabe imediatamente: estou no plano. Você toca em "Almoço" e tira foto. A foto vira preto-e-branco no segundo da captura — não tem festa de cor, não tem confetti, a IA processa em 1,4 segundos e o app diz `612 KCAL`. Você salva. Volta para a tela inicial. O número agora é `1.572`, e ele animou contando de `2.184` até esse valor em meio segundo — sem fade, sem balão de comemoração. A linha continua batendo embaixo, no mesmo ritmo de antes. Em algum momento você sai do plano — comeu um lanche maior que o previsto — e a linha acelera. Você sente antes de ler. Toca o botão "Recalibrar jantar." A tela inteira pisca laranja por 600 milissegundos, e quando estabiliza, está escrito "PLANO MUDOU." em laranja gigante. Embaixo, um ticker rola: `+180 KCAL @ 19:30 · +24G PROTEÍNA · PULAR LANCHE TARDE`. Você aceita. A linha volta a bater devagar. Em 10 minutos, você registrou 1 refeição, foi recalibrado uma vez, e tocou exatamente 4 botões. Você não sorriu. Mas voltaria amanhã.

---

## 8. Quality bar — checklist final

Antes de qualquer screenshot virar marketing, parceiro ou portfólio:

- [ ] **Looks like a product people pay for** — sim, é caro (na sensação)? Tipo Whoop ou Hodinkee, não Yazio.
- [ ] **Cada tela tem um elemento memorável próprio** — Home: a linha. Recalibrar: o "MUDOU." Projection: o fio Arco. Meal Log: foto B&W. Weekly: a barra solitária em Arco.
- [ ] **Zero generic UI patterns** — sem cards-em-grade, sem default shadows, sem system font, sem progress bar com shimmer, sem checkmark verde.
- [ ] **Tokens consistentes** — toda cor referenciada por `--c-*`, toda fonte por `--f-*`, toda duração por `--t-*`. Hardcoded valores = bug.
- [ ] **Motion intencional, não decorativo** — se uma animação não passa o "por que importa" da §5, sai.
- [ ] **Família coerente** — as 5 telas, lado a lado em 5 phone-frames, parecem o mesmo produto sem dúvida.
- [ ] **Passa screenshot de 0,6s no feed de um influenciador parceiro?** — a linha laranja pulsando é o teste. Se ela está visível, é NutriHero.

---

## 9. Implementation deliverables (ordem de execução pelo dev)

1. [ ] **Logo Mark + Wordmark em SVG** — exportar 5 variantes (Primary Dark / Primary Light / Mono Dark / Mono Light / Reversed)
2. [ ] **App icon** — exportar nos tamanhos exigidos por iOS / Android / PWA (vide tabela §2.1-2.3)
3. [ ] **Pulso de Recalibração** como React component isolado, com Storybook story (estados: on-plan / off-plan / arming / no-data)
4. [ ] **Ticker bar** como React component isolado, prop `items: string[]`, animação CSS
5. [ ] **Arc Gauge** como SVG component, prop `value: 0-100`, `label: string`
6. [ ] **5 telas em alta fidelidade** — Home, Recalibrate, Projection, Meal Log, Weekly Pattern (referência: este doc + render `04-visual-identity.html`)
7. [ ] **Audit de acessibilidade** — todos os pares de contraste vs Vazio passam AA mínimo (foram calculados em `03-visual-system.md` §1)
8. [ ] **`prefers-reduced-motion: reduce`** — Pulso e ticker param, count-up vira instant show
9. [ ] **Audit do quality bar** — passar nos 7 itens da §8 antes de qualquer release

---

## 10. Fora de escopo deste documento

- Design de tela de configurações / perfil / histórico longo (telas secundárias, não core)
- Tela de comunidade (post-MVP)
- Onboarding completo (mais que a tela de goal-selection)
- Sons e identidade sonora (Pulso vira som no v1.1, especificação separada)
- Adaptação para tablet / desktop (MVP é mobile-only)
- Marketing site / landing page (deriva da identidade, não a define)
- Variações sazonais (campanha de verão, etc.)

---

**Companion file:** `04-visual-identity.html` — render visual de logo, app icon e as 5 telas em phone-frame. Sem isto, este doc é só especificação. Com isto, vira prova.
