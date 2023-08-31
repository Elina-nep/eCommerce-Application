import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { SetURLSearchParams } from 'react-router-dom';

export type FilterComponentT<T> = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  allItems: T[];
  queryType: string;
};

export type FiltersT = {
  categories: CategoryPagedQueryResponse;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};
