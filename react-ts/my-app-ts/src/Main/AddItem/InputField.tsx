import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, multiline, rows, fullWidth }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
    />
  );
}

export default InputField;
