import { ProductQueryParams } from '../../types';
import { formFlow } from '../BuildClient';

type queryArgs = {
  staged: boolean;
  fuzzy?: boolean;
  'text.en'?: string;
  'text.ru'?: string;
  sort: string[];
  filter: string[];
};

export const getProductsService = (queryParams?: ProductQueryParams) => {
  const queryArgs: queryArgs = {
    staged: false,
    filter: [],
    sort: [],
  };

  console.log(queryParams);

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
    queryArgs.sort.push(queryParams.sort);
  }

  return formFlow().productProjections().search().get({ queryArgs }).execute();
};
