import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { SetURLSearchParams } from 'react-router-dom';

export type FilterStandardComponent = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export type FilterComponentT<T> = FilterStandardComponent & {
  allItems: T[];
  queryType: string;
};

export type FiltersT = {
  categories: CategoryPagedQueryResponse;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};
