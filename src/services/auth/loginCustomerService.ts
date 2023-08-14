import { ILoginCustomer } from '../../types';
import { apiRoot } from '../BuildClient';

export const loginCustomerService = ({ email, password }: ILoginCustomer) =>
  apiRoot
    .login()
    .post({ body: { email: email, password: password } })
    .execute();
