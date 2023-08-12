export {};
export interface LinkItem {
  title: string;
  to: string;
}

export interface ColumnItem {
  title: string;
  links: LinkItem[];
}

export interface HeadProps {
  cartTotal: number;
  cartItemsCount: number;
}

export interface CardData {
  id: number;
  discountText: string;
  image: string;
  buttonText: string;
  couponDate: string;
  couponCode?: string;
  description: string;
}
