/**
 * pages/home.js — Homepage-specific functionality
 * New Arrivals render, Marquee cloning, Testimonials slider
 */
$(function () {
  "use strict";

  // --- New Arrivals ---
  function renderNewArrivals() {
    var $grid = $("#new-arrivals-grid");
    if (!$grid.length) return;

    $.getJSON("src/data/products.json")
      .done(function (data) {
        var newProducts = $.grep(data, function (p) { return p.isNew; }).slice(0, 4);
        var html = "";
        $.each(newProducts, function (index, p) {
          var delay = index + 1;
          var name = p.name_vi;
          var primaryImage = (p.images && p.images[0]) || "";
          var secondaryImage = (p.images && p.images[1])
            ? '<img src="' + p.images[1] + '" alt="' + name + '" class="absolute inset-0 w-full h-full object-cover product-img-secondary">'
            : "";
          var isWished = (window.VaneWishlist && VaneWishlist.isInWishlist(p.id)) ? " active" : "";

          html +=
            '<div class="product-card group flex flex-col" data-reveal="scale" data-reveal-delay="' + delay + '">' +
              '<div class="relative aspect-3/4 bg-ivory mb-4 overflow-hidden">' +
                '<div class="absolute top-3 left-3 z-20 badge badge-new">Mới</div>' +
                '<button class="absolute top-3 right-3 z-20 text-muted hover:text-gold transition-colors wishlist-btn' + isWished + '" data-product-id="' + p.id + '">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' +
                '</button>' +
                '<a href="product-detail.html?id=' + p.id + '" class="block w-full h-full">' +
                  '<img src="' + primaryImage + '" alt="' + name + '" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500">' +
                  secondaryImage +
                '</a>' +
                '<div class="product-overlay absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/50 to-transparent flex justify-center">' +
                  '<button class="bg-white text-primary hover:bg-gold hover:text-white transition-colors font-ui text-[11px] uppercase tracking-widest py-2 px-6 w-full add-to-cart-btn" data-product-id="' + p.id + '">Thêm Vào Giỏ</button>' +
                '</div>' +
              '</div>' +
              '<div class="flex flex-col items-center text-center">' +
                '<a href="product-detail.html?id=' + p.id + '" class="font-ui font-medium text-sm text-primary hover:text-gold transition-colors mb-1 truncate w-full">' + name + '</a>' +
                '<span class="font-ui text-sm text-gold">' + Number(p.price).toLocaleString("vi-VN") + '₫</span>' +
              '</div>' +
            '</div>';
        });

        $grid.html(html);
        $(document).trigger("contentLoaded");

        // Store products data globally for add-to-cart
        window._productsData = data;
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error("Cannot load products.json:", error);
      });
  }

  // Add to cart from product grid
  $(document).on("click", ".add-to-cart-btn", function (e) {
    e.preventDefault(); e.stopPropagation();
    var productId = parseInt($(this).data("product-id"));
    if (!window._productsData || !window.VaneCart) return;
    var product = null;
    $.each(window._productsData, function (i, p) { if (p.id === productId) { product = p; return false; } });
    if (!product) return;
    var defaultSize = (product.sizes && product.sizes[0]) || "";
    VaneCart.addToCart(product, defaultSize, 1);
    $(document).trigger("toast", ["Đã thêm vào giỏ hàng", "success"]);
  });

  // --- Testimonials Slider ---
  function initTestimonialsSlider() {
    var $slider = $(".testimonial-slider");
    if (!$slider.length) return;
    var $track = $slider.find(".testimonial-track");
    var $dots = $slider.find(".testimonial-dot");
    var currentSlide = 0;
    var totalSlides = $slider.find(".testimonial-slide").length;

    function goTo(index) {
      currentSlide = index;
      $track.css("transform", "translateX(-" + (currentSlide * 100) + "%)");
      $dots.removeClass("active").eq(currentSlide).addClass("active");
    }

    $dots.on("click", function () { goTo($(this).index()); });
    $slider.find(".testimonial-prev").on("click", function () { goTo((currentSlide - 1 + totalSlides) % totalSlides); });
    $slider.find(".testimonial-next").on("click", function () { goTo((currentSlide + 1) % totalSlides); });

    // Auto-rotate every 5s
    setInterval(function () { goTo((currentSlide + 1) % totalSlides); }, 5000);
  }

  // Init
  renderNewArrivals();
  initTestimonialsSlider();
});
