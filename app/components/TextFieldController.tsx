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
  error?: boolean
  helperText?: string
}

const TextFielldController = (props: Props) => {
  const { label, name, value, required = false, onChange, error, helperText} = props

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
      />
    </FormControl>
  )
}

export default TextFielldController;