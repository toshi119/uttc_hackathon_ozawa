import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, options, onChange, fullWidth }) => {
  return (
    <Select
      label={label}
      value={value}
      onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
      fullWidth={fullWidth}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectField;
