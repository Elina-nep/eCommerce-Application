export type Sorting = 'price asc' | 'price desc' | 'name asc' | 'name desc';
export type Material =
  | 'fabric'
  | 'foil'
  | 'latex'
  | 'mixed'
  | 'paper'
  | 'plastic'
  | 'wood'
  | 'metal';
export type FilterPrice = {
  from?: number;
  to?: number;
};
export type ProductQueryParams = {
  categoryId?: string;
  sort?: Sorting;
  filter?: string;
  filterPrice?: FilterPrice;
  available?: boolean;
  colors?: Colors[];
  lang?: 'ru' | 'en';
  queryText?: string;
  pageNum?: number;
  materials?: Material[];
};

export type Colors =
  | 'black'
  | 'grey'
  | 'beige'
  | 'white'
  | 'blue'
  | 'brown'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'multicolored';
