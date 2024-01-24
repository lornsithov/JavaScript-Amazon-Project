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

import { cart } from '../data/cart.js';
// const cart = [];
// without module, this would be a conflict
import { products } from '../data/products.js';

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
        $${(product.priceCents/100).toFixed(2)}
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

      <div class="added-to-cart">
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

// the DOM element for the buttons inside each product
// data attributes v dataset
document.querySelectorAll('.js-add-to-card').forEach((button)=>{
  // dataset property basically 
  // gives us all the data attributes 
  // that attached to the button
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    // since "productName" is inside "dataset", 
		// then we can use "button.dataset.productName" to set with all the buttons
    let matchingItem;
    //select value from the options selected
    const selectedValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    console.log(selectedValue)
    cart.forEach((item)=>{
      // item: object in the cart list
      if (item.productId === productId) {
        // item.productId is the property inside the cart array
        // "productId" is the variable which equals "button.dataset.productId"
        // if item.productId === button.dataset.productId
        matchingItem = item;
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
    
    // calculate the total quantity of the product on the cart
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });
    // replace number on HTML code with the calculated quantity
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  })
});
// forEach to loop through each of the add-to-cart buttons
// button parameter inside forEach is for those buttons that should added to the parameter when they are clicked
// now add the addEventListener using the Click function