import { LineItem } from '@commercetools/platform-sdk';

export interface HeadProps {
  cartTotal: number;
  cartItemsCount: number;
}
export type CartInterface = {
  lineItems: LineItem[];
};
export interface ItemInCartChange {
  sku?: string;
  cartItemId?: string | string[];
  action: string;
  quantity: number | number[];
}

export interface ItemInCartChangeService extends ItemInCartChange {
  cartVersion: number;
  cartId: string;
}

export interface DiscountCartService {
  discount?: string;
  discountCode?: string;
  cartVersion: number;
  cartId: string;
  action: string;
}

export interface IItemInCartProps {
  product: LineItem;
}

export interface ISummaryProps {
  totalBeforeDiscount?: string;
  discount?: string;
  finalTotal: string;
}
