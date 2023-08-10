import { ILoginCustomer } from '../types';
import { apiRoot } from './BuildClient';

export const loginCustomer = ({ email, password }: ILoginCustomer) => {
  apiRoot

    .login()

    .post({ body: { email: email, password: password } })
    .execute()
    .then(({ body }) => {
      console.log(body);
      alert('you succesfully logged in');
    })
    .catch(console.error);
};
