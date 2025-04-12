import { Controller, Control, FieldValues, FieldErrors, Path } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { DynamicGuestField } from '@/types/DynamicGuestField';
import { IFormInput } from '@/types/FormData';

interface TextFieldControllerProps<T extends FieldValues> {
  name: DynamicGuestField
  control: Control<T>
  errors: FieldErrors<T>
  handleBlur: (fieldName: keyof IFormInput, index: number) => void
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TextFieldController = <T extends FieldValues>({
  name,
  control,
  errors,
  handleBlur,
  label,
  onChange,
}: TextFieldControllerProps<T>) => {
  const fieldIndex = parseInt(name.split('[')[1]?.split(']')[0] || '0', 10); // インデックスを取得

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <TextField
            {...field}
            value={field.value ?? ''}
            fullWidth
            label={label}
            variant="outlined"
            margin="normal"
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message || ''}
            onBlur={() => handleBlur(name.split('.')[name.split('.').length - 1] as keyof IFormInput, fieldIndex)}
            onChange={(e) => {
              if (onChange) onChange(e)
              field.onChange(e)
            }}
          />
        </FormControl>
      )}
    />
  )
}

export default TextFieldController