let currentPrice = 0; // Biến lưu giá món đang chọn để tính toán [cite: 2026-02-03]

$(document).ready(function() {
    // 1. Đường dẫn Web App của Đồng Vĩnh Tín [cite: 2026-02-03]
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec";

    // 2. Tải thực đơn 18 món và tạo hiệu ứng chạy ngang (Marquee)
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
                    <a href="javascript:void(0)" class="button primary small btn-buy" 
                       data-name="${item.name}" 
                       data-price="${item.price}">MUA NGAY</a>
                </article>`;
            });

            // Nhân đôi dữ liệu để dải chạy ngang không bị hở khi lặp lại [cite: 2026-02-03]
            $('#product-container').html(htmlContent + htmlContent);
        })
        .catch(err => {
            console.error("Lỗi nạp thực đơn:", err);
            $('#product-container').html('<p>Đang kiểm tra kết nối Google Sheets...</p>');
        });

    // 3. Xử lý khi khách bấm "MUA NGAY" [cite: 2026-02-03]
    $(document).on('click', '.btn-buy', function(e) {
        e.preventDefault();
        const name = $(this).data('name');
        const priceStr = $(this).data('price').toString();
        
        // Chuyển "15.000" thành số 15000 để tính toán [cite: 2026-02-03]
        currentPrice = parseInt(priceStr.replace(/[^0-9]/g, ''));
        
        // Đổ thông tin món vào Modal
        $('#selected-item-box').html(`
            <p style="margin-bottom:5px;"><strong>Món:</strong> ${name}</p>
            <p><strong>Đơn giá:</strong> ${currentPrice.toLocaleString()} VNĐ</p>
        `);
        
        // Reset số lượng về 1 và tính tiền [cite: 2026-02-03]
        $('#buy-quantity').val(1);
        updateTotal();

        // Hiện Modal tại 276 Hùng Vương
        $('#order-modal').css('display', 'flex').hide().fadeIn(300);
    });

    // 4. Lắng nghe thay đổi số lượng để tính lại "Thành tiền" [cite: 2026-02-03]
    $(document).on('input change', '#buy-quantity', function() {
        updateTotal();
    });

    function updateTotal() {
        let qty = parseInt($('#buy-quantity').val());
        if (isNaN(qty) || qty < 1) qty = 1; // Đảm bảo số lượng tối thiểu là 1
        
        const total = qty * currentPrice;
        $('#total-price').text(total.toLocaleString() + ' VNĐ');
    }

    // 5. Lệnh đóng Modal [cite: 2026-02-02]
    $(document).on('click', '.close-modal', function() {
        $('#order-modal').fadeOut(300);
    });

    $(window).on('click', function(event) {
        if ($(event.target).is('#order-modal')) {
            $('#order-modal').fadeOut(300);
        }
    });
});
