// hàm chuyển đổi thời gian
const momentDateTime = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
}
// Hết hàm chuyển đổi thời gian

// Lấy data và in ra giao diện
const drawList = () => {
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
            <a href="tours/detail/${item.info.slug}" class="tour-name">${item.info.title}</a>
          </td>
          <td>${momentDateTime(item.info.timeStart)}</td>
          <td>${item.priceNew.toLocaleString()}đ</td>
          <td>
            <input class="quantity-input" type="number" value="${item.quantity}" item-id="${item.tourId}" min="1">
          </td>
          <td class="total-price">${item.total.toLocaleString()}đ</td>
          <td>
            <button class="delete-btn" type="button" btn-delete="${item.tourId}">Xóa</button>
          </td>
        </tr>
      `
      });
      const listTour = document.querySelector("[list-tour]");
      if (listTour) {
        listTour.innerHTML = htmls.join("");

        deleteTour()

        updateQuantity()
      }

      // tính tổng đơn hàng
      const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      if (elementTotalPrice) {
        elementTotalPrice.innerHTML = totalPrice.toLocaleString();
      }
      // Hết tính tổng đơn hàng

    })
}

// Hết Lấy data và in ra giao diện

// Xoá tour khỏi card
const deleteTour = () => {
  const btnDelete = document.querySelectorAll("[btn-delete]");
  if (btnDelete.length > 0) {
    btnDelete.forEach(button => {
      button.addEventListener("click", (e) => {
        const tourId = button.getAttribute("btn-delete");
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.filter(item => item.tourId != tourId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        drawList()
        // Show mini-cart

        showMiniCart();
        // End Show mini-cart
      });
    });
  }
}
// Hết Xoá tour khỏi card

// Cập nhật số lượng tour trong card
const updateQuantity = () => {
  const inputQuantity = document.querySelectorAll(".quantity-input");
  if (inputQuantity.length > 0) {
    inputQuantity.forEach(input => {
      input.addEventListener("change", () => {
        const quantity = input.value;
        const tourId = input.getAttribute("item-id");
        const cart = JSON.parse(localStorage.getItem("cart"));
        const tourUpdate = cart.find(item => item.tourId == tourId);
        tourUpdate.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));

        drawList()
        // Show mini-cart

        showMiniCart();
        // End Show mini-cart
      });
    });
  }
}
// Hết Cập nhật số lượng tour trong card

drawList()

// lấy dữ liệu order
const formOrder = document.querySelector("[form-order]");
if (formOrder) {
  formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const phone = e.target.elements.phone.value;
    const note = e.target.elements.note.value;

    const cart = JSON.parse(localStorage.getItem("cart"));

    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    }

    fetch("http://localhost:3002/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          localStorage.removeItem("cart");
          window.location.href = `/order/success?orderCode=${data.orderCode}`
        } else {
          alert("Đặt hàng không thành công!")
        }
      })
  });
}

// Hết lấy dữ liệu order