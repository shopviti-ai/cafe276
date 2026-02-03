let cart = []; 

$(document).ready(function() {
    // 1. Đường dẫn Web App của Đồng Vĩnh Tín
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec";

    // 2. Tải thực đơn từ Google Sheets
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
                    <a href="javascript:void(0)" class="btn-add" 
                       data-name="${item.name}" data-price="${item.price}">THÊM VÀO GIỎ</a>
                </article>`;
            });
            $('#product-container').html(html + html);
        })
        .catch(err => console.error("Lỗi tải thực đơn:", err));

    // 3. Thêm món vào giỏ
    $(document).on('click', '.btn-add', function() {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price').toString().replace(/[^0-9]/g, ''));
        
        let item = cart.find(i => i.name === name);
        if (item) { 
            item.quantity++; 
        } else { 
            cart.push({ name, price, quantity: 1 }); 
        }
        
        renderCart();
        alert('Đã thêm ' + name + ' vào giỏ hàng!');
    });

    // 4. Hiển thị danh sách giỏ hàng
    function renderCart() {
        let total = 0;
        let count = 0;
        let html = '';

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                    <div style="text-align:left;">
                        <strong style="font-size: 0.9em;">${item.name}</strong><br>
                        <small>${item.price.toLocaleString()} x ${item.quantity}</small>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-weight: bold; color: #d32f2f;">${(item.price * item.quantity).toLocaleString()}đ</span>
                        <span class="remove-item" data-index="${index}" style="margin-left:10px; color:#aaa; cursor:pointer;">&times;</span>
                    </div>
                </div>`;
        });

        $('#cart-count').text(count);
        $('#cart-items-list').html(html || '<p>Giỏ hàng đang trống!</p>');
        $('#total-price').text(total.toLocaleString('vi-VN') + ' VNĐ');
    }

    // 5. Xóa món khỏi giỏ
    $(document).on('click', '.remove-item', function() {
        cart.splice($(this).data('index'), 1);
        renderCart();
    });

    // 6. Gửi đơn qua Facebook Messenger [cite: 2026-02-03]
    $(document).on('click', '#btn-send-messenger', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Giỏ hàng đang trống nha Tín!");
            return;
        }

        let message = "--- ĐƠN HÀNG MỚI CÀ PHÊ 276 ---\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity}\n`;
        });
        message += "--------------------------\n";
        message += "TỔNG CỘNG: " + $('#total-price').text() + "\n";
        message += "Địa chỉ: 276 Hùng Vương, Phú Thiện, Gia Lai";

        // Sao chép tin nhắn vào Clipboard [cite: 2026-02-03]
        navigator.clipboard.writeText(message).then(function() {
            alert("Đơn hàng đã được sao chép! Bạn hãy dán (Paste) vào Messenger để gửi cho quán nhé.");
            // Mở link Messenger Fanpage
            window.open("https://m.me/cafeep276", "_blank");
        }).catch(function(err) {
            window.open("https://m.me/cafeep276", "_blank");
        });
    });

    // 7. Điều khiển Modal và Menu Mobile
    $(document).on('click', '#cart-floating-btn', function() {
        $('#order-modal').fadeIn(300).css('display', 'flex');
    });

    $(document).on('click', '.close-modal', function() {
        $('#order-modal').fadeOut(300);
    });

    $(document).on('click', '#mobile-menu-btn', function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('btn-active');
    });

    $(document).on('click', '.nav-links a', function() {
        $('.nav-links').removeClass('active');
    });
});
