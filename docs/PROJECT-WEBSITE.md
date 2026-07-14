# REKRD Website — Project Overview

> **Why this exists:** the website is the #1 launch blocker — Paystack compliance and
> Takealot vendor registration both require a live site showing who REKRD is and what it
> sells. This build unblocks that *now* with a purpose-built brand site, and hands off
> checkout to the team's existing Shopify store.
>
> Built July 2026. Companion docs: `DESIGN-SYSTEM.md` · `SHOPIFY-UX-COPY.md` · `MARKET-RESEARCH.md`.

---

## 1. What was built

A dependency-free static website (hand-written HTML/CSS/vanilla JS — no build step,
no framework) implementing the REKRD retro-premium brand end to end, with a
client-side cart that checks out through Shopify.

### Sitemap / file map

**Single-page site** (per Johannes, July 14): all content lives on index.html with
anchor navigation — `#shop`, `#ritual`, `#flavours`, `#about`, `#faq`, `#contact`.
Only the legal policy pages remain separate documents (Paystack reads them).

```
site/
├── index.html               THE site — hero video, ticker, positioning, flavours
│                            (sachet renders), formula, shop (#shop — the
│                            Paystack/Takealot catalogue), ritual, nutrition
│                            scoreboard, subscription, about, FAQ, contact
├── 404.html                 Branded not-found
├── policies/
│   ├── privacy.html         POPIA-oriented privacy policy
│   ├── terms.html           Terms of service (CPA-aware)
│   └── shipping-returns.html
├── css/rekrd.css            The entire design system as CSS tokens + components
├── js/
│   ├── shopify-config.js    ← THE ONLY FILE TO EDIT to connect Shopify
│   ├── cart.js              localStorage cart + Shopify permalink checkout
│   └── main.js              nav, reveal-on-scroll, anchor menu close
└── assets/
    ├── img/                 wordmark (ink/white), tube + sachet + 5-pack renders,
    │                        fruit photos (unused, kept), favicon, hero poster
    └── video/rekrd-hero.mp4 brand film (848×480 — hi-res re-export on TODO)
```

Sub pages (shop/product/about/faq/contact) were removed 2026-07-14; their content
is preserved as sections. If the site ever needs them back, they're in git history
(`git log -- site/shop.html`).

### Demo checkout (for client walkthroughs)

While the Shopify variant IDs are unconfigured, the Checkout button opens a
**clearly-labelled simulation** (`js/demo-checkout.js`): a Shopify-style checkout
page with pre-filled dummy contact/delivery/Paystack-card data (nothing editable,
nothing stored) ending in a mock "Order #REKRD-1001 confirmed" screen. Controlled
by `demoMode: true` in `js/shopify-config.js`. **The moment real variant IDs are
pasted in, the real Shopify checkout takes over automatically** — no need to
remove anything, though you can set `demoMode: false` any time.

### Verified working
- All internal links across 11 pages (automated check: 0 broken)
- Cart: add/remove/quantity, subtotal, drawer, persists across pages (localStorage)
- Checkout builds a correct Shopify cart permalink; shows a helpful explainer until variant IDs are configured
- Content fully visible without JavaScript (important for the Paystack reviewer and crawlers)
- Responsive at 390 / 768 / 1440; `prefers-reduced-motion` respected; WCAG AA colour pairings

## 2. Shopify linking runbook (Rools — ~20 minutes)

1. **Create the products** in Shopify admin (Products → Add product), using the
   descriptions in `SHOPIFY-UX-COPY.md` §3:
   - REKRD Hydration — 30 Sachets — R600
   - REKRD Starter — 5 Sachets — R100
   - (later) REKRD Refill — 30 Sachets
2. **Copy each variant ID**: open the product → "Variants" → the ID is in the URL after
   `/variants/` (or "..." menu → Copy variant ID).
3. **Edit `site/js/shopify-config.js`**: paste the variant IDs and set `storeDomain`
   (use `your-store.myshopify.com` until `shop.rekrd.io` DNS is pointed at Shopify).
4. **Test**: add to cart → Checkout → you should land on the Shopify cart/checkout with
   the right items. That's the whole integration — no API keys, nothing to break.
5. When you want live inventory/price sync later, switch to the Buy Button SDK
   (starter snippet is commented at the bottom of `shopify-config.js`).
6. Mirror the three policy pages into Shopify admin → Settings → Policies (Paystack
   reads these from checkout too).

## 3. Hosting

Any static host works. Recommended: **Netlify or Vercel free tier** (drag-and-drop the
`site/` folder or connect this repo, set `site/` as the publish directory).

