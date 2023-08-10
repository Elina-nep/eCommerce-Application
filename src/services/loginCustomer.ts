import { ILoginCustomer } from '../types';
import { apiRoot } from './BuildClient';

export const loginCustomer = ({ email, password }: ILoginCustomer) => {
  apiRoot

    .login()

    .post({ body: { email: email, password: password } })
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
};
