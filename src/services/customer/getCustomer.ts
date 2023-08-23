import { formFlow } from '../BuildClient';

export const getCustomerService = async () => formFlow().me().get().execute();
