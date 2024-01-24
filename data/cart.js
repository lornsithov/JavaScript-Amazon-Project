// any products will be included in this cart 
// when the user clicks add-to-cart button
export const cart = [];
// step 2: export cart (using the module's export)

// add-to-cart FUNCTION
export function addToCart(productId) {
  // the reason we use productId parameter because productId var is inside the forEach loop
  let matchingItem;
  //select value from the options selected
  const selectedValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  cart.forEach((cartItem)=>{
    // item: object in the cart list
    if (cartItem.productId === productId) {
      // item.productId is the property inside the cart array
      // "productId" is the variable which equals "button.dataset.productId"
      // if item.productId === button.dataset.productId
      matchingItem = cartItem;
      // if they match, they will be put inside the empty object, 
      // the mathcing Item
    }
  });
  if (matchingItem) {
    // if the items are matched, "matchingItem.quantity = matchingItem.quantity + 1"
    // it means if it already in there, we need to add 1 on top of it
    matchingItem.quantity += selectedValue;
  } else {
    // else if it's not there yet, then we need to push it to the cart array list
    cart.push({
      productId: productId,
      quantity: selectedValue
    })
  }
}