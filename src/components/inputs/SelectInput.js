import { InfoOutlined } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Option,
  Select,
} from "@mui/joy";
import React from "react";

const SelectInput = ({
  value,
  onChange = () => {},
  label,
  placeholder,
  size,
  variant,
  helperText,
  startDecorator,
  endDecorator,
  error,
  defaultValue,
  options = [],
  required,
}) => {
  return (
    <FormControl required={required} error={error}>
      {Boolean(label) && <FormLabel>{label}</FormLabel>}
      <Select
        required={required}
        value={value}
        variant={variant}
        size={size}
        placeholder={placeholder}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        defaultValue={defaultValue}
        onChange={(e, value) => Boolean(value) && onChange(value)}
      >
        {options?.map((option) => (
          <Option key={option?.value} value={option?.value}>
            {option?.label}
          </Option>
        ))}
      </Select>
      {Boolean(helperText) && (
        <FormHelperText>
          {error && <InfoOutlined />}
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
