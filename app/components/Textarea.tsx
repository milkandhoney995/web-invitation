/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { TextareaAutosize, FormControl } from '@mui/material'

type Props = {
  placeholder?: string
  name?: string;
  value?: string;
  size?: 'small' | 'medium' | 'large';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: Props) => {
  const { placeholder, name, value, onChange } = props;

  return (
    <FormControl fullWidth>
      <TextareaAutosize
        minRows={3}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </FormControl>
  )
}

export default Textarea;