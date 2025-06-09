import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type CheckboxControllerProps = {
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxController: React.FC<CheckboxControllerProps> = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default CheckboxController;
