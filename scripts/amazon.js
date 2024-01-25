// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87
//     },
//     priceInCents: 1090
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127
//     },
//     priceInCents: 2095
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56
//     },
//     priceInCents: 799
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197
//     },
//     priceInCents: 1899
//   },
//   {
//     image: "images/products/6-piece-white-dinner-plate-set.jpg",
//     name: "6 Piece White Dinner Plate Set",
//     rating: {
//       stars: 4,
//       count: 37
//     },
//     priceInCents: 2067
//   },
//   {
//     image: "images/products/6-piece-non-stick-baking-set.webp",
//     name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
//     rating: {
//       stars: 4.5,
//       count: 175
//     },
//     priceInCents: 3499
//   }
// ];

import { cart, addToCart } from '../data/cart.js';
// const cart = [];
// without module, this would be a conflict
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productHTML = ' '; 
// every time a product is created, it will be stored in this STRING
products.forEach((product) => {
  // store those objects inside the product parameter when this function is called
  // productHTML += ` `;
  productHTML = productHTML +
  `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart" data-product-id="${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-card" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
});
// the DOM element for the HTML replacement
document.querySelector('.js-product-grid').innerHTML = productHTML;

// SPLITING CODES INTO FUNCTIONS \|/

// calculate-total-quantity and update-quantity FUNCTION
function calculateAndUpdateTotalQuantity() {
  // calculate the total quantity of the product on the cart
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  // replace number on HTML code with the calculated quantity
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

// Added Message function
// const addedMessageFunc = document.addEventListener('DOMContentLoaded', function(){
//   const addedMessage = document.querySelectorAll('.js-added-to-cart');
//   addedMessage.forEach((message) => {
//     const messageId = message.dataset.productId;
//     console.log(messageId)
//     messageId.forEach()
//   })
// });
  
// we use DOMContentLoaded since the function is splitted into two parts plus ensuring that it will work with any broswers

// the DOM element for the buttons inside each product
// data attributes v dataset
// MAIN function of the ADD-TO-CART BUTTONS
document.querySelectorAll('.js-add-to-card').forEach((button) => {
  // let timeoutId; // Variable to store timeout ID (1st appear and disappear)
  // dataset property basically 
  // gives us all the data attributes 
  // that are attached to the button
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    // since "productId" is inside "dataset", 
    // then we can use "button.dataset.productId" to get all the id
    
    // added-message func starts
    const addedMessage = document.querySelector(`.js-added-to-cart[data-product-id="${productId}"]`);
    // 1st (appear & disappear)
    // Clear any previously scheduled timeout
    // clearTimeout(timeoutId);
    // if (addedMessage) {
    //   // Change CSS properties
    //   addedMessage.style.opacity = '1';

    //   // Apply a delay using setTimeout to make the element disappear after 2 seconds
    //   timeoutId = setTimeout(() => {
    //     addedMessage.style.opacity = '0';
        
    //     // Set a second timeout to hide the element
    //     setTimeout(() => {
    //       addedMessage.style.display = 'block';
    //     }, 500); // Adjust the disappearance time (in milliseconds) as needed
    //   }, 2000); // Show the style for 2 seconds (2000 milliseconds)
    // }
    // 2nd (appear & disappear)
    addedMessage.classList.add('added-to-cart-visible');
    setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);
    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
    // added-message func ends
    
    addToCart(productId);
    // calling add-to-cart func
    
    calculateAndUpdateTotalQuantity();
    // calling add-to-cart func
  });
});
// forEach to loop through each of the add-to-cart buttons
// button parameter inside forEach is for those buttons that should added to the parameter when they are clicked
// now add the addEventListener using the Click function

