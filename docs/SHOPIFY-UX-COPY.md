# REKRD — Shopify UX & Copywriting Deck v1.0

> The voice, the words, and the flows. Everything here is already implemented on the
> static site (`site/`); this doc is the canonical copy source for Shopify admin,
> emails, and future pages. Placeholders are marked **[TODO]**.

---

## 1. Brand voice

**Register: "Country club, not locker room."** Warm, dry, quietly confident, precise.
The Yuppiechef school of SA e-commerce — human and a little wry — crossed with
Tracksmith's understated heritage.

| Do | Don't |
|---|---|
| "One a day. That's it." | "CRUSH YOUR GOALS!!!" |
| "Enough electrolytes to work, not enough to pickle you." | "Scientifically engineered mega-dosed formula" |
| Numbers as heroes: `600 MG SODIUM`, `R20 / SACHET` | Vague superlatives: "ultimate", "revolutionary" |
| Self-aware wit: "imitation is flattering but also actionable" | Puns for their own sake |
| SAHPRA-safe: "supports muscle function" | Medical claims: "cures cramps", "treats dehydration" |

**Tagline:** *Feel your personal best.* (lowercase in the italic serif accent voice)
**Secondary lines:** "For the record." · "One a day. That's it." · "What you put in is what you get out."

Language: English base. Afrikaans flourishes allowed in campaigns only if written by a
first-language speaker — never machine-translated. **[TODO: Linda/team to approve any Afrikaans lines]**

## 2. Site-wide microcopy

| Element | Copy |
|---|---|
| Announcement bar | `THIRD-PARTY TESTED · FREE DELIVERY ON ORDERS OVER R500, SOUTH AFRICA WIDE` |
| Cart button | `CART · {n}` |
| Empty cart | "Your cart is empty." + `ONE A DAY. START TODAY.` |
| Checkout button | `CHECKOUT ON SHOPIFY →` |
| Under checkout | `Secure checkout · Paystack · Free delivery over R500` |
| Add to cart | `ADD TO CART — R600` (always show the price on the button) |
| Toast | `ADDED TO CART` |
| Newsletter | "Launch news, refill subscriptions and the occasional limited-edition tube. No noise." |
| Footer legal | "Not intended to diagnose, treat, cure or prevent any disease." |
| 404 | "Off the record. This page doesn't exist — or it's hydrating somewhere quiet." |

## 3. Page-by-page copy (canonical)

### Homepage
1. **Hero** — eyebrow `CLEAN HYDRATION · EST. PRETORIA, ZA`; H1 "FEEL YOUR *personal* BEST."; lede: "Electrolytes, minerals and nothing you don't need — in a tube you'll keep long after the last sachet. Five flavours. Zero fillers. Third-party tested." CTAs: `SHOP THE 30 — R600` / `TRY THE 5 — R100`.
2. **Ticker** — the eight use-cases from the pack: ENDURANCE / HEAT SUPPORT / LONG FLIGHTS / LATE NIGHTS / ANTI-CRAMPING / SPORTS RECOVERY / MUSCLE FUNCTION / FASTING SUPPORT.
3. **Positioning** — "HYDRATION FOR PEOPLE WHO DON'T *do* HYDRATION." + the occasions paragraph (18 holes, third set, red-eye, "the morning after a very good evening").
4. **Flavours** — "ONE TUBE. *five* FLAVOURS." with two-word descriptors (Sharp·Bright / Sweet·Tropical / Classic·Clean / Smooth·Proudly local / Salted·Summer).
5. **Formula** — "CONSIDERED, *not* COMPLICATED." + numbered 01–05 ingredient stories.
6. **Products** — "START YOUR *record*."
7. **Ritual** — "ONE A DAY. *that's* IT." Tear / Stir / Go.
8. **Nutrition** — "PRINTED ON THE TUBE. *proud* OF IT."
9. **Subscription** — "BUY THE TUBE *once*." Order 01 the tube → Order 02+ refills → Members save.
10. **Story band** — "REKRD, as in *record*. As in *personal* record."

### Product pages — Shopify-admin-ready descriptions

**REKRD Hydration — 30 Sachets (R600)**
> Thirty clean hydration sachets in a tube that looks like it walked out of a 1970s pro shop — because it more or less did. Six each of all five flavours: Sour Cherry Apple, Pineapple Berry, Orange Zest, Rooibos Peach Iced-Tea and Salty Watermelon.
>
> Per sachet: 600 mg sodium, 150 mg potassium, 100 mg magnesium, 500 mg L-glutamine, vitamin C and zinc. Enriched with coconut water powder and ancient Himalayan salt with trace minerals. Zero sugar, zero fillers, zero artificial anything. Third-party tested.
>
> One a day in 500–600 ml of cold water. When the last sachet's gone, keep the tube — refill packs are coming.
>
> *R20 per sachet · Free delivery · Made in South Africa*

**REKRD Starter — 5 Sachets (R100)**
> Five sachets, five flavours, zero commitment. The easiest way to meet REKRD — and to find out whether you're a Salty Watermelon person or a Rooibos Peach person. (You can be both. We won't tell.)

