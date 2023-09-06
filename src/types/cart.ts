export interface HeadProps {
  cartTotal: number;
  cartItemsCount: number;
}

export interface ItemInCartChangeService {
  sku?: string;
  cartVersion: number;
  cartId: string;
  cartItemId?: string | string[];
  action: string;
  quantity: number | number[];
}

export interface DiscountCartService {
  discount?: string;
  discountCode?: string;
  cartVersion: number;
  cartId: string;
  action: string;
}
