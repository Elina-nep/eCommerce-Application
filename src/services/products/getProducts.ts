import { formFlow } from '../BuildClient';

export const getProductsService = async () =>
  formFlow().products().get().execute();
