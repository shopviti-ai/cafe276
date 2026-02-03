$(document).ready(function() {
    // Đường dẫn Web App của Đồng Vĩnh Tín [cite: 2026-02-03]
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec";

    // 1. Tải thực đơn từ Google Sheets và tạo hiệu ứng chạy ngang (Marquee)
    fetch(appsScriptURL)
        .then(res => res.json())
        .then(data => {
            let htmlContent = '';
            data.forEach(item => {
                htmlContent += `
                <article class="p-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3 style="color: #6f4e37;">${item.name}</h3>
                    <p class="p-price">${item.price} VNĐ</p>
                    <a href="javascript:void(0)" class="button primary small btn-buy" data-name="${item.name}">MUA NGAY</a>
                </article>`;
            });

            // Đổ dữ liệu và nhân đôi để tạo vòng lặp chạy ngang vô tận [cite: 2026-02-03]
            $('#product-container').html(htmlContent + htmlContent);
        })
        .catch(err => {
            console.error("Lỗi tải thực đơn:", err);
            $('#product-container').html('<p style="color:red;">Lỗi kết nối dữ liệu. Tín hãy kiểm tra quyền "Anyone" trên Apps Script!</p>');
        });

    // 2. Xử lý hiện Modal thông tin đơn hàng khi bấm MUA NGAY [cite: 2026-02-02]
    $(document).on('click', '.btn-buy', function(e) {
        e.preventDefault();
        const name = $(this).data('name');
        
        // Hiển thị tên món khách chọn
        $('#selected-product-info').html(`
            <h3 style="color: #6f4e37; margin-bottom: 10px;">Món đã chọn: ${name}</h3>
            <p>Vui lòng quét mã QR dưới đây hoặc đến trực tiếp quán để thưởng thức!</p>
        `);
        
        // Hiện Modal của Đồng Vĩnh Tín
        $('#order-modal').css('display', 'flex').hide().fadeIn(300);
    });

    // 3. Lệnh đóng Modal (Bấm dấu X hoặc bấm nút Quay lại) [cite: 2026-02-02]
    $(document).on('click', '.close-modal', function() {
        $('#order-modal').fadeOut(300);
    });

    // Đóng modal khi bấm ra ngoài vùng ảnh
    $(window).on('click', function(event) {
        if ($(event.target).is('#order-modal')) {
            $('#order-modal').fadeOut(300);
        }
    });

    // 4. Xử lý Menu Mobile (Xổ xuống/Thu gọn) [cite: 2026-02-02]
    $('#mobile-menu-btn').on('click', function() {
        $('#horizontal-nav').slideToggle(300);
        $(this).toggleClass('active');
    });
});
