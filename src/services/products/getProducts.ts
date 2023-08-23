import { ProductQueryParams } from '../../types';
import { formFlow } from '../BuildClient';

type queryArgs = {
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;

  sort: string[];
  filter: string[];
};

export const getProductsService = (queryParams?: ProductQueryParams) => {
  const queryArgs: queryArgs = {
    staged: false,
    filter: [],
    sort: [],
  };

  if (queryParams?.categoryId) {
    queryArgs.filter.push(`categories.id:"${queryParams.categoryId}"`);
  }
  if (queryParams?.sort) {
    queryArgs.sort.push(queryParams.sort);
  }

  return formFlow().productProjections().search().get({ queryArgs }).execute();
};
