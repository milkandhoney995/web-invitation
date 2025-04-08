import theme from "@/style/theme";
import { css } from "@emotion/react";
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { IFormInput } from "@/types/FormData";
import { DynamicGuestField } from "@/types/DynamicGuestField";

type  TextFieldControllerProps<T extends FieldValues> = {
  name: DynamicGuestField
  control: Control<T>
  label: string;
  required?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const style = css({
  width: "100%",
  fontSize: "1rem",
  transition: "border-color 0.3s, box-shadow 0.3s",
  "&:focus": {
    borderColor: `${theme.palette.primary.main}`,
    boxShadow: `0 0 5px ${theme.palette.primary.main}`
  },
})

const Textarea = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  rows = 4,
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
            onChange={onChange}
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