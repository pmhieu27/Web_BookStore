$(document).ready(function() {
    // --- 1. JQUERY BANNER SLIDER (SINGLE ITEM) ---
    const slides = $('.slides img');
    const slideCount = slides.length;
    let currentIndex = 0;

    // Thiết lập ban đầu: Ẩn tất cả và chỉ hiện ảnh đầu tiên
    slides.hide().eq(0).show();

    function startSlider() {
        return setInterval(function() {
            // Hiệu ứng FadeOut ảnh cũ và FadeIn ảnh mới (Single Item)
            slides.eq(currentIndex).fadeOut(1000);
            
            currentIndex = (currentIndex + 1) % slideCount;
            
            slides.eq(currentIndex).fadeIn(1000);
        }, 4000); // 4 giây chuyển 1 lần
    }

    let sliderInterval = startSlider();

    // Dừng slider khi người dùng di chuột vào banner
    $('.banner-container').hover(
        function() { clearInterval(sliderInterval); },
        function() { sliderInterval = startSlider(); }
    );

    // --- 2. HIỆU ỨNG STICKY MENU CHO TRANG CHỦ ---
    const menuBar = $(".menu-bar");
    if (menuBar.length) {
        const menuOffset = menuBar.offset().top;
        $(window).scroll(function() {
            if ($(window).scrollTop() > menuOffset) {
                menuBar.addClass("sticky-nav");
            } else {
                menuBar.removeClass("sticky-nav");
            }
        });
    }
});