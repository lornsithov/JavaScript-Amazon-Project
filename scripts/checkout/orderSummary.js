import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';   
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';

// The main function which is used to render the code   
export function renderOrderSummary() {
  // Generate Cart Summary
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // looping through all products to find the mathcing products
    // let matchingProduct;
    // products.forEach((product) => {
    //   if (product.id === productId) {
    //     matchingProduct = product;
    //   }
    // });
    const matchingProduct = getProduct(productId);
    // since we no longer change the number inside the matchingProduct then we use 'const' instead of 'let'

    // replace delivery date with the selected date
    const deliveryOptionId = cartItem.deliveryOptionId;
    // let deliveryOption;
    // deliveryOptions.forEach((option) => {
    //   if (option.id === parseInt(deliveryOptionId)) {
    //     deliveryOption = option;
    //   }
    // });
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
      `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id} is-editing-quantity">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          <div class="delivery-options-title js-delivery-option-selector-${matchingProduct.id}">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });
  document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;


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
          if (newQuantity <= 0) 
          {
            // Show a prompt alert for invalid input
            alert('Invalid quantity input. Please enter a valid quantity.');
          } 
          else 
          {
            updateQuantity(productId, newQuantity);
            console.log('saved');
            // Hide input form and save button, show update button again
            quantityEachProduct.style.display = 'initial';
            quantityInput.style.display = 'none';
            saveButton.style.display = 'none';
            updateButton.style.display = 'initial';
          }
        });
      });
    });
  });

  // Generate Delivery Options
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    // const today = dayjs();
    // const deliveryDate = today.add(7, 'days');
    // console.log(deliveryDate.format('dddd, MMMM D'));
    // console.log(deliveryOptions)
    
    let html = ``
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D')

      // Conditional (ternary) operator
      // condition ? exprIfTrue : exprIfFalse
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

      // checked delivery option
      const isChecked = deliveryOption.id === parseInt(cartItem.deliveryOptionId); // since the deliveryoptionid inside the local storage is string
      
      // add data attributes of productId and deliveryOptionId to the main class 
      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // Make the options selectable
  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      // rerun the code since it needs to be refreshed
    });
  });

  // Generate order summary HTML
  let orderSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$42.75</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$4.99</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$47.74</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$4.77</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$52.51</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    </div>
  `;
  document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;
}

// renderOrderSummary();
// A function can call/rerun itsself = recursion
