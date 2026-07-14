/* ==========================================================================
   REKRD — main.js — nav, reveal-on-scroll, product qty stepper
   ========================================================================== */
(function () {
  "use strict";

  /* Signal JS availability — .reveal only hides when this class is present */
  document.documentElement.classList.add("js");

  /* Mobile nav */
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var openState = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", openState ? "true" : "false");
    });
  }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* PDP quantity stepper */
  var qty = document.querySelector("[data-qty]");
  if (qty) {
    document.querySelectorAll("[data-qty-step]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var v = parseInt(qty.textContent, 10) + parseInt(btn.getAttribute("data-qty-step"), 10);
        qty.textContent = Math.max(1, Math.min(20, v));
      });
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
