import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { formFlow } from '../BuildClient';
import { CustomerChanges } from '../../types';

export const getCustomerService = async () => formFlow().me().get().execute();

export const changeCustomerService = async (myActions: CustomerChanges) => {
  const args: MyCustomerUpdate = {
    version: 0,
    actions: Object.values(myActions),
  };
  return formFlow().me().post({ body: args }).execute();
};
