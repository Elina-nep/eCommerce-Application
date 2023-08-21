import { ILoginCustomer } from '../../types';
import { formFlow } from '../BuildClient';

export const loginCustomerService = ({ email, password }: ILoginCustomer) => {
  return formFlow({ username: email, password: password })
    .me()
    .login()
    .post({ body: { email: email, password: password } })
    .execute();
};
