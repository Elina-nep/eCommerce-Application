import { apiRoot } from '../BuildClient';

export const getCart = () => {
  apiRoot
    .me()
    .carts()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
};
