import { useState } from 'react';
import { FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { css } from "@emotion/react"
import theme from '@/style/theme';

interface Items {
  value: string
  label: string
}

type Props = {
  legend: string
  name?: string
  value?: string
  items: Array<Items>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioGroupController = (props: Props) => {
  const { legend, name, value, items, onChange } = props

  return (
    <>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormControl fullWidth>
        <RadioGroup
          row
          value={value}
          onChange={onChange}
          name={name}
          sx={{ paddingLeft: 12 }}
        >
          <FormControlLabel value={items[0].value} control={<Radio />} label={items[0].label} sx={{ sm: `${theme.validTheme.num16}` } } />
          <FormControlLabel value={items[1].value} control={<Radio />} label={items[1].label} />
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default RadioGroupController;