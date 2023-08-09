export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateBirth: string;
  billStreet: string;
  billCity: string;
  billPostalCode: string;
  billCountry: string;
  shipStreet: string;
  shipCity: string;
  shipPostalCode: string;
  shipCountry: string;
  areAdressesSame: boolean;
  isBillingAddressDefault: boolean;
  isShippingAddressDefault: boolean;
}
