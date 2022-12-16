const main = document.getElementById("prods-container");
const cart_container = document.getElementById("cart-container");
const search = document.getElementById("search");
const cart = [];

document.getElementById("start-button").onclick = function () {
  document.getElementById("transition").style.animationName =
    "welcome-transition";
  document.getElementById("transition").style.animationDuration = "2s";

  document.getElementById("start-button").style.animationName = "fade";
  document.getElementById("start-button").style.animationDuration = "2s";

  document.getElementById("welcome-h1").style.animationName = "fade";
  document.getElementById("welcome-h1").style.animationDuration = "2s";
  setTimeout(() => {
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("navegation-page").style.display = "flex";
    document.getElementById("title").style.animationName = "backwards-fade";
    document.getElementById("title").style.animationDuration = "2s";
    document.getElementById("search-bar").style.animationName =
      "backwards-fade";
    document.getElementById("search-bar").style.animationDuration = "2s";
    showProds(products);
  }, 2000);
};

document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  const value = document.getElementById("search-bar").value;
  if (value) {
    let search = products.map((prod) => {
      if (prod.title == value) {
        return prod;
      }
    });
    search = search.filter((item) => item); //Cleaning the array
    main.innerHTML = "";
    if (search.length == 0) {
      main.innerHTML = `We didn't found any ${value}`;
    } else {
      showProds(search);
    }
  } else {
    showProds(products);
  }
};

document.getElementById("cart-img").onclick = function () {
  document.getElementById("navegation-page").style.display = "none";
  document.getElementById("cart-page").style.display = "flex";
  document.getElementById("cart-page").style.animationName = "backwards-fade";
  document.getElementById("cart-page").style.animationDuration = "2s";
  main.innerHTML = "";
  cart_container.innerHTML = "";
  showCart();
};

document.getElementById("go-back").onclick = function () {
  document.getElementById("navegation-page").style.display = "flex";
  document.getElementById("cart-page").style.display = "none";
  showProds(products);
  document.getElementById("cart-counter").innerHTML = cart.length;
};

function showCart() {
  if (cart.length > 0) {
    cart.forEach((prod) => {
      const { title } = prod;
      const img = `db/img/${title}.jpg`;
      const prodEl = document.createElement("div");
      prodEl.classList.add("prod");
      prodEl.innerHTML = `<img
        src="${img}"
        id="prod-img"
        draggable="false" />
      <p class="prod-title">${title}</p>
      `;
      const remove_btn = document.createElement("button");
      cart_container.appendChild(prodEl);
      remove_btn.innerHTML = "-";
      prodEl.appendChild(remove_btn);
      remove_btn.style.backgroundColor = "red";
      remove_btn.style.color = "white";
      remove_btn.addEventListener("click", () => {
        const index = cart.indexOf(prod);
        cart.splice(index, 1);
        cart_container.innerHTML = "";
        showCart();
      });
      return;
    });
  } else {
    cart_container.innerHTML = "Your cart is empty";
  }
}
function showProds(data) {
  main.innerHTML = "";
  data.forEach((prod) => {
    const { title } = prod;
    const img = `db/img/${title}.jpg`;
    const prodEl = document.createElement("div");
    prodEl.classList.add("prod");
    prodEl.innerHTML = `<img
      src="${img}"
      id="prod-img"
      draggable="false"/>
    <p class="prod-title">${title}</p>
    `;
    const add_btn = document.createElement("button");
    main.appendChild(prodEl);
    add_btn.innerHTML = "+";
    prodEl.appendChild(add_btn);
    add_btn.addEventListener("click", () => {
      cart.push(prod);
      document.getElementById("cart-counter").innerHTML = cart.length;
    });
    return;
  });
}
