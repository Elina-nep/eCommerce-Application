import { ProductQueryParams } from '../../types';
import { PRODUCTS_ON_PAGE } from '../../util';
import { formFlow } from '../BuildClient';

type queryArgs = {
  staged: boolean;
  fuzzy?: boolean;
  'text.en'?: string;
  'text.ru'?: string;
  sort: string[];
  filter: string[];
  offset: number;
  limit: number;
};

export const getProductsService = (queryParams?: ProductQueryParams) => {
  const queryArgs: queryArgs = {
    staged: false,
    filter: [],
    sort: ['name asc'],
    offset: queryParams?.pageNum
      ? queryParams?.pageNum * PRODUCTS_ON_PAGE + 1
      : 0,
    limit: PRODUCTS_ON_PAGE,
  };

  if (queryParams?.queryText) {
    const lang = queryParams.lang ? queryParams.lang : 'en';
    queryArgs[`text.${lang}`] = `name.${lang}="${queryParams?.queryText}"`;
    queryArgs.fuzzy = true;
  }

  if (queryParams?.colors) {
    queryArgs.filter.push(
      `variants.attributes.color.key:"${queryParams?.colors.join(`","`)}"`,
    );
  }
  if (queryParams?.available) {
    queryArgs.filter.push(`variants.availability.isOnStock:true`);
  }
  if (queryParams?.categoryId) {
    queryArgs.filter.push(`categories.id:"${queryParams.categoryId}"`);
  }
  if (queryParams?.filterPrice) {
    queryArgs.filter.push(
      `variants.price.centAmount:range (${
        queryParams.filterPrice.from || '*'
      } to ${queryParams.filterPrice.from || '*'}})`,
    );
  }
  if (queryParams?.sort) {
    queryArgs.sort[0] = queryParams.sort;
  }

  return formFlow().productProjections().search().get({ queryArgs }).execute();
};
