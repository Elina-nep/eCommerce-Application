const REQUIRED_FIELD = 'This field is requierd';

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.trim()) {
      return 'This field is required.';
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

import { parse, differenceInYears, isValid } from 'date-fns';
import { RegisterOptions } from 'react-hook-form';

export const ageValidation = (minAge: number): RegisterOptions => ({
  required: 'This field is required.',
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
    message: 'Password must have at least 8 characters.',
  },
  validate: (value: string) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
    }

    return true;
  },
};

export const emailValidation = {
  required: 'Email is required.',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address.',
  },
};
