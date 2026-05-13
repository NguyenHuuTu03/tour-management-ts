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
  const inputQuantity = formAddToCard.querySelector("input[name='quantity']");
  const btnIncrease = formAddToCard.querySelector("[btn-increase]");
  console.log(inputQuantity.max);
  btnIncrease.addEventListener("click", () => {
    const value = parseInt(inputQuantity.value);
    if (value < parseInt(inputQuantity.max))
      inputQuantity.value = value + 1;
  });
  const btnReduce = formAddToCard.querySelector("[btn-reduce]");
  btnReduce.addEventListener("click", () => {
    const value = parseInt(inputQuantity.value);
    if (value > parseInt(inputQuantity.min))
      inputQuantity.value = value - 1;
  });
}
// End button quantity