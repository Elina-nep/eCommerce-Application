import {
  Category,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { SetURLSearchParams } from 'react-router-dom';

export interface FilterStandardComponent {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export interface ProductTopInfoT extends FilterStandardComponent {
  productsTotal?: number;
  currentCategory: string;
}

export interface FilterComponentT<T> extends FilterStandardComponent {
  allItems: T[];
  queryType: string;
}

export interface FiltersT {
  categories: CategoryPagedQueryResponse;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export interface CategoryT extends FilterStandardComponent {
  category: Category;
  isChild: boolean;
  hasChildren: boolean;
}

export const AVAILABLE_SORT_OPTIONS = [
  { value: '', label: 'default' },
  { value: 'price asc', label: 'price: low to high' },
  { value: 'price desc', label: 'price: high to low' },
  { value: 'name.en asc', label: 'name: a to z' },
  { value: 'name.en desc', label: 'name: z to a' },
];

export const NUMBER_OF_VISIBLE_FILTERS = 4;
