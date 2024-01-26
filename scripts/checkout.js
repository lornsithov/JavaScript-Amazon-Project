import { cart, removeFromCart, updateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';   
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  // Use this to search for the whole product (then we need to import products in here)
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
      // if matchingProduct equals product that we're looping through
    }
  });
  // console.log(matchingProduct);

  cartSummaryHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id} is-editing-quantity">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id} js-quantity-link">${cartItem.quantity}</span>
          </span>
          <input class="quantity-input js-quantity-input" type="number">
          <span class="save-quantity-link link-primary js-save-quantity-link">Save</span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});
// Generate the HTML code abt js-order-summary to the HTML file
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Make the delete button clickable
const deleteLinks = document.querySelectorAll('.js-delete-link');
deleteLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log('Clicked delete button for productId:', productId);
    removeFromCart(productId);
    console.log(cart)
    
    // Remove the cart container from the page
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    // Update cart quantity dynamically
    updateCartQuantity();
  });
});

// // Make the Update button interactive
// const updateLinks = document.querySelectorAll('.js-update-quantity-link');
// updateLinks.forEach((link) => {
//   link.addEventListener('click', () => {
//     console.log("update id : " + link.dataset.productId);
//     const productId = link.dataset.productId;
//     const container = document.querySelector(`.js-cart-item-container-${productId}`);
//   });
// });

// Make the Update button interactive
document.addEventListener('DOMContentLoaded', () => {
  const updateLinks = document.querySelectorAll('.js-update-quantity-link');
  updateLinks.forEach((link) => {
    link.addEventListener('click', () => {
      console.log("updated")
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityEachProduct = container.querySelector('.js-quantity-link');
      const quantityInput = container.querySelector('.js-quantity-input');
      const saveButton = container.querySelector('.js-save-quantity-link');
      const updateButton = container.querySelector('.js-update-quantity-link');

      // Toggle visibility of input form, save button, and update button
      quantityEachProduct.style.display = 'none';
      quantityInput.style.display = 'initial';
      saveButton.style.display = 'initial';
      updateButton.style.display = 'none';

      // Update the quantity dynamically when input changes
      quantityInput.addEventListener('input', () => {
        const newQuantity = parseInt(quantityInput.value, 10) || 0;
        container.querySelector('.quantity-label').innerText = newQuantity;
      });

      // Save button click event
      saveButton.addEventListener('click', () => {
        const newQuantity = parseInt(quantityInput.value, 10) || 0;
        updateQuantity(productId, newQuantity);
        console.log('saved');

        // Hide input form and save button, show update button again
        quantityEachProduct.style.display = 'initial';
        quantityInput.style.display = 'none';
        saveButton.style.display = 'none';
        updateButton.style.display = 'initial';
      });
    });
  });
});
