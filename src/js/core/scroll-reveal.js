/**
 * core/scroll-reveal.js — Scroll reveal animation engine
 * Observes [data-reveal] elements and adds .revealed when in viewport
 */
$(function () {
  "use strict";

  function checkReveal() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var triggerPoint = scrollTop + windowHeight - 40;

    $("[data-reveal]:not(.revealed)").each(function () {
      var $el = $(this);
      if ($el.offset().top < triggerPoint) {
        $el.addClass("revealed");
      }
    });
  }

  $(window).on("scroll", checkReveal);

  // Initial check + delayed check for dynamically loaded content
  checkReveal();
  setTimeout(checkReveal, 500);
  setTimeout(checkReveal, 1500);

  // Expose a refresh method for dynamic content
  $(document).on("contentLoaded", function () {
    checkReveal();
  });
});
