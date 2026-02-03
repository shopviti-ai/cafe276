$(document).ready(function() {
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec"; [cite: 2026-02-03]

    // ... (Giữ nguyên phần fetch dữ liệu và render thực đơn) ...

    // FIX NÚT ZALO: Dùng $(document).on để đảm bảo nút luôn bấm được [cite: 2026-02-03]
    $(document).on('click', '#btn-send-zalo', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Giỏ hàng trống, Tín ơi!");
            return;
        }

        let message = "--- ĐƠN HÀNG CÀ PHÊ 276 ---\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity}\n`;
        });
        message += "--------------------------\n";
        message += "TỔNG: " + $('#total-price').text() + "\n";
        message += "Đ/C: 276 Hùng Vương, Phú Thiện";

        // Mở Zalo với nội dung soạn sẵn cho Đồng Vĩnh Tín
        window.open(`https://zalo.me/0383065259?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Mở modal khi bấm giỏ hàng
    $(document).on('click', '#cart-floating-btn', function() {
        $('#order-modal').css('display', 'flex').hide().fadeIn(300);
    });
});
