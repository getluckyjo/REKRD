/* ==========================================================================
   REKRD — demo-checkout.js
   A clearly-labelled SIMULATION of the Shopify checkout hand-off, for client
   demos while the real store is being connected. No data is collected; all
   fields are read-only dummies. The moment real variant IDs are configured in
   shopify-config.js, cart.js routes to the real Shopify checkout and this
   file does nothing.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.REKRD_SHOPIFY || { products: {} };

  function money(n) { return "R" + n.toLocaleString("en-ZA"); }

  function build(cart) {
    var items = Object.keys(cart).map(function (id) {
      var p = CFG.products[id];
      return { id: id, title: p.title, qty: cart[id], line: p.price * cart[id], image: p.image };
    });
    var total = items.reduce(function (a, b) { return a + b.line; }, 0);

    var overlay = document.createElement("div");
    overlay.className = "demo-checkout";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Demo checkout — simulation");
    overlay.innerHTML =
      '<div class="demo-checkout__page">' +
        '<div class="demo-checkout__bar">' +
          '<img src="' + (document.querySelector(".nav__logo img") ? document.querySelector(".nav__logo img").src : "") + '" alt="REKRD" style="height:18px">' +
          '<span class="stamp">Demo checkout · simulation only</span>' +
          '<button type="button" class="spec" data-demo-close>Close ✕</button>' +
        "</div>" +

        '<div class="demo-checkout__cols" data-demo-stage="form">' +
          "<div>" +
            '<h2 class="demo-checkout__h">Checkout</h2>' +
            '<p class="spec" style="color:var(--ink-soft);margin-bottom:24px">On the live site this page is Shopify’s secure checkout — payments by Paystack. Everything below is pre-filled demo data.</p>' +

            '<h3 class="demo-checkout__sub">Contact</h3>' +
            '<table class="spec-table"><tbody>' +
              "<tr><td>Email</td><td>demo@rekrd.io</td></tr>" +
              "<tr><td>Mobile</td><td>+27 82 000 0000</td></tr>" +
            "</tbody></table>" +

            '<h3 class="demo-checkout__sub">Delivery</h3>' +
            '<table class="spec-table"><tbody>' +
              "<tr><td>Address</td><td>18th Hole House, 1 Fairway Drive</td></tr>" +
              "<tr><td>Suburb</td><td>Waterkloof, Pretoria, 0181</td></tr>" +
              "<tr><td>Method</td><td>Bob Go courier · 1–3 working days</td></tr>" +
              "<tr><td>Cost</td><td>" + (total >= 500 ? "Free (order over R500)" : "R60") + "</td></tr>" +
            "</tbody></table>" +

            '<h3 class="demo-checkout__sub">Payment · Paystack</h3>' +
            '<table class="spec-table"><tbody>' +
              "<tr><td>Card</td><td>Visa •••• •••• •••• 4242</td></tr>" +
              "<tr><td>Name</td><td>D. Emo</td></tr>" +
              "<tr><td>Expiry / CVV</td><td>12 / 28 · •••</td></tr>" +
            "</tbody></table>" +

            '<button type="button" class="btn btn--wide" data-demo-pay style="margin-top:28px">Pay ' + money(total >= 500 ? total : total + 60) + " now — demo</button>" +
            '<p class="spec" style="color:var(--ink-soft);text-align:center;margin-top:12px">Nothing is charged. Nothing is stored. It’s a rehearsal.</p>' +
          "</div>" +

          '<aside class="demo-checkout__summary">' +
            '<h3 class="demo-checkout__sub" style="margin-top:0">Order summary</h3>' +
            items.map(function (it) {
              return (
                '<div class="cart-line" style="grid-template-columns:56px 1fr auto">' +
                  '<img src="' + it.image + '" alt="" width="56" height="56">' +
                  '<div class="cart-line__name">' + it.title + '<div class="spec" style="color:var(--ink-soft);margin-top:4px">Qty ' + it.qty + "</div></div>" +
                  '<div class="cart-line__price">' + money(it.line) + "</div>" +
                "</div>"
              );
            }).join("") +
            '<div class="cart-drawer__total" style="margin-top:18px"><span>Subtotal</span><span>' + money(total) + "</span></div>" +
            '<div class="cart-drawer__total"><span>Delivery</span><span>' + (total >= 500 ? "Free" : "R60") + "</span></div>" +
            '<div class="cart-drawer__total" style="font-size:17px;border-top:1px solid var(--ink);padding-top:12px"><span>Total</span><span>' + money(total >= 500 ? total : total + 60) + "</span></div>" +
          "</aside>" +
        "</div>" +

        '<div class="demo-checkout__cols demo-checkout__done" data-demo-stage="done" hidden>' +
          '<div class="center" style="grid-column:1/-1;padding-block:48px">' +
            '<span class="stamp" style="margin-bottom:24px;display:inline-block">Simulation complete</span>' +
            '<h2 class="demo-checkout__h">Order #REKRD-1001 <span class="accent">confirmed</span>.</h2>' +
            '<p class="lede maxw-c" style="margin-top:16px">' + items.map(function (it) { return it.qty + " × " + it.title; }).join(" · ") + " — " + money(total >= 500 ? total : total + 60) + " paid (pretend), free delivery booked (also pretend).</p>" +
            '<p style="color:var(--ink-soft);max-width:56ch;margin:20px auto 0">On the live site this confirmation comes from Shopify, the payment runs through Paystack, and Bob Go books the courier automatically. The only thing missing is the store’s variant IDs — a 20-minute setup, runbook in docs/PROJECT-WEBSITE.md.</p>' +
            '<button type="button" class="btn" data-demo-close style="margin-top:32px">Back to the site</button>' +
          "</div>" +
        "</div>" +
      "</div>";

    overlay.addEventListener("click", function (e) {
      if (e.target.closest("[data-demo-close]")) close(overlay);
      if (e.target.closest("[data-demo-pay]")) {
        overlay.querySelector('[data-demo-stage="form"]').hidden = true;
        overlay.querySelector('[data-demo-stage="done"]').hidden = false;
        overlay.querySelector(".demo-checkout__page").scrollTop = 0;
      }
    });
    return overlay;
  }

  function close(overlay) {
    overlay.remove();
    document.body.classList.remove("demo-checkout-open");
  }

  window.REKRD_DEMO = {
    open: function (cart) {
      var overlay = build(cart);
      document.body.appendChild(overlay);
      document.body.classList.add("demo-checkout-open");
      var closeBtn = overlay.querySelector("[data-demo-close]");
      if (closeBtn) closeBtn.focus();
      document.addEventListener("keydown", function esc(e) {
        if (e.key === "Escape") { close(overlay); document.removeEventListener("keydown", esc); }
      });
    }
  };
})();
