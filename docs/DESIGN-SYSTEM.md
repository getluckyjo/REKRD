# REKRD Design System — v1.0

> The single source of truth for how REKRD looks and feels on screen.
> Derived directly from Linda's packaging (dusty-blue tube, June 2026 renders) so the
> website and the physical product read as one object.
>
> Positioning in one line: **"Country club, not locker room."**
> Retro-considered, quietly confident, engineered. Never loud, never neon, never "sports nutrition".

---

## 1. Brand idea → design idea

REKRD = personal record. The packaging already carries the vocabulary:

| Packaging element | Design-system translation |
|---|---|
| Tick-marked lid (stopwatch/records dial) | The **Tick Ring** — signature SVG motif for heroes, dividers, bullets |
| Vertical flavour spectrum bar | The **Spectrum** — 5 flavour accent colours, used as hairline bars and swatches |
| Nutrition panel typography | **Spec-sheet tables** — hairline rules, mono labels, dense data presented beautifully |
| Use-case ring ("ENDURANCE \| HEAT SUPPORT \| LONG FLIGHTS \| LATE NIGHTS…") | The **Ticker** — marquee strip of use cases |
| Bold italic-cut wordmark | Heavy display headlines with tight tracking; italic serif accents for human words |

The web experience should feel like handling the tube: calm powder-blue surfaces,
crisp ink typography, and small precise details that reward attention.

## 2. Colour

Sampled from the actual packaging renders (not approximated).

### Core

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B1220` | Wordmark, headlines, body text, footer background |
| `--ink-soft` | `#3A4354` | Secondary text |
| `--powder-100` | `#DCE9F1` | Lightest blue — large section fields, cards |
| `--powder-200` | `#C9DAE8` | Primary brand blue (front-of-tube) — hero fields |
| `--powder-300` | `#ACC6D5` | Borders on blue, hover states |
| `--powder-400` | `#93A9B7` | Shaded blue — subtle depth, never text |
| `--paper` | `#F4F1EB` | Page background (warm gallery-wall off-white) |
| `--cream` | `#FDFCF9` | Cards on paper, table backgrounds |

### Flavour spectrum (accents only — never large fields)

| Token | Hex | Flavour |
|---|---|---|
| `--fl-cherry` | `#A8CC7C` | Sour Cherry Apple |
| `--fl-pineapple` | `#EFD88C` | Pineapple Berry |
| `--fl-orange` | `#ECB87E` | Orange Zest |
| `--fl-rooibos` | `#E8A38C` | Rooibos Peach Iced-Tea |
| `--fl-watermelon` | `#E8949C` | Salty Watermelon |

### Rules

- Ink on powder-blue and ink on paper are the two core pairings. Both pass WCAG AA for all text sizes.
- Flavour colours appear as: the spectrum bar, flavour dots/swatches, small underlines. **Never** as backgrounds for text blocks, never as gradients.
- No pure black (`#000`), no pure white fields (`#FFF` only inside components like inputs).
- No gradients anywhere. Depth comes from layered flat colour + hairlines, like print.

## 3. Typography

Three voices, loaded from Google Fonts (self-hosting flagged in the launch TODO):

| Role | Font | Usage |
|---|---|---|
| **Display** | `Archivo` (variable; weight 800–900, width 115–125 "Expanded") | Headlines, prices, numbers. ALL-CAPS for H1/H2, tight tracking (`-0.01em`). Closest live match to the wordmark's heavy cut |
| **Accent** | `Instrument Serif` *italic* | Single human words inside headlines — *personal best*, *the ritual*, *for the record*. Lowercase, never bold |
| **Body** | `Archivo` 400/500 (normal width) | Paragraphs, UI. 16–18px, line-height 1.6 |
| **Spec / Label** | `IBM Plex Mono` 500 | Eyebrow labels, table data, prices-per-sachet, footer legal. ALL-CAPS at 11–13px with `+0.08em` tracking |

Type scale (desktop → mobile): H1 `clamp(44px→88px)`, H2 `clamp(32px→56px)`, H3 24px, body 17px, spec 12px.

**The headline formula** (use everywhere):
`HEAVY CAPS ARCHIVO` + *italic serif words* for contrast → "*ready.* *set.* HYDRATE."

**Wordmark:** never typeset "REKRD" in a font as a logo. Use the extracted assets
(`site/assets/img/rekrd-wordmark-ink.png` / `-white.png`, pulled from the packaging render).
Final vector logo from Linda is on the TODO register.

## 4. The motifs

### 4.1 Tick Ring
Radial tick marks (the tube lid). Implemented as inline SVG (`.tick-ring`). Uses: hero
ornament behind product, section-number badges, footer stamp, favicon. Rotates very slowly
(60s/rev) on hover-capable devices; static on mobile.

