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
