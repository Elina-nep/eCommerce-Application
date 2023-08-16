import { RegisterOptions } from 'react-hook-form';
import { parse, differenceInYears, isValid } from 'date-fns';

const REQUIRED_FIELD = 'This field is required';

interface NameValidation {
  validate: (value: string) => string | boolean;
}

export const nameValidation: NameValidation = {
  validate: (value: string) => {
    if (!value.trim()) {
      return REQUIRED_FIELD;
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(value)) {
      return 'Cannot contain special characters or numbers.';
    }

    if (!/[a-zA-Z]/.test(value)) {
      return 'Must contain at least one character.';
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
    return 'Email is required.';
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

export const streetValidation = {
  required: REQUIRED_FIELD,
  minLength: {
    value: 1,
    message: 'Street must have at least 1 character.',
  },
};

export const countryValidation = {
  required: REQUIRED_FIELD,
};

export const postalCodeValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string, { country }: { country: string }) => {
    let postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    let errorMessage = 'Invalid postal code.';

    if (country === 'Germany') {
      postalCodeRegex = /^\d{5}$/;
      errorMessage = 'Postal code for Germany must have 5 digits.';
    } else if (country === 'Belarus') {
      postalCodeRegex = /^\d{6}$/;
      errorMessage = 'Postal code for Belarus must have 6 digits.';
    } else if (country === 'Serbia') {
      postalCodeRegex = /^\d{5}$/;
      errorMessage = 'Postal code for Serbia must have 5 digits.';
    } else if (country === 'USA') {
      postalCodeRegex = /^\d{5}(-\d{4})?$/;
      errorMessage =
        'Postal code for USA must match the format "#####-####" (5 digits followed by optional hyphen and 4 digits) or "########" (9 digits).';
    }

    if (!postalCodeRegex.test(value)) {
      return errorMessage;
    }

    return true;
  },
};
