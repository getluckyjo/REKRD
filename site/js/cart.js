/* ==========================================================================
   REKRD — cart.js
   Lightweight client-side cart (localStorage) that hands off to Shopify
   checkout via cart permalink. Zero dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.REKRD_SHOPIFY || { products: {}, storeDomain: "" };
  var KEY = "rekrd_cart_v1";

  /* ---------- state ---------- */
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function write(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
    render();
  }
  function count(cart) {
    return Object.values(cart).reduce(function (a, b) { return a + b; }, 0);
  }
  function money(n) {
    return "R" + n.toLocaleString("en-ZA");
  }

  /* ---------- actions ---------- */
  window.REKRD_CART = {
    add: function (id, qty) {
      var p = CFG.products[id];
      if (!p || p.comingSoon || p.price == null) { toast("Coming soon"); return; }
      var cart = read();
      cart[id] = (cart[id] || 0) + (qty || 1);
      write(cart);
      toast("Added to cart");
      open();
    },
    setQty: function (id, qty) {
      var cart = read();
      if (qty <= 0) { delete cart[id]; } else { cart[id] = qty; }
      write(cart);
    },
    remove: function (id) {
      var cart = read();
      delete cart[id];
      write(cart);
    },
    open: open,
    close: close,
    checkout: checkout
  };

  function open() {
    document.body.classList.add("cart-open");
    var drawer = document.querySelector(".cart-drawer");
    if (drawer) {
      var closeBtn = drawer.querySelector("[data-cart-close]");
      if (closeBtn) closeBtn.focus();
    }
  }
  function close() {
    document.body.classList.remove("cart-open");
  }

  /* ---------- checkout: Shopify cart permalink ---------- */
  function checkout() {
    var cart = read();
    var ids = Object.keys(cart);
    if (!ids.length) return;

    var missing = ids.filter(function (id) {
      var p = CFG.products[id];
      return !p || !p.variantId;
    });

    if (missing.length || !CFG.storeDomain) {
      // Shopify not wired up yet — explain instead of failing silently.
      toast("Checkout not connected yet");
      alert(
        "Shopify checkout isn't connected yet.\n\n" +
        "To enable it, paste the store domain and product variant IDs into " +
        "site/js/shopify-config.js (see docs/PROJECT-WEBSITE.md for the runbook)."
      );
      return;
    }

    var permalink = "https://" + CFG.storeDomain + "/cart/" +
      ids.map(function (id) {
        return CFG.products[id].variantId + ":" + cart[id];
      }).join(",");
    window.location.href = permalink;
  }

  /* ---------- render ---------- */
  function render() {
    var cart = read();
    var n = count(cart);

    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n;
    });

    var itemsEl = document.querySelector("[data-cart-items]");
    var totalEl = document.querySelector("[data-cart-total]");
    var checkoutBtn = document.querySelector("[data-cart-checkout]");
    if (!itemsEl) return;

    if (!n) {
      itemsEl.innerHTML =
        '<div class="cart-empty"><p>Your cart is empty.</p>' +
        '<p class="spec" style="margin-top:10px">ONE A DAY. START TODAY.</p></div>';
      if (totalEl) totalEl.textContent = money(0);
      if (checkoutBtn) checkoutBtn.setAttribute("disabled", "");
      return;
    }
    if (checkoutBtn) checkoutBtn.removeAttribute("disabled");

    var total = 0;
    itemsEl.innerHTML = Object.keys(cart).map(function (id) {
      var p = CFG.products[id];
      if (!p) return "";
      var line = p.price * cart[id];
      total += line;
      return (
        '<div class="cart-line">' +
          '<img src="' + p.image + '" alt="" width="64" height="64">' +
          '<div>' +
            '<div class="cart-line__name">' + p.title + "</div>" +
            '<div class="cart-line__qty">' +
              '<button type="button" aria-label="Decrease quantity" onclick="REKRD_CART.setQty(\'' + id + "'," + (cart[id] - 1) + ')">−</button>' +
              "<span>" + cart[id] + "</span>" +
              '<button type="button" aria-label="Increase quantity" onclick="REKRD_CART.setQty(\'' + id + "'," + (cart[id] + 1) + ')">+</button>' +
            "</div>" +
          "</div>" +
          '<div style="text-align:right">' +
            '<div class="cart-line__price">' + money(line) + "</div>" +
            '<button type="button" class="cart-line__rm" onclick="REKRD_CART.remove(\'' + id + "')\">Remove</button>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    if (totalEl) totalEl.textContent = money(total);
  }

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------- wire up ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add-to-cart]");
    if (t) {
      e.preventDefault();
      var qtyEl = document.querySelector("[data-qty]");
      REKRD_CART.add(t.getAttribute("data-add-to-cart"), qtyEl ? parseInt(qtyEl.textContent, 10) : 1);
    }
    if (e.target.closest("[data-cart-open]")) { e.preventDefault(); open(); }
    if (e.target.closest("[data-cart-close]")) { e.preventDefault(); close(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  document.addEventListener("DOMContentLoaded", render);
})();