### 4.2 Spectrum Bar
A 5-segment hairline bar (the flavour lineup strip from the pack). Uses: top-of-page
announcement border, card accents, `<hr>` replacement between major sections.

### 4.3 Spec-sheet tables
Hairline (`1px --powder-300` / `--ink` at 12% opacity) rules, mono labels left, values right —
exactly the nutrition panel. Used for: nutrition info, product specs, shipping tables, FAQ metadata.

### 4.4 Ticker
Full-bleed marquee strip: `ENDURANCE / HEAT SUPPORT / LONG FLIGHTS / LATE NIGHTS / ANTI-CRAMPING / SPORTS RECOVERY / MUSCLE FUNCTION / FASTING SUPPORT` — ink strip, powder-blue text, 40s loop, pauses on hover. `prefers-reduced-motion` → static row.

### 4.5 Stamps
Small circular/rect mono-type badges: `THIRD-PARTY TESTED`, `PTA · ZA`, `30 SACHETS`,
`ONE A DAY`. Rendered as bordered text, print-style. Never drop-shadowed.

## 5. Components

| Component | Spec |
|---|---|
| **Button / primary** | Ink fill, paper text, 2px radius, mono 13px caps, 16×28px padding. Hover: powder-200 fill + ink text (inverts). Active: translateY(1px) |
| **Button / ghost** | 1px ink border, transparent. Same hover invert |
| **Product card** | Cream card, 2px radius, 1px powder-300 border. Image on powder-100 field, name in display caps, price in mono, flavour dots row. Hover: border → ink |
| **Nav** | Sticky, paper background w/ 1px ink hairline bottom. Wordmark left (ink PNG, h 22px), links mono caps, cart button right with count |
| **Cart drawer** | Right slide-in 420px, ink overlay 40%. Line items as spec-sheet rows. Subtotal + "CHECKOUT ON SHOPIFY →" primary button. Note: "Secure checkout · Paystack" |
| **Announcement bar** | Ink strip, powder text, mono 12px, spectrum bar as bottom border |
| **Inputs** | White fill, 1px ink border, 2px radius, mono placeholder |
| **Footer** | Ink field, powder-100 text, wordmark-white large, columns mono, legal 11px |

Spacing: 8px base grid; sections `clamp(72px→140px)` vertical. Max content width 1200px; text measure 65ch.
Radii: 2px everywhere (print-crisp). 24px only for stamps/pills.
Borders: 1px hairlines everywhere; 2px for emphasis. No shadows except cart drawer (`0 0 0 1px ink, 24px blur 20%`).

## 6. Motion

Restraint = premium. Only:
1. Ticker marquee (40s linear loop)
2. Scroll-in: single `opacity 0→1, translateY 12px→0, 500ms ease-out` on section children, staggered 60ms. IntersectionObserver, once
3. Hover inversions on buttons/cards (150ms)
4. Tick Ring slow rotation
5. Cart drawer slide (280ms cubic-bezier(.2,.7,.2,1))

`prefers-reduced-motion: reduce` disables 1, 2 and 4. No parallax, no scroll-jacking, no autoplaying sound.

## 7. Imagery

- **Product**: renders on seamless light grey/powder fields (current WhatsApp renders are placeholders — see TODO register). Straight-on or ¾, generous margins.
- **Lifestyle** (all still needed): golf course at golden hour, padel court flash-photography, festival crowd, kitchen-counter tube. Film-look grain, slightly warm, real people mid-moment — *never* stock-gym imagery.
- **Video**: existing 9.5s montage (656×480) used as muted inline loop; hi-res re-render on TODO.
- Duotone treatment (ink + powder) allowed for editorial bands.

## 8. Voice in the UI (microcopy rules)

- Sentence case for body, caps for structure. Dry, precise, a little wry: "One a day. That's it."
- Numbers are heroes: `150MG SODIUM`, `5 FLAVOURS`, `30 SACHETS`, `R20 / SACHET`.
- Never: "crush it", "beast mode", "fuel", exclamation marks in headlines, emoji.
- Afrikaans-friendly warmth allowed in campaign copy, English for all UI.

## 9. What to avoid (anti-patterns)

- Neon, gradients, glassmorphism, dark-mode-sporty (that's Revive/USN territory — the whole point is contrast with it)
- Full-width photography heroes with text overlay (we lead with product + type on flat colour)
- More than one flavour colour per component
- Rounded-everything friendliness — REKRD is crisp, not bubbly
- Fake urgency (countdown timers, "only 3 left")

## 10. Accessibility

- All text pairings AA minimum (ink/paper 15.9:1, ink/powder-200 12.6:1)
- Focus states: 2px ink outline, 2px offset — never removed
- Ticker/marquee content duplicated in an sr-only static list
- Touch targets ≥ 44px; cart drawer focus-trapped, Esc to close
