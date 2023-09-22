import { formFlow } from '../BuildClient';

export const getCategoriesService = async () =>
  formFlow().categories().get().execute();
