# NutriHero · Protótipo navegável

**Para:** quem revisa a jornada (founder, time, portfólio)
**Status:** Protótipo de jornada · não código de produção
**Stack:** HTML/CSS/JS puro · sem build · sem backend · `tokens.css` é canon do `docs/03-visual-system.md`

---

## 1. Como abrir (3 minutos)

**Online:** https://luizrochaprojects-afk.github.io/nutrihero/prototype/

Local, a partir da raiz do repo:

```bash
npx serve .
# abrir http://localhost:3000/prototype/index.html (porta varia)
```

**Desktop vs. celular:** em telas com 900px ou mais de largura, qualquer tela abre dentro de `device.html` (moldura de celular + painel com jornada, variantes, tema e cenários de teste). No celular abre direto, em tela cheia. Para ver a tela sem moldura no desktop, adicione `?frame=0` à URL.

Abre `index.html` → toca **COMEÇAR** → caminha a jornada baseline:

```
cold-open → onboarding-short → bf-method-measure-first → projection →
paywall-post-projection → home → reajust-ticker → home
```

No fim, na Home, toca **Simular dia 7** (botão dashed no rodapé) para ver o card semanal Atenção aparecer.

**Em dispositivo real:** abra a URL no Safari iOS / Chrome Android. O protótipo tem `apple-mobile-web-app-capable` + `manifest.webmanifest` + safe-area insets — adicione à tela inicial para experimentar em fullscreen como app.

---

## 2. Como trocar variantes (dev mode)

O switcher é **invisível por padrão**. Liga de 3 formas:

| Como | Quando usar |
|---|---|
| `?dev=1` no fim da URL (ex.: `index.html?dev=1`) | Desktop, copy/paste |
| `#dev` no fim da URL (ex.: `home.html#dev`) | iOS/Android — sobrevive ao redirect do servidor |
| Toque 4× no canto **superior-direito** em 1s | Demo presencial, sem teclar |

Uma vez ligado, persiste em `sessionStorage` até fechar a aba.

**Painel** (canto inferior-direito): clica o título para colapsar. Tem:
- **Jump to screen** — atalho para qualquer das 17 telas
- **5 rows** de fork com botões segmentados (variante ativa em laranja Arco)
- **Reset journey** — limpa state + variants, volta para `index.html`

Trocar variante recarrega a tela. Se você estiver na tela do próprio fork (ex.: `paywall-pre-bf` e troca paywall para `post-projection`), o switcher pula direto para a variante nova.

---

## 3. Os 6 forks · decisões em aberto

Cada fork resolve uma decisão de jornada via comparação visual. **A pergunta importa mais que o nome da variante.**

| Fork | Decisão | Variantes | Default |
|---|---|---|---|
| **Onboarding** | Quanta fricção a anamnese aguenta sem perder o "operador" antes da revelação? | `short` (5 perguntas) · `full` (8 perguntas com hábitos) | `short` |
| **BF method** | Medidas é previsível, foto é vendável. Qual carrega a abertura? | `measure-first` (fita) · `photo-first` (3 fotos + IA) | `measure-first` |
| **Projection** | A tela ritual mais carregada — qual elemento-âncora carrega a promessa do corpo futuro em uma dobra? | `mirror` (par de silhuetas + reveal cinematográfico) · `delta` (número −4.1 + PulsoLine) · `trajectory` (linha HOJE→90 + silhueta destino) | `mirror (Reveal)` — também é o `projection.html` do journey |
| **Paywall** | Onde plantar a cobrança? | `pre-bf` (antes do motor) · `post-projection` (após revelação) · `post-first-reajust` (após o motor rodar 1×) | `post-projection` |
| **Reajust** | A interação central do produto. | `ticker` (animado) · `modal` (full-screen estático) · `drawer` (bottom sheet) | `ticker` |
| **Weekly** | Empurrar via home, abrir tela dedicada ou notificar fora do app? | `home-card` (card amarelo na home) · `dedicated` (tela cheia) · `notification` (push iOS-style) | `home-card` |

**Comparação lado a lado:** abre [`compare.html`](compare.html). Top nav alterna entre forks; cada variante carrega numa iframe 390×844 com a legenda "o que isso testa" abaixo do nome.

A fork `projection` foi resolvida (mai/2026): `mirror` venceu e foi aprofundada para "Mirror Reveal" — hard-cut Giz de 40ms no mount, eyebrow data computada (`VOCÊ · DD · MMM · YYYY` em Arco), PulsoLine assinatura, e kicker `−X.X kg de gordura` derivado de `peso × Δbf%`. O arquivo `projection.html` do journey é o canon vivo dessa variante. `delta` e `trajectory` ficam catalogadas como **alternativas documentadas** — se a decisão se reabrir, é só apontar `switcher.js§afterBf()` para o arquivo correto.

---

## 4. Pontos visuais que você quer validar com os influenciadores parceiros

- **PulsoLine** abaixo do número-manchete da home. É a assinatura. Deve parecer "respirar". Anima 2.0s/loop quando no plano, 0.8s/loop fora.
- **Hero color `#FF5B1F` Arco** — max 2 instâncias por tela. O FAB central da tab-bar conta como 1 em toda tela com nav; a aba ativa também é Arco; o banner de reajustar (quando aparece) é a 2ª instância na Home.
- **Tab-bar global · 5 slots** — `Hoje · Evolução · [FAB Registrar] · Diário · Perfil`. O FAB é um quadrado 56×56 com raio 8px (sem círculo — pills proibidas pelo Pulso), em Arco com ícone câmera Vazio, elevado `translateY(-18px)`. Sempre roteia para `meal-log.html` — não muda de estado.
- **Atenção `#F7D74C`** — só 1× por semana, no card de padrão semanal. Se virar rotina, perde força.
- **Display em Archivo Black uppercase** — sangrando edges em "PLANO MUDOU.", "SUA ZONA.", "SEXTA É TARDE.".
- **Mono (JetBrains)** para todo dígito que importa precisão. Tabular figures — números alinham em coluna.
- **Zero verdes · zero azuis · zero italic · zero emoji** — se você ver alguma dessas, é regressão.

