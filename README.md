# NutriHero · nutricionista de bolso

**Case de produto:** sprint de 3 semanas, do kick-off ao handoff, para o MVP de um app brasileiro de nutrição. Inclui estratégia de MVP, direção de marca, design system e protótipo navegável de alta fidelidade.

**[▶ Abrir o protótipo](https://luizrochaprojects-afk.github.io/nutrihero/prototype/)** · funciona no celular e no desktop

![Telas principais: projeção do corpo, Hoje, recalibração e padrão semanal](docs/images/telas-principais.png)

---

## O problema

Os apps de dieta mais usados calculam a zona calórica a partir do **IMC** (peso, altura e idade). Duas pessoas com o mesmo IMC e percentuais de gordura diferentes recebem a mesma dieta, e uma delas vai errar: ou ganha gordura ou perde massa magra.

O ajuste também é lento. O nutricionista recalibra a dieta a cada **três meses**, e a maioria das pessoas desiste antes do retorno.

## A tese

| | Apps de dieta hoje | NutriHero |
|---|---|---|
| **Variável central** | IMC | % de gordura corporal (medidas ou foto) |
| **Ciclo de ajuste** | Trimestral (consulta) | Diário (um botão) + semanal (padrões) |
| **Papel do app** | Diário alimentar | Nutricionista de bolso que decide o que falta |

A interação central cabe numa frase: **abrir, comer, apertar, seguir.** O botão de recalibrar redistribui as calorias restantes do dia entre as próximas refeições.

## O que eu fiz

Conduzi a sprint de produto e design do kick-off ao handoff:

1. **Imersão e corte de escopo.** A visão original tinha 8 frentes além do core (gamificação, ONG, treino, comunidade, marketplace…). O MVP ficou em **motor + reajuste + registro + paywall**. → [Brief](docs/00-brief.md) · [PRD](docs/process/prd-mvp.md)
2. **Direção de marca.** Três direções exploradas; a escolhida, **"Pulso"**, trata o corpo como um sistema mensurável e o usuário como operador, não como paciente. → [Direção](docs/01-brand-direction.md) · [Menu de direções](docs/02-brand-direction-menu.html) · [Exploração visual](docs/02-brand-direction-visual.html)
3. **Design system.** Tokens, tipografia, contraste, estados, motion e o componente-assinatura `PulsoLine`. → [Visual system](docs/03-visual-system.html)
4. **Identidade e telas.** Logo, ícone do app e mockups das telas-chave. → [Visual identity](docs/04-visual-identity.html)
5. **Protótipo com variantes.** 17 telas de jornada mais telas de apoio, com **5 decisões de produto em aberto** que o revisor alterna ao vivo. → [Protótipo](prototype/)
6. **Handoff.** Stack, tokens prontos para colar, ordem de build em 14 dias, comportamento tela a tela e critérios de aceite. → [Dev handoff](docs/05-dev-handoff.md)

## Decisões de produto testáveis

Em vez de defender uma resposta, o protótipo deixa as decisões mais arriscadas lado a lado:

| Decisão | Pergunta | Variantes |
|---|---|---|
| **Anamnese** | Quanta fricção cabe antes da revelação? | 5 perguntas · 8 perguntas |
| **% de gordura** | Medidas são previsíveis; foto vende mais. Qual abre a jornada? | Medidas primeiro · Foto primeiro |
| **Paywall** | Onde pedir o cartão? | Antes do cálculo · Após a projeção · Após o 1º reajuste |
| **Recalibração** | Como o plano novo aparece? | Ticker animado · Modal · Bottom sheet |
| **Reajuste semanal** | Onde o padrão da semana chega? | Card na Hoje · Tela dedicada · Push |

![Três variantes da projeção do corpo comparadas lado a lado](docs/images/variantes-projecao.png)

## Antes e depois

À esquerda, o rascunho de onde a sprint partiu: template genérico de wellness, fundo salmão e botões-pílula. À direita, a mesma pergunta na direção Pulso: número grande em monospace, régua arrastável e progresso da anamnese com tempo estimado.

<p>
  <img src="docs/images/antes-cadastro.png" alt="Antes: cadastro com fundo salmão, dois campos de texto e botão vermelho" width="280" />
  &nbsp;&nbsp;
  <img src="docs/images/depois-cadastro.png" alt="Depois: pergunta de peso com número grande e régua arrastável" width="240" />
</p>

## Direção "Pulso" em 30 segundos

- **Ferramenta, não coach.** Tom de operador: segunda pessoa, verbos no imperativo, decimais expostos. Sem emoji, sem "ops!".
- **Uma cor de ação.** Arco `#FF5B1F`, no máximo 2 vezes por tela. Atenção `#F7D74C` é o único aviso, usado uma vez por semana. Sem verdes, sem azuis.
- **Tipografia.** Archivo (display) + Archivo Narrow + JetBrains Mono para todo número que exige precisão.
- **Assinatura.** A `PulsoLine`: uma linha fina sob o kcal do dia que pulsa devagar quando você está no plano e acelera quando sai dele.

---

## Como navegar o protótipo

- **No celular:** abre em tela cheia, como um app. Dá para adicionar à tela inicial.
- **No desktop:** abre dentro de uma moldura de celular, com um painel para pular entre etapas, trocar variantes, alternar tema claro/escuro e mostrar os cenários de teste.
- **Comparar variantes:** [`prototype/compare.html`](prototype/compare.html) mostra as opções de cada decisão lado a lado.

![Protótipo aberto no desktop: moldura de celular à esquerda e painel de jornada e variantes à direita](docs/images/prototipo-desktop.png)

Para rodar localmente, sem build:

```bash
npx serve .
# abra http://localhost:3000/prototype/index.html
```

## Estrutura

```
├── prototype/          Protótipo navegável (HTML/CSS/JS puro, sem build)
│   ├── index.html      Entrada
│   ├── device.html     Moldura de celular para desktop
│   ├── compare.html    Variantes lado a lado
│   └── screens/        Telas da jornada
├── docs/
│   ├── 00-brief.md                 Contexto e escopo (anonimizado)
│   ├── 01-brand-direction.md       Direção de marca
│   ├── 02-brand-direction-*.html   Exploração das direções
│   ├── 03-visual-system.*          Design system
│   ├── 04-visual-identity.*        Logo, ícone e telas
│   ├── 05-dev-handoff.md           Handoff para desenvolvimento
│   └── process/                    PRD, plano do protótipo, notas de UX e export do Figma
└── assets/brand/       Logo, ícone e marcas em SVG
```

---

<sub>Projeto de portfólio. Nomes de pessoas, empresas parceiras e condições comerciais foram removidos. Os valores nutricionais do protótipo são ilustrativos e não constituem recomendação de saúde.</sub>
