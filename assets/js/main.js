let cart = []; // Mảng chứa các món nước của quán Cà phê 276

$(document).ready(function() {
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec";

    // 1. Tải thực đơn từ Google Sheets
    fetch(appsScriptURL)
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                html += `
                <article class="p-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="p-price">${item.price} VNĐ</p>
                    <a href="javascript:void(0)" class="btn-add-to-cart" 
                       data-name="${item.name}" data-price="${item.price}">THÊM GIỎ HÀNG</a>
                </article>`;
            });
            $('#product-container').html(html + html);
        })
        .catch(err => console.error("Lỗi tải thực đơn:", err));

    // 2. Thêm món vào giỏ hàng
    $(document).on('click', '.btn-add-to-cart', function() {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price').toString().replace(/[^0-9]/g, ''));

        let item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartUI();
        alert("Đã thêm " + name + " vào giỏ!");
    });

    // 3. Cập nhật giao diện giỏ hàng trong Modal
    function updateCartUI() {
        let total = 0;
        let count = 0;
        let cartHtml = '';

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;
            cartHtml += `
                <div class="cart-item-row" style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 10px 0;">
                    <div style="text-align: left;">
                        <strong>${item.name}</strong><br>
                        <small>${item.price.toLocaleString()} x ${item.quantity}</small>
                    </div>
                    <div style="font-weight: bold; color: #d32f2f;">
                        ${(item.price * item.quantity).toLocaleString()} VNĐ
                    </div>
                </div>`;
        });

        $('#cart-count').text(count);
        $('#cart-items-list').html(cartHtml || '<p>Giỏ hàng đang trống!</p>');
        $('#total-price').text(total.toLocaleString() + ' VNĐ');
    }

    // 4. Gửi đơn qua Zalo
    $(document).on('click', '#btn-send-zalo', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Giỏ hàng đang trống, Tín ơi!");
            return;
        }

        let message = "--- ĐƠN HÀNG CÀ PHÊ 276 ---\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity}\n`;
        });
        message += "--------------------------\n";
        message += "TỔNG: " + $('#total-price').text() + "\n";
        message += "Địa chỉ: 276 Hùng Vương, Phú Thiện";

        window.open(`https://zalo.me/0383065259?text=${encodeURIComponent(message)}`, '_blank');
    });

    // 5. Mở/Đóng Modal
    $(document).on('click', '#cart-floating-btn', function() {
        $('#order-modal').fadeIn(300).css('display', 'flex');
    });

    $(document).on('click', '.close-modal', function() {
        $('#order-modal').fadeOut(300);
    });
});
