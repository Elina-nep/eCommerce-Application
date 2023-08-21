import { RegisterOptions } from 'react-hook-form';
import { parse, differenceInYears, isValid } from 'date-fns';

const REQUIRED_FIELD = 'This field is required';

interface StringValidation {
  validate: (value: string) => string | boolean;
}

export const nameValidation: StringValidation = {
  validate: (value: string) => {
    if (!value) {
      return REQUIRED_FIELD;
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(value)) {
      return 'Cannot contain special characters or numbers.';
    }

    return true;
  },
};

export const ageValidation = (minAge: number): RegisterOptions => ({
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
    if (!isValid(parsedDate)) {
      return 'Invalid date format.';
    }
    const age = differenceInYears(new Date(), parsedDate);
    if (age < minAge) {
      return `Must be at least ${minAge} years old.`;
    }
    return true;
  },
});

export const passwordValidation = {
  required: REQUIRED_FIELD,
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long.',
  },
  validate: (value: string) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const hasNoWhitespace = /^\S+$/.test(value);

    if (!hasUppercase) {
      return 'Password must contain at least 1 uppercase letter.';
    }
    if (!hasLowercase) {
      return 'Password must contain at least 1 lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least 1 number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least 1 special character (e.g., !@#$%^&*).';
    }
    if (!hasNoWhitespace) {
      return 'Password must not contain leading or trailing whitespace.';
    }
    return true;
  },
};

export const emailValidation = (value: string) => {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return 'Invalid email address.';
  }
  const trimmedValue = value.trim();
  if (value !== trimmedValue) {
    return 'Email address must not contain leading or trailing whitespace.';
  }
  return true;
};

export const streetValidation: StringValidation = {
  validate: (value: string) => {
    if (!value) {
      return REQUIRED_FIELD;
    }

    if (!/[a-zA-Z]/.test(value)) {
      return 'Must contain at least one character.';
    }

    return true;
  },
};

export const countryValidation = {
  validate: (value: string) => {
    if (!value) {
      return REQUIRED_FIELD;
    }
    return true;
  },
};

export const postalCodeValidation = {
  validate: (value: string, country: string) => {
    let postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    let errorMessage = '';

    if (!value) {
      errorMessage = REQUIRED_FIELD;
    } else if (!country) {
      errorMessage = REQUIRED_FIELD;
    } else if (country === 'DE') {
      postalCodeRegex = /^\d{5}$/;
      errorMessage = 'Postal code for Germany must have 5 digits.';
    } else if (country === 'BY') {
      postalCodeRegex = /^220\d{3}$/;
      errorMessage =
        'Postal code for Belarus must start with "220" followed by 3 digits.';
    } else if (country === 'RS') {
      postalCodeRegex = /^\d{5}$/;
      errorMessage = 'Postal code for Serbia must have 5 digits.';
    }

    if (!postalCodeRegex.test(value)) {
      return errorMessage || 'Invalid postal code.';
    }

    return true;
  },
};
