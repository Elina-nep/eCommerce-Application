import { configureStore } from '@reduxjs/toolkit';

import alertMessageReducer from './sliceAlertState';
import ifAuthReducer from './sliceAuthState';
import changeCartReducer from './sliceCartState';
import changeCategoriesReducer from './sliceCategoriesState';

export const reducer = {
  ifAuth: ifAuthReducer,
  cart: changeCartReducer,
  categories: changeCategoriesReducer,
  alertMessage: alertMessageReducer,
};

export const store = configureStore({
  reducer: reducer,
});

export type AppDispatch = typeof store.dispatch;
export type StoreType = ReturnType<typeof store.getState>;
