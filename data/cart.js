// any products will be included in this cart 
// when the user clicks add-to-cart button
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// JSON.parse(...) is used to convert them to array

if (!cart || cart.length === 0) {
  // If the cart is empty or not present in local storage, initialize it with default items
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    },
    {
      productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      quantity: 1,
      deliveryOptionId: '3'
    }
  ];
}

export function getCartProduct(productId) {

  let matchingProduct;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  
  return matchingProduct;
}

// Displays Cart Objects by using .innerHTML
document.addEventListener('DOMContentLoaded', function(){
  updateCartQuantity();
});

// Update Cart Quantity (To calculate them and put them on the tile)
export function updateCartQuantity() {
  // Find the HTML element that displays the cart quantity
  const cartQuantityElement = document.querySelector('.js-item-quantity-based-on-cart');
  
  // Check if the element exists
  if (cartQuantityElement) {
    // Use the reduce function to calculate the total quantity in the cart
    const totalQuantity = cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
    
    // Update the innerHTML of the cart quantity element with the total quantity
    cartQuantityElement.innerHTML = totalQuantity;
  }
}

// Save the carts to the Local Storage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // LS only can save String (if it's not a string, then convert)
  updateCartQuantity(); // Update the cart quantity dynamically
}

// ADD-TO-CART FUNCTION // (using the module's export) since we might use this function to export to amazon.js
export function addToCart(productId) { // the reason we use productId parameter because productId var is inside the forEach loop

  let matchingItem; // decalre the matching item variable

  cart.forEach((cartItem)=>{ // loop through cart array and give a parameter as cartItem
    if (cartItem.productId === productId) { // "productId" = "button.dataset.productId"
      matchingItem = cartItem; // if they match, they will be put inside the empty object,
    }
  });
  
  // Selected Value of product
  const selectedValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value); //select value from the options selected (if it gets selected as 10, that selectedValue could be 10)
  
  if (matchingItem) { // if the items are matched
    matchingItem.quantity += selectedValue; // (selectedvalue is from the quantity selection)
  } else { // else if it's not there yet, then we need to push it to the cart array list
    cart.push({
      productId: productId,
      quantity: selectedValue,
      deliveryOptionId: '1'
    })
  }

  saveToLocalStorage(); // calling save-to-local-storage function
  
  updateCartQuantity(); // Update the cart quantity dynamically
}

// Modified remove-from-cart function
export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToLocalStorage(); // calling save-to-local-storage function
  updateCartQuantity(); // Update the cart quantity dynamically
}

// Update Quantity (by using input from the input field)
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToLocalStorage();
}

// Update Delivery Option
export function updateDeliveryOption(productId, deliveryoptionId) {

  let matchingItem;

  cart.forEach((cartItem)=>{
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryoptionId; 

  saveToLocalStorage();
}