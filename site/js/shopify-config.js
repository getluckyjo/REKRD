/* ==========================================================================
   REKRD — Shopify configuration
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to connect the site to Shopify.

   HOW TO LINK (full runbook in docs/PROJECT-WEBSITE.md):
   1. In Shopify admin, create the products below (Products → Add product).
   2. For each product, open it and copy the VARIANT ID from the URL
      (Products → [product] → the number after /variants/), or via
      the "..." menu → "Copy variant ID".
   3. Paste the variant IDs into `variantId` below.
   4. Set `storeDomain` to your checkout domain. Until shop.rekrd.io has
      its DNS pointed at Shopify, use the myshopify.com domain
      (Settings → Domains), e.g. "rekrd.myshopify.com".
   5. Done. The cart's checkout button builds a Shopify cart permalink:
      https://{storeDomain}/cart/{variantId}:{qty},{variantId}:{qty}
      Shopify takes over from there (checkout, Paystack payment, BobGo rates).
   ========================================================================== */

window.REKRD_SHOPIFY = {
  // TODO(rools): replace with real domain once DNS is pointed. e.g. "shop.rekrd.io"
  storeDomain: "shop.rekrd.io",

  // While variant IDs are missing, Checkout opens a clearly-labelled
  // SIMULATION (js/demo-checkout.js) for client demos. As soon as real
  // variant IDs are pasted below, the real Shopify checkout takes over
  // and the demo never shows. Set false to disable the simulation.
  demoMode: true,

  currency: "ZAR",

  products: {
    "tube-30": {
      title: "REKRD Hydration — 30 Sachets",
      subtitle: "All 5 flavours · 6 of each",
      price: 600,                    // ZAR — confirmed 2026-07-14
      unit: "R20 / sachet",
      variantId: null,               // TODO(rools): paste Shopify variant ID
      image: "assets/img/tube-cutout.jpg",
      url: "index.html#shop"
    },
    "starter-5": {
      title: "REKRD Starter — 5 Sachets",
      subtitle: "One of each flavour",
      price: 100,                    // ZAR — confirmed 2026-07-14
      unit: "R20 / sachet",
      variantId: null,               // TODO(rools): paste Shopify variant ID
      image: "assets/img/pack-5.jpg",
      url: "index.html#shop"
    },
    "refill-30": {
      title: "REKRD Refill — 30 Sachets",
      subtitle: "Refill pouch for your tube",
      price: null,                   // TODO(team): pricing not finalised
      unit: null,
      variantId: null,               // TODO(rools): create product + paste variant ID
      image: "assets/img/tube-back.jpg",
      url: null,                     // page to be added when refill launches
      comingSoon: true
    }
  }
};

/* --------------------------------------------------------------------------
   OPTIONAL UPGRADE — Shopify Buy Button SDK (live prices + real inventory).
   The permalink approach above needs no keys and works today. When you want
   live stock/price sync, create a Buy Button sales channel in Shopify admin,
   then replace cart.js's checkout() with the SDK cart. Starter snippet:

   <script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"></script>
   <script>
     const client = ShopifyBuy.buildClient({
       domain: 'rekrd.myshopify.com',
       storefrontAccessToken: 'YOUR_STOREFRONT_TOKEN'  // Buy Button channel provides this
     });
     // see https://shopify.github.io/buy-button-js/ for cart + checkout wiring
   </script>
   -------------------------------------------------------------------------- */
