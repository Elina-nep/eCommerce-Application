import React from 'react';
import FormInput from '../../components/buttons/FormInput';
import './Register.css';

function Register() {
  return (
    <div className="register__form">
      <form>
        <FormInput label="First Name" />
        <FormInput label="Last Name" />
        <FormInput label="Email" type="email" />
        <FormInput label="Password" type="password" />
        <FormInput label="Date of Birth" type="date" />
        <FormInput label="Street" />
        <FormInput label="City" />
        <FormInput label="Postal Code" />
        <FormInput label="Country" />
        <button className="register__button">Create account</button>
      </form>
    </div>
  );
}

export default Register;
