import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // calculate the items price
    const product = getProduct(cartItem.productId)
    productPriceCents += product.priceCents * cartItem.quantity;

    // calculate the shipping charges
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const totalTaxCents = totalBeforeTaxCents * 0.1; 
  const totalAfterTaxCents = totalBeforeTaxCents + totalTaxCents;
}