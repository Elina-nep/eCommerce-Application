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
  console.log(queryParams);
  const lang = queryParams?.lang ? queryParams.lang : 'en';
  const queryArgs: queryArgs = {
    staged: false,
    filter: [],
    sort: [`id asc`],
    offset:
      queryParams?.pageNum && queryParams?.pageNum - 1
        ? (queryParams?.pageNum - 1) * PRODUCTS_ON_PAGE + 1
        : 0,
    limit: PRODUCTS_ON_PAGE,
  };

  if (queryParams?.queryText) {
    queryArgs[`text.${lang}`] = `name.${lang}="${queryParams?.queryText}"`;
    queryArgs.fuzzy = true;
  }

  if (queryParams?.colors?.length && queryParams?.colors?.length > 0) {
    queryArgs.filter.push(
      `variants.attributes.color.key:"${queryParams?.colors.join(`","`)}"`,
    );
  }
  if (queryParams?.materials?.length && queryParams?.materials?.length > 0) {
    queryArgs.filter.push(
      `variants.attributes.material.key:"${queryParams?.materials.join(
        `","`,
      )}"`,
    );
  }
  if (queryParams?.occasions?.length && queryParams?.occasions?.length > 0) {
    queryArgs.filter.push(
      `variants.attributes.occasions.key:"${queryParams?.occasions.join(
        `","`,
      )}"`,
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
    queryArgs.sort.unshift(queryParams.sort);
  }
  console.log(queryArgs);
  return formFlow().productProjections().search().get({ queryArgs }).execute();
};
