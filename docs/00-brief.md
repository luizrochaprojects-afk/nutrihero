# 00 · Brief do produto

> Versão anonimizada do brief e da proposta que abriram a sprint. Nomes de pessoas, empresas parceiras, valores comerciais e detalhes contratuais foram removidos.

## Contexto

Um time de founders estava construindo um app de nutrição para o mercado brasileiro, com lançamento previsto para o pico de demanda fitness (setembro a fevereiro, o "projeto verão"). A aquisição viria de influenciadores fitness parceiros, com parcerias B2B com marcas de suplemento no horizonte.

A tese do produto:

1. **Um motor de cálculo mais justo.** Os apps de dieta mais conhecidos calculam a zona calórica a partir do IMC (peso, altura e idade). O NutriHero usa o **percentual de gordura corporal** como variável central, estimado por medidas (pescoço, cintura e quadril) ou por foto.
2. **Reajuste contínuo da dieta.** O nutricionista recalibra a dieta a cada ~3 meses. O app faz isso **no mesmo dia** (um botão: "comi X, o que falta?") e **toda semana**, a partir de padrões de consumo (fome à noite, excesso no fim de semana, pico glicêmico, baixa adesão).

O posicionamento resumido: *"seu nutricionista de bolso"*.

## O desafio

A visão era ampla: projeção do corpo futuro a partir de foto, registro alimentar multimodal (foto, áudio, texto, WhatsApp), gamificação, créditos para ONG, módulo de treino, comunidade e marketplace de suplementos. Tudo isso é legítimo, mas não cabe num MVP.

O risco era abrir tantas frentes que o MVP não validasse o que importa (**motor + reajuste**) nem entregasse uma jornada limpa o bastante para o paywall converter.

## Objetivo da sprint (3 semanas)

- Fluxo de MVP definido e priorizado: o que entra na v1, o que fica para v1.1 e o que vai para o roadmap.
- Protótipo navegável de alta fidelidade das telas principais, pronto para validar com sócios, nutricionistas, influenciadores e usuários.
- Direção visual e de marca suficiente para o produto não parecer wireframe em apresentações.
- Handoff estruturado para os três devs (back, mobile e IA).
- Lista das hipóteses críticas que o MVP precisa testar e de como observar cada uma nas primeiras semanas.

## Fases

| Fase | Dias | Foco |
|---|---|---|
| 1 · Imersão e priorização | 1–3 | Kick-off, hipóteses críticas, fluxo principal único, separação core × pós-MVP, alinhamento do paywall |
| 2 · Arquitetura da experiência | 4–7 | Onboarding, paywall + trial, dieta inicial, rotina diária, botão de reajuste, reajuste semanal, progresso mínimo |
| 3 · Alta fidelidade | 8–12 | Direção de marca, UX writing das telas críticas, estados (vazio, erro, carregando, dia sem registro), protótipo navegável |
| 4 · Handoff | 13–14 | Especificação por tela, tokens, ordem de build, sessão com os devs |

## Hipóteses críticas do MVP

- **Adesão diária:** o usuário registra e recalibra todo dia nas semanas 1–2?
- **Drop-off na foto:** a projeção do corpo futuro compensa o atrito de pedir foto? Existe fallback por medidas?
- **Conversão no paywall do dia 0:** cartão no dia 0, cobrança no dia 7. A credibilidade dos influenciadores sustenta isso?
- **Recorrência no dia 7:** quem entra no trial fica depois da primeira cobrança?
- **Frequência do botão de reajuste:** ele vira o hábito central ("abrir, comer, apertar, seguir")?

## Recomendações que pautaram a sprint

1. **Cortar o MVP para reajuste + registro alimentar + paywall.** O resto entra depois ou aparece de forma mínima.
2. **A foto é faca de dois gumes.** A projeção dá motivo para tirar a foto, mas o fluxo precisa de fallback por medidas e de uma decisão clara sobre onde fica o paywall em relação a ela.
3. **Paywall no dia 0 é defensável** com a credibilidade dos influenciadores, desde que os termos sejam comunicados de forma muito clara e honesta.
4. **O botão de reajuste é o produto.** Não pode ficar escondido num menu: o app inteiro é desenhado em volta dele.
5. **Gamificação e comunidade ficam para depois.** Dependem de massa crítica e de adesão já validada.
6. **Treino, ONG e marketplace também ficam para depois.** São oportunidades reais, mas distraem do que o MVP precisa provar.

## Fora de escopo

Desenvolvimento de software, validação científica das fórmulas nutricionais (responsabilidade dos nutricionistas parceiros), responsabilidade jurídica e regulatória, pesquisa quantitativa em volume, branding completo, design system completo, analytics e testes A/B.
