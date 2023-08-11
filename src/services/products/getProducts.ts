import { apiRoot } from '../BuildClient';

export const getProducts = () => {
  apiRoot
    .products()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
};
