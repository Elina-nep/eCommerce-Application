import './Coupon.scss';

import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { changeCart, StoreType } from '../../../store';
import { ICoupon } from '../../../types';
import { couponValidation, discountCart, getDiscount } from '../../../util';
import { couponTheme } from '../../auth/theme';
import { SparklingButton } from '../../buttons/SparklingButton/SparklingButton';

export const Coupon: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);
  const [code, setCode] = useState({ code: '', id: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control } = useForm<ICoupon>();
  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (cart.discountCodes.length > 0) {
      const code = cart.discountCodes.find((el) => el.state === 'MatchesCart');
      if (code) {
        getDiscount(code.discountCode.id)
          .then((res) => {
            setCode({ code: res.code, id: res.id });
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    } else setCode({ code: '', id: '' });
  }, [cart]);

  const handleAddDiscount = (formData: ICoupon) => {
    discountCart({
      discount: formData.coupon,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'addDiscountCode',
    })
      .then((res) => {
        dispatch(changeCart({ cart: res }));
        setErrorMessage('');
      })
      .catch((e) => {
        console.log(e.message);
        setErrorMessage(e.message || 'An error occurred');
      });
  };
  const handleDeleteDiscount = (id: string) => {
    discountCart({
      discountCode: id,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'removeDiscountCode',
    })
      .then((res) => {
        dispatch(changeCart({ cart: res }));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="coupon">
      {errorMessage && (
        <p className="primary_button coupon__new_error">{errorMessage}</p>
      )}

      {cart.discountCodes.find(
        (discountCode) => discountCode.state === 'MatchesCart',
      ) ? (
        <div className="coupon__current">
          <p className="coupon__current_title">Applied coupon: </p>
          <div className="coupon__current_content">
            <span className="primary_button coupon__current_code">
              {code.code}
            </span>
            <button
              className="coupon__current_delete_btn"
              onClick={() => handleDeleteDiscount(code.id)}
            >
              x
            </button>
          </div>
        </div>
      ) : (
        <ThemeProvider theme={couponTheme}>
          <form
            onSubmit={handleSubmit(handleAddDiscount)}
            className="coupon__form"
          >
            <Controller
              control={control}
              name="coupon"
              rules={{
                validate: (value) =>
                  couponValidation(value, cart.totalPrice.centAmount),
              }}
              render={({ field }) => (
                <TextField
                  id="coupon"
                  label="Coupon"
                  onChange={(e) => {
                    field.onChange(e);
                    setErrorMessage('');
                  }}
                  value={field.value || ''}
                  size="small"
                  margin="normal"
                  type="text"
                  error={!!errors.coupon?.message}
                  helperText={errors?.coupon?.message}
                  className="coupon__new_input"
                />
              )}
            />
            <SparklingButton className="primary_button coupon__new_btn">
              Apply
            </SparklingButton>
          </form>
        </ThemeProvider>
      )}
    </div>
  );
};
