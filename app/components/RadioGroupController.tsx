import React from 'react';
import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from '@mui/material';
import theme from '@/style/theme';
import { DynamicGuestField, GuestField } from '@/types/DynamicGuestField';

interface Items {
  value: string
  label: string
}

interface RadioGroupControllerProps<T extends FieldValues> {
  name: DynamicGuestField
  control: Control<T>;
  handleBlur: (fieldName: GuestField) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  legend: string;
  items: Array<Items>;
}

const RadioGroupController = <T extends FieldValues>({
  name,
  control,
  handleBlur,
  onChange,
  legend,
  items
}: RadioGroupControllerProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel component="legend">{legend}</FormLabel>
          <FormControl fullWidth>
            <RadioGroup
              {...field}
              value={String(field.value)}
              onBlur={() => handleBlur(name as GuestField)}
              onChange={(e) => {
                const value = e.target.value === 'true';
                field.onChange(value)
                if (onChange) onChange(e)
              }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              {items.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      )}
    />
  );
};

export default RadioGroupController;