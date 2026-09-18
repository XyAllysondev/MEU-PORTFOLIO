# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Portfolio Allyson
**Updated:** 2026-09-18
**Category:** Soft Tech / Lavender Studio

> Tokens reais em produção em `assets/css/style.css` (`:root`). Sempre use
> estes valores — nunca hardcode cor nova sem checar se já existe um token.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Fundo base | `#f6f4fb` | `--bg` |
| Fundo 2 | `#ece8f7` | `--bg-2` |
| Branco | `#ffffff` | `--branco` |
| Vidro (card) | `rgba(255,255,255,.88)` | `--vidro-f` |
| Texto primário | `#17132b` | `--ink` |
| Texto secundário | `#4a4466` | `--ink-2` |
| Texto terciário (6.1:1 sobre `--bg`) | `#5f5880` | `--ink-3` |
| Roxo (accent/CTA, 5.3:1 sobre branco) | `#6d3df5` | `--roxo` |
| Roxo 2 (gradiente) | `#8b5cf6` | `--roxo-2` |
| Roxo 3 (bordas/detalhe) | `#c4b5fd` | `--roxo-3` |
| Roxo 4 (fundo de chip) | `#ede9fe` | `--roxo-4` |
| Lilás (gradiente) | `#c084fc` | `--lilas` |
| Verde (status) | `#10b981` / texto `#067a55` | `--verde` / `--verde-txt` |
| Erro | `#dc2626` | `--erro` |
| Linha | `rgba(23,19,43,.08)` / `.14` | `--linha` / `--linha-2` |

**Color Notes:** paleta tirada do vídeo do hero (escritório claro com neon
lavanda). Texto sobre fundo claro sempre em `--ink`, `--ink-2` ou `--ink-3`;
`--roxo` só para texto ≥ 14px bold ou sobre branco.

### Typography

- **Display/Headings:** `'Sora', 'Segoe UI', system-ui, sans-serif` (`--disp`) — 600–800, tracking −0.02 a −0.04em
- **Body:** `'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif` (`--sans`) — 400–700
- **Mood:** amigável, arredondado, limpo, "soft 3D"

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | 12px | ícones, inputs pequenos |
| `--r-md` | 18px | certificados, inputs |
| `--r-lg` | 26px | cards |
| `--r-xl` | 34px | card do vídeo |
| pill | 999px | botões, chips, rótulos |

### Shadows

| Token | Usage |
|-------|-------|
| `--sombra` | repouso de card (tinta roxa suave) |
| `--sombra-2` | hover / destaque |

---

## Component Rules

- **Cards:** `.card` — vidro branco, borda 1px branca, borda-gradiente sutil via `::before`, `backdrop-filter`.
- **Botões:** `.btn.btn-cheio` (gradiente roxo→lilás, texto branco) e `.btn.btn-vidro` (vidro com borda). Sempre pill, ícone à direita com deslocamento no hover.
- **Chips:** `.chips li` — `--roxo-4` fundo, `--roxo` texto, 12.5px 600.
- **Status:** `.status` — ponto verde com halo, texto `--verde-txt`.
- **Rótulo de seção:** `.rotulo` — uppercase, traço à esquerda, cor `--roxo`.

---

## Style Guidelines

**Style:** Soft Tech / Glassmorphism claro

**Keywords:** lavender, glass, rounded, friendly, 3D character, floating cards, clean

**Key Effects:** blobs desfocados no fundo, grade sutil com máscara radial, cards flutuando (`boia`), revelação por IntersectionObserver, hover com `translateY(-4px)`.

---

## Anti-Patterns (Do NOT Use)

- ❌ Fundo escuro / neon ciano (era o tema anterior)
- ❌ Emojis como ícones — usar SVG inline (Lucide-like, stroke 2)
- ❌ Hover que muda layout (scale em elementos de fluxo)
- ❌ Texto abaixo de 4.5:1
- ❌ Transições instantâneas (usar 150–350ms com `--ease`)
- ❌ Foco invisível

---

## Pre-Delivery Checklist

- [ ] Ícones SVG, set consistente
- [ ] `cursor: pointer` em tudo clicável
- [ ] Hover com transição suave
- [ ] Contraste ≥ 4.5:1
- [ ] Foco visível (`:focus-visible` roxo, offset 3px)
- [ ] `prefers-reduced-motion` respeitado (vídeo parado no poster)
- [ ] Responsivo: 375, 768, 1024, 1440
- [ ] Sem scroll horizontal no mobile