---

## 5. Open questions do PRD que aparecem visualmente aqui

Conforme `docs/process/prd-mvp.md` §9:

1. **Onboarding length** → forks `onboarding-short` × `onboarding-full`
2. **BF% method default** → forks `bf-method-measure-first` × `bf-method-photo-first` (com fallback "Não consegui · usar medidas")
3. **Paywall placement** → 3 paywall variantes
4. **Reajustment UI** → 3 reajust variantes
5. **Weekly pattern surfacing** → 3 weekly variantes

Caminhe cada variante, pegue um print no celular, mostra pra 2 usuários reais antes de fechar o default. O default atual reflete a hipótese mais conservadora — não é decisão.

---

## 6. Meal-log · fluxo completo (3 métodos · happy + unhappy)

O `meal-log.html` é a única tela com **state machine completa** — não é só layout. Use para testes de usabilidade.

**Happy paths:**
- **Manual:** Tap "Adicionar item" → digite → dropdown com sugestões mockadas (30 alimentos) → pick → row entra com kcal calculado → qty editável → "Salvar" → home atualiza (meal-card vira `done`, número-manchete sobe).
- **Foto:** Tap aba Foto → shutter → thumbnail captura com filtro grayscale → chip "ANÁLISE · 1.4s" pulsante + PulsoLine off-plan → 3 itens entram (1 com badge `?` Atenção = low confidence).
- **Áudio:** Tap mic → waveform anima + transcrição vai aparecendo palavra-por-palavra → tap stop → "ANÁLISE · 0.8s" → itens.

**Unhappy paths** (ativar `#dev` na URL para ver painel `SIMULAR CENÁRIOS` no meal-log):
- **Sem câmera:** Aba Foto mostra ícone tachado + "CÂMERA INDISPONÍVEL" + fallback "Ir para Manual".
- **Sem mic:** Igual, aba Áudio.
- **IA falhou:** Foto captura → após análise vira chip Atenção "NÃO RECONHECI" → CTA "Registrar manual" leva pra aba Manual com foto anexada no topo.
- **Save falhou:** Salva mesmo assim (optimistic, FR-40) → home mostra meal-card com badge `SYNC` em Atenção + toast "SAVE OFFLINE".

**Confidence badges:** itens da IA com confiança baixa aparecem com chip "?" amarelo Atenção — sinaliza "revise antes de salvar".

---

## 7. O que o protótipo *não* testa

- **Tempo real de cálculo** (IA de foto, geração de projeção) — todos os "Calcular" são instantâneos. No produto real, tempo P50 < 2s.
- **Captura de câmera real** — meal-log foto/áudio mostram UI estática.
- **Pagamento real** — paywalls têm campos de cartão stub.
- **Persistência** — `sessionStorage` só. Fecha aba, perde estado.
- **Acessibilidade plena** — focus states funcionam, mas screen-reader não foi auditado.
- **Performance em device baixo-end** — testar em iPhone 8 / Galaxy A10 antes do dev sprint (§ `05-dev-handoff.md` §7).

---

## 8. Estrutura dos arquivos

```
prototype/
├── index.html                  # Entry · "Começar"
├── device.html                 # Moldura de celular para desktop (jornada, variantes, tema)
├── frame.js                    # Manda viewports ≥900px para device.html
├── compare.html                # Comparação side-by-side
├── manifest.webmanifest        # PWA: add to home screen
├── tokens.css                  # CSS variables (verbatim do §0 do visual system)
├── components.css              # Reset + classes compartilhadas (CTA, PulsoLine, meal-card, ...)
├── state.js                    # NH_STATE proxy → sessionStorage('nh.state')
├── switcher.js                 # NH_VARIANTS proxy + NH_NAV resolver + dev panel
├── assets/                     # SVGs copiados de assets/brand/
├── screens/                    # 18 telas (9 baseline + 8 variantes + diario stub)
└── screenshots/                # 5 stills (um por fork) para deck
```

**Sistema de roteamento:** os CTAs com `data-nh-next="afterOnboarding"` têm seu `href` reescrito por `switcher.js` no DOMContentLoaded conforme `NH_VARIANTS`. Adicione novo fork: amplie `NH_NAV` em `switcher.js`.

---

## 9. Próximos passos sugeridos

1. **Walk solo no celular** (3 min) — abra a jornada baseline. Anota o que parece "agir como app" e o que parece "site web".
2. **Walk com 1 usuário 30+** (15 min) — não influencer; alguém da audiência "projeto verão". Foco: reajust-ticker. A pessoa entende o motor?
3. **Comparação dirigida** (10 min) — `compare.html`. Pegue 1 decisão por sessão. Não tenta resolver as 5 de uma vez.
4. **Anote os defaults validados em `decisions.md`** (criar) e atualizar PRD §9.
5. **Repassa pro time de dev** — esse README + `decisions.md` é o suficiente pra começar o dev sprint do `05-dev-handoff.md`.

---

**Quaisquer dúvidas, abra o switcher no canto · "Jump to screen" leva direto onde você quer.**
