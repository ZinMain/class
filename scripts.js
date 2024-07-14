function setCart(item, payload) {
  localStorage.setItem(item, payload);
}

function getCart(item) {
  let cartData = localStorage.getItem(item);
  return cartData;
}

function deleteCart(item) {
  localStorage.removeItem(item);
}

function addToCartHandler() {
  const storageCartName = 'cart';
  let addButton = document.querySelectorAll('.js-buy-button');

  addButton.forEach(elem => {
    elem.addEventListener('click', function () {
      let itemTitle = elem.dataset.title;
      let itemPrice = elem.dataset.price;
      let itemPayload = {
        'title': itemTitle,
        'price': itemPrice };

      let currentCart = JSON.parse(getCart(storageCartName));
      let changeCartEvent = new Event('itemInserted');

      if (currentCart === null) {
        currentCart = { 'items': [] };
      }
      currentCart.items.push(itemPayload);
      setCart(storageCartName, JSON.stringify(currentCart));
      document.dispatchEvent(changeCartEvent);
    });
  });
};

function listenToCartHandler() {
  let cartData = JSON.parse(getCart('cart'));
  let shoppingListContainer = document.querySelector('#js-item-list');
  shoppingListContainer.innerHTML = ``;

  if (cartData !== null) {
    alert("Added to cart!");
    alert("Scroll up to check!");
    cartData.items.forEach(elem => {
      let shoppingListTemplate = `
        <li class="cart__shoppingList__item">
          <h3>${elem.title}</h3>
          <p>Price: ${elem.price}</p>
        </li>
        `;
      console.log(`${shoppingListTemplate}`);
      shoppingListContainer.innerHTML += shoppingListTemplate;
    });
  }
}

function emptyCart() {
  let deleteButton = document.querySelector('#js-delete-cart');
  deleteButton.addEventListener('click', function () {
    deleteCart('cart');
    listenToCartHandler();
  });
}

// Init
listenToCartHandler();
document.addEventListener("itemInserted", listenToCartHandler, false);
addToCartHandler();
emptyCart();