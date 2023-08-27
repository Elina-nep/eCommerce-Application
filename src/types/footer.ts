export interface LinkItem {
  title: string;
  to: string;
  id?: string;
}

export interface ColumnItem {
  title: string;
  links: LinkItem[];
  id: string;
}
