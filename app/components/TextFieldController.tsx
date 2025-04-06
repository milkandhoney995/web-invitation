import { useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import { css } from "@emotion/react"
import theme from '@/style/theme';

type Props = {
  label?: string
  name?: string
  value?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextFielldController = (props: Props) => {
  const { label, name, value, required = false, onChange } = props

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </FormControl>
  )
}

export default TextFielldController;