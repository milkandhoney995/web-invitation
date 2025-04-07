import { Controller, Control, FieldValues, FieldErrors } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { IFormInput } from '@/types/FormData';

interface TextFieldControllerProps<T extends FieldValues> {
  name: keyof IFormInput;
  control: Control<IFormInput>;
  errors: FieldErrors<T>;
  handleBlur: (fieldName: keyof T) => void;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextFieldController = <T extends FieldValues>({
  name,
  control,
  errors,
  handleBlur,
  label,
  onChange
}: TextFieldControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: '名前は必須です' }}  // 必須バリデーション
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField
            {...field}  // field の属性（value, onChange, onBlurなど）を展開して渡す
            fullWidth
            label={label}
            variant="outlined"
            margin="normal"
            error={!!errors && !!errors[name]}
            helperText={errors[name]?.message as string || ''}
            onBlur={() => handleBlur(name)}
            onChange={(e) => {
              if (onChange) onChange(e);  // 親コンポーネントのonChangeを呼び出す
              field.onChange(e);  // react-hook-formのonChangeも呼び出す
            }}
          />
        </FormControl>
      )}
    />
  )
}

export default TextFieldController;