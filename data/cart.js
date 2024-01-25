// any products will be included in this cart 
// when the user clicks add-to-cart button
export let cart = JSON.parse(localStorage.getItem('cart'));
// JSON.parse(...) is used to convert them to array

if (!cart) {
  // if the cart is empty, then use the default
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    }
  ];
}

// Save the carts to the Local Storage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  // LS only can save String (if it's not a string, then convert)
}

// (using the module's export) since we might use this function to export to amazon.js
// ADD-TO-CART FUNCTION
export function addToCart(productId) {
  // the reason we use productId parameter because productId var is inside the forEach loop
  let matchingItem;
  // decalre the matching item variable
  const selectedValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  //select value from the options selected (if it gets selected as 10, that selectedValue could be 10)
  cart.forEach((cartItem)=>{
    // loop through cart array and give a parameter as cartItem 
    if (cartItem.productId === productId) {
      // "productId" = "button.dataset.productId"
      matchingItem = cartItem;
      // if they match, they will be put inside the empty object, 
    }
  });
  if (matchingItem) {
    // if the items are matched    
    matchingItem.quantity += selectedValue;
    // (selectedvalue is from the quantity selection)
  } else {
    // else if it's not there yet, then we need to push it to the cart array list
    cart.push({
      productId: productId,
      quantity: selectedValue
    })
  }
  // calling save-to-local-storage function
  saveToLocalStorage();
}




// Remove ProductId from the cart array
// export function removeFromCart(productId) {
//   const newCart = [];
//   cart.forEach((cartItem)=>{
//     if (cart.productId !== productId) {
//       newCart.push(cartItem);
//     }
//   });
//   cart = newCart;
// }

// Modified remove-from-cart function
export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  // calling save-to-local-storage function
  saveToLocalStorage();
}
/*  
In the modified function, the use of the filter method simplifies the process. 
It creates a new array by filtering out the items with a productId matching the one you want to remove. 
This new array is then assigned to the cart variable.

The filter method is a concise and effective way to create a new array based on a condition without directly modifying the original array.
*/