**REKRD Refill — 30 Sachets [TODO: price]**
> Keep the tube. Refill the ritual. Thirty sachets in a lean refill pack — better for the planet, better on price, delivered on your schedule.

### SEO titles & meta descriptions (implemented)

| Page | Title | Meta description |
|---|---|---|
| Home | REKRD® — Feel Your Personal Best \| Clean Hydration, South Africa | REKRD is clean, third-party-tested hydration in a tube worth keeping… |
| Shop | Shop — REKRD® Clean Hydration \| 30-Sachet Tube & Starter Pack | Shop REKRD hydration. The collectible 30-sachet tube (R600)… |
| 30-pack | REKRD Hydration — 30 Sachets, 5 Flavours \| R600 \| The Collectible Tube | Thirty clean hydration sachets in the collectible REKRD tube… |
| 5-pack | REKRD Starter — 5 Sachets, One of Each Flavour \| R100 | Five REKRD hydration sachets — one of each flavour… |
| About | About — REKRD® \| For the Record | REKRD is a South African hydration brand built on one idea… |

Keyword targets: *electrolytes south africa, hydration powder south africa, electrolyte
sachets, clean electrolytes, hydration for golf, padel hydration, revive electrolytes
alternative*. **[TODO: blog/education layer for SEO — "does golf dehydrate you", "padel
hydration guide", "electrolytes without sugar" etc.]**

## 4. UX flows

### Flow A — first purchase (implemented)
Land → hero CTA → PDP (price + per-sachet math visible before the fold; trust stamps
adjacent to Add-to-cart) → cart drawer (subtotal + free-delivery reassurance) →
**Checkout on Shopify** (cart permalink) → Shopify checkout w/ Paystack → order
confirmation. Keep the drawer promise line ("Secure checkout · Paystack") — 44% of SA
shoppers worry about online payment security; naming the processor helps.

### Flow B — refill subscription (to build post-launch)
PDP subscription module: `One-time R600` / `Refill subscription [TODO price] — every 4/5/6 weeks`,
pre-select nothing (SA consumers distrust lock-in — offer it soft), copy: "Pause, skip or
cancel anytime. No interrogation." First subscription order ships the tube; later orders
ship refill packs. Sweetener: follow LMNT — a *free starter 5-pack* with first
subscription rather than a % discount, to protect price integrity. **[TODO: decide
subscriber price / gift]**

### Flow C — coach & club referral (future, from Frans's model)
Unique link per coach/club → landing page variant ("Your pro recommends…") → discount
for the client **[TODO %]**, kickback for the coach **[TODO %]** → track via Shopify
discount codes or an affiliate app (e.g. UpPromote). Keep the kickback out of public copy.

### Flow D — gifting (future)
"Send it to someone who needs it" PDP toggle → gift note field (handwritten-style card —
the Yuppiechef move) → corporate golf-day bundle page for B2B enquiries (already seeded
on the Contact page under "TRADE").

## 5. Shopify setup notes (for Rools)

1. **Products**: create the 3 SKUs exactly as named above; single variant each for launch. Copy variant IDs into `site/js/shopify-config.js`.
2. **Collections**: `All` (for the catalogue requirement), `Hydration`. Keep it minimal.
3. **Checkout**: Shopify checkout with **Paystack** (already registering). Note total payment cost ≈ Paystack 2.9% + R1.50 **plus Shopify's third-party-gateway fee 0.6–2%** depending on plan — price this into margin planning.
4. **Subscriptions**: Paystack doesn't do native recurring inside Shopify checkout. Options when refills launch: a subscription app compatible with SA gateways (e.g. **Appstle**, **Seal**, or **SubscriptionFlow** as middleware) or Paystack's Subscriptions API off-platform. Decide before promising intervals. **[TODO: technical spike]**
5. **Shipping**: Bob Go app for live rates; set free-shipping threshold at **R500**. Same-day dispatch cutoff 12:00 (mirrors the policy page).
6. **Emails**: rewrite Shopify notification templates in the brand voice (order confirm subject: "For the record: order #{n} is in."; shipping: "Your REKRD is moving."). **[TODO]**
7. **Domains**: primary `shop.rekrd.io` (CNAME to Shopify), with `rekrd.io` either hosting this static site (marketing front) or redirecting. See PROJECT-WEBSITE.md §Hosting.
8. **Compliance content Paystack/Takealot want to see**: product catalogue with prices ✔ (shop.html), contact details ✔, privacy policy ✔, terms ✔, returns policy ✔ — all live on the static site; mirror them into Shopify's Policies settings when the store goes live.

## 6. Copy backlog (not yet written)

- Education/blog layer (SEO + the "educate the un-hydrated" strategy)
- Launch email sequence (waitlist → drop day → replenishment reminders)
- Golf-day / trade one-pager copy (Neels's trade presenter can reuse the PDP copy)
- Limited-edition drop announcements (template: name, number, story, "when they're gone they're gone" — no fake urgency otherwise)
- Instagram bio + first-9-posts grid concept (@rekrd.io)
