export type Sorting = 'price asc' | 'price desc' | 'name asc' | 'name desc';
export type ProductQueryParams = { categoryId?: string; sort?: Sorting };
