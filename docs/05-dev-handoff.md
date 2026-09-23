# NutriHero — Dev Handoff · Pulso

**Sprint:** Design — fechamento. **Próximo passo:** dev.
**Para:** founder (PM) · três devs (back · mobile · IA) · designer continuante.
**Origem:** este doc é o ponto final do ciclo de design e o ponto inicial do ciclo de desenvolvimento. Tudo o que está nos arquivos 01–04 e em `assets/brand/` é canon. Decisões re-abertas custam re-trabalho.

## Sumário rápido (TL;DR)

- **Estética:** Pulso. Dark only. Arco `#FF5B1F` é a cor de ação · Atenção `#F7D74C` é o único aviso · zero verdes/azuis · zero itálico.
- **Tipografia:** Archivo (Black 900 + Regular 400/500/600) + Archivo Narrow + JetBrains Mono · todas via Google Fonts grátis.
- **Componente-assinatura:** `<PulsoLine />` — implementar e validar **antes** de qualquer tela.
- **5 telas core no MVP:** Home / Recalibrate / Body Projection / Meal Log / Weekly Pattern.
- **Stack recomendada:** Expo + React Native + NativeWind (Tailwind RN) + Reanimated 3 + Skia (opcional para o pulso na linha).
- **Estimativa de UI mobile:** ~14 dias-dev em paralelo ao back/IA.

---

## 1. Stack recomendada e setup

### 1.1 Recomendação primária

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Expo SDK 51+** (managed workflow) | Cobre iOS + Android com uma codebase · OTA updates · build em nuvem · perfeito para janela set–fev sem ter dois devs de mobile |
| UI lib | **React Native** + componentes customizados | Pulso tem componentes ownable (PulsoLine, Ticker, ArcGauge) que não vêm de bibliotecas — escrever do zero é mais simples que adaptar |
| Styling | **NativeWind v4** (Tailwind para RN) | Os tokens de `03-visual-system.md` colam direto · dev escreve `className="bg-vazio text-giz-100"` |
| Animations | **Reanimated 3** + **Moti** | Reanimated cobre 95% (pulse, ticker, count-up) · Moti facilita entrada/saída |
| State | **Zustand** (client) + **TanStack Query** (server) | Suficiente para MVP · evita Redux boilerplate |
| Navigation | **Expo Router** | File-based, paralelo ao Next.js · low ceremony |
| Forms / validação | **react-hook-form** + **zod** | Padrão da indústria; cobre onboarding e edição manual de refeição |
| Camera | **expo-camera** + **expo-image-picker** | Foto da refeição + foto corporal usam o mesmo pipeline |
| Storage local | **expo-secure-store** (token) + **AsyncStorage** (cache de dieta) | Fotos NÃO ficam no aparelho por padrão — vão direto pro back, retornam URL signada |

### 1.2 Alternativa (se já houver código existente em Flutter / nativo)

A direção Pulso é **tech-agnostic** — os tokens em §2 deste doc traduzem para qualquer stack. Se a base for SwiftUI ou Flutter, ignore §1.1 e implemente os tokens diretamente. O resto do doc (behavior notes, ordem, critérios) segue válido.

**Não vale a pena começar:** Cordova, Ionic, Tauri Mobile. A linha pulsante e o ticker dependem de motion fluido — webview-based tech vai falhar em devices baixo-end (boa parte do público alvo).

### 1.3 Setup inicial (1 dia)

```bash
# 1. Criar projeto
npx create-expo-app@latest nutrihero --template blank-typescript
cd nutrihero

# 2. Instalar dependências core
npx expo install react-native-reanimated@^3 moti
npx expo install expo-router expo-camera expo-image-picker expo-secure-store
npm install nativewind tailwindcss@^3.4 zustand @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers

# 3. Configurar fonts
npx expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/archivo-narrow @expo-google-fonts/jetbrains-mono
```

**`metro.config.js`** — adicionar NativeWind preset.
**`tailwind.config.js`** — colar bloco de §2.4 deste doc.
**`global.css`** — colar bloco de §2.3 deste doc.
**`app/_layout.tsx`** — carregar as 3 fontes antes do render.

### 1.4 CI / Builds

- **Expo Application Services (EAS)** — Free tier cobre dev + 30 builds/mês (suficiente para MVP)
- Profile `preview` para builds internos (influenciadores parceiros testando)
- Profile `production` para App Store / Play Store

### 1.5 IDE / Tooling

- VS Code com **Tailwind CSS IntelliSense** + **ESLint** + **Prettier** + **Pretty TypeScript Errors**
- React Native Devtools (Hermes inspector)
- Maestro para E2E (mais leve que Detox para um app pequeno)

---

## 2. Design tokens · prontos para colar

### 2.1 Arquivo `app/global.css` (NativeWind v4 layer)

