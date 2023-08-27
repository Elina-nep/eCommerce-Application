export type Sorting = 'price asc' | 'price desc' | 'name asc' | 'name desc';

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
