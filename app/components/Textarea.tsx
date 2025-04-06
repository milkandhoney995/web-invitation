/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react";
import { FormControl, InputLabel, TextField, FormHelperText } from '@mui/material';

type Props = {
  label: string;
  name?: string;
  value?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textarea = (props: Props) => {
  const { label, name, value, onChange, required, error, helperText } = props;

  const inputStyle = css`
    width: 100%;
    // padding: 12px;
    font-size: 1rem;
    // border-radius: 4px;
    // border: 1px solid ${error ? theme.palette.error.main : theme.palette.grey[300]};
    transition: border-color 0.3s, box-shadow 0.3s;
    &:focus {
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 5px ${theme.palette.primary.main};
    }
  `;

  return (
    <FormControl fullWidth variant="outlined" required={required} error={error}>
      {/* InputLabel と TextField を適切に連携させる */}
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <TextField
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        multiline
        minRows={3}
        variant="outlined"
        css={inputStyle}
        label={label}  // TextField に label を直接渡す
        placeholder=""  // placeholder は不要なので空にする
      />
      {helperText && <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Textarea;