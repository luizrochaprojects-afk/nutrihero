# NutriHero · Jornada do protótipo no Figma

**FigJam:** board privado (link removido na versão pública)

## Status

- ✅ 17 telas capturadas (PNG 390×844) em `.` (`01-cold-open.png` … `17-meal-log.png`)
- ✅ Imagens já no FigJam, posicionadas em grid de 8 colunas (uma por estágio de jornada)
- ❌ Headers, labels e conectores — bloqueado por rate limit do plano Figma Starter

## Para terminar (30s)

1. Abra a URL do FigJam acima no **Figma Desktop**
2. Menu → **Plugins** → **Development** → **Import plugin from manifest...**
3. Selecione `figma-plugin/manifest.json`
4. Menu → **Plugins** → **Development** → **NutriHero · Jornada · finish layout**

O plugin cria:
- 8 headers de coluna (`01 · ENTRADA` … `08 · SEMANAL`)
- 17 labels acima de cada tela (laranja Arco para baseline · cinza para variantes)
- 19 conectores:
  - 10 setas sólidas laranja Arco — jornada baseline e loops home↔reajuste / home↔meal-log
  - 8 conectores tracejados cinza — variantes ("medidas vs foto", "modal", etc.)
  - 1 conector tracejado amarelo Atenção — fallback "não consegui" do BF foto → medidas

## Grafo

```
cold-open
  └→ onboarding-short ⇢ onboarding-full
       └→ bf-method-measure ⇢ bf-method-photo (⇠ fallback "não consegui")
            └→ projection
                 └→ paywall-post-projection ⇢ paywall-pre-bf
                                            ⇢ paywall-post-first-reajust
                      └→ home ↔ reajust-ticker ⇢ reajust-modal · reajust-drawer
                          ↔ meal-log
                          └→ weekly-home-card ⇢ weekly-dedicated · weekly-notification
```

Legenda:
- `→` baseline (Arco, sólido)
- `↔` loop (Arco, sólido — bidirecional)
- `⇢` variante mesmo estágio (Giz, tracejado, sem seta)
- `⇠` fallback (Atenção, tracejado, com seta)
