import { ILoginCustomer } from '../../types';
import { formFlow } from '../BuildClient';

export const loginCustomerService = ({ email, password }: ILoginCustomer) => {
  return formFlow()
    .me()
    .login()
    .post({
      body: {
        email: email,
        password: password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};

export const formAuthoredService = ({ email, password }: ILoginCustomer) =>
  formFlow({ username: email, password: password }).me().get().execute();
