import { LineItem } from '@commercetools/platform-sdk';

export function getItemPrice(product: LineItem, currency: string): string {
  const price = (product.price.value.centAmount / 100).toFixed(2);
  return `${price} ${currency}`;
}

export function getItemDiscountedPrice(
  product: LineItem,
  currency: string,
): string {
  if (product.price.discounted) {
    const price = (product.price.discounted.value.centAmount / 100).toFixed(2);
    return `${price} ${currency}`;
  }
  return '';
}

export function getItemTotalPrice(product: LineItem, currency: string): string {
  const quantity = product.quantity;
  if (product.price.discounted) {
    const total = (
      (product.price.discounted.value.centAmount * quantity) /
      100
    ).toFixed(2);
    return `${total} ${currency}`;
  }
  const total = ((product.price.value.centAmount * quantity) / 100).toFixed(2);
  return `${total} ${currency}`;
}

export function getItemImage(product: LineItem) {
  const images = product.variant.images![0].url;
  return images;
}
