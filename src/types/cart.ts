export interface HeadProps {
  cartTotal: number;
  cartItemsCount: number;
}

export interface ItemInCartChangeService {
  sku?: string;
  cartVersion: number;
  cartId: string;
  cartItemId?: string;
  action: string;
  quantity: number;
}
