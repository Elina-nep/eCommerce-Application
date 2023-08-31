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

export const ALL_MATERIALS: Material[] = [
  'latex',
  'foil',
  'paper',
  'fabric',
  'wood',
  'plastic',
  'metal',
  'mixed',
];

export type FilterPrice = {
  from?: number;
  to?: number;
};
export type ProductQueryParams = {
  categoryId?: string;
  categoryName?: string;
  sort?: string;
  filter?: string;
  filterPrice?: FilterPrice;
  available?: boolean;
  colors?: string[];
  lang?: 'ru' | 'en';
  queryText?: string;
  pageNum?: number;
  materials?: string[];
  occasions?: string[];
};

export type Colors =
  | 'black'
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

export const ALL_COLORS: Colors[] = [
  'black',
  'white',
  'blue',
  'brown',
  'green',
  'red',
  'purple',
  'pink',
  'orange',
  'yellow',
  'gold',
  'silver',
  'multicolored',
];
export type Occasions =
  | 'birthday'
  | 'love'
  | 'other holidays'
  | 'christmas'
  | 'children';

export const ALL_OCCASIONS: Occasions[] = [
  'birthday',
  'love',
  'other holidays',
  'christmas',
  'children',
];
