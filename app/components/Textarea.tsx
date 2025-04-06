/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react";
import { FormControl, TextField, FormHelperText } from '@mui/material';

type Props = {
  label: string;
  name?: string;
  value?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
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

const Textarea = (props: Props) => {
  const { label, name, value, onChange, required = false, error = false, helperText } = props;

  return (
    <FormControl fullWidth variant="outlined" required={required} error={error}>
      <TextField
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        multiline
        minRows={3}
        variant="outlined"  // variantは"outlined"で問題ない
        label={label}  // TextFieldが内部でInputLabelを制御するので、InputLabelを明示的に追加する必要はない
        css={style}
        placeholder=""  // placeholderは空にする
      />
      {helperText && <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Textarea;