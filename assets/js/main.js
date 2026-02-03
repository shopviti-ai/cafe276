$(document).ready(function() {
    const appsScriptURL = "https://script.google.com/u/0/home/projects/11mWm_U6F_RdumSFneDvxmrPYozFCOJY9lRTDzXeBva-QtDzqmxYMkVVN/edit";

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

            // Đổ dữ liệu vào container và nhân đôi để tạo vòng lặp chạy ngang [cite: 2026-02-03]
            $('#product-container').html(htmlContent + htmlContent);
        })
        .catch(err => console.error("Lỗi tải thực đơn:", err));
});