/**
 * pages/home.js — Homepage-specific functionality
 * Appointment form handler, scroll indicator
 */
$(function () {
  "use strict";

  // --- Appointment Form ---
  var $appointmentForm = $("#appointment-form");
  if ($appointmentForm.length) {
    $appointmentForm.on("submit", function (e) {
      e.preventDefault();

      var $btn = $(this).find("button[type='submit']");
      var originalText = $btn.text();
      $btn.text("Đang gửi...").prop("disabled", true);

      // Simulate form submission
      setTimeout(function () {
        $btn.text("Đã gửi thành công ✓").addClass("bg-green-600 border-green-600");
        $(document).trigger("toast", ["Đặt lịch hẹn thành công! Chúng tôi sẽ liên hệ bạn sớm.", "success"]);

        setTimeout(function () {
          $btn.text(originalText).prop("disabled", false).removeClass("bg-green-600 border-green-600");
          $appointmentForm[0].reset();
        }, 3000);
      }, 1500);
    });
  }

  // --- Scroll indicator click ---
  $(document).on("click", ".scroll-indicator", function (e) {
    e.preventDefault();
    var $nextSection = $(this).closest("section").next("section");
    if ($nextSection.length) {
      var topPosition = $nextSection.offset().top - 80;
      $("html, body").stop().animate({ scrollTop: topPosition }, 800, "swing");
    }
  });

  // --- Shadow Move Hover Effect for Featured Collection ---
  var $shadowBoxes = $(".shadow-move-hover");
  if ($shadowBoxes.length && !("ontouchstart" in window || window.innerWidth < 1024)) {
    $shadowBoxes.each(function () {
      var $box = $(this);
      if (!$box.find(".shadow-overlay").length) {
        $box.append('<div class="shadow-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300" style="background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 80%);"></div>');
      }
    });

    $(document).on("mousemove", ".shadow-move-hover", function (e) {
      var $box = $(this);
      var rect = this.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      // Calculate percentages for translation (parallax shift)
      var pctX = (x / rect.width - 0.5) * 2; // -1 to 1
      var pctY = (y / rect.height - 0.5) * 2; // -1 to 1

      // Move the image slightly (depth/parallax)
      var $img = $box.find("img");
      $img.css({
        "transform": "scale(1.08) translate(" + (pctX * -15) + "px, " + (pctY * -15) + "px)",
        "transition": "transform 0.1s ease-out"
      });

      // Shift the radial vignette shadow (di bóng)
      var $overlay = $box.find(".shadow-overlay");
      $overlay.css({
        "opacity": "1",
        "background": "radial-gradient(circle at " + x + "px " + y + "px, rgba(0,0,0,0) 25%, rgba(0,0,0,0.35) 75%)"
      });
    });

    $(document).on("mouseleave", ".shadow-move-hover", function () {
      var $box = $(this);
      var $img = $box.find("img");
      $img.css({
        "transform": "",
        "transition": "transform 0.7s ease"
      });

      var $overlay = $box.find(".shadow-overlay");
      $overlay.css({
        "opacity": "0",
        "background": ""
      });
    });
  }
});


//-- POPUP JS ----
const popup = document.getElementById('collectionPopup');
const closeBtn = document.getElementById('closePopup');

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
//--Đóng popup khi bấm ra ngoài
window.addEventListener('click', (e) => {
    if(e.target === popup){
        popup.style.display = 'none';
    }
});
//--Đóng popup bằng phím ESC
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        popup.style.display = 'none';
    }
});