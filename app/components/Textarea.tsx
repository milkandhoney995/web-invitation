import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { DynamicGuestField } from "@/types/DynamicGuestField";

type  TextFieldControllerProps<T extends FieldValues> = {
  name: DynamicGuestField
  control: Control<T>
  label: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Textarea = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  onChange
}:  TextFieldControllerProps<T>) => {
  return (
    <FormControl fullWidth variant="outlined" required={required}>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id={name}
            value={field.value}
            onChange={(e) => {
              // `field.onChange` を呼び出して値を更新
              field.onChange(e);
              // 必要であれば、追加の処理を onChange に渡すこともできる
              if (onChange) {
                onChange(e);
              }
            }}
            label={label}
            fullWidth
            margin="normal"
            multiline
            variant="outlined"
            rows={3}
            error={!!fieldState?.error}
            helperText={fieldState?.error ? fieldState?.error.message : ''}
          />
        )}
      />
    </FormControl>
  );
};

export default Textarea;