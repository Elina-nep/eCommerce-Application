import {
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerChangeEmailAction,
  MyCustomerRemoveAddressAction,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
  MyCustomerSetCompanyNameAction,
  MyCustomerSetCustomFieldAction,
  MyCustomerSetCustomTypeAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerSetLocaleAction,
  MyCustomerSetMiddleNameAction,
  MyCustomerSetSalutationAction,
  MyCustomerSetTitleAction,
  MyCustomerSetVatIdAction,
} from '@commercetools/platform-sdk';

export type CustomerChanges = {
  addressAction?: MyCustomerAddAddressAction;
  addBillingAddressId?: MyCustomerAddBillingAddressIdAction;
  addShippingAddressId?: MyCustomerAddShippingAddressIdAction;
  changeAddress?: MyCustomerChangeAddressAction;
  changeEmail?: MyCustomerChangeEmailAction;
  removeAddressAction?: MyCustomerRemoveAddressAction;
  removeBillingAddressId?: MyCustomerRemoveBillingAddressIdAction;
  removeShippingAddressId?: MyCustomerRemoveShippingAddressIdAction;
  setCompanyName?: MyCustomerSetCompanyNameAction;
  setCustomField?: MyCustomerSetCustomFieldAction;
  setCustomType?: MyCustomerSetCustomTypeAction;
  setDateOfBirth?: MyCustomerSetDateOfBirthAction;
  setDefaultBillingAddress?: MyCustomerSetDefaultBillingAddressAction;
  setDefaultShippingAddress?: MyCustomerSetDefaultShippingAddressAction;
  setFirstName?: MyCustomerSetFirstNameAction;
  setLastName?: MyCustomerSetLastNameAction;
  setLocale?: MyCustomerSetLocaleAction;
  setMiddleName?: MyCustomerSetMiddleNameAction;
  setSalutation?: MyCustomerSetSalutationAction;
  setTitle?: MyCustomerSetTitleAction;
  setVatId?: MyCustomerSetVatIdAction;
};

export type Password = {
  oldPassword: string;
  newPassword: string;
};
