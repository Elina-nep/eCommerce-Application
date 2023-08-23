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
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  where: string[];
};

export const getProductsService = (categoryId?: string) => {
  const queryArgs: queryArgs = {
    staged: false,
    where: [],
  };

  if (categoryId) {
    queryArgs.where.push(`categories(id="${categoryId}")`);
  }
  return formFlow().productProjections().get({ queryArgs }).execute();
};
