var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".fa-bars");
const icon = hamburger.querySelector("i");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  mobileMenu.classList.toggle("mobile-menu-active");

  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});
closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

let productList = [];
let cartProducts = [];

const updateTotals = () => {
  let totalPrice = 0;

  let quantityValue = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent,
    );
    const price = parseFloat(
      item.querySelector(".item-total").innerText.replace("$", ""),
    );
    totalPrice += price;
    quantityValue += quantity;
  });

  cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = quantityValue;
};

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");
    orderCard.innerHTML = `<div class="card-image">
                <img src="${product.image}">
              </div>
              <h4>${product.nam}</h4>
              <h4 class="price">${product.price}</h4>
              <a href="#" class="btn cart-btn">Add to Cart</a>`;

    cardList.appendChild(orderCard);
    updateTotals();

    const cartBtn = orderCard.querySelector(".cart-btn");
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProducts = cartProducts.find((item) => item.id === product.id);
  if (existingProducts) {
    alert("This product is already in your cart list");
    return;
  }
  cartProducts.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
                <div class="item-image">
                  <img src="${product.image}">
                </div>
                <div class ="item-detail">
                  <h4>${product.nam}</h4>
                  <h4 class="item-total">${product.price}</h4>
                </div>
                <div class="flex">
                  <a href="#" class="quantity-btn minus">
                    <i class="fa-solid fa-minus "></i>
                  </a>
                  <h4 class="quantity-value">${quantity}</h4>
                  <a href="#" class="quantity-btn plus">
                    <i class="fa-solid fa-plus"></i>
                  </a>
                </div>`;
  cartList.appendChild(cartItem);
  updateTotals();

  const itemTotal = cartItem.querySelector(".item-total");

  const plusBtn = cartItem.querySelector(".plus");
  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    let quantityValue = cartItem.querySelector(".quantity-value");
    quantityValue.innerText = quantity;
    itemTotal.innerText = `$${price * quantity}`;
    updateTotals();
  });

  const minusBtn = cartItem.querySelector(".minus");
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      let quantityValue = cartItem.querySelector(".quantity-value");
      quantityValue.innerText = quantity;
      itemTotal.innerText = `$${price * quantity}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProducts = cartProducts.filter((item) => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};
const initApp = () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};

initApp();
