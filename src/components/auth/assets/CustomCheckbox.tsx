import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import React from 'react';
import { Controller } from 'react-hook-form';

import { CustomCheckboxProps } from '../../../types/form';

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  control,
  name,
  label,
  isChecked,
  onChange,
  id,
}) => {
  return (
    <FormGroup>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControlLabel
            labelPlacement="end"
            control={
              <Checkbox
                id={id}
                size="small"
                {...field}
                checked={isChecked}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) {
                    onChange(e.target.checked);
                  }
                }}
              />
            }
            label={label}
          />
        )}
      />
    </FormGroup>
  );
};
