// hàm chuyển đổi thời gian
const momentDateTime = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
}
// Hết hàm chuyển đổi thời gian

// Lấy data và in ra giao diện
fetch("http://localhost:3002/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
  .then(res => res.json())
  .then(data => {
    const htmls = data.tours.map((item, index) => {
      return `
        <tr>
          <td>
            <input type="checkbox" checked="">
          </td>
          <td>
            <img class="cart-image" src="${item.image}" alt="${item.info.title}">
          </td>
          <td>
            <div class="tour-name">${item.info.title}</div>
          </td>
          <td>${momentDateTime(item.info.timeStart)}</td>
          <td>${item.priceNew.toLocaleString()}đ</td>
          <td>
            <input class="quantity-input" type="number" value="${item.quantity}" min="1">
          </td>
          <td class="total-price">${item.total.toLocaleString()}đ</td>
          <td>
            <button class="delete-btn" type="button" tour-id="${item.tourId}">Xóa</button>
          </td>
        </tr>
      `
    });
    const listTour = document.querySelector("[list-tour]");
    if (listTour) {
      listTour.innerHTML = htmls.join("");
    }

    // tính tổng đơn hàng
    const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
    const elementTotalPrice = document.querySelector("[total-price]");
    if (elementTotalPrice) {
      elementTotalPrice.innerHTML = totalPrice.toLocaleString();
    }
    // Hết tính tổng đơn hàng

  })
// Hết Lấy data và in ra giao diện