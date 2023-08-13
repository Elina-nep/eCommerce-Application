import { formFlow } from '../BuildClient';

export const getProducts = () => {
  formFlow()
    .products()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
};
