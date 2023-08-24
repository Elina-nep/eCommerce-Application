export interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  billStreet: string;
  billCity: string;
  billPostalCode: string;
  billCountry: string;
  shipStreet: string;
  shipCity: string;
  shipPostalCode: string;
  shipCountry: string;
  areAddressesSame: boolean;
  isBillingAddressDefault: boolean;
  isShippingAddressDefault: boolean;
}
