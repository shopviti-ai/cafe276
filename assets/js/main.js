let cart = []; // Mảng chứa đơn hàng của Tín [cite: 2026-02-03]

$(document).ready(function() {
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbxXsgNyv_rpAxflIrsr7x_bo7_bcUkTpYVcGj2lHY_njMk4PIMd6Qnq17nPZWn4hzwp/exec";

    // 1. Lấy thực đơn 18 món 
    fetch(appsScriptURL)
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                html += `
                <article class="p-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3 style="color: #6f4e37;">${item.name}</h3>
                    <p class="p-price">${item.price} VNĐ</p>
                    <a href="javascript:void(0)" class="button primary small btn-add" 
                       data-name="${item.name}" data-price="${item.price}">THÊM VÀO GIỎ</a>
                </article>`;
            });
            $('#product-container').html(html + html);
        });

    // 2. Thêm món vào giỏ 
    $(document).on('click', '.btn-add', function() {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price').toString().replace(/[^0-9]/g, ''));
        
        let item = cart.find(i => i.name === name);
        if (item) { item.quantity++; } 
        else { cart.push({ name, price, quantity: 1 }); }
        
        renderCart();
        // Hiệu ứng nảy nút giỏ hàng cho sinh động 
        $('#cart-floating-btn').css('transform', 'scale(1.2)').delay(100).queue(function(n){ $(this).css('transform', 'scale(1)'); n(); });
    });

    // 3. Hiển thị danh sách giỏ hàng 
    function renderCart() {
        let total = 0;
        let count = 0;
        let html = '';

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;
            html += `
                <div class="cart-item">
                    <div style="text-align:left;">
                        <strong>${item.name}</strong><br>
                        <small>${item.price.toLocaleString()} x ${item.quantity}</small>
                    </div>
                    <div>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                        <span class="remove-item" data-index="${index}">&times;</span>
                    </div>
                </div>`;
        });

        $('#cart-count').text(count);
        $('#cart-items-list').html(html || '<p>Giỏ hàng đang trống!</p>');
        $('#total-price').text(total.toLocaleString('vi-VN') + ' VNĐ');
    }

    // 4. Xóa món & Mở Modal 
    $(document).on('click', '.remove-item', function() {
        cart.splice($(this).data('index'), 1);
        renderCart();
    });

    $('#cart-floating-btn').on('click', function() {
        $('#order-modal').fadeIn(300).css('display', 'flex');
    });

    $('.close-modal').on('click', function() {
        $('#order-modal').fadeOut(300);
    });
});
