$(document).ready(function() {
    // --- 1. TẠO CẤU TRÚC PHÓNG TO (ZOOM) ---
    // Tự động thêm HTML của Overlay vào cuối trang nếu chưa có
    if ($('#product-zoom-overlay').length === 0) {
        const overlayHTML = `
            <div id="product-zoom-overlay" class="zoom-overlay">
                <span class="zoom-close">&times;</span>
                <div class="zoom-content">
                    <img id="zoom-img" src="" alt="Sách phóng to">
                    <h3 id="zoom-caption"></h3>
                </div>
            </div>
        `;
        $('body').append(overlayHTML);
    }

    // Sự kiện khi Click vào ảnh sản phẩm
    $('.product-item img').on('click', function() {
        const imgSrc = $(this).attr('src'); // Lấy link ảnh
        const title = $(this).closest('.product-item').find('h4').text(); // Lấy tên sách

        $('#zoom-img').attr('src', imgSrc);
        $('#zoom-caption').text(title);

        // Hiện lớp nền và phóng ảnh lên
        $('#product-zoom-overlay').fadeIn(300).css('display', 'flex');
        setTimeout(() => {
            $('#zoom-img').css('transform', 'scale(1)');
        }, 50);
    });

    // Đóng khi click vào nút X hoặc vùng đen
    $('.zoom-close, #product-zoom-overlay').on('click', function() {
        $('#zoom-img').css('transform', 'scale(0.8)');
        $('#product-zoom-overlay').fadeOut(300);
    });

    // Ngăn đóng khi click trúng vào ảnh to
    $('#zoom-img').on('click', function(e) {
        e.stopPropagation();
    });


    // --- 2. HIỆU ỨNG MENU DÍNH (STICKY MENU) ---
    const menuBar = $(".menu-bar");
    const menuOffset = menuBar.offset().top;

    $(window).scroll(function() {
        if ($(window).scrollTop() > menuOffset) {
            menuBar.addClass("sticky");
        } else {
            menuBar.removeClass("sticky");
        }
    });

    // --- 3. HIỆU ỨNG LỌC SẢN PHẨM MƯỢT MÀ ---
    $('.sidebar-box input[type="checkbox"]').on('change', function() {
        // Làm mờ rồi hiện lại để tạo cảm giác trang đang xử lý lọc
        $('.product-grid').animate({opacity: 0.3}, 200).animate({opacity: 1}, 400);
    });
});