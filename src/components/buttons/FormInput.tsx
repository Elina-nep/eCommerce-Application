import { FC } from 'react';
import { FormInputProps } from '../../types';
import './FormInput.css';

export const FormInput: FC<FormInputProps> = ({ label, type = 'text' }) => {
  return (
    <div className="form_container">
      <label className="form__label">{label}</label>
      <input className="form__input" type={type} placeholder={label} />
    </div>
  );
};

export default FormInput;
