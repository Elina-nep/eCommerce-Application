import { formFlow } from '../BuildClient';

// export const getProductsService = async () =>
//   formFlow().products().get().execute();

export const getProductsService = () =>
  formFlow()
    .productProjections()
    .search()
    .get({ queryArgs: { staged: false } })
    .execute();

// methodArgs?: {
//   queryArgs?: {
//       staged?: boolean;
//       priceCurrency?: string;
//       priceCountry?: string;
//       priceCustomerGroup?: string;
//       priceChannel?: string;
//       localeProjection?: string | string[];
//       storeProjection?: string;
//       expand?: string | string[];
//       sort?: string | string[];
//       limit?: number;
//       offset?: number;
//       withTotal?: boolean;
//       where?: string | string[];
//       [key: string]: QueryParam;
