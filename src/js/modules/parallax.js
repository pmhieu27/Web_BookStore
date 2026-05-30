/**
 * modules/parallax.js — Parallax scroll effect
 * Elements with [data-parallax] will translateY based on scroll
 */
$(function () {
  "use strict";
  if ("ontouchstart" in window) return; // Disable on mobile for performance

  var $elements = $("[data-parallax]");
  if (!$elements.length) return;

  var ticking = false;

  function updateParallax() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    $elements.each(function () {
      var $el = $(this);
      var speed = parseFloat($el.attr("data-parallax-speed")) || 0.3;
      var elTop = $el.offset().top;
      var elHeight = $el.outerHeight();

      // Only apply when element is in viewport
      if (scrollTop + windowHeight > elTop && scrollTop < elTop + elHeight) {
        var yPos = (scrollTop - elTop) * speed;
        $el.css("transform", "translateY(" + yPos + "px)");
      }
    });
    ticking = false;
  }

  $(window).on("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
});
