/**
 * pages/checkout.js — Checkout page logic
 */
$(function () {
  "use strict";

  function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
  }

  // Render order summary from cart
  function renderOrderSummary() {
    if (typeof window.VaneCart === "undefined") return;

    var items = window.VaneCart.getAll();
    var $container = $("#checkout-items");

    if (!items || !items.length) {
      $container.html('<p class="text-muted text-sm">Giỏ hàng trống</p>');
      return;
    }

    $.getJSON("src/data/products.json").done(function (products) {
      var html = "";
      var total = 0;

      $.each(items, function (i, cartItem) {
        var product = null;
        $.each(products, function (j, p) {
          if (p.id === cartItem.id) { product = p; return false; }
        });
        if (!product) return;

        var qty = cartItem.qty || 1;
        var subtotal = product.price * qty;
        total += subtotal;

        html += '<div class="flex gap-3 pb-3 border-b border-silver-light/50">' +
          '<img src="' + product.images[0] + '" alt="' + product.name_vi + '" class="w-14 h-14 object-cover bg-white shrink-0">' +
          '<div class="flex-1 min-w-0">' +
            '<p class="font-ui text-[11px] text-primary truncate">' + product.name_vi + '</p>' +
            '<p class="font-ui text-[10px] text-muted">SL: ' + qty + '</p>' +
          '</div>' +
          '<p class="font-ui text-[11px] text-primary shrink-0">' + formatPrice(subtotal) + '</p>' +
        '</div>';
      });

      $container.html(html);
      $("#checkout-subtotal").text(formatPrice(total));
      $("#checkout-total").text(formatPrice(total));
    });
  }

  renderOrderSummary();

  // Form submit
  $(document).on("submit", "#checkout-form", function (e) {
    e.preventDefault();
    var $btn = $(this).find("button[type='submit']");
    $btn.prop("disabled", true).text("Đang xử lý...");

    setTimeout(function () {
      if (typeof window.VaneToast !== "undefined") {
        window.VaneToast.show("Đặt hàng thành công! Cảm ơn bạn.", "success");
      }
      $btn.prop("disabled", false).text("Tiếp Tục →");
    }, 2000);
  });
});
