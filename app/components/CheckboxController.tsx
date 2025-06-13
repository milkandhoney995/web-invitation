import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DynamicGuestField } from '@/types/DynamicGuestField';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface CheckboxControllerProps<T extends FieldValues> {
  name: DynamicGuestField
  control: Control<T>;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxController = <T extends FieldValues>({
  name,
  control,
  label,
  onChange
}: CheckboxControllerProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  const value = e.target.value === 'true';
                  field.onChange(value)
                  if (onChange) onChange(e)
                }}
              />
            }
            label={label}
            required
          />
        </>
      )}
    />
  );
};

export default CheckboxController;
