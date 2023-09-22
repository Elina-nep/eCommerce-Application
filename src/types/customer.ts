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
  setFirstName?: MyCustomerSetFirstNameAction;
  setLastName?: MyCustomerSetLastNameAction;
  setDateOfBirth?: MyCustomerSetDateOfBirthAction;
  setDefaultBillingAddress?: MyCustomerSetDefaultBillingAddressAction;
  setDefaultShippingAddress?: MyCustomerSetDefaultShippingAddressAction;
  addressAction?: MyCustomerAddAddressAction;
  addBillingAddressId?: MyCustomerAddBillingAddressIdAction;
  addShippingAddressId?: MyCustomerAddShippingAddressIdAction;
  changeAddress?: MyCustomerChangeAddressAction;
  removeAddressAction?: MyCustomerRemoveAddressAction;
  removeBillingAddressId?: MyCustomerRemoveBillingAddressIdAction;
  removeShippingAddressId?: MyCustomerRemoveShippingAddressIdAction;
  changeEmail?: MyCustomerChangeEmailAction;
  setCompanyName?: MyCustomerSetCompanyNameAction;
  setCustomField?: MyCustomerSetCustomFieldAction;
  setCustomType?: MyCustomerSetCustomTypeAction;
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
