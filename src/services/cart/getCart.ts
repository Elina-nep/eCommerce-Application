import { formFlow } from '../BuildClient';

export const getCart = () => {
  formFlow()
    .me()
    .carts()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
};