Domain plan (decide with the team):
- **Option A (recommended):** `rekrd.io` → this site (brand/marketing front) · `shop.rekrd.io` → Shopify (checkout). Cart hands over seamlessly.
- **Option B:** everything on Shopify eventually — this site's sections then become the reference design for a Shopify theme port.

`404.html` is picked up automatically by Netlify; on Vercel add a route config.

## 4. Launch checklist (unblocking Paystack & Takealot)

- [ ] Host `site/` publicly (Netlify/Vercel — 15 min)
- [ ] Point `rekrd.io` (or a temporary subdomain) at it
- [ ] Create the 2 launch products in Shopify + paste variant IDs into `shopify-config.js` (runbook above)
- [ ] Point `shop.rekrd.io` DNS at Shopify (Settings → Domains)
- [ ] Enable Paystack as the payment provider in Shopify; resubmit Paystack compliance **with the live site URL**
- [ ] Add the policy pages to Shopify Settings → Policies
- [ ] Install Bob Go app; set R500 free-shipping threshold
- [ ] Resume Takealot vendor registration with the live catalogue URL
- [ ] Verify the GS1 barcode is on the 30-pack Shopify listing (Takealot requirement)

## 5. ⚠️ Still needs design — the register

Everything below is flagged with `TODO` comments in the code at the exact spot it's needed.

### Brand assets (Linda)
| Item | Where used | Current placeholder |
|---|---|---|
| **Final logo files** (vector SVG, ink + white) | nav, footer, favicon | Wordmark extracted from packaging render (raster, 765px — good but not print-grade) |
| **Final favicon** | all pages | Interim tick-ring SVG |
| **Hi-res hero film** (1080p+, current source 848×480) | homepage hero video | WhatsApp export (new-logo film, July 14) |
| ~~5-pack pouch render~~ | done — "Test Pack 05" render live on cards + PDP | — |
| **Refill pouch render + name** | needed before the refill launches | — |
| **Flavour illustrations / sachet renders** (5) | flavour line-up section | Colour dots only |
| **OG/social share image** (1200×630) | meta tags | Tube render (uncropped) |
| ~~Brand montage video~~ | removed — carried the old mirrored-K wordmark | — |

### Photography (to brief)
Lifestyle set per the design system (§7): golf halfway house, padel bench flash-shot,
festival, kitchen-counter tube, pouring/stir macro. Film-look, direct flash, real people.

### Content & decisions (team)
| Item | Owner | Notes |
|---|---|---|
| Refill pack price + subscription discount/gift | Johannes/Frans | Placeholder "TBC" on site |
| Free-shipping threshold confirmation (R500 assumed) | Frans | Matches SA norm; announcement bar + policies reference it |
| Under-R500 shipping rate ("from R60") | Rools (Bob Go rates) | shop.html + policy page |
| **Nutrition values verification** | Linda/brother | Site values transcribed from packaging render — **verify against final print artwork** (flagged in `index.html` + PDP) |
| Third-party testing lab name/certificate | Linda | Would strengthen the claim ("tested by …") |
| Legal review of policies (POPIA/CPA) | team | Drafts are solid but unreviewed |
| Afrikaans campaign lines | Linda | Only first-language-written |
| Newsletter platform + form wiring | Rools | Form shows explainer alert |
| Contact form wiring (or keep mailto) | Rools | Form shows explainer alert |
| Analytics (recommend Shopify analytics + Plausible/GA4) | Rools | None installed |
| Self-host fonts before scale (performance + POPIA-friendly) | Rools | Google Fonts CDN for now |

### Future pages (designed-for, not built)
- Editions archive (limited-edition tubes — the collectible loop, see MARKET-RESEARCH.md §3)
- Education/blog layer (SEO strategy in SHOPIFY-UX-COPY.md §6)
- Coach/club referral landing pages (flow C)
- Corporate/golf-day gifting page (flow D)

## 6. Running locally

```bash
cd site && python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no dependencies. Edit HTML/CSS, refresh.

## 7. Design decisions worth knowing (short version)

- **Why static + permalink checkout, not a Shopify theme?** Johannes chose HTML-from-scratch with Shopify checkout. Permalinks (`/cart/{variantId}:{qty}`) are Shopify's supported no-code integration: zero keys, zero maintenance, works with the paid template untouched. The site can be ported into a Shopify theme later — every section is self-contained.
- **Why the shared markup is duplicated per page:** no templating keeps hosting trivial and hand-off simple at 11 pages. If the page count grows, move to a static generator or the Shopify port.
- **The dusty blue, ink, cream palette is sampled from the actual packaging renders** — hex values and all rules in `DESIGN-SYSTEM.md`.
- Positioning, pricing logic and channel strategy behind the copy: `MARKET-RESEARCH.md` §4.
