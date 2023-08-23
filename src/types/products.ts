export type Sorting = 'price asc' | 'price desc' | 'name asc' | 'name desc';
export type FilterPrice = { from: number; to: number };
export type ProductQueryParams = {
  categoryId?: string;
  sort?: Sorting;
  filterPrice?: FilterPrice;
};
