import { MyCustomerUpdate } from '@commercetools/platform-sdk';

import { CustomerChanges, Password } from '../../types';
import { formFlow } from '../BuildClient';

export const getCustomerService = async () => formFlow().me().get().execute();

export const changeCustomerService = async (
  myActions: CustomerChanges,
  version: number,
) => {
  const args: MyCustomerUpdate = {
    version: version,
    actions: Object.values(myActions),
  };
  return formFlow().me().post({ body: args }).execute();
};

export const changeCustomerPasswordService = async (
  password: Password,
  version: number,
) => {
  const args = {
    version: version,
    currentPassword: password.oldPassword,
    newPassword: password.newPassword,
  };
  return formFlow().me().password().post({ body: args }).execute();
};
