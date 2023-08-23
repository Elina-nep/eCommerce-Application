export type Sorting = 'price asc' | 'price desc' | 'name asc' | 'name desc';
export type FilterPrice = { from: number; to: number }; // number in cents

export type ProductQueryParams = {
  categoryId?: string;
  sort?: Sorting;
  filterPrice?: FilterPrice;
  available?: boolean;
  colors?: Colors[];
  lang?: 'ru' | 'en';
  queryText?: string;
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
