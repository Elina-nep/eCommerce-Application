import { formFlow } from '../BuildClient';

export const getOneProductService = (id: string) =>
  formFlow()
    .products()
    .withId({
      ID: id,
    })
    .get()
    .execute();
