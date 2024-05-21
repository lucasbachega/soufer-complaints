import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import React from "react";

const TextInput = ({
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
  required,
  disabled,
  autoFocus,
  type,
  sx,
}) => {
  return (
    <FormControl required={required} error={error}>
      {Boolean(label) && <FormLabel>{label}</FormLabel>}
      <Input
        autoFocus={autoFocus}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size={size}
        type={type}
        variant={variant}
        disabled={disabled}
        sx={sx}
      />
      {Boolean(helperText) && (
        <FormHelperText>
          {error && <InfoOutlined />}
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextInput;
