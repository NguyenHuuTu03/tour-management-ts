// Slider swiper images

// THUMB
const imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10, // khoảng cách giữa các thumb
  slidesPerView: 4, // slide preview
  freeMode: true,
});

// MAIN
const imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,

  navigation: {
    nextEl: ".imagesMain .swiper-button-next",
    prevEl: ".imagesMain .swiper-button-prev",
  },

  thumbs: {
    swiper: imagesThumb,
  },
});

// End Slider swiper images

// button quantity
const formAddToCard = document.querySelector("[form-add-to-card]");
if (formAddToCard) {
  const inputQuantity = document.querySelector("input[name='quantity']");
  const btnIncrease = document.querySelector("[btn-increase]");
  if (btnIncrease) {
    btnIncrease.addEventListener("click", () => {
      const value = parseInt(inputQuantity.value);
      if (value < parseInt(inputQuantity.max))
        inputQuantity.value = value + 1;
    });
  }
}

const btnReduce = document.querySelector("[btn-reduce]");
if (btnReduce) {
  btnReduce.addEventListener("click", () => {
    const value = parseInt(inputQuantity.value);
    if (value > parseInt(inputQuantity.min))
      inputQuantity.value = value - 1;
  });
}

// End button quantity

// Alert-Success
const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");

    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);

    const closeAlert = elementAlert.querySelector("[close-alert]");
    if (closeAlert) {
      closeAlert.addEventListener("click", () => {
        elementAlert.classList.add("alert-hidden");
      });
    }
  }
}
// End Alert-Success

// Nếu chưa có giỏ hàng trong localStorage thì tạo giỏ mới cho người dùng 
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}


// Show mini-cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const totalQuantity = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    miniCart.innerHTML = totalQuantity;
  }
}

showMiniCart();
// End Show mini-cart

// Thêm vào giỏ hàng
if (formAddToCard) {
  formAddToCard.addEventListener("submit", (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = formAddToCard.getAttribute("tour-id");

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const indexExitsTour = cart.findIndex(item => item.tourId === tourId);
      if (indexExitsTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      } else {
        cart[indexExitsTour].quantity = cart[indexExitsTour].quantity + quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSuccess();
      showMiniCart();
    }
  });
}
// Hết Thêm vào giỏ hàng