```css
/* fonts loaded via expo-font · this is metadata */
:root {
  /* — Surface scale — */
  --c-vazio:    #06070A;
  --c-aco-800:  #0D0F14;
  --c-aco-700:  #13151C;
  --c-linha-600:#1E212A;
  --c-linha-500:#2A2E3A;

  /* — Text scale — */
  --c-cinza-400:#5A5E68;
  --c-cinza-300:#8F8B81;
  --c-giz-200:  #BDB9AF;
  --c-giz-100:  #EEEBE3;

  /* — Signal — */
  --c-arco:     #FF5B1F;
  --c-atencao:  #F7D74C;

  /* — Type families — */
  --f-display: 'Archivo_900Black, Archivo_500Medium, Archivo_400Regular';
  --f-narrow:  'ArchivoNarrow_500Medium, ArchivoNarrow_600SemiBold';
  --f-mono:    'JetBrainsMono_500Medium, JetBrainsMono_700Bold';

  /* — Motion — */
  --ease-pulso: cubic-bezier(0.2, 1, 0.2, 1);
}
```

### 2.2 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
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
        // RN: usar exactly as loaded via @expo-google-fonts
        display: ['Archivo_900Black'],
        'display-md': ['Archivo_500Medium'],
        'display-rg': ['Archivo_400Regular'],
        narrow:  ['ArchivoNarrow_500Medium'],
        'narrow-sb': ['ArchivoNarrow_600SemiBold'],
        mono:    ['JetBrainsMono_500Medium'],
        'mono-bold': ['JetBrainsMono_700Bold'],
      },
      borderRadius: { '1': '2px', '2': '4px', '3': '8px' },
      // sem 'lg', 'xl', 'full' — proibido em Pulso
    },
  },
};
```

### 2.3 Carregamento de fonts (`app/_layout.tsx`)

```tsx
import { useFonts } from 'expo-font';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_900Black,
} from '@expo-google-fonts/archivo';
import { ArchivoNarrow_500Medium, ArchivoNarrow_600SemiBold } from '@expo-google-fonts/archivo-narrow';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_900Black,
    ArchivoNarrow_500Medium,
    ArchivoNarrow_600SemiBold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  if (!loaded) {
    // Splash screen é Vazio sólido — sem indicador.
    // Fonts devem carregar antes de qualquer pixel ser renderizado.
    return <View style={{ flex: 1, backgroundColor: '#06070A' }} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 3. Assets manifest

Tudo em `assets/brand/`:

| Arquivo | viewBox | Background | Uso |
|---|---|---|---|
| `mark-primary.svg` | 64×64 | transparente | **Default 95% dos usos.** Importar como SVG no app |
| `mark-mono-dark.svg` | 64×64 | transparente | Marca em Giz (sem cor) sobre superfície escura |
| `mark-mono-light.svg` | 64×64 | transparente | Marca em Vazio (sem cor) sobre superfície clara (papel, parceria forçada) |
| `mark-reversed.svg` | 64×64 | Arco sólido | Uso em paywall / momentos de alta intensidade |
| `app-icon-1024.svg` | 1024×1024 | Vazio sólido | Master para gerar iOS/Android icons (Mark a 60% safe area) |
| `favicon.svg` | 64×64 | Vazio sólido | Web favicon · funciona em 16px |
| `android-monochrome.svg` | 108×108 | transparente | Layer monochrome para notification icon (Android tinta) |

**Wordmark NÃO está incluído como SVG** — devs devem usar texto vivo (`<Text>` ou `<h1>`) com `font-family: Archivo_900Black`, todas as letras em `--c-giz-100` e a quinta letra (I) em `--c-arco`. Não há razão para usar SVG quando a fonte está disponível.

**Para gerar app icons iOS/Android específicos** (não usar Expo defaults):
```bash
# Instalar imagemagick e svg-to-png
brew install imagemagick librsvg

# Gerar iOS sizes (do master)
for size in 20 29 40 60 76 83.5 1024; do
  for scale in 1 2 3; do
    rsvg-convert -w $((size * scale)) -h $((size * scale)) assets/brand/app-icon-1024.svg > ios-${size}@${scale}x.png
  done
done

# Gerar Android sizes
for size in 48 72 96 144 192 512; do
  rsvg-convert -w $size -h $size assets/brand/app-icon-1024.svg > android-${size}.png
done
```

---

## 4. O primeiro componente · `<PulsoLine />`

**Implementar PRIMEIRO, validar em Storybook (ou ainda melhor: tela isolada) ANTES de qualquer outra coisa.** Se este componente não respira corretamente em device baixo-end, toda a identidade do produto falha.

### 4.1 React Native + Reanimated implementation

`components/PulsoLine.tsx`:

```tsx
import React, { useEffect } from 'react';
import { View, AccessibilityInfo } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

export type PulsoState = 'on-plan' | 'off-plan' | 'arming' | 'no-data';

interface PulsoLineProps {
  /** Plan adherence state controls pulse speed */
  state?: PulsoState;
  /** Width in px. Default fills parent. */
  width?: number;
  /** Override system reduce-motion. Use sparingly. */
  forceMotion?: boolean;
}

const ARCO = '#FF5B1F';
const EASE = Easing.bezier(0.2, 1, 0.2, 1);

const DURATION_ON_PLAN = 2000;   // 2.0s · padrão
const DURATION_OFF_PLAN = 800;   // 0.8s · acelerado
const DURATION_ARMING = 600;     // 0.6s · single flash

export const PulsoLine: React.FC<PulsoLineProps> = ({
  state = 'on-plan',
  width,
  forceMotion = false,
}) => {
  const scaleX = useSharedValue(1);
  const opacity = useSharedValue(state === 'no-data' ? 0.3 : 1);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (!mounted) return;
      const skipAnimation = reduceMotion && !forceMotion;

      cancelAnimation(scaleX);
      cancelAnimation(opacity);

      if (skipAnimation || state === 'no-data') {
        scaleX.value = 1;
        opacity.value = state === 'no-data' ? 0.3 : 1;
        return;
      }

      if (state === 'arming') {
        // Single 600ms flash, used pre-recalibrate transition
        opacity.value = withSequence(
          withTiming(1, { duration: 50 }),
          withTiming(0, { duration: 550, easing: EASE })
        );
        return;
      }

      const duration =
        state === 'off-plan' ? DURATION_OFF_PLAN : DURATION_ON_PLAN;

      scaleX.value = withRepeat(
        withSequence(
          withTiming(0.85, { duration: duration / 2, easing: EASE }),
          withTiming(1.0, { duration: duration / 2, easing: EASE })
        ),
        -1,
        false
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: duration / 2, easing: EASE }),
          withTiming(1.0, { duration: duration / 2, easing: EASE })
        ),
        -1,
        false
      );
    });

    return () => {
      mounted = false;
      cancelAnimation(scaleX);
      cancelAnimation(opacity);
    };
  }, [state, forceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      style={{ width: width ?? '100%', height: 2, alignSelf: 'flex-start' }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View
        style={[
          {
            height: 2,
            width: '100%',
            backgroundColor: ARCO,
            transformOrigin: 'left center',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
```

### 4.2 Test cases (Maestro YAML ou manual)

```yaml
# .maestro/pulso-line.yml
appId: ai.nutrihero.app
---
- launchApp
- tapOn: "Pulso Story · on-plan"
- assertVisible: "Pulso Story · on-plan"
# Manual: visual confirm a linha bate a cada 2.0s
- tapOn: "Pulso Story · off-plan"
# Manual: visual confirm a linha bate a cada 0.8s — sensivelmente mais rápido
- tapOn: "Pulso Story · arming"
# Manual: flash único de 600ms · depois apaga
- tapOn: "Pulso Story · no-data"
# Manual: linha estática, sem animação, 30% opacity
```

### 4.3 Critério de aceite do `<PulsoLine />`

- [ ] Estado `on-plan`: linha pulsa em loop, período 2.0s ± 50ms (medir com stopwatch ou screen-record + frame analysis)
- [ ] Estado `off-plan`: linha pulsa em loop, período 0.8s ± 20ms · **sensação de "acelerado" é imediatamente perceptível** sem cronômetro
- [ ] Estado `arming`: flash único de 600ms · termina apagada
- [ ] Estado `no-data`: linha estática a 30% opacity, sem animação
- [ ] `prefers-reduce-motion` do OS desabilita animação (linha vira estática a 100% opacity)
- [ ] Sem jank perceptível em iPhone 8 ou Galaxy A10 (baseline low-end)
- [ ] Memória: animação não vaza ao trocar de tela 100× (verificar com profiler)

**Se algum desses critérios falhar, a identidade do produto não está pronta. Para qualquer outra implementação até resolver.**

---

## 5. Ordem de implementação · 14 dias

### Fase A · Setup + signature (3 dias)

| Dia | Entrega |
|---|---|
| 1 | Repo setup, fonts carregando, tokens funcionando, navegação Expo Router stub das 5 rotas |
| 2 | `<PulsoLine />` completo com 4 estados + storybook isolado · passar nos critérios de §4.3 |
| 3 | Buffer / ajustes do PulsoLine · refatoração se necessário |

### Fase B · Primitives (4 dias)

| Dia | Entrega |
|---|---|
| 4 | `<Ticker />` — marquise infinita, prop `items: string[]`, 24s/loop |
| 5 | `<Button />` (primary / ghost / destructive) + `<Input numeric />` + `<Input text />` |
| 6 | `<ArcGauge />` SVG component · valores 0-100 |
| 7 | `<MealCard />`, `<Chip atencao />`, `<Eyebrow />`, `<LiveDot />` |

### Fase C · Telas (5 dias)

| Dia | Tela |
|---|---|
| 8 | Tela 01 · Home / Daily Dashboard — composição completa + dados mock |
| 9 | Tela 02 · Recalibrate State — incluindo arming flash da Home → Recalibrate |
| 10 | Tela 03 · Body Projection — incluindo o hard cut 40ms Giz |
| 11 | Tela 04 · Meal Log Entry — camera + IA mock + edit list |
| 12 | Tela 05 · Weekly Pattern Review |

### Fase D · Integração (2 dias)

| Dia | Entrega |
|---|---|
| 13 | Wire screens to backend mock · loading/error/empty states · transições |
| 14 | QA cruzado do quality bar (8 itens — vide §7) · ajustes finais |

**Em paralelo (não bloqueia front-end):**
- Back: API REST com endpoints stub (retornando dummy JSON) desde dia 1
- IA: pipeline de foto-→-kcal funcional até dia 10 (para validar Tela 04)

---

## 6. Behavior notes por tela

Cinco seções. Cada uma cobre: state machine · transições · animações · dados de entrada · estados de loading/error · acceptance.

### 6.0 — Navegação global · tab-bar + FAB

> **Correção ao protótipo (mai/2026):** a tab-bar antes tinha 3 abas (`Hoje · Evolução · Perfil`) e o registrar refeição era um CTA inline no rodapé da Home. Foi consolidada para 5 slots com FAB central. A documentação abaixo é o canon novo — substitui qualquer referência anterior à tab-bar de 3 abas e ao "CTA laranjão" na Home.

**Estrutura:** `Hoje · Evolução · [FAB Registrar refeição] · Diário · Perfil` — 5 slots, presente em todas as telas pós-onboarding.

**FAB (`<a class="tab-fab">`):**
- 56×56px, raio **8px** (`--r-3`) — quadrado, não círculo. Pills/círculos violam Pulso (`03-visual-system.md §radius`).
- Background `--c-arco` (`#FF5B1F`), ícone (câmera 24×24, stroke 1.8) em `--c-vazio` (`#06070A`).
- Elevação geométrica: `transform: translateY(-18px)`. Sem `box-shadow` — Pulso é flat.
- Sem label de texto. Outros tabs têm label Archivo Narrow 9px.
- Sempre roteia para `meal-log.html` — **estado único, nunca muda**. Não muda de cor/ícone com desvio nem com "dia fechado". A persistência do ícone é o aprendizado: "o FAB sempre faz a mesma coisa".

**Tabs normais:**
- Default `--c-cinza-400`, hover `--c-cinza-300`, `.active` em `--c-arco`.
- O FAB **nunca** recebe `.active` — ele é uma ação, não uma rota destacada.

**Budget de cor Arco com a tab-bar:**
- FAB = 1 instância em todas as telas com nav.
- Tab `.active` = +1 instância (mesma tela do FAB → 2 instâncias só com o crômio).
- PulsoLine, deltas vivos e banners de reajuste consomem o orçamento restante. Em Home com banner de reajuste ativo, aceita-se 3 instâncias temporárias (banner é transitório).

**Padding bottom em telas com nav:** `calc(var(--s-6) + 64px + env(safe-area-inset-bottom, 0px))` — a bar tem 64px, o FAB se eleva acima dela mas não exige padding extra (flutua sobre o gradiente de fade do conteúdo).

### 6.1 — Tela 01 · Home / Daily Dashboard

> **Correção ao protótipo (mai/2026):** o CTA "Registrar refeição / Reajustar dieta" laranjão de 72px que existia no rodapé do scroll foi removido. A registração de refeição agora é disparada **exclusivamente pelo FAB persistente da tab-bar** (ver §6.0). O estado "Reajustar dieta" virou um banner condicional no topo do conteúdo (slot `#deviation-slot`, componente `.attention-card` com `att-actions` interno) — aparece quando há desvio detectado **ou** quando todas as refeições do dia foram registradas. O banner inclui um `cta-primary` interno apontando para a tela de reajuste. **O FAB não muda quando o reajuste fica pendente.**


**Estado da tela:** stateful — depende de 4 fontes de dados.

**State machine:**
```
[loading] → [ready · in-plan] ⇄ [ready · off-plan]
              ↓ (user taps Recalibrar)
            [arming flash] → navigate to Recalibrate
```

**Dados de entrada (props/API):**
```ts
type HomeData = {
  date: string;              // ISO date · for eyebrow "TER · 19 MAI"
  bodyFat: number | null;    // % gordura atual · null se nunca medido
  kcalConsumed: number;
  kcalTarget: number;
  macros: {
    protein: { current: number; target: number };
    carbs:   { current: number; target: number };
    fat:     { current: number; target: number };
  };
  streak: number;            // dias consecutivos no plano
  inPlan: boolean;           // calculado server-side
  nextMeal: { name: string; targetTime: string; kcal: number };
  tickerItems: string[];     // deltas ao vivo · server-pushed quando há recalibração pendente
};
```

**Animações disparadas:**

| Trigger | Animação |
|---|---|
| Mount | Hero number conta de 0 ao valor final em 320ms · macros aparecem com staggered fade (60ms entre rows) · Pulso line inicia pulsing imediatamente |
| Tap `Recalibrar` | 600ms arming flash (overlay Arco full-screen com opacity 0→0.95→0) · DURANTE o flash, navegação para Recalibrate começa |
| State `inPlan: false` | Pulso line muda automaticamente para 0.8s/loop · sem outras mudanças visuais |
| User registra refeição (volta de Meal Log) | Hero number conta do valor antigo para o novo em 320ms |

**Empty / loading state:**
- Skeleton: Hero number espaço vazio + Pulso line acelerado (0.8s)
- Macros: 5 rows vazias com bg `linha-600`
- Ticker: " · CARREGANDO · "
- CTA Recalibrar: disabled até dados carregarem

**Acceptance criteria:**
- [ ] Hero number 80pt sangra borda esquerda em 16px (não centralizado)
- [ ] Pulso line está IMEDIATAMENTE abaixo do hero number, mesma largura
- [ ] Quando `inPlan: false`, é possível perceber a aceleração sem ler nenhum texto (teste com usuário cobrindo o texto)
- [ ] Ticker NÃO trava ao trocar de tela e voltar (animation continues smoothly)
- [ ] Em iPhone 8: cold start até tela renderizar com dados < 1,2s

### 6.2 — Tela 02 · Recalibrate State

**Estado da tela:** transitória — entra após a Home, sai após Aceitar ou Voltar.

**State machine:**
```
[entering · arming flash] → [showing new plan] → [accepting · loading] → navigate back to Home
                                ↓ (Voltar)
                              navigate back to Home (no change)
```

**Dados de entrada:**
```ts
type RecalibrateData = {
  triggeredBy: 'manual' | 'auto-weekly';
  deltas: Array<{ label: string; value: string; type: 'positive' | 'neutral' }>;
  diagnosis: string;            // copy gerado pela IA
  newPlan: {
    breakfastKcal: number;
    lunchKcal: number;
    snackKcal: number;
    dinnerKcal: number;
  };
  weekTargetIntact: boolean;
};
```

**Animações disparadas:**

| Trigger | Animação |
|---|---|
| Mount | Tela aparece COM o arming flash JÁ acontecendo (vindo da Home) · texto "Plano" + "MUDOU." faz translateY(24→0) + opacity(0→1) staggered (Plano primeiro, MUDOU. 120ms depois) em 320ms cada |
| Ticker start | Inicia rolando imediatamente, 18s/loop (mais rápido que padrão 24s — esta tela tem urgência) |
| Tap `Aceitar` | Body fade 200ms, navigate back |
| Tap `O que mudou?` | Modal sheet bottom slide-up com tabela detalhada |

**Empty / loading state:**
- Esta tela nunca chega vazia · sempre tem dados (server calcula antes de navegar para cá)
- Se cálculo demora > 200ms: tela renderiza "PLANO MUDOU." mas ticker fica vazio + diagnóstico mostra "—"

**Acceptance criteria:**
- [ ] "PLANO" em Giz, "MUDOU." em Arco · ambos display-1 (56pt)
- [ ] Arming flash 600ms aconteceu ANTES desta tela ser visível
- [ ] Ticker rola 18s (mais rápido que Home) · marquise sem cortes
- [ ] Botão Aceitar é mais largo que "O que mudou?" (60/40 ratio)
- [ ] Em screenshot estático, é claro qual é o CTA primário

### 6.3 — Tela 03 · Body Projection (Mirror Reveal)

> **Atualização (mai/2026):** após comparação visual em `prototype/compare.html?fork=projection`, ficou definido que esta tela usa a variante **Mirror Reveal** — par de silhuetas equal-weight (HOJE | FUTURO) com reveal cinematográfico. A versão antiga que empilhava DELTA + tabela 30/60/90/180 dias foi descartada (lia como planilha, não como aha moment). Alternativas exploradas (`projection-delta.html`, `projection-trajectory.html`) ficam no protótipo como histórico documentado. O canon vivo é `prototype/screens/projection.html`.

**Estado da tela:** ritual · uma vez por usuário no onboarding · revisitável no perfil.

**State machine:**
```
[capture/medidas done] → [showing HOJE · analyzing FUTURO] → [reveal · hard cut Giz] → [showing both + kicker] → [paywall CTA]
```

**Dados de entrada:**
```ts
type ProjectionData = {
  currentPhotoUrl: string;       // foto P&B do usuário hoje
  futurePhotoUrl: string;        // gerada pela IA · cached
  weeksProjected: number;        // 12 por default (90 dias)
  bodyFatNow: number;            // ex.: 24.3
  bodyFatProjected: number;      // ex.: 19.8
  weightKg: number;              // de anamnese · usado para derivar kg de gordura perdida
  projectedDate: string;         // ISO · today + 90 dias (server pode mandar pronto ou client computa)
  generatedAt: string;
};
```

**Derivações client-side:**
- `kgDeGorduraPerdida = weightKg × (bodyFatNow − bodyFatProjected) / 100` (sinal negativo quando perde, positivo quando ganha gordura — caso bulk improvável mas válido)
- `eyebrowData = formato("DD · MMM · YYYY", projectedDate)` — meses em PT-BR caps de 3 letras (JAN/FEV/MAR/…)

**Layout (3 element blocks, ritual):**
1. **Top:** eyebrow `VOCÊ · {projectedDate}` (Narrow caps 11pt Arco) + headline `Daqui a 90 dias.` (display-2 32pt Archivo Black, 2 linhas)
2. **Middle:** par de silhuetas equal-weight (`HOJE` | `FUTURO`), aspect-ratio 3:5, BF% em Mono 28pt Giz-100 nos dois (FUTURO não usa Arco — preserva budget). Fio Arco 3px na borda DIREITA da silhueta FUTURO.
3. **Kicker:** PulsoLine static 2px Cinza-300 (sem pulse Arco — preserva budget) + linha kg `−3.2 kg de gordura` (Mono 26pt Arco para o número, Narrow caps 11pt Giz-200 para o resto).
4. **CTA:** `Manter ritmo` Button-primary full-bleed.

**Budget Arco (tríade):** apenas 3 instâncias permitidas:
1. Eyebrow data pessoal — *quando*
2. Fio Arco direita do FUTURO — *quem é*
3. Número kg do kicker — *quanto*

CTA conta como 4ª permitida porque é peça-âncora ritual. **Não adicionar Arco em mais lugar nenhum** (BF% futuro fica Giz; PulsoLine fica Cinza estática; stamp "FUTURO" fica Giz-200).

**Animações disparadas (reveal cinematográfico):**

| t (ms) | Frame |
|---|---|
| 0 | Tela monta · HOJE renderiza completa (silhueta + BF%) · FUTURO em estado "analyzing" (svg+bf invisíveis, stamp mostra `Análise · 0.0s` em Arco com dot pulsando) |
| 0–600 | Stamp do FUTURO tica `Análise · 0.0s → 0.6s` (Mono mock — em prod, real elapsed da IA) |
| 640 | **Hard cut Giz** — overlay `--c-giz-100` opacity 0→1 em ≤20ms, mantém 40ms |
| 680 | Overlay opacity 1→0 instantâneo · FUTURO troca para `data-state="ready"` (svg+bf visíveis) · stamp vira `+90 dias` em Giz-200 · count-up do BF% futuro 0→bf90 em 320ms |
| 1100 | Kicker block (PulsoLine + kg-line) fade-in (opacity 0→1 + translateY 6→0 em 320ms) |
| 1500 | Count-up do kg 0→delta em 700ms (ease-out cubic) |

**Reduced-motion:** se `prefers-reduced-motion: reduce`, pular toda a sequência — montar com FUTURO já visível, BF% no valor final, kicker visível, kg no valor final. Sem hard-cut, sem dot pulsando.

**Empty / loading state:**
- A tela em si **NÃO tem skeleton** — ela já É o skeleton para o lado FUTURO durante 680ms. Em prod, se a IA demorar > 2s, o stamp `Análise · X.Xs` continua tickando ao real até completar.
- Se análise > 30s: timeout · fallback "Continuar sem projeção" (mostra só HOJE + kicker estimado por % isolado).

**Acceptance criteria:**
- [ ] Fotos sempre em P&B · NUNCA coloridas (mesmo se a IA retornar colorida, converter client-side)
- [ ] Fio Arco 3px na borda DIREITA da silhueta FUTURO · não tem na HOJE
- [ ] **Hard cut Giz** entre o frame 600ms (HOJE só + chip analyzing) e o frame 680ms (HOJE + FUTURO + count-ups): zero frames de dissolve, mensurável via screen-record + frame analysis
- [ ] Eyebrow é a única peça Arco no top · headline em Giz-100
- [ ] BF% do FUTURO em **Giz-100** (não Arco) — preserva budget
- [ ] PulsoLine entre silhuetas e kicker em Cinza-300 estático (não pulsa Arco)
- [ ] Kicker line: `−X.X` em Mono 26pt Arco · `kg de gordura` em Narrow 11pt caps Giz-200
- [ ] Cálculo kg: `weightKg × (bfNow − bfProj) / 100`, com sinal correto (negativo perde, positivo ganha)
- [ ] Em viewport iPhone SE (375×667): tudo cabe sem scroll
- [ ] Paywall CTA "Manter ritmo" usa Button-primary full-bleed (CTA destino: `paywall-post-projection.html` via `data-nh-next="afterProjection"`)
- [ ] `prefers-reduced-motion`: estado final renderiza instantâneo, sem flash, sem count-ups

### 6.4 — Tela 04 · Meal Log Entry

**Estado da tela:** task-doing · usada 3-5× por dia · precisa ser RÁPIDA.

**State machine:**
```
[opening camera] → [photo captured · IA analyzing] → [items detected · editable] →
   ↓ (Salvar)            ↓ (cancelar)             ↓ (Registrar manual)
[saving] → Home    →   discard                   [manual entry form]
```

**Dados de entrada (envio pro server):**
```ts
type MealEntry = {
  mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  capturedAt: string;        // ISO timestamp
  photo?: Blob;              // optional · null se manual
  items: Array<{
    name: string;
    weight: number;          // gramas ou unidade
    weightUnit: 'g' | 'unit' | 'cup';
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    editedByUser: boolean;
  }>;
  totalKcal: number;
  source: 'photo' | 'audio' | 'manual' | 'whatsapp';
};
```

**Animações disparadas:**

| Trigger | Animação |
|---|---|
| Photo captured | Foto entra full-bleed · imediatamente passa por filtro grayscale + contrast (CSS/SVG filter) em 80ms |
| IA chip aparece | "ANÁLISE 1.4s" em Arco · pulsa lentamente até resultado · vira "612 KCAL · macros" sem transição |
| Items list mount | Cada row aparece com staggered fade (40ms entre rows) em 200ms |
| Tap `editar` | Row expande inline com input numérico · valor recalcula em real-time |
| Tap `Salvar refeição` | Loading state no botão · navigation back · MealCard nova entra na Home com translateY |

**Empty / loading state:**
- Pré-captura: viewport câmera com brackets em Giz nas 4 esquinas + label "ENQUADRAR · 3s" em Arco pulsando
- Durante análise IA: chip Arco "ANÁLISE 1.4s" + tiny Pulso line acelerado abaixo do chip
- Se IA falha: lista vazia · botão ghost "Registrar manual" vira primary
- Sem câmera disponível: skip pra entry manual diretamente

**Acceptance criteria:**
- [ ] Foto vira P&B em <100ms após captura (não é defeito de upload — é decisão de design)
- [ ] IA chip mostra timestamp (1.4s, 1.8s, etc.) — não generic "loading"
- [ ] Lista de itens tem botão "[editar]" inline em Narrow Arco caps
- [ ] CTA "Salvar refeição" disabled se lista vazia
- [ ] Tempo total da captura ao salvar: < 6s (target P50)

### 6.5 — Tela 05 · Weekly Pattern Review

**Estado da tela:** feedback · acessada via deep link no domingo de manhã (push notification).

**State machine:**
```
[loading] → [showing pattern · awaiting decision] →
                ↓ (Aplicar)        ↓ (back)
              [applying] → Home   navigate back
```

**Dados de entrada:**
```ts
type WeeklyPattern = {
  weekNumber: number;
  weekStart: string;
  weekEnd: string;
  dailyKcal: number[];          // 7 values · S T Q Q S S D
  dailyTarget: number;
  patterns: Array<{
    day: 'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun';
    type: 'over' | 'indulgence' | 'normal';
  }>;
  diagnosis: string;            // editorial copy gerado pela IA
  recommendation: {
    summary: string;
    actions: string[];
    validateOnDay: number;      // dia da próxima semana para checar resultado
  };
};
```

**Animações disparadas:**

| Trigger | Animação |
|---|---|
| Mount (com dados) | Bars do chart fazem height count-up de 0 ao final em 400ms ease-out · 50ms staggered entre dias |
| Title reveal | "SEXTA É TARDE." faz translateY(24→0) + opacity em 320ms · AFTER bars terminam de subir |
| Tap `Aplicar` | Botão vira loading state (Pulso line dentro do botão) · navigate back |

**Empty / loading state:**
- Chart aparece imediatamente (dados em cache local) · title mostra "ANALISANDO PADRÃO..."
- Após processamento IA: title troca para diagnóstico real com translate animation

**Acceptance criteria:**
- [ ] Exatamente 7 barras · nunca mais nunca menos
- [ ] Day labels (S T Q Q S S D) sincronizam com cores das barras (sexta em Arco, sábado em Atenção, resto em Cinza)
- [ ] `over` e `indulgence` aparecem juntos no máximo 1× por semana (regra de design)
- [ ] Title em Archivo Black 44pt, "TARDE." em Arco
- [ ] CTA "Aplicar" usa Button-primary full-width

---

## 7. Acceptance criteria · quality bar global

Antes de qualquer build subir pro EAS preview ou produção, passar nesses 12 itens:

- [ ] **Identidade.** Wordmark e Mark visíveis no app · I em Arco · zero outros tons de laranja
- [ ] **Pulso line presente.** Em todas as 8+ telas com número-manchete · estado correto para o contexto
- [ ] **Cor.** Zero `#FFFFFF` puro · zero verde · zero azul · Atenção amarelo só em 1 chip por semana
- [ ] **Tipografia.** Inter, Roboto, system-font detectados via grep no codebase = 0
- [ ] **Itálico.** `font-style: italic` ou `fontStyle: 'italic'` no codebase = 0 (exceto se for `normal`)
- [ ] **Border radius.** Nenhum elemento com radius > 8px · grep por `rounded-` no Tailwind: só `rounded-1`, `rounded-2`, `rounded-3`
- [ ] **Box-shadow.** Zero · profundidade só por cor de fundo
- [ ] **Acessibilidade.** Contraste validado · screen-reader funcional · reduced-motion respeitado
- [ ] **Performance.** Cold start < 1.5s em iPhone 8 / Galaxy A10 · scroll 60fps
- [ ] **Tickers.** Marquise sem cortes visíveis no loop · 1 ticker máximo por tela
- [ ] **Motion.** Bouncy/spring easing detectados = 0 · todas animações usam `ease-pulso`
- [ ] **Anti-clichês.** Loading spinner padrão = 0 · checkmark verde = 0 · confetti = 0

**Teste de "screenshot de influenciador":** tirar screenshot de qualquer tela do app · postar mentalmente no feed de um influenciador parceiro. Se destoa do conteúdo dele OU parece template SaaS genérico → não está pronto.

---

## 8. Testing approach

### 8.1 Unit (Jest + React Native Testing Library)

- Cada componente em `components/` tem teste de:
  - Render sem crash
  - Props variations (todos os states do PulsoLine, todas as variantes do Button)
  - Acessibilidade básica (`getByRole`, labels)

### 8.2 Visual regression (opcional · Chromatic / Percy)

- Storybook ou tela de Component Library (rota privada `/dev/components`) com todos os primitives
- Snapshot tests nos 5 hero screens em estados-chave (loading, ready, error)

### 8.3 E2E (Maestro)

- Fluxos críticos:
  1. **Onboarding → Paywall conversion** (incluindo captura de foto e revelação da projeção)
  2. **Daily flow** (abre Home → registra refeição → volta Home → recalibra → aceita)
  3. **Weekly review** (recebe push no domingo → abre → aplica recomendação)
- Roda em iOS Simulator + Android Emulator no CI a cada PR

### 8.4 Device matrix mínimo

| Device | Por quê |
|---|---|
| iPhone 14 (iOS 16+) | Modern baseline |
| iPhone 8 (iOS 15) | Low-end baseline · perf gate |
| Galaxy S22 (Android 13+) | Modern Android |
| Galaxy A10 / Moto E (Android 11) | Low-end Android · perf gate |

### 8.5 Performance budget

- Cold start até primeira tela com dados: **< 1.5s P50** (em low-end)
- Tap-to-response (qualquer botão): **< 100ms** percebido
- Animação de tela: **60fps** sustentado · zero jank em scroll

---

## 9. Open questions · destravar antes de Dia 1

### 9.1 Stack final

A recomendação é Expo + React Native (§1.1). **Confirmar com os devs:** isso encaixa? Se já há código Flutter / SwiftUI / Kotlin nativo iniciado, mandar o link para revisar antes de comprometer.

### 9.2 Backend contract

Devs back precisam confirmar os shapes de `HomeData`, `RecalibrateData`, `ProjectionData`, `MealEntry`, `WeeklyPattern` (vide §6). Se mudar agora é um copy-paste · se mudar depois do Dia 8 é dor.

### 9.3 IA pipeline · foto da refeição

- Quem implementa o `<photo> → <items[]>` ?
- Tempo target P50 e P95?
- Confidence threshold abaixo do qual sugerimos "Registrar manual"?
- Modelo: GPT-4o vision? Claude Sonnet vision? Modelo dedicado fine-tuned?

### 9.4 IA pipeline · projeção corporal

- Hoje vocês já têm o registro do código + modelo de geração de foto futura · está rodando local ou via API?
- Tempo de geração esperado · cabe em 14s?
- Caching: a foto projetada é regenerada toda vez ou cacheada por 30 dias?

### 9.5 Push notifications · domingo 9h

- A notificação que abre a Tela 05 (Weekly Pattern) precisa ser disparada via OneSignal / Expo Push / Firebase. Quem configura?

### 9.6 Validação da decisão Pulso

Conforme `04-visual-identity.md` §13: rodar Tela 03 (Body Projection em Pulso aesthetic) com 1–2 usuárias 30+ que não treinam pesado **antes do Dia 1 do dev**. Se a reação for "não é pra mim", revisar cromado de telas-ritual antes de comprometer todo o sprint de dev.

**Quem faz essa validação e quando?** Sugiro founder + designer · 2 entrevistas de 20min · até quarta-feira que vem.

### 9.7 Telas fora do MVP · explicitar

CLAUDE.md lista como fora de escopo do MVP design:
- Gamificação · ONG credits · Workout module · Community · Supplement marketplace · B2B brand features

**Confirmar:** dev também não implementa nada disso? Ou alguma delas vira "placeholder feature flag" no MVP?

### 9.8 Sobrenome de marca

Antes do submit pra App Store: o app é `NutriHero` ou `ProjectFit`? Decisão pendente desde a primeira sprint (`04-visual-identity.md` §13). Confirmar até Dia 5 (antes do bundle ID ser registrado).

---

## 10. Recursos · links rápidos

### Internos (este projeto)

- `docs/01-brand-direction.md` — direção legacy (Performance Operator) · histórico, não canônico
- `docs/02-brand-direction-menu.html` — 3 direções exploradas
- `docs/02-brand-direction-visual.html` — direção Pulso materializada
- `docs/03-visual-system.md` — tokens completos · referência canônica
- `docs/04-visual-identity.md` — execução da identidade · 5 telas spec
- `docs/04-visual-identity.html` — render visual da identidade · referência viva
- `assets/brand/` — SVGs prontos para o repo

### Externos

- [Archivo (Google Fonts)](https://fonts.google.com/specimen/Archivo)
- [Archivo Narrow (Google Fonts)](https://fonts.google.com/specimen/Archivo+Narrow)
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- [Expo SDK 51 docs](https://docs.expo.dev/)
- [NativeWind v4 docs](https://www.nativewind.dev/v4/)
- [Reanimated 3 docs](https://docs.swmansion.com/react-native-reanimated/)
- [Maestro E2E](https://maestro.mobile.dev/)

---

## 11. Próximo passo

Depois deste handoff, a sprint de design fecha. **O que entra na próxima semana:**

1. **Kickoff de dev** (60min) — founder + 3 devs + designer continuante, passar pelos itens da §9 e fechar
2. **Validação com usuária real** (§9.6) — antes do Dia 1
3. **Setup do repo** (§1.3) — Dia 1
4. **`<PulsoLine />` em isolamento** (§4) — Dia 2 · gate de qualidade · se falhar, repensar antes de seguir
5. **A partir daí: §5 timeline**

Designer continuante (quem assumir após a sprint atual) deve:
- Iterar nos hero screens conforme dev pede ajustes de proporção em device real
- Desenhar empty states ilustrados conforme cada tela secundária aparecer
- Responder dúvidas via Slack — não fazer nova sprint de design sem necessidade real

**O sistema está travado. O próximo trabalho é executar.**
