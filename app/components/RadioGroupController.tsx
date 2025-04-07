import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from '@mui/material';
import theme from '@/style/theme';

interface Items {
  value: string
  label: string
}

interface RadioGroupControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  handleBlur: (fieldName: Path<T>) => void;
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
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={items[0].value}  // ここで初期値を設定（最初のラジオボタンが選択される）
        render={({ field }) => (
          <>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormControl fullWidth>
              <RadioGroup
                {...field}
                value={field.value}
                onBlur={() => handleBlur(name)}
                onChange={(e) => {
                  field.onChange(e); // react-hook-form の onChange
                  if (onChange) onChange(e); // 親から渡された onChange を呼び出し
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                {/* ここでラジオボタンを表示 */}
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
    </div>
  );
};

export default RadioGroupController;