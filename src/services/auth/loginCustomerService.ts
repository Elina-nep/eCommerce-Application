import { ILoginCustomer } from '../../types';
import { formPassFlow } from '../BuildClient';

export const loginCustomerService = ({ email, password }: ILoginCustomer) => {
  return formPassFlow({ username: email, password: password })
    .me()
    .login()
    .post({ body: { email: email, password: password } })
    .execute();
